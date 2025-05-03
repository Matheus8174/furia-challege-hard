import React from 'react';

import { Link, router } from 'expo-router';
import { useFormContext } from 'react-hook-form';
import { ImageBackground, View } from 'react-native';

import Text from '@/components/ui/text';
import Button from '@/components/ui/button';
import LoginWithFooter from '@/components/login-wirh-footer';
import { ControlledInput } from '@/components/ui/input';
import { Email, Lock, User } from '@/components/ui/icons';

import FuriaLogo from '@/assets/furia-logo.png';
import { CreateUserSchema, createUserSchema } from '@/schemas/createUserSchema';
import { Feather } from '@expo/vector-icons';
import colors from '@/components/ui/colors';

function Register() {
  const { control, trigger, setFocus } = useFormContext<CreateUserSchema>();

  async function handleSubmit() {
    const schemaFields = createUserSchema.keyof().options;

    const output = await trigger(schemaFields, {
      shouldFocus: true
    });

    if (output) router.push('/(register)/location-data');
  }

  return (
    <View className="flex-1">
      <View className="absolute top-7 right-7">
        <View className="size-60 bg-black-600/90 absolute z-10" />

        <ImageBackground source={FuriaLogo} className="size-60" />
      </View>

      <View className="absolute size-full justify-center z-50">
        <Text className="text-3xl font-semibold mb-8 text-white-300 mx-8">
          Crie sua conta
        </Text>

        <View className="gap-6">
          <View className="gap-8 mx-8">
            <ControlledInput
              control={control}
              onSubmitEditing={() => setFocus('email')}
              submitBehavior="submit"
              name="nick"
              placeholder="Nick name"
              Icon={User}
              className="bg-black-200/80"
            />

            <ControlledInput
              control={control}
              submitBehavior="submit"
              onSubmitEditing={() => setFocus('password')}
              name="email"
              placeholder="Email"
              Icon={Email}
              keyboardType="email-address"
              className="bg-black-200/90"
            />

            <ControlledInput
              control={control}
              name="password"
              placeholder="Senha"
              Icon={Lock}
              password
              className="bg-black-200/90"
            />

            <Button
              className="bg-black-200/90 my-6 py-6 flex-row gap-2"
              onPress={handleSubmit}
            >
              <Text>Criar conta</Text>
              <Feather name="arrow-right" color={colors.white[100]} size={20} />
            </Button>
          </View>

          <LoginWithFooter>
            <Link href="/login">
              <View className="flex-row gap-2">
                <Text className="text-gray-300">Já tem uma conta?</Text>
                <Text className="underline">Login</Text>
              </View>
            </Link>
          </LoginWithFooter>
        </View>
      </View>
    </View>
  );
}

export default Register;
