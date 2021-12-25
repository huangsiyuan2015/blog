class BarClass extends React.Component {
  // 等价于 BarClass.contextType = AppContext;
  static contextType = AppContext;

  componentDidMount() {
    console.log("AppContext", this.context);
  }

  render() {
    return <div className="bar">username: {this.context.username}</div>;
  }
}
