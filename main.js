// Get them all (target them)
let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'White Top',
        tag: 'whitetop', //use to grab the image
        price: 15,
        inCart: 0 //track how many items
    },
    {
        name: 'Pink Top',
        tag: 'pinktop', //use to grab the image
        price: 20,
        inCart: 0 //track how many items
    },
    {
        name: 'Black Hoodie',
        tag: 'blackhoodie', //use to grab the image
        price: 10,
        inCart: 0 //track how many items
    },
    {
        name: 'Grey Crew',
        tag: 'greycrew', //use to grab the image
        price: 25,
        inCart: 0 //track how many items
    }
]

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click',() => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;   
    }
}


//How many numbers are added to cart

function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');

    //use parseInt to convert string in to a number
    productNumbers = parseInt(productNumbers);

    if (productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent = 1;
    }
    
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {

        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]:product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    //console.log("The product price is", product.price); 
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
    
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle-outline"></ion-icon>
                <img src="../images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">R ${item.price},00</div>
            <div class="quantity">
                <ion-icon class="decrease" name="arrow-back-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-forward-circle"></ion-icon>
            </div>
            <div class="total">
                R ${item.inCart * item.price},00
            </div>
            `
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    R ${cartCost},00
                </h4>
            </div>
        
        `;
    }
}

onLoadCartNumbers();
displayCart();