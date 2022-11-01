import { Box, Skeleton } from "@mui/material";

function ProductSkeleton() {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", pt: 2 }}>
        <Box sx={{ ml: 1, mr: 2 }}>
          <Skeleton width="40px" height="40px" variant="circular" />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Skeleton height={7} width="80%" variant="rounded" />
          <Skeleton sx={{ mt: 1 }} height={7} width="50%" variant="rounded" />
        </Box>
      </Box>
      <Skeleton height={250} width="100%" sx={{ mt: 2 }} variant="rectangular" />
    </Box>
  );
}

export default ProductSkeleton;
