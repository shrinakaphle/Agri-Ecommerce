import { useNavigate } from "react-router-dom";
import {
FaUserCircle,
FaHeart,
FaBox,
FaSignOutAlt,
FaEdit
} from "react-icons/fa";
import {NavLink} from "react-router-dom";

import "../CSS/Profile.css";

const Profile = () => {

const navigate =
useNavigate();

const user =
JSON.parse(
localStorage.getItem("user")
);

const logout = ()=>{

localStorage.removeItem("token");
localStorage.removeItem("user");

navigate("/");
window.location.reload();

};

return (

<div className="profile-page">

<div className="profile-container">
<div className="profile-sidebar">

{/* Sidebar */}

<NavLink
to="/profile"
className={({isActive}) =>
isActive
? "sidebar-link active"
: "sidebar-link"
}
>
<FaUserCircle/>
My Profile
</NavLink>

<NavLink
to="/wishlist"
className={({isActive}) =>
isActive
? "sidebar-link active"
: "sidebar-link"
}
>
<FaHeart/>
Wishlist
</NavLink>

<NavLink
to="/Orders"
className={({isActive}) =>
isActive
? "sidebar-link active"
: "sidebar-link"
}
>
    <FaBox/>
Orders
</NavLink>

<NavLink
to="/edit-profile"
className={({isActive}) =>
isActive
? "sidebar-link active"
: "sidebar-link"
}
>
<FaEdit/>
Edit Profile
</NavLink>

{/* <div className="profile-sidebar">

<h2>
My Account
</h2>

<button
onClick={()=>
navigate("/profile")
}
>
<FaUserCircle />
My Profile
</button>

<button
onClick={()=>
navigate("/edit-profile")
}
>
<FaEdit />
Edit Profile
</button>

<button
onClick={()=>
navigate("/wishlist")
}
>
<FaHeart />
Wishlist
</button>

<button
onClick={()=>
navigate("/orders")
}
>
<FaBox />
Orders
</button> */}

<button
className="logout-btn"
onClick={logout}
>
<FaSignOutAlt />
Logout
</button>
</div>




{/* Content */}

<div className="profile-content">

<div className="profile-card">

{

user?.profile_image ?

(

<img

src={`http://localhost:5000/uploads/${user.profile_image}`}

alt="Profile"

className="profile-avatar-image"

/>

)

:

(

<FaUserCircle

className="profile-avatar"

/>

)

}

<h2>
{user?.name}
</h2>

<div className="info-row">

<strong>Email:</strong>

<span>
{user?.email}
</span>

</div>



<div className="info-row">

<strong>Phone:</strong>

<span>
{user?.phone || "Not Added"}
</span>

</div>

<div className="info-row">

<strong>Address:</strong>

<span>

{

user?.address ||

"Not Added"

}

</span>

</div>

</div>
</div>

<button
className="edit-btn"
onClick={()=>
navigate("/edit-profile")
}
>
Edit Profile
</button>

</div>

</div>






);

};

export default Profile;