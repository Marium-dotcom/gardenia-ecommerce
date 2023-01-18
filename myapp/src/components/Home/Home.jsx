import React from 'react'
import { Link } from 'react-router-dom';
import homeIMG from  '../../Assets/Home.png'
import Navbar from '../Navbar/Navbar';

import homeStyle from './Home.module.css';
import Products from './Products/Products';
import Search from './Search/Search'


    function Slider() {
      return (

        <>
        <Navbar/>

                {/* <Carousel >
          <Carousel.Item>
            <img
              className="d-block w-100 imgSlider"
              src={slider1}
              alt="First slide"/>
    
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 imgSlider"
              src={slider3}
              alt="Second slide"/>
    

          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 imgSlider"
              src={slider2}
              alt="Third slide"/>
    
          
          </Carousel.Item>
        </Carousel>  */}

<div className="">
<div className= {` ${homeStyle.mainHome}  ` }  >
  <div className={`${homeStyle.mediaQ} container d-flex justify-content-around align-items-center h-100 ` }>
  <img className={`${homeStyle.animate} ${homeStyle.img}   `} src={homeIMG} alt="img" />
  <span> 
   <h3 className='text-white '>Welcome to</h3>  
   <h1 className={homeStyle.miniHome}>Gardenia House</h1>
   <h4>Lorem ipsum dolor sit amet.</h4>
   <button className='btn btn-lg btn-danger text-white'><Link className='text-white text-decoration-none' to="products">Shop Now</Link> </button>
</span>
</div></div></div>

        </>
     );
    }
    
    export default Slider;

  

