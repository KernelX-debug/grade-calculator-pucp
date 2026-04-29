const STORAGE_KEY = "notas-pucp-ciencias-v5";

function topListComponent(id, label, total, keep, weight, shortLabel, note) {
  return { id, label, type: "top-list", total, keep, weight, shortLabel, note };
}

function singleComponent(id, label, weight, shortLabel, note) {
  return { id, label, type: "single", total: 1, keep: 1, weight, shortLabel, note };
}

function groupComponent(id, label, total, weight, shortLabel, note) {
  return { id, label, type: "group", total, keep: total, weight, shortLabel, note };
}

function mathCommonCourse(id, code, name) {
  return {
    id,
    code,
    name,
    summary: "Curso con practicas calificadas, practicas dirigidas y un bloque de examenes.",
    formulaText: "[3(PC mejores 3/4) + 1(PD mejores 3/4) + 3(promedio de 2 examenes) + 3(promedio de 2 examenes)] / 10",
    formulaCompact: "[3 * PC + 1 * PD + 6 * EX] / 10",
    divisor: 10,
    components: [
      topListComponent("pc", "Practicas calificadas", 4, 3, 3, "PC"),
      topListComponent("pd", "Practicas dirigidas", 4, 3, 1, "PD"),
      groupComponent("ex", "Examenes", 2, 6, "EX")
    ]
  };
}

function labPhysicsCourse(id, code, name) {
  return {
    id,
    code,
    name,
    summary: "El promedio se calcula con las 5 practicas mas altas sobre un total de 6.",
    formulaText: "[1(promedio de las cinco practicas con mayor nota de un total de 6 practicas)] / 1",
    formulaCompact: "[1 * LAB] / 1",
    divisor: 1,
    components: [
      topListComponent("lab", "Practicas", 6, 5, 1, "LAB")
    ]
  };
}

const courses = [
  mathCommonCourse("amga", "AMGA", "Algebra Matricial y Geometria Analitica"),
  {
    id: "coac",
    code: "COAC",
    name: "Comunicacion Academica",
    summary: "Incluye practicas, trabajo final, evaluacion permanente y un bloque de examenes.",
    formulaText: "[4(PC mejores 4/5) + 1(Trabajo final) + 1(Evaluacion permanente) + 2(promedio de 2 examenes) + 2(promedio de 2 examenes)] / 10",
    formulaCompact: "[4 * PC + 1 * TF + 1 * EP + 4 * EX] / 10",
    divisor: 10,
    components: [
      topListComponent("pc", "Practicas calificadas", 5, 4, 4, "PC"),
      singleComponent("tf", "Trabajo final", 1, "TF"),
      singleComponent("ep", "Evaluacion permanente", 1, "EP"),
      groupComponent("ex", "Examenes", 2, 4, "EX")
    ]
  },
  {
    id: "qui1",
    code: "QUI1",
    name: "Quimica 1",
    summary: "Usa practicas calificadas, practicas dirigidas y un bloque de examenes.",
    formulaText: "[5(PC mejores 3/4) + 3(PD mejores 3/4) + 6(promedio de 2 examenes) + 6(promedio de 2 examenes)] / 20",
    formulaCompact: "[5 * PC + 3 * PD + 12 * EX] / 20",
    divisor: 20,
    components: [
      topListComponent("pc", "Practicas calificadas", 4, 3, 5, "PC"),
      topListComponent("pd", "Practicas dirigidas", 4, 3, 3, "PD"),
      groupComponent("ex", "Examenes", 2, 12, "EX")
    ]
  },
  {
    id: "labqui1",
    code: "LABQUI1",
    name: "Laboratorio de Quimica 1",
    summary: "Considera solo las 5 mejores practicas del laboratorio.",
    formulaText: "[1(promedio de las cinco practicas con mayor nota de un total de 6 practicas)] / 1",
    formulaCompact: "[1 * LAB] / 1",
    divisor: 1,
    components: [
      topListComponent("lab", "Practicas", 6, 5, 1, "LAB")
    ]
  },
  mathCommonCourse("fucal", "FUCAL", "Fundamentos de Calculo"),
  {
    id: "fufis",
    code: "FUFIS",
    name: "Fundamentos de Fisica",
    summary: "Curso con practicas calificadas y un bloque de examenes.",
    formulaText: "[4(PC mejores 4/5) + 3(promedio de 2 examenes) + 3(promedio de 2 examenes)] / 10",
    formulaCompact: "[4 * PC + 6 * EX] / 10",
    divisor: 10,
    components: [
      topListComponent("pc", "Practicas calificadas", 5, 4, 4, "PC"),
      groupComponent("ex", "Examenes", 2, 6, "EX")
    ]
  },
  mathCommonCourse("caldif", "CALDIF", "Calculo Diferencial"),
  mathCommonCourse("calint", "CALINT", "Calculo Integral"),
  mathCommonCourse("calva", "CALVA", "Calculo en Varias Variables"),
  mathCommonCourse("calvec", "CALVEC", "Calculo Vectorial"),
  mathCommonCourse("cala", "CALA", "Calculo Aplicado"),
  {
    id: "dibujo",
    code: "DIBUJO",
    name: "Dibujo en Ingenieria",
    summary: "Combina practicas calificadas, practicas dirigidas y dos examenes individuales.",
    formulaText: "[3(PC mejores 5/6) + 2(PD mejores 12/14) + 3(nota del primer examen) + 4(nota del segundo examen)] / 12",
    formulaCompact: "[3 * PC + 2 * PD + 3 * EX1 + 4 * EX2] / 12",
    divisor: 12,
    components: [
      topListComponent("pc", "Practicas calificadas", 6, 5, 3, "PC"),
      topListComponent("pd", "Practicas dirigidas", 14, 12, 2, "PD"),
      singleComponent("ex1", "Primer examen", 3, "EX1"),
      singleComponent("ex2", "Segundo examen", 4, "EX2")
    ]
  },
  {
    id: "ta",
    code: "TA",
    name: "Trabajo Academico",
    summary: "Incluye informe, avances, examenes, trabajo final y evaluacion permanente.",
    formulaText: "[1(nota del informe) + 1(primer avance) + 1(segundo avance) + 2(promedio de 2 examenes) + 2(promedio de 2 examenes) + 2(nota del trabajo final) + 1(evaluacion permanente)] / 10",
    formulaCompact: "[1 * INF + 1 * A1 + 1 * A2 + 4 * EX + 2 * TF + 1 * EP] / 10",
    divisor: 10,
    components: [
      singleComponent("inf", "Informe", 1, "INF"),
      singleComponent("a1", "Primer avance", 1, "A1"),
      singleComponent("a2", "Segundo avance", 1, "A2"),
      groupComponent("ex", "Examenes", 2, 4, "EX"),
      singleComponent("tf", "Trabajo final", 2, "TF"),
      singleComponent("ep", "Evaluacion permanente", 1, "EP")
    ]
  },
  {
    id: "cfil",
    code: "CFIL",
    name: "Ciencia y Filosofia",
    summary: "Incluye practicas calificadas, debate y dos examenes individuales.",
    formulaText: "[3(PC mejores 3/4) + 2(nota de debate) + 2(nota del primer examen) + 3(nota del segundo examen)] / 10",
    formulaCompact: "[3 * PC + 2 * DEB + 2 * EX1 + 3 * EX2] / 10",
    divisor: 10,
    components: [
      topListComponent("pc", "Practicas calificadas", 4, 3, 3, "PC"),
      singleComponent("deb", "Nota de debate", 2, "DEB"),
      singleComponent("ex1", "Primer examen", 2, "EX1"),
      singleComponent("ex2", "Segundo examen", 3, "EX2")
    ]
  },
  {
    id: "mylp",
    code: "MYLP",
    name: "Motivacion y Liderazgo Personal",
    summary: "Control de lectura, participacion y dos examenes individuales.",
    formulaText: "[4(control de lectura) + 5(participacion) + 5(primer examen) + 6(segundo examen)] / 20",
    formulaCompact: "[4 * CL + 5 * PAR + 5 * EX1 + 6 * EX2] / 20",
    divisor: 20,
    components: [
      singleComponent("cl", "Control de lectura", 4, "CL"),
      singleComponent("par", "Participacion", 5, "PAR"),
      singleComponent("ex1", "Primer examen", 5, "EX1"),
      singleComponent("ex2", "Segundo examen", 6, "EX2")
    ]
  },
  {
    id: "fa1",
    code: "FA1",
    name: "Fisica 1",
    summary: "Cada practica debe ingresarse ya sumada como PC + PD sobre 20.",
    formulaText: "[3(promedio de las tres practicas con mayor nota de un total de 4 practicas) + 3(nota del primer examen) + 4(nota del segundo examen)] / 10",
    formulaCompact: "[3 * PR + 3 * EX1 + 4 * EX2] / 10",
    divisor: 10,
    components: [
      topListComponent("pr", "Practicas", 4, 3, 3, "PR", "Cada practica debe ingresarse como la suma de PC + PD, con maximo 20."),
      singleComponent("ex1", "Primer examen", 3, "EX1"),
      singleComponent("ex2", "Segundo examen", 4, "EX2")
    ]
  },
  {
    id: "fa2",
    code: "FA2",
    name: "Fisica 2",
    summary: "Cada practica debe ingresarse ya sumada como PC + PD sobre 20.",
    formulaText: "[4(promedio de las tres practicas con mayor nota de un total de 4 practicas) + 3(promedio de 2 examenes) + 3(promedio de 2 examenes)] / 10",
    formulaCompact: "[4 * PR + 6 * EX] / 10",
    divisor: 10,
    components: [
      topListComponent("pr", "Practicas", 4, 3, 4, "PR", "Cada practica debe ingresarse como la suma de PC + PD, con maximo 20."),
      groupComponent("ex", "Examenes", 2, 6, "EX")
    ]
  },
  {
    id: "fa3",
    code: "FA3",
    name: "Fisica 3",
    summary: "Cada practica debe ingresarse ya sumada como PC + PD sobre 20.",
    formulaText: "[4(promedio de las tres practicas con mayor nota de un total de 4 practicas) + 3(promedio de 2 examenes) + 3(promedio de 2 examenes)] / 10",
    formulaCompact: "[4 * PR + 6 * EX] / 10",
    divisor: 10,
    components: [
      topListComponent("pr", "Practicas", 4, 3, 4, "PR", "Cada practica debe ingresarse como la suma de PC + PD, con maximo 20."),
      groupComponent("ex", "Examenes", 2, 6, "EX")
    ]
  },
  labPhysicsCourse("labfa1", "LABFA1", "Laboratorio de Fisica 1"),
  labPhysicsCourse("labfa2", "LABFA2", "Laboratorio de Fisica 2"),
  labPhysicsCourse("labfa3", "LABFA3", "Laboratorio de Fisica 3"),
  {
    id: "estatica",
    code: "ESTATICA",
    name: "Estatica",
    summary: "Incluye practicas y dos examenes individuales.",
    formulaText: "[3(promedio de las siete practicas con mayor nota de un total de 8 practicas) + 3(nota del primer examen) + 4(nota del segundo examen)] / 10",
    formulaCompact: "[3 * PR + 3 * EX1 + 4 * EX2] / 10",
    divisor: 10,
    components: [
      topListComponent("pr", "Practicas", 8, 7, 3, "PR"),
      singleComponent("ex1", "Primer examen", 3, "EX1"),
      singleComponent("ex2", "Segundo examen", 4, "EX2")
    ]
  },
  {
    id: "funpro",
    code: "FUNPRO",
    name: "Fundamentos de Programacion",
    summary: "Usa laboratorios y dos examenes individuales.",
    formulaText: "[5(promedio de los nueve laboratorios con mayor nota de un total de 10 laboratorios) + 2(nota del primer examen) + 3(nota del segundo examen)] / 10",
    formulaCompact: "[5 * LAB + 2 * EX1 + 3 * EX2] / 10",
    divisor: 10,
    components: [
      topListComponent("lab", "Laboratorios", 10, 9, 5, "LAB"),
      singleComponent("ex1", "Primer examen", 2, "EX1"),
      singleComponent("ex2", "Segundo examen", 3, "EX2")
    ]
  },
  {
    id: "tecpro",
    code: "TECPRO",
    name: "Tecnicas de Programacion",
    summary: "Usa laboratorios y dos examenes individuales.",
    formulaText: "[1(promedio de los nueve laboratorios con mayor nota de un total de 10 laboratorios) + 1(nota del primer examen) + 1(nota del segundo examen)] / 3",
    formulaCompact: "[1 * LAB + 1 * EX1 + 1 * EX2] / 3",
    divisor: 3,
    components: [
      topListComponent("lab", "Laboratorios", 10, 9, 1, "LAB"),
      singleComponent("ex1", "Primer examen", 1, "EX1"),
      singleComponent("ex2", "Segundo examen", 1, "EX2")
    ]
  }
];

const state = loadState();
state.selectedCourseId = state.selectedCourseId || courses[0].id;
state.activeScreen = state.activeScreen || "calculator";
state.theme = state.theme || "light";
state.values = state.values || {};
state.target = state.target || "11";
state.courseQuery = state.courseQuery || "";
state.menuOpen = false;

const els = {
  body: document.body,
  courseCode: document.querySelector("#course-code"),
  courseName: document.querySelector("#course-name"),
  courseSummary: document.querySelector("#course-summary"),
  courseSearch: document.querySelector("#course-search"),
  courseList: document.querySelector("#course-list"),
  calculatorContent: document.querySelector("#calculator-content"),
  exactGrade: document.querySelector("#exact-grade"),
  officialGrade: document.querySelector("#official-grade"),
  statusCopy: document.querySelector("#status-copy"),
  statusLabel: document.querySelector("#status-label"),
  statusDetail: document.querySelector("#status-detail"),
  targetGrade: document.querySelector("#target-grade"),
  pendingSelect: document.querySelector("#pending-select"),
  neededGrade: document.querySelector("#needed-grade"),
  neededCopy: document.querySelector("#needed-copy"),
  formulaLibrary: document.querySelector("#formula-library"),
  clearCourse: document.querySelector("#clear-course"),
  clearCurrentSettings: document.querySelector("#clear-current-settings"),
  clearAllSettings: document.querySelector("#clear-all-settings"),
  menuToggle: document.querySelector("#menu-toggle"),
  menuLayer: document.querySelector("#menu-layer"),
  menuDismiss: document.querySelector("#menu-dismiss"),
  menuNavItems: Array.from(document.querySelectorAll("[data-nav-target]")),
  screens: Array.from(document.querySelectorAll("[data-screen]")),
  themeOptions: Array.from(document.querySelectorAll("[data-theme]")),
  quickThemeToggle: document.querySelector("#quick-theme-toggle"),
  quickThemeIcon: document.querySelector("#quick-theme-icon")
};

init();

function init() {
  applyTheme();
  attachGlobalEvents();
  renderCourseList();
  renderFormulaLibrary();
  renderCurrentCourse();
  renderActiveScreen();
}

function attachGlobalEvents() {
  els.clearCourse.addEventListener("click", clearCurrentCourse);
  els.clearCurrentSettings.addEventListener("click", clearCurrentCourse);

  els.clearAllSettings.addEventListener("click", () => {
    state.values = {};
    state.target = "11";
    state.theme = "light";
    state.activeScreen = "calculator";
    state.selectedCourseId = courses[0].id;
    state.courseQuery = "";
    persistState();
    els.targetGrade.value = state.target;
    els.courseSearch.value = state.courseQuery;
    applyTheme();
    renderCourseList();
    renderCurrentCourse();
    renderActiveScreen();
  });

  els.targetGrade.value = state.target;
  els.targetGrade.addEventListener("input", () => {
    state.target = sanitizeIntegerText(els.targetGrade.value, 11);
    persistState();
    updateSummaryForCurrentCourse();
  });

  els.targetGrade.addEventListener("blur", () => {
    const normalized = String(clampInteger(state.target || "11", 0, 20));
    state.target = normalized;
    els.targetGrade.value = normalized;
    persistState();
    updateSummaryForCurrentCourse();
  });

  els.pendingSelect.addEventListener("change", updateSummaryForCurrentCourse);

  els.courseSearch.value = state.courseQuery;
  els.courseSearch.addEventListener("input", () => {
    state.courseQuery = els.courseSearch.value;
    persistState();
    renderCourseList();
  });

  els.themeOptions.forEach((button) => {
    button.addEventListener("click", () => {
      state.theme = button.dataset.theme;
      persistState();
      applyTheme();
    });
  });

  els.quickThemeToggle.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    persistState();
    applyTheme();
  });

  els.menuToggle.addEventListener("click", () => {
    state.menuOpen = !state.menuOpen;
    renderMenu();
  });

  els.menuDismiss.addEventListener("click", () => {
    state.menuOpen = false;
    renderMenu();
  });

  els.menuNavItems.forEach((button) => {
    button.addEventListener("click", () => {
      state.activeScreen = button.dataset.navTarget;
      state.menuOpen = false;
      persistState();
      renderMenu();
      renderActiveScreen();
    });
  });
}

function renderMenu() {
  els.menuLayer.hidden = !state.menuOpen;
  els.menuToggle.setAttribute("aria-expanded", state.menuOpen ? "true" : "false");
}

function renderCourseList() {
  const query = normalizeText(state.courseQuery);
  const filtered = courses.filter((course) => {
    const haystack = normalizeText(`${course.code} ${course.name}`);
    return !query || haystack.includes(query);
  });

  els.courseList.innerHTML = filtered.length
    ? filtered.map((course) => `
        <button class="course-chip ${course.id === state.selectedCourseId ? "active" : ""}" type="button" data-course-id="${course.id}">
          <small>${course.code}</small>
          <strong>${escapeHtml(course.name)}</strong>
        </button>
      `).join("")
    : `<div class="empty-state">No se encontraron cursos con ese filtro.</div>`;

  Array.from(els.courseList.querySelectorAll("[data-course-id]"))
    .forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedCourseId = button.dataset.courseId;
        persistState();
        renderCourseList();
        renderCurrentCourse();
      });
    });
}

function renderCurrentCourse() {
  const course = getSelectedCourse();
  const values = getCourseValues(course.id);

  els.courseCode.textContent = course.code;
  els.courseName.textContent = course.name;
  els.courseSummary.textContent = course.summary;

  els.calculatorContent.innerHTML = course.components
    .map((component) => renderComponentCard(component, values))
    .join("");

  attachCourseInputEvents(course);
  updateSummaryForCurrentCourse();
}

function attachCourseInputEvents(course) {
  Array.from(els.calculatorContent.querySelectorAll("[data-input-key]"))
    .forEach((input) => {
      input.addEventListener("input", () => {
        setCourseValue(course.id, input.dataset.inputKey, input.value);
        updateSummaryForCurrentCourse();
      });

      input.addEventListener("blur", () => {
        const key = input.dataset.inputKey;
        const mode = input.dataset.mode;
        const limit = Number.parseInt(input.dataset.limit, 10);
        const normalized = mode === "single"
          ? normalizeSingleText(input.value)
          : normalizeGroupText(input.value, limit);
        input.value = normalized;
        setCourseValue(course.id, key, normalized);
        updateSummaryForCurrentCourse();
      });
    });
}

function renderComponentCard(component, values) {
  const helper = buildComponentHelper(component);
  const value = values[component.id] ?? "";

  return `
    <article class="component-card" data-component-id="${component.id}">
      <div class="component-head">
        <div>
          <h3>${escapeHtml(component.label)}</h3>
          <p class="component-note">${escapeHtml(helper)}</p>
        </div>
        <span class="stat-chip" data-stat-for="${component.id}">0/${component.total}</span>
      </div>
      <label class="field">
        <span>${escapeHtml(component.type === "single" ? "Nota" : "Notas")}</span>
        <input
          data-input-key="${component.id}"
          data-mode="${component.type === "single" ? "single" : "group"}"
          data-limit="${component.total}"
          type="text"
          inputmode="decimal"
          autocomplete="off"
          placeholder="${escapeHtml(buildPlaceholder(component))}"
          value="${escapeHtml(value)}"
        />
      </label>
    </article>
  `;
}

function renderFormulaLibrary() {
  els.formulaLibrary.innerHTML = courses
    .map((course) => {
      const details = course.components.map((component) => {
        if (component.type === "top-list") {
          return `<li>${component.label}: se toman las ${component.keep} mejores notas de ${component.total}.</li>`;
        }
        if (component.type === "group") {
          return `<li>${component.label}: se promedian ${component.total} notas como un solo bloque.</li>`;
        }
        return `<li>${component.label}: bloque individual con peso ${component.weight}.</li>`;
      }).join("");

      return `
        <article class="formula-card">
          <div>
            <span class="section-tag">${course.code}</span>
            <h3>${escapeHtml(course.name)}</h3>
          </div>
          <p>${escapeHtml(course.summary)}</p>
          <p class="formula-expression">${escapeHtml(course.formulaText)}</p>
          <p class="component-note">Forma compacta: ${escapeHtml(course.formulaCompact)}</p>
          <ul class="formula-list">${details}</ul>
        </article>
      `;
    })
    .join("");
}

function renderActiveScreen() {
  els.screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === state.activeScreen);
  });

  els.menuNavItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.navTarget === state.activeScreen);
  });
}

function updateSummaryForCurrentCourse() {
  const course = getSelectedCourse();
  const values = getCourseValues(course.id);
  const result = computeCourse(course, values);

  updateComponentStats(course, result);
  renderPendingOptions(course, result);
  renderResults(result);
  renderNeededGrade(course, result);
}

function updateComponentStats(course, result) {
  course.components.forEach((component) => {
    const stat = result.componentMap[component.id];
    const host = els.calculatorContent.querySelector(`[data-stat-for="${component.id}"]`);
    if (!host) {
      return;
    }
    host.textContent = `${stat.entered}/${stat.total} | ${stat.value.toFixed(2)}`;
  });
}

function renderPendingOptions(course, result) {
  const pendingComponents = course.components.filter((component) => result.componentMap[component.id].entered < component.total);
  const previous = els.pendingSelect.value;

  els.pendingSelect.innerHTML = pendingComponents.length
    ? pendingComponents.map((component) => {
        const stat = result.componentMap[component.id];
        return `<option value="${component.id}">${escapeHtml(component.label)} (${stat.entered}/${stat.total})</option>`;
      }).join("")
    : `<option value="">Curso completo</option>`;

  if (pendingComponents.some((component) => component.id === previous)) {
    els.pendingSelect.value = previous;
  }
}

function renderResults(result) {
  els.exactGrade.textContent = result.exact.toFixed(2);
  els.officialGrade.textContent = String(result.official);

  if (result.official >= 11) {
    els.statusLabel.textContent = "Aprobado";
    els.statusCopy.textContent = "Tu nota oficial ya alcanza o supera 11.";
    els.statusDetail.textContent = "El redondeo final se mantiene aprobado.";
    return;
  }

  els.statusLabel.textContent = "Desaprobado";
  els.statusCopy.textContent = "Con las notas registradas, incluyendo vacios como 0, aun no llegas a 11.";
  els.statusDetail.textContent = "La nota minima aprobatoria es 11.";
}

function renderNeededGrade(course, result) {
  const target = clampInteger(state.target || "11", 0, 20);
  const pendingComponentId = els.pendingSelect.value;
  const pendingComponents = course.components.filter((component) => result.componentMap[component.id].entered < component.total);

  if (!pendingComponentId || !pendingComponents.length) {
    els.neededGrade.textContent = "--";
    els.neededCopy.textContent = "Ya no quedan bloques pendientes por estimar en este curso.";
    return;
  }

  const otherPending = pendingComponents.filter((component) => component.id !== pendingComponentId);
  if (otherPending.length) {
    els.neededGrade.textContent = "--";
    els.neededCopy.textContent = `Completa primero los otros bloques pendientes: ${otherPending.map((component) => component.label).join(", ")}. Luego podre estimar este bloque con precision.`;
    return;
  }

  const required = findMinimumNeeded(course, pendingComponentId, target);
  if (required == null) {
    els.neededGrade.textContent = "--";
    els.neededCopy.textContent = "Aunque completes ese bloque, la meta indicada no se alcanza solo con las notas restantes.";
    return;
  }

  const selected = course.components.find((component) => component.id === pendingComponentId);
  const missingCount = result.componentMap[pendingComponentId].total - result.componentMap[pendingComponentId].entered;
  els.neededGrade.textContent = required.toFixed(1);
  els.neededCopy.textContent = `Necesitas promediar ${required.toFixed(1)} en las ${missingCount} nota(s) restantes de ${selected.label.toLowerCase()} para llegar a ${target}.`;
}

function computeCourse(course, values) {
  const componentMap = {};

  course.components.forEach((component) => {
    componentMap[component.id] = computeComponent(component, values);
  });

  const exact = course.components.reduce(
    (sum, component) => sum + componentMap[component.id].value * component.weight,
    0
  ) / course.divisor;

  return {
    componentMap,
    exact,
    official: Math.round(exact)
  };
}

function computeComponent(component, values) {
  const grades = getEnteredGrades(component, values);
  const completed = [...grades, ...Array.from({ length: Math.max(component.total - grades.length, 0) }, () => 0)];

  if (component.type === "top-list") {
    const ordered = [...completed].sort((left, right) => right - left);
    const used = ordered.slice(0, component.keep);
    const dropped = ordered.slice(component.keep);
    return {
      value: average(used),
      entered: grades.length,
      total: component.total,
      dropped,
      used
    };
  }

  return {
    value: average(completed),
    entered: grades.length,
    total: component.total,
    dropped: [],
    used: completed
  };
}

function getEnteredGrades(component, values) {
  const raw = values[component.id] ?? "";
  if (component.type === "single") {
    const grade = parseSingleText(raw);
    return grade == null ? [] : [grade];
  }
  return parseGroupGrades(raw, component.total);
}

function findMinimumNeeded(course, componentId, target) {
  const selected = course.components.find((component) => component.id === componentId);
  const baseValues = getCourseValues(course.id);

  for (let candidate = 0; candidate <= 20; candidate += 0.1) {
    const testValues = { ...baseValues };
    const existing = getEnteredGrades(selected, baseValues);
    const remaining = selected.total - existing.length;
    const completed = [...existing, ...Array.from({ length: remaining }, () => Number(candidate.toFixed(1)))];
    testValues[selected.id] = completed.map(formatGradeValue).join(" ");
    const result = computeCourse(course, testValues);
    if (result.official >= target) {
      return Number(candidate.toFixed(1));
    }
  }

  return null;
}

function clearCurrentCourse() {
  const course = getSelectedCourse();
  state.values[course.id] = {};
  persistState();
  renderCurrentCourse();
}

function setCourseValue(courseId, key, rawValue) {
  if (!state.values[courseId]) {
    state.values[courseId] = {};
  }

  if (!rawValue || !String(rawValue).trim()) {
    delete state.values[courseId][key];
  } else {
    state.values[courseId][key] = rawValue;
  }

  persistState();
}

function getSelectedCourse() {
  return courses.find((course) => course.id === state.selectedCourseId) || courses[0];
}

function getCourseValues(courseId) {
  return state.values[courseId] || {};
}

function buildComponentHelper(component) {
  if (component.note) {
    return component.note;
  }
  if (component.type === "top-list") {
    return `Escribe ${component.total} notas separadas por espacios. Se toman las ${component.keep} mejores.`;
  }
  if (component.type === "group") {
    return `Escribe ${component.total} notas separadas por espacios.`;
  }
  return "Ingresa una sola nota.";
}

function buildPlaceholder(component) {
  if (component.total >= 8) {
    return "Ej: 17 15 20 9 14 13";
  }
  if (component.total >= 4) {
    return "Ej: 17 15 20 9";
  }
  if (component.total === 2) {
    return "Ej: 15 18";
  }
  return "Ej: 17";
}

function applyTheme() {
  els.body.dataset.theme = state.theme;
  els.quickThemeIcon.textContent = state.theme === "dark" ? "☀" : "☾";
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.setAttribute("content", state.theme === "dark" ? "#071018" : "#eef4fb");
  }
  els.themeOptions.forEach((button) => {
    button.classList.toggle("active", button.dataset.theme === state.theme);
  });
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function parseGroupGrades(value, limit) {
  const matches = String(value || "").match(/\d+(?:[\.,]\d+)?/g) || [];
  return matches
    .slice(0, limit)
    .map((item) => parseSingleText(item))
    .filter((item) => item != null);
}

function parseSingleText(value) {
  if (!hasGrade(value)) {
    return null;
  }
  const parsed = Number.parseFloat(String(value).replace(",", ".").trim());
  if (!Number.isFinite(parsed)) {
    return null;
  }
  return clamp(parsed, 0, 20);
}

function normalizeGroupText(value, limit) {
  return parseGroupGrades(value, limit).map(formatGradeValue).join(" ");
}

function normalizeSingleText(value) {
  const parsed = parseSingleText(value);
  return parsed == null ? "" : formatGradeValue(parsed);
}

function formatGradeValue(value) {
  return value % 1 === 0 ? String(value.toFixed(0)) : String(Number(value.toFixed(1)));
}

function sanitizeIntegerText(value, fallback) {
  if (!hasGrade(value)) {
    return String(fallback);
  }
  const digits = String(value).replace(/[^\d]/g, "");
  if (!digits) {
    return String(fallback);
  }
  return digits;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function clampInteger(value, min, max) {
  const parsed = Number.parseInt(String(value), 10);
  if (!Number.isFinite(parsed)) {
    return min;
  }
  return clamp(parsed, min, max);
}

function hasGrade(value) {
  return value != null && String(value).trim() !== "";
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
