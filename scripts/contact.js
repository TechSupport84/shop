document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const subject = this.subject.value.trim();
    const message = this.message.value.trim();
    const status = document.getElementById("form-status");
  
    if (!name || !email || !subject || !message) {
      status.textContent = "Please fill in all fields.";
      status.style.color = "red";
      return;
    }
  
    // Simulated send (you can replace with backend POST)
    status.textContent = "Sending message...";
    status.style.color = "black";
  
    setTimeout(() => {
      status.textContent = "Thank you! Your message has been sent.";
      status.style.color = "green";
      document.getElementById("contact-form").reset();
    }, 1000);
  });
  