/**
 * Created by shaojunyan on 2017-7-26.
 */
import fetch from 'common/js/fetch';

export function login(username, password) {
  const fd = new FormData()
  fd.append('username', username)
  fd.append('password', password)
  return fetch({
    url: '/ops/admin/login',
    method: 'post',
    data: fd
  });
}
export function getInfo(token) {
  return fetch({
    url: 'ops/user/info',
    method: 'get',
    params: { token }
  });
}
export function logout() {
  return fetch({
    url: 'ops/admin/logout',
    method: 'get'
  });
}

