////////////////////////////////////////////////////////////////////EVENTO EXPANDIR-CONTRAER/////////////////////////////////////

//Colapsar Ventana
$("body").on("click", ".contraer", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var id = this.id.replace('coVentana', '');
    fn_CambiaEstado(id, "1");
});

//Expandir Ventana
$("body").on("click", ".expandir", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var id = this.id.replace('exVentana', '');
    fn_CambiaEstado(id, "0");
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("body").on("click", "[id*=gvd_Monitor] .Folio", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var row = $(this).closest("tr");
    var Folio = row.find('.Folio');
    window.open("Gestion.aspx?Folio=" + Folio[0].text, "Folio" + Folio[0].text);
});




$("body").on("click", ".AgregaOficina", function () {
    fn_CargaCatalogo("Suc", "", "", "Unica", "txt_ClaveOfi|txt_SearchOfi", "OFICINAS");
});

$("body").on("click", ".AgregaResponsable", function () {
    fn_CargaCatalogo("Utc", "", "", "Unica", "txt_ClaveResp|txt_SearchResp", "USUARIOS");
});

//Detecta la clase Agregar Agrupador y abre el Catalogo
$("body").on("click", ".AgregaAgrupadores", function () {
    var strSel = fn_ElementosSeleccionados($("[id*=gvd_Agrupador]"), $('[id*=lbl_ClaveAgr]'), $('[id*=chk_SelAgr]'), false);

    //*************fn_CargaCatalogo(PrefijoCatalogo,Condicion,Seleccion,TipoSeleccion,IdGrid,Titulo)***************
    fn_CargaCatalogo("Agr", "", strSel, "Multiple", "gvd_Agrupador", "AGRUPADORES");
});

//Detecta la clase Agregar Broker y abre el Catalogo
$("body").on("click", ".AgregaProducto", function () {
    //var strSel = fn_ElementosSeleccionados($("[id*=gvd_Producto]"), $('[id*=lbl_ClavePro]'), $('[id*=chk_SelPro]'), false);

    //*************fn_CargaCatalogo(PrefijoCatalogo,Condicion,Seleccion,TipoSeleccion,IdGrid,Titulo)***************
    fn_CargaCatalogo("Ram", "", "", "Multiple", "gvd_Ramo", "RAMOS");
});

//Detecta la clase Agregar Broker y abre el Catalogo
$("body").on("click", ".AgregaBroker", function () {
    var strSel = fn_ElementosSeleccionados($("[id*=gvd_Broker]"), $('[id*=lbl_ClaveBro]'), $('[id*=chk_SelBro]'), false);

    //*************fn_CargaCatalogo(PrefijoCatalogo,Condicion,Seleccion,TipoSeleccion,IdGrid,Titulo)***************
    fn_CargaCatalogo("Bro", "", strSel, "Multiple", "gvd_Broker", "INTERMEDIARIOS");
});

$("body").on("click", ".AgregaCia", function () {
    var strSel = fn_ElementosSeleccionados($("[id*=gvd_Compañia]"), $('[id*=lbl_ClaveCia]'), $('[id*=chk_SelCia]'), false);

    //*************fn_CargaCatalogo(PrefijoCatalogo,Condicion,Seleccion,TipoSeleccion,IdGrid,Titulo)***************
    fn_CargaCatalogo("Cia", "", strSel, "Multiple", "gvd_Compañia", "REASEGURADORES");
});




////////////////////////////////////////////////////////////////////EVENTOS BORRA CATALOGO//////////////////////////////////////
//Delete event handler.
$("body").on("click", "[id*=gvd_Agrupador] .Delete", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var row = $(this).closest("tr");
    $('[id*=chk_SelAgr]')[row[0].rowIndex - 1].value = "true";
    row.hide();
    return false;
});

//Delete event handler.
$("body").on("click", "[id*=gvd_Broker] .Delete", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var row = $(this).closest("tr");
    $('[id*=chk_SelBro]')[row[0].rowIndex - 1].value = "true";
    row.hide();
    return false;
});

//Delete event handler.
$("body").on("click", "[id*=gvd_Compañia] .Delete", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var row = $(this).closest("tr");
    $('[id*=chk_SelCia]')[row[0].rowIndex - 1].value = "true";
    row.hide();
    return false;
});

//Delete event handler.
$("body").on("click", "[id*=gvd_Ramo] .Delete", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var row = $(this).closest("tr");
    $('[id*=chk_SelRam]')[row[0].rowIndex - 1].value = "true";
    row.hide();
    return false;
});




//Responsable
$("body").on("keydown", "[id$=txt_SearchResp]", function (e) {
    fn_Autocompletar("Utc", "txt_ClaveResp", "txt_SearchResp", "", 0, e.which)
});

$("body").on("focusout", "[id$=txt_SearchResp]", function () {
    if ($(this)[0].value == '') {
        $("input[id$='txt_ClaveResp']")[0].value = ''
    }
    fn_EvaluaAutoComplete('txt_ClaveResp', 'txt_SearchResp');
});

$("body").on("focus", "[id$=txt_SearchResp]", function () {
    fn_Autocompletar("Utc", "txt_ClaveResp", "txt_SearchResp", "", 0, -1)
    $(this).trigger({
        type: "keydown",
        which: 46
    });
});



//Oficina
$("body").on("keydown", "[id$=txt_SearchOfi]", function (e) {
    if (e.which == 9) {
        $("input[id$='txt_ClaveTag']").focus();
        return false;
    }
    fn_Autocompletar("Suc", "txt_ClaveOfi", "txt_SearchOfi", "", 0, e.which)
});

$("body").on("focusout", "[id$=txt_SearchOfi]", function () {
    if ($(this)[0].value == '') {
        $("input[id$='txt_ClaveOfi']")[0].value = ''
    }
    fn_EvaluaAutoComplete('txt_ClaveOfi', 'txt_SearchOfi');
});

$("body").on("focus", "[id$=txt_SearchOfi]", function () {
    fn_Autocompletar("Suc", "txt_ClaveOfi", "txt_SearchOfi", "", 0, -1)
    $(this).trigger({
        type: "keydown",
        which: 46
    });
});


//Asegurado
$("body").on("keydown", "[id$=txt_SearchAse]", function (e) {
    fn_Autocompletar("Ase", "txt_ClaveAseg", "txt_SearchAse", "", 3, e.which)
});

$("body").on("focusout", "[id$=txt_SearchAse]", function (e) {
    if ($(this)[0].value == '') {
        $("input[id$='txt_ClaveAseg']")[0].value = ''
    }
    fn_EvaluaAutoComplete('txt_ClaveAseg', 'txt_SearchAse');
});