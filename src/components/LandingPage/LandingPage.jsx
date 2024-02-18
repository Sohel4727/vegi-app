import React, { useState } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Select,
  Typography,
  DatePicker,
} from "antd";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { DeleteFilled } from "@ant-design/icons";
// import "antd/dist/antd.css";
import "./LandingPage.css";
import BillGenerate from "../BillGenerate/BillGenerate";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const LandingPage = () => {
  const [isBill, setIsBill] = useState(false);
  const [products, setProducts] = useState([
    { name: "Kothmir", price: 0, weight: "" },
    { name: "Pudina", price: 0, weight: "" },
    { name: "Kadipatta", price: 0, weight: "" },
    { name: "Kanda", price: 0, weight: "" },
    { name: "Shimla Mirch", price: 0, weight: "" },
    { name: "Adrak", price: 0, weight: "" },
    { name: "Kakdi", price: 0, weight: "" },
    { name: "Gajar", price: 0, weight: "" },
    { name: "Hari Mirch", price: 0, weight: "" },
    { name: "Aalu", price: 0, weight: "" },
    { name: "Laisan", price: 0, weight: "" },
    { name: "Patta Gobi", price: 0, weight: "" },
    { name: "Phool Gobi", price: 0, weight: "" },
    { name: "Aanar", price: 0, weight: "" },
  ]);

  const [selectedProduct, setSelectedProduct] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [customWeight, setCustomWeight] = useState("");
  const [cart, setCart] = useState([]);
  const [hotelName, setHotelName] = useState("");
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");

  const navigate = useNavigate();

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
      // console.log("===>", cart);
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

  // handle weight with custom values

  const handleWeight = (currentWeight) => {
    setCustomWeight(currentWeight);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date); // Store the moment object from DatePicker
    updateFormattedDate(date); // Pass the moment object to updateFormattedDate
  };
  

  const updateFormattedDate = (date) => {
    if (date && date.isValid()) { // Check if date is valid moment object
      const formatted = date.format("DD-MM-YYYY"); // Format moment object to desired format
      setFormattedDate(formatted);
    } else {
      setFormattedDate(""); // Clear the formatted date if the date is null or not valid
    }
  };
  

  // bill generate
  const billGenerate = () => {
    navigate("/billGenerate", {
      state: {
        cart: cart,
        hotelName: hotelName,
        totalBill: totalBill,
        balanceAmount: balanceAmount,
        formattedDate: formattedDate,
      },
    });
  };

  const hotels = [
    "AASHNA HOTEL NANDED",
    "CHAI SUTTA BAR",
    // Add more hotel names here
  ];

  const weightConversions = {
    0.25: "250 gm",
    0.5: "500 gm",
    0.75: "750 gm",
  };

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
      render: (text) => `₹${text}`,
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      className: "single_line_cell",
      render: (text) => weightConversions[text] || `${text} kg`,
    },
    {
      title: "Net_Price",
      dataIndex: "netPrice",
      key: "netPrice",
      render: (text) => `₹${text}`,
    },
    {
      title: "*",
      key: "action",
      render: (text, record) => (
        <DeleteFilled type="danger" onClick={() => deleteItem(record)} />
      ),
    },
  ];

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
            <Option value="">Select Hotels</Option>
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

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Button onClick={() => handleWeight(0.25)}>250 gm</Button>
          <Button onClick={() => handleWeight(0.5)}>500 gm</Button>
          <Button onClick={() => handleWeight(0.75)}>750 gm</Button>
          <Button onClick={() => handleWeight(1)}>1 kg</Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "8px",
            marginBottom: "8px",
          }}
        >
          <label>Last Balance : </label>
          <Input
            type="number"
            style={{ width: 200 }}
            value={balanceAmount}
            onChange={(e) => setBalanceAmount(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "8px",
            marginBottom: "8px",
          }}
        >
          <label>Date : </label>
          <DatePicker
            style={{ width: 200 }}
            onChange={handleDateChange}
            value={selectedDate}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button type="primary" onClick={addToCart}>
            Add Product
          </Button>
          <Button onClick={billGenerate} type="primary">
            Bill Generate
          </Button>
        </div>
      </div>
   
      <Table
        columns={columns}
        dataSource={cartWithSerialNumbers}
        pagination={false}
      />

      {isBill ? <BillGenerate /> : null}
    </div>
  );
};

export default LandingPage;
