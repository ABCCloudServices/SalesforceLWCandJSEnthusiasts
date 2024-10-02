import { LightningElement, api } from 'lwc';

export default class CustomModal extends LightningElement {
  /**
   * Controls the visibility of the modal.
   * Set this property from the parent component to open/close the modal.
   */
  @api isModalOpen = false;

  /**
   * The title displayed at the top of the modal.
   * Default is 'Modal Header' if not provided.
   */
  @api modalTitle = 'Modal Header';

  /**
   * Label for the Cancel button.
   * Default is 'Cancel' if not provided.
   */
  @api cancelLabel = 'Cancel';

  /**
   * Label for the Confirm button.
   * Default is 'Confirm' if not provided.
   */
  @api confirmLabel = 'Confirm';

  /**
   * Handles the closing of the modal when the close button or Cancel is clicked.
   * Dispatches a 'modalclose' event to notify the parent component.
   */
  handleClose() {
    this.isModalOpen = false;
    this.dispatchEvent(new CustomEvent('modalclose'));
  }

  /**
   * Handles the Confirm action when the Confirm button is clicked.
   * Dispatches a 'modalconfirm' event to notify the parent component.
   */
  handleConfirm() {
    this.dispatchEvent(new CustomEvent('modalconfirm'));
    this.isModalOpen = false;
  }
}
