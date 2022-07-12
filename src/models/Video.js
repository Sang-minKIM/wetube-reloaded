import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 80 },
  description: { type: String, required: true, trim: true, minlength: 10 },
  createdAt: { type: Date, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
});

videoSchema.static("formatTags", function (hashtags) {
  return hashtags
    .split(",")
    .map((tag) => (tag.startsWith("#") ? tag : ` #${tag.trim()}`));
});

const Video = mongoose.model("Video", videoSchema);
export default Video;