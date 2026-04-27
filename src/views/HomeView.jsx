import React from 'react';
import {Link} from "react-router";

const HomeView = () => {
    return (
        <div>
            <h2 className="text-red-500">This is a test react page with routing</h2>
            <p>Go to <Link to="/help">Help</Link></p>
        </div>
    );
};

export default HomeView;