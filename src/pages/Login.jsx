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
        </form>
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
