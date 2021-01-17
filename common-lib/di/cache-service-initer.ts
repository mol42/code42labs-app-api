import CacheService, { ICacheService as ref } from "../services/CacheService";
// import Bottle type
import Bottle from 'bottlejs';

export type ICacheService = ref;

export function initer(bottle: Bottle) {
    bottle.service("cacheService", CacheService);
};