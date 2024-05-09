import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";



const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/create", {
        name,
        email,
        phone,
        date,
      });

      console.log(response.data);
      setName("");
      setEmail("");
      setPhone("");
      setDate("");
      toast.success("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  return (
    <div>
      <div className="main-bg">
        <div className="left-container">
          <h1>Create User</h1>

         
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="name">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="Phone">Phone</label>

            <input
              type="number"
              value={phone}
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="Date">Date</label>
            <input
              type="date"
              value={date}
              placeholder="Date"
              onChange={(e) => setDate(e.target.value)}
            />

            <button type="submit" onClick={handleSubmit}>Submit</button>
         
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
