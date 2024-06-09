import { LightningElement, wire } from "lwc";
// Import message service features required for subscribing and the message channel
import {subscribe,unsubscribe,APPLICATION_SCOPE,MessageContext,
} from "lightning/messageService";
import msgService from "@salesforce/messageChannel/lmsDemo__c";

export default class SubscriberComponent extends LightningElement {
  subscription = null;
  messageReceived = ''
  
  //Get MessageContext using Wire Serivce
  @wire(MessageContext)
  messageContext;

  // Standard lifecycle hooks used to subscribe and unsubsubscribe to the message channel
  connectedCallback() {
    this.subscription = subscribe(this.messageContext,msgService,(message)=>{this.handleMessage(message)},{scope:APPLICATION_SCOPE});
  }
  //Subscribe Handler
  subscriberHandler() {
    if (!this.subscription) {
      this.subscription = subscribe(
        this.messageContext,
        msgService,
        (message) => this.handleMessage(message),
        { scope: APPLICATION_SCOPE },
      );
    }
  }
  //Unsubscribe Handler
  unSubscriberHandler() {
    unsubscribe(this.subscription);
    this.subscription = null;
  }
  // Handler for message received by component
  handleMessage(message) {
    this.messageReceived = message.lmsData.data ? message.lmsData.data : 'no Data recevied.';
  }
}