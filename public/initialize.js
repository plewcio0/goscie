var db = firebase.firestore();
var zaproszeniRef = db.collection("zOsobamiTowarzyszacymi");
var invitedRef = db.collection("Invited");

if (true) {
    var html = `<div class="selectContainer">
    <div class="selectContainer__guestsNumber">Ile osób potwierdzasz?</div>
    <div class="selectContainer__selectGuest">
        <select id="guests" class="guests">
            <option class="guestSelect" value="1">1</option>
            <option class="guestSelect" value="2">2</option>
            <option class="guestSelect" value="3">3</option>
            <option class="guestSelect" value="4">4</option>
            <option class="guestSelect" value="5">5</option>
          </select>
    </div>
</div>
<hr>
<div class="buttonContainer"><button class="nextButton">Dalej</button></div>`
    $(html).insertBefore(".footer");
} else {
    var html = `<div class="wrapper3">
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
    </div>
    </div>
</div>`
    $(html).insertBefore(".footer");
}