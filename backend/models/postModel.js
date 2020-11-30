import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true},
  },
  {
    timestamps: true,
  }
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: { type: String, required: true },
    images: [String],
    paragraph: { type: String, required: true },
    numLikes: { type: Number, default: 0, required: true },
    comments: [commentSchema],
    /* writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }, */
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
