import geckoService from "../service/gecko-service.js";
import {logger} from "../application/logging.js";
async function create(req, res, next) {
  try {
    const user = req.user;
    const request = req.body;
    const result = await geckoService.create(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
}

const get = async (req, res, next) => {
  try {
    const user = req.user;
    const geckoId = req.params.geckoId;
    const result = await geckoService.get(user, geckoId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.user;
    const geckoId = req.params.geckoId;
    const request = req.body;
    request.id = geckoId;

    const result = await geckoService.update(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = req.user;
    const geckoId = req.params.geckoId;

    awaigecko.remove(user, geckoId);
    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    next(e);
  }
};

const search = async (req, res, next) => {
  try {
    const user = req.user;
    const request = {
  morph: req.query.morph ,
  induk_jantan: req.query.induk_jantan,
  induk_betina: req.query.induk_betina,
  dob: req.query.dob,
  kelas_albino: req.query.kelas_albino,
  jenis_kelamin: req.query.jenis_kelamin,
    };

    const result = awaigecko.search(user, request);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  get,
  update,
  remove,
  search,
};
