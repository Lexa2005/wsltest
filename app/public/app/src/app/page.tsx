import React from 'react';
import {IndexPage} from './presentation/pages/IndexPage/index'
import "./App.scss";
export default function App () {
    return (
        <div id="app"
             // className={`container-xl`}
             style={{
                 margin: `0 auto`,
                 maxWidth: 1366
             }}>
                <link rel="icon" href="./shared/favicon.ico" sizes="any" />
                <IndexPage/>
        </div>
    );
};
