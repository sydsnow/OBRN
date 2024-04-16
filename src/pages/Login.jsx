import loginimg from '../assets/login-img.jpeg';

function Login() {
  return (
    <div className="wrapper">
<div className="login">
    <div className="login-container">
        <h1>Login</h1>
        <p>Access back to your account</p>
        <form>
        <div className="form-group">
            <label htmlFor="email">            <i className="fa-regular fa-envelope"></i>      Email</label>
            <input type="email" id="email" name="email" />

        </div>
        <div className="form-group">
            <label htmlFor="password"> <i className="fa-solid fa-key"></i> Password</label>
            <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Login</button>
        </form>
    </div>
    <div className="login-aside">
        <div className="login-img">
    <img src={loginimg} alt="person loggin in" />
    </div>
    </div>
</div>
</div>
  );
}
export default Login;
