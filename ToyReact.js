class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(vchild) {
    vchild.mountTo(this.root);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class TextWrapper {
  constructor(context) {
    this.root = document.createTextNode(context);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

export class Component {
  constructor() {
    this.children = [];
  }
  setAttribute(name, value) {
    this[name] = value;
  }
  appendChild(vchild) {
    this.children.push(vchild);
  }
  mountTo(parent) {
    const vdom = this.render();
    vdom.mountTo(parent);
  }
}
export default {
  createElement(type, attributes, ...children) {
    let element;
    if (typeof type === "string") {
      element = new ElementWrapper(type);
    } else {
      element = new type;
    }
    for (let name in attributes) {
      element.setAttribute(name, attributes[name]);
    }
    const insertChildren = children => {
      for (let child of children) {
        if (typeof child === 'object' && child instanceof Array) {
          insertChildren(child);
        } else {
          if (!(child instanceof ElementWrapper) &&
            !(child instanceof TextWrapper) &&
            !(child instanceof Component)
          ) {
            child = String(child);
          }
          if (typeof child === 'string') {
            child = new TextWrapper(child);
          }
          element.appendChild(child);
        }
      }
    }
    insertChildren(children);
    return element;
  },
  render(vodom, element) {
    vodom.mountTo(element);
  }
}

