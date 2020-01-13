
class Response {
    static error(res, code, message) {
        return res.status(code).json({
            status: code,
            errors: {
                global: message,
            }
        });
    }
    static success(res, code, payload, message = 'Success') {
        return res.status(code).json({
            status: code,
            message,
            payload
        });
    }
}

export default Response;