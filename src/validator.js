

const validator = {          

  isValid:(creditCardNumber) => {  

    const digitos = creditCardNumber.split("").map(Number).reverse();
    let suma = 0;

    for (let i = 0; i < digitos.length; i++) {

      if (i % 2 === 1) {
        let doble = digitos[i] * 2;
        if (doble > 9) {
          doble -=  9;
        }
        suma += doble;
      } else {
        suma += digitos[i];
      }
    }

    return suma!== 0 && suma % 10 === 0;
  }

  ,

  maskify:(creditCardNumber) => {
    const longitud = creditCardNumber.length
    let numberOculto="";
    
    //este for unicamente nos crea 12 #s
    for (let i = 0; i < longitud-4; i++) {
      numberOculto+="#";
    }


    numberOculto+=creditCardNumber.slice(longitud-4,longitud)

  
    return numberOculto;  
  }


};

export default validator;




