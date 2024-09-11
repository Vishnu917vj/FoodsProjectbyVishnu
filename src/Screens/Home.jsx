import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Card from '../Components/Card';
import { Carousel } from 'react-bootstrap'; // Using react-bootstrap Carousel
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import pic1 from '../Components/Carouselimages/image.png'
import pic2 from '../Components/Carouselimages/image2.png'
import pic3 from '../Components/Carouselimages/image3.png'

function Home() {
  const [search, setSearch] = useState('');
  const [food, setFood] = useState([]);
  const [cat, setCat] = useState([]);

  const data = async () => {
    const jdata = await fetch('http://localhost:5000/api/fetchData', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await jdata.json();
    setFood(json[0]);
    setCat(json[1]);
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <div className="Home">
      <div>
      <Navbar />
      </div>
      {/* Carousel with Custom Height */}
      <div className="position-relative">
        {/* Carousel */}
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={pic1}
              alt="First slide"
              style={{ height: '500px', objectFit: 'contain !important',"filter":"brightness(30%)" }}  // Setting height and object fit
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={pic2}
              alt="Second slide"
              style={{ height: '500px', objectFit: 'contain !important',"filter":"brightness(30%)" }}  // Setting height and object fit
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={pic3}
              alt="Third slide"
              style={{ height: '500px', objectFit: 'contain !important',"filter":"brightness(30%)" }}  // Setting height and object fit
            />
          </Carousel.Item>
        </Carousel>

        {/* Search Bar Positioned at the Bottom of the Carousel */}
        <div className="position-absolute bottom-0 start-0 w-100 mb-3" style={{ zIndex: 10 }}>
          <form className="d-flex justify-content-center">
            <input
              className="form-control me-2 w-50"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success text-white bg-success"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="container mt-5">
        <div>
          {cat.map((item) => (
            <>
              <hr />
              <div
                className="text-center"
                style={{ color: '#FF8C00', fontSize: '30px' }}
              >
                {item.CategoryName}
              </div>
              <hr />
              <div className="row">
                {food
                  .filter(
                    (foodItem) =>
                      foodItem.CategoryName === item.CategoryName &&
                      foodItem.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((foodItem) => (
                    <div
                      key={foodItem._id}
                      className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3"
                    >
                      <Card food={foodItem}/>
                    </div>
                  ))}
              </div>
            </>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
