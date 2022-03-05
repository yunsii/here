export default [
  {
    path: '/',
    component: './layouts/RootLayout',
    routes: [
      {
        path: '/',
        component: './pages/Home',
      },
      {
        component: './pages/404',
      },
    ],
  },
  {
    component: './pages/404',
  },
];
