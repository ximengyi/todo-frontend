import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { getToken } from '../utils/auth';

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: '登录',
      requiresAuth: false, // 登录页不需要认证
    },
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../layouts/BasicLayout.vue'),
    meta: {
      title: '首页',
      requiresAuth: true, // 需要认证
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫 - 权限控制
router.beforeEach((to, from, next) => {
  const token = getToken();
  const requiresAuth = to.meta.requiresAuth !== false; // 默认为true，需要认证

  // 如果需要认证但未登录，跳转到登录页
  if (requiresAuth && !token) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }, // 保存目标路径，登录后可以跳转回来
    });
    return;
  }

  // 如果已登录但访问登录页，跳转到首页
  if (to.path === '/login' && token) {
    next('/');
    return;
  }

  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - Todo App`;
  }

  next();
});

export default router;

