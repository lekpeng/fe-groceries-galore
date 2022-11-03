import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { useNavigate } from "react-router-dom";
import ColoredAvatar from "../../../components/avatar/ColoredAvatar";

function MerchantCard({ merchant }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/merchants/${merchant?.id}`)} sx={{ cursor: "pointer", border: 1, borderColor: "#c1bfbf96" }}>
      <CardHeader
        titleTypographyProps={{
          fontWeight: "bold",
          fontSize: "30px",
        }}
        avatar={<ColoredAvatar name={merchant.name} size={"75px"} fontSize={"18px"} />}
        title={merchant.name}
      />
    </Card>
  );
}
export default MerchantCard;
