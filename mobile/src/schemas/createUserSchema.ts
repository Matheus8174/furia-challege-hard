import { z } from 'zod';

export const contentPreferencesSchema = z.object({
  commonPreferences: z.array(z.string()),
  preferencesByGame: z.object({
    name: z.string(),
    preferences: z.array(z.string())
  })
});

export const createUserSchema = z.object({
  name: z
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
  phoneNumber: z
    .string()
    .min(15, 'Número de telefone inválido')
    .max(16, 'Número de telefone inválido'),
  name: z.string(),
  cpf: z
    .string({ required_error: 'Informe o sue cpf' })
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
  state: z.string({ required_error: 'Informe o seu Estado' }).min(2),
  city: z.string({ required_error: 'Informe a sua cidade' }).min(2),
  neighborhood: z.string({ required_error: 'Informe o seu bairro' }),
  number: z.string({ required_error: 'Informe o número' }),
  adreass: z.string({ required_error: 'Informe o seu endereço' }).min(2),
  complement: z.string().optional()
});

export type ContentPreferencesSchema = z.infer<typeof contentPreferencesSchema>;

export type PersonalDataSchema = z.infer<typeof personalDataSchema>;

export type LocationSchema = z.infer<typeof locationSchema>;

export type CreateUserSchema = z.infer<typeof createUserSchema>;
