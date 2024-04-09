import axios, { AxiosError, AxiosResponse } from 'axios'
import { IBatchData, IRequestParams, ISuccessResultCall } from './types/b24.interface'
import httpBuildQuery from 'http-build-query'

export class Bx24 {
	private readonly webHook: string
	constructor(webHook: string) {
		this.webHook = webHook
	}
	async call<T extends IRequestParams>(
		method: T['method'],
		params?: T['params'],
	): Promise<ISuccessResultCall | undefined> {
		try {
			const queryBitrix: AxiosResponse = await axios.post(this.webHook + method, params)
			if ('result' in queryBitrix.data) {
				return queryBitrix.data
			} else {
				return undefined
			}
		} catch (e) {
			if (e instanceof AxiosError) {
				if (e.response !== undefined) {
					if (e.response.data !== undefined) {
						console.log(e.response.data.error_description)
						console.log(
							`Ошибка: call\nОписание ошибки: ${e.response.data.error} - ${e.response.data.error_description}`,
						)
					} else {
						console.log(`Ошибка: call\nОписание ошибки: ${e.name} - ${e.message}`)
					}
				}
			} else {
				console.log('Неизвестная ошибка: ' + e)
			}
		}
	}
	async callBatch(queryData: Array<IRequestParams>): Promise<AxiosResponse> {
		const batchElements: Array<string> = queryData.map(obj => {
			if (obj.params !== undefined) {
				return `${obj.method}?${httpBuildQuery(obj.params, 'flags_')}`
			} else {
				return `${obj.method}`
			}
		})
		const batchData: IBatchData = { halt: 0, cmd: batchElements }
		return await axios.post(this.webHook + 'batch', batchData)
	}
	async getBase64(urlFile: string): Promise<string | undefined> {
		try {
			const response = await axios.get(urlFile, { responseType: 'arraybuffer' })
			return Buffer.from(response.data, 'binary').toString('base64')
		} catch (e) {
			console.log('Ошибка: ' + e)
			return undefined
		}
	}
}
