import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';
import { isAuth, isAdmin} from '../utils.js';

const postRouter = express.Router();

postRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
    const posts = await Post.find({...keyword});
    res.send(posts);
  })
);


postRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    if (post) {
      res.send(post);
    } else {
      res.status(404).send({ message: 'Post Not Found.' });
    }
  })
);

postRouter.post(
  '/:id/comments',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
      const comment = {
        name: req.body.name,
        comment: req.body.comment,
      };
      post.comments.push(comment);

      const updatedPost = await post.save();
      res.status(201).send({
        data: updatedPost.comments[updatedPost.comments.length - 1],
        message: 'Comment saved successfully.',
      });
    } else {
      res.status(404).send({ message: 'Post Not Found' });
    }
  })
);
postRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (post) {
      post.title = req.body.title;
      post.image = req.body.image;
      post.images = req.body.images;
      post.paragraph = req.body.paragraph;

      const updatedPost = await post.save();
      if (updatedPost) {
        return res
          .status(200)
          .send({ message: 'Post Updated', data: updatedPost });
      }
    }
    return res.status(500).send({ message: ' Error in Updating Post.' });
  })
);

postRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const deletedPost = await Post.findById(req.params.id);
    if (deletedPost) {
      await deletedPost.remove();
      res.send({ message: 'Post Deleted' });
    } else {
      res.send('Error in Deletion.');
    }
  })
);

postRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const post = new Post({
      title: 'Sample title',
      image: '/images/p1.jpg',
      paragraph: 'Sample paragraph try to write something here',
    });
    const createdPost = await post.save();
    if (createdPost) {
      return res
        .status(201)
        .send({ message: 'Post Created', post: createdPost });
    }
    return res.status(500).send({ message: 'Error in Creating Post' });
  })
);

export default postRouter;
