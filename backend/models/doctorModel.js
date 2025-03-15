import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  // using new will create this exact same schema for each doctor
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    slots_booked: {
      type: Object,
      default: {},
    },
  },
  { minimize: false } // minimize:false will let us create an empty object as default value
);

const doctorModel =
  mongoose.models.doctor || mongoose.model("doctor", doctorSchema);
//   if the model of that doctor already exists then that will be used otherwise new model would be created

export default doctorModel;
