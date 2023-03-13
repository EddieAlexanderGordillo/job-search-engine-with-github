const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

document.addEventListener('DOMContentLoaded', () => {
  formulario.addEventListener('submit', validarBusqueda);
});

function validarBusqueda(e) {
  e.preventDefault();
  const busqueda = document.querySelector('#busqueda');
  if (busqueda.length < 3) {
    mostrarMensaje('Búsqueda muy corta... añade más información');
    return;
  }
  consultarAPI();
}
function consultarAPI(busqueda) {
  const githubUrl = `https://jobs.github.com/positions.json?search=${busqueda}`;
  const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
    githubUrl
  )}`;

  axios
    .get(url)
    .then((respuesta) => {
      mostrarVacantes(JSON.parse(respuesta.data.contents));
    })
    .catch((error) => console.log(error));
}
function mostrarMensaje(mensaje) {
  const alertaPrevia = document.querySelector('.alerta__error');
  if (!alertaPrevia) {
    const alerta = document.createElement('div');
    alerta.classList.add('alerta__error');
    alerta.textContent = mensaje;
    formulario.appendChild(alerta);
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function mostrarVacantes(vacantes) {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
  if (vacantes.length > 0) {
    resultado.classList.add('grid-resultado');
    vacantes.forEach((vacante) => {
      const { company, title, type, url } = vacante;
      resultado.innerHTML += `
            <div class="contenedor-vacante">
                    <h2 class="vacante__titulo">${title}</h2>
                    <p class="vacante__texto">Compañia:  <span class="font-light normal-case">${company} </span></p>
                    <p class="vacante__texto">Tipo de Contrato:   <span class="font-light normal-case">${type} </span></p>
                    <a class="btn-ver-vacante" href="${url}">Ver Vacante</a>
                </div>
        `;
    });
  } else {
    const noResultado = document.createElement('p');
    noResultado.classList.add('resulado__noEncontrado');
    resultado.classList.remove('grid-resultado');
    noResultado.textContent =
      ' No hay vacantes, intenta con otro término de bísqueda';
    resultado.appendChild(noResultado);
  }
}
