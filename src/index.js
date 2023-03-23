import validator from "./validator.js";

const selectMes = document.querySelector('#selectMes');
const selectYear = document.querySelector('#selectYear');
const inputNumeroTarjeta = document.querySelector('#inputNumeroTarjeta');
const mostrarNumeroTarjeta = document.querySelector('#numero');
const logoVisa = document.querySelector('#logoMarca');
const inputNombreTarjeta = document.querySelector('#inputNombreTarjeta');
const mostrarNombreTarjeta = document.querySelector('#nombre');
const mes = document.querySelector('.mes');
const year = document.querySelector('.year');
const inputCVV = document.querySelector('#inputCVV');
const cvv = document.querySelector('#ccv');
const btnPagar = document.querySelector("#btnPagar");
const alertIsValid = document.querySelector("#alertIsValid");
let maskNumber = ""
let numeroDeTarjetaPuro=""
const mensajeFinal = document.querySelector('#mensajeFinal');


// select del mes generado dinamicamente //
for (let i = 1; i <= 12; i++) {
  const opcion = document.createElement('option');
  opcion.innerText = i;
  selectMes.appendChild(opcion);
}

// select del año generado automaticamente //
const yearActual = new Date().getFullYear();
for (let i = yearActual; i <= yearActual +8; i++) {
  const opcion = document.createElement('option');
  opcion.innerText = i;
  selectYear.appendChild(opcion);
}

// input numero de tarjeta //
inputNumeroTarjeta.addEventListener('keyup', (e) => {
  const digitoTarget = e.target.value;
    
  inputNumeroTarjeta.value = digitoTarget
  // eliminamos espacios en blanco
    .replace(/\s/g, '')
    // eliminar las letras
    .replace(/\D/g, '')
    // ponemos espacio cada 4 numeros
    .replace(/([0-9]{4})/g, '$1 ') 
    // elimina el ultimo espaciado
    .trimEnd()

 

  numeroDeTarjetaPuro =inputNumeroTarjeta.value.replace(/\s/g, '')   //213213213213"7666"
  
  //dejando la alerta de validacion de numero de tarjeta en blanco si no se completan lo 
  if(numeroDeTarjetaPuro.length<16) {
    alertIsValid.innerText=("")
  }
  //Enmascarando los numeros usando el metodo validator.maskify(creditCardNumber)
  maskNumber = validator.maskify(numeroDeTarjetaPuro) //############7666  
  mostrarNumeroTarjeta.textContent =maskNumber.replace(/([^0-9]{4})/g, '$1 ') // #### #### #### 1234 
  
  //cambio de logo-marca 
  if (digitoTarget === '') {
    logoVisa.innerHTML = '';      
  }
  if (digitoTarget[0] == 4) {
    const imagen = document.createElement('img');
    imagen.src = './assets/visa.png';
    logoVisa.appendChild(imagen);
  } else if (digitoTarget[0] == 5) {
    const imagen = document.createElement('img');
    imagen.src = './assets/mastercard.png';
    logoVisa.appendChild(imagen);
  }
});

// input nombre de tarjeta
inputNombreTarjeta.addEventListener('keyup', (letrita) => {
  const valorInputNombre = letrita.target.value;

  inputNombreTarjeta.value = valorInputNombre.replace(/[0-9]/g, '');
  mostrarNombreTarjeta.textContent = valorInputNombre;

  // mostrar el -- al eliminar el nombre
  if (valorInputNombre === '') {
    mostrarNombreTarjeta.textContent = '------------';
  }
});

// seleccionar mes de expiración
selectMes.addEventListener('change', (e) => {
  mes.textContent = e.target.value;
});

// seleccionar año de expiración
selectYear.addEventListener('change', (e) => {
  year.textContent = e.target.value.slice(2);
});

// CVV
inputCVV.addEventListener('keyup', () =>{
  inputCVV.value = inputCVV.value
    // eliminamos espacios en blanco
    .replace(/\s/g, '')
    // eliminar las letras
    .replace(/\D/g, '');

  //mostramos digitos del cvv en la tarjeta 
  cvv.textContent = inputCVV.value;
});

// Validando el número de la tarjeta 
btnPagar.addEventListener('click', (event) => {

  const numberIsValid = validator.isValid(numeroDeTarjetaPuro)

  if(numberIsValid===true && numeroDeTarjetaPuro.length > 0) {
    alertIsValid.innerText=("La tarjeta es válida.")
    mensajeFinal.innerText = ('Gracias por tu compra!');

  }else {
    alertIsValid.innerText=("La tarjeta no es válida. Ingrese correctamente")
  }

  event.preventDefault();
    
});
