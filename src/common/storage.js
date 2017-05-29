export const get = (item) => {
	return localStorage.getItem(item)
}

export const set = (item, value) => {
	return localStorage.setItem(item, value)
}
