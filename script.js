document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); 

            // Show loading state
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
            formStatus.style.display = 'none';
            formStatus.className = 'status'; // Reset classes

            const formData = new FormData(this);
            const actionInput = this.querySelector('input[name="_url"]');
            
            if (!actionInput || !actionInput.value || actionInput.value === "YOUR_API_ENDPOINT_HERE") {
                formStatus.innerText = "Error: Please configure your API endpoint in the HTML.";
                formStatus.classList.add('error');
                formStatus.style.display = 'block';
                resetButton(submitBtn, originalBtnText);
                return;
            }

            try {
                const response = await fetch(actionInput.value, {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    contactForm.reset(); 
                    formStatus.innerText = "Message sent successfully!";
                    formStatus.classList.add('success');
                    formStatus.style.display = 'block'; 
                } else {
                    throw new Error("Network response was not ok");
                }
            } catch (error) {
                console.error("Error:", error);
                formStatus.innerText = "Oops! There was a problem submitting your form.";
                formStatus.classList.add('error');
                formStatus.style.display = 'block';
            } finally {
                resetButton(submitBtn, originalBtnText);
            }
        });
    }

    function resetButton(btn, text) {
        btn.innerText = text;
        btn.disabled = false;
    }
});
