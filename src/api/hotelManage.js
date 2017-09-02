/**
 * Created by stevenshao on 17/9/2.
 */
import fetch from 'common/js/fetch';

export function searchHotel(queryKey, size, offset) {
  return fetch({
    url: `/ops/hotels?queryKey=${queryKey}&size=${size}&offset=${offset}`,
    method: 'get'
  });
}

export function getHotelDetail(hotelCode) {
  return fetch({
    url: `/ops/hotels/${hotelCode}`,
    method: 'get'
  });
}

export function getUserList(hotelCode, size, offset) {
  return fetch({
    url: `/ops/hotels/${hotelCode}/users?size=${size}&offset=${offset}`,
    method: 'get'
  });
}

export function resetPassword(id) {
  return fetch({
    url: `/ops/users/${id}/reset`,
    method: 'patch'
  });
}

export function getRoomList(hotelCode, size, offset) {
  return fetch({
    url: `/ops/hotels/${hotelCode}/rooms?size=${size}&offset=${offset}`,
    method: 'get'
  });
}
