import {AppBar} from "../../layers/presentation/shared/ui/AppBar";
import {Outlet} from "react-router-dom";

export const RootRouter = () => {
  return (
      <>
          <AppBar/>
          <Outlet/>
      </>
  )
}
