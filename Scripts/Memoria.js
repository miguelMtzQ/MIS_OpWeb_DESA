function PageLoadMemoria() {
    LeftClick = 0;

    fn_EstadoSeleccionGrid('gvd_RamoSbr', 'Ram');
    fn_EstadoSeleccionGrid('gvd_Seccion', 'Rie');
    fn_EstadoSeleccionGrid('gvd_Cobertura', 'Cob');
}

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


$("body").on("mouseup", "", function (e) {
    LeftClick = 0;
});

//Click para Selección
function fn_ClickGrid(row, prefijo) {
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

function fn_EstadoSeleccionGrid(Grid, prefijo) {
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



//Asegurado
$("body").on("keydown", "[id$=txt_SearchAse]", function (e) {
    fn_Autocompletar("Ase", "txt_ClaveAseg", "txt_SearchAse", "", 3, e.which)
});

$("body").on("focusout", "[id$=txt_SearchAse]", function (e) {
    fn_EvaluaAutoComplete('txt_ClaveAseg', 'txt_SearchAse');
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


//Tipo Agente
$("body").on("keydown", "[id$=txt_SearchTag]", function (e) {
    if (e.which == 9) {
        $("input[id$='txt_ClaveAge']").focus();
        return false;
    }
    fn_Autocompletar("Tag", "txt_ClaveTag", "txt_SearchTag", "", 0, e.which)
});

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

$("body").on("focus", "[id$=txt_SearchTag]", function () {
    fn_Autocompletar("Tag", "txt_ClaveTag", "txt_SearchTag", "", 0, -1)
    $(this).trigger({
        type: "keydown",
        which: 46
    });
});

//Agente
$("body").on("keydown", "[id$=txt_SearchAge]", function (e) {
    if (e.which == 9) {
        $("input[id$='txt_SearchSusc']").focus();
        return false;
    }

    if ($("input[id$='txt_ClaveTag']")[0].value != '') {
        fn_Autocompletar("Age", "txt_ClaveAge", "txt_SearchAge", " AND cod_tipo_agente = " + $("input[id$='txt_ClaveTag']")[0].value, 2, e.which)
    }
});

$("body").on("focusout", "[id$=txt_SearchAge]", function () {
    if ($(this)[0].value == '') {
        $("input[id$='txt_ClaveAge']")[0].value = ''
    }
    fn_EvaluaAutoComplete('txt_ClaveAge', 'txt_SearchAge');

});

//Suscriptor
$("body").on("keydown", "[id$=txt_SearchSusc]", function (e) {
    if (e.which == 9) {
        $("input[id$='txt_SearchGre']").focus();
        return false;
    }
    fn_Autocompletar("Usu", "txt_ClaveSusc", "txt_SearchSusc", "", 0, e.which)
});

$("body").on("focusout", "[id$=txt_SearchSusc]", function () {
    if ($(this)[0].value == '') {
        $("input[id$='txt_ClaveSusc']")[0].value = ''
    }
    fn_EvaluaAutoComplete('txt_ClaveSusc', 'txt_SearchSusc');
});

$("body").on("focus", "[id$=txt_SearchSusc]", function () {
    fn_Autocompletar("Usu", "txt_ClaveSusc", "txt_SearchSusc", "", 0, -1)
    $(this).trigger({
        type: "keydown",
        which: 46
    });
});


//Sucursal de Poliza
$("body").on("keydown", "[id$=txt_SearchSuc]", function (e) {
    if (e.which == 9) {
        $("input[id$='txt_ClaveRam']").focus();
        return false;
    }
    fn_Autocompletar("Suc", "txt_ClaveSuc", "txt_SearchSuc", "", 0, e.which)
});

$("body").on("focusout", "[id$=txt_SearchSuc]", function () {
    if ($(this)[0].value == '') {
        $("input[id$='txt_ClaveSuc']")[0].value = ''
    }
});

$("body").on("focus", "[id$=txt_SearchSuc]", function () {
    fn_Autocompletar("Suc", "txt_ClaveSuc", "txt_SearchSuc", "", 0, -1)
    $(this).trigger({
        type: "keydown",
        which: 46
    });
});

//Ramo de Poliza
$("body").on("keydown", "[id$=txt_SearchRam]", function (e) {
    if (e.which == 9) {
        $("input[id$='txt_NroPoliza']").focus();
        return false;
    }
    fn_Autocompletar("Pro", "txt_ClaveRam", "txt_SearchRam", "", 0, e.which)
});

$("body").on("focusout", "[id$=txt_SearchRam]", function () {
    if ($(this)[0].value == '') {
        $("input[id$='txt_ClaveRam']")[0].value = ''
    }
});

$("body").on("focus", "[id$=txt_SearchRam]", function () {
    fn_Autocompletar("Pro", "txt_ClaveRam", "txt_SearchRam", "", 0, -1)
    $(this).trigger({
        type: "keydown",
        which: 46
    });
});


//Grupo de Endoso
$("body").on("keydown", "[id$=txt_SearchGre]", function (e) {
    fn_Autocompletar("Gre", "txt_ClaveGre", "txt_SearchGre", "2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26", 0, e.which)
});

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

    //if (blnClear == 1) {
    //    $("input[id$='txt_ClaveTte']")[0].value = '';
    //    $("input[id$='txt_SearchTte']")[0].value = '';
    //}

    fn_EvaluaAutoComplete('txt_ClaveGre', 'txt_SearchGre');
});

$("body").on("focus", "[id$=txt_SearchGre]", function () {
    fn_Autocompletar("Gre", "txt_ClaveGre", "txt_SearchGre", "2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26", 0, -1)
    $(this).trigger({
        type: "keydown",
        which: 46
    });
});


//Tipo de Endoso
$("body").on("keydown", "[id$=txt_SearchTte]", function (e) {
    if ($("input[id$='txt_ClaveGre']")[0].value != '') {
        fn_Autocompletar("Tte", "txt_ClaveTte", "txt_SearchTte", " AND cod_grupo_endo = " + $("input[id$='txt_ClaveGre']")[0].value, 0, e.which)
    }
});

$("body").on("focusout", "[id$=txt_SearchTte]", function () {
    if ($(this)[0].value == '') {
        $("input[id$='txt_ClaveTte']")[0].value = '';
    }
    fn_EvaluaAutoComplete('txt_ClaveTte', 'txt_SearchTte');
});

$("body").on("focus", "[id$=txt_SearchTte]", function () {
    fn_Autocompletar("Tte", "txt_ClaveTte", "txt_SearchTte", " AND cod_grupo_endo = 0", 0, -1)
    $(this).trigger({
        type: "keydown",
        which: 46
    });
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


$("body").on("dblclick", "[id*=gvd_Ubicaciones] .Detalle", function (e) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var row = $(this).closest("tr");

    var cod_item = row.find('.cod_item');
    var cod_aseg = row.find('.cod_aseg');
    var asegurado = row.find('.asegurado');
    var calle = row.find('.calle');
    var nro_exterior = row.find('.nro_exterior');
    var nro_interior = row.find('.nro_interior');
    var cod_ciudad = row.find('.cod_ciudad');
    var cod_municipio = row.find('.cod_municipio');
    var cod_colonia = row.find('.cod_colonia');
    var cod_pais = row.find('.cod_pais');
    var cod_dpto = row.find('.cod_dpto');
    var cod_postal = row.find('.cod_postal');
    var cod_giro_negocio = row.find('.cod_giro_negocio');
    var giro_negocio = row.find('.giro_negocio');
    var cod_sgiro = row.find('.cod_sgiro');
    var subgiro = row.find('.subgiro');


    $("input[id$='txt_cod_item']")[0].value = cod_item[0].innerText;
    $("input[id$='txt_ClaveAsegurado']")[0].value = cod_aseg[0].value;
    $("input[id$='txt_Asegurado']")[0].value = asegurado[0].value;
    $("input[id$='txt_Calle']")[0].value = calle[0].value;
    $("input[id$='txt_NroExt']")[0].value = nro_exterior[0].value;
    $("input[id$='txt_NroInt']")[0].value = nro_interior[0].value;

    $('.Ciudad')[0].value = cod_ciudad[0].value;
    $('.Municipio')[0].value = cod_municipio[0].value;
    $('.Colonia')[0].value = cod_colonia[0].value;
    $('.Pais')[0].value = cod_pais[0].value;
    $('.Estado')[0].value = cod_dpto[0].value;

    $("input[id$='txt_CP']")[0].value = cod_postal[0].value;
    $("input[id$='txt_ClaveGiro']")[0].value = cod_giro_negocio[0].value;
    $("input[id$='txt_Giro']")[0].value = giro_negocio[0].value;
    $("input[id$='txt_ClaveSubgiro']")[0].value = cod_sgiro[0].value;
    $("input[id$='txt_Subgiro']")[0].value = subgiro[0].value;

    fn_AbrirModal('#Direccion');
});

//Asegurado
$("body").on("keydown", "[id$=txt_Asegurado]", function (e) {
    fn_Autocompletar("Ase", "txt_ClaveAsegurado", "txt_Asegurado", "", 3, e.which)
});

//Giro
$("body").on("keydown", "[id$=txt_Giro]", function (e) {
    var cod_ramo = $("input[id$='txt_ClaveRam']")[0].value;

    if (cod_ramo == '') {
        cod_ramo = 0;
    }

    fn_Autocompletar("Gro", "txt_ClaveGiro", "txt_Giro", ' AND cod_ramo = ' + cod_ramo, 2, e.which)
});


//SubGiro
$("body").on("keydown", "[id$=txt_Subgiro]", function (e) {
    var cod_ramo = $("input[id$='txt_ClaveRam']")[0].value;
    var cod_giro_negocio = $("input[id$='txt_ClaveGiro']")[0].value;

    if (cod_ramo == '') {
        cod_ramo = 0;
    }

    if (cod_giro_negocio == '') {
        cod_giro_negocio = 0;
    }

    fn_Autocompletar("Sgr", "txt_ClaveSubgiro", "txt_Subgiro", ' AND cod_ramo = ' + cod_ramo + ' AND cod_giro_negocio = ' + cod_giro_negocio, 2, e.which)
});


//Sumatorias Totales
function fn_SumaTotales(Grid, ArrayClase, ArrayControl, AST, ArrayNoSumar, Posicion, LimiteMayor) {
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
            if (Control != undefined) {
                Control.value = ArraySuma[i];
            }

            //Resultado en Clase
            Clase = $("[id*=" + Grid + "] ." + ArrayClase[i])[Posicion];
            if (Clase != undefined) {
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