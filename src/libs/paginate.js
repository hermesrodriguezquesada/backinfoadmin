const paginate = async (model, pageSize, pageLimit, search = {}, order = [], transform) => {
    try {
        const limit = parseInt(pageLimit, 10) || 10;
        const page = parseInt(pageSize, 10) || 1;

        // creando un objeto opcion
        let options = {
            offset: getOffset(page, limit),
            limit: limit,
        };

        // chequear que el objeto no este vacio
        if (Object.keys(search).length) {
            options = {...options, ...search};
        }

        // chequear que la orden no esta vacia
        if (order && order.length) {
            options['order'] = order;
        }

        // optiene el modelo y la opcion
        let {count, rows} = await model.findAndCountAll(options);

        // check if the transform is a function and is not null
        if (transform && typeof transform === 'function') {
            rows = transform(rows);
        }

        return {
            previousPage: getPreviousPage(page),
            currentPage: page,
            nextPage: getNextPage(page, limit, count),
            total: count,
            limit: limit,
            data: rows
        }
    } catch (error) {
        console.log(error);
    }
};

const getOffset = (page, limit) => {
    return (page * limit) - limit;
};

const getNextPage = (page, limit, total) => {
    if ((total / limit) > page) {
        return page + 1;
    }

    return null
};

const getPreviousPage = (page) => {
    if (page <= 1) {
        return null
    }
    return page - 1;
};

module.exports = {
    paginate
};
