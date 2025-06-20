// Data produk contoh
const products = [
    {
        id: 1,
        name: "Smartphone X",
        price: 4999000,
        image: "images/product1.jpg",
        description: "Smartphone canggih dengan kamera 48MP"
    },
    {
        id: 2,
        name: "Laptop Pro",
        price: 8999000,
        image: "images/product2.jpg",
        description: "Laptop performa tinggi untuk pekerjaan dan gaming"
    },
    {
        id: 3,
        name: "Headphone Wireless",
        price: 899000,
        image: "images/product3.jpg",
        description: "Headphone Bluetooth dengan noise cancellation"
    },
    {
        id: 4,
        name: "Smart Watch",
        price: 1299000,
        image: "images/product4.jpg",
        description: "Smartwatch dengan monitor detak jantung"
    }
];

// Keranjang belanja
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fungsi untuk menampilkan produk
function displayProducts() {
    const productGrid = document.querySelector('.product-grid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <a href="product.html?id=${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">Rp ${product.price.toLocaleString('id-ID')}</div>
                    <button class="add-to-cart" data-id="${product.id}">Tambah ke Keranjang</button>
                </div>
            </a>
        `;
        productGrid.appendChild(productCard);
    });
    
    // Tambahkan event listener untuk tombol tambah ke keranjang
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = parseInt(button.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Fungsi untuk menambah produk ke keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} telah ditambahkan ke keranjang!`);
}

// Fungsi untuk memperbarui jumlah item di keranjang
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Jalankan saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.product-grid')) {
        displayProducts();
    }
    updateCartCount();
});
