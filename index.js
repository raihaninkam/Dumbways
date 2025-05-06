  document.getElementById("submitBtn").addEventListener("click", function(event) {
    event.preventDefault(); // mencegah reload

    // Ambil value dari masing-masing input
    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;
    const phone = document.getElementById("phoneInput").value;
    const subject = document.getElementById("subjectInput").value;
    const message = document.getElementById("messageInput").value;

    // Cetak ke console
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Subject:", subject);
    console.log("Message:", message);

  });
