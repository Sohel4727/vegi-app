import { Table } from 'antd'
import React from 'react'

const OrderHistory = () => {

const cart=[
    { name: "tomato",
        price : 30,
        weight: 3,
        netPrice : 90
    },
    { name: "tomato",
        price : 30,
        weight: 3,
        netPrice : 90
    },
    { name: "tomato",
        price : 30,
        weight: 3,
        netPrice : 90
    },
    { name: "tomato",
        price : 30,
        weight: 3,
        netPrice : 90
    },
    { name: "tomato",
        price : 30,
        weight: 3,
        netPrice : 90
    },
    { name: "tomato",
        price : 30,
        weight: 3,
        netPrice : 90
    },
]

const addSerialNumbers = (cart) => {
    return cart.map((item, index) => ({
      ...item,
      serial: index + 1, // Adding 1 to make the numbering start from 1
    }));
  };

  const cartWithSerialNumbers = addSerialNumbers(cart);

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
      ];

      const pagination = {
        pageSize: 5, // Display 5 rows per page
      };

    return (
    <>
    <h1>Product History</h1>
    <Table columns={columns} dataSource={cartWithSerialNumbers}  pagination={pagination} />
    </>
  )
}

export default OrderHistory