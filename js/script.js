// document.addEventListener("DOMContentLoaded", function () {
//   var swiper = new Swiper(".mySwiper", {
//     effect: "coverflow",
//     grabCursor: true,
//     centeredSlides: true,
//     slidesPerView: "auto",
//     coverflowEffect: {
//       rotate: 0,
//       stretch: 0,
//       depth: 300,
//       modifier: 1,
//       slideShadows: false,
//     },
//     pagination: {
//       el: ".swiper-pagination",
//     },
//     autoplay: {
//       delay: 1000,
//       disableOnInteraction: false,
//     },
//     loop: true, // Enable continuous loop
//     loopedSlides: 3, // Adjust this to match how many slides should be duplicated
//     loopAdditionalSlides: 3, // Ensures proper duplication for smooth looping
//   });

//   // Pause autoplay on hover
//   var swiperContainer = document.querySelector(".mySwiper");
//   swiperContainer.addEventListener("mouseenter", function () {
//     swiper.autoplay.stop(); // Stop autoplay when hovering
//   });
//   swiperContainer.addEventListener("mouseleave", function () {
//     swiper.autoplay.start(); // Resume autoplay when hover ends
//   });
// });

/*
=================================================
? => Pop up form Toggle js :----
=================================================
*/

const formModal = document.getElementById("form_modal");
const openFormModalBtn = document.querySelectorAll(".form_popup");
const formToggleBtn = document.getElementById("toggle_btn_form");

// console.log(openFormModalBtn);

formToggleBtn.addEventListener("click", () => {
  formModal.classList.remove("active");
});

openFormModalBtn.forEach((el) => {
  el.addEventListener("click", () => {
    formModal.classList.add("active");
  });
});

/*
=================================================
? => Navbar Toggle js :----
=================================================
*/
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const dropdown = document.querySelector(".dropdown-content");
  const navMenu = document.querySelector(".nav-menu");
  const toggleImg = document.getElementById("toggle_img");

  // Toggle menu
  menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    toggleImg.src = navMenu.classList.contains("active")
      ? "./images/close.svg"
      : "./images/more.svg";
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      navMenu.classList.remove("active");
      toggleImg.src = "./images/more.svg";
    }
  });

  // Handle clicks on nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    const hasDropdown =
      !!link.nextElementSibling &&
      link.nextElementSibling.classList.contains("dropdown-content");

    link.addEventListener("click", (e) => {
      if (hasDropdown) {
        // Prevent navbar from closing if the link has a dropdown
        e.preventDefault();

        const dropdown = link.nextElementSibling;
        const arrow = link.querySelector(".dropdown-arrow");

        // Toggle dropdown visibility
        arrow.classList.toggle("active");
        dropdown.style.maxHeight = dropdown.style.maxHeight
          ? null
          : dropdown.scrollHeight + "px";
      } else {
        // Close the navbar for normal links
        navMenu.classList.remove("active");
        toggleImg.src = "./images/more.svg";
      }
    });
  });

  // Close menu when a dropdown item is clicked
  document.querySelectorAll(".dropdown-content a").forEach((dropdownItem) => {
    dropdownItem.addEventListener("click", () => {
      navMenu.classList.remove("active");
      toggleImg.src = "./images/more.svg";
      dropdown.style.maxHeight = null;
    });
  });
});
// ----------navbar end ---------

// ================slider

const slider = document.getElementById("slider");
const mainImage = document.querySelector(".fade-image");
const cardWidth = slider.children[0].offsetWidth;
let isAnimating = false;

// Function to update main image with fade effect
function updateMainImage(newSrc) {
  mainImage.classList.add("fade-out");
  setTimeout(() => {
    mainImage.src = newSrc;
    mainImage.classList.remove("fade-out");
  }, 300);
}

// Function to update active card
function updateActiveCard() {
  const cards = document.querySelectorAll(".card_small");
  cards.forEach((card) => card.classList.remove("active"));
  cards[2].classList.add("active"); // Middle card is always active
}

// Handle card click with fade effect
function handleCardClick(e) {
  if (isAnimating) return;
  console.log(e);
  const clickedCard = e.currentTarget;
  const cards = Array.from(slider.children);
  const clickedIndex = cards.indexOf(clickedCard);
  const middleIndex = Math.floor(cards.length / 2);

  // Update main image
  const newImageSrc = clickedCard.querySelector("img").src;
  updateMainImage(newImageSrc);

  if (clickedIndex === middleIndex) return;

  isAnimating = true;

  if (clickedIndex > middleIndex) {
    moveSliderForward();
  } else if (clickedIndex < middleIndex) {
    moveSliderBackward();
  }
}

// Function to move slider forward
function moveSliderForward() {
  slider.style.transition = "transform 0.5s ease";
  slider.style.transform = `translateX(-${cardWidth}px)`;

  setTimeout(() => {
    slider.style.transition = "none";
    slider.style.transform = "translateX(0)";
    slider.appendChild(slider.children[0]);
    isAnimating = false;
    updateActiveCard();
  }, 500);
}

// Function to move slider backward
function moveSliderBackward() {
  slider.style.transition = "transform 0.5s ease";
  slider.style.transform = `translateX(${cardWidth}px)`;

  setTimeout(() => {
    slider.style.transition = "none";
    slider.style.transform = "translateX(0)";
    slider.prepend(slider.children[slider.children.length - 1]);
    isAnimating = false;
    updateActiveCard();
  }, 500);
}

// Add click event listeners to all cards
function addCardListeners() {
  const cards = document.querySelectorAll(".card_small");
  cards.forEach((card) => {
    card.addEventListener("click", handleCardClick);
  });
}

// Handle navigation buttons
document.querySelector(".prev").addEventListener("click", () => {
  if (isAnimating) return;
  isAnimating = true;

  // Update main image to the previous image
  const prevImage = slider.children[1].querySelector("img").src;
  updateMainImage(prevImage);
  moveSliderBackward();
});

document.querySelector(".next").addEventListener("click", () => {
  if (isAnimating) return;
  isAnimating = true;

  // Update main image to the next image
  const nextImage = slider.children[3].querySelector("img").src;
  updateMainImage(nextImage);
  moveSliderForward();
});

// autoslide
setInterval(() => {
  if (isAnimating) return;
  isAnimating = true;

  // Update main image to the next image
  const nextImage = slider.children[3].querySelector("img").src;
  updateMainImage(nextImage);
  moveSliderForward();
}, 4000);

// Initialize card listeners
addCardListeners();
updateActiveCard(); // Set initial active card

// -------job slider -------

const track = document.getElementById("carousel-track");
// let isAnimating = false;
let autoSlideInterval;
let pauseAutoSlide = false;

// Function to calculate card width based on viewport
function getCardWidth() {
  const viewportWidth = window.innerWidth;
  const track = document.getElementById("carousel-track");
  if (!track.children.length) return 0;

  return (
    track.children[0].offsetWidth +
    (viewportWidth > 992
      ? 38 // Desktop gap
      : viewportWidth > 576
      ? 30 // Tablet gap
      : 20)
  ); // Mobile gap
}

function moveTrackForward() {
  if (isAnimating) return;
  isAnimating = true;
  const cardWidth = getCardWidth();

  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${cardWidth}px)`;

  setTimeout(() => {
    track.style.transition = "none";
    track.style.transform = "translateX(0)";
    track.appendChild(track.children[0]);
    isAnimating = false;
  }, 500);
}

function moveTrackBackward() {
  if (isAnimating) return;
  isAnimating = true;
  const cardWidth = getCardWidth();

  track.style.transition = "none";
  track.insertBefore(
    track.children[track.children.length - 1],
    track.children[0]
  );
  track.style.transform = `translateX(-${cardWidth}px)`;

  setTimeout(() => {
    track.style.transition = "transform 0.5s ease";
    track.style.transform = "translateX(0)";
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }, 0);
}

// Auto slide functionality
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    if (!pauseAutoSlide && !isAnimating) {
      moveTrackForward();
    }
  }, 3000);
}

function resetAutoSlideTimer() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Event Listeners
document.querySelector(".carousel-prev").addEventListener("click", () => {
  resetAutoSlideTimer();
  moveTrackBackward();
});

document.querySelector(".carousel-next").addEventListener("click", () => {
  resetAutoSlideTimer();
  moveTrackForward();
});

track.addEventListener("mouseenter", () => (pauseAutoSlide = true));
track.addEventListener("mouseleave", () => (pauseAutoSlide = false));

// Handle window resize
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    track.style.transition = "none";
    track.style.transform = "translateX(0)";
  }, 250);
});

// Start the carousel
startAutoSlide();

/* 
==========================================================
? => Modal Functionality 
========================================================== 

 */

//open modal
function openModal(modalId) {
  // document.body.style.overflow = "hidden";
  const backdrop = document.getElementById(`${modalId}-backdrop`);
  const container = document.getElementById(`${modalId}-container`);
  const modalWrapper = container.querySelector(".modal-wrapper");

  // Remove hiding class if present
  backdrop.classList.remove("hiding");
  container.classList.remove("hiding");

  // Show modal
  backdrop.classList.add("show");
  container.classList.add("show");

  // Add click event listener to the modal wrapper
  modalWrapper.addEventListener("click", (event) => {
    // If clicked element is the modal wrapper (the outer area)
    if (event.target === modalWrapper) {
      closeModal(modalId);
    }
  });
}

//close modal
function closeModal(modalId) {
  const backdrop = document.getElementById(`${modalId}-backdrop`);
  const container = document.getElementById(`${modalId}-container`);

  // Add hiding class for close animation
  backdrop.classList.add("hiding");
  container.classList.add("hiding");

  // Remove show class after animation
  setTimeout(() => {
    backdrop.classList.remove("show");
    container.classList.remove("show");
    backdrop.classList.remove("hiding");
    container.classList.remove("hiding");
    document.body.style.overflow = "unset";
  }, 300);
}

//? Popup :--

// document.addEventListener("DOMContentLoaded", function () {
//   // ====== DOM Elements ======
//   const calendarDays = document.getElementById("popup_cal_calendar-days");
//   const currentMonthDisplay = document.getElementById(
//     "popup_cal_current-month"
//   );
//   const prevMonthBtn = document.getElementById("popup_cal_prev-month");
//   const nextMonthBtn = document.getElementById("popup_cal_next-month");
//   const selectedDateDisplay = document.querySelectorAll(
//     ".popup_cal_selected-date"
//   );
//   const timeSlots = document.querySelectorAll(".popup_cal_time-slot");
//   const timeSlotSelected = document.querySelector(
//     ".popup_cal_time-slot-selected"
//   );
//   const timeSelectedBtns = document.querySelectorAll(
//     ".popup_cal_time-slot-selected"
//   );
//   const timeDisplay = document.querySelector(".time_display");
//   const calenderArea = document.querySelector(".popup_cal_right-panel");
//   const nextBtns = document.querySelectorAll(".popup_cal_next-button");
//   const modalForm = document.querySelector(".popupForm");
//   const previousBtn = document.querySelector(".previous_btn_popup");
//   const addGuestBtn = document.querySelector(".add_guest");
//   const addGuestInput = document.getElementById("add_guestInput");
//   const dateInput = document.querySelector('.selected_date_Input');
//   const timeInput = document.querySelector('.selected_time_Input')

//   // ====== Time Slot Selection ======
//   timeSelectedBtns.forEach((btn) => {
//     btn.addEventListener("click", function () {
//       timeSelectedBtns.forEach((button) => button.classList.remove("active"));
//       this.classList.add("active");
//       timeDisplay.textContent = `${btn.textContent}`;
//       timeInput.value = `${btn.textContent}`

//       // console.log(timeInput.value)

//     });
//   });

//   // ====== Navigation Buttons ======
//   nextBtns.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       calenderArea.style.display = "none";
//       modalForm.classList.add("active");
//       previousBtn.style.display = "flex";

//    selectedDateDisplay.forEach((el,i)=>{
//         if(i=== 0){
//           // console.log(el.textContent)
//           dateInput.value = `${el.textContent}`;

//         }
//       })
//     });
//   });

//   previousBtn.addEventListener("click", () => {
//     calenderArea.style.display = "flex";
//     modalForm.classList.remove("active");
//     previousBtn.style.display = "none";
//   });

//   // ====== Add Guest Input ======
//   addGuestBtn.addEventListener("click", () => {
//     addGuestBtn.style.display = "none";
//     addGuestInput.style.display = "flex";
//   });

//   // ====== Display Current Date ======
//   const currentDate = new Date();
//   const options = { weekday: "long", month: "long", day: "numeric" };
//   selectedDateDisplay.forEach((el) => {
//     el.textContent = currentDate.toLocaleDateString("en-US", options);
//   });

//   // ====== Calendar Variables ======
//   const today = new Date();
//   let currentMonth = today.getMonth();
//   let currentYear = today.getFullYear();
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   // ====== Render Calendar ======
//   function renderCalendar() {
//     const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
//     const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

//     currentMonthDisplay.textContent = `${months[currentMonth]} ${currentYear}`;
//     calendarDays.innerHTML = "";

//     // Add empty slots for days before the first of the month
//     for (let i = 0; i < (firstDayOfMonth + 6) % 7; i++) {
//       const emptyDay = document.createElement("div");
//       emptyDay.classList.add("popup_cal_day", "popup_cal_disabled");
//       calendarDays.appendChild(emptyDay);
//     }

//     // Add the days of the month
//     for (let day = 1; day <= daysInMonth; day++) {
//       const dayElement = document.createElement("div");
//       dayElement.classList.add("popup_cal_day");
//       dayElement.textContent = day;

//       const currentDate = new Date(currentYear, currentMonth, day);
//       const isBeforeToday = currentDate < new Date().setHours(0, 0, 0, 0);
//       const isSunday = currentDate.getDay() === 0;

//       // Disable past dates and Sundays
//       if (isBeforeToday || isSunday) {
//         dayElement.classList.add("popup_cal_disabled");
//         if (isSunday) {
//           dayElement.classList.add("popup_cal_sunday");
//         }
//       } else {
//         dayElement.addEventListener("click", () => {
//           document
//             .querySelectorAll(".popup_cal_day.popup_cal_selected")
//             .forEach((selectedDay) =>
//               selectedDay.classList.remove("popup_cal_selected")
//             );

//           dayElement.classList.add("popup_cal_selected");
//           const selectedDate = new Date(currentYear, currentMonth, day);

//           selectedDateDisplay.forEach((display) => {
//             display.textContent = selectedDate.toLocaleDateString("en-US", {
//               weekday: "long",
//               month: "long",
//               day: "numeric",
//             });
//           });
//         });
//       }

//       // Highlight and select today's date if it's selectable
//       if (
//         day === today.getDate() &&
//         currentMonth === today.getMonth() &&
//         currentYear === today.getFullYear() &&
//         !isSunday
//       ) {
//         dayElement.classList.add("popup_cal_today");
//         dayElement.classList.add("popup_cal_selected"); // Add selected class by default

//         // Set the selected date display to today's date
//         selectedDateDisplay.forEach((display) => {
//           display.textContent = today.toLocaleDateString("en-US", {
//             weekday: "long",
//             month: "long",
//             day: "numeric",
//           });
//         });
//       }

//       calendarDays.appendChild(dayElement);
//     }
//   }
//   // ====== Change Month ======
//   prevMonthBtn.addEventListener("click", () => {
//     currentMonth--;
//     if (currentMonth < 0) {
//       currentMonth = 11;
//       currentYear--;
//     }
//     renderCalendar();
//   });

//   nextMonthBtn.addEventListener("click", () => {
//     currentMonth++;
//     if (currentMonth > 11) {
//       currentMonth = 0;
//       currentYear++;
//     }
//     renderCalendar();
//   });

//   // ====== Time Slot Selection ======
//   timeSlots.forEach((timeSlot) => {
//     timeSlot.addEventListener("click", () => {
//       document
//         .querySelectorAll(".popup_cal_time-slot.popup_cal_selected")
//         .forEach((selectedSlot) =>
//           selectedSlot.classList.remove("popup_cal_selected")
//         );

//       timeSlot.classList.add("popup_cal_selected");
//       timeSlotSelected.textContent = timeSlot.textContent;
//     });
//   });

//   // Initial render
//   renderCalendar();
// });

//   let count = 0;
//   let Call_Back_NO = document.querySelector('#Call_Back_NO');
//   const onLeaveCard = document.querySelector('.OnLeaveCard');
//   const card = document.querySelector('.Card');

//   // Make sure the OnLeaveCard is initially hidden
//   onLeaveCard.style.display = "none";

//   // Listen for mouseleave event at the top of the page (clientY <= 0)
//   document.addEventListener('mouseleave', function (event) {
//     if (event.clientY <= 0 && count === 0) {
//       onLeaveCard.style.display = "flex";  // Show the OnLeaveCard
//       count = 1;  // Prevent showing the card again
//     }
//   });

//   // When user clicks outside the OnLeaveCard, hide it
//   document.addEventListener('click', function (event) {
//     if (onLeaveCard.style.display !== 'none') {
//       if (!card.contains(event.target)) {
//         onLeaveCard.style.display = 'none';
//         count = 1;
//       }
//     }
//   });

//   // No Thanks button functionality
//   document.querySelector('.close_calendly').addEventListener('click', (e) => {
//     e.preventDefault();
//     count = 1;  // Prevent the card from showing again
//     onLeaveCard.style.display = "none";
//   });

//   // Form submission - hide OnLeaveCard and increment count
//   Call_Back_NO.addEventListener('submit', (e) => {
//     // e.preventDefault();  // Uncomment if you want to handle form submission with JS
//     count = 1;
//     onLeaveCard.style.display = "none";
//   });

// Email handling functionality
const forms = [document.querySelector(".right_form")];

forms.forEach((form) => {
  if (!form) return;

  const emailInput = form.querySelector("#email-input");
  const emailContainer = form.querySelector("#email-container");

  if (!emailInput || !emailContainer) return;

  function handleEmailInput() {
    let email = emailInput.value.trim();
    email = email.replace(/[, ]$/, "");

    if (email) {
      if (validateEmail(email)) {
        addEmailChip(email, emailContainer);
        updateEmailInputValue(emailContainer, emailInput);
        emailInput.value = "";
      } else {
        showTooltip(emailInput, "Invalid email format!");
      }
    }
  }

  emailInput.addEventListener("keyup", function (event) {
    if (
      event.key === "Enter" ||
      event.key === "," ||
      event.key === " " ||
      emailInput.value.endsWith(",") ||
      emailInput.value.endsWith(" ")
    ) {
      handleEmailInput();
      event.preventDefault();
    }
  });

  emailInput.addEventListener("blur", handleEmailInput);

  emailContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("close-btn")) {
      const chip = event.target.parentElement;
      emailContainer.removeChild(chip);
    }
  });

  emailContainer.addEventListener(
    "blur",
    function (event) {
      if (event.target.classList.contains("email-chip")) {
        const email = event.target.textContent.replace("×", "").trim();
        if (validateEmail(email)) {
          event.target.innerHTML = `${email} <span class="close-btn">×</span>`;
          event.target.classList.remove("invalid-email");
        } else {
          emailContainer.removeChild(event.target);
        }
      }
    },
    true
  );

  emailContainer.addEventListener("keydown", function (event) {
    if (
      event.target.classList.contains("email-chip") &&
      event.key === "Enter"
    ) {
      event.target.blur();
      event.preventDefault();
    }
  });

  form.addEventListener("submit", function () {
    updateEmailInputValue(emailContainer, emailInput);
  });
});

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function addEmailChip(email, emailContainer) {
  const chip = document.createElement("div");
  chip.classList.add("email-chip");
  chip.setAttribute("contenteditable", "true");
  chip.innerHTML = `
        ${email}
        <span class="close-btn">×</span>
    `;
  emailContainer.prepend(chip);
}

function updateEmailInputValue(emailContainer, emailInput) {
  const chips = emailContainer.querySelectorAll(".email-chip");
  const emailList = Array.from(chips)
    .filter((chip) => validateEmail(chip.textContent.replace("×", "").trim()))
    .map((chip) => chip.textContent.replace("×", "").trim());

  emailInput.value = emailList.length > 0 ? emailList.join(", ") : "";
}

function showTooltip(inputElement, message) {
  const existingTooltip = inputElement.parentElement.querySelector(".tooltip");
  if (existingTooltip) existingTooltip.remove();

  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  tooltip.textContent = message;

  inputElement.parentElement.appendChild(tooltip);
  tooltip.style.top = `${inputElement.offsetTop + inputElement.offsetHeight}px`;
  tooltip.style.left = `${inputElement.offsetLeft}px`;

  setTimeout(() => {
    if (tooltip.parentElement) tooltip.remove();
  }, 3000);
}

// ?===Multistep form
const nextBtn = document.getElementById("next_btn");
const backBtn = document.querySelector(".back-btn");
const formWrapper = document.querySelector(".form-fields-wrapper");

// Next button click handler
nextBtn.addEventListener("click", function () {
  formWrapper.style.transform = "translateX(-50%)";
  backBtn.classList.add("visible");
});

// Back button click handler
backBtn.addEventListener("click", function () {
  formWrapper.style.transform = "translateX(0)";
  backBtn.classList.remove("visible");
});

// ?==== to feth country code

// function getIp(callback) {
//   fetch("ipinfo.io/140.82.183.34?token=66e2f39b20a2bd", {
//     headers: { Accept: "application/json" },
//   })
//     .then((resp) => resp.json())
//     .catch(() => {
//       return {
//         country: "us",
//       };
//     })
//     .then((resp) => callback(resp.country));
// }

// const phoneInputField = document.querySelector("#phone");
// const phoneInput = window.intlTelInput(phoneInputField, {
//   utilsScript:
//     "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
// });

// const info = document.querySelector(".alert-info");

// function process(event) {
//   event.preventDefault();

//   const phoneNumber = phoneInput.getNumber();

//   info.style.display = "";
//   info.innerHTML = `Phone number in E.164 format: <strong>${phoneNumber}</strong>`;
// }

// ===========logo slider ==
// const sliderLogo = document.getElementById("slider_logo");
// const sliderLogo2 = document.getElementById("slider_logo2");
// const cardWidthLogo = sliderLogo.children[0].offsetWidth + 20;
// const intervalSpeed = 2000;

// function startSlider(slider, direction) {
//   setInterval(() => {
//     slider.style.transition = "transform 0.5s linear";

//     if (direction === "reverse") {
//       slider.style.transform = `translateX(${cardWidthLogo}px)`;

//       setTimeout(() => {
//         slider.style.transition = "none";
//         slider.style.transform = "translateX(0)";
//         // Move last card to the beginning for reverse direction
//         slider.prepend(slider.children[slider.children.length - 1]);
//       }, 500);
//     } else {
//       slider.style.transform = `translateX(-${cardWidthLogo}px)`;

//       setTimeout(() => {
//         slider.style.transition = "none";
//         slider.style.transform = "translateX(0)";
//         // Move first card to the end for forward direction
//         slider.appendChild(slider.children[0]);
//       }, 500);
//     }
//   }, intervalSpeed);
// }

// startSlider(sliderLogo, "forward");
// startSlider(sliderLogo2, "reverse");

const sliderLogo = document.getElementById("slider_logo");
const sliderLogo2 = document.getElementById("slider_logo2");
const cardWidthLogo = sliderLogo.children[0].offsetWidth + 20;
const intervalSpeed = 2000;

function startSlider(slider, direction) {
  let position = 0;
  const speed = 2;
  let isAnimating = true;

  function slide() {
    if (!isAnimating) return;

    if (direction === "reverse") {
      position += speed;
      slider.style.transform = `translateX(${position}px)`;

      if (position >= cardWidthLogo) {
        position = 0;
        slider.style.transition = "none";
        slider.style.transform = "translateX(0)";
        slider.prepend(slider.children[slider.children.length - 1]);
      }
    } else {
      position -= speed;
      slider.style.transform = `translateX(${position}px)`;

      if (position <= -cardWidthLogo) {
        position = 0;
        slider.style.transition = "none";
        slider.style.transform = "translateX(0)";
        slider.appendChild(slider.children[0]);
      }
    }
    requestAnimationFrame(slide);
  }

  slide();
}

// slider.addEventListener("mouseenter", () => (isAnimating = false));
// slider.addEventListener("mouseleave", () => (isAnimating = true));

startSlider(sliderLogo, "forward");
startSlider(sliderLogo2, "reverse");
