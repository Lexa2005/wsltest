import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/admin/auth",
    name: "admin_auth",
    component: () => import(`../views/AdminAuthView.vue`)
  },
  {
    path: '/admin',
    name: "admin",
    component: () => import('../views/AdminView.vue'),
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import('../views/Admin/DashboardView.vue')
      },
      {
        path: "configuration",
        name: "configuration",
        component: () => import('../views/Admin/ConfigurationView.vue')
      },
      {
        path: "city",
        name: "city",
        component: () => import('../views/Admin/CityView.vue')
      },
      {
        path: "interests",
        name: "interests",
        component: () => import('../views/Admin/InterestsView.vue')
      },
      {
        path: "interests/create",
        name: "interests_create",
        component: () => import('../views/Admin/InterestsCreateView.vue')
      },
      {
        path: "interests/edit/:id",
        name: "interests_edit",
        component: () => import('../views/Admin/InterestsEditView.vue')
      },
      {
        path: "city/:id",
        name: "city_by_id",
        component: () => import('../views/Admin/CityByIdView.vue')
      },
      {
        path: "city/edit/:id",
        name: "city_edit",
        component: () => import('../views/Admin/CityEditView.vue')
      },
      {
        path: "city/create",
        name: "create_city",
        component: () => import('../views/Admin/CityCreateView.vue')
      },
      {
        path: "roadmap",
        name: "roadmap",
        component: () => import('../views/Admin/RoadmapView.vue')
      },
      {
        path: "roadmap/edit/:id",
        name: "roadmap_edit",
        component: () => import('../views/Admin/RoadmapEditView.vue')
      },
      {
        path: "roadmap/create",
        name: "roadmap_create",
        component: () => import('../views/Admin/RoadmapCreateView.vue')
      },
      {
        path: "place/create",
        name: "place_create",
        component: () => import('../views/Admin/PlaceCreateView.vue')
      },
      {
        path: "place/:id",
        name: "place_view",
        component: () => import('../views/Admin/RoadmapCreateView.vue')
      },
      {
        path: "place/edit/:id",
        name: "place_edit",
        component: () => import('../views/Admin/PlaceEditView.vue')
      },
      {
        path: "error",
        name: "error",
        component: () => import('../views/Admin/ErrorView.vue')
      }
    ]
  },
  {
    path: "/",
    name: "index",
    component: () => import('../views/UserView.vue'),
    children: [
      {
        path: "",
        name: "default",
        component: () => import('../views/User/LandingView.vue')
      }
    ]
  }
]

const router = createRouter({
  //process.env.BASE_URL
  history: createWebHistory(),
  routes
})

export default router
