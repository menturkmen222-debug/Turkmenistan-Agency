import "express";

declare module "express-serve-static-core" {
  interface Request {
    log: {
      info: (obj: unknown, msg?: string) => void;
      warn: (obj: unknown, msg?: string) => void;
      error: (obj: unknown, msg?: string) => void;
    };
  }
}
