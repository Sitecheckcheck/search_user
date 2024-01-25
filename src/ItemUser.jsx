import React from "react";
import { useState } from "react";
import format from "date-fns/format";
import {
  UserInfoBox,
  ItemUserInfo,
  UserInfo,
  ItemUserStyle,
  AvatarUser,
} from "./itemUser.styled";

export const ItemUser = ({ item }) => {
  const [isShow, setIsShow] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [isLoad, setIsLoad] = useState(false);

  const handleShowUser = async () => {
    setIsLoad(true);
    const res = await fetch(`https://api.github.com/users/${item.login}`);
    const data = await res.json();
    setUserInfo(data);
    setIsShow(!isShow);
    setIsLoad(false);
  };

  return isLoad ? (
    <UserInfoBox>
      <p>Loading...</p>
    </UserInfoBox>
  ) : isShow ? (
    <UserInfoBox>
      <ItemUserInfo onClick={handleShowUser}>{item.login}</ItemUserInfo>
      <AvatarUser src={item.avatar_url} alt="avatar"></AvatarUser>
      <UserInfo>repositores: {userInfo.public_repos}</UserInfo>
      <UserInfo>
        registrated at {format(new Date(userInfo.created_at), "dd.MM.yyyy")}
      </UserInfo>
    </UserInfoBox>
  ) : (
    <ItemUserStyle onClick={handleShowUser}>{item.login}</ItemUserStyle>
  );
};
