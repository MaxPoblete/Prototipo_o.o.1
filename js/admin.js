eventListeners();

function eventListeners() {

    document.addEventListener('DOMContentLoaded', cargarDatosTablas);
   
}

function cargarDatosTablas() {
    
    const listaUsuariosRegistrados  = obtenerUsuariosLocalStorage();
    const listaEmpresaRegistradas = obtenerEmpresasLocalStorage();
    const listaEmpresasISS = obtenerEmpresasISSLocalStorage();
    const myTable = document.querySelector('#myTable');
    

    listaEmpresaRegistradas.forEach(empresa => {
        
         const tr = document.createElement('tr');
        
         const bodyTable = document.createElement('tbody');

         const tbNombre = document.createElement('td');
         const tbRun = document.createElement('td');
         const tbRazonSocial = document.createElement('td');
         const tbTelefono = document.createElement('td');
         const tbEmail = document.createElement('td');
         const tbActualizar = document.createElement('td');
         const tbEliminar = document.createElement('td');

         tbNombre.textContent = empresa.nombre;
         tbRun.textContent = empresa.run;
         tbRazonSocial.textContent = empresa.razonSocial;
         tbTelefono.textContent = empresa.telefono;
         tbEmail.textContent = empresa.correo;

         const bottonEliminar = document.createElement('a');
         const bottonActualizar = document.createElement('a');

         bottonEliminar.id = 'eliminar';
         bottonActualizar.id = 'actualizar';
         bottonEliminar.textContent = 'Eliminar';
         bottonActualizar.textContent = 'Actualizar';
         bottonEliminar.href = '#';
         bottonActualizar.href = '#';

         tbActualizar.appendChild(bottonActualizar);
         tbEliminar.appendChild(bottonEliminar);

         tr.appendChild(tbNombre);
         tr.appendChild(tbRun);
         tr.appendChild(tbRazonSocial);
         tr.appendChild(tbTelefono);
         tr.appendChild(tbEmail);
         tr.appendChild(tbActualizar);
         tr.appendChild(tbEliminar);
        
         
         bodyTable.appendChild(tr);
         myTable.appendChild(bodyTable);
         
     });


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

function obtenerEmpresasLocalStorage() {

    let empresas;

    if(localStorage.getItem('empresas') === null) {
         empresas = []; 
    } else {
        empresas = JSON.parse(localStorage.getItem('empresas') );
    }

    return empresas;
}


function obtenerEmpresasISSLocalStorage() {

    let listaEmpresasISS;

    if(localStorage.getItem('listaEmpresasISS') === null) {
        listaEmpresasISS = []; 
    } else {
        listaEmpresasISS = JSON.parse(localStorage.getItem('listaEmpresasISS') );
    }
    
    return listaEmpresasISS;
}





function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }