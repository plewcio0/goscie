var weddingDate = new Date(2020, 9, 4, 16, 0, 0, 0);
var timer = document.querySelector('.timer');
var guestsNumber;
var guestSelect = document.querySelector('#guests');
timer.innerHTML = dhm(weddingDate - Date.now());

setInterval(() => {
    timer.innerHTML = dhm(weddingDate - Date.now());
}, 1000 * 60);

if ($('.nextButton').length) {
    document.querySelector('.nextButton').addEventListener('click', () => {
        guestsNumber = guestSelect.options[guestSelect.selectedIndex].value;
    })
}

function dhm(t) {
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor((t - d * cd) / ch),
        m = Math.round((t - d * cd - h * ch) / 60000),
        pad = function(n) { return n < 10 ? '0' + n : n; };
    if (m === 60) {
        h++;
        m = 0;
    }
    if (h === 24) {
        d++;
        h = 0;
    }
    return `${d} dni ${pad(h)} godzin ${pad(m)} minut`
}