import styled from "styled-components";
const GenreButton = ({ genre, token, setNewRelease }) => {
  const clickHanlder = () => {
    fetch(`/api/search/${genre}?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        setNewRelease(
          data.data.artists.items.filter(
            (item) =>
              item.genres.includes(genre) ||
              item.name.toLowerCase().includes(genre.toLowerCase())
          )
        );
      });
  };
  return (
    <Wrapper>
      <button onClick={clickHanlder}>{genre}</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 5px;

  button {
    padding: 5px 12px;
    background-color: black;
    border: 1px solid white;
    border-radius: 5px;
    &:hover {
      background-color: white;
      color: black;
      transition: 0.5s ease-out all;
      cursor: pointer;
    }
  }
`;
export default GenreButton;
