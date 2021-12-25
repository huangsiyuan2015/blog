class Parent extends React.Component {
  state = {
    clicks: 0,
  };

  handleClick = () => {
    this.setState({
      clicks: this.state.clicks + 1,
    });
  };

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>number of clicks: {this.state.clicks}</p>
        {/* 放在 Child 组件中 */}
        {/* <button>click</button> */}

        {/* Modal 组件把 button 挂载到 modal-root 根元素 */}
        {/* 即使挂载在其它根组件，父组件仍然可以捕获到事件冒泡 */}
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
}
