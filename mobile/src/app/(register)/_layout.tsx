import { Stack } from 'expo-router';

import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  createUserSchema,
  events,
  products,
  games,
  interestsActivitiesSchema,
  locationSchema,
  orgs,
  personalDataSchema,
  platforms,
  validateDataSchema
} from '@/schemas/createUserSchema';
import colors from '@/components/ui/colors';

const fullSchema = createUserSchema
  .merge(personalDataSchema)
  .merge(locationSchema)
  .merge(interestsActivitiesSchema)
  .merge(validateDataSchema);

export type FullSchema = Zod.infer<typeof fullSchema>;

const createInterestsFactory = (interest: readonly [...string[]]) =>
  interest.map((name) => ({ name, selected: false }));

const values = {
  orgs: createInterestsFactory(orgs),
  games: createInterestsFactory(games),
  events: createInterestsFactory(events),
  products: createInterestsFactory(products),
  platforms: createInterestsFactory(platforms)
};

function Layout() {
  const methods = useForm({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      ...values,
      spentMoney: 0,
      rgPhoto: [],
      gender: 'Prefiro não informar'
    }
  });

  return (
    <FormProvider {...methods}>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="index" />

        <Stack.Screen name="interests" />

        <Stack.Screen name="location-data" />

        <Stack.Screen name="documents-validation" />

        <Stack.Screen
          name="choose-chip"
          options={{
            navigationBarColor: colors.black[200],
            gestureEnabled: false,
            animation: 'slide_from_bottom',
            presentation: 'transparentModal'
          }}
        />
      </Stack>
    </FormProvider>
  );
}

export default Layout;
