'use strict';
const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const DEFAULT_COMMAND = `--help`;

const USER_ARGV_INDEX = 2;

const ExitCode = {
  error: 1,
  success: 0,
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};


module.exports = {
  HttpCode,
  DEFAULT_COUNT,
  FILE_NAME,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode
};
