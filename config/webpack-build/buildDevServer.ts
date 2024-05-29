import openBrowser from "react-dev-utils/openBrowser";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import type { BuildOption } from "./types/config";

export const buildDevServer = ({ port, paths }: BuildOption): DevServerConfiguration => {
  return {
    port,
    open: false,
    historyApiFallback: true,
    onListening: function (devServer) {
      const address = devServer.server.address();
      if (typeof address === "object" && "port" in address) {
        // open the app in the same tab
        openBrowser(`http://localhost:${address.port}`);
      }
    },
  };
};
