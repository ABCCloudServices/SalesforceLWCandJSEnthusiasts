import { LightningElement, api, track } from 'lwc';
import authenticateTargetOrg from '@salesforce/apex/AuthenticationController.authenticateTargetOrg';
import migrateContentVersions from '@salesforce/apex/MigrationController.migrateContentVersions';

export default class MigrationModal extends LightningElement {
    @api accessToken;
    @api selectedIds; // Array of ContentVersion IDs
    @track authOptions = [
        { label: 'Username/Password Flow', value: 'usernamePassword' },
        { label: 'Client Credentials Flow', value: 'clientCredentials' },
    ];
    @track selectedAuthMethod = 'usernamePassword';
    @track username = '';
    @track password = '';
    @track clientId = '';
    @track clientSecret = '';
    @track tokenEndpoint = '';
    @track migrationStatus = '';
    @track statusClass = '';

    handleAuthChange(event) {
        this.selectedAuthMethod = event.detail.value;
    }

    handleInputChange(event) {
        const field = event.target.dataset.id;
        if (field === 'username') {
            this.username = event.target.value;
        } else if (field === 'password') {
            this.password = event.target.value;
        }
    }

    startMigration() {
        this.migrationStatus = '';
        this.statusClass = '';

        let authParams = {
            flowType: this.selectedAuthMethod,
            clientId: 'your-client-id', // Alternatively, retrieve from a secure source
            clientSecret: 'your-client-secret',
            username: this.username,
            password: this.password,
            tokenEndpoint: 'https://login.salesforce.com/services/oauth2/token' // Modify as needed
        };

        // Call Apex to authenticate and migrate
        migrateContentVersions({
            accessToken: this.accessToken,
            selectedIds: this.selectedIds,
            authFlowType: this.selectedAuthMethod,
            clientId: authParams.clientId,
            clientSecret: authParams.clientSecret,
            username: authParams.username,
            password: authParams.password,
            tokenEndpoint: authParams.tokenEndpoint
        })
        .then(result => {
            // Assuming result is a list of status objects
            let successCount = 0;
            let failureCount = 0;
            let messages = [];
            result.forEach(recordStatus => {
                if(recordStatus.status === 'Success') {
                    successCount++;
                } else {
                    failureCount++;
                    messages.push(`Record ${recordStatus.id} failed: ${recordStatus.message}`);
                }
            });
            this.migrationStatus = `Migration completed: ${successCount} succeeded, ${failureCount} failed.`;
            this.statusClass = 'slds-text-color_success';
            if(messages.length > 0) {
                this.migrationStatus += ' ' + messages.join(' ');
                this.statusClass = 'slds-text-color_error';
            }
        })
        .catch(error => {
            this.migrationStatus = 'Migration failed: ' + error.body.message;
            this.statusClass = 'slds-text-color_error';
        });
    }

    handleClose() {
        // Dispatch event to close the modal
        this.dispatchEvent(new CustomEvent('closemodal'));
    }
}
