# Furia Hub

O Furia hub is a mobile application where users can send the preferences and personal data to Furia

## Project Structure

```text
furia-hub
  ├─ mobile
  |   ├─ Expo SDK 52
  |   ├─ React Native using React 18
  |   ├─ Navigation using Expo Router
  |   ├─ style using NativeWind
  |   └─ forms and validation using react-hook-form and zod
  └─ server
      ├─ Fastfy
      ├─ schema validation using zod
      ├─ documentation using swagger
      ├─ postgres database and redis for cache
      └─ drizzle orm
```

## Frontend (mobile)

The frontend was built using expo with react-native.

### How to run the mobile project

- You need to have node.js installed in the most recents versions this project was built using node 22
- after install node type it to know if its installed correctly

```sh
  node --v && npm --v
```

- now install all the dependencies using npm

```sh
  npm install
```

- [to run the app in your smatphone install the app's development build in it, click here to install](https://drive.google.com/file/d/1H1fpcg64RGy6hDLL4W5TqjgNVSW-1fuM/view?usp=drivesdk)

- in your terminal type it and scan the qr code that will show up to open the app in your smartphone

```sh
  npm start
```

## Backend

### How to run the server project

- You need to have node.js installed in the most recents versions this project was built using node 22
- after install node type it to know if its installed correctly

```sh
  node --v && npm --v
```

- now install all the dependencies using npm

```sh
  npm install
```

- the easiest why to set up the database is using docker

```sh
  docker-compose up -d
```

```sh
  # to check the containers
  docker ps
```

- now push the migrations to the database

## 💎 Libraries used

- [Expo](https://docs.expo.io/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Nativewind](https://www.nativewind.dev/v4/overview)
- [Axios](https://axios-http.com/docs/intro)
- [React Hook Form](https://react-hook-form.com/)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/)
- [React Native Svg](https://github.com/software-mansion/react-native-svg)
- [Expo Image](https://docs.expo.dev/versions/unversioned/sdk/image/)
- [React Native Keyboard Controller](https://github.com/kirillzyusko/react-native-keyboard-controller)
- [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)
- [React Native Screens](https://github.com/software-mansion/react-native-screens)
- [Tailwind Variants](https://www.tailwind-variants.org/)
- [Zod](https://zod.dev/)
