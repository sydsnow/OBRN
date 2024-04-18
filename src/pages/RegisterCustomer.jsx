import { useState } from 'react';
import registerimg from '../assets/register-img.jpg';

const RegisterCustomer = () => {
    const [birthday, setBirthday] = useState('');
    const [error, setError] = useState('');
  
    const handleInputChange = (e) => {
      const value = e.target.value;
      setBirthday(value);
    };
  
    const validateBirthday = () => {
      const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
      if (!regex.test(birthday)) {
        setError('Please enter a valid date in the format DD/MM/YYYY');
        return false;
      } else {
        setError('');
        return true;
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateBirthday()) {
        // Submit form if birthday is valid
        console.log('Form submitted!');
      }
    };
    return (
    <div className="wrapper">
    <div className="register">
    <div className="register-container">

    <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-header">
        <h1>Customer Registration</h1>
        <p>Please fill out the following details</p>
        </div>
        <div className="form-group">
        <input className='input' type="firstname" required autoComplete='off' id="firstname" name="firstname" />
        <label className="label" htmlFor="firstname">            <i className="fa-solid fa-user"></i> First Name</label>
        </div>
        <div className="form-group">
        <input className='input' type="lastname" required autoComplete='off' id="lastname" name="lastname" />
        <label className="label" htmlFor="lastname">            <i className="fa-regular fa-user"></i> Last Name</label>
        </div>
        <div className="form-group">
        <input className='input' type="phone" required autoComplete='off' id="phone" name="phone" />
        <label className="label" htmlFor="phone">            <i className="fa-solid fa-phone"></i> Phone</label>
        </div>
        <div className="form-group">
              <input
                className="input2"
                type="text"
                placeholder="DD/MM/YYYY"
                value={birthday}
                onChange={handleInputChange}
                onBlur={validateBirthday}
                id="birthday"
                name="birthday"
              />
              <label className="label" htmlFor="birthday">
                <i className="fa-regular fa-calendar"></i> Birthday
              </label>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        {/* <div className="form-group">
        <input className='input2' type="date" required autoComplete='off' id="date" name="date" />
        <label className="label" htmlFor="date"><i className="fa-regular fa-calendar"></i> Birthday</label>
        </div> */}
        <div className="form-group">
        <input className='input' type="email" required autoComplete='off' id="email" name="email" />
        <label className="label" htmlFor="email">            <i className="fa-regular fa-envelope"></i> Email</label>
        </div>
        <div className="form-group">
        <input className='input' type="username" required autoComplete='off' id="username" name="username" />
        <label className="label" htmlFor="username">            <i className="fa-regular fa-circle-user"></i> Username</label>
        </div>
        <div className="form-group">
        <input className='input' type="password" id="password" required autoComplete='off' name="password" />
        <label className="label" htmlFor="password"> <i className="fa-solid fa-key"></i> Password</label>
        </div>
        <div className="form-group">
        <input className='input' type="password" id="password" required autoComplete='off' name="password" />
        <label className="label" htmlFor="password"> <i className="fa-solid fa-key"></i> Confirm Password</label>
        </div>
        <div className="form-group">
    <input className='input-checkbox' type="checkbox" id="overEighteen" name="overEighteen" required />
    <label  htmlFor="overEighteen">I confirm that I am over 18 years old</label>
</div>

        <button type="submit">Register</button>
        </form>

        <div className="register-login">
        <p>Already a user?&nbsp;<a href="#"> Login</a></p>
        </div>
    </div>
    <div className="register-aside">

    <img src={registerimg} alt="person registering in" />
    </div>
</div>
</div>
    )
}
export default RegisterCustomer;