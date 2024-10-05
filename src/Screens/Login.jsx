import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [cred, setCred] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  function change(e) {
    setCred({ ...cred, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("https://foods-project-4.onrender.com/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cred),
    });
    const json = await response.json();
    if (!json.succes) {
      alert("Enter valid credentials");
    }
    else
    {
      localStorage.setItem("email",cred.email);
      localStorage.setItem("token",document.cookie.split("=")[1]);
      navigate("/");
    }
  }
  return (
    <div className="login " >
      <div className='container card bg-dark text-white' style={{width: "20rem","border":"2px white solid"}}>
    <div className="container d-flex align-items-center justify-content-center">
    <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input value={cred.email} onChange={change} name='email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Enter Password</label>
    <input value={cred.password} onChange={change}  name='password' type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <div className="container d-flex align-items-center justify-content-center">
  <button type="submit" className="btn btn-success mx-2" style={{border: "2px white solid",margin:"10px"}}>Submit</button>
  </div>
  <div className="d-flex align-items-center justify-content-center" style={{border: "2px white solid",margin:"10px"}}>
  <Link className='btn btn-danger' to="/signin">dont have an account?</Link>
  </div>
</form>
    </div>
    </div>
    </div>
  )
}

export default Login