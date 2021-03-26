$(document).ready(elementosInicioPagina)

function elementosInicioPagina() {
   if (estaLogueado == true) {
      let usuario = JSON.parse(sessionStorage.getItem("usuarioLogueado"))
      $("#aReservas").show()
      $("#nombreUsuarioLogueado").text("Bienvenidx, " + usuario.usuario)
      $("#divUsuario").show()

   } else if (estaLogueado == false) {
      $("#aLogIn").show()
   }
}

$("#aLogIn").click(function () {
   $("#seccionUno").fadeOut(500)
   $("#seccionDos").fadeOut(500)
   $("#logIn").fadeIn(500, function (){
      registroEnReserva = false
      $("#ingresar").click(verificarLogIn)
   })
})

$("#crearCuenta").click(function(){
   botonCrearCuenta()
   registroEnReserva = false
   $("#registrarUsuario").click(registrarCuenta) })

$("#salir").hover(function(){
   $(this).css("color", "cyan")
},function(){
   $(this).css("color", "#ff75ff")
})
$("#salir").click(botonLogOut)

$("#aReservas").click(botonAreservas)

$("#aBusqueda").click(botonAbuscador)

$(".boton").hover(colorBotonOn, colorBotonOff)
$(".botonReserva").hover(colorBotonOn, colorBotonOff)

// llama al evento click en cualquiera de los botones de reserva
seccion = $("#seccionDos")
seccion.click(e => {
   if (e.target.classList.contains ("botonReserva") && hayUsuarioLogueado() == true) {
      nombreId = e.target.id
      crearFormularioReserva(nombreId)
      $("#enviarReserva").click(function (){
          botonEnviarReserva()     
      }) 
   } else if (e.target.classList.contains ("botonReserva") && hayUsuarioLogueado() == false)  {
      nombreId = e.target.id
      requerirLogIn()      
   }
})    