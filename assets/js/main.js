const btn_converter = document.querySelector("#btn-converter");
const input_numero = document.querySelector("#numero-entrada");

btn_converter.addEventListener("click", e => {
    let input_numero_now = document.querySelector("#numero-entrada");
    const valor_input = input_numero.value;

    if (valor_input == "") {
        show_alert(input_numero_now);

    } else {
        const moeda_escolhida = document.querySelector("#moeda-escolhida").value;

        let request_option = {
            method: "GET",
            redirect: "follow"
        };

        url = `https://economia.awesomeapi.com.br/last/${moeda_escolhida}`;

        fetch(url, request_option)
            .then(response => response.text())
            .then(result => {
                let chave_mae = moeda_escolhida.replace("-", '');
                const dados_req = (JSON.parse(result))[chave_mae];

                let compra = parseFloat(dados_req.bid).toFixed(2);
                let venda = parseFloat(dados_req.ask).toFixed(2);
                let variacao = parseFloat(dados_req.varBid).toFixed(2);
                let porcentagem = parseFloat(dados_req.pctChange).toFixed(2);
                let maximo = parseFloat(dados_req.high).toFixed(2);
                let minimo = parseFloat(dados_req.low).toFixed(2);

                const valores_conver = [{
                        elementoId: "#moeda",
                        valor_mostrar: moeda_escolhida,
                    },
                    {
                        elementoId: "#compra",
                        valor_mostrar: (valor_input / compra).toFixed(2),
                    },
                    {
                        elementoId: "#venda",
                        valor_mostrar: (valor_input / venda).toFixed(2),
                    },
                    {
                        elementoId: "#variacao",
                        valor_mostrar: variacao,
                    },
                    {
                        elementoId: "#porcen",
                        valor_mostrar: porcentagem,
                    },
                    {
                        elementoId: "#max",
                        valor_mostrar: maximo,
                    },
                    {
                        elementoId: "#min",
                        valor_mostrar: minimo,
                    },
                ];

                const valores_modal = [{
                        elementoId: "#modal-moeda",
                        valor_mostrar: moeda_escolhida
                    },
                    {
                        elementoId: "#modal-compra",
                        valor_mostrar: `${valor_input} / ${compra}`
                    },
                    {
                        elementoId: "#modal-venda",
                        valor_mostrar: `${valor_input} / ${venda}`
                    },
                    {
                        elementoId: "#modal-variacao",
                        valor_mostrar: variacao
                    },
                    {
                        elementoId: "#modal-porcen",
                        valor_mostrar: porcentagem
                    },
                    {
                        elementoId: "#modal-max",
                        valor_mostrar: maximo
                    },
                    {
                        elementoId: "#modal-min",
                        valor_mostrar: minimo
                    },
                ]

                write_conversion(valores_conver);
                write_conversion(valores_modal);
            })
            .catch(error => console.log(error));
    }
});

input_numero.addEventListener("input", e => {
    if (input_numero.classList.contains("alert-br")) {
        show_alert(input_numero, false);
    }
})

function show_alert(input_numero, show = true) {
    const div_pai = input_numero.parentNode;
    const span_aviso = div_pai.querySelector("span");

    if (!show) {
        span_aviso.classList.remove("alert");
        input_numero.classList.remove("alert-br");
        return;
    }

    span_aviso.classList.add("alert");
    input_numero.classList.add("alert-br")
    return;
}

function write_conversion(valores) {
    valores.forEach(value => {
        let elemento = document.querySelector(value.elementoId);

        elemento.innerHTML = value.valor_mostrar;
    });
}