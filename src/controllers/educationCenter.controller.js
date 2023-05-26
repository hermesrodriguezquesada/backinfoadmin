const { body, validationResult } = require("express-validator");
const { Op } = require("sequelize");
const fs = require("fs-extra");
const path = require("path");
const {
  EducationCenter,
  Province,
  EducationCenterCareer,
  Career,
  ScienceArea,
  EducationCenterContact,
  ContactType,
} = require("../database/models");
const { getCareerPublicInfo } = require("../controllers/career.controller");
const { NotFoundError, ErrorMessage } = require("../exceptions");
const {
  responseTypes,
  standardResponse,
  IMAGES_LOCATION,
  filterActive,
  contactCategory,
  socialTypes,
  contactTypes,
} = require("../utils/globalUtils");
const { paginate } = require("../libs/paginate");

const getEducationCenterPublicInfo = (record) => {
  const item = {
    id: record.id,
    name: record.name,
    code: record.code,
    description: record.description,
    shortDescription: record.shortDescription,
    globalRankingYear: record.globalRankingYear || null,
    globalRanking: record.globalRanking || null,
    cubanRankingYear: record.cubanRankingYear || null,
    cubanRanking: record.cubanRanking,
    foundationYear: record.foundationYear,
    image: record.image
      ? `${process.env.APP_DOMAIN}/images/${record.image}`
      : null,
    logo: record.logo
      ? `${process.env.APP_DOMAIN}/images/${record.logo}`
      : null,
    location: record.location,
    rectorName: record.rectorName,
    rectorImage: record.rectorImage
      ? `${process.env.APP_DOMAIN}/images/${record.rectorImage}`
      : null,
    provinceId: record.provinceId,
    isCertified: record.isCertified,
    certificationLevel: record.certificationLevel,
    Province: record.Province
      ? {
          id: record.Province.id,
          name: record.Province.name,
          code: record.Province.code,
        }
      : null,
  };
  if (record.EducationCenterContacts) {
    item.EducationCenterContacts = record.EducationCenterContacts.map((i) => {
      return {
        id: i.id,
        value: i.value,
        category: i.category,
        subtype: i.subtype,
        contactTypeId: i.contactTypeId,
        ContactType: {
          id: i.ContactType.id,
          name: i.ContactType.name,
          slug: i.ContactType.slug,
        },
      };
    });
  }
  if (record.Careers) {
    item.Careers = record.Careers.map((item) => getCareerPublicInfo(item));
  }
  return item;
};

const getEducationCenters = async (req, res) => {
  const { page, limit, order_by, order_direction, name, provinceId } =
    req.query;

  let search = {
    include: [
      {
        model: Province,
        required: true,
      },
    ],
    where: { active: true },
  };

  if (name) search.where["name"] = { [Op.iLike]: `%${name}%` };
  if (provinceId) search.where["provinceId"] = provinceId;

  let order = [];
  if (order_by && order_direction) {
    order.push([order_by, order_direction]);
  }

  const transform = (records) => {
    return records.map((record) => {
      return getEducationCenterPublicInfo(record);
    });
  };

  const items = await paginate(
    EducationCenter,
    page,
    limit,
    search,
    order,
    transform
  );

  return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

const getEducationCenterById = async (req, res) => {
  const item = await EducationCenter.findByPk(req.params.id, {
    include: [
      {
        model: Province,
        required: true,
      },
      {
        model: EducationCenterContact,
        required: false,
        include: [
          {
            model: ContactType,
            required: true,
            where: { active: true },
          },
        ],
        where: { active: true },
      },
      {
        model: Career,
        required: false,
        include: [
          {
            model: ScienceArea,
            required: true,
          },
        ],
        // where: {active: true},
      },
    ],
    where: { active: true },
  });
  if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

  return standardResponse(
    responseTypes._200_SUCCESS,
    "",
    getEducationCenterPublicInfo(item.toJSON()),
    res
  );
};

const getEducationCentersAdmin = async (req, res) => {
  const { page, limit, order_by, order_direction, name, provinceId, active } =
    req.query;

  let search = {
    include: [
      {
        model: Province,
        required: true,
      },
    ],
    where: {},
  };

  if (name) search.where["name"] = { [Op.iLike]: `%${name}%` };
  if (provinceId) search.where["provinceId"] = provinceId;
  if (active) search.where = await filterActive(active, search.where);

  let order = [];
  if (order_by && order_direction) {
    order.push([order_by, order_direction]);
  }

  const transform = (records) => {
    return records.map((record) => {
      record.image = record.image
        ? `${process.env.APP_DOMAIN}/images/${record.image}`
        : null;
      record.logo = record.logo
        ? `${process.env.APP_DOMAIN}/images/${record.logo}`
        : null;
      record.rectorImage = record.rectorImage
        ? `${process.env.APP_DOMAIN}/images/${record.rectorImage}`
        : null;
      return record;
    });
  };

  const items = await paginate(
    EducationCenter,
    page,
    limit,
    search,
    order,
    transform
  );

  return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

const getEducationCenterByIdAdmin = async (req, res) => {
  const item = await EducationCenter.findByPk(req.params.id, {
    include: [
      {
        model: Province,
        required: true,
      },
      {
        model: EducationCenterContact,
        required: false,
        include: [
          {
            model: ContactType,
            required: true,
          },
        ],
      },
      {
        model: Career,
        required: false,
        include: [
          {
            model: ScienceArea,
            required: false,
          },
        ],
      },
    ],
  });
  if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);
  item.image = item.image
    ? `${process.env.APP_DOMAIN}/images/${item.image}`
    : null;
  item.logo = item.logo
    ? `${process.env.APP_DOMAIN}/images/${item.logo}`
    : null;
  item.rectorImage = item.rectorImage
    ? `${process.env.APP_DOMAIN}/images/${item.rectorImage}`
    : null;
  return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const updateEducationCenterById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.files["image"])
      await fs.unlink(
        path.resolve(IMAGES_LOCATION, req.files["image"][0].filename)
      );
    if (req.files["logo"])
      await fs.unlink(
        path.resolve(IMAGES_LOCATION, req.files["logo"][0].filename)
      );
    if (req.files["rectorImage"])
      await fs.unlink(
        path.resolve(IMAGES_LOCATION, req.files["rectorImage"][0].filename)
      );
    return standardResponse(
      responseTypes._422_UNPROCESSABLE_ENTITY,
      "",
      { errors: errors.array() },
      res
    );
  }

  const item = await EducationCenter.findByPk(req.params.id);
  if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

  const {
    description,
    shortDescription,
    globalRankingYear,
    globalRanking,
    cubanRankingYear,
    cubanRanking,
    foundationYear,
    isCertified,
    certificationLevel,
    active,
    location,
    rectorName,
  } = req.body;

  let image = item.image;
  if (req.files["image"]) {
    if (item.image) {
      await fs.unlink(path.resolve(IMAGES_LOCATION, item.image));
    }
    image = req.files["image"][0].filename;
  }

  let logo = item.logo;
  if (req.files["logo"]) {
    if (item.logo) {
      await fs.unlink(path.resolve(IMAGES_LOCATION, item.logo));
    }
    logo = req.files["logo"][0].filename;
  }

  let rectorImage = item.rectorImage;
  if (req.files["rectorImage"]) {
    if (item.rectorImage) {
      await fs.unlink(path.resolve(IMAGES_LOCATION, item.rectorImage));
    }
    rectorImage = req.files["rectorImage"][0].filename;
  }

  await item.update({
    description,
    shortDescription,
    globalRankingYear: globalRankingYear || null,
    globalRanking: globalRanking || null,
    cubanRankingYear: cubanRankingYear || null,
    cubanRanking: cubanRanking || null,
    foundationYear,
    isCertified,
    certificationLevel,
    active,
    image,
    logo,
    location: location || null,
    rectorName,
    rectorImage,
  });

  return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const cleanEducationCenterById = async (req, res) => {
  const item = await EducationCenter.findByPk(req.params.id);
  if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

  if (item.image) await fs.unlink(path.resolve(IMAGES_LOCATION, item.image));
  if (item.logo) await fs.unlink(path.resolve(IMAGES_LOCATION, item.logo));
  if (item.rectorImage)
    await fs.unlink(path.resolve(IMAGES_LOCATION, item.rectorImage));

  await item.update({
    description: null,
    shortDescription: null,
    globalRankingYear: null,
    globalRanking: null,
    cubanRankingYear: null,
    cubanRanking: null,
    foundationYear: null,
    isCertified: null,
    certificationLevel: null,
    active: false,
    image: null,
    logo: null,
    location: null,
    rectorName: null,
    rectorImage: null,
  });

  return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const cleanCareerInEducationCenter = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return standardResponse(
      responseTypes._422_UNPROCESSABLE_ENTITY,
      "",
      { errors: errors.array() },
      res
    );
  }

  const educationCenterId = req.params.id;
  const { careerId } = req.body;
  const item = await EducationCenterCareer.findOne({
    where: { careerId, educationCenterId },
  });
  if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

  await item.update({
    isCertified: null,
    certificationLevel: null,
  });

  return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const updateCareerInEducationCenter = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return standardResponse(
      responseTypes._422_UNPROCESSABLE_ENTITY,
      "",
      { errors: errors.array() },
      res
    );
  }
  const educationCenterId = req.params.id;
  const { careerId, isCertified, certificationLevel } = req.body;

  const item = await EducationCenterCareer.findOne({
    where: { careerId, educationCenterId },
  });
  if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

  await item.update({
    isCertified: isCertified,
    certificationLevel:
      certificationLevel &&
      ((typeof isCertified === "boolean" && isCertified) ||
        (typeof isCertified === "string" && isCertified === "true"))
        ? certificationLevel
        : null,
  });

  return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const createEducationCenterContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return standardResponse(
      responseTypes._422_UNPROCESSABLE_ENTITY,
      "",
      { errors: errors.array() },
      res
    );
  }

  const { educationCenterId, contactTypeId, value, category, subtype, active } =
    req.body;
  const socialContactType = await ContactType.findByPk(contactTypeId);
  const item = await EducationCenterContact.create({
    educationCenterId,
    contactTypeId,
    value,
    category,
    subtype: socialContactType.slug === contactTypes.SOCIAL ? subtype : null,
    active,
  });

  return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const updateEducationCenterContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return standardResponse(
      responseTypes._422_UNPROCESSABLE_ENTITY,
      "",
      { errors: errors.array() },
      res
    );
  }

  const item = await EducationCenterContact.findByPk(req.params.id);
  if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

  const socialContactType = await ContactType.findByPk(item.contactTypeId);
  const { contactTypeId, value, category, subtype, active } = req.body;
  await item.update({
    contactTypeId,
    value,
    category,
    subtype: socialContactType.slug === contactTypes.SOCIAL ? subtype : null,
    active,
  });

  return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const deleteEducationCenterContact = async (req, res) => {
  const item = await EducationCenterContact.findByPk(req.params.id);
  if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);
  await item.destroy();
  return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const validateEducationCenter = (method) => {
  const categories = Object.values(contactCategory);
  const subtypes = Object.values(socialTypes);
  switch (method) {
    case "updateEducationCenterById": {
      return [
        body("description").isString(),
        body("shortDescription").isString(),
        body("globalRankingYear").optional().isInt(),
        body("globalRanking").optional().isInt(),
        body("cubanRankingYear").optional().isInt(),
        body("cubanRanking").optional().isInt(),
        body("foundationYear").isInt(),
        body("isCertified").isBoolean(),
        body("certificationLevel").isString(),
        body("active").isBoolean(),
        body("location").optional().isString(),
        body("rectorName").isString(),
      ];
    }

    case "updateCareerInEducationCenter": {
      return [
        body("isCertified").exists().isBoolean(),
        body("certificationLevel").optional().isString(),
      ];
    }

    case "cleanCareerInEducationCenter": {
      return [body("careerId").exists().isInt()];
    }

    case "createEducationCenterContact": {
      return [
        body("educationCenterId").exists().isInt(),
        body("contactTypeId").exists().isInt(),
        body("value").exists().isString(),
        body("category").exists().isInt().isIn(categories),
        body("subtype").optional().isInt().isIn(subtypes),
        body("active").exists().isBoolean(),
      ];
    }

    case "updateEducationCenterContact": {
      return [
        body("contactTypeId").exists().isInt(),
        body("value").exists().isString(),
        body("category").exists().isInt().isIn(categories),
        body("subtype").optional().isInt().isIn(subtypes),
        body("active").exists().isBoolean(),
      ];
    }
  }
};

module.exports = {
  getEducationCenters,
  getEducationCenterById,
  getEducationCentersAdmin,
  getEducationCenterByIdAdmin,
  updateEducationCenterById,
  cleanEducationCenterById,
  cleanCareerInEducationCenter,
  updateCareerInEducationCenter,
  createEducationCenterContact,
  updateEducationCenterContact,
  deleteEducationCenterContact,
  validateEducationCenter,
};
