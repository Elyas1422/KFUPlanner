var express = require('express');
var router = express.Router();
const {login, getAllUsers, getUser} = require('../models/user_model')
router.get('/', async function(req, res, next) {
    var userEmail = req.cookies.user;
    var user= await getUser(userEmail);
    if (user) {
      // User is logged in, show logout button and user email
      res.render("index", { user: user });
    } else {
      // User is not logged in, show login button
      res.render("index", { user: null });
    }
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

router.post("/login", async function(req, res) {
    const email = req.body.email;
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