const panelInicial = document.querySelector(".panel-de-botones-inicial");
const btnIniciar = document.querySelector("#btnIniciar");
const btnAgregar = document.querySelector("#btnAgregar");
const formAgregar = document.querySelector(".form-agregar");
const inputAgregar = document.querySelector("#input");
const btnGuardar = document.querySelector("#btnGuardar");
const btnCancelar = document.querySelector("#btnCancelar");
const juego = document.querySelector(".juego");
const btnNuevoJuego = document.querySelector("#btnNuevoJuego");
const btnDesistir = document.querySelector("#btnDesistir");
const innerDivLetras = document.querySelector(".display-letras-acertadas").innerHTML;
const innerDibujo = document.querySelector(".dibujo").innerHTML;
var palabras = ["HOLA", "ORACLE", "ALURA", "CODIGO", "JAVA", "HTML", "CSS", "PYTHON", "CLICK", "ERROR", "DEVTOOLS", "ELEMENTS", "SOURCES"];
var palabra = "";
var repetidos = [];
var letraPulsada = "";
var vecesPulsados = [];
var contador = 0;
var continuar = true;
const uperLowerCase = /[A-Z]/i;





btnIniciar.addEventListener("click", event => {
    event.preventDefault();
    iniciandoJuego();
    panelInicial.style.display = "none";
    juego.style.display = "flex";
});


btnAgregar.addEventListener("click", event => {
    event.preventDefault();
    inputAgregar.value = "";
    panelInicial.style.display = "none";
    formAgregar.style.display = "flex";  

});

btnGuardar.addEventListener("click", event => {
    event.preventDefault();
    if (agregarPalabra(palabras, inputAgregar.value)) {
        let resultado = confirm('¿Deseas agregar otra palabra?');
        if (!resultado) {            
            iniciandoJuego();
            formAgregar.style.display = "none";
            juego.style.display = "flex";
        } 
    }
});

btnCancelar.addEventListener("click", event => {
    event.preventDefault();
    formAgregar.style.display = "none";
    panelInicial.style.display = "flex";    
});


btnNuevoJuego.addEventListener("click", event => {
    event.preventDefault();
    juego.style.display = "none";
    panelInicial.style.display = "flex";    
});


btnDesistir.addEventListener("click", event => {
    event.preventDefault();    
    contador = 9;
    showMissinLetters();

});


inputAgregar.addEventListener("keypress", function (event) {
    var char = String.fromCharCode(event.keyCode);
    var charNopermitido = validarEntrada(char);    
    if (charNopermitido) {
        event.preventDefault();
        alert("Sólo letras Mayúculas");

    }

});



window.addEventListener("keypress", function (event) {
    var char = String.fromCharCode(event.keyCode);
    if (juego.style.display == "flex") {
        if (continuar) {
            if (contador < 9) {
                if (uperLowerCase.test(char)) {
                    letraPulsada = char.toUpperCase();  //letra pulsada es global scope
                    jugar();
                }
                else {
                    alert("Sólo Letras");
                }
            }
            else {
                alert("El juego terminó. Agotó sus oportunidades");
            }
        }
        else {
            alert("El juego terminó. Ganaste");
        }
    }
});

