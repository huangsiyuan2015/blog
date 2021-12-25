const BazFunc = () => {
  const context = React.useContext(AppContext);

  console.log("AppContext", context);

  return <div className="baz">username: {context.username}</div>;
};
