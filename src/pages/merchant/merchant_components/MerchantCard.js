import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import BackgroundLetterAvatar from "../../../components/avatar/ColoredAvatar";

function MerchantCard({ merchant }) {
  return (
    <Card sx={{ border: 1, borderColor: "#c1bfbf96" }}>
      <CardHeader
        titleTypographyProps={{
          fontWeight: "bold",
          fontSize: "30px",
        }}
        avatar={<BackgroundLetterAvatar name={merchant.name} size={"75px"} fontSize={"18px"} />}
        title={merchant.name}
      />
    </Card>
  );
}
export default MerchantCard;
