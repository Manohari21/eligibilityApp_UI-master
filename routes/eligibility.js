const express = require("express");
const axios = require("axios").default;
let router = express.Router();
const { ELIGIBILITY_SERVICE_URL } = require("../helpers/constants");
const logger = require("../helpers/logger");

router.get("/", function (req, res, next) {
    return res.render("eligibilityCheck/index.ejs");
});

router.post("/", function (req, res, next) {
    let subscriberId = req.body.subscriberId;
    let policyId = req.body.policyId;
    let dependentId = req.body.dependentId;
    logger.info(`SubscriberID: ${subscriberId}, PolicyID: ${policyId}, DependentID: ${dependentId}`);
    const errorMessage = "Unable to proceed";
    if (!subscriberId || !policyId || !dependentId) {
        logger.error("Incorrect values received from UI. SubscriberID, PolicyID, DependentID not found.");
        return res.send({ code: 400, message: errorMessage });
    }
    return axios.get(ELIGIBILITY_SERVICE_URL, { params: { subscriberId: subscriberId, policyId: policyId, dependentId: dependentId } })
        .then(function (success) {
            let isEligible = success.data.eligible;
            let message = isEligible ? `Subscriber: ${success.data.subscriberId} is eligibile` :
                `Subscriber: ${success.data.subscriberId} is not eligibile`;
            if (dependentId == "00") {
                logger.info("Subscriber Eligibility Check: " + subscriberId);
            } else {
                message = isEligible ? `Dependent ${dependentId} is eligibile` : `Dependent ${dependentId} is not eligible`;
                logger.info("Dependent Eligibility Check: " + dependentId);
            }
            logger.info(`Success! Status Message: ${message}`);
            return res.send({ code: success.status, message: message });
        })
        .catch(function (error) {
            logger.error("Received error: " + error);
            logger.debug(error.response);
            if (error.response.status >= 500) {
                logger.error("Server error encountered");
                logger.error("Status: " + error.response.status);
                logger.error("Error Message: " + error.response.data);
                logger.error(error);
                return res.send({ code: 500, message: errorMessage });
            } else {
                logger.debug(error.response.status);
                logger.debug(error.response.data.errorCode);
                logger.debug(error.response.data.errorMessage)
                return res.send({ code: error.response.status, message: "Please check Subscriber ID, Policy ID, and Dependent ID." });
            }
        });
});

module.exports = router;