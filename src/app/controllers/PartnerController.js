const Partner = require("../models/Partner");
const pregnant = require("../models/Pregnant");
const Pregnant = pregnant.Pregnant;
const User = require("../models/User");

class PartnerController {
  /**
   * @swagger
   * /partners/{id}:
   *  get:
   *     tags:
   *      - Partners
   *     summary: Retorna os dados acompanhante informando o id
   *     description: Retorna os dados acompanhante informando o id
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
   *         description: Dados do acompanhante
   *       schema:
   *          $ref: '#/definitions/Partners'
   *       400:
   *        description: Usuário não encontrado
   *        schema:
   *          $ref: '#/definitions/Error'
   */
  async show(req, res) {
    const partner = await Partner.findById(req.params.id);

    return res.json(partner);
  }

  /**
   * @swagger
   * /partners:
   *  post:
   *     tags:
   *       - Partners
   *     summary: Cria um novo acompanhante e vincula a uma gestante
   *     description: Informe os dados do acompanhante e a identificação da gestante
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: partner
   *         description: Objeto do acompanhante
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Partners'
   *     responses:
   *       200:
   *         description: Novo acompanhante criado com sucesso
   *         schema:
   *          $ref: '#/definitions/Partners'
   *       400:
   *        description: Esta gestante já possui um acompanhante
   *        schema:
   *          $ref: '#/definitions/Error'
   */
  async store(req, res) {
    const { pregnantId } = req.body;
    const { cpf } = req.body;

    const hasPartner = (await Pregnant.findById(pregnantId)).hasPartner();

    let partner;
    let pregnant;

    if (await User.findOne({ cpf })) {
      return res.status(400).json({ error: "Usuário já cadastrado" });
    }

    if (!hasPartner) {
      partner = await Partner.create(req.body);
      pregnant = await Pregnant.findByIdAndUpdate(
        pregnantId,
        { partnerId: partner._id },
        { new: true }
      );
    } else {
      return res
        .status(400)
        .json({ error: "Esta gestante já possui um acompanhante" });
    }

    return res.json({ partner, pregnant });
  }

  /**
   * @swagger
   * /partners/{id}:
   *  put:
   *     tags:
   *       - Partners
   *     summary: Atualiza as informações do usuário
   *     description: Atualiza as informações do usuário
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: partner
   *         description: Objeto do usuário
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Partners'
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Usuário atualizado com sucesso
   *         schema:
   *          $ref: '#/definitions/Partners'
   */
  async update(req, res) {
    const user = await Partner.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(user);
  }

  /**
   * @swagger
   * /partners/{id}:
   *  delete:
   *     tags:
   *       - Partners
   *     summary: Remove o acompanhante do sistema
   *     description: Remove o acompanhante do sistema. Também é removido o vínculo com a gestante
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
   *         description: Não foi possível remover o acompanhante
   *         schema:
   *          $ref: '#/definitions/Error'
   */
  async destroy(req, res) {
    await Partner.findById(req.params.id, async function(err, partner) {
      if (err) return next(err);

      if (!partner) {
        return res.json({
          message:
            "Não existe nenhum acompanhante cadastrado com este identificador"
        });
      }

      await Pregnant.findByIdAndUpdate(
        partner.pregnantId,
        { partnerId: undefined },
        {
          new: true
        }
      );

      await partner.remove();

      res.send({ message: "Acompanhante removido com sucesso" });
    });
  }
}

module.exports = new PartnerController();
