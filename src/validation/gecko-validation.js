import Joi from "joi";

const createGeckoValidation = Joi.object({
  morph: Joi.string().max(100).required(),
  induk_jantan: Joi.string().max(100).optional(),
  induk_betina: Joi.string().max(100).optional(),
  dob: Joi.string().max(100).optional(),
  kelas_albino: Joi.string().max(100).optional(),
  jenis_kelamin: Joi.string().max(100).optional(),
});

const getGeckoValidation = Joi.number().positive().required();

const updateGeckoValidation = Joi.object({
  id: Joi.number().positive().required(),
  morph: Joi.string().max(100).required(),
  induk_jantan: Joi.string().max(100).optional(),
  induk_betina: Joi.string().max(100).optional(),
  dob: Joi.string().max(100).optional(),
  kelas_albino: Joi.string().max(100).optional(),
  jenis_kelamin: Joi.string().max(100).optional(),
});

const searchGeckoValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  morph: Joi.string().optional(),
  induk_jantan: Joi.string().optional(),
  induk_betina: Joi.string().optional(),
  dob: Joi.string().optional(),
  kelas_albino: Joi.string().optional(),
  jenis_kelamin: Joi.string().optional(),
});

export {
  createGeckoValidation,
  getGeckoValidation,
  updateGeckoValidation,
  searchGeckoValidation,
};
