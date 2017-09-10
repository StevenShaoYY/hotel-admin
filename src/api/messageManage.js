/**
 * Created by stevenshao on 17/9/10.
 */
import fetch from 'common/js/fetch';

export function searchMessageList(queryKey, messageType, earliestTime, latestTime, size, offset) {
  return fetch({
    url: `/ops/messages?queryKey=${queryKey}&messageType=${messageType}&earliestTime=${earliestTime}&latestTime=${latestTime}&size=${size}&offset=${offset}`,
    method: 'get'
  });
}

export function getMessageDetail(id) {
  return fetch({
    url: `/ops/messages/${id}`,
    method: 'get'
  });
}
