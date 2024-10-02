import { LightningElement, track } from 'lwc';

export default class ParentComponent extends LightningElement {
  isModalOpen = false;

  // Opens the modal
  openModal() {
    this.isModalOpen = true;
  }

  // Handles the modal close event
  handleModalClose() {
    this.isModalOpen = false;
    // Additional logic can be added here
  }

  // Handles the modal confirm event
  handleModalConfirm() {
    this.isModalOpen = false;
    // Implement the action to be taken on confirmation
    // For example, save data or call an Apex method
  }
}
