module.exports = [
    '#define SHADER_NAME BOKEH_FS',
    'precision mediump float;',
    '#define ITERATIONS 100.0',
    '#define ONEOVER_ITR 1.0 / ITERATIONS',
    '#define PI 3.141596',
    '#define GOLDEN_ANGLE 2.39996323',
    'uniform sampler2D uMainSampler;',
    'uniform vec2 resolution;',
    'uniform float radius;',
    'uniform float amount;',
    'uniform float contrast;',
    'uniform bool isTiltShift;',
    'uniform float strength;',
    'uniform vec2 blur;',
    'varying vec2 outTexCoord;',
    'vec2 Sample (in float theta, inout float r)',
    '{',
    '    r += 1.0 / r;',
    '    return (r - 1.0) * vec2(cos(theta), sin(theta)) * 0.06;',
    '}',
    'vec3 Bokeh (sampler2D tex, vec2 uv, float radius)',
    '{',
    '    vec3 acc = vec3(0.0);',
    '    vec3 div = vec3(0.0);',
    '    vec2 pixel = vec2(resolution.y / resolution.x, 1.0) * radius * .025;',
    '    float r = 1.0;',
    '    for (float j = 0.0; j < GOLDEN_ANGLE * ITERATIONS; j += GOLDEN_ANGLE)',
    '    {',
    '        vec3 col = texture2D(tex, uv + pixel * Sample(j, r)).xyz;',
    '        col = contrast > 0.0 ? col * col * (1.0 + contrast) : col;',
    '        vec3 bokeh = vec3(0.5) + pow(col, vec3(10.0)) * amount;',
    '        acc += col * bokeh;',
    '        div += bokeh;',
    '    }',
    '    return acc / div;',
    '}',
    'void main ()',
    '{',
    '    float shift = 1.0;',
    '    if (isTiltShift)',
    '    {',
    '        vec2 uv = vec2(gl_FragCoord.xy / resolution + vec2(-0.5, -0.5)) * 2.0;',
    '        float centerStrength = 1.0;',
    '        shift = length(uv * blur * strength) * centerStrength;',
    '    }',
    '    gl_FragColor = vec4(Bokeh(uMainSampler, outTexCoord * vec2(1.0, 1.0), radius * shift), 0.0);',
    '}',
].join('\n');
