const selectors = {
    getUsers(state) {
        const { allUsers } = state;

        return allUsers;
    },

    getFormData(state) {
        const {formData} = state;

        return formData;
    },

    getLoading(state) {
        const {loading} = state;

        return loading;
    }
};

export default selectors;