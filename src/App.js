import { useState } from "react";
import { Container, Pagination, TextField, Stack, Link } from "@mui/material";

const BASE_URL = "https://api.github.com/search/users?";

function App() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const [errorValidation, setErrorValidation] = useState(false);

  const handleSearch = () => {
    if (!query) {
      setErrorValidation(true);
    } else {
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
          setPosts(data.items);
          setPageQty(Math.ceil(data.total_count / 30));
          if (Math.ceil(data.total_count / 30) < page) {
            setPage(1);
          }
        })
        .catch((error) => {
          alert("Вы превысили лимит запросов, попробуйте позже");
        });
    }
  };

  return (
    <Container sx={{ marginTop: 5 }} maxWidth="md">
      <TextField
        sx={{ borderColor: "red" }}
        fullWidth
        label="введите логин пользователя"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setErrorValidation(false);
        }}
      />
      <button style={{ marginTop: "10px" }} onClick={handleSearch}>
        Поиск
      </button>
      <Stack spacing={2}>
        {!!pageQty && (
          <Pagination
            count={pageQty}
            page={page}
            onChange={(_, num) => setPage(num)}
            showFirstButton
            showLastButton
            sx={{ marginY: 3, marginX: "auto" }}
          />
        )}
        {posts.map((post) => (
          <Link key={post.id} href={post.url}>
            {post.login}
          </Link>
        ))}
      </Stack>
    </Container>
  );
}

export default App;
