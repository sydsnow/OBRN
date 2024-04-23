import  { Component } from 'react';
import PropTypes from 'prop-types';

class Countdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }

    componentDidMount() {
        this.interval = setInterval(this.updateCountdown, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    updateCountdown = () => {
        const { end } = this.props;
        const endDate = new Date(end).getTime();
        const now = new Date().getTime();
        const timeDifference = endDate - now;

        if (timeDifference <= 0) {
            clearInterval(this.interval);
            // Countdown has ended
            this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            this.setState({ days, hours, minutes, seconds });
        }
    };

    render() {
        const { days, hours, minutes, seconds } = this.state;
        return (
            <div className="home-countdown-container">
                <div className="home-countdown-info">
                    <div className="home-countdown-box">
                    <h5>{days}</h5>
                    <p>Days</p>
                    </div>
                    <div className="home-countdown-box">
                    <h5>{hours}</h5>
                    <p>Hours</p>
                    </div>
                    <div className="home-countdown-box">
                    <h5>{minutes}</h5>
                    <p>Minutes</p>
                    </div>
                    <div className="home-countdown-box">
                    <h5>{seconds}</h5>
                    <p>Seconds</p>
                    </div>
                </div>
            </div>
        );
    }
}

Countdown.propTypes = {
    end: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired
};

export default Countdown;
