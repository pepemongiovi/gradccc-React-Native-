import { LOAD_GRADE_ANTIGA,
    LOAD_GRADE_ANTIGA_FAIL,
    LOAD_GRADE_ANTIGA_SUCCESS,
    TOGGLE_CADEIRA,
    SELECIONA_PERIODO,
    SELECIONA_TODAS_DISCIPLINAS,
    LOAD_SELECIONADAS_SUCCESS
} from '../actions/types';
import firebase from 'firebase';
import axios from 'axios';

const limitarOptativas = (cadeira) => {
  return (cadeira.categoria!='Optativa' ||
    (cadeira.categoria=='Optativa' && (cadeira.id_disc=='103' || cadeira.id_disc=='104')));
}

export const loadGradeAntiga = ()=>{
    return (dispatch) => {
        dispatch({type: LOAD_GRADE_ANTIGA});
        axios.get('https://juniorluciano.com/gradccc/antigo')
          .then(function (response) {
            const cadeiras = response.data;
            const mapaCadeiras = {};

            Object.keys(cadeiras).forEach((id)=>{
                const cadeira = cadeiras[id];
                if(limitarOptativas(cadeira)){
                    if (!mapaCadeiras[cadeira.periodo]){
                        mapaCadeiras[cadeira.periodo] = [];
                    }
                    mapaCadeiras[cadeira.periodo].push(cadeira);
                }
            });

            dispatch({type: LOAD_GRADE_ANTIGA_SUCCESS,
                payload:  mapaCadeiras});

            const { currentUser } = firebase.auth();
            const cadeirasSelecionadas = [];

            if(currentUser){
              firebase.database().ref(`/users/${currentUser.uid}/cadeiras_selecionadas`)
                  .on('value', data => {
                  if(data.val()){
                      for(var i = 0; i<data.val().length; i++){
                          cadeirasSelecionadas.push(data.val()[i]);
                      }

                      Object.keys(mapaCadeiras).forEach((periodo)=>{
                          for(var i = 0; i<mapaCadeiras[periodo].length; i++){
                              if (cadeirasSelecionadas.includes(mapaCadeiras[periodo][i].id_disc)){
                                  mapaCadeiras[periodo][i].selecionada = true;
                              }
                          }
                      })
                      dispatch({type: LOAD_SELECIONADAS_SUCCESS, payload: cadeirasSelecionadas});
                  }
              });
            }

          })
          .catch(function (error) {
            dispatch({type: LOAD_GRADE_ANTIGA_FAIL});
          });
    };
};

export const toggleCadeira = (periodo, idCadeira) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_CADEIRA,
            payload: {periodo, idCadeira}
        });
    };
};

export const selecionarTodasAsCadeiras = () => {
    return {
        type: SELECIONA_TODAS_DISCIPLINAS
    };
};

export const selecionarTodasAsCadeirasDoPeriodo = (periodo) => {
    return (dispatch) => {
        dispatch({
            type: SELECIONA_PERIODO,
            payload: {periodo}
        });
    }
};
