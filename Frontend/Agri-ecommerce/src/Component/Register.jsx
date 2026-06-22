import {useState}from "react";

import {useNavigate}from "react-router-dom";

import {registerUser}from "../Service/Api";

import "../CSS/Register.css";

const Register = ()=>{const navigate =useNavigate();

const [formData,setFormData]=useState({name:"",email:"",phone:"",password:"",confirmPassword:""});

const handleChange =(e)=>{setFormData({...formData,[e.target.name]:
e.target.value});
};

const handleSubmit =async(e)=>{e.preventDefault();

if(formData.password !==formData.confirmPassword){

alert("Passwords do not match");

return;

}

try{

const response =await registerUser({

name:formData.name,
email:formData.email,
phone:formData.phone,
password:formData.password});

alert(response.data.message);

navigate("/login");

}

catch(error){

console.log(error);

alert("Registration Failed");

}

};

return(

<div className="register-page">

<div className="register-card">

<div className="left-side">

<h1>
AMARSIDDHI
</h1>

<p>
KRISHI UDHYOG
</p>

<h2>
Welcome!
</h2>

<span>
Create your account
to continue shopping.
</span>

</div>

<form
className="register-form"
onSubmit={handleSubmit}
>

<h2>
Create Account
</h2>

<input
type="text"
name="name"
placeholder="Full Name"
onChange={handleChange}
required
/>

<input
type="email"
name="email"
placeholder="Email"
onChange={handleChange}
required
/>

<input
type="text"
name="phone"
placeholder="Phone Number"
onChange={handleChange}
required
/>

<input
type="password"
name="password"
placeholder="Password"
onChange={handleChange}
required
/>

<input
type="password"
name="confirmPassword"
placeholder="Confirm Password"
onChange={handleChange}
required
/>

<button type="submit">
Register
</button>

<p>

Already have account?

<span
onClick={()=>
navigate("/login")
}
>

Login Here

</span>

</p>

</form>

</div>

</div>

);

};

export default Register;