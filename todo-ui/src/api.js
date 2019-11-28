const axios = require('axios');

export default () => {
	return axios.create({
		baseURL: `http://localhost:3000/`,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Authorization": "Bearer "+ localStorage.getItem('token')
		}
	})
} 