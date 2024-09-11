import React from 'react'
import { Link,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react';
import { Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cart from './Cart';
import { useCart } from './ContextRed';
function Navbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const length = useCart().length;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  }
//   const verify = async () => {
//     try {
//       console.log(document.cookie.split("=")[1] )
//         const res = await fetch("http://localhost:5000/api/verifyuser", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body:{
//               "token":localStorage.getItem("token")
//             }
//         });
//         const data = await res.json();
//         console.log(data);

//         if (data.succes) {
//             setIsAuthenticated(true);
//         } else {
//             setIsAuthenticated(false);
//         }
//     } catch (error) {
//         console.error("Error verifying user:", error.message);
//         // Optionally show an error message to the user
//     }
// };
  useEffect(()=>{
    // verify();
    localStorage.getItem("token") ? setIsAuthenticated(true) : setIsAuthenticated(false)
    console.log(document.cookie.split("="))
  },[])
  return (
    <div className='NavbarMain'><nav className="navbar navbar-expand-lg navbar-light ">
    <Link className="navbar-brand fs-1  fst-italic ms-5" to="/">VJSFood</Link>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className="btn btn btn-outline-success  " to="/">Home</Link>
        {
          isAuthenticated ?<div className="btn btn btn-outline-success  mx-2 me-5" onClick={handleShow}>myCart <Badge bg="danger">{length}</Badge></div>: null
        }
      </div>
    </div>
    <div className='d-flex'>
      {
        isAuthenticated ? <><Link className='mx-2 btn btn btn-outline-success' to="/myorders" >myorders</Link><div className="btn btn btn-outline-success mx-2" onClick={handleLogout}>Logout</div> </>
        :<> <Link className="btn btn btn-outline-success mx-2" to="/login">Login</Link>
        <Link className="btn btn btn-outline-success mx-2 me-5" to="/signin">Signin</Link></>
      }
      </div>
  </nav>
  <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body><Cart></Cart></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  </div>
  )
}

export default Navbar
