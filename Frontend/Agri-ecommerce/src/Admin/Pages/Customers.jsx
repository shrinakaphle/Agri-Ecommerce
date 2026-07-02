import { useEffect, useState } from "react";
import { FaSearch, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Api from "../../Service/Api";
import "../CSS/Customer.css";

const Customers = () => {

  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);

  const [search, setSearch] = useState("");

  const loadCustomers = async () => {

    try {

      const res = await Api.get("/api/user/customers");

      setCustomers(res.data.customers);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    loadCustomers();

  }, []);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="customers-page">

      <div className="customers-header">

        <h1>Customers</h1>

      </div>

      <div className="customer-search">

        <FaSearch />

        <input
          type="text"
          placeholder="Search Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <table className="customers-table">

        <thead>

          <tr>

            <th>ID</th>

            <th>Name</th>

            <th>Email</th>

            <th>Total Orders</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {filteredCustomers.map((customer) => (

            <tr key={customer.id}>

              <td>{customer.id}</td>

              <td>{customer.name}</td>

              <td>{customer.email}</td>

              <td>{customer.total_orders}</td>

              <td>

                <button
                  className="view-btn"
                  onClick={() =>
                    navigate(`/admin/customers/${customer.id}`)
                  }
                >
                  <FaEye />
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};

export default Customers;