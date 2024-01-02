import React, { useState } from 'react';
import { Button, Drawer, Radio, Space, Typography } from 'antd';
import MenuIcon from '@mui/icons-material/Menu';
import { Icon } from '@mui/material';
const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('left');
  const showDrawer = () => {
    setOpen(!open);
  };
  const onClose = () => {
    setOpen(!open);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  return (
    <>
      <Space>
      
        <MenuIcon type="primary" onClick={showDrawer}/>
        
      </Space>
      <Drawer
        title="S S Shop"
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <p style={{position:"absolute",top:0,right:0,paddingRight:10}} onClick={showDrawer}>X</p>
        <Typography>Order History</Typography>
      </Drawer>
    </>
  );
};
export default NavBar;