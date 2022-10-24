import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <h1>Page not found!</h1>
      <div>
        <Link to="/">Visit Our Homepage</Link>
      </div>
    </div>
  );
}

export default PageNotFound;
