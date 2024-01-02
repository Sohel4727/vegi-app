import React, { useState } from "react";
import { Table, Input, Button, Space, Select, Typography } from "antd";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { DeleteFilled } from "@ant-design/icons";
// import "antd/dist/antd.css";
import "./LandingPage.css";

const { Option } = Select;

const LandingPage = () => {
  const [products, setProducts] = useState([
    { name: "Tomato", price: 0, weight: "" },
    { name: "Carrot", price: 0, weight: "" },
    { name: "Cucumber", price: 0, weight: "" },
    // Add more products with their initial prices and weights here
  ]);

  const [selectedProduct, setSelectedProduct] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [customWeight, setCustomWeight] = useState("");
  const [cart, setCart] = useState([]);
  const [hotelName, setHotelName] = useState("");

  const addToCart = () => {
    if (selectedProduct && customPrice > 0 && customWeight !== "") {
      // Ensure that the price is a number
      const price = parseFloat(customPrice);
      const weight = parseFloat(customWeight);
      const netPrice = price * weight; // Calculate net price for this product
      const productToAdd = {
        name: selectedProduct,
        price, // Ensure that price is a number
        weight: customWeight,
        netPrice,
      };
      setCart([...cart, productToAdd]);
      console.log("===>", cart);
    }
    setCustomPrice("");
    setCustomWeight("");
    setSelectedProduct("");
  };

  const deleteItem = (record) => {
    const updatedCart = cart.filter((item) => item.name !== record.name);
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + item.netPrice;
    }, 0);
  };

  const totalBill = calculateTotalPrice();

  const addSerialNumbers = (cart) => {
    return cart.map((item, index) => ({
      ...item,
      serial: index + 1, // Adding 1 to make the numbering start from 1
    }));
  };

  const cartWithSerialNumbers = addSerialNumbers(cart);

  const handleHotelNameChange = (value) => {
    setHotelName(value);
  };

  const hotels = [
    "Hotel A",
    "Hotel B",
    "Hotel C",
    // Add more hotel names here
  ];

  const columns = [
    {
      title: "Sr.",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `₹${text.toFixed(2)}`,
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      render: (text) => `${text} kg`,
    },
    {
      title: "Net_Price",
      dataIndex: "netPrice",
      key: "netPrice",
      render: (text) => `₹${text.toFixed(2)}`,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <DeleteFilled type="danger" onClick={() => deleteItem(record)} />
      ),
    },
  ];

  const pagination = {
    pageSize: 5, // Display 5 rows per page
  };

  return (
    <div>
      <div style={{ padding: 10 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <label>Select Hotel:</label>
          <Select
            style={{ width: 200 }}
            onChange={handleHotelNameChange}
            value={hotelName}
          >
            {hotels.map((hotel, index) => (
              <Option key={index} value={hotel}>
                {hotel}
              </Option>
            ))}
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <label>Select Product:</label>
          <Select
            style={{ width: 200 }}
            onChange={setSelectedProduct}
            value={selectedProduct}
          >
            <Option value="">Select Product</Option>
            {products.map((product, index) => (
              <Option key={index} value={product.name}>
                {product.name}
              </Option>
            ))}
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <label>Price:</label>
          <Input
            style={{ width: 200 }}
            type="number"
            value={customPrice}
            onChange={(e) => setCustomPrice(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <label>Weight</label>
          <Input
            type="number"
            style={{ width: 200 }}
            value={customWeight}
            onChange={(e) => setCustomWeight(e.target.value)}
          />
        </div>
        <Button type="primary" onClick={addToCart}>
          Add Product
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={cartWithSerialNumbers}
        pagination={pagination}
      />
      <div style={{ padding: 10 }}>
        {cart.length !== 0 && (
          <Typography style={{ fontWeight: "bold", fontSize: 20 }}>
            Total Items : {cart.length}
          </Typography>
        )}
        {cart.length !== 0 && (
          <Typography style={{ fontWeight: "bold", fontSize: 20 }}>
            Total Price: ₹{totalBill.toFixed(2)}
          </Typography>
        )}
        {cart.length !== 0 && (
          <Typography style={{ fontWeight: "bold", fontSize: 20 }}>
            Hotel Name: {hotelName}
          </Typography>
        )}

      </div>
    </div>
  );
};

export default LandingPage;
