var list = [];
invitedRef
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
            CreateList(doc.data());
        });
        $('.container').append(list);

    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

function CreateList(guest) {
        list.push(`<div>${guest["Imie"]} ${guest["Nazwisko"]}</div>`)
}


db.collection("Invited")
    .onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (doc.data().czyPrzyjdzie == "Tak") {
                UpdateList("Tak",doc.data());
            } else if (doc.data().czyPrzyjdzie == "Nie") {
                UpdateList("Nie",doc.data());
            }
        });
    });


function UpdateList(czy, kto) {
    var x = `${kto.Imie} ${kto.Nazwisko}`;
    $('.container').find('*').each((ind, elem) => {
        if (elem.innerText == x)
        {
            if (czy == "Tak")
            {
                elem.className = '';
                elem.classList.add('przyjdzie');
            } else if (czy == "Nie")
            {
                elem.className = '';
                elem.classList.add('niePrzyjdzie');
            }
        }
    })
}