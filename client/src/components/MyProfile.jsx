import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import {Link, useParams} from "react-router-dom"

const MyProfile = () => {
  const [users, setUsers] = useState([]);
  const {id} = useParams();

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/get-user");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/user/${id}`);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      console.log(response.data);
      toast.success("User Delete Successfully");
      
    } catch (error) {
      console.error("Error deleting user:", error);
       
    }
  } 
  return (
    <div>
      <div className="main-bg">
        <div className="user-table-container">
          <h2>User Table</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{formatDate(user.date)}</td>
                  <td>
                    <Link to={`/update/${user.id}`}><button className="edit-button">
                      <FaEdit />
                    </button></Link>
                  </td>
                  <td>
                    <button type="button" className="delete-button" onClick={()=>deleteUser(user.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
