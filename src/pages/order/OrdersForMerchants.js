import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { capitaliseFirstLetter } from "../../utils/capitalise_first_letter";
import { isoToYYYYMMDD } from "../../utils/date_time";

function OrdersForMerchants() {
  const [rows, setRows] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const indexOrders = async () => {
      try {
        const response = await axiosPrivate.get("/orders");
        console.log(response.data.orders);
        const mappedRows = response?.data?.orders?.map((order) => {
          const { id, status, updatedAt, paidAt } = order;
          const { name, email } = order?.Customer;

          return {
            id,
            name,
            email,
            status: capitaliseFirstLetter(status),
            paidAt: isoToYYYYMMDD(paidAt),
            updatedAt: isoToYYYYMMDD(updatedAt),
          };
        });
        setRows(mappedRows);
      } catch (err) {
        toast.error(err.response.data.error);
      }
    };
    indexOrders();
  }, []);

  const handleEdit = (params, ev) => {
    const newStatus = params.value;
    const orderId = params.id;
    const updateStatus = async () => {
      try {
        await axiosPrivate.patch(`/orders/status/${orderId}`, {
          status: newStatus,
        });
        toast.success(`Order status updated to ${newStatus}`);
      } catch (err) {
        toast.error(`Order status update failed ${err.message}`);
      }
    };
    updateStatus();
  };
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Name", width: 150, editable: true },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      type: "singleSelect",
      headerName: "Status",
      width: 150,
      editable: true,
      valueOptions: ["Preparing", "Packing", "Shipping", "Out On Delivery", "Delivered"],
    },
    { field: "paidAt", headerName: "Date Paid", width: 150 },
    { field: "updatedAt", headerName: "Date Updated", width: 150 },
    {
      field: "viewOrder",
      headerName: "View Order",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        const handleClick = (e) => {
          e.stopPropagation();
        };
        return (
          <Button component={Link} to={`/orders/${params.row.id}`} onClick={handleClick}>
            View
          </Button>
        );
      },
    },
  ];

  return (
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
  );
}

export default OrdersForMerchants;
