import React, { useEffect, useRef } from 'react';
import { DashComponentProps } from '../props';

type Props = {
    /**
     * The id of the graph-div whose traces should be updated.
     *
     * .. Note:
     *
     *   * if you use multiple graphs; each graph MUST have a unique id; otherwise we
     *     cannot guarantee that resampling will work correctly.
     *   * TraceUpdater will determine the html-graph-div by performing partial matching
     *     on the "id" property (using `gdID`) of all divs with classname="dash-graph".
     *     It will select the first item of that match list; so if multiple same
     *     graph-div IDs are used, or one graph-div-ID is a subset of the other (partial
     *     matching) there is no guarantee that the correct div will be selected.
     */
    gId: string,
    cWidth?: number,
    cHeight?: number,
} & DashComponentProps;


/**
 * Component meant to listen to the size of the canvas of a graph component with id = gId
 */
const GraphReporter = (props: Props) => {
    const {
        id,
        gId,
        cWidth,
        cHeight,
        setProps
    } = props;
    console.log("rendering graph-reporter");

    let canvasRef = null; //  = getCanvas(props.gId);

    const handleResize = (element) => {
        console.log("resize event");

        // TODO add a debounce here

        // Look whether the canvas is already available
        if (!canvasRef) {
            console.log("no canvas ref");
            canvasRef = getCanvas(props.gId);
        }
        if (element.target) {
            const payload: Partial<Props> = {
                cWidth: Number(canvasRef.getAttribute('width')),
                cHeight: Number(canvasRef.getAttribute('height'))
            }
            setProps(payload);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []); //empty list as second argument to trigger onMount!

    return (
        <div id={id}>
            <div>GraphReporter finished rendering: canvas size = {props.cHeight} x {props.cWidth}</div>
        </div>
    )
}

GraphReporter.defaultProps = {};

export default GraphReporter;

const getCanvas = (gId) => {
    let graphDiv = document?.querySelectorAll('div[id*="' + gId + '"][class*="dash-graph"]') as NodeListOf<HTMLDivElement>;
    if (graphDiv.length > 1) {
        throw new SyntaxError("GraphReporter: multiple graphs with ID=\"" + gId + "\" found; n=" + graphDiv.length + " \n(either multiple graphs with same ID's or current ID is a str-subset of other graph IDs)");
    } else if (graphDiv.length < 1) {
        throw new SyntaxError("GraphReporter: no graphs with ID=\"" + gId + "\" found");
    }
    console.log('found some graphs');
    let canvas = graphDiv[0]?.querySelector('rect[class*="nsewdrag drag"]') as Element;
    console.log(canvas);
    return canvas;
}