

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

//Detecta la clase Agregar Compañia y abre el Catalogo
$("body").on("click", ".AgregaCia", function () {
    var strSel = fn_ElementosSeleccionados($("[id*=gvd_Compañia]"), $('[id*=lbl_ClaveCia]'), $('[id*=chk_SelCia]'), false);

    //*************fn_CargaCatalogo(PrefijoCatalogo,Condicion,Seleccion,TipoSeleccion,IdGrid,Titulo)***************
    fn_CargaCatalogo("Cia", "", strSel, "Multiple", "gvd_Compañia", "COMPAÑIAS");
});

//Asegurado
$("body").on("keydown", "[id$=txt_SearchAse]", function (e) {
     fn_Autocompletar("Ase", "txt_ClaveAseg", "txt_SearchAse", "", 3, e.which)
});

