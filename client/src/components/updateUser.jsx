import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const {id} = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      
      try {
        
        const response = await axios.get(`http://localhost:8000/user/${id}`); // Adjust the URL as per your backend route
        const userData = response.data.user;
        setName(userData.name);
        setEmail(userData.email);
        setPhone(userData.phone);
        setDate(userData.date.split('T')[0]);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleUpdate = async() => {
    try {
      const response = await axios.put(`http://localhost:8000/user/${id}`, {
        name,
        email,
        phone,
        date
      });
      console.log(response.data);
      toast.success("User Updated Successfully")
     
    } catch (error) {
      console.error("Error updating user:", error);
      
    }
  }
  
  return (
    <div>
        <div className="main-bg">
        <div className="left-container">
            <h1>Update User</h1>
         <label htmlFor="name">Name</label>
          <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)}/>
         
          <label htmlFor="name">Email</label>
          <input type="email" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
          
          <label htmlFor="Phone">Phone</label>
          
          <input type="number" value={phone} placeholder="Phone" onChange={(e)=>setPhone(e.target.value)}/>
          <label htmlFor="Date">Date</label>
          <input type="date" value={date} placeholder="Date" onChange={(e)=>setDate(e.target.value)}/>
          
          <button type="submit" onClick={handleUpdate}>Update User</button>
        </div>
      </div>
    </div>
  )
}

export default UpdateUser

   
