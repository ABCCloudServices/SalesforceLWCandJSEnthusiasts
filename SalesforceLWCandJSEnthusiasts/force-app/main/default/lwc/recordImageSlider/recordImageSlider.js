import { LightningElement, api } from 'lwc';
import getRecordImages from '@salesforce/apex/ImageSliderController.getRecordImages';

export default class RecordImageSlider extends LightningElement {
    @api recordId;
    @api maxWidth = '800px';
    @api maxHeight = '600px';
    images = [];
    currentIndex = 0;
    isTouchDevice = false;
    startX = 0;
    isDataLoaded = false;

    connectedCallback() {
        this.detectTouchDevice();
        this.fetchImages();
    }

    detectTouchDevice() {
        this.isTouchDevice =
            'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    fetchImages() {
        console.log('recordId123:', this.recordId);
        
        getRecordImages({ recordId: this.recordId })
            .then((result) => {
                console.log(
                    'images:',
                    JSON.stringify(result)
                );
                
                if (result && result.length > 0) {
                    this.images = result.map((item) => ({
                        id: item.Id,
                        title: item.Title,
                        url:'https://sfenthusiasts--partialsb.sandbox.my.salesforce.com/sfc/servlet.shepherd/version/renditionDownload?rendition=THUMB720BY480&versionId=' +
                            item.Id,
                    }));
                    this.currentIndex = 0;
                } else {
                    this.images = [];
                }
                console.log('thisimages:', JSON.stringify(this.images));
                
                this.isDataLoaded = true;
            })
            .catch((error) => {
                console.error('Error fetching images:', error);
                this.isDataLoaded = true;
            });
    }

    handleNext() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }

    handlePrev() {
        this.currentIndex =
            (this.currentIndex - 1 + this.images.length) % this.images.length;
    }

    get currentImage() {
        if (this.images.length > 0) {
            return this.images[this.currentIndex];
        }
        return null;
    }

    startDrag(event) {
        this.startX = event.touches
            ? event.touches[0].clientX
            : event.clientX;
    }

    onDrag(event) {
        event.preventDefault();
    }

    endDrag(event) {
        const endX = event.changedTouches
            ? event.changedTouches[0].clientX
            : event.clientX;
        const deltaX = endX - this.startX;

        if (deltaX > 50) {
            this.handlePrev();
        } else if (deltaX < -50) {
            this.handleNext();
        }
    }
}