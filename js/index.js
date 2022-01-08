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

//Ventana Modal
// const btnModalImgDay = document.querySelector('.btn-modal_day-img');

// btnModalImgDay.addEventListener('click', () => {
//     apiRequest()
//         .then(response => response.ok ? response.json() : Promise.reject(response))
//         .then(json => {
//             let dayImg = document.querySelector('#modal-img_day');
//             dayImg.src = json.url;
//             dayImg.setAttribute('class', 'img-fluid');
//         })
// });


//Api epic fotos de la tierra
const epicImagenes = document.querySelector('.epic-imagenes .container');
const apiEpic = async () => {

    let data = await fetch('https://api.nasa.gov/EPIC/api/natural/images?api_key=Ah62SEfDVY3K4OiuUs4ZI33Honwahn3xtef48Ncm');

    if (!data)
        throw new Error('hay un error')
    else
        return data.json();

}

// apiEpic()
//     .then(res => {
//         // console.log(res);
//         return res.ok ? res.json() : Promise.reject(res);
//     })
//     .then(json => {
//         // console.log(json);
//         let fechaRuta = json[0].date;
//         let expReg = /(\d{2,4}-?){3,3}/gi;
//         let fechaFormato = fechaRuta.match(expReg)

//         fechaFormato = fechaFormato[0].replace(/-/g, '/');
//         // console.log(fechaFormato);
// })

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
//USO DE JQUERY
$(document).ready(function () {
    let ancho = anchoVentana();
    console.log(ancho);
    const containerGaleria = document.querySelector('.epic-imagenes');

    getInfo()
        .then(json => {
            console.log(json);

            let fechaRuta = json[0].date;
            let expReg = /(\d{2,4}-?){3,3}/gi;
            let fechaFormato = fechaRuta.match(expReg)

            let rutaImg ='';

            fechaFormato = fechaFormato[0].replace(/-/g, '/');
            // console.log(fechaFormato);

            

            if (ancho <= 850) {
                console.log('carousel');
                containerGaleria.firstElementChild.innerHTML ='';

            } else {
                console.log('vista normal');

                json.forEach(element=>{
                    rutaImg = `https://epic.gsfc.nasa.gov/archive/natural/${fechaFormato}/png/${element.image}.png`;

                    containerGaleria.firstElementChild.appendChild(templateImgGaleria(rutaImg)); 
                })
                // containerGaleria.firstElementChild.appendChild(templateImgGaleria('hola'));

                templateImgGaleria('ruta');
            }

            //EVENTO PARA EL TAMAÑO DE LA VENTANA 
            addEventListener('resize', () => {
                ancho = anchoVentana();
                console.log(ancho);
                if (ancho <= 850) {
                    console.log('carousel');
                    containerGaleria.firstElementChild.innerHTML ='';


                } else {
                    console.log('vista normal');

                    templateImgGaleria('ruta');
                }
            })
        })
})

//Carousel con las fotos de la api de epic fotos de la tierra

// const carousel = document.querySelectorAll('#carousel_tierra-imagenes');
// let srcImg = [];

// const makeCarousel = (src)=> {
//     const carouselElement = `<div class="carousel-item ">
//                                     <img src="${src}" class="d-block w-100" alt="...">
//                             </div>`

//     return carouselElement;
// }

// apiEpic()
//     .then(res => res.ok ? res.json() : Promise.reject(res))
//     .then(json => {
//         let fechaRuta = json[0].date;
//         let expReg = /(\d{2,4}-?){3,3}/gi;
//         let fechaFormato = fechaRuta.match(expReg)

//         fechaFormato = fechaFormato[0].replace(/-/g, '/');
//         // console.log(fechaFormato);
//         const carouselFragment = document.createDocumentFragment();

//         json.forEach(element=>{
//             console.log(element);
//             const divImg = document.createElement('div');
//             const img = document.createElement('img');
//             divImg.classList.add('carousel-item');
//             img.classList.add('d-block','w-75','mx-auto');
//             img.src = `https://epic.gsfc.nasa.gov/archive/natural/${fechaFormato}/png/${element.image}.png`;
//             divImg.appendChild(img);
//             carouselFragment.appendChild(divImg);
//         })

//         document.querySelector('.carousel-inner').appendChild(carouselFragment);
//         document.querySelector('.carousel-inner').firstElementChild.classList.add('active');

//     })



//Evento rezise en ventana
// const anchoVentana = document.documentElement.clientWidth;
// if (anchoVentana <= 600) {
//     console.log('hola');
// }

// addEventListener('resize', () => {
//     const anchoVentana = document.documentElement.clientWidth;
//     // console.log(anchoVentana);

//     getData('https://api.nasa.gov/planetary/apod?api_key=Ah62SEfDVY3K4OiuUs4ZI33Honwahn3xtef48Ncm')
//         .then(res => res.ok ? res.json() : Promise.reject(res) )
//         .then( json => console.log(json) )
//         .catch(error=>{
//             console.log(error);
//         })

// })

// const getData = async (pUrl) => {

//     let res = await fetch(pUrl);
//     return res;
// }
