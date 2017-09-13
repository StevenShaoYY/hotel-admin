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
