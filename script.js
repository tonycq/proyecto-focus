const html = document.querySelector('html')
const botonEnfoque = document.querySelector('.app__card-button--enfoque')
const botonCorto = document.querySelector('.app__card-button--corto')
const botonLargo = document.querySelector('.app__card-button--largo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botones = document.querySelectorAll('.app__card-button')
const botonIniciarPausar = document.querySelector('#start-pause')
const inputEnfoqueMusica = document.querySelector('#alternar-musica')
const textoIniciarPausar = document.querySelector('#start-pause span')
const tiempoEnPantalla = document.querySelector('#timer')
const iconoIniciarPausar = document.querySelector(".app__card-primary-butto-icon");

const musica = new Audio('./sonidos/luna-rise-part-one.mp3')
const audioplay = new Audio('./sonidos/play.wav')
const audioPausa = new Audio('./sonidos/pause.mp3')
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3')

let tiempoTranscurridoEnSegundos = 1500;
let intervaloId = null;

musica.loop = true;




inputEnfoqueMusica.addEventListener('change',()=>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
});

// Event Listener para los botones de enfoque, descanso corto y largo

botonEnfoque.addEventListener('click',()=>{
    tiempoTranscurridoEnSegundos = 1500;
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active')
});

botonCorto.addEventListener('click',()=>{
    tiempoTranscurridoEnSegundos = 300;
    cambiarContexto('descanso-corto')
    botonCorto.classList.add('active')
});

botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900;
    cambiarContexto('descanso-largo')
    botonLargo.classList.add('active')
});

function cambiarContexto(contexto){
    mostrarTiempo()
    botones.forEach(function(contexto){
    contexto.classList.remove('active')
    });
    html.setAttribute('data-contexto',contexto);
    banner.setAttribute('src',`./imagenes/${contexto}.png`);
    switch(contexto){
        case "enfoque":
            titulo.innerHTML = `
            Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong> 
            `;
            break;
        case  "descanso-corto":
            titulo.innerHTML = `
            ¿Qué tal tomar un respiro? <strong class="app__title-strong">¡Haz una pausa corta!</strong> 
            `;
            break;
        case "descanso-largo":
            titulo.innerHTML = `
            Hora de volver a la superficie<strong class="app__title-strong">Haz una pausa larga.</strong> 
            `;
            break;
        default:
            break;           
    }
};


// Función de cuenta regresiva

const cuentaRegresiva = ()=>{
    if(tiempoTranscurridoEnSegundos <= 0){
        audioTiempoFinalizado.play()
        alert ('¡Tiempo final!')
        reiniciar()
        return;
    }
    textoIniciarPausar.textContent = "Pausar"
    tiempoTranscurridoEnSegundos -= 1
    mostrarTiempo()
   
};

// Inicializar el temporizador

botonIniciarPausar.addEventListener('click', iniciarPausar)

// Función para iniciar o pausar el temporizador

function iniciarPausar(){
    if(intervaloId){
        audioPausa.play();
        reiniciar()
        return
    }
    audioplay.play();
    intervaloId= setInterval(cuentaRegresiva,1000)
    textoIniciarPausar.textContent = "Pausar";
    iconoIniciarPausar.setAttribute('src', `/imagenes/pause.png`);

};


// Función para reiniciar el temporizador

function reiniciar(){
    clearInterval(intervaloId)
    textoIniciarPausar.textContent = "Comenzar"
    iconoIniciarPausar.setAttribute('src', `/imagenes/play_arrow.png`);
    intervaloId = null


}
// Función para mostrar el tiempo en pantalla
function mostrarTiempo(){
    const tiempo = new Date(tiempoTranscurridoEnSegundos *1000 )
    const tiempoFormateado = tiempo.toLocaleTimeString('es-CL',{minute:'2-digit',second:'2-digit'})
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}

mostrarTiempo()