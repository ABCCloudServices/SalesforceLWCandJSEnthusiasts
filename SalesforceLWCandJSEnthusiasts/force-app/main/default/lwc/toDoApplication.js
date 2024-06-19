import { LightningElement } from 'lwc';

export default class ToDoApplication extends LightningElement {
    taskname=""  ;  //type of string that why ""
    taskdate=null;  //type of object that why null
    incompletetask= [];
    completetask= [];
    Sortedarray= [];


    handler(event)
    {
        let{name,value}=event.target;

        if(name==='taskname')
        {
            this.taskname=value;
            console.log(this.taskname);
        }
        else if(name==='taskdate')
        {
              this.taskdate=value;
              console.log(this.taskdate);
        }
    }

    addtaskhandler()
    {
        
       if(!this.taskdate)
        {
        this.taskdate=new Date().toISOString.slice(0,10);
        
        }
           // adding task 
        if(this.validateTask())
        {
            
            this.incompletetask=[...this.incompletetask,
                {
                    taskname:this.taskname,
                    taskdate:this.taskdate
                }
            ];
            
            this.resethandler();
            this.Sortedarray = this.sortTask(this.incompletetask);
            this.incompletetask=[...this.Sortedarray];
            
        }
    }

        validateTask()
        {
            
            let isVaild=true;
            let element=this.template.querySelector(".taskname");

            if(!this.taskname)
            {
                isVaild=false;
            }
            else
            {
               let taskitem= this.incompletetask.find(
                (curritem)=> curritem.taskname===this.taskname &&  curritem.taskdate===this.taskdate 
                );

                if(taskitem)
                {
                    isVaild=false;
                    element.setCustomValidity("Task is alerdy their");
                }
            }
           
        

        if(isVaild)
        {
            element.setCustomValidity("");
        }

        element.reportValidity();
        return isVaild;
}
sortTask(inputarr)
{
    let sortedarry= inputarr.sort( (a,b) => {
        const DateA= new Date(a.taskdate);
        const DateB= new Date(b.taskdate);

        return DateA - DateB ;
    }
        );
        return sortedarry;
}
    

    resethandler()
    {
        this.taskname="";
        this.taskdate=null;
    }


    removeHandler(event)
    {
          let index=event.target.name;
          this.incompletetask.splice(index,1);
          this.Sortedarray = this.sortTask(this.incompletetask);
          this.incompletetask=[...this.Sortedarray];
    }
    completeHandler(event)
    {
        let index=event.target.name;
        let removearrayfirstelemet =this.incompletetask.splice(index,1);
          this.Sortedarray = this.sortTask(this.incompletetask);
          this.incompletetask=[...this.Sortedarray];

          this.completetask=[...this.completetask,removearrayfirstelemet[0]];

    }
}