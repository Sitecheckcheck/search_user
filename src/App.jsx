import React, { useEffect } from "react";
import { useState } from "react";
import {
  Filter,
  Activ,
  Loading,
  Pagination,
  AppStyle,
  Input,
  Label,
  FilterTitle,
  FilterButtons,
} from "./app.styled";
import { ItemUser } from "./ItemUser";
import { GlobalStyle } from "./globalStyles";

export const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoad, setIsLoad] = useState(false);
  const [activ, setactiv] = useState(true);
  const [order, setOrdrer] = useState("desc");
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    if (query?.length !== 0) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [query]);

  const handleSearch = (page = 1, order = "desc") => {
    setIsLoad(true);
    fetch(
      `https://api.github.com/search/users?q=${query}&page=${page}&sort=repositories&order=${order}`
    )
      .then((res) => {
        if (!res.ok && res.status === 403) {
          throw new Error("превышено количество запросов, попробуйте позже");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data.items);
        setTotalPage(Math.ceil(data.total_count / 30));
        setIsLoad(false);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handlePrev = () => {
    if (page !== 1) {
      setPage(page - 1);
      handleSearch(page - 1, order);
    }
  };

  const handleNext = () => {
    if (page !== totalPage) {
      setPage(page + 1);
      handleSearch(page + 1, order);
    }
  };

  return isLoad ? (
    <Loading>Loading...</Loading>
  ) : (
    <AppStyle>
      <GlobalStyle />
      <Label htmlFor="site-search">Search the user:</Label>
      <Input
        type="search"
        id="site-search"
        name="q"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />

      <button
        style={isDisable ? { color: "#999999", pointerEvents: "none" } : {}}
        onClick={() => {
          setPage(1);
          setactiv(true);
          handleSearch();
        }}
      >
        Search
      </button>
      {users.length !== 0 && (
        <Filter>
          <FilterTitle>Repositiries:</FilterTitle>
          <FilterButtons>
            <Activ
              $activ={!activ}
              onClick={() => {
                setactiv(false);
                setOrdrer("asc");
                handleSearch(page, "asc");
              }}
            >
              по возрастанию
            </Activ>
            <Activ
              $activ={activ}
              onClick={() => {
                setactiv(true);
                setOrdrer("desc");
                handleSearch(page, "desc");
              }}
            >
              по убыванию
            </Activ>
          </FilterButtons>
        </Filter>
      )}
      <ul>
        {users?.map((el) => (
          <ItemUser item={el} key={el.id} />
        ))}
      </ul>
      {users.length !== 0 && (
        <Pagination>
          <button onClick={() => handlePrev()}>prev</button>
          <p>
            {page} from {totalPage}
          </p>
          <button onClick={() => handleNext()}>next</button>
        </Pagination>
      )}
    </AppStyle>
  );
};
