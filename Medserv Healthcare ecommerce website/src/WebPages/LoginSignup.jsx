import React from 'react'
import './WebPages CSS/LoginSignup.css'

const LoginSignup = () => {
  return (
    <div>
      <div class="container">
        <div className="form-container">
        <div className="existing-user">
        <div className="signIn-headding">
        <h3>Are you registered?</h3>
        <p>If you have an account with us,log in using your email address</p>
        </div>
        <form>
            <div class="form-group">
                <input type="email" id="email" name="email" placeholder='Email Address'required/>
            </div>
            <div class="form-group">
                <input type="password" id="password" name="password" placeholder='Password' required/>
            </div>
            <div class="form-group">
                <a href="#" className='new-password'>Forgot your password?</a>
            </div>
            <button type="submit">Sign In</button>
        </form>
        </div>

        <div class="new-user">
          <div className="register-headding">
            <h3>New to Medserv?</h3>
            <p>Fill following details to create an account</p>
            </div>
            <form>
              <div className="register">
                <div class="form-group">
                    <input type="text" id="first-name" name="first-name" placeholder='First Name' required/>
                </div>
                <div class="form-group">
                    <input type="text" id="last-name" name="last-name" placeholder='Last Name' required/>
                </div>
                <div class="form-group">
                    <input type="email" id="email" name="email" placeholder='Email Address' required/>
                </div>
                <div class="form-group">
                    <input type="tel" id="mobile-number" name="mobile-number" placeholder='Mobile Number' required/>
                </div>
                <div class="form-group">
                    <input type="text" id="address" name="address" placeholder='Address' required/>
                </div>
                <div class="form-group">
                <select id="city" name="city" required placeholder="Select your city">
                      <option value="">Select your city</option>
                       <option value="Colombo">Colombo</option>
                       <option value="Kandy">Kandy</option>
                       <option value="Jaffna">Jaffna</option>
                       <option value="Galle">Galle</option>
                    </select>
                </div>
                <div class="form-group">
                    <input type="password" id="password" name="password" placeholder='Password' required/>
                    <p className='rule'>Your password must be atleast 8 characters long,contaning letters and numbers</p>

                </div>
                <div class="form-group">
                    <input type="password" id="confirm-password" name="confirm-password" placeholder='Confirm Password' required/>
                </div>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    </div>
    </div>
 
    </div>
  )
}

export default LoginSignup