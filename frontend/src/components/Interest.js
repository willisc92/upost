import React from "react";

class Interest extends React.Component {
    constructor(props) {
        super(props);

        // why doesnt this work?
        //console.log("isSelected", props.interest.isSelected);

        this.state = {
            selected: props.interest
        };
    }

    changeSelection = () => {
        this.setState(() => {
            return { selected: { ...this.state.selected, isSelected: !this.state.selected.isSelected } };
        });
    };

    render() {
        return (
            <div className="interest" onClick={this.changeSelection}>
                <svg className="interest-selector">
                    <circle
                        className="interest-circle"
                        cx={0}
                        cy={0}
                        r={22}
                        fill={this.state.selected.isSelected ? "red" : "grey"}
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
