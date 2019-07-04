import React from "react";

export class CommunityCard extends React.Component {
  onClick = () => {
    this.props.changeIsSelected(this.props.community.community_name);
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
            fill={this.props.community.isSelected ? "red" : "grey"}
          />
        </svg>
        <img className="polaroid__image" src={this.props.community.image} />
        <h3 className="polaroid__title">
          {this.props.community.community_name}
        </h3>
        {/* <p className="polaroid__description">
          {this.props.community.description}
        </p> */}
      </div>
    );
  }
}

export default CommunityCard;
