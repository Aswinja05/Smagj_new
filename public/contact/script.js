// Toggle mobile menu
document.querySelector(".hamburger").addEventListener("click", function () {
  document.getElementById("menu").classList.toggle("show");
});

// Form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value,
  };

  fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("success-message").style.display = "block";
        document.getElementById("error-message").style.display = "none";
        document.getElementById("contactForm").reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          document.getElementById("success-message").style.display = "none";
        }, 5000);
      } else {
        document.getElementById("error-message").style.display = "block";
        document.getElementById("success-message").style.display = "none";

        // Hide error message after 5 seconds
        setTimeout(() => {
          document.getElementById("error-message").style.display = "none";
        }, 5000);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("error-message").style.display = "block";
      document.getElementById("success-message").style.display = "none";

      // Hide error message after 5 seconds
      setTimeout(() => {
        document.getElementById("error-message").style.display = "none";
      }, 5000);
    });
});
