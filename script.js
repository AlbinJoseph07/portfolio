const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // This stops the page from reloading/redirecting

    const formData = new FormData(this);
    const action = this.querySelector('input[name="_url"]').value;

    fetch(action, {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            contactForm.reset(); // Clears the form fields
            formStatus.style.display = 'block'; // Shows your success message
        } else {
            alert("Oops! There was a problem submitting your form.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
});
