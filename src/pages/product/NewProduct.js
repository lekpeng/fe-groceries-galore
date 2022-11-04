import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import productCategoryApis from "../../apis/product_category";
import PreviewProduct from "./PreviewProduct";

function NewProduct() {
  //   const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    category: "",
  });

  const handleUploadImage = (ev) => {
    setImageFile(ev.target.files[0]);
    setPreviewImageUrl(URL.createObjectURL(ev.target.files[0]));
  };

  const handleRemoveImage = (ev) => {
    setImageFile("");
    setPreviewImageUrl("");
  };

  const handleChange = (ev) => {
    setFormData({
      ...formData,
      [ev.target.name]: ev.target.value,
    });
    if (ev.target.name === "category") {
      setSelectedCategory(ev.target.value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("form data", formData);
      toast.success("Product has been added! 😄");
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };
  useEffect(() => {
    const getProductCategories = async () => {
      try {
        const response = await productCategoryApis.indexProductCategories();
        setCategories(response.data.productCategories);
      } catch (err) {
        toast.err(err.response.data.error);
      }
    };
    getProductCategories();
  }, []);
  return (
    <>
      <h1 style={{ marginTop: 0 }}>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ mt: 5, width: "400px" }}>
          <TextField required name="name" label="Product Name" onChange={handleChange} />
          <Box display="flex" flexDirection="row" alignItems="center" gap="2em">
            <Box display="flex" flexDirection="column">
              {previewImageUrl ? (
                <Button
                  variant="outlined"
                  onClick={handleRemoveImage}
                  sx={{ mt: 1, color: "red", borderColor: "red", "&:hover": { borderColor: "red" } }}>
                  Remove
                </Button>
              ) : (
                <Button variant="outlined" component="label" sx={{ mt: 3 }}>
                  Upload an image
                  <input hidden accept=".png, .jpeg, .jpg, .webp" type="file" onChange={handleUploadImage} />
                </Button>
              )}
            </Box>

            {previewImageUrl && (
              <PreviewProduct
                imgUrl={previewImageUrl}
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: "contain",
                }}
              />
            )}
          </Box>
          <TextField
            name="description"
            multiline={true}
            rows={3}
            sx={{ mt: 3 }}
            label="Further Description (Optional)"
            onChange={handleChange}
          />

          <TextField
            required
            name="price"
            inputProps={{
              min: 0.01,
              step: 0.01,
            }}
            type="number"
            sx={{ mt: 3 }}
            label="Price"
            onChange={handleChange}
          />
          <TextField
            required
            name="quantity"
            inputProps={{
              min: 1,
              step: 1,
            }}
            type="number"
            sx={{ mt: 3 }}
            label="Current Stock"
            onChange={handleChange}
          />
          <FormControl sx={{ mt: 3 }} fullWidth>
            <InputLabel>Category</InputLabel>
            <Select sx={{ textAlign: "left" }} name="category" value={selectedCategory} label="Status" onChange={handleChange}>
              {categories?.map((category) => (
                <MenuItem value={category.name}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" sx={{ mt: 3 }} variant="contained" color="success">
            Add Product
          </Button>
        </FormControl>
      </form>
    </>
  );
}

export default NewProduct;
