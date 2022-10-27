import Grid from "@mui/material/";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import AuthContext from "../../context/AuthProvider";

function SearchResultsPage() {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const keyword = query.get("q");
  const [q, setQ] = useState([]);
  const [tab, setTab] = useState("All");
  const [panel, setPanel] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    setQ([keyword]);
    switch (tab) {
      case "All":
        setPanel(
          <>
            <Grid item>
              <SearchProjectsResults query={[keyword]} limit={3} />
            </Grid>
            <Grid item>
              <SearchUsersResults query={[keyword]} limit={3} />
            </Grid>
            <Grid item>
              <SearchContributorsResults query={[keyword]} limit={3} />
            </Grid>
          </>
        );
        break;
      case "Projects":
        setPanel(
          <Grid item>
            <SearchProjectsResults query={[keyword]} limit={12} />
          </Grid>
        );
        break;
      case "Users":
        setPanel(
          <Grid item>
            <SearchUsersResults query={[keyword]} limit={12} />
          </Grid>
        );
        break;
      case "Contributors":
        setPanel(
          <Grid item>
            <SearchContributorsResults query={[keyword]} limit={12} />
          </Grid>
        );
        break;
      default:
        break;
    }
  }, [keyword]);

  const handleTabChange = (newTab) => {
    setTab(newTab);
    switch (newTab) {
      case "All":
        setPanel(
          <>
            <Grid item>
              <SearchProjectsResults query={q} limit={3} />
            </Grid>
            <Grid item>
              <SearchUsersResults query={q} limit={3} />
            </Grid>
            <Grid item>
              <SearchContributorsResults query={q} limit={3} />
            </Grid>
          </>
        );
        break;
      case "Projects":
        setPanel(
          <Grid item>
            <SearchProjectsResults query={q} limit={12} />
          </Grid>
        );
        break;
      case "Users":
        setPanel(
          <Grid item>
            <SearchUsersResults query={q} limit={12} />
          </Grid>
        );
        break;
      case "Contributors":
        setPanel(
          <Grid item>
            <SearchContributorsResults query={q} limit={12} />
          </Grid>
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        textAlign={"center"}
        sx={{ color: "var(--color3)", fontWeight: "bold" }}>
        Search results
      </Typography>
      <Typography variant="h6" component="h2" textAlign={"center"} sx={{ color: "var(--color3)" }}>
        for "<span className="highlight-text">{keyword}</span>"
      </Typography>

      <Box padding="2em 0" display="flex" gap="0.3em">
        <Button
          className="search-tabs"
          variant={tab === "All" ? "contained" : "outlined"}
          onClick={() => handleTabChange("All")}>
          All
        </Button>
        <Button
          className="search-tabs"
          variant={tab === "Projects" ? "contained" : "outlined"}
          onClick={() => handleTabChange("Projects")}>
          Projects
        </Button>
        <Button
          className="search-tabs"
          variant={tab === "Users" ? "contained" : "outlined"}
          onClick={() => handleTabChange("Users")}>
          Users
        </Button>
        <Button
          className="search-tabs"
          variant={tab === "Contributors" ? "contained" : "outlined"}
          onClick={() => handleTabChange("Contributors")}>
          Contributors
        </Button>
      </Box>

      <Grid container direction="column" rowSpacing={1.1}>
        {panel}
      </Grid>
    </>
  );
}
export default SearchResultsPage;
