import { Link } from "react-router-dom";
import React from "react";

const NotFoundPage = () => (
    <div className="content-container">
        <h1>
            404! - <Link to="/">Go home</Link>
        </h1>
    </div> // link works like an a-tag, but uses client-side routing.
);

export default NotFoundPage;
