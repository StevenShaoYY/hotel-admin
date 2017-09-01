/**
 * Created by shaojunyan on 2017-7-26.
 */
import fetch from 'common/js/fetch';

export function login(username, password) {
  return fetch({
    url: '/ops/admin/login',
    method: 'post',
    data: {
      username,
      password
    }
  });
}
export function getInfo(token) {
  return fetch({
    url: 'ops/user/info',
    method: 'get',
    params: { token }
  });
}
export function logout(token) {
  return fetch({
    url: 'ops/admin/logout',
    method: 'post',
    data: {
      token
    }
  });
}

