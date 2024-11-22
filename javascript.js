const amountOfChars = 16;
const reglasCodificacion = {
    nrz: "NRZ: Señal distinta de 0 cuando hay un 1; de lo contrario 0.",
    nrzi: "NRZ-I: Inversión en el nivel de la señal cuando hay un 1; sin cambios con un 0.",
    rz: "RZ: Señal regresa a cero a la mitad de cada intervalo de bit; -1 para el bit 0; 1 para el bit 1.",
    mchr: "Manchester: Transición en el medio del intervalo, de bajo a alto para 1 y de alto a bajo para 0.",
    mchd: "Manchester Diferencial: Transición en el medio del intervalo, de bajo a alto para 0 con inversion para 1.",
    ami: "AMI: Pulsos alternan entre positivo y negativo para los 1, los 0 no tienen pulso.",
    b8zs: "B8ZS: Sustituye 8 ceros consecutivos por una secuencia (000+-0-+) o (000-+0+-) de pulsos para mantener sincronización.",
    hdb3: "HDB3: Sustituye 4 ceros consecutivos por una secuencia (000V) o (B00V) que mantiene la polaridad alternante."
};
let codSelected = 1;

const numberOfParity = (value) => {
    let count = 0;
    for (let i = 0; i < value.length; i++) {
      if(value.charAt(i) === '1'){
        count++;
      }
    }
    return count%2;
}

const getInputText = () =>{
    inputText = document.getElementById("message").value;
    document.getElementById("ASCIIText").innerHTML = '';
    document.getElementById("BinaryText").innerHTML = '';

    document.getElementById("ASCIIText").innerHTML = ''+inputText.split('')
                                                                    .map(char => char.charCodeAt(0))
                                                                    .join(' ');
    document.getElementById("BinaryText").innerHTML = ''+inputText.split('')
                                                                    .map(char => {
                                                                        const ascii = char.charCodeAt(0)
                                                                        return ascii.toString(2).padStart(8, '0')+numberOfParity(ascii.toString(2).padStart(8, '0'));})
                                                                    .join('');
    
}

const loadBinaryInput = () => {
    let binaryInput = document.getElementById("binarin").value;

    // Eliminar cualquier carácter que no sea 0 o 1
    binaryInput = binaryInput.replace(/[^01]/g, '');

    // Verificar la longitud permitida
    if (binaryInput.length > amountOfChars) {
        alert(`Por favor, ingrese hasta ${amountOfChars} valores binarios.`);
        binaryInput = binaryInput.slice(0, amountOfChars);
    }

    // Actualizar el campo de texto con el valor corregido
    document.getElementById("binarin").value = binaryInput;

    // Mostrar el valor actualizado
    document.getElementById("BinaryText").innerHTML = binaryInput;
}

const loadLevelInput = () => {
    if(Number(document.getElementById("level").value) < 1){
        alert("Por favor ingrese un nivel de voltaje mayor a 0");
        document.getElementById("level").value = 1;
    }
}

function clearCod(){
    document.getElementById("codificadas").innerHTML = '';
    document.getElementById("codnrz").innerHTML = '';
    document.getElementById("BinaryText").getHTML() !== "" ? 0 : alert("Por favor ingrese un mensaje a codificar");
    codSelected = document.getElementById("codtypes").value;
}

// Función para mostrar el tooltip
function mostrarTooltip(event) {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.visibility = "visible";
    tooltip.style.opacity = "1";
    if (event === "nrz") {
        tooltip.innerText = reglasCodificacion[event];
    }else{
        tooltip.innerText = reglasCodificacion[codSelected];
    }
}

// Función para mover el tooltip con el cursor
function moverTooltip(event) {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.top = event.pageY + 15 + "px";
    tooltip.style.left = event.pageX + 15 + "px";
}

// Función para ocultar el tooltip
function ocultarTooltip() {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";
}