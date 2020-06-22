import { Client } from "pg";

let client: Client;

export async function connectToDb() {
  try {
    client = new Client({
      user: "igepwuyfnzsjnc",
      host:
        "postgres://igepwuyfnzsjnc:239a2d6e3c6d905ceb8df4563e3c6df0ab727904e6dc2d45de9ed0f6c44d87d9@ec2-54-247-78-30.eu-west-1.compute.amazonaws.com:5432/der3pgfsa556cr",
      database: "der3pgfsa556cr", // process.env.DATABASE_NAME,
      password: "239a2d6e3c6d905ceb8df4563e3c6df0ab727904e6dc2d45de9ed0f6c44d87d9",
      port: 5432,
    });

    await client.connect();
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
  /*  if (!client) {
    await connectToDb();
  }

  const query = `
    select * from cards;
  `;

  client.query(query, (err: any, res: any) => {
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
