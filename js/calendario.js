let nav = 0;
let clicked = null;
let eventos = localStorage.getItem("eventos")
  ? JSON.parse(localStorage.getItem("eventos"))
  : [];
  

const calendario = document.getElementById("calendario");
const nuevoEventoModal = document.getElementById("nuevoEventoModal");
const eliminarEventoModal = document.getElementById("eliminarEventoModal");
const ventanaFlotante = document.getElementById("ventanaFlotante");
const tituloEvento = document.getElementById("tituloEvento");
const horaEvento = document.getElementById("horaEvento");
const descripcionEvento = document.getElementById("descripcion");
const participantesEvento = document.getElementById("participantes");
const dias = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function abrirVentanaFlotante(date) {
  clicked = date;

  const eventoDia = eventos.find((e) => e.fecha === clicked);
  if (eventoDia) {

    document.getElementById("textoTituloEvento").value = eventoDia.titulo;
    document.getElementById("textoHoraEvento").value = eventoDia.hora;
    document.getElementById("textoDescripcion").value = eventoDia.descripcion;
    document.getElementById("textoParticipantes").value = eventoDia.participantes;

    eliminarEventoModal.style.display = "block";

    
  } else {
    nuevoEventoModal.style.display = "block";
  }

  ventanaFlotante.style.display = "block";
}

function cargar() {
  const fecha = new Date();

  if (nav !== 0) {
    fecha.setMonth(fecha.getMonth() + nav);
  }

  const dia = fecha.getDate();
  const mes = fecha.getMonth();
  const anio = fecha.getFullYear();

  const primerDiaDelMes = new Date(anio, mes, 1);
  const cantidadDiasEnMes = new Date(anio, mes + 1, 0).getDate();

  const cadenaDeFecha = primerDiaDelMes.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  document.getElementById("espacioMes").innerText = `${fecha.toLocaleDateString(
    "es-es",
    { month: "long" }
  )} ${anio}`;

  calendario.innerHTML = "";

  const diasDeRelleno = dias.indexOf(cadenaDeFecha.split(", ")[0]);
  console.log(diasDeRelleno);

  for (let i = 1; i <= diasDeRelleno + cantidadDiasEnMes; i++) {
    const cuadroDeDia = document.createElement("div");
    cuadroDeDia.classList.add("dia");

    const diaEscrito = `${mes+1}-${i - diasDeRelleno}-${anio}`

    if (i > diasDeRelleno) {
      cuadroDeDia.innerText = i - diasDeRelleno;

      const eventoPorDia = eventos.find((e) => e.fecha === diaEscrito);

      if (dia === i - diasDeRelleno && nav === 0) {
        cuadroDeDia.id = "hoy";
      }

      if (eventoPorDia) {

        const divEvento = document.createElement("div");
        divEvento.classList.add("evento");
        divEvento.innerText = eventoPorDia.titulo;
        cuadroDeDia.appendChild(divEvento);

      }

      cuadroDeDia.addEventListener("click", () => abrirVentanaFlotante(diaEscrito));

    } else {
      cuadroDeDia.classList.add("relleno");
    }

    calendario.appendChild(cuadroDeDia);
  }
}

function cerrarModal() {
  nuevoEventoModal.style.display = "none";
  eliminarEventoModal.style.display = "none";
  ventanaFlotante.style.display = "none";
  tituloEvento.value = "";
  descripcionEvento.value = "";
  horaEvento.value = "";
  participantesEvento.value = "";
  
  clicked = null;
  cargar();
}

function guardarEvento() {
  
  if (tituloEvento.value && descripcionEvento.value && horaEvento.value && participantesEvento.value) {
    eventos.push({
      fecha: clicked,
      titulo: tituloEvento.value,
      descripcion: descripcionEvento.value,
      hora: horaEvento.value,
      participantes: participantesEvento.value,
    });

    localStorage.setItem("eventos", JSON.stringify(eventos));
    cerrarModal();
  } else {
    alert("Por favor, rellene todos los campos");
  }
}

function eliminarEvento() {
    eventos = eventos.filter((e) => e.fecha !== clicked);
    localStorage.setItem("eventos", JSON.stringify(eventos));
    cerrarModal();
} 



function iniciarBotones() {
  document.getElementById("botonAtras").addEventListener("click", () => {
    nav--;
    cargar();
  });

  document.getElementById("botonSiguiente").addEventListener("click", () => {
    nav++;
    cargar();
  });

  document.getElementById("botonGuardar").addEventListener("click", guardarEvento); 
  document.getElementById("botonCancelar").addEventListener("click", cerrarModal);

  document.getElementById("botonElimiar").addEventListener("click", eliminarEvento); 
  document.getElementById("botonCerrar").addEventListener("click", cerrarModal);

}

iniciarBotones();
cargar();
