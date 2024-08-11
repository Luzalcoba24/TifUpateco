import { useReducer, useCallback } from "react";

const ACTIONS = {
    FETCH_INIT: "FETCH_INIT",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_FAILURE: "FETCH_FAILURE",
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.FETCH_INIT:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case ACTIONS.FETCH_SUCCESS:
            return {
                data: action.payload,
                isLoading: false,
                isError: false,
            };
        case ACTIONS.FETCH_FAILURE:
            return {
                ...state,
                isError: true,
                isLoading: false,
            };
        default:
            return state;
    }
}

function useFetch(url, initialOptions = {}) {
    const [state, dispatch] = useReducer(reducer, {
        data: null,
        isError: false,
        isLoading: true,
    });

    const doFetch = useCallback((newOptions = {}) => {
        dispatch({ type: ACTIONS.FETCH_INIT });

        fetch(url, { ...initialOptions, ...newOptions })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Error al realizar la petición");
            })
            .then((data) => {
                dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data });
            })
            .catch(() => {
                dispatch({ type: ACTIONS.FETCH_FAILURE });
            });
    }, [url, initialOptions]);

    return [state, doFetch];
}

export default useFetch;
