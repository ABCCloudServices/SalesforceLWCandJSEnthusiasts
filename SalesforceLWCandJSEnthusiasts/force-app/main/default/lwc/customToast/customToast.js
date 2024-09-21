import { LightningElement, api, track } from 'lwc';

export default class CustomToast extends LightningElement {
  @api variant = 'info'; // 'success', 'warning', 'error', 'info'
  @api message = 'This is a notification.';
  @api messageData; // Additional message data
  @api duration = 5000; // Duration in milliseconds
  @api actionLabel; // Label for the action button

  @track showToast = false;
  toastClasses = 'slds-notify slds-notify_toast';

  connectedCallback() {
    this.showToast = true;
    this.setToastClass();
    if (this.duration > 0) {
      setTimeout(() => {
        this.closeToast();
      }, this.duration);
    }
  }

  setToastClass() {
    this.toastClasses = `slds-notify slds-notify_toast slds-theme_${this.variant}`;
  }

  get iconName() {
    switch (this.variant) {
      case 'success':
        return 'utility:success';
      case 'warning':
        return 'utility:warning';
      case 'error':
        return 'utility:error';
      default:
        return 'utility:info';
    }
  }

  handleAction() {
    // Dispatch an event for the parent component to handle
    this.dispatchEvent(new CustomEvent('actionclick'));
    this.closeToast();
  }

  closeToast() {
    this.showToast = false;
    // Dispatch an event to notify the parent that the toast has closed
    this.dispatchEvent(new CustomEvent('close'));
  }
}
