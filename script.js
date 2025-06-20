// Load produk
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
});

function loadProducts() {
    // Ini contoh, seharusnya diambil dari API/database
    const products = [
        { id: 1, name: 'Produk 1', price: 150000, image: 'images/products/product1.jpg' },
        { id: 2, name: 'Produk 2', price: 200000, image: 'images/products/product2.jpg' }
    ];
    
    const container = document.querySelector('.products-container');
    products.forEach(product => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Rp ${product.price.toLocaleString()}</p>
                <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
            </div>
        `;
    });
}

function addToCart(productId) {
    // Fungsi tambah ke keranjang
    console.log(`Produk ${productId} ditambahkan ke keranjang`);
}
