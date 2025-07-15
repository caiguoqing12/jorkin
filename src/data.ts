import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';
import { join } from 'path';

export type Item = {
  name?: string;
  login?: string;
  id?: string;
  title?: string;
  content?: string;
  time?: string;
  answer?: string;
  password?: string;
};

type Data = {
  items: Item[];
};

function createDB(fileName: string) {
  const file = join(process.cwd(), fileName);
  const adapter = new JSONFileSync<Data>(file);
  const db = new LowSync<Data>(adapter, { items: [] });
  db.read();
  if (!db.data) db.data = { items: [] };

  return {
    getAllItems: () => {
      db.read();
      return db.data!.items;
    },
    getItemById: (id: string) => {
      db.read();
      return db.data!.items.find(item => item.id === id);
    },
    addItem: (item: Item) => {
      db.read();
      db.data!.items.unshift(item);
      db.write();
    },
    updateItem: (id: string, update: Partial<Item>) => {
      db.read();
      const item = db.data!.items.find(i => i.id === id);
      if (item) {
        Object.assign(item, update);
        db.write();
      }
    },
    deleteItem: (id: string) => {
      db.read();
      db.data!.items = db.data!.items.filter(i => i.id !== id);
      db.write();
    }
  };
}

export default createDB; 