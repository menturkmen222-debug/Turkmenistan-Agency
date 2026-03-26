import express from "express";
import cors from "cors";
import router from "../artifacts/api-server/src/routes";

const app = express();

app.use((req: any, _res, next) => {
  req.log = {
    info: (obj: unknown, msg?: string) => console.log(msg ?? "", obj),
    warn: (obj: unknown, msg?: string) => console.warn(msg ?? "", obj),
    error: (obj: unknown, msg?: string) => console.error(msg ?? "", obj),
  };
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
