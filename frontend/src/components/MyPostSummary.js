import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export const MyPostSummary = ({ post, pathName, selected, readOnly }) => {
    return (
        <div className={`menu-item ${selected ? "active" : ""}`}>
            <Link
                className={readOnly ? "polaroid__inactive" : "polaroid"}
                to={{
                    pathname: pathName,
                    state: { post }
                }}
            >
                <div className="polaroid__text-wrapper">
                    <img className="polaroid__image" src={post.picture} />
                    <h3 className="polaroid__title">
                        {post.post_title}{" "}
                        {post.deleted_flag && (
                            <span className="polaroid__sub_title">
                                {" "}
                                (Deleted {moment(post.deletion_date).format("ddd, MMM D YYYY")})
                            </span>
                        )}
                    </h3>
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

export const MyPostMenu = (list, selected, readOnly) =>
    list.map((el) => {
        return (
            <MyPostSummary
                post={el}
                pathName={`/myPosts/${el.post_id}/edit`}
                key={el.post_id}
                selected={selected}
                readOnly={readOnly}
            />
        );
    });

export const BrowsePostMenu = (list, selected) =>
    list
        .filter((el) => !el.deleted_flag)
        .map((el) => {
            return <MyPostSummary post={el} pathName={`/post/${el.post_id}`} key={el.post_id} selected={selected} />;
        });
