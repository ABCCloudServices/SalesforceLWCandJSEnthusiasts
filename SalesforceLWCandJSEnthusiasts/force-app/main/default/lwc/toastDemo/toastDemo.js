import { LightningElement, track } from 'lwc';

export default class ToastDemo extends LightningElement {
  @track showCustomToast = false;
  toastVariant = 'info';
  toastMessage = '';
  toastMessageData = '';
  toastDuration = 5000;
  toastActionLabel = '';

  showSuccessToast() {
    this.toastVariant = 'success';
    this.toastMessage = 'Operation completed successfully.';
    this.toastActionLabel = 'View Details';
    this.showCustomToast = true;
  }

  showErrorToast() {
    this.toastVariant = 'error';
    this.toastMessage = 'An error occurred while processing your request.';
    this.toastActionLabel = 'Retry';
    this.showCustomToast = true;
  }

  handleActionClick() {
    // Handle the action button click
    console.log('Action button clicked');
    // Implement additional logic as needed
  }

  handleToastClose() {
    this.showCustomToast = false;
  }
}
