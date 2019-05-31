import React from "react";

class Interest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: false
        };
    }

    render() {
        return (
            <div
                className="interest"
                onClick={() => {
                    this.setState(() => ({
                        selected: !this.state.selected
                    }));
                }}
            >
                <svg className="interest-selector">
                    <circle
                        className="interest-circle"
                        cx={0}
                        cy={0}
                        r={25}
                        fill={this.state.selected ? "red" : "grey"}
                    />
                </svg>
                <p className="interest-image">Image</p>
                <p className="interest-title">{this.props.interest.interest_tag}</p>
                <p className="interest-description">{this.props.interest.description}</p>
            </div>
        );
    }
}

export default Interest;
