/**
 * Created by stevenshao on 17/9/13.
 */
import fetch from 'common/js/fetch';

export function searchRoleList(queryKey, size, offset) {
  return fetch({
    url: `/ops/admin/roles?queryKey=${queryKey}&size=${size}&currentPage=${offset}`,
    method: 'get'
  });
}

export function getModuleList() {
  return fetch({
    url: '/ops/admin/modules',
    method: 'get'
  });
}

// export function searchRoleList(queryKey, size, offset) {
//   return fetch({
//     url: `/ops/admin/roles?queryKey=${queryKey}&size=${size}&offset=${offset}`,
//     method: 'get'
//   });
// }

export function addRole(name, moduleIds, remark) {
  const fd = new FormData()
  fd.append('name', name)
  fd.append('moduleIds', moduleIds)
  fd.append('remark', remark)
  return fetch({
    url: '/ops/admin/roles',
    method: 'post',
    data: fd
  });
}

export function deleteRole(id) {
  return fetch({
    url: `/ops/admin/roles/${id}`,
    method: 'delete'
  });
}

export function updateRole(id, name, moduleIds, remark) {
  const fd = new FormData()
  fd.append('name', name)
  fd.append('moduleIds', moduleIds)
  fd.append('remark', remark)
  return fetch({
    url: `/ops/admin/roles/${id}`,
    method: 'patch',
    data: fd
  });
}
