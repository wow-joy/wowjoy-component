import Message from './Message';
import Hoc from "../../tools/Hoc/index";
import doubt from "./types/doubt";
import error from "./types/error";
import info from "./types/info";
import success from "./types/success";
import warn from "./types/warn";

export const Doubt = Hoc(doubt)(Message);
export const Error = Hoc(error)(Message);
export const Info = Hoc(info)(Message);
export const Success = Hoc(success)(Message);
export const Warn = Hoc(warn)(Message);
export default Message;