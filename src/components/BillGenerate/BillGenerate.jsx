import { Button, Table, } from "antd";
import { DownloadOutlined } from '@ant-design/icons';
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
      title: "Serial",
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
          <img src={logo} width={100} />
        </div>
        <div className="ship_add_container">
          <h3>Ship To</h3>
          {cart.length !== 0 && <p>Hotel Name: {hotelName}</p>}
        </div>
        <h1 className="invice_heading"> INVOICE </h1>
        <p className="invoice_date">Date : {formattedDate}</p>

        <Table
          columns={columns}
          dataSource={cartWithSerialNumbers}
          pagination={false}
        />
        <div className="amount_container">
          {cart.length !== 0 && (
            <p style={{ marginBottom: "15px" }}>Total Items : {cart.length}</p>
          )}
          {cart.length !== 0 && (
            <p style={{ marginBottom: "15px" }}>
              Current Bill Amount: ₹{totalBill}
            </p>
          )}
          {cart.length !== 0 && (
            <p style={{ marginBottom: "15px" }}>
              Last Balance Amount : ₹{balanceAmount}
            </p>
          )}
          {cart.length !== 0 && <p>Total Bill Amount : ₹{totalBillAmount}</p>}
        </div>
      </div>
      <Button
        onClick={downloadPDF}
        type="primary"
        style={{ marginTop: "20px" }}
        icon={<DownloadOutlined />}
        
      >
        Download
      </Button>
    </>
  );
};

export default BillGenerate;
