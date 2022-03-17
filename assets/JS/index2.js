let templateCardJumbotron = document.querySelector('#template_jumbotron-card');
let cardJumbotron = document.querySelector('.jumbotron_card');

async function apiRequest() {
    try {
        let respuesta = await fetch('https://api.nasa.gov/planetary/apod?api_key=Ah62SEfDVY3K4OiuUs4ZI33Honwahn3xtef48Ncm');
        return respuesta;
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}

function construirCardJumbotron(pJson) {
    let template = templateCardJumbotron.content.cloneNode(true);
    let img = template.querySelector('img');
    let titulo = template.querySelector('.card-title');
    let texto = template.querySelector('.card-text');

    img.src = pJson.url;
    titulo.textContent = pJson.title;
    texto.textContent = pJson.explanation;

    return template;
}
apiRequest()
    .then(response => {
        return response.ok ? response.json() : Promise.reject(response);
    })
    .then(json => {
        console.log(json);

        cardJumbotron.appendChild(construirCardJumbotron(json));
    })