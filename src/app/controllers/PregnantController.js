const Baby = require("../models/Baby");
const Partner = require("../models/Partner");
const pregnant = require("../models/Pregnant");
const Pregnant = pregnant.Pregnant;
const User = require("../models/User");

class PregnantController {
  /**
   * @swagger
   * /pregnants:
   *  get:
   *     tags:
   *      - Pregnants
   *     summary: Retorna uma lista de gestantes
   *     description: Retorna uma lista de gestantes
   *     produces:
   *       - application/json
   *     parameters:
   *      - in: query
   *        name: name
   *        schema:
   *          type: string
   *      - in: query
   *        name: nickname
   *        schema:
   *          type: string
   *      - in: query
   *        name: page
   *        schema:
   *          type: number
   *     responses:
   *       200:
   *         description: Lista de gestantes
   *       schema:
   *          $ref: '#/definitions/Pregnants'
   *       400:
   *        description: Erro ao retornar os dados
   *        schema:
   *          $ref: '#/definitions/Error'
   */
  async index(req, res) {
    const filters = {};

    if (req.query.name) {
      filters.name = new RegExp(req.query.name, "i");
    }

    if (req.query.nickname) {
      filters.nickname = new RegExp(req.query.nickname, "i");
    }

    const pregnants = await Pregnant.paginate(filters, {
      limit: 20,
      page: req.query.page || 1,
      populate: ["babies"],
      sort: "-createdAt"
    });

    return res.json(pregnants);
  }

  /**
   * @swagger
   * /pregnants/{cpf}:
   *  get:
   *     tags:
   *       - Pregnants
   *     summary: Retorna os dados da gestante informando o cpf
   *     description: Retorna os dados da gestante informando o cpf
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: cpf
   *         description: CPF da gestante
   *         in: path
   *         required: true
   *         schema:
   *            type: string
   *     responses:
   *       200:
   *         description: Dados do usuário
   *         schema:
   *          $ref: '#/definitions/Pregnants'
   *       400:
   *         description: Usuário não encontrado
   *         schema:
   *          $ref: '#/definitions/Error'
   */
  async getPregnantByIdentifier(req, res) {
    const user = await Pregnant.findOne({ cpf: req.params.cpf }).populate(
      "babies"
    );

    if (!user) {
      return res.status(400).json({
        error:
          "Ainda não existe nenhuma gestante cadastrada com este CPF no sistema"
      });
    }

    return res.json(user);
  }

  /**
   * @swagger
   * /pregnants:
   *  post:
   *     tags:
   *       - Pregnants
   *     summary: Cria um novo usuário (gestante)
   *     description: Cria uma nova usuária no sistema
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: pregnant
   *         description: Objeto do usuário
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Pregnants'
   *     responses:
   *       200:
   *         description: Novo usuário criado com sucesso
   *         schema:
   *          $ref: '#/definitions/Pregnants'
   *       400:
   *        description: Usuário já cadastrado
   *        schema:
   *          $ref: '#/definitions/Error'
   */
  async store(req, res) {
    const { cpf } = req.body;

    if (await User.findOne({ cpf })) {
      return res.status(400).json({ error: "Usuário já cadastrado" });
    }

    const user = await Pregnant.create(req.body);

    return res.json(user);
  }

  /**
   * @swagger
   * /pregnants/{id}:
   *  put:
   *     tags:
   *       - Pregnants
   *     summary: Atualiza as informações do usuário
   *     description: Atualiza as informações do usuário
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: pregnant
   *         description: Objeto do usuário
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Pregnants'
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Usuário atualizado com sucesso
   *         schema:
   *          $ref: '#/definitions/Pregnants'
   */
  async update(req, res) {
    const user = await Pregnant.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(user);
  }

  /**
   * @swagger
   * /pregnants/{id}:
   *  delete:
   *     tags:
   *       - Pregnants
   *     summary: Remove a gestante do sistema
   *     description: Remove a gestante do sistema. Ao remover a gestante, também é removido o acompanhante e seus bebês
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
   *         description: Não foi possível remover a gestante
   *         schema:
   *          $ref: '#/definitions/Error'
   */
  async destroy(req, res) {
    await Pregnant.findById(req.params.id, async function(err, pregnant) {
      if (err) return next(err);

      if (!pregnant) {
        return res.json({
          message:
            "Não existe nenhuma gestante cadastrada com este identificador"
        });
      }

      if (pregnant.hasPartner()) {
        await Partner.remove({
          _id: pregnant.partnerId
        });
      }

      if (pregnant.babies && pregnant.babies.length > 0) {
        await Baby.remove({
          _id: {
            $in: pregnant.babies
          }
        });
      }

      await pregnant.remove();

      res.send({ message: "Gestante removida com sucesso" });
    });
  }
}

module.exports = new PregnantController();
