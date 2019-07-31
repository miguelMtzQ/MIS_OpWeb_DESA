function startDateShort() {
    var f = new Date();
    var control = document.getElementById('lbl_fecha')
    if (control != undefined) {
        control.innerHTML = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    }
    
}

function startTime() {
    today = new Date();
    h = today.getHours();
    m = today.getMinutes();
    s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);

    var control = document.getElementById('lbl_hora')

    if (control != undefined) {
        control.innerHTML = h + ":" + m + ":" + s;
    }
    t = setTimeout('startTime()', 500);

    startDateShort();
}

function checkTime(i)
{ if (i < 10) { i = "0" + i; } return i; }



window.onload = function () { startTime(); }