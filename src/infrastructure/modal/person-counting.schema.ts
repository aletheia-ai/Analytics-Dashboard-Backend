import { Schema } from 'mongoose';

export const PersonCountingSchema = new Schema({
  footFall: Number,
  Exit: Number,
  age: Number,
  gender: String,
  occupancy: Number,
});
