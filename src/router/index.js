import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import EventLayout from "../views/event/Layout.vue";
import EventDetails from "../views/event/Details.vue";
import EventRegister from "../views/event/Register.vue";
import EventEdit from "../views/event/Edit.vue";
import NotFound from "../views/NotFound.vue";
import NetworkError from "../views/NetworkError.vue";
import NProgress from "nprogress";
import EventService from "@/services/EventService";
import GStore from "@/store";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: "/about-us",
    name: "About",
    alias: "/about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  // {
  //   path: "/about",
  //   redirect: { name: "About" },
  // },
  {
    path: "/events/:id",
    name: "EventLayout",
    beforeEnter: (to) => {
      return EventService.getEvent(to.params.id)
        .then((res) => {
          GStore.event = res.data;
        })
        .catch((err) => {
          if (err.response && err.response.status == 404) {
            return {
              name: "NotFoundResource",
              params: { resource: "event" },
            };
          }
          return { name: "NetworkError" };
        });
    },
    props: true,
    component: EventLayout,
    children: [
      {
        path: "",
        name: "EventDetails",
        component: EventDetails,
      },
      {
        path: "register",
        name: "EventRegister",
        component: EventRegister,
      },
      {
        path: "edit",
        name: "EventEdit",
        meta: { requireAuthorization: true },
        component: EventEdit,
      },
    ],
  },
  {
    path: "/event/:afterEvent(.*)",
    redirect: (to) => {
      // return { name: "EventDetails", params: { id: to.params.id } };
      return { path: "/events/" + to.params.afterEvent };
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/404/:resource",
    name: "NotFoundResource",
    component: NotFound,
    props: true,
  },
  {
    path: "/network-error",
    name: "NetworkError",
    component: NetworkError,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
  routes,
});
router.beforeEach((to, from) => {
  NProgress.start();
  const notAuthorized = true;
  if (to.meta.requireAuthorization && notAuthorized) {
    GStore.flashMessage = "You are not authorized to view this page.";
    setTimeout(() => {
      GStore.flashMessage = "";
    }, 3000);
    if (from.href) {
      return false;
    }
    return "/";
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
