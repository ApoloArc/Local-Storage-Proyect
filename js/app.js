//Variables

const formulario = document.getElementById('formulario');
const listaTweets = document.getElementById('lista-tweets');
let tweets = [];

//Listeners
eventListeners();
function eventListeners() {
    //Agrega los tweets insertados
    formulario.addEventListener('submit', agregarTweet);

    //Guarda los tweets en Storage
    document.addEventListener('DOMContentLoaded', ()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        agregarHTML();
    })
}


//Funciones

function agregarTweet(e) {
    e.preventDefault();

    const tweet = document.getElementById('tweet').value;


    if (tweet === '') {
        
        mostrarError('No puede enviar un mensaje vacío');
        return;
    }


    const tweetObj = {
        id : Date.now(),
        tweet,
    }
    
    //Agregar el arreglo a una nueva lista de arrays
    tweets = [...tweets, tweetObj];

    //Una vez agregado, sumarlo al HTML

    agregarHTML();

    //Resetear el formulario

    formulario.reset();

}

function mostrarError(error) {
    
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    console.log(mensajeError);
    const contenido = document.getElementById('contenido');

    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);

}

function agregarHTML() {
    limpiarHTML();
    if(tweets.length > 0) {
        tweets.forEach( tweet => {
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'x';
            
            //Funcion de eliminar

            btnEliminar.onclick= ()=>{
                borrarTweet(tweet.id);
            }

            const li = document.createElement('li');
            li.textContent = tweet.tweet;
            listaTweets.appendChild(li);
            li.appendChild(btnEliminar);
        })
    }
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
function borrarTweet(id) {
    
    tweets = tweets.filter(tweet => tweet.id !== id);
    agregarHTML();

}
function limpiarHTML() {
    
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }

}

