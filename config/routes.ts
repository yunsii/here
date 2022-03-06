export default [
  {
    path: '/',
    component: './layouts/RootLayout',
    routes: [
      {
        path: '/',
        component: './view',
      },
    ],
  },
  {
    component: './404',
  },
];
