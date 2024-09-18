import { LightningElement, api } from 'lwc';

export default class Pagination extends LightningElement {
    // Current page number, received from the parent component
    @api currentPage = 1;

    // Total number of records, received from the parent component
    @api totalRecords;

    // Number of records to display per page, received from the parent component
    @api pageSize = 10;

    // Getter to calculate the total number of pages
    get totalPages() {
        return Math.ceil(this.totalRecords / this.pageSize) || 1;
    }

    // Computed property to disable "First" and "Previous" buttons on the first page
    get isFirstPage() {
        return this.currentPage <= 1;
    }

    // Computed property to disable "Next" and "Last" buttons on the last page
    get isLastPage() {
        return this.currentPage >= this.totalPages;
    }

    // Navigate to the first page
    goToFirstPage() {
        this.currentPage = 1;
        this.dispatchPageChangeEvent();
    }

    // Navigate to the previous page
    goToPreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
            this.dispatchPageChangeEvent();
        }
    }

    // Navigate to the next page
    goToNextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage += 1;
            this.dispatchPageChangeEvent();
        }
    }

    // Navigate to the last page
    goToLastPage() {
        this.currentPage = this.totalPages;
        this.dispatchPageChangeEvent();
    }

    // Dispatch a custom event to notify the parent component of the page change
    dispatchPageChangeEvent() {
        this.dispatchEvent(new CustomEvent('pagechange', {
            detail: { currentPage: this.currentPage }
        }));
    }
}
