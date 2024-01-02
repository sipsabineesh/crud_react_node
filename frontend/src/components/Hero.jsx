import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Hero = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>User Management System</h1>
          <p className='text-center mb-4'>
            {/* <img
        src="/bkgnd.jpg" // Replace with your image URL
        alt="Beautiful Landscape"
        className="home-image"
      /> */}
          </p>
          <div className='d-flex'>
          
          </div>
        </Card>
      </Container>
     
    </div>
  );
};

export default Hero;
