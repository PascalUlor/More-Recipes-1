module.exports = {
    up: (queryInterface, Sequelize) => {
        queryInterface.createTable('Recipes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            ingredients: {
                type: Sequelize.STRING,
                allowNull: false
            },
            procedures: {
                type: Sequelize.STRING,
                allowNull: false
            },
            upvotes: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            downvotes: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            userId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'id',
                    as: 'userId',
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface) => {
        queryInterface.dropTable('Recipes');
    }
};