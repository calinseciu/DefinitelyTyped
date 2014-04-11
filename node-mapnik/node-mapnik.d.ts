// Type definitions for node-mapnik 1.4.2
// Project: https://github.com/mapnik/node-mapnik
// Definitions by: Calin Seciu <https://github.com/calinseciu>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../node/node.d.ts" />

declare module "mapnik" {

    /**
     * Return a new Map object.
     *
     * Usage:
     *
     *     var mapnik = require('mapnik');
     *     var map = new mapnik.Map(800, 600);
     *
     * @param width     An integer width for the map. Normally for tiled rendering this value is some
     * power of 2, like 256 or 512 and matches the value for height.
     * @param height    An integer height for the map. Normally for tiled rendering this value is some
     * power of 2, like 256 or 512 and matches the value for width.
     * @param srs       If provided, this sets the Map spatial reference system (aka projection).
     * The format is the proj4 syntax. The default if you do not provide a value is
     * `+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs` (which is equivalent to the shorthand
     * of `+init=epsg:4326` and comes from Mapnik core). The most common srs for tiled rendering is
     * spherical mercator which is `+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0.0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs +over`
     * (which is equivalent to the shorthand of `+init=epsg:3857`). Note: Mapnik >= 2.2.x has
     * special handling for transforming between these common projections.
     */
    export class Map {
        constructor(width: number, height: number, srs?: string);

        /**
         * Load a stylesheet asynchronously.
         *
         * If called multiple times, styles / layers will accumulate, while
         * any map level properties will get overridden by the last map loaded.
         *
         * @param stylesheet Path to a mapnik xml stylesheet
         * @param callback
         */
        load(stylesheet: string, callback: (err: Error, map: Map) => void): void;

        /**
         * Load a stylesheet asynchronously.
         *
         * If called multiple times, styles / layers will accumulate, while
         * any map level properties will get overridden by the last map loaded.
         *
         * @param stylesheet Path to a mapnik xml stylesheet
         * @param options
         * @param callback
         */
        load(stylesheet: string, options: LoadOptions, callback: (err: Error, map: Map) => void): void;

        /**
         * Load a stylesheet synchronously.
         *
         * If called multiple times, styles / layers will accumulate, while
         * any map level properties will get overridden by the last map loaded.
         *
         * @param stylesheet Path to a mapnik xml stylesheet
         */
        loadSync(stylesheet: string, options?: LoadOptions): void;

        /**
         * Load a stylesheet from a given string, synchrounously.
         *
         * If called multiple times, styles / layers will accumulate, while
         * any map level properties will get overridden by the last map loaded.
         *
         * @param stylesheet Mapnik xml stylesheet as a string
         * @param options
         */
        fromStringSync(stylesheet: string, options?: LoadOptions): void;

        /**
         * Load a stylesheet from a given string, asynchrounously.
         *
         * If called multiple times, styles / layers will accumulate, while
         * any map level properties will get overridden by the last map loaded.
         *
         * @param stylesheet Mapnik xml stylesheet as a string
         * @param callback
         */
        fromString(stylesheet: string, callback: (err: Error, map: Map) => void): void;

        /**
         * Load a stylesheet from a given string, asynchrounously.
         *
         * If called multiple times, styles / layers will accumulate, while
         * any map level properties will get overridden by the last map loaded.
         *
         * @param stylesheet Mapnik xml stylesheet as a string
         * @param options
         * @param callback
         */
        fromString(stylesheet: string, options: LoadOptions, callback: (err: Error, map: Map) => void): void;

        /**
         * Save the mapnik xml stylesheet.
         *
         * @param path A path to map.xml stylesheet to save
         */
        save(path: string): void;

        /**
         * Remove all Mapnik Styles and layers from the Map.
         */
        clear(): void;

        /**
         * Return the mapnik xml stylesheet of the map.
         */
        toXML(): string;

        /**
         * Resize a Mapnik Map.
         *
         * @param width
         * @param height
         */
        resize(width: number, height: number): void;

        /**
         * Render to a given renderable mapnik object, asynchronously.
         *
         * @param renderable Can be an instance of: mapnik.Image, mapnik.Grid, mapnik.VectorTile
         * @param callback
         */
        render(renderable: any, callback: (err: Error, renderable: any) => void): void;

        /**
         * Render to a given renderable mapnik object, asynchronously.
         *
         * @param renderable Can be an instance of: mapnik.Image, mapnik.Grid, mapnik.VectorTile
         * @param options
         * @param callback
         */
        render(renderable: any, options: MapRenderOptions, callback: (err: Error, renderable: any) => void): void;

        /**
         * Render to an image, synchronously. The width and height are the ones of the map object.
         *
         * @param format Eg. 'png'
         * @param options
         */
        renderSync(format: string, options?: RenderFileOptions) : void;

        /**
         * Render to a given file path, asynchronously.
         *
         * @param file
         * @param callback
         */
        renderFile(file: string, callback: (err: Error) => void): void;

        /**
         * Render to a given file path, asynchronously.
         *
         * @param file
         * @param options
         * @param callback
         */
        renderFile(file: string, options: RenderFileOptions, callback: (err: Error) => void): void;

        /**
         * Render to a given file path, synchronously.
         *
         * @param file
         * @param options
         */
        renderFileSync(file: string, options?: RenderFileOptions): void;

        /**
         * Set the geographical extent of the map to the combined extents of all active layers.
         */
        zoomAll(): void;

        /**
         * Set the geographical extent of the map by specifying a Mapnik Box2d().
         *
         * @param bbox An array of: [minX, minY, maxX, maxY]
         */
        zoomToBox(bbox: number[]): void;

        /**
         * Set the geographical extent of the map by specifying a Mapnik Box2d.
         *
         * @param minX
         * @param minY
         * @param maxX
         * @param maxY
         */
        zoomToBox(minX: number, minY: number, maxX: number, maxY: number): void;

        /**
         * Return the Map Scale.
         */
        scale(): number;

        /**
         * Return the Map Scale Denominator.
         */
        scaleDenominator(): number;

        /**
         * Query a Map Layer (by all layers) for features intersecting
         * the given x,y location in the coordinates of map projection.
         *
         * Will return an array of layers if successful.
         *
         * Usage:
         *
         *     map.queryPoint(-12957605.0331, 5518141.9452, function(err, results) {
         *         var result = results[0];
         *         var fs = result.featureset;
         *         var feat;
         *         while(feat = fs.next()) {}
         *     });
         *
         * @param x
         * @param y
         * @param callback
         */
        queryPoint(x: number, y: number, callback: (err: Error, results: Layer[]) => void): void;

        /**
         * Query a Map Layer (by layer name or index) for features intersecting
         * the given x,y location in the coordinates of map projection.
         *
         * Layer index starts at 0 (first layer in map). Will return an array of layers if successful.
         *
         * Usage:
         *
         *     map.queryPoint(-12957605.0331, 5518141.9452, {layer: 0}, function(err, results) {
         *         var result = results[0];
         *         var fs = result.featureset;
         *         var feat;
         *         while(feat = fs.next()) {}
         *     });
         *
         * @param x
         * @param y
         * @param options
         * @param callback
         */
        queryPoint(x: number, y: number, options: QueryPointOptions, callback: (err: Error, results: Layer[]) => void): void;

        /**
         * Query a Map Layer (by all layers) for features intersecting
         * the given x,y location in the pixel coordinates of the rendered map image.
         *
         * Will return an array of layers if successful.
         *
         * Usage:
         *
         *     map.queryPoint(55, 130, function(err, results) {
         *         var result = results[0];
         *         var fs = result.featureset;
         *         var feat;
         *         while(feat = fs.next()) {}
         *     });
         *
         * @param x
         * @param y
         * @param callback
         */
        queryMapPoint(x: number, y: number, callback: (err: Error, results: Layer[]) => void): void;

        /**
         * Query a Map Layer (by layer name or index) for features intersecting
         * the given x,y location in the pixel coordinates of the rendered map image.
         *
         * Layer index starts at 0 (first layer in map). Will return an array of layers if successful.
         *
         * Usage:
         *
         *     map.queryPoint(55, 130, {layer: 0}, function(err, results) {
         *         var result = results[0];
         *         var fs = result.featureset;
         *         var feat;
         *         while(feat = fs.next()) {}
         *     });
         *
         * @param x
         * @param y
         * @param options
         * @param callback
         */
        queryMapPoint(x: number, y: number, options: QueryPointOptions, callback: (err: Error, results: Layer[]) => void): void;

        // Layer access

        /**
         * Add a mapnik.Layer on top.
         *
         * @param layer
         */
        add_layer(layer: Layer): void;

        /**
         * Return an existing layer by name or index.
         *
         * @param layer Layer name or index
         */
        get_layer(layer: any): Layer;

        /**
         * Return an array with all layers currently available in the map.
         */
        layers(): Layer[];

        // Properties

        /**
         * Spatial reference in Proj.4 format.
         *
         * Either an epsg code or proj literal.
         * For example, a proj literal: `+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs`
         * and a proj epsg code: `+init=epsg:4326`.
         *
         * Note: using epsg codes requires the installation of the
         * Proj.4 'epsg' data file normally found in '/usr/local/share/proj'.
         */
        srs: string;
        /**
         * Get/Set the width of the map in pixels. Minimum settable size is 16 pixels.
         */
        width: number;
        /**
         * Get/Set the height of the map in pixels. Minimum settable size is 16 pixels.
         */
        height: number;
        /**
         * Get/Set the size of buffer around map in pixels.
         */
        bufferSize: number;
        /**
         * The current Box2d() extent of the map, as [-180,-90,180,90]
         */
        extent: number[];
        /**
         * Get the Box2d() of the Map given the `Map.bufferSize`.
         *
         * Usage:
         *
         *     var map = new mapnik.Map(600,400);
         *     console.log(map.bufferedExtent) => [-1.0,-1.0,0.0,0.0]
         *     map.bufferSize = 1;
         *     console.log(map.bufferedExtent) => [-1.02222222222,-1.02222222222,0.0222222222222,0.0222222222222]
         */
        bufferedExtent: number[];
        /**
         * The maximum Box2d() extent of the map.
         *
         * Usage:
         *
         *     map.maximumExtent = [-180,-90,180,90];
         */
        maximumExtent: number[];
        /**
         * The background color of the map.
         */
        background: Color;
        parameters: any;
    }

    // Used in mapnik.Map
    interface MapRenderOptions {
        /**
         * Default is 0
         */
        buffer_size?: number;
        /**
         * Default is 1.0
         */
        scale?: number;
        /**
         * Default is 0.0
         */
        scale_denominator?: number;
        /**
         * Default is 0
         */
        offset_x?: number;
        /**
         * Default is 0
         */
        offset_y?: number;
    }

    // Used in mapnik.Map
    interface RenderFileOptions {
        /**
         * Default is 'png'
         */
        format?: string;
        palette?: Palette;
        /**
         * Default is 1.0
         */
        scale?: number;
        /**
         * Default is 0.0
         */
        scale_denominator?: number;
    }

    // Used in mapnik.Map
    interface LoadOptions {
        /**
         * If true, mapnik will throw errors instead of only logging them. Default is false.
         */
        strict?: boolean;
        /**
         * Default is ''
         */
        base?: string;
    }

    // Used in mapnik.Map
    interface QueryPointOptions {
        /**
         * Either a layer name (string) or a layer index (number).
         */
        layer?: any;
    }

    /**
     * A 32 bit RGBA image.
     *
     * Usage:
     *
     *     var im = new mapnik.Image(256, 256);
     */
    export class Image {
        constructor(image: Image);
        constructor(width: number, height: number);

        /**
         * Query the pixel color at {x, y}.
         *
         * If {x, y} is outside of the image, will return undefined.
         *
         * @param x
         * @param y
         */
        getPixel(x: number, y: number): Color;

        /**
         * Set a pixel color at {x, y} into the image.
         *
         * @param x
         * @param y
         * @param pixel
         */
        setPixel(x: number, y: number, pixel: Color): void;

        /**
         * Return a node Buffer from the image, synchronously.
         *
         * @param format Default is 'png'
         * @param options
         */
        encodeSync(format?: string, options?: EncodeOptions): NodeBuffer;

        /**
         * Return a node Buffer in the 'png' format from the image, asynchronously.
         *
         * @param callback
         */
        encode(callback: (err: Error, buffer: NodeBuffer) => void): void;

        /**
         * Return a node Buffer from the image, asynchronously.
         *
         * @param format Eg. 'png8:z=1'
         * @param options
         * @param callback
         */
        encode(format: string, callback: (err: Error, buffer: NodeBuffer) => void): void;

        /**
         * Return a node Buffer from the image, asynchronously.
         *
         * @param format Eg. 'png'
         * @param options
         * @param callback
         */
        encode(format: string, options: EncodeOptions, callback: (err: Error, buffer: NodeBuffer) => void): void;

        /**
         * Create an ImageView from the current image.
         *
         * @param x
         * @param y
         * @param width
         * @param height
         */
        view(x: number, y: number, width: number, height: number): ImageView;

        /**
         * Save the image to a file.
         *
         * If format is omitted, the file should contain the extension as 'image.png'.
         *
         * @param file
         * @param format Default is ''
         */
        save(file: string, format?: string): void;

        /**
         * Set the grayscale values to the alpha channel of the Image.
         */
        setGrayScaleToAlpha(): void;

        /**
         * Set a given color to the alpha channel of the Image.
         *
         * @param color
         */
        setGrayScaleToAlpha(color: Color): void;

        /**
         * Return the width of the image.
         */
        width(): number;

        /**
         * Return the height of the image.
         */
        height(): number;

        painted(): boolean;

        /**
         * Composite operations.
         *
         * @param imageMask
         * @param options
         * @param callback
         */
        composite(imageMask: Image, options: CompositeOptions, callback: (err: Error, imageOut: Image) => void): void;

        /**
         * Premultiply the image, synchronously.
         *
         * http://www.spherevfx.com/understanding-premultiplied-images/
         */
        premultiplySync(): void;

        /**
         * Premultiply the image, asynchronously.
         *
         * http://www.spherevfx.com/understanding-premultiplied-images/
         *
         * @param callback
         */
        premultiply(callback: (err: Error, image: Image) => void): void;

        /**
         * Demultiply the image, synchronously.
         *
         * http://www.spherevfx.com/understanding-premultiplied-images/
         */
        demultiplySync(): void;

        /**
         * Demultiply the image, asynchronously.
         *
         * http://www.spherevfx.com/understanding-premultiplied-images/
         *
         * @param callback
         */
        demultiply(callback: (err: Error, image: Image) => void): void;

        /**
         * Clear the image.
         *
         * @param callback
         */
        clear(callback: (err: Error) => void): void;

        /**
         * Clear the image.
         */
        clearSync(): void;

        // Properties

        /**
         * The background color of the image.
         */
        background: Color;

        // Statics

        /**
         * Open an image from a given file, asyncrhonously.
         *
         * @param file
         * @param callback
         */
        static open(file: string, callback: (err: Error, image: Image) => void);

        /**
         * Open an image from a given file, syncrhonously.
         *
         * @param file
         */
        static openSync(file: string): Image;

        /**
         * Open an image from a given buffer, asynchronously.
         *
         * @param buffer
         * @param callback
         */
        static fromBytes(buffer: NodeBuffer, callback: (err: Error, image: Image) => void): void;

        /**
         * Open an image from a given buffer, synchronously.
         *
         * @param buffer
         */
        static fromBytesSync(buffer: NodeBuffer): Image;
    }

    // Used in mapnik.Image
    interface CompositeOptions {
        /**
         * Must be a `mapnik.compositeOp` value.
         *
         * If not set, defaults to `mapnik.compositeOp['src_over']`.
         */
        comp_op?: any;
        /**
         * Default is 1.0
         */
        opacity?: number;
        /**
         * Default is 0
         */
        dx?: number;
        /**
         * Default is 0
         */
        dy?: number;
        /**
         * Image filters, as: 'invert agg-stack-blur(10,10)'.
         *
         * For possible values look at https://github.com/mapnik/mapnik/blob/master/src/image_filter_grammar.cpp
         */
        image_filters?: string;
    }

    /**
     * A view into an image.
     *
     * This class is not to be instantiated manually. Instead, use:
     *
     *     var im = new mapnik.Image(256, 256);
     *     var view = im.view(0, 0, 256, 256);
     *
     */
    class ImageView {
        constructor(image: Image, x: number, y: number, width: number, height: number);

        /**
         * Return a node Buffer from the image view, synchronously.
         *
         * @param format Default is 'png'
         * @param options
         */
        encodeSync(format?: string, options?: EncodeOptions): NodeBuffer;

        /**
         * Return a node Buffer in the 'png' format from the image view, asynchronously.
         *
         * @param callback
         */
        encode(callback: (err: Error, buffer: NodeBuffer) => void): void;

        /**
         * Return a node Buffer from the image view, asynchronously.
         *
         * @param format Eg. 'png8:z=1'
         * @param options
         * @param callback
         */
        encode(format: string, callback: (err: Error, buffer: NodeBuffer) => void): void;

        /**
         * Return a node Buffer from the image view, asynchronously.
         *
         * @param format Eg. 'png'
         * @param options
         * @param callback
         */
        encode(format: string, options: EncodeOptions, callback: (err: Error, buffer: NodeBuffer) => void): void;

        /**
         * Save the image view to a file.
         *
         * @param file
         * @param format Default is ''
         */
        save(file: string, format?: string): void;

        /**
         * Return the width of the image view.
         */
        width(): number;

        /**
         * Return the height of the image view.
         */
        height(): number;

        /**
         * Same as `isSolidSync()`.
         */
        isSolid(): boolean;

        /**
         * Check if image view is solid color, asynchronously.
         *
         * If solid, `pixel` will contain the pixel as integer.
         * If not solid, `pixel` will be undefined.
         *
         * @param callback
         */
        isSolid(callback: (err: Error, solid: boolean, pixel: number) => void): void;

        /**
         * Check if image view is solid color, synchronously.
         */
        isSolidSync(): boolean;

        /**
         * Query the pixel color at {x, y}.
         *
         * If {x, y} is outside of the view, will return undefined.
         *
         * @param x
         * @param y
         */
        getPixel(x: number, y: number): Color;
    }

    // Used in mapnik.Image and mapnik.ImageView
    interface EncodeOptions {
        palette?: Palette;
    }

    // todo
    export class Grid {

    }

    /**
     * Mapnik Vector Tile.
     *
     * Usage:
     *
     *     var vtile = new mapnik.VectorTile(9,112,195);
     */
    export class VectorTile {
        constructor(z: number, x: number, y: number);

        /**
         * Render to a given renderable mapnik object, asynchronously.
         *
         * @param map
         * @param renderable Can be an instance of: mapnik.Image, mapnik.CairoSurface, mapnik.Grid
         * @param options
         * @param callback
         */
        render(map: Map, renderable: any, options: VectorTileRenderOptions, callback: (err: Error, renderable: any) => void): void;

        // todo: add more API
    }

    // Used in mapnik.VectorTile
    interface VectorTileRenderOptions {
        // todo change this
        /**
         * Default is 0
         */
        buffer_size?: number;
        /**
         * Default is 1.0
         */
        scale?: number;
        /**
         * Default is 0.0
         */
        scale_denominator?: number;
        /**
         * Default is 0
         */
        offset_x?: number;
        /**
         * Default is 0
         */
        offset_y?: number;
    }

    /**
     * A Mapnik map layer.
     *
     * Mapnik Layers are basically containers around datasources, that store useful properties.
     *
     * Note: `srs` is the source projection of the Datasource and must match the projection
     * of the coordinates of that data or else your map will likely be blank. Will default to
     * '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'.
     *
     * Usage:
     *
     *     var layer = new mapnik.Layer('foo', '+init=epsg:4326');
     */
    export class Layer {
        constructor(layer: Layer);
        constructor(name: string, srs?: string);

        /**
         * Return the layer properties, as an Object.
         *
         * The following keys are available:
         *
         * * `name` string
         * * `srs` string
         * * `styles` string[] An array with style names
         * * `datasource` Object Datasource options object
         */
        describe(): Object;

        /**
         * Layer name
         */
        name: string;
        /**
         * Layer projection
         */
        srs: string;
        /**
         * Layer styles
         */
        styles: string[];
        /**
         * Layer Datasource
         */
        datasource: Datasource;
    }

    /**
     * Mapnik datasource.
     *
     * Usage:
     *
     *     var ds = new mapnik.Datasource({
     *         type: 'shape',
     *         file: './test/data/world_merc.shp'
     *     });
     *
     *     var ds = new mapnik.Datasource({
     *         type: 'postgis',
     *         dbname: 'gis',
     *         table: 'world_merc',
     *         user: 'postgres',
     *         password: '****',
     *         extent : '-20005048.4188,-9039211.13765,19907487.2779,17096598.5401'  //change this if not merc
     *     });
     *
     *     var ds = new mapnik.Datasource({
     *         type: 'geojson',
     *         file: '../test/world.json'
     *     });
     */
    export class Datasource {
        constructor(ds: Datasource);
        constructor(options: DatasourceShapeOptions);
        constructor(options: DatasourcePostGISOptions);
        constructor(options: DatasourceGeoJSONOptions);
        // todo: add more datasources

        /**
         * Return the datasource options that were passed at initialization.
         */
        parameters(): Object;

        /**
         * Return the datasource properties, as an Object.
         *
         * The following keys may be available:
         *
         * * `type` string Either 'vector' or 'raster'
         * * `encoding` string Eg. 'utf-8'
         * * `fields` Object As {FIPS: 'String',ISO2: 'String',ISO3: 'String',UN: 'Number',NAME: 'String',AREA: 'Number',POP2005: 'Number',REGION: 'Number',SUBREGION: 'Number',LON: 'Number',LAT: 'Number'}
         * * `geometry_type` string Eg. 'polygon'
         */
        describe(): Object;

        /**
         * Return all Features as a Featureset.
         */
        featureset(): Featureset;

        /**
         * As [-20037508.342789248,-8283343.693882697,20037508.342789244,18365151.363070473]
         */
        extent(): number[];
    }

    // Used in mapnik.Datasource
    interface DatasourceShapeOptions extends DatasourceOptions{
        /**
         * Shape file path, eg. './test/data/world_merc.shp'
         */
        file: string;
        /**
         * Default is 0
         */
        row_limit?: number;
        /**
         * Default is 'utf-8'
         */
        encoding?: string;
        /**
         * Default is ''. Should be set without trailing '/', eg. '/Users/calin/tmp'
         */
        base?: string;
    }

    // Used in mapnik.Datasource
    interface DatasourcePostGISOptions extends DatasourceOptions {
        table: string;
        /**
         * If not specified, localhost is assumed ?
         */
        host?: string;
        /**
         * If not specified, the default PostgreSQL port is assumed ?
         */
        port?: number;
        dbname: string;
        user: string;
        password?: string;
        /**
         * Given as '-20005048.4188,-9039211.13765,19907487.2779,17096598.5401' in mercator.
         *
         * If not given, it will be determined automatically.
         */
        extent?: string;
        /**
         * Pool max size.
         *
         * Default is 10
         */
        max_size?: number;
        /**
         * Default is true
         */
        persist_connection?: boolean;
        /**
         * If a subselect limits records then calculating the extent upon the
         * subquery will be faster and the bounds will be more accurate,
         * but if the subquery does not limit records then querying the
         * actual table will be faster as indexes can be used.
         *
         * Default is false
         */
        extent_from_subquery?: boolean;
        /**
         * If > 1, then `max_async_connection <= max_size`.
         * Actually should be `max_size = max_async_connection * num_threads`.
         *
         * Default is 1
         */
        max_async_connection?: number;
        /**
         * Default is '4'
         */
        connect_timeout?: string;
        /**
         * If not specified, it will be determined by the simplistic
         * table parsing in `mapnik::sql_utils::table_from_sql(table)`.
         */
        geometry_table?: string;
        /**
         * If we do not know both the geometry_field and the srid
         * then first attempt to fetch the geometry name is from a geometry_columns entry.
         * This will return no records if we are querying a bogus table returned
         * from the simplistic table parsing in table_from_sql() or if
         * the table parameter references a table, view, or subselect not
         * registered in the geometry columns.
         */
        geometry_field?: string;
        /**
         * If not specified, it will try to automatically determine it
         * only if `autodetect_key_field` is true.
         */
        key_field?: string;
        /**
         * Default is 0
         */
        cursor_size?: number;
        /**
         * Default is 0
         */
        row_limit?: number;
        /**
         * http://postgis.org/docs/ST_SRID.html
         *
         * Default is 0
         */
        srid?: number;
        /**
         * The initial size of the connection pool. Default is 1.
         */
        initial_size?: number;
        /**
         * Set to true if a globally unique key field/primary key is required.
         *
         * Default is false
         */
        autodetect_key_field?: boolean;
        /**
         * Applies only if `extent` was not given.
         *
         * If true, it will use http://postgis.org/docs/ST_Estimated_Extent.html,
         * if false, it will use http://postgis.org/docs/ST_Extent.html.
         *
         * Default is false
         */
        estimate_extent?: boolean;
        /**
         * If true, it uses http://www.postgis.org/docs/ST_Simplify.html
         * and 1/20 tolerance (https://github.com/mapnik/mapnik/issues/1639).
         *
         * Default is false
         */
        simplify_geometries?: boolean;
    }

    interface DatasourceGeoJSONOptions extends DatasourceOptions {
        /**
         * Path to a geojson file, eg. 'world.json'
         */
        file: string;
        /**
         * Default is 'utf-8'
         */
        encoding?: string;
        /**
         * Default is ''. Should be set without trailing '/', eg. '/Users/calin/tmp'
         */
        base?: string;
    }

    // Used in mapnik.Datasource
    interface DatasourceOptions {
        /**
         * Possible values: 'shape', 'postgis', 'csv', 'osm', 'sqlite', 'geojson', 'ogr', 'gdal'.
         */
        type: string;
    }

    /**
     * A Featureset cannot currently be created, only accessed
     * via an existing datasource.
     */
    class Featureset {
        next(): Feature;
    }

    /**
     * Mapnik Feature.
     */
    class Feature {
        constructor(id: number);

        /**
         * Return the Feature id, as integer
         */
        id(): number;

        /**
         * The Box2d() extent of the feature.
         */
        extent(): number[];

        /**
         * Return the feature attributes.
         */
        attributes(): Object;

        addGeometry(geometry: Geometry): void;

        addAttributes(attributes: Object): void;

        /**
         * Number of geometries.
         */
        numGeometries(): number;

        toString(): string;

        /**
         * Return as GeoJSON string.
         */
        toJSON(): string;

        toWKB(): NodeBuffer;

        toWKT(): string;
    }

    /**
     * Mapnik Geometry.
     */
    class Geometry {
        /**
         * Equals to MAPNIK_POINT
         */
        static Point: number;
        /**
         * Equals to MAPNIK_LINESTRING
         */
        static LineString: number;
        /**
         * Equals to MAPNIK_POLYGON
         */
        static Polygon: number;

        /**
         * The Box2d() extent.
         */
        extent(): number[];

        /**
         * Equals to one of: Geometry.Point/LineString/Polygon
         */
        type(): number;
    }

    /**
     * Color mapnik object.
     *
     * Usage:
     *
     *     var c = new mapnik.Color('green');
     *     var c = new mapnik.Color(0, 128, 0);
     *     var c = new mapnik.Color(0, 128, 0, 255);
     *     var c = new mapnik.Color('rgba(0%,50%,0%,1)');
     */
    export class Color {
        constructor(color: string);
        constructor(r: number, g: number, b: number, a?: number);

        /**
         * Return the hex code, eg. '#008000'
         */
        hex(): string;
        /**
         * Return color as string, eg. 'rgb(0,128,0)'
         */
        toString(): string;

        r: number;
        g: number;
        b: number;
        a: number;
    }

    /**
     * Mapnik color palette.
     *
     * Usage:
     *
     *     var pal = new mapnik.Palette('\x01\x02\x03\x04');
     *     val pal = new mapnik.Palette('\x01\x02\x03', 'rgb');
     *     var pal = new mapnik.Palette(fs.readFileSync('palette256.act'), 'act');
     *
     * Possible constructor parameters:
     *
     * * `binaryHex` As '\x01\x02\x03\x04' or '\x01\x02\x03'
     * * `buffer` A node Buffer object
     * * `type` Possible values: 'rgba' (default), 'rgb', 'act'.
     */
    export class Palette {
        constructor(binaryHex: string, type?: string);
        constructor(buffer: NodeBuffer, type?: string);

        /**
         * Return palette as string.
         *
         * Usage:
         *
         *     new mapnik.Palette('\x01\x02\x03', 'rgb').toString() => '[Palette 1 color #010203]'
         *     new mapnik.Palette('\xff\x09\x93\xFF\x01\x02\x03\x04').toString() => '[Palette 2 colors #01020304 #ff0993]'
         */
        toString(): string;

        /**
         * Return palette as node Buffer object.
         *
         * Usage:
         *
         *     new mapnik.Palette('\xff\x09\x93\xFF\x01\x02\x03\x04').toBuffer().toString('binary') => '\x01\x02\x03\x04\xff\x09\x93\xFF'
         */
        toBuffer(): NodeBuffer;
    }

    /**
     * Mapnik Projection.
     *
     * Usage:
     *
     *     var wgs84 = new mapnik.Projection('+init=epsg:4326');
     *     var merc = new mapnik.Projection('+init=epsg:3857');
     */
    export class Projection {
        constructor(srs: string);

        /**
         * Projects the given coordinates (Box2d or Coord) from the geographic space into the cartesian space.
         *
         * Usage:
         *
         *     console.log(proj.forward([-122.33517, 47.63752])); => [-13618288.8305, 6046761.54747]
         *     console.log(proj.forward([-131.3086, 16.8045, -61.6992, 54.6738])); => [-14617205.7910, 1898084.2861, -6868325.6126, 7298818.9559]
         *
         * @param coords
         */
        forward(coords: number[]): number[];

        /**
         * Projects the given coordinates (Box2d or Coord) from the cartesian space into the geographic space.
         *
         * Usage:
         *
         *     console.log(proj.inverse([-13618288.8305, 6046761.54747])); => [-122.33517, 47.63752]
         *     console.log(proj.inverse([-14617205.7910, 1898084.2861, -6868325.6126, 7298818.9559])); => [-131.3086, 16.8045, -61.6992, 54.6738]
         *
         * @param coords
         */
        inverse(coords: number[]): number[];
    }

    /**
     * Utility class for transforming from one projection to another.
     *
     * Usage:
     *
     *     var from = new mapnik.Projection('+init=epsg:4326'); // wsg
     *     var to = new mapnik.Projection('+init=epsg:3857');   // merc
     *     var trans = new mapnik.ProjTransform(from, to);
     *
     *     var long_lat_coords = [-122.33517, 47.63752];
     *     var merc = [-13618288.8305, 6046761.54747];
     *
     *     -> merc == trans.forward(long_lat_coords);   // should forward coords properly (4326 -> 3857)
     *     -> long_lat_coords == trans.backward(merc);  // should backward coords properly (3857 -> 4326)
     */
    export class ProjTransform {
        constructor(from: Projection, to: Projection);

        /**
         * Transform the given coordinates (Box2d or Coord) from the first projection to the second.
         *
         * Input should be given in the first projection.
         *
         * @param coords
         */
        forward(coords: number[]): number[];

        /**
         * Transform the given coordinates (Box2d or Coord) from the second projection to the first.
         *
         * Input should be given in the second projection.
         *
         * @param coords
         */
        backward(coords: number[]): number[];
    }

    // Module level properties

    /**
     * Possible keys: clear, src, dst, src_over, dst_over, src_in, dst_in, src_out, dst_out, src_atop, dst_atop, xor, plus, minus, multiply, screen, overlay, darken, lighten, color_dodge, color_burn, hard_light, soft_light, difference, exclusion, contrast, invert, grain_merge, grain_extract, hue, saturation, color, value
     */
    var compositeOp: Object;

    var settings: Settings;

    interface Settings {
        paths: SettingsPaths;
        env: SettingsEnv;
    }

    interface SettingsPaths {
        fonts: string;  // eg. 'c:\dev2\node-mapnik\lib\binding\mapnik\fonts'
        input_plugins: string;  // eg. 'c:\dev2\node-mapnik\lib\binding\mapnik\input'
    }

    interface SettingsEnv {
        GDAL_DATA: string;  // eg. 'c:\dev2\node-mapnik\lib\binding\share\gdal'
        ICU_DATA: string;   // eg. 'c:\dev2\node-mapnik\lib\binding\share\icu'
        PROJ_LIB: string;   // eg. 'c:\dev2\node-mapnik\lib\binding\share\proj'
    }

    var supports: Supports;

    interface Supports {
        cairo: boolean;
        cairo_pdf: boolean;
        cairo_svg: boolean;
        grid: boolean;
        jpeg: boolean;
        png: boolean;
        proj4: boolean;
        svg: boolean;
        threadsafe: boolean;
        tiff: boolean;
        webp: boolean;
    }

    var versions: Versions;

    interface Versions {
        boost: string;
        boost_number: number;
        cairo?: string;
        mapnik: string;
        mapnik_number: number;
        node: string;
        v8: string;
    }

    // Module level functions

    /**
     * Register an mapnik input plugin.
     *
     * Usage:
     *
     *     var path = require('path');
     *     mapnik.register_datasource(path.join(mapnik.settings.paths.input_plugins,'postgis.input'));
     *     mapnik.register_datasource(path.join(mapnik.settings.paths.input_plugins,'shape.input'));
     *
     * @param inputPlugin Path to a mapnik input plugin file
     */
    function register_datasource(inputPluginFile: string): boolean;

    /**
     * Register mapnik input plugins from a directory.
     *
     * Usage:
     *
     *     mapnik.register_datasources(mapnik.settings.paths.input_plugins);
     *
     * @param inputPluginDir Path to a directory of mapnik input plugins
     */
    function register_datasources(inputPluginDir: string): boolean;

    /**
     * Return the registered mapnik input plugin names.
     */
    function datasources(): string[];

    /**
     * Register fonts from a directory.
     *
     * @param fontsDir Path to a directory of fonts
     * @param options
     */
    function register_fonts(fontsDir: string, options?: RegisterFontsOptions): boolean;

    interface RegisterFontsOptions {
        /**
         * True to recurse into directories.
         */
        recurse?: boolean;
    }

    /**
     * Return the registered font names.
     */
    function fonts(): string[];

    /**
     * Return the registered font files.
     */
    function fontFiles(): string[];

    /**
     * Clear all global caches of markers and mapped memory regions.
     */
    function clearCache(): void;

    /**
     * Optional notification that the embedder is idle.
     * V8 uses the notification to reduce memory footprint.
     * This call can be used repeatedly if the embedder remains idle.
     * Returns true if the embedder should stop calling IdleNotification
     * until real work has been done.  This indicates that V8 has done
     * as much cleanup as it will be able to do.
     */
    function gc(): boolean;

    /**
     * Shutdown stuff.
     */
    function shutdown(): void;
}