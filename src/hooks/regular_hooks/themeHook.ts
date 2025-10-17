import { RootState } from "../../store/store";
import { setTheme, toogleTheme } from "../../store/themeSlice";
import { useAppDispatch, useAppSelector } from "./hooks"


export const UseTheme=()=>{
    const dispatch=useAppDispatch();
    const theme =useAppSelector((state:RootState)=>state.theme.theme)

    const toogle=()=>dispatch(toogleTheme());
    const set=(value:'light'|'dark')=>{dispatch(setTheme(value))}

    return {theme, toogle, set}
}