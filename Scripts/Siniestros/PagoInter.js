﻿
//$("body").on('focusout', '[id*=txt_nro_op]', function (e) {

//    texto = $("[id*=txt_nro_op]").val()

//    $("[id*=txt_nro_op_ini]").val(texto)    

//});

//$("body").on('focusout', '[id*=txt_nro_op_ini]', function (e) {

//    texto = $("[id*=txt_nro_op_ini]").val()

//    $("[id*=txt_nro_op]").val(texto)

//});



function soloNumeros(e) {
    var key;
    if (window.event) // IE
    {
        key = e.keyCode;
    }
    else if (e.which) // Netscape/Firefox/Opera
    {
        key = e.which;
    }

    if (key < 48 || key > 57) {
        return false;
    }
    return true;
}


function convMayusculas(control) {
    var str = $("[id*=" + control + "]").val();
    var strMayus = str.toUpperCase();
    $("[id*=" + control + "]").val(strMayus);
}


function nroOPdesde(control) {
    if (control == 'txt_nro_op') {
        var op = $("[id*=" + control + "]").val();
        $("[id*=txt_nro_op_ini]").val(op);
    }
    
    
    
}