/*PETICION DE APIS*/
/*API IMG DAY*/
const templateCardJumbotron = document.querySelector('#template_jumbotron-card');
const cardJumbotron = document.querySelector('.jumbotron_card');

const direccionImgDay = 'https://api.nasa.gov/planetary/apod?api_key=Ah62SEfDVY3K4OiuUs4ZI33Honwahn3xtef48Ncm';

const apiRequest = async(pDireccion) => {
    try {
        let respuesta = await fetch(pDireccion);
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

apiRequest(direccionImgDay)
    .then(response => {
        return response.ok ? response.json() : Promise.reject(response);
    })
    .then(json => {
        // console.log(json);

        cardJumbotron.appendChild(construirCardJumbotron(json));
    })
    .catch(error => {
        console.log(error.statusText);
    })


/*API EPIC (IMAGENES DE LA TIERRA)*/
const direccionImgsTierra = 'https://api.nasa.gov/EPIC/api/natural/images?api_key=Ah62SEfDVY3K4OiuUs4ZI33Honwahn3xtef48Ncm';
const fotosGaleria = document.querySelector('#galeria_fotos');

const galeriaCarousel = document.querySelector('#template_galeria-carousel');

const construirGaleria = (pJson) => {
    let galeria = '';
    // console.log(pJson.length);

    pJson.forEach(element => {
        // console.log(element);
        galeria += `<div class="col">
                        <img style="max-width:100%" src="https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=Ah62SEfDVY3K4OiuUs4ZI33Honwahn3xtef48Ncm" alt="imagen" class="img-fluid">
                    </div>`
    });

    return galeria;
}

const construirCarousel = (pJson) => {
    const template = galeriaCarousel.content.cloneNode(true);
    const carouselInner = template.querySelector('.carousel-inner');

    pJson.forEach((element, index) => {
        let imagenCarousel = '';
        if (index == 0) {
            imagenCarousel = `<div class="carousel-item active" >
            	                <img src="https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=Ah62SEfDVY3K4OiuUs4ZI33Honwahn3xtef48Ncm" class="d-block w-100" alt="...">
                            </div>`
        } else {
            imagenCarousel = `<div class="carousel-item" >
                                <img src="https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=Ah62SEfDVY3K4OiuUs4ZI33Honwahn3xtef48Ncm" class="d-block w-100" alt="...">
                            </div>`
        }
        carouselInner.innerHTML += imagenCarousel;


    })




    return template;

}

const getApi = async(pDireccionApi) => {
    const response = fetch(direccionImgsTierra);
    if (!response) throw new Error('Sin respuesta');
    else return response;
}

const getImagenes = async(pDirImgs) => {

    try {
        const imagenes = await getApi(pDirImgs);
        return imagenes
    } catch (error) {
        console.log(error);
    }

}

getImagenes(direccionImgsTierra)
    .then(response => {
        return response.ok ? response.json() : Promise.reject(response);
    })
    .then(json => {
        // console.log(json);
        console.log(window.innerWidth);

        if (window.innerWidth > 900)
            fotosGaleria.innerHTML = construirGaleria(json);

        else {
            fotosGaleria.appendChild(construirCarousel(json));
            fotosGaleria.classList.add('d-block');

        }

    })
    .catch(error => {
        console.log(error);
    })