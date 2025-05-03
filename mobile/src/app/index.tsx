import { Image, View } from 'react-native';

import { router } from 'expo-router';

import Text from '@/components/ui/text';
import Button from '@/components/ui/button';

import Logo from '@/assets/furia-logo.png';

function Welcome() {
  return (
    <View className="flex-1 items-center p-8 justify-center">
      <View>
        <View className="size-32 bg-black-600/10 absolute z-30" />

        <Image source={Logo} className="size-32" />
      </View>

      <Text className="text-white-200 text-4xl text-center leading-relaxed mt-14">
        Seja bem vindo ao Furia Hub
      </Text>

      <View className="gap-8 w-full my-28">
        <Button
          className="bg-black-200/50 rounded-full w-full"
          onPress={() => router.push('/login')}
        >
          <Text>Log in</Text>
        </Button>

        <Button
          className="rounded-full w-full"
          onPress={() => router.push('/(register)')}
        >
          <Text className="text-gray-200">Criar conta</Text>
        </Button>
      </View>

      <View className="gap-4">
        <Text className="text-gray-300 self-center">cotinue com</Text>

        <View className="flex-row gap-4 w-full h-20">
          <Button className="bg-red-400/25 flex-1">
            <Text className="text-red-400 font-semibold text-sm">GOOGLE</Text>
          </Button>

          <Button className="bg-blue-200/25 flex-1">
            <Text className="text-blue-200 font-semibold text-sm">
              FACEBOOK
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

export default Welcome;
