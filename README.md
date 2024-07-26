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

[Use location]([url](https://youtu.be/MNlbYwlLPWY): 22.964006, 88.524224

---

https://visgl.github.io/react-map-gl/docs/api-reference/map

https://console.firebase.google.com/u/0/project/proj3-8bf4f/overview


