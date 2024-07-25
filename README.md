Dir structure:

    /
    ├── functions/ 
    │   └── index.js        (contains firebase cloud functions)
    |
    ├── src/                (react's src dir)
    │   ├── fb.js           (initializes firebase)
    │   ├── App.js
    │   ├── Other components
    │   └── ...
    |
    ├── public/             (react's public dir)
    |
    ├── build/              (firebase hosting dir; contains minified production build)
    |
    ...


To run react server: `npm start`

To firebase emulator: `npm run dev`

To enable firestore local emulator, uncomment `connectFirestoreEmulator` in `src/fb.js`.


