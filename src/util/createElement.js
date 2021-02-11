import setStyle from "./setStyle";

export default function _createElement(tagname, attrs) {
  let element = document.createElement(tagname);

  attrs = attrs || {};

  for (const k in attrs) {
    let v = attrs[k];

    if (k === "style") {
      setStyle(element, v);
    } else {
      element[k] = v;
    }
  }

  return element;
}
