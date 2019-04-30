import Steps from './Steps';
import Step from './Step';
import Hoc from '../../tools/Hoc';
import type1 from './types/type1';

Steps.Step = Step;
export const Type1 = Hoc(type1)(Steps);
export default Steps;
