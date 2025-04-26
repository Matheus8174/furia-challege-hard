import { View } from 'react-native';

import { Controller, useFormContext } from 'react-hook-form';

import Text from '@/components/ui/text';
import Button from '@/components/ui/button';
import colors from '@/components/ui/colors';
import { ControlledInput, Input } from '@/components/ui/input';

import { LocationSchema, locationSchema } from '@/schemas/createUserSchema';
import { getDataByCep } from '@/services/cep';
import { formatCep } from '@/utils/formatters';
import { Feather } from '@expo/vector-icons';

import {
  KeyboardAvoidingView,
  KeyboardAwareScrollView
} from 'react-native-keyboard-controller';
import { router } from 'expo-router';

function PersonalData() {
  const {
    control,
    trigger,
    setFocus,
    getValues,
    setValue,
    resetField,
    setError
  } = useFormContext<LocationSchema>();

  async function handleGetDataByCep(cep: string) {
    try {
      const { estado, localidade } = await getDataByCep(cep);

      setValue('state', estado);
      setValue('city', localidade);

      setFocus('neighborhood');
    } catch {
      resetField('state');
      resetField('city');
      setError('cep', { message: 'Cep não existe' });
    }
  }

  async function handleSubmit() {
    const schemaFields = locationSchema.keyof().options;

    const output = await trigger(schemaFields, {
      shouldFocus: true
    });

    router.push('/(register)/personal-data');
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 p-8"
      behavior={'padding'}
      keyboardVerticalOffset={-300}
    >
      <View className="flex-row items-center gap-3 pb-8">
        <Feather name="map-pin" color={colors.white[100]} size={20} />
        <Text className="text-xl">Informe a sua localização</Text>
      </View>

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        className=" flex-1"
      >
        <View className="gap-10 flex-1">
          <ControlledInput
            formatter={formatCep}
            control={control}
            name="cep"
            keyboardType="numeric"
            label="CEP*"
            submitBehavior="submit"
            onSubmitEditing={() => handleGetDataByCep(getValues('cep'))}
            maxLength={9}
            className="h-16"
            returnKeyType="next"
            placeholder="00000-000"
          />

          <View className="flex-row gap-4">
            <View className="grow">
              <ControlledInput
                editable={false}
                label="Estado*"
                name="state"
                control={control}
                className="h-16 bg-black-300"
              />
            </View>

            <View className="grow">
              <ControlledInput
                label="Cidade*"
                editable={false}
                name="city"
                control={control}
                className="h-16 bg-black-300"
              />
            </View>
          </View>

          <ControlledInput
            label="Bairro*"
            className="h-16"
            onSubmitEditing={() => setFocus('adreass')}
            submitBehavior="submit"
            returnKeyType="next"
            name="neighborhood"
            control={control}
            placeholder="Exemplo: Centro"
          />

          <ControlledInput
            submitBehavior="submit"
            onSubmitEditing={() => setFocus('number')}
            returnKeyType="next"
            label="Endereço*"
            className="h-16"
            name="adreass"
            control={control}
            placeholder="Exemplo: Avenida Brasil"
          />

          <View className="flex-row gap-4">
            <ControlledInput
              label="Número*"
              keyboardType="numeric"
              name="number"
              className="h-16"
              control={control}
              placeholder="Exp: 21"
            />

            <ControlledInput
              label="Complemento"
              name="complement"
              className="h-16"
              control={control}
              placeholder="Exp: Sala 1"
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

export default PersonalData;
