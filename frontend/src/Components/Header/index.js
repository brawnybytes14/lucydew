import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import {
  Badge,
  Menu,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";

function AppHeader() {
  const navigate = useNavigate();

  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };
  return (
    <div className="appHeader">
      <Menu
        className="appMenu"
        onClick={onMenuClick}
        mode="horizontal"
        items={[
          {
            label: <HomeFilled />,
            key: "",
            children: []
          },
          {
            label: "Buy",
            key: "buy",
            children: []
          },
          {
            label: 'Sell',
            key: "seldsfdafdsafdasl",
            children: []
          },
        ]}
      />
      {/* <Typography.Title className="titleDiv">Lucy Dew Properties</Typography.Title> */}
      <AppCart />
    </div>
  );
}
function AppCart() {
  return (
    <div>
      <Badge
        className="soppingCartIcon"
      >
        <ShoppingCartOutlined />
      </Badge>
    </div>
  );
}
export default AppHeader;
