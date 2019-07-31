function startDate() {
    var months = new makeArray('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var yy = date.getYear();
    var year = (yy < 1000) ? yy + 1900 : yy;
    document.getElementById('lbl_fecha').innerHTML = day + " de " + months[month] + " del " + year;
}

function makeArray() {
    for (i = 0; i < makeArray.arguments.length; i++)
        this[i + 1] = makeArray.arguments[i];
}

function startTime() {
    today = new Date();
    h = today.getHours();
    m = today.getMinutes();
    s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('lbl_hora').innerHTML = h + ":" + m + ":" + s;
    t = setTimeout('startTime()', 500);
}

function checkTime(i)
{ if (i < 10) { i = "0" + i; } return i; }
window.onload = function () { startTime(); startDate(); }
