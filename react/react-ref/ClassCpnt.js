class Foo extends React.Component {
  inputRef = React.createRef();

  focus = () => {
    this.inputRef.current.focus();
  };

  render() {
    return <input type="text" ref={this.inputRef} />;
  }
}
