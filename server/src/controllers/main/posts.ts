import { Router } from "express";
import {
  postService,
  likeService,
  commentService,
  userService,
  matchService,
} from "../../services";

const postsController = Router();

postsController.get("/", async (req, res, next) => {
  const { page, region, status } = req.query;
  const { email } = req.user;
  try {
    const totalPage = await postService.getTotalPage(
      region as string,
      status as string
    );
    const posts = await postService.getEightPosts(
      Number(page) || 1,
      region as string,
      status as string
    );
    const postsWithLike = likeService.isLiked(posts as [], email);
    res.status(200).json({ totalPage, posts: postsWithLike });
  } catch (err) {
    next(err);
  }
});
postsController.get("/:postId", async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await postService.getPost(postId);
    const comments = await commentService.getComments({ postId });
    res.status(200).json({ post, comments });
  } catch (err) {
    next(err);
  }
});
postsController.put("/:postId", async (req, res, next) => {
  const { postId } = req.params;
  const { email } = req.user;
  try {
    const post = await postService.getPost(postId);
    if (post?.author.email !== email) return next("403");
    await postService.update(postId, req.body);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
});
postsController.delete("/:postId", async (req, res, next) => {
  const { postId } = req.params;
  const { email } = req.user;
  try {
    const post = await postService.getPost(postId);
    if (post?.author.email !== email) return next("403");
    await postService.delete(postId);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
});
postsController.post("/:postId", async (req, res, next) => {
  const { postId } = req.params;
  const { email } = req.user;
  try {
    const author = await postService.getAuthor(postId);
    const applicant = await userService.getAuthor(email);
    await matchService.create({ postId, ...author, applicant });
    res.status(201).end();
  } catch (err) {
    next(err);
  }
});
postsController.post("/post", async (req, res, next) => {
  const { email } = req.user;
  try {
    const author = await userService.getAuthor(email);
    await postService.create(req.body, author);
    res.status(201).end();
  } catch (err) {
    next(err);
  }
});

export default postsController;