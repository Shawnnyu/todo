function removeChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function generateContent(element, text) {
  const para = document.createElement(element);
  const content = document.createTextNode(text);
  para.appendChild(content);

  return para;
}

export { removeChildren, generateContent };
