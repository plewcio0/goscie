var list = [];
invitedRef
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
            CreateList(doc.data());
        });
        $('.container').append(list);

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

function CreateList(guest) {
    if (guest.zKim == null) {
        list.push(`<div>${guest["Imie"]} ${guest["Nazwisko"]}</div>`)
    } else {
        list.push(`<div>${guest["Imie"]} ${guest["Nazwisko"]} (${guest.zKim})</div>`)
    }
}


db.collection("Invited")
    .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
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

document.querySelector('.clearGuests--js').addEventListener('click', () => {
    ClearList();
})

function ClearList() {
    invitedRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(doc => {
            doc.ref.update({
                czyPrzyjdzie: firebase.firestore.FieldValue.delete()
            })
        });
    })
}