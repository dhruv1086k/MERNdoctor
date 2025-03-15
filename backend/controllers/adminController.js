// API for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // checking for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Missing details!" });
    }

    // validating email format
  } catch (err) {}
};

export { addDoctor };
