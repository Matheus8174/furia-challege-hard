import React from 'react';

import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { router } from 'expo-router';

import { useFormContext } from 'react-hook-form';

import { Feather, Ionicons } from '@expo/vector-icons';

import Text from '@/components/ui/text';
import colors from '@/components/ui/colors';
import { formatCpf } from '@/utils/formatters';
import { ControlledInput } from '@/components/ui/input';
import {
  PersonalDataSchema,
  ValidateDataSchema
} from '@/schemas/createUserSchema';
import Button, { ButtonRef } from '@/components/ui/button';
import { client } from '@/api/client';
import type { FullSchema } from '../_layout';
import { z } from 'zod';

function ImageUpload(props: React.PropsWithChildren<TouchableOpacityProps>) {
  const { children, ...rest } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="p-8 gap-4 items-center justify-center rounded-xl bg-black-200 border-4 border-dotted border-black-100"
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}

type FormShape = ValidateDataSchema | PersonalDataSchema;

function DocumentsValidation() {
  const { watch, control, trigger, handleSubmit } =
    useFormContext<FullSchema>();

  const buttonRef = React.useRef<ButtonRef>(null);

  const [facePhoto, rgPhoto, name, cpf] = watch([
    'facePhoto',
    'rgPhoto',
    'name',
    'cpf'
  ]);

  async function handleFormSubmit(data: FullSchema) {
    function transform(obj: FullSchema) {
      const cleaned = { ...obj };

      const filterableKeys = ['events', 'games', 'orgs', 'platforms'];

      filterableKeys.forEach((key) => {
        if (Array.isArray(cleaned[key])) {
          cleaned[key] = cleaned[key].filter((item) => item.selected === true);
        }
      });

      return cleaned;
    }

    console.log(transform(data));
  }

  const validate = React.useCallback(async () => {
    const error = await trigger(['name', 'cpf']);

    buttonRef.current?.disable(!error);
  }, [trigger]);

  React.useEffect(() => {
    validate();
  }, [name, cpf, validate]);

  return (
    <View className="flex-1 m-8 gap-10 items-start justify-start">
      <ControlledInput
        control={control}
        name="name"
        className="w-full h-16"
        label="Nome completo*"
      />

      <ControlledInput
        name="cpf"
        control={control}
        placeholder="000.000.000-00"
        label="CPF*"
        className="h-16 w-full"
        maxLength={14}
        formatter={formatCpf}
        keyboardType="numeric"
      />

      <View className="gap-2">
        <Text className="text-white-200 font-regular">Foto do seu rosto</Text>

        <View>
          {facePhoto && (
            <Feather
              name="check"
              size={30}
              className="absolute self-end z-20 pr-2 pt-2"
              color={colors.green['800']}
            />
          )}
          <ImageUpload
            disabled={!!facePhoto}
            onPress={() =>
              router.push('/(register)/documents-validation/confirm-photo-face')
            }
          >
            <Feather name="camera" size={30} color={colors.white[300]} />
            <Text>Tirar foto do rosto</Text>
          </ImageUpload>
        </View>
      </View>

      <View className="gap-2">
        <Text className="text-white-200 font-regular">Foto do seu RG</Text>

        <View>
          {rgPhoto.length >= 2 && (
            <Feather
              name="check"
              size={30}
              className="absolute self-end z-20 pr-2 pt-2"
              color={colors.green['800']}
            />
          )}

          <ImageUpload
            disabled={rgPhoto.length >= 2}
            onPress={() =>
              router.push('/(register)/documents-validation/confirm-photo-rg')
            }
          >
            <Ionicons
              name="document-outline"
              size={30}
              color={colors.white[300]}
            />
            <Text>Tirar foto do seu RG</Text>
          </ImageUpload>
        </View>
      </View>

      <Button
        className="bg-white-300 py-6 w-full mt-10"
        ref={buttonRef}
        onPress={handleSubmit(handleFormSubmit, (err) => console.log(err))}
      >
        <Text className="text-black-400">Validar imagens</Text>
      </Button>
    </View>
  );
}

export default DocumentsValidation;
