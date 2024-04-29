import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authUtils';
import loginimg from '../assets/login-img.jpg';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(formData);
        setErrorMessage('');
        if (!result) {
            setErrorMessage('Incorrect email or password entered. Please try again.');
        } else {
            navigate('/');
        }
    };

  return (
    <div className="wrapper">
    <div className="login">
    <div className="login-container">

        <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-header">
        <h1>Login</h1>
        <p>Access back to your account</p>
        </div>
        <div className="form-group">
        <input 
            className='input' 
            type="email" 
            required 
            autoComplete='off' 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
        />

        <label className="label" htmlFor="email">            <i className="fa-regular fa-envelope"></i> Email</label>

        </div>
        <div className="form-group">
        <input 
            className='input' 
            type="password" 
            id="password" 
            required 
            autoComplete='off' 
            name="password"
            value={formData.password}
            onChange={handleChange} 
        />
            <label className="label" htmlFor="password"> <i className="fa-solid fa-key"></i> Password</label>

        </div>
        <button type="submit">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="login-forgot">
        <p><a href="#">Forgot Password?</a></p>
        </div>

        </form>

        <div className="login-register">
        <p>New User?&nbsp;<a href="#"> Register Account</a></p>
        </div>

    </div>
    <div className="login-aside">
        <div className="login-img">
    <img src={loginimg} alt="person logging in" />
        </div>
    </div>
</div>
</div>
  );
}
export default Login;