// Fungsi untuk inisialisasi dashboard admin
document.addEventListener('DOMContentLoaded', () => {
    // Aktifkan menu sidebar
    const menuItems = document.querySelectorAll('.sidebar nav ul li');
    
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    // Tampilkan notifikasi
    displayAdminNotifications();
});

// Fungsi untuk menampilkan notifikasi (contoh)
function displayAdminNotifications() {
    // Dalam implementasi nyata, ini akan mengambil data dari API
    console.log('Memeriksa notifikasi admin...');
    
    // Contoh: Tambahkan badge notifikasi ke menu pesanan
    const ordersMenuItem = document.querySelector('.sidebar nav ul li:nth-child(3)');
    const notificationBadge = document.createElement('span');
    notificationBadge.className = 'notification-badge';
    notificationBadge.textContent = '3';
    ordersMenuItem.appendChild(notificationBadge);
}
