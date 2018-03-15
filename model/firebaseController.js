var firebase = require('firebase');

firebase.initializeApp({
    databaseURL: 'https://intern-ba1de.firebaseio.com/',
    serviceAccount: 'google-service.json'
});

module.exports = firebase;