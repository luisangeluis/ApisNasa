const cardImgDay = document.querySelector('#card_img-day');
const imgDayTitle = document.querySelectorAll('.img-day_title');
const imgDayInfo = document.querySelector('.img-day_info');
//Api imagen del dia
async function apiRequest() {

    try {
        let respuesta = await fetch("https://api.nasa.gov/planetary/apod?api_key=Ah62SEfDVY3K4OiuUs4ZI33Honwahn3xtef48Ncm")
        return respuesta;

    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}

apiRequest()
    .then(response => {
        // console.log(response);
        return response.ok ? response.json() : Promise.reject(response);
    }).then(json => {
        console.log(json);
        if (json.media_type === 'image') {
            const fragment = document.createDocumentFragment();
            const img = document.createElement('img');

            img.src = json.url;
            img.setAttribute('class', 'img-fluid');
            fragment.appendChild(img);
            cardImgDay.prepend(fragment);
            imgDayTitle.forEach(element => {
                element.textContent = json.title
            });
            imgDayInfo.textContent = json.explanation;
        } else {
            // const jumbotron = document.querySelector('.jumbotron');
            // cardImgDay.textContent = 'Es otro formato';
            // console.log(json);
            // let template = templateVideo.content.cloneNode(true);
            // let iframeVideo = template.querySelector('iframe');

            const iframe = document.createElement('iframe');
            iframe.src = json.url;


            // cardImgDay.appendChild(template);
            cardImgDay.appendChild(iframe);


        }


    })
    .catch(err => {
        console.log(` ERROR: ${err}`);
    })

//Ventana Modal
const btnModalImgDay = document.querySelector('.btn-modal_day-img');

btnModalImgDay.addEventListener('click', () => {
    apiRequest()
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(json => {
            let dayImg = document.querySelector('#modal-img_day');
            dayImg.src = json.url;
            dayImg.setAttribute('class', 'img-fluid');
        })
});


//Api epic fotos de la tierra
const epicImagenes = document.querySelector('.epic-imagenes');
const apiEpic = async () => {
    try {
        let data = await fetch('https://api.nasa.gov/EPIC/api/natural/images?api_key=Ah62SEfDVY3K4OiuUs4ZI33Honwahn3xtef48Ncm');

        return data;
    } catch (error) {
        console.log(`miError ${error}`);
    }

}

apiEpic()
    .then(res => {
        // console.log(res);
        return res.ok ? res.json() : Promise.reject(res);
    })
    .then(json => {
        // console.log(json);
        let fechaRuta = json[0].date;
        let expReg = /(\d{2,4}-?){3,3}/gi;
        let fechaFormato = fechaRuta.match(expReg)

        fechaFormato = fechaFormato[0].replace(/-/g, '/');
        // console.log(fechaFormato);

        const fragmentImgEpic = document.createDocumentFragment();

        json.forEach(element => {
            // console.log(typeof element.image)
            const img = document.createElement('img');
            img.setAttribute('class', 'img-fluid');
            img.src = `https://epic.gsfc.nasa.gov/archive/natural/${fechaFormato}/png/${element.image}.png`
            fragmentImgEpic.appendChild(img);
        });
        epicImagenes.appendChild(fragmentImgEpic);

    })

//Carousel con las fotos de la api de epic

const carousel = document.querySelectorAll('#carousel_tierra-imagenes');
let srcImg = [];

function makeCarousel  (src) {
    const carouselElement = `<div class="carousel-item active">
                                    <img src="${src}" class="d-block w-100" alt="...">
                            </div>`

    return carouselElement;
}

apiEpic()
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
        // console.log(json);

        addEventListener('resize', (e) => {
            let screenWidth = window.innerWidth;
            console.log(json);

            const carouselImg = document.querySelector(`#carousel_tierra-imagenes .carousel-inner`);

            if (window.innerWidth < 900) {
                console.log(carouselImg);
                const fragment = document.createDocumentFragment();

                let fechaRuta = json[0].date;
                let expReg = /(\d{2,4}-?){3,3}/gi;
                let fechaFormato = fechaRuta.match(expReg)

                fechaFormato = fechaFormato[0].replace(/-/g, '/');

                json.forEach(element => {
                    let imgSrc = `https://epic.gsfc.nasa.gov/archive/natural/${fechaFormato}/png/${element.image}.png`;
                    fragment.appendChild(makeCarousel(imgSrc));
                })

                carouselImg.appendChild(fragment);

            }


        })
    })

