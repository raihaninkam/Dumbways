// document
//   .getElementById("submitBtn")
//   .addEventListener("click", function (event) {
//     event.preventDefault(); // mencegah reload

//     // Ambil value dari masing-masing input
//     const name = document.getElementById("nameInput").value;
//     const email = document.getElementById("emailInput").value;
//     const phone = document.getElementById("phoneInput").value;
//     const subject = document.getElementById("subjectInput").value;
//     const message = document.getElementById("messageInput").value;

//     // Cetak ke console
//     console.log("Name:", name);
//     console.log("Email:", email);
//     console.log("Phone:", phone);
//     console.log("Subject:", subject);
//     console.log("Message:", message);
//   });


document.getElementById('projectForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('projectName').value;
  const start = document.getElementById('startDate').value;
  const end = document.getElementById('endDate').value;
  const desc = document.getElementById('description').value;
  const file = document.getElementById('imageUpload').files[0];

  const checkedTechs = Array.from(document.querySelectorAll('input[name="tech"]:checked'))
    .map(checkbox => checkbox.value)
    .join(', ');

  const reader = new FileReader();

  reader.onload = function (e) {
    const imageUrl = e.target.result;

    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${imageUrl}" alt="Project Image" />
      <div class="card-body">
        <h5>${name}</h5>
        <p>${desc}</p>
        <p><strong>Technologies:</strong> ${checkedTechs}</p>
        <p><small>${start} - ${end}</small></p>
        <a href="#" class="btn btn-primary">Edit</a>
        <a href="#" class="btn btn-danger">Delete</a>
      </div>
    `;

    document.getElementById('cardProject').appendChild(card);

    // Clear form
    document.getElementById('projectForm').reset();
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    alert("Please upload an image.");
  }
});
