/**
 * Created by shaojunyan on 2017-7-26.
 */
import Cookies from 'js-cookie';
import * as types from '../mutation-types';
import { login, logout } from '@/api/login';
// getInfo
const user = {
  state: {
    token: Cookies.get('Admin-Token'),
    name: '',
    avatar: '',
    roles: []
  },
  mutations: {
    [types.SET_TOKEN](state, token) {
      state.token = token
    },
    [types.SET_NAME](state, name) {
      state.name = name
    },
    [types.SET_AVATAR](state, avatar) {
      state.avatar = avatar
    },
    [types.SET_ROLES](state, roles) {
      state.roles = roles
    }
  },
  actions: {
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        Cookies.remove('Admin-Token');
        resolve();
      });
    },
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('SET_TOKEN', '');
    //       commit('SET_ROLES', []);
    //       Cookies.remove('Admin-Token');
    //       resolve();
    //     }).catch(error => {
    //       reject(error);
    //     });
    //   });
    // },
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          Cookies.remove('Admin-Token');
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    Login({ commit }, userInfo) {
      const email = userInfo.email.trim();
      return new Promise((resolve, reject) => {
        login(email, userInfo.password).then(response => {
          const data = response.data
          Cookies.set('Admin-Token', data.token);
          commit('SET_TOKEN', data.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    GetInfo({ commit }) {
      return new Promise(resolve => {
        // getInfo(state.token).then(response => {
          //   const data = response.data.result;
          //   commit('SET_ROLES', data.role);
          //   commit('SET_NAME', data.name);
          //   commit('SET_AVATAR', data.avatar);
          //   resolve(response);
          // }).catch(error => {
          //   reject(error);
          // });
        const data = {
          role: ['a'],
          name: 'sjy',
          avatar: 'default'
        }
        const response = {};
        response.data = {};
        response.data.result = data;
        commit('SET_ROLES', data.role);
        commit('SET_NAME', data.name);
        commit('SET_AVATAR', data.avatar);
        resolve(response);
      });
    }
  },
  getters: {
    token: state => state.token,
    avatar: state => state.avatar,
    name: state => state.name,
    roles: state => state.roles
  }
}
export default user;
