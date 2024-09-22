import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MultiStepForm extends LightningElement {
  @track currentStep = '1';

  // Form fields
  @track firstName = '';
  @track lastName = '';
  @track email = '';
  @track street = '';
  @track city = '';
  @track state = '';
  @track zip = '';

  // Error handling
  @track hasErrors = false;
  @track errorMessage = '';

  // Getters to determine which step is active
  get isStepOne() {
    return this.currentStep === '1';
  }

  get isStepTwo() {
    return this.currentStep === '2';
  }

  get isStepThree() {
    return this.currentStep === '3';
  }

  get isFirstStep() {
    return this.currentStep === '1';
  }

  get nextButtonLabel() {
    return this.currentStep === '3' ? 'Submit' : 'Next';
  }

  // Handle input field changes
  handleChange(event) {
    this[event.target.name] = event.target.value;
  }

  // Navigate to the next step
  handleNext() {
    if (this.validateInputs()) {
      this.hasErrors = false;
      if (this.currentStep === '3') {
        // Submit the form
        this.handleSubmit();
      } else {
        this.currentStep = String(Number(this.currentStep) + 1);
      }
    } else {
      this.hasErrors = true;
      this.errorMessage = 'Please complete all required fields.';
    }
  }

  // Navigate to the previous step
  handlePrevious() {
    this.hasErrors = false;
    this.currentStep = String(Number(this.currentStep) - 1);
  }

  // Validate inputs for the current step
  validateInputs() {
    const inputs = [...this.template.querySelectorAll('lightning-input')];
    let allValid = true;

    inputs.forEach(input => {
      if (!input.reportValidity()) {
        allValid = false;
      }
    });

    return allValid;
  }

  // Handle form submission
  handleSubmit() {
    // Process form data (e.g., call Apex method)
    const formData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      street: this.street,
      city: this.city,
      state: this.state,
      zip: this.zip,
    };
    console.log('Form submitted:', formData);

    // Display success message or navigate to a confirmation page
    this.showToast('Success', 'Form submitted successfully!', 'success');

    // Reset the form
    this.resetForm();
  }

  // Reset form fields
  resetForm() {
    this.currentStep = '1';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.street = '';
    this.city = '';
    this.state = '';
    this.zip = '';
    this.hasErrors = false;
    this.errorMessage = '';
  }

  // Show toast notification
  showToast(title, message, variant) {
    const evt = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant,
    });
    this.dispatchEvent(evt);
  }
}
