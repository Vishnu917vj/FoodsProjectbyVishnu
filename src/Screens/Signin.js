import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Signin() {
    const [cred,setCred]=useState({name:"",location:"",email:"",password:""});
    const navigate=useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        const response=await fetch("https://foods-project-4.onrender.com/api/createuser",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(cred)

        })
        const json=await response.json();
        console.log(json)
        if(!json.succes){
            alert("Enter valid credentials")
        }
        else
    {
      alert("Account created successfully! \n please login wihth your credentials ");
      navigate("/");
    }
    }
    function change(e){
        setCred({...cred,[e.target.name]:e.target.value})
    }
  return (
    <div className="signin">
    <div className='container card bg-dark text-white ' style={{width: "20rem","border":"2px white solid"}}>
    <div className="container d-flex align-items-center justify-content-center">
    <form onSubmit={handleSubmit}>
    <div className="form-group ">
      <label htmlFor="name">name</label>
      <input value={cred.name} onChange={change} name="name" type="text" className="form-control" id="name"/>
    </div>
    <div className="form-group ">
      <label htmlFor="location">location</label>
      <input value={cred.location} onChange={change} name='location' type="text" className="form-control" id="location"/>
    </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input value={cred.email} onChange={change} name='email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Enter Password</label>
    <input value={cred.password} onChange={change}  name='password' type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <div className="container d-flex align-items-center justify-content-center">
  <button type="submit" className="btn btn-success" style={{border: "2px white solid",margin:"10px"}}>Submit</button>
  </div>
  <div className="d-flex align-items-center justify-content-center" >
  <Link className='btn btn-danger' style={{border: "2px white solid",margin:"10px"}} to={"/login"}>already a user?</Link>
  </div>
</form>

    </div>
    </div>
    </div>
  )
}

export default Signin