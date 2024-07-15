import axios from "axios";
import React, { useEffect, useState } from "react";
import { customer_get_url, customer_add_url } from "./url/url";
import "./coustomer.css";

const Coustomer = () => {
  const [cuslist, setCuslist] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pending_flag, setPending_flag] = useState("");
  const [Status, SetStatus] = useState("");
  const [OldBlance, setOldBlance] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCusPost();
    setCuslist([]); // Clear existing customer list to force re-fetch
    setShowModal(false); // Close the modal after adding a customer
  };

  const addCusPost = async () => {
    const data = {
      name: name,
      phone: phone,
      pending_flag: pending_flag,
      OldBlance: OldBlance,
      Status: Status,
    };
    // Make API call to add customer
    try {
      await axios.post(customer_add_url, data);
    } catch (error) {
      console.error("Error adding customer:", error);
    }
    cusGetList();
  };

  const cusGetList = async () => {
    try {
      const res = await axios.get(customer_get_url);
      setCuslist(res.data);
    } catch (error) {
      console.error("Error fetching customer list:", error);
    }
  };

  useEffect(() => {
    cusGetList();
  }, []);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Add Customer</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <h1>Customer Add</h1>
              <br />
              <label>Name:</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="name"
              />
              <label>Phone:</label>
              <input
                type="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="phone"
              />
              <label>
                Pending Flag:
                <input
                  type="checkbox"
                  onChange={(e) => setPending_flag(e.target.checked)}
                />
                <label>Blance:</label>
                <input
                  type="text"
                  required
                  value={OldBlance}
                  onChange={(e) => setOldBlance(e.target.value)}
                  placeholder="name"
                />
              </label>
              <label>Blance:</label>
              <select
                id="paymentSelect"
                value={Status}
                onChange={(e) => {
                  SetStatus(e.target.value);
                }}
              >
                <option value="">Select...</option>
                <option value="alive">alive</option>
                <option value="Waiting">Waiting</option>
                <option value="OFF">OFF</option>
              </select>
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      )}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Blance</th>
              <th>call</th>
              <th>SMS</th>
              <th>wh</th>
              <th>Phone</th>
              <th>Pending Flag</th>
              <th>Views</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cuslist.map((customer, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.OldBlance}</td>
                <td style={{ width: "10px" }}>
                  {" "}
                  <a href={`tel:${customer.phone}`} className="call-icon">
                    <i>&#9990;</i>
                  </a>
                </td>
                <td>
                  <a
                    href={`sms:${customer.phone}?body=your old blance ${customer.OldBlance}`}
                  >
                    sms
                  </a>
                </td>
                <td>
                  {" "}
                  <a
                    href={`https://wa.me/91${customer.phone}?text=your old blance ${customer.OldBlance} `}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Wh
                  </a>
                </td>
                <td>{customer.phone}</td>
                <td>{customer.pending_flag ? "Yes" : "No"}</td>
                <td>
                  <a href={`/views/${customer._id}`}>Views</a>
                </td>
                <td>{customer.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Coustomer;
