const zod = require('zod');

const signSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(4)
})

function signSchemaAuthenticationCheck(req, res, next){
    const jsonPayload = req.body;

    if(!signSchema.safeParse(jsonPayload).success){
        return res.status(401).json({
            msg: "The sign-up input authentication failed",
            error: signSchema.safeParse(jsonPayload).error.issues[0].message
        });
    }

    return next();
}

module.exports = signSchemaAuthenticationCheck;