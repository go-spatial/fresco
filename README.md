# fresco

Fresco is an open source [Mapbox Vector Tile Style](https://docs.mapbox.com/mapbox-gl-js/style-spec) editor that allows cartographers to craft stylesheets for use with [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/api/) maps. Unlike other style editors, Fresco does not attempt to hide the complexity of Mapbox GL Styles but rather exposes an interactive JSON code editor to allow for maximum control and flexibility. This allows the user to implement more complex styles concepts like data drive styles with [expressions](https://docs.mapbox.com/help/tutorials/mapbox-gl-js-expressions/). When using Fresco, it may be helpful to have the [Mapbox Style Spec](https://docs.mapbox.com/mapbox-gl-js/style-spec/) available as a reference.

Styles created and modified with Fresco are saved to the browser's local storage and are auto-saved on changes.

Give it a try: [https://fresco.gospatial.org/](https://fresco.gospatial.org/)

![map editing screenshot](/docs/img/osm-screenshot.png)

## Features

- Interactive JSON code editor
- Style editor for Mapbox GL styles
- Mapbox GL layer style expression editor
- Auto save on changes
- Styles auto saved to localStorage (in the browser)
- Mapbox GL style error parser. Displays the error at the error location in the style.
- Integrated Mapbox GL style spec attributes (info on style fields)
- Custom domain header configurations. Useful for domains which require `Authorization` headers. 

## Usage

Fresco may be used in the browser by visiting [https://fresco.gospatial.org/](https://fresco.gospatial.org/) or by downloading a [pre compiled binary](https://github.com/go-spatial/fresco/releases) from the releases page for your operating system.

## Running from source

Fresco is built ontop of React. To run Freco from source use the following steps:

1. Download the latest version of [Node.js](https://nodejs.org/en/download/)
2. Clone this repository to your computer
3. Navigate to this repo on your computer
4. Run `npm install`
5. To startup, run `npm start` - Fresco should open in a browser window

## Contributing

Contributions are welcome! Fork the repo and send in a PR with any bug fixes or features.

## Looking for a vector tile server?

If you're looking to create vector tiles that can be styled with Fresco, check out [tegola](https://github.com/go-spatial/tegola)!
