import * as functions from "firebase-functions";
import { inspect } from "util";

import {
  Client,
  LatLng,
  TravelMode,
  UnitSystem,
} from "@googlemaps/google-maps-services-js";
import { realTimeDB as db } from "./database";
import { connectDatabaseEmulator, push, ref } from "firebase/database";

const client = new Client({});
connectDatabaseEmulator(db, "127.0.0.1", 9000);

interface Payload {
  nomeRota: string;
  origem: LatLng;
  destino: LatLng;
}

export const gereRota = functions.https.onRequest(async (req, res) => {
  if (req.method === "POST") {
    functions.logger.info(`Recebendo o seguinte payload ${inspect(req.body)}`, {
      structuredData: true,
    });

    const { nomeRota, origem, destino } = req.body as Payload;
    const { data } = await client.directions({
      params: {
        origin: origem,

        destination: destino,
        key: process.env.GOOGLE_MAPS_KEY!,
        mode: TravelMode.driving,
        units: UnitSystem.metric,
      },
    });

    await push(ref(db, "/rotas/" + nomeRota), data);
    res.send(data);
  } else res.status(405).send();
});
