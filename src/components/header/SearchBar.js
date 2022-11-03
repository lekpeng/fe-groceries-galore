import { Autocomplete, Box, TextField } from "@mui/material";
import { useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import productApis from "../../apis/product";
import debounce from "lodash.debounce";
import { useCallback } from "react";
import { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const INTERVAL = 500;

function SearchBar() {
  const [options, setOptions] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const previousController = useRef();
  const navigate = useNavigate();
  const getProducts = async (query) => {
    if (previousController.current) {
      previousController.current.abort();
    }

    const controller = new AbortController();
    previousController.current = controller;

    try {
      const response = await productApis.indexProducts(query);
      setOptions(response.data?.products);
    } catch (err) {
      return toast.error(err.response.data.error);
    }
  };

  useEffect(() => {
    if (inputVal) {
      debouncedGetProducts(inputVal);
    } else {
      setOptions([]);
    }
  }, [inputVal]);

  const debouncedGetProducts = useMemo(() => debounce(getProducts, INTERVAL), []);

  const handleChange = (ev, val) => {
    const productId = options.find((option) => option.name === val)?.id;
    console.log("PRODUCT ID", productId);
    if (productId) {
      navigate(`/products/${productId}`);
    }
  };

  const handleInputChange = (ev, val) => {
    setInputVal(val);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "white" }}>
      <SearchIcon sx={{ color: "#063970", width: "2em" }} />
      <Autocomplete
        autoComplete
        options={options?.map((option) => option.name)}
        filterOptions={(x) => x}
        onChange={handleChange}
        onInputChange={handleInputChange}
        // sx={{ width: "300px" }}
        sx={{
          width: "250px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "0",
            padding: "5px",
          },
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #eee",
          },
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </Box>
  );
}

export default SearchBar;
