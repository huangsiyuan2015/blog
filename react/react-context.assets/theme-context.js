// ThemeContext 默认值
// 只有在组件没有匹配到 Provider 包裹时才会使用默认值
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

// 创建 ThemeContext 对象
// Context 对象返回 Context.Provider 组件和 Context.Consumer 组件
// <Context.Provider value={}></Context.Provider>
// <Context.Consumer>{(value) => ()}</Context.Consumer>
const ThemeContext = React.createContext(themes.dark);

// 添加更新 Context 的方法
// const ThemeContext = React.createContext({
//   theme: themes.dark,
//   toggleTheme: () => {},
// });
