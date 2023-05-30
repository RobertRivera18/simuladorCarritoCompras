//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    listCursos.addEventListener('click', agregarCurso)

    carrito.addEventListener('click', eliminarCurso);

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    })

}
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

}

function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo un elemento
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();

    }

}


//Lee el contenido del html y agrega recursos
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }
    //Revisa si un objeto y existe en el carrito

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }

        });
        articulosCarrito = [...cursos]

    } else {
        //Agregando los elementos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];

    }

    carritoHTML();
}

//Muestra el carrito de compras en la pagina
function carritoHTML() {

    //Limpiamos el HTML
    limpiarHTML();

    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `

        <td>
          <img src="${imagen}" width="100">
        </td>
       <td>${titulo}</td>

       <td>${precio}</td>
       <td>${cantidad}</td>
       <td>
       <a href="$" class="borrar-curso" data-id="${curso.id}">X</a>
       </td>
         `;

        //Agrega el contenedor del carrito en el HTML
        contenedorCarrito.appendChild(row);
    });
}


//eElimna los cursos del tbody
function limpiarHTML() {

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}

