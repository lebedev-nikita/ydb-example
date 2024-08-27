import { Driver, getCredentialsFromEnv } from "ydb-sdk";

const endpoint = "grpcs://ydb.serverless.yandexcloud.net:2135";
const database = "/ru-central1/b1gchqatfiui72feih8u/etnslu7k70it53q95m76";
const authService = getCredentialsFromEnv();

export const driver = new Driver({ endpoint, database, authService });
