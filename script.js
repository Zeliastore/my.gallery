// script.js untuk toko online sederhana

// Fungsi untuk menampilkan/menyembunyikan menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Fungsi untuk slider/gallery produk
    initProductSlider();
    
    // Fungsi untuk keranjang belanja
    initCart();
    
    // Fungsi untuk form kontak/validasi
    initForms();
});

function initProductSlider() {
    const sliders = document.querySelectorAll('.product-slider');
    
    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slide');
        let currentSlide = 0;
        
        if (slides.length > 1) {
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, 5000);
        }
    });
}

function initCart() {
    const cartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;
    
    cartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            count++;
            if (cartCount) {
                cartCount.textContent = count;
                cartCount.classList.add('updated');
                setTimeout(() => cartCount.classList.remove('updated'), 300);
            }
            
            // Tambahkan logika tambahan untuk menyimpan item ke cart
            const productId = this.getAttribute('data-product-id');
            console.log(`Produk ${productId} ditambahkan ke keranjang`);
        });
    });
}

function initForms() {
    const forms = document.querySelectorAll('form.needs-validation');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            form.classList.add('was-validated');
        }, false);
    });
}

// Fungsi untuk animasi scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
