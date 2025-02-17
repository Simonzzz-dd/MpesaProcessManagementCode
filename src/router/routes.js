const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/create-group/', component: () => import('pages/CreateGroup/CreateGroup.vue') },
      { path: '/home/', component: () => import('pages/IndexPage.vue') },
      { path: 'dir/:dir', component: () => import('pages/Directories/directoryPage.vue') },
      { path: 'files/:file', component: () => import('pages/Files/readfilePage.vue') },
      { path: '/users-logs', component: () => import('pages/AuditLog/AuditLogs.vue') },
      { path: '/roles', component: () => import('pages/Roles/RolesPage.vue') },
      { path: '/claw-back', component: () => import('pages/ClawBack/MainPage.vue') },
      { path: '/doc-main', component: () => import('pages/DocSign/MainPage.vue') },
      { path: '/', component: () => import('pages/HomePage.vue') },
      { path: '/create-sign-request', component: () => import('pages/DocSign/SignDoc.vue') },
      {path: "/sign-document", component: () => import('pages/DocSign/SignDoc.vue') },
      { path: "/view/:id", component: () => import('src/pages/DocSign/ViewDocument.vue')},
      {path: "/sign-document", component: () => import('pages/DocSign/SignDoc.vue'),},
      {path: "/face-recognition", component: () => import('pages/FaceRecognition/MainPage.vue'),},
    ]
  },
  {
    path: '/content-managment',
    component: () => import('layouts/ContentManagment.vue')
  },
  {
    path: '/edit-file/:id',
    component: () => import('layouts/EditFile.vue')
  },
  {
    path: '/content-managment/:dir',
    component: () => import('layouts/ContentManagment.vue')
  },
  {
    path: '/create-new-version/:id',
    component: () => import('layouts/CreateNewVersion.vue')
  },
  {
    path: '/login',
    component: () => import('layouts/LoginPage.vue')
  },
  { path: "/edit_document/:id", component: () => import('src/pages/DocSign/EditDocument.vue'),
    children: [
      {path: "", component: () => import('components/signDoc/editDoc/RightSidebar.vue')},
      {path: "signature/:id_", component: () => import('components/signDoc/editDoc/SignatureSidebar.vue'), },
    ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
