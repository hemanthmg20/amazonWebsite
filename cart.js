export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addtocart(productId,productName){
    let matchingItem;
  
    cart.forEach((item) =>{
      if(item.productId === productId){
        matchingItem = item;
      }
    });

    if (matchingItem){
      matchingItem.quantity+=1;
    }
    else{
      cart.push({
        productId:productId,
        quantity: 1,
        productName:productName
      });
    }
    saveCartToStorage();
}
    
export function saveCartToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
  

export function removeFromCart(productId){
  
  const newCart=[];

  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  
  cart = newCart;
  saveCartToStorage();
}

