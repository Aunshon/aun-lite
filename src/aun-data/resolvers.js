import actions from "./actions";

const resolvers = {
    *getUsers() {
        yield actions.fetchUsers();
    },
};

export default resolvers;