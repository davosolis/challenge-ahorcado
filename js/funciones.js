

function validarEntrada(cadena) {
    const noPermitido = /[^A-Z]/g;
    return noPermitido.test(cadena);
    /*return noPermitido.exec(cadena);*/
}


function agregarPalabra(array, palabraStr) {
    if (inputAgregar.value.length >= 4 && inputAgregar.value.length <= 8) {
        if (!(validarEntrada(inputAgregar.value))) {
            for (let i = 0; i < array.length; i++) {//acá se validará si la palabra introducida ya existe en el arreglo para evitar duplicación
                const palabra = array[i];
                if (palabra == palabraStr) {
                    alert("La palabra ya existe en la lista");
                    return false;
                }
            }
            array.push(palabraStr);
            repetidos.push(false);
            return true;
        }
        else { alert("Sólo letras Mayúculas, sin caracteres especiales, ni espacios, ni números"); return false; } //para copy paste  
    }
    else { alert("Escriba una palabra con un minimo de 4 letras y un máximo de 8"); return false; }

}

function selecPalabraRandom(lista) {   
    let disponibles = false;
    var num;
    for (let i = 0; i < lista.length; i++) { // comprueba que almenos uno no esté repetido
        if (!repetidos[i]) {// repetidos inicializa con false
            disponibles = true;//  hay almenos uno no repetido
            break;
        }
    }  // el for es para evitar un while infinito
    if (disponibles) {
        do {
            num = Math.floor(Math.random() * lista.length); // RETORNA UN ENTERO ALEATORIO entre 0 y un numero icluidos ambos
        } while (repetidos[num]);
    } 
    else {// en este punto ya todas las palabras fueron seleccionadas       
        for (let i = 0; i < palabras.length; i++) {//inicializo de nuevo repetidos
            repetidos[i] = false;
        }
        num = Math.floor(Math.random() * lista.length);        
    }    
    repetidos[num] = true; //console.log(repetidos);
    return lista[num];
}

function dibujarLetraCorrecta(i, letraDePalabra) {
    var spans = document.querySelectorAll(".letra-correcta"); //y si la letra está en la palabra se dibuja en su posicion o posiciones 
    spans[i].textContent = letraDePalabra;
}

function dibujarLetraIncorrecta(letraPulsada) {
    const divFallidas = document.querySelector(".display-letras-fallidas");
    var crearSpan = true;
    if (divFallidas.innerHTML != "") {
        var spanFallidas = document.querySelectorAll(".letra-incorrecta");
        for (let i = 0; i < spanFallidas.length; i++) {
            const span = spanFallidas[i];
            var spanSplited = span.textContent.split('(');
            var soloLetra = spanSplited[0];
            if (letraPulsada == soloLetra) {
                vecesPulsados[i]++; //Antes de imprimirlo porque solo suma cuando se termina(ejecuta y salta) la linea 
                span.textContent = `${letraPulsada}(x${vecesPulsados[i]})`; // si pongo aca:---> vecesPulsados[i]++ no me imprime el valor de la suma sino la anterior ya que solo suma cuando termina la linea de comando y salta
                crearSpan = false;
                break;
            }
        }
    }

    if (crearSpan) {
        var spanFallida = document.createElement("span");
        spanFallida.classList.add("letra-incorrecta");
        spanFallida.textContent = `${letraPulsada}`;
        divFallidas.appendChild(spanFallida);
        vecesPulsados.push(1);
        contador++;        
    }

}

function dibujarImagen(index) {
    const imagenes = document.querySelectorAll(".juego-imagen");
    for (let i = 0; i < imagenes.length; i++) {
        const imagen = imagenes[i];
        if (index == i) {
            imagen.classList.add("visible-initial");
        }
        else {
            imagen.classList.remove("visible-initial");
        }
    }

}

function showMissinLetters() {
    const arrayLtCorrecta = document.querySelectorAll(".letra-correcta");
    for (let i = 0; i < palabra.length; i++) {
        const ltCorrecta = arrayLtCorrecta[i];
        if (ltCorrecta.textContent == "") {
            ltCorrecta.textContent = palabra[i];
            ltCorrecta.classList.add("missin-letter");
        }
    }
}

function esJuegoGanado() {
    const arrayLtCorrecta = document.querySelectorAll(".letra-correcta");
    var vacio = false;
    for (let i = 0; i < palabra.length; i++) {
        const ltCorrecta = arrayLtCorrecta[i];
        if (ltCorrecta.textContent == "") {
            vacio = true;
            break;
        }
    }
    return !vacio;
}

function iniciandoRepetidos() {
    if (repetidos.length == 0) {
        for (let i = 0; i < palabras.length; i++) {
            repetidos.push(false);
        }
    }

}

function iniciandoJuego() {
    iniciandoRepetidos();
    palabra = selecPalabraRandom(palabras); //Antes de iniciar primero se escoge una palabra de forma aleatoria    
    var divLetras = document.querySelector(".display-letras-acertadas");// se resetea el textContent de los spans 
    divLetras.innerHTML = innerDivLetras; //y la clase visible de los arrayInput a su estado inicial
    const divFallidas = document.querySelector(".display-letras-fallidas");//gracias al innerHTML
    divFallidas.innerHTML = "";
    var arrayInputs = document.querySelectorAll(".arrayInput");// y se resetea los arrayInputs
    for (let i = 0; i < palabra.length; i++) {
        const arrayInput = arrayInputs[i];
        arrayInput.classList.add("visible");//y se dibuja un numero de arrayInputs = length de la palabra 
    }
    vecesPulsados = []; //se resetea el array que contiene el número de veces se preciona una letra errada
    contador = 0; //se resetea el contador    
    continuar = true;
    document.querySelector(".dibujo").innerHTML = innerDibujo;//se resete el divDibujo a su estado inicial
    dibujarImagen(0);//y se le da display solo a la primera imagen 
    btnDesistir.textContent = "Desistir";
}

function jugar() {
    var vecesDibujado = 0;
    for (let i = 0; i < palabra.length; i++) {
        const letraDePalabra = palabra[i];
        if (letraPulsada == letraDePalabra) {     //se compara letra pulsada con letra de la palabra escogida      
            dibujarLetraCorrecta(i, letraDePalabra); //dibuja la letra correcta
            vecesDibujado++;
        }
    }
    if (vecesDibujado == 0) {//si la letra es incorrecta se dibuja en el display de Errores
        dibujarLetraIncorrecta(letraPulsada);
        dibujarImagen(contador);
    }

    if (esJuegoGanado()) { //debugger;
        dibujarImagen(10);
        continuar = false;
    } else if (contador == 9) {
        btnDesistir.textContent = "Mostrar Palabra";
    }

}
