import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
`;

const Header = () => {
  return (
    <Nav>
      <Link to="/">영화 목록</Link>
      <Link to="/create">영화 정보 추가</Link>
      <Link to="/daily">일별 박스오피스</Link>
    </Nav>
  );
};
export default Header;
