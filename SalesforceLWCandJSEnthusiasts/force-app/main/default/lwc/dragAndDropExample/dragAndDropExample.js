import { LightningElement } from 'lwc';

export default class DragAndDropExample extends LightningElement {
    // Lists to hold available and selected items
    availableItems = [
        { id: '1', label: 'Item 1' },
        { id: '2', label: 'Item 2' },
        { id: '3', label: 'Item 3' },
    ];

    selectedItems = [
        { id: '4', label: 'Item 4' },
        { id: '5', label: 'Item 5' },
    ];

    // Handler for the dragstart event
    handleDragStart(event) {
        const itemId = event.target.dataset.id;
        // Store the dragged item's ID in the dataTransfer object
        event.dataTransfer.setData('text/plain', itemId);
        event.dataTransfer.dropEffect = 'move';
    }

    // Handler for the dragenter event
    handleDragEnter(event) {
        event.preventDefault();
        // Add visual feedback when an item is dragged over a drop zone
        event.currentTarget.classList.add('drag-over');
    }

    // Handler for the dragleave event
    handleDragLeave(event) {
        // Remove visual feedback when the dragged item leaves a drop zone
        event.currentTarget.classList.remove('drag-over');
    }

    // Handler for the dragover event
    handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }

    // Handler for the drop event
    handleDrop(event) {
        event.preventDefault();
        // Remove visual feedback
        event.currentTarget.classList.remove('drag-over');

        const listType = event.currentTarget.dataset.list;
        const itemId = event.dataTransfer.getData('text/plain');
        const draggedItem = this.getItemById(itemId);

        if (listType === 'available') {
            // Move item to the availableItems list
            this.moveItem(draggedItem, 'selectedItems', 'availableItems');
        } else if (listType === 'selected') {
            // Move item to the selectedItems list
            this.moveItem(draggedItem, 'availableItems', 'selectedItems');
        }
    }

    // Helper method to find an item by ID in either list
    getItemById(itemId) {
        return (
            this.availableItems.find((item) => item.id === itemId) ||
            this.selectedItems.find((item) => item.id === itemId)
        );
    }

    // Move an item from one list to another
    moveItem(item, fromListName, toListName) {
        if (item) {
            // Remove item from the source list
            this[fromListName] = this[fromListName].filter((i) => i.id !== item.id);
            // Add item to the target list
            this[toListName] = [...this[toListName], item];
        }
    }
}
