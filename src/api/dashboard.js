/**
 * Created by stevenshao on 17/9/1.
 */
import fetch from 'common/js/fetch';

export function getDashboardData() {
  return fetch({
    url: '/ops/statistics',
    method: 'get'
  });
}
