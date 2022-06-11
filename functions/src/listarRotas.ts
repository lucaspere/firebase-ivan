import * as functions from "firebase-functions";
import { ListarRotasResponse } from ".";

import { adminApp } from "./database";

export default async (
  req: functions.Request,
  res: functions.Response<any>
): Promise<void> => {
  if (req.method === "GET") {
    const rotas = await adminApp.ref(`/rotas/`).get();

    res.send(buildResponse(rotas.val()));
  } else res.status(405).send();
};

const buildResponse = (data: any | null): ListarRotasResponse => ({
  rotas: data ? Object.keys(data).map((id) => ({ id, ...data[id] })) : [],
});
