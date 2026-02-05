document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let formData = new FormData(this);

    fetch("save_contact.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("response").innerText = data;
        document.getElementById("contactForm").reset();
    });
});
