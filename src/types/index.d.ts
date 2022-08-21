import { Admin } from "../model/entity/Auth";

declare module 'express-session' {
  interface Session {
    admin: Admin;
  }
}
