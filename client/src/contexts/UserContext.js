import React from 'react';


const { Provider, Consumer } = React.createContext();

//To-Do : 
//          - Convert to hook
//          - useEffect(checkIfCookie)
class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      onLogin: this.handleLogin,
      onLogout: this.handleLogout,
      loading: true
    };
  }


  componentDidMount() {
    fetch('/checkToken')
      .then(res => {
        if (res.status === 200) {
          this.setState({ user: "test" });
          this.setState({ loading: false });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ loading: false, redirect: true });
      });
  }


  handleLogin = user => {
    this.setState({ user: "test" });
  };

  handleLogout = () => {
    this.setState({ user: null });
  };

  render() {
    if (this.state.loading === true){
      return null;
    }
    else{
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    );
  }
  }
}

export { UserProvider, Consumer as UserConsumer };