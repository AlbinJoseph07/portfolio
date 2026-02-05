document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("response").innerText =
    "Thank you! Contact form will be active soon.";
});

