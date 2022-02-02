const verifyApiHeaderToken = (req, res, next) => {
    const { apiToken } = req.headers;
    if (apiToken) {
        if (apiToken == process.env.API_TOKEN) {
            return next();
        }else{
            sendUnauthorized(res);
        }
    } else {

    }
}

const sendUnauthorized = (res) => {
    res.status(401).json({"error":"Recurso no autorizado"});
}

module.exports = {
    verifyApiHeaderToken,
}