import * as WebSocket from "ws";
import { getCardsFromDb } from "./db";
import _ from "lodash";
//import { deleteCardFromDB, getCardsFromDb, addCardToDb, updateCardToDb } from "./db";

type WebSocketActions =
  | "DELETE_CARD"
  | "ADD_CARD"
  | "UPDATE_CARDS"
  | "INIT_WS_CONNECTION"
  | "SERVER_UPDATED_CARDS"
  | "SERVER_DELETED_CARD"
  | "SERVER_ADDED_CARD";
interface WebSocketData {
  action: WebSocketActions;
  payload: any;
  params?: any;
}

// Populate cardlist fix
let cardList: any = [];

// TODO: Find type
export async function initWebSocket(server: any) {
  const wss = new WebSocket.Server({ server });

  cardList = getCardsFromDb();

  wss.on("connection", (ws: WebSocket) => {
    ws.on("pong", () => {
      console.log("some client is pongo??");
    });

    ws.on("close", () => {
      console.log("tihs is actually closing??");
    });

    ws.on("message", (message: string) => {
      try {
        const data = JSON.parse(message) as WebSocketData;

        const { action, payload, params } = data;

        if (!action || !payload) {
          return;
        }

        if (action === "DELETE_CARD") {
          const { id } = payload;
          // deleteCardFromDB(id);
          deleteCardFromList(id);
          console.log("delete card list ", cardList);
          broadcastNewData(ws, wss, { action: "SERVER_DELETED_CARD", payload });
        }

        if (action === "ADD_CARD") {
          //   addCardToDb(payload);
          addCardToList(payload);
          console.log("added card list ", cardList);
          broadcastNewData(ws, wss, cardList);
        }

        if (action === "UPDATE_CARDS") {
          //  updateCardToDb(payload);
          updateCardInList(payload);

          console.log("SHOULD BROADCAST!!");
          // Only send actual updated items
          broadcastNewData(ws, wss, { action: "SERVER_UPDATED_CARDS", payload });
        }
      } catch (err) {
        console.log("Message ", message);
      }
    });
    //send immediatly a feedback to the incoming connection
    ws.send(JSON.stringify({ payload: cardList, action: "INIT_WS_CONNECTION" }));

    return wss;
  });
}

function broadcastNewData(ws: WebSocket, wss: WebSocket.Server, socketData: WebSocketData) {
  if (!!wss.clients) {
    wss.clients.forEach((client) => {
      //TODO / BUG: client that sent value still seems to receive send event?
      if (!_.isEqual(ws, client)) {
        console.log("Broadcasted info to a client");
        client.send(JSON.stringify(socketData));
      }
    });
  }
}

function deleteCardFromList(cardId: string) {
  cardList = cardList.filter((c: any) => c.id !== cardId);
}

function addCardToList(card: any) {
  cardList.push(card);
}

function updateCardInList(cards: any) {
  cardList = cardList.map((card: any) => {
    const foundCard = cards.find((c: any) => c.id === card.id);

    if (foundCard) {
      return foundCard;
    }

    return card;
  });
}
