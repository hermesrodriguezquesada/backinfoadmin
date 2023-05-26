const {Router} = require('express');
const router = Router();

const studentController = require('../controllers/student.controller');

router.get('/', studentController.getStudents);

router.get('/:ci', studentController.getStudentsByCi);

router.get('/notes/:ci', studentController.getNotesByStudentsByCi);

module.exports = router;
