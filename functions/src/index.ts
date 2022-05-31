import * as functions from "firebase-functions";
import { inspect } from "util";

import {
  Client,
  LatLng,
  TravelMode,
  UnitSystem,
} from "@googlemaps/google-maps-services-js";

const client = new Client({});

interface Payload {
  nomeRota: string;
  origem: LatLng;
  destino: LatLng;
}

export const gereRota = functions.https.onRequest(async (req, res) => {
  functions.logger.info(`Recebendo o seguinte payload ${inspect(req.body)}`, {
    structuredData: true,
  });

  const { origem, destino } = req.body as Payload;
  const { data } = await client.directions({
    params: {
      origin: origem,

      destination: destino,
      key: process.env.GOOGLE_MAPS_KEY!,
      mode: TravelMode.driving,
      units: UnitSystem.metric,
    },
  });

  res.send(data);
});
