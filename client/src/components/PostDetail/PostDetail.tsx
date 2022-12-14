import React from "react";
import styled from "styled-components";
import UserProfile from "./../UserProfile/UserProfile";

const PostDetail = () => {
  return (
    <div>
      <PostTitle>공주 한정식 82식당 후기입니다</PostTitle>
      <TitleContainer>
        <UserProfile />
        <Date>2022-12-12 02:19</Date>
      </TitleContainer>
      <PostContent>
        겨울을 느낄 수 있는 나라였으면 좋겠어요
        <br />
        자유롭고 여유롭고 힐링 그 잡채,,,
        <br />
        여자고 혼자 여행할 거예요!
        <br />
        새로운 친구를 사귀는 것도 좋고, 엑티비티, 구경거리가
        <br />
        많은 것도 좋을 것 같아요 ㅎㅎ
        <br />
        이번에 태국에 왔기 때문에 태국은 제외하고 부탁드려용!
      </PostContent>
      <ButtonContainer>
        <Button>목록</Button>
        <Button>글수정</Button>
        <Button>글삭제</Button>
      </ButtonContainer>
    </div>
  );
};

export default PostDetail;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PostTitle = styled.p`
  font-size: 20px;
  padding: 15px 0;
`;

const PostContent = styled.article`
  padding: 40px 0;
  font-size: 14px;
  line-height: 1.7;
`;

const Date = styled.p`
  font-size: 13px;
  color: #747474;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const Button = styled.button`
  width: 70px;
  height: 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #daeaf1;
  color: #333;

  + button {
    margin-left: 15px;
  }
`;