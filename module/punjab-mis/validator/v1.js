/**
 * name : punjab-mis.js
 * author : Aman
 * Date : 20-03-2020
 * Description : Validation for punjab mis.
 */

module.exports = (req) => {

    let validator = {

        updateEntity : function () {
            req.checkBody('entityId').exists().withMessage("required entity id");
            req.checkBody('entityType').exists().withMessage("required entity type");
        }

    }

    if (validator[req.params.method]) {
        validator[req.params.method]();
    }

};