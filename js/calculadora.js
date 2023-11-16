window.onload = function () {
    let doc = document.getElementsByClassName("boton");
    document.addEventListener("keydown", poner);
    for (let e of doc) {
        e.addEventListener("mousedown", sombra);
        e.addEventListener("mouseup", sombra);
        e.addEventListener("click", poner);
    }
}
function sombra() {
    this.classList.toggle("sombra");
}
function poner(e) {
    let valor;
    let pantalla = document.querySelector(".pantalla input");
    let numeros = "0123456789";
    if (e.type == "keydown") {
        valor = e.key;
    } else {
        valor = this.innerText;
    }
    switch (valor) {
        case "C":
        case "«":
        case "Backspace":
            quitar(valor);
            break;
        case "+":
        case "-":
        case "x":
        case "*":
        case "/":
        case "%":
        case "()":
        case ")":
        case "=":
        case "Enter":
            op(valor);
            break;
        case ".":
            punto(valor);
            break;
        default:
            if (numeros.includes(valor)) {
                if (pantalla.value == 0) {
                    pantalla.value = valor;
                } else {
                    pantalla.value += valor;
                }
                break;
            }
    }
}
let boolean = true;
function punto(valor) {
    let pantalla = document.querySelector(".pantalla input");
    if (boolean && !isNaN(pantalla.value[pantalla.value.length - 1])) {
        pantalla.value += valor;
        boolean = false;
    }
}
function op(valor) {
    boolean = true;
    let pantalla = document.querySelector(".pantalla input");
    if (valor == "=" || valor == "Enter") {
        if (pantalla.value.includes("%")) {
            let resul = pantalla.value.split("%");
            pantalla.value = (resul[0] * resul[1]) / 100;
            if (pantalla.value.includes(".")) {
                boolean = false;
            }
        }
        if (pantalla.value.includes("x")) {
            let resul = pantalla.value.split("x");
            pantalla.value = resul[0] * resul[1];
            if (pantalla.value.includes(".")) {
                boolean = false;
            }
        } else {
            pantalla.value = eval(pantalla.value);
            if (pantalla.value.includes(".")) {
                boolean = false;
            }
        }
    }
    else if (valor == "()" && pantalla.value.length > 0 || valor == ")" && pantalla.value.length > 0) {
        if (!isNaN(pantalla.value[pantalla.value.length - 1]) || pantalla.value[pantalla.value.length - 1] == ")") {
            pantalla.value = "(" + pantalla.value + ")";
        }
    }
    else {
        if (!isNaN(pantalla.value[pantalla.value.length - 1]) && pantalla.value.length > 0 || pantalla.value[pantalla.value.length - 1] == ")" && pantalla.value.length > 0) {
            pantalla.value += valor;
        }
    }
}
function quitar(valor) {
    let pantalla = document.querySelector(".pantalla input");
    if (pantalla.value[pantalla.value.length - 1] == ".") {
        boolean = true;
    }
    let operandos = ["+", "-", "x", "/", "%", ")"];
    let resul = [pantalla.value];
    for (let index = 0; index < operandos.length; index++) {
        let temp = [];
        for (let i = 0; i < resul.length; i++) {
            let subResult = resul[i].split(operandos[index]); //Con esto hago un split del array cuando salga algun operando en el array.
            temp = temp.concat(subResult);
        }
        resul = temp;
    }
    if (operandos.includes(pantalla.value[pantalla.value.length - 1])) {
        if (resul[resul.length - 2].includes(".")) {
            boolean = false;
        }
    }
    if (valor == "C") {
        pantalla.value = 0;
        boolean = true;
    }
    if (valor == "«" || valor == "Backspace") {
        if (pantalla.value.length == 1) {
            pantalla.value = 0;
        }
        else if (pantalla.value[pantalla.value.length - 1] == ")" && pantalla.value[0] == "(") {
            pantalla.value = pantalla.value.substring(1, pantalla.value.length - 1);
            if (pantalla.value == "") {
                pantalla.value = "0";
            }
        }
        else if (pantalla.value[pantalla.value.length - 1] == ")" && pantalla.value[0] != "(") {
            pantalla.value = pantalla.value.substring(0, pantalla.value.length - 1);
        }
        else {
            pantalla.value = pantalla.value.substring(0, pantalla.value.length - 1);
        }
    }
}