import React, { useState } from "react";

const Form = () => {
    const[formData , setFormData] = useState({
        username :"",
        email:"",

    })

    const[submitData , setsubmitData]= useState(null)

const handleChange = (e) => {
    const{name,value} = e.target
    setFormData({
        ...formData,
        [name]:value
        
    })
   }

   const handleSubmit = (e) => {
    e.preventDefault();
    setsubmitData(formData)
    setFormData({
        username:"",
        email :""
    })


   }

    return (
        <>
        <div  className='container'>
 <form onSubmit={handleSubmit}>
    <div>
    <label>Username:</label>
    <input type="text" placeholder="enter username"  onChange={handleChange} value={formData.username} 
       name="username"/>
    </div>
    <div>
        <label>email:</label>
        <input type="email" placeholder="enter your email" onChange={handleChange} value={formData.email} 
        name="email"/>
    </div>
    <button type="submit">submit</button>
 </form>

    {submitData && (
        <div>
       <h3>data submit</h3>
       <p>username is : {submitData.username}</p>
       <p>email is : {submitData.email}</p>

        </div>
    )}


        </div>
        
        
        </>
    )
}
export default Form;