const cerrarSession = document.getElementById('cerrarSession');
eventListeners();

function eventListeners() {
  

     document.addEventListener('DOMContentLoaded', existeSession);
     cerrarSession.addEventListener('click',cerrarSessionSistema);
}

function existeSession(e) {
    let sesion = sessionStorage.getItem('sesion');

    if(sesion == null){
        window.location.href = "index.html";

    }else if(sesion != null){
        //obtener datos del usuario o empresa 
        //y mostrar una vienvenida 
        console.log('sesion creada ');
        console.log(sesion);
    }
}

function cerrarSessionSistema() {
    sessionStorage.clear();
    window.location.href = "index.html";
    console.log('session cerrarda');
}

