import { Link } from 'react-router-dom';

function TransactionConfirmation() {
  return (
    <div className="transaction-confirmation">
      <div className="transaction-confirmation-text">
        <h2>Woohoo! Your membership has been upgraded!</h2>
        <p>
          We're excited to let you know that your membership has been successfully upgraded. Enjoy your new benefits and thanks for being a valued member!
        </p>
        <Link to="/">Return to Homepage</Link>
      </div>
    </div>
  );
}

export default TransactionConfirmation;
