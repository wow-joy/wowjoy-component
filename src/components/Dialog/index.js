import Dialog from './Dialog';
import Hoc from '../../tools/Hoc';
import type1 from "./types/type1";
import confirm from "./types/confirm";
import alert from "./types/alert";
export { Hoc };
export const Type1 = Hoc(type1)(Dialog);
export const Confirm = Hoc(confirm)(Dialog);
export const Alert = Hoc(alert)(Dialog);
export default Dialog