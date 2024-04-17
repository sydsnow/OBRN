import loginimg from '../assets/login-img.jpg';

function Login() {
  return (
    <div className="wrapper">
<div className="login">
    <div className="login-container">

        <form className="login-form">
        <div className="login-header">
        <h1>Login</h1>
        <p>Access back to your account</p>
        </div>
        <div className="form-group">
        <input className='input' type="email" required autoComplete='off' id="email" name="email" />

        <label className="label" htmlFor="email">            <i className="fa-regular fa-envelope"></i> Email</label>

        </div>
        <div className="form-group">
        <input className='input' type="password" id="password" required autoComplete='off' name="password" />
            <label className="label" htmlFor="password"> <i className="fa-solid fa-key"></i> Password</label>

        </div>
        <button type="submit">Login</button>
        <div className="login-forgot">
        <p><a href="#">Forgot Password?</a></p>
        </div>

        </form>

        <div className="login-register">
        <p>New User?&nbsp;<a href="#"> Register Account</a></p>
        </div>

    </div>
    <div className="login-aside">

    <img src={loginimg} alt="person loggin in" />
    </div>
</div>
</div>
  );
}
export default Login;
