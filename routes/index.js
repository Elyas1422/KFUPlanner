var express = require('express');
var router = express.Router();
const {login} = require('../models/user_model');
const {getAllCourses, getCourse} = require('../models/courses');
router.get('/', function(req, res, next) {
    res.render('index');
  });
  
router.get('/schedulemaster', (req, res, next) => {
    res.render('ScheduleMaster')
})

router.get('/StudyPlanner', async (req, res, next) => {
    let courses = await getAllCourses();
    courses = courses.slice(0, 5)
    res.render('StudyPlanner', {courses: courses})
})

router.get('/StudyPlanner/:code', async (req, res, next) => {
    let course = req.params.code
    course = await getCourse(course)
    res.send(course)
})

router.get('/StudyClock', (req, res, next) => {
    res.render('StudyClock')
})

router.post("/login", function(req, res) {
    
    const username = req.body.email;
    const password = req.body.password;
    console.log(login(username, password))
    res.send('Success')
});

router.post("/signup", function(req, res) {
    
    const username = req.body.email;
    const password = req.body.password;
    console.log(username, password)
    res.send('Success')
});

module.exports = router