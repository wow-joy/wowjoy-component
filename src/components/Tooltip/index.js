import Tooltip from './Tooltip';
import Hoc from '../../tools/Hoc';
import type1 from "./types/type1";

export const Type1 = Hoc(type1)(Tooltip);
export default Tooltip