import "./IndexPage.scss";
import {TopBlock} from "./ui/topblock/TopBlock";

export const indexPage = () => {
    return (
        <div className="index">
            <TopBlock/>
            <div className="actions"
                 style={{
                     height: 200,
                     backgroundColor: `gray`
                 }}>

            </div>
        </div>
    )
}
