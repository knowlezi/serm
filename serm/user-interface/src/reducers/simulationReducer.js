export default function reducer(
    state={
      item: {},
      fetching: false,
      fetched: false,
      error: null,
    }, action) {
  
      switch (action.type) {
        case 'FETCH_SIMULATION': {
          return {...state, fetching: true}
        }
        case 'FETCH_SIMULATION_REJECTED': {
          return {...state, fetching: false, error: action.payload}
        }
        case 'FETCH_SIMULATION_FULFILLED': {
          return {
            ...state,
            fetching: false,
            fetched: true,
            item: action.payload,
          }
        }
        default: {
          return state
        }
      }
    }
  