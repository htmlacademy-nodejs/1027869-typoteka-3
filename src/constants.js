'use strict';
const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const DEFAULT_COMMAND = `--help`;
const MAX_COMMENTS = 6;
const API_PREFIX = `/api`;
const USER_ARGV_INDEX = 2;
const MAX_ID_LENGTH = 6;


const ExitCode = {
  error: 1,
  success: 0,
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};


module.exports = {
  HttpCode,
  DEFAULT_COUNT,
  FILE_NAME,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
  API_PREFIX,
  MAX_COMMENTS,
  MAX_ID_LENGTH
};
