import { Button, Divider, Table } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import React, { useRef } from "react";
import logo from "../../Asset/ssLogo.jpg";
import "./BillGenerate.css";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const BillGenerate = () => {
  const received = useLocation();
  const cart = received?.state?.cart;
  const hotelName = received?.state?.hotelName;
  const totalBill = received?.state?.totalBill;
  const balanceAmount = received?.state?.balanceAmount;
  const formattedDate = received?.state?.formattedDate;
  const totalBillAmount = parseInt(totalBill) + parseInt(balanceAmount);

  const addSerialNumbers = (cart) => {
    return cart.map((item, index) => ({
      ...item,
      serial: index + 1, // Adding 1 to make the numbering start from 1
    }));
  };

  const cartWithSerialNumbers = addSerialNumbers(cart);

  const weightConversions = {
    0.25: "250 gm",
    0.5: "500 gm",
    0.75: "750 gm",
  };
  const columns = [
    {
      title: "Sr",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      className: "single_line_cell",
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
      className: "net_price",
      render: (text) => `₹${text}`,
    },
  ];

  // Reference to the HTML element containing the invoice content
  const invoiceRef = useRef(null);

  // Function to generate PDF when download button is clicked
  const downloadPDF = () => {
    const invoice = invoiceRef.current;

    // Render HTML content to canvas
    html2canvas(invoice).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Set dimensions for PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      // Add image of HTML content to PDF
      pdf.addImage(imgData, "JPEG", 0, 0, width, height);

      // Download the PDF
      pdf.save("invoice.pdf");
    });
  };

  return (
    <>
      <div ref={invoiceRef}>
        <div className="logo_container">
          <div>
            <h3>Syed Suleman</h3>
            <p>Vegitable Supplier</p>
            <p>Umer Colony, Degloor Naka Nanded</p>
          </div>
          <img src={logo} width={80} />
        </div>
        <div className="ship_add_container">
          <h3>Ship To</h3>
          {cart.length !== 0 && <p>Hotel Name: {hotelName}</p>}
        </div>
        <div className="invice_heading_container">
          <p className="invice_heading"> INVOICE </p>
          <p className="invoice_date">Date : {formattedDate}</p>
        </div>
        <div className="custom-table-container">
          <Table
            columns={columns}
            dataSource={cartWithSerialNumbers}
            pagination={false}
          />
        </div>
        <div className="amount_container">
          {cart.length !== 0 && (
            <div className="billItems_container">
              <p>Total Items :</p>
              <p>{cart.length}</p>
            </div>
          )}
          <Divider style={{ padding: 2, margin: 2 }}></Divider>
          {cart.length !== 0 && (
            <div className="billItems_container">
              <p>Current Bill Amount: </p>
              <p>₹{totalBill}</p>
            </div>
          )}
          <Divider style={{ padding: 2, margin: 2 }}></Divider>
          {cart.length !== 0 && (
            <div className="billItems_container">
              <p>Last Balance Amount : </p>
              <p>₹{balanceAmount}</p>
            </div>
          )}
          <Divider style={{ padding: 2, margin: 2 }}></Divider>

          {cart.length !== 0 && (
            <div className="billItems_container">
              <p>Total Bill Amount : </p>
              <p>₹{totalBillAmount}</p>
            </div>
          )}
        </div>
        <Divider style={{ padding: 2, margin: 2 }}></Divider>
      </div>
      <Button
        onClick={downloadPDF}
        type="primary"
        style={{ margin: "10px", display: "flex", justifySelf: "center" }}
        icon={<DownloadOutlined />}
      >
        Download
      </Button>
    </>
  );
};

export default BillGenerate;
