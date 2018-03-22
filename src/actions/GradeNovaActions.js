import { LOAD_GRADE_NOVA,
         LOAD_GRADE_NOVA_SUCCESS,
         LOAD_GRADE_NOVA_FAIL,
         MAPEAR_GRADE_NOVA
} from '../actions/types';

import axios from 'axios';

export const loadGradeNova = (idCadeiras)=>{
    return (dispatch) => {
        dispatch({type: LOAD_GRADE_NOVA});


        const url = "https://juniorluciano.com/gradccc";
        axios.get(url + '/novo')
          .then(function (response) {
            const cadeiras = response.data;
            const mapaCadeiras = {};
            Object.keys(cadeiras).forEach((id)=>{
                const cadeira = cadeiras[id];
                if (!mapaCadeiras[cadeira.periodo]){
                    mapaCadeiras[cadeira.periodo] = [];
                }
                if(cadeira.nome !== "Optativa Geral" && cadeira.nome !== "Optativa Específica") {
                    mapaCadeiras[cadeira.periodo].push(cadeira);
                }
            });
            axios.get(url + '/map?disciplinas=' + idCadeiras.join(","))
                .then( function(response) {
                    const cadeirasMapeadas = response.data;
                    cadeirasMapeadas.forEach(cadeira => {
                        let nomeCadeira = cadeira.nome_novo;
                        mapaCadeiras[cadeira.periodo_novo].forEach((novaCadeira) => {
                            if(novaCadeira.nome === nomeCadeira) {
                                novaCadeira.selecionada = true;
                            }
                        });
                    });
                    dispatch({type: LOAD_GRADE_NOVA_SUCCESS, payload: mapaCadeiras});
                })
                .catch( function(error){
                    dispatch({type: LOAD_GRADE_NOVA_FAIL});
                });
          })
          .catch(function (error) {
            dispatch({type: LOAD_GRADE_NOVA_FAIL});
          });
    };
};
