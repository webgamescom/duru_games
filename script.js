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


/* ============================
   FLAPPY BIRD OYUNU MANTIĞI
   ============================ */

if (document.getElementById('flappy-board')) {
    
    // Oyun Alanı Ayarları
    const board = document.getElementById('flappy-board');
    const boardWidth = 360;
    const boardHeight = 640;
    const context = board.getContext("2d");

    board.height = boardHeight;
    board.width = boardWidth;

    // Karakter Ayarları
    const characterWidth = 46; 
    const characterHeight = 34; 
    let characterX = boardWidth / 8;
    let characterY = boardHeight / 2;
    let characterImg;

    const character = {
        x: characterX,
        y: characterY,
        width: characterWidth,
        height: characterHeight
    }

    // Duvar (Boru) Resim Ayarları
    let pipeArray = [];
    const pipeWidth = 64; 
    const pipeHeight = 512;
    let pipeX = boardWidth;
    let pipeY = 0;

    let topPipeImg;
    let bottomPipeImg;

    // =================================================================
    // YENİ: AYARLANABİLİR HITBOX DEĞİŞKENLERİ
    // Resimlerine göre bu değerleri değiştirerek hitbox'ları ayarlayabilirsin.
    // =================================================================
    const HITBOX_OFFSET_X = 20;      // Hitbox'ın, duvar resminin sol kenarından ne kadar içeride başlayacağı.
    const HITBOX_WIDTH = 28;        // Hitbox'ın genişliği.
    
    // ÜST DUVAR İÇİN:
    const TOP_PIPE_HITBOX_OFFSET_Y = 0;  // Hitbox'ın, üst duvar resminin üst kenarından ne kadar aşağıda başlayacağı.
    const TOP_PIPE_HITBOX_HEIGHT = 500;  // Üst duvar hitbox'ının yüksekliği.
    
    // ALT DUVAR İÇİN:
    const BOTTOM_PIPE_HITBOX_OFFSET_Y = 10; // Hitbox'ın, alt duvar resminin üst kenarından ne kadar aşağıda başlayacağı.
    const BOTTOM_PIPE_HITBOX_HEIGHT = 500;  // Alt duvar hitbox'ının yüksekliği.
    // =================================================================

    // Fizik Ayarları
    let velocityX = -2;
    let velocityY = 0;
    let gravity = 0.1;
    
    let gameOver = false;
    let score = 0;

    window.onload = function() {
        characterImg = new Image();
        characterImg.src = "images/ucan-karakter.png";
        characterImg.onload = () => context.drawImage(characterImg, character.x, character.y, character.width, character.height);

        topPipeImg = new Image();
        topPipeImg.src = "images/duvar1.png";

        bottomPipeImg = new Image();
        bottomPipeImg.src = "images/duvar2.png";

        requestAnimationFrame(update);
        setInterval(placePipes, 1500);
        document.addEventListener("keydown", moveCharacter);
        board.addEventListener("mousedown", moveCharacter);
    }

    function update() {
        requestAnimationFrame(update);
        if (gameOver) return;
        context.clearRect(0, 0, board.width, board.height);

        velocityY += gravity;
        character.y = Math.max(character.y + velocityY, 0);
        context.drawImage(characterImg, character.x, character.y, character.width, character.height);

        if (character.y > board.height) {
            gameOver = true;
        }

        for (let i = 0; i < pipeArray.length; i++) {
            let pipe = pipeArray[i];
            pipe.x += velocityX;
            context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

            // YENİ: Hitbox'ın pozisyonunu resimle birlikte güncelle
            pipe.hitbox.x = pipe.x + HITBOX_OFFSET_X;
            
            // YENİ: GÖRÜNÜR HITBOX'I ÇİZ (Ayarlama için)
            context.fillStyle = "rgba(255, 0, 0, 0.5)"; // Yarı saydam kırmızı
            //context.fillRect(pipe.hitbox.x, pipe.hitbox.y, pipe.hitbox.width, pipe.hitbox.height);

            if (!pipe.passed && character.x > pipe.x + pipe.width) {
                score += 0.5;
                pipe.passed = true;
            }

            // DEĞİŞTİRİLDİ: Çarpışmayı artık resimle değil, hitbox ile kontrol et
            if (detectCollision(character, pipe.hitbox)) {
                gameOver = true;
            }
        }

        while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
            pipeArray.shift();
        }

        context.fillStyle = "white";
        context.font = "45px sans-serif";
        context.fillText(score, 5, 45);

        if (gameOver) {
            context.fillText("OYUN BİTTİ", 55, 300);
            context.font = "20px sans-serif";
            context.fillText("Tekrar Oynamak İçin Tıkla", 65, 340);
        }
    }
    
    function placePipes() {
        if (gameOver) return;

        let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
        let openingSpace = board.height / 4;

        let topPipe = {
            img: topPipeImg,
            x: pipeX,
            y: randomPipeY,
            width: pipeWidth,
            height: pipeHeight,
            passed: false,
            // YENİ: Üst duvar için hitbox oluştur
            hitbox: {
                x: pipeX + HITBOX_OFFSET_X,
                y: randomPipeY + TOP_PIPE_HITBOX_OFFSET_Y,
                width: HITBOX_WIDTH,
                height: TOP_PIPE_HITBOX_HEIGHT
            }
        }
        pipeArray.push(topPipe);

        let bottomPipe = {
            img: bottomPipeImg,
            x: pipeX,
            y: randomPipeY + pipeHeight + openingSpace,
            width: pipeWidth,
            height: pipeHeight,
            passed: false,
            // YENİ: Alt duvar için hitbox oluştur
            hitbox: {
                x: pipeX + HITBOX_OFFSET_X,
                y: randomPipeY + pipeHeight + openingSpace + BOTTOM_PIPE_HITBOX_OFFSET_Y,
                width: HITBOX_WIDTH,
                height: BOTTOM_PIPE_HITBOX_HEIGHT
            }
        }
        pipeArray.push(bottomPipe);
    }
    
    function moveCharacter(e) {
        if (e.code == "Space" || e.type === "mousedown") {
            velocityY = -4;
            if (gameOver) {
                character.y = characterY;
                pipeArray = [];
                score = 0;
                gameOver = false;
            }
        }
    }

    // Bu fonksiyon değişmedi, çünkü artık doğrudan hitbox'ı kontrol ediyor.
    function detectCollision(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    }
}