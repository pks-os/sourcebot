import 'server-only';

import { getEnv, getEnvBoolean, getEnvNumber } from "./utils";

export const ZOEKT_WEBSERVER_URL = getEnv(process.env.ZOEKT_WEBSERVER_URL, "http://localhost:6070")!;
export const SHARD_MAX_MATCH_COUNT = getEnvNumber(process.env.SHARD_MAX_MATCH_COUNT, 10000);
export const TOTAL_MAX_MATCH_COUNT = getEnvNumber(process.env.TOTAL_MAX_MATCH_COUNT, 100000);
export const SOURCEBOT_VERSION = getEnv(process.env.SOURCEBOT_VERSION, 'unknown')!;
export const NODE_ENV = process.env.NODE_ENV;
export const PUBLIC_SEARCH_DEMO = getEnvBoolean(process.env.PUBLIC_SEARCH_DEMO, false);
