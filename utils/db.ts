import { Client } from "pg";

// TODO move
interface Card {
  id: number;
  content: string;
  location: number;
}

export async function connectToDb() {
  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "thel",
    password: "",
    port: 5432,
  });

  await client.connect();

  /*

    CREATE TABLE users (
        email varchar,
        firstName varchar,
        lastName varchar,
        age int
    );

     INSERT INTO cards (content, location)
        VALUES ('Hello world card', 1);
   */

  const query = `
        select * from cards
    `;

  client.query(query, (err: any, res: any) => {
    if (err) {
      console.error(err);
      return;
    }
    //  console.log("Table is successfully created", res);
  });
}

export function deleteCardFromDB(cardId: string) {
  // Impelemnt query to remove card from DB
}

export function addCardToDb(card: Card) {
  // Implement add card to db
}

export function updateCardToDb(card: Card) {
  // Implement udpate card at id
}

export function getCardsFromDb() {
  let cards: Card[] = [];

  for (let i = 0; i < 1000; i++) {
    cards.push({
      id: i,
      content: `Lorem ${i}`,
      location: i,
    });
  }

  return cards;
}
