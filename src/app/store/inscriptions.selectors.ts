import { createFeatureSelector, createSelector } from "@ngrx/store";
import { InscriptionsState, inscriptionsFeatureKey } from "./inscriptions.reducer";

export const selectInscriptionsState = createFeatureSelector<InscriptionsState>(inscriptionsFeatureKey);

export const selectInscriptionsStateValue = createSelector(
    selectInscriptionsState,
    (state) => state.value,
    )