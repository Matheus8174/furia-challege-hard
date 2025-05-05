import { z } from 'zod';

const dataSchema = z.object({
  name: z.string(),
  cpf: z.string()
});

type DataSchema = typeof dataSchema;

export const validateDocumentsSchema = z.object({
  selfie: z.instanceof(Buffer),
  documents: z.array(z.instanceof(Buffer)).length(2),
  data: z
    .string()
    .transform<DataSchema>((e) => JSON.parse(e))
    .refine(
      (data) => dataSchema.safeParse(data).success
    ) as unknown as DataSchema
});

export const querystring = z.object({
  cpf: z.string()
});

export const status = z.enum(['pending', 'valid', 'invalid']);

export type Status = z.infer<typeof status>;

export type ValidateDocumentsSchema = z.infer<typeof validateDocumentsSchema>;
