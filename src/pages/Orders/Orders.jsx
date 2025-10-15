import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { fetchAllOrders, updateOrderStatus } from "../../services/orderService";
import { toast } from "react-toastify";
import "./Orders.css";

const Orders = () => {
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetchAllOrders();
      setData(response);
    } catch (error) {
      toast.error("Unable to display the orders. Please try again.");
    }
  };

  const updateStatus = async (event, orderId) => {
    const success = await updateOrderStatus(orderId, event.target.value);
    if (success) {
      toast.success("Order status updated.");
      await fetchOrders();
    } else {
      toast.error("Failed to update status.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container py-5">
      <div className="card shadow-lg border-0 p-3">
        <h3 className="text-center fw-bold text-primary mb-4">
          Manage Orders
        </h3>
        {data.length === 0 ? (
          <p className="text-center text-muted">No orders found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-primary">
                <tr>
                  <th>Order</th>
                  <th>Details</th>
                  <th>Total</th>
                  <th>Items</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((order, index) => (
                  <tr key={index} className="order-row">
                    <td>
                      <img
                        src={assets.parcel}
                        alt="order"
                        className="order-img"
                      />
                    </td>
                    <td>
                      <div className="fw-semibold">
                        {order.orderedItems.map((item, idx) => (
                          <span key={idx}>
                            {item.name} x {item.quantity}
                            {idx < order.orderedItems.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                      <small className="text-muted">{order.userAddress}</small>
                    </td>
                    <td className="fw-bold text-success">
                      ₹{order.amount.toFixed(2)}
                    </td>
                    <td>{order.orderedItems.length}</td>
                    <td>
                      <select
                        className="form-select status-select"
                        onChange={(event) => updateStatus(event, order.id)}
                        value={order.orderStatus}
                      >
                        <option value="Food Preparing">Food Preparing</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
