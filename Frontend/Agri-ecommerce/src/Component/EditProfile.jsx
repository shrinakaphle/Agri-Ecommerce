import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/EditProfile.css";

const EditProfile = () => {

  const navigate = useNavigate();


  const user = JSON.parse(localStorage.getItem("user"));
  const id = user?.id;

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address:user?.address|| ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:5000/api/user/UpdateById/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await res.json();

      if (res.ok) {

        // update localStorage
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        alert("Profile Updated Successfully");

        navigate("/profile");
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="edit-page">

      <div className="edit-box">

        <h2>Edit Profile</h2>

        <form onSubmit={handleSubmit}>

  <div className="profile-preview">

    <div className="profile-avatar">
      👤
    </div>

    <h3>{form.name}</h3>

    <p>{user?.email}</p>

  </div>

  <div className="input-group">

    <label>Full Name</label>

    <input
      type="text"
      name="name"
      value={form.name}
      onChange={handleChange}
      placeholder="Enter Full Name"
    />

  </div>

  <div className="input-group">

    <label>Email</label>

    <input
      type="email"
      value={user?.email}
      readOnly
    />

  </div>

  <div className="input-group">

    <label>Phone Number</label>

    <input
      type="text"
      name="phone"
      value={form.phone}
      onChange={handleChange}
      placeholder="Enter Phone Number"
    />

  </div>

  <div className="input-group">

    <label>Address</label>

    <textarea
      name="address"
      value={form.address}
      onChange={handleChange}
      placeholder="Enter Address"
      rows="4"
    />

  </div>

  <div className="btn-group">

    <button
      type="submit"
      className="save-btn"
    >
      Save Changes
    </button>

    <button
      type="button"
      className="cancel-btn"
      onClick={() => navigate("/profile")}
    >
      Cancel
    </button>

  </div>

</form>

        {/* <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
          />

          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
          />

          <button type="submit">
            Save Changes
          </button>

        </form> */}

      </div>

    </div>
  );
};

export default EditProfile;