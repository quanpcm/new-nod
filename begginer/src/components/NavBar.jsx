import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="cute-navbar">
      <Container>
        <Navbar.Brand onClick={() => navigate("/main")} className="brand-text" role="button">
          🐾 <span style={{ color: '#ff6b81' }}>MeowShop</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/main")}>Trang chủ</Nav.Link>
            <Nav.Link onClick={() => navigate("/profile")}>Hồ sơ</Nav.Link>
            <Nav.Link onClick={() => navigate("/create")}>Tạo Sản Phẩm</Nav.Link>
            <NavDropdown title="Thêm 🐱" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate("/cart")}>Giỏ hàng</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/orders")}>Đơn hàng</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => navigate("/logout")}>Đăng xuất</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

console.log("NavBar component mounted");

export default NavBar;
