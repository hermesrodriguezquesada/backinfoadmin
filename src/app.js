const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cron = require('node-cron');
const pkg = require('../package.json');

const errorHandler = require('./middlewares/errorHandler');
const {sync} = require('./controllers/sync.controller');

require('./database');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const newsRoutes = require('./routes/news.routes');
const contactRoutes = require('./routes/contact.routes');
const provincialCommissionRoutes = require('./routes/provincialCommission.routes');
const careerRoutes = require('./routes/career.routes');
const educationCenterRoutes = require('./routes/educationCenter.routes');
const testRoutes = require('./routes/test.routes');
const statisticsRoutes = require('./routes/statistics.routes');
const provinceRoutes = require('./routes/province.routes');
const incomeSourcesRoutes = require('./routes/incomeSources.routes');
const scienceAreaRoutes = require('./routes/scienceArea.routes');
const crontaskLogRoutes = require('./routes/crontaskLog.routes');
const activeProcessRoutes = require('./routes/activeProcess.routes');
const sigiesRoutes = require('./routes/sigies.routes');
const syncRoutes = require('./routes/sync.routes');
const studentRoutes = require('./routes/student.routes');
const sectionRoutes = require('./routes/section.routes');
const entranceExamScheduleRoutes = require('./routes/entranceExamSchedule.routes');
const teleclassScheduleRoutes = require('./routes/teleclassSchedule.routes');
const subjectRoutes = require('./routes/subject.routes');
const announcementRoutes = require('./routes/announcement.routes');
const channelRoutes = require('./routes/channel.routes');
const adminCareerRoutes = require('./routes/admin/career.routes');
const adminEducationCenterRoutes = require('./routes/admin/educationCenter.routes');
const adminNewsRoutes = require('./routes/admin/news.routes');
const adminRoleRoutes = require('./routes/admin/role.routes');
const adminContactTypeRoutes = require('./routes/admin/contactType.routes');
const adminUserRoutes = require('./routes/admin/user.routes');
const adminPermissionRoutes = require('./routes/admin/permissions.routes');
const adminContactRoutes = require('./routes/admin/contact.routes');
const adminProvincialCommissionRoutes = require('./routes/admin/provincialCommission.routes');
const adminSectionRoutes = require('./routes/admin/section.routes');
const adminEntranceExamScheduleRoutes = require('./routes/admin/entranceExamSchedule.routes');
const adminTeleclassScheduleRoutes = require('./routes/admin/teleclassSchedule.routes');
const placePlanRoutes = require('./routes/placePlan.routes');

const {config} = require("dotenv");
config();

const app = express();
const cors = require('cors');
  
app.use(cors());

app.set('pkg', pkg);

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/provincial-commission', provincialCommissionRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/education-center', educationCenterRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/province', provinceRoutes);
app.use('/api/incomeSource', incomeSourcesRoutes);
app.use('/api/scienceArea', scienceAreaRoutes);
app.use('/api/crontaskLog', crontaskLogRoutes);
app.use('/api/activeProcess', activeProcessRoutes);
app.use('/api/sigies', sigiesRoutes);
app.use('/api/sync', syncRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/section', sectionRoutes);
app.use('/api/entrance-exam-schedule', entranceExamScheduleRoutes);
app.use('/api/teleclass-schedule', teleclassScheduleRoutes);
app.use('/api/subject', subjectRoutes);
app.use('/api/announcement', announcementRoutes);
app.use('/api/channel', channelRoutes);
app.use('/api/admin/career', adminCareerRoutes);
app.use('/api/admin/education-center', adminEducationCenterRoutes);
app.use('/api/admin/news', adminNewsRoutes);
app.use('/api/admin/role', adminRoleRoutes);
app.use('/api/admin/contact-type', adminContactTypeRoutes);
app.use('/api/admin/user', adminUserRoutes);
app.use('/api/admin/permission', adminPermissionRoutes);
app.use('/api/admin/contact', adminContactRoutes);
app.use('/api/admin/provincial-commission', adminProvincialCommissionRoutes);
app.use('/api/admin/section', adminSectionRoutes);
app.use('/api/admin/entrance-exam-schedule', adminEntranceExamScheduleRoutes);
app.use('/api/admin/teleclass-schedule', adminTeleclassScheduleRoutes);
app.use('/api/place-plan', placePlanRoutes);
// Only for internal tests
app.use('/api/test', testRoutes);

// error handler
app.use(errorHandler);

// ┌────────────── second (optional)
// │ ┌──────────── minute
// │ │ ┌────────── hour
// │ │ │ ┌──────── day of month
// │ │ │ │ ┌────── month
// │ │ │ │ │ ┌──── day of week
// │ │ │ │ │ │
// │ │ │ │ │ │
// * * * * * *

// */5 * * * * * // 0 4 * * * // */60 * * * * 1 hora prueba
// const task = cron.schedule(process.env.SCHEDULE_SYNC, sync, {
//     scheduled: false
// });
// task.start();

module.exports = app;
