import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
    {
        name: String,
        lastName: String,
        address: String,
        country: String,
        city: String,
        emails:[],
        numbers:[],
        isDeleted: {
            type: Boolean,
            default: false,
          },
    },
    {
        versionKey: false,
      }
);

const Contact = mongoose.model("Contact",ContactSchema);

export default Contact;