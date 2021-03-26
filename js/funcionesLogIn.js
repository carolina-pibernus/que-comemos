const estaLogueado = hayUsuarioLogueado()

let ingreso = false
sessionStorage.setItem("estaLogueado", ingreso)

function verificarLogIn (){
    crearElemento("seccionLogIn", "h5", "id", "resultadoLogIn")
    $("#resultadoLogIn").hide()
    nUsuario = $("#user").val()
    pUsuario = $("#password").val()
    
    if (localStorage.getItem("usuarioLocal") != null) {
    userLocal= JSON.parse(localStorage.getItem("usuarioLocal"))
        if ((nUsuario == userLocal.usuario) && (pUsuario == userLocal.password)) {
        ingreso = true
        setearLogIn()
        $("#logIn").fadeOut(500)
        $("#aLogIn").fadeOut(500)
        $("#aBusqueda").fadeIn(500)
        $("#aReservas").fadeIn(500)
        sessionStorage.setItem("usuarioLogueado", JSON.stringify(userLocal))
        $("#nombreUsuarioLogueado").text("Bienvenidx, " + nUsuario)
        $("#divUsuario").fadeIn(500)
        $("#aReservas").fadeIn(500)
        $("#resultadoLogIn").hide()
          if (registroEnReserva==true) {
            eliminarNodo("#mensajeNoIngreso")
            eliminarNodo("#volverAreservar")
            crearFormularioReserva(nombreId)
            $("#divReserva").fadeIn()
          }
        
        } 
        else {
            busquedaBdUsuarios()
        }
    }  else {
        busquedaBdUsuarios()
    }
}    

    function busquedaBdUsuarios () {
        $.ajax({
            url: "../bdUsuarios.json",
            type: "GET",
            dataType: "json"
         })
         .done(function (resultado){  
                for (i=0; i<resultado.usuariosRegistrados.length; i++) {
                      posicionUsuario = resultado.usuariosRegistrados[i]
                    if ((posicionUsuario.usuario == nUsuario) && (posicionUsuario.password == pUsuario)) {
                       ingreso = true
                       setearLogIn()
                       $("#logIn").fadeOut(500)
                       $("#aLogIn").fadeOut(500)
                       $("#aBusqueda").fadeIn(500)
                       $("#aReservas").fadeIn(500)
                       sessionStorage.setItem("usuarioLogueado", (JSON.stringify(posicionUsuario)))
                       $("#nombreUsuarioLogueado").text("Bienvenidx, " + nUsuario)
                       $("#resultadoLogIn").hide()
                       $("#divUsuario").fadeIn(500)
                       $("#aReservas").fadeIn(500)
                       if (registroEnReserva==true) {
                        eliminarNodo("#mensajeNoIngreso")
                        eliminarNodo("#volverAreservar")
                        crearFormularioReserva(nombreId)
                        $("#divReserva").fadeIn()
                       }

                       break
                     }             
                } if (ingreso == false) {
                       $("#resultadoLogIn").text("Usuario o Contraseña inválido").fadeIn()
                }  
         })
    
         .fail (function (xhr,status, error) {
            console.log(xhr)
            console.log(status)
            console.log(error)
         })
    }

    
function registrarCuenta() {

    let chequearValidacion = document.forms["registro"].reportValidity()
    
    if (chequearValidacion == true) {
        $("#aLogIn").fadeOut(500)
        $("#aReservas").fadeIn(500)
        let usuario = {
          "nombre" : $("#nombreUsuario").val(),
          "apellido" : $("#apellidoUsuario").val(),
          "fecha" : $("#fechaUsuario").val(),
          "telefono" : $("#numeroUsuario").val(),
          "email" : $("#emailUsuario").val(),
          "usuario": $("#usuario").val(),
          "password": $("#pass").val()
        }

    nuevoUsuario = JSON.stringify(usuario)
    localStorage.setItem ("usuarioLocal", nuevoUsuario)
    ingreso = true
    sessionStorage.setItem ("usuarioLogueado", nuevoUsuario)
    sessionStorage.setItem ("estaLogueado", ingreso)
    $("#registro").fadeOut(500, function (){
        crearElemento("seccionLogIn", "h5", "id", "registroOk")
        $("#registroOk").text("¡Tu registro fue un éxito!")
        $("#nombreUsuarioLogueado").text("Bienvenidx, "+ usuario.usuario)
        $("#divUsuario").fadeIn(500)       
    })
    
    if (registroEnReserva == true) {
        eliminarNodo("#mensajeNoIngreso")
        crearFormularioReserva(nombreId)
        $("#divReserva").fadeIn(500)        
       } 
   }
    else if (chequearValidacion == false) {
        $("#registroInvalido").fadeIn(500)
    }
    return chequearValidacion
}

function validarDatosInput (par1) {
  par2 = $(par1).val()
  par3 = false
    if (par2 == "" || par2 == null) {
        par3 = false
    
    } else if (par2 != "" && par2!= null) {
        par3 = true
    } return par3
}


function setearLogIn() {
    let revisarIngreso = false
    if (ingreso = true) {
        sessionStorage.setItem("estaLogueado", ingreso)
        revisarIngreso = true
    } return revisarIngreso
}

function logOut () {
    ingreso = false 
    sessionStorage.setItem("estaLogueado", ingreso)
    sessionStorage.removeItem("usuarioLogueado")
}

function hayUsuarioLogueado () {
    let hayLog = false
    let verificarLogueado = sessionStorage.getItem("estaLogueado")
    let verificarUsuario = sessionStorage.getItem("usuarioLogueado")
    if (verificarLogueado == true && verificarUsuario == true) {
       hayLog = true
    } else if (verificarUsuario) {
        hayLog = true
        sessionStorage.setItem("estaLogueado", true)
    } return hayLog
}