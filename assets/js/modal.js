const botao_abre_modal = document.querySelector("#abre-modal");
const botao_fecha_modal = document.querySelector("#botao-fechar-modal");
const area_modal_active = document.querySelector("#area-modal");

botao_abre_modal.addEventListener("click", e => {
    modalStatus(true);
});

botao_fecha_modal.addEventListener("click", e => {
    modalStatus(false);
});

area_modal_active.addEventListener("click", e => {
    const elemento_clicado = e.target;

    if (elemento_clicado.classList.contains("modal-father")) {
        modalStatus(false);
    }

});

function modalStatus(show_modal = true) {
    const area_modal = document.querySelector("#area-modal");
    const elemento_modal = area_modal.querySelector(".modal-elemento");

    if (show_modal) {
        area_modal.classList.add("active");
        elemento_modal.classList.add("active");
    } else {
        area_modal.classList.remove("active");
        elemento_modal.classList.remove("active");
    }
}