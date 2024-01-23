const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, "Please add the Contact Name"],
    },
    email: {
        type: String,
        required: [true, "Please add the Contact email Address"]
    },
    phone: {
        type: Number,
        required: [true, "Please add the Contact Phone Number"]
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Contact", contactSchema);