import React, {useEffect, useRef, useState} from 'react';
import {DashComponentProps} from '../props';

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
    //link this component to the graph canvas initially, when the GraphReporter component is loaded in
    // const [canvas, setCanvas] = useState(() => {
    //
    //     return canvas
    // })
    
    // const [dimensions, setDimensions] = React.useState(() => {
    //     return {
    //         cWidth: window.innerWidth,
    //         cHeight: window.innerHeight
    //     }
    // })
    // const [dimensions, setDimensions] = React.useState(() => {
    //     return {
    //         cWidth: Number(canvas.getAttribute('width')),
    //         cHeight: Number(canvas.getAttribute('height'))
    //     }
    // })
    let canvasRef = useRef(getCanvas(props.gId));
    console.log(canvasRef);
    const handleResize = (e) => {
        if (e.target) {
            const payload: Partial<Props> = {
                cWidth: Number(canvasRef.current.getAttribute('width')),
                cHeight: Number(canvasRef.current.getAttribute('height'))
            }
            // set height&width to state
            setProps(payload);
        }
        // setDimensions({
        //     cHeight: Number(canvas.getAttribute('height')),
        //     cWidth: Number(canvas.getAttribute('width'))
        // })
    }
    /*useEffect(() => {

        let canvas = canvasRef.current;
        console.log(canvas);

        canvas.addEventListener('resize', handleResize);

        //initial call to get the canvas size?
        // handleResize(canvas);
        return () => {
            canvas.removeEventListener('resize', handleResize);
        }
    }, []);*/

    // const height = props.cHeight;
    // const width = props.cWidth;
    console.log(`w:${props.cWidth}, h:${props.cHeight}`);
    return (
        <div id={id}>
            <div>GraphReporter finished rendering: canvas size = {props.cHeight} x {props.cWidth}</div>
            <button onClick={handleResize}>update</button>
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
    // let plotDiv = graphDiv?.[0]?.getElementsByClassName('js-plotly-plot')?.[0] as HTMLDivElement;
    // if (!isElement(plotDiv)) {
    //     throw new Error(`Invalid gId '${gId}'`);
    // }
    // search for the canvas element within the graph div!
    let canvas = graphDiv[0]?.querySelector('rect[class*="nsewdrag drag"]') as Element;
    // if (!isElement(canvas)) {
    //     throw new Error(`canvas element not found in graph with id: '${gId}'`);
    // }
    console.log(canvas);
    return canvas;
}