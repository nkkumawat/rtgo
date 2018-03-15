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

    var to_userid = "0R3ZYMmmq8WB24iLRoZQ8HT5Dy33" ;// dummy user id of to
    var to_username = "";
    var to_photo_gs = "";
    var to_limit = "";
    var to_user;

    receiptResponse.amount = amount;
    receiptResponse.cut = cut;
    receiptResponse.payout = payout;
    receiptResponse.processed = true;
    receiptResponse.cancelled = false;
    receiptResponse.to = to_userid;
    receiptResponse.from = from_userid;
    receiptResponse.timestamp = Number(new Date());
    receiptResponse._id = firebase.database().ref("/receipt").push().key;


    firebase.database().ref('/users/'+from_userid).once('value').then(function(user) {
        from_username = (user.val().username);
        from_photo_gs = (user.val().photo_gs);
    }).then(function () {
        firebase.database().ref('/users/'+to_userid).once('value').then(function(user1) {
            to_username = (user1.val().username);
            to_photo_gs = (user1.val().photo_gs);
            to_limit = (user1.val().limit);
            to_user = user1.val();
        }).then(function () {
            receiptResponse.from_username = from_username;
            receiptResponse.from_photo_gs = from_photo_gs;
            receiptResponse.to_username = to_username;
            receiptResponse.to_photo_gs = to_photo_gs;
            receiptResponse.message = "For session on (date of session)";
            firebase.database().ref('/receipts/'+receiptResponse._id).set(receiptResponse).then(function () {
                to_limit += 1;
               to_user.limit = to_limit;
                var update = {};
                update['/users/' + to_userid ] = to_user;
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
