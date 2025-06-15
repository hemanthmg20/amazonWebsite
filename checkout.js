import { cart,removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";

console.log(cart);
function checkOutHTML(){
    let cartSummaryHTML='';
    let checkOutSum = 0;

    cart.forEach((cartItem)=>{

        let productId = cartItem.productId;

        let matchingProduct;

        products.forEach((item)=>{
            if(item.id === productId){
                matchingProduct = item;
            }
        });
        console.log(matchingProduct);

        cartSummaryHTML+=`
        <div class="cart-item-container">
            <div class="delivery-date">
                Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
            <img class="product-image"
                src="${matchingProduct.image}">

            <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                ₹${((matchingProduct.priceCents * cartItem.quantity) / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                    
                </span>
                <span class="delete-quantity-link link-primary js-delete-link"          
                data-product-id="${matchingProduct.id}">
                    Delete
                </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                Choose a delivery option:
                </div>
                <div class="delivery-option">
                <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                    Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                    FREE Shipping
                    </div>
                </div>
                </div>
                <div class="delivery-option">
                <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                    Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                    ₹50 - Shipping
                    </div>
                </div>
                </div>
                <div class="delivery-option">
                <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                    Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                    ₹110 - Shipping
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        `;
        checkOutSum+=(matchingProduct.priceCents) * cartItem.quantity;
    });
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
    document.querySelector('.js-checkout-total').innerHTML = `${(checkOutSum/100).toFixed(2)}`;

    let checkoutTotal = ((checkOutSum + 5000 )/100);
    document.querySelector('.js-total').innerHTML = (checkoutTotal).toFixed(2);

    let checkoutWithTax = (checkoutTotal*0.18);
    document.querySelector('.js-tax').innerHTML = (checkoutWithTax).toFixed(2);

    document.querySelector('.js-grand-total').innerHTML = (checkoutTotal+checkoutWithTax).toFixed(2);




}

function deleteProducts(){
    document.querySelectorAll('.js-delete-link')
    .forEach((link)=>{
        link.addEventListener('click',()=>{
            const productId = (link.dataset.productId);    
            // console.log(productId);
            removeFromCart(productId);
            // console.log(cart);
            checkOutHTML();
            deleteProducts();
            updateCheckOutQuantity();
        });
    });
}

function updateCheckOutQuantity (){
    let count = 0;
    cart.forEach((cartItem)=>{
        count+=cartItem.quantity;
    })
    document.querySelector('.js-checkout-quantity').innerHTML = `items (${count})`;
    document.querySelector('.js-checkout').innerHTML = `items (${count})`;
}

updateCheckOutQuantity();
checkOutHTML();
deleteProducts();

// line 44 update text if needed