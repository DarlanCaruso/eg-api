const User = require("../models/User");

/**
 * @swagger
 * /auth:
 *  post:
 *     tags:
 *       - Auth
 *     summary: Autenticação do usuário
 *     description: Autenticação do usuário
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: Autenticação com e-mail e senha
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Auth'
 *     responses:
 *       200:
 *         description: Login efetuado com sucesso
 *       400:
 *        description: Usuário não encontrado ou e-mail ou senha incorretos
 *        schema:
 *          $ref: '#/definitions/Error'
 */
class AuthController {
  async store(req, res) {
    const { cpf, password } = req.body;

    const user = await User.findOne({ cpf });

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    if (!(await user.compareHash(password))) {
      return req.status(400).json({ error: "E-mail ou senha incorretos" });
    }

    return res.json({ user, token: User.generateToken(user) });
  }
}

/**
 * @swagger
 * definition:
 *    Auth:
 *      required:
 *        - cpf
 *        - password
 *      properties:
 *        cpf:
 *          type: string
 *        password:
 *          type: string
 */
module.exports = new AuthController();
