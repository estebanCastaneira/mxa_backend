const { Staff } = require("../models");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
// Display a listing of the resource.
async function index(req, res) {
  try {
    const staff = await Staff.findAll();
    res.json(staff);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "We're sorry, there was an error with your request.",
      err: `${err}`,
    });
  }
}
// Display the specified resource.
async function show(req, res) {
  try {
    const staff = await Staff.findByPk(req.params.id);
    res.json(staff);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "We're sorry, there was an error with your request.",
      err: `${err}`,
    });
  }
}
// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const form = formidable({
      multiples: true,
      keepExtensions: true,
    });
    const formPromise = new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    });
    const { fields, files } = await formPromise;

    const {
      firstname,
      lastname,
      email,
      position_es,
      position_en,
      description_es,
      description_en,
      linkedin,
    } = fields;
    const ext = path.extname(files.image.filepath);
    const newFileName = `img/staff/image_${Date.now()}${ext}`;

    const staff = await Staff.create({
      firstname,
      lastname,
      email,
      position_es,
      position_en,
      description_es,
      description_en,
      image: newFileName,
      linkedin,
    });
    const photoData = fs.readFileSync(files.image.filepath);
    const { data, error } = await supabase.storage
      .from("assets")
      .upload(newFileName, photoData, {
        cacheControl: "3600",
        upsert: false,
        contentType: files.image.mimetype,
      });

    return res.json({
      message: "Staff member created successfully.",
      id: `${staff.id}`,
      image: `${staff.image}`,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "We're sorry, there was an error with your request.",
      err: `${err}`,
    });
  }
}
// Update the specified resource in storage.
async function update(req, res) {
  try {
    const form = formidable({
      multiples: true,
      keepExtensions: true,
    });
    const formPromise = new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    });

    const { fields, files } = await formPromise;

    const {
      firstname,
      lastname,
      email,
      position_es,
      position_en,
      description_es,
      description_en,
      linkedin,
      image,
    } = fields;
    const staff = await Staff.findByPk(req.params.id);
    if (staff.image !== image) {
      const ext = path.extname(files.image.filepath);
      const newFileName = `img/staff/image_${Date.now()}${ext}`;
      var { data, error } = await supabase.storage
        .from("assets")
        .remove(staff.image);
      staff.image = newFileName;
      const photoData = fs.readFileSync(files.image.filepath);
      var { data, error } = await supabase.storage
        .from("assets")
        .upload(newFileName, photoData, {
          cacheControl: "3600",
          upsert: false,
          contentType: files.image.mimetype,
        });
    }
    staff.firstname = firstname;
    staff.lastname = lastname;
    staff.email = email;
    staff.position_es = position_es;
    staff.position_en = position_en;
    staff.description_es = description_es;
    staff.description_en = description_en;
    staff.linkedin = linkedin;
    await staff.save();

    return res.json({
      message: "Staff member updated successfully.",
      id: `${staff.id}`,
      image: `${staff.image}`,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "We're sorry, there was an error with your request.",
      err: `${err}`,
    });
  }
}
// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (staff) {
      const { data, error } = await supabase.storage
        .from("assets")
        .remove(staff.image);

      await Staff.destroy({
        where: { id: staff.id },
      });

      return res
        .status(200)
        .json({ message: "Staff member deleted successfully" });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "We're sorry, there was an error with your request.",
      err: `${err}`,
    });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
