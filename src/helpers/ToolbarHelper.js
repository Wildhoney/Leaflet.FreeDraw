import { NONE, CREATE, EDIT, DELETE, DELETEMARKERS, DELETEPOINT, APPEND, ALL, modesKey } from '../FreeDraw';
import {modeFor} from './Flags'

    const SCOPE_MODES = { CREATE, EDIT, DELETE, APPEND, NONE, DELETEMARKERS, DELETEPOINT };

    export const isDisabled = (mode, ScopeMode) => !(mode & ScopeMode);

    const stopPropagation = event => event.stopPropagation();

    export const toggleMode = (mode, map = false, options) => {
        
        let ScopeMode = map[modesKey];

        if(mode != DELETEMARKERS){
            // disable Delete Markers
            ScopeMode = ScopeMode & 47;
        }

        if (isDisabled(mode, ScopeMode)) {

            // Enabled the mode.
            ScopeMode = ScopeMode | mode;
            if(mode === DELETEMARKERS) {
                // disable all others
                ScopeMode = SCOPE_MODES.NONE | mode;
            }
            modeFor(map, ScopeMode, options);
            return;

        }

        // Otherwise disable it.
        ScopeMode = ScopeMode ^ mode;
        modeFor(map, ScopeMode, options);

    };

    // export const setModeOnly = mode => {
    //     ScopeMode = SCOPE_MODES.NONE | mode;
    //     FreeDraw.mode(ScopeMode);
    // };
