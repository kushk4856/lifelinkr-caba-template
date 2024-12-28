const partnersTrack = document.getElementById("partnersTrack");
let cardWidth2;
let intervalSpeed2 = 2000; // Interval speed in ms
let interval2;

function updateCardWidth() {
  // Update card width calculation including the gap
  cardWidth2 = partnersTrack.children[0].offsetWidth + 20;
}

function startSlider() {
  // Initial card width calculation
  updateCardWidth();

  interval2 = setInterval(() => {
    partnersTrack.style.transition = "transform 0.5s linear";
    partnersTrack.style.transform = `translateX(-${cardWidth2}px)`;

    // After the transition ends, rearrange the cards
    setTimeout(() => {
      partnersTrack.style.transition = "none";
      partnersTrack.style.transform = "translateX(0)";
      partnersTrack.appendChild(partnersTrack.children[0]); // Move the first card to the end
    }, 500); // Match transition duration
  }, intervalSpeed2);
}

// Start the slider
startSlider();

// Update card width on window resize
window.addEventListener("resize", () => {
  clearInterval(interval2);
  updateCardWidth();
  startSlider();
});
