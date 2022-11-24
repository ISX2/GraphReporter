# AUTO GENERATED FILE - DO NOT EDIT

export ''_graphreporter

"""
    ''_graphreporter(;kwargs...)

A GraphReporter component.
Component meant to listen to the size of the canvas of a graph component with id = gId
Keyword arguments:
- `id` (String; optional): Unique ID to identify this component in Dash callbacks.
- `cHeight` (Real; optional)
- `cWidth` (Real; optional)
- `gId` (String; required): The id of the graph-div whose traces should be updated.

.. Note:

  * if you use multiple graphs; each graph MUST have a unique id; otherwise we
    cannot guarantee that resampling will work correctly.
  * TraceUpdater will determine the html-graph-div by performing partial matching
    on the "id" property (using `gdID`) of all divs with classname="dash-graph".
    It will select the first item of that match list; so if multiple same
    graph-div IDs are used, or one graph-div-ID is a subset of the other (partial
    matching) there is no guarantee that the correct div will be selected.
"""
function ''_graphreporter(; kwargs...)
        available_props = Symbol[:id, :cHeight, :cWidth, :gId]
        wild_props = Symbol[]
        return Component("''_graphreporter", "GraphReporter", "graph_reporter", available_props, wild_props; kwargs...)
end

