class apiError extends Error{
    constructor(statuscode,
        message = "something went wrong",
        errors = [],
        statck = ""
    ){
        super(message)
        this.statuscode = statuscode,
        this.data = null,
        this.errors= errors
        this.success = false
        this.message = message


        if(statck){
            this.stack = statck
        }
        else{
            Error.captureStackTrace(this , this.contructor)
        }

    }
}
export {apiError}



