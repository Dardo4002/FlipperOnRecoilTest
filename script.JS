const CONFIG = {
    links: {
        build1: "URL_DRIVE_CARPETA_1",
        build2: "URL_DRIVE_CARPETA_2",
        build3: "URL_DRIVE_CARPETA_3"
    },
    flows: {
        1: ["build1", "build2", "build3"],
        2: ["build2", "build1", "build3"],
        3: ["build3"]
    }
};

const dom = {
    mainBtn: document.getElementById('main-btn'),
    feedback: document.getElementById('feedback'),
    title: document.getElementById('step-title'),
    instr: document.getElementById('instruction-text'),
    experimentCard: document.getElementById('experiment-card'),
    finishCard: document.getElementById('finish-card')
};

function init() {
    const group = localStorage.getItem('tfg_group');
    const step = parseInt(localStorage.getItem('tfg_step') || "0");

    if (group) {
        renderStep(parseInt(group), step);
    }
}

dom.mainBtn.addEventListener('click', () => {
    let group = localStorage.getItem('tfg_group');
    let step = parseInt(localStorage.getItem('tfg_step') || "0");

    if (!group) {
        // ASIGNACIÓN ALEATORIA INICIAL
        group = Math.floor(Math.random() * 3) + 1;
        localStorage.setItem('tfg_group', group);
        localStorage.setItem('tfg_step', 0);
        showFeedback(`Asignado al Grupo ${group}. Abriendo Drive...`);
        window.open(CONFIG.links[CONFIG.flows[group][0]], "_blank");
        renderStep(group, 0);
    } else {
        // AVANCE DE PASO
        step++;
        localStorage.setItem('tfg_step', step);
        const flow = CONFIG.flows[group];

        if (step < flow.length) {
            showFeedback("¡Paso registrado! Abriendo siguiente build...");
            window.open(CONFIG.links[flow[step]], "_blank");
            renderStep(group, step);
        } else {
            // FINALIZACIÓN
            dom.experimentCard.classList.add('hidden');
            dom.finishCard.classList.remove('hidden');
        }
    }
});

function renderStep(group, step) {
    const flow = CONFIG.flows[group];
    dom.title.textContent = `Grupo ${group} - Fase ${step + 1}`;
    dom.instr.innerHTML = `
        <p style="color: #ef4444; font-weight: bold;">¿Has terminado la partida en Drive?</p>
        <p>Si es así, pulsa el botón para continuar con el experimento.</p>
    `;
    dom.mainBtn.textContent = (step + 1 < flow.length) ? "He terminado, ir a la siguiente build" : "He terminado, finalizar estudio";
}

function showFeedback(msg) {
    dom.feedback.textContent = msg;
    dom.feedback.classList.remove('hidden');
    setTimeout(() => dom.feedback.classList.add('hidden'), 4000);
}

init();