import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    trainId: { type: mongoose.Schema.Types.ObjectId, ref: 'Train', required: true },
    razorpayOrderId: { type: String, required: true, unique: true },
    razorpayPaymentId: { type: String, unique: true }, // Added after payment success
    pnrNumber: { type: String, required: true, unique: true },
    passengers: [{
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    }],
    totalFare: { type: Number, required: true },
    seatsBooked: { type: Number, required: true },
    status: { type: String, enum: ['created', 'paid', 'cancelled'], default: 'created' },
    createdAt: { type: Date, default: Date.now },
});

export default Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);