/**
 * Created by stevenshao on 17/9/11.
 */
import fetch from 'common/js/fetch';

export function searchAdminList(queryKey, size, offset) {
  return fetch({
    url: `/ops/admin?queryKey=${queryKey}&size=${size}&currentPage=${offset}`,
    method: 'get'
  });
}

export function addAdmin({ username, name, roles, password, remark }) {
  const fd = new FormData()
  fd.append('username', username)
  fd.append('name', name)
  fd.append('roles', roles)
  fd.append('password', password)
  fd.append('remark', remark)
  return fetch({
    url: '/ops/admin',
    method: 'put',
    data: fd
  });
}

export function updateAdmin({ id, name, roles, remark }) {
  const fd = new FormData()
  fd.append('id', id)
  fd.append('name', name)
  fd.append('roles', roles)
  fd.append('remark', remark)
  return fetch({
    url: `/ops/admin/${id}`,
    method: 'patch',
    data: fd
  });
}

export function resetPassword(id) {
  return fetch({
    url: `/ops/admin/${id}/resetPassword`,
    method: 'patch'
  });
}

export function resetAdminPassword(oldPassword, newPassword) {
  const fd = new FormData()
  fd.append('oldPassword', oldPassword)
  fd.append('newPassword', newPassword)
  return fetch({
    url: '/ops/admin/modifyPassword',
    method: 'patch',
    data: fd
  });
}

export function startAccount(id) {
  return fetch({
    url: `/ops/admin/${id}/enable`,
    method: 'patch'
  });
}

export function stopAccount(id) {
  return fetch({
    url: `/ops/admin/${id}/disable`,
    method: 'patch'
  });
}

export function deleteAccount(id) {
  return fetch({
    url: `/ops/admin/${id}`,
    method: 'delete'
  });
}
