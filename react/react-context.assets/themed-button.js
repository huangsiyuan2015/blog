const ThemedButton = (props) => {
  // 使用 useContext hook 直接获取 ThemeContext
  const theme = React.useContext(ThemeContext);

  // 打印 theme.dark 对象
  console.log(theme);

  return (
    <button {...props} style={{ backgroundColor: theme.background }}>
      button
    </button>
  );
};

// class ThemedButton extends React.Component {
//   // 也可以使用 static 属性来初始化 contextType
//   static contextType = ThemeContext;

//   componentDidMount() {
//     // 使用 this.context 访问 ThemeContext
//     // 打印 themes.dark 对象
//     console.log(this.context);
//   }

//   render() {
//     let props = this.props;
//     let theme = this.context;

//     return (
//       <button {...props} style={{ backgroundColor: theme.background }}>
//         button
//       </button>
//     );
//   }
// }

// 将 ThemeContext 对象挂载到 class 的 contextType 属性上
// 这样就可以在 class 中使用 this.context 来访问 ThemeContext
// ThemedButton.contextType = ThemeContext;
