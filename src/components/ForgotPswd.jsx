import React,{ useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosService from '../common/ApiService';
import {toast} from 'react-toastify'
import useLogout from './Hooks/UseLogout';

function ForgotPswd() {

    const {token} = useParams();
  const [password, setPassword] = useState('')
  const logout = useLogout()
  const navigate = useNavigate()
  const handleResetPassword = async(token)=>{
      try {
        const response = await AxiosService.post(`/user/reset-password/:${token}` ,{password})
        if(response.data.message === 200){
          toast.success("Password Reset Successfully")
          navigate('/login')
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
              <h3 className="login-heading mb-4">Let's Your Password</h3>
              <form>
                <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Reset Your Password"  onChange={(e)=>setPassword(e.target.value)}/>
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="d-grid">
                  <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" onClick={handleResetPassword}>Reset Password</button>
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

export default ForgotPswd