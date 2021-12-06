const ThemeContext = React.createContext("light");

const UserContext = React.createContext({ name: "guest" });

class App extends React.Component {
  render() {
    const theme = "dark";
    const user = { name: "admin" };

    return (
      // 使用 Context 的默认值
      // <Layout />

      // 使用 Context.Provider value 提供的值
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={user}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}

function Sidebar() {
  return <h3>Sidebar</h3>;
}

// 使用 Context.Consumer 获取 Context
// function Content() {
//   return (
//     <div>
//       <h3>Content</h3>
//       <ThemeContext.Consumer>
//         {(theme) => (
//           <UserContext.Consumer>
//             {(user) => <ProfilePage user={user} theme={theme} />}
//           </UserContext.Consumer>
//         )}
//       </ThemeContext.Consumer>
//     </div>
//   );
// }

// 使用 useContext hook 获取 Context
function Content() {
  const user = React.useContext(UserContext);
  const theme = React.useContext(ThemeContext);

  return (
    <div>
      <h3>Content</h3>
      <ProfilePage user={user} theme={theme} />
    </div>
  );
}

function ProfilePage({ user, theme }) {
  return (
    <div>
      <section>user: {user.name}</section>
      <section>theme: {theme}</section>
    </div>
  );
}
