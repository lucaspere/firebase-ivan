import {
  LatLng,
  TravelMode,
  UnitSystem,
} from "@googlemaps/google-maps-services-js";
import * as functions from "firebase-functions";
import { push, ref } from "firebase/database";
import { inspect } from "util";
import { client } from ".";
import { realTimeDB as db } from "./database";

interface X {
  endereco: string;
  placeId: string;
  latLng: LatLng;
}
interface GerarRotaResponse {
  nome: string;
  origem: X;
  destino: X;
  distancia: string;
  duracao: string;
}
interface Payload {
  nome: string;
  origem: LatLng;
  destino: LatLng;
}

export default async (
  req: functions.Request,
  res: functions.Response<Payload>
): Promise<void> => {
  if (req.method === "POST") {
    functions.logger.info(`Recebendo o seguinte payload ${inspect(req.body)}`, {
      structuredData: true,
    });

    const { origem, destino, nome } = req.body as unknown as Payload;
    const { data } = await client.directions({
      params: {
        origin: origem,
        destination: destino,
        key: process.env.GOOGLE_MAPS_KEY!,
        mode: TravelMode.driving,
        units: UnitSystem.metric,
      },
    });
    const routeData = data.routes[0].legs[0];
    const route: GerarRotaResponse = {
      nome,
      origem: {
        endereco: routeData.start_address,
        placeId: data.geocoded_waypoints[0].place_id,
        latLng: [routeData.start_location.lat, routeData.start_location.lng],
      },
      destino: {
        endereco: routeData.end_address,
        placeId: data.geocoded_waypoints[1].place_id,
        latLng: [routeData.end_location.lat, routeData.end_location.lng],
      },
      distancia: routeData.distance.text,
      duracao: routeData.duration.text,
    };

    await push(ref(db, `/rotas/${nome}`), route);

    res.status(201).send();
  } else res.status(405).send();
};
