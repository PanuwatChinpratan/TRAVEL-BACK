import Booking from "../models/Booking.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

export const createBooking = async (req, res) => {
  verifyToken(req, res, async () => {
    verifyUser(req, res, async () => {
      const newBooking = new Booking(req.body);
      try {
        const savedBooking = await newBooking.save();
        res.status(200).json({
          success: true,
          message: "Your tour is booked",
          data: savedBooking,
        });
      } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error" });
      }
    });
  });
};

export const getBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Booking retrieved successfully",
      data: booking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Booking",
      error: err.message,
    });
  }
};

export const getAllBooking = async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Bookings",
      error: err.message,
    });
  }
};

export default {
  createBooking,
  getBooking,
  getAllBooking,
};
