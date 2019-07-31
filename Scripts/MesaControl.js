function PageLoadMesaControl() {
    if ($("input[id$='hid_Operacion']")[0].value == 1 || $("input[id$='hid_Operacion']")[0].value == 2) {
        fn_EvaluaAutoComplete('txt_ClaveAseg', 'txt_SearchAse');
        fn_EvaluaAutoComplete('txt_ClaveOfi', 'txt_SearchOfi');
        fn_EvaluaAutoComplete('txt_ClaveSusc', 'txt_SearchSusc');

        fn_EvaluaAutoComplete('txt_ClaveTag', 'txt_SearchTag');
        fn_EvaluaAutoComplete('txt_ClaveAge', 'txt_SearchAge');

        fn_EvaluaAutoComplete('txt_ClaveGiro', 'txt_SearchGiro');
        fn_EvaluaAutoComplete('txt_ClaveGre', 'txt_SearchGre');
        fn_EvaluaAutoComplete('txt_ClaveTte', 'txt_SearchTte');

        fn_EvaluaAutoComplete('txt_ClaveSuc', 'txt_SearchSuc');
        fn_EvaluaAutoComplete('txt_ClaveRam', 'txt_SearchRam');

        fn_EvaluaAutoComplete('txt_ClaveResp', 'txt_SearchResp');
    }
    
    LeftClick = 0;


    gridviewScroll();


    fn_ActualizaLapso();
    fn_EstadoSeleccionGrid('gvd_RamoSbr', 'Ram');
    fn_EstadoSeleccionGrid('gvd_Seccion', 'Rie');
    fn_EstadoSeleccionGrid('gvd_Cobertura', 'Cob');

    
}

$(document).ready(function () {
    gridviewScroll()
});

$(window).resize(function () {
    gridviewScroll()
});


function gridviewScroll() {
    if ($("input[id$='hid_Pestaña']")[0].value == 0) {
        if ($(window).width() > 1366 && $(window).width() <= 1600) {
            $('[id$=gvd_Riesgo]').gridviewScroll({
                freezesize: 6,
                width: 1190
            });
        }
        else if ($(window).width() >= 1264 && $(window).width() <= 1366) {
            $('[id$=gvd_Riesgo]').gridviewScroll({
                freezesize: 6,
                width: 980
            });
        }
    }
}

$("body").on("mouseup", "", function (e) {
    LeftClick = 0;
});

$("body").on("click", ".Folio", function (e) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    fn_CargaCatalogo("Fol", " AND periodo = " + $('option:selected', $('.Periodo'))[0].value , "", "Unica", "txt_FolioNegocio|txt_SearchAse", "FOLIOS");
});

$("body").on("click", ".Generales", function (e) {
    if ($("input[id$='hid_Pestaña']")[0].value == 2) {
        fn_CambiaEstado(15, "0");
        fn_CambiaEstado(16, "1");
    }
    fn_CerrarModalSimple('#Comisiones');
    fn_CerrarModalSimple('#Subjetividad');
    fn_CerrarModalSimple('#Pagos');
    $("input[id$='hid_Pestaña']")[0].value = 0;
});

$("body").on("click", ".Colocacion", function (e) {
    if ($("input[id$='hid_Pestaña']")[0].value == 2) {
        fn_CambiaEstado(15, "0");
        fn_CambiaEstado(16, "1");
    }

    var IndexBroker = $("input[id$='hid_IndiceBroker']")[0].value;

    //SI existe Broker Seleccionado
    if (IndexBroker > -1) {
        if (($("[id*=gvd_Intermediario] .Clave")[IndexBroker].innerText == 0 && $("input[id$='hid_IndiceReas']")[0].value > -1) || ($("[id*=gvd_Intermediario] .Clave")[IndexBroker].innerText > 0)) {
            fn_AbrirModalSimple('#Comisiones');
            fn_AbrirModalSimple('#Subjetividad');
            fn_AbrirModalSimple('#Pagos');
        }
    }

    $("input[id$='hid_Pestaña']")[0].value = 1;
});

$("body").on("click", ".Resumen", function (e) {
    if ($("input[id$='hid_Pestaña']")[0].value == 0 || $("input[id$='hid_Pestaña']")[0].value == 1) {
        fn_CambiaEstado(15, "1");
        fn_CambiaEstado(16, "0");
    }
    fn_CerrarModalSimple('#Comisiones');
    fn_CerrarModalSimple('#Subjetividad');
    fn_CerrarModalSimple('#Pagos');
    $("input[id$='hid_Pestaña']")[0].value = 2;
});

$("body").on("click", ".ModalEspera", function (e) {
    fn_AbrirModal('#EsperaModal');
});

$("body").on("click", ".AgruparRiesgo", function (e) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var blnAgrupado = false;

    var chk_Riesgo = $("[id*=gvd_Riesgo]").find(".Select");
    
    for (i = 0 ; i <= chk_Riesgo.length - 2 ; i++) {
        if (chk_Riesgo[i].isDisabled == false) {
            if (chk_Riesgo[i].childNodes[0].checked == true) {
                blnAgrupado = true;
                break;
            }
        }
    }

    if (blnAgrupado == true) {
        fn_AbrirModal('#Agrupadores');
    }
    else {
        fn_MuestraMensaje('Agrupadores', 'No se ha seleccionado ningún Riesgo para agrupar', 0);
    }
});

////////////////////////////////////////////////////////////////////EVENTO EXPANDIR-CONTRAER/////////////////////////////////////

//Colapsar Ventana
$("body").on("click", ".contraer", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var id = this.id.replace('coVentana','');
    fn_CambiaEstado(id, "1");
});

//Expandir Ventana
$("body").on("click", ".expandir", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var id = this.id.replace('exVentana', '');
    fn_CambiaEstado(id, "0");
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Detecta la clase Agregar Broker y abre el Catalogo
$("body").on("click", ".AgregaBroker", function () {
    var strSel = fn_ElementosSeleccionados($("[id*=gvd_Intermediario]"), $('[id*=lbl_ClaveBro]'), $('[id*=chk_Sel]'), false);

    //*************fn_CargaCatalogo(PrefijoCatalogo,Condicion,Seleccion,TipoSeleccion,IdGrid,Titulo)***************
    fn_CargaCatalogo("Bro", "", strSel, "Multiple", "", "INTERMEDIARIOS");
});

$("body").on("click", ".AgregaCia", function () {
    var strSel = fn_ElementosSeleccionados($("[id*=gvd_Reasegurador]"), $('[id*=lbl_ClaveCia]'), $('[id*=chk_Sel]'), false);

    //*************fn_CargaCatalogo(PrefijoCatalogo,Condicion,Seleccion,TipoSeleccion,IdGrid,Titulo)***************
    fn_CargaCatalogo("Cia", "", strSel, "Multiple", "", "REASEGURADORES", "block");
});

$("body").on("click", ".AgregaCoa", function () {
    var strSel = fn_ElementosSeleccionados($("[id*=gvd_Reparto]"), $('[id*=lbl_ClaveCoa]'), $('[id*=chk_Sel]'), false);

    //*************fn_CargaCatalogo(PrefijoCatalogo,Condicion,Seleccion,TipoSeleccion,IdGrid,Titulo)***************
    fn_CargaCatalogo("Coa", "", strSel, "Multiple", "", "COASEGURADORES");
});

$("body").on("click", ".AgregaRiesgo", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    fn_AbrirModalSimple('#Riesgos');
});


//Funciones de Autocompletar----------------------------------------------------------------------------------------------

$("body").on("focus", "[id$=txt_SearchResp]", function () {
    fn_Autocompletar("Usu", "txt_ClaveResp", "txt_SearchResp", "", 0, -1)
    $(this).trigger({
        type: "keydown",
        which: 46
    });
});

$("body").on("focus", "[id$=txt_SearchOfi]", function () {
    fn_Autocompletar("Suc", "txt_ClaveOfi", "txt_SearchOfi", "", 0, -1)
    $(this).trigger({
        type: "keydown",
        which: 46
    });
});

$("body").on("focus", "[id$=txt_SearchTag]", function () {
    fn_Autocompletar("Tag", "txt_ClaveTag", "txt_SearchTag", "", 0, -1)
    $(this).trigger({
        type: "keydown",
        which: 46
    });
});

$("body").on("focus", "[id$=txt_SearchSusc]", function () {
    fn_Autocompletar("Usu", "txt_ClaveSusc", "txt_SearchSusc", "", 0, -1)
    $(this).trigger({
        type: "keydown",
        which: 46
    });
});

$("body").on("focus", "[id$=txt_SearchSuc]", function () {
    fn_Autocompletar("Suc", "txt_ClaveSuc", "txt_SearchSuc", "", 0, -1)
    $(this).trigger({
        type: "keydown",
        which: 46
    });
});

$("body").on("focusout", "[id$=txt_SearchAge]", function () {
    if ($(this)[0].value == '') {
        $("input[id$='txt_ClaveAge']")[0].value = ''
    }
    fn_EvaluaAutoComplete('txt_ClaveAge', 'txt_SearchAge');

});

$("body").on("focus", "[id$=txt_SearchRam]", function () {
    fn_Autocompletar("Pro", "txt_ClaveRam", "txt_SearchRam", "", 0, -1)
    $(this).trigger({
        type: "keydown",
        which: 46
    });
});

$("body").on("focus", "[id$=txt_SearchGre]", function () {
    fn_Autocompletar("Gre", "txt_ClaveGre", "txt_SearchGre", "", 0, -1)
    $(this).trigger({
        type: "keydown",
        which: 46
    });
});

$("body").on("focus", "[id$=txt_SearchTte]", function () {
    fn_Autocompletar("Tte", "txt_ClaveTte", "txt_SearchTte", " AND cod_grupo_endo = 0", 0, -1)
    $(this).trigger({
        type: "keydown",
        which: 46
    });
});

//----------------------------------------------------------------AUTOCOMPLETE DENTRO DE GRID------------------------------------------------------------------
//$("body").on("mouseover", "[id*=gvd_Riesgo] .Negocio", function (e) {
//    var row = $(this).closest("tr");
//    if (row[0].rowIndex - 1 > 0) {
//        var Ramo = row.find('.Ramo');
//        var Subramo = row.find('.Subramo');
//        var Riesgo = row.find('.Riesgo');
//        var Cobertura = row.find('.Cobertura');

//        var Negocio = 'Riesgo: \nRamo: ' + Ramo[0].value + ' \nSubramo: ' + Subramo[0].value + ' \nSección: ' + Riesgo[0].value + ' \nCobertura: ' + Cobertura[0].value;
//        $(this).attr('title', Negocio);
//    }
//});

//Ramo del Inciso
$("body").on("mouseover", "[id*=gvd_Riesgo] .Ramo", function (e) {
    $(this).attr('title', $(this)[0].value);
});

$("body").on("keydown", "[id*=gvd_Riesgo] .Ramo", function (e) {
    var row = $(this).closest("tr");
    var ClaveRamo = row.find('.ClaveRamo');
    fn_AutocompletarGrid('Ram', ClaveRamo, 'txt_SearchRamo', '', e.which)

    if (e.which != 46) {
        var ClaveSubramo = row.find('.ClaveSubramo');
        var Subramo = row.find('.Subramo');
        var ClaveRiesgo = row.find('.ClaveRiesgo');
        var Riesgo = row.find('.Riesgo');
        var ClaveCobertura = row.find('.ClaveCobertura');
        var Cobertura = row.find('.Cobertura');

        $(ClaveSubramo)[0].value = '';
        $(Subramo)[0].value = '';
        $(ClaveRiesgo)[0].value = '';
        $(Riesgo)[0].value = '';
        $(ClaveCobertura)[0].value = '';
        $(Cobertura)[0].value = '';
    }
});

$("body").on("focusout", "[id*=gvd_Riesgo] .Ramo", function (e) {
    var row = $(this).closest("tr");
    var ClaveRamo = row.find('.ClaveRamo');
    var ClaveRamoAux = row.find('.ClaveRamoAux');
    var blnClear = 0;

    if ($(this)[0].value == '') {
        $(ClaveRamo)[0].value = '';
        blnClear = 1
    }
    else if ($(ClaveRamo)[0].value != $(ClaveRamoAux)[0].value) {
        $(ClaveRamoAux)[0].value = $(ClaveRamo)[0].value;
        blnClear = 1;
    }

    if (blnClear == 1) {
        var ClaveSubramo = row.find('.ClaveSubramo');
        var Subramo = row.find('.Subramo');
        var ClaveRiesgo = row.find('.ClaveRiesgo');
        var Riesgo = row.find('.Riesgo');
        var ClaveCobertura = row.find('.ClaveCobertura');
        var Cobertura = row.find('.Cobertura');
        $(ClaveSubramo)[0].value = '';
        $(Subramo)[0].value = '';
        $(ClaveRiesgo)[0].value = '';
        $(Riesgo)[0].value = '';
        $(ClaveCobertura)[0].value = '';
        $(Cobertura)[0].value = '';
    }
});

$("body").on("focus", "[id*=gvd_Riesgo] .Ramo", function () {
    fn_AutocompletarGrid('Ram', undefined, 'txt_SearchRamo', '', -1)
    $(this).trigger({
        type: "keydown",
        which: 46
    });
});



//SubRamo del Inciso
$("body").on("mouseover", "[id*=gvd_Riesgo] .Subramo", function (e) {
    $(this).attr('title', $(this)[0].value);
});

$("body").on("keydown", "[id*=gvd_Riesgo] .Subramo", function (e) {
    var row = $(this).closest("tr");
    var ClaveRamo = row.find('.ClaveRamo');
    var ClaveSubramo = row.find('.ClaveSubramo');
    fn_AutocompletarGrid('Sbr', ClaveSubramo, 'txt_SearchSubramo', ' AND cod_ramo = ' + $(ClaveRamo)[0].value, e.which)

    if (e.which != 46) {
        var ClaveCobertura = row.find('.ClaveCobertura');
        var Cobertura = row.find('.Cobertura');
        $(ClaveCobertura)[0].value = '';
        $(Cobertura)[0].value = '';
    }
});


$("body").on("focusout", "[id*=gvd_Riesgo] .Subramo", function (e) {
    var row = $(this).closest("tr");
    var ClaveSubramo = row.find('.ClaveSubramo');
    var ClaveSubramoAux = row.find('.ClaveSubramoAux');
    var blnClear = 0;

    if ($(this)[0].value == '') {
        $(ClaveSubramo)[0].value = ''
        blnClear = 1
    }
    else if ($(ClaveSubramo)[0].value != $(ClaveSubramoAux)[0].value) {
        $(ClaveSubramoAux)[0].value = $(ClaveSubramo)[0].value
        blnClear = 1
    }

    if (blnClear == 1) {
        var ClaveCobertura = row.find('.ClaveCobertura');
        var Cobertura = row.find('.Cobertura');
        $(ClaveCobertura)[0].value = '';
        $(Cobertura)[0].value = '';
    }
});

$("body").on("focus", "[id*=gvd_Riesgo] .Subramo", function () {
    fn_AutocompletarGrid('Sbr', undefined, 'txt_SearchSubramo', ' AND cod_ramo = 0', -1)
    var row = $(this).closest("tr");
    var ClaveRamo = row.find('.ClaveRamo');
    if ($(ClaveRamo)[0].value != '') {
        $(this).trigger({
            type: "keydown",
            which: 46
        });
    }
    else {
        fn_MuestraMensaje('Error en Inciso', 'Se debe seleccionar un Ramo válido', 0);
    }
});




//Sección del Inciso
$("body").on("mouseover", "[id*=gvd_Riesgo] .Riesgo", function (e) {
    $(this).attr('title', $(this)[0].value);
});

$("body").on("keydown", "[id*=gvd_Riesgo] .Riesgo", function (e) {
    var row = $(this).closest("tr");
    var ClaveRamo = row.find('.ClaveRamo');
    var ClaveRiesgo = row.find('.ClaveRiesgo');
    var Riesgo = row.find('.Riesgo');

    fn_AutocompletarGrid('Rie', ClaveRiesgo, 'txt_SearchSeccion', ' AND cod_ramo = ' + $(ClaveRamo)[0].value, e.which, Riesgo)
});

$("body").on("focusout", "[id*=gvd_Riesgo] .Riesgo", function () {
    var row = $(this).closest("tr");
    var ClaveRiesgo = row.find('.ClaveRiesgo');
    var Riesgo = row.find('.Riesgo');

    if ($(this)[0].value == '') {
        $(ClaveRiesgo)[0].value = '';
    }

    fn_ActualizaRiesgos(row[0].rowIndex - 1, 'txt_Riesgo', $(ClaveRiesgo)[0].value, $(Riesgo)[0].value);
});

$("body").on("focus", "[id*=gvd_Riesgo] .Riesgo", function (e) {
    var row = $(this).closest("tr");
    var ClaveRamo = row.find('.ClaveRamo');
    var ClaveRiesgo = row.find('.ClaveRiesgo');
   

    fn_AutocompletarGrid('Rie', undefined, 'txt_SearchSeccion', ' AND cod_ramo = 0', -1)
    

    if ($(ClaveRamo)[0].value != '') {
        $(this).trigger({
            type: "keydown",
            which: 46
        });
    }
    else {
        fn_MuestraMensaje('Error en Inciso', 'Se debe seleccionar un Ramo válido', 0);
    }
});




//Cobertura del Inciso
$("body").on("mouseover", "[id*=gvd_Riesgo] .Cobertura", function (e) {
    $(this).attr('title', $(this)[0].value);
});

$("body").on("keydown", "[id*=gvd_Riesgo] .Cobertura", function (e) {
    var row = $(this).closest("tr");
    var ClaveRamo = row.find('.ClaveRamo');
    var ClaveSubramo = row.find('.ClaveSubramo');
    var ClaveCobertura = row.find('.ClaveCobertura');

    fn_AutocompletarGrid('Cob', ClaveCobertura, 'txt_SearchCobertura', ' AND cod_ramo = ' + $(ClaveRamo)[0].value + ' AND cod_subramo = ' + $(ClaveSubramo)[0].value, e.which)
});

$("body").on("focusout", "[id*=gvd_Riesgo] .Cobertura", function () {
    var row = $(this).closest("tr");
    var ClaveCobertura = row.find('.ClaveCobertura');
    var Cobertura = row.find('.Cobertura');

    if ($(this)[0].value == '') {
        $(ClaveCobertura)[0].value = ''
    }

    fn_ActualizaRiesgos(row[0].rowIndex - 1, 'txt_Cobertura', $(ClaveCobertura)[0].value, $(Cobertura)[0].value);
});

$("body").on("focus", "[id*=gvd_Riesgo] .Cobertura", function () {
    fn_AutocompletarGrid('Cob', undefined, 'txt_SearchCobertura', ' AND cod_ramo = 0 AND cod_subramo = 0', -1)
    var row = $(this).closest("tr");
    var ClaveRamo = row.find('.ClaveRamo');
    var ClaveSubramo = row.find('.ClaveSubramo');

    if ($(ClaveRamo)[0].value != '' && $(ClaveSubramo)[0].value != '') {
        $(this).trigger({
            type: "keydown",
            which: 46
        });
    }
    else {
        fn_MuestraMensaje('Error en Inciso', 'Se debe seleccionar un Ramo y un Subramo válidos', 0);
    }
});


function fn_AutocompletarGrid(Catalogo, ControlClave, ControlBusqueda , Dependencia, caracter) {
    if (caracter != 13 && caracter != 9 && caracter != -1 && caracter != 37 && caracter != 38 && caracter != 39 && caracter != 40 && caracter != 46) {
        $(ControlClave)[0].value = '';
    }


    $('[id*=' + ControlBusqueda + ']').autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                url: "../LocalServices/ConsultaBD.asmx/GetAutocompletar",
                data: "{ 'catalogo': '" + Catalogo + "' , 'prefix': '" + request.term + "' , 'strSel': '" + Dependencia + "'}",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    response($.map(data.d, function (item) {i
                        return {
                            label: item.split('|')[0],
                            val: item.split('|')[1]
                        }
                    }))
                },
                error: function (response) {
                    fn_MuestraMensaje('JSON', response.responseText, 2);
                },
            });
        },
        select: function (e, i) {
            $(ControlClave)[0].value = i.item.val;
        }
    });

}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------

//OPERACIONES ARITMETICAS GRID RIESGO

//Sumatorias Totales
function fn_SumaTotales(Grid, ArrayClase, ArrayControl, AST, ArrayNoSumar, Posicion , LimiteMayor) {
    var Control = undefined;
    var Clase = undefined;

    var ArraySuma = [0];
    ArraySuma.length = ArrayClase.length;


    for (i = 0; i < ArrayClase.length; i++) {
        ArraySuma[i] = 0;
    }

    //Recorre todo el Grid
    $("[id*=" + Grid + "] ." + ArrayClase[0]).each(function (e) {
        var row = $(this).closest("tr");

        for (i = 0; i < ArrayClase.length; i++) {
            if (ArrayNoSumar.indexOf(row[0].rowIndex - 1) == -1) {

                elemento = 0;

                //Obtiene Referencia de Control que se sumará
                Control = $("[id*=" + Grid + "]").find('[id*=' + ArrayControl[i] + ']')[row[0].rowIndex - 1];
                if (Control != undefined) {
                    elemento = parseFloat(Control.value);

                    //Valida la Acumulación
                    if (AST == 1 && ArrayClase[i] == 'SumaAsegurada') {
                        if ($("[id*=" + Grid + "]").find("[id*=opt_Adicional] input:checked")[row[0].rowIndex - 2].value == 0) {
                            elemento = 0;
                        }
                    }
                }
                ArraySuma[i] = ArraySuma[i] + elemento;
            }
            else {
                i = ArrayClase.length;  //Break For
                break;
            }
        }

        //Coloca los Resultados finales en la posición correspondiente
        for (i = 0; i < ArrayClase.length; i++) {
            //Resultado en Control
            Control = $("[id*=" + Grid + "]").find("[id*=" + ArrayControl[i] + "]")[Posicion];
            if (Control != undefined){
                Control.value = ArraySuma[i];
            }

            //Resultado en Clase
            Clase = $("[id*=" + Grid + "] ." + ArrayClase[i])[Posicion];
            if (Clase != undefined){
                Clase.value = fn_FormatoMonto(parseFloat(ArraySuma[i]), 2);

                if (LimiteMayor != undefined) {
                    if (parseFloat(ArraySuma[i]) > LimiteMayor) {
                        $("[id*=" + Grid + "] ." + ArrayClase[i])[Posicion].style.color = "red";
                    }
                    else {
                        $("[id*=" + Grid + "] ." + ArrayClase[i])[Posicion].style.color = "#555";
                    }
                }
            }
        }
    });
}


//Suma Horizontal de Conceptos
function fn_SumaHorizontal(row, ArrayControl, ClaseResult, ControlResult) {
    var Control = undefined;
    var Clase = undefined;
    var suma = 0;
    
    for(i=0; i < ArrayControl.length;i++){
        Control = row.find("[id*=" + ArrayControl[i] + "]");
        if ($(Control)[0] != undefined) {
            suma = suma + parseFloat($(Control)[0].value);
        }
    }

    Control = row.find("[id*=" + ControlResult + "]");
    if ($(Control)[0] != undefined) {
        $(Control)[0].value = suma;
    }

    Clase = row.find('.' + ClaseResult);
    if ($(Clase)[0] != undefined) {
        $(Clase)[0].value = fn_FormatoMonto(suma, 2);
    }
}


//Calculo de Cuota
function fn_CalculaCuota(row) {
    var Cuota = row.find('.Cuota');
    if ($('[id*=txt_LimRespAux]')[row[0].rowIndex - 1].value != 0) {
        $(Cuota)[0].value = fn_FormatoMonto($('[id*=txt_PrimaNetaAux]')[row[0].rowIndex - 1].value / $('[id*=txt_LimRespAux]')[row[0].rowIndex - 1].value, 2);
        $('[id*=txt_CuotaAux]')[row[0].rowIndex - 1].value = $('[id*=txt_PrimaNetaAux]')[row[0].rowIndex - 1].value / $('[id*=txt_LimRespAux]')[row[0].rowIndex - 1].value;
    }
    else {
        $(Cuota)[0].value = '0.0000'
        $('[id*=txt_CuotaAux]')[row[0].rowIndex - 1].value = 0;
    }
    fn_SumaTotales('gvd_Riesgo', ['Cuota'], ['txt_CuotaAux'], 0, [0], 0);
}


//Calcula el Monto a partir de Un porcentaje
function fn_CalculaMonto(row, Clase, ControlMonto) {
    var ControlResultado = row.find('.' + Clase); 
    var ControlMonto = row.find('[id*=' + ControlMonto + ']');
    var ControlPrc = row.find('[id*=txt_Prc' + Clase + ']');
    var ControlAux = row.find('[id*=txt_' + Clase + 'Aux]');

    var Monto = 0;
    if ($(ControlMonto)[0].value != 0) {
        Monto = $(ControlMonto)[0].value * ($(ControlPrc)[0].value / 100);
    }

    if ($(ControlAux)[0] != undefined) {
        $(ControlAux)[0].value = Monto;
    }

    $(ControlPrc)[0].value = fn_FormatoMonto(parseFloat($(ControlPrc)[0].value), 4, 1);
    $(ControlResultado)[0].value = fn_FormatoMonto(parseFloat(Monto), 2);
}


//Calcula el Porcentaje a partir de un Monto
function fn_CalculaPorcentaje(ControlPrc, ControlAux, ControlMonto) {
    var Prc = 0;
    if (ControlMonto.value != 0) {
        Prc = (ControlAux.value / ControlMonto.value) * 100;
    }
    ControlPrc.value = fn_FormatoMonto(parseFloat(Prc), 4, 1);
}


//Actualiza Agrupaciones al editar Montos
function fn_ActualizaGrupo(Grupo, inciso, ArrayClase, ArrayControl, AST) {
    var Control = undefined;
    var Clase = undefined;

    $("[id*=gvd_Agrupacion] .Incisos").each(function (e) {
        var row = $(this).closest("tr");
        var incisos = $(this)[0].value.split(',');

        var ArraySuma = [0];
        ArraySuma.length = ArrayClase.length;

        //Obtiene la Clave del Grupo
        var ClaveGrupo = $("[id*=gvd_Agrupacion]").find("[id*=txt_Clave]")[row[0].rowIndex - 1].value

        //Valida en que Grupo se encuentra el inciso o de que Grupo se trata
        if (incisos.indexOf(inciso) != -1 || Grupo == ClaveGrupo) {

            for (i = 0; i < ArraySuma.length; i++) {
                ArraySuma[i] = 0;

                Control = $("[id*=gvd_Agrupacion]").find("[id*=" + ArrayControl[i] + "]")[row[0].rowIndex - 1];
                if (Control != undefined) {
                    Control.value = 0;
                }

                Clase = $("[id*=gvd_Agrupacion] ." + ArrayClase[i])[row[0].rowIndex - 1];
                if (Clase != undefined) {
                    Clase.value = '0.00';
                }
            }

            var elemento = 0;

            $("[id*=gvd_Riesgo] ." + ArrayClase[0]).each(function (e) {
                var rowAux = $(this).closest("tr");

                for (i = 0; i < ArrayClase.length; i++) {
                    if (incisos.indexOf($('[id*=txt_Inciso]')[rowAux[0].rowIndex - 1].value) != -1) {

                        Control = $("[id*=gvd_Riesgo]").find("[id*=" + ArrayControl[i] + "]")[rowAux[0].rowIndex - 1];

                        if (Control != undefined) {
                            elemento = parseFloat(Control.value);
                            if (AST == 1 && ArrayClase[i] == 'SumaAsegurada') {
                                if ($("[id*=gvd_Riesgo]").find("[id*=opt_Adicional] input:checked")[rowAux[0].rowIndex - 2].value == 0) {
                                    elemento = 0;
                                }
                            }
                            ArraySuma[i] = ArraySuma[i] + elemento;

                            Control = $("[id*=gvd_Agrupacion]").find("[id*=" + ArrayControl[i] + "]")[row[0].rowIndex - 1];
                            if (Control != undefined) {
                                Control.value = ArraySuma[i];
                            }
                            
                            Clase = $("[id*=gvd_Agrupacion] ." + ArrayClase[i])[row[0].rowIndex - 1];
                            if (Clase != undefined) {
                                Clase.value = fn_FormatoMonto(parseFloat(ArraySuma[i]), 2);
                            }
                        }
                    }
                    else {
                        i = ArrayClase.length;  //Break For
                        break;
                    }
                }
            });

        }
    });
}



$("body").on("click", "[id*=gvd_Riesgo] [id*=opt_Adicional] input:checked", function (e) {
    var row = $(this).closest("tr").parents('tr');
    fn_SumaTotales('gvd_Riesgo', ['SumaAsegurada'], ['txt_LimRespAux'], 1, [0], 0);

    if ($("input[id$='hid_IndiceGrupo']")[0].value > -1) {
        fn_ActualizaGrupo(0, $('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, ['SumaAsegurada'], ['txt_LimRespAux'], 1)
        fn_CalculaReparto($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['SumaAsegurada'], ['txt_LimResp']);
        fn_CalculaDistribucionGMX($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['SumaAsegurada'], ['txt_LimResp']);
        fn_CalculaIntermediario($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['SumaAsegurada'], ['txt_LimResp']);
        fn_CalculaReasegurador($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['SumaAsegurada'], ['txt_LimResp']);
    }
});

$("body").on("focusout", "[id*=gvd_Riesgo] .ValoresTotales", function (e) {
    var row = $(this).closest("tr");

    if (parseFloat($(this)[0].value.replace(/,/g, "")) != $('[id*=txt_ValoresTotalesAux]')[row[0].rowIndex - 1].value) {
        $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 2);
        $('[id*=txt_ValoresTotalesAux]')[row[0].rowIndex - 1].value = $(this)[0].value.replace(/,/g, "");
        fn_SumaTotales('gvd_Riesgo', ['ValoresTotales'], ['txt_ValoresTotalesAux'], 0, [0], 0);
    }
});

$("body").on("focusout", "[id*=gvd_Riesgo] .SumaAsegurada", function (e) {
    var row = $(this).closest("tr");

    //Solo si el valor cambia
    if (parseFloat($(this)[0].value.replace(/,/g, "")) != $('[id*=txt_LimRespAux]')[row[0].rowIndex - 1].value) {
        $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 2);
        $('[id*=txt_LimRespAux]')[row[0].rowIndex - 1].value = $(this)[0].value.replace(/,/g, "");
        fn_SumaTotales('gvd_Riesgo', ['SumaAsegurada'], ['txt_LimRespAux'], 1, [0], 0);
        fn_CalculaCuota(row);

        if ($("input[id$='hid_IndiceGrupo']")[0].value > -1) {
            fn_ActualizaGrupo(0, $('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, ['SumaAsegurada'], ['txt_LimRespAux'], 1);
            fn_CalculaReparto($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['SumaAsegurada'], ['txt_LimResp']);
            fn_CalculaDistribucionGMX($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['SumaAsegurada'], ['txt_LimResp']);
            fn_CalculaIntermediario($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['SumaAsegurada'], ['txt_LimResp']);
            fn_CalculaReasegurador($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['SumaAsegurada'], ['txt_LimResp']);
        }
    }
});

$("body").on("focusout", "[id*=gvd_Riesgo] .PrimaNeta", function (e) {
    var row = $(this).closest("tr");

    //Solo si el valor cambia
    if (parseFloat($(this)[0].value.replace(/,/g, "")) != $('[id*=txt_PrimaNetaAux]')[row[0].rowIndex - 1].value) {
        $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 2);
        $('[id*=txt_PrimaNetaAux]')[row[0].rowIndex - 1].value = $(this)[0].value.replace(/,/g, "");

        fn_CalculaCuota(row);
        fn_CalculaMonto(row, 'ComAge', 'txt_PrimaNetaAux');
        fn_CalculaMonto(row, 'ComAdiAge', 'txt_PrimaNetaAux');
        fn_CalculaMonto(row, 'FeeGMX', 'txt_PrimaNetaAux');
        fn_CalculaComFac(row)

        //Actualiza la Suma de todas las Primas
        fn_SumaTotales('gvd_Riesgo', ['PrimaNeta', 'ComAge', 'ComAdiAge', 'FeeGMX', 'ComFac'], ['txt_PrimaNetaAux', 'txt_ComAgeAux', 'txt_ComAdiAgeAux', 'txt_FeeGMXAux', 'txt_ComFacAux'], 0, [0], 0);
        
        if ($("input[id$='hid_IndiceGrupo']")[0].value > -1) {
            fn_ActualizaGrupo(0, $('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, ['PrimaNeta'], ['txt_PrimaNetaAux'], 0)
            fn_CalculaReparto($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta'], ['txt_PrimaNeta']);
            fn_CalculaDistribucionGMX($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta'], ['txt_PrimaNeta']);
            fn_CalculaIntermediario($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta'], ['txt_PrimaNeta']);
            fn_CalculaReasegurador($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta'], ['txt_PrimaNeta']);
        }
    }
});

$("body").on("focusout", "[id*=gvd_Riesgo] .PrimaINC", function (e) {
    var row = $(this).closest("tr");

    //Solo si el valor cambia
    if (parseFloat($(this)[0].value.replace(/,/g, "")) != $('[id*=txt_PrimaINCAux]')[row[0].rowIndex - 1].value) {
        $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 2);
        $('[id*=txt_PrimaINCAux]')[row[0].rowIndex - 1].value = $(this)[0].value.replace(/,/g, "");
        
        //Consolida la Prima Neta en base al Desglose de Primas
        fn_SumaHorizontal(row, ['txt_PrimaINCAux'], 'PrimaNeta', 'txt_PrimaNetaAux');

        fn_CalculaCuota(row);
        fn_CalculaMonto(row, 'ComAge', 'txt_PrimaNetaAux');
        fn_CalculaMonto(row, 'ComAdiAge', 'txt_PrimaNetaAux');
        fn_CalculaMonto(row, 'FeeGMX', 'txt_PrimaNetaAux');
        fn_CalculaComFac(row)

        //Actualiza la Suma de todas las Primas
        fn_SumaTotales('gvd_Riesgo', ['PrimaNeta', 'PrimaINC', 'ComAge', 'ComAdiAge', 'FeeGMX', 'ComFac'], ['txt_PrimaNetaAux', 'txt_PrimaINCAux', 'txt_ComAgeAux', 'txt_ComAdiAgeAux', 'txt_FeeGMXAux', 'txt_ComFacAux'], 0, [0], 0);
        
        if ($("input[id$='hid_IndiceGrupo']")[0].value > -1) {
            fn_ActualizaGrupo(0, $('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, ['PrimaNeta', 'PrimaINC'], ['txt_PrimaNetaAux', 'txt_PrimaINCAux'], 0);
            fn_CalculaReparto($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaINC'], ['txt_PrimaNeta', 'txt_PrimaINC']);
            fn_CalculaDistribucionGMX($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaINC'], ['txt_PrimaNeta', 'txt_PrimaINC']);
            fn_CalculaIntermediario($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaINC'], ['txt_PrimaNeta', 'txt_PrimaINC']);
            fn_CalculaReasegurador($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaINC'], ['txt_PrimaNeta', 'txt_PrimaINC']);
        } 
    }
});

$("body").on("focusout", "[id*=gvd_Riesgo] .PrimaTEV", function (e) {
    var row = $(this).closest("tr");

    //Solo si el valor cambia
    if (parseFloat($(this)[0].value.replace(/,/g, "")) != $('[id*=txt_PrimaTEVAux]')[row[0].rowIndex - 1].value) {
        $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 2);
        $('[id*=txt_PrimaTEVAux]')[row[0].rowIndex - 1].value = $(this)[0].value.replace(/,/g, "");
        
        //Consolida la Prima Neta en base al Desglose de Primas
        fn_SumaHorizontal(row, ['txt_PrimaTEVAux'], 'PrimaNeta', 'txt_PrimaNetaAux');

        fn_CalculaCuota(row);
        fn_CalculaMonto(row, 'ComAge', 'txt_PrimaNetaAux');
        fn_CalculaMonto(row, 'ComAdiAge', 'txt_PrimaNetaAux');
        fn_CalculaMonto(row, 'FeeGMX', 'txt_PrimaNetaAux');
        fn_CalculaComFac(row)

        //Actualiza la Suma de todas las Primas
        fn_SumaTotales('gvd_Riesgo', ['PrimaNeta', 'PrimaTEV', 'ComAge', 'ComAdiAge', 'FeeGMX', 'ComFac'], ['txt_PrimaNetaAux', 'txt_PrimaTEVAux', 'txt_ComAgeAux', 'txt_ComAdiAgeAux', 'txt_FeeGMXAux', 'txt_ComFacAux'], 0, [0], 0);

        if ($("input[id$='hid_IndiceGrupo']")[0].value > -1) {
            fn_ActualizaGrupo(0, $('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, ['PrimaNeta', 'PrimaTEV'], ['txt_PrimaNetaAux', 'txt_PrimaTEVAux'], 0)
            fn_CalculaReparto($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaTEV'], ['txt_PrimaNeta', 'txt_PrimaTEV']);
            fn_CalculaDistribucionGMX($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaTEV'], ['txt_PrimaNeta', 'txt_PrimaTEV']);
            fn_CalculaIntermediario($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaTEV'], ['txt_PrimaNeta', 'txt_PrimaTEV']);
            fn_CalculaReasegurador($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaTEV'], ['txt_PrimaNeta', 'txt_PrimaTEV']);
        }
       
    }
});

$("body").on("focusout", "[id*=gvd_Riesgo] .PrimaFHM", function (e) {
    var row = $(this).closest("tr");

    //Solo si el valor cambia
    if (parseFloat($(this)[0].value.replace(/,/g, "")) != $('[id*=txt_PrimaFHMAux]')[row[0].rowIndex - 1].value) {
        $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 2);
        $('[id*=txt_PrimaFHMAux]')[row[0].rowIndex - 1].value = $(this)[0].value.replace(/,/g, "");

        //Consolida la Prima Neta en base al Desglose de Primas
        fn_SumaHorizontal(row, ['txt_PrimaFHMAux'], 'PrimaNeta', 'txt_PrimaNetaAux');

        fn_CalculaCuota(row);
        fn_CalculaMonto(row, 'ComAge', 'txt_PrimaNetaAux');
        fn_CalculaMonto(row, 'ComAdiAge', 'txt_PrimaNetaAux');
        fn_CalculaMonto(row, 'FeeGMX', 'txt_PrimaNetaAux');
        fn_CalculaComFac(row)

        //Actualiza la Suma de todas las Primas
        fn_SumaTotales('gvd_Riesgo', ['PrimaNeta', 'PrimaFHM', 'ComAge', 'ComAdiAge', 'FeeGMX', 'ComFac'], ['txt_PrimaNetaAux', 'txt_PrimaFHMAux', 'txt_ComAgeAux', 'txt_ComAdiAgeAux', 'txt_FeeGMXAux', 'txt_ComFacAux'], 0, [0], 0);

        if ($("input[id$='hid_IndiceGrupo']")[0].value > -1) {
            fn_ActualizaGrupo(0, $('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, ['PrimaNeta', 'PrimaFHM'], ['PrimaNeta', 'txt_PrimaFHMAux'], 0);
            fn_CalculaReparto($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaFHM'], ['txt_PrimaNeta', 'txt_PrimaFHM']);
            fn_CalculaDistribucionGMX($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaFHM'], ['txt_PrimaNeta', 'txt_PrimaFHM']);
            fn_CalculaIntermediario($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaFHM'], ['txt_PrimaNeta', 'txt_PrimaFHM']);
            fn_CalculaReasegurador($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaFHM'], ['txt_PrimaNeta', 'txt_PrimaFHM']);
        }
        
    }
});

$("body").on("focusout", "[id*=gvd_Riesgo] .PrimaRC", function (e) {
    var row = $(this).closest("tr");

    //Solo si el valor cambia
    if (parseFloat($(this)[0].value.replace(/,/g, "")) != $('[id*=txt_PrimaRCAux]')[row[0].rowIndex - 1].value) {
        $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 2);
        $('[id*=txt_PrimaRCAux]')[row[0].rowIndex - 1].value = $(this)[0].value.replace(/,/g, "");

        //Consolida la Prima Neta en base al Desglose de Primas
        fn_SumaHorizontal(row, ['txt_PrimaRCAux'], 'PrimaNeta', 'txt_PrimaNetaAux');

        fn_CalculaCuota(row);
        fn_CalculaMonto(row, 'ComAge', 'txt_PrimaNetaAux');
        fn_CalculaMonto(row, 'ComAdiAge', 'txt_PrimaNetaAux');
        fn_CalculaMonto(row, 'FeeGMX', 'txt_PrimaNetaAux');
        fn_CalculaComFac(row)

        //Actualiza la Suma de todas las Primas
        fn_SumaTotales('gvd_Riesgo', ['PrimaNeta', 'PrimaRC', 'ComAge', 'ComAdiAge', 'FeeGMX', 'ComFac'], ['txt_PrimaNetaAux', 'txt_PrimaRCAux', 'txt_ComAgeAux', 'txt_ComAdiAgeAux', 'txt_FeeGMXAux', 'txt_ComFacAux'], 0, [0], 0);

        if ($("input[id$='hid_IndiceGrupo']")[0].value > -1) {
            fn_ActualizaGrupo(0, $('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, ['PrimaNeta', 'PrimaRC'], ['txt_PrimaNetaAux', 'txt_PrimaRCAux'], 0);
            fn_CalculaReparto($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaRC'], ['txt_PrimaNeta', 'txt_PrimaRCAux']);
            fn_CalculaDistribucionGMX($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaRC'], ['txt_PrimaNeta', 'txt_PrimaRCAux']);
            fn_CalculaIntermediario($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaRC'], ['txt_PrimaNeta', 'txt_PrimaRCAux']);
            fn_CalculaReasegurador($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaRC'], ['txt_PrimaNeta', 'txt_PrimaRCAux']);
        }
    }
});

$("body").on("focusout", "[id*=gvd_Riesgo] .PrimaCSC", function (e) {
    var row = $(this).closest("tr");

    //Solo si el valor cambia
    if (parseFloat($(this)[0].value.replace(/,/g, "")) != $('[id*=txt_PrimaCSCAux]')[row[0].rowIndex - 1].value) {
        $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 2);
        $('[id*=txt_PrimaCSCAux]')[row[0].rowIndex - 1].value = $(this)[0].value.replace(/,/g, "");

        //Consolida la Prima Neta en base al Desglose de Primas
        fn_SumaHorizontal(row, ['txt_PrimaCSCAux', 'txt_PrimaGRAAux'], 'PrimaNeta', 'txt_PrimaNetaAux');

        fn_CalculaCuota(row);
        fn_CalculaMonto(row, 'ComAge', 'txt_PrimaNetaAux');
        fn_CalculaMonto(row, 'ComAdiAge', 'txt_PrimaNetaAux');
        fn_CalculaMonto(row, 'FeeGMX', 'txt_PrimaNetaAux');
        fn_CalculaComFac(row)

        //Actualiza la Suma de todas las Primas
        fn_SumaTotales('gvd_Riesgo', ['PrimaNeta', 'PrimaCSC', 'ComAge', 'ComAdiAge', 'FeeGMX', 'ComFac'], ['txt_PrimaNetaAux', 'txt_PrimaCSCAux', 'txt_ComAgeAux', 'txt_ComAdiAgeAux', 'txt_FeeGMXAux', 'txt_ComFacAux'], 0, [0], 0);

        if ($("input[id$='hid_IndiceGrupo']")[0].value > -1) {
            fn_ActualizaGrupo(0, $('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, ['PrimaNeta', 'PrimaCSC'], ['txt_PrimaNetaAux', 'txt_PrimaCSCAux'], 0);
            fn_CalculaReparto($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaCSC'], ['txt_PrimaNeta', 'txt_PrimaCSCAux']);
            fn_CalculaDistribucionGMX($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaCSC'], ['txt_PrimaNeta', 'txt_PrimaCSCAux']);
            fn_CalculaIntermediario($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaCSC'], ['txt_PrimaNeta', 'txt_PrimaCSCAux']);
            fn_CalculaReasegurador($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaCSC'], ['txt_PrimaNeta', 'txt_PrimaCSCAux']);
        }
        
    }
});

$("body").on("focusout", "[id*=gvd_Riesgo] .PrimaGRA", function (e) {
    var row = $(this).closest("tr");

    //Solo si el valor cambia
    if (parseFloat($(this)[0].value.replace(/,/g, "")) != $('[id*=txt_PrimaGRAAux]')[row[0].rowIndex - 1].value) {
        $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 2);
        $('[id*=txt_PrimaGRAAux]')[row[0].rowIndex - 1].value = $(this)[0].value.replace(/,/g, "");
        
        //Consolida la Prima Neta en base al Desglose de Primas
        fn_SumaHorizontal(row, ['txt_PrimaCSCAux', 'txt_PrimaGRAAux'], 'PrimaNeta', 'txt_PrimaNetaAux');

        fn_CalculaCuota(row);
        fn_CalculaMonto(row, 'ComAge', 'txt_PrimaNetaAux');
        fn_CalculaMonto(row, 'ComAdiAge', 'txt_PrimaNetaAux');
        fn_CalculaMonto(row, 'FeeGMX', 'txt_PrimaNetaAux');
        fn_CalculaComFac(row)

        //Actualiza la Suma de todas las Primas
        fn_SumaTotales('gvd_Riesgo', ['PrimaNeta', 'PrimaGRA', 'ComAge', 'ComAdiAge', 'FeeGMX', 'ComFac'], ['txt_PrimaNetaAux', 'txt_PrimaGRAAux', 'txt_ComAgeAux', 'txt_ComAdiAgeAux', 'txt_FeeGMXAux', 'txt_ComFacAux'], 0, [0], 0);

        if ($("input[id$='hid_IndiceGrupo']")[0].value > -1) {
            fn_ActualizaGrupo(0, $('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, ['PrimaNeta', 'PrimaGRA'], ['txt_PrimaNetaAux', 'txt_PrimaGRAAux'], 0);
            fn_CalculaReparto($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaGRA'], ['txt_PrimaNeta', 'txt_PrimaGRAAux']);
            fn_CalculaDistribucionGMX($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaGRA'], ['txt_PrimaNeta', 'txt_PrimaGRAAux']);
            fn_CalculaIntermediario($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaGRA'], ['txt_PrimaNeta', 'txt_PrimaGRAAux']);
            fn_CalculaReasegurador($('[id*=txt_Inciso]')[row[0].rowIndex - 1].value, -1, ['PrimaNeta', 'PrimaGRA'], ['txt_PrimaNeta', 'txt_PrimaGRAAux']);
        }
        
    }
});


$("body").on("focusout", "[id*=gvd_Riesgo] .PrcComAge", function (e) {
    fn_CalculaMonto($(this).closest("tr"), 'ComAge', 'txt_PrimaNetaAux');
    fn_SumaTotales('gvd_Riesgo', ['ComAge'], ['txt_ComAgeAux'], 0, [0], 0);
    fn_CalculaComFac($(this).closest("tr"));
});

$("body").on("focusout", "[id*=gvd_Riesgo] .PrcComAdiAge", function (e) {
    fn_CalculaMonto($(this).closest("tr"), 'ComAdiAge', 'txt_PrimaNetaAux');
    fn_SumaTotales('gvd_Riesgo', ['ComAdiAge'], ['txt_ComAdiAgeAux'], 0, [0], 0);
    fn_CalculaComFac($(this).closest("tr"));
});

$("body").on("focusout", "[id*=gvd_Riesgo] .PrcFeeGMX", function (e) {
    fn_CalculaMonto($(this).closest("tr"), 'FeeGMX', 'txt_PrimaNetaAux');
    fn_SumaTotales('gvd_Riesgo', ['FeeGMX'], ['txt_FeeGMXAux'], 0, [0], 0);
    fn_CalculaComFac($(this).closest("tr"));
});


$("body").on("focusout", "[id*=gvd_Riesgo] .ComAge", function (e) {
    var row = $(this).closest("tr");

    
    //Solo si el valor cambia
    if (parseFloat($(this)[0].value.replace(/,/g, "")) != $('[id*=txt_ComAgeAux]')[row[0].rowIndex - 1].value) {
        $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 2);
        $('[id*=txt_ComAgeAux]')[row[0].rowIndex - 1].value = $(this)[0].value.replace(/,/g, "");

        fn_CalculaPorcentaje(row.find('.PrcComAge')[0],
                             row.find('[id*=txt_ComAgeAux]')[0],
                             row.find('[id*=txt_PrimaNetaAux]')[0]);
        fn_SumaTotales('gvd_Riesgo', ['ComAge'], ['txt_ComAgeAux'], 0, [0], 0);
        fn_CalculaComFac(row);
    }
});

$("body").on("focusout", "[id*=gvd_Riesgo] .ComAdiAge", function (e) {
    var row = $(this).closest("tr");

    if (parseFloat($(this)[0].value.replace(/,/g, "")) != $('[id*=txt_ComAdiAgeAux]')[row[0].rowIndex - 1].value) {
        $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 4);
        $('[id*=txt_ComAdiAgeAux]')[row[0].rowIndex - 1].value = $(this)[0].value.replace(/,/g, "");

        fn_CalculaPorcentaje(row.find('.PrcComAdiAge')[0],
                             row.find('[id*=txt_ComAdiAgeAux]')[0],
                             row.find('[id*=txt_PrimaNetaAux]')[0]);
        fn_SumaTotales('gvd_Riesgo', ['ComAdiAge'], ['txt_ComAdiAgeAux'], 0, [0], 0);
        fn_CalculaComFac(row);
    }
});

$("body").on("focusout", "[id*=gvd_Riesgo] .FeeGMX", function (e) {
    var row = $(this).closest("tr");

    if (parseFloat($(this)[0].value.replace(/,/g, "")) != $('[id*=txt_FeeGMXAux]')[row[0].rowIndex - 1].value) {
        $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 2);
        $('[id*=txt_FeeGMXAux]')[row[0].rowIndex - 1].value = $(this)[0].value.replace(/,/g, "");

        fn_CalculaPorcentaje(row.find('.PrcFeeGMX')[0],
                             row.find('[id*=txt_FeeGMXAux]')[0],
                             row.find('[id*=txt_PrimaNetaAux]')[0]);
        fn_SumaTotales('gvd_Riesgo', ['FeeGMX'], ['txt_FeeGMXAux'], 0, [0], 0);
        fn_CalculaComFac(row);
    }
});

//Reparto por Porcentaje
$("body").on("focusout", "[id*=gvd_Reparto] .PrcPart", function (e) {
    var row = $(this).closest("tr");


    if (parseFloat($(this)[0].value.replace(/,/g, "")) != parseFloat(row.find('[id*=txt_PrcPartAux]')[0].value)) {
        $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 4, 1);
        row.find("[id*=txt_PrcPartAux]")[0].value = $(this)[0].value.replace(/,/g, "");
        
        //Aplica para la Distribución GMX y Coaseguradores
        fn_CalculaReparto(-1, row[0].rowIndex - 1, ['SumaAsegurada', 'PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_LimResp', 'txt_PrimaNeta', 'txt_PrimaINC', 'txt_PrimaTEV', 'txt_PrimaFHM', 'txt_PrimaRC', 'txt_PrimaCSC', 'txt_PrimaGRA']);
        fn_CalculaDistribucionGMX(-1, -1, ['SumaAsegurada', 'PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_LimResp', 'txt_PrimaNeta', 'txt_PrimaINC', 'txt_PrimaTEV', 'txt_PrimaFHM', 'txt_PrimaRC', 'txt_PrimaCSC', 'txt_PrimaGRA']);
        fn_CalculaIntermediario(-1, -1, ['SumaAsegurada', 'PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_LimResp', 'txt_PrimaNeta', 'txt_PrimaINC', 'txt_PrimaTEV', 'txt_PrimaFHM', 'txt_PrimaRC', 'txt_PrimaCSC', 'txt_PrimaGRA']);
        fn_CalculaReasegurador(-1, -1, ['SumaAsegurada', 'PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_LimResp', 'txt_PrimaNeta', 'txt_PrimaINC', 'txt_PrimaTEV', 'txt_PrimaFHM', 'txt_PrimaRC', 'txt_PrimaCSC', 'txt_PrimaGRA']);

        fn_SumaTotales('gvd_Reparto', ['PrcPart'], ['txt_PrcPartAux'], 0, [0], 0, 100);
    }
});

//Reparto por Monto
$("body").on("focusout", "[id*=gvd_Reparto] .SumaAsegurada", function (e) {
    var row = $(this).closest("tr");

    if (parseFloat($(this)[0].value.replace(/,/g, "")) != parseFloat(row.find("[id*=txt_LimRespAux]")[0].value)) {
        $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value), 2);
        row.find("[id*=txt_LimRespAux]")[0].value = $(this)[0].value.replace(/,/g, "");
        
        fn_CalculaPorcentaje(row.find('.PrcPart')[0],
                             row.find("[id*=txt_LimRespAux]")[0],
                             $("[id*=gvd_Agrupacion]").find("[id*=txt_LimRespAux]")[$("input[id$='hid_IndiceGrupo']")[0].value]);

        row.find("[id*=txt_PrcPartAux]")[0].value = row.find('.PrcPart')[0].value;

        //Aplica para la Distribución GMX y Coaseguradores
        fn_CalculaReparto(-1, row[0].rowIndex - 1, ['PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_PrimaNeta', 'txt_PrimaINC', 'txt_PrimaTEV', 'txt_PrimaFHM', 'txt_PrimaRC', 'txt_PrimaCSC', 'txt_PrimaGRA']);
        fn_CalculaDistribucionGMX(-1, -1, ['SumaAsegurada', 'PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_LimResp', 'txt_PrimaNeta', 'txt_PrimaINC', 'txt_PrimaTEV', 'txt_PrimaFHM', 'txt_PrimaRC', 'txt_PrimaCSC', 'txt_PrimaGRA']);
        fn_CalculaIntermediario(-1, -1, ['SumaAsegurada', 'PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_LimResp', 'txt_PrimaNeta', 'txt_PrimaINC', 'txt_PrimaTEV', 'txt_PrimaFHM', 'txt_PrimaRC', 'txt_PrimaCSC', 'txt_PrimaGRA']);
        fn_CalculaReasegurador(-1, -1, ['SumaAsegurada', 'PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_LimResp', 'txt_PrimaNeta', 'txt_PrimaINC', 'txt_PrimaTEV', 'txt_PrimaFHM', 'txt_PrimaRC', 'txt_PrimaCSC', 'txt_PrimaGRA']);

        fn_SumaTotales('gvd_Reparto', ['PrcPart'], ['txt_PrcPartAux'], 0, [0], 0, 100);
    }
    
});


$("body").on("focusout", "[id*=gvd_Capas] .PrcPartGMXRET", function (e) {
    var row = $(this).closest("tr");

    fn_CalculaCapasGMX(-1, row[0].rowIndex - 1, ['SumaAsegurada', 'PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_LimResp', 'txt_PrimaNeta', 'txt_PrimaINC', 'txt_PrimaTEV', 'txt_PrimaFHM', 'txt_PrimaRC', 'txt_PrimaCSC', 'txt_PrimaGRA'], 'RET');

    $('[id*=txt_PrcPartGMXRETAux]')[row[0].rowIndex - 1].value = $(this)[0].value.replace(/,/g, "");
    $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 4, 1);
});


$("body").on("focusout", "[id*=gvd_Capas] .PrcPartGMX", function (e) {
    var row = $(this).closest("tr");

    fn_CalculaCapasGMX(-1, row[0].rowIndex - 1, ['SumaAsegurada', 'PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_LimResp', 'txt_PrimaNeta', 'txt_PrimaINC', 'txt_PrimaTEV', 'txt_PrimaFHM', 'txt_PrimaRC', 'txt_PrimaCSC', 'txt_PrimaGRA'], '');

    $('[id*=txt_PrcPartGMXAux]')[row[0].rowIndex - 1].value = $(this)[0].value.replace(/,/g, "");
    $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 4, 1);
});


$("body").on("focusout", "[id*=gvd_Distribucion] .PrcPartGMX", function (e) {
    var row = $(this).closest("tr");

    fn_CalculaDistribucionGMX(-1, row[0].rowIndex - 1, ['SumaAsegurada', 'PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_LimResp', 'txt_PrimaNeta', 'txt_PrimaINC', 'txt_PrimaTEV', 'txt_PrimaFHM', 'txt_PrimaRC', 'txt_PrimaCSC', 'txt_PrimaGRA']);
    fn_CalculaIntermediario(-1, -1, ['SumaAsegurada', 'PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_LimResp', 'txt_PrimaNeta', 'txt_PrimaINC', 'txt_PrimaTEV', 'txt_PrimaFHM', 'txt_PrimaRC', 'txt_PrimaCSC', 'txt_PrimaGRA']);
    fn_CalculaReasegurador(-1, -1, ['SumaAsegurada', 'PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_LimResp', 'txt_PrimaNeta', 'txt_PrimaINC', 'txt_PrimaTEV', 'txt_PrimaFHM', 'txt_PrimaRC', 'txt_PrimaCSC', 'txt_PrimaGRA']);

    $('[id*=txt_PrcPartGMXAux]')[row[0].rowIndex - 1].value = $(this)[0].value.replace(/,/g, "");
    $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 4, 1);

    fn_SumaTotales('gvd_Distribucion', ['PrcPartGMX'], ['txt_PrcPartGMXAux'], 0, [0], 0, 100);
});


$("body").on("focusout", "[id*=gvd_Distribucion] .SumaAsegurada", function (e) {
    var row = $(this).closest("tr");

    if (parseFloat($(this)[0].value.replace(/,/g, "")) != parseFloat(row.find("[id*=txt_LimRespAux]")[0].value)) {
        $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value), 2);
        row.find("[id*=txt_LimRespAux]")[0].value = $(this)[0].value.replace(/,/g, "");

        //Validar No Proporcional
        var chk_NoProporcional = $("[id*=gvd_Agrupacion] .chk_NoProporcional")[$("input[id$='hid_IndiceGrupo']")[0].value];
        if ($(chk_NoProporcional)[0].childNodes[0].checked == true) {
            var Monto =  $("[id*=gvd_CapasColocacion").find("[id*=txt_LimRespAux]")[$("input[id$='hid_IndiceCapa']")[0].value];
        }
        else {
            var Monto =  $("[id*=gvd_Reparto").find("[id*=txt_LimRespAux]")[1];
        }

        fn_CalculaPorcentaje(row.find('.PrcPartGMX')[0],
                             row.find("[id*=txt_LimRespAux]")[0],
                             Monto);

        row.find("[id*=txt_PrcPartGMXAux]")[0].value = row.find('.PrcPartGMX')[0].value;

        fn_CalculaDistribucionGMX(-1, row[0].rowIndex - 1, ['PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_PrimaNeta', 'txt_PrimaINC', 'txt_PrimaTEV', 'txt_PrimaFHM', 'txt_PrimaRC', 'txt_PrimaCSC', 'txt_PrimaGRA']);
        fn_CalculaIntermediario(-1, -1, ['SumaAsegurada', 'PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_LimResp', 'txt_PrimaNeta', 'txt_PrimaINC', 'txt_PrimaTEV', 'txt_PrimaFHM', 'txt_PrimaRC', 'txt_PrimaCSC', 'txt_PrimaGRA']);
        fn_CalculaReasegurador(-1, -1, ['SumaAsegurada', 'PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_LimResp', 'txt_PrimaNeta', 'txt_PrimaINC', 'txt_PrimaTEV', 'txt_PrimaFHM', 'txt_PrimaRC', 'txt_PrimaCSC', 'txt_PrimaGRA']);

        fn_SumaTotales('gvd_Distribucion', ['PrcPartGMX'], ['txt_PrcPartGMXAux'], 0, [0], 0, 100);
    }
});

//Calculo de la Comisión de Facultativo
function fn_CalculaComFac(row) {
    row.find('[id*=txt_PrcComFac]')[0].value = parseFloat(row.find('[id*=txt_PrcComAge]')[0].value) +
                                               parseFloat(row.find('[id*=txt_PrcComAdiAge]')[0].value) +
                                               parseFloat(row.find('[id*=txt_PrcFeeGMX]')[0].value);

    row.find('[id*=txt_ComFacAux]')[0].value = parseFloat(row.find('[id*=txt_ComAgeAux]')[0].value) +
                                               parseFloat(row.find('[id*=txt_ComAdiAgeAux]')[0].value) +
                                               parseFloat(row.find('[id*=txt_FeeGMXAux]')[0].value);

    row.find('[id*=txt_ComFac]')[0].value = fn_FormatoMonto(parseFloat(row.find('[id*=txt_ComFacAux]')[0].value.replace(/,/g, "")), 2);

    fn_SumaTotales('gvd_Riesgo', ['ComFac'], ['txt_ComFacAux'], 0, [0], 0);
}

//Calculo de la DIstribución General con Coaseguro
function fn_CalculaReparto(Inciso, Posicion, ArrayClase, ArrayControl) {
    var Monto = undefined;
    var Control = undefined;
    var Clase = undefined;
    
    var Index = $("input[id$='hid_IndiceGrupo']")[0].value;

    //Si existe agrupación seleccionada
    if (Index > -1) {
        var Incisos = $("[id*=gvd_Agrupacion] .Incisos")[Index].value.split(',');
        var inicio = 0;
        var fin = -1;

        //Si se trata de la AGrupación en Pantalla
        if (Incisos.indexOf(Inciso.toString()) != -1 || Inciso == -1) {
            if (Posicion > -1) {
                inicio = Posicion;
                fin = Posicion;
            }
            else {
                inicio = 0;
                fin = $("[id*=gvd_Reparto]")[0].rows.length - 2;
            }

            for (Posicion = inicio; Posicion <= fin; Posicion++) {
                var Prc = $("[id*=gvd_Reparto] .PrcPart")[Posicion].value
                for (i = 0; i < ArrayClase.length; i++) {

                    Monto = $("[id*=gvd_Agrupacion]").find("[id*=" + ArrayControl[i] + "Aux]")[Index];

                    if (Monto != undefined) {
                        Control = $("[id*=gvd_Reparto]").find("[id*=" + ArrayControl[i] + "Aux]")[Posicion];
                        if (Control != undefined) {
                            Control.value = Monto.value * (Prc / 100);
                        }

                        Clase = $("[id*=gvd_Reparto] ." + ArrayClase[i])[Posicion];
                        if (Clase != undefined) {
                            Clase.value = fn_FormatoMonto(parseFloat(Control.value), 2);
                        }
                    }
                }
            }
            fn_SumaTotales('gvd_Reparto', ['SumaAsegurada', 'PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_LimRespAux', 'txt_PrimaNetaAux', 'txt_PrimaINCAux', 'txt_PrimaTEVAux', 'txt_PrimaFHMAux', 'txt_PrimaRCAux', 'txt_PrimaCSCAux', 'txt_PrimaGRAAux'], 0, [0], 0);
        }
    }
}

//Calculo de las Capas correspondiente a GMX
function fn_CalculaCapasGMX(Inciso, Posicion, ArrayClase, ArrayControl, Tipo) {
    var Monto = undefined;
    var Control = undefined;
    var Clase = undefined;

    var Index = $("input[id$='hid_IndiceGrupo']")[0].value;

    //Si existe agrupación seleccionada
    if (Index > -1) {
        var Incisos = $("[id*=gvd_Agrupacion] .Incisos")[Index].value.split(',');
        var inicio = 0;
        var fin = -1;

        if (Incisos.indexOf(Inciso.toString()) != -1 || Inciso == -1) {
            if (Posicion > -1) {
                inicio = Posicion;
                fin = Posicion;
            }
            else {
                inicio = 0;
                fin = $("[id*=gvd_Capas]")[0].rows.length - 2;
            }

            for (Posicion = inicio; Posicion <= fin; Posicion++) {
                var Prc = $("[id*=gvd_Capas] .PrcPartGMX" + Tipo)[Posicion].value

                for (i = 0; i < ArrayClase.length; i++) {
                    Monto = $("[id*=gvd_Reparto]").find("[id*=" + ArrayControl[i] + "Aux]")[1];
                    if (Monto != undefined) {
                        Control = $("[id*=gvd_Capas]").find("[id*=" + ArrayControl[i] + Tipo + "Aux]")[Posicion];
                        if (Control != undefined) {
                            Control.value = Monto.value * (Prc / 100);
                        }

                        Clase = $("[id*=gvd_Capas] ." + ArrayClase[i] + Tipo)[Posicion];
                        if (Clase != undefined) {
                            Clase.value = fn_FormatoMonto(parseFloat(Control.value), 2);
                        }
                    }
                }

                //Calcula el porcentaje sobre Coaseguro
                Monto = $("[id*=gvd_Reparto]").find("[id*=" + ArrayControl[0] + "Aux]")[0]
                if (Monto != undefined) {
                    Control = $("[id*=gvd_Capas]").find("[id*=" + ArrayControl[0] + Tipo + "Aux]")[Posicion];
                    $("[id*=gvd_Capas] .PrcPart" + Tipo)[Posicion].value = fn_FormatoMonto(parseFloat((Control.value / Monto.value) * 100), 4);
                }
            }
        }
    }
}


//Calculo de la Distribución correspondiente a GMX
function fn_CalculaDistribucionGMX(Inciso, Posicion, ArrayClase, ArrayControl) {
    var Monto = undefined;
    var Control = undefined;
    var Clase = undefined;

    var Index = $("input[id$='hid_IndiceGrupo']")[0].value;

    //Si existe agrupación seleccionada
    if (Index > -1) {
        var Incisos = $("[id*=gvd_Agrupacion] .Incisos")[Index].value.split(',');
        var inicio = 0;
        var fin = -1;
        var Gread = 'gvd_Reparto';
        var IndiceCapa = 1;

        if (Incisos.indexOf(Inciso.toString()) != -1 || Inciso == -1) {
            if (Posicion > -1) {
                inicio = Posicion;
                fin = Posicion;
            }
            else {
                inicio = 0;
                fin = $("[id*=gvd_Distribucion]")[0].rows.length - 2;
            }

            var chk_NoProporcional = $("[id*=gvd_Agrupacion] .chk_NoProporcional")[Index];
            if ($(chk_NoProporcional)[0].childNodes[0].checked == true) {
                Gread = 'gvd_CapasColocacion';
                IndiceCapa = $("input[id$='hid_IndiceCapa']")[0].value;
            }

            for (Posicion = inicio; Posicion <= fin; Posicion++) {
                var Prc = $("[id*=gvd_Distribucion] .PrcPartGMX")[Posicion].value
                
                for (i = 0; i < ArrayClase.length; i++) {

                    Monto = $("[id*=" + Gread).find("[id*=" + ArrayControl[i] + "Aux]")[IndiceCapa];

                    if (Monto != undefined) {
                        Control = $("[id*=gvd_Distribucion]").find("[id*=" + ArrayControl[i] + "Aux]")[Posicion];
                        if (Control != undefined) {
                            Control.value = Monto.value * (Prc / 100);
                        }

                        Clase = $("[id*=gvd_Distribucion] ." + ArrayClase[i])[Posicion];
                        if (Clase!= undefined) {
                            Clase.value = fn_FormatoMonto(parseFloat(Control.value), 2);
                        }
                    }
                }

                if ($(chk_NoProporcional)[0].childNodes[0].checked == false) {
                    //Calcula el porcentaje sobre Coaseguro
                    Monto = $("[id*=gvd_Reparto]").find("[id*=" + ArrayControl[0] + "Aux]")[0]
                    if (Monto != undefined) {
                        Control = $("[id*=gvd_Distribucion]").find("[id*=" + ArrayControl[0] + "Aux]")[Posicion];
                        $("[id*=gvd_Distribucion] .PrcPart")[Posicion].value = fn_FormatoMonto(parseFloat((Control.value / Monto.value) * 100), 4);
                    }
                }
                else {
                    $("[id*=gvd_Distribucion] .PrcPart")[Posicion].value = fn_FormatoMonto(parseFloat(Prc), 4);
                } 
            }
            fn_SumaTotales('gvd_Distribucion', ['SumaAsegurada', 'PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_LimRespAux', 'txt_PrimaNetaAux', 'txt_PrimaINCAux', 'txt_PrimaTEVAux', 'txt_PrimaFHMAux', 'txt_PrimaRCAux', 'txt_PrimaCSCAux', 'txt_PrimaGRAAux'], 0, [0], 0);
        }
    }
}

//Procesos Auxiliares

$("body").on("focusout", ".Observaciones", function (e) {
    var Index = $("input[id$='hid_IndiceBroker']")[0].value;

    //SI existe Broker Seleccionado
    if (Index > -1) {
        if ($("[id*=gvd_Intermediario] .Clave")[Index].innerText == 0) {
            var Index = $("input[id$='hid_IndiceReas']")[0].value;
            if (Index > -1) {
                $("[id*=gvd_Reasegurador] .Observaciones")[Index].value = $(this)[0].value;
            }
        }
        else {
            $("[id*=gvd_Intermediario] .Observaciones")[Index].value = $(this)[0].value;
        }
    }
});


//Porcentaje
$("body").on("focusout", ".PrcComNeta", function (e) {
    fn_CalculoComision('prc', ["Neta"]);
});

$("body").on("focusout", ".PrcComINC", function (e) {
    fn_CalculoComision('prc', ["INC"]);
});

$("body").on("focusout", ".PrcComFHM", function (e) {
    fn_CalculoComision('prc', ["FHM"]);
});

$("body").on("focusout", ".PrcComTEV", function (e) {
    fn_CalculoComision('prc', ["TEV"]);
});

$("body").on("focusout", ".PrcComRC", function (e) {
    fn_CalculoComision('prc', ["RC"]);
});

$("body").on("focusout", ".PrcComCSC", function (e) {
    fn_CalculoComision('prc', ["CSC"]);
});

$("body").on("focusout", ".PrcComGRA", function (e) {
    fn_CalculoComision('prc', ["GRA"]);
});


//Comision
$("body").on("focusout", ".ComNeta", function (e) {
    fn_CalculoComision('com', ["Neta"]);
});

$("body").on("focusout", ".ComINC", function (e) {
    fn_CalculoComision('com', ["INC"]);
});

$("body").on("focusout", ".ComFHM", function (e) {
    fn_CalculoComision('com', ["FHM"]);
});

$("body").on("focusout", ".ComTEV", function (e) {
    fn_CalculoComision('com', ["TEV"]);
});

$("body").on("focusout", ".ComRC", function (e) {
    fn_CalculoComision('com', ["RC"]);
});

$("body").on("focusout", ".ComCSC", function (e) {
    fn_CalculoComision('com', ["CSC"]);
});

$("body").on("focusout", ".ComGRA", function (e) {
    fn_CalculoComision('com', ["GRA"]);
});


//PNR
$("body").on("focusout", ".PnrNeta", function (e) {
    fn_CalculoComision('pnr', ["Neta"]);
});

$("body").on("focusout", ".PnrINC", function (e) {
    fn_CalculoComision('pnr', ["INC"]);
});

$("body").on("focusout", ".PnrFHM", function (e) {
    fn_CalculoComision('pnr', ["FHM"]);
});

$("body").on("focusout", ".PnrTEV", function (e) {
    fn_CalculoComision('pnr', ["TEV"]);
});

$("body").on("focusout", ".PnrRC", function (e) {
    fn_CalculoComision('pnr', ["RC"]);
});

$("body").on("focusout", ".PnrCSC", function (e) {
    fn_CalculoComision('pnr', ["CSC"]);
});

$("body").on("focusout", ".PnrGRA", function (e) {
    fn_CalculoComision('pnr', ["GRA"]);
});


//Porcentaje
$("body").on("focusout", "[id*=gvd_Pagos] .Prc", function (e) {
    var row = $(this).closest("tr");
    fn_CalculoPago($(".PnrNeta")[0].value.replace(/,/g, ""), 'prc', row[0].rowIndex - 1);
    row.find('[id*=txt_ImporteAux]')[0].value = row.find('[id*=txt_Importe]')[0].value
});


//Importe
$("body").on("focusout", "[id*=gvd_Pagos] .Importe", function (e) {
    var row = $(this).closest("tr");
    fn_CalculoPago($(".PnrNeta")[0].value.replace(/,/g, ""), 'mnt', row[0].rowIndex - 1);
    row.find('[id*=txt_ImporteAux]')[0].value = row.find('[id*=txt_Importe]')[0].value
});


//Porcentaje de Participación Intermediarios
$("body").on("focusout", "[id*=gvd_Intermediario] .PrcPart", function (e) {
    var row = $(this).closest("tr");
    fn_CalculaIntermediario(-1, row[0].rowIndex - 1, ['SumaAsegurada', 'PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_LimResp', 'txt_PrimaNeta', 'txt_PrimaINC', 'txt_PrimaTEV', 'txt_PrimaFHM', 'txt_PrimaRC', 'txt_PrimaCSC', 'txt_PrimaGRA']);
    fn_CalculaReasegurador(-1, -1, ['SumaAsegurada', 'PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_LimResp', 'txt_PrimaNeta', 'txt_PrimaINC', 'txt_PrimaTEV', 'txt_PrimaFHM', 'txt_PrimaRC', 'txt_PrimaCSC', 'txt_PrimaGRA']);
    $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 4, 1);
});

$("body").on("focusout", "[id*=gvd_Intermediario] .SumaAsegurada", function (e) {
    var row = $(this).closest("tr");

    if (parseFloat($(this)[0].value.replace(/,/g, "")) != parseFloat(row.find("[id*=txt_LimRespAux]")[0].value)) {
        $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value), 2);
        row.find("[id*=txt_LimRespAux]")[0].value = $(this)[0].value.replace(/,/g, "");
        
        fn_CalculaPorcentaje(row.find('.PrcPart')[0],
                             row.find("[id*=txt_LimRespAux]")[0],
                             $("[id*=gvd_Distribucion]").find("[id*=txt_LimRespAux]")[5]);

      
        fn_CalculaIntermediario(-1, row[0].rowIndex - 1, ['PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_PrimaNeta', 'txt_PrimaINC', 'txt_PrimaTEV', 'txt_PrimaFHM', 'txt_PrimaRC', 'txt_PrimaCSC', 'txt_PrimaGRA']);
        fn_CalculaReasegurador(-1, -1, ['PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_PrimaNeta', 'txt_PrimaINC', 'txt_PrimaTEV', 'txt_PrimaFHM', 'txt_PrimaRC', 'txt_PrimaCSC', 'txt_PrimaGRA']);
    }
});


//Porcentaje de Participación Reaseguradores
$("body").on("focusout", "[id*=gvd_Reasegurador] .PrcPart", function (e) {
    var row = $(this).closest("tr");
    fn_CalculaReasegurador(-1, row[0].rowIndex - 1, ['SumaAsegurada', 'PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_LimResp', 'txt_PrimaNeta', 'txt_PrimaINC', 'txt_PrimaTEV', 'txt_PrimaFHM', 'txt_PrimaRC', 'txt_PrimaCSC', 'txt_PrimaGRA']);
    $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 4, 1);
});


$("body").on("focusout", "[id*=gvd_Reasegurador] .SumaAsegurada", function (e) {
    var row = $(this).closest("tr");

    if (parseFloat($(this)[0].value.replace(/,/g, "")) != parseFloat(row.find("[id*=txt_LimRespAux]")[0].value)) {
        $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value), 2);
        row.find("[id*=txt_LimRespAux]")[0].value = $(this)[0].value.replace(/,/g, "");

        fn_CalculaPorcentaje(row.find('.PrcPart')[0],
                             row.find("[id*=txt_LimRespAux]")[0],
                             $("[id*=gvd_Intermediario]").find("[id*=txt_LimRespAux]")[$("input[id$='hid_IndiceBroker']")[0].value]);

        fn_CalculaReasegurador(-1, row[0].rowIndex - 1, ['PrimaNeta', 'PrimaINC', 'PrimaTEV', 'PrimaFHM', 'PrimaRC', 'PrimaCSC', 'PrimaGRA'], ['txt_PrimaNeta', 'txt_PrimaINC', 'txt_PrimaTEV', 'txt_PrimaFHM', 'txt_PrimaRC', 'txt_PrimaCSC', 'txt_PrimaGRA']);
    }
});

$("body").on("focusout", "[id*=gvd_Intermediario] .PrcCorretaje", function (e) {
    var row = $(this).closest("tr");
    fn_CalculaMonto(row, 'Corretaje', 'txt_PrimaNetaAux');
});


$("body").on("focusout", "[id*=gvd_Intermediario] .Corretaje", function (e) {
    var row = $(this).closest("tr");

    //Solo si el valor cambia
    if (parseFloat($(this)[0].value.replace(/,/g, "")) != parseFloat(row.find("[id*=txt_CorretajeAux]")[0].value)) {
        $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 2);
        $('[id*=txt_CorretajeAux]')[row[0].rowIndex - 1].value = $(this)[0].value.replace(/,/g, "");

        fn_CalculaPorcentaje(row.find('.PrcCorretaje')[0],
                             row.find('[id*=txt_CorretajeAux]')[0],
                             row.find('[id*=txt_PrimaNetaAux]')[0]);
    }
});

function fn_CalculoComision(Factor, ArrayTipo) {
    var Index = $("input[id$='hid_IndiceBroker']")[0].value;
    var grid = '';

    if (Index > -1) {
        //SI se trata de un Negocio Directo o por Intermediario
        if ($("[id*=gvd_Intermediario] .Clave")[Index].innerText == 0) {
            var Index = $("input[id$='hid_IndiceReas']")[0].value;
            if (Index > -1) {
                grid = "[id*=gvd_Reasegurador]";
            }
        }
        else {
            grid = "[id*=gvd_Intermediario]";
        }

        if (grid != '') {
            var Prima = undefined;
            var Prc = 0;
            var Comision = 0;
            var PNR = 0;
            var bln_Deglose = false;
            for (i = 0; i <= ArrayTipo.length - 1; i++) {
                Prima = $(grid).find("[id*=txt_Prima" + ArrayTipo[i] + "Aux]")[Index];
                if (Prima != undefined) {
                    if (ArrayTipo[i] != 'Neta') {
                        var bln_Deglose = true;
                    }
                    switch (Factor) {
                        case 'prc':
                            Prc = $(".PrcCom" + ArrayTipo[i])[0].value;
                            Comision = Prima.value * (Prc / 100);
                            PNR = Prima.value - Comision;
                            break;
                        case 'com':
                            Comision = $(".Com" + ArrayTipo[i])[0].value.replace(/,/g, "");
                            Prc = (Comision / Prima.value) * 100;
                            PNR = Prima.value - Comision;
                            break;
                        case 'pnr':
                            PNR = $(".Pnr" + ArrayTipo[i])[0].value.replace(/,/g, "");
                            Comision = Prima.value - PNR;
                            Prc = (Comision / Prima.value) * 100;
                            break;
                    }
                    $(grid).find("[id*=txt_PrcCom" + ArrayTipo[i] + "]")[Index].value = Prc;
                    $(grid).find("[id*=txt_Com" + ArrayTipo[i] + "]")[Index].value = Comision;
                    $(grid).find("[id*=txt_Pnr" + ArrayTipo[i] + "]")[Index].value = PNR;

                    $(".PrcCom" + ArrayTipo[i])[0].value = fn_FormatoMonto(parseFloat(Prc), 4, 1)
                    $(".Com" + ArrayTipo[i])[0].value = fn_FormatoMonto(parseFloat(Comision), 2);
                    $("[id*=txt_Com" + ArrayTipo[i] + "Aux]")[0].value = Comision;
                    $(".Pnr" + ArrayTipo[i])[0].value = fn_FormatoMonto(parseFloat(PNR), 2);
                }
            }


            $("[id*=gvd_Pagos] .Prc").each(function (e) {
                var row = $(this).closest("tr");
                fn_CalculoPago(PNR, 'prc', row[0].rowIndex - 1);
                fn_CalculoPago(PNR, 'mtn', row[0].rowIndex - 1);
                row.find('[id*=txt_ImporteAux]')[0].value = row.find('[id*=txt_Importe]')[0].value.replace(/,/g, "");
            });

            //Si se desglosa por Cobertura de Prima
            if (bln_Deglose == true) {
                $(".PrcComNeta")[0].value = fn_FormatoMonto(fn_TotalesComision('PrcCom', ['INC', 'TEV', 'FHM', 'RC', 'CSC', 'GRA']), 4, 1);
                $("[id*=txt_ComNetaAux]")[0].value = fn_TotalesComision('Com', ['INC', 'TEV', 'FHM', 'RC', 'CSC', 'GRA']);
                $(".ComNeta")[0].value = fn_FormatoMonto(parseFloat($("[id*=txt_ComNetaAux]")[0].value), 2);
                $(".PnrNeta")[0].value = fn_FormatoMonto(fn_TotalesComision('Pnr', ['INC', 'TEV', 'FHM', 'RC', 'CSC', 'GRA']), 2);
            }
        }
    }
}


function fn_TotalesComision(Clase, ArrayTipo) {
    var suma = 0;
    var Elemento = undefined;
    for (i = 0; i <= ArrayTipo.length - 1; i++) {
        Elemento = $("." + Clase + ArrayTipo[i])[0]
        if (Elemento != undefined) {
            suma = suma + parseFloat(Elemento.value.replace(/,/g, ""));
        }
    }
    return suma;
}

//Calculo del Corretaje
function fn_CalculaCorretaje(Posicion, Prc) {
    if ($("[id*=gvd_Intermediario] .Clave")[Posicion].innerText > 0) {
        $("[id*=gvd_Intermediario]").find("[id*=txt_CorretajeAux]")[Posicion].value = $("[id*=gvd_Intermediario]").find("[id*=txt_PrimaNetaAux]")[Posicion].value * (Prc.value / 100);
        $("[id*=gvd_Intermediario] .Corretaje")[Posicion].value = fn_FormatoMonto(parseFloat($("[id*=gvd_Intermediario]").find("[id*=txt_CorretajeAux]")[Posicion].value), 2);
        Prc.value = fn_FormatoMonto(parseFloat(Prc.value), 4, 1)
    }
}

function fn_CalculoPago(PNR,Factor,Posicion) {
    var Index = $("input[id$='hid_IndiceBroker']")[0].value;

    if (Index > -1) {
        var Prc = $("[id*=gvd_Pagos] .Prc")[Posicion];
        var Importe = $("[id*=gvd_Pagos] .Importe")[Posicion];

        switch (Factor) {
            case 'prc':
                Importe.value = fn_FormatoMonto(parseFloat(PNR * (Prc.value / 100)), 2);
                break;
            case 'mnt':
                Prc.value = fn_FormatoMonto(parseFloat((Importe.value / PNR) * 100), 4, 1);
                break;
        }
    }
}


//Calculo de la Distribución correspondiente a GMX
function fn_CalculaIntermediario(Inciso, Posicion, ArrayClase , ArrayControl) {
    var Monto = undefined;
    var Control = undefined;
    var Clase = undefined;

    var Index = $("input[id$='hid_IndiceGrupo']")[0].value;
   
    //Si existe agrupación seleccionada
    if (Index > -1) {
        var Incisos = $("[id*=gvd_Agrupacion] .Incisos")[Index].value.split(',');
        var inicio = 0;
        var fin = -1;

        if (Incisos.indexOf(Inciso.toString()) != -1 || Inciso == -1) {

            if (Posicion > -1) {
                inicio = Posicion;
                fin = Posicion;
            }
            else {
                inicio = 0;
                fin = $("[id*=gvd_Intermediario] tr").length - 2;
            }

            for (Posicion = inicio; Posicion <= fin; Posicion++) {
                var Prc = $("[id*=gvd_Intermediario] .PrcPart")[Posicion].value

                for (i = 0; i < ArrayClase.length; i++) {
                    Monto = $("[id*=gvd_Distribucion]").find("[id*=" + ArrayControl[i] + "Aux]")[5];

                    if (Monto != undefined) {
                        Control = $("[id*=gvd_Intermediario]").find("[id*=" + ArrayControl[i] + "Aux]")[Posicion];

                        if (Control != undefined) {
                            Control.value = Monto.value * (Prc / 100);
                        }
                        
                        Clase = $("[id*=gvd_Intermediario] ." + ArrayClase[i])[Posicion];
                        if (Clase != undefined) {
                            Clase.value = fn_FormatoMonto(parseFloat(Control.value), 2);
                        }
                    }
                }

                var chk_NoProporcional = $("[id*=gvd_Agrupacion] .chk_NoProporcional")[Index];
                if ($(chk_NoProporcional)[0].childNodes[0].checked == false) {
                    //Calcula el porcentaje sobre Coaseguro
                    //Monto = $("[id*=gvd_Reparto]").find("[id*=" + ArrayControl[0] + "Aux]")[0]
                    Monto = $("[id*=gvd_Distribucion]").find("[id*=txt_LimRespAux]")[0];
                    if (Monto != undefined) {
                        Control = $("[id*=gvd_Intermediario]").find("[id*=txt_LimRespAux]")[Posicion];
                        $("[id*=gvd_Intermediario] .PrcPartCoas")[Posicion].value = fn_FormatoMonto(parseFloat((Control.value / Monto.value) * 100), 4);
                    }
                }
                else {
                    $("[id*=gvd_Intermediario] .PrcPartCoas")[Posicion].value = fn_FormatoMonto(parseFloat(Prc), 4);
                }

                //Calculo de Corretaje
                fn_CalculaCorretaje(Posicion, $("[id*=gvd_Intermediario] .PrcCorretaje")[Posicion]);

                //Calculo de Comisiones
                fn_CalculoComision('prc', ['INC', 'TEV', 'FHM', 'RC', 'CSC', 'GRA', 'Neta']);
            }
        }
    }
}

function fn_CalculaReasegurador(Inciso, Posicion, ArrayClase, ArrayControl) {
    var Monto = undefined;
    var Control = undefined;
    var Clase = undefined;

    var Index = $("input[id$='hid_IndiceGrupo']")[0].value;
    var IndexBroker = $("input[id$='hid_IndiceBroker']")[0].value;

    //Si existe agrupación seleccionada
    if (Index > -1) {
        var Incisos = $("[id*=gvd_Agrupacion] .Incisos")[Index].value.split(',');
        var inicio = 0;
        var fin = -1;

        if (Incisos.indexOf(Inciso.toString()) != -1 || Inciso == -1) {

            if (Posicion > -1) {
                inicio = Posicion;
                fin = Posicion;
            }
            else {
                inicio = 0;
                fin = $("[id*=gvd_Reasegurador] tr").length - 2;
            }

            for (Posicion = inicio; Posicion <= fin; Posicion++) {
                var Prc = $("[id*=gvd_Reasegurador] .PrcPart")[Posicion].value

                for (i = 0; i < ArrayClase.length; i++) {
                    Monto = $("[id*=gvd_Intermediario]").find("[id*=" + ArrayControl[i] + "Aux]")[IndexBroker];
                    if (Monto != undefined) {
                        Control = $("[id*=gvd_Reasegurador]").find("[id*=" + ArrayControl[i] + "Aux]")[Posicion];
                        if (Control != undefined) {
                            Control.value = Monto.value * (Prc / 100);
                        }
                        
                        Clase = $("[id*=gvd_Reasegurador] ." + ArrayClase[i])[Posicion];
                        if (Clase != undefined) {
                            Clase.value = fn_FormatoMonto(parseFloat(Control.value), 2);
                        }
                    }
                }

                var chk_NoProporcional = $("[id*=gvd_Agrupacion] .chk_NoProporcional")[Index];
                if ($(chk_NoProporcional)[0].childNodes[0].checked == false) {
                    //Calcula el porcentaje sobre Coaseguro
                    Monto = $("[id*=gvd_Reparto]").find("[id*=txt_LimRespAux]")[0]
                    if (Monto != undefined) {
                        Control = $("[id*=gvd_Reasegurador]").find("[id*=txt_LimRespAux]")[Posicion];
                        $("[id*=gvd_Reasegurador] .PrcPart100")[Posicion].value = fn_FormatoMonto(parseFloat((Control.value / Monto.value) * 100), 4);
                    }
                }
                else {
                    $("[id*=gvd_Reasegurador] .PrcPart100")[Posicion].value = fn_FormatoMonto(parseFloat(Prc), 4);
                }
                
                //Calculo de Comisiones
                fn_CalculoComision('prc', ['INC', 'TEV', 'FHM', 'RC', 'CSC', 'GRA', 'Neta']);
            }
        }
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
$("body").on("focus", ".Seleccion", function (e) {
    fn_Seleccion(this);
});
//---------------------------------------------------------------




//-----------------------------------------------------EVENTOS FOCUSOUT-------------------------------------------
//Descripción de Responsable
$("body").on("focusout", "[id$=txt_SearchResp]", function () {
    if ($(this)[0].value == '') {
        $("input[id$='txt_ClaveResp']")[0].value = ''
    }
    fn_EvaluaAutoComplete('txt_ClaveResp', 'txt_SearchResp');
});

//Descripción de Regional
$("body").on("focusout", "[id$=txt_SearchOfi]", function () {
    if ($(this)[0].value == '') {
        $("input[id$='txt_ClaveOfi']")[0].value = ''
    }
    fn_EvaluaAutoComplete('txt_ClaveOfi', 'txt_SearchOfi');
});

//Descripción de Asegurado
$("body").on("focusout", "[id$=txt_SearchAse]", function (e) {
    fn_EvaluaAutoComplete('txt_ClaveAseg', 'txt_SearchAse');
    $("input[id$='lbl_Asegurado']")[0].value = $(this)[0].value;
});

//Descripción de Tipo de Agente
$("body").on("focusout", "[id$=txt_SearchTag]", function () {
    var blnClear = 0;

    if ($(this)[0].value == '') {
        $("input[id$='txt_ClaveTag']")[0].value = ''
        blnClear = 1
    }
    else if ($("input[id$='txt_ClaveTag']")[0].value != $("input[id$='txt_ClaveTagAux']")[0].value) {
        $("input[id$='txt_ClaveTagAux']")[0].value = $("input[id$='txt_ClaveTag']")[0].value;
        blnClear = 1;
    }

    if (blnClear == 1) {
        $("input[id$='txt_ClaveAge']")[0].value = '';
        $("input[id$='txt_SearchAge']")[0].value = '';
    }

    fn_EvaluaAutoComplete('txt_ClaveTag', 'txt_SearchTag');
});

//Descripción de Suscriptor
$("body").on("focusout", "[id$=txt_SearchSusc]", function () {
    if ($(this)[0].value == '') {
        $("input[id$='txt_ClaveSusc']")[0].value = ''
    }
    fn_EvaluaAutoComplete('txt_ClaveSusc', 'txt_SearchSusc');
});

//Descripción de Sucursal Poliza
$("body").on("focusout", "[id$=txt_SearchSuc]", function () {
    if ($(this)[0].value == '') {
        $("input[id$='txt_ClaveSuc']")[0].value = ''
    }
});

//Descripción de Producto
$("body").on("focusout", "[id$=txt_SearchRam]", function () {
    if ($(this)[0].value == '') {
        $("input[id$='txt_ClaveRam']")[0].value = ''
    }
});

//Descripción de Tipo de Endoso
$("body").on("focusout", "[id$=txt_SearchGre]", function () {
    var blnClear = 0;

    if ($(this)[0].value == '') {
        $("input[id$='txt_ClaveGre']")[0].value = ''
        blnClear = 1
    }
    else if ($("input[id$='txt_ClaveGre']")[0].value != $("input[id$='txt_ClaveGreAux']")[0].value) {
        $("input[id$='txt_ClaveGreAux']")[0].value = $("input[id$='txt_ClaveGre']")[0].value;
        blnClear = 1;
    }

    if (blnClear == 1) {
        $("input[id$='txt_ClaveTte']")[0].value = '';
        $("input[id$='txt_SearchTte']")[0].value = '';
    }

    fn_EvaluaAutoComplete('txt_ClaveGre', 'txt_SearchGre');
});

//Descripción de Endoso
$("body").on("focusout", "[id$=txt_SearchTte]", function () {
    if ($(this)[0].value == '') {
        $("input[id$='txt_ClaveTte']")[0].value = ''
    }
    fn_EvaluaAutoComplete('txt_ClaveTte', 'txt_SearchTte');
});

//Descripcion de Giro
$("body").on("focusout", "[id$=txt_SearchGiro]", function (e) {
    fn_EvaluaAutoComplete('txt_ClaveGiro', 'txt_SearchGiro');
});


//Busqueda de Sucursal por Clave
$("body").on("focusout", "[id$=txt_ClaveOfi]", function (e) {
    var Id = $(this)[0].value;
    if (Id == '') {
        $("input[id$='txt_SearchOfi']")[0].value = '';
    }
    else {
        $.ajax({
            url: "../LocalServices/ConsultaBD.asmx/GetSucursal",
            data: "{ 'Id': " + Id + "}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $("input[id$='txt_SearchOfi']")[0].value = data.d;
            },
            error: function (response) {
                fn_MuestraMensaje('JSON', response.responseText, 2);
            },
        });
    }
});

//Busqueda de Agente por Clave
$("body").on("focusout", "[id$=txt_ClaveAge]", function (e) {
    var Id = $(this)[0].value;
    var Tipo = $("input[id$='txt_ClaveTag']")[0].value

    if (Id == '' || Tipo == '') {
        $("input[id$='txt_SearchAge']")[0].value = '';
    }
    else {
        $.ajax({
            url: "../LocalServices/ConsultaBD.asmx/GetAgente",
            data: "{ 'Id': " + Id + " , 'Tipo': " + Tipo + "}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $("input[id$='txt_SearchAge']")[0].value = data.d;
            },
            error: function (response) {
                fn_MuestraMensaje('JSON', response.responseText, 2);
            },
        });
    }
});

//Busqueda de Sucursal por Clave
$("body").on("focusout", "[id$=txt_ClaveSuc]", function (e) {
    var Id = $(this)[0].value;
    if (Id == '') {
        $("input[id$='txt_SearchSuc']")[0].value = '';
    }
    else {
        $.ajax({
            url: "../LocalServices/ConsultaBD.asmx/GetSucursal",
            data: "{ 'Id': " + Id + "}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $("input[id$='txt_SearchSuc']")[0].value = data.d;
            },
            error: function (response) {
                fn_MuestraMensaje('JSON', response.responseText, 2);
            },
        });
    }
});

//Busqueda de Producto por Clave
$("body").on("focusout", "[id$=txt_ClaveRam]", function (e) {
    var Id = $(this)[0].value;
    if (Id == '') {
        $("input[id$='txt_SearchRam']")[0].value = '';
    }
    else {
        $.ajax({
            url: "../LocalServices/ConsultaBD.asmx/GetProducto",
            data: "{ 'Id': " + Id + "}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $("input[id$='txt_SearchRam']")[0].value = data.d;
            },
            error: function (response) {
                fn_MuestraMensaje('JSON', response.responseText, 2);
            },
        });
    }
});


$("body").on("focusout", ".Moneda", function (e) {
    $("input[id$='txt_Moneda']")[0].value = $('option:selected', $(this)).text()
});

//Todas las fechas
$("body").on("focusout", ".Fecha", function (e) {
    $(this).datepicker('hide');
});


//---------------------------------------------------------------------------------------------------------------


//-----------------------------------------------------EVENTOS KEYDOWN-------------------------------------------
//Folio de Negocio
$("body").on("keydown", "[id$=txt_FolioNegocio]", function (e) {
    fn_MovimientoFlechas(e.which, undefined, 'txt_Oferta');
});

$("body").on("keydown", "[id$=txt_Oferta]", function (e) {
    fn_MovimientoFlechas(e.which, 'txt_FolioNegocio', 'txt_SearchResp', 'txt_SearchAse');
});

//REsponsable
$("body").on("keydown", "[id$=txt_SearchResp]", function (e) {
    if (fn_MovimientoFlechas(e.which, 'txt_Oferta', 'txt_SearchAse') == 0) {
        fn_Autocompletar("Usu", "txt_ClaveResp", "txt_SearchResp", "", 0, e.which);
    }
});

//Asegurado
$("body").on("keydown", "[id$=txt_SearchAse]", function (e) {
    if (fn_MovimientoFlechas(e.which, 'txt_SearchResp', 'txt_RFC') == 0) {
        fn_Autocompletar("Ase", "txt_ClaveAseg", "txt_SearchAse", "", 3, e.which)
    }
});

//RFC
$("body").on("keydown", "[id$=txt_RFC]", function (e) {
    fn_MovimientoFlechas(e.which, 'txt_SearchAse', 'txt_DomicilioFiscal', 'txt_DomicilioRiesgo', 'txt_SearchResp');
});

//Domicilio Fiscal
$("body").on("keydown", "[id$=txt_DomicilioFiscal]", function (e) {
    fn_MovimientoFlechas(e.which, 'txt_RFC', 'txt_DomicilioRiesgo', 'ddl_Moneda', 'txt_SearchAse');
});

//Domicilio Riesgo
$("body").on("keydown", "[id$=txt_DomicilioRiesgo]", function (e) {
    fn_MovimientoFlechas(e.which, 'txt_DomicilioFiscal', 'ddl_Moneda', 'txt_VigFin', 'txt_RFC');
});

//Moneda
$("body").on("keydown", "[id$=ddl_Moneda]", function (e) {
    fn_MovimientoFlechas(e.which, 'txt_DomicilioRiesgo', 'txt_VigIni');
});

//Inicio Vigencia
$("body").on("keydown", "[id$=txt_VigIni]", function (e) {
    fn_MovimientoFlechas(e.which, 'ddl_Moneda', 'txt_VigFin', 'txt_SearchTag', 'txt_DomicilioFiscal');
});

//Fin Vigencia
$("body").on("keydown", "[id$=txt_VigFin]", function (e) {
    fn_MovimientoFlechas(e.which, 'txt_VigIni', 'txt_FecEmision', 'txt_SearchTag', 'txt_DomicilioRiesgo');
});

//Emision
$("body").on("keydown", "[id$=txt_FecEmision]", function (e) {
    fn_MovimientoFlechas(e.which, 'txt_VigFin', 'txt_SearchOfi', 'txt_SearchAge', 'txt_DomicilioRiesgo');
});

//Clave Regional
$("body").on("keydown", "[id$=txt_ClaveOfi]", function (e) {
    fn_MovimientoFlechas(e.which, 'txt_FecEmision', 'txt_SearchOfi', 'txt_SearchSusc', 'ddl_Moneda');
});

//Regional
$("body").on("keydown", "[id$=txt_SearchOfi]", function (e) {
    if (fn_MovimientoFlechas(e.which, 'txt_ClaveOfi', 'txt_SearchTag') == 0) {
        fn_Autocompletar("Suc", "txt_ClaveOfi", "txt_SearchOfi", "", 0, e.which);
    }
});

//Tipo Agente
$("body").on("keydown", "[id$=txt_SearchTag]", function (e) {
    if (fn_MovimientoFlechas(e.which, 'txt_SearchOfi', 'txt_ClaveAge') == 0) {
        fn_Autocompletar("Tag", "txt_ClaveTag", "txt_SearchTag", "", 0, e.which);
    }
});

//Clave del Agente
$("body").on("keydown", "[id$=txt_ClaveAge]", function (e) {
    fn_MovimientoFlechas(e.which, 'txt_SearchTag', 'txt_SearchAge');
});

//Agente
$("body").on("keydown", "[id$=txt_SearchAge]", function (e) {
    if (fn_MovimientoFlechas(e.which, 'txt_ClaveAge', 'txt_SearchSusc') == 0) {
        if ($("input[id$='txt_ClaveTag']")[0].value != '') {
            fn_Autocompletar("Age", "txt_ClaveAge", "txt_SearchAge", " AND cod_tipo_agente = " + $("input[id$='txt_ClaveTag']")[0].value, 2, e.which)
        }
    }
});

//Suscriptor
$("body").on("keydown", "[id$=txt_SearchSusc]", function (e) {
    if (fn_MovimientoFlechas(e.which, 'txt_SearchAge', 'txt_SearchGre') == 0) {
        fn_Autocompletar("Usu", "txt_ClaveSusc", "txt_SearchSusc", "", 0, e.which);
    }
});

//Grupo de Endoso
$("body").on("keydown", "[id$=txt_SearchGre]", function (e) {
    if (fn_MovimientoFlechas(e.which, 'txt_SearchSusc', 'txt_SearchTte') == 0) {
        fn_Autocompletar("Gre", "txt_ClaveGre", "txt_SearchGre", "", 0, e.which);
    }
});

//Tipo de Endoso
$("body").on("keydown", "[id$=txt_SearchTte]", function (e) {
    if (fn_MovimientoFlechas(e.which, 'txt_SearchGre', 'txt_ClaveSuc') == 0) {
        if ($("input[id$='txt_ClaveGre']")[0].value != '') {
            fn_Autocompletar("Tte", "txt_ClaveTte", "txt_SearchTte", " AND cod_grupo_endo = " + $("input[id$='txt_ClaveGre']")[0].value, 0, e.which);
        }
    }
});

//Clave de Sucursal
$("body").on("keydown", "[id$=txt_ClaveSuc]", function (e) {
    fn_MovimientoFlechas(e.which, 'txt_SearchTte', 'txt_SearchSuc', 'txt_ClaveRam', 'txt_SearchSusc');
});

//Sucursal de Poliza
$("body").on("keydown", "[id$=txt_SearchSuc]", function (e) {
    if (fn_MovimientoFlechas(e.which, 'txt_ClaveSuc', 'txt_ClaveRam') == 0) {
        fn_Autocompletar("Suc", "txt_ClaveSuc", "txt_SearchSuc", "", 0, e.which);
    }
});

$("body").on("keydown", "[id$=txt_ClaveRam]", function (e) {
    fn_MovimientoFlechas(e.which, 'txt_SearchSuc', 'txt_SearchRam', 'txt_NroPoliza', 'txt_ClaveSuc');
});

//Ramo de Poliza
$("body").on("keydown", "[id$=txt_SearchRam]", function (e) {
    if (fn_MovimientoFlechas(e.which, 'txt_ClaveRam', 'txt_NroPoliza') == 0) {
        fn_Autocompletar("Pro", "txt_ClaveRam", "txt_SearchRam", "", 0, e.which);
    }
});

$("body").on("keydown", "[id$=txt_NroPoliza]", function (e) {
    fn_MovimientoFlechas(e.which, 'txt_SearchRam', 'txt_Sufijo', '', 'txt_ClaveRam');
});

$("body").on("keydown", "[id$=txt_Sufijo]", function (e) {
    fn_MovimientoFlechas(e.which, 'txt_NroPoliza', 'txt_Endoso', '', 'txt_SearchRam');
});

$("body").on("keydown", "[id$=txt_Endoso]", function (e) {
    fn_MovimientoFlechas(e.which, 'txt_Sufijo', 'txt_SearchGiro', '', 'txt_SearchRam');
});

//Giro 
$("body").on("keydown", "[id$=txt_SearchGiro]", function (e) {
    if (fn_MovimientoFlechas(e.which, 'txt_Endoso', 'txt_GiroAsegurado') == 0) {
        var cod_ramo = $("input[id$='txt_ClaveRam']")[0].value;

        if (cod_ramo == '') {
            cod_ramo = 0;
        }

        fn_Autocompletar("Gro", "txt_ClaveGiro", "txt_SearchGiro", ' AND cod_ramo = ' + cod_ramo, 2, e.which)
    }
});

//Giro Especifico
$("body").on("keydown", "[id$=txt_GiroAsegurado]", function (e) {
    fn_MovimientoFlechas(e.which, 'txt_SearchGiro', 'txt_Notas', 'txt_Notas', 'txt_SearchGiro');
});

//Observaciones
$("body").on("keydown", "[id$=txt_Notas]", function (e) {
    fn_MovimientoFlechas(e.which, 'txt_GiroAsegurado', undefined, undefined, 'txt_GiroAsegurado');
});
//--------------------------------------------------------------------------------------------------------------






//-----------------------------------------------------EVENTOS CHANGE-------------------------------------------
$("body").on("change", "[id$=txt_VigIni]", function (e) {
    $("input[id$='txt_VigenciaIni']")[0].value = $(this)[0].value;
});

$("body").on("change", "[id$=txt_VigFin]", function (e) {
    $("input[id$='txt_VigenciaFin']")[0].value = $(this)[0].value;
});

$("body").on("change", "[id$=txt_FecEmision]", function (e) {
    $("input[id$='txt_FechaEmision']")[0].value = $(this)[0].value;
});

$("body").on("change", "[id*=gvd_Tablero] .FecFin", function () {
    var row = $(this).closest("tr");
    var FecIni = row.find('.FecIni');
    var Lapso = row.find('.Lapso');
    var LapsoAux = row.find('.LapsoAux');

    if (fn_IsDate($(this)[0].value) == true && fn_IsDate($(FecIni)[0].value) == true) {
        $(Lapso)[0].innerText = fn_DateDiff($(FecIni)[0].value, $(this)[0].value, 'day')
    }
    else {
        $(Lapso)[0].innerText = '0';
    }

    $(LapsoAux)[0].value = $(Lapso)[0].innerText;
});


$("body").on("change", "[id*=gvd_Tablero] .FecIni", function () {
    var row = $(this).closest("tr");
    var FecFin = row.find('.FecFin');
    var Lapso = row.find('.Lapso');
    var LapsoAux = row.find('.LapsoAux');

    if (fn_IsDate($(this)[0].value) == true && fn_IsDate($(FecFin)[0].value) == true) {
        $(Lapso)[0].innerText = fn_DateDiff($(this)[0].value, $(FecFin)[0].value, 'day');
    }
    else {
        $(Lapso)[0].innerText = '0';
    }

    $(LapsoAux)[0].value = $(Lapso)[0].innerText;
});
//--------------------------------------------------------------------------------------------------------------




$("body").on("click", "[id*=gvd_Monitor] .Folio", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var row = $(this).closest("tr");
    var Folio = row.find('.Folio');

    if (Folio[0].text != '0') {
        window.open("Gestion.aspx?Folio=" + Folio[0].text);
    }
});








$("body").on("click", "[id*=gvd_Tablero] .Proceso", function () {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var Fase = '(PROYECTO)';

    //Respalda la Nota Anterior
    if ($("input[id$='hid_IndiceNota']")[0].value > -1) {
        $("[id*=gvd_Tablero] .Nota")[$("input[id$='hid_IndiceNota']")[0].value].value = $(".NotaProceso")[0].value
    }
    
    var row = $(this).closest("tr");

    $("input[id$='hid_IndiceNota']")[0].value = row[0].rowIndex - 1;

    if (row[0].rowIndex - 1 > 5) {
        var Fase = '(EN FIRME)';
    }

    var Nota = row.find('.Nota');

    $(".NombreProceso")[0].value = 'PROCESO: ' + $(this)[0].innerText + ' ' + Fase;
    $(".NotaProceso")[0].value = $(Nota)[0].value;
    
    fn_AbrirModalSimple('#Notas');
});


function fn_ActualizaLapso() {
    $("[id*=gvd_Tablero] tr").each(function (e) {
        var row = $(this).closest("tr");
        var Lapso = row.find('.Lapso');
        var LapsoAux = row.find('.LapsoAux');
        if ($(Lapso)[0] != undefined && $(LapsoAux)[0] != undefined) {
            $(Lapso)[0].innerText = $(LapsoAux)[0].value;
        }
    });
}


$("body").on("focus", "[id*=gvd_Subjetividad] .Subjetividad", function () {
    $(this).css('height','80');
});

$("body").on("focusout", "[id*=gvd_Subjetividad] .Subjetividad", function () {
    $(this).css('height', '18');
});

$("body").on("focus", ".ObservacionesGral", function () {
    $(this).css('height', '100');
});

$("body").on("focusout", ".ObservacionesGral", function () {
    $(this).css('height', '18');
});

//Click para Selección
function fn_ClickGrid(row,prefijo) {
    var Seleccion = row.find('.Seleccion');
    var Detalle = row.find('.Detalle');

    if ($('[id*=txt_Sel' + prefijo + ']')[row[0].rowIndex].value == "0") {
        $('[id*=txt_Sel' + prefijo + ']')[row[0].rowIndex].value = "1"

        $(Seleccion).css("background-color", "lightgreen");

        if (Detalle.length > 0) {
            $(Detalle).css("display", "block");
        }
    }
    else {
        $('[id*=txt_Sel' + prefijo + ']')[row[0].rowIndex].value = "0"
        $(Seleccion).css("background-color", "white");

        if (Detalle.length > 0) {
            $(Detalle).css("display", "none");
        }

        if ($("input[id$='hid_Ramo']")[0].value == row[0].rowIndex && prefijo == 'Ram') {
            $("[id*=gvd_Seccion]").not($("[id*=gvd_Seccion] tr:first")).remove();
            $("[id*=gvd_Cobertura]").not($("[id*=gvd_Cobertura] tr:first")).remove();
        }
        else if ($("input[id$='hid_Seccion']")[0].value == row[0].rowIndex && prefijo == 'Rie') {
            $("[id*=gvd_Cobertura]").not($("[id*=gvd_Cobertura] tr:first")).remove();
        }
    }
}

//Desplazamiento de Mouse
function fn_MouseOverGrid(row, prefijo, boton) {
    if (boton == 1 && LeftClick == 1) {
        if ($('[id*=txt_Sel' + prefijo + ']')[row[0].rowIndex].value == "0") {
            $('[id*=txt_Sel' + prefijo + ']')[row[0].rowIndex].value = "1"

            var Seleccion = row.find('.Seleccion');
            $(Seleccion).css("background-color", "lightgreen");

            var Detalle = row.find('.Detalle');
            if (Detalle.length > 0) {
                $(Detalle).css("display", "block");
            }
        }
    }
}


//Ramos y Subramos
$("body").on("mousedown", "[id*=gvd_RamoSbr] .Seleccion", function (e) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    if (e.which == 1) {
        LeftClick = 1;
        fn_ClickGrid($(this).closest("tr"), 'Ram');
    }
});

$("body").on("mouseover", "[id*=gvd_RamoSbr] .Seleccion", function (e) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    fn_MouseOverGrid($(this).closest("tr"), 'Ram', e.which);
});


//Secciones
$("body").on("mousedown", "[id*=gvd_Seccion] .Seleccion", function (e) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    if (e.which == 1) {
        LeftClick = 1;
        fn_ClickGrid($(this).closest("tr"), 'Rie');
    }
});

$("body").on("mouseover", "[id*=gvd_Seccion] .Seleccion", function (e) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    fn_MouseOverGrid($(this).closest("tr"), 'Rie', e.which);
});


//Coberturas
$("body").on("mousedown", "[id*=gvd_Cobertura] .Seleccion", function (e) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    if (e.which == 1) {
        LeftClick = 1;
        fn_ClickGrid($(this).closest("tr"), 'Cob');
    }
});

$("body").on("mouseover", "[id*=gvd_Cobertura] .Seleccion", function (e) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    fn_MouseOverGrid($(this).closest("tr"), 'Cob', e.which);
});

$("body").on("change", "[id*=gvd_Subjetividad] .Original", function () {
    var row = $(this).closest("tr");
    var Original = row.find('.Original');



    if (fn_IsDate($(this)[0].value) == true && fn_IsDate($(Original)[0].value) == true) {

        if (fn_DateDiff($(Original)[0].value, $(this)[0].value, 'day') >= 0) {
            var chk_Subjetividad = row.find('.chk_Subjetividad');
            $(chk_Subjetividad)[0].childNodes[0].checked = true;
        }
        else {
            $(this)[0].value = '';
            fn_MuestraMensaje('Subjetividad', 'La Fecha Cumplimiento no puede ser menor a la Fecha de Original', 0);
        }
    }
});


$("body").on("change", "[id*=gvd_Subjetividad] .Cumplimiento", function () {
    var row = $(this).closest("tr");
    var Original = row.find('.Original');

    if (fn_IsDate($(this)[0].value) == true && fn_IsDate($(Original)[0].value) == true) {

        if (fn_DateDiff($(Original)[0].value, $(this)[0].value, 'day') >= 0) {
            var chk_Subjetividad = row.find('.chk_Subjetividad');
            $(chk_Subjetividad)[0].childNodes[0].checked = true;
        }
        else {
            $(this)[0].value = '';
            fn_MuestraMensaje('Subjetividad', 'La Fecha Cumplimiento no puede ser menor a la Fecha de Original', 0);
        }
    }
});


function fn_EstadoSeleccionGrid(Grid,prefijo) {
    $("[id*=" + Grid + "] tr").each(function (e) {
        var row = $(this).closest("tr");
        if ($('[id*=txt_Sel' + prefijo + ']')[row[0].rowIndex] != undefined) {
            if ($('[id*=txt_Sel' + prefijo + ']')[row[0].rowIndex].value == "1") {
                var Seleccion = row.find('.Seleccion');
                var Detalle = row.find('.Detalle');
                $(Seleccion).css("background-color", "lightgreen");

                if (Detalle.length > 0) {
                    $(Detalle).css("display", "block");
                }
            }
        }
    });
}


$("body").on("focusout", "[id*=gvd_ProgramaCapas] .ValorCapa", function (e) {
    var row = $(this).closest("tr");
    $('[id*=txt_ValorCapaAux]')[row[0].rowIndex - 1].value = $(this)[0].value.replace(/,/g, "");
    $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 2);
});

$("body").on("focusout", "[id*=gvd_ProgramaCapas] .ExcesoCapa", function (e) {
    var row = $(this).closest("tr");
    $('[id*=txt_ExcesoCapaAux]')[row[0].rowIndex - 1].value = $(this)[0].value.replace(/,/g, "");
    $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 2);
});

$("body").on("focusout", "[id*=gvd_ProgramaCapas] .PrimaCapa", function (e) {
    var row = $(this).closest("tr");
    $('[id*=txt_PrimaCapaAux]')[row[0].rowIndex - 1].value = $(this)[0].value.replace(/,/g, "");
    $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 2);
});

$("body").on("focusout", "[id*=gvd_ProgramaCapas] .PrcPart", function (e) {
    $(this)[0].value = fn_FormatoMonto(parseFloat($(this)[0].value.replace(/,/g, "")), 4);
});




function fn_ActualizaRiesgos(Index,Control,Clave,Descripcion) {

    var Datos = $('[id*=' + Control + ']')[0].value.split('|');
    Datos[Index] = Clave + '~' + Descripcion;
   
    $('[id*=' + Control + ']')[0].value = '';

    for (i = 0; i <= Datos.length - 2; i++) {
        $('[id*=' + Control + ']')[0].value = $('[id*=' + Control + ']')[0].value + Datos[i] + '|'
    }
}


$("body").on("keydown", ".Desplazamiento", function (e) {
    var row = $(this).closest("tr");
    var indice = row[0].rowIndex - 1

    var gread = $(this)[0].name.split('$')[2];
    var clase = $(this)[0].classList[4];

    if (e.which == 40) {
        indice = indice + 1;

        var control = $("[id*=" + gread + "]").find("." + clase)[indice];
        if (control != undefined) {

            if (control.outerHTML.indexOf("display: none") > -1) {
                indice = indice + 1;
                for (i = indice; i < $("[id*=" + gread + "]").find("." + clase).length ; i++) {
                    var control = $("[id*=" + gread + "]").find("." + clase)[i];
                    if (control != undefined) {
                        if (control.outerHTML.indexOf("display: none") == -1) {
                            control.focus();
                            break;
                        }
                    }
                }
            }
            else {
                control.focus();
            }
            
        }
    }
    else if (e.which == 38) {
        indice = indice - 1;

        var control = $("[id*=" + gread + "]").find("." + clase)[indice];
        if (indice > 0 && control != undefined) {

            if (control.outerHTML.indexOf("display: none") > -1) {
                indice = indice - 1;
                for (i = indice; i > 0 ; i--) {
                    var control = $("[id*=" + gread + "]").find("." + clase)[i];
                    if (control != undefined) {
                        if (control.outerHTML.indexOf("display: none") == -1) {
                            control.focus();
                            break;
                        }
                    }
                }
            }
            else {
                control.focus();
            }
        }
    }
});



//$("body").on("keydown", "[id*=gvd_Riesgo] .ValoresTotales", function (e) {
//    var row = $(this).closest("tr");
//    fn_MovimientoFlechasGrid(e.which, undefined, row.find('.SumaAsegurada'));
//});




