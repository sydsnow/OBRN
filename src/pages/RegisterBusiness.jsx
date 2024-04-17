import registerbsn from '../assets/register-bsn.jpg';

function RegisterBusiness(){
    return (
    <div className="wrapper">
    <div className="register">
    <div className="register-business-container">
    <div className="register-header">
        <h1>Business Registration</h1>
        <p>Please fill out the following details</p>
        </div>
        <form className="register-business-form">

        <div className="register-business-block">
        <div className="form-group">
        <input className='input' type="businessname" required autoComplete='off' id="businessname" name="businessname" />
        <label className="label" htmlFor="businessname"><i className="fa-solid fa-building"></i> Business Name</label>
        </div>
        <div className="form-group">
        <input className='input' type="contactname" required autoComplete='off' id="contactname" name="contactname" />
        <label className="label" htmlFor="contactname"><i className="fa-regular fa-user"></i> Contact Name</label>
        </div>
        <div className="form-group">
        <input className='input' type="phone" required autoComplete='off' id="phone" name="phone" />
        <label className="label" htmlFor="phone"><i className="fa-solid fa-phone"></i> Phone</label>
        </div>
        <div className="form-group">
        <input className='input' type="address" required autoComplete='off' id="address" name="address" />
        <label className="label" htmlFor="address"><i className="fa-solid fa-location-dot"></i> Street Address</label>
        </div>
        <div className="form-group">
        <input className='input' type="city" required autoComplete='off' id="city" name="city" />
        <label className="label" htmlFor="city"> City</label>
        </div>
        <div className="form-group">
        <input className='input' type="address" required autoComplete='off' id="address" name="address" />
        <label className="label" htmlFor="address"> Street Address</label>
        </div>
        <div className="form-group">
        <input className='input' type="province" required autoComplete='off' id="province" name="province" />
        <label className="label" htmlFor="province">Province</label>
        </div>
        <div className="form-group">
        <input className='input' type="email" required autoComplete='off' id="email" name="email" />
        <label className="label" htmlFor="email">            <i className="fa-regular fa-envelope"></i> Email</label>
        </div>
        </div>
        <div className="register-business-block">

        <div className="form-group">
        <input className='input' type="insurance" id="insurance" required autoComplete='off' name="insurance" />
        <label className="label" htmlFor="insurance"> Insurance Company</label>
        </div> 
        <div className="form-group">
        <input className='input' type="date" required autoComplete='off' id="date" name="date" />
        <label className="label" htmlFor="date"> Insurance Expiry</label>
        </div>
        <div className="form-group">
        <input className='input' type="file" required id="file" name="file" />
        <label className="label" htmlFor="file">
        <i className="fa-solid fa-upload"></i> Business License</label>
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

        <button type="submit">Register</button>
        </div>
        </form>
    </div>
    <div className="register-business-aside">

    <img src={registerbsn} alt="person registering in" />
    </div>
</div>
</div>
    )
}
export default RegisterBusiness;