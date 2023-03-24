import validator from "./validator.js";

const inputNombreTarjeta = document.querySelector('#inputNombreTarjeta');
const mostrarNombreTarjeta = document.querySelector('#nombre');

const inputNumeroTarjeta = document.querySelector('#inputNumeroTarjeta');
let numeroDeTarjetaPuro=""
const alertIsValid = document.querySelector("#alertIsValid");
let maskNumber = ""
const mostrarNumeroTarjeta = document.querySelector('#numero');

const logoMarca = document.querySelector('#logoMarca');

const selectMes = document.querySelector('#selectMes');
const selectYear = document.querySelector('#selectYear');
const mes = document.querySelector('.mes');
const year = document.querySelector('.year');

const inputCVV = document.querySelector('#inputCVV');
const cvv = document.querySelector('#ccv');

const btnPagar = document.querySelector("#btnPagar");



const mensajeFinal = document.querySelector('#mensajeFinal');

// --------------------------- INPUT NOMBRE DE TARJETA ----------------------------------
inputNombreTarjeta.addEventListener('keyup', (letrita) => {
  const valorInputNombre = letrita.target.value;

  inputNombreTarjeta.value = valorInputNombre.replace(/[0-9]/g, '');
  mostrarNombreTarjeta.textContent = valorInputNombre;

  // -------- MOSTRAR LOS ---- EN LA TARJETA AL ELIMINAR EL NOMBRE DEL INPUT ------
  if (valorInputNombre === '') {
    mostrarNombreTarjeta.textContent = '------------';
  }
});


// ------------------------------------- INPUT NÚMERO DE TARJETA -------------------------------------
inputNumeroTarjeta.addEventListener('keyup', (e) => {
  const digitoTarget = e.target.value;
    
  inputNumeroTarjeta.value = digitoTarget
  // ------------- ELIMINAMOS ESPACIOS EN BLANCO ----------------
    .replace(/\s/g, '')
  // ------------- ELIMINAR LAS LETRAS --------------------------
    .replace(/\D/g, '')
  // ------------- PONEMOS ESPACIO CADA 4 NÚMEROS ---------------
    .replace(/([0-9]{4})/g, '$1 ') 
  // ------------- ELIMINA EL ÚLTIMO ESPACIO --------------------
    .trimEnd()

  numeroDeTarjetaPuro =inputNumeroTarjeta.value.replace(/\s/g, '')   //213213213213"7666"
  
  //dejando la alerta de validacion de numero de tarjeta en blanco si no se completan lo 
  if(numeroDeTarjetaPuro.length<16) {
    alertIsValid.innerText=("")
  }
  // -------- ENMASCARANDO LOS NÚMEROS USANDO EL MÉTODO validator.maskify(creditCardNumber) -----------
  maskNumber = validator.maskify(numeroDeTarjetaPuro) //############7666  
  mostrarNumeroTarjeta.textContent =maskNumber.replace(/([^0-9]{4})/g, '$1 ') // #### #### #### 1234 
  
  // --------------------------- CAMBIO DE LOGO VISA O MASTERCARD -------------------------------------
  if (digitoTarget === '') {
    logoMarca.innerHTML = '';      
  }
  if (digitoTarget[0] == 4) {
    const imagen = document.createElement('img');
    imagen.src = './assets/visa.png';
    logoMarca.appendChild(imagen);
  } else if (digitoTarget[0] == 5) {
    const imagen = document.createElement('img');
    imagen.src = './assets/mastercard.png';
    logoMarca.appendChild(imagen);
  }
});


// ----------------------------- SELECTBOX MES GENERADO DINAMICAMENTE --------------------- 
for (let i = 1; i <= 12; i++) {
  const opcion = document.createElement('option');
  opcion.innerText = i;
  selectMes.appendChild(opcion);
}

// ----------------------------- SELECTBOX AÑO GENERADO DINAMICAMENTE --------------------- 
const yearActual = new Date().getFullYear();
for (let i = yearActual; i <= yearActual +8; i++) {
  const opcion = document.createElement('option');
  opcion.innerText = i;
  selectYear.appendChild(opcion);
}

// ----------------------------- MOSTRAR MES DE EXPIRACIÓN EN LA TARJETA ----------------------------
selectMes.addEventListener('change', (e) => {
  mes.textContent = e.target.value;
});

// ----------------------------- MOSTRAR AÑO DE EXPIRACIÓN EN LA TARJETA -----------------------------
selectYear.addEventListener('change', (e) => {
  year.textContent = e.target.value.slice(2);
});


// -----------------------------------INPUT CVV ------------------------------------------------
inputCVV.addEventListener('keyup', () =>{
  inputCVV.value = inputCVV.value
  // ---------------- ELIMINAMOS ESPACIOS EN BLANCO ----------------
    .replace(/\s/g, '')
  // ---------------- ELIMINAR LAS LETRAS --------------------------
    .replace(/\D/g, '');

  // ----------- MOSTRAMOS DÍGITOS DEL CVV EN LA TARJETA -----------
  cvv.textContent = inputCVV.value;
});


// ------------------------------- VALIDANDO EL NÚMERO DE LA TARJETA --------------------------- 
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
