import React from 'react'
import './hero.css'
import hero from '../../assets/hero.jpg'
const Hero = () => {
    return (
        <div className='hero-container'>
            <img className='image-hero' src={hero} alt='hero image'/>
            <div className='hero-desc'>
              <h1 className='blog-title'>
                  <span aria-hidden="true">
                      Girls in tech
                  </span>
                  Girls in tech
                   <span aria-hidden="true">
                      Girls in tech
                  </span>
                  </h1> 
                   
               <h2 className='title-2'>New Post every monday</h2>
            </div>
        </div>
    )
}

export default Hero
