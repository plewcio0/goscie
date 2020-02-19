var object = [];
var listaGosciZOsobami = [];
var counter;
invitedRef.where("zOsoba", "==", true)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(document => {
            listaGosciZOsobami.push(`${document.data().Imie} ${document.data().Nazwisko}`)
        });

    })
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
        <div class="buttonContainer"><div class="operationStatus"></div><button class="nextButton2">Dalej</button></div>
    </div>`);
        $(this).fadeTo(600, 1, function() {
            //

            $('.guestContainer__Name').on('input', (e) => {
                if (e.target.classList.contains('wrong')) {
                    e.target.classList.remove('wrong');
                }
            })
            $('.nextButton2').click(function() {
                $('.guestContainer__Name').removeClass('wrong');
                // po kliknieciu w przycisk
                var guestsContainer = $(this).parent().prevAll(".guestsContainer");
                if (CheckIfEmpty(guestsContainer)) {
                    console.log("pustka gdziess")
                } else {
                    $('.operationStatus').html('');
                    $('.operationStatus').css("display", "block");
                    var invitedGuest = CheckIfSomeoneIsOnTheList(guestsContainer, listaGosciZOsobami);
                    if (invitedGuest.length == 1) {
                        ConfirmGuestWIthSomeone(guestsContainer, invitedGuest)
                    } else {
                        ConfirmGuests(guestsContainer)
                    }
                }

            })
        });

    });

});


function ShowSummaryContainer(guestsContainer) {
    var innerHTML = '';
    $(guestsContainer).children('.guestContainer').each(function(index, element) {
        var imie = $(element).children(":first").children().val().trim().capitalize();
        var nazwisko = $(element).children(":first").next().children().val().trim().capitalize();
        var choice = $(element).children(".ask").children('#guestChoice').val();
        object.push([`${imie} ${nazwisko}`, choice]);
        if (choice == "Tak") {
            innerHTML += `<div style="color:darkgreen;" class="summaryListContainer__guest"><span class="guest__Data">${imie} ${nazwisko}</span><i class="fas fa-check fa-fw"></i></div>`
        } else if (choice == "Nie") {
            innerHTML += `<div style="color:darkred;"  class="summaryListContainer__guest"><span class="guest__Data">${imie} ${nazwisko}</span><i class="fas fa-times fa-fw"></i></div>`
        }
    })
    localStorage.setItem()
    $('.container').fadeTo(600, 0, function() {
        $(this).delay(600);
        $(this).html(`        <div class="wrapper3">
        <div class="header" id="dashboard" role="alert">
            <h1 class="headerHead">Dziękujemy za potwierdzenie!</h1>
        </div>
        <div class="mapContainer">
        <span class="mapContainer__header">Mapa dojazdu</span>
        <iframe class="mapa" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4822.188773503775!2d17.8609276!3d52.8206625!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470361e4d3c17a89%3A0x135059415e719ac1!2sO%C5%9Brodek%20Wypoczynkowy%20Wiktorowo!5e0!3m2!1spl!2spl!4v1582111557593!5m2!1spl!2spl" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
        </div>
        <div class="summaryListContainer">
        <span class="summaryListContainer__header">Potwiedzeni goście</span>
        <div class="confirmedGuestContainer">
        ${innerHTML}
        </div>
        </div>

    </div>`);
        $(this).fadeTo(600, 1);
    });
}



function CheckIfSomeoneIsOnTheList(guestsContainer, listaGosciZOsobami) {
    var lista = [];
    $(guestsContainer).children('.guestContainer').each(function(index, element) {
        var imie = $(element).children(":first").children().val().trim().capitalize();
        var nazwisko = $(element).children(":first").next().children().val().trim().capitalize();
        lista.push(`${imie} ${nazwisko}`)
    })
    return lista.filter(value => -1 !== listaGosciZOsobami.indexOf(value))
}


function ConfirmGuestWIthSomeone(guestsContainer, invitedGuest) {
    counter = 0;
    $(guestsContainer).children('.guestContainer').each(function(index, element) {
        var imie = $(element).children(":first").children().val().trim().capitalize();
        var nazwisko = $(element).children(":first").next().children().val().trim().capitalize();
        var choice = $(element).children(".ask").children('#guestChoice').val();
        if (`${imie} ${nazwisko}` == invitedGuest[0]) {
            invitedRef.where("Imie", "==", imie).where("Nazwisko", "==", nazwisko)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        invitedRef.doc(doc.id).update({
                            czyPrzyjdzie: choice
                        }).then(() => {
                            console.log("Potwierdziłeś swoje przybycie z osobą towarzyszącą");
                            counter++;
                            if (counter == guestsNumber) {
                                ShowSummaryContainer(guestsContainer);
                            }
                        }).catch((err) => {
                            console.log("Nie udało się potwierdzić przybycia z osobą towarzyszącą");
                        })
                    })
                })
                .catch(function(err) {
                    console.log(err)
                })
        } else {
            invitedRef.doc().set({
                    Imie: imie,
                    Nazwisko: nazwisko,
                    czyPrzyjdzie: choice,
                    zKim: invitedGuest[0]
                })
                .then(() => {
                    console.log("Potwierdzono przybycie osoby towarzyszącej");
                    counter++;
                    if (counter == guestsNumber) {
                        ShowSummaryContainer(guestsContainer);
                    }
                })
                .catch((err) => {
                    console.log("Nie udalo sie potwierdzić przybycia osoby towarzyszacej");
                    console.log(err);
                })
        }
    })
}


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

function ConfirmGuests(guestsContainer) {
    counter = 0;
    $(guestsContainer).children('.guestContainer').each(function(index, element) {
        var imie = $(element).children(":first").children().val().trim();
        var nazwisko = $(element).children(":first").next().children().val().trim();
        var choice = $(element).children(".ask").children('#guestChoice').val();
        invitedRef.where("Imie", "==", imie.capitalize()).where("Nazwisko", "==", nazwisko.capitalize())
            .get()
            .then(function(querySnapshot) {
                if (querySnapshot.empty) {
                    console.log("Nie ma Cię w naszej bazie!");
                    $('.operationStatus').html('<div class="zleDane">Wprowadzono niepoprawne dane.</div>').delay(2500).fadeOut('slow');
                    $(element).children(":first").children().addClass('wrong');
                    $(element).children(":first").next().children().addClass('wrong');
                } else {
                    querySnapshot.forEach(function(doc) {
                        invitedRef.doc(doc.id).update({
                            czyPrzyjdzie: choice
                        }).then(() => {
                            console.log("Potwierdziłeś swoje przybycie")
                            counter++;
                            if (counter == guestsNumber) {
                                ShowSummaryContainer(guestsContainer);
                            }
                        }).catch((err) => {
                            console.log("Nie udało się potwierdzić")
                            console.log(err)
                        })
                    });
                }
            })
            .catch(function(err) {
                console.log(err)
            })
    })
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}