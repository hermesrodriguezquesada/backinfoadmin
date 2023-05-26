const {Router} = require('express');
const router = Router();
const sigiesController = require('../controllers/sigies.controller');

//Ejemplo para ver los objetos JSON que se responden de las tablas de la BD del SIGIES
router.get('/careers', sigiesController.getCareers);
router.get('/schoolYears', sigiesController.getSchoolYears);
router.get('/nomStates', sigiesController.getNomStates);
router.get('/convocation', sigiesController.getConvocations);
router.get('/commission', sigiesController.getCommissions);
router.get('/province', sigiesController.getProvinces);
router.get('/incomeSource', sigiesController.getIncomeSources);
router.get('/ces', sigiesController.getEducationCenters);
router.get('/placePlan', sigiesController.getPlacePlans);
router.get('/gender', sigiesController.getGenders);
router.get('/prosecution', sigiesController.getProsecutions);
router.get('/placePlanCareerProsecution', sigiesController.getPlacePlanCareerProsecutions);
router.get('/modality', sigiesController.getModalities);
router.get('/student', sigiesController.getStudents);
router.get('/municipality', sigiesController.getMunicipalities);
router.get('/preuniversity', sigiesController.getPreuniversities);
router.get('/application', sigiesController.getApplications);
router.get('/careerApplication', sigiesController.getCareerApplications);
router.get('/expedientStudent', sigiesController.getExpedientStudents);
router.get('/militaryService', sigiesController.getMilitaryServices);
router.get('/examination', sigiesController.getExaminations);
router.get('/noteExpedientStudent', sigiesController.getNoteExpedientStudents);
router.get('/scienceArea', sigiesController.getScienceAreas);
router.get('/applicationByStudent/:ci', sigiesController.getApplicationStudent);
router.get('/getALlInfoStudent', sigiesController.getALlInfoStudent);

module.exports = router;
