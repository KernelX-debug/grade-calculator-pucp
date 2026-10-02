(function () {
  "use strict";
  const engine = GradeEngine;
  const store = StateStore;
  const catalog = CourseCatalog.courses;
  const backupLimit = 2 * 1024 * 1024;
  const $ = (id) => document.getElementById(id);
  const html = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
  const normalize = (text) => String(text || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const display = (number, digits = 2) => Number.isFinite(number) ? String(Number(number.toFixed(digits))) : "--";
  let storage;
  try { storage = window.localStorage; } catch {}
  const loaded = store.load(storage, catalog);
  let state = loaded.state;
  let courses;
  let courseMap;
  let searchIndex;
  let saveTimer;
  let summaryFrame;
  let formulaDirty = true;
  let menuOpen = false;
  let statElements = new Map();
  let installPrompt;
  let messageTimer;
  let choiceSelect;
  let choiceTrigger;
  const selectControls = new WeakMap();
  const choiceTargets = new WeakMap();
  const navigation = Array.from(document.querySelectorAll("[data-nav-target]"));
  const screens = Array.from(document.querySelectorAll("[data-screen]"));

  function syncSelectControls() {
    if (!$("choice-dialog").showModal) return;
    document.querySelectorAll("select").forEach((select) => {
      let button = selectControls.get(select);
      if (!button) {
        button = document.createElement("button");
        button.type = "button";
        button.className = "choice-trigger";
        button.innerHTML = '<span></span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
        button.setAttribute("aria-haspopup", "dialog");
        button.setAttribute("aria-controls", "choice-dialog");
        button.setAttribute("aria-expanded", "false");
        select.after(button);
        select.hidden = true;
        selectControls.set(select, button);
        choiceTargets.set(button, select);
      }
      const value = select.selectedOptions[0]?.textContent || "Elige una opción";
      button.querySelector("span").textContent = value;
      button.disabled = select.disabled;
    });
  }
  function openChoices(button) {
    choiceSelect = choiceTargets.get(button);
    if (!choiceSelect) return;
    choiceTrigger = button;
    $("choice-title").textContent = choiceSelect.closest("label")?.querySelector("span")?.textContent || "Elige una opción";
    $("choice-options").innerHTML = Array.from(choiceSelect.options).map((option, index) => `<button class="choice-option ${option.selected ? "active" : ""}" type="button" data-choice-index="${index}" aria-pressed="${option.selected}" ${option.disabled ? "disabled" : ""}>${html(option.textContent)}</button>`).join("");
    button.setAttribute("aria-expanded", "true");
    $("choice-dialog").showModal();
    $("choice-options").querySelector(".active:not(:disabled)")?.focus();
  }

  function flushState() {
    clearTimeout(saveTimer);
    if (!store.save(storage, state)) {
      $("storage-notice").hidden = false;
      $("storage-notice").textContent = "El navegador no permite guardar los cambios. Descarga una copia desde Ajustes antes de cerrar la app.";
    }
  }
  function persist(immediate = false) {
    clearTimeout(saveTimer);
    if (immediate) flushState();
    else saveTimer = setTimeout(flushState, 250);
  }
  function message(text) {
    clearTimeout(messageTimer);
    $("app-message").textContent = text;
    $("app-message").hidden = false;
    messageTimer = setTimeout(() => { $("app-message").hidden = true; }, 7000);
  }
  function rebuildCourses() {
    courses = catalog.concat(state.customCourses);
    courseMap = new Map(courses.map((course) => [course.id, course]));
    searchIndex = new Map(courses.map((course) => [course.id, normalize([course.code, course.name, course.universityCode, course.faculty, ...(course.aliases || [])].join(" "))]));
    const faculties = [...new Set(courses.map((course) => course.faculty))];
    if (!faculties.includes(state.faculty)) state.faculty = "";
    $("faculty-filter").innerHTML = '<option value="">Todas las facultades</option>' + faculties.map((faculty) => `<option value="${html(faculty)}">${html(faculty === "EEGGCC" ? "Estudios Generales Ciencias" : faculty)}</option>`).join("");
    $("faculty-filter").value = state.faculty;
    syncSelectControls();
    formulaDirty = true;
  }
  function selectedCourse() { return courseMap.get(state.selectedCourseId) || courses[0]; }
  function courseValues() { return state.values[selectedCourse().id] || {}; }
  function switchScreen(screen, focus = true) {
    state.activeScreen = screen;
    screens.forEach((element) => { const active = element.dataset.screen === screen; element.classList.toggle("active", active); element.setAttribute("aria-hidden", String(!active)); });
    navigation.forEach((button) => { const active = button.dataset.navTarget === screen; button.classList.toggle("active", active); button.setAttribute("aria-current", active ? "page" : "false"); });
    if (screen === "formulas" && formulaDirty) renderFormulaLibrary();
    if (screen === "custom") renderSavedCourses();
    closeMenu(false);
    persist();
    if (focus) { $("main").focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: "auto" }); }
  }
  function closeMenu(focus = true) {
    menuOpen = false;
    $("menu-layer").hidden = true;
    $("menu-toggle").setAttribute("aria-expanded", "false");
    if (focus) $("menu-toggle").focus();
  }
  function renderCourseList() {
    const query = normalize(state.courseQuery);
    const filtered = courses.filter((course) => (!state.faculty || course.faculty === state.faculty) && (!query || searchIndex.get(course.id).includes(query)));
    $("course-count").textContent = `${filtered.length} de ${courses.length} cursos`;
    $("course-list").innerHTML = filtered.length ? filtered.map((course) => `
      <button class="course-chip ${course.id === state.selectedCourseId ? "active" : ""}" type="button" data-course-id="${html(course.id)}" aria-pressed="${course.id === state.selectedCourseId}">
        <small>${html(course.code)}${course.universityCode && course.code !== course.universityCode ? ` · ${html(course.universityCode)}` : ""}</small>
        <strong>${html(course.name)}</strong>
      </button>`).join("") : '<div class="empty-state">No encontramos ese curso. Puedes crear uno con sus porcentajes.</div>';
  }
  function selectCourse(id) {
    if (!courseMap.has(id)) return;
    state.selectedCourseId = id;
    persist(true);
    renderCourseList();
    renderCurrentCourse();
  }
  function finalRule(course) {
    if (course.finalPrecision === 0 || course.finalMode === "truncate") return "Solo la parte entera";
    if (course.finalMode === "exact") return "Mantener decimales";
    return "Redondeo al entero";
  }
  function componentRule(component, course) {
    const percentage = 100 * component.weight * (component.aggregation === "sum" ? component.keep : 1) / course.divisor;
    const selection = component.keep < component.total ? `Las ${component.keep} mejores de ${component.total} notas.` : component.total > 1 ? `${component.total} notas.` : "Una nota.";
    const aggregation = component.aggregation === "sum" && component.total > 1 ? ` Cada nota vale ${display(100 * component.weight / course.divisor)} %.` : "";
    return `${selection} Peso: ${display(percentage)} %.${aggregation}${component.note ? ` ${component.note}` : ""}`;
  }
  function renderCurrentCourse() {
    const course = selectedCourse();
    const values = courseValues();
    $("course-code").textContent = course.code;
    $("course-name").textContent = course.name;
    $("course-summary").textContent = course.summary;
    $("final-rule").textContent = finalRule(course);
    $("edit-custom-course").hidden = !course.custom;
    $("current-formula").textContent = engine.formula(course);
    $("current-rules").innerHTML = course.components.map((component) => `<li><strong>${html(component.shortLabel)}</strong> · ${html(component.label)}: ${html(componentRule(component, course))}</li>`).join("");
    $("calculator-content").innerHTML = course.components.map((component, index) => `
      <article class="component-card" data-component-id="${html(component.id)}">
        <div class="component-head"><div><h3>${html(component.label)}</h3><p class="component-note">${html(componentRule(component, course))}</p></div><span class="stat-chip" data-stat-for="${html(component.id)}"></span></div>
        <label class="field"><span>${component.total === 1 ? "Nota" : "Notas separadas por espacios"}<span class="sr-only"> de ${html(component.label)}</span></span>
          <input data-input-key="${html(component.id)}" id="grade-${index}" type="text" inputmode="decimal" autocomplete="off" maxlength="4000" aria-describedby="grade-error-${index}" placeholder="${component.total === 1 ? "Ej.: 17,5" : component.total === 2 ? "Ej.: 15 18" : "Ej.: 17 15 20 9"}" value="${html(values[component.id] || "")}" />
        </label><p id="grade-error-${index}" class="validation-message" data-error-for="${html(component.id)}" hidden></p>
      </article>`).join("");
    statElements = new Map(course.components.map((component) => [component.id, {
      stat: $("calculator-content").querySelector(`[data-stat-for="${component.id}"]`),
      input: $("calculator-content").querySelector(`[data-input-key="${component.id}"]`),
      error: $("calculator-content").querySelector(`[data-error-for="${component.id}"]`)
    }]));
    updateSummary();
  }
  function queueSummary() {
    if (!summaryFrame) summaryFrame = requestAnimationFrame(() => { summaryFrame = null; updateSummary(); });
  }
  function updateSummary() {
    const course = selectedCourse();
    const result = engine.computeCourse(course, courseValues());
    for (const component of course.components) {
      const stat = result.componentMap[component.id];
      const elements = statElements.get(component.id);
      if (!stat || !elements) continue;
      const shown = component.aggregation === "sum" ? stat.value / component.keep : stat.value;
      elements.stat.textContent = `${stat.entered}/${stat.total} · ${stat.entered ? display(shown) : "--"}`;
      elements.input.setAttribute("aria-invalid", String(Boolean(stat.error)));
      elements.error.textContent = stat.error;
      elements.error.hidden = !stat.error;
    }
    $("official-grade").textContent = result.valid && result.entered ? display(result.official, 3) : "--";
    $("exact-grade").textContent = result.valid && result.entered ? display(result.exact, 3) : "--";
    $("official-label").textContent = result.complete ? "Nota final calculada" : "Nota final estimada";
    $("exact-detail").textContent = course.finalPrecision == null ? "Promedio ponderado, antes de la regla final." : `Tras el truncado final: ${result.valid && result.entered ? display(result.beforeFinal, 3) : "--"}.`;
    $("status-detail").textContent = `Nota aprobatoria: ${course.passGrade}.`;
    if (!result.valid) { $("status-label").textContent = "Revisa las notas"; $("status-copy").textContent = "Corrige los campos indicados para calcular un resultado válido."; }
    else if (!result.entered) { $("status-label").textContent = "Sin notas"; $("status-copy").textContent = "Ingresa tus notas para ver el resultado."; }
    else {
      $("status-label").textContent = result.complete ? result.passed ? "Aprobado" : "Desaprobado" : "Provisional";
      $("status-copy").textContent = result.complete ? `Registraste las ${result.total} evaluaciones. ${result.passed ? "Alcanzas" : "Aún no alcanzas"} la nota aprobatoria.` : `${result.entered} de ${result.total} notas registradas. Las pendientes cuentan como 0 en esta estimación.`;
    }
    renderNeededGrade(course, result);
  }
  function renderNeededGrade(course, result) {
    const pending = course.components.filter((component) => result.componentMap[component.id]?.entered < component.total);
    const signature = course.id + pending.map((c) => `${c.id}:${result.componentMap[c.id].entered}`).join("|");
    if ($("pending-select").dataset.signature !== signature) {
      const previous = $("pending-select").value;
      $("pending-select").innerHTML = pending.length ? pending.map((c) => `<option value="${html(c.id)}">${html(c.label)} (${result.componentMap[c.id].entered}/${c.total})</option>`).join("") : '<option value="">Curso completo</option>';
      if (pending.some((c) => c.id === previous)) $("pending-select").value = previous;
      $("pending-select").dataset.signature = signature;
    }
    syncSelectControls();
    $("needed-grade").textContent = "--";
    const target = engine.number(state.target);
    $("target-grade").setAttribute("aria-invalid", String(!Number.isFinite(target) || target > 20));
    if (!Number.isFinite(target) || target < 0 || target > 20) { $("needed-copy").textContent = "Ingresa un objetivo entre 0 y 20."; return; }
    if (!result.valid) { $("needed-copy").textContent = "Corrige las notas inválidas antes de estimar tu meta."; return; }
    if (!pending.length) { $("needed-copy").textContent = "Ya registraste todas las notas de este curso."; return; }
    const id = $("pending-select").value;
    const otherPending = pending.filter((c) => c.id !== id);
    if (otherPending.length) { $("needed-copy").textContent = `Completa los otros bloques para calcular esta meta: ${otherPending.map((c) => c.label).join(", ")}.`; return; }
    const required = engine.findMinimumNeeded(course, courseValues(), id, target);
    if (required == null) { $("needed-copy").textContent = "La meta no se alcanza con las notas restantes, incluso obteniendo 20."; return; }
    const missing = result.componentMap[id].total - result.componentMap[id].entered;
    $("needed-grade").textContent = required.toFixed(1);
    $("needed-copy").textContent = missing === 1 ? `Necesitas al menos ${required.toFixed(1)} en la nota pendiente para llegar a ${target}.` : `Si obtienes la misma nota en las ${missing} evaluaciones pendientes, necesitas ${required.toFixed(1)} en cada una para llegar a ${target}.`;
  }
  function renderFormulaLibrary() {
    const query = normalize($("formula-search").value);
    const filtered = courses.filter((course) => !query || searchIndex.get(course.id).includes(query));
    $("formula-library").innerHTML = filtered.length ? filtered.map((course) => `
      <article class="formula-card"><div><span class="section-tag">${html(course.code)}</span><h3>${html(course.name)}</h3></div>
        <p class="formula-expression">${html(engine.formula(course))}</p><ul class="formula-list">${course.components.map((c) => `<li>${html(c.shortLabel)} · ${html(c.label)}: ${html(componentRule(c, course))}</li>`).join("")}</ul><p class="component-note">${html(finalRule(course))}. Nota aprobatoria: ${course.passGrade}.</p>
        <button class="ghost-button" type="button" data-use-course="${html(course.id)}">Calcular este curso</button>
      </article>`).join("") : '<p class="empty-state">No encontramos fórmulas con ese filtro.</p>';
    formulaDirty = false;
  }
  function renderDraft() {
    const draft = state.draft;
    $("custom-name").value = draft.name;
    $("custom-code").value = draft.code;
    $("custom-pass").value = draft.passGrade;
    $("custom-rounding").value = draft.rounding;
    $("save-custom-course").textContent = draft.editingId ? "Guardar cambios y calcular" : "Guardar y calcular";
    $("custom-components").innerHTML = draft.components.map((component, index) => `
      <fieldset class="custom-block" data-block-id="${html(component.id)}"><legend>Bloque ${index + 1}</legend>
        <div class="section-row"><label class="field grow"><span>Nombre de evaluación</span><input data-draft-field="label" type="text" maxlength="100" value="${html(component.label)}" placeholder="Ej.: Laboratorios" required /></label><button class="icon-button remove-block" data-remove-block="${html(component.id)}" type="button" aria-label="Eliminar bloque ${index + 1}" ${draft.components.length === 1 ? "disabled" : ""}>×</button></div>
        <div class="block-numbers"><label class="field"><span>Cantidad</span><input data-draft-field="total" type="text" inputmode="numeric" maxlength="3" value="${html(component.total)}" required /></label><label class="field"><span>Descartar menores</span><input data-draft-field="drop" type="text" inputmode="numeric" maxlength="3" value="${html(component.drop)}" required /></label><label class="field"><span>Peso del bloque (%)</span><input data-draft-field="weight" type="text" inputmode="decimal" maxlength="20" value="${html(component.weight)}" required /></label></div>
        <details class="calculation-options"><summary>Opciones de esta evaluación</summary><label class="field"><span>Decimales del promedio</span><select data-draft-field="precision"><option value="none">Mantener todos los decimales</option><option value="1">1 decimal (15,89 → 15,8)</option><option value="2">2 decimales (15,899 → 15,89)</option><option value="3">3 decimales (15,8999 → 15,899)</option><option value="0">Solo la parte entera (15,8 → 15)</option></select></label></details>
      </fieldset>`).join("");
    $("custom-components").querySelectorAll("[data-block-id]").forEach((block, i) => { block.querySelector("select").value = draft.components[i].precision; });
    syncSelectControls();
    $("custom-errors").hidden = true;
    updateDraftSummary();
  }
  function updateDraftSummary() {
    const weights = state.draft.components.map((component) => engine.number(component.weight));
    const valid = weights.every((weight) => Number.isFinite(weight) && weight > 0);
    const total = weights.reduce((sum, weight) => sum + (Number.isFinite(weight) ? weight : 0), 0);
    $("custom-weight-total").textContent = `${display(total, 4)} / 100 %`;
    $("custom-weight-progress").value = Math.max(0, Math.min(100, total));
    $("custom-weight-total").classList.toggle("weight-valid", valid && Math.abs(total - 100) < 1e-7);
    $("custom-weight-copy").textContent = !valid ? "Cada bloque necesita un peso mayor que cero." : Math.abs(total - 100) < 1e-7 ? "Listo: los pesos suman 100 %." : total < 100 ? `Falta asignar ${display(100 - total, 4)} %.` : `Reduce los pesos en ${display(total - 100, 4)} %.`;
  }
  function readDraftEvent(event) {
    const input = event.target;
    const fields = { "custom-name": "name", "custom-code": "code", "custom-pass": "passGrade", "custom-rounding": "rounding" };
    if (fields[input.id]) state.draft[fields[input.id]] = input.value;
    else if (input.dataset.draftField) {
      const id = input.closest("[data-block-id]").dataset.blockId;
      const component = state.draft.components.find((c) => c.id === id);
      if (component) component[input.dataset.draftField] = input.value;
    } else return;
    $("custom-errors").hidden = true;
    updateDraftSummary();
    persist();
  }
  function startCustom(course) {
    if (course) { state.draft = store.courseToDraft(course); renderDraft(); }
    switchScreen("custom");
  }
  function renderSavedCourses() {
    $("saved-custom-courses").innerHTML = state.customCourses.length ? state.customCourses.map((course) => `<article class="saved-course"><span class="section-tag">${html(course.code)}</span><h4>${html(course.name)}</h4><p class="component-note">${course.components.length} bloque(s) · ${course.components.reduce((sum, c) => sum + c.total, 0)} evaluaciones</p><div class="saved-actions"><button class="ghost-button" data-use-course="${html(course.id)}" type="button">Calcular</button><button class="ghost-button" data-edit-course="${html(course.id)}" type="button">Editar</button><button class="ghost-button danger" data-delete-course="${html(course.id)}" type="button">Eliminar</button></div></article>`).join("") : '<p class="empty-state">Tus cursos aparecerán aquí después de guardarlos.</p>';
  }
  function saveCustom(event) {
    event.preventDefault();
    const id = state.draft.editingId || `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const course = store.draftToCourse(state.draft, id);
    const errors = engine.validateCourse(course);
    if (!course.name) errors.unshift("Escribe el nombre del curso.");
    if (!state.draft.editingId && state.customCourses.length >= 100) errors.unshift("Puedes guardar hasta 100 cursos personales. Edita o elimina uno antes de añadir otro.");
    if (errors.length) { $("custom-errors").textContent = [...new Set(errors)].join(" "); $("custom-errors").hidden = false; $("custom-errors").scrollIntoView({ block: "center", behavior: "smooth" }); return; }
    const existing = state.customCourses.findIndex((c) => c.id === id);
    if (existing === -1) state.customCourses.push(course);
    else state.customCourses[existing] = course;
    const old = courseMap.get(id);
    if (old && state.values[id]) for (const component of old.components) {
      const replacement = course.components.find((c) => c.id === component.id);
      if (!replacement || replacement.total !== component.total || replacement.keep !== component.keep || replacement.precision !== component.precision) delete state.values[id][component.id];
    }
    state.draft = store.courseToDraft(course);
    state.courseQuery = "";
    state.faculty = "";
    $("course-search").value = "";
    rebuildCourses();
    selectCourse(id);
    switchScreen("calculator");
    renderDraft();
    message(existing === -1 ? "Curso personalizado guardado. Ya puedes ingresar tus notas." : "Cambios guardados. Reingresa las notas de los bloques cuya cantidad o regla cambió.");
  }
  function confirmAction(copy) {
    return new Promise((resolve) => {
      const dialog = $("confirm-dialog");
      if (!dialog.showModal) { resolve(window.confirm(copy)); return; }
      $("confirm-copy").textContent = copy;
      dialog.returnValue = "cancel";
      dialog.addEventListener("close", () => resolve(dialog.returnValue === "confirm"), { once: true });
      dialog.showModal();
    });
  }
  async function clearCurrentCourse() {
    if (!await confirmAction(`¿Limpiar todas las notas de ${selectedCourse().name}? La fórmula del curso se conserva.`)) return;
    state.values[selectedCourse().id] = {};
    persist(true);
    renderCurrentCourse();
  }
  function applyTheme() {
    document.body.dataset.theme = state.theme;
    $("quick-theme-icon").textContent = state.theme === "dark" ? "☀" : "☾";
    $("quick-theme-toggle").setAttribute("aria-label", state.theme === "dark" ? "Cambiar a modo diurno" : "Cambiar a modo oscuro");
    document.querySelector('meta[name="theme-color"]').content = state.theme === "dark" ? "#071018" : "#eef4fb";
    document.querySelectorAll("[data-theme-choice]").forEach((button) => { const active = button.dataset.themeChoice === state.theme; button.classList.toggle("active", active); button.setAttribute("aria-pressed", String(active)); });
  }
  async function importBackup(event) {
    const file = event.target.files[0];
    if (!file) return;
    try {
      if (file.size > backupLimit) throw new Error("La copia supera el máximo de 2 MB.");
      const restored = store.validateBackup(JSON.parse(await file.text()), catalog);
      if (!await confirmAction("¿Restaurar esta copia? Reemplazará tus notas y cursos personales de este dispositivo. Descarga una copia actual si deseas conservarlos.")) return;
      state = restored;
      rebuildCourses();
      $("course-search").value = state.courseQuery;
      $("target-grade").value = state.target;
      applyTheme(); renderDraft(); renderCourseList(); renderCurrentCourse(); switchScreen(state.activeScreen);
      persist(true);
      message("Copia de seguridad restaurada.");
    } catch (error) { message(error instanceof SyntaxError ? "El archivo no contiene una copia JSON válida." : error.message); }
    finally { event.target.value = ""; }
  }
  async function exportBackup() {
    const button = $("export-data");
    button.disabled = true;
    try {
      flushState();
      const data = JSON.stringify({ app: "notas-pucp-ciencias", version: 1, state }, null, 2);
      const blob = new Blob([data], { type: "application/json" });
      if (blob.size > backupLimit) throw new Error("La copia supera el máximo de 2 MB. Reduce los datos antes de descargarla.");
      if (window.Capacitor?.isNativePlatform()) {
        const plugin = window.Capacitor.Plugins?.BackupFile;
        if (!plugin?.save) throw new Error("No se pudo abrir el guardado de archivos. Instala el APK actualizado e inténtalo de nuevo.");
        const result = await plugin.save({ data });
        message(result.saved ? "Copia de seguridad guardada." : "Guardado cancelado.");
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url; link.download = "notas-pucp-copia.json"; document.body.appendChild(link); link.click(); link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 10000);
        message("Copia preparada: notas-pucp-copia.json.");
      }
    } catch (error) { message(error.message || "No se pudo guardar la copia de seguridad."); }
    finally { button.disabled = false; }
  }
  function attachEvents() {
    document.addEventListener("click", (event) => {
      const trigger = event.target.closest(".choice-trigger");
      if (trigger) openChoices(trigger);
    });
    $("close-choice").addEventListener("click", () => $("choice-dialog").close());
    $("choice-dialog").addEventListener("close", () => {
      choiceTrigger?.setAttribute("aria-expanded", "false");
      choiceTrigger?.focus({ preventScroll: true });
      choiceSelect = null;
      choiceTrigger = null;
    });
    $("choice-dialog").addEventListener("click", (event) => { if (event.target === $("choice-dialog")) $("choice-dialog").close(); });
    $("choice-options").addEventListener("click", (event) => {
      const option = event.target.closest("[data-choice-index]");
      if (!option || !choiceSelect) return;
      choiceSelect.selectedIndex = Number(option.dataset.choiceIndex);
      choiceSelect.dispatchEvent(new Event("change", { bubbles: true }));
      syncSelectControls();
      $("choice-dialog").close();
    });
    $("choice-options").addEventListener("keydown", (event) => {
      const options = Array.from($("choice-options").querySelectorAll("button:not(:disabled)"));
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key) || !options.length) return;
      event.preventDefault();
      const index = options.indexOf(document.activeElement);
      options[event.key === "Home" ? 0 : event.key === "End" ? options.length - 1 : (index + (event.key === "ArrowUp" ? -1 : 1) + options.length) % options.length].focus();
    });
    navigation.forEach((button) => button.addEventListener("click", () => switchScreen(button.dataset.navTarget)));
    $("menu-toggle").addEventListener("click", () => { if (menuOpen) closeMenu(); else { menuOpen = true; $("menu-layer").hidden = false; $("menu-toggle").setAttribute("aria-expanded", "true"); $("menu-layer").querySelector(".menu-item").focus(); } });
    $("menu-dismiss").addEventListener("click", () => closeMenu());
    document.addEventListener("keydown", (event) => {
      if (!menuOpen) return;
      if (event.key === "Escape") { event.preventDefault(); closeMenu(); }
      if (event.key === "Tab") { const buttons = Array.from($("menu-layer").querySelectorAll(".menu-item")); const index = buttons.indexOf(document.activeElement); event.preventDefault(); buttons[(index + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length].focus(); }
    });
    $("course-search").addEventListener("input", (event) => { state.courseQuery = event.target.value; renderCourseList(); persist(); });
    $("faculty-filter").addEventListener("change", (event) => { state.faculty = event.target.value; renderCourseList(); persist(); });
    $("course-list").addEventListener("click", (event) => { const button = event.target.closest("[data-course-id]"); if (button) selectCourse(button.dataset.courseId); });
    $("calculator-content").addEventListener("input", (event) => { const key = event.target.dataset.inputKey; if (!key) return; const id = selectedCourse().id; if (!state.values[id]) state.values[id] = {}; state.values[id][key] = event.target.value; persist(); queueSummary(); });
    $("target-grade").addEventListener("input", (event) => { state.target = event.target.value; persist(); queueSummary(); });
    $("pending-select").addEventListener("change", updateSummary);
    $("clear-course").addEventListener("click", clearCurrentCourse);
    $("clear-current-settings").addEventListener("click", clearCurrentCourse);
    $("quick-theme-toggle").addEventListener("click", () => { state.theme = state.theme === "dark" ? "light" : "dark"; applyTheme(); persist(true); });
    document.querySelectorAll("[data-theme-choice]").forEach((button) => button.addEventListener("click", () => { state.theme = button.dataset.themeChoice; applyTheme(); persist(true); }));
    $("new-custom-course").addEventListener("click", () => startCustom());
    $("edit-custom-course").addEventListener("click", () => startCustom(selectedCourse()));
    $("custom-form").addEventListener("input", readDraftEvent);
    $("custom-form").addEventListener("change", readDraftEvent);
    $("custom-form").addEventListener("submit", saveCustom);
    $("add-custom-component").addEventListener("click", () => { if (state.draft.components.length >= 100) { message("Puedes añadir hasta 100 bloques de evaluación."); return; } state.draft.components.push({ id: `b${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`, label: "", total: "1", drop: "0", weight: "", precision: "none" }); renderDraft(); persist(); $("custom-components").lastElementChild.querySelector("input").focus(); });
    $("custom-components").addEventListener("click", (event) => { const button = event.target.closest("[data-remove-block]"); if (!button || state.draft.components.length <= 1) return; state.draft.components = state.draft.components.filter((c) => c.id !== button.dataset.removeBlock); renderDraft(); persist(); });
    $("reset-custom-draft").addEventListener("click", async () => { if ((state.draft.name || state.draft.editingId) && !await confirmAction("¿Iniciar un nuevo borrador? Tus cursos guardados se conservan.")) return; state.draft = store.newDraft(); renderDraft(); persist(true); });
    document.addEventListener("click", async (event) => {
      const use = event.target.closest("[data-use-course]");
      if (use) { selectCourse(use.dataset.useCourse); switchScreen("calculator"); }
      const edit = event.target.closest("[data-edit-course]");
      if (edit) startCustom(courseMap.get(edit.dataset.editCourse));
      const remove = event.target.closest("[data-delete-course]");
      if (remove && await confirmAction("¿Eliminar este curso personalizado y sus notas?")) {
        const id = remove.dataset.deleteCourse;
        state.customCourses = state.customCourses.filter((c) => c.id !== id); delete state.values[id];
        if (state.selectedCourseId === id) state.selectedCourseId = catalog[0].id;
        if (state.draft.editingId === id) { state.draft = store.newDraft(); renderDraft(); }
        rebuildCourses(); renderCourseList(); renderCurrentCourse(); renderSavedCourses(); persist(true);
      }
    });
    $("formula-search").addEventListener("input", renderFormulaLibrary);
    $("export-data").addEventListener("click", exportBackup);
    $("import-data").addEventListener("change", importBackup);
    $("clear-all-settings").addEventListener("click", async () => {
      if (!await confirmAction("¿Borrar todas tus notas, cursos personalizados y el borrador? Descarga antes una copia si deseas conservarlos.")) return;
      state = store.sanitizeState({}, catalog); rebuildCourses(); $("course-search").value = ""; $("target-grade").value = "11";
      applyTheme(); renderDraft(); renderCourseList(); renderCurrentCourse(); switchScreen("calculator"); persist(true);
    });
    window.addEventListener("pagehide", flushState);
    document.addEventListener("visibilitychange", () => { if (document.hidden) flushState(); });
    window.addEventListener("beforeinstallprompt", (event) => { event.preventDefault(); installPrompt = event; $("install-app").hidden = false; });
    $("install-app").addEventListener("click", async () => { if (!installPrompt) return; await installPrompt.prompt(); await installPrompt.userChoice; installPrompt = null; $("install-app").hidden = true; });
  }
  function setupOffline() {
    const native = window.Capacitor && window.Capacitor.isNativePlatform();
    if (native || location.protocol === "file:" || !("serviceWorker" in navigator) || !window.isSecureContext) return;
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }

  if (loaded.error) { $("storage-notice").textContent = loaded.error; $("storage-notice").hidden = false; }
  rebuildCourses();
  $("course-search").value = state.courseQuery;
  $("target-grade").value = state.target;
  applyTheme(); attachEvents(); renderDraft(); renderCourseList(); renderCurrentCourse(); switchScreen(state.activeScreen, false); setupOffline();
})();
