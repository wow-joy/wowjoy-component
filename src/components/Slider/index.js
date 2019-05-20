import Slider from "./Slider";
import Range from "./Range";
import Hoc from "../../tools/Hoc";
import type1 from "./types/type1";

Slider.Range = Range;
export const Type1 = Hoc(type1)(Slider);
export default Slider;
