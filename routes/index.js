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

router.post("/login", async function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  if (await login(email,password)){
      res.cookie("user", email);
      res.redirect("/");
  }
  else{
      res.status(500).send("Email or Password is wrong");
  }
});
router.post("/logout", function(req, res) {
  res.clearCookie("user");
  res.redirect("/");
});

module.exports = router