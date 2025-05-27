import express from "express";
import pool from './db.js';


hbs.registerPartials(path.join(process.cwd(), "src/views/partials"));


const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// set view engine dan file direktori views

app.set("view engine", "hbs");

app.set("views", "src/views");

// middleware => akses file statis (css,js,gambar dari folder src/assets melalui URL assets)

app.use("/assets", express.static("src/assets"));

// parsing data dari form html (body parser)

app.use(express.urlencoded({ extended: false }));

// routing

app.get("/home", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// insert into postgre contact me

app.post("/contact", handleContact);

async function handleContact(req, res) {
  let { nama, email, phoneNumber, subject, message } = req.body;
  console.log(nama, email, phoneNumber, subject, message);

  let account = {
    nama,
    email,
    phoneNumber,
    subject,
    message,
  };

  const query = `INSERT INTO contact (name, email, phone_number, subject, message)
               VALUES ($1, $2, $3, $4, $5)`;

  const values = [
    account.nama,
    account.email,
    account.phoneNumber,
    account.subject,
    account.message,
  ];

  await pool.query(query, values);
  res.redirect("/home");
}

// //////////////////////////////////////////////

// menampilkan card add my project

import path from "path";
import fs from "fs";
import multer from "multer";
import hbs from "hbs";
hbs.registerHelper("year", function (date) {
  return new Date(date).getFullYear();
});
hbs.registerHelper("eq", function (a, b) {
  return a === b;
});

// Konfigurasi multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.post("/project", upload.single("image"), async (req, res) => {
  const { projectName, startDate, endDate, description, tech } = req.body;
  const technologies = Array.isArray(tech) ? tech : [tech];
  const duration = calculateDuration(startDate, endDate);

  await pool.query(
    `INSERT INTO projects (project_name, start_date, end_date, description, technologies, image, duration)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [projectName, startDate, endDate, description, technologies, req.file.filename, duration]
  );

  res.redirect("/project");
});

app.get("/project", async (req, res) => {
  const result = await pool.query("SELECT * FROM projects ORDER BY id DESC");

  console.log("Hasil dari DB:", result.rows);

  res.render("project", { projects: result.rows });
});



// Helper
function calculateDuration(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diff = Math.ceil((endDate - startDate) / (1000 * 3600 * 24));
  return `${diff} day(s)`;
}

///////////////////////////////////////////////////////////////////

// detail project

app.get("/project/:id", async (req, res) => {
  const id = req.params.id;
  const result = await pool.query("SELECT * FROM projects WHERE id = $1", [id]);
  res.render("project-detail", { project: result.rows[0] });
});



// //////////////////////

hbs.registerHelper("includes", function (array, value) {
  return Array.isArray(array) && array.includes(value);
});

app.get("/project/:id/edit", async (req, res) => {
  const result = await pool.query("SELECT * FROM projects WHERE id = $1", [req.params.id]);
  res.render("project-edit", { project: result.rows[0] });
});

app.post("/project/:id/edit", upload.single("image"), async (req, res) => {
  const { projectName, startDate, endDate, description, tech } = req.body;
  const technologies = Array.isArray(tech) ? tech : [tech];
  const duration = calculateDuration(startDate, endDate);
  const id = req.params.id;

  const updateQuery = req.file
    ? `UPDATE projects SET project_name=$1, start_date=$2, end_date=$3, description=$4, technologies=$5, image=$6, duration=$7 WHERE id=$8`
    : `UPDATE projects SET project_name=$1, start_date=$2, end_date=$3, description=$4, technologies=$5, duration=$6 WHERE id=$7`;

  const values = req.file
    ? [projectName, startDate, endDate, description, technologies, req.file.filename, duration, id]
    : [projectName, startDate, endDate, description, technologies, duration, id];

  await pool.query(updateQuery, values);
  res.redirect(`/project`);
});


// ////////////////////////

// route delete

app.post("/project/:id/delete", async (req, res) => {
  await pool.query("DELETE FROM projects WHERE id = $1", [req.params.id]);
  res.redirect("/project");
});

