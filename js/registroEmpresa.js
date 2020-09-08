//lista para simular ws de iss para validar empresa y obtener sus datos :)
const listaEmpresasIss = [
    {nombre : "Empresa Uno ",run : "111111111",razonSocial : "construccion",telefono :"911111", correo : "EmpresaUno@gmail.com", username :'',password:''},
    {nombre : "Empresa dos ",run : "222222222",razonSocial : "construccion",telefono :"911111", correo : "EmpresaDos@gmail.com", username :'',password:''},
    {nombre : "Empresa tres ",run : "333333333",razonSocial : "construccion",telefono :"911111", correo : "EmpresaTres@gmail.com", username :'',password:''},
    {nombre : "Empresa cuatro ",run : "444444444",razonSocial : "construccion",telefono :"911111", correo : "EmpresaCuadro@gmail.com", username :'',password:''},
    {nombre : "Empresa cinco ",run :  "555555555",razonSocial : "construccion",telefono :"955555", correo : "Empresacinco@gmail.com", username :'',password:''}
]

const consultar = document.querySelector('#consultar');

const run = document.querySelector('#run');

let mensaje = document.querySelector('#mesaje');

const username = document.querySelector('#input-cont1');

const password = document.querySelector('#input-cont2');

const existeRegistro = document.querySelector('.existeRegistro');



eventListeners();

function eventListeners() {

    consultar.addEventListener('click', validarRunEmpresa);
    document.addEventListener('DOMContentLoaded', datosInicio);

   
}
 function datosInicio() {

    username.style.display = 'none';
    password.style.display = 'none';
    existeRegistro.style.display = 'none';
    run.focus();


 }



function validarRunEmpresa(e) {

    e.preventDefault();

    if(run.value === '' || run.value.trim()=== ''){

        mensaje.textContent = 'ingrese run valido';
        mensaje.style.color = 'red';
        run.value = '';
        run.focus();

    }else{

        const listaRun = [];
        listaEmpresasIss.forEach(empresa => {
            listaRun.push(empresa.run);

        });

        if(listaRun.includes(run.value)===false){

            mensaje.textContent = 'Run no existe en registro Iss';
            mensaje.style.color = 'red';
            existeRegistro.style.display = 'none';
            run.focus();

        }else{

      
            const listaEmpresasRegistradas = obtenerEmpresasLocalStorage();
            const listarunRegistrados = [];
            listaEmpresasRegistradas.forEach(empresa => {
                listarunRegistrados.push(empresa.run);
            });
        
                if(listarunRegistrados.includes(run.value)===true){

                    mensaje.textContent = 'Empresa Ya Esta Registrada, puedes Iniciar session...!';
                    mensaje.style.color = 'yellow';
                    existeRegistro.style.display = '';
                    run.focus();

                }else{
                    
                    mensaje.textContent = '';
                    run.parentElement.remove();
                    existeRegistro.style.display = 'none';
                    username.style.display = '';
                    password.style.display = '';
                    consultar.value = 'Guardar';
                    const parrafo = document.getElementById('parrafo').textContent = 'Cree Credenciales para inicio de Session';
                    const titulo = document.getElementById('titulo').textContent = 'Ingreso de Credenciales';
                    consultar.id = 'ingresar';
                    const ingresar = document.getElementById('ingresar');
                    username.children[1].focus();
                    ingresar.addEventListener('click', ingresarCredenciales);
                }
            }
       }
    }



function ingresarCredenciales(e) {

    e.preventDefault();

    const username = document.getElementById('username');
    const password = document.getElementById('password');

    if(username.value === ''){

        mensaje.textContent = 'ingrese Username Valido';
        mensaje.style.color = 'red';
        username.focus();

    }else{
        if(contieneEspaciosVacios(username.value)===true){
            
        mensaje.textContent = 'username no puede contener espacios vacio..!!';
        mensaje.style.color = 'red';
        username.focus();
        username.value = '';

        }else{
            if(username.value.length  < 8 || username.value.length > 20){

                mensaje.textContent = 'username debe contener entre 8 y 20 caracteres..!';
                mensaje.style.color = 'red';
                username.focus();
    
            }else{
                if(password.value === '' ){
    
                    mensaje.textContent = 'ingrese password valido';
                    mensaje.style.color = 'red';
                    password.focus();
    
                }else{
                    if(contieneEspaciosVacios(password.value)===true){

                        mensaje.textContent = 'password no puede contener espacios vacio..!!';
                        mensaje.style.color = 'red';
                        password.focus();
                        password.value = '';

                    }else{
                        if(password.value.length < 8 || password.value.length > 20){
    
                            mensaje.textContent = 'password debe contener entre 8 y 20 caracteres..!';
                            mensaje.style.color = 'red';
                            password.focus();
        
                        }else{
        
                            const listaUsuariosSistema = [];
                            listaEmpresasIss.forEach(empresa => {
                                
                                if(empresa.run === run.value){
                                    listaUsuariosSistema.push(empresa);
                                }
                            });
        
                            const largoLista =  listaUsuariosSistema.length-1;
                            Object.defineProperty(listaUsuariosSistema[largoLista], "username", {value:username.value})
                            Object.defineProperty(listaUsuariosSistema[largoLista], "password", {value:password.value})
                            agregarEmpresaLocalStorage(listaUsuariosSistema[largoLista]);
                            sessionStorage.setItem('sesion', listaUsuariosSistema[largoLista].username);
                            let sesion = sessionStorage.getItem('sesion');
                            mensaje.textContent = 'existo';
                            window.location.href = "inicio.html";
                        }
                    }
                }
            }
        }
    }
}

function agregarEmpresaLocalStorage(empresa) {

    let empresas;

    empresas = obtenerEmpresasLocalStorage();
    empresas.push(empresa);
    localStorage.setItem('empresas', JSON.stringify(empresas) );
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