import { LocalStorageTrybeComments } from '../types';

function Comments({ email, rating, text }: LocalStorageTrybeComments) {
  return (
    <div className="comment grid">
      <p data-testid="review-card-email">{email}</p>
      <p data-testid="review-card-rating">{rating}</p>
      <p data-testid="review-card-evaluation">{text}</p>
    </div>
  );
}

export default Comments;
