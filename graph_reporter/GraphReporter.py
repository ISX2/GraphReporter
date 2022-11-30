# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class GraphReporter(Component):
    """A GraphReporter component.
Component meant to listen to the size of the canvas of a graph component with id = gId

Keyword arguments:

- id (string; optional):
    Unique ID to identify this component in Dash callbacks.

- cHeight (number; optional):
    The height of the canvas, an HTML element found within the
    dcc.Graph component.    Changes in this property can be used as
    input for callbacks.

- cWidth (number; optional):
    The width of the canvas, an HTML element found within the
    dcc.Graph component.    Changes in this property can be used as
    input for callbacks.

- gId (string; required):
    The id of the graph-div whose traces should be updated.    ..
    Note:    * if you use multiple graphs; each graph MUST have a
    unique id; otherwise we      cannot guarantee that resampling will
    work correctly.    * TraceUpdater will determine the
    html-graph-div by performing partial matching      on the \"id\"
    property (using `gdID`) of all divs with classname=\"dash-graph\".
    It will select the first item of that match list; so if multiple
    same      graph-div IDs are used, or one graph-div-ID is a subset
    of the other (partial      matching) there is no guarantee that
    the correct div will be selected."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'graph_reporter'
    _type = 'GraphReporter'
    @_explicitize_args
    def __init__(self, gId=Component.REQUIRED, cWidth=Component.UNDEFINED, cHeight=Component.UNDEFINED, id=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'cHeight', 'cWidth', 'gId']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'cHeight', 'cWidth', 'gId']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['gId']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(GraphReporter, self).__init__(**args)
