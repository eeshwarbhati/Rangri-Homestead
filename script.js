const propertyPhotos = [
  "https://thehomestay.co.in/wp-content/uploads/2024/07/3fce4f7f-a2a5-426f-a571-8e420f1f4a1f.jpg",
  "https://thehomestay.co.in/wp-content/uploads/2024/07/6b53917d-fdb4-48f7-bde6-c4db40f4adf4.jpg",
  "https://thehomestay.co.in/wp-content/uploads/2024/07/4d06195a-a2ee-48de-a604-c6a0cb6c060f.jpg",
  "https://thehomestay.co.in/wp-content/uploads/2024/07/f9e8bb97-83ae-4bcc-adf0-1e53f8fc95f5.jpg",
  "https://thehomestay.co.in/wp-content/uploads/2024/07/b4f73db5-18fe-49be-80f4-4f0c844f8b58.jpg",
  "https://thehomestay.co.in/wp-content/uploads/2024/07/2a3002f1-f7a2-4d9c-99b0-dccffb6fca37.jpg",
  "https://thehomestay.co.in/wp-content/uploads/2024/07/1427628f-c8d4-49d2-ba70-e273fbbf3694.jpg",
  "https://thehomestay.co.in/wp-content/uploads/2024/07/050a4ecb-57b8-43fd-8cd2-bde2ab7f3832.jpg",
  "https://thehomestay.co.in/wp-content/uploads/2024/07/f86ce899-c99f-4c1e-b173-7f4db40aca9f.jpg",
  "https://thehomestay.co.in/wp-content/uploads/2024/07/ace3d83f-fb6c-4b4f-952e-fdef78f39e8d.jpg",
  "https://thehomestay.co.in/wp-content/uploads/2024/07/47be9ead-cfbf-48a8-b537-5e67848f1238.jpg",
  "https://thehomestay.co.in/wp-content/uploads/2024/07/bb8bbe3a-b9e8-4694-a2f8-90e75f66110c.jpg",
  "https://thehomestay.co.in/wp-content/uploads/2024/07/b246f8a7-5612-40f0-b3ca-c55f32d53ffa.jpg",
  "https://thehomestay.co.in/wp-content/uploads/2024/07/0b2c3b98-f8a9-43ca-b725-66cf09ee5681.jpg",
  "https://thehomestay.co.in/wp-content/uploads/2024/07/2d63f31d-f8dc-4b9f-85ca-15c82e1b8757.jpg",
  "https://thehomestay.co.in/wp-content/uploads/2024/07/9adee4ec-8f5c-4379-9eec-2f8ea88d5906.jpg",
  "https://thehomestay.co.in/wp-content/uploads/2024/07/52c82e89-c53d-49ea-9f95-f001145213dc.jpg",
];

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
animateCounters();
revealOnScroll();
setupBookingForm();
