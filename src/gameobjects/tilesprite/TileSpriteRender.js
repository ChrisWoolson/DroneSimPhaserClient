/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2013-2023 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var NOOP = require('../../utils/NOOP');
var renderWebGL = NOOP;
var renderCanvas = NOOP;

if (typeof WEBGL_RENDERER)
{
    renderWebGL = require('./TileSpriteWebGLRenderer');
}

if (typeof CANVAS_RENDERER)
{
    renderCanvas = require('./TileSpriteCanvasRenderer');
}

module.exports = {

    renderWebGL: renderWebGL,
    renderCanvas: renderCanvas

};
