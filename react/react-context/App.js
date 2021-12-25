const AppContext = React.createContext();

const App = () => (
  <AppContext.Provider value={{ username: "ace" }}>
    <Middle />
  </AppContext.Provider>
);

const Middle = () => (
  <div className="middle">
    {/* 三种使用 context 的方法 */}
    {/* 类组件中使用 Context.Consumer 组件 */}
    <FooClass />
    {/* 类组件中使用 静态属性 contextType */}
    <BarClass />
    {/* 函数组件中使用 useRef() hook */}
    <BazFunc />
  </div>
);
