const API_URL = "/cotizaciones";

async function obtenerCotizaciones() {
    const res = await fetch(API_URL);
    const datos = await res.json();

    const tabla = document.getElementById("tablaCotizaciones");
    tabla.innerHTML = "";

    datos.forEach(c => {
        tabla.innerHTML += `
        <tr>
            <td>${c.cliente}</td>
            <td>${c.evento}</td>
            <td>${c.fecha}</td>
            <td>${c.paquete}</td>
            <td>${c.telefono}</td>
            <td>${c.estado}</td>
            <td>
                <button class="btn-editar" onclick="editarCotizacion('${c._id}')">
                    Editar
                </button>

                <button class="btn-eliminar" onclick="eliminarCotizacion('${c._id}')">
                    Eliminar
                </button>
            </td>
        </tr>
        `;
    });
}

document.getElementById("formCotizacion").addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("cotizacionId").value;

    const cotizacion = {
        cliente: document.getElementById("cliente").value,
        evento: document.getElementById("evento").value,
        fecha: document.getElementById("fecha").value,
        paquete: document.getElementById("paquete").value,
        ubicacion: document.getElementById("ubicacion").value,
        telefono: document.getElementById("telefono").value,
        estado: document.getElementById("estado").value
    };

    if (id) {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cotizacion)
        });
    } else {
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cotizacion)
        });
    }

    document.getElementById("formCotizacion").reset();
    document.getElementById("cotizacionId").value = "";
    document.getElementById("tituloFormulario").textContent = "Registrar Cotización";
    document.getElementById("btnGuardar").textContent = "Guardar Cotización";

    obtenerCotizaciones();
});

async function editarCotizacion(id) {
    const res = await fetch(API_URL);
    const datos = await res.json();

    const c = datos.find(item => item._id === id);

    document.getElementById("cotizacionId").value = c._id;
    document.getElementById("cliente").value = c.cliente;
    document.getElementById("evento").value = c.evento;
    document.getElementById("fecha").value = c.fecha;
    document.getElementById("paquete").value = c.paquete;
    document.getElementById("ubicacion").value = c.ubicacion;
    document.getElementById("telefono").value = c.telefono;
    document.getElementById("estado").value = c.estado;

    document.getElementById("tituloFormulario").textContent = "Editar Cotización";
    document.getElementById("btnGuardar").textContent = "Actualizar Cotización";
}

async function eliminarCotizacion(id) {
    if (confirm("¿Deseas eliminar esta cotización?")) {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        obtenerCotizaciones();
    }
}

obtenerCotizaciones();