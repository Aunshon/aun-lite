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
    },

		getExtensionData( state, namespace ) {
			const {extentions} = state;

			return extentions[namespace] ? extentions[namespace] : undefined;
		},

		getFormExtension(state) {
			const {formExtensionData} = state;

			return formExtensionData;
		},

		getFormExtensionData(state, namespace) {
			const {formExtensionData} = state;

			return formExtensionData[namespace] ? formExtensionData[namespace] : undefined;
		},
};

export default selectors;
