import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Yout your is booked",
        data: savedBooking,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

export const getBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Booking.findById(id);
    res.status(200).json({ success: true, message: "successful", data: book });
  } catch (err) {
    res.status(404).json({ success: false, message: "not found" });
  }
};


export const getAllBooking = async (res) => {
  try {
    const books = await Booking.find();
    res.status(200).json({ success: true, message: "success", data: books });
  } catch (err) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};
