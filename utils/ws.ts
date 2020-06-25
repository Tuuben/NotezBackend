import * as WebSocket from "ws";
import { getNotesFromDb, deleteNote, addNote, updateNotes } from "../controllers/noteController";

type WebSocketAction =
  | "DELETE_NOTE"
  | "ADD_NOTE"
  | "UPDATE_NOTES"
  | "INIT_WS_CONNECTION"
  | "SERVER_UPDATED_NOTES"
  | "SERVER_DELETED_NOTE"
  | "SERVER_ADDED_NOTE";
interface WebSocketData {
  action: WebSocketAction;
  payload: any;
  params?: any;
}

// TODO: Find type
export async function initWebSocket(server: any) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", async (ws: WebSocket) => {
    /*     ws.on("close", () => {
      console.log("Socket is closing");
    }); */

    ws.on("message", (message: string) => {
      try {
        const data = JSON.parse(message) as WebSocketData;

        const { action, payload, params } = data;

        if (!action || !payload) {
          return;
        }

        if (action === "DELETE_NOTE") {
          const { id } = payload;
          deleteNote(id);
          broadcastNewData(ws, wss, { action: "SERVER_DELETED_NOTE", payload });
        }

        if (action === "ADD_NOTE") {
          addNote(payload);
          broadcastNewData(ws, wss, { action: "SERVER_ADDED_NOTE", payload });
        }

        if (action === "UPDATE_NOTES") {
          updateNotes(payload);
          // Only send actual updated items
          broadcastNewData(ws, wss, { action: "SERVER_UPDATED_NOTES", payload });
        }
      } catch (err) {
        console.log("Message ", message);
      }
    });

    // New connection send inital cardList
    const noteList = await getNotesFromDb();
    ws.send(JSON.stringify({ payload: noteList, action: "INIT_WS_CONNECTION" }));

    return wss;
  });
}

function broadcastNewData(ws: WebSocket, wss: WebSocket.Server, socketData: WebSocketData) {
  if (!!wss.clients) {
    console.log("NUMBER OF CLIENTS ", wss.clients.size);
    wss.clients.forEach((client) => {
      if (ws !== client) {
        console.log("Broadcasted info to a client");
        client.send(JSON.stringify(socketData));
      }
    });
  }
}
