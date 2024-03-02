// import React, { useState, useEffect } from 'react';
// import whatsAppIcon from "../../Asset/WhatsApp_icon.png";
// import "./WhatsAppIcon.css"; // Import your CSS file for styling

// const WhatsAppIcon = () => {
//   const [showTooltip, setShowTooltip] = useState(false);

//   useEffect(() => {
//     const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//     if (!isMobile) {
//       setShowTooltip(true);
//     }
//   }, []); // Empty dependency array to run only once on component mount

//   // Function to open WhatsApp chat
//   const openWhatsAppChat = () => {
//     // Replace 'your-personal-whatsapp-number' with your actual WhatsApp number
//     const whatsappNumber = '9156659836'; // Add your WhatsApp number here
//     // Check if the user is on a mobile device
//     const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//     // Check if WhatsApp desktop application is installed
//     const isDesktopApp = window.navigator.userAgent.includes("WhatsApp");
//     // Create a WhatsApp chat link based on the device
//     let chatLink;
//     if (isMobile) {
//       chatLink = `https://wa.me/${whatsappNumber}`; // Open in WhatsApp mobile app
//     } else if (isDesktopApp) {
//       // Open WhatsApp desktop application
//       alert("Please open WhatsApp desktop application and scan the QR code to continue chatting.");
//       return;
//     } else {
//       chatLink = `https://web.whatsapp.com/send?phone=${whatsappNumber}`; // Open in WhatsApp web
//     }
//     // Open the chat link in a new tab
//     window.open(chatLink, '_blank');
//   };

//   return (
//     <div className="whatsApp_wrapper"> {/* Update class name here */}
//       <div className="icon whatsApp" onClick={openWhatsAppChat}>
//         {showTooltip && <span className="tooltip">WhatsApp</span>}
//         <img src={whatsAppIcon} width={100} alt="WhatsApp Icon" />
//       </div>
//     </div>
//   );
// };

// export default WhatsAppIcon;
