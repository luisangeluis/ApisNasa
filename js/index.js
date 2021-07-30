const miImagen = document.querySelector('#mi-imagen');


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
        // console.log(json.url);
        miImagen.src = json.url

    })
    .catch(err => {
        console.log(` ERROR: ${err.status}`);
    })


//Api fotos rover de marte

const divPhotosRover = document.querySelector('#photos-rover');
const neoFeed = async () => {

    try {
        let data = await fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=Ah62SEfDVY3K4OiuUs4ZI33Honwahn3xtef48Ncm");
        return data;

    } catch (error) {
        console.log(error);
    }

}
neoFeed()
    .then(response => {
        //  console.log(response);
        return response.ok ? response.json() : Promise.reject(response);
    })
    .then(json => {
        // console.log(json)

        const fragmentPhotosRover = document.createDocumentFragment();

        json.photos.forEach(element => {
            const img = document.createElement('img');
            const div = document.createElement('div');

            img.setAttribute('class','rovert-img');
            img.src= element.img_src;
            div.appendChild(img);
            fragmentPhotosRover.appendChild(div);
            console.log(element);
        });
        divPhotosRover.appendChild(fragmentPhotosRover);

        // const fragment = document.createDocumentFragment();

        // // json.forEach(element => {
        // //     const img = document.createElement('img');
        // //     let i = 0;

            

        // //     i++;

        // // });

        // for(let i =0; i<json.length; i++){
        //     const img = document.createElement('img');
        //     img.src = json[i].image+'.png';
        //     fragment.appendChild(img);

        // }

        // divEpic.appendChild(fragment);

    })
    .catch(error=>console.log(`ERROR ${error}`))