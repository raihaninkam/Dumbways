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


// Menyimpan semua data project
let myProject = [];

// Menangani submit form
function getProject(event) {
  event.preventDefault();

  let nameWebsite = document.getElementById("projectName").value;
  let starDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;
  let massage = document.getElementById("description").value;
  let imageInput = document.getElementById("imageUpload").files[0];
  let techs = Array.from(document.querySelectorAll('input[name="tech"]:checked')).map(el => el.value);

  if (!imageInput) {
    alert("Please upload an image.");
    return;
  }

  let reader = new FileReader();

  reader.onload = function (e) {
    let image = e.target.result;

    let projectData = {
      nameWebsite,
      starDate,
      endDate,
      massage,
      image,
      techs
    };

    myProject.push(projectData);
    changeElement();
    document.getElementById("projectForm").reset();
    document.getElementById("previewImage").src = "";
  };

  reader.readAsDataURL(imageInput);
}

// Menampilkan project dalam bentuk kartu
function changeElement() {
  const container = document.getElementById("projectContainer");
  container.innerHTML = myProject
    .map((project) => {
      const { nameWebsite, starDate, endDate, image, massage, techs } = project;

      const techIcons = {
        reactjs: '<i class="fa-brands fa-react"></i>',
        nodejs: '<i class="fa-brands fa-node"></i>',
        nextjs: '<i class="fa-brands fa-js fa-lg" title="Next.js"></i>',
        typescript: '<i class="fa-solid fa-code fa-lg" title="TypeScript"></i>'
      };
      
      

      
      const checkedTechsIcons = techs
        .map(tech => techIcons[tech.toLowerCase()] || tech)
        .join(' ');



      return `
        <div class="card" style="width: 18rem;">
          <img src="${image}" class="card-img-top" alt="${nameWebsite}">
          <div class="card-body">
            <h5 class="card-title">${nameWebsite}</h5>
            <p class="card-text"><small>${starDate} - ${endDate}</small></p>
            <p class="card-text">${massage}</p>
            <p><strong>Technologies:</strong><br>${checkedTechsIcons}</p>
            <a href="" class="btn btn-primary">edit</a>
            <a href="" class="btn btn-primary">delete</a>
          </div>
        </div>
      `;
    })
    .join("");
}


const imageUploadInput = document.getElementById("imageUpload");
imageUploadInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("previewImage").src = e.target.result;
      document.getElementById("previewImage").style.maxWidth = "200px";
      document.getElementById("previewImage").style.marginTop = "10px";
    };
    reader.readAsDataURL(file);
  }
});

// Event listener untuk form
const form = document.getElementById("projectForm");
form.addEventListener("submit", getProject);