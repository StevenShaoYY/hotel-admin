/**
 * Created by stevenshao on 17/9/3.
 */
import fetch from 'common/js/fetch';

export function getBoxList(hotelCode, size, offset) {
  return fetch({
    url: `/ops/hotels/${hotelCode}/devices?size=${size}&offset=${offset}`,
    method: 'get'
  });
}

export function getBoxDetail(id) {
  return fetch({
    url: `/ops/devices/${id}`,
    method: 'get'
  });
}


export function restartBox(id) {
  return fetch({
    url: `/ops/devices/${id}/restart`,
    method: 'patch'
  });
}

export function disAttachBox(id) {
  return fetch({
    url: `/ops/devices/${id}/unbind`,
    method: 'patch'
  });
}

export function dissmissBox(id) {
  return fetch({
    url: `/ops/devices/${id}/cancel`,
    method: 'patch'
  });
}

export function deleteBox(id) {
  return fetch({
    url: `/ops/devices/${id}`,
    method: 'delete'
  });
}

export function catchLog(id) {
  return fetch({
    url: `/ops/devices/${id}/log/catch`,
    method: 'get'
  });
}