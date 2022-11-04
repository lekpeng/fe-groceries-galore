import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Container from "@mui/material/Container";

const Layout = () => {
  return (
    <main className="Layout">
      <Header />
      <Container sx={{ mt: "2rem", mb: "2rem" }}>
        <Outlet />
      </Container>
    </main>
  );
};

export default Layout;
