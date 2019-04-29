# fresco

An open source map style editor. Fresco allows cartographers to craft stylesheets for use with [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/api/) maps. Fresco has support for modifying Mapbox GL style expressions for creating stylesheets with complex, attribute-based styles.

Unlike other style editors, Fresco does not attempt to hide the complexity in the Mapbox GL style spec - on the contrary, it exposes that complexity to give cartographers maximum control and flexibility. When using Fresco, it may be helpful to have the style spec open in another tab as a reference: [Mapbox Style Spec](https://docs.mapbox.com/mapbox-gl-js/style-spec/).

Styles created and modified with Fresco are stored in the browser (in localStorage) and are auto-saved on changes. Be sure to download the styles to store them off the browser or deploy them.

[Try it](https://fresco.netlify.com/)

## Features

- Style editor for Mapbox GL styles
- Mapbox GL layer style expression editor
- Auto save on changes
- Styles stored in localStorage (in the browser)
- JSON code editor
- Mapbox GL error parser
- Integrated Mapbox GL style spec attributes (info on style fields)
- Resource domain header controls

## Usage

Fresco may be used without download by going to [Fresco Editor](https://fresco.netlify.com/). However, if you'd like to download Fresco and run it on your computer, you may do that also. Installation instructions are provided below.

## Installation

1. Download the latest version of [Node.js](https://nodejs.org/en/download/)
2. Clone this repository to your computer
3. Navigate to this repo on your computer
4. Run `npm install`
5. To startup, run `npm start` - Fresco should open in a browser window

![map editing screenshot](/docs/img/osm-screenshot.png)

