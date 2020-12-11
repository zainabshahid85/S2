var express = require("express");
var router = express.Router();
var Course = require("../models/course");
/* GET home page. */
router.get("/", async function(req, res, next) {
    let courses = await Course.find();
    //console.log(products);
    res.render("courses/list", { title: "Our Education", courses });
});
router.get("/add", async function(req, res, next) {
    res.render("courses/add");
});
// store data in db
router.post("/add", async function(req, res, next) {
    let course = new Course(req.body);
    await course.save();
    res.redirect("/courses");
});
router.get("/delete/:id", async function(req, res, next) {
    let course = await Course.findByIdAndDelete(req.params.id);
    res.redirect("/courses");
});
router.get("/edit/:id", async function(req, res, next) {
    let course = await Course.findById(req.params.id);
    res.render("courses/edit", { course });
});
router.post("/edit/:id", async function(req, res, next) {
    let course = await Course.findById(req.params.id);
    course.name = req.body.name;
    course.Id = req.body.Id;
    course.duration = req.body.duration;
    course.fee = req.body.fee;
    await course.save();
    res.redirect("/courses");
});

module.exports = router;