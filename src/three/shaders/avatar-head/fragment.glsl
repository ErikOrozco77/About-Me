#include ../includes/avatar-progress/fragment.glsl;
#include ../includes/about-ambient.glsl;

uniform sampler2D uHeadTexture;
uniform vec2 uHeadTextureSize;
uniform vec3 uTint;

varying vec2 vUv;

void main() {
    vec4 tex = texture2D(uHeadTexture, vUv);
    tex.rgb *= uTint;

    float progress = getProgress();

    gl_FragColor = vec4(applyAmbient(tex.rgb), progress);
}