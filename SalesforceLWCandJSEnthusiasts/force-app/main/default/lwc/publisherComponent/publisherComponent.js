import { LightningElement, wire } from 'lwc';
import msgService from '@salesforce/messageChannel/lmsDemo__c';
import { publish,MessageContext } from 'lightning/messageService';
export default class PublisherComponent extends LightningElement {
    @wire(MessageContext)
    messageContext
    
    inputMessage = '';
    inputTextHandler(event){
        this.inputMessage = event.target.value;
    }
    
    publishHandler(){
        const message = {
            lmsData : {
                data:this.inputMessage
            }
        }
        publish(this.messageContext,msgService,message);
    }
}