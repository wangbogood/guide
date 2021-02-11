import getOffset from "../util/getOffset";
import setStyle from "../util/setStyle";


export default function setHelperLayerPosition(targetDomHighLight,currentElement) {
  if (targetDomHighLight && currentElement) {

    const elementPosition = getOffset(currentElement.element);

    setStyle(targetDomHighLight, {
      position: 'absolute',
      width: `${elementPosition.width}px`,
      height: `${elementPosition.height}px`,
      top: `${elementPosition.top}px`,
      left: `${elementPosition.left}px`,
      'box-shadow' : '0 0 0 5000px rgba(33, 33, 33, 0.5)'
    });
  }
}
