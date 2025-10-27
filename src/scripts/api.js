const API_BASE = 'http://localhost:3000';

// --- CARGAR CATEGORÍAS ---
async function cargarCategorias() {
  try {
    const res = await fetch(`${API_BASE}/categorias`);
    const data = await res.json();

    const select = document.getElementById('categoria');
    select.innerHTML = ''; // Limpia el selector
    data.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.nombre || cat.name || cat.id;
      option.textContent = cat.nombre || cat.name;
      select.appendChild(option);
    });
  } catch (err) {
    console.error('Error al cargar categorías:', err);
    document.getElementById('errores').textContent = 'Error al cargar categorías.';
  }
}

// --- AGREGAR PLATO ---
async function agregarPlato() {
  const nombre = document.getElementById('nombre').value.trim();
  const ingredientes = document.getElementById('ingredientes').value.trim();
  const precio = document.getElementById('precio').value.trim();
  const categoria = document.getElementById('categoria').value;

  if (!nombre || !precio || !categoria) {
    alert('Complete todos los campos obligatorios.');
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/platos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, ingredientes, precio: parseFloat(precio), categoria }),
    });

    if (res.ok) {
      alert('Plato agregado con éxito.');
      cargarPlatos();
    } else {
      alert('Error al agregar plato.');
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

// --- ACTUALIZAR PRECIO ---
async function actualizarPrecio() {
  const id = document.getElementById('updateId').value;
  const nuevoPrecio = document.getElementById('updatePrecio').value;

  if (!id || !nuevoPrecio) {
    alert('Ingrese ID y nuevo precio.');
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/platos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ precio: parseFloat(nuevoPrecio) }),
    });

    if (res.ok) {
      alert('Precio actualizado con éxito.');
      cargarPlatos();
    } else {
      alert('Error al actualizar el plato.');
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

// --- ELIMINAR PLATO ---
async function eliminarPlato(id) {
  if (!confirm('¿Seguro que quiere eliminar este plato?')) return;

  try {
    const res = await fetch(`${API_BASE}/platos/${id}`, { method: 'DELETE' });
    if (res.ok) {
      alert('Plato eliminado.');
      cargarPlatos();
    } else {
      alert('Error al eliminar plato.');
    }
  } catch (err) {
    console.error('Error al eliminar plato:', err);
  }
}

// --- MOSTRAR PLATOS ---
async function cargarPlatos() {
  try {
    const res = await fetch(`${API_BASE}/platos`);
    const platos = await res.json();

    const contenedor = document.getElementById('platos');
    contenedor.innerHTML = '';

    platos.forEach(p => {
      const div = document.createElement('div');
      div.className = 'plato';
      div.innerHTML = `
        <strong>ID:</strong> ${p.id}<br/>
        <strong>Nombre:</strong> ${p.nombre}<br/>
        <strong>Ingredientes:</strong> ${p.ingredientes}<br/>
        <strong>Precio:</strong> $${p.precio}<br/>
        <strong>Categoría:</strong> ${p.categoria}<br/>
      `;

      // Botón Eliminar
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.addEventListener('click', () => eliminarPlato(p.id));
      div.appendChild(btnEliminar);

      contenedor.appendChild(div);
    });
  } catch (err) {
    console.error('Error al cargar platos:', err);
    document.getElementById('errores').textContent = 'Error al cargar platos.';
  }
}

// --- EVENTOS ---
document.getElementById('btnAgregar').addEventListener('click', agregarPlato);
document.getElementById('btnActualizar').addEventListener('click', actualizarPrecio);

// --- INICIO ---
cargarCategorias();
cargarPlatos();
