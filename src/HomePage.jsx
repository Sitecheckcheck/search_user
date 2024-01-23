import { useState, useEffect } from "react";
import { Link as NavLink } from "react-router-dom";
import {
  Pagination,
  PaginationItem,
  TextField,
  Stack,
  Link,
} from "@mui/material";

const BASE_URL = "https://api.github.com/search/users?";

const HomePage = (props) => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("sitech");
  const [page, setPage] = useState(
    parseInt(props.location.search?.split("=")[1] || 1)
  );
  const [pageQty, setPageQty] = useState(10);

  useEffect(() => {
    fetch(
      `${BASE_URL}q=` +
        encodeURIComponent(`${query} in:login sort:repositories`) +
        `&page=${page}`
    )
      .then((res) => {
        if (!res.ok && res.status === 403) {
          throw new Error("Api rate");
        }
        return res.json();
      })
      .then((data) => {
        
        setPosts(data.items);
        setPageQty(Math.ceil(data.total_count / 30));

        if (data.nbPages < page) {
          setPage(1);
          props.history.replace("/");
        }
      })
      .catch((error) => {
        alert("Вы превысили лимит запросов, попробуйте позже");
      });
  }, [query, page, props.history]);

  return (
    <>
      <TextField
        fullWidth
        label="введите логин пользователя"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <Stack spacing={2}>
        {!!pageQty && (
          <Pagination
            count={pageQty}
            page={page}
            onChange={(_, num) => setPage(num)}
            showFirstButton
            showLastButton
            sx={{ marginY: 3, marginX: "auto" }}
            renderItem={(item) => (
              <PaginationItem
                component={NavLink}
                to={`/?page=${item.page}`}
                {...item}
              />
            )}
          />
        )}
        {posts.map((post) => (
          <Link key={post.objectID} href={post.url}>
            {post.login}
          </Link>
        ))}
      </Stack>
    </>
  );
};

export default HomePage;
