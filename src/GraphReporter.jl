
module GraphReporter
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "1.0.0"

include("jl/''_graphreporter.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "graph_reporter",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "graph_reporter.js",
    external_url = "https://unpkg.com/graph_reporter@1.0.0/graph_reporter/graph_reporter.js",
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "graph_reporter.js.map",
    external_url = "https://unpkg.com/graph_reporter@1.0.0/graph_reporter/graph_reporter.js.map",
    dynamic = true,
    async = nothing,
    type = :js
)
            ]
        )

    )
end
end
