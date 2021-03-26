function eliminarNodo (hijo) {
    $(hijo).fadeOut(500).remove()
    
}  

function crearElemento (nodoPadre, elemento, atributo, nombre){
    nodoHijo = document.createElement(elemento)
    nodoHijo.setAttribute(atributo, nombre)
    document.getElementById(nodoPadre).appendChild(nodoHijo)
}

function crearTexto (nodoPadre, texto) {
    nodoTexto = document.createTextNode(texto)
    document.getElementById(nodoPadre).appendChild(nodoTexto)
}

function crearAttrPorId (id, atributo, nombre) {
    nodo = document.getElementById(id)
    nodo.setAttribute(atributo, nombre)
}

function colorBotonOn (){
    $(this).css("box-shadow", "cyan 0px 0px 10px, cyan inset 0px 0px 20px")
 
 }
 function colorBotonOff () {
    $(this).css("box-shadow", "cyan 0px 0px 5px, cyan inset 0px 0px 5px")
 }

 function botonCrearCuenta() {
    $("#logIn").fadeOut(500)
    $("#registro").fadeIn(500) 
    $("#aLogIn").click(function(){
        $("#registro").fadeOut(500)
    })
}

function botonLogOut() {
    logOut()

    $("#divUsuario").fadeOut(500).hide()
    $("#aReservas").fadeOut(500).hide()
    $("#aLogIn").fadeIn(500)
    $("#logIn").hide()
    $("#registro").hide()
    $("#registroOk").fadeOut(500)
    $("#seccionDos").hide()
    $("#divUsuario").hide()
    eliminarNodo("#divReservasUsuario")
    eliminarNodo("#datosReserva")
    eliminarNodo("#confirmar")
    eliminarNodo("#cambiarReserva")
}

function botonAreservas () {
    eliminarNodo("#recomendaciones")
    eliminarNodo("#datosReserva")
    eliminarNodo("#confirmar")
    eliminarNodo("#cambiarReserva")
    
    $("#seccionUno").fadeOut(500)
    $("#seccionDos").fadeOut(500)
    $("#registroOk").fadeOut(500)
    $("#divReservas").fadeOut(500)

    div = $("#divReservasUsuario").length
     if (div <= 0) {
       reservasUsuario()
    } else {
       $("#divReservasUsuario").remove()
       reservasUsuario()
    }
}


function botonAbuscador() {
    eliminarNodo("#mensajeNoIngreso")
    eliminarNodo("#divReservasUsuario")
    eliminarNodo("#recomendaciones")
    eliminarNodo("#datosReserva")
    eliminarNodo("#confirmar")
    eliminarNodo("#cambiarReserva")
    eliminarNodo("#reservaConfirmada")
    eliminarNodo("#datosDeReserva")
   
    $("#logIn").fadeOut(500)
    $("#registroOk").fadeOut(500)
    $("#divReserva").fadeOut(500)
    $("#divReservas").fadeOut(500)
    $("#registro").fadeOut(500)
    $("#seccionUno").fadeOut(500)
    $("#seccionDos").fadeIn(500)

    
    $("#tituloCuatro").text("¡COMENZÁ!")
        $("#tituloCuatro").fadeIn(500)
        $("#formulario").fadeIn(500)
    
    $("#buscar").click(function () {
        eliminarNodo("#recomendaciones")
        buscarRecomendaciones()
    })
 
}

function botonEnviarReserva () {
    eliminarNodo("#datosReserva")
    eliminarNodo("confirmar")
    eliminarNodo("cambiarReserva")
    let verCantidad = validarDatosInput("#cantidadReserva")
    let verFecha = validarDatosInput("#fechaReserva")
    let verHora = validarDatosInput("#horaReserva")
   
                  if (($("#alertaReserva").text() == "¡La fecha está disponible!") 
                  && verCantidad == true    && verFecha == true && verHora == true){
                     crearReserva()
                  } else {
                    $("#reservaBloqueada").fadeIn(500)
                   
                    
                 }
}


