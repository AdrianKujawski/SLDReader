import GeometryType from 'ol/geom/geometrytype';
import SimpleGeometry from 'ol/geom/simplegeometry';

function dimension(filter, featureProperties) {
  const innerFunction = filter.function.function;
  if (innerFunction && innerFunction.name === 'geometry') {
    return geometry(filter, featureProperties);
  }
  const geom = featureProperties[filter.function.propertyname];
  return checkGeometry(geom, filter.literal);
}

function geometry(filter, featureProperties) {
  const geom = featureProperties.find(p => p instanceof SimpleGeometry);
  return checkGeometry(geom, filter.literal);
}

function checkGeometry(geom, literal) {
  const geomType = geom && geom.getType && geom.getType();
  switch (literal) {
    case '0':
      return geomType === GeometryType.POINT || geomType === GeometryType.MULTI_POINT;
    case '1':
      return geomType === GeometryType.LINE_STRING || geomType === GeometryType.MULTI_LINE_STRING;
    case '2':
      return geomType === GeometryType.POLYGON || geomType === GeometryType.MULTI_POLYGON;
    default:
      return false;
  }
}

export default function invokeFunction(filter, featureProperties) {
  switch (filter.function.name) {
    case 'dimension':
      return dimension(filter, featureProperties);
    case 'geometry':
      return geometry(filter, featureProperties);
    default:
      return false;
  }
}
