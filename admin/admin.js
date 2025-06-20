// admin.js - Script untuk Admin Panel ZeliaStore

document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi semua fungsi admin
    initDashboard();
    initProductManagement();
    initOrderManagement();
    initUserManagement();
    initReports();
});

// Fungsi untuk dashboard admin
function initDashboard() {
    // Update statistik dashboard
    updateDashboardStats();
    
    // Chart untuk statistik penjualan
    if (document.getElementById('salesChart')) {
        initSalesChart();
    }
    
    // Notifikasi terbaru
    setupNotifications();
}

function updateDashboardStats() {
    // Dalam implementasi nyata, ini akan mengambil data dari API
    const stats = {
        totalSales: 1254,
        newOrders: 24,
        products: 156,
        visitors: 3421
    };
    
    document.querySelectorAll('.stat-card').forEach(card => {
        const statType = card.getAttribute('data-stat');
        if (stats[statType]) {
            const valueElement = card.querySelector('.stat-value');
            if (valueElement) {
                animateValue(valueElement, 0, stats[statType], 1000);
            }
        }
    });
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function initSalesChart() {
    // Contoh menggunakan Chart.js
    const ctx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'],
            datasets: [{
                label: 'Penjualan 2023',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Fungsi untuk manajemen produk
function initProductManagement() {
    // Inisialisasi data table produk
    if (document.getElementById('productsTable')) {
        initDataTable('#productsTable');
    }
    
    // Form tambah/edit produk
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleProductSubmit(this);
        });
        
        // Upload gambar preview
        const imageUpload = document.getElementById('productImage');
        if (imageUpload) {
            imageUpload.addEventListener('change', function() {
                previewImage(this, 'imagePreview');
            });
        }
    }
}

function initDataTable(selector) {
    // Dalam implementasi nyata, bisa menggunakan library seperti DataTables
    $(selector).DataTable({
        responsive: true,
        language: {
            url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Indonesian.json'
        }
    });
}

function previewImage(input, previewId) {
    const preview = document.getElementById(previewId);
    const file = input.files[0];
    const reader = new FileReader();
    
    reader.onloadend = function() {
        preview.src = reader.result;
        preview.style.display = 'block';
    };
    
    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = '';
        preview.style.display = 'none';
    }
}

function handleProductSubmit(form) {
    // Validasi form
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }
    
    // Simulasi AJAX submit
    const formData = new FormData(form);
    console.log('Data produk yang dikirim:', Object.fromEntries(formData));
    
    // Tampilkan loading
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Memproses...';
    
    // Simulasi request API
    setTimeout(() => {
        submitBtn.textContent = originalText;
        alert('Produk berhasil disimpan!');
        // Redirect atau refresh data
    }, 1500);
}

// Fungsi untuk manajemen pesanan
function initOrderManagement() {
    if (document.getElementById('ordersTable')) {
        initDataTable('#ordersTable');
    }
    
    // Update status pesanan
    document.querySelectorAll('.order-status-select').forEach(select => {
        select.addEventListener('change', function() {
            updateOrderStatus(this.value, this.getAttribute('data-order-id'));
        });
    });
}

function updateOrderStatus(status, orderId) {
    console.log(`Update order ${orderId} ke status: ${status}`);
    // AJAX request untuk update status
    fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: status })
    })
    .then(response => response.json())
    .then(data => {
        alert(`Status pesanan #${orderId} berhasil diupdate`);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Gagal mengupdate status pesanan');
    });
}

// Fungsi untuk manajemen user
function initUserManagement() {
    if (document.getElementById('usersTable')) {
        initDataTable('#usersTable');
    }
}

// Fungsi untuk laporan
function initReports() {
    if (document.getElementById('reportRange')) {
        // Date range picker
        $('#reportRange').daterangepicker({
            locale: {
                format: 'DD/MM/YYYY',
                applyLabel: 'Pilih',
                cancelLabel: 'Batal',
                daysOfWeek: ['Mg', 'Sn', 'Sl', 'Rb', 'Km', 'Jm', 'Sb'],
                monthNames: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
            }
        });
        
        document.getElementById('generateReport').addEventListener('click', function() {
            generateReport();
        });
    }
}

function generateReport() {
    const range = document.getElementById('reportRange').value;
    console.log(`Generate report untuk periode: ${range}`);
    // AJAX request untuk generate report
}

// Fungsi untuk notifikasi
function setupNotifications() {
    // Polling untuk notifikasi baru
    setInterval(checkNewNotifications, 30000);
}

function checkNewNotifications() {
    fetch('/api/notifications/count')
        .then(response => response.json())
        .then(data => {
            const badge = document.getElementById('notificationBadge');
            if (badge && data.count > 0) {
                badge.textContent = data.count;
                badge.style.display = 'inline-block';
            }
        });
}
