import targetElement from './core/targetElement.js'
import './styles/popover.less'
import './styles/index.less'

class GuideJs {
  constructor(dom) {
    this.targetElement = dom;
    this.guideItems = [];
    this.currentStep = 0;
    this.options = {
      nextLabel: '下一步',
      prevLabel: '上一步',
      closeLabel: 'X',
      doneLabel: '完成',
      hidePrev: false,
      hideNext: false,
      hideClose: false,
      position: 'bottom',
      maskOpacity: 0.5,
      showPopoverTitle: true,
      showPoveverContent: true,
      showPopoverFooter: true
    };
  };


  /* 定制化参数 */
  setOptions(obj) {
    this.options = Object.assign({}, this.options, obj);
    this.targetElement = new targetElement(this.options)
    return this;
  }

  start() {
    this.targetElement.highlight()
  }

  nextStet() {
    console.log('next')
  }

};

const guideJs = function () {
  return new GuideJs(document.body)
};


export default guideJs;