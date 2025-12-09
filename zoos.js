import api from "./index";
import { initialZoosFallback } from "./zoosFallback";

const ENDPOINT = "/zoos";

export async function getZoos(filters = {}) {
  try {
    const response = await api.get(ENDPOINT, { params: filters });
    return response.data;
  } catch (error) {
    console.warn("REST API offline → using fallback data");
    return initialZoosFallback(filters);
  }
}

export async function getZooById(id) {
  try {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.warn("REST API offline → using fallback zoo");
    const fallback = initialZoosFallback().find((z) => z.id === Number(id));
    return fallback || null;
  }
}

export async function searchZoos(query, extraParams = {}) {
  return getZoos({ q: query, ...extraParams });
}

export async function getZoosByType(type, extraParams = {}) {
  return getZoos({ type, ...extraParams });
}

export async function getZoosSorted(field = "visitors", order = "asc") {
  return getZoos({ _sort: field, _order: order });
}

export async function getZoosPaginated(page = 1, limit = 6) {
  return getZoos({ _page: page, _limit: limit });
}
