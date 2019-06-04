import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const MyPostSummary = ({ post }) => {
    return (
        <Link
            className="list-item"
            to={{
                pathname: `/myPosts/${post.post_id}/edit`,
                state: { post }
            }}
        >
            <div>
                <h3 className="list_item__title">{post.post_title}</h3>
                <p className="list-item__sub-title">{post.post_description}</p>
                <p className="list-item__sub-title">
                    Creation Date: {moment(post.post_timestamp).format("MMMM Do YYYY")}
                </p>
            </div>
        </Link>
    );
};

export default MyPostSummary;
