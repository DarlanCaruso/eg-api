const HealthcareProfessional = require("../models/HealthcareProfessional");

class HealthcareProfessionalController {
  /**
   * @swagger
   * /professionals:
   *  post:
   *     tags:
   *       - HealthcareProfessionals
   *     summary: Cria um novo usuário (profissional de saúde)
   *     description: Cria um novo usuário no sistema
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: healthcareprofessionals
   *         description: Objeto do usuário
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/HealthcareProfessionals'
   *     responses:
   *       200:
   *         description: Novo usuário criado com sucesso
   *         schema:
   *          $ref: '#/definitions/HealthcareProfessionals'
   *       400:
   *        description: Usuário já cadastrado
   *        schema:
   *          $ref: '#/definitions/Error'
   */
  async store(req, res) {
    const { cpf } = req.body;

    if (await HealthcareProfessional.findOne({ cpf })) {
      return res.status(400).json({
        error: "Este profissional de saúde já foi cadastrado no sistema"
      });
    }

    const healthcareProfessional = await HealthcareProfessional.create(
      req.body
    );

    return res.json(healthcareProfessional);
  }

  /**
   * @swagger
   * /professionals/{id}:
   *  get:
   *     tags:
   *      - HealthcareProfessionals
   *     summary: Retorna o profissional pelo id
   *     description: Retorna o profissional pelo id
   *     produces:
   *       - application/json
   *     parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        schema:
   *          type: string
   *     responses:
   *       200:
   *         description: Dados do profissional
   *       schema:
   *          $ref: '#/definitions/HealthcareProfessionals'
   *       400:
   *        description: Usuário não encontrado
   *        schema:
   *          $ref: '#/definitions/Error'
   */
  async show(req, res) {
    const professional = await HealthcareProfessional.findById(req.params.id);

    return res.json(professional);
  }

  /**
   * @swagger
   * /professionals/{id}:
   *  put:
   *     tags:
   *       - HealthcareProfessionals
   *     summary: Atualiza as informações do usuário
   *     description: Atualiza as informações do usuário
   *     security:
   *       - bearerAuth: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: pregnant
   *         description: Objeto do usuário
   *         required: true
   *         schema:
   *           $ref: '#/definitions/HealthcareProfessionals'
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Usuário atualizado com sucesso
   *         schema:
   *          $ref: '#/definitions/HealthcareProfessionals'
   */
  async update(req, res) {
    const user = await HealthcareProfessional.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    return res.json(user);
  }

  /**
   * @swagger
   * /professionals/{id}:
   *  delete:
   *     tags:
   *       - HealthcareProfessionals
   *     summary: Remove o profisional do sistema
   *     description: Remove o profisional do sistema.
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *            type: string
   *     responses:
   *       200:
   *         description: Mensagem de sucesso
   *       400:
   *         description: Não foi possível remover o profisional
   *         schema:
   *          $ref: '#/definitions/Error'
   */
  async destroy(req, res) {
    await HealthcareProfessional.findByIdAndDelete(req.params.id);

    return res.json({
      message: "Profissional de saúde removido com successo"
    });
  }
}
module.exports = new HealthcareProfessionalController();
