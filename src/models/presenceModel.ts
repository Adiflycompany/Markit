import mongoose from 'mongoose';

const presenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: String, required: true },
  date: { type: Date, required: true },
}, { timestamps: true });

const Presence = mongoose.model('Presence', presenceSchema);
export default Presence;
