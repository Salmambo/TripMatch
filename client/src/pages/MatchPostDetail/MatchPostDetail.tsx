import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostDetail from "./../../components/PostDetail/PostDetail";
import Comment from "../../components/CommentList/CommentList";
import axios from "axios";
import type { MatchPostType } from "../../type/matchPost";
import NotFound from "../../components/NotFound/NotFound";
import { useParams } from "react-router-dom";
import {
  useGetAllMatchPostQuery,
  useGetMatchPostQuery,
} from "../../slice/matchPostApi";

const MatchPostDetail = () => {
  // const [post, setPost] = useState<MatchPostType>();

  const { id } = useParams();
  const postquery = useGetMatchPostQuery(id);
  const { data: post, isLoading, isError } = postquery;
  const allPost = useGetAllMatchPostQuery({ page: 0 });
  console.log(allPost);

  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await axios.get(
  //       "https://70aee874-8965-4db1-be06-07823d5c4dda.mock.pstmn.io/matchposts/1",
  //     );
  //     setPost(res.data);
  //   };

  //   getData();
  // }, []);

  if (isError) {
    return <NotFound />;
  }

  return (
    <Container>
      <>
        <PostDetail matchPost={post?.post} user={post?.post.author} />
        {post?.comments && <Comment comments={post?.comments} />}
      </>
    </Container>
  );
};

export default MatchPostDetail;

const Container = styled.div`
  width: 1000px;
  margin: auto;
  padding: 20px 0 11vh;
`;
