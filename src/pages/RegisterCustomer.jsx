import registerimg from '../assets/register-img.jpg';

function RegisterCustomer(){
    return (
    <div className="wrapper">
    <div className="register">
    <div className="register-container">

        <form className="register-form">
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
        <input className='input' type="date" required autoComplete='off' id="date" name="date" />
        <label className="label" htmlFor="date"><i className="fa-regular fa-calendar"></i> Birthday</label>
        </div>
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
    </div>
    <div className="register-aside">

    <img src={registerimg} alt="person registering in" />
    </div>
</div>
</div>
    )
}
export default RegisterCustomer;