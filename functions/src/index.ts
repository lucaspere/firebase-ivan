import * as functions from "firebase-functions";
import { Client, LatLng } from "@googlemaps/google-maps-services-js";
import { realTimeDB } from "./database";
import { inspect } from "util";
import gerarRotas from "./gerarRotas";
import queryRotas from "./listarRotas";

export interface EnderecoInfo {
  endereco: string;
  placeId: string;
  latLng: LatLng;
}
export interface Rota {
  nome: string;
  origem: EnderecoInfo;
  destino: EnderecoInfo;
  distancia: string;
  duracao: string;
}
export interface GerarRotaPayload {
  nome: string;
  origem: LatLng;
  destino: LatLng;
}

export interface ListarRotasResponse {
  rotas: Array<Rota & { id: string }>;
}

export const client = new Client({});
functions.logger.info(
  `Database connect for app ${realTimeDB.app.name} and type ${inspect(
    realTimeDB.type
  )}`
);
//connectDatabaseEmulator(db, "127.0.0.1", 9000);

export const gerarRota = functions.https.onRequest(gerarRotas);
export const listarRotas = functions.https.onRequest(queryRotas);
