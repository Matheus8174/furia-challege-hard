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
