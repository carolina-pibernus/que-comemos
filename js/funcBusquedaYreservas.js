let datos = false
let recomendacion = false
function datosAbuscar (zona, presupuesto) {
    this.zona = zona
    this.presupuesto = presupuesto
}    datosBusqueda = new datosAbuscar ()
let numeroResto = 1000

function buscarRecomendaciones (){
   
    consultarDatos ()
    if (datos == true) {
        recomendar ()
    }  
}

function consultarDatos () {
        
        datosBusqueda = new datosAbuscar ($("#zona").val(), $("#presupuesto").val() )
        if ((datosBusqueda.presupuesto >= 400)) {
        ocultarFormulario()
        datos = true      
        } else {
            $("#tituloCuatro").text("Disculpa no encontramos opciones disponibles ¡Podes intentarlo nuevamente!") 

        }
          
}      

function ocultarFormulario() {

        $("#formulario").fadeOut()
        $("#tituloTres").fadeOut()
        $("#parrafoUno").fadeOut()
        $("#tituloCuatro").fadeOut(100, function () {
            $("#tituloCuatro").text("¡GRACIAS!").fadeIn(500)
        })   
}

function recomendar () {
    crearElemento ("seccionDos", "div", "id", "recomendaciones")
    crearElemento ("recomendaciones", "h5", "id", "tituloRecomendaciones")
    crearTexto ("tituloRecomendaciones", "¡Te recomendamos estos lugares!")
    for (i=0; i<comercios.length; i++) {
        if (comercios[i].zona ==    datosBusqueda.zona && comercios[i].precio <=    datosBusqueda.presupuesto) {

            crearRestaurante(i, comercios[i].nombre)
            recomendacion = true
        } 
    }
}

function crearRestaurante (par1, par2) {
    nombreDiv = "resto" + par1
    crearElemento ("recomendaciones", "div", "id", nombreDiv)
    
    nombre= "nombre" + i
    crearElemento (nombreDiv, "h5", "id", nombre)
    crearAttrPorId (nombre, "class", "tituloRestaurante")
    $(".tituloRestaurante").hide()
    crearTexto (nombre, par2)
    $(".tituloRestaurante").fadeIn(500)
    precio = "precio" + i
    textoPrecio = "Precio promedio por persona $" + comercios[i].precio
    crearElemento (nombreDiv, "p", "id", precio)  
    crearAttrPorId (precio, "class", "precioRestaurante")
    $(".precioRestaurante").hide()
    crearTexto (precio, textoPrecio)
    $(".precioRestaurante").fadeIn(500)

    zona = "zona" + i
    textoZona= "Ubicado en la zona " + comercios[i].zona
    crearElemento (nombreDiv, "p", "id", zona)
    crearAttrPorId (zona, "class", "zonaRestaurante") 
    $(".zonaRestaurante").hide()
    crearTexto (zona, textoZona)
    $(".zonaRestaurante").fadeIn(500)

    direccion = "direccion" + i
    textoDireccion= "Direccion: " + comercios[i].calle + " " + comercios[i].altura
    crearElemento (nombreDiv, "p", "id", direccion)
    crearAttrPorId (direccion, "class", "direccionestaurante") 
    $(".direccionRestaurante").hide()
    crearTexto (direccion, textoDireccion)
    $(".direccionRestaurante").fadeIn(500)
    
    $(".botonReserva").hide()
    crearElemento (nombreDiv, "input", "id", i)
    crearAttrPorId (i, "type", "button")
    crearAttrPorId (i, "class", "botonReserva")
    crearAttrPorId (i, "value", "Reservar")
    $(".botonReserva").fadeIn(1000)

    idResto= "#"+i
    numeroResto = i
    
    $(idResto).hover(colorBotonOn,colorBotonOff)
       
}

function requerirLogIn() {
      eliminarNodo("#recomendaciones")
      $("#tituloCuatro").fadeOut(500)
      crearElemento("seccionDos", "p", "id", "mensajeNoIngreso")
      $("#mensajeNoIngreso").fadeIn(500).text("Por favor, inicia sesion o crea una cuenta para continuar")
      $("#logIn").fadeIn(500)
      registroEnReserva = true

      $("#ingresar").click(function (){
         verificarLogIn()
         $("#enviarReserva").click(function (){
            botonEnviarReserva()
         })     
      })
      $("#crearCuenta").click(function(){
         botonCrearCuenta()
         registroEnReserva = true
         $("#registrarUsuario").click(registrarCuenta)
         $("#enviarReserva").click(function() {
            eliminarNodo("#registroOk")
            botonEnviarReserva()
         })  
      })
}


function crearFormularioReserva (a) {
    eliminarNodo ("#recomendaciones") 
    $("#tituloCuatro").fadeOut(500)
    
    $("#nombreResto").text(comercios[a].nombre)
    $("#seccionDos").show()
    $("#divReserva").show()
    $("#tituloReserva").fadeIn(500)
    $("#nombreResto").fadeIn(500)
 
    $("#enviarReserva").hover(colorBotonOn, colorBotonOff)
    $("#formularioReserva").fadeIn(500)

    revisarFecha ()
 }

function revisarFecha () {
   $("#fechaReserva").change(function (){
      let fechaSeleccionada = $(this).val()
      let fecha = fechaSeleccionada.split("-")
      let mes = fecha[1]
      let dia= fecha[2]
      
      recuperarDias(mes, dia)
     
      })
}

function recuperarDias(par1, par2) {
   $.ajax({
      url: "../bdDiasDisponibles.json",
      type: "GET",
      dataType: "json"
   })
   .done(function (resultado){
            let pm = par1 - 1
            let listado = resultado.meses2021[pm].diasDisponibles
            let fechaDisponible = false

            for (i=0; i<=listado.length; i++) {
               if (listado[i] == par2) {
                 fechaDisponible = true 
                 $("#alertaReserva").text("¡La fecha está disponible!")
                 break
               }                         
            } 
            if (fechaDisponible == false) {
               $("#alertaReserva").text("La fecha NO está disponible")
            }
            
      
   })
   .fail (function (xhr,status, error) {
      console.log(xhr)
      console.log(status)
      console.log(error)
   })
     
}

function tomarDatosReserva () {

     
    let datosUsuario = JSON.parse(sessionStorage.getItem("usuarioLogueado"))
    usuarioReserva = datosUsuario.usuario
    nombreReserva = datosUsuario.nombre
    apellidoReserva = datosUsuario.apellido
    telefonoReserva = datosUsuario.telefono
    mailReserva = datosUsuario.email
    direccionResto = comercios[nombreId].calle + " " +comercios[nombreId].altura
    cantidadReserva = $("#cantidadReserva").val()
    fechaReserva = $("#fechaReserva").val()
    horaReserva = $("#horaReserva").val()  
    numeroReserva = 1 + Math.floor(Math.random() *100 );
    
    var reserva = {
       "nombreCliente": nombreReserva,
       "apellidoCliente": apellidoReserva,
       "telefonoCliente": telefonoReserva,
       "usuarioCliente": datosUsuario.usuario,
       "mailCliente":datosUsuario.email,
       "cantidadReserva":cantidadReserva,
       "fechaReserva":fechaReserva,
       "horaReserva":horaReserva,
       "codigoRestaurante":numeroResto,
       "nombreRestaurante":comercios[nombreId].nombre,
       "zonaRestaurante":comercios[nombreId].zona,
       "precioRestaurante":comercios[nombreId].precio,
       "direccionRestaurante": direccionResto,
       "numeroReserva": numeroReserva
    }
    var datosReserva= JSON.stringify(reserva)
    return datosReserva
 }   

 function crearReserva () {
   
    tomarDatosReserva()
    $("#formularioReserva").fadeOut(500)
    crearElemento ("divReserva", "ul", "id", "datosReserva")
    $("#datosReserva").fadeOut(10)
    crearElemento ("datosReserva", "li", "id", nombreReserva)
    crearTexto (nombreReserva, (nombreReserva + " " + apellidoReserva))
    crearElemento ("datosReserva", "li", "id", fechaReserva)
    crearTexto (fechaReserva, ("Fecha: " + fechaReserva))
    crearElemento ("datosReserva", "li", "id", horaReserva)
    crearTexto (horaReserva, ("Hora: " + horaReserva))
    crearElemento ("datosReserva", "li", "id", mailReserva)
    crearTexto (mailReserva, ("Recibiras la confirmacion de tu reserva a: " + mailReserva))
    crearElemento ("datosReserva", "li", "id", telefonoReserva)
    crearTexto (telefonoReserva, ("Telefono de contacto: " + telefonoReserva))
    crearElemento ("datosReserva", "li", "id", ("comen"+cantidadReserva))
    crearTexto (("comen"+cantidadReserva), ("Cantidad de comensales: " + cantidadReserva))
    
    crearElemento ("divReserva", "input", "id", "confirmar")
    crearAttrPorId("confirmar", "type", "button")
    crearAttrPorId("confirmar", "class", "boton")
    crearAttrPorId ("confirmar", "value", "Confirmar")

    crearElemento ("divReserva", "input", "id", "cambiarReserva")
    crearAttrPorId("cambiarReserva", "type", "button")
    crearAttrPorId("cambiarReserva", "class", "boton")
    crearAttrPorId("cambiarReserva", "value", "Modificar")

    $("#datosReserva").fadeIn(500)

    $("#confirmar").hover(colorBotonOn, colorBotonOff)
    $("#confirmar").click(confirmarReserva)
    $("#cambiarReserva").hover(colorBotonOn, colorBotonOff)
    $("#cambiarReserva").click(modificarReserva) 
 }

 function modificarReserva () {
    eliminarNodo("#datosReserva")
    eliminarNodo("#cambiarReserva")
    eliminarNodo("#confirmar")
    crearAttrPorId("cantidadReserva", "placeholder", cantidadReserva)
    crearAttrPorId("horaReserva", "placeholder", horaReserva)
    crearAttrPorId("fechaReserva", "placeholder", fechaReserva)
    crearFormularioReserva(nombreId)
    $("#formularioReserva").fadeIn(500)
 }

function confirmarReserva () {
    let datosReserva = tomarDatosReserva()   
    localStorage.setItem(numeroReserva, datosReserva)
    eliminarNodo ("#datosReserva")
    eliminarNodo ("#confirmar")
    eliminarNodo("#cambiarReserva")
    $("#tituloReserva").fadeOut(500)
    $("#nombreResto").fadeOut(500)
 
    crearElemento ("divReserva", "h4", "id", "reservaConfirmada")
    crearTexto ("reservaConfirmada", ("¡Gracias " + nombreReserva + "! Tu reserva ya fue efectuada en " + comercios[nombreId].nombre))
    crearElemento ("divReserva", "p", "id", "datosDeReserva")
    crearTexto ("datosDeReserva", ("Tu numero de reserva es: " + numeroReserva + ". Recordá presentarlo en el restaurante al llegar"))
   }

function reservasUsuario () {
      crearElemento("seccionReservas", "div", "id", "divReservasUsuario")
      datosUsuario = JSON.parse(sessionStorage.getItem("usuarioLogueado"))

      for (n=0; n<=100; n++) {
         reserva = localStorage.getItem(n)
         reservaObj = JSON.parse(reserva)
         if ((reserva != null && reserva != "usuarioLocal") && (datosUsuario.usuario == reservaObj.usuarioCliente)) {
            crearElemento ("divReservasUsuario", "div", "id", reservaObj.numeroReserva)
            crearElemento (reservaObj.numeroReserva, "h5", "id", ("resto"+n))
            crearTexto (("resto"+n), reservaObj.nombreRestaurante)
            
            reservaNumero = "reservaNumero" + n
            
            crearElemento (reservaObj.numeroReserva, "ul", "id", reservaNumero)
            crearElemento (reservaNumero, "li", "id", "direccion"+n)
            crearTexto (("direccion"+n), (reservaObj.direccionRestaurante))
            crearElemento (reservaNumero, "li", "id", ("fecha"+n))
            crearTexto (("fecha"+n), ("Fecha: " + reservaObj.fechaReserva))
            crearElemento (reservaNumero, "li", "id", ("hora"+n))
            crearTexto (("hora"+n), ("Hora: " + reservaObj.horaReserva)) 
            crearElemento (reservaNumero, "li", "id", ("cant"+n))
            crearTexto (("cant"+n), ("Comensales: " + reservaObj.cantidadReserva)) 
            crearElemento (reservaNumero, "li", "id", ("codigo"+n))
            crearTexto (("codigo"+n), ("Código: " + reservaObj.numeroReserva))       
         } 
      } 
      existenReservas = $("#divReservasUsuario h5").length
      if (existenReservas <= 0) {
         crearElemento("divReservasUsuario", "p", "id", "noHayReservas")
         crearTexto("noHayReservas", "¡No tenes reservas realizadas por el momento!")
      }
   }