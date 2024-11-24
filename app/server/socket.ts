import type { Server as HttpServer } from "node:http";

import type { Server } from "socket.io";

export const NextWsHttpServer = Symbol.for("next_socket_io");

export const setSocketInstance = (socket: Server) =>
  Reflect.set(global, NextWsHttpServer, socket);

export const getSocketInstance = () =>
  Reflect.get(global, NextWsHttpServer) as HttpServer;
