import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    formConfig = [
        {
          label: 'First Name',
          apiName: 'FirstName',
          type: 'text',
          required: true,
        },
        {
          label: 'Last Name',
          apiName: 'LastName',
          type: 'text',
          required: true,
        },
        {
          label: 'Email',
          apiName: 'Email',
          type: 'email',
          required: true,
        },
        {
          label: 'Contact Method',
          apiName: 'ContactMethod',
          type: 'picklist',
          options: [
            { label: 'Email', value: 'Email' },
            { label: 'Phone', value: 'Phone' },
          ],
        },
    ];      

  handleFormSubmit(event) {
    const formData = event.detail;
    // Process form data, e.g., call an Apex method to save
    console.log('Form Data:', JSON.stringify(formData));
  }
}
