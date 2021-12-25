class FooClass extends React.Component {
  render() {
    return (
      // 当有多层嵌套时，不推荐使用该方法
      <AppContext.Consumer>
        {(value) => <div className="foo">username: {value.username}</div>}
      </AppContext.Consumer>
    );
  }
}
