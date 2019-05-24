import Tabs from "./Tabs";
import Hoc from "../../tools/Hoc/index";
import type1 from "./types/type1";
import type2 from "./types/type2";
export const Type1 = Hoc(type1)(Tabs);
export const Type2 = Hoc(type2)(Tabs);
export default Tabs;
