import{s as W,t as z,u as C,i as T,W as B,v as b,w as S,U as k,x as U,V as n,M as y,y as H,z as v,N as I,c as O,A as _,G as L,b as N,H as x,I as G,J as j,K as V,X as K,Y as Z,Z as q}from"./index.17961d10.js";/**
 * postprocessing v6.26.4 build Tue May 03 2022
 * https://github.com/pmndrs/postprocessing
 * Copyright 2015-2022 Raoul van Rüschen
 * @license Zlib
 */var Y=`#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <encodings_fragment>
#include <dithering_fragment>
}`,X="uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",E=class extends H{constructor(e=new S){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new v(null),texelSize:new v(new S),kernel:new v(0),scale:new v(1)},blending:I,depthWrite:!1,depthTest:!1,fragmentShader:Y,vertexShader:X}),this.toneMapped=!1,this.setTexelSize(e.x,e.y)}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.inputBuffer=e}get scale(){return this.uniforms.scale.value}set scale(e){this.uniforms.scale.value=e}getScale(){return this.uniforms.scale.value}setScale(e){this.uniforms.scale.value=e}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(e){this.uniforms.kernel.value=e}setKernel(e){this.kernel=e}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t,e*.5,t*.5)}setSize(e,t){const r=1/e,i=1/t;this.uniforms.texelSize.value.set(r,i,r*.5,i*.5)}};new W;var o=null;function $(){if(o===null){const e=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),t=new Float32Array([0,0,2,0,0,2]);o=new N,o.setAttribute!==void 0?(o.setAttribute("position",new x(e,3)),o.setAttribute("uv",new x(t,2))):(o.addAttribute("position",new x(e,3)),o.addAttribute("uv",new x(t,2)))}return o}var J=class{constructor(e,t,r){this.name=e,this.renderer=null,this.scene=t,this.camera=r,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(e){if(this.rtt===e){const t=this.getFullscreenMaterial();t!==null&&(t.needsUpdate=!0),this.rtt=!e}}setRenderer(e){this.renderer=e}isEnabled(){return this.enabled}setEnabled(e){this.enabled=e}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(e){let t=this.screen;t!==null?t.material=e:(t=new O($(),e),t.frustumCulled=!1,this.scene===null&&(this.scene=new _),this.scene.add(t),this.screen=t)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(e){this.fullscreenMaterial=e}getDepthTexture(){return null}setDepthTexture(e,t=L){}render(e,t,r,i,s){throw new Error("Render method not implemented!")}setSize(e,t){}initialize(e,t,r){}dispose(){for(const e of Object.keys(this)){const t=this[e];if(t!==null&&typeof t.dispose=="function"){if(t instanceof _||t===this.renderer)continue;this[e].dispose()}}}};new z;var u=-1,w=class extends C{constructor(e,t=u,r=u,i=1){super(),this.resizable=e,this.base=new T(1,1),this.preferred=new T(t,r),this.target=this.preferred,this.s=i}get width(){const{base:e,preferred:t,scale:r}=this;let i;return t.width!==u?i=t.width:t.height!==u?i=Math.round(t.height*(e.width/Math.max(e.height,1))):i=Math.round(e.width*r),i}set width(e){this.preferredWidth=e}get height(){const{base:e,preferred:t,scale:r}=this;let i;return t.height!==u?i=t.height:t.width!==u?i=Math.round(t.width/Math.max(e.width/Math.max(e.height,1),1)):i=Math.round(e.height*r),i}set height(e){this.preferredHeight=e}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(e){this.s!==e&&(this.s=e,this.preferred.setScalar(u),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.base.width,this.base.height))}getScale(){return this.scale}setScale(e){this.scale=e}get baseWidth(){return this.base.width}set baseWidth(e){this.base.width!==e&&(this.base.width=e,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.base.width,this.base.height))}getBaseWidth(){return this.base.width}setBaseWidth(e){this.base.width!==e&&(this.base.width=e,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.base.width,this.base.height))}get baseHeight(){return this.base.height}set baseHeight(e){this.base.height!==e&&(this.base.height=e,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.base.width,this.base.height))}getBaseHeight(){return this.baseHeight}setBaseHeight(e){this.baseHeight=e}setBaseSize(e,t){(this.base.width!==e||this.base.height!==t)&&(this.base.set(e,t),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.base.width,this.base.height))}get preferredWidth(){return this.preferred.width}set preferredWidth(e){this.preferred.width!==e&&(this.preferred.width=e,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.base.width,this.base.height))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(e){this.preferredWidth=e}get preferredHeight(){return this.preferred.height}set preferredHeight(e){this.preferred.height!==e&&(this.preferred.height=e,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.base.width,this.base.height))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(e){this.preferredHeight=e}setPreferredSize(e,t){(this.preferred.width!==e||this.preferred.height!==t)&&(this.preferred.set(e,t),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.base.width,this.base.height))}copy(e){this.base.set(e.getBaseWidth(),e.getBaseHeight()),this.preferred.set(e.getPreferredWidth(),e.getPreferredHeight()),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.base.width,this.base.height)}static get AUTO_SIZE(){return u}},Q=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],ee=class extends J{constructor({resolutionScale:e=.5,width:t=w.AUTO_SIZE,height:r=w.AUTO_SIZE,kernelSize:i=te.LARGE}={}){super("KawaseBlurPass"),this.renderTargetA=new B(1,1,{minFilter:b,magFilter:b,stencilBuffer:!1,depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";const s=this.resolution=new w(this,t,r,e);s.addEventListener("change",a=>this.setSize(s.baseWidth,s.baseHeight)),this.blurMaterial=new E,this.ditheredBlurMaterial=new E,this.ditheredBlurMaterial.uniforms.scale=this.blurMaterial.uniforms.scale,this.ditheredBlurMaterial.dithering=!0,this.dithering=!1,this.kernelSize=i}getResolution(){return this.resolution}get width(){return this.resolution.width}set width(e){this.resolution.preferredWidth=e}get height(){return this.resolution.height}set height(e){this.resolution.preferredHeight=e}get scale(){return this.blurMaterial.scale}set scale(e){this.blurMaterial.scale=e}getScale(){return this.blurMaterial.scale}setScale(e){this.blurMaterial.scale=e}getKernelSize(){return this.kernelSize}setKernelSize(e){this.kernelSize=e}getResolutionScale(){return this.resolution.scale}setResolutionScale(e){this.resolution.scale=e}render(e,t,r,i,s){const a=this.scene,d=this.camera,M=this.renderTargetA,c=this.renderTargetB,m=Q[this.kernelSize];let h=this.blurMaterial,f=t,l,g;for(this.fullscreenMaterial=h,l=0,g=m.length-1;l<g;++l){const p=(l&1)===0?M:c;h.kernel=m[l],h.inputBuffer=f.texture,e.setRenderTarget(p),e.render(a,d),f=p}this.dithering&&(h=this.ditheredBlurMaterial,this.fullscreenMaterial=h),h.kernel=m[l],h.inputBuffer=f.texture,e.setRenderTarget(this.renderToScreen?null:r),e.render(a,d)}setSize(e,t){const r=this.resolution;r.setBaseSize(e,t);const i=r.width,s=r.height;this.renderTargetA.setSize(i,s),this.renderTargetB.setSize(i,s),this.blurMaterial.setSize(i,s),this.ditheredBlurMaterial.setSize(i,s)}initialize(e,t,r){r!==void 0&&(this.renderTargetA.texture.type=r,this.renderTargetB.texture.type=r,r!==k?(this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.ditheredBlurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1"):e.outputEncoding===U&&(this.renderTargetA.texture.encoding=U,this.renderTargetB.texture.encoding=U))}static get AUTO_SIZE(){return w.AUTO_SIZE}},te={VERY_SMALL:0,SMALL:1,MEDIUM:2,LARGE:3,VERY_LARGE:4,HUGE:5};new n;new y;new z;new n;new n;class ie extends G{constructor(t,r,i,s,{mixBlur:a=0,mixStrength:d=1,resolution:M=256,blur:c=[0,0],minDepthThreshold:m=.9,maxDepthThreshold:h=1,depthScale:f=0,depthToBlurRatioBias:l=.25,mirror:g=0,distortion:p=1,mixContrast:F=1,distortionMap:P,reflectorOffset:A=0,bufferSamples:D=8,planeNormal:R=new n(0,0,1)}={}){super(),this.gl=t,this.camera=r,this.scene=i,this.parent=s,this.hasBlur=c[0]+c[1]>0,this.reflectorPlane=new j,this.normal=new n,this.reflectorWorldPosition=new n,this.cameraWorldPosition=new n,this.rotationMatrix=new y,this.lookAtPosition=new n(0,-1,0),this.clipPlane=new S,this.view=new n,this.target=new n,this.q=new S,this.textureMatrix=new y,this.virtualCamera=new V,this.reflectorOffset=A,this.planeNormal=R,this.setupBuffers(M,c,D),this.reflectorProps={mirror:g,textureMatrix:this.textureMatrix,mixBlur:a,tDiffuse:this.fbo1.texture,tDepth:this.fbo1.depthTexture,tDiffuseBlur:this.fbo2.texture,hasBlur:this.hasBlur,mixStrength:d,minDepthThreshold:m,maxDepthThreshold:h,depthScale:f,depthToBlurRatioBias:l,distortion:p,distortionMap:P,mixContrast:F,"defines-USE_BLUR":this.hasBlur?"":void 0,"defines-USE_DEPTH":f>0?"":void 0,"defines-USE_DISTORTION":P?"":void 0}}setupBuffers(t,r,i){const s={minFilter:b,magFilter:b,encoding:this.gl.outputEncoding},a=new B(t,t,s);a.depthBuffer=!0,a.depthTexture=new K(t,t),a.depthTexture.format=Z,a.depthTexture.type=q;const d=new B(t,t,s);this.gl.capabilities.isWebGL2&&(a.samples=i),this.fbo1=a,this.fbo2=d,this.kawaseBlurPass=new ee,this.kawaseBlurPass.setSize(r[0],r[1])}beforeRender(){if(!this.parent||(this.reflectorWorldPosition.setFromMatrixPosition(this.parent.matrixWorld),this.cameraWorldPosition.setFromMatrixPosition(this.camera.matrixWorld),this.rotationMatrix.extractRotation(this.parent.matrixWorld),this.normal.copy(this.planeNormal),this.normal.applyMatrix4(this.rotationMatrix),this.reflectorWorldPosition.addScaledVector(this.normal,this.reflectorOffset),this.view.subVectors(this.reflectorWorldPosition,this.cameraWorldPosition),this.view.dot(this.normal)>0))return;this.view.reflect(this.normal).negate(),this.view.add(this.reflectorWorldPosition),this.rotationMatrix.extractRotation(this.camera.matrixWorld),this.lookAtPosition.set(0,0,-1),this.lookAtPosition.applyMatrix4(this.rotationMatrix),this.lookAtPosition.add(this.cameraWorldPosition),this.target.subVectors(this.reflectorWorldPosition,this.lookAtPosition),this.target.reflect(this.normal).negate(),this.target.add(this.reflectorWorldPosition),this.virtualCamera.position.copy(this.view),this.virtualCamera.up.set(0,1,0),this.virtualCamera.up.applyMatrix4(this.rotationMatrix),this.virtualCamera.up.reflect(this.normal),this.virtualCamera.lookAt(this.target),this.virtualCamera.far=this.camera.far,this.virtualCamera.updateMatrixWorld(),this.virtualCamera.projectionMatrix.copy(this.camera.projectionMatrix),this.textureMatrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.textureMatrix.multiply(this.virtualCamera.projectionMatrix),this.textureMatrix.multiply(this.virtualCamera.matrixWorldInverse),this.textureMatrix.multiply(this.parent.matrixWorld),this.reflectorPlane.setFromNormalAndCoplanarPoint(this.normal,this.reflectorWorldPosition),this.reflectorPlane.applyMatrix4(this.virtualCamera.matrixWorldInverse),this.clipPlane.set(this.reflectorPlane.normal.x,this.reflectorPlane.normal.y,this.reflectorPlane.normal.z,this.reflectorPlane.constant);const t=this.virtualCamera.projectionMatrix;this.q.x=(Math.sign(this.clipPlane.x)+t.elements[8])/t.elements[0],this.q.y=(Math.sign(this.clipPlane.y)+t.elements[9])/t.elements[5],this.q.z=-1,this.q.w=(1+t.elements[10])/t.elements[14],this.clipPlane.multiplyScalar(2/this.clipPlane.dot(this.q)),t.elements[2]=this.clipPlane.x,t.elements[6]=this.clipPlane.y,t.elements[10]=this.clipPlane.z+1,t.elements[14]=this.clipPlane.w}update(){if(this.parent.material!==this)return;this.parent.visible=!1;const t=this.gl.xr.enabled,r=this.gl.shadowMap.autoUpdate;this.beforeRender(),this.gl.xr.enabled=!1,this.gl.shadowMap.autoUpdate=!1,this.gl.setRenderTarget(this.fbo1),this.gl.state.buffers.depth.setMask(!0),this.gl.autoClear||this.gl.clear(),this.gl.render(this.scene,this.virtualCamera),this.hasBlur&&this.kawaseBlurPass.render(this.gl,this.fbo1,this.fbo2),this.gl.xr.enabled=t,this.gl.shadowMap.autoUpdate=r,this.parent.visible=!0,this.gl.setRenderTarget(null)}onBeforeCompile(t,...r){super.onBeforeCompile(t,...r),this.defines===void 0&&(this.defines={}),this.defines.USE_UV||(this.defines.USE_UV=""),this.reflectorProps["defines-USE_BLUR"]!==void 0&&(this.defines.USE_BLUR=""),this.reflectorProps["defines-USE_DEPTH"]!==void 0&&(this.defines.USE_DEPTH=""),this.reflectorProps["defines-USE_DISTORTION"]!==void 0&&(this.defines.USE_DISTORTION="");let i=this.reflectorProps;for(let s in i)t.uniforms[s]={get value(){return i[s]}};t.vertexShader=`
              uniform mat4 textureMatrix;
              varying vec4 my_vUv;     
            ${t.vertexShader}`,t.vertexShader=t.vertexShader.replace("#include <project_vertex>",`
            #include <project_vertex>
            my_vUv = textureMatrix * vec4( position, 1.0 );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            `),t.fragmentShader=`
              uniform sampler2D tDiffuse;
              uniform sampler2D tDiffuseBlur;
              uniform sampler2D tDepth;
              uniform sampler2D distortionMap;
              uniform float distortion;
              uniform float cameraNear;
              uniform float cameraFar;
              uniform bool hasBlur;
              uniform float mixBlur;
              uniform float mirror;
              uniform float mixStrength;
              uniform float minDepthThreshold;
              uniform float maxDepthThreshold;
              uniform float mixContrast;
              uniform float depthScale;
              uniform float depthToBlurRatioBias;
              varying vec4 my_vUv;        
              ${t.fragmentShader}`,t.fragmentShader=t.fragmentShader.replace("#include <emissivemap_fragment>",`
            #include <emissivemap_fragment>
          
            float distortionFactor = 0.0;
            #ifdef USE_DISTORTION
              distortionFactor = texture2D(distortionMap, vUv).r * distortion;
            #endif
      
            vec4 new_vUv = my_vUv;
            new_vUv.x += distortionFactor;
            new_vUv.y += distortionFactor;
      
            vec4 base = texture2DProj(tDiffuse, new_vUv);
            vec4 blur = texture2DProj(tDiffuseBlur, new_vUv);
            
            vec4 merge = base;
            
            #ifdef USE_NORMALMAP
              vec2 normal_uv = vec2(0.0);
              vec4 normalColor = texture2D(normalMap, vUv);
              vec3 my_normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );
              vec3 coord = new_vUv.xyz / new_vUv.w;
              normal_uv = coord.xy + coord.z * my_normal.xz * 0.05 * normalScale;
              vec4 base_normal = texture2D(tDiffuse, normal_uv);
              vec4 blur_normal = texture2D(tDiffuseBlur, normal_uv);
              merge = base_normal;
              blur = blur_normal;
            #endif
      
            float depthFactor = 0.0001;
            float blurFactor = 0.0;
      
            #ifdef USE_DEPTH
              vec4 depth = texture2DProj(tDepth, new_vUv);
              depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
              depthFactor *= depthScale;
              depthFactor = max(0.0001, min(1.0, depthFactor));
      
              #ifdef USE_BLUR
                blur = blur * min(1.0, depthFactor + depthToBlurRatioBias);
                merge = merge * min(1.0, depthFactor + 0.5);
              #else
                merge = merge * depthFactor;
              #endif
        
            #endif
      
            float reflectorRoughnessFactor = roughness;
            #ifdef USE_ROUGHNESSMAP
              vec4 reflectorTexelRoughness = texture2D( roughnessMap, vUv );
              
              reflectorRoughnessFactor *= reflectorTexelRoughness.g;
            #endif
            
            #ifdef USE_BLUR
              blurFactor = min(1.0, mixBlur * reflectorRoughnessFactor);
              merge = mix(merge, blur, blurFactor);
            #endif
      
            vec4 newMerge = vec4(0.0, 0.0, 0.0, 1.0);
            newMerge.r = (merge.r - 0.5) * mixContrast + 0.5;
            newMerge.g = (merge.g - 0.5) * mixContrast + 0.5;
            newMerge.b = (merge.b - 0.5) * mixContrast + 0.5;
            
            diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + newMerge.rgb * mixStrength);
            `)}}export{ie as default};
