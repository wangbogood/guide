import Popover from './popover.js';
import createElement from '../util/createElement.js';
import setPostion from '../util/setPostion.js';


class TargetElement{
    constructor(options){
        this.options = options;
        this.currentStep = 0;
        this.highlight = this.highlight.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.preStep = this.preStep.bind(this);
        this.removeTargetDomHighLight = this.removeTargetDomHighLight.bind(this);
    }

    preStep(targetDomHighLight){
        targetDomHighLight.remove()
        this.currentStep--;
        this.highlight()
    }

    nextStep(targetDomHighLight){
        targetDomHighLight.remove()
        this.currentStep++;
        this.highlight()
    }

    removeTargetDomHighLight(targetDomHighLight){
        targetDomHighLight.remove()
    }

    highlight(){
        const steps = this.options.steps;
        if(!steps && steps.length === 0){
            return;
        }
        const currentElement = steps[this.currentStep];
        const targetDomHighLight = createElement("div",{
            className:'highLightClass'
        });
        setPostion(targetDomHighLight,currentElement)
        document.body.appendChild(targetDomHighLight);
        
        const popover = new Popover(this.options,steps[this.currentStep],{
            nextStep:()=>this.nextStep(targetDomHighLight),
            preStep:()=>this.preStep(targetDomHighLight),
            removeTargetDomHighLight:()=>this.removeTargetDomHighLight(targetDomHighLight)
        }).createPopover()
    }
}

export default TargetElement;