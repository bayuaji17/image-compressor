import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/_index.tsx"),
  route("/compress", "routes/compress.tsx"),
  route("/convert", "routes/convert.tsx"),
] satisfies RouteConfig;
