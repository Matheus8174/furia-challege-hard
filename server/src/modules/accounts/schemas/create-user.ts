import { z } from 'zod';

import { games, orgs, events, gender, platforms, products } from './constants';

export const createUserSchema = z.object({
  name: z.string(),
  adreass: z.string(),
  birthdate: z.string().transform((e) => new Date(e)),
  cep: z.string().refine((cep) => cep.replace(/\D/g, '')),
  city: z.string(),
  complement: z.string().optional(),
  cpf: z.string().refine((cep) => cep.replace(/\D/g, '')),
  email: z.string().email(),
  spentMoney: z.coerce.number().min(0.0),
  orgs: z.array(z.enum(orgs)).min(1),
  games: z.array(z.enum(games)).min(1),
  events: z.array(z.enum(events)).min(1),
  products: z.enum(products),
  platforms: z.array(z.enum(platforms)).min(1),
  gender: z.enum(gender),
  neighborhood: z.string(),
  nick: z.string(),
  number: z.number(),
  password: z.string(),
  phoneNumber: z.string().refine((cep) => cep.replace(/\D/g, '')),
  state: z.string()
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
