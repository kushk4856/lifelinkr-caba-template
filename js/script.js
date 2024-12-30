/*
=================================================
? => OnLeave Popup  js :----
=================================================
*/
document.addEventListener("DOMContentLoaded", function () {
  let count = 0;
  let Call_Back_NO = document.querySelector("#Call_Back_NO");
  const onLeaveCard = document.querySelector(".OnLeaveCard");
  const card = document.querySelector(".Card");

  // Make sure the OnLeaveCard is initially hidden
  onLeaveCard.style.display = "none";

  // Listen for mouseleave event at the top of the page (clientY <= 0)
  document.addEventListener("mouseleave", function (event) {
    if (event.clientY <= 0 && count === 0) {
      onLeaveCard.style.display = "flex"; // Show the OnLeaveCard
      count = 1; // Prevent showing the card again
    }
  });

  // When user clicks outside the OnLeaveCard, hide it
  document.addEventListener("click", function (event) {
    if (onLeaveCard.style.display !== "none") {
      if (!card.contains(event.target)) {
        onLeaveCard.style.display = "none";
        count = 1;
      }
    }
  });

  // No Thanks button functionality
  document.querySelector(".No_ThanksBtn").addEventListener("click", (e) => {
    e.preventDefault();
    count = 1; // Prevent the card from showing again
    onLeaveCard.style.display = "none";
  });

  // Form submission - hide OnLeaveCard and increment count
  Call_Back_NO.addEventListener("submit", (e) => {
    // e.preventDefault();  // Uncomment if you want to handle form submission with JS
    count = 1;
    onLeaveCard.style.display = "none";
  });
});

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

/*
=================================================
? => Laptop slider js :----
=================================================
*/

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

/*
=================================================
? => Cards feature slider js :----
=================================================
*/

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

/*
=================================================
? => Calender Add Guest Email js :----
=================================================
*/

// Email handling functionality
const forms = [
  document.querySelector(".right_form"),
  document.querySelector(".popupForm"),
];

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

/*
=================================================
? => Hero section Multistep form js :----
=================================================
*/

// // ?===Multistep form
// const nextBtn = document.getElementById("next_btn");
// const backBtn = document.querySelector(".back-btn");
// const formWrapper = document.querySelector(".form-fields-wrapper");

// // Next button click handler
// nextBtn.addEventListener("click", function () {
//   formWrapper.style.transform = "translateX(-50%)";
//   backBtn.classList.add("visible");
// });

// // Back button click handler
// backBtn.addEventListener("click", function () {
//   formWrapper.style.transform = "translateX(0)";
//   backBtn.classList.remove("visible");
// });

const nextBtn = document.getElementById("next_btn");
const backBtn = document.querySelector(".back-btn");
const formWrapper = document.querySelector(".form-fields-wrapper");
const form = document.getElementById("multiStepForm");
const firstContainer = document.getElementById("initial-fields");

// Next button click handler
nextBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // Get all required inputs in the first container
  const requiredInputs = firstContainer.querySelectorAll("input[required]");

  // Check if all required fields are valid
  let isValid = true;
  requiredInputs.forEach((input) => {
    if (!input.checkValidity()) {
      isValid = false;
      input.reportValidity(); // This triggers the browser's native validation popup
    }
  });

  // Only proceed if all fields are valid
  if (isValid) {
    formWrapper.style.transform = "translateX(-50%)";
    backBtn.classList.add("visible");
  }
});

// Back button click handler
backBtn.addEventListener("click", function () {
  formWrapper.style.transform = "translateX(0)";
  backBtn.classList.remove("visible");
});

/*
=================================================
? => Popup Calender  js :----
=================================================
*/

// ============popup calender js==

const popupOpenBtns = document.querySelectorAll(".openModal");
const calendlyPopup = document.querySelector(".popUpCalendly");
const calendlyCloseBtn = document.querySelector(".close_calendly");
const selectedCardInput = document.querySelector(".selected_card_Input");

popupOpenBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    calendlyPopup.style.display = "flex";
    // document.body.style.overflow = 'hidden';
    const parentData = btn.closest(".course-card")?.dataset.card;

    // console.log(parentData);
    if (parentData) {
      selectedCardInput.value = parentData;
    }
    console.log(selectedCardInput.value);
  });
});

calendlyCloseBtn.addEventListener("click", () => {
  calendlyPopup.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const calendarDays = document.getElementById("popup_cal_calendar-days");
  const currentMonthDisplay = document.getElementById(
    "popup_cal_current-month"
  );
  const prevMonthBtn = document.getElementById("popup_cal_prev-month");
  const nextMonthBtn = document.getElementById("popup_cal_next-month");
  const selectedDateDisplay = document.querySelectorAll(
    ".popup_cal_selected-date"
  );
  const timeSlotContainer = document.querySelector(
    ".popup_cal_time-slots-section"
  );
  const timeDisplay = document.querySelector(".time_display");
  const calenderArea = document.querySelector(".popup_cal_right-panel");
  const nextBtns = document.querySelectorAll(".popup_cal_next-button");
  const modalForm = document.querySelector(".popupForm");
  const previousBtn = document.querySelector(".previous_btn_popup");
  const addGuestBtn = document.querySelector(".add_guest");
  const addGuestInput = document.getElementById("add_guestInput");
  const dateInput = document.querySelector(".selected_date_Input");
  const timeInput = document.querySelector(".selected_time_Input");
  const noTimeSlotDiv = document.querySelector(".no_slots_div");

  const isTodaySunday = new Date().getDay() === 0;

  // console.log(new Date().getDay);

  if (isTodaySunday) {
    // If it's sunday then show no slot's available today div
    noTimeSlotDiv.style.display = "flex";
    timeSlotContainer.appendChild(noTimeSlotDiv);
  } else {
    noTimeSlotDiv.style.display = "none";
  }

  // ====== Dynamic Time Slots Generation ======
  function generateDynamicTimeSlots(selectedDate) {
    const now = new Date();
    const selected = new Date(selectedDate);
    const endTime = new Date(selected);
    endTime.setHours(19, 0, 0, 0); // End at 12:00 PM
    let currentTime = new Date(now);

    // Clear existing time slots
    timeSlotContainer.innerHTML = "";

    dateInput.value = selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    // console.log(dateInput.value);

    // Check if the selected date is today
    const isToday =
      selected.getDate() === now.getDate() &&
      selected.getMonth() === now.getMonth() &&
      selected.getFullYear() === now.getFullYear();
    // Check if today is Sunday
    const isTodaySunday = now.getDay() === 0;

    console.log(now.getDay);

    if (isToday && (currentTime >= endTime || isTodaySunday)) {
      // If today and the current time is beyond the end time
      noTimeSlotDiv.style.display = "flex";
      timeSlotContainer.appendChild(noTimeSlotDiv);
      return; // Exit early as there are no slots to generate
    } else {
      noTimeSlotDiv.style.display = "none";
    }

    let startTime;

    // Determine the start time based on today's or a future date
    if (isToday) {
      // Get the current time
      const now = new Date();

      // Set start time to 11:00 AM
      startTime = new Date();
      startTime.setHours(11, 0, 0, 0);

      // If the current time is past 11:00 AM, round up to the next 30-minute interval
      if (now > startTime) {
        startTime = new Date(now);
        startTime.setMinutes(Math.ceil(startTime.getMinutes() / 30) * 30, 0, 0);
      }

      // Ensure start time does not go beyond 7:00 PM
      const endTime = new Date();
      endTime.setHours(19, 0, 0, 0);
      if (startTime > endTime) {
        startTime = endTime;
      }
    } else {
      // For future dates, start at 11:00 AM
      startTime = new Date(selected);
      startTime.setHours(11, 0, 0, 0);
    }

    // Generate time slots in 30-minute intervals
    while (startTime <= endTime) {
      let hours = startTime.getHours() % 12 || 12; // Convert to 12-hour format
      let minutes = startTime.getMinutes().toString().padStart(2, "0");
      const ampm = startTime.getHours() >= 12 ? "PM" : "AM";

      // Add a leading zero if the hour is a single digit
      hours = hours < 10 ? `0${hours}` : hours;

      const timeString = `${hours}:${minutes}${ampm}`;

      // Create time slot elements
      const buttonGroup = document.createElement("div");
      buttonGroup.classList.add("popup_cal_button-group");

      const timeSlotSelected = document.createElement("div");
      timeSlotSelected.classList.add("popup_cal_time-slot-selected");
      timeSlotSelected.classList.add("right_form_time_slot");
      timeSlotSelected.textContent = timeString;

      const nextButton = document.createElement("button");
      nextButton.classList.add("popup_cal_next-button");
      nextButton.textContent = "Next";

      buttonGroup.appendChild(timeSlotSelected);
      buttonGroup.appendChild(nextButton);
      timeSlotContainer.appendChild(buttonGroup);

      // Increment the time by 30 minutes
      startTime.setMinutes(startTime.getMinutes() + 30);
    }

    // Reattach event listeners to the new time slots
    const timeSelectedBtns = document.querySelectorAll(
      ".popup_cal_time-slot-selected"
    );
    const nextBtns = document.querySelectorAll(".popup_cal_next-button");

    timeSelectedBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        timeSelectedBtns.forEach((button) => button.classList.remove("active"));
        this.classList.add("active");
        timeDisplay.textContent = `${btn.textContent}`;
        timeInput.value = `${btn.textContent}`;
      });
    });

    nextBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        calenderArea.style.display = "none";
        modalForm.classList.add("active");
        previousBtn.style.display = "flex";
      });
    });
  }

  // ====== Navigation Buttons ======
  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      calenderArea.style.display = "none";
      modalForm.classList.add("active");
      previousBtn.style.display = "flex";

      // selectedDateDisplay.forEach((el, i) => {
      //   if (i === 0) {
      //     dateInput.value = `${el.textContent}`;

      //   }
      // });
    });
  });

  previousBtn.addEventListener("click", () => {
    calenderArea.style.display = "flex";
    modalForm.classList.remove("active");
    previousBtn.style.display = "none";
  });

  // ====== Add Guest Input ======
  addGuestBtn.addEventListener("click", () => {
    addGuestBtn.style.display = "none";
    addGuestInput.style.display = "flex";
  });

  // ====== Display Current Date ======
  const currentDate = new Date();
  const options = {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  selectedDateDisplay.forEach((el) => {
    el.textContent = currentDate.toLocaleDateString("en-IN", options);
  });

  // ====== Calendar Variables ======
  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // ====== Render Calendar ======
  function renderCalendar() {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    currentMonthDisplay.textContent = `${months[currentMonth]} ${currentYear}`;
    calendarDays.innerHTML = "";

    // Disable previous month button if it's the current month
    const currentMonthCheck = new Date();
    if (
      currentMonth === currentMonthCheck.getMonth() &&
      currentYear === currentMonthCheck.getFullYear()
    ) {
      prevMonthBtn.disabled = true;
      prevMonthBtn.classList.add("popup_cal_disabled");
    } else {
      prevMonthBtn.disabled = false;
      prevMonthBtn.classList.remove("popup_cal_disabled");
    }

    // Add empty slots for days before the first of the month
    for (let i = 0; i < (firstDayOfMonth + 6) % 7; i++) {
      const emptyDay = document.createElement("div");
      emptyDay.classList.add("popup_cal_day", "popup_cal_disabled");
      calendarDays.appendChild(emptyDay);
    }

    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("popup_cal_day");
      dayElement.textContent = day;

      const currentDate = new Date(currentYear, currentMonth, day);
      const isBeforeToday = currentDate < new Date().setHours(0, 0, 0, 0);
      const isSunday = currentDate.getDay() === 0;

      // Disable past dates and Sundays
      if (isBeforeToday || isSunday) {
        dayElement.classList.add("popup_cal_disabled");
        if (isSunday) {
          dayElement.classList.add("popup_cal_sunday");
        }
      } else {
        dayElement.addEventListener("click", () => {
          document
            .querySelectorAll(".popup_cal_day.popup_cal_selected")
            .forEach((selectedDay) =>
              selectedDay.classList.remove("popup_cal_selected")
            );

          dayElement.classList.add("popup_cal_selected");
          const selectedDate = new Date(currentYear, currentMonth, day);
          dateInput.value = selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          });

          console.log(dateInput.value);

          selectedDateDisplay.forEach((display) => {
            display.textContent = selectedDate.toLocaleDateString("en-IN", {
              weekday: "long",
              month: "short",
              day: "numeric",
              year: "numeric",
            });
          });

          // Regenerate time slots for the newly selected date
          generateDynamicTimeSlots(selectedDate);
        });
      }

      // Highlight and select today's date if it's selectable
      if (
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear() &&
        !isSunday
      ) {
        dayElement.classList.add("popup_cal_today");
        dayElement.classList.add("popup_cal_selected"); // Add selected class by default

        // Set the selected date display to today's date
        selectedDateDisplay.forEach((display) => {
          display.textContent = today.toLocaleDateString("en-IN", {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric",
          });
        });

        // Generate time slots for today
        generateDynamicTimeSlots(today);
      }

      calendarDays.appendChild(dayElement);
    }
  }

  prevMonthBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });

  nextMonthBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });

  // Initial render of the calendar
  renderCalendar();
});

/*
=================================================
? => Clinics Logo slider js :----
=================================================
*/

// const slider2 = document.getElementById("slider2");
// let cardWidth2 = slider2.children[0].offsetWidth + 20; // Width of each card including margin

// let intervalSpeed = 2000; // Interval speed in ms
// let interval;

// function startSlider() {
//   interval = setInterval(() => {
//     slider2.style.transition = "transform 0.2s linear";
//     // console.log(cardWidth);
//     slider2.style.transform = `translateX(-${cardWidth2}px) `;

//     // After the transition ends, rearrange the cards
//     setTimeout(() => {
//       slider2.style.transition = "none";
//       slider.style.transform = "transform 0.5s linear";
//       slider2.style.transform = "translateX(0)";
//       slider2.appendChild(slider2.children[0]); // Move the first card to the end
//     }, 500); // Match transition duration
//   }, intervalSpeed);
// }

// startSlider();

// const partnersTrack = document.getElementById("partnersTrack");
// let cardWidth2;
// let intervalSpeed2 = 2000; // Interval speed in ms
// let interval2;

// function updateCardWidth() {
//   // Update card width calculation including the gap
//   cardWidth2 = partnersTrack.children[0].offsetWidth + 20;
// }

// function startSlider() {
//   // Initial card width calculation
//   updateCardWidth();

//   interval2 = setInterval(() => {
//     partnersTrack.style.transition = "transform 0.5s linear";
//     partnersTrack.style.transform = `translateX(-${cardWidth2}px)`;

//     // After the transition ends, rearrange the cards
//     setTimeout(() => {
//       partnersTrack.style.transition = "none";
//       partnersTrack.style.transform = "translateX(0)";
//       partnersTrack.appendChild(partnersTrack.children[0]); // Move the first card to the end
//     }, 500); // Match transition duration
//   }, intervalSpeed2);
// }

// // Start the slider
// startSlider();

// // Update card width on window resize
// window.addEventListener("resize", () => {
//   clearInterval(interval2);
//   updateCardWidth();
//   startSlider();
// });

// ===continoue slider ==
// const sliderLogo = document.getElementById("slider_logo");
// console.log(sliderLogo);
// // const sliderLogo2 = document.getElementById("slider_logo2");
// const cardWidthLogo = sliderLogo.children[0].offsetWidth + 20;
// const intervalSpeed = 2000;

// function startSlider(slider, direction) {
//   let position = 0;
//   const speed = 1.5;
//   let isAnimating = true;

//   function slide() {
//     if (!isAnimating) return;

//     if (direction === "reverse") {
//       position += speed;
//       slider.style.transform = `translateX(${position}px)`;

//       if (position >= cardWidthLogo) {
//         position = 0;
//         slider.style.transition = "none";
//         slider.style.transform = "translateX(0)";
//         slider.prepend(slider.children[slider.children.length - 1]);
//       }
//     } else {
//       position -= speed;
//       slider.style.transform = `translateX(${position}px)`;

//       if (position <= -cardWidthLogo) {
//         position = 0;
//         slider.style.transition = "none";
//         slider.style.transform = "translateX(0)";
//         slider.appendChild(slider.children[0]);
//       }
//     }
//     requestAnimationFrame(slide);
//   }

//   slide();
// }

// // slider.addEventListener("mouseenter", () => (isAnimating = false));
// // slider.addEventListener("mouseleave", () => (isAnimating = true));

// startSlider(sliderLogo, "forward");
// // startSlider(sliderLogo2, "reverse");
