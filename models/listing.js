const mongoose = require("mongoose");
const review = require("./review.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }, 
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
  },
  category: {
    type: String,
    enum: ["Rooms", "Cities", "Mountains","Arctic", "Farms", "castles", "PoolS", "Camping"],
  }
});

listingSchema.post("findOneAndDelete", async(listing) => {
  if(listing) {
    await review.deleteMany({_id: {$in: listing.reviews}});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

// image: {
//     type: {
//         filename: String,
//         url: String,
//       },
//     default: {
//         filename: 'default.jpg',
//         url: 'https://a0.muscache.com/im/pictures/miso/Hosting-26888809/original/85e85c8d-09ee-46e7-b437-477bc8a36883.jpeg?im_w=720',
//     },
//     set: (v) => v === "" 
//     ? "https://a0.muscache.com/im/pictures/miso/Hosting-26888809/original/85e85c8d-09ee-46e7-b437-477bc8a36883.jpeg?im_w=720"
//     : v,
// },