# Gecko API Spec

## Create Gecko API

Endpoint : POST /api/geckos

Headers :

- Authorization : token

Request Body :

```json
{
  "morph": "morph nya apa",
  "induk_jantan": "morph induk jantan nya apa",
  "induk_betina": "morph induk betina nya apa",
  "dob": "kapan tanggal lahirnya",
  "kelas_albino": "dari kelas apa",
  "jenis_kelamin": "apa jenis kelaminnya"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "morph": "morph nya apa",
    "induk_jantan": "morph induk jantan nya apa",
    "induk_betina": "morph induk betina nya apa",
    "dob": "kapan tanggal lahirnya",
    "kelas_albino": "dari kelas apa",
    "jenis_kelamin": "apa jenis kelaminnya"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Update Gecko API

Endpoint : PUT /api/cars/:carId

Headers :

- Authorization : token

Request Body :

```json
{
  "morph": "morph nya apa",
  "induk_jantan": "morph induk jantan nya apa",
  "induk_betina": "morph induk betina nya apa",
  "dob": "kapan tanggal lahirnya",
  "kelas_albino": "dari kelas apa",
  "jenis_kelamin": "apa jenis kelaminnya"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "morph": "morph nya apa",
    "induk_jantan": "morph induk jantan nya apa",
    "induk_betina": "morph induk betina nya apa",
    "dob": "kapan tanggal lahirnya",
    "kelas_albino": "dari kelas apa",
    "jenis_kelamin": "apa jenis kelaminnya"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Get Gecko API

Endpoint : GET /api/cars/:carId

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "morph": "morph nya apa",
    "induk_jantan": "morph induk jantan nya apa",
    "induk_betina": "morph induk betina nya apa",
    "dob": "kapan tanggal lahirnya",
    "kelas_albino": "dari kelas apa",
    "jenis_kelamin": "apa jenis kelaminnya"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## List Cars API

Endpoint : GET /api/cars

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "morph": "morph nya apa",
      "induk_jantan": "morph induk jantan nya apa",
      "induk_betina": "morph induk betina nya apa",
      "dob": "kapan tanggal lahirnya",
      "kelas_albino": "dari kelas apa",
      "jenis_kelamin": "apa jenis kelaminnya"
    },
    {
      "id": 1,
      "morph": "morph nya apa",
      "induk_jantan": "morph induk jantan nya apa",
      "induk_betina": "morph induk betina nya apa",
      "dob": "kapan tanggal lahirnya",
      "kelas_albino": "dari kelas apa",
      "jenis_kelamin": "apa jenis kelaminnya"
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Remove Gecko API

Endpoint : DELETE /api/cars/:carId

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "car is not found"
}
```
