import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';
import { useUpdateUserMutation } from '../slices/usersApiSlice';


const AdminUserUpdateScreen = () => {
    const {id} = useParams()
    console.log("111111111111111111111111111111111111111111")
  console.log(id)
    const users = useSelector(state => state.users.users);
    console.log(users)
    
    const user = users.find( u => u._id === id)
    console.log(user)
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
  
    const dispatch = useDispatch();
   
    const [updateProfile, { isLoading }] = useUpdateUserMutation();
  
    useEffect(() => {
      setName(user.name);
      setEmail(user.email);
    }, [user.setName, user.setEmail]);
  
    const submitHandler = async (e) => {
      e.preventDefault();
   try {
      const res = await updateProfile({
          _id: user._id,
          name,
          email
      }).unwrap();
      dispatch(setCredentials({...res}))
          toast.success('Updated Successfully')
      }
   catch (err) {
       toast.error(err?.data?.message||err.error)
   }   
    };
    return (
      <FormContainer>
        <h1>Update User Details</h1>
  
        <Form onSubmit={submitHandler}>
          <Form.Group className='my-2' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className='my-2' controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
       
          <Button type='submit' variant='primary' className='mt-3'>
            Update
          </Button>
  
        </Form>
      </FormContainer>
    );
}

export default AdminUserUpdateScreen


