import {Link} from "react-router-dom"


const Home = () => {
  return (
    <div>
        <div className="main-bg">
        <div className="btn">
          <Link to={"/getuser"}><button>Get User</button></Link>
           <Link to={"/create"}><button>Create User</button></Link>
          
           
        </div>
        <div className="right-container">
          
          
          
        </div>

       
      </div>
    </div>
  )
}

export default Home