import { LightningElement, track } from 'lwc';

export default class BMICalculator extends LightningElement {
    value = '';
     he=""
     @track het=''
     @track Gen=" "
     @track height=""
     @track weight=""
     @track bmi=0
    @track result=""
    @track show=true;
     displayoutput=false;
     @track showModal = false;
    get options() {
        return [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
        ];
    }
    handleRadioChange(event) {
        this.Gen = event.target.value;
    }


    handler(event)
    {
      let {name,value}=event.target;


      if(name==="height")
      {
        this.het=value;
        this.height = parseInt(event.target.value);
        this.height=(this.height/100).toFixed(2);
        this.height= this.height *  this.height;

       
      }
      else if(name==="weight")
      {
         this.weight=value;
         this.show=true;
      }
      else if(name==="age")
        {
            this.age=value;
        }
      
    }

    Calculatorhandler(event)
    {
        
        let labelelemet=event.target.label;
        if(labelelemet==="calculatebmi")
        { 
            
            this.displayoutput= true;
            this.bmi= parseInt(this.weight) / this.height;
            this.bmi=this.bmi.toFixed(2);
             console.log("bmi",this.bmi);
        }
        else if(labelelemet==="Reset")
        {
            this.displayoutput= false;
            this.height=" "
            this.weight=" "
            this.template.querySelector('form').reset();
            this.Gen=" "
           
        }
        this.displaybmi(this.bmi);
    }

    displaybmi()
    {   
        
        if(this.bmi < 18.5) {

            this.result = "Underweight"; 

        } else if(this.bmi >= 18.5 && this.bmi <= 24.9){

            this.result = "Normal Weight";

        } else if(this.bmi >= 25 && this.bmi <= 29.9){

            this.result = "Overweight";

        } else {

            this.result = "Obese";

        }
    }

    openModal() {
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }
}