import { Pressable, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

import { Controller, FieldValues, useFormContext } from 'react-hook-form';

import {
  ControlledInput,
  Input,
  InputControllerType,
  InputProps
} from '@/components/ui/input';
import {
  InterestsActivitiesSchema,
  interestsActivitiesSchema,
  products
} from '@/schemas/createUserSchema';
import Text from '@/components/ui/text';

import type { InterestsShape } from './choose-chip';
import Dropdown from '@/components/ui/drop-down';
import Button from '@/components/ui/button';
import { Feather } from '@expo/vector-icons';
import colors from '@/components/ui/colors';
import {
  KeyboardAvoidingView,
  KeyboardAwareScrollView
} from 'react-native-keyboard-controller';

const handleInputPress = (name: string) =>
  router.push({ pathname: '/choose-chip', params: { name } });

const extractStringFromInterests = (interests: InterestsShape[]): string => {
  return interests
    ?.reduce(
      (prev, data) => (data.selected ? `${prev}, ${data.name}` : prev),
      ''
    )
    .slice(1);
};

const moneyFormatter = Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  currencyDisplay: 'symbol',
  currencySign: 'standard',
  style: 'currency',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

interface ChooseInterestsInputProps<T extends FieldValues>
  extends Omit<InputProps, 'value'>,
    InputControllerType<T> {
  value: InterestsShape[];
}

const ChooseInterestsInput = <T extends FieldValues>({
  name,
  value,
  control,
  ...rest
}: ChooseInterestsInputProps<T>) => {
  const interestsStringfy = extractStringFromInterests(value);

  return (
    <Pressable onPress={() => handleInputPress(name)}>
      <ControlledInput
        control={control}
        name={name}
        editable={false}
        value={interestsStringfy}
        className="h-16"
        {...rest}
      />
    </Pressable>
  );
};

function Interests() {
  const { control, trigger, watch } =
    useFormContext<InterestsActivitiesSchema>();

  const [events, games, orgs, platforms] = watch([
    'events',
    'games',
    'orgs',
    'platforms'
  ]);

  async function handleSubmit() {
    const schemaFields = interestsActivitiesSchema.keyof().options;

    const output = await trigger(schemaFields, {
      shouldFocus: true
    });

    if (output) router.push('/documents-validation');
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 p-8"
      behavior={'padding'}
      keyboardVerticalOffset={-300}
    >
      <View className="pb-8 flex-row justify-between items-center">
        <Text className="text-xl">Interesses e Atividades</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleSubmit}
          className="flex-row items-center justify-center gap-2"
        >
          <Text className="font-regular">Continuar</Text>
          <Feather name="arrow-right" color={colors.white[100]} size={15} />
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <View className="flex-1 gap-10">
          <ChooseInterestsInput
            name="games"
            value={games}
            control={control}
            placeholder="Exemplo: Valorant"
            label="Quais jogos você acompanha?"
          />

          <ChooseInterestsInput
            name="orgs"
            value={orgs}
            control={control}
            placeholder="Exemplo: Furia 🤍"
            label="Quais organizações você acompanha?"
          />

          <ChooseInterestsInput
            value={events}
            control={control}
            name="events"
            placeholder="Exemplo: DreamHack"
            label="Quais eventos acompanhou no último ano?"
          />

          <ChooseInterestsInput
            name="platforms"
            value={platforms}
            control={control}
            placeholder="Exemplo: Youtube"
            label="Acompanha e-sports por onde?"
          />

          <Controller
            name="spentMoney"
            control={control}
            render={({ field }) => (
              <Input
                label="Quanto gastou com e-sports no último ano?"
                ref={field.ref}
                onChangeText={(text) => {
                  const digits = text.replace(/\D/g, '');
                  const realValue = Number(digits) / 100;

                  field.onChange(realValue);
                }}
                value={moneyFormatter.format(field.value)}
                keyboardType="numeric"
                className="h-16"
              />
            )}
          />

          <View className="gap-2">
            <Text className="text-white-200">
              Já comprou produtos de e-sports?
            </Text>

            <Controller
              control={control}
              name="products"
              render={({ field }) => (
                <Dropdown onChange={field.onChange} data={products}>
                  Exemplo: {products.at(-1)}
                </Dropdown>
              )}
            />
          </View>

          <Button
            className="bg-white-300 flex-row gap-2 mt-4"
            onPress={handleSubmit}
          >
            <Text className="text-black-300">Continuar</Text>
            <Feather name="arrow-right" color={colors.black[300]} size={20} />
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
}

export default Interests;
