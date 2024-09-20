import { LightningElement, api, track } from 'lwc';

export default class VirtualList extends LightningElement {
    // The full dataset passed from the parent component
    @api items = [];
    // Height of each item in pixels
    @api itemHeight = 80;
    // Height of the container in pixels
    @api containerHeight = 400;

    // Array to hold the currently visible items
    @track visibleData = [];

    // Scroll position
    scrollTop = 0;
    // Inline styles for the container and spacer
    containerStyle = '';
    spacerStyle = '';
    // Flag to ensure event listener is added only once
    isRendered = false;

    // Lifecycle hook called when the component is inserted into the DOM
    connectedCallback() {
        // Set the container's inline style
        this.containerStyle = `height: ${this.containerHeight}px; position: relative;`;
        // Initialize the visible data
        this.updateVisibleData();
    }

    // Lifecycle hook called after every render
    renderedCallback() {
        if (!this.isRendered) {
            // Add scroll event listener to the container
            this.template.querySelector('.virtual-list-container').addEventListener('scroll', this.handleScroll.bind(this));
            this.isRendered = true;
        }
    }

    // Handler for the scroll event
    handleScroll(event) {
        // Update the scroll position
        this.scrollTop = event.target.scrollTop;
        // Update the visible data based on new scroll position
        this.updateVisibleData();
    }

    // Method to calculate and update the visible items
    updateVisibleData() {
        // Calculate the start index based on scroll position
        const startIndex = Math.floor(this.scrollTop / this.itemHeight);
        // Buffer items to preload for smoother scrolling
        const bufferItems = 5;
        // Calculate the end index, ensuring it doesn't exceed the dataset length
        const endIndex = Math.min(
            startIndex + Math.ceil(this.containerHeight / this.itemHeight) + bufferItems,
            this.items.length
        );

        // Slice the dataset to get the visible items and map them with their styles
        this.visibleData = this.items.slice(startIndex, endIndex).map((item, index) => {
            const offset = (startIndex + index) * this.itemHeight;
            return {
                ...item,
                style: `position: absolute; top: ${offset}px; left: 0; right: 0; height: ${this.itemHeight}px;`,
            };
        });

        // Set the spacer's height to create the scrollable area
        this.spacerStyle = `height: ${this.items.length * this.itemHeight}px;`;
    }
}
