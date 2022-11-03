import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import toast from "react-hot-toast";

function UpdateOrderStatus({ orderId, currStatus }) {
  const [status, setStatus] = useState(currStatus);
  const axiosPrivate = useAxiosPrivate();

  const handleChange = (ev) => {
    const newStatus = ev.target.value;
    setStatus(newStatus);
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

  return (
    <Box sx={{ minWidth: 120, mb: 3 }}>
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select value={status} label="Status" onChange={handleChange}>
          <MenuItem value={"preparing"}>Preparing</MenuItem>
          <MenuItem value={"packing"}>Packing</MenuItem>
          <MenuItem value={"shipping"}>Shipping</MenuItem>
          <MenuItem value={"out on delivery"}>Out On Delivery</MenuItem>
          <MenuItem value={"delivered"}>Delivered</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default UpdateOrderStatus;
