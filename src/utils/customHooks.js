/** @format */

import { useEffect, useState } from 'react';

const useFetchGet = (url, options) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(url, options)
			.then((res) => res.json())
			.then((data) => setData(data))
			.catch((err) => console.log(err));
	}, [url]);

	return data;
};

export { useFetchGet };
