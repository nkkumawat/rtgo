var express = require('express');
var router = express.Router();
var receiptResponse = require('../model/reeceiptResponse');
var firebase = require("../model/firebaseController");
router.post('/', function(req, res, next) {
    var amount = "2000";
    var cut = "200";
    var payout = "1800";
    var from_userid = "01voDauolKX0bxocZkgU3WylMRG2";
    var from_username = "";
    var from_photo_gs = "";

    var to_userid = "06vRGAw59ebPCD8Qd6MJzRqjH4u2" ;// dummy user id of to
    var to_username = "";
    var to_photo_gs = "";
    var to_limit = "";

    receiptResponse.amount = amount;
    receiptResponse.cut = cut;
    receiptResponse.payout = payout;
    receiptResponse.processed = true;
    receiptResponse.cancelled = false;
    receiptResponse.to = to_userid;
    receiptResponse.from = from_userid;
    receiptResponse.timestamp = Number(new Date());

    firebase.database().ref('/users/'+from_userid).once('value').then(function(user) {
        from_username = (user.val().username);
        from_photo_gs = (user.val().photo_gs);
    }).then(function () {
        firebase.database().ref('/users/'+to_userid).once('value').then(function(user) {
            to_username = (user.val().username);
            to_photo_gs = (user.val().photo_gs);
            to_limit = (user.val().limit);
        }).then(function () {
            receiptResponse.from_username = from_username;
            receiptResponse.from_photo_gs = from_photo_gs;
            receiptResponse.to_username = to_username;
            receiptResponse.to_photo_gs = to_photo_gs;
            receiptResponse.message = "For session on (date of session)";
            firebase.database().ref('/recipt/' + from_userid).set(receiptResponse).then(function () {
                to_limit += 1;
                var updateLimit = {
                    limit : to_limit
                };
                var update = {};
                update['/users/' + to_userid ] = updateLimit;
                firebase.database().ref().update(update).then(function () {
                    var status = {
                        status : 1
                    };
                    res.send(status);
                }).then(function () {
                    console.log("success");
                }).catch(function(error) {
                    console.log("fail");
                });
            });
        });
    });
});

module.exports = router;
