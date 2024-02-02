import {
  createManyTestGeckos,
  createTestGecko,
  createTestUser,
  getTestGecko,
  removeAllTestGeckos,
  removeTestUser,
} from "./test-util.js";
import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/geckos", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAlltestGeckos();
    await removeTestUser();
  });

  it("should can create new gecko", async () => {
    const result = await supertest(web)
      .post("/api/geckos")
      .set("Authorization", "test")
      .send({
        morph: "morph nya apa",
        induk_jantan: "morph induk jantan nya apa",
        induk_betina: "morph induk betina nya apa",
        dob: "kapan tanggal lahirnya",
        kelas_albino: "dari kelas apa",
        jenis_kelamin: "apa jenis kelaminnya"
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.morph).toBe("sun");
    expect(result.body.data.induk_jantan).toBe("msr");
    expect(result.body.data.induk_betina).toBe("shtct");
    expect(result.body.data.dob).toBe("12/02/2004");
    expect(result.body.data.kelas_albino).toBe("tramper");
    expect(result.body.data.jenis_kelamin).toBe("jantan");
  });

  it("should reject if request is not valid", async () => {
    const result = await supertest(web)
      .post("/api/geckos")
      .set("Authorization", "test")
      .send({
        morph: "morph nya apa",
        induk_jantan: "morph induk jantan nya apa",
        induk_betina: "morph induk betina nya apa",
        dob: "kapan tanggal lahirnya",
        kelas_albino: "dari kelas apa",
        jenis_kelamin: "apa jenis kelaminnya"
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/geckos/:geckoId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestGecko();
  });

  afterEach(async () => {
    await removeAllTestGeckos();
    await removeTestUser();
  });

  it("should can get gecko", async () => {
    const testGecko = await getTestGecko();

    const result = await supertest(web)
      .get("/api/geckos/" + testGecko.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testGecko.id);
    expect(result.body.data.morph).toBe(testGecko.morph);
    expect(result.body.data.induk_jantan).toBe(testGecko.induk_jantan);
    expect(result.body.data.induk_betina).toBe(testGecko.induk_betina);
    expect(result.body.data.dob).toBe(testGecko.dob);
    expect(result.body.data.kelas_albino).toBe(testGecko.kelas_albino);
    expect(result.body.data.jenis_kelamin).toBe(testGecko.jenis_kelamin);
  });

  it("should return 404 if gecko id is not found", async () => {
    const testGecko = awaiGecko();

    const result = await supertest(web)
      .get("/api/geckos/" + (testGecko.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/geckos/", function () {
  beforeEach(async () => {
    await createTestUser();
    await createtestGecko();
  });

  afterEach(async () => {
    await removeAlltestGeckos();
    await removeTestUser();
  });

  it("should can update existing gecko", async () => {
    const testGecko = awaiGecko();

    const result = await supertest(web)
      .put("/api/geckos/" + testGecko.id)
      .set("Authorization", "test")
      .send({
        morph: "black night",
        induk_jantan: "jungle",
        induk_betina: "tangerine",
        dob: "04/06/2021",
        kelas_albino: "bell",
        jenis_kelamin: "betina",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testGecko.id);
    expect(result.body.data.morph).toBe("black night");
    expect(result.body.data.induk_jantan).toBe("jungle");
    expect(result.body.data.induk_betina).toBe("tangerine");
    expect(result.body.data.dob).toBe("04/06/2021");
    expect(result.body.data.kelas_albino).toBe("bell");
    expect(result.body.data.jenis_kelamin).toBe("betina");
  });

  it("should reject if request is invalid", async () => {
    const testGecko = awaiGecko();

    const result = await supertest(web)
      .put("/api/geckos/" + testGecko.id)
      .set("Authorization", "test")
      .send({
        morph: "black night",
        induk_jantan: "jungle",
        induk_betina: "tangerine",
        dob: "04/06/2021",
        kelas_albino: "bell",
        jenis_kelamin: "betina",
      });

    expect(result.status).toBe(400);
  });

  it("should reject if gecko is not found", async () => {
    const testGecko = awaiGecko();

    const result = await supertest(web)
      .put("/api/geckos/" + (testGecko.id + 1))
      .set("Authorization", "test")
      .send({
        morph: "black night",
        induk_jantan: "jungle",
        induk_betina: "tangerine",
        dob: "04/06/2021",
        kelas_albino: "bell",
        jenis_kelamin: "betina",
      });

    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/geckos/", function () {
  beforeEach(async () => {
    await createTestUser();
    await createtestGecko();
  });

  afterEach(async () => {
    await removeAlltestGeckos();
    await removeTestUser();
  });

  it("should can delete gecko", async () => {
    let testGecko = awaiGecko();
    const result = await supertest(web)
      .delete("/api/geckos/" + testGecko.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testGecko = awaiGecko();
    expect(testGecko).toBeNull();
  });

  it("should reject if gecko is not found", async () => {
    let testGecko = awaiGecko();
    const result = await supertest(web)
      .delete("/api/geckos/" + (testGecko.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/geckos", function () {
  beforeEach(async () => {
    await createTestUser();
    await createManytestGeckos();
  });

  afterEach(async () => {
    await removeAlltestGeckos();
    await removeTestUser();
  });

  it("should can search without parameter", async () => {
    const result = await supertest(web)
      .get("/api/geckos")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("should can search to page 2", async () => {
    const result = await supertest(web)
      .get("/api/geckos")
      .query({
        page: 2,
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("should can search using morph", async () => {
    const result = await supertest(web)
      .get("/api/geckos")
      .query({
        morph: "morph 1",
      })
      .set("Authorization", "morph");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using induk betina", async () => {
    const result = await supertest(web)
      .get("/api/geckos")
      .query({
        induk_betina: "test1",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using induk jantan", async () => {
    const result = await supertest(web)
      .get("/api/geckos")
      .query({
        induk_jantan: "msr",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using dob", async () => {
    const result = await supertest(web)
      .get("/api/geckos")
      .query({
        dob: "09/07/2022",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using kelas albino", async () => {
    const result = await supertest(web)
      .get("/api/geckos")
      .query({
        kelas_albino: "bell",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using jenis_kelamin", async () => {
    const result = await supertest(web)
      .get("/api/geckos")
      .query({
        jenis_kelamin: "jantan",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });
});
