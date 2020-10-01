import Vue from 'vue';
import Router from 'vue-router';

import AdminLayout from '@/components/AdminLayout/AdminLayout';
import ClientLayout from "@/components/ClientLayout/ClientLayout";

// Pages
import Dashboard from '@/pages/Dashboard/Dashboard';
import Tables from '@/pages/Tables/Basic'
import Notifications from '@/pages/Notifications/Notifications'
import Charts from '@/pages/Charts/Charts'
import Error from "@/pages/Error/Error";
import Login from "@/pages/Login/Login";
import ClientCalendar from "@/pages/Calendars/ClientCalendar"
import AdminCalendar from "@/pages/Calendars/AdminCalendar";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
    path: '/client',
    redirect: '/login',
    name: 'ClientLayout',
    component: ClientLayout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'calendar',
        name: 'Calendar',
        component: ClientCalendar
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
    ],
  },{
      path: '/admin',
      redirect: '/login',
      name: 'AdminLayout',
      component: AdminLayout,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: 'notifications',
          name: 'Notifications',
          component: Notifications
        },
        {
          path: 'tables',
          name: 'Tables',
          component: Tables
        },
        {
          path: 'calendar',
          name: 'Calendar',
          component: AdminCalendar
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        },
      ],
    },
    {
      path: '*',
      name: 'Error',
      component: Error
    }
  ],
});
