// Life Cycle Hooks
// 1- Mounting => Component is created.
// 2- Updating => Component updated (change in states or passing new props/change in props).
// 3- Unmounting => Component is about to be destroyed.
//
import { Component } from "react";

class CounterClassComponent extends Component {
  state = {
    count: 5,
  };

  componentDidMount() {
    console.log("component mounted");
  }

  componentDidUpdate() {
    console.log("component updated");
  }

  componentWillUnmount() {
    console.log("component will be destroyed/unmouted");
  }

  render() {
    return (
      // JSX
      <div>Counter</div>
    );
  }
}
