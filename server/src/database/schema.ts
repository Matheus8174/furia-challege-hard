import {
  events,
  games,
  gender,
  orgs,
  platforms,
  products
} from '@/modules/accounts/schemas/constants';
import {
  date,
  integer,
  numeric,
  pgTable,
  text,
  uuid,
  varchar
} from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  adreass: text('adreass').notNull(),
  birthdate: date('birthdate', { mode: 'date' }).notNull(),
  cep: text('cep').notNull(),
  city: text('city').notNull(),
  complement: text('complement'),
  cpf: text('cpf').notNull(),
  email: text('email').notNull(),
  spentMoney: numeric('spent_money', { mode: 'number' }).notNull(),
  orgs: varchar('orgs', { enum: orgs }).array().notNull(),
  games: varchar('games', { enum: games }).array().notNull(),
  events: varchar('events', { enum: events }).array().notNull(),
  products: varchar('products', { enum: products }).notNull(),
  platforms: varchar('platforms', { enum: platforms }).array().notNull(),
  gender: varchar('gender', { enum: gender }).notNull(),
  neighborhood: text('neighborhood').notNull(),
  nick: text('nick').notNull(),
  number: integer('number').notNull(),
  password: text('password').notNull(),
  phoneNumber: text('phone_number').notNull(),
  state: text('state').notNull()
});

// {"adreass": "Rua João Pedro Longo ", "birthdate": 2002-01-02T02:00:00.000Z, "cep": "45675-000", "city": "Aurelino Leal", "complement": undefined, "cpf": "083.731.465-80", "email": "souzamatheus8174@gmail.com", "events": ["CBLOL/LTASUL", "Valorant Champions Tour"], "facePhoto": "/data/user/0/com.matheus8174.furiahubmobile/cache/mrousavy3593802058571380403.jpg", "games": ["CS2 (Counter-Strike 2)", "Valorant"], "gender": "Masculino", "name": "Matheus Santos Araújo da Silva", "neighborhood": "Centro", "nick": "Ocin", "number": "21", "orgs": ["Fluxo"], "password": "817440", "phoneNumber": "(73) 9 8248-7173", "platforms": ["Twitter (X)", "Instagram"], "products": "Camisas ou produtos oficiais", "rgPhoto": ["/data/user/0/com.matheus8174.furiahubmobile/cache/mrousavy6576472505579183047.jpg", "/data/user/0/com.matheus8174.furiahubmobile/cache/mrousavy605945869140312967.jpg"], "spentMoney": 100, "state": "Bahia"}
