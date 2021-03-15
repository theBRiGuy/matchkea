import React, { useState, useEffect } from 'react';

function Scrape() {
	const [hasError, setErrors] = useState(false);
	const [results, setResults] = useState([]);

	async function fetchData() {
		const response = await fetch('http://localhost:4000/');
		response.json()
			.then(res => {
				setResults(res);
			})
			.catch(err => setErrors(err));
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<h3>Results:</h3>
			{ results && results.map( item => {
				return (
					<div>
						<img
							{...item.image}
						/>
					</div>
				)
			})}
			<hr />
			<h3>Errors:</h3>
			{JSON.stringify(hasError)}
		</div>
	);
}

export default Scrape;