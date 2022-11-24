from graph_reporter import GraphReporter
import dash

app = dash.Dash(__name__)

app.layout = dash.html.Div([
    dash.dcc.Graph(id="graph1"),
    GraphReporter(id='reporter', gId="graph1")
]
)

if __name__ == '__main__':
    app.run_server(debug=True)
