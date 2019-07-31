////////////////////////////////////////////////////////////////////EVENTO EXPANDIR-CONTRAER/////////////////////////////////////

function PageLoadFacultativos() {
    fn_EstadoGridSaldos('Nac');
    fn_EstadoGridSaldos('Dll');
    LeftClick    = 0;
    LeftClickNac = 0;
    LeftClickDll = 0;
    if ($('.TotalNac')[0] != undefined) {
        $('.TotalNac')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_TotalNac]')[0].value), 2)
        $('.TotalDll')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_TotalDll]')[0].value), 2)
    }
    fn_EstadoFilas('gvd_GrupoPolizas', false);

    fn_EstadoGridCampos('gvd_Generales');
    fn_EstadoGridCampos('gvd_Reaseguro');
    fn_EstadoGridCampos('gvd_Garantias');
    fn_EstadoGridCampos('gvd_Montos');

    fn_EstadoGridCampos('gvd_Campos');
    fn_EstadoGridCampos('gvd_Filas');
    fn_EstadoGridCampos('gvd_Valores');
}

var LeftClick    = 0;
var LeftClickNac = 0;
var LeftClickDll = 0;




$("body").on("focus", ".Seleccion", function () {
    fn_Seleccion($(this)[0]);
});

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

////maximizar Ventana
//$("body").on("click", ".maximizar", function () {
//    event.preventDefault ? event.preventDefault() : event.returnValue = false;
//    var id = this.id.substr(this.id.length - 1)
//    fn_Maximizar(id);
//});

////restaurar Ventana
//$("body").on("click", ".restaurar", function () {
//    event.preventDefault ? event.preventDefault() : event.returnValue = false;
//    var id = this.id.substr(this.id.length - 1)
//    fn_Restaurar(id);
//});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////EVENTOS AGREGA CATALOGO/////////////////////////////////////
//Detecta la clase Agregar Broker y abre el Catalogo
$("body").on("click", ".AgregaBroker", function () {
    var strSel = fn_ElementosSeleccionados($("[id*=gvd_Broker]"), $('[id*=lbl_ClaveBro]'), $('[id*=chk_SelBro]'), false);

    //*************fn_CargaCatalogo(PrefijoCatalogo,Condicion,Seleccion,TipoSeleccion,IdGrid,Titulo)***************
    fn_CargaCatalogo("Bro", "", strSel, "Multiple", "gvd_Broker", "BROKERS");
});

//Detecta la clase Agregar Compañia y abre el Catalogo
$("body").on("click", ".AgregaCia", function () {
    var strSel = fn_ElementosSeleccionados($("[id*=gvd_Compañia]"), $('[id*=lbl_ClaveCia]'), $('[id*=chk_SelCia]'), false);

    //*************fn_CargaCatalogo(PrefijoCatalogo,Condicion,Seleccion,TipoSeleccion,IdGrid,Titulo)***************
    fn_CargaCatalogo("Cia", "", strSel, "Multiple", "gvd_Compañia", "COMPAÑIAS");
});

$("body").on("click", ".AgregaRamoCont", function () {
    var strSel = fn_ElementosSeleccionados($("[id*=gvd_RamoContable]"), $('[id*=lbl_ClaveRamC]'), $('[id*=chk_SelRamC]'), true);
    fn_CargaCatalogo("RamC", "", strSel, "Multiple", "gvd_RamoContable", "RAMOS CONTABLES");
});

$("body").on("click", ".AgregaProducto", function () {
    var strSel = fn_ElementosSeleccionados($("[id*=gvd_Producto]"), $('[id*=lbl_ClavePro]'), $('[id*=chk_SelPro]'), true);
    fn_CargaCatalogo("Pro", "", strSel, "Multiple", "gvd_Producto", "PRODUCTOS");
});

$("body").on("click", ".AgregaUsuario", function () {
    var strSel = fn_ElementosSeleccionados($("[id*=gvd_Usuario]"), $('[id*=lbl_ClaveUsu]'), $('[id*=chk_SelUsu]'), true);
    fn_CargaCatalogo("Usu", "", strSel, "Multiple", "gvd_Usuario", "USUARIOS");
});

$("body").on("click", ".AgregaEstatus", function () {
    var strSel = fn_ElementosSeleccionados($("[id*=gvd_Estatus]"), $('[id*=lbl_ClaveEst]'), $('[id*=chk_SelEst]'), true);
    fn_CargaCatalogo("Est", "", strSel, "Multiple", "gvd_Estatus", "ESTATUS");
});

$("body").on("click", ".AgregaContrato", function () {
    var Condicion = "";

    //Fechas de Vigencia
    if ($("input[id$='txt_FechaDe']")[0].value.length == 10) {
        var Fecha1 = $("input[id$='txt_FechaDe']")[0].value;
        FechaDe = Fecha1.substring(6, 10) + Fecha1.substring(3, 5) + Fecha1.substring(0, 2);
        Condicion = " AND fecha_fac >= ====" + FechaDe + "====";
    }

    if ($("input[id$='txt_FechaA']")[0].value.length == 10) {
        var Fecha2 = $("input[id$='txt_FechaA']")[0].value;
        FechaA = Fecha2.substring(6, 10) + Fecha2.substring(3, 5) + Fecha2.substring(0, 2);
        Condicion = Condicion + " AND fecha_fac <= ====" + FechaA + "====";
    }


    var Brks = '-1';
    if ($("[id*=gvd_Broker]")[0] != undefined) {
        var Rows = $("[id*=gvd_Broker]")[0].rows;
        for (i = 0; i <= Rows.length - 2; i++) {
            if ($('[id*=chk_SelBro]')[i].value != "true") {
                Brks = Brks + ',' + $('[id*=lbl_ClaveBro]')[i].innerText;
            }
        }
    }

    if (Brks != '-1') {
        Condicion = Condicion + ' AND mr.cod_broker IN (' + Brks + ')'
    }

    var Cias = '-1';
    if ($("[id*=gvd_Compañia]")[0] != undefined) {
        var Rows = $("[id*=gvd_Compañia]")[0].rows;
        for (i = 0; i <= Rows.length - 2; i++) {
            if ($('[id*=chk_SelCia]')[i].value != "true") {
                Cias = Cias + ',' + $('[id*=lbl_ClaveCia]')[i].innerText;
            }
        }
    }

    if (Cias != '-1') {
        Condicion = Condicion + ' AND mr.cod_cia IN (' + Cias + ')'
    }

    if (Condicion.length == 0) {
        Condicion = "====";
    }
    else {
        Condicion = "==" + Condicion + "==";
    }

    var strSel = fn_ElementosSeleccionados($("[id*=gvd_Contrato]"), $('[id*=lbl_ClaveFac]'), $('[id*=chk_SelFac]'), true);
    fn_CargaCatalogo("Fac", Condicion , strSel, "Multiple", "gvd_Contrato", "FACULTATIVOS");
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////EVENTOS BORRA CATALOGO//////////////////////////////////////
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
$("body").on("click", "[id*=gvd_RamoContable] .Delete", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var row = $(this).closest("tr");
    $('[id*=chk_SelRamC]')[row[0].rowIndex - 1].value = "true";
    row.hide();
    return false;
});

//Delete event handler.
$("body").on("click", "[id*=gvd_Producto] .Delete", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var row = $(this).closest("tr");
    $('[id*=chk_SelPro]')[row[0].rowIndex - 1].value = "true";
    row.hide();
    return false;
});

//Delete event handler.
$("body").on("click", "[id*=gvd_Usuario] .Delete", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var row = $(this).closest("tr");
    $('[id*=chk_SelUsu]')[row[0].rowIndex - 1].value = "true";
    row.hide();
    return false;
});

//Delete event handler.
$("body").on("click", "[id*=gvd_Estatus] .Delete", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var row = $(this).closest("tr");
    $('[id*=chk_SelEst]')[row[0].rowIndex - 1].value = "true";
    row.hide();
    return false;
});

//Delete event handler.
$("body").on("click", "[id*=gvd_Contrato] .Delete", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var row = $(this).closest("tr");
    $('[id*=chk_SelFac]')[row[0].rowIndex - 1].value = "true";
    row.hide();
    return false;
});

//Delete event handler.
$("body").on("click", "[id*=gvd_Poliza] .Delete", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var row = $(this).closest("tr");
    $('[id*=chk_SelPol]')[row[0].rowIndex - 1].value = "true";
    row.hide();
    return false;
});

//Delete event handler.
$("body").on("click", "[id*=gvd_Asegurado] .Delete", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var row = $(this).closest("tr");
    $('[id*=chk_SelAse]')[row[0].rowIndex - 1].value = "true";
    row.hide();
    return false;
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                           EVENTOS KEYDOWN


$("body").on("keydown", "[id$=txtSearchAse]", function (e) {
   
    if (e.which != 13) {
        $("input[id$='hidClaveAse']")[0].value = "";
    }

    $('[id$=txtSearchAse]').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "../LocalServices/ConsultaBD.asmx/GetAsegurado",
                data: "{ 'prefix': '" + request.term + "'}",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split('|')[0],
                            val: item.split('|')[1]
                        }
                    }))
                },
                error: function (response) {
                    EvaluaMensaje('JSON', response.responseText);
                },
            });
        },
        select: function (e, i) {
            $("input[id$='hidClaveAse']")[0].value = i.item.val;
        },
        minLength: 1
    });
});


//-----------------------------------------------------------------------------------------------------------------------------
$("body").on("click", "[id*=gvd_SaldosNac] .Seleccion", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var row = $(this).closest("tr");
    if ($('[id*=txt_SelNac]')[row[0].rowIndex].value == "0") {
        $(this).css("background-color", "lightgreen");
        $('[id*=txt_SelNac]')[row[0].rowIndex].value = "1"

        $('[id*=txt_TotalNac]')[0].value = parseFloat($('[id*=txt_TotalNac]')[0].value) + parseFloat($('[id*=txt_ImpNac]')[row[0].rowIndex].value);
        $('.TotalNac')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_TotalNac]')[0].value), 2)
    }
    else {
        $(this).css("background-color", "white");
        $('[id*=txt_SelNac]')[row[0].rowIndex].value = "0"

        $('[id*=txt_TotalNac]')[0].value = parseFloat($('[id*=txt_TotalNac]')[0].value) - parseFloat($('[id*=txt_ImpNac]')[row[0].rowIndex].value);
        $('.TotalNac')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_TotalNac]')[0].value), 2)
    }
});

$("body").on("mousedown", "[id*=gvd_SaldosNac] .Seleccion", function (e) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    if (e.which == 1) {
        LeftClickNac = 1;
    }
});

$("body").on("mouseup", "[id*=gvd_SaldosNac] .Seleccion", function (e) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    LeftClickNac = 0;
});

$("body").on("mouseover", "[id*=gvd_SaldosNac] .Seleccion", function (e) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    if (e.which == 1 && LeftClickNac == 1) {
        var row = $(this).closest("tr");
        if ($('[id*=txt_SelNac]')[row[0].rowIndex].value == "0") {
            $(this).css("background-color", "lightgreen");
            $('[id*=txt_SelNac]')[row[0].rowIndex].value = "1"
            $('[id*=txt_TotalNac]')[0].value = parseFloat($('[id*=txt_TotalNac]')[0].value) + parseFloat($('[id*=txt_ImpNac]')[row[0].rowIndex].value);
            $('.TotalNac')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_TotalNac]')[0].value), 2)
        } 
    }
});





$("body").on("click", "[id*=gvd_SaldosDll] .Seleccion", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var row = $(this).closest("tr");
    if ($('[id*=txt_SelDll]')[row[0].rowIndex].value == "0") {
        $(this).css("background-color", "lightgreen");
        $('[id*=txt_SelDll]')[row[0].rowIndex].value = "1"

        $('[id*=txt_TotalDll]')[0].value = parseFloat($('[id*=txt_TotalDll]')[0].value) + parseFloat($('[id*=txt_ImpDll]')[row[0].rowIndex].value);
        $('.TotalDll')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_TotalDll]')[0].value), 2)
    }
    else {
        $(this).css("background-color", "white");
        $('[id*=txt_SelDll]')[row[0].rowIndex].value = "0"

        $('[id*=txt_TotalDll]')[0].value = parseFloat($('[id*=txt_TotalDll]')[0].value) - parseFloat($('[id*=txt_ImpDll]')[row[0].rowIndex].value);
        $('.TotalDll')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_TotalDll]')[0].value), 2)
    }
});

$("body").on("mousedown", "[id*=gvd_SaldosDll] .Seleccion", function (e) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    if (e.which == 1) {
        LeftClickDll = 1;
    }
});

$("body").on("mouseup", "[id*=gvd_SaldosDll] .Seleccion", function (e) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    LeftClickDll = 0;
});

$("body").on("mouseover", "[id*=gvd_SaldosDll] .Seleccion", function (e) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    if (e.which == 1 && LeftClickDll == 1) {
        var row = $(this).closest("tr");
        if ($('[id*=txt_SelDll]')[row[0].rowIndex].value == "0") {
            $(this).css("background-color", "lightgreen");
            $('[id*=txt_SelDll]')[row[0].rowIndex].value = "1"

            $('[id*=txt_TotalDll]')[0].value = parseFloat($('[id*=txt_TotalDll]')[0].value) + parseFloat($('[id*=txt_ImpDll]')[row[0].rowIndex].value);
            $('.TotalDll')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_TotalDll]')[0].value), 2)
        }
    }
});




function fn_EstadoGridSaldos(Sufijo) {
    $("[id*=gvd_Saldos" + Sufijo  + "] tr").each(function (e) {
        var row = $(this).closest("tr");
        if ($('[id*=txt_Sel' + Sufijo + ']')[row[0].rowIndex] != undefined) {
            if ($('[id*=txt_Sel' + Sufijo + ']')[row[0].rowIndex].value == "1") {
                var Seleccion = row.find('.Seleccion');
                $(Seleccion).css("background-color", "lightgreen");
            }
        }
    });
}

$("body").on("click", ".VerResumen", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    fn_AbrirModalSimple('#Resumen');
});

//Descripción de Asegurado
$("body").on("focusout", "[id$=txt_SearchAse]", function (e) {
    fn_EvaluaAutoComplete('txt_ClaveAseg', 'txt_SearchAse');
});

//Asegurado
$("body").on("keydown", "[id$=txt_SearchAse]", function (e) {
    fn_Autocompletar("Ase", "txt_ClaveAseg", "txt_SearchAse", "", 3, e.which)
});

//Busqueda de Facultativo por Clave
$("body").on("focusout", "[id*=gvd_Contrato] .Id_Contrato", function (e) {
    var row = $(this).closest("tr");
    var Id = $(this)[0].value;
    Contrato = row.find('.Contrato');

    if (Id == '') {
        Contrato[0].value = '';
    }
    else {
        $.ajax({
            url: "../LocalServices/ConsultaBD.asmx/GetFacultativo",
            data: "{ 'Id': '" + Id + "'}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                Contrato[0].value = data.d;
            },
            error: function (response) {
                fn_MuestraMensaje('JSON', response.responseText, 2);
            },
        });
    }
});

$("body").on("click", "[id*=gvd_ListaGarantias] .TodaGarantia", function (e) {
    if ($(this)[0].childNodes[0].checked == true) {
        $("input[id$='hid_Todo']")[0].value = 1;
        $("input[id$='hid_Cambio_Todo']")[0].value = 1;
        $("input[id$='hid_Cambio_Ninguno']")[0].value = 0;
    }
    else {
        $("input[id$='hid_Todo']")[0].value = 0;
        $("input[id$='hid_Cambio_Todo']")[0].value = 0;
        $("input[id$='hid_Cambio_Ninguno']")[0].value = 1;
    }
});

$("body").on("click", "[id*=gvd_ListaGarantias] .Garantia", function (e) {
    if ($(this)[0].childNodes[0].checked == false) {
        $("input[id$='hid_Todo']")[0].value = 0;
        $("input[id$='hid_Cambio_Todo']")[0].value = 0;
        $("input[id$='hid_Cambio_Ninguno']")[0].value = 0;

        var TodaGarantia = $("[id*=gvd_ListaGarantias]").find('.TodaGarantia');
        $(TodaGarantia)[0].childNodes[0].checked = false;
    }
});


$("body").on("click", "[id*=gvd_GrupoPolizas] .Mostrar", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var row = $(this).closest("tr");
    var Ventana = row.find('.Ventana');
    var Estado = row.find('.Estado');

    Estado[0].value = 0;
    Ventana.slideToggle();

    $(this).hide();

    var Ocultar = row.find('.Ocultar');
    Ocultar.show();
});

$("body").on("click", "[id*=gvd_GrupoPolizas] .Ocultar", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var row = $(this).closest("tr");
    var Ventana = row.find('.Ventana');
    var Estado = row.find('.Estado');

    Estado[0].value = 1;
    Ventana.slideToggle();

    $(this).hide();

    var Ocultar = row.find('.Mostrar');
    Ocultar.show();
});


$("body").on("click", "[id*=gvd_Distribucion] .Seleccion", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var row = $(this).closest("tr");
    if ($('[id*=txt_Sel]')[row[0].rowIndex].value == "0") {
        $(this).css("background-color", "lightgreen");
        $('[id*=txt_Sel]')[row[0].rowIndex].value = "1"



        $('[id*=txt_DSumaAsegurada]')[0].value = parseFloat($('[id*=txt_DSumaAsegurada]')[0].value) + parseFloat($("[id*=gvd_Distribucion]").find("[id*=txt_SumaAsegurada]")[row[0].rowIndex].value);
        $('[id*=lbs_SumaAsegurada]')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_DSumaAsegurada]')[0].value), 2)

        $('[id*=txt_DSumaCedida]')[0].value = parseFloat($('[id*=txt_DSumaCedida]')[0].value) + parseFloat($("[id*=gvd_Distribucion]").find("[id*=txt_SumaCedida]")[row[0].rowIndex].value);
        $('[id*=lbs_SumaCedida]')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_DSumaCedida]')[0].value), 2)

        $('[id*=txt_DSumaRetenida]')[0].value = parseFloat($('[id*=txt_DSumaRetenida]')[0].value) + parseFloat($("[id*=gvd_Distribucion]").find("[id*=txt_SumaRetenida]")[row[0].rowIndex].value);
        $('[id*=lbs_SumaRetenida]')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_DSumaRetenida]')[0].value), 2)

        $('[id*=txt_DPrimaNeta]')[0].value = parseFloat($('[id*=txt_DPrimaNeta]')[0].value) + parseFloat($("[id*=gvd_Distribucion]").find("[id*=txt_PrimaNeta]")[row[0].rowIndex].value);
        $('[id*=lbs_PrimaNeta]')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_DPrimaNeta]')[0].value), 2)

        $('[id*=txt_DPrimaCedida]')[0].value = parseFloat($('[id*=txt_DPrimaCedida]')[0].value) + parseFloat($("[id*=gvd_Distribucion]").find("[id*=txt_PrimaCedida]")[row[0].rowIndex].value);
        $('[id*=lbs_PrimaCedida]')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_DPrimaCedida]')[0].value), 2)

        $('[id*=txt_DPrimaRetenida]')[0].value = parseFloat($('[id*=txt_DPrimaRetenida]')[0].value) + parseFloat($("[id*=gvd_Distribucion]").find("[id*=txt_PrimaRetenida]")[row[0].rowIndex].value);
        $('[id*=lbs_PrimaRetenida]')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_DPrimaRetenida]')[0].value), 2)

        $('[id*=txt_DComisiones]')[0].value = parseFloat($('[id*=txt_DComisiones]')[0].value) + parseFloat($("[id*=gvd_Distribucion]").find("[id*=txt_Comisiones]")[row[0].rowIndex].value);
        $('[id*=lbs_Comisiones]')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_DComisiones]')[0].value), 2)

        

    }
    else {
        $(this).css("background-color", "white");
        $('[id*=txt_Sel]')[row[0].rowIndex].value = "0"


        $('[id*=txt_DSumaAsegurada]')[0].value = parseFloat($('[id*=txt_DSumaAsegurada]')[0].value) - parseFloat($("[id*=gvd_Distribucion]").find("[id*=txt_SumaAsegurada]")[row[0].rowIndex].value);
        $('[id*=lbs_SumaAsegurada]')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_DSumaAsegurada]')[0].value), 2)

        $('[id*=txt_DSumaCedida]')[0].value = parseFloat($('[id*=txt_DSumaCedida]')[0].value) - parseFloat($("[id*=gvd_Distribucion]").find("[id*=txt_SumaCedida]")[row[0].rowIndex].value);
        $('[id*=lbs_SumaCedida]')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_DSumaCedida]')[0].value), 2)

        $('[id*=txt_DSumaRetenida]')[0].value = parseFloat($('[id*=txt_DSumaRetenida]')[0].value) - parseFloat($("[id*=gvd_Distribucion]").find("[id*=txt_SumaRetenida]")[row[0].rowIndex].value);
        $('[id*=lbs_SumaRetenida]')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_DSumaRetenida]')[0].value), 2)

        $('[id*=txt_DPrimaNeta]')[0].value = parseFloat($('[id*=txt_DPrimaNeta]')[0].value) - parseFloat($("[id*=gvd_Distribucion]").find("[id*=txt_PrimaNeta]")[row[0].rowIndex].value);
        $('[id*=lbs_PrimaNeta]')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_DPrimaNeta]')[0].value), 2)

        $('[id*=txt_DPrimaCedida]')[0].value = parseFloat($('[id*=txt_DPrimaCedida]')[0].value) - parseFloat($("[id*=gvd_Distribucion]").find("[id*=txt_PrimaCedida]")[row[0].rowIndex].value);
        $('[id*=lbs_PrimaCedida]')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_DPrimaCedida]')[0].value), 2)

        $('[id*=txt_DPrimaRetenida]')[0].value = parseFloat($('[id*=txt_DPrimaRetenida]')[0].value) - parseFloat($("[id*=gvd_Distribucion]").find("[id*=txt_PrimaRetenida]")[row[0].rowIndex].value);
        $('[id*=lbs_PrimaRetenida]')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_DPrimaRetenida]')[0].value), 2)

        $('[id*=txt_DComisiones]')[0].value = parseFloat($('[id*=txt_DComisiones]')[0].value) - parseFloat($("[id*=gvd_Distribucion]").find("[id*=txt_Comisiones]")[row[0].rowIndex].value);
        $('[id*=lbs_Comisiones]')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_DComisiones]')[0].value), 2)
    }
});

$("body").on("mousedown", "[id*=gvd_Distribucion] .Seleccion", function (e) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    if (e.which == 1) {
        LeftClick = 1;
    }
});

$("body").on("mouseup", "[id*=gvd_Distribucion] .Seleccion", function (e) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    LeftClick = 0;
});

$("body").on("mouseover", "[id*=gvd_Distribucion] .Seleccion", function (e) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    if (e.which == 1 && LeftClick == 1) {
        var row = $(this).closest("tr");
        if ($('[id*=txt_Sel]')[row[0].rowIndex].value == "0") {
            $(this).css("background-color", "lightgreen");
            $('[id*=txt_Sel]')[row[0].rowIndex].value = "1"

            $('[id*=txt_DSumaAsegurada]')[0].value = parseFloat($('[id*=txt_DSumaAsegurada]')[0].value) + parseFloat($("[id*=gvd_Distribucion]").find("[id*=txt_SumaAsegurada]")[row[0].rowIndex].value);
            $('[id*=lbs_SumaAsegurada]')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_DSumaAsegurada]')[0].value), 2)

            $('[id*=txt_DSumaCedida]')[0].value = parseFloat($('[id*=txt_DSumaCedida]')[0].value) + parseFloat($("[id*=gvd_Distribucion]").find("[id*=txt_SumaCedida]")[row[0].rowIndex].value);
            $('[id*=lbs_SumaCedida]')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_DSumaCedida]')[0].value), 2)

            $('[id*=txt_DSumaRetenida]')[0].value = parseFloat($('[id*=txt_DSumaRetenida]')[0].value) + parseFloat($("[id*=gvd_Distribucion]").find("[id*=txt_SumaRetenida]")[row[0].rowIndex].value);
            $('[id*=lbs_SumaRetenida]')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_DSumaRetenida]')[0].value), 2)

            $('[id*=txt_DPrimaNeta]')[0].value = parseFloat($('[id*=txt_DPrimaNeta]')[0].value) + parseFloat($("[id*=gvd_Distribucion]").find("[id*=txt_PrimaNeta]")[row[0].rowIndex].value);
            $('[id*=lbs_PrimaNeta]')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_DPrimaNeta]')[0].value), 2)

            $('[id*=txt_DPrimaCedida]')[0].value = parseFloat($('[id*=txt_DPrimaCedida]')[0].value) + parseFloat($("[id*=gvd_Distribucion]").find("[id*=txt_PrimaCedida]")[row[0].rowIndex].value);
            $('[id*=lbs_PrimaCedida]')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_DPrimaCedida]')[0].value), 2)

            $('[id*=txt_DPrimaRetenida]')[0].value = parseFloat($('[id*=txt_DPrimaRetenida]')[0].value) + parseFloat($("[id*=gvd_Distribucion]").find("[id*=txt_PrimaRetenida]")[row[0].rowIndex].value);
            $('[id*=lbs_PrimaRetenida]')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_DPrimaRetenida]')[0].value), 2)

            $('[id*=txt_DComisiones]')[0].value = parseFloat($('[id*=txt_DComisiones]')[0].value) + parseFloat($("[id*=gvd_Distribucion]").find("[id*=txt_Comisiones]")[row[0].rowIndex].value);
            $('[id*=lbs_Comisiones]')[0].innerText = fn_FormatoMonto(parseFloat($('[id*=txt_DComisiones]')[0].value), 2)
        }
    }
});

//$("body").on("click", "[id*=gvd_OrdenPago] .btnCuenta", function (e) {
//    event.preventDefault ? event.preventDefault() : event.returnValue = false;
//    //var row = $(this).closest("tr").closest("tr").closest("tr").closest("tr");

//    var row = $(this).parent().parent().closest("tr");


//    $("input[id$='hid_indice_cta']")[0].value = row[0].rowIndex - 1;

//    var Moneda = row.find('.Moneda');
//    var Persona = row.find('.Persona');

//    var Condicion = ' WHERE id_persona = ' + Persona[0].value + ' AND cod_moneda = ' + Moneda[0].value
//    fn_CargaCatalogo("Cta", Condicion, "", "Unica", "", "Cuentas Bancarias");
//});


$("body").on("click", ".btnSelCuenta", function (e) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
   
    $("input[id$='hid_indice_cta']")[0].value = -1;

    var Persona = $("input[id$='hid_persona']")[0].value.split('|')
    var Moneda = $("input[id$='hid_MonedaDev']")[0].value

    var Condicion = ' WHERE id_persona = ' + Persona[0] + ' AND cod_moneda = ' + Moneda
    fn_CargaCatalogo("Cta", Condicion, "", "Unica", "", "Cuentas Bancarias");
});


//Detecta evento de Confirmación en Controles con dicha Clase
$("body").on("click", ".Autorizacion", function () {
    if ($("input[id$='hid_Operacion']")[0].value == 4) {
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        if (this.name == '') {
            var id = '';
            id = this.id;
            this.name = id.replace('cph_principal_', 'ctl00$cph_principal$');
        }
        $("input[id$='hid_controlAuto']")[0].value = this.name;
        fn_AbrirModal('#Autorizacion');
        return false;
    }
    else {
        return true
    }
});



//Calculo de Prima Neta
$("body").on("focusout", "[id*=gvd_ListaGarantias] .PjeImporte", function (e) {
    var row = $(this).closest("tr");
    var PjeImporte = row.find('.PjeImporte');
    var _PjeImporte = row.find('._PjeImporte');

    //Solo si el valor cambia
    if (parseFloat(PjeImporte[0].value.replace(/,/g, "")) != _PjeImporte[0].value) {

        PjeImporte[0].value = fn_FormatoMonto(parseFloat(PjeImporte[0].value.replace(/,/g, "")), 4);
        _PjeImporte[0].value = PjeImporte[0].value.replace(/,/g, "");

        //Totales del Bloque
        var _PrimaCedidaTotal = row.find('._PrimaCedidaTotal');
        var _ComisionTotal = row.find('._ComisionTotal');
        var _PrimaNetaTotal = row.find('._PrimaNetaTotal');
        var _ImpuestoTotal = row.find('._ImpuestoTotal');

        //Prima Cedida
        var PrimaCedida = row.find('.PrimaCedida');
        var _PrimaCedida = row.find('._PrimaCedida');

        //Comisión
        var Comision = row.find('.Comision');
        var _Comision = row.find('._Comision');

        //Prima Neta
        var PrimaNeta = row.find('.PrimaNeta');
        var _PrimaNeta = row.find('._PrimaNeta');

        //Impuesto
        var Impuesto = row.find('.Impuesto');
        var _Impuesto = row.find('._Impuesto');

        _PrimaCedida[0].value = _PrimaCedidaTotal[0].value * (_PjeImporte[0].value / 100);
        PrimaCedida[0].value = fn_FormatoMonto(parseFloat(_PrimaCedida[0].value.replace(/,/g, "")), 4);

        _Comision[0].value = _ComisionTotal[0].value * (_PjeImporte[0].value / 100);
        Comision[0].value = fn_FormatoMonto(parseFloat(_Comision[0].value.replace(/,/g, "")), 4);

        _PrimaNeta[0].value = _PrimaNetaTotal[0].value * (_PjeImporte[0].value / 100);
        PrimaNeta[0].value = fn_FormatoMonto(parseFloat(_PrimaNeta[0].value.replace(/,/g, "")), 4);

        _Impuesto[0].value = _ImpuestoTotal[0].value * (_PjeImporte[0].value / 100);
        Impuesto[0].value = fn_FormatoMonto(parseFloat(_Impuesto[0].value.replace(/,/g, "")), 4);
    }
});


//Calculo de Porcentaje Prima cedida y Comisión
$("body").on("focusout", "[id*=gvd_ListaGarantias] .PrimaNeta", function (e) {
    var row = $(this).closest("tr");
    var PrimaNeta = row.find('.PrimaNeta');
    var _PrimaNeta = row.find('._PrimaNeta');

    //Solo si el valor cambia
    if (parseFloat(PrimaNeta[0].value.replace(/,/g, "")) != _PrimaNeta[0].value) {
        PrimaNeta[0].value = fn_FormatoMonto(parseFloat(PrimaNeta[0].value.replace(/,/g, "")), 4);
        _PrimaNeta[0].value = PrimaNeta[0].value.replace(/,/g, "");

        //Totales del Bloque
        var _PrimaCedidaTotal = row.find('._PrimaCedidaTotal');
        var _ComisionTotal = row.find('._ComisionTotal');
        var _PrimaNetaTotal = row.find('._PrimaNetaTotal');
        var _ImpuestoTotal = row.find('._ImpuestoTotal');

        //Prima Cedida
        var PrimaCedida = row.find('.PrimaCedida');
        var _PrimaCedida = row.find('._PrimaCedida');

        //Comisión
        var Comision = row.find('.Comision');
        var _Comision = row.find('._Comision');

        //Impuesto
        var Impuesto = row.find('.Impuesto');
        var _Impuesto = row.find('._Impuesto');

        //Porcentaje
        var PjeImporte = row.find('.PjeImporte');
        var _PjeImporte = row.find('._PjeImporte');

        _PjeImporte[0].value = (_PrimaNeta[0].value / _PrimaNetaTotal[0].value) * 100;
        PjeImporte[0].value = fn_FormatoMonto(parseFloat(_PjeImporte[0].value.replace(/,/g, "")), 4);

        _PrimaCedida[0].value = _PrimaCedidaTotal[0].value * (_PjeImporte[0].value / 100);
        PrimaCedida[0].value = fn_FormatoMonto(parseFloat(_PrimaCedida[0].value.replace(/,/g, "")), 4);

        _Comision[0].value = _ComisionTotal[0].value * (_PjeImporte[0].value / 100);
        Comision[0].value = fn_FormatoMonto(parseFloat(_Comision[0].value.replace(/,/g, "")), 4);

        _Impuesto[0].value = _ImpuestoTotal[0].value * (_PjeImporte[0].value / 100);
        Impuesto[0].value = fn_FormatoMonto(parseFloat(_Impuesto[0].value.replace(/,/g, "")), 4);
    }
});


$("body").on("click", "[id*=gvd_Generales] .SeleccioCampo", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    fn_SeleccionCampo('gvd_Generales', this)
});

$("body").on("click", "[id*=gvd_Reaseguro] .SeleccioCampo", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    fn_SeleccionCampo('gvd_Reaseguro', this)
});

$("body").on("click", "[id*=gvd_Garantias] .SeleccioCampo", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    fn_SeleccionCampo('gvd_Garantias', this)
});

$("body").on("click", "[id*=gvd_Montos] .SeleccioCampo", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    fn_SeleccionCampo('gvd_Montos', this)
});

$("body").on("click", "[id*=gvd_Campos] .SeleccioCampo", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    fn_SeleccionCampo('gvd_Campos', this)
});

$("body").on("click", "[id*=gvd_Filas] .SeleccioCampo", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    fn_SeleccionCampo('gvd_Filas', this)
});

$("body").on("click", "[id*=gvd_Valores] .SeleccioCampo", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    fn_SeleccionCampo('gvd_Valores', this)
});


function fn_SeleccionCampo(Gread,thi) {
    var row = $(thi).closest("tr");

    if ($("[id*=" + Gread + "]").find("[id*=txt_Sel]")[row[0].rowIndex - 1].value == "0") {
        $("[id*=" + Gread + "]").find("[id*=txt_Sel]")[row[0].rowIndex - 1].value = "1"
        $(thi).css("background-color", "lightgreen");
    }
    else {
        $(thi).css("background-color", "white");
        $("[id*=" + Gread + "]").find("[id*=txt_Sel]")[row[0].rowIndex - 1].value = "0"
    }
}

function fn_EstadoGridCampos(Gread) {
    $("[id*=" + Gread + "] tr").each(function (e) {
        var row = $(this).closest("tr");
        if ($("[id*=" + Gread + "]").find("[id*=txt_Sel]")[row[0].rowIndex - 1] != undefined) {
            if ($("[id*=" + Gread + "]").find("[id*=txt_Sel]")[row[0].rowIndex - 1].value == "1") {
                var Seleccion = row.find('.SeleccioCampo');
                $(Seleccion).css("background-color", "lightgreen");
            }
        }
    });
}

//Busqueda de Facultativo por Clave
$("body").on("focusout", "[id*=gvd_Poliza] .endoso", function (e) {
    var row = $(this).closest("tr");

    llave_pol = row.find('.llave_pol');
    descripcion = row.find('.descripcion'); 
    id_pv = row.find('.id_pv');
    
    var Id = llave_pol[0].value + '-' + $(this)[0].value

    id_pv[0].value = '';
    descripcion[0].value = '';

    if (Id.length > 0) {
        $.ajax({
            url: "../LocalServices/ConsultaBD.asmx/GetPoliza",
            data: "{ 'Id': '" + Id + "'}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.d != null) {
                    descripcion[0].value = data.d.split("|")[0];
                    id_pv[0].value = data.d.split("|")[1];
                }
            },
            error: function (response) {
                fn_MuestraMensaje('JSON', response.responseText, 2);
            },
        });
    }
});

//Busqueda de Facultativo por Clave
$("body").on("focusout", "[id*=gvd_Poliza] .llave_pol", function (e) {
    var row = $(this).closest("tr");

    endoso = row.find('.endoso');
    descripcion = row.find('.descripcion');
    id_pv = row.find('.id_pv');

    var Id = $(this)[0].value + '-' + endoso[0].value

    id_pv[0].value = '';
    descripcion[0].value = '';

    if (Id.length > 0) {
        $.ajax({
            url: "../LocalServices/ConsultaBD.asmx/GetPoliza",
            data: "{ 'Id': '" + Id + "'}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.d != null) {
                    descripcion[0].value = data.d.split("|")[0];
                    id_pv[0].value = data.d.split("|")[1];
                }
            },
            error: function (response) {
                fn_MuestraMensaje('JSON', response.responseText, 2);
            },
        });
    }
});




