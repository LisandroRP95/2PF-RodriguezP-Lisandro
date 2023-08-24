import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const InscriptionsActions = createActionGroup({
    source: 'Inscriptions',
    events: {
        'Increment': emptyProps(),
        'Decrement': emptyProps(),
    }
});