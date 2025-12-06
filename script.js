// Parolayı kontrol edecek olan fonksiyon
function parolaKontrol() {
    // Doğru cevap (HTML'deki matematik işlemine göre belirle: 15 + 8 = 23)
    const dogruCevap = 23;

    // Kullanıcının girdiği değeri alıyoruz
    const kullaniciGirdisi = document.getElementById('parola-input').value;

    // Gerekli HTML elemanlarını seçiyoruz
    const sıkılmısFoto = document.getElementById('sıkılmıs-foto');
    const sevinmisFoto = document.getElementById('sevinmis-foto');
    const parolaBolumu = document.getElementById('parola-bolumu');
    const basariMesaji = document.getElementById('basari-mesaji');

    // Kullanıcının girdiği değeri sayıya çevirip doğru cevapla karşılaştırıyoruz
    if (parseInt(kullaniciGirdisi) === dogruCevap) {
        // Cevap doğruysa:
        
        // Sıkılmış fotoğrafı ve parola bölümünü gizle
        sıkılmısFoto.classList.add('hidden');
        parolaBolumu.classList.add('hidden');

        // Sevinmiş fotoğrafı ve başarı mesajını göster
        sevinmisFoto.classList.remove('hidden');
        basariMesaji.classList.remove('hidden');

    } else {
        // Cevap yanlışsa:
        alert("Hahahah! Bu kadar basit bir işlemi bile yapamadın mı? Tekrar dene! 😂");
        // Kullanıcının girdiği alanı temizle
        document.getElementById('parola-input').value = "";
    }
}

/* ============================
   CRINGE OYUNU MANTIĞI
   ============================ */

// Sadece 'cringe-oyunu' ID'si olan sayfada çalışması için kontrol
if (document.getElementById('cringe-oyunu')) {

    const solResimElementi = document.querySelector('#sol-resim-konteyner .secim-resmi');
    const sagResimElementi = document.querySelector('#sag-resim-konteyner .secim-resmi');
    const oyunAlani = document.getElementById('oyun-alani');
    const sonucAlani = document.getElementById('sonuc-alani');
    const kazananResimAlani = document.getElementById('kazanan-resim');
    const siralamaListesi = document.getElementById('cringe-siralamasi');

    // Yarışacak resimlerin listesi
    const resimler = [
        { id: 1, src: 'images/cringe1.jpg' },
        { id: 2, src: 'images/cringe2.jpg' },
        { id: 3, src: 'images/cringe3.jpg' },
        { id: 4, src: 'images/cringe4.jpg' },
        { id: 5, src: 'images/cringe5.jpg' },
        { id: 6, src: 'images/cringe6.jpg' },
        { id: 7, src: 'images/cringe7.jpg' },
        { id: 8, src: 'images/cringe8.jpg' },
    ];

    let mevcutTur = [];
    let sonrakiTur = [];
    let elenenler = [];
    let karsilasmaIndex = 0;

    // Oyunu başlatan fonksiyon
    function oyunuBaslat() {
        // Resimleri her oyun başında rastgele karıştır
        mevcutTur = [...resimler].sort(() => Math.random() - 0.5);
        sonrakiTur = [];
        elenenler = [];
        karsilasmaIndex = 0;
        sonucAlani.classList.add('hidden');
        oyunAlani.classList.remove('hidden');
        karsilasmayiGoster();
    }

    // Ekrana iki resmi getiren fonksiyon
    function karsilasmayiGoster() {
        if (karsilasmaIndex < mevcutTur.length) {
            solResimElementi.src = mevcutTur[karsilasmaIndex].src;
            sagResimElementi.src = mevcutTur[karsilasmaIndex + 1].src;
        } else {
            // Tur bitti, yeni tura geç
            turuBitir();
        }
    }

    // Kullanıcı bir resme tıkladığında çalışan fonksiyon
    function kazananSec(secim) {
        const solKazandi = secim === 'sol';
        const kazanan = solKazandi ? mevcutTur[karsilasmaIndex] : mevcutTur[karsilasmaIndex + 1];
        const elenen = solKazandi ? mevcutTur[karsilasmaIndex + 1] : mevcutTur[karsilasmaIndex];

        sonrakiTur.push(kazanan);
        elenenler.push(elenen);

        karsilasmaIndex += 2; // Sonraki ikiliye geç
        karsilasmayiGoster();
    }
    
    // Bir tur tamamlandığında çalışır
    function turuBitir() {
        if (sonrakiTur.length === 1) {
            // Oyun bitti, kazanan belli
            oyunuBitir(sonrakiTur[0]);
            return;
        }

        mevcutTur = [...sonrakiTur].sort(() => Math.random() - 0.5); // Sonraki turu karıştır
        sonrakiTur = [];
        karsilasmaIndex = 0;
        karsilasmayiGoster();
    }

    // Oyun bittiğinde sonuçları gösterir
    function oyunuBitir(kazanan) {
        oyunAlani.classList.add('hidden');
        sonucAlani.classList.remove('hidden');

        // Kazanan resmi göster
        kazananResimAlani.innerHTML = `<img src="${kazanan.src}" alt="Kazanan Fotoğraf">`;
        
        // Sıralamayı oluştur
        const tamSiralama = [kazanan, ...elenenler.reverse()];
        siralamaListesi.innerHTML = ''; // Listeyi temizle

        tamSiralama.forEach((resim, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${index + 1}.</span>
                <img src="${resim.src}" alt="Sıralama ${index + 1}">
                <span>Fotoğraf #${resim.id}</span>
            `;
            siralamaListesi.appendChild(li);
        });
    }

    // Sayfa yüklendiğinde oyunu başlat
    oyunuBaslat();
}