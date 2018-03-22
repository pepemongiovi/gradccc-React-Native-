import { 
    CALCULAR_CREDITOS_OBRIGATORIOS,
    CALCULAR_CREDITOS_OPTATIVOS_ESPECIFICOS,
    CALCULAR_CREDITOS_OPTATIVOS_GERAIS,
    CALCULAR_PERCENTAGEM_CURSO
} from '../actions/types';

const INITIAL_STATE = {
    creditosObrigatorios: 0,
    totalCreditosObrigatorios: 0,
    creditosOptativosEspecificos: 0,
    creditosOptativosGerais: 0,
    percentagemConclusao: 0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case CALCULAR_CREDITOS_OBRIGATORIOS:
            let cadeiras = action.payload.cadeiras;
            let creditosPagos = 0;
            let totalCreditos = 0;

            Object.keys(cadeiras).forEach((periodo) => {
                const cadeirasPorPeriodo = cadeiras[periodo];
                cadeirasPorPeriodo.filter(cadeira => {return cadeira.categoria === "Obrigatório"})
                                        .forEach(cadeira => {
                                            if(cadeira.selecionada){
                                                creditosPagos += cadeira.creditos;
                                            }
                                            totalCreditos += cadeira.creditos;
                                        });
            });
            return {
                ... state,
                creditosObrigatorios: creditosPagos,
                totalCreditosObrigatorios: totalCreditos
            };

        case CALCULAR_CREDITOS_OPTATIVOS_ESPECIFICOS:
            cadeiras = action.payload.cadeiras;
            creditosPagos = 0;
            totalCreditos = 0;
            console.log(cadeiras);
            Object.keys(cadeiras).forEach((periodo) => {
                const cadeirasPorPeriodo = cadeiras[periodo];
                cadeirasPorPeriodo.filter(cadeira => {return cadeira.categoria === "Optativa Específica"})
                                        .forEach(cadeira => {
                                            if(cadeira.selecionada){
                                                creditosPagos += cadeira.creditos;
                                            }
                                        });
            });
            return{
                ... state,
                creditosOptativosEspecificos: creditosPagos
            };

        case CALCULAR_CREDITOS_OPTATIVOS_GERAIS:
            cadeiras = action.payload.cadeiras;
            creditosPagos = 0;
            totalCreditos = 0;
            console.log(cadeiras);
            Object.keys(cadeiras).forEach((periodo) => {
                const cadeirasPorPeriodo = cadeiras[periodo];
                cadeirasPorPeriodo.filter(cadeira => {return cadeira.categoria === "Optativa Geral"})
                                        .forEach(cadeira => {
                                            if(cadeira.selecionada){
                                                creditosPagos += cadeira.creditos;
                                            }
                                        });
            });
            return{
                ... state,
                creditosOptativosGerais: creditosPagos
            };

        case CALCULAR_PERCENTAGEM_CURSO:
            const obrigatorias = state.creditosObrigatorios > 140 ? 140 : state.creditosObrigatorios;
            const especificas = state.creditosOptativosEspecificos > 40 ? 40 : state.creditosOptativosEspecificos;
            const gerais = state.creditosOptativosGerais > 16 ? 16 : state.creditosOptativosGerais;

            let percentagem = ((obrigatorias + especificas + gerais) / 196) * 100;

            return{
                ... state,
                percentagemConclusao: percentagem
            };

        default:
            return state;
    }
}