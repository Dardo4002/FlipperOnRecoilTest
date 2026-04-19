$(document).ready(function () {

    // ── Grupo y sección inicial ────────────────────────────────────────────
    const grupo = Math.floor(Math.random() * 3) + 1;
    let seccionActual = grupo;
    let contadorClics = 0;

    // ── Estado inicial: solo visibles Presentación, Bartle y Contacto ─────
    $('#seccion-encuesta').hide();
    $('#seccion-controles').hide();
    $('.seccion').hide();
    $('#mensaje-gracias').hide();

    // ── Texto del grupo ────────────────────────────────────────────────────
    $('#texto-grupo').text('Eres del grupo ' + grupo);

    // ── Función de índice: apaga todos y enciende los indicados ───────────
    function iluminar(indices) {
        $('#indice li').css('background-color', '');
        indices.forEach(function (i) {
            $('#indice li').eq(i).css('background-color', 'rgba(255, 200, 50, 0.4)');
        });
    }

    // ── Paso 0: encender "Test previo" (li[0]) al cargar ─────────────────
    iluminar([0]);

    // ── Clic en enlace de Bartle ───────────────────────────────────────────
    //   li[0] apaga → li[1] "Test: primera parte" enciende
    $('#enlace-bartle').on('click', function () {
        $('#seccion-bartle').hide();
        $('#seccion-encuesta').show();
        iluminar([1]);
    });

    // ── Clic en enlace de la Encuesta ──────────────────────────────────────
    //   li[1] apaga → li[2] "Leer controles" + li[3] "Jugar" encienden
    $('#enlace-encuesta').on('click', function () {
        $('#sec' + seccionActual).show();
        $('#seccion-controles').show();
        iluminar([2, 3]);
    });

    // ── Clics en los enlaces de sec1 / sec2 / sec3 ────────────────────────
    $('.seccion a').on('click', function () {
        const idSeccionClicada = $(this).closest('.seccion').attr('id');

        // Cualquier clic en sección → ocultar Encuesta
        $('#seccion-encuesta').hide();

        // ── Sec3: mostrar Ending, ocultar todo lo demás ───────────────────
        //   Para grupo 3: li[3] apaga → li[9] "Terminaste" enciende
        //   Para grupos 1/2: li[6]+li[7] apagan → li[9] enciende
        //   (li[8] "Test cuarta parte" se enciende y apaga en el mismo evento,
        //    así que se salta directamente a li[9] por legibilidad)
        if (idSeccionClicada === 'sec3') {
            $('.seccion').hide();
            $('#controles-basicos').hide();
            $('#mensaje-gracias').fadeIn();
            iluminar([9]);
            return;
        }

        // ── Avanzar sección (solo grupos 1 y 2 llegan aquí) ──────────────
        contadorClics++;
        $('.seccion').hide();

        if (contadorClics === 1) {
            // li[2]+li[3] apagan → li[4] "Test: segunda parte" + li[5] "Jugar"
            seccionActual = (idSeccionClicada === 'sec1') ? 2 : 1;
            iluminar([4, 5]);
        } else {
            // li[4]+li[5] apagan → li[6] "Test: tercera parte" + li[7] "Jugar"
            seccionActual = 3;
            iluminar([6, 7]);
        }

        $('#sec' + seccionActual).fadeIn();
    });
});