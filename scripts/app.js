const cartButton = document.getElementById('cart-button');
const productList = document.getElementById('product-list');

// Async function to fetch and display products
async function loadProducts() {
    try {
        const response = await fetch("https://techsupport84.github.io/shop/products.json");
        if (!response.ok) {
            throw new Error('Failed to load products');
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
        productList.innerHTML = '<p>Sorry, we couldn\'t load the products. Please try again later.</p>';
    }
}

function displayProducts(products) {
    products.forEach(product => {
        const productCard = createProductCard(product);
        productList.appendChild(productCard);
    });
}

function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" 
            data-id="${product.id}" 
            data-title="${product.title}" 
            data-price="${product.price}" 
            data-image="${product.image}">
            Add to Cart
        </button>
    `;

    return productCard;
}

productList.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('add-to-cart')) {
        addToCart(event);
    }
});

function addToCart(event) {
    const button = event.target;
    const productId = button.getAttribute('data-id');
    const productTitle = button.getAttribute('data-title');
    const productPrice = parseFloat(button.getAttribute('data-price'));
    const productImage = button.getAttribute('data-image');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex !== -1) {
        // If the product is already in the cart, increase its quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // Otherwise, add the new product to the cart
        cart.push({
            id: productId,
            title: productTitle,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart button with the latest item count
    updateCartButton();
}

// Function to update the cart count on the cart button
function updateCartButton() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (cartButton) {
        cartButton.textContent = `Cart (${totalItems})`;
    }
}

// Ensure the cart button count is correct when the page loads
document.addEventListener('DOMContentLoaded', updateCartButton);

// Load products when the page loads
document.addEventListener('DOMContentLoaded', loadProducts);
