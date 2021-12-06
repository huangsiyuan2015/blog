function Toolbar({ changeTheme }) {
  return <ThemedButton onClick={changeTheme} />;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState((state) => ({
        theme: state.theme === themes.light ? themes.dark : themes.light,
      }));
    };
  }

  render() {
    return (
      <div>
        <section className="defaultContextValue">
          {/* 没有被 Provider 组件包裹，ThemeContext 使用默认值 themes.dark */}
          <ThemedButton />
        </section>
        <section className="customedContextValue">
          {/* 被 Provider 组件包裹，ThemeContext 使用 Provider 组件 value 属性的值 */}
          <ThemeContext.Provider value={this.state.theme}>
            <Toolbar changeTheme={this.toggleTheme} />
          </ThemeContext.Provider>
        </section>
      </div>
    );
  }
}
