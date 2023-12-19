export const buildUrl = (url: string, params: string) => {
	let urlWithParams = url

	Object.entries(params).forEach(([key, value], i) => {
		const sign = !i ? '?' : '&'
		urlWithParams += `${sign}${key}_like=${value}`
	})

	return urlWithParams
}
//посмотреть как фильтр сделать, мб как-то подругому по любому чекнутьт ртк квери
