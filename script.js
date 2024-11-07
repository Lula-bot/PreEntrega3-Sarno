// Array para almacenar los productos (cargado desde localStorage si existe)
let compras = JSON.parse(localStorage.getItem('compras')) || [];

// Función para agregar un producto
function agregarProducto(supermercado, producto, precio, descuento) {
    let nuevoProducto = {
        supermercado: supermercado,
        producto: producto,
        precio: parseFloat(precio),
        descuento: parseFloat(descuento),
        precioFinal: calcularPrecioConDescuento(precio, descuento)
    };
    compras.push(nuevoProducto);
    guardarCompras(); // Guardar en localStorage
    actualizarListaProductos();
    actualizarTotales();
}

// Función para guardar en localStorage.
function guardarCompras() {
    localStorage.setItem('compras', JSON.stringify(compras));
}

// Función para calcular el precio con descuento
function calcularPrecioConDescuento(precio, descuento) {
    return precio - (precio * (descuento / 100));
}

// Función para actualizar la lista de productos en el DOM
function actualizarListaProductos() {
    const listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = ''; // Limpiar la lista antes de actualizar

    compras.forEach((item, index) => {
        let li = document.createElement('li');
        li.textContent = `${item.supermercado} - ${item.producto} - Precio: $${item.precio.toFixed(2)} - Descuento: ${item.descuento}% - Precio final: $${item.precioFinal.toFixed(2)}`;
        
        // Botón para eliminar producto
        let btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.className = 'btnEliminar';
        btnEliminar.addEventListener('click', () => eliminarProducto(index));
        
        li.appendChild(btnEliminar);
        listaProductos.appendChild(li);
    });
}

// Función para eliminar un producto
function eliminarProducto(index) {
    compras.splice(index, 1);
    guardarCompras(); // Actualizar localStorage
    actualizarListaProductos();
    actualizarTotales();
}

// Función para calcular y mostrar el total de los gastos y descuentos
function actualizarTotales() {
    const totalGasto = compras.reduce((total, item) => total + item.precioFinal, 0);
    const totalDescuento = compras.reduce((total, item) => total + (item.precio * (item.descuento / 100)), 0);

    document.getElementById('totalGasto').textContent = `Total de Gastos: $${totalGasto.toFixed(2)}`;
    document.getElementById('totalDescuento').textContent = `Ahorro: $${totalDescuento.toFixed(2)}`;
}

// Manejar el evento de envío del formulario
document.getElementById('productoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que se recargue la página

    // Obtener los valores del formulario
    const supermercado = document.getElementById('supermercado').value;
    const producto = document.getElementById('producto').value;
    const precio = document.getElementById('precio').value;
    const descuento = document.getElementById('descuento').value;

    // Validación simple para asegurarse de que los valores están completos
    if (supermercado && producto && precio && descuento) {
        agregarProducto(supermercado, producto, precio, descuento);
        document.getElementById('productoForm').reset();
    } else {
        alert("Por favor completa todos los campos.");
    }
});

// Cargar los datos desde localStorage cuando la página se cargue
document.addEventListener('DOMContentLoaded', () => {
    actualizarListaProductos();
    actualizarTotales();
});
