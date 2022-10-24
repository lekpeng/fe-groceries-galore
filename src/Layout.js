import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="Layout">
      {/* nav bar to go here, and inside nav bar component, to render differently acc to auth state and role */}
      <Outlet />
    </main>
  );
};

export default Layout;
