const db = require("../models");
const { LOG_ATTRIBUTE } = require("../util/console");
const slugify = require("slugify");
const attribute = db.attribute;
const Op = db.Sequelize.Op;
const statusObj = db.status;

const Query = {
  attributes: async () => await attribute.findAll(),
  attributeById: async (root, { id }) => {
    return attribute.findByPk(id);
  },
  attributeList: async (root, args, context, info) => {
    return await listAttributes(args);
  },
};

const Mutation = {
  createAttribute: async (root, args, context, info) => {
    try {
      const { name, status_id, created_by, created_at } = args;
      let slug = slugify(name, {
        replacement: "_",
        remove: undefined,
        lower: true,
        strict: true,
      });
      const available = await attribute.findOne({
        where: { slug: slug },
      });
      if (available) {
        console.error(
          LOG_ATTRIBUTE + "\n" + "Entered attribute name is already taken"
        );
        throw new Error("Entered attribute name is already taken");
      }
      if (args.status_id) {
        const Obj = await statusObj.findOne({
          where: { id: args.status_id },
        });
        if (Obj === null) {
          console.error(LOG_ATTRIBUTE + "\n" + "Invalid status_id.");
          throw new Error(`Invalid status_id.`);
        }
      }
      return await attribute
        .create({
          name,
          slug,
          status_id,
          created_by,
          created_at,
        })
        .then((result) => {
          return result;
        })
        .catch((error) => {
          console.error(
            LOG_ATTRIBUTE +
              "\n" +
              JSON.stringify(error) +
              "Error while creating attribute"
          );
          throw new Error(`Error while creating attribute`);
        });
    } catch (err) {
      console.error(
        LOG_ATTRIBUTE +
          "\n" +
          JSON.stringify(err) +
          "Error while creating attribute"
      );
      return err;
    }
  },
  updateAttribute: async (root, args, context, info) => {
    try {
      const { id, name, status_id, updated_by, updated_at } = args;
      const attributeObj = await attribute.findByPk(id);
      if (attributeObj === null) {
        console.error(
          LOG_ATTRIBUTE + "\n" + `Couldn’t find Attribute with id ${id}`
        );
        throw new Error(`Couldn’t find Attribute with id ${id}`);
      }
      let slug;
      if (args.name) {
        slug = slugify(name, {
          replacement: "_",
          remove: undefined,
          lower: true,
          strict: true,
        });
        const available = await attribute.findOne({
          where: { slug: slug, id: { [Op.not]: id } },
        });
        if (available) {
          console.error(
            LOG_ATTRIBUTE + "\n" + "Entered attribute name is already taken"
          );
          throw new Error("Entered attribute name is already taken");
        }
      }
      if (args.status_id) {
        const Obj = await statusObj.findOne({
          where: { id: args.status_id },
        });
        if (Obj === null) {
          console.error(LOG_ATTRIBUTE + "\n" + "Invalid status_id.");
          throw new Error(`Invalid status_id.`);
        }
      }
      return (await attributeObj)
        .update({
          name,
          slug,
          status_id,
          updated_by,
          updated_at,
        })
        .then((result) => {
          return result;
        })
        .catch((error) => {
          console.error(
            LOG_ATTRIBUTE +
              "\n" +
              JSON.stringify(error) +
              "Error while updating attribute"
          );
          throw new Error(`Error while updating attribute`);
        });
    } catch (err) {
      console.error(LOG_ATTRIBUTE + "\n" + JSON.stringify(err));
      return err;
    }
  },
  deleteAttribute: async (root, args, context, info) => {
    const { id } = args;
    const attributeObj = await attribute.findByPk(id);

    if (!attributeObj) {
      console.error(
        LOG_ATTRIBUTE + "\n" + `Couldn’t find Attribute with id ${id}`
      );
      throw new Error(`Couldn’t find Attribute with id ${id}`);
    }

    //(await attributeObj).destroy();

    return "Attribute deleted successfully";
  },
};

async function listAttributes(args) {
  let offset = args.offset;
  let numOfRecords = args.num_of_records;
  let nameParam = args.name;
  let whereClause = [];
  if (nameParam) {
    whereClause.push({
      name: {
        [Op.like]: `${nameParam}%`,
      },
    });
  }

  let result = await attribute.findAndCountAll({
    where: whereClause,
    offset: offset,
    limit: numOfRecords,
  });
  return result;
}

const Attribute = {
  status: (obj) => statusObj.findByPk(obj.status_id),
};

module.exports = { Query, Mutation, Attribute };
