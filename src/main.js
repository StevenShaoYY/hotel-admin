// require('es5-shim');
// require('es5-shim/es5-sham');
import 'es5-shim';
import 'es5-shim/es5-sham';
import 'babel-polyfill';
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import NProgress from 'nprogress'
import store from './store'

import 'element-ui/lib/theme-default/index.css'
import 'nprogress/nprogress.css'
import 'normalize.css/normalize.css'
import 'common/stylus/index.styl'

console.log(store.getters.token)
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) {
      // && store.getters.rolesBeforeUse.length > 0
        // store.commit('SET_ROLES')
        // store.dispatch('GenerateRoutes', store.getters.roles).then(() => {
        //   router.addRoutes(store.getters.addRouters);
        //   next({ ...to });
        // })
        store.dispatch('GetInfo').then(res => {
          // const roles = res.data.result.role;
          console.log(res)
          if (res === undefined || res === -1 || res === 'undefined'
          ) {
            store.dispatch('FedLogOut')
            next({ path: '/login' });
          } else {
            const roles = res
            store.dispatch('GenerateRoutes', { roles }).then(() => {
              router.addRoutes(store.getters.addRouters);
              next({ ...to });
            })
          }
        })
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login');
      NProgress.done();
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

Vue.config.productionTip = false

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
