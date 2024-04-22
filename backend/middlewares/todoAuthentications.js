const zod = require('zod');

const todoSchema = zod.object({
    title: zod.string(),
    description: zod.string()
})

function todoSchemaAuthenticationCheck(req, res, next){
    const jsonPayload = req.body;

    if(!todoSchema.safeParse(jsonPayload).success){
        return res.status(401).json({
            msg: "The todo input authentication failed",
            error: todoSchema.safeParse(jsonPayload).error.issues[0]
        });
    }

    return next();
}

module.exports = todoSchemaAuthenticationCheck;