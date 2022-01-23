import React from 'react'
import './footer.css'
import {RiRedditLine, RiLinkedinLine,RiTwitterLine,RiSearch2Line,RiSendPlaneLine,RiTerminalLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='footer-links'>
            <Link className='f-link' to=''>
                Categories
            </Link>
            <Link className='f-link'  to=''>
                Posts
            </Link>
            <Link className='f-link' to=''>
                Privacy Policy
            </Link>
            </div>
            
          <p className='footer-text'>©2022, All rights reserved</p>
          <div className='footer-icons'>
               <a href='https://www.linkedin.com/in/rihab-sabri-44292b186/' target='_blank'><RiLinkedinLine className='icon-sidebar icon-footer'/></a>
              <a href='https://www.reddit.com/user/emilia_ravenclaw' target='_blank'><RiRedditLine className='icon-sidebar icon-footer'/></a>
               <a href='https://twitter.com/sabri_rihab' target='_blank'><RiTwitterLine className='icon-sidebar  icon-footer'/></a>
          </div>
        </div>
    )
}

export default Footer

