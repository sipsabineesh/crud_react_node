import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { Link ,Navigate,useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux';
import {getUserList} from '../slices/userSlice';
import { useAdminDeleteUsersMutation } from '../slices/usersApiSlice';


const AdminUsersListScreen = () => {

 const dispatch = useDispatch();
 const users = useSelector(state => state.users)
 const usersArray = Object.values(users);
 const navigate = useNavigate();
 const [deleteUser,{isLoading}] = useAdminDeleteUsersMutation();

 const handleDelete = async (id) => { 
  const confirmation = confirm("Do you really want to delete?")
  if(confirmation){
    try {
      const res = await deleteUser({id}).unwrap()
      window.location.reload(false);
    } catch (error) {
      console.log(error)
    }
  }
 }
  useEffect(() => {
    const fetchData = async() =>{
      try {
        const response = await axios.get('http://localhost:8000/api/users/getUsers')
        dispatch(getUserList(response.data))
      } catch (err) {
        
      }
    }
    fetchData();
  },[])
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <Link to='/createUser' className='btn btn-success btn-sm' >
          Add +
       </Link>
        
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th colSpan='2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              usersArray[0].map(user => {
               return  <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.createdAt}</td>
                  <td>
                    <Link to={`/updateUser/${user._id}`} className="btn btn-sm btn-success me-2">Edit</Link>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  
  )
}

export default AdminUsersListScreen