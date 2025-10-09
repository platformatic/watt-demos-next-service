import { getGlobal } from "@platformatic/globals";
import { randomBytes } from "node:crypto";
import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
} from "node:http";

export function create() {
  const platformatic = getGlobal();

  return createServer((_: IncomingMessage, res: ServerResponse) => {
    platformatic.logger.debug("Serving request.");

    setTimeout(() => {
      res.writeHead(200, {
        "content-type": "application/json",
        connection: "close",
      });

      const content = randomBytes(3).toString("hex");
      res.end(JSON.stringify({ content }));
      platformatic.logger.debug("Request sent: " + content);
    }, 2000);
  });
}
