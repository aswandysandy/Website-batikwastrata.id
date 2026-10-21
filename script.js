// Nomor WhatsApp Admin yang baru (+62 882-0206-77022)
const ADMIN_WA_NUMBER = "62882020677022"; 

const nav = document.getElementById('navlinks');
const menuToggle = document.getElementById('menuToggle');

// Toggle Menu Mobile
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  // Ubah ikon SVG Menu/Close
  menuToggle.innerHTML = open 
    ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>' 
    : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
});

// Tutup menu saat link diklik
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
  });
});

// Pilih produk dari koleksi ke dalam form
document.querySelectorAll('.choose-product').forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('custProduct').value = button.dataset.product;
    document.getElementById('kontak').scrollIntoView({ behavior: 'smooth' });
    
    // Focus ke input nama setelah scroll selesai
    setTimeout(() => {
      document.getElementById('custName').focus({ preventScroll: true });
    }, 450);
  });
});

// Mengatur nilai minimal tanggal sewa (hari ini)
const dateInput = document.getElementById('rentDate');
const today = new Date();
dateInput.min = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, '0'),
  String(today.getDate()).padStart(2, '0')
].join('-');

// Handle Submit Form
document.getElementById('rentForm').addEventListener('submit', event => {
  event.preventDefault();
  
  const name = document.getElementById('custName').value.trim();
  const product = document.getElementById('custProduct').value;
  const date = document.getElementById('rentDate').value;
  const area = document.getElementById('rentArea').value;
  const notes = document.getElementById('notes').value.trim();
  
  if (!name || !product || !date || !area) {
    return;
  }
  
  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  const message = `Halo Admin BatikWastrata.id, saya ingin konsultasi sewa.\n\nNama: ${name}\nKoleksi: ${product}\nTanggal penggunaan: ${formattedDate}\nLokasi: ${area}${notes ? '\nCatatan: ' + notes : ''}\n\nMohon info ketersediaan, harga, dan ketentuan sewanya. Terima kasih.`;
  
  const url = `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(message)}`;
  const notice = document.getElementById('notice');
  
  notice.style.display = 'block';
  notice.textContent = 'Pesan konsultasi sudah disiapkan. Jika WhatsApp tidak otomatis terbuka, silakan klik ulang atau gunakan tombol WhatsApp melayang di pojok.';
  
  window.open(url, '_blank', 'noopener,noreferrer');
});
