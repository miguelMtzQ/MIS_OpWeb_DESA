//Ventana de Mensajes
function fn_MuestraMensaje(Titulo, Mensaje, Tipo, boton) {

    document.getElementById('lbl_TituloMensaje').innerHTML = Titulo;
    document.getElementById('lbl_Mensaje').innerHTML = Mensaje;

    document.getElementById('img_advertencia').style.display = 'none';
    document.getElementById('img_confirma').style.display = 'none';
    document.getElementById('img_error').style.display = 'none';
    document.getElementById('img_pregunta').style.display = 'none';

    document.getElementById('btn_Si').style.display = 'none';
    document.getElementById('btn_No').style.display = 'none';

    //Almacena el control que desplego el Mensaje de Confirmación
    if (boton != undefined) {
        document.getElementById('hid_ControlASP').value = boton;
    }

    //Evalua el tipo de Mensaje
    switch (Tipo) {
        case 0:
            document.getElementById('img_advertencia').style.display = 'block';
            break;
        case 1:
            document.getElementById('img_confirma').style.display = 'block';
            break;
        case 2:
            document.getElementById('img_error').style.display = 'block';
            break;
        case 3:
            document.getElementById('img_pregunta').style.display = 'block';
            document.getElementById('btn_Si').style.display = 'inline-block';
            document.getElementById('btn_No').style.display = 'inline-block';
            break;
    }

    fn_AbrirModal('#Mensajes');
}

//Abrir Modal
function fn_AbrirModal(modal) {
    $(modal).modal('show');
}

//Cerrar Modal
function fn_CerrarModal(modal) {
    $(modal).modal('hide');
}