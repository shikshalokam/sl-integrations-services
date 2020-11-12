/**
 * name : request-tracker.js
 * author : Deepa
 * Date : 12-11-2020
 * Description : Validation for request tracker.
 */

module.exports = (req) => {

    let validator = {

        status : function () {
            req.checkParams('_id').exists().withMessage("required id")
            .isMongoId().withMessage("Invalid id");
        }

    }

    if (validator[req.params.method]) {
        validator[req.params.method]();
    }

};