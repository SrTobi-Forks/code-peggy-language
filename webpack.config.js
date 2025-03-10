/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 * -------------------------------------------------------------------------------------------- */

// @ts-check

"use strict";

const path = require("path");

module.exports = {
  context: __dirname,
  mode: "none", // this leaves the source code as close as possible to the original (when packaging we set this to 'production')
  target: "node", // extensions run in a node context
  node: {
    __dirname: false // leave the __dirname-behaviour intact
  },
  resolve: {
    mainFields: ["module", "main"],
    extensions: [".ts", ".js"] // support ts-files and js-files
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [{
        // configure TypeScript loader:
        // * enable sources maps for end-to-end source maps
        loader: "ts-loader",
        options: {
          compilerOptions: {
            "sourceMap": true,
          }
        }
      }]
    }]
  },
  externals: {
    "vscode": "commonjs vscode", // ignored because it doesn't exist
  },
  devtool: "source-map",
  entry: {
    "server": "./server/src/server.ts",
    "main": "./src/main.ts",
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "out"),
    libraryTarget: "commonjs"
  }
};
