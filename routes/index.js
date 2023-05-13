var express = require('express');
var router = express.Router();
const {login} = require('../models/user_model')
router.get('/', function(req, res, next) {
    res.render('index');
  });
  
router.get('/schedulemaster', (req, res, next) => {
    res.render('ScheduleMaster')
})

router.get('/StudyPlanner', (req, res, next) => {
    res.render('StudyPlanner')
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