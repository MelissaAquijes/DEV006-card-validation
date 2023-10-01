import { data } from './data/data.js';

const productCardContainer = document.querySelector('.product-card-container');

const productDetailContainer = document.querySelector('#productDetailContainer');
const productDetailImg = document.querySelector('#productDetailImg');
const productDetailName = document.querySelector('#productDetailName');
const productDetailPrice = document.querySelector('#productDetailPrice');
const productDetailDescription = document.querySelector('#productDetailDescription');

const buttonGoPay = document.querySelector('.button-go-pay');
const orderCartContainer = document.querySelector('.order-cart-container');
const totalAmount = document.querySelector('.total-amount');
const shoppingCartCounter = document.querySelector('.shopping-cart-counter');
const shoppingCartContainer = document.querySelector('.shopping-cart-container');
const transparencyContainer = document.querySelector('.transparency-container');
const funkoDetailClose = document.querySelector('.funko-detail-close');
const myOrdenImgClose = document.querySelector('.my-orden-img-close');

let arrayProductCart = [];
let totalFinals = [];

 funkoDetailClose.addEventListener('click', () =>{
    productDetailContainer.classList.add('inactive');
});
 
shoppingCartContainer.addEventListener('click', () => {
    transparencyContainer.classList.remove('inactive');
});

myOrdenImgClose.addEventListener('click', () => {
    transparencyContainer.classList.add('inactive')
});


function renderProductCards(arr) {

    productCardContainer.innerHTML = '';

    arr.forEach ((product) => {

        // Creación de cards
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productCardImg = document.createElement('img');
        productCardImg.setAttribute('src', product.image);
        productCardImg.classList.add('product-card-img');

        const productCardInfo = document.createElement('div');
        productCardInfo.classList.add('product-card-info');

        const  productName = document.createElement('p');
        productName.classList.add('product-name');
        productName.innerText = product.name;

        const productPrice = document.createElement('p');
        productPrice.classList.add('product-price');
        productPrice.innerText = 'S/' + product.price;

        const addCartButton = document.createElement('button');
        addCartButton.classList.add('add-cart-button');
        addCartButton.innerText = 'Añadir al carrito';

        addCartButton.addEventListener('click', () => {
            renderMyOrder(product);
        });

        productCard.append(productCardImg, productName, productPrice, addCartButton)
        productCardContainer.append(productCard);

        //Creación de aside (info. del producto)
        productCardImg.addEventListener('click', () => {
            productDetailImg.setAttribute('src', product.image);
            productDetailImg.classList.add('product-detail-img');

            productDetailName.innerText = product.name;
            productDetailName.classList.add('product-detail-name');

            productDetailPrice.innerText = 'S/' + product.price;
            productDetailPrice.classList.add('product-detail-price');

            if (productDetailDescription.firstChild) {
                productDetailDescription.removeChild(productDetailDescription.firstChild);
            }

            const description = document.createElement('ul');
            description.classList.add('description');
            const descriptionEstructure =  `
            <li class="funko-information"><span class="information-b">Marca:</span> ${product.trademark}</li>
            <li class="funko-information"><span class="information-b">Línea:</span> ${product.line}</li>
            <li class="funko-information"><span class="information-b">Material:</span> ${product.material}</li>
            <li class="funko-information"><span class="information-b">Medida:</span> ${product.extent}</li>
            <li class="funko-information"><span class="information-b">Color:</span> ${product.color}</li>`

            description.innerHTML = descriptionEstructure;
            productDetailDescription.appendChild(description);

            productDetailContainer.classList.remove('inactive');
        });

    })
}
renderProductCards(data);


//Buscador de funkos
const inputSearch = document.querySelector('.input-search');
inputSearch.addEventListener('keyup',(e)=>{

    const keyword= e.target.value;
    console.log(keyword)
    const dataFilterSearch= data.filter((funko) => {
        return funko.name.toLowerCase().includes(keyword.toLowerCase());
    });
    renderProductCards(dataFilterSearch)
});


//Creación productos añadidos a la bolsa de compras
function renderMyOrder(product) {
    const orderCartBox = document.createElement('div');
    orderCartBox.classList.add('order-cart-box');

    const imgMyOrder = document.createElement('img');
    imgMyOrder.setAttribute('src', product.image);
    imgMyOrder.classList.add('img-my-order');

    const productNameMyOrder = document.createElement('p');
    productNameMyOrder.innerHTML = product.name;
    productNameMyOrder.classList.add('product-name-my-order');

    const productPriceMyOrder = document.createElement('p');
    productPriceMyOrder.innerHTML = 'S/' + product.price;
    productPriceMyOrder.classList.add('product-price-my-order');

    const iconDelete = document.createElement('img');
    iconDelete.setAttribute('src','./assets/eliminate.png');
    iconDelete.classList.add('icon-delete');

    orderCartBox.append(imgMyOrder, productNameMyOrder, productPriceMyOrder, iconDelete);
    orderCartContainer.append(orderCartBox);


    // Actualizamos la cantidad de productos y sumamos el resultado
    totalAmount.innerHTML = '$0.00';

    shoppingCartCounter.innerHTML = orderCartContainer.childElementCount;

    totalAmount.innerHTML = Number(totalAmount.innerHTML.substring(1)) + product.price;
    arrayProductCart.push(Number(totalAmount.innerHTML));
    console.log("arrayProductCart array de totalAmount: ",arrayProductCart)
    
    totalAmount.innerHTML = 'S/' + sumProducts(arrayProductCart);
    console.log('array producto suma', sumProducts(arrayProductCart));

    totalFinals.push(sumProducts(arrayProductCart))
        if(totalFinals.length > 1) {
            totalFinals.shift();
        }
        console.log('totalFinals :', totalFinals)

    // Elimina producto de mi orden y actualiza el carrito
    iconDelete.addEventListener('click', () => {
        console.log("eliminando")
        orderCartBox.remove();
        shoppingCartCounter.innerHTML = orderCartContainer.childElementCount;


        let totalRest = totalFinals[0] - product.price;
        totalAmount.innerHTML = 'S/' + totalRest;

        totalFinals.push(totalRest);
        totalFinals.shift();
        console.log("totalFinals RESTANDO--------: ",totalFinals)

        arrayProductCart.pop();

    });
}


buttonGoPay.addEventListener('click', () => {
    const totalFinalShop = totalFinals[0];
    console.log("totalFinalShop",totalFinalShop)
    localStorage.setItem('totalFinalShop', totalFinalShop);
}); 

console.log("totalFinals DESDE AFUERA: ",totalFinals)

//suma todos los elementos del array
function sumProducts(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
    }
    return sum;
};