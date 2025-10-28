const API_BASE = 'http://localhost:3000';

// --- CARGAR CATEGORÍAS Y PLATOS ---
async function cargarCarta() {
  try {
    const resCategorias = await fetch(`${API_BASE}/categorias`);
    const categorias = await resCategorias.json();

    const contenedorCarta = document.getElementById('carta');
    contenedorCarta.innerHTML = '';

    for (const cat of categorias) {
      // Crear encabezado y contenedor
      const h2 = document.createElement('h2');
      h2.textContent = cat.nombre;
      h2.className='cate';

      const divCat = document.createElement('div');
      divCat.id = `categoria-${cat.id}`;

      contenedorCarta.appendChild(h2);
      contenedorCarta.appendChild(divCat);

      // Cargar platos de esa categoría
      await cargarPlatosPorCategoria(cat.id, divCat.id);
    }
  } catch (err) {
    console.error('Error al cargar la carta:', err);
  }
}

// --- CARGAR PLATOS POR CATEGORÍA ---
async function cargarPlatosPorCategoria(categoria_id, contenedor_id) {
  try {
    const res = await fetch(`${API_BASE}/platos/categoria/${categoria_id}`);
    const platos = await res.json();

    const contenedor = document.getElementById(contenedor_id);
    contenedor.innerHTML = '';
    contenedor.className = 'containerC';

platos.forEach(p => {
  const div = document.createElement('div');
  div.className = 'plato';
  div.innerHTML = `<strong>${p.nombre}</strong> - $${p.precio} <p>{${p.ingredientes}}</p>`;

  // Agregamos los elementos dentro del div principal
  contenedor.appendChild(div);


});

  } catch (err) {
    console.error(`Error al cargar platos de categoría ${categoria_id}:`, err);
    const contenedor = document.getElementById(contenedor_id);
    contenedor.textContent = 'No se pudieron cargar los platos.';
  }
}

// --- INICIO ---
document.addEventListener('DOMContentLoaded', () => {
  cargarCarta();
});
