import {
  Badge,
  Button,
  Card,
  Image,
  List,
  message,
  Rate,
  Spin,
  Typography,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { addToCart, getAllProducts, getProductsByCategory } from "../../API";
import { useParams } from "react-router-dom";

function Products() {
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("az");

  const images = [
    'https://mediacdn.99acres.com/media1/21621/15/432435606O-1688818823977.jpg'
  ]
  useEffect(() => {
    setLoading(true);
    (param?.categoryId
      ? getProductsByCategory(param.categoryId)
      : getAllProducts()
    ).then((res) => {
      setItems(res.products);
      setLoading(false);
    });
  }, [param]);

  const getSortedItems = () => {
    const sortedItems = [...items];
    return sortedItems;
  };

  return (
    <div className="productsContainer">
      <div>
        <Typography.Text>Location: </Typography.Text>
        <Select
          onChange={(value) => {
            setSortOrder(value);
          }}
          defaultValue={"blr"}
          options={[
            {
              label: "Bangalore",
              value: "blr",
            },
            {
              label: "Bhopal",
              value: "bpl",
            },
          ]}
        ></Select>
      </div>
      <List
        loading={loading}
        grid={{ column: 3 }}
        renderItem={(product, index) => {
          return (
              <Card
                className="itemCard"
                title='Plots in Devanahalli, Near Airport'
                key={index}
                cover={
                  <Image className="itemCardImage" src={images[0]} />
                }
                actions={[
                  <Rate allowHalf disabled value={product.rating} />,
                  <AddToCartButton item={product} />,
                ]}
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      Price: ₹{51}{" Lac @ 4,300 per sq.ft."}
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                    >
                      The site is facing the northwest corner roadside plot, project is adjacent to devanahalli - Doddaballapur road and just 2 km away from hyderabad highway. Travel time to bangalore international airport is 15-20 mins.
                    </Typography.Paragraph>
                  }
                ></Card.Meta>
              </Card>
          
          );
        }}
        dataSource={getSortedItems()}
      ></List>
    </div>
  );
}

function AddToCartButton({ item }) {
  const [loading, setLoading] = useState(false);
  const addProductToCart = () => {
    setLoading(true);
    addToCart(item.id).then((res) => {
      message.success(`Added to cart!`);
      setLoading(false);
    });
  };
  return (
    <Button
      type="link"
      onClick={() => {
        addProductToCart();
      }}
      loading={loading}
    >
      Add to Cart
    </Button>
  );
}
export default Products;
