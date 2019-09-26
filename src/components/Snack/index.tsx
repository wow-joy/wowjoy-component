import * as React from "react";
import * as ReactDOM from "react-dom";
import Notification from "./Notification";
import Snack, { SnackType } from "./Snack";
import globalConfig from "./config";
import { Config } from "./index.d";

let key: number = 0;
const container: HTMLDivElement = document.createElement("div");
document.body.appendChild(container);

let notificationInstance: Notification;

function getInstance(callback: (ins: Notification) => any): void {
  if (notificationInstance) {
    callback(notificationInstance);
  } else {
    function ref(instance: Notification) {
      notificationInstance = instance;
      callback(notificationInstance);
    }
    ReactDOM.render(
      <Notification ref={ref as any} top={globalConfig.top} />,
      container
    );
  }
}

function createSnack(type: SnackType) {
  return (
    msg: string,
    duration: number = globalConfig.duration,
    onClose?: () => any
  ) => {
    key++;
    return new Promise(resolve => {
      getInstance(instance => {
        const close = ((key: number) => {
          return function close() {
            onClose && onClose();
            instance.remove(key);
          };
        })(key);
        const content = (
          <Snack
            key={key}
            type={type}
            msg={msg}
            duration={duration}
            onClose={close}
          />
        );
        instance.add({
          key,
          content
        });
        resolve(content);
      });
    });
  };
}

const snack = {
  success: createSnack("success"),
  error: createSnack("error"),
  info: createSnack("info"),
  warning: createSnack("warning"),
  config: function(config: Config) {
    globalConfig.top = config.top || globalConfig.top;
    globalConfig.duration = config.duration || globalConfig.duration;
  },
  destroy: function() {
    getInstance((ins: Notification) => {
      ins.destroy();
    });
  }
};

export default snack;
