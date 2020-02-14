$('.nextButton').click(function() {
    guestsNumber = guestSelect.options[guestSelect.selectedIndex].value;
    var innerHtml = "";
    for (let index = 0; index < guestsNumber; index++) {
        if (index == guestsNumber-1)
        {
            innerHtml += `<div class="guestContainer">
            <div class="nameContainer">
            <input class="guestContainer__Name" type="text" placeholder="Imię">
            </div>
            <div class="nameContainer">
            <input class="guestContainer__Name" type="text" placeholder="Nazwisko">
            </div>
            <div class="ask">
            <span>Czy potwierdzasz obecność?</span>
            <select id="guestChoice" class="guestChoice">
            <option class="guestSelect" value="Tak">Tak, będę!</option>
            <option class="guestSelect" value="Nie">Niestety, nie mogę.</option>
          </select>
          </div>
        </div>`
        }
        
        else
        {
            innerHtml += `<div class="guestContainer">
            <div class="nameContainer">
            <input class="guestContainer__Name" type="text" placeholder="Imię">
            </div>
            <div class="nameContainer">
            <input class="guestContainer__Name" type="text" placeholder="Nazwisko">
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
        $(this).fadeTo(600, 1);
    });
});