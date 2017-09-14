/**
 * Created by stevenshao on 17/9/13.
 */
import fetch from 'common/js/fetch';

export function searchRoleList(queryKey, size, offset) {
  return fetch({
    url: `/ops/admin/roles?queryKey=${queryKey}&size=${size}&offset=${offset}`,
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

export function addRole(name, module, remark) {
  return fetch({
    url: '/ops/admin/roles',
    method: 'post',
    data: {
      name,
      module,
      remark
    }
  });
}

export function deleteRole(id) {
  return fetch({
    url: `/ops/admin/roles/${id}`,
    method: 'delete'
  });
}

export function updateRole(id, name, module, remark) {
  return fetch({
    url: `/ops/admin/roles/${id}`,
    method: 'patch',
    data: {
      name,
      module,
      remark
    }
  });
}
