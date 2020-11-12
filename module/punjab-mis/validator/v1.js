/**
 * name : punjab-mis.js
 * author : Aman
 * Date : 20-03-2020
 * Description : Validation for punjab mis.
 */

module.exports = (req) => {

    let validator = {

        createEntity : function () {
            req.checkQuery('entityType').exists().withMessage("required entityType");
            req.checkBody(Object.keys(req.body)).isEmpty().withMessage("request body is required");
        },

        updateEntity : function () {
            req.checkBody('entityId').exists().withMessage("required entityId");
            req.checkBody('entityType').exists().withMessage("required entityType");
            req.checkBody('metaInformation').exists().withMessage("required metaInformation");
        },

        getObservationStatus : function () {
            req.checkBody('entityId').exists().withMessage("required entityId");
            req.checkBody('staffId').exists().withMessage("required staffId");
            req.checkBody('solutionExternalId').exists().withMessage("required solutionExternalId");
        }

    }

    if (validator[req.params.method]) {
        validator[req.params.method]();
    }

};