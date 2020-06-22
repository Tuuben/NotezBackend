import { Client } from "pg";

let client: Client;

export async function connectToDb() {
  try {
    client = new Client({
      //user: "",
      host: process.env.DATABASE_URL,
      //  database: process.env.DATABASE_NAME,
      // password: "",
      port: 5432,
    });

    await client.connect();

    console.log("Successfully connected to postgres");
  } catch (err) {
    console.log(err);
  }
}

export async function deleteCardFromDB(cardId: string) {
  /*   if (!client) {
    await connectToDb();
  }

  // Impelemnt query to remove card from DB
  const query = `
    delete from cards
    where cards.id = ${cardId} 
  `;

  client.query(query, (err: any, res: any) => {
    if (err) {
      console.error(err);
      return;
    }
  }); */
}

export async function addCardToDb(card: Card) {
  /*  if (!client) {
    await connectToDb();
  }

  const query = `
    insert into cards(location, content)
    values(${card.location}, ${card.content})
  `;

  client.query(query, (err: any, res: any) => {
    if (err) {
      console.error(err);
      return;
    }
  }); */
}

export async function updateCardToDb(card: Card) {
  /*  if (!client) {
    await connectToDb();
  }

  const query = `
    update cards
    set location = ${card.location},
    set content = ${card.content},
    where cards.id = ${card.id}
  `;

  client.query(query, (err: any, res: any) => {
    if (err) {
      console.error(err);
      return;
    }
  }); */
}

interface Card {
  id: number;
  content: string;
  location: number;
}
export function getCardsFromDb() {
  /*   const query = `
    select * from cards;
  `;

  client.query(query, (err: any, res: any) => {
    console.log("RES FROM cards", res);
    if (err) {
      console.error(err);
      return;
    }
  }); */

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
