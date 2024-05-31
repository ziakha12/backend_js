class apiResponse{
    constructor(statusCode , messagae = "success" ,success , data){
        this.statusCode = statusCode
        this.messagae = messagae
        this.data = data
        this.success = statusCode < 400

    }
}
export {apiResponse}
