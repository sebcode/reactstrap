This is a fork of https://github.com/reactstrap/reactstrap Tag v8.10.1.

The fork removes the usage of defaultProps on function components to ensure compatibility with the upcoming React 19.

See https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md#deprecate-defaultprops-on-function-components

To use it with yarn, add this to your package.json:

    "resolutions": {
        "reactstrap": "npm:@sebttc/reactstrap8@^8.10.3"
    }
