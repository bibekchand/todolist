const getTokenHeader = () => ({
	Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getUserInfo = () => {
	return axios
		.get(`${baseURL}/get_current_user`, {
			headers: getTokenHeader(),
		})
		.then((response) => {
			return { username: response.data.username, email: response.data.email };
		})
		.catch((error) => {
			throw error;
		});
};
