'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
        */
        return queryInterface.bulkInsert('Users', [{
            firstName: 'khai',
            lastName: 'phan',
            email: 'khaiphan@gmail.com',
            password: '123456',
            address: '123/456 Điện Biên Phủ',
            gender: 1,
            roleId: 'R1',
            phoneNumber: '0303030303',
            positionId: '5',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        return queryInterface.bulkDelete('Users', null, {});
    }
};
