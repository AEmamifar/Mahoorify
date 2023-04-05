import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NewReleaseCard = ({ image, artists, album_type, id }) => {
  const navigate = useNavigate();

  return (
    <Wrapper
      onClick={() => {
        navigate(`/new-release/${id}`);
      }}
    >
      <img src={image} />
      <p>{artists}</p>
      <span>{album_type}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  cursor: pointer;
  img {
    width: 100px;
  }
  margin: 10px;
  padding: 10px;
  text-align: center;
`;

export default NewReleaseCard;
