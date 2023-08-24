import { ActionReducerMap } from "@ngrx/store";
import { InscriptionsState, inscriptionsFeatureKey, inscriptionsReducer } from "./inscriptions.reducer";
import { AuthState, authFeatureKey, authReducer } from "./auth/auth.reducer";

export interface AppState {
   [inscriptionsFeatureKey]: InscriptionsState;
   [authFeatureKey]: AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
    [inscriptionsFeatureKey]: inscriptionsReducer,
    [authFeatureKey]: authReducer
} 