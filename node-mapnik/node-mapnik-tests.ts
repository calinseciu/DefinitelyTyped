/// <reference path="node-mapnik.d.ts" />

import mapnik = require('mapnik');

function test_Map() {
    var map:mapnik.Map = new mapnik.Map(600, 400);
    var mercatorMap:mapnik.Map = new mapnik.Map(600, 400, '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0.0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs +over');
}

function test_Layer() {
    var layer:mapnik.Layer = new mapnik.Layer('foo', '+init=epsg:4326');
    var name:string = layer.name;
    var srs:string = layer.srs;
    var styles:string[] = layer.styles;
    var ds:mapnik.Datasource = layer.datasource;
    var describe: Object = layer.describe();
}

function test_Datasource() {

}