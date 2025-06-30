document.addEventListener("DOMContentLoaded", function () {
  /* ========================
     NAVIGASI DROPDOWN GALERI
  ========================= */
  const galleryBtn = document.getElementById("galleryBtn");
  const galleryModal = document.getElementById("galleryModal");
  const closeModal = document.getElementById("closeModal");
  const galleryArrow = document.getElementById("galleryArrow");

  if (galleryBtn && galleryModal && closeModal && galleryArrow) {
    galleryBtn.addEventListener("click", () => {
      const isOpen = galleryModal.style.display === "block";
      galleryModal.style.display = isOpen ? "none" : "block";
      galleryArrow.textContent = isOpen ? "▼" : "▲";
    });

    closeModal.addEventListener("click", () => {
      galleryModal.style.display = "none";
      galleryArrow.textContent = "▼";
    });

    window.addEventListener("click", (e) => {
      if (
        !galleryModal.contains(e.target) &&
        e.target !== galleryBtn &&
        !galleryBtn.contains(e.target)
      ) {
        galleryModal.style.display = "none";
        galleryArrow.textContent = "▼";
      }
    });

    window.addEventListener("scroll", () => {
      galleryModal.style.display = "none";
      galleryArrow.textContent = "▼";
    });
  }

  /* ========================
     SLIDER TESTIMONIAL INDEX
  ========================= */
  const slider = document.getElementById("testimonialSlider");
  let currentIndex = 0;

  window.scrollSlider = function (direction) {
    if (!slider) return;

    const cards = slider.querySelectorAll(".testimonial-card");
    const maxIndex = cards.length - 3; // tampilkan 3 kartu sekaligus
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const cardWidth = cards[0].offsetWidth + 16; // termasuk gap
    slider.scrollTo({
      left: currentIndex * cardWidth,
      behavior: "smooth",
    });
  };

  /* ========================
     NEWSLETTER MODAL
  ========================= */
  const newsletterButton = document.getElementById("newsletterButton");
  const newsletterEmail = document.getElementById("newsletterEmail");
  const successModal = document.getElementById("successModal");
  const errorModal = document.getElementById("errorModal");
  const closeButtons = document.querySelectorAll(".close-modal");

  if (newsletterButton && newsletterEmail) {
    newsletterButton.addEventListener("click", function (event) {
      event.preventDefault();
      const email = newsletterEmail.value.trim();

      if (email.includes("@")) {
        showModal(successModal);
        newsletterEmail.value = "";
      } else {
        showModal(errorModal);
      }
    });
  }

  function showModal(modal) {
    if (!modal) return;
    modal.style.display = "block";
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);
  }

  function hideModal(modal) {
    if (!modal) return;
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
    }, 200);
  }

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const modal = this.closest(".modal");
      hideModal(modal);
    });
  });

  window.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal")) {
      hideModal(event.target);
    }
  });

  /* ========================
     PESAN SEKARANG
  ========================= */
  document.querySelectorAll(".add-control").forEach((container) => {
    const addBtn = container.querySelector(".add-btn");
    const counterWrapper = container.querySelector(".counter-wrapper");
    const decrementBtn = container.querySelector(".decrement");
    const incrementBtn = container.querySelector(".increment");
    const counterNumber = container.querySelector(".counter-number");

    if (
      !addBtn ||
      !counterWrapper ||
      !decrementBtn ||
      !incrementBtn ||
      !counterNumber
    ) {
      console.warn("Elemen tidak lengkap di salad-card:", container);
      return;
    }

    let count = 1;

    addBtn.addEventListener("click", () => {
      addBtn.classList.add("hidden");
      counterWrapper.classList.remove("hidden");
      count = 1;
      counterNumber.textContent = count;
    });

    incrementBtn.addEventListener("click", () => {
      count++;
      counterNumber.textContent = count;
    });

    decrementBtn.addEventListener("click", () => {
      if (count > 1) {
        count--;
        counterNumber.textContent = count;
      } else {
        count = 1;
        counterWrapper.classList.add("hidden");
        addBtn.classList.remove("hidden");
      }
    });
  });

  // ========================================
  // ============ ORDER FORM JS ============
  // ========================================

  /* ----------------------------------------
   A. INISIALISASI ELEMENT
---------------------------------------- */
  const form = document.getElementById("orderForm");

  const step1Section = document.querySelectorAll(".hero-menu-order")[0];
  const step2Section = document.getElementById("step-2-section");
  const step3Section = document.getElementById("step-3-section");

  const step1Indicators = step1Section.querySelectorAll(
    ".step-indicator .step"
  );
  const step2Indicators = step2Section.querySelectorAll(
    ".step-indicator .step"
  );
  const step1Lines = step1Section.querySelectorAll(".step-indicator .line");
  const step2Lines = step2Section.querySelectorAll(".step-indicator .line");

  const saladNameEl = document.getElementById("saladName");
  const saladDescEl = document.getElementById("saladDesc");
  const saladImageEl = document.getElementById("saladImage");
  const saladBenefitsEl = document.getElementById("saladBenefits");

  const hargaEl = document.getElementById("hargaSalad");
  const kodeUnikEl = document.getElementById("kodeUnik");
  const totalHargaEl = document.getElementById("totalHarga");

  const submitButtonContainer = document.getElementById(
    "submitButtonContainer"
  );
  const rekeningBCA = document.getElementById("rekeningBCA");
  const rekeningBRI = document.getElementById("rekeningBRI");
  const qrisImage = document.getElementById("qrisImage");
  const btnSudahBayar = document.getElementById("btnSudahBayar");

  const statusText = document.getElementById("statusText");
  const loadingDots = document.getElementById("loadingDots");
  const checkingInfo = document.getElementById("checkingInfo");
  const paymentTitle = document.getElementById("paymentTitle");
  const doneButtonWrapper = document.getElementById("doneButtonWrapper");

  /* ----------------------------------------
   B. DATA SALAD
---------------------------------------- */
  const saladData = {
    "Tropical Mango": {
      desc: "Romaine, Mangga, Alpukat, Timun, Paprika, Ayam Grilled, Lime Vinaigrette",
      img: "images/order/menu.jpg",
      benefit: "Vitamin C tinggi, baik untuk imun & kulit.",
    },
    "Berry Bliss": {
      desc: "Strawberry, Blueberry, Bayam Muda, Kacang Almond, Feta Cheese, Raspberry Dressing",
      img: "images/order/menu.jpg",
      benefit: "Antioksidan tinggi, baik untuk jantung & kulit.",
    },
    "Green Detox": {
      desc: "Kale, Bayam, Edamame, Brokoli, Apel Hijau, Lemon Dressing",
      img: "images/order/menu.jpg",
      benefit: "Mendetoks tubuh & bantu pencernaan.",
    },
    "Citrus Crunch": {
      desc: "Iceberg, Jeruk Mandarin, Wortel, Kacang Kenari, Ayam Madu, Sesame Dressing",
      img: "images/order/menu.jpg",
      benefit: "Baik untuk mata & sumber serat.",
    },
    "Sunrise Papaya": {
      desc: "Lettuce, Pepaya, Nanas, Timun, Daun Mint, Greek Yogurt Sauce",
      img: "images/order/menu.jpg",
      benefit: "Melancarkan pencernaan & segarkan tubuh.",
    },
    "Avocado Ranch": {
      desc: "Romaine, Alpukat, Tomat Cherry, Jagung Manis, Ayam Panggang, Ranch Dressing",
      img: "images/order/menu.jpg",
      benefit: "Lemak sehat & tinggi protein.",
    },
    "Classic Caesar": {
      desc: "Romaine, Croutons, Parmesan, Caesar Dressing, Chicken Breast",
      img: "images/order/menu.jpg",
      benefit: "Kaya protein & isi mengenyangkan.",
    },
    "Dragonfruit Glow": {
      desc: "Mix Lettuce, Dragonfruit, Apel Merah, Biji Chia, Sunflower Seeds, Honey Lime Dressing",
      img: "images/order/menu.jpg",
      benefit: "Energi booster & bantu metabolisme.",
    },
  };

  /* ----------------------------------------
   C. FUNGSI RENDER PREVIEW SALAD
---------------------------------------- */
  function showSaladPreview(saladKey) {
    const data = saladData[saladKey];
    if (data) {
      saladNameEl.textContent = saladKey;
      saladDescEl.textContent = data.desc;
      saladImageEl.src = data.img;
      saladImageEl.alt = saladKey;
      saladBenefitsEl.textContent = data.benefit;
    } else {
      saladNameEl.textContent = "Nama Salad";
      saladDescEl.textContent = "Isi salad akan muncul di sini";
      saladImageEl.src = "images/menu/menu.jpg";
      saladImageEl.alt = "Salad";
      saladBenefitsEl.textContent = "-";
    }
  }

  /* ----------------------------------------
   D. HITUNG HARGA
---------------------------------------- */
  function generateKodeUnik() {
    return Math.floor(Math.random() * 900) + 100; // 100–999
  }

  function updateHarga() {
    const hargaDasar = 45000;
    const kode = generateKodeUnik();
    const total = hargaDasar + kode;

    hargaEl.textContent = "Rp 45.000";
    kodeUnikEl.textContent = kode;
    totalHargaEl.textContent = "Rp " + total.toLocaleString("id-ID");
  }

  /* ----------------------------------------
   E. VALIDASI DAN LANJUT STEP 2
---------------------------------------- */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;
    const fields = [
      { id: "name", msg: "Nama wajib diisi" },
      { id: "whatsapp", msg: "Nomor WhatsApp wajib diisi" },
      { id: "address", msg: "Alamat wajib diisi" },
      { id: "salad", msg: "Silakan pilih salad" },
    ];

    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      const error = document.getElementById(`error-${field.id}`);
      if (!input.value.trim()) {
        error.textContent = field.msg;
        error.style.display = "block";
        valid = false;
      } else {
        error.textContent = "";
        error.style.display = "none";
      }
    });

    if (valid) {
      const selectedSalad = document.getElementById("salad").value;
      showSaladPreview(selectedSalad);
      updateHarga();

      step1Section.classList.add("hidden");
      step2Section.classList.remove("hidden");

      step1Indicators[1].classList.add("active");
      step1Lines[0].classList.add("active");
      step2Indicators[1].classList.add("active");
      step2Lines[0].classList.add("active");
    }
  });

  /* ----------------------------------------
   F. TOMBOL KEMBALI KE STEP 1
---------------------------------------- */
  document.getElementById("kembaliStep1").addEventListener("click", () => {
    step2Section.classList.add("hidden");
    step1Section.classList.remove("hidden");

    step1Indicators[1].classList.remove("active");
    step1Lines[0].classList.remove("active");
    step2Indicators[1].classList.remove("active");
    step2Lines[0].classList.remove("active");
  });

  /* ----------------------------------------
   G. PILIHAN METODE PEMBAYARAN (RADIO)
---------------------------------------- */
  let lastChecked = null;
  const metodeRadios = document.querySelectorAll("input[name='metode']");

  metodeRadios.forEach((radio) => {
    radio.addEventListener("click", function () {
      if (lastChecked === this) {
        // Uncheck dan reset tampilan
        this.checked = false;
        lastChecked = null;

        rekeningBCA.style.display = "none";
        rekeningBRI.style.display = "none";
        qrisImage.style.display = "none";
        submitButtonContainer.style.display = "none";
      } else {
        lastChecked = this;

        const metode = this.value;
        rekeningBCA.style.display = metode === "BCA" ? "block" : "none";
        rekeningBRI.style.display = metode === "BRI" ? "block" : "none";
        qrisImage.style.display = metode === "QRIS" ? "block" : "none";

        submitButtonContainer.style.display = "flex";
      }
    });
  });

  /* ----------------------------------------
   H. KONFIRMASI PEMBAYARAN & STEP 3
---------------------------------------- */
  btnSudahBayar.addEventListener("click", () => {
    step2Section.classList.add("hidden");
    step3Section.classList.remove("hidden");

    // Simulasi cek pembayaran
    setTimeout(() => {
      loadingDots.style.display = "none";
      checkingInfo.style.display = "none";
      paymentTitle.textContent = "Pembayaran Berhasil!";
      statusText.textContent =
        "Selanjutnya, silakan cek pesan WhatsApp Anda untuk menerima invoice dan memantau status pesanan.";

      // Tampilkan tombol selesai
      doneButtonWrapper.style.display = "block";
    }, 10000); // 10 detik
  });
});
