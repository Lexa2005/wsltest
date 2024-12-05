'use client'
import './TopBlock.scss';
import {Button} from "@mui/material";
import React, { useEffect, useState } from 'react';

export const TopBlock = () => {
    const [width, setWidth] = useState<number>(0);

    // useEffect(() => {
    //     setWidth(window.innerWidth);
    // }, []);

    return (
        <div className="topblock">
            <div className="left">
                <h5>M9M9Ra | Development</h5>
                <h1>Разработка <span>мобильных</span> приложений и веб-сервисов</h1>
                <h3>
                    Повышаем лояльность и продажи, улучшаем сервис,
                    снижаем расходы за счет автоматизации и оптимизации
                    бизнес-процессов с помощью мобильных приложений и веб-сервисов.
                </h3>
                <Button variant="contained"
                        id={`feedback`}
                        children={`Заказать проект`}/>
            </div>
            <div className="right">
                <img src="/assets/crow.png"
                     style={{
                         maxHeight: 500
                     }}
                     alt="no"/>

                {width> 1280 ?
                    <img src="/assets/crowa.png"
                         style={{
                             maxHeight: 500,
                             position: `relative`,
                             top: 50
                         }}
                         alt="no"/>
                    :
                    false
                }
            </div>
        </div>
    )
}
