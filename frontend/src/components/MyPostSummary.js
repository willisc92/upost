import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export const MyPostSummary = ({ post, pathName }) => {
    return (
        <Link
            className="polaroid"
            to={{
                pathname: pathName,
                state: { post }
            }}
        >
            <div>
                <img className="polaroid__image" src={post.picture} />
                <h3 className="polaroid__title">{post.post_title}</h3>
                <p className="polaroid__description">{post.post_description}</p>
                <p className="polaroid__description">
                    Creation Date: {moment(post.post_timestamp).format("MMMM Do YYYY")}
                </p>
            </div>
        </Link>
    );
};

export default MyPostSummary;
