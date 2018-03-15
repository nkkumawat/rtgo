var express = require('express');
var router = express.Router();
var firebase = require("../model/firebaseController");
router.post('/', function(req, res, next) {
    var userId = req.body.userId;
    var updatedBalance = {
        user_id : userId,
        balance_panding: 25,
        balance_available : 21
    };
    var updateBalance = {};
    updateBalance['/user' + userId ] = updatedBalance;
    //              Update Existing
    firebase.database().ref().update(updateBalance).then(function () {
        var status = {
            status : 1
        };
        res.send(status);
    }).catch(function(error) {
        var status = {
            status : -1,
            message: "Not Updated"
        };
        res.send(status);
    });

    //                  Insert New
    /*

    firebase.database().ref('/users' + userId).set(updatedBalance).then(function () {
        var status = {
            status : 1
        };
        res.send(status);
    }).catch(function(error) {
        var status = {
            status : -1,
            message: "Not Updated"
        };
        res.send(status);
    });

    */

});

module.exports = router;
