const asyncWrapper = (fn) => {
    // declaring asyn beacuse we will use try and catch block
    //req,res,next are comming from express
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

module.exports = asyncWrapper;
