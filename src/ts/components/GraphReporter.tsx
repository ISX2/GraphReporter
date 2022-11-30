import React, {useEffect} from 'react';
import {DashComponentProps} from '../props';

type Props = {
    /**
     * The id of the graph-div whose traces should be updated.
     *
     * .. Note:
     *   * if you use multiple graphs; each graph MUST have a unique id; otherwise we
     *     cannot guarantee that resampling will work correctly.
     *   * TraceUpdater will determine the html-graph-div by performing partial matching
     *     on the "id" property (using `gdID`) of all divs with classname="dash-graph".
     *     It will select the first item of that match list; so if multiple same
     *     graph-div IDs are used, or one graph-div-ID is a subset of the other (partial
     *     matching) there is no guarantee that the correct div will be selected.
     */
    gId: string,
    /**
     * The width of the canvas, an HTML element found within the dcc.Graph component.
     *
     * Changes in this property can be used as input for callbacks
     */
    cWidth?: number,
    /**
     * The height of the canvas, an HTML element found within the dcc.Graph component.
     *
     * Changes in this property can be used as input for callbacks
     */
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


    /**  initialise the reference to the canvas on null
     *   => fill in once later, when the first resize event happens.
     *   this defers the action of getting the canvas until later, which gives the dcc.Graph component time to load in
     */
    let canvasRef = null;

    /**
     *
     * event handler function that is called when resizing the window containing the Dash application.
     * It simply fetches the width and height of the canvas HTML element within the dcc.Graph, and stores them in their
     * respective component properties
     *
     */
    const handleResize = (element) => {
        // Look whether the canvas is already available

        if (!canvasRef) {
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

    // This function will call the resize event handler only 200ms after the end of the resize movement
    // It reduces the number of updates that will eventually be sent to the plotly-resampler back-end,
    // optimizing this process
    let timer;
    const debounce = (element) => {
        clearTimeout(timer);
        timer = setTimeout(function(){
            handleResize(element)
        }, 200);
    }

    // using this hook to add event listeners. It corresponds to componentDidMount() and componentWillUnmount()
    // in React class components when the second argument of the hook is set to an empty list
    useEffect(() => {
        window.addEventListener('resize', debounce);
        return () => {
            window.removeEventListener('resize', debounce);
        }
    }, []);

    return (
        <div id={id}>
            <div>{`canvas size = ${props.cHeight} x ${props.cWidth}`}</div>
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
    let canvas = graphDiv[0]?.querySelector('rect[class*="nsewdrag drag"]') as Element;
    return canvas;
}