/**
 * HypergraphView — thin wrapper that reads log-viewer signals and
 * passes data as props to the signal-free HypergraphViewCore.
 *
 * Log-viewer-specific UI panels (SearchStatePanel, InsertStatePanel, etc.)
 * are rendered here as children of the core component.
 */
import { hypergraphSnapshot, activeSearchStep, activeSearchState, activeSearchPath, activePathEvent, activePathStep, autoLayoutEnabled } from '../../store';
import { HypergraphViewCore } from '@context-engine/viewer-api-frontend';

// Log-viewer-specific panels
import {
    SearchStatePanel,
    InsertStatePanel,
    ControlsHUD,
    PathChainPanel,
    QueryPathPanel,
} from './components';

/**
 * Main hypergraph visualization component (log-viewer entry point).
 */
export function HypergraphView() {
    const snapshot = hypergraphSnapshot.value;
    const currentEvent = activePathEvent.value ?? activeSearchState.value;
    const searchPath = activeSearchPath.value;
    const autoLayout = autoLayoutEnabled.value;
    const snapshotEdges = snapshot?.edges ?? null;
    const stepKey = `${activeSearchStep.value}/${activePathStep.value}`;

    // handleFocusNode is used by PathChainPanel — it needs to be passed down
    // but the actual focus logic lives inside HypergraphViewCore.
    // PathChainPanel calls onFocusNode which triggers selection change.
    // For now, PathChainPanel still reads signals directly for its own data.

    return (
        <HypergraphViewCore
            snapshot={snapshot}
            currentEvent={currentEvent}
            searchPath={searchPath}
            autoLayout={autoLayout}
            snapshotEdges={snapshotEdges}
            stepKey={stepKey}
            renderChildren={({ handleFocusNode, nestingSettings, setNestingSettings }) => (
                <>
                    {/* Search State Panel - floating list of algorithm steps */}
                    <SearchStatePanel />

                    {/* Insert State Panel - details for insert operations */}
                    <InsertStatePanel />

                    {/* Path Chain Panel - breadcrumb of current search path */}
                    <PathChainPanel onFocusNode={handleFocusNode} />

                    {/* Query Path Panel - input pattern token strip with cursor */}
                    <QueryPathPanel />

                    {/* HUD */}
                    <ControlsHUD nestingSettings={nestingSettings} onNestingChange={setNestingSettings} />
                </>
            )}
        />
    );
}
