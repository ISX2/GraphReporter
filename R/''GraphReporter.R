# AUTO GENERATED FILE - DO NOT EDIT

#' @export
''GraphReporter <- function(id=NULL, cHeight=NULL, cWidth=NULL, gId=NULL) {
    
    props <- list(id=id, cHeight=cHeight, cWidth=cWidth, gId=gId)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'GraphReporter',
        namespace = 'graph_reporter',
        propNames = c('id', 'cHeight', 'cWidth', 'gId'),
        package = 'graphReporter'
        )

    structure(component, class = c('dash_component', 'list'))
}
