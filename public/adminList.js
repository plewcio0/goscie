// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var list = [];


function CreateList(guest) {
    if (guest.zKim == null) {
        if (guest.czyPrzyjdzie == "Tak") {
            list.push(`<div class="przyjdzie">${guest["Imie"]} ${guest["Nazwisko"]}</div>`)
        } else if (guest.czyPrzyjdzie == "Nie") {
            list.push(`<div class="niePrzyjdzie">${guest["Imie"]} ${guest["Nazwisko"]}</div>`)
        } else {
            list.push(`<div>${guest["Imie"]} ${guest["Nazwisko"]}</div>`)
        }
    } else {
        if (guest.czyPrzyjdzie == "Tak") {
            list.push(`<div class="przyjdzie">${guest["Imie"]} ${guest["Nazwisko"]} (${guest.zKim})</div>`)
        } else if (guest.czyPrzyjdzie == "Nie") {
            list.push(`<div class="niePrzyjdzie">${guest["Imie"]} ${guest["Nazwisko"]} (${guest.zKim})</div>`)
        } else {
            list.push(`<div>${guest["Imie"]} ${guest["Nazwisko"]} (${guest.zKim})</div>`)
        }
    }
}

db.collection("Invited")
    .onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (doc.data().czyPrzyjdzie == "Tak") {
                UpdateList("Tak", doc.data());
            } else if (doc.data().czyPrzyjdzie == "Nie") {
                UpdateList("Nie", doc.data());
            }
        });
    });


function UpdateList(czy, kto) {
    var x;
    if (kto.zKim == null) {
        x = `${kto.Imie} ${kto.Nazwisko}`;
    } else {
        x = `${kto.Imie} ${kto.Nazwisko} (${kto.zKim})`;
    }
    $(list).each(function (ind, elem) {
        console.log(elem);
    })
    $('.container').find('*').each((ind, elem) => {
        if (elem.innerText == x) {
            if (czy == "Tak") {
                elem.className = '';
                elem.classList.add('przyjdzie');
            } else if (czy == "Nie") {
                elem.className = '';
                elem.classList.add('niePrzyjdzie');
            }
        }
    })
}



document.querySelector('.Loguj').addEventListener('click', () => {
    var login = $('.login__input').val();
    var haslo = $('.haslo__input').val();
    console.log(login)
    console.log(haslo)
    Zaloguj(login, haslo);
})

function ClearList() {
    invitedRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(doc => {
            doc.ref.update({
                czyPrzyjdzie: firebase.firestore.FieldValue.delete()
            })
        });
    })
}

function Zaloguj(login, haslo) {
    firebase.auth().signInWithEmailAndPassword(login, haslo).catch(function (err) {
        console.log('error loggin')
    })
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
        console.log('logged');
        $('.container').empty();
        invitedRef
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    console.log(doc.id, " => ", doc.data());
                    CreateList(doc.data());
                });
                $('.container').append(list);
                $('.container').append(`<button class="clearGuests--js">Wyczyść liste</button>`);
                document.querySelector('.clearGuests--js').addEventListener('click', () => {
                    ClearList();
                })
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    } else {
        console.log('not logged');
        // User is signed out.
        // ...
    }
});