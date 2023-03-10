#define SHADER_NAME BLOOM_FS

precision mediump float;

uniform sampler2D uMainSampler;

uniform vec2 offset;
uniform float strength;
uniform vec3 color;

varying vec2 outTexCoord;

void main ()
{
    vec4 sum = texture2D(uMainSampler, outTexCoord) * 0.204164 * strength;

    sum = sum + texture2D(uMainSampler, outTexCoord + offset * 1.407333) * 0.304005;
    sum = sum + texture2D(uMainSampler, outTexCoord - offset * 1.407333) * 0.304005;
    sum = sum + texture2D(uMainSampler, outTexCoord + offset * 3.294215) * 0.093913;

    gl_FragColor = (sum + texture2D(uMainSampler, outTexCoord - offset * 3.294215) * 0.093913) * vec4(color, 1);
}
