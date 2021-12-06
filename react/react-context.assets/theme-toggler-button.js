class App extends React.Component {
  constructor(props) {
    super(props);

    // Context 的更新函数
    this.toggleTheme = () => {
      this.setState((state) => ({
        theme: state.theme === themes.dark ? themes.light : themes.dark,
      }));
    };

    // state 也包含 Context 的更新函数
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    return (
      // 整个 state 传进 Provider
      <ThemeContext.Provider value={this.state}>
        <Content />
      </ThemeContext.Provider>
    );
  }
}

const Content = () => {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
};

// 使用 Context.Consumer 获取 Context
// const ThemeTogglerButton = () => {
//   return (
//     <ThemeContext.Consumer>
//       {({ theme, toggleTheme }) => (
//         <button
//           onClick={toggleTheme}
//           style={{ backgroundColor: theme.background }}
//         >
//           toggle theme
//         </button>
//       )}
//     </ThemeContext.Consumer>
//   );
// };

// 使用 useContext hook 获取 Context
const ThemeTogglerButton = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} style={{ backgroundColor: theme.background }}>
      toggle theme
    </button>
  );
};
