import { Autocomplete, TextField } from "@mui/material";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import productApis from "../../apis/product";
import debounce from "lodash.debounce";
import { useCallback } from "react";

const INTERVAL = 500;

function SearchBarNew() {
  const [options, setOptions] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const previousController = useRef();
  //   const [options, setOptions] = useState([]);

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

  //   const debouncedGetProducts = useCallback(
  //     debounce(() => {
  //         getProducts(val)
  //     }, INTERVAL),
  //     []
  //   );

  const handleInputChange = (ev, val) => {
    if (val) {
      getProducts(val);
    } else {
      setOptions([]);
    }
  };

  return (
    <Autocomplete
      autoComplete
      options={options?.map((option) => option.name)}
      filterOptions={(x) => x}
      onInputChange={handleInputChange}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Product" />}
    />
  );
}

export default SearchBarNew;
