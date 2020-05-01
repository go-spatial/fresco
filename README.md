# fresco

[![Netlify Status](https://api.netlify.com/api/v1/badges/edab76b2-0437-4965-9d9c-6dae8de430ee/deploy-status)](https://app.netlify.com/sites/fresco/deploys)

### For Cartography Professionals and Amateur Map Makers Alike

Fresco is an open source [Mapbox Vector Tile Style](https://docs.mapbox.com/mapbox-gl-js/style-spec) editor that allows cartographers to craft stylesheets for use with [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/api/) maps. Unlike other style editors, Fresco does not attempt to hide the complexity of Mapbox GL Styles - but rather exposes and surfaces it for maximum control and flexibility. This allows the user to implement rich, interactive styles utilizing data driven properties with [expressions](https://docs.mapbox.com/help/tutorials/mapbox-gl-js-expressions/).

When using Fresco, it may be helpful to have the [Mapbox Style Spec](https://docs.mapbox.com/mapbox-gl-js/style-spec/) available as a reference.

Fresco runs in the browser and styles created and modified with Fresco are saved to the browser's local storage and are synced on changes. Be sure to download styles to your computer as a backup. Remote style storage and collaboration tools are coming soon.

Give it a try: [https://fresco.gospatial.org/](https://fresco.gospatial.org/)

![map editing screen shot](/docs/img/osm-screenshot.png)

## Features

- Rich map interaction style editor for use with Mapbox GL styles
- Editor mode for quick changes and at a glance comprehension
- Interactive JSON code editor for maximum control
- Feature inspection and state setting
- Works in our out of the browser - Fresco is available as a [downloadable application](https://github.com/go-spatial/fresco/releases)
- Auto save on style changes
- Styles persisted to local storage (in the browser)
- Mapbox GL style error parser - displays the error at the line location in the style
- Integrated Mapbox GL style spec attributes (info on style fields)
- Custom domain header configurations - useful for domains which require `Authorization` headers
- Open and free for everyone [license](https://github.com/go-spatial/fresco/blob/master/LICENSE)

## Usage

Fresco may be used in the browser by visiting [https://fresco.gospatial.org/](https://fresco.gospatial.org/) or by downloading a pre compiled binary from the [releases](https://github.com/go-spatial/fresco/releases) page.

## Running from source

Fresco is built on top of React. To run Fresco from source use the following steps:

1. Download the latest version of [Node.js](https://nodejs.org/en/download/)
2. Clone this repository to your computer
3. Navigate to this repo on your computer
4. Run `npm install`
5. To startup, run `npm start` - Fresco should open in a browser window
6. To build Fresco for deployment run `npm run build` - the deployment files will be inside the `/build` directoty

## Hosting Fresco from a subdirectory

Fresco is able to be hosted from a subdirectory of a domain (i.e. https://yourhost.com/fresco/). To enable this functionality, modify the `package.json` file


```
{
  "name": "fresco-app",
  "version": "0.1.0",
  "private": true,
  "homepage": "/fresco",
...

```

Then use `npm run build` to build Fresco for deployment.

## Contributing

Contributions are welcome! Fork the repo and send in a PR with any bug fixes or features.

## Looking for a vector tile server?

If you're looking to create vector tiles that can be styled with Fresco, check out [tegola](https://github.com/go-spatial/tegola)!
