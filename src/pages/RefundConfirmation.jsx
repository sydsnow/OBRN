import { Link } from 'react-router-dom';

function RefundConfirmation() {
  return (
    <div className="transaction-confirmation">
      <div className="transaction-confirmation-text">
        <h2>Aww, we are sad to see you go!</h2>
        <p>
          We have successfully processed your refund for the membership. The amount will be credited back to your original method of payment within the next 5-7 business days. We're sorry to see you go and hope to have the opportunity to serve you again in the future.
        </p>
        <p>
          <Link to="/">Return to Homepage</Link>
        </p>
      </div>
    </div>
  );
}

export default RefundConfirmation;