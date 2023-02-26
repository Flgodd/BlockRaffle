import Index from "layouts/Index.vue";
import Home from "pages/Home.vue";
import TwitterView from "pages/signin.vue";

const routes = [
  {
    path: '/',
    component: Index,
    children: [
      { path: '', component: Home },
      { path: '/home' , name: 'home', component: Home},
      { path: '/twitter', component: () => import('pages/Twitter.vue')},
      { path:  '/signin', component: () => import('pages/signin.vue')},
      { path: '/StableDiffusionUI', component: () => import('pages/StableDiffusionUI.vue')},
      { path: '/TimelineView', component: () => import('pages/TimelineView.vue')},
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
