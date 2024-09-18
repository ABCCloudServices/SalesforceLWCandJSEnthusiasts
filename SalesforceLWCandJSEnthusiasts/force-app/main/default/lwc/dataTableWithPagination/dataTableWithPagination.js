import { LightningElement, track } from 'lwc';
import getAccounts from '@salesforce/apex/PaginationController.getAccounts';
import getTotalRecords from '@salesforce/apex/PaginationController.getTotalRecords';

export default class DataTableWithPagination extends LightningElement {
    // Reactive properties to store accounts and total record count
    @track accounts = [];
    @track totalRecords;

    // Properties to manage pagination and selection
    currentPage = 1;          // Current page number
    pageSize = 10;            // Number of records per page
    @track selectedRows = []; // IDs of selected rows on the current page
    selectedRecordIds = [];   // Global list of selected record IDs across all pages

    // Columns configuration for the lightning-datatable
    columns = [
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Industry', fieldName: 'Industry' },
        { label: 'Rating', fieldName: 'Rating' },
    ];

    // Lifecycle hook called when the component is inserted into the DOM
    connectedCallback() {
        this.fetchTotalRecords(); // Fetch total number of records
        this.fetchAccounts();     // Fetch accounts for the current page
    }

    // Fetch the total number of records from the server
    fetchTotalRecords() {
        getTotalRecords()
            .then(result => {
                this.totalRecords = result; // Store the total record count
            })
            .catch(error => {
                console.error('Error fetching total records:', error);
            });
    }

    // Fetch accounts for the current page based on pagination parameters
    fetchAccounts() {
        const offset = (this.currentPage - 1) * this.pageSize; // Calculate the offset

        getAccounts({ pageSize: this.pageSize, offset })
            .then(result => {
                this.accounts = result; // Update the accounts to display

                // Update selectedRows to reflect selections on the current page
                const currentPageIds = this.accounts.map(account => account.Id);

                // Filter selectedRecordIds to get IDs present on the current page
                this.selectedRows = this.selectedRecordIds.filter(id =>
                    currentPageIds.includes(id)
                );
            })
            .catch(error => {
                console.error('Error fetching accounts:', error);
            });
    }

    // Handle page change events from the pagination component
    handlePageChange(event) {
        this.currentPage = event.detail.currentPage; // Update the current page
        this.fetchAccounts();                        // Fetch accounts for the new page
    }

    // Handle row selection in the data table
    handleRowSelection(event) {
        const selectedRows = event.detail.selectedRows; // Get selected rows on the current page
        const selectedIds = selectedRows.map(row => row.Id); // Extract IDs from selected rows

        // IDs of accounts displayed on the current page
        const currentPageIds = this.accounts.map(account => account.Id);

        // Remove IDs from selectedRecordIds that are from the current page and no longer selected
        this.selectedRecordIds = this.selectedRecordIds.filter(
            id => !currentPageIds.includes(id)
        );

        // Add newly selected IDs to the global list
        this.selectedRecordIds = [...this.selectedRecordIds, ...selectedIds];
    }

    // Optional: Method to handle actions on the selected records
    // For example, processing the selected records when a button is clicked
    handleProcessSelected() {
        // Perform actions with this.selectedRecordIds
        console.log('Selected Record IDs:', this.selectedRecordIds);
    }
}
