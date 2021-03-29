const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const url = 'https://www.ikea.com/ca/en/search/products/?q=shelves';

const run = () => {
	return new Promise(async (res, rej) => {
		try {
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			await page.goto(url);
			let returnedJSON = await page.$$eval('.search-grid__item', (items) => {
				console.log('items is', items);
				return items.map((item) => {
					return {
						id: item.getAttribute('data-product-number'),
						title: item.querySelector(
							'.range-revamp-header-section__title--small'
						).innerHTML,
						image: {
							srcSet: item.querySelector('img').getAttribute('srcset')
						}
					};
				});
			});
			console.log('returnedJSON is', returnedJSON);
			browser.close();
			return res(returnedJSON);
		} catch (e) {
			return rej(e);
		}
	});
};

const app = express();
app.use(cors());
app.get('/', function (req, res) {
	run()
		.then((json) => {
			console.log(json);
			res.json(json);
		})
		.catch(console.error);
});

app.listen(4000, () =>
	console.log('Express Server Now Running On localhost:4000')
);
