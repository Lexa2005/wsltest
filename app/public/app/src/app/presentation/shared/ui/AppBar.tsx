import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import "./AppBar.scss";
import {Box, Button} from "@mui/material";
import {Link} from "react-router-dom";

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export const AppBar = () => {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({...state, [anchor]: open});
            };

    return (
        <>
            <nav className={`appbar`} style={{padding: `5px 0`}}>
                <Link to={`/`}>
                    <img src={`/favicon/logoXL.svg`}
                         style={{height: 50}}/>
                </Link>
                <div className="right">
                    <Button variant="contained"
                            className={`feedback`}
                            children={`Оставить заявку`}/>
                    <div className="burger" onClick={toggleDrawer(`right`, true)}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </nav>
            <React.Fragment>
                <Drawer anchor={`right`}
                        open={state[`right`]}
                        onClose={toggleDrawer(`right`, false)}>
                    <Box sx={{ width: 320 }}
                         role="presentation"
                         className={`drawer`}
                         onClick={toggleDrawer(`right`, false)}
                         onKeyDown={toggleDrawer(`right`, false)}>
                        <div className="close">
                            <CloseIcon sx={{fontSize: 40}} style={{cursor: `pointer`}}/>
                        </div>
                    </Box>
                </Drawer>
            </React.Fragment>
        </>
    );
};
