const jumbotronContainer = document.querySelector('.jumbotron .container');
// //Api imagen del dia
async function apiRequest() {

    try {
        let respuesta = await fetch("https://api.nasa.gov/planetary/apod?api_key=Ah62SEfDVY3K4OiuUs4ZI33Honwahn3xtef48Ncm")
        return respuesta;

    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}

//Template de video en jumbotron
function templateIframe(pJson) {
    let template = document.querySelector('.template-iframe').content.cloneNode(true);
    let iframe = template.querySelector('iframe');
    let p = template.querySelector('.card-text');

    iframe.src = pJson.url

    p.textContent = pJson.text;
    return template;
}
//Template de la imagen
function templateMainImg(pJson) {
    let template = document.querySelector('#template_main-img').content.cloneNode(true);
    let img = template.querySelector('img');
    let p = template.querySelector('.card-text');
    let title = template.querySelector('.card-title');

    img.src = pJson.url;
    title.textContent = pJson.title
    p.textContent = pJson.explanation;
    return template;
}
apiRequest()
    .then(response => {
        return response.ok ? response.json() : Promise.reject(response);
    }).then(json => {
        // console.log(json);
        const fragment = document.createDocumentFragment();

        if (json.media_type === 'image') {
            const img = document.createElement('img');

            // img.src = json.url;
            // img.setAttribute('class', 'img-fluid');
            // fragment.appendChild(img);
            let imgTemplate = templateMainImg(json);
            jumbotronContainer.firstElementChild.firstElementChild.appendChild(imgTemplate);

        } else {
            console.log(json);
            console.log('hola');

            let template = templateIframe(json);
            jumbotronContainer.appendChild(template);

        }


    })
    .catch(err => {
        console.log(` ERROR: ${err}`);
    })




//Api epic fotos de la tierra
const epicImagenes = document.querySelector('.epic-imagenes .container');
const apiEpic = async () => {

    let data = await fetch('https://api.nasa.gov/EPIC/api/natural/images?api_key=Ah62SEfDVY3K4OiuUs4ZI33Honwahn3xtef48Ncm');

    if (!data)
        throw new Error('hay un error')
    else
        return data.json();

}


//Obtener la info de las imagenes
const getInfo = async () => {
    try {
        const info = await apiEpic();
        return info;
    } catch (error) {
        console.log(error);
    }
}

//Detectar el ancho de la pantalla del usuario.
function anchoVentana() {
    const anchoVentana = document.documentElement.clientWidth;
    return anchoVentana;

}

//Template para imagenes vista normal
function templateImgGaleria(pImg) {
    let template = document.querySelector('.galeria_img').content.cloneNode(true);
    let img = template.querySelector('img');

    img.src = pImg;

    return template;

}

let template = document.querySelector('.carousel').content.cloneNode(true);
let carouselInner = template.querySelector('.carousel-inner');

let cont = 0;

function templateImgCarousel(pImg) {
    if (cont == 0) {
        carouselInner.innerHTML += '<div class="carousel-item active">' +
            '<img class="d-block w-100" src="' + pImg + '">'
        '</div>';
    } else {
        carouselInner.innerHTML += '<div class="carousel-item">' +
            '<img class="d-block w-100" src="' + pImg + '">'
        '</div>';
    }

    cont++;
    return template;
}
//USO DE JQUERY
// $(document).ready(function () {
let ancho = anchoVentana();
// console.log(ancho);
const containerGaleria = document.querySelector('.epic-imagenes');

let rutas = [];
// rutas = getInfo;
// console.log(rutas);
getInfo()
    .then(json => {
        // console.log(json);

        let fechaRuta = json[0].date;
        let expReg = /(\d{2,4}-?){3,3}/gi;
        let fechaFormato = fechaRuta.match(expReg)

        let rutaImg = '';

        fechaFormato = fechaFormato[0].replace(/-/g, '/');
        // console.log(fechaFormato);

        // rutas = []

        json.forEach(element => {
            rutaImg = `https://epic.gsfc.nasa.gov/archive/natural/${fechaFormato}/png/${element.image}.png`;

            rutas.push(rutaImg);
        })
        
        // console.log(rutas);
        if (ancho <= 850) {
            // console.log('vista carousel');
            while (containerGaleria.firstElementChild.hasChildNodes()) {
                containerGaleria.firstElementChild.removeChild(containerGaleria.firstElementChild.firstChild);
            }
            containerGaleria.firstElementChild.textContent = '';
            document.querySelector('.epic-imagenes .container').classList.add('d-block');
            rutas.forEach(element => {
                containerGaleria.firstElementChild.appendChild(templateImgCarousel(element));

            })


        } else {
            // console.log('vista normal');
            while (containerGaleria.firstElementChild.hasChildNodes()) {
                containerGaleria.firstElementChild.removeChild(containerGaleria.firstElementChild.firstChild);
            }
            containerGaleria.firstElementChild.textContent = '';
            document.querySelector('.epic-imagenes .container').classList.remove('d-block');

            rutas.forEach(element => {
                containerGaleria.firstElementChild.appendChild(templateImgGaleria(element));

            })

        }
        window.addEventListener('resize', () => {
            ancho = anchoVentana();
            // console.log('evento resize');
            if (ancho <= 850) {
                console.log('vista carousel');
                if(containerGaleria.firstElementChild.hasChildNodes()) {
                    containerGaleria.firstElementChild.removeChild(containerGaleria.firstElementChild.firstChild);
                }
                containerGaleria.firstElementChild.textContent = '';
                document.querySelector('.epic-imagenes .container').classList.add('d-block');
                rutas.forEach(element => {
                    containerGaleria.firstElementChild.appendChild(templateImgCarousel(element));

                })


            } 
            if(ancho>850) {
                console.log('vista normal');
                while (containerGaleria.firstElementChild.hasChildNodes()) {
                    containerGaleria.firstElementChild.removeChild(containerGaleria.firstElementChild.firstChild);
                }
                containerGaleria.firstElementChild.textContent = '';
                document.querySelector('.epic-imagenes .container').classList.remove('d-block');

                rutas.forEach(element => {
                    containerGaleria.firstElementChild.appendChild(templateImgGaleria(element));

                })

            }
        })
    })
console.log(rutas);
// })


