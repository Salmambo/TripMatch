import React from "react";
import {
  Container,
  MainContent,
  PostInfo,
  Region,
  Category,
  Title,
  UserInfo,
  Nickname,
  SeparateLine,
  CreatedDate,
  CommentInfo,
  CommentImage,
  CommentCount,
  FreePostLink,
} from "./FreePostListStyle";
import CommentLogo from "../../images/comment-dots.png";
import { Link } from "react-router-dom";

interface FreePostProps {
  region: string;
}

const FreePostList: React.FC<FreePostProps> = ({ region }) => {
  const mockData = [
    {
      postID: "1",
      nickname: "가나다라",
      region: "충청도",
      category: "숙소",
      title: "충남 감성숙소 추천받습니다",
      createdAt: "22.12.12",
      commentCount: 3,
    },
    {
      postID: "2",
      nickname: "가나다라",
      region: "기타",
      title: "제목입니다",
      category: "숙소",
      createdAt: "22.12.12",
      commentCount: 3,
    },
    {
      postID: "3",
      nickname: "가나다라",
      category: "숙소",
      region: "제주도",
      title: "제목입니다",
      createdAt: "22.12.12",
      commentCount: 3,
    },
    {
      postID: "4",
      nickname: "가나다라",
      category: "숙소",
      region: "전라도",
      title: "제목입니다",
      createdAt: "22.12.12",
      commentCount: 3,
    },
    {
      postID: "5",
      nickname: "가나다라",
      category: "숙소",
      region: "강원도",
      title: "제목입니다",
      createdAt: "22.12.12",
      commentCount: 3,
    },
    {
      postID: "6",
      nickname: "가나다라",
      category: "숙소",
      region: "경기도",
      title: "제목입니다",
      createdAt: "22.12.12",
      commentCount: 3,
    },
    {
      postID: "7",
      nickname: "가나다라",
      category: "숙소",
      region: "서울",
      title: "제목입니다",
      createdAt: "22.12.12",
      commentCount: 3,
    },
  ];

  return (
    <Container>
      {mockData
        .filter((data) => region === "전체" || data.region === region)
        .map((data, i) => {
          const url = `/free/${data.postID}`;
          return (
            <FreePostLink key={i} to={url}>
              <div className="container" key={i}>
                <MainContent>
                  <PostInfo>
                    <Region>[{data.region}]</Region>
                    <Category>[{data.category}]</Category>
                    <Title>{data.title}</Title>
                  </PostInfo>
                  <UserInfo>
                    <Nickname>{data.nickname}</Nickname>
                    <SeparateLine>|</SeparateLine>
                    <CreatedDate>{data.createdAt}</CreatedDate>
                  </UserInfo>
                </MainContent>
                <CommentInfo>
                  <CommentImage src={CommentLogo} alt="" />
                  <CommentCount>{data.commentCount}</CommentCount>
                </CommentInfo>
              </div>
            </FreePostLink>
          );
        })}
    </Container>
  );
};

export default FreePostList;