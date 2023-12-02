import React,{ useState } from 'react'
import AxiosService from '../common/ApiService'
import UseLogout from './Hooks/UseLogout'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Create() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  const logout = UseLogout()
  const navigate = useNavigate()

  const handleSignUp = async()=>{
    try {
      const response = await AxiosService.post('/user/signup', {name,email,password})

      if(response.status === 201){
        toast.success("User Created Successfully")
        navigate('/dashboard')
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message)
        if(error.response.status===401)
        {
          logout();
        }
    }
  }
  return <>
  
  <div className="container-fluid">
    <div className="row g-0 justify-content-center align-items-center">
    <div className="col-md-8 col-lg-6">
      <div className="login d-flex align-items-center p-5">
        <div className="container">
          <div className="row">
            <div className="col-md-9 text-center ps-4">
              <h3 className="login-heading mb-4">Let's Create Your Account</h3>
            </div>
              <Form>

                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" onChange={(e)=>setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                </Form.Group>

                <div className='col-md-9 text-center'>
                <Button variant="primary" onClick= {(e)=>handleSignUp(e)}>
                  Sign In
                </Button>
                <br />
                <br />
                Already a Member? <Link to={'/login'}>Login</Link>

                </div>
              </Form>

              {/* <form>

                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="floatingEmail" placeholder="Enter Your Email Id"  onChange={(e)=>setEmail(e.target.value)}/>
                  <label htmlFor="floatingEmail">Email</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Enter Your Password"  onChange={(e)=>setPassword(e.target.value)}/>
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="d-grid">
                  <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" onClick={handleSignUp}>Sign Up</button>
                </div>

                <div className="d-grid">
                Already a Member? <Link to={'/login'}>Login</Link>
                </div>


              </form> */}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  </>
}

export default Create