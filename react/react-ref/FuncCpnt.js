// React.forwardRef() 和 React.useImperativeHandle() 一起使用
const Bar = React.forwardRef((props, ref) => {
  // 此时转发 ref 可以直接获取到子组件中的 dom 引用
  // 但是操作子组件的 ref 最好放在子组件中，而不是在父组件中
  // return <input type="text" ref={ref} />;

  // React.useRef() 和 React.createRef() 的用法一样
  // useRef() 用在函数组件，createRef() 用在类组件
  const inputRef = React.useRef();

  // 自定义转发的 ref，将操作 ref 的方法放在子组件中返回给父组件
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  return <input type="text" ref={inputRef} />;
});
