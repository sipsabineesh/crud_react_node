import { useState,useEffect } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import { Form,Button,Row,Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { useCreateUsersMutation  } from '../slices/usersApiSlice';
import { createUser } from '../slices/userSlice';
import { setCredentials } from '../slices/authSlice';
import {toast} from 'react-toastify';

const CreateUserScreen = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
 
    const navigate = useNavigate();

    const [createUser,{isLoading}] = useCreateUsersMutation();
    
    const { userInfo } = useSelector((state) => state.auth)

    const dispatch = useDispatch();

    useEffect(() => {
      if(!userInfo){
        navigate('/');
      }
      },[navigate,userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
          try {
            const res = await createUser({name,email}).unwrap()
          // axios.post('http://localhost:3000/createUsers',{ name,email})
                // dispatch(createUser(res.data))
                toast.success("User Added Successfully")
                navigate('/getUsers');
          } catch (error) {
            
          }
        }
    

    return (
        <FormContainer>
             <h1>Create User</h1>
             <Form onSubmit={ submitHandler }>
                <Form.Group className='my-2' controlId = 'name'>
                <Form.Label>Name</Form.Label>
              <Form.Control
               type = 'text'
               placeholder = 'Enter Name'
               value = {name}
               onChange = { (e) => setName(e.target.value)}
              ></Form.Control>
               </Form.Group>

               <Form.Group className='my-2' controlId = 'email'>
                <Form.Label>Email Address</Form.Label>
              <Form.Control
               type = 'email'
               placeholder = 'Enter Email'
               value = {email}
               onChange = { (e) => setEmail(e.target.value)}
              ></Form.Control>
               </Form.Group>

              
               <Button type='submit' variant='primary' className='mt-3'>Submit</Button>
              
             </Form>
        </FormContainer>
    )
}
export default CreateUserScreen;