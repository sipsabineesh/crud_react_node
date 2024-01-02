import { useState, useEffect } from 'react';
import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: 'YOUR_CLOUD_NAME',
//   api_key: 'YOUR_API_KEY',
//   api_secret: 'YOUR_API_SECRET',
// });

const ProfileScreen = () => {
  const preset_key = "mern_auth" ;
  const cloud_name = "dcsdqiiwr";
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleFile = (e) => {
    const uploadedFile = e.target.files[0];
    setProfilePhoto(URL.createObjectURL(uploadedFile));
  }
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  console.log('-------------------------')
  console.log(userInfo);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setProfilePhoto(userInfo.profilePhoto);

  }, [userInfo.setName, userInfo.setEmail]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file',profilePhoto)
    formData.append('upload_preset',preset_key)
    axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)
    .then(res => setProfilePhoto(res.data.secure_url))
    .catch(err => console.log(err))
    // const uploadedPhoto = await cloudinary.uploader.upload( e.target.files[0], {
    //   folder: 'profile-photos', 
    // });
   // console.log('Profile photo uploaded:', uploadedPhoto.secure_url);
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
 try {
    const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
        password,
        profilePhoto,
    }).unwrap();
    dispatch(setCredentials({...res}))
        toast.success('Profile updated')
    }
 catch (err) {
     toast.error(err?.data?.message||err.error)
 }    }
  };
  return (
    <FormContainer>
      <h1>Update Profile</h1>

      <Form onSubmit={submitHandler}>
      {profilePhoto && ( 
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img 
          src={profilePhoto}
          alt='profile-photo'
          style={{ height: '100px', width: '100px' }} 
        />
        </div>
       
      )}
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
      
      <Form.Group className='my-2' controlId='profilePhoto'>
          <Form.Label>Profile Photo</Form.Label>
          <Form.Control
             type="file" 
             name = "profilePhoto"
             onChange={handleFile}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Update
        </Button>

      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
