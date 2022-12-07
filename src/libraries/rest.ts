class sendResponse {
    success: boolean;
    message: string;
    data: any;
    error: {
        error_code: string,
        error_data: Array<string>
    }
    pagination: {}
    constructor(message: string = 'Success getting data', data: any, pagination: any = {}) {
        this.success = true;
        this.message = message;
        this.data = data;
        this.error = {
            error_code: '',
            error_data: []
        }
        this.pagination = pagination;
    }
}

class sendError {
    success: boolean;
    message: string;
    data: any;
    error: {
        error_code: string,
        error_data: Array<string>
    }
    pagination: {}
    status: number

    constructor(message: string = 'Error getting data', error_code: string = 'PROCESS_ERROR', error_data: Array<string> = [], status: number = 400) {
        this.success = false;
        this.message = message;
        this.data = null;
        this.error = {
            error_code: error_code,
            error_data: error_data
        }
        this.pagination = {}
        this.status = status;
    }
}

export { sendResponse, sendError };