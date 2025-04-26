import Button from '@/components/ui/button';
import colors from '@/components/ui/colors';
import { ControlledInput, Input } from '@/components/ui/input';
import Text from '@/components/ui/text';
import {
  PersonalDataSchema,
  personalDataSchema
} from '@/schemas/createUserSchema';
import {
  formatBrazilPhoneNumber,
  formatCpf,
  formatDate
} from '@/utils/formatters';
import { Feather } from '@expo/vector-icons';
import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import {
  KeyboardAvoidingView,
  KeyboardAwareScrollView
} from 'react-native-keyboard-controller';

function PersonalData() {
  const {
    control,
    trigger,
    setFocus,
    getValues,
    setValue,
    resetField,
    setError
  } = useFormContext<PersonalDataSchema>();

  async function handleSubmit() {
    const schemaFields = personalDataSchema.keyof().options;

    const output = await trigger(schemaFields, {
      shouldFocus: true
    });

    console.log(getValues());
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 p-8"
      behavior={'padding'}
      keyboardVerticalOffset={-300}
    >
      <View>
        <View className="flex-row items-center gap-3 pb-8">
          <Feather name="user" color={colors.white[100]} size={20} />
          <Text className="text-xl">Nos diga mais sobre você!</Text>
        </View>
      </View>

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        className=" flex-1"
      >
        <View className="gap-10 flex-1">
          <ControlledInput
            name="cpf"
            control={control}
            placeholder="000.000.000-00"
            label="CPF*"
            className="h-16"
            maxLength={14}
            formatter={formatCpf}
            keyboardType="numeric"
          />

          <ControlledInput
            control={control}
            name="name"
            className="h-16"
            label="Nome completo*"
            placeholder="Exemplo: José da Silva"
          />

          <ControlledInput
            control={control}
            name="birthdate"
            maxLength={10}
            className="h-16"
            formatter={formatDate}
            keyboardType="numeric"
            placeholder="dd/mm/aaaa"
            label="Data de nascimento*"
          />

          <ControlledInput
            formatter={formatBrazilPhoneNumber}
            control={control}
            name="phoneNumber"
            keyboardType="numeric"
            label="Número de telefone*"
            submitBehavior="submit"
            maxLength={16}
            className="h-16"
            returnKeyType="next"
            placeholder="(99) 91234-5678"
          />

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
