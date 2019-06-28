import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export const MyPostSummary = ({ post, pathName, selected }) => {
    return (
        <div className={`menu-item ${selected ? "active" : ""}`}>
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
        </div>
    );
};

export default MyPostSummary;

export const MyPostMenu = (list, selected) =>
    list.map((el) => {
        return (
            <MyPostSummary post={el} pathName={`/myPosts/${el.post_id}/edit`} key={el.post_id} selected={selected} />
        );
    });

export const BrowsePostMenu = (list, selected) =>
    list.map((el) => {
        return <MyPostSummary post={el} pathName={`/post/${el.post_id}`} key={el.post_id} selected={selected} />;
    });
