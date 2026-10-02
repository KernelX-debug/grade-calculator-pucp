(function (root) {
  const catalog = {
  "courses": [
    {
      "id": "amga",
      "code": "AMGA",
      "aliases": [
        "AMGA"
      ],
      "name": "Álgebra Matricial y Geometría Analítica",
      "universityCode": "1MAT04",
      "faculty": "EEGGCC",
      "credits": 4.5,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 10,
      "components": [
        {
          "id": "pc",
          "label": "Prácticas calificadas",
          "shortLabel": "PC",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 3,
          "note": ""
        },
        {
          "id": "pd",
          "label": "Prácticas dirigidas",
          "shortLabel": "PD",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 1,
          "note": ""
        },
        {
          "id": "ex",
          "label": "Exámenes",
          "shortLabel": "EX",
          "total": 2,
          "keep": 2,
          "aggregation": "sum",
          "precision": null,
          "weight": 3,
          "note": ""
        }
      ]
    },
    {
      "id": "fufis",
      "code": "FUFIS",
      "aliases": [
        "FUFIS"
      ],
      "name": "Fundamentos de física",
      "universityCode": "1FIS01",
      "faculty": "EEGGCC",
      "credits": 3.5,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 10,
      "components": [
        {
          "id": "pc",
          "label": "Prácticas calificadas",
          "shortLabel": "PC",
          "total": 5,
          "keep": 4,
          "aggregation": "average",
          "precision": 1,
          "weight": 4,
          "note": ""
        },
        {
          "id": "ex",
          "label": "Exámenes",
          "shortLabel": "EX",
          "total": 2,
          "keep": 2,
          "aggregation": "sum",
          "precision": null,
          "weight": 3,
          "note": ""
        }
      ]
    },
    {
      "id": "fucal",
      "code": "FUCAL",
      "aliases": [
        "FUCAL"
      ],
      "name": "Fundamentos de cálculo",
      "universityCode": "1MAT05",
      "faculty": "EEGGCC",
      "credits": 4.5,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 10,
      "components": [
        {
          "id": "pc",
          "label": "Prácticas calificadas",
          "shortLabel": "PC",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 3,
          "note": ""
        },
        {
          "id": "pd",
          "label": "Prácticas dirigidas",
          "shortLabel": "PD",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 1,
          "note": ""
        },
        {
          "id": "ex",
          "label": "Exámenes",
          "shortLabel": "EX",
          "total": 2,
          "keep": 2,
          "aggregation": "sum",
          "precision": null,
          "weight": 3,
          "note": ""
        }
      ]
    },
    {
      "id": "qui1",
      "code": "QUI1",
      "aliases": [
        "QUI1"
      ],
      "name": "Química 1",
      "universityCode": "1QUI01",
      "faculty": "EEGGCC",
      "credits": 3.5,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 20,
      "components": [
        {
          "id": "pc",
          "label": "Prácticas calificadas",
          "shortLabel": "PC",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 5,
          "note": ""
        },
        {
          "id": "pd",
          "label": "Prácticas dirigidas",
          "shortLabel": "PD",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 3,
          "note": ""
        },
        {
          "id": "ex",
          "label": "Exámenes",
          "shortLabel": "EX",
          "total": 2,
          "keep": 2,
          "aggregation": "sum",
          "precision": null,
          "weight": 6,
          "note": ""
        }
      ]
    },
    {
      "id": "coac",
      "code": "COAC",
      "aliases": [
        "COAC"
      ],
      "name": "Comunicación académica",
      "universityCode": "1LIN15",
      "faculty": "EEGGCC",
      "credits": 3,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 10,
      "components": [
        {
          "id": "pc",
          "label": "Prácticas",
          "shortLabel": "PC",
          "total": 5,
          "keep": 4,
          "aggregation": "average",
          "precision": 1,
          "weight": 4,
          "note": ""
        },
        {
          "id": "tf",
          "label": "Trabajo final",
          "shortLabel": "TF",
          "total": 1,
          "keep": 1,
          "aggregation": "average",
          "precision": 1,
          "weight": 1,
          "note": ""
        },
        {
          "id": "ep",
          "label": "Evaluación permanente",
          "shortLabel": "EP",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 1,
          "note": ""
        },
        {
          "id": "ex",
          "label": "Exámenes",
          "shortLabel": "EX",
          "total": 2,
          "keep": 2,
          "aggregation": "sum",
          "precision": null,
          "weight": 2,
          "note": ""
        }
      ]
    },
    {
      "id": "labqui1",
      "code": "LABQUI1",
      "aliases": [
        "LABQUI"
      ],
      "name": "Laboratorio de química 1",
      "universityCode": "1QUI02",
      "faculty": "EEGGCC",
      "credits": 0.75,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 1,
      "components": [
        {
          "id": "lab",
          "label": "Prácticas",
          "shortLabel": "LAB",
          "total": 6,
          "keep": 5,
          "aggregation": "average",
          "precision": 1,
          "weight": 1,
          "note": ""
        }
      ]
    },
    {
      "id": "caldif",
      "code": "CALDIF",
      "aliases": [
        "CALDIF"
      ],
      "name": "Cálculo diferencial",
      "universityCode": "1MAT06",
      "faculty": "EEGGCC",
      "credits": 4.5,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 10,
      "components": [
        {
          "id": "pc",
          "label": "Prácticas calificadas",
          "shortLabel": "PC",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 3,
          "note": ""
        },
        {
          "id": "pd",
          "label": "Prácticas dirigidas",
          "shortLabel": "PD",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 1,
          "note": ""
        },
        {
          "id": "ex",
          "label": "Exámenes",
          "shortLabel": "EX",
          "total": 2,
          "keep": 2,
          "aggregation": "sum",
          "precision": null,
          "weight": 3,
          "note": ""
        }
      ]
    },
    {
      "id": "dibujo",
      "code": "DIBUJO",
      "aliases": [
        "DIBUJO"
      ],
      "name": "Dibujo en ingeniería",
      "universityCode": "1ING02",
      "faculty": "EEGGCC",
      "credits": 4.5,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 12,
      "components": [
        {
          "id": "pc",
          "label": "Prácticas calificadas",
          "shortLabel": "PC",
          "total": 6,
          "keep": 5,
          "aggregation": "average",
          "precision": 1,
          "weight": 3,
          "note": ""
        },
        {
          "id": "pd",
          "label": "Prácticas dirigidas",
          "shortLabel": "PD",
          "total": 14,
          "keep": 12,
          "aggregation": "average",
          "precision": 1,
          "weight": 2,
          "note": ""
        },
        {
          "id": "ex1",
          "label": "Examen 1",
          "shortLabel": "EX1",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 3,
          "note": ""
        },
        {
          "id": "ex2",
          "label": "Examen 2",
          "shortLabel": "EX2",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 4,
          "note": ""
        }
      ]
    },
    {
      "id": "ta",
      "code": "TA",
      "aliases": [
        "TA"
      ],
      "name": "Trabajo académico",
      "universityCode": "1LIN16",
      "faculty": "EEGGCC",
      "credits": 3,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 10,
      "components": [
        {
          "id": "inf",
          "label": "Informe",
          "shortLabel": "INF",
          "total": 1,
          "keep": 1,
          "aggregation": "average",
          "precision": 1,
          "weight": 1,
          "note": ""
        },
        {
          "id": "a1",
          "label": "Primer avance",
          "shortLabel": "A1",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 1,
          "note": ""
        },
        {
          "id": "a2",
          "label": "Segundo avance",
          "shortLabel": "A2",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 1,
          "note": ""
        },
        {
          "id": "ex",
          "label": "Exámenes",
          "shortLabel": "EX",
          "total": 2,
          "keep": 2,
          "aggregation": "sum",
          "precision": null,
          "weight": 2,
          "note": ""
        },
        {
          "id": "tf",
          "label": "Trabajo final",
          "shortLabel": "TF",
          "total": 1,
          "keep": 1,
          "aggregation": "average",
          "precision": 1,
          "weight": 2,
          "note": ""
        },
        {
          "id": "ep",
          "label": "Evaluación permanente",
          "shortLabel": "EP",
          "total": 1,
          "keep": 1,
          "aggregation": "average",
          "precision": 1,
          "weight": 1,
          "note": ""
        }
      ]
    },
    {
      "id": "cfil",
      "code": "CFIL",
      "aliases": [
        "CFIL"
      ],
      "name": "Ciencia y filosofía",
      "universityCode": "1FIL01",
      "faculty": "EEGGCC",
      "credits": 3,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 10,
      "components": [
        {
          "id": "pc",
          "label": "Prácticas calificadas",
          "shortLabel": "PC",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 3,
          "note": ""
        },
        {
          "id": "deb",
          "label": "Debate",
          "shortLabel": "DEB",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 2,
          "note": ""
        },
        {
          "id": "ex1",
          "label": "Examen 1",
          "shortLabel": "EX1",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 2,
          "note": ""
        },
        {
          "id": "ex2",
          "label": "Examen 2",
          "shortLabel": "EX2",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 3,
          "note": ""
        }
      ]
    },
    {
      "id": "mylp",
      "code": "MYLP",
      "aliases": [
        "MYLP"
      ],
      "name": "Motivación y liderazgo personal",
      "universityCode": "1PSI02",
      "faculty": "EEGGCC",
      "credits": 2,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 20,
      "components": [
        {
          "id": "cl",
          "label": "Control de Lectura",
          "shortLabel": "CL",
          "total": 1,
          "keep": 1,
          "aggregation": "average",
          "precision": 1,
          "weight": 4,
          "note": ""
        },
        {
          "id": "par",
          "label": "Participación",
          "shortLabel": "PAR",
          "total": 1,
          "keep": 1,
          "aggregation": "average",
          "precision": 1,
          "weight": 5,
          "note": ""
        },
        {
          "id": "ex1",
          "label": "Examen 1",
          "shortLabel": "EX1",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 5,
          "note": ""
        },
        {
          "id": "ex2",
          "label": "Examen 2",
          "shortLabel": "EX2",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 6,
          "note": ""
        }
      ]
    },
    {
      "id": "fa1",
      "code": "FA1",
      "aliases": [
        "FA1"
      ],
      "name": "Física 1",
      "universityCode": "1FIS02",
      "faculty": "EEGGCC",
      "credits": 4.5,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 10,
      "components": [
        {
          "id": "pr",
          "label": "Prácticas",
          "shortLabel": "PR",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 3,
          "note": "Cada práctica es la suma de PC + PD, sobre 20."
        },
        {
          "id": "ex1",
          "label": "Examen 1",
          "shortLabel": "EX1",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 3,
          "note": ""
        },
        {
          "id": "ex2",
          "label": "Examen 2",
          "shortLabel": "EX2",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 4,
          "note": ""
        }
      ]
    },
    {
      "id": "fa2",
      "code": "FA2",
      "aliases": [
        "FA2"
      ],
      "name": "Física 2",
      "universityCode": "1FIS04",
      "faculty": "EEGGCC",
      "credits": 4.5,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 10,
      "components": [
        {
          "id": "pr",
          "label": "Prácticas",
          "shortLabel": "PR",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 4,
          "note": "Cada práctica es la suma de PC + PD, sobre 20."
        },
        {
          "id": "ex",
          "label": "Exámenes",
          "shortLabel": "EX",
          "total": 2,
          "keep": 2,
          "aggregation": "sum",
          "precision": null,
          "weight": 3,
          "note": ""
        }
      ]
    },
    {
      "id": "fa3",
      "code": "FA3",
      "aliases": [
        "FA3"
      ],
      "name": "Física 3",
      "universityCode": "1FIS06",
      "faculty": "EEGGCC",
      "credits": 4.5,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 10,
      "components": [
        {
          "id": "pr",
          "label": "Prácticas",
          "shortLabel": "PR",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 4,
          "note": "Cada práctica es la suma de PC + PD, sobre 20."
        },
        {
          "id": "ex",
          "label": "Exámenes",
          "shortLabel": "EX",
          "total": 2,
          "keep": 2,
          "aggregation": "sum",
          "precision": null,
          "weight": 3,
          "note": ""
        }
      ]
    },
    {
      "id": "labfa1",
      "code": "LABFA1",
      "aliases": [
        "LABFA1"
      ],
      "name": "Laboratorio de física 1",
      "universityCode": "1FIS03",
      "faculty": "EEGGCC",
      "credits": 0.5,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 1,
      "components": [
        {
          "id": "lab",
          "label": "Prácticas",
          "shortLabel": "LAB",
          "total": 6,
          "keep": 5,
          "aggregation": "average",
          "precision": 1,
          "weight": 1,
          "note": ""
        }
      ]
    },
    {
      "id": "calint",
      "code": "CALINT",
      "aliases": [
        "CALINT"
      ],
      "name": "Cálculo integral",
      "universityCode": "1MAT07",
      "faculty": "EEGGCC",
      "credits": 4.5,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 10,
      "components": [
        {
          "id": "pc",
          "label": "Prácticas calificadas",
          "shortLabel": "PC",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 3,
          "note": ""
        },
        {
          "id": "pd",
          "label": "Prácticas dirigidas",
          "shortLabel": "PD",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 1,
          "note": ""
        },
        {
          "id": "ex",
          "label": "Exámenes",
          "shortLabel": "EX",
          "total": 2,
          "keep": 2,
          "aggregation": "sum",
          "precision": null,
          "weight": 3,
          "note": ""
        }
      ]
    },
    {
      "id": "calva",
      "code": "CALVA",
      "aliases": [
        "CALVA"
      ],
      "name": "Cálculo en varias variables",
      "universityCode": "1MAT08",
      "faculty": "EEGGCC",
      "credits": 4.5,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 10,
      "components": [
        {
          "id": "pc",
          "label": "Prácticas calificadas",
          "shortLabel": "PC",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 3,
          "note": ""
        },
        {
          "id": "pd",
          "label": "Prácticas dirigidas",
          "shortLabel": "PD",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 1,
          "note": ""
        },
        {
          "id": "ex",
          "label": "Exámenes",
          "shortLabel": "EX",
          "total": 2,
          "keep": 2,
          "aggregation": "sum",
          "precision": null,
          "weight": 3,
          "note": ""
        }
      ]
    },
    {
      "id": "calvec",
      "code": "CALVEC",
      "aliases": [
        "CALVEC"
      ],
      "name": "Cálculo vectorial",
      "universityCode": "1MAT23",
      "faculty": "EEGGCC",
      "credits": 4.5,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 10,
      "components": [
        {
          "id": "pc",
          "label": "Prácticas calificadas",
          "shortLabel": "PC",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 3,
          "note": ""
        },
        {
          "id": "pd",
          "label": "Prácticas dirigidas",
          "shortLabel": "PD",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 1,
          "note": ""
        },
        {
          "id": "ex",
          "label": "Exámenes",
          "shortLabel": "EX",
          "total": 2,
          "keep": 2,
          "aggregation": "sum",
          "precision": null,
          "weight": 3,
          "note": ""
        }
      ]
    },
    {
      "id": "funpro",
      "code": "FUNPRO",
      "aliases": [
        "FUNPRO"
      ],
      "name": "Fundamentos de programación",
      "universityCode": "1INF01",
      "faculty": "EEGGCC",
      "credits": 3,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 10,
      "components": [
        {
          "id": "lab",
          "label": "Laboratorios",
          "shortLabel": "LAB",
          "total": 10,
          "keep": 9,
          "aggregation": "average",
          "precision": 1,
          "weight": 5,
          "note": ""
        },
        {
          "id": "ex1",
          "label": "Examen 1",
          "shortLabel": "EX1",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 2,
          "note": ""
        },
        {
          "id": "ex2",
          "label": "Examen 2",
          "shortLabel": "EX2",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 3,
          "note": ""
        }
      ]
    },
    {
      "id": "tecpro",
      "code": "TECPRO",
      "aliases": [
        "TP"
      ],
      "name": "Técnicas de programación",
      "universityCode": "1INF02",
      "faculty": "EEGGCC",
      "credits": 3,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 3,
      "components": [
        {
          "id": "lab",
          "label": "Laboratorios",
          "shortLabel": "LAB",
          "total": 10,
          "keep": 9,
          "aggregation": "average",
          "precision": 1,
          "weight": 1,
          "note": ""
        },
        {
          "id": "ex1",
          "label": "Examen 1",
          "shortLabel": "EX1",
          "total": 1,
          "keep": 1,
          "aggregation": "average",
          "precision": 1,
          "weight": 1,
          "note": ""
        },
        {
          "id": "ex2",
          "label": "Examen 2",
          "shortLabel": "EX2",
          "total": 1,
          "keep": 1,
          "aggregation": "average",
          "precision": 1,
          "weight": 1,
          "note": ""
        }
      ]
    },
    {
      "id": "labfa2",
      "code": "LABFA2",
      "aliases": [
        "LABFA2"
      ],
      "name": "Laboratorio de física 2",
      "universityCode": "1FIS04",
      "faculty": "EEGGCC",
      "credits": 0.5,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 1,
      "components": [
        {
          "id": "lab",
          "label": "Prácticas",
          "shortLabel": "LAB",
          "total": 6,
          "keep": 5,
          "aggregation": "average",
          "precision": 1,
          "weight": 1,
          "note": ""
        }
      ]
    },
    {
      "id": "labfa3",
      "code": "LABFA3",
      "aliases": [
        "LABFA3"
      ],
      "name": "Laboratorio de física 3",
      "universityCode": "1FIS07",
      "faculty": "EEGGCC",
      "credits": 0.5,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 1,
      "components": [
        {
          "id": "lab",
          "label": "Prácticas",
          "shortLabel": "LAB",
          "total": 6,
          "keep": 5,
          "aggregation": "average",
          "precision": 1,
          "weight": 1,
          "note": ""
        }
      ]
    },
    {
      "id": "cala",
      "code": "CALA",
      "aliases": [
        "CALA"
      ],
      "name": "Cálculo Aplicado",
      "universityCode": "1MAT09",
      "faculty": "EEGGCC",
      "credits": 4.5,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 10,
      "components": [
        {
          "id": "pc",
          "label": "Prácticas calificadas",
          "shortLabel": "PC",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 3,
          "note": ""
        },
        {
          "id": "pd",
          "label": "Prácticas dirigidas",
          "shortLabel": "PD",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 1,
          "note": ""
        },
        {
          "id": "ex",
          "label": "Exámenes",
          "shortLabel": "EX",
          "total": 2,
          "keep": 2,
          "aggregation": "sum",
          "precision": null,
          "weight": 3,
          "note": ""
        }
      ]
    },
    {
      "id": "estatica",
      "code": "ESTATICA",
      "aliases": [
        "ESTATICA"
      ],
      "name": "Estática",
      "universityCode": "ING135",
      "faculty": "EEGGCC",
      "credits": 5,
      "publicationId": null,
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 10,
      "components": [
        {
          "id": "pr",
          "label": "Prácticas",
          "shortLabel": "PR",
          "total": 7,
          "keep": 6,
          "aggregation": "average",
          "precision": 1,
          "weight": 3,
          "note": ""
        },
        {
          "id": "ex1",
          "label": "Examen 1",
          "shortLabel": "EX1",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 3,
          "note": ""
        },
        {
          "id": "ex2",
          "label": "Examen 2",
          "shortLabel": "EX2",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 4,
          "note": ""
        }
      ]
    },
    {
      "id": "np-124",
      "code": "1QUI39",
      "aliases": [],
      "name": "Biología general",
      "universityCode": "1QUI39",
      "faculty": "EEGGCC",
      "publicationId": "124",
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 2,
      "finalMode": "round",
      "divisor": 10,
      "components": [
        {
          "id": "e1",
          "label": "Exámenes",
          "shortLabel": "E1",
          "total": 2,
          "keep": 2,
          "aggregation": "average",
          "precision": 1,
          "weight": 6,
          "note": ""
        },
        {
          "id": "e2",
          "label": "Laboratorios",
          "shortLabel": "E2",
          "total": 6,
          "keep": 6,
          "aggregation": "average",
          "precision": 1,
          "weight": 4,
          "note": ""
        }
      ]
    },
    {
      "id": "np-106",
      "code": "1CDR01",
      "aliases": [],
      "name": "Cultura y cristianismo",
      "universityCode": "1CDR01",
      "faculty": "EEGGCC",
      "publicationId": "106",
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 10,
      "components": [
        {
          "id": "e1",
          "label": "Prácticas (PCs)",
          "shortLabel": "PCs",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 3,
          "note": ""
        },
        {
          "id": "e2",
          "label": "Examen 1",
          "shortLabel": "E2",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 3,
          "note": ""
        },
        {
          "id": "e3",
          "label": "Examen 2",
          "shortLabel": "E3",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 4,
          "note": ""
        }
      ]
    },
    {
      "id": "np-85",
      "code": "RI",
      "aliases": [
        "RI"
      ],
      "name": "Retos de Ingeniería",
      "universityCode": "1ING16",
      "faculty": "EEGGCC",
      "publicationId": "85",
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 0,
      "finalMode": "round",
      "divisor": 10,
      "components": [
        {
          "id": "e1",
          "label": "Prácticas calificadas (PCs)",
          "shortLabel": "PCs",
          "total": 11,
          "keep": 10,
          "aggregation": "average",
          "precision": 1,
          "weight": 6,
          "note": ""
        },
        {
          "id": "e2",
          "label": "Exámenes",
          "shortLabel": "E2",
          "total": 2,
          "keep": 2,
          "aggregation": "sum",
          "precision": null,
          "weight": 2,
          "note": ""
        }
      ]
    },
    {
      "id": "np-51",
      "code": "IEE148",
      "aliases": [],
      "name": "Circuitos Eléctricos 1",
      "universityCode": "IEE148",
      "faculty": "EEGGCC",
      "publicationId": "51",
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 20,
      "components": [
        {
          "id": "e1",
          "label": "Prácticas (Pa)",
          "shortLabel": "Pa",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 5,
          "note": ""
        },
        {
          "id": "e2",
          "label": "Laboratorios (Pb)",
          "shortLabel": "Pb",
          "total": 5,
          "keep": 4,
          "aggregation": "average",
          "precision": 1,
          "weight": 3,
          "note": ""
        },
        {
          "id": "e3",
          "label": "Exámenes (Ex)",
          "shortLabel": "Ex",
          "total": 2,
          "keep": 2,
          "aggregation": "sum",
          "precision": null,
          "weight": 6,
          "note": ""
        }
      ]
    },
    {
      "id": "np-20",
      "code": "CDR121",
      "aliases": [],
      "name": "Ciencia, ética y cristianismo",
      "universityCode": "CDR121",
      "faculty": "EEGGCC",
      "publicationId": "20",
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 0,
      "finalMode": "round",
      "divisor": 100,
      "components": [
        {
          "id": "e1",
          "label": "Prácticas calificadas (Pr)",
          "shortLabel": "Pr",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 30,
          "note": ""
        },
        {
          "id": "e2",
          "label": "Examen 1",
          "shortLabel": "E2",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 30,
          "note": ""
        },
        {
          "id": "e3",
          "label": "Examen 2",
          "shortLabel": "E3",
          "total": 1,
          "keep": 1,
          "aggregation": "average",
          "precision": 0,
          "weight": 40,
          "note": ""
        }
      ]
    },
    {
      "id": "np-19",
      "code": "1PSI04",
      "aliases": [],
      "name": "Psicología",
      "universityCode": "1PSI04",
      "faculty": "EEGGCC",
      "publicationId": "19",
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 0,
      "finalMode": "round",
      "divisor": 100,
      "components": [
        {
          "id": "e1",
          "label": "Prácticas calificadas (Ep)",
          "shortLabel": "Ep",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 40,
          "note": ""
        },
        {
          "id": "e2",
          "label": "Participación (Pn)",
          "shortLabel": "Pn",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 10,
          "note": ""
        },
        {
          "id": "e3",
          "label": "Examen 1",
          "shortLabel": "E3",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 20,
          "note": ""
        },
        {
          "id": "e4",
          "label": "Sustentación oral (So)",
          "shortLabel": "So",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 30,
          "note": ""
        }
      ]
    },
    {
      "id": "np-17",
      "code": "1IEE06",
      "aliases": [],
      "name": "Arquitectura de computadoras",
      "universityCode": "1IEE06",
      "faculty": "Ciencias e Ingeniería",
      "publicationId": "17",
      "summary": "Ciencias e Ingeniería. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 1,
      "finalMode": "round",
      "divisor": 100,
      "components": [
        {
          "id": "e1",
          "label": "Prácticas calificadas (Pb)",
          "shortLabel": "Pb",
          "total": 12,
          "keep": 11,
          "aggregation": "average",
          "precision": 1,
          "weight": 50,
          "note": ""
        },
        {
          "id": "e2",
          "label": "Examen 1",
          "shortLabel": "E2",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 25,
          "note": ""
        },
        {
          "id": "e3",
          "label": "Examen 2",
          "shortLabel": "E3",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 25,
          "note": ""
        }
      ]
    },
    {
      "id": "np-18",
      "code": "INF134",
      "aliases": [],
      "name": "Estructuras Discretas",
      "universityCode": "INF134",
      "faculty": "EEGGCC",
      "publicationId": "18",
      "summary": "Estudios Generales Ciencias. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 0,
      "finalMode": "round",
      "divisor": 100,
      "components": [
        {
          "id": "e1",
          "label": "Prácticas calificadas (PCs)",
          "shortLabel": "PCs",
          "total": 4,
          "keep": 3,
          "aggregation": "average",
          "precision": 1,
          "weight": 30,
          "note": ""
        },
        {
          "id": "e2",
          "label": "Examen 1",
          "shortLabel": "E2",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 30,
          "note": ""
        },
        {
          "id": "e3",
          "label": "Examen 2",
          "shortLabel": "E3",
          "total": 1,
          "keep": 1,
          "aggregation": "sum",
          "precision": null,
          "weight": 40,
          "note": ""
        }
      ]
    },
    {
      "id": "np-16",
      "code": "1INF24",
      "aliases": [],
      "name": "Inteligencia Artificial",
      "universityCode": "1INF24",
      "faculty": "Ciencias e Ingeniería",
      "publicationId": "16",
      "summary": "Ciencias e Ingeniería. Verifica las reglas con tu sílabo.",
      "passGrade": 11,
      "finalPrecision": 0,
      "finalMode": "round",
      "divisor": 14,
      "components": [
        {
          "id": "e1",
          "label": "Prácticas",
          "shortLabel": "E1",
          "total": 5,
          "keep": 5,
          "aggregation": "average",
          "precision": 1,
          "weight": 4,
          "note": ""
        },
        {
          "id": "e2",
          "label": "Tarea académica",
          "shortLabel": "E2",
          "total": 1,
          "keep": 1,
          "aggregation": "average",
          "precision": 0,
          "weight": 4,
          "note": ""
        },
        {
          "id": "e3",
          "label": "Exámenes",
          "shortLabel": "E3",
          "total": 2,
          "keep": 2,
          "aggregation": "sum",
          "precision": null,
          "weight": 3,
          "note": ""
        }
      ]
    }
  ]
};
  if (typeof module === "object" && module.exports) module.exports = catalog;
  else root.CourseCatalog = catalog;
})(typeof globalThis !== "undefined" ? globalThis : this);
