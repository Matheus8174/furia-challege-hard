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

## 🧠 I.A

This project use some machine learning models for **face recognization** and **ocr**

### Front-end

we use Media Pipe Face Detector model with Tensor Flow Lite to run **face recognization** in every frame of the users camera.

### Back-end

We use [teceract.js](https://github.com/naptha/tesseract.js) and [face-api.js](https://github.com/justadudewhohacks/face-api.js) to make **face recognization** and **ocr**

## ⭐ Frontend (mobile)

The frontend was built using expo with react-native.

### How to run the mobile project

To get started with this project, ensure you have the following technologies installed on your computer:

- **Node.js**: This project was developed using Node.js version **20.16**.
- **NPM**: This project was developed using Node.js version **10.9.2**.

- now install all the dependencies using npm

  ```sh
    npm install
  ```

- [to run the app in your smatphone install the app's development build in it, click here to install](https://drive.google.com/file/d/1H1fpcg64RGy6hDLL4W5TqjgNVSW-1fuM/view?usp=drivesdk)

- 🎉 in your terminal run the app and scan the qr code that will show up to open the app in your smartphone

  ```sh
    npm start
  ```

## ⭐ Backend

### How to run the server project

To get started with this project, ensure you have the following technologies installed on your computer:

- **Node.js**: This project was developed using Node.js version **20.16**.
- **NPM**: This project was developed using Node.js version **10.9.2**.

- install all the dependencies using npm

  ```sh
    npm install
  ```

- create and fill a **.env** file, follow the .env.example as guide, or for tests just copy this example

  ```js
    DATABASE_URL="postgres://myuser:mypassword@127.0.0.1:5432/mydatabase"

    REDIS_URL="redis://127.0.0.1:6379/"

    PORT="8080"
    HOST="127.0.0.1"

    JWT_SECRET="7d05015fe82c807af272059a596644771b8d5af7076a89c1bf26b2cd4dd06f9a"
    EXPIRES_IN="2d"
  ```

- the easiest why to set up the database is by using docker

  ```sh
    docker-compose up -d
  ```

  ```sh
    # to check the containers
    docker ps
  ```

- now push the migrations to the database using drizzle cli

  ```sh
    npm run migration:migrate
    # or
    npx run drizzle-kit migrate
  ```

- 🎉 run the server

  ```sh
    npm run dev
  ```

### Database dashboard

the app contains a database dashboard you can see it by running this script

  ```sh
    npm run studio
  ```

#### Swagger documentation

You can see the Swagger docs by accessing `/docs` in your browser after running the server.

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
