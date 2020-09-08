
eventListeners();

function eventListeners() {

    document.querySelector('#formulario').addEventListener('submit', ingresoSistema);

    document.addEventListener('DOMContentLoaded', datosInicio);

}

function datosInicio() {

    userName.focus();


 }

const userName = document.querySelector('#username');

const passWord = document.querySelector('#password');

let mensaje  = document.querySelector('#mensaje');

const listaEmpresasRegistrardas = obtenerEmpresasLocalStorage();

const listaUsuariosRegistrados = obtenerUsuariosLocalStorage();



function ingresoSistema(e) {
    
    e.preventDefault();


    if(userName.value === '' ||  userName.value.trim() === ''){

        mensaje.textContent = 'Ingrese Userman Valido';
        console.log('el valor del input username esta vacio');
        userName.focus();
        userName.value = '';
        mensaje.style.color = 'red';

    }else{
        if(contieneEspaciosVacios(userName.value)===true){

            mensaje.textContent = 'Username No Puede Tener Espacios Vacios..!!';
            console.log('el valor del input username esta vacio');
            userName.focus();
            mensaje.style.color = 'red';

        }else{
            if(passWord.value === '' ||  passWord.value.trim() === ''){

                mensaje.textContent = 'Ingrese password Valido';
                console.log('el valor del input password esta vacio');
                passWord.focus();
                passWord.value = '';
                mensaje.style.color = 'red';
    
            }else{
                if(contieneEspaciosVacios(passWord.value)===true){

                    mensaje.textContent = 'Password no puede contener Espacios vacios';
                    console.log('el valor del input password esta vacio');
                    passWord.focus();
                    mensaje.style.color = 'red';

                }else{
                    if( userName.value === 'admin' && passWord.value === '1234'){
                        sessionStorage.setItem('sesion', userName.value);
                        console.log('ingresado como usuario tipo natural');
                        window.location.href = "admin.html";
        
                    }else{    
                        if(listaEmpresasRegistrardas.length === 0 && listaUsuariosRegistrados.length === 0){
                            
                            mensaje.textContent = 'Sin Conexion Intente mas tarde..!!';
                            console.log('lista Empresas vacia, simula error al cargar datos de back-end..');
                            mensaje.style.color = 'red';
                            passWord.focus();                


                        }else{
                            if(existeEmpresa(userName.value, passWord.value) === true){

                                sessionStorage.setItem('sesion', userName.value);
                                console.log('ingresado como usuario tipo Empresa');
                                window.location.href = "inicio.html";

                            }else{

                                if(existeUsuario(userName.value, passWord.value) ===true){
        
                                    sessionStorage.setItem('sesion', userName.value);
                                    console.log('ingresado como usuario tipo natural');
                                    window.location.href = "inicio.html";
            
                                }else{
            
                                    mensaje.textContent = 'username o password incorrecta';
                                    console.log('error, credenciales no encontradas');
                                    mensaje.style.color = 'red'; 
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function existeEmpresa(username, password) {

    let existe;

    listaEmpresasRegistrardas.forEach(empresa => {
        if(empresa.username === username && empresa.password === password){
            existe = true;
        }else{
            existe = false;
        }
    });

    return existe;
    
}

function existeUsuario(username, password) {

    let existe;

    listaUsuariosRegistrados.forEach(usuario => {
        if(usuario.username === username && usuario.password === password){
            existe = true;
        }else{
            existe = false;
        }
    });

    return existe;
    
}

function contieneEspaciosVacios(cadena) {

    let  contiene;
    const listaFinal = [];
    const listaCaracteresCadena = cadena.split('');

    listaCaracteresCadena.forEach(element => {
        if(element !== ' '){
            listaFinal.push(element);
        }

    });

        if(listaFinal.length !== listaCaracteresCadena.length ){
            contiene = true;
        }else{
            contiene = false;
        }

    return contiene;
}

function obtenerEmpresasLocalStorage() {
    let Empresas;

    if(localStorage.getItem('empresas') === null) {
        empresas = []; 
    } else {
        empresas = JSON.parse(localStorage.getItem('empresas') );
    }
    return empresas;
}

function obtenerUsuariosLocalStorage() {
    let usuarios;

    if(localStorage.getItem('usuarios') === null) {
        usuarios = []; 
    } else {
        usuarios = JSON.parse(localStorage.getItem('usuarios') );
    }
    return usuarios;
}

