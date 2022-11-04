import { Box } from "@mui/material";

function PreviewProduct({ sx, imgUrl }) {
  return <Box component="img" sx={sx} src={imgUrl} />;
}

export default PreviewProduct;
