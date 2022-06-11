import * as functions from "firebase-functions";
import { Client } from "@googlemaps/google-maps-services-js";
import { realTimeDB as db } from "./database";
import { connectDatabaseEmulator } from "firebase/database";
import gerarRotas from "./gerarRotas";

export const client = new Client({});
connectDatabaseEmulator(db, "127.0.0.1", 9000);

export const gerarRota = functions.https.onRequest(gerarRotas);
