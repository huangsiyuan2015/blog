const ModalRoot = document.getElementById("modal-root");

class Modal extends React.Component {
  constructor() {
    super();
    this.el = document.createElement("div");
    this.el.className = "container";
  }

  componentDidMount() {
    ModalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    ModalRoot.removeChild(this.el);
  }

  render() {
    // ReactDOM.createPortal(this.props.children, domNode)
    // 将子元素挂载到任意 dom 节点
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
