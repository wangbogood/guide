import getOffset from '../util/getOffset.js';
import setStyle from '../util/setStyle.js';
import createElement from '../util/createElement.js';

class Popover {
    constructor(options,stepItem,stepOptions){
        this.element = stepItem.element;
        this.nextStep = stepOptions.nextStep;
        this.preStep = stepOptions.preStep;
        this.removeTargetDomHighLight = stepOptions.removeTargetDomHighLight;
        this.popoverOptions = {
            width:'200px' || options.width,
            height:'auto' || options.height,
            showPopoverFooter: options.showPopoverFooter,
            title:stepItem.title,
            content:stepItem.content
        };
    }
   
    createPopover() {
       const position = getOffset(this.element);
       const popover = createElement("div",{
           className:'guide-popover-box'
       });
       const {width,height} = this.popoverOptions;
       setStyle(popover, {
            width,
            height,
            background:'#fff',
            position:'absolute',
            top:position.height+ position.top + 15 + 'px',
            left:position.left + 'px'
        });
        popover.innerHTML = this.renderContent();
        popover.querySelector('#guide-pre').onclick = () => {
            this.removePopover(popover)
            this.preStep()
        }
        popover.querySelector('#guide-next').onclick = () => {
            this.removePopover(popover)
            this.nextStep()
        }
        popover.querySelector('#guide-close').onclick = () => {
            this.removePopover(popover)
            this.removeTargetDomHighLight()
        }
        document.body.appendChild(popover);
        return popover
    }

    removePopover(popover){
        popover.remove()
    }

    renderContent(){
        const {showPopoverFooter,content,title} = this.popoverOptions;
        return  `
            <div>
                <div class=${title?'guide-popover-title':'guide-hide'}>
                    <div>${title}</div>
                    <div class='guide-popover-close' id='guide-close'>x</div>
                </div>
                <div class=${content?'guide-popover-content':'guide-hide'}>${content}</div>
                <div class=${showPopoverFooter?'guide-popover-footer':'guide-hide'}>
                    <button id='guide-pre'>上一步</button>
                    <button id='guide-next'>下一步</button>
                </div>
            </div>
        `
    }
};

export default Popover;