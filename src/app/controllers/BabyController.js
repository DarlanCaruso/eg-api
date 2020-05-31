const Baby = require("../models/Baby");
const pregnant = require("../models/Pregnant");
const Pregnant = pregnant.Pregnant;

class BabyController {
  /**
   * @swagger
   * /babies:
   *  post:
   *     tags:
   *      - Babies
   *     summary: Registra um novo bebê
   *     description: Registra um novo bebê
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: baby
   *         description: Dados do bebê
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Babies'
   *     responses:
   *       200:
   *         description: Bebê cadastrado com sucesso
   *       schema:
   *          $ref: '#/definitions/Babies'
   *       400:
   *        description: Não foi possível cadastrar o bebê
   *        schema:
   *          $ref: '#/definitions/Error'
   */
  async store(req, res) {
    const { pregnantId } = req.body;
    const pregnant = await Pregnant.findById(pregnantId);

    if (!pregnant) {
      return res.status(400).json({ error: "Gestante não encontrada" });
    }

    const baby = await Baby.create(req.body);

    if (!baby) {
      return res
        .status(400)
        .json({ error: "Não foi possível registrar o bebê" });
    }

    const updatedPregnant = await Pregnant.findById(pregnantId).populate(
      "babies"
    );

    return res.json({ baby, updatedPregnant });
  }
}

module.exports = new BabyController();
