import * as WebSocket from "ws";
import { deleteCardFromDB, getCardsFromDb, addCardToDb, updateCardToDb } from "./db";

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

    ws.on("ping", () => {
      console.log("some client is ping ponging??");
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
          deleteCardFromDB(id);
          deleteCardFromList(id);
          console.log("delete card list ", cardList);
          broadcastNewData(ws, wss, cardList);
        }

        if (action === "ADD_CARD") {
          addCardToDb(payload);
          addCardToList(payload);
          console.log("added card list ", cardList);
          broadcastNewData(ws, wss, cardList);
        }

        if (action === "UPDATE_CARDS") {
          updateCardToDb(payload);
          updateCardInList(payload);

          console.log("SHOULD BROADCAST!!");
          // Only send actual updated items
          broadcastNewData(ws, wss, { action: "SERVER_UPDATED_CARDS", payload });
        }
      } catch (err) {
        console.log("Message ", message);
      }
    });

    // Check if alive

    //GOOGLE HOW TO CHECK IF WS IS ALIVE ON SERVER

    /*    setInterval(() => {
      wss.clients.forEach((webSocket, webSocket2, set) => {
        webSocket.rea 
        return ws.terminate();

        wsIsAlive = false;
        ws.ping(null, false);
      });
    }, 10000); */

    //send immediatly a feedback to the incoming connection
    ws.send(JSON.stringify({ payload: cardList, action: "INIT_WS_CONNECTION" }));

    return wss;
  });
}

function broadcastNewData(ws: WebSocket, wss: WebSocket.Server, socketData: WebSocketData) {
  if (!!wss.clients) {
    wss.clients.forEach((client) => {
      if (ws !== client) {
        console.log("Broadcasted info to a client");
        client.send(JSON.stringify(socketData));
      }
    });
  }
}

function deleteCardFromList(cardId: string) {
  const cardIndex = cardList.findIndex((c: any) => c.id === cardId);
  cardList.splice(cardIndex, 0);
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
