const propertyPhotos = [
  "assets/images/WhatsApp-Image-2024-10-09-at-9.08.15-AM-1.jpeg",
  "assets/images/WhatsApp-Image-2024-10-09-at-9.08.17-AM-1.jpeg",
  "assets/images/WhatsApp-Image-2024-10-09-at-9.08.18-AM-2.jpeg",
  "assets/images/WhatsApp-Image-2024-10-09-at-9.08.19-AM-1.jpeg",
  "assets/images/WhatsApp-Image-2024-10-09-at-9.08.19-AM.jpeg",
  "assets/images/WhatsApp-Image-2024-10-09-at-9.08.20-AM-1.jpeg",
  "assets/images/WhatsApp-Image-2024-10-09-at-9.08.21-AM-2.jpeg",
  "assets/images/WhatsApp-Image-2024-10-09-at-9.08.22-AM-1.jpeg",
  "assets/images/WhatsApp-Image-2024-10-09-at-9.08.25-AM-1.jpeg",
  "assets/images/WhatsApp-Image-2024-10-09-at-9.08.26-AM-2.jpeg",
  "assets/images/WhatsApp-Image-2024-10-09-at-9.08.30-AM-1.jpeg",
  "assets/images/WhatsApp-Image-2024-10-09-at-9.08.32-AM-2.jpeg",
];

const fallbackPhoto = "assets/images/WhatsApp-Image-2024-10-09-at-9.08.15-AM-1.jpeg";

const roomTypes = [
  {
    name: "Mountain Deluxe",
    description: "Ideal for couples and scenic travelers looking for privacy and views.",
    price: "INR 3,200 / night",
    image: propertyPhotos[3],
  },
  {
    name: "Family Suite",
    description: "Spacious setup for families with relaxed seating and extra comfort.",
    price: "INR 4,600 / night",
    image: propertyPhotos[9],
  },
  {
    name: "Cozy Standard",
    description: "Practical and warm stay option for short getaways and solo trips.",
    price: "INR 2,800 / night",
    image: propertyPhotos[5],
  },
];

const page = document.body.dataset.page;
const hero = document.querySelector(".hero");
const galleryGrid = document.getElementById("galleryGrid");
const roomsGrid = document.getElementById("roomsGrid");
const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

const highlightActiveNav = () => {
  const nav = document.querySelector(`[data-nav="${page}"]`);
  if (nav) nav.classList.add("active");
};

const setHeroBackground = (url) => {
  if (!hero) return;
  hero.style.setProperty(
    "--hero-bg",
    `linear-gradient(rgba(16,25,27,0.26), rgba(16,25,27,0.62)), url("${url}") center/cover`
  );
};

const rotateHero = () => {
  if (!hero) return;
  let index = 0;
  setHeroBackground(propertyPhotos[index]);
  setInterval(() => {
    index = (index + 1) % 6;
    setHeroBackground(propertyPhotos[index]);
  }, 4500);
};

const openLightbox = (src) => {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = src;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
};

const setImageFallbacks = () => {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("error", () => {
      if (img.src !== fallbackPhoto) {
        img.src = fallbackPhoto;
      }
    });
  });
};

const closeLightboxDialog = () => {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
};

const setupLightbox = () => {
  if (!lightbox || !closeLightbox) return;
  closeLightbox.addEventListener("click", closeLightboxDialog);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightboxDialog();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightboxDialog();
  });
};

const buildGallery = () => {
  if (!galleryGrid) return;
  const fragment = document.createDocumentFragment();
  propertyPhotos.forEach((src, i) => {
    const tile = document.createElement("figure");
    tile.className = "photo-tile";
    tile.innerHTML = `<img src="${src}" alt="Rangri Homestay Manali photo ${i + 1}" loading="lazy" />`;
    if (lightbox) tile.addEventListener("click", () => openLightbox(src));
    fragment.appendChild(tile);
  });
  galleryGrid.appendChild(fragment);
};

const buildRooms = () => {
  if (!roomsGrid) return;
  const fragment = document.createDocumentFragment();
  roomTypes.forEach((room) => {
    const card = document.createElement("article");
    card.className = "room-card";
    card.innerHTML = `
      <img src="${room.image}" alt="${room.name} at Rangri Homestay" loading="lazy" />
      <div class="room-card-body">
        <h3>${room.name}</h3>
        <p>${room.description}</p>
        <div class="price-line">
          <span>${room.price}</span>
          <a href="booking.html" class="btn btn-glass">Select</a>
        </div>
      </div>
    `;
    fragment.appendChild(card);
  });
  roomsGrid.appendChild(fragment);
};

const animateCounters = () => {
  const counters = document.querySelectorAll(".metric strong");
  const metricWrapper = document.getElementById("metrics");
  if (!metricWrapper || counters.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        counters.forEach((counter) => {
          const target = Number(counter.dataset.target);
          let current = 0;
          const step = Math.max(1, Math.ceil(target / 36));
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            counter.textContent = String(current);
          }, 36);
        });
        observer.disconnect();
      });
    },
    { threshold: 0.4 }
  );
  observer.observe(metricWrapper);
};

const revealOnScroll = () => {
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );
  revealEls.forEach((el) => observer.observe(el));
};

const setupBookingForm = () => {
  if (!bookingForm || !formMessage) return;
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const checkin = formData.get("checkin");
    const checkout = formData.get("checkout");
    const roomRate = Number(formData.get("roomType"));

    const start = new Date(checkin);
    const end = new Date(checkout);
    const nights = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    if (nights <= 0) {
      formMessage.style.color = "#b33f20";
      formMessage.textContent = "Please select a valid check-out date after check-in.";
      return;
    }

    const estimate = nights * roomRate;
    formMessage.style.color = "#1f4f40";
    formMessage.textContent = `${name}, ${nights} night(s) estimated total is INR ${estimate.toLocaleString(
      "en-IN"
    )}. We will contact you on ${phone} to confirm availability.`;
    bookingForm.reset();
  });
};

highlightActiveNav();
rotateHero();
buildGallery();
buildRooms();
setupLightbox();
setImageFallbacks();
animateCounters();
revealOnScroll();
setupBookingForm();
