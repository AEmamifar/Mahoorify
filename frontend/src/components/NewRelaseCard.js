import styled from "styled-components";

const NewReleaseCard = ({ image, artists, album_type }) => {
  return (
    <Wrapper>
      <img src={image} />
      <p>{artists}</p>
      <span>{album_type}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  img {
    width: 100px;
  }
  margin: 10px;
  padding: 10px;
  text-align: center;
`;

export default NewReleaseCard;
