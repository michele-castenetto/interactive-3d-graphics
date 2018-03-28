# lezione9
PROGRAMMABLE SHADERS

- shader languages: glsl, hlsl, Cg
- vertex shader
```
uniform vec3 materialColor;
varying vec3 vColor;
void main() {
    gl_Position = projectionMatrix *
    modelViewMatrix * vec4( position, 1.0 );
    vColor = materialColor;
}
```
- fragment shader
```
varying vec3 vColor;
void main() {

 gl_FragColor = vec4(vColor, 1.0);

}
```
- using shaders with three.js
- shaders sites: ShaderToy (shadertoy.com), ShaderFrog (shaderfrog.com), glsl sandbox (glslsandbox.com)
- glsl basic data types, build-in variables storage qualifiers e funzioni