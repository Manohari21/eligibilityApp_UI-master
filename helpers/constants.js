const ELIGIBILITY_SERVICE_URL = process.env.ELIGIBILITY_SERVICE_URL || "http://localhost:8080/getBenefits";
const POLICY_SERVICE_URL = process.env.POLICY_SERVICE_URL || "http://localhost:8080/getAllPolicies";
const POLICY_DETAILS_URL = process.env.POLICY_DETAILS_URL || "http://localhost:8080/getPolicyDetails";
const ENROLLMENT_SERVICE_URL = process.env.ENROLLMENT_SERVICE_URL || "http://localhost:8080/enrollment";
const LOG_LEVEL = process.env.LOG_LEVEL || "info";

module.exports = { ELIGIBILITY_SERVICE_URL, POLICY_SERVICE_URL, POLICY_DETAILS_URL, ENROLLMENT_SERVICE_URL, LOG_LEVEL }