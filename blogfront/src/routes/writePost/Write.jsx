import React, { useContext, useState } from 'react'
import {Nav} from '../../components'
import './Write.css'
import {RiAddCircleLine} from 'react-icons/ri'
import hero from '../../assets/hero.jpg'
import { Context } from '../../context/Context'
import axios from 'axios'

const Write = () => {
    const [title,setTitle]=useState("")
    const [content,setContent]=useState("")
    const [file,setFile]=useState(null)
    const {user}=useContext(Context)
    const [category,setCategory]=useState([])


    const handleSubmit=async(e)=>{
        e.preventDefault()
     const newPost={
            author:user.username,
            title,
            content,
            category,
        };
        if(file){
          const data =new FormData();  
          const filename=Date.now()+file.name;
          data.append("name",filename)
          data.append('file',file)
          newPost.cover=filename
        
        try {

           await axios.post('http://localhost:5000/api/v1/upload',data)
        }
        catch(error){
            return error
        }
    }
        try{
            const res =await axios.post('http://localhost:5000/api/v1/posts',newPost)
            console.log(res.data)
            res.data && window.location.replace(`/post/${res.data.posts._id}`)
        }
        catch(error){
            console.log(error)
        }
    }
    return (
        <div className='write-post'>
            <Nav/>
            {file?<div className="image-center">
            <img className=' image-cover' src={URL.createObjectURL(file)} alt='cover image'/>
         </div>:
         <div className="image-center">
            <img className=' image-cover' src={hero} alt='cover image'/>
         </div>}
        <form className='write-form' onSubmit={handleSubmit}>
        <div className='write-groupe'>
            <label htmlFor='file-input'>
                <RiAddCircleLine className='add-circle'/>
            </label>
           <input type='file' id="file-input" className='file-input' onChange={(e)=>{setFile(e.target.files[0])}}/>
           <div className='input-title-container'>
            <input type='text' placeholder='Title ...' className='title-input' autoFocus={true} onChange={(e)=>setTitle(e.target.value)}/>
           </div>
        </div>
        <div className='write-text-groupe'>          
            <textarea placeholder='Share your Story with Us !' type='text' className='text-input'onChange={(e)=>setContent(e.target.value)}></textarea>       
        </div>
        <div className="category-drop-down">
            <select className='select-cat' onChange={(e)=>
                setCategory(e.target.value)
                } >
                <option disabled className='cat-option'>
                    Choose a category
                </option>
                <option className='cat-option'>
                    Business Insider
                </option>
                <option className='cat-option'>
                    Sucess Story
                </option>
                <option className='cat-option'>
                    Crypto Currency
                </option>
                <option className='cat-option'>
                     Tech hack
                </option>
            </select>
        </div>
        <div className='btn-div'>
        <button className='publish-btn' type='submit'>Publish</button>
        </div>
        </form>  
        </div>
    )
}

export default Write
