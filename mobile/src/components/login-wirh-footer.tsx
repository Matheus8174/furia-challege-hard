import { View } from 'react-native';

import Text from '@/components/ui/text';
import Button from '@/components/ui/button';

function LoginWithFooter({ children }: React.PropsWithChildren) {
  return (
    <View>
      <View className="border-b border-gray-100 pb-8 items-center justify-center">
        {children}
      </View>

      <View className="gap-4 mt-8 mx-8">
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

export default LoginWithFooter;
