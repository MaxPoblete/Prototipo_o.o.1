const registrar = document.getElementById('registrar');
eventListeners();

function eventListeners() {

    registrar.addEventListener('click', validarDatosUsuario);

    document.addEventListener('DOMContentLoaded', datosInicio);

}



const nombre = document.querySelector('#nombre');

const apellido = document.querySelector('#apellido');

const correo = document.querySelector('#correo');

const telefono = document.querySelector('#telefono');

const run = document.querySelector('#run');

const username = document.querySelector('#username');

const password = document.querySelector('#password');

let mensaje = document.querySelector('#mensaje');


function datosInicio() {

nombre.focus();
generar.style.display = 'none';

}

function validarDatosUsuario(e) {

    e.preventDefault();

    if(nombre.value === ''){

        mensaje.textContent = 'Ingrese Nombre Valido Por Favor..!!';
        mensaje.style.color = 'red';
        nombre.focus();

    }else{
        if(apellido.value === ''){

            mensaje.textContent = 'Ingrese Apellido Valido Por Favor..!!';
            mensaje.style.color = 'red';
            apellido.focus();

        }else{
            if(telefono.value === ''){

                mensaje.textContent = 'Ingrese Telefono Valido Por Favor..!!';
                mensaje.style.color = 'red';
                telefono.focus();

            }else{
                if(correo.value === ''){

                    mensaje.textContent = 'Ingrese Correo Valido Por Favor..!!';
                    mensaje.style.color = 'red';
                    correo.focus();

                }else{
                    if(run.value === ''){

                        mensaje.textContent = 'Ingrese run..!!';
                        mensaje.style.color = 'red';
                        run.focus();

                    }else{
                      
                        const listaUsuariosRegistrados  = obtenerUsuariosLocalStorage();
                        const listaEmpresaRegistradas = obtenerEmpresasLocalStorage();
                        const listaRunUsuarios = [];
                        const listaRunEmpresas = [];

                        listaUsuariosRegistrados.forEach(usuario => {
                            listaRunEmpresas.push(usuario.run);
                        });

                        listaEmpresaRegistradas.forEach(empresa => {
                            listaRunUsuarios.push(empresa.run);
                        });

                        if(listaRunUsuarios.includes(run.value)===true || listaRunEmpresas.includes(run.value)===true){

                            mensaje.textContent = 'rut ingresado ya existe..!!';
                            mensaje.style.color = 'red';
                            run.focus();

                        }else{

                            const generar = document.getElementById('generar');
                            generar.style.display = '';
                            generar.addEventListener('click',generarPassword);

                            if(username.value === ''){

                                mensaje.textContent = 'Ingrese Username..!!';
                                mensaje.style.color = 'red';
                                username.focus();
    
                            }else{
                                if(contieneEspaciosVacios(username.value)===true){
    
                                    mensaje.textContent = 'Username no puede Contener Espacios Vacios..!!';
                                    mensaje.style.color = 'red';
                                    username.focus();
    
                                }else{
                                    if(username.value.length < 8 || username.value.length > 20){
    
                                        mensaje.textContent = 'Username Debe contener entre 8 y 20 caracteres';
                                        mensaje.style.color = 'red';
                                        username.focus();
    
                                    }else{
                                        if(password.value === ''){
    
                                            mensaje.textContent = 'password Debe ser Mayor o Igual A 8 ..!!';
                                            mensaje.style.color = 'red';
                                            password.focus();
        
                                        }else{
                                            if(contieneEspaciosVacios(password.value)===true){
    
                                                mensaje.textContent = 'password no puede contener espacios vacios..!!';
                                                mensaje.style.color = 'red';
                                                password.focus();
    
                                            }else{
                                                if(password.value.length < 8 || password.value.length > 20){
        
                                                    mensaje.textContent = 'password Debe ser Mayor o Igual A 8';
                                                    mensaje.style.color = 'red';
                                                    password.focus();
            
                                                }else{
        
                                                    const usuario = {
            
                                                        nombre:  nombre.value,
                                                        apellido:apellido.value,
                                                        correo:  correo.value,
                                                        telefono:telefono.value,
                                                        run:run.value,
                                                        username:username.value,
                                                        password:password.value
            
                                                    }
            
                                                    const listaUsuarios = [];
                                                    listaUsuarios.push(usuario);
            
                                                    agregarUsuarioLocalStorage(usuario);
                                                    sessionStorage.setItem('sesion', username.value);
                                                    window.location.href = "inicio.html";
            
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function agregarUsuarioLocalStorage(usuario) {

    let usuarios;
    usuarios = obtenerUsuariosLocalStorage();
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios) );

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

    let empresas;

    if(localStorage.getItem('empresas') === null) {
         empresas = []; 
    } else {
        empresas = JSON.parse(localStorage.getItem('empresas') );
    }

    return empresas;
}


function generarPassword() {

    var resultado = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    
    for ( var i = 0; i < 10; i++ ) {
        resultado += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    password.value = resultado;
    console.log(resultado);
    
 }