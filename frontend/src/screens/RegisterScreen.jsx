import { useState,useEffect } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import { Form,Button,Row,Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { useRegisterMutation  } from '../slices/usersApiSlice';
import { setCredientials } from '../slices/authSlice';


const RegisterScreen = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
 
    const navigate = useNavigate();

    const [register,{isLoading}] = useRegisterMutation();

    // useEffect(() => {
    //   if(userInfo){
    //     navigate('/');
    //   }
    //   },[navigate,userInfo])
    
    const { userInfo } = useSelector((state) => state.auth)
    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
          toast.error('Passwords do not match')
        }
        else{
          try {
            const res = await register({name,email,password}).unwrap();
            dispatchEvent(setCredientials({ ...res}));
            navigate('/')
          } catch (error) {
            
          }
        }
    }

    return (
        <FormContainer>
             <h1>Sign Up</h1>
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

               <Form.Group className='my-2' controlId = 'password'>
                <Form.Label>Password</Form.Label>
              <Form.Control
               type = 'password'
               placeholder = 'Enter Password'
               value = {password}
               onChange = { (e) => setPassword(e.target.value)}
              ></Form.Control>
               </Form.Group>
               <Form.Group className='my-2' controlId = 'confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
              <Form.Control
               type = 'password'
               placeholder = 'Confirm Password'
               value = {confirmPassword}
               onChange = { (e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
               </Form.Group>
               <Button type='submit' variant='primary' className='mt-3'>Sign Up</Button>
               <Row>
                <Col>
                Already have an account? <Link to='/login'>Sign In</Link>
                </Col>
               </Row>
             </Form>
        </FormContainer>
    )
}
export default RegisterScreen;