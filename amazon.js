
import {cart, addtocart,saveCartToStorage} from '../data/cart.js';
import { products } from '../data/products.js';

function amazonHTML(){
  let productHTML='';
  products.forEach((product)=>{
      productHTML+=`
      <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars*10}.png">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ₹${(product.priceCents / 100).toFixed(2)}
            </div>

            
            

            <div class="product-spacer"></div>

            <div class="added-to-cart js-checkmark-${product.id}"style="display: none;">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id='${product.id}'
            data-product-name='${product.name}'>
              Add to Cart
            </button>
          </div>`;
});

document.querySelector('.js-product-grid').innerHTML=productHTML;
}

amazonHTML();

function updatecartquantity(){
  let cartQuantity = 0;
    cart.forEach((item)=>{
      cartQuantity+=item.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    saveCartToStorage();
}

updatecartquantity();


document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    const productName = button.dataset.productName;
    
    addtocart(productId, productName);
    updatecartquantity();
  });
});

// function added(){
//   const productId = button.dataset.productId;
//   document.querySelector('.js-checkmark-${product.id}').innerHTML = `<img src="${images/icons/checkmark.png}">Added`;
// }


{/* <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div> */}