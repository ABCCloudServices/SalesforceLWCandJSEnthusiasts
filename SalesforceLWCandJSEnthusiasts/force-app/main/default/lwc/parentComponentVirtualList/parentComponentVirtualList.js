import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    // An array to hold the large dataset
    largeDataSet = [];

    // Lifecycle hook called when the component is inserted into the DOM
    connectedCallback() {
        // Generate a large dataset for demonstration purposes
        // Creates an array of 1000 items with id and name properties
        this.largeDataSet = Array.from({ length: 1000 }, (_, index) => ({
            id: index + 1,
            name: `Item ${index + 1}`,
        }));
    }
}
