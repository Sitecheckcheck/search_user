import React from "react";
import { useState } from "react";
import { ItemUser } from "./ItemUser";
import "./index.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoad, setIsLoad] = useState(false);

  const BASE_URL = "https://api.github.com/search/users?";

  const handleSearch = (page) => {
    setIsLoad(true);
    fetch(
      `${BASE_URL}q=` +
        encodeURIComponent(`${query} in:login sort:repositories`) +
        `&page=${page}`
    )
      .then((res) => {
        if (!res.ok && res.status === 403) {
          throw new Error("превышено количество запросов");
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
      handleSearch(page - 1);
    }
  };

  const handleNext = () => {
    if (page !== totalPage) {
      setPage(page + 1);
      handleSearch(page + 1);
    }
  };

  return isLoad ? (
    <h1 className="loading">Loading...</h1>
  ) : (
    <div className="App">
      <label htmlFor="site-search">Search the user:</label>
      <input
        type="search"
        id="site-search"
        name="q"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />

      <button onClick={() => handleSearch(1)}>Search</button>
      {users.length !== 0 && (
        <div className="filter">
          <p>Repositiries:</p>
          <button onClick={() => handleSearch()}>по возрастанию</button>
          <button onClick={() => handleSearch()}>по убыванию</button>
        </div>
      )}
      <ul>
        {users?.map((el) => (
          <ItemUser item={el} key={el.id} />
        ))}
      </ul>
      {users.length !== 0 && (
        <div className="pagination">
          <button onClick={handlePrev}>prev</button>
          <p>
            {page} from {totalPage}
          </p>
          <button onClick={handleNext}>next</button>
        </div>
      )}
    </div>
  );
}
