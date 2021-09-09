
class ErrorClass extends Error {
    constructor(errorCode, errorMsg) {
        super(errorMsg);
        this.errorCode = errorCode;
        this.errorMsg = errorMsg;
    }

    static __ErrorMap(error) {
        return {
            [ErrorClass.InvalidParameters]: 2000,
            [ErrorClass.VerifyFailure]: 2001,
            [ErrorClass.InvalidFormatData]: 2002,
        }[error];
    }

    /**
     * @function isTypeOf
     * @param {*} error
     * @param {*} ErrorType
     */
    static isTypeOf(error, ErrorType) {
        if (!error) return false;
        return error.errorCode === ErrorClass.__ErrorMap(ErrorType);
    }

    /**
     * 非法参数
     */
    static InvalidParameters(errorMsg) {
        return new ErrorClass(2000, errorMsg || "invalid parameters");
    }

    /**
     * 验证失败
     */
    static VerifyFailure(errorMsg) {
        return new ErrorClass(2001, errorMsg || "verify failure");
    }

    /**
     * 数据格式不正确
     */
    static InvalidFormatData(errorMsg) {
        return new ErrorClass(2002, errorMsg || "invalid format data");
    }

}

module.exports = ErrorClass;
