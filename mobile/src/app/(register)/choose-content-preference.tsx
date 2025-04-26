import { ScrollView, TouchableOpacity, View } from 'react-native';

import Text from '@/components/ui/text';

const categoriesByGame = [
  {
    nome: 'Counter-Strike',
    categorias: [
      'Rifler',
      'AWP',
      'Entry Fragger',
      'Suporte',
      'pixel de granadas',
      'Análises de rounds',
      'Clutch plays'
    ]
  },
  {
    nome: 'League of Legends',
    categorias: [
      'Top',
      'Jungle',
      'Mid',
      'ADC',
      'Suporte',
      'Estratégias de teamfight',
      'Rotas e builds por função'
    ]
  },
  {
    nome: 'Valorant',
    categorias: [
      'Duelistas',
      'Sentinelas',
      'Controladores',
      'Iniciadores',
      'Táticas por mapa',
      'Clutches / 1vX',
      'Setups de agente'
    ]
  }
];

const categories = [
  'Entrevistas e Bastidores',
  'Gameplay e Highlights',
  'Compilações de Clutchs / Jogadas Incríveis',
  'Builds e Estratégias',
  'Memes e Conteúdos Engraçados',
  'Análises de Partidas',
  'Calendário e Resultados',
  'Streams e Transmissões ao vivo',
  'Conteúdo da Torcida (fan arts, vídeos, etc.)'
];

function Item({ children }: React.PropsWithChildren) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="px-6 py-2 items-center justify-center bg-black-200/90 rounded-xl"
    >
      <Text className="text-white-300">{children}</Text>
    </TouchableOpacity>
  );
}

function ChooseContentPreference() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="mx-6">
      <Text className="my-6 text-lg font-semibold">Conteúdos genericos</Text>

      <View className="gap-3 flex-row flex-wrap">
        {categories.map((categorie) => (
          <Item key={categorie}>{categorie}</Item>
        ))}
      </View>

      {categoriesByGame.map((categorie) => (
        <View key={categorie.nome}>
          <Text className="my-6 text-lg font-semibold">{categorie.nome}</Text>

          <View className="gap-3 flex-row flex-wrap">
            {categorie.categorias.map((categorie) => (
              <Item key={categorie}>{categorie}</Item>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export default ChooseContentPreference;
