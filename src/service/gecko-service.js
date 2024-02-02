import { validate } from "../validation/validation.js";
import {
  createGeckoValidation,
  getGeckoValidation,
  searchGeckoValidation,
  updateGeckoValidation,
} from "../validation/gecko-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (user, request) => {
  const gecko = validate(createGeckoValidation, request);
  gecko.username = user.username;

  return prismaClient.gecko.create({
    data: gecko,
    select: {
      id: true,
      morph: true,
      induk_jantan: true,
      induk_betina: true,
      dob: true,
      kelas_albino: true,
      jenis_kelamin: true,
    },
  });
};

const get = async (user, geckoId) => {
  geckoId = validate(getGeckoValidation, geckoId);

  const gecko = await prismaClient.gecko.findFirst({
    where: {
      username: user.username,
      id: geckoId,
    },
    select: {
      id: true,
      morph: true,
      induk_jantan: true,
      induk_betina: true,
      dob: true,
      kelas_albino: true,
      jenis_kelamin: true,
    },
  });

  if (!gecko) {
    throw new ResponseError(404, "gecko is not found");
  }

  return gecko;
};

const update = async (user, request) => {
  const gecko = validate(updateGeckoValidation, request);

  const totalGeckoInDatabase = await prismaClient.gecko.count({
    where: {
      username: user.username,
      id: gecko.id,
    },
  });

  if (totalGeckoInDatabase !== 1) {
    throw new ResponseError(404, "gecko is not found");
  }

  return prismaClient.gecko.update({
    where: {
      id: gecko.id,
    },
    data: {
      morph: gecko.morph,
      induk_jantan: gecko.induk_jantan,
      induk_betina: gecko.induk_betina,
      dob: gecko.dob,
      kelas_albino: gecko.kelas_albino,
      jenis_kelamin: gecko.jenis_kelamin,
    },
    select: {
      id: true,
      morph: true,
      induk_jantan: true,
      induk_betina: true,
      dob: true,
      kelas_albino: true,
      jenis_kelamin: true,
    },
  });
};

const remove = async (user, geckoId) => {
  geckoId = validate(getGeckoValidation, geckoId);

  const totalInDatabase = await prismaClient.gecko.count({
    where: {
      username: user.username,
      id: geckoId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "gecko is not found");
  }

  return prismaClient.gecko.delete({
    where: {
      id: geckoId,
    },
  });
};

const search = async (user, request) => {
  request = validate(searchGeckoValidation, request);

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  const skip = (request.page - 1) * request.size;

  const filters = [];

  filters.push({
    username: user.username,
  });

  if (request.morph) {
    filters.push({
      morph: {
        contains: request.morph,
      },
    });
  }
  if (request.induk_jantan) {
    filters.push({
      induk_jantan: {
        contains: request.induk_jantan,
      },
    });
  }
  if (request.induk_betina) {
    filters.push({
      induk_betina: {
        contains: request.induk_betina,
      },
    });
  }
  if (request.dob) {
    filters.push({
      dob: {
        contains: request.dob,
      },
    });
  }
  if (request.kelas_albino) {
    filters.push({
      kelas_albino: {
        contains: request.kelas_albino,
      },
    });
  }
  if (request.jenis_kelamin) {
    filters.push({
      jenis_kelamin: {
        contains: request.jenis_kelamin,
      },
    });
  }

  const geckos = await prismaClient.gecko.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.gecko.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: geckos,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default {
  create,
  get,
  update,
  remove,
  search,
};
