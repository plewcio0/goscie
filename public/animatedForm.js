$('.nextButton').click(function() {
    guestsNumber = guestSelect.options[guestSelect.selectedIndex].value;
    var innerHtml = "";
    for (let index = 0; index < guestsNumber; index++) {
        innerHtml += `<div class="guestContainer">
        <input class="guestContainer__Name" type="text" placeholder="Imię">
        <input class="guestContainer__Name" type="text" placeholder="Nazwisko">
    </div>`
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