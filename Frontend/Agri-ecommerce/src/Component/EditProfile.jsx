import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

const handleImageChange = (e) => {

  if (e.target.files[0]) {

    setProfileImage(e.target.files[0]);

  }

};
  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const formData = new FormData();

    formData.append(
      "name",
      form.name
    );

    formData.append(
      "phone",
      form.phone
    );

    formData.append(
      "address",
      form.address
    );

    if (profileImage) {

      formData.append(
        "profile",
        profileImage
      );

    }

    const res = await fetch(

      `http://localhost:5000/api/user/updateById/${id}`,

      {

        method: "PUT",

        body: formData

      }

    );

    const data = await res.json();

    if (res.ok) {

      localStorage.setItem(

        "user",

        JSON.stringify(data.user)

      );

      toast.success(
        "Profile Updated Successfully!"
      );

      navigate("/profile");

    }

    else {

      toast.error(data.message);

    }

  }

  catch (error) {

    console.log(error);

    toast.error("Update Failed");

  }

};

  return (
    <div className="edit-page">

      <div className="edit-box">

        <h2>Edit Profile</h2>

        <form onSubmit={handleSubmit}>

  <div className="profile-preview">
   <div className="input-group">

<label>

Profile Picture

</label>

<input

type="file"

accept="image/*"

onChange={handleImageChange}

/>

</div> 

  {

    profileImage ?

    (

      <img

        src={URL.createObjectURL(profileImage)}

        className="profile-avatar-image"

        alt="profile"

      />

    )

    :

    user?.profile_image ?

    (

      <img

        src={`http://localhost:5000/uploads/${user.profile_image}`}

        className="profile-avatar-image"

        alt="profile"

      />

    )

    :

    (

      <div className="profile-avatar">

        👤

      </div>

    )

  }

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