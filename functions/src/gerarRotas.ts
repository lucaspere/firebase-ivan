import {
  LatLng,
  TravelMode,
  UnitSystem,
} from "@googlemaps/google-maps-services-js";
import * as functions from "firebase-functions";
import { inspect } from "util";
import { client } from ".";

interface GerarRotaResponse extends Payload {
  id: string;
}
interface Payload {
  nome: string;
  origem: LatLng;
  destino: LatLng;
}

export default async (req: Request, res: functions.Response<Payload>) => {
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
  const route = {
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
    distancia: routeData.distance,
    duracao: routeData.duration,
  };

  res.status(201).send();
};
