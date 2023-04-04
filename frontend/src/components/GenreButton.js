import styled from "styled-components";
const GenreButton = ({ genre }) => {
  return (
    <Wrapper>
      <button>{genre}</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 5px;
  padding: 5px;
`;
export default GenreButton;
