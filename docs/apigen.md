<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [Methods][1]
    -   [Reader][2]
        -   [Parameters][3]
    -   [getLayerNames][4]
        -   [Parameters][5]
    -   [getLayer][6]
        -   [Parameters][7]
    -   [getStyleNames][8]
        -   [Parameters][9]
    -   [getStyle][10]
        -   [Parameters][11]
    -   [getRules][12]
        -   [Parameters][13]
        -   [Examples][14]
    -   [getGeometryStyles][15]
        -   [Parameters][16]
    -   [OlStyler][17]
        -   [Parameters][18]
        -   [Examples][19]
-   [Types][20]
    -   [StyledLayerDescriptor][21]
        -   [Properties][22]
    -   [Layer][23]
        -   [Properties][24]
    -   [FeatureTypeStyle][25]
        -   [Properties][26]
    -   [Rule][27]
        -   [Properties][28]
    -   [Filter][29]
        -   [Properties][30]
    -   [LineSymbolizer][31]
        -   [Properties][32]
    -   [PolygonSymbolizer][33]
        -   [Properties][34]
    -   [PointSymbolizer][35]
        -   [Properties][36]
    -   [GeometryStyles][37]
        -   [Properties][38]
-   [memoize][39]
    -   [Parameters][40]
-   [getOlFeatureId][41]
    -   [Parameters][42]
-   [getOlFeatureProperties][43]
    -   [Parameters][44]
-   [createOlStyleFunction][45]
    -   [Parameters][46]
    -   [Examples][47]
-   [getGeoJSONProperties][48]
    -   [Parameters][49]
-   [getGeoJSONFeatureId][50]
    -   [Parameters][51]

## Methods

All methods of this package. If you include the build directly they are props
of the global var SLDReader.


### Reader

Creates a object from an sld xml string,

#### Parameters

-   `sld` **[string][52]** xml string

Returns **[StyledLayerDescriptor][53]** object representing sld style

### getLayerNames

get all layer names in sld

#### Parameters

-   `sld` **[StyledLayerDescriptor][53]** 

Returns **[Array][54]&lt;[string][52]>** registered layernames

### getLayer

Get layer definition from sld

#### Parameters

-   `sld` **[StyledLayerDescriptor][53]** [description]
-   `layername` **[string][52]?** optional layername

Returns **[Layer][55]** [description]

### getStyleNames

getStyleNames, notice name is not required for userstyle, you might get undefined

#### Parameters

-   `layer` **[Layer][55]** [description]

Returns **[Array][54]&lt;[string][52]>** [description]

### getStyle

get style from array layer.styles, if name is undefined it returns default style.
null is no style found

#### Parameters

-   `layer` **[Layer][55]** [description]
-   `name` **[string][52]?** of style

Returns **[object][56]** the style from layer.styles matching the name

### getRules

get rules for specific feature after applying filters

#### Parameters

-   `featureTypeStyle` **[FeatureTypeStyle][57]** 
-   `feature` **[object][56]** geojson
-   `resolution` **[number][58]** m/px
-   `options`   (optional, default `{}`)

#### Examples

```javascript
const style = getStyle(sldLayer, stylename);
getRules(style.featuretypestyles['0'], geojson, resolution);
```

Returns **[Array][54]&lt;[Rule][59]>** 

### getGeometryStyles

Get styling from rules per geometry type

#### Parameters

-   `rules` **[Array][54]&lt;[Rule][59]>** [description]

Returns **[GeometryStyles][60]** 

### OlStyler

Create openlayers style

#### Parameters

-   `GeometryStyles` **[GeometryStyles][60]** rulesconverter
-   `feature` **([object][56] | Feature)** [geojson][61]
     or [ol/Feature][62] Changed in 0.0.04 & 0.0.5!

#### Examples

```javascript
OlStyler(getGeometryStyles(rules), geojson.geometry.type);
```

Returns **any** ol.style.Style or array of it

## Types

Types are the javascript representation of the ogc sld structure


### StyledLayerDescriptor

a typedef for StyledLayerDescriptor [xsd][63]

#### Properties

-   `version` **[string][52]** sld version
-   `layers` **[Array][54]&lt;[Layer][55]>** info extracted from NamedLayer element

### Layer

a typedef for Layer, the actual style object for a single layer

#### Properties

-   `name` **[string][52]** layer name
-   `styles` **[Array][54]&lt;[Object][56]>** See explanation at [Geoserver docs][64]
    -   `styles[].default` **[Boolean][65]** 
    -   `styles[].name` **[String][52]?** 
    -   `styles[].featuretypestyles` **[Array][54]&lt;[FeatureTypeStyle][57]>** Geoserver will draw multiple,
        libraries as openlayers can only use one definition!

### FeatureTypeStyle

a typedef for FeatureTypeStyle: [xsd][66]

#### Properties

-   `rules` **[Array][54]&lt;[Rule][59]>** 

### Rule

a typedef for Rule to match a feature: [xsd][66]

#### Properties

-   `name` **[string][52]** rule name
-   `filter` **[Array][54]&lt;[Filter][67]>?** 
-   `elsefilter` **[boolean][65]?** 
-   `minscaledenominator` **integer?** 
-   `maxscaledenominator` **integer?** 
-   `polygonsymbolizer` **[PolygonSymbolizer][68]?** 
-   `linesymbolizer` **[LineSymbolizer][69]?** 
-   `pointsymbolizer` **[PointSymbolizer][70]?** 

### Filter

[filter operators][71], see also
[geoserver][72]

#### Properties

-   `type` **[string][52]** Can be 'comparison', 'and', 'or', 'not', or 'featureid'.
-   `fids` **[Array][54]&lt;[string][52]>?** An array of feature id's. Required for type='featureid'.
-   `operator` **[string][52]?** Required for type='comparison'. Can be one of
    'propertyisequalto',
    'propertyisnotequalto',
    'propertyislessthan',
    'propertyislessthanorequalto',
    'propertyisgreaterthan',
    'propertyisgreaterthanorequalto',
    'propertyislike',
    'propertyisbetween'
-   `predicates` **[Array][54]&lt;[Filter][67]>?** Required for type='and' or type='or'.
    An array of filter predicates that must all evaluate to true for 'and', or
    for which at least one must evaluate to true for 'or'.
-   `predicate` **[Filter][67]?** Required for type='not'. A single predicate to negate.
-   `propertyname` **[string][52]?** Required for type='comparison'.
-   `literal` **[string][52]?** A literal value to use in a comparison,
    required for type='comparison'.
-   `lowerboundary` **[string][52]?** Lower boundary, required for operator='propertyisbetween'.
-   `upperboundary` **[string][52]?** Upper boundary, required for operator='propertyisbetween'.
-   `wildcard` **[string][52]?** Required wildcard character for operator='propertyislike'.
-   `singlechar` **[string][52]?** Required single char match character,
    required for operator='propertyislike'.
-   `escapechar` **[string][52]?** Required escape character for operator='propertyislike'.

### LineSymbolizer

a typedef for [LineSymbolizer][73], see also
[geoserver docs][74]

#### Properties

-   `stroke` **[Object][56]** 
    -   `stroke.css` **[Array][54]&lt;[Object][56]>** one object per CssParameter with props name (camelcased) & value

### PolygonSymbolizer

a typedef for [PolygonSymbolizer][73], see also
[geoserver docs][75]

#### Properties

-   `fill` **[Object][56]** 
    -   `fill.css` **[array][54]** one object per CssParameter with props name (camelcased) & value
-   `stroke` **[Object][56]** 
    -   `stroke.css` **[Array][54]&lt;[Object][56]>** with camelcased name & value

### PointSymbolizer

a typedef for PointSymbolizer [xsd][73]
& [geoserver docs][76]

#### Properties

-   `graphic` **[Object][56]** 
    -   `graphic.externalgraphic` **[Object][56]** 
        -   `graphic.externalgraphic.onlineresource` **[string][52]** 
    -   `graphic.mark` **[Object][56]** 
        -   `graphic.mark.wellknownname` **[string][52]** 
        -   `graphic.mark.fill` **[Object][56]** 
        -   `graphic.mark.stroke` **[Object][56]** 
    -   `graphic.opacity` **[Number][58]** 
    -   `graphic.size` **[Number][58]** 
    -   `graphic.rotation` **[Number][58]** 

### GeometryStyles

contains for each geometry type the symbolizer from an array of rules

#### Properties

-   `polygon` **[Array][54]&lt;[PolygonSymbolizer][68]>** polygonsymbolizers
-   `line` **[Array][54]&lt;[LineSymbolizer][69]>** linesymbolizers
-   `point` **[Array][54]&lt;[PointSymbolizer][70]>** pointsymbolizers, same as graphic prop from PointSymbolizer

## memoize

Function to memoize style conversion functions that convert sld symbolizers to OpenLayers style instances.
The memoized version of the style converter returns the same OL style instance if the symbolizer is the same object.
Uses a WeakMap internally.
Note: This only works for constant symbolizers.
Note: Text symbolizers depend on the feature property and the geometry type, these cannot be cached in this way.

### Parameters

-   `styleFunction` **[Function][77]** Function that accepts a single symbolizer object and returns the corresponding OpenLayers style object.

Returns **[Function][77]** The memoized function of the style conversion function.

## getOlFeatureId

Extract feature id from an OpenLayers Feature.

### Parameters

-   `feature` **Feature** [ol/Feature][62]

Returns **[string][52]** Feature id.

## getOlFeatureProperties

Extract properties object from an OpenLayers Feature.

### Parameters

-   `feature` **Feature** [ol/Feature][62]

Returns **[object][56]** Feature properties object.

## createOlStyleFunction

Create an OpenLayers style function from a FeatureTypeStyle object extracted from an SLD document.

### Parameters

-   `featureTypeStyle` **[FeatureTypeStyle][57]** Feature Type Style object.
-   `options` **[object][56]** Options (optional, default `{}`)
    -   `options.convertResolution` **[function][77]** An optional function to convert the resolution in map units/pixel to resolution in meters/pixel.
        When not given, the map resolution is used as-is.

### Examples

```javascript
myOlVectorLayer.setStyle(SLDReader.createOlStyleFunction(featureTypeStyle));
```

Returns **[Function][77]** A function that can be set as style function on an OpenLayers vector style layer.

## getGeoJSONProperties

Get feature properties from a GeoJSON feature.

### Parameters

-   `feature` **[object][56]** GeoJSON feature.

Returns **[object][56]** Feature properties.

## getGeoJSONFeatureId

Gets feature id from a GeoJSON feature.

### Parameters

-   `feature` **[object][56]** GeoJSON feature.

Returns **([number][58] \| [string][52])** Feature ID.

[1]: #methods

[2]: #reader

[3]: #parameters

[4]: #getlayernames

[5]: #parameters-1

[6]: #getlayer

[7]: #parameters-2

[8]: #getstylenames

[9]: #parameters-3

[10]: #getstyle

[11]: #parameters-4

[12]: #getrules

[13]: #parameters-5

[14]: #examples

[15]: #getgeometrystyles

[16]: #parameters-6

[17]: #olstyler

[18]: #parameters-7

[19]: #examples-1

[20]: #types

[21]: #styledlayerdescriptor

[22]: #properties

[23]: #layer

[24]: #properties-1

[25]: #featuretypestyle

[26]: #properties-2

[27]: #rule

[28]: #properties-3

[29]: #filter

[30]: #properties-4

[31]: #linesymbolizer

[32]: #properties-5

[33]: #polygonsymbolizer

[34]: #properties-6

[35]: #pointsymbolizer

[36]: #properties-7

[37]: #geometrystyles

[38]: #properties-8

[39]: #memoize

[40]: #parameters-8

[41]: #getolfeatureid

[42]: #parameters-9

[43]: #getolfeatureproperties

[44]: #parameters-10

[45]: #createolstylefunction

[46]: #parameters-11

[47]: #examples-2

[48]: #getgeojsonproperties

[49]: #parameters-12

[50]: #getgeojsonfeatureid

[51]: #parameters-13

[52]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[53]: #styledlayerdescriptor

[54]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[55]: #layer

[56]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[57]: #featuretypestyle

[58]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[59]: #rule

[60]: #geometrystyles

[61]: http://geojson.org

[62]: https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html

[63]: http://schemas.opengis.net/sld/1.1/StyledLayerDescriptor.xsd

[64]: http://docs.geoserver.org/stable/en/user/styling/sld/reference/styles.html

[65]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[66]: http://schemas.opengis.net/se/1.1.0/FeatureStyle.xsd

[67]: #filter

[68]: #polygonsymbolizer

[69]: #linesymbolizer

[70]: #pointsymbolizer

[71]: http://schemas.opengis.net/filter/1.1.0/filter.xsd

[72]: http://docs.geoserver.org/stable/en/user/styling/sld/reference/filters.html

[73]: http://schemas.opengis.net/se/1.1.0/Symbolizer.xsd

[74]: http://docs.geoserver.org/stable/en/user/styling/sld/reference/linesymbolizer.html#sld-reference-linesymbolizer

[75]: http://docs.geoserver.org/stable/en/user/styling/sld/reference/polygonsymbolizer.html

[76]: http://docs.geoserver.org/latest/en/user/styling/sld/reference/pointsymbolizer.html

[77]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function
