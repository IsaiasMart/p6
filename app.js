const apiEndpoint = 'https://products-foniuhqsba-uc.a.run.app/TVs'; 
const productList = document.getElementById('product-list');
const cartDropdown = document.getElementById('cart-dropdown');
const cartButton = document.getElementById('cart-button');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('total');
const clearCartButton = document.getElementById('clear-cart');

let cart = [];

// funcion cargar productos
async function loadProducts() {
  try {
    const response = await fetch(apiEndpoint);
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}

// productos en la página
function renderProducts(products) {
  productList.innerHTML = ''; 

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
      <h3>${product.title}</h3>
      <img src="${product.image}" alt="${product.title}" class="product-image">
      <p>${product.short_description}</p>
      <p>Precio: ${product.price}</p>
      <button 
        data-id="${product.id}" 
        data-name="${product.title}" 
        data-price="${product.price.replace('€', '').trim()}" 
        class="add-to-cart">
        Agregar al carrito
      </button>
    `;
    productList.appendChild(productDiv);
  });

  // 
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
  });
}
 
// agregar un producto al carrito
function addToCart(event) {
    const button = event.target;
    const id = button.getAttribute('data-id');
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    const existingProduct = cart.find(item => item.id === id);
  
    if (existingProduct) {
      existingProduct.quantity += 1; 
    } else {
      cart.push({ id, name, price, quantity: 1 }); 
    }
  
    updateCart();
  }
  

// actualiza el cart
function updateCart() {
  
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  
  cartItems.innerHTML = cart.map(item => `
    <li>
      ${item.name} x${item.quantity} - €${(item.price * item.quantity).toFixed(2)}
    </li>
  `).join('');


  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = `Total: €${total.toFixed(2)}`;
}

// funcion limpiar carrito
clearCartButton.addEventListener('click', () => {
  cart = [];
  updateCart();
});

//desplegable
cartButton.addEventListener('click', () => {
  cartDropdown.classList.toggle('hidden');
});


loadProducts();
