import React from 'react'
import pic1 from './Carouselimages/image.png'
import pic2 from './Carouselimages/image2.png'
import pic3 from './Carouselimages/image3.png'
function Carousel() {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" >
    <ol className="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div className="carousel-inner" id='carousel' style={{objectFit:"contain !important"}}>
      <div className='carousel-caption ' style={{"zIndex":"10"}}>
      <form className="d-flex my-2 my-lg-0">
      <input className="form-control mr-sm-2 " type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success text-white bg-success my-2 my-sm-0" type="submit">Search</button>
    </form>
      </div>
      <div className="carousel-item active">
        <img className="d-block w-100" src={pic1} alt="First slide"/>
      </div>
      <div className="carousel-item">
        <img className="d-block w-100" src={pic2} alt="Second slide"/>
      </div>
      <div className="carousel-item">
        <img className="d-block w-100" src={pic3} alt="Third slide"/>
      </div>
    </div>
    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
  )
}

export default Carousel