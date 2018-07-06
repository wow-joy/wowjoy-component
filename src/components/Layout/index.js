import Layout from "./Layout";
import Hoc from '../../tools/Hoc';
import type1 from "./types/type1";
import type2 from "./types/type2";
export const Type1 = Hoc(type1)(Layout);
export const Type2 = Hoc(type2)(Layout);
export default Layout;
