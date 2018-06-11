import Template from './Template';
import Hoc from '../../tools/Hoc';
import type1 from "./types/type1";
export { Hoc };
export const Type1 = Hoc(type1)(Btn);
export default Template