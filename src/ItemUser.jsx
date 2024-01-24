import React from "react";
import { useState } from "react";
import "./index.css";
import format from "date-fns/format";

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
    <div className="userInfoBox">
      <p>Loading...</p>
    </div>
  ) : isShow ? (
    <div className="userInfoBox">
      <div onClick={handleShowUser} className="itemUserInfo">
        {item.login}
      </div>
      <img src={item.avatar_url} className="avatarUser" alt="avatar"></img>
      <p className="userInfo">repositores: {userInfo.public_repos}</p>
      <p className="userInfo">registrated at {format(new Date(userInfo.created_at), "dd.MM.yyyy")}</p>
    </div>
  ) : (
    <li onClick={handleShowUser} className="itemUser">
      {item.login}
    </li>
  );
};
