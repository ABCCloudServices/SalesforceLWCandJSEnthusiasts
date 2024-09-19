import { LightningElement, api, track } from 'lwc';

export default class DynamicForm extends LightningElement {
  @api config = []; // Configuration object passed from parent
  @track fields = []; // Fields to render

  connectedCallback() {
    this.initializeFields();
  }

  initializeFields() {
    this.fields = this.config.map(field => {
      return {
        ...field,
        value: '',
        isText: field.type === 'text',
        isEmail: field.type === 'email',
        isPicklist: field.type === 'picklist',
        // Add flags for other field types
      };
    });
  }

  handleInputChange(event) {
    const fieldName = event.target.name;
    const value = event.target.value;
    const fieldIndex = this.fields.findIndex(f => f.apiName === fieldName);
    if (fieldIndex !== -1) {
      this.fields[fieldIndex].value = value;
    }
  }

  handleSubmit() {
    const allValid = [...this.template.querySelectorAll('lightning-input, lightning-combobox')]
      .reduce((validSoFar, inputCmp) => {
        inputCmp.reportValidity();
        return validSoFar && inputCmp.checkValidity();
      }, true);

    if (allValid) {
      const formData = {};
      this.fields.forEach(field => {
        formData[field.apiName] = field.value;
      });
      // Dispatch event with form data
      this.dispatchEvent(new CustomEvent('formsubmit', { detail: formData }));
    } else {
      // Handle validation error
      console.log('Please complete all required fields.');
    }
  }
}
