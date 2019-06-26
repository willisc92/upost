import React from "react";

export class Interest extends React.Component {
    onClick = () => {
        this.props.changeIsSelected(this.props.interest.interest_tag);
    };

    render() {
        return (
            <div className="polaroid" onClick={this.onClick}>
                <svg className="polaroid__selector">
                    <circle
                        className="polaroid__circle"
                        cx={0}
                        cy={0}
                        r={22}
                        fill={this.props.interest.isSelected ? "red" : "grey"}
                    />
                </svg>
                <img className="polaroid__image" src={this.props.interest.image} />
                <h3 className="polaroid__title">{this.props.interest.interest_tag}</h3>
                <p className="polaroid__description">{this.props.interest.description}</p>
            </div>
        );
    }
}

export default Interest;
