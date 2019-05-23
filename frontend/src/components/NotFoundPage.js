import { Link } from "react-router-dom";
import React from "react";

const NotFoundPage = () => (
    <div>
        404! - <Link to="/">Go home</Link>
    </div> // link works like an a-tag, but uses client-side routing.
);

export default NotFoundPage;
