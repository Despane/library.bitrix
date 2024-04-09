export interface IRequestParams {
	method: string
	params?: Record<string, any>
}
export interface IBatchData {
	halt: number
	cmd: Array<string>
}

export interface ISuccessResultCall {
	result: any
	time: {
		start: number
		finish: number
		duration: number
		processing: number
		date_start: string
		date_finish: string
		operating_reset_at: number
		operating: number
	}
	next?: number
	total?: number
}

// interface IBitrixResponse<T = any, D = any> extends AxiosResponse<T, D> {
// 	bitrixError: {
// 		error: string
// 		error_description: string
// 	}
// }
//
// export class BitrixErrorResultCall<T = any, D = any> extends AxiosError<T, D>{
// 	constructor(message?: string, code?: string, config?: InternalAxiosRequestConfig<D>, request?: any, response?: IBitrixResponse<T, D>) {
// 		super(message, code, config, request, response)
// 		if(response !== undefined){
// 			this.error_description = response?.bitrixError.error_description
// 		}
// 	}
// 	error: string
// 	error_description: string
// }

