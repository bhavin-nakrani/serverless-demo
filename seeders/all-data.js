"use strict";
const attributes = require("./20210213094437-attributes");

module.exports = {
  up: async () => {
    await attributes.up();
    return;
  },

  down: async (queryInterface) => {
    await attributes.down(queryInterface);
  },
};
