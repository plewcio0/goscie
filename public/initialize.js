const auth = firebase.auth();
var db = firebase.firestore();
var zaproszeniRef = db.collection("zOsobamiTowarzyszacymi");
var invitedRef = db.collection("Invited");