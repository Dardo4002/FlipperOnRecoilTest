$(document).ready(function() {
    // 1. Selección aleatoria inicial (1, 2 o 3)
    let seccionActual = Math.floor(Math.random() * 3) + 1; 
    let contadorClics = 0; 

    // --- NUEVO: Mostrar el grupo basado en la sección inicial ---
    // Este texto se queda fijo aunque cambies de sección
    $('#texto-grupo').text("Eres del grupo " + seccionActual);

    // Mostrar sección inicial
    $('#sec' + seccionActual).show();

    $('.seccion a').on('click', function() {
        let idSeccionClicada = $(this).closest('.seccion').attr('id');

        // REGLA PARA LA SECCIÓN 3
        if (idSeccionClicada === 'sec3') {
            $('.seccion').hide();
            $('#contenedor-grupo').hide(); // Opcional: ocultamos el grupo al terminar
            $('#mensaje-gracias').fadeIn();
            return;
        }

        contadorClics++;
        $('.seccion').hide();

        if (contadorClics === 1) {
            if (idSeccionClicada === 'sec1') {
                seccionActual = 2;
            } else if (idSeccionClicada === 'sec2') {
                seccionActual = 1;
            }
        } 
        else {
            seccionActual = 3;
        }

        $('#sec' + seccionActual).fadeIn();
    });
});