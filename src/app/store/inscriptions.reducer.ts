import { createReducer, on } from "@ngrx/store";
import { InscriptionsActions } from "./inscriptions.actions";

export const inscriptionsFeatureKey = 'inscriptions';

export interface InscriptionsState {
    value: number;
}

const initialState: InscriptionsState = {
    value: 0
}

export const inscriptionsReducer = createReducer(
    initialState, 
    on(InscriptionsActions.increment, (currentState) => {
        return {
            value: currentState.value + 1,
        }
    }),
    on(InscriptionsActions.decrement, (currentState) => {
        return {
            value: currentState.value - 1,
        }
    })
    );