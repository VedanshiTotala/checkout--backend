// "use strict";

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.bulkInsert("Products", [
//       {
//         name: "A",
//         price: 30,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: "B",
//         price: 20,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: "C",
//         price: 50,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: "D",
//         price: 15,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     ]);
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.bulkDelete("Products", null, {});
//   },
// };

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Clear table + reset autoincrement ID (important for SQLite)
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.sequelize.query(
      "DELETE FROM sqlite_sequence WHERE name='Products';"
    );

    // Insert fresh records
    await queryInterface.bulkInsert("Products", [
      {
        name: "A",
        price: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "B",
        price: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "C",
        price: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "D",
        price: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Delete records + reset IDs again
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.sequelize.query(
      "DELETE FROM sqlite_sequence WHERE name='Products';"
    );
  },
};
