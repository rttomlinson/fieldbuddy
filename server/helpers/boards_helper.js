
const BoardsHelper = {};

BoardsHelper.getAllBoards = () => {
    return '/boards';
};
BoardsHelper.createNewBoard = () => {
    return '/boards/new';
};
BoardsHelper.addUserToBoard = () => {
    return '/boards/add/user';
};



module.exports = BoardsHelper;