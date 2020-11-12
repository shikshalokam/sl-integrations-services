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
            req.checkBody('School_Code').exists().withMessage("required School_Code");
            req.checkBody('School_Name').exists().withMessage("required School_Name");
            req.checkBody('UDISE_Code').exists().withMessage("required UDISE_Code");
            req.checkBody('District_Code').exists().withMessage("required District_Code");
            req.checkBody('Tehsil_Code').exists().withMessage("required Tehsil_Code");
            req.checkBody('Cluster_Code').exists().withMessage("required Cluster_Code");
            req.checkBody('Pin_Code').exists().withMessage("required Pin_Code");
        },

        updateEntity : function () {
            req.checkParams('id').exists().withMessage("required entityId")
            req.checkBody(Object.keys(req.body)).isEmpty().withMessage("request body is required");
        },

        createUser : function () {
            req.checkBody('Faculty_Name').isEmpty().withMessage("required Faculty_Name");
            req.checkBody('Email_Id').isEmpty().withMessage("required Email_Id");
            req.checkBody('Mobile_No').isEmpty().withMessage("required Mobile_No");
            req.checkBody('FacultyInfo_Code').isEmpty().withMessage("required FacultyInfo_Code");
            req.checkBody('School_Code_Current').isEmpty().withMessage("required School_Code_Current");
            req.checkBody('School_Code').isEmpty().withMessage("required School_Code");
            req.checkBody('Faculty_Name').isEmpty().withMessage("required Faculty_Name");
        },

        updateUser : function () {
            req.checkParams('id').exists().withMessage("required entityId")
            req.checkBody(Object.keys(req.body)).isEmpty().withMessage("request body is required");
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