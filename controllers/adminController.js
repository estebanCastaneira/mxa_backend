const { Admin } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function index(req, res) {
  try {
    const admins = await Admin.findAll({ attributes: { exclude: "password" } });

    return res.json(admins);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "We're sorry, there was an error with your request.",
      err: `${err}`,
    });
  }
}
async function store(req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const { firstname, lastname, email, password } = req.body;
    const admin = await Admin.create({ firstname, lastname, email, password });

    return res.status(201).json({
      message: "admin updated",
      id: `${admin.id}`,
      role: `${admin.role}`,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "We're sorry, there was an error with your request.",
      err: `${err}`,
    });
  }
}

async function update(req, res) {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const { firstname, lastname, email, password } = req.body;
    admin.firstname = firstname;
    admin.lastname = lastname;
    admin.email = email;
    admin.password = await bcrypt.hash(password, 10);
    await admin.save();

    return res
      .status(201)
      .json({ message: "admin updated", id: `${admin.id}` });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "We're sorry, there was an error with your request.",
      err: `${err}`,
    });
  }
}

async function destroy(req, res) {
  try {
    await Admin.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: "Admin deleted successfully" });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "We're sorry, there was an error with your request.",
      err: `${err}`,
    });
  }
}
async function login(req, res) {
  try {
    const admin = await Admin.findOne({ where: { email: req.body.username } });
    if (!admin) {
      return res.status(401).send({ message: "Incorrect Credentials" });
    }
    const auth = await bcrypt.compare(req.body.password, admin.password);
    if (!auth) {
      return res.status(401).send({ message: "Incorrect Credentials" });
    } else {
      const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
        expiresIn: "4h",
      });
      delete admin.password;
      const adminLoged = {
        id: admin.id,
        firstname: admin.firstname,
        lastname: admin.lastname,
        email: admin.email,
        role: admin.role,
        token,
      };
      return res.status(201).json(adminLoged);
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "We're sorry, there was an error with your request.",
      err: `${err}`,
    });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "We're sorry, there was an error with your request.",
      err: `${err}`,
    });
  }
}

async function resetPassword(req, res) {
  try {
    const admin = await Admin.findOne({ where: { email: req.body.username } });
    admin.password = await bcrypt.hash(req.body.password, 10);
    admin.save();

    res.status(200).json({ message: "Ok" });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  index,
  store,
  update,
  destroy,
  login,
  logout,
  resetPassword,
};
