import mongoose from 'mongoose';

const locationSchema = mongoose.Schema({
  name: String,
  address: String,
  city: String,
  state: String,
  zip: String
}, { collection: 'locations' });

export {
  locationSchema,
}
