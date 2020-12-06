import React from 'react';
import { Redirect } from 'react-router-dom';
import '../style.css';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            authenticated: false
        };
    }

    onSubmit = (event) => {
        if (this.state.username.trim().length > 0) {
            this.setState({ authenticated: true });
        }
        event.preventDefault();
    }

    onInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
    }

    render() {
        let from = { pathname: '/', state: { user: this.state.username } };

        if (this.state.authenticated) {
            return (
                <Redirect to={from} />
            );

        }

        return (
            <div className="title">
                <form onSubmit={this.onSubmit}>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.onInputChange}
                    ></input>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;
