import { z } from 'zod';

export const games = [
  'CS2 (Counter-Strike 2)',
  'Valorant',
  'PUBG',
  'League of Legends',
  'Fortnite',
  'Dota 2',
  'Rainbow Six Siege',
  'Call of Duty',
  'Apex Legends',
  'Rocket League',
  'Free Fire'
] as const;

export const platforms = [
  'Twitch',
  'YouTube',
  'TikTok',
  'Instagram',
  'Twitter (X)',
  'Discord',
  'Facebook Gaming',
  'Trovo',
  'Kick'
] as const;

export const orgs = [
  'FURIA',
  'LOUD',
  'Fluxo',
  'MIBR',
  'Pain Gaming',
  'RED Canids',
  'Team Liquid',
  'Sentinels',
  'G2 Esports',
  'FaZe Clan',
  'Cloud9',
  'Ninjas in Pyjamas'
] as const;

export const events = [
  'IEM Rio Major',
  'CBLOL/LTASUL',
  'Valorant Champions Tour',
  'Game XP',
  'TwitchCon',
  'BLAST Premier',
  'DreamHack',
  'Comic Con Experience (CCXP)',
  'BGS (Brasil Game Show)'
] as const;

export const products = [
  'Ingressos para campeonatos',
  'Camisas ou produtos oficiais',
  'Equipamentos gamer (mouse, teclado, headset)',
  'Serviços de assinatura (pass de batalha, clubes, etc.)',
  'Nenhuma compra'
] as const;

export const gender = [
  'Masculino',
  'Feminino',
  'Não-binário',
  'Prefiro não informar',
  'Outro'
] as const;

const createInterestsFactory = (
  options: readonly [string, ...string[]],
  errorMessage: string
) =>
  z
    .array(
      z.object({
        name: z.enum(options),
        selected: z.boolean()
      })
    )
    .refine((data) => data.find(({ selected }) => selected), errorMessage);

export const interestsActivitiesSchema = z.object({
  spentMoney: z.coerce.number().min(0.0),
  orgs: createInterestsFactory(orgs, 'Escolha ao menos uma organização'),
  games: createInterestsFactory(games, 'Escolha ao menos um jogo competitivo'),
  events: createInterestsFactory(events, 'Escolha ao menos um evento'),
  products: createInterestsFactory(products, 'Escolha ao menos uma opção'),
  platforms: createInterestsFactory(platforms, 'Escolha ao menos uma opção')
});

export const createUserSchema = z.object({
  nick: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(4, 'Nome precisa ter no mínimo 4 caracteres'),
  email: z
    .string({ required_error: 'Email obrigatório' })
    .email('Email inválido'),
  password: z
    .string({ required_error: 'Senha obrigatória' })
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
});

export const personalDataSchema = z.object({
  gender: z.enum(gender),
  phoneNumber: z
    .string({ required_error: 'Informe o seu número de telefone' })
    .min(15, 'Número de telefone inválido')
    .max(16, 'Número de telefone inválido'),
  name: z
    .string({ required_error: 'Informe o seu nome' })
    .min(2, 'Nome muito pequeno'),
  cpf: z
    .string({ required_error: 'Informe o seu cpf' })
    .length(14, 'cpf muito pequeno'),
  birthdate: z
    .string({
      required_error: 'Informe a sua data de nascimento',
      coerce: true
    })
    .length(10, 'Formato de data inválido')
    .transform((date) => {
      const [day, month, year] = date.split('/').map((e) => Number(e));

      return new Date(year, month - 1, day);
    })
});

export const locationSchema = z.object({
  cep: z.string({ required_error: 'Digite seu cep' }).length(9, 'Cep inválido'),
  city: z.string({ required_error: 'Informe a sua cidade' }).min(2),
  state: z.string({ required_error: 'Informe o seu Estado' }).min(2),
  number: z.string({ required_error: 'Informe o número' }),
  adreass: z.string({ required_error: 'Informe o seu endereço' }).min(2),
  complement: z.string().optional(),
  neighborhood: z.string({ required_error: 'Informe o seu bairro' })
});

export const validateDataSchema = z.object({
  rgPhoto: z.array(z.string()),
  facePhoto: z.string()
});

export type PersonalDataSchema = z.infer<typeof personalDataSchema>;

export type LocationSchema = z.infer<typeof locationSchema>;

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export type InterestsActivitiesSchema = z.infer<
  typeof interestsActivitiesSchema
>;

export type ValidateDataSchema = z.infer<typeof validateDataSchema>;
