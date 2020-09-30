

////////////////////////////////////////////////////////////////////EVENTO EXPANDIR-CONTRAER/////////////////////////////////////
//Colapsar Ventana
$("body").on("click", ".contraer", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var id = this.id.substr(this.id.length - 1)
    fn_CambiaEstado(id, "1");
});

//Expandir Ventana
$("body").on("click", ".expandir", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var id = this.id.substr(this.id.length - 1)
    fn_CambiaEstado(id, "0");
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    debugger
    var str = $("[id*=" + control + "]").val();
    var strMayus = str.toUpperCase();
    $("[id*=" + control + "]").val(strMayus);
}


function LengthCheck() {
    var dato = $("[id*=txt_mot_rech]").val();
    var long = dato.length;
  
    if (long >= 149) {
        fn_MuestraMensaje('Motivo Rechazo', "Ha alcanzado el numero de caracteres permitidos", 0);
    }
};


function fn_ImprimirOrden(Server, strFolio) {   
    var folio = strFolio.split(",");
    for (i = 0; i < folio.length; i++) {
        window.open(Server.replace('@folio', folio[i]));
    }
}