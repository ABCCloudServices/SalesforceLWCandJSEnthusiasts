import { LightningElement, api } from 'lwc';
//This controller is and it's references are just for representation. Implement your own controller in order to work with this component.
import saveReview from '@salesforce/apex/Controller.saveReview';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class WriteReviewPopup extends LightningElement {
  @api recordId;
  rating = 0;
  comment = '';
  stars = [];

  connectedCallback() {
    // Initialize the stars array
    this.stars = [
      { id: 1, className: 'star-empty' },
      { id: 2, className: 'star-empty' },
      { id: 3, className: 'star-empty' },
      { id: 4, className: 'star-empty' },
      { id: 5, className: 'star-empty' },
    ];
  }

  handleStarClick(event) {
    const clickedStar = parseInt(event.currentTarget.dataset.index, 10);
    this.rating = clickedStar;
    this.updateStarRating();
  }

  updateStarRating() {
    this.stars = this.stars.map((star) => {
      const isFilled = star.id <= this.rating;
      const className = isFilled ? 'star-filled' : 'star-empty';
      return {
        ...star,
        className,
      };
    });
  }

  handleCommentChange(event) {
    this.comment = event.target.value;
  }

  handleClosePopup() {
    this.dispatchEvent(new CustomEvent('closepopup'));
  }

  async handleSubmitReview() {
    if (this.rating === 0 || !this.comment.trim()) {
      this.showToast('Error', 'Please provide a rating and comment.', 'error');
      return;
    }

    try {
      await saveReview({
        comment: this.comment,
        recordId: this.recordId,
        rating: this.rating,
      });
      this.showToast('Success', 'Review submitted successfully!', 'success');
      this.handleClosePopup();
    } catch (error) {
      console.error('Error submitting review:', error);
      this.showToast(
        'Error',
        'Failed to submit review. Please try again.',
        'error'
      );
    }
  }

  showToast(title, message, variant) {
    this.dispatchEvent(
      new ShowToastEvent({
        title,
        message,
        variant,
      })
    );
  }
}