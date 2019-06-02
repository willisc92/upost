import React from "react";

class Interest extends React.Component {
    onClick = () => {
        this.props.changeIsSelected(this.props.interest.interest_tag);
    };

    render() {
        return (
            <div className="interest" onClick={this.onClick}>
                <svg className="interest-selector">
                    <circle
                        className="interest-circle"
                        cx={0}
                        cy={0}
                        r={22}
                        fill={this.props.interest.isSelected ? "red" : "grey"}
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
