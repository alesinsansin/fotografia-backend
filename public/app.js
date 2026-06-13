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

        <button class="btn-editar"
        onclick="editarCotizacion(
        '${c._id}',
        '${c.cliente}',
        '${c.evento}',
        '${c.fecha}',
        '${c.paquete}',
        '${c.ubicacion}',
        '${c.telefono}',
        '${c.estado}'
        )">
        Editar
        </button>

        <button class="btn-eliminar"
        onclick="eliminarCotizacion('${c._id}')">
        Eliminar
        </button>

        </td>

        </tr>
        `;
    });
}

document.getElementById("formCotizacion").addEventListener("submit", async (e)=>{

    e.preventDefault();

    const id = document.getElementById("cotizacionId").value;

    const cotizacion = {

        cliente: cliente.value,
        evento: evento.value,
        fecha: fecha.value,
        paquete: paquete.value,
        ubicacion: ubicacion.value,
        telefono: telefono.value,
        estado: estado.value

    };

    if(id){

        await fetch(`${API_URL}/${id}`,{

            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(cotizacion)

        });

    }else{

        await fetch(API_URL,{

            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(cotizacion)

        });

    }

    formulario.reset();

    cotizacionId.value="";

    tituloFormulario.textContent="Registrar Cotización";
    btnGuardar.textContent="Guardar Cotización";

    obtenerCotizaciones();

});

function editarCotizacion(id,cliente,evento,fecha,paquete,ubicacion,telefono,estado){

    cotizacionId.value=id;

    document.getElementById("cliente").value=cliente;
    document.getElementById("evento").value=evento;
    document.getElementById("fecha").value=fecha;
    document.getElementById("paquete").value=paquete;
    document.getElementById("ubicacion").value=ubicacion;
    document.getElementById("telefono").value=telefono;
    document.getElementById("estado").value=estado;

    tituloFormulario.textContent="Editar Cotización";
    btnGuardar.textContent="Actualizar Cotización";

}

async function eliminarCotizacion(id){

    if(confirm("¿Deseas eliminar esta cotización?")){

        await fetch(`${API_URL}/${id}`,{
            method:"DELETE"
        });

        obtenerCotizaciones();

    }
}

obtenerCotizaciones();