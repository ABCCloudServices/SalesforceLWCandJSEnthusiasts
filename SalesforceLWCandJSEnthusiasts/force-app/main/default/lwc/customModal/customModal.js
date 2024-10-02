import { LightningElement, api, track } from 'lwc';

export default class CustomModal extends LightningElement {
  @api isModalOpen = false;

  // Close the modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Handle the modal close event
  handleClose() {
    this.closeModal();
    this.dispatchEvent(new CustomEvent('modalclose'));
  }

  // Handle modal confirm event (for actions like save, submit, etc.)
  handleConfirm() {
    this.dispatchEvent(new CustomEvent('modalconfirm'));
    this.closeModal();
  }
}
