import { Slot } from 'expo-router';

import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  contentPreferencesSchema,
  createUserSchema,
  locationSchema,
  personalDataSchema
} from '@/schemas/createUserSchema';

const fullSchema = contentPreferencesSchema
  .merge(createUserSchema)
  .merge(personalDataSchema)
  .merge(locationSchema);

function Layout() {
  const methods = useForm({
    resolver: zodResolver(fullSchema),
    mode: 'all'
  });

  return (
    <FormProvider {...methods}>
      <Slot />
    </FormProvider>
  );
}

export default Layout;
