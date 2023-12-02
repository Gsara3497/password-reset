import React,{ useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosService from '../common/ApiService';
import {toast} from 'react-toastify'
import useLogout from './Hooks/UseLogout';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormGroup } from 'react-bootstrap';

function ForgotPswd() {

  const { token } = useParams();
  const [password, setPassword] = useState('')
  const [enteredToken, setEnteredToken] = useState('');
  const logout = useLogout()
  const navigate = useNavigate()

  // useEffect(() => {
  //   const handleScroll = (event) => {
  //     // Your scroll handling code
  //   };

  //   window.addEventListener('scroll', handleScroll, { passive: false });

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

    const handleResetPassword = async(e)=>{
      e.preventDefault();
    // Check if the entered token matches the token from the Url
    if(enteredToken !== token){
      toast.error("Invalid token, Please try again.");
      return;
    }
      // console.log("Token:",token);
      // console.log("EnteredToken:",enteredToken);
      try {
        const response = await AxiosService.post(`/user/getreset-password/${token}` ,{password})
        if(response.status === 200){
          toast.success("Password Reset Successfully")
          navigate('/login')
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message)
        if(error.response.status === 401)
        {
          logout();
        }
      }  
  }
  console.log('Token:', token);
  console.log("EnteredToken:", enteredToken)
  return <>

<div className="container-fluid">
    <div className="row g-0 justify-content-center align-items-center">
    <div className="col-md-8 col-lg-6">
      <div className="login d-flex align-items-center p-5">
        <div className="container">
          <div className="row">
            <div className="col-md-9 text-center">
              <h3 className="login-heading mb-4">Lets Reset Your Password</h3>
            </div>  

            <Form>
              <FormGroup>
                <Form.Label>Token</Form.Label>
                <Form.Control type="text" placeholder="Enter the token get from your email" onChange={(e)=>setEnteredToken(e.target.value)} />
              </FormGroup>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter new password" onChange={(e)=>setPassword(e.target.value)} />
              </Form.Group>

              <div className='col-md-9 text-center'>
                <Button variant="primary" onClick= {(e)=>handleResetPassword(e)}>
                  Reset Password
                </Button>
                <br />
                <br />
                <Button variant="primary" onClick= {()=>navigate('/login')}>
                  Back
                </Button>
              </div>
            </Form>        
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  </>
}

export default ForgotPswd