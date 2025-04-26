import React from 'react';

import { ImageBackground, TouchableOpacity, View } from 'react-native';

import Text from '@/components/ui/text';
import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Email, Lock } from '@/components/ui/icons';

import FuriaLogo from '@/assets/furia-logo.png';
import LoginWithFooter from '@/components/login-wirh-footer';
import { Link, router } from 'expo-router';

import { Feather } from '@expo/vector-icons';
import colors from '@/components/ui/colors';

function Login() {
  return (
    <View className="flex-1">
      <View className="absolute top-7 right-7">
        <View className="size-60 bg-black-600/90 absolute z-10" />

        <ImageBackground source={FuriaLogo} className="size-60" />
      </View>

      <View className="absolute size-full justify-center z-50">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="bg-black-200 rounded-3xl p-4 items-center justify-center self-start ml-8"
        >
          <Feather name="chevron-left" size={30} color={colors.gray[300]} />
        </TouchableOpacity>

        <Text className="text-3xl font-semibold my-12 text-white-200 mx-8">
          Faça login com sua conta
        </Text>

        <View className="gap-6">
          <View className="gap-8 mx-8">
            <Input
              placeholder="Email"
              keyboardType="email-address"
              Icon={Email}
              className="bg-black-200/90"
            />

            <View className="gap-4">
              <Input
                placeholder="Senha"
                Icon={Lock}
                secureTextEntry
                className="bg-black-200/90"
              />

              <Text className="underline self-end text-gray-300">
                Esqueceu a sua senha?
              </Text>
            </View>

            <Button className="bg-black-200/90 my-6 py-6">
              <Text>Entrar</Text>
            </Button>
          </View>

          <LoginWithFooter>
            <Link href="/(register)">
              <View className="flex-row gap-2">
                <Text className="text-gray-300">Ainda não tem uma conta?</Text>
                <Text className="underline">Sign In</Text>
              </View>
            </Link>
          </LoginWithFooter>
        </View>
      </View>
    </View>
  );
}

export default Login;
