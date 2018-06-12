import Dialog from './Dialog';
import Hoc from '../../tools/Hoc';
import type1 from "./types/type1";
export { Hoc };
export const Type1 = Hoc(type1)(Dialog);
export default Dialog