import React from 'react';
import {RouterProvider} from "react-router-dom";
import {publicRoutes} from "../../core/router";
import "./App.scss";
export const App = () => {
    return (
        <div id="app"
             // className={`container-xl`}
             style={{
                 margin: `0 auto`,
                 maxWidth: 1366
             }}>
            <RouterProvider router={publicRoutes}
                            fallbackElement={<p>Loading...</p>}/>
        </div>
    );
};
