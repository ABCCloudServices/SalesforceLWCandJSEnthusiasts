import { LightningElement, api, track } from 'lwc';
import searchRecords from '@salesforce/apex/MultiSelectLookupController.searchRecords';

export default class MultiSelectLookup extends LightningElement {
    @api objectName = 'Account';
    @api fieldName = 'Name';
    @api additionalFields = '';
    @api placeholder = 'Search...';

    @track searchTerm = '';
    @track searchResults = [];
    @track selectedRecords = [];
    @track showDropdown = false;
    searchTimeout;

    handleSearchTermChange(event) {
        window.clearTimeout(this.searchTimeout);
        const searchKey = event.target.value;
        this.searchTerm = searchKey;
        if (searchKey && searchKey.length >= 2) {
            // Debounce search input
            this.searchTimeout = setTimeout(() => {
                this.searchRecords();
            }, 300);
        } else {
            this.searchResults = [];
            this.showDropdown = false;
        }
    }

    searchRecords() {
        searchRecords({
            objectName: this.objectName,
            fieldName: this.fieldName,
            searchTerm: this.searchTerm,
            additionalFields: this.additionalFields
        })
            .then(result => {
                // Map over the results to add a displayValue property
                this.searchResults = result.map(record => {
                    return {
                        ...record,
                        displayValue: record[this.fieldName]
                    };
                });
                this.showDropdown = true;
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
                this.searchResults = [];
                this.showDropdown = false;
            });
    }

    handleOptionSelect(event) {
        const recordId = event.currentTarget.dataset.id;
        const selectedRecord = this.searchResults.find(record => record.Id === recordId);
        if (selectedRecord && !this.selectedRecords.some(record => record.Id === recordId)) {
            this.selectedRecords = [...this.selectedRecords, { 
                ...selectedRecord, 
                label: selectedRecord.displayValue,
                name: selectedRecord.Id // Include the name property
            }];
            // Dispatch event with selected records
            this.dispatchEvent(new CustomEvent('selectionchange', {
                detail: { selectedRecords: this.selectedRecords }
            }));
        }
        this.clearSearch();
    }
    

    handleRemove(event) {
        console.log('handleRemove called');
        const recordId = event.detail.item.name; // Use the name property
        this.selectedRecords = this.selectedRecords.filter(record => record.name !== recordId);
        // Dispatch event with updated selected records
        this.dispatchEvent(new CustomEvent('selectionchange', {
            detail: { selectedRecords: this.selectedRecords }
        }));
    }
    

    clearSearch() {
        this.searchTerm = '';
        this.searchResults = [];
        this.showDropdown = false;
    }
}
