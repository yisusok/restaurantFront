// URL del backend
const apiUrl = 'http://localhost:3000/platos';

// Selección de elementos del DOM
const erroresDiv = document.getElementById('errores');
const platosContainer = document.getElementById('platos');
const btnAgregar = document.getElementById('btnAgregar');
const btnActualizar = document.getElementById('btnActualizar');

// Función para renderizar los platos
export async function renderPlatos() {
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('Error al obtener los platos');
    const data = await res.json();
    platosContainer.innerHTML = '';

    data.forEach(plato => {
      const div = document.createElement('div');
      div.className = 'plato';
      div.innerHTML = `
        <strong>ID ${plato.id} - ${plato.nombre}</strong> - ${plato.categoria} <br>
        Ingredientes: ${plato.ingredientes} <br>
        Precio: $${plato.precio} <br>
        <button class="eliminar-btn" data-id="${plato.id}">Eliminar</button>
      `;
      platosContainer.appendChild(div);
    });

    // Agregar listener a botones eliminar
    document.querySelectorAll('.eliminar-btn').forEach(btn => {
      btn.addEventListener('click', () => eliminarPlato(btn.dataset.id));
    });

  } catch (err) {
    erroresDiv.textContent = err.message;
  }
}

// Función para agregar un plato
export async function agregarPlato() {
  try {
    const nombre = document.getElementById('nombre').value;
    const ingredientes = document.getElementById('ingredientes').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const categoria = document.getElementById('categoria').value;

    if (!nombre) return alert('Nombre requerido');

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, ingredientes, precio, categoria })
    });
    if (!res.ok) throw new Error('Error al agregar plato');

    // Limpiar inputs
    document.getElementById('nombre').value = '';
    document.getElementById('ingredientes').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('categoria').value = '';

    renderPlatos();
  } catch (err) {
    erroresDiv.textContent = err.message;
  }
}

// Función para actualizar precio de un plato
export async function actualizarPlato() {
  try {
    const id = document.getElementById('updateId').value;
    const precio = parseFloat(document.getElementById('updatePrecio').value);
    if (!id || !precio) return alert('ID y precio requeridos');

    const res = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ precio })
    });
    if (!res.ok) throw new Error('Error al actualizar plato');

    document.getElementById('updateId').value = '';
    document.getElementById('updatePrecio').value = '';

    renderPlatos();
  } catch (err) {
    erroresDiv.textContent = err.message;
  }
}

// Función para eliminar un plato
export async function eliminarPlato(id) {
  try {
    const res = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error al eliminar plato');
    renderPlatos();
  } catch (err) {
    erroresDiv.textContent = err.message;
  }
}

// Inicialización de eventos
btnAgregar.addEventListener('click', agregarPlato);
btnActualizar.addEventListener('click', actualizarPlato);

// Carga inicial de platos
renderPlatos();
