// var db = firebase.firestore();
// var zaproszeniRef = db.collection("Zaproszeni");

// zaproszeniRef.doc("M.Kac").set({
//     imie: "Milena",
//     Nazwisko: "Kacprowicz",
//     prefRosol: false,
//     prefKrem: true,
// });


var ui = new firebaseui.auth.AuthUI(firebase.auth());

firebase.auth().useDeviceLanguage();

setTimeout(function() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': function(response) {
            console.log("success", response);
            var phoneNumber = '+48663570786';
            var appVerifier = window.recaptchaVerifier;
            firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                .then(function(confirmationResult) {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    window.confirmationResult = confirmationResult;
                    document.querySelector('#clickMe').addEventListener('click', () => {
                        var code = document.querySelector('#ddd').value;
                        confirmationResult.confirm(code).then(function(result) {
                            // User signed in successfully.
                            var user = result.user;
                            // ...
                        }).catch(function(error) {
                            // User couldn't sign in (bad verification code?)
                            // ...
                        });
                    })
                }).catch(function(error) {
                    // Error; SMS not sent
                    // ...
                });
        },
        'expired-callback': function() {
            console.log("expired-callback");
        }
    });

    recaptchaVerifier.render().then(function(widgetId) {
        window.recaptchaWidgetId = widgetId;
    });
}, 2000);