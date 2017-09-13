/**
 * Created by stevenshao on 17/9/11.
 */
import fetch from 'common/js/fetch';

export function searchAdminList(queryKey, size, offset) {
  return fetch({
    url: `/ops/admin?queryKey=${queryKey}&size=${size}&offset=${offset}`,
    method: 'get'
  });
}

export function addAdmin({ username, name, role, password, remark }) {
  return fetch({
    url: `/ops/admin?username=${username}&name=${name}&role=${role}&password=${password}&remark=${remark}`,
    method: 'put'
  });
}

export function updateAdmin({ id, name, role, remark }) {
  return fetch({
    url: `/ops/admin/${id}?name=${name}&role=${role}&remark=${remark}`,
    method: 'patch'
  });
}

export function resetPassword(id) {
  return fetch({
    url: `/ops/admin/${id}/resetPassword`,
    method: 'patch'
  });
}

export function resetAdminPassword(oldPassword, newPassword) {
  return fetch({
    url: `/ops/admin/modifyPassword?oldPassword=${oldPassword}&newPassword=${newPassword}`,
    method: 'patch'
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
