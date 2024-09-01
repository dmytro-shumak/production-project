import openBrowser from "react-dev-utils/openBrowser";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import type { BuildOptions } from "./types/config";

export const buildDevServer = ({
  port,
}: BuildOptions): DevServerConfiguration => ({
  port,
  open: false,
  historyApiFallback: true,
  hot: true,
  onListening(devServer) {
    const address = devServer.server?.address();
    if (address !== null && typeof address === "object" && "port" in address) {
      // open the app in the same tab
      openBrowser(`http://localhost:${address.port}`);
    }
  },
});
