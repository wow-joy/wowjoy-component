export interface Config {
  top?: number;
  duration?: number;
}

export interface NotificationProps {
  top: number;
}
export interface Notice {
  key: string | number;
  content: React.ReactElement;
}
export interface State {
  notices: Notice[];
  [key: string]: any;
}
