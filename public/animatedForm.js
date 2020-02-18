$('.nextButton').click(function() {
    guestsNumber = guestSelect.options[guestSelect.selectedIndex].value;
    var innerHtml = "";
    for (let index = 0; index < guestsNumber; index++) {
        if (index == guestsNumber - 1) {
            innerHtml += `<div class="guestContainer">
            <div class="nameContainer">
            <input class="guestContainer__Name" type="text" placeholder="Imię" id="imie${index}">
            </div>
            <div class="nameContainer">
            <input class="guestContainer__Name" type="text" placeholder="Nazwisko" id="nazwisko${index}">
            </div>
            <div class="ask">
            <span>Czy potwierdzasz obecność?</span>
            <select id="guestChoice" class="guestChoice">
            <option class="guestSelect" value="Tak">Tak, będę!</option>
            <option class="guestSelect" value="Nie">Niestety, nie mogę.</option>
          </select>
          </div>
        </div>`
        } else {
            innerHtml += `<div class="guestContainer">
            <div class="nameContainer">
            <input class="guestContainer__Name" type="text" placeholder="Imię" id="imie${index}">
            </div>
            <div class="nameContainer">
            <input class="guestContainer__Name" type="text" placeholder="Nazwisko" id="nazwisko${index}">
            </div>
            <div class="ask">
            <span>Czy potwierdzasz obecność?</span>
            <select id="guestChoice" class="guestChoice">
            <option class="guestSelect" value="Tak">Tak, będę!</option>
            <option class="guestSelect" value="Nie">Niestety, nie mogę.</option>
          </select>
          </div>
        </div><hr class="guestLine">`
        }
    }
    $('.container').fadeTo(600, 0, function() {
        $(this).delay(600);
        $(this).html(`        <div class="wrapper2">
        <div class="header" id="dashboard" role="alert">
            <h1 class="headerHead"> Uzupełnij dane</h1>
        </div>

        <div class="guestsContainer">
            ${innerHtml}
        </div>
        <hr>
        <div class="buttonContainer"><button class="nextButton2">Dalej</button></div>
    </div>`);
        $(this).fadeTo(600, 1, function() {
            //
            $('.guestContainer__Name').on('input', (e) => {
                if (e.target.classList.contains('wrong')) {
                    e.target.classList.remove('wrong');
                }
            })
            $('.nextButton2').click(function() {
                // po kliknieciu w przycisk
                var sss = $(this).parent();
                var guestsContainer = $(this).parent().prevAll(".guestsContainer")
                if (CheckIfEmpty(guestsContainer)) {
                    console.log("pustka gdziess")
                } else {
                    // if (guestcontainers.contains(ListaOsobZOsobami)) -- jak jest ktos z nieznanych
                    // else if  -- jak wszyscy znani
                    //  dorobic
                }
            })
        });

    });

});

function CheckIfEmpty(guestsContainer) {
    var empty = false;
    $(guestsContainer).children('.guestContainer').each(function(index, element) {
        $(element).children('.nameContainer').each(function(index, element) {
            if ($(element).children().val() == "") {
                $(element).children().addClass('wrong');
                empty = true;
            }
        })
    })
    return empty;
}

// function CheckIfEmpty() {
//     $('.guestContainer').each(function(index) {
//         var im = $(this).children(":first").children();
//         var nz = $(this).children(":first").next().children();
//         if (im.val() == "") { //imie
//             im.addClass('wrong');
//         }
//         if (nz.val() == "") { //nazwisko
//             nz.addClass('wrong');
//         } else { // jesli oba pola na imie i nazwisko nie są puste \/
//             var choice = $(this).children('.ask').children('#guestChoice').val(); // sprawdzenie czy wybral tak czy nie
//             AddConfirmedGuest(im.val(), nz.val(), choice);
//         }
//     })

// }


function AddConfirmedGuest(im, nz, czy) {
    invitedRef.where("Imie", "==", im.capitalize()).where("Nazwisko", "==", nz.capitalize())
        .get()
        .then(function(querySnapshot) {
            if (querySnapshot.empty) {
                console.log("nie ma cie w bazie")
            } else {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    invitedRef.doc(doc.id).update({
                        czyPrzyjdzie: czy
                    })
                });
            }

        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
}


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}