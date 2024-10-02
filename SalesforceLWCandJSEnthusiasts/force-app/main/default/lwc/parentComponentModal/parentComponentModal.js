import { LightningElement, track } from 'lwc';

export default class ParentComponentModal extends LightningElement {
  @track isModalOpen = false;
    
  // Open the modal
  openModal() {
    this.isModalOpen = true;
  }

  // Handle modal close
  handleModalClose() {
    this.isModalOpen = false;
  }

  // Handle modal confirm action (e.g., form submission, save)
  handleModalConfirm() {
    // Perform any action you need upon confirmation
    this.isModalOpen = false;
    console.log('Modal confirmed!');
  }
}
