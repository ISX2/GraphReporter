from graph_reporter import GraphReporter
import dash

app = dash.Dash(__name__)

app.layout = dash.html.Div(
    [
        dash.dcc.Graph(id="graph1"),
        # dash.dcc.Interval(id="interval", max_intervals=1, interval=500),
        GraphReporter(id="graphreporter", gId="graph1"),
        # dash.html.Div(id="grp-div"),
    ]
)


# @app.callback(
#     dash.Output("grp-div", "children"),
#     dash.Input("interval", "n_intervals"),
#     prevent_initial_call=True,
# )
# def add_graphreporter(n_intervals):
#     return GraphReporter(id="graphreporter", gId="graph1")


if __name__ == "__main__":
    app.run_server(debug=True, port=9052)
