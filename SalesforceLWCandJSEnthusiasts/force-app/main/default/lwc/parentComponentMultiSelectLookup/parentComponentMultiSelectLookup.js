import { LightningElement, track } from 'lwc';

export default class ParentComponentMultiSelectLookup extends LightningElement {
    @track selectedContacts = [];

    handleSelectionChange(event) {
        this.selectedContacts = event.detail.selectedRecords;
    }
}
