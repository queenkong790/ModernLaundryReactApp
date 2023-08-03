import React from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./MyModal.module.css";

function MyModal({ showModal, handleCloseModal, orderDetails }) {
  const getModeFromDeliveryStatus = (deliveryStatus) => {
    if (deliveryStatus === "1") {
      return "Standard";
    } else if (deliveryStatus === "2") {
      return "Express";
    } else if (deliveryStatus === "3") {
      return "SameDay";
    } else {
      return "Unknown"; // You can set a default value here if needed
    }
  };

  let noOfItems = 0;

  const totalItems = orderDetails["Total Items"].map((item) => {
    const price = parseFloat(item.Price);
    const quantity = parseInt(item.qty);
    const total = price;

    noOfItems++;
    return {
      ...item,
      Total: total,
    };
  });

  // Calculate the total price of the order
  const totalPrice = totalItems.reduce((total, item) => total + item.Total, 0);



  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles["custom-modal-body"]}>
        <table width="700" height="85" className={styles.popup_tb1} cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <td>Mode</td>
              <td>{getModeFromDeliveryStatus(orderDetails.deliveryType)}</td>
            </tr>
            <tr>
              <td>Pick up Date</td>
              <td>{orderDetails.pickupDate}</td>
            </tr>
            {/* <tr>
              <td>Pick up Time</td>
              <td>{formatTime(orderDetails.pickupDate)}</td>
            </tr> */}
            <tr> 
              <td>Delivery Date</td>
              <td>{orderDetails.deliveryDate}</td>
            </tr>
            {/* <tr>
              <td>Delivery Time</td>
              <td>{formatTime(orderDetails.deliveryDate)}</td>
            </tr> */}
            <tr>
              <td>Order Status</td>
              <td>{orderDetails.orderStatus}</td>
            </tr>
            <tr>
              <td>Address :</td>
              <td>{localStorage.getItem('address')}</td>
            </tr>
            <tr>
              <td>Special Requests :</td>
              <td>{orderDetails.SpecialRequests}</td>
            </tr>
          </tbody>
        </table>

        <table width="480" id="sales" className={styles["final-table1"]} cellpadding="0" cellspacing="0">
          <thead>
            <tr className={styles["frm-fld-tabletd1"]} cellpadding="0" cellspacing="0">
              <th style={{paddingRight: "8px"}}>SL NO.</th>
              <th style={{paddingRight: "8px"}}>ITEM</th>
              <th style={{paddingRight: "8px"}}>QUANTITY</th>
              <th style={{paddingRight: "8px"}}>SERVICE</th>
              <th style={{paddingRight: "8px"}}>DELIVERY</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails["Total Items"].map((item, index) => (
              <tr key={index}>
                <td className={styles["frm-fld-tabletd2"]}>{index + 1}</td>
                <td className={styles["frm-fld-tabletd2"]} style={{ paddingRight: "8px" }}>{item.item}</td>
                <td className={styles["frm-fld-tabletd2"]}>{item.qty}</td>
                <td className={styles["frm-fld-tabletd2"]} style={{ textAlign: "center" }}>
                  {item.service}
                </td>
                <td className={styles["frm-fld-tabletd2"]} style={{ textAlign: "center" }}>
                  {item.DELIVERY}
                </td>
                <td className={styles["frm-fld-tabletd2"]} style={{ textAlign: "center" }}>
                  {item.Price}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot style={{ color: "#60d0e4 !important" }}>
            <tr>
              <td colSpan="5" align="right" style={{ paddingRight: 15 }}>
                <strong className={styles["frm-fld-tabletd3"]}>Total Items : </strong>
              </td>
              <td colSpan="2" align="right" style={{ paddingRight: 15 }}>
                <strong className={styles["frm-fld-tabletd3"]}>{noOfItems}</strong>
              </td>
            </tr>
            {/* <tr>
              <td colSpan="5" align="right" style={{ paddingRight: 15 }}>
                <strong className={styles["frm-fld-tabletd3"]}>Sub Total : </strong>
              </td>
              <td colSpan="2" align="right" style={{ paddingRight: 15 }}>
                <strong className={styles["frm-fld-tabletd3"]}>{orderDetails.price}</strong>
              </td>
            </tr>
            <tr>
              <td colSpan="5" align="right" style={{ paddingRight: 15 }}>
                <strong className={styles["frm-fld-tabletd3"]}>VAT : </strong>
              </td>
              <td colSpan="2" align="right" style={{ paddingRight: 15 }}>
                <strong className={styles["frm-fld-tabletd3"]}>2.20</strong>
              </td>
            </tr> */}
            <tr>
              <td colSpan="5" align="right" style={{ paddingRight: 15 }}>
                <strong className={styles["frm-fld-tabletd3"]}>Total : </strong>
              </td>
              <td colSpan="2" align="right" style={{ paddingRight: 15 }}>
                <strong className={styles["frm-fld-tabletd3"]}>{totalPrice.toFixed(2)}</strong>
              </td>
            </tr>

            <tr>
              <td colSpan="6" align="right" style={{ paddingRight: 15 }}></td>
            </tr>
          </tfoot>
        </table>
      </Modal.Body>
    </Modal>
  );
}

export default MyModal;

