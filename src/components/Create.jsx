import React,{ useState } from 'react'
import AxiosService from '../common/ApiService'
import UseLogout from './Hooks/UseLogout'
import { useNavigate } from 'react-router-dom'

function Create() {
    const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  const logout = UseLogout()
  const navigate = useNavigate()

  const handleSignUp = async()=>{
    try {
      const response = await AxiosService.post('/user', {email,password})

      if(response.status === 201){
        toast.success("User Created Successfully")
        navigate('/dashboard')
      }
    } catch (error) {
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
            <div className="col-md-9 text-center">
              <h3 className="login-heading mb-4">Let's Create Your Account</h3>
              <form>

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


              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  </>
}

export default Create