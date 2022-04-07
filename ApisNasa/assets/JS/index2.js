/*PETICION DE APIS*/
/*API IMG DAY*/
const templateCardJumbotron = document.querySelector('#template_jumbotron-card');
const templateVideoJumbotron = document.querySelector('#template_jumbotron-video');
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

function construirVideo(pJson) {
    let template = templateVideoJumbotron.content.cloneNode(true);
    let iframe = template.querySelector('iframe');

    iframe.src = pJson.url;
    iframe.title = pJson.title;

    return template

}

apiRequest(direccionImgDay)
    .then(response => {
        return response.ok ? response.json() : Promise.reject(response);
    })
    .then(json => {
        console.log(json);

        if (json.media_type == 'video') {
            document.querySelector('#jumbotron_dinamyc-content').appendChild(construirVideo(json));
        } else {
            cardJumbotron.appendChild(construirCardJumbotron(json));

        }
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
        // galeria += `<div class="col">
        //                 <img style="max-width:100%" src="https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=Ah62SEfDVY3K4OiuUs4ZI33Honwahn3xtef48Ncm" alt="imagen" class="img-fluid">
        //             </div>`

        galeria += `<div class="col">
                         <img style="max-width:100%" src="${getImage(element)}" alt="imagen" class="img-fluid galeria_foto">
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
                                <img style="max-width:100%" src="${getImage(element)}" alt="imagen" class="img-fluid galeria_foto">
                            </div>`
        } else {
            imagenCarousel = `<div class="carousel-item" >
                                <img style="max-width:100%" src="${getImage(element)}" alt="imagen" class="img-fluid galeria_foto">
                            </div>`
        }
        carouselInner.innerHTML += imagenCarousel;


    })

    return template;

}

/*Para construir cada una de las  imagenes*/
const getImage = (pParametro) => {
    let fecha = pParametro.date;
    let fechaProcesada = fecha.split(' ');
    fechaProcesada = fechaProcesada[0].replace(/-/g, '/');
    // console.log(fechaProcesada)
    // fechaProcesada.map(element => console.log(element))

    let url = `https://api.nasa.gov/EPIC/archive/natural/${fechaProcesada}/png/${pParametro.image}.png?api_key=Ah62SEfDVY3K4OiuUs4ZI33Honwahn3xtef48Ncm`;
    return url;
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
        console.log(json);
        let widthScreen = window.innerWidth

        if (widthScreen > 900) {
            while (fotosGaleria.childNodes.length >= 1) {
                fotosGaleria.removeChild(fotosGaleria.firstChild);
            }
            fotosGaleria.innerHTML = construirGaleria(json);
        } else {
            console.log(fotosGaleria.childNodes.length);
            while (fotosGaleria.childNodes.length >= 1) {
                fotosGaleria.removeChild(fotosGaleria.firstChild);
            }
            fotosGaleria.appendChild(construirCarousel(json));
            // fotosGaleria.classList.add('d-block');

        }

        window.addEventListener('resize', (e) => {
            // console.log(e);
            let widthScreen = window.innerWidth
                // console.log(widthScreen);
            if (widthScreen > 900) {
                while (fotosGaleria.childNodes.length >= 1) {
                    fotosGaleria.removeChild(fotosGaleria.firstChild);
                }
                fotosGaleria.innerHTML = construirGaleria(json);
            } else {
                console.log(fotosGaleria.childNodes.length);
                while (fotosGaleria.childNodes.length >= 1) {
                    fotosGaleria.removeChild(fotosGaleria.firstChild);
                }
                fotosGaleria.appendChild(construirCarousel(json));
                // fotosGaleria.classList.add('d-block');

            }

        })


    })
    .catch(error => {
        console.log(error);
    })