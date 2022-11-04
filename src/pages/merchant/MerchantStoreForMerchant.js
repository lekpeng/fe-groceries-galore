import { Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { isoToYYYYMMDD } from "../../utils/date_time";

function MerchantStoreForMerchant({ products, merchant }) {
  const axiosPrivate = useAxiosPrivate();
  const rows = products.map((product) => {
    const { id, name, price, quantity, updatedAt } = product;
    return { id, name, price, quantity, updatedAt: isoToYYYYMMDD(updatedAt) };
  });
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Name", width: 350 },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      editable: true,
    },
    { field: "quantity", headerName: "Stock", width: 150, editable: true },
    { field: "updatedAt", headerName: "Date Updated", width: 150 },
    {
      field: "viewProduct",
      headerName: "View Product",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        const handleClick = (e) => {
          e.stopPropagation();
        };
        return (
          <Button component={Link} to={`/products/${params.row.id}`} onClick={handleClick}>
            View
          </Button>
        );
      },
    },
  ];

  const handleEdit = (params, ev) => {
    const { field, value } = params;
    const productId = params.id;

    const updateProduct = async () => {
      try {
        await axiosPrivate.patch(`/products/${productId}`, {
          field,
          value,
        });
        toast.success(`The ${field} has been updated to ${value}`);
      } catch (err) {
        toast.error(`The update of ${field} failed ${err.message}`);
      }
    };
    updateProduct();
  };

  return (
    <>
      <Button component={Link} to="/products/new">
        Add Product
      </Button>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          disableSelectionOnClick
          onCellEditCommit={handleEdit}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </>
  );
}

export default MerchantStoreForMerchant;
