% Auto-generated: do not edit by hand
\name{''GraphReporter}

\alias{''GraphReporter}

\title{GraphReporter component}

\description{
Component meant to listen to the size of the canvas of a graph component with id = gId
}

\usage{
''GraphReporter(id=NULL, cHeight=NULL, cWidth=NULL, gId=NULL)
}

\arguments{
\item{id}{Character. Unique ID to identify this component in Dash callbacks.}

\item{cHeight}{Numeric. }

\item{cWidth}{Numeric. }

\item{gId}{Character. The id of the graph-div whose traces should be updated.

.. Note:

  * if you use multiple graphs; each graph MUST have a unique id; otherwise we
    cannot guarantee that resampling will work correctly.
  * TraceUpdater will determine the html-graph-div by performing partial matching
    on the "id" property (using `gdID`) of all divs with classname="dash-graph".
    It will select the first item of that match list; so if multiple same
    graph-div IDs are used, or one graph-div-ID is a subset of the other (partial
    matching) there is no guarantee that the correct div will be selected.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

