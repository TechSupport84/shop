//  Update cart button with item count
function updateCartButton() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartButton = document.getElementById('cart-button');
    const totalItems = cart.reduce((total, product) => total + product.quantity, 0);
    cartButton.textContent = `Cart (${totalItems})`;
}

//  Delete item from cart
function deleteCartItem(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(product => product.id !== productId); // remove item by ID
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartButton();   
    displayCartPage();  
}

//  Display cart content on cart page
function displayCartPage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsList = document.getElementById('cart-items-page');
    const cartTotal = document.getElementById('cart-total-page');

    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach(product => {
        const cartItem = document.createElement('li');
        cartItem.className = 'cart-item';

        cartItem.innerHTML = `
            <div class="cart-details">
                <img src="${product.image}" alt="${product.title}" />
                <div class="cart-info">
                    <span><strong>${product.title}</strong></span>
                    <span>Qty: ${product.quantity}</span>
                    <button class="delete-btn" data-id="${product.id}">🗑 Remove</button>
                </div>
            </div>
            <span>$${(product.price * product.quantity).toFixed(2)}</span>
        `;

        cartItemsList.appendChild(cartItem);
        total += product.price * product.quantity;
    });

    cartTotal.textContent = total.toFixed(2);


    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            deleteCartItem(id);
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    updateCartButton();
    displayCartPage();
});
