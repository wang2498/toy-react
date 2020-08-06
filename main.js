import ToyReact, { Component } from './ToyReact.js';


class MyComponent extends Component {
  render() {
    return (
      <div>
        {this.children}
        <div>world</div>
        <h1>!!!</h1>
        <div>
        </div>
      </div>
    )
  }
}


let a = <MyComponent name='a' id='id'>
  <div>hello</div>
</MyComponent>


ToyReact.render(
  a,
  document.body
)