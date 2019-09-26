import  FreeDraw , { NONE, CREATE, EDIT, DELETE, DELETEMARKERS, DELETEPOINT, APPEND, ALL, modesKey } from '../FreeDraw';
import {modeFor} from './Flags'

    const SCOPE_MODES = { CREATE, EDIT, DELETE, APPEND, NONE, DELETEMARKERS, DELETEPOINT };

    const isDisabled = (mode, ScopeMode) => !(mode & ScopeMode);

    const stopPropagation = event => event.stopPropagation();

    export const toggleMode = (mode, map = false, options) => {
        
        let ScopeMode = map[modesKey];

        console.log("MODE1 ");

        console.log(mode);

        if(mode != DELETEMARKERS){
            // disable Delete Markers
            ScopeMode = ScopeMode & 47;
        }

        console.log("IIIII");
        console.log(mode);
        console.log(ScopeMode);

        if (isDisabled(mode, ScopeMode)) {

            // Enabled the mode.
            ScopeMode = ScopeMode | mode;
            if(mode === DELETEMARKERS) {
                // disable all others
                ScopeMode = SCOPE_MODES.NONE | mode;
            }
            modeFor(map, ScopeMode, options);
            console.log("RETURN");
            return;

        }

        // Otherwise disable it.
        ScopeMode = ScopeMode ^ mode;
        //FreeDraw.mode(ScopeMode);
        modeFor(map, ScopeMode, options);

    };

    // export const setModeOnly = mode => {
    //     ScopeMode = SCOPE_MODES.NONE | mode;
    //     FreeDraw.mode(ScopeMode);
    // };
