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


//Api
const divEpic = document.querySelector('#epic');
const neoFeed = async () => {

    try {
        let data = await fetch("https://epic.gsfc.nasa.gov/api/natural?api_key=Ah62SEfDVY3K4OiuUs4ZI33Honwahn3xtef48Ncm");
        return data;

    } catch (error) {
        console.log(error);
    }

}

neoFeed()
    .then(response => {
        // console.log(response);
        return response.ok ? response.json() : Promise.reject(response);
    })
    .then(json => {
        console.log(json)
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