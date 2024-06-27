import { LightningElement,track } from 'lwc';

export default class TimeoutIntervalComponent extends LightningElement {
    @track message = 'Welcome To My Message Banner Component!';
    @track timer = 5;
    currentIndex = 0;
    intervalId;
    timerIntervalId;
    messages = ['Hello World!', 'We\'re learning JS', 'This is our message banner', 'We will master Lightning Web Component'];

    connectedCallback() {
        this.updateMessage();
        this.startTimer();
        this.intervalId = setInterval(() => {
            this.updateMessage();
            this.startTimer();
        }, 5000);
    }

    disconnectedCallback() {
        clearInterval(this.intervalId);
        clearInterval(this.timerIntervalId);
    }

    updateMessage() {
        this.message = this.messages[this.currentIndex];
        this.currentIndex = (this.currentIndex + 1) % this.messages.length;
    }

    startTimer() {
        this.timer = 5;
        clearInterval(this.timerIntervalId);
        this.timerIntervalId = setInterval(() => {
            this.timer -= 1;
        }, 1000);
    }
}