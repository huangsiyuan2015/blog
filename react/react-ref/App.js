class App extends React.Component {
  inputRef = React.createRef();

  handleClick = () => {
    // this.inputRef.focus();
    this.inputRef.current.focus();
  };

  componentDidMount() {
    // 区别：
    // 使用 ref 回调直接获取 dom 引用
    // 使用 React.createRef() 获取的 dom 引用在 current 属性中
    console.log("inputRef", this.inputRef.current);
  }

  render() {
    return (
      <div>
        {/* 用法一：使用回调函数获取 ref */}
        {/* <input type="text" ref={(ref) => (this.inputRef = ref)} /> */}

        {/* 用法二：使用 React.createRef() */}
        {/* <input type="text" ref={this.inputRef} /> */}

        {/* 上述情况 ref 引用的是原生 dom */}
        {/* ref 如果添加在组件上，引用的就是组件实例 */}
        {/* <Foo ref={this.inputRef} /> */}

        {/* 函数组件没有 ref 属性，要使用 ref 转发 */}
        <Bar ref={this.inputRef} />
        <button onClick={this.handleClick}>click</button>
      </div>
    );
  }
}
