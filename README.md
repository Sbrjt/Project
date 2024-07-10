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


To run locally: `npm run dev`

To enable firestore local emulator, uncomment following line in `src/fb.js`

    if (window.location.hostname === '127.0.0.1') {
    	// connectFirestoreEmulator(firestore, '127.0.0.1', 8080)
    	connectFunctionsEmulator(functions, '127.0.0.1', 5001)
    }


