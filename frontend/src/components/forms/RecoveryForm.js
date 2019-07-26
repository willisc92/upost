import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: ""
        };
    }

    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({ email: this.state.email });
    };

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit} id={this.props.id}>
                {!!this.props.error && <p className="form__error">{this.props.error.error}</p>}
                <TextField
                    label="Email"
                    color="primary"
                    variant="outlined"
                    margin="normal"
                    autoFocus
                    value={this.state.email}
                    onChange={this.onEmailChange}
                />
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.auth.error
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);
