import { createRequire } from 'node:module'

export const readJSON = (path) => {
	const require = createRequire(import.meta.url)
	return require(path)
}