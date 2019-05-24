import Btn from "./Btn";
import Hoc from "../../tools/Hoc/index";
import type1 from "./types/type1";
import type2 from "./types/type2";
import type3 from "./types/type3";
import disabled from "./types/disabled";

export const Type1: any = Hoc(type1)(Btn);
export const Type2: any = Hoc(type2)(Btn);
export const Type3: any = Hoc(type3)(Btn);
export const Disabled: any = Hoc(disabled)(Btn);
export default Btn;
