
let listCart = [];
let promoCodeApplied = false; // Track if promo code has been applied

function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
}
checkCart();
addCartToHTML();

function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;

    // if has product in Cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.image}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price}/1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">$${product.price * product.quantity}</div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
                totalPrice = totalPrice + (product.price * product.quantity);
            }
        })
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '$' + totalPrice;
}

// Add event listener to Promo Code apply button
document.getElementById('applyPromoCode').addEventListener('click', applyPromoCode);

function applyPromoCode() {
    const promoCodeInput = document.getElementById('promoCode').value;
    const discountRow = document.getElementById('discountRow');
    const discountAmount = document.getElementById('discountAmount');

    let discount = 0;

    if(promoCodeApplied) {
        alert("Promo code already used!");
        return;
    }

    // Check if the promo code is valid
    if(promoCodeInput === "ostad10") {
        discount = 0.10; // 10% discount
    } else if(promoCodeInput === "ostad5") {
        discount = 0.05; // 5% discount
    } else {
        alert("Invalid Promo Code");
        return;
    }

    // Get the total price before discount
    const totalPriceBeforeD = parseFloat(document.querySelector('.totalPrice').innerText.substring(1));
    
    // Calculate new total price after applying discount
    const discountedPrice = totalPriceBeforeD - (totalPriceBeforeD * discount);

    // Display discount and final price
    discountRow.style.display = "block";
    discountAmount.innerText = `$${(totalPriceBeforeD * discount).toFixed(2)} discount applied`;
    document.querySelector('.totalPrice').innerText = `$${discountedPrice.toFixed(2)}`;
    document.querySelector('.beforeDiscount').innerText = `$${totalPriceBeforeD.toFixed(2)}`;
    
    promoCodeApplied = true; // Mark that promo code is used
}
