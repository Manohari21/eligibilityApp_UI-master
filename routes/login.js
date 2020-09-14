var express = require('express');
var router = express.Router();
var axios = require("axios");
const { LOGIN_SERVICE_URL } = require("../helpers/constants");
const logger = require("../helpers/logger");

router.get('/', (req, res) => {
    logger.info("Login Page requested");
    res.render('login.ejs');
});


router.post('/validate', (req, res) => {
    logger.info("Validate page requested");
    var errormessage = 'Invalid Username/password';
    let url = LOGIN_SERVICE_URL+`?name=${req.body.username}`;
    logger.info(url);
    axios.get(url).then(function (response) {
        logger.info("Fetching user details from: " + url);
        const status = response.status;
        if (status != 200) {
            logger.error("Status is not 200");
            logger.error("Error message: " + response.data);
            throw Error("Unable to continue, status received: " + status);
        }
        const data = response.data;
        if (data.name == req.body.username && data.password == req.body.password) {
            logger.info("Successfully authenticated username: " + data.name);
            //logger.info("role " + data.role)
            // if (data.role == "user") {
                res.render('homepage.ejs', { username: req.body.username,userid: data.id});
            // } else if (data.role == "admin") {
            //     res.render('admin_homepage.ejs', { username: req.body.username,userid: data.id });
            // }
        }
        else {
            logger.info("Unable to log in username: " + data.name);
            res.render('login.ejs', { errormessage: errormessage });
        }
    }).catch(function (error) {
        logger.error(`Error: ${error.message}`);
    });
});

module.exports = router;