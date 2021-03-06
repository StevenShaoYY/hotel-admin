import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

// const Hello = _import('Hello');
const Dashboard = _import('dashboard/dashboard');
const HotelManage = _import('hotelManage/hotelManage');
const HotelDetail = _import('hotelDetail/hotelDetail');
const BoxManageMain = _import('boxManage/boxManageMain');
const MessageManage = _import('messageManage/messageManage');
const MessageDetail = _import('messageManage/messageDetail');
const AdminManage = _import('adminManage/adminManage');
const RoleManage = _import('roleManage/roleManage');
const UserManage = _import('userManage/userManage');
const AppManage = _import('appManage/appManage');
const FirmwareManage = _import('firmwareManage/firmwareManage');
const Login = _import('login/login');
const layout = _import('layout/layout');
const Err404 = _import('404/404');

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: Login
  },
  {
    path: '/',
    name: '信息统计',
    component: layout,
    icon: 'icon-dashboard',
    redirect: '/menu1/index',
    hidden: true,
    children: [{ path: 'hello', component: Dashboard }]
  },
  { path: '/404',
    component: Err404,
    hidden: true,
    name: 404
  }
];
export const asyncRouterMap = [
  {
    path: '/menu1',
    component: layout,
    meta: { role: ['STATISTICS:BASIC'] },
    icon: 'icon-dashboard',
    noDropdown: true,
    redirect: '/menu1/index',
    children: [{ path: 'index', component: Dashboard, name: '信息统计' }]
  },
  {
    path: '/menu2',
    name: '旅馆管理',
    component: layout,
    meta: { role: ['HOTEL:QUERY'] },
    noDropdown: true,
    icon: 'icon-hotelmanage',
    redirect: '/menu2/index',
    children: [{ path: 'index', component: HotelManage, name: '旅馆管理' },
      { path: 'hotel_detail', component: HotelDetail, hidden: true, name: '旅馆详情' }]
  },
  {
    path: '/menu3',
    component: layout,
    meta: { role: ['DEVICE:QUERY'] },
    noDropdown: true,
    icon: 'icon-boxmanage',
    redirect: '/menu3/index',
    children: [{ path: 'index', component: BoxManageMain, name: '设备管理' }]
  },
  {
    path: '/menu4',
    component: layout,
    meta: { role: ['USER:QUERY'] },
    icon: 'icon-usermanage',
    noDropdown: true,
    redirect: '/menu4/index',
    children: [{ path: 'index', component: UserManage, name: '用户管理' }]
  },
  {
    path: '/menu5',
    name: '消息管理',
    component: layout,
    meta: { role: ['MESSAGE:QUERY'] },
    icon: 'icon-messagemanage',
    noDropdown: true,
    redirect: '/menu5/index',
    children: [{ path: 'index', component: MessageManage, name: '消息管理' },
    { path: 'message_detail', component: MessageDetail, hidden: true, name: '消息详情' }]
  },
  {
    path: '/menu6',
    name: '系统管理',
    component: layout,
    meta: { role: ['ADMIN:QUERY'] },
    icon: 'icon-systemmanage',
    redirect: 'noredirect',
    children: [{ path: 'index', component: AdminManage, meta: { role: ['ADMIN:QUERY'] }, name: '管理员管理' },
      { path: 'roleManage', meta: { role: ['ADMIN:ROLE:QUERY'] }, component: RoleManage, name: '角色管理' },
      { path: 'appUpload', meta: { role: ['ADMIN:APP:QUERY'] }, component: AppManage, name: '应用上传' },
      { path: 'romUpload', meta: { role: ['ADMIN:FIRMWARE:QUERY'] }, component: FirmwareManage, name: 'ROM上传' }]
  },
  { path: '*', redirect: '/404', hidden: true }
];

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
