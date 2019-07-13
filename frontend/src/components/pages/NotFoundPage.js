import { Link } from "react-router-dom";
import React from "react";

const NotFoundPage = () => (
    <div className="page-header">
        <div className="content-container">
            <h1 className="page-header__title">
                {" "}
                404 - Page Not Found -{" "}
                <Link className="link__inline" to="/">
                    Go home
                </Link>
            </h1>
        </div>
    </div>
);

export default NotFoundPage;
