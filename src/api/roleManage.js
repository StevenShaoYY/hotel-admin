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
