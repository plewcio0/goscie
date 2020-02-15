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
    if (guest["czyPrzyjdzie"] == "Tak") {
        list.push(`<div class="przyjdzie">${guest["Imie"]} ${guest["Nazwisko"]}</div>`)
    } else if (guest["czyPrzyjdzie"] == "Nie") {
        list.push(`<div class="niePrzyjdzie">${guest["Imie"]} ${guest["Nazwisko"]}</div>`)
    } else {
        list.push(`<div class="nieWiadomo">${guest["Imie"]} ${guest["Nazwisko"]}</div>`)
    }
}