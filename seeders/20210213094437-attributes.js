"use strict";
const slugify = require("slugify");
const db = require("../models");
const attribute = db.attribute;
const attributes = [
  { name: "Width" },
  { name: "Depth" },
  { name: "Height" },
  { name: "Area" },
  { name: "Format" },
  { name: "Material" },
  { name: "Edge" },
  { name: "Length" },
  { name: "Base" },
  { name: "Wall" },
  { name: "Size" },
];

async function insertOrUpdate(item) {
  await attribute.findOrCreate({
    where: {
      slug: slugify(item.name, {
        replacement: "_",
        remove: undefined,
        lower: true,
        strict: true,
      }),
    },
    defaults: item,
  });
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (const item of attributes) {
      await insertOrUpdate(item);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Attributes", null, {});
  },
};
