import styled from "styled-components";
import Mahoorify from "../assets/Mahoorify.jpg";
const Footer = () => (
  <Wrapper>
    <Logo src={Mahoorify} />
    <Text>The only place to listen to music! </Text>
    <Logo src={Mahoorify} />
  </Wrapper>
);

const Wrapper = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto;
  height: 100px;
`;
const Logo = styled.img`
  height: 100%;
  border-radius: 50%;
  margin: 0px 20px;
`;
const Text = styled.p`
  color: var(--color-alabama-crimson);
  font-family: var(--font-heading);
  font-size: 36px;
  text-align: center;
`;

export default Footer;
