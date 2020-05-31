const Clinics = require("../models/Clinics");
const request = require("request");

class ClinicsController {
  /**
   * @swagger
   * /clinics:
   *  get:
   *     tags:
   *      - Clinics
   *     summary: Retorna a lista de clínicas disponíveis
   *     description: Retorna a lista de clínicas disponíveis
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Operação executada com sucesso
   *       schema:
   *          $ref: '#/definitions/Clinics'
   *       400:
   *        description: Não foi possível atualizar os dados do sistema SIGEO
   *        schema:
   *          $ref: '#/definitions/Error'
   */
  async index(req, res) {
    const clinics = await Clinics.find({});
    return res.json(clinics);
  }

  /**
   * @swagger
   * /clinics:
   *  put:
   *     tags:
   *      - Clinics
   *     summary: Atualiza o banco de dados com informações do sistema SIGEO
   *     description: Atualiza o banco de dados com informações do sistema SIGEO
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Operação executada com sucesso
   *       400:
   *        description: Não foi possível atualizar os dados do sistema SIGEO
   *        schema:
   *          $ref: '#/definitions/Error'
   */
  async update(req, res) {
    var options = {
      url:
        "https://utility.arcgis.com/usrsvcs/servers/82aef1fb1a9a432db2b6ee33a1132d71/rest/services/civitas/SMS_SMU_featureservice/FeatureServer/10/query?where=1%3D1&outFields=*&outSR=4326&f=json",
      methods: "GET"
    };

    let list = [];
    request(options, (error, response, body) => {
      const sigeoData = JSON.parse(body.trim());
      const features = sigeoData.features;

      for (let key in features) {
        let feature = features[key];
        let attr = feature.attributes;
        let geo = feature.geometry;

        let obj = {
          objectId: attr.OBJECTID,
          name: attr.nome,
          genericName: attr.nomegen,
          unitType: attr.tipunidade,
          atentionLevel: attr.nivelatenc,
          scale: attr.escala,
          lograd: attr.lograd,
          number: attr.numrop,
          cep: attr.cep,
          neighborhood: attr.bairro,
          county: attr.municipio,
          uf: attr.uf,
          country: attr.pais,
          tel: attr.telefone,
          servofert: attr.servovert,
          geometry_x: geo.x,
          geometry_y: geo.y
        };

        list.push(obj);
      }
    }).on("complete", async () => {
      await Clinics.deleteMany({});

      Clinics.insertMany(list)
        .then(resp => res.json(resp))
        .catch(() =>
          res.status(400).json({
            error: "Não foi possível inserir os dados do sistema SIGEO"
          })
        );
    });
  }
}

module.exports = new ClinicsController();
