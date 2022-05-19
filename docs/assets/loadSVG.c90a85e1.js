import{f as bt,g as gt,h as it,i as O,V as Tt,j as kt,k as wt,l as At,m as at,b as It,F as lt,n as rt,o as Pt,p as Mt,q as pt,r as St}from"./index.66496b60.js";class ft extends bt{constructor(E){super(E),this.defaultDPI=90,this.defaultUnit="px"}load(E,q,L,N){const I=this,J=new gt(I.manager);J.setPath(I.path),J.setRequestHeader(I.requestHeader),J.setWithCredentials(I.withCredentials),J.load(E,function(tt){try{q(I.parse(tt))}catch(K){N?N(K):console.error(K),I.manager.itemError(E)}},L,N)}parse(E){const q=this;function L(i,r){if(i.nodeType!==1)return;const t=y(i);let o=!1,c=null;switch(i.nodeName){case"svg":break;case"style":I(i);break;case"g":r=z(i,r);break;case"path":r=z(i,r),i.hasAttribute("d")&&(c=N(i));break;case"rect":r=z(i,r),c=K(i);break;case"polygon":r=z(i,r),c=Y(i);break;case"polyline":r=z(i,r),c=_(i);break;case"circle":r=z(i,r),c=G(i);break;case"ellipse":r=z(i,r),c=H(i);break;case"line":r=z(i,r),c=et(i);break;case"defs":o=!0;break;case"use":r=z(i,r);const k=(i.getAttributeNS("http://www.w3.org/1999/xlink","href")||"").substring(1),x=i.viewportElement.getElementById(k);x?L(x,r):console.warn("SVGLoader: 'use node' references non-existent node id: "+k);break}c&&(r.fill!==void 0&&r.fill!=="none"&&c.color.setStyle(r.fill),M(c,D),U.push(c),c.userData={node:i,style:r});const s=i.childNodes;for(let a=0;a<s.length;a++){const k=s[a];o&&k.nodeName!=="style"&&k.nodeName!=="defs"||L(k,r)}t&&(b.pop(),b.length>0?D.copy(b[b.length-1]):D.identity())}function N(i){const r=new rt,t=new O,o=new O,c=new O;let s=!0,a=!1;const x=i.getAttribute("d").match(/[a-df-z][^a-df-z]*/ig);for(let T=0,h=x.length;T<h;T++){const V=x[T],u=V.charAt(0),p=V.slice(1).trim();s===!0&&(a=!0,s=!1);let n;switch(u){case"M":n=f(p);for(let e=0,m=n.length;e<m;e+=2)t.x=n[e+0],t.y=n[e+1],o.x=t.x,o.y=t.y,e===0?r.moveTo(t.x,t.y):r.lineTo(t.x,t.y),e===0&&c.copy(t);break;case"H":n=f(p);for(let e=0,m=n.length;e<m;e++)t.x=n[e],o.x=t.x,o.y=t.y,r.lineTo(t.x,t.y),e===0&&a===!0&&c.copy(t);break;case"V":n=f(p);for(let e=0,m=n.length;e<m;e++)t.y=n[e],o.x=t.x,o.y=t.y,r.lineTo(t.x,t.y),e===0&&a===!0&&c.copy(t);break;case"L":n=f(p);for(let e=0,m=n.length;e<m;e+=2)t.x=n[e+0],t.y=n[e+1],o.x=t.x,o.y=t.y,r.lineTo(t.x,t.y),e===0&&a===!0&&c.copy(t);break;case"C":n=f(p);for(let e=0,m=n.length;e<m;e+=6)r.bezierCurveTo(n[e+0],n[e+1],n[e+2],n[e+3],n[e+4],n[e+5]),o.x=n[e+2],o.y=n[e+3],t.x=n[e+4],t.y=n[e+5],e===0&&a===!0&&c.copy(t);break;case"S":n=f(p);for(let e=0,m=n.length;e<m;e+=4)r.bezierCurveTo(Q(t.x,o.x),Q(t.y,o.y),n[e+0],n[e+1],n[e+2],n[e+3]),o.x=n[e+0],o.y=n[e+1],t.x=n[e+2],t.y=n[e+3],e===0&&a===!0&&c.copy(t);break;case"Q":n=f(p);for(let e=0,m=n.length;e<m;e+=4)r.quadraticCurveTo(n[e+0],n[e+1],n[e+2],n[e+3]),o.x=n[e+0],o.y=n[e+1],t.x=n[e+2],t.y=n[e+3],e===0&&a===!0&&c.copy(t);break;case"T":n=f(p);for(let e=0,m=n.length;e<m;e+=2){const j=Q(t.x,o.x),X=Q(t.y,o.y);r.quadraticCurveTo(j,X,n[e+0],n[e+1]),o.x=j,o.y=X,t.x=n[e+0],t.y=n[e+1],e===0&&a===!0&&c.copy(t)}break;case"A":n=f(p,[3,4],7);for(let e=0,m=n.length;e<m;e+=7){if(n[e+5]==t.x&&n[e+6]==t.y)continue;const j=t.clone();t.x=n[e+5],t.y=n[e+6],o.x=t.x,o.y=t.y,J(r,n[e],n[e+1],n[e+2],n[e+3],n[e+4],j,t),e===0&&a===!0&&c.copy(t)}break;case"m":n=f(p);for(let e=0,m=n.length;e<m;e+=2)t.x+=n[e+0],t.y+=n[e+1],o.x=t.x,o.y=t.y,e===0?r.moveTo(t.x,t.y):r.lineTo(t.x,t.y),e===0&&c.copy(t);break;case"h":n=f(p);for(let e=0,m=n.length;e<m;e++)t.x+=n[e],o.x=t.x,o.y=t.y,r.lineTo(t.x,t.y),e===0&&a===!0&&c.copy(t);break;case"v":n=f(p);for(let e=0,m=n.length;e<m;e++)t.y+=n[e],o.x=t.x,o.y=t.y,r.lineTo(t.x,t.y),e===0&&a===!0&&c.copy(t);break;case"l":n=f(p);for(let e=0,m=n.length;e<m;e+=2)t.x+=n[e+0],t.y+=n[e+1],o.x=t.x,o.y=t.y,r.lineTo(t.x,t.y),e===0&&a===!0&&c.copy(t);break;case"c":n=f(p);for(let e=0,m=n.length;e<m;e+=6)r.bezierCurveTo(t.x+n[e+0],t.y+n[e+1],t.x+n[e+2],t.y+n[e+3],t.x+n[e+4],t.y+n[e+5]),o.x=t.x+n[e+2],o.y=t.y+n[e+3],t.x+=n[e+4],t.y+=n[e+5],e===0&&a===!0&&c.copy(t);break;case"s":n=f(p);for(let e=0,m=n.length;e<m;e+=4)r.bezierCurveTo(Q(t.x,o.x),Q(t.y,o.y),t.x+n[e+0],t.y+n[e+1],t.x+n[e+2],t.y+n[e+3]),o.x=t.x+n[e+0],o.y=t.y+n[e+1],t.x+=n[e+2],t.y+=n[e+3],e===0&&a===!0&&c.copy(t);break;case"q":n=f(p);for(let e=0,m=n.length;e<m;e+=4)r.quadraticCurveTo(t.x+n[e+0],t.y+n[e+1],t.x+n[e+2],t.y+n[e+3]),o.x=t.x+n[e+0],o.y=t.y+n[e+1],t.x+=n[e+2],t.y+=n[e+3],e===0&&a===!0&&c.copy(t);break;case"t":n=f(p);for(let e=0,m=n.length;e<m;e+=2){const j=Q(t.x,o.x),X=Q(t.y,o.y);r.quadraticCurveTo(j,X,t.x+n[e+0],t.y+n[e+1]),o.x=j,o.y=X,t.x=t.x+n[e+0],t.y=t.y+n[e+1],e===0&&a===!0&&c.copy(t)}break;case"a":n=f(p,[3,4],7);for(let e=0,m=n.length;e<m;e+=7){if(n[e+5]==0&&n[e+6]==0)continue;const j=t.clone();t.x+=n[e+5],t.y+=n[e+6],o.x=t.x,o.y=t.y,J(r,n[e],n[e+1],n[e+2],n[e+3],n[e+4],j,t),e===0&&a===!0&&c.copy(t)}break;case"Z":case"z":r.currentPath.autoClose=!0,r.currentPath.curves.length>0&&(t.copy(c),r.currentPath.currentPoint.copy(t),s=!0);break;default:console.warn(V)}a=!1}return r}function I(i){if(!(!i.sheet||!i.sheet.cssRules||!i.sheet.cssRules.length))for(let r=0;r<i.sheet.cssRules.length;r++){const t=i.sheet.cssRules[r];if(t.type!==1)continue;const o=t.selectorText.split(/,/gm).filter(Boolean).map(c=>c.trim());for(let c=0;c<o.length;c++){const s=Object.fromEntries(Object.entries(t.style).filter(([,a])=>a!==""));R[o[c]]=Object.assign(R[o[c]]||{},s)}}}function J(i,r,t,o,c,s,a,k){if(r==0||t==0){i.lineTo(k.x,k.y);return}o=o*Math.PI/180,r=Math.abs(r),t=Math.abs(t);const x=(a.x-k.x)/2,T=(a.y-k.y)/2,h=Math.cos(o)*x+Math.sin(o)*T,V=-Math.sin(o)*x+Math.cos(o)*T;let u=r*r,p=t*t;const n=h*h,e=V*V,m=n/u+e/p;if(m>1){const ht=Math.sqrt(m);r=ht*r,t=ht*t,u=r*r,p=t*t}const j=u*e+p*n,X=(u*p-j)/j;let $=Math.sqrt(Math.max(0,X));c===s&&($=-$);const st=$*r*V/t,ct=-$*t*h/r,dt=Math.cos(o)*st-Math.sin(o)*ct+(a.x+k.x)/2,xt=Math.sin(o)*st+Math.cos(o)*ct+(a.y+k.y)/2,yt=tt(1,0,(h-st)/r,(V-ct)/t),mt=tt((h-st)/r,(V-ct)/t,(-h-st)/r,(-V-ct)/t)%(Math.PI*2);i.currentPath.absellipse(dt,xt,r,t,yt,yt+mt,s===0,o)}function tt(i,r,t,o){const c=i*t+r*o,s=Math.sqrt(i*i+r*r)*Math.sqrt(t*t+o*o);let a=Math.acos(Math.max(-1,Math.min(1,c/s)));return i*o-r*t<0&&(a=-a),a}function K(i){const r=d(i.getAttribute("x")||0),t=d(i.getAttribute("y")||0),o=d(i.getAttribute("rx")||i.getAttribute("ry")||0),c=d(i.getAttribute("ry")||i.getAttribute("rx")||0),s=d(i.getAttribute("width")),a=d(i.getAttribute("height")),k=1-.551915024494,x=new rt;return x.moveTo(r+o,t),x.lineTo(r+s-o,t),(o!==0||c!==0)&&x.bezierCurveTo(r+s-o*k,t,r+s,t+c*k,r+s,t+c),x.lineTo(r+s,t+a-c),(o!==0||c!==0)&&x.bezierCurveTo(r+s,t+a-c*k,r+s-o*k,t+a,r+s-o,t+a),x.lineTo(r+o,t+a),(o!==0||c!==0)&&x.bezierCurveTo(r+o*k,t+a,r,t+a-c*k,r,t+a-c),x.lineTo(r,t+c),(o!==0||c!==0)&&x.bezierCurveTo(r,t+c*k,r+o*k,t,r+o,t),x}function Y(i){function r(s,a,k){const x=d(a),T=d(k);c===0?o.moveTo(x,T):o.lineTo(x,T),c++}const t=/(-?[\d\.?]+)[,|\s](-?[\d\.?]+)/g,o=new rt;let c=0;return i.getAttribute("points").replace(t,r),o.currentPath.autoClose=!0,o}function _(i){function r(s,a,k){const x=d(a),T=d(k);c===0?o.moveTo(x,T):o.lineTo(x,T),c++}const t=/(-?[\d\.?]+)[,|\s](-?[\d\.?]+)/g,o=new rt;let c=0;return i.getAttribute("points").replace(t,r),o.currentPath.autoClose=!1,o}function G(i){const r=d(i.getAttribute("cx")||0),t=d(i.getAttribute("cy")||0),o=d(i.getAttribute("r")||0),c=new at;c.absarc(r,t,o,0,Math.PI*2);const s=new rt;return s.subPaths.push(c),s}function H(i){const r=d(i.getAttribute("cx")||0),t=d(i.getAttribute("cy")||0),o=d(i.getAttribute("rx")||0),c=d(i.getAttribute("ry")||0),s=new at;s.absellipse(r,t,o,c,0,Math.PI*2);const a=new rt;return a.subPaths.push(s),a}function et(i){const r=d(i.getAttribute("x1")||0),t=d(i.getAttribute("y1")||0),o=d(i.getAttribute("x2")||0),c=d(i.getAttribute("y2")||0),s=new rt;return s.moveTo(r,t),s.lineTo(o,c),s.currentPath.autoClose=!1,s}function z(i,r){r=Object.assign({},r);let t={};if(i.hasAttribute("class")){const a=i.getAttribute("class").split(/\s/).filter(Boolean).map(k=>k.trim());for(let k=0;k<a.length;k++)t=Object.assign(t,R["."+a[k]])}i.hasAttribute("id")&&(t=Object.assign(t,R["#"+i.getAttribute("id")]));function o(a,k,x){x===void 0&&(x=function(h){return h.startsWith("url")&&console.warn("SVGLoader: url access in attributes is not implemented."),h}),i.hasAttribute(a)&&(r[k]=x(i.getAttribute(a))),t[a]&&(r[k]=x(t[a])),i.style&&i.style[a]!==""&&(r[k]=x(i.style[a]))}function c(a){return Math.max(0,Math.min(1,d(a)))}function s(a){return Math.max(0,d(a))}return o("fill","fill"),o("fill-opacity","fillOpacity",c),o("fill-rule","fillRule"),o("opacity","opacity",c),o("stroke","stroke"),o("stroke-opacity","strokeOpacity",c),o("stroke-width","strokeWidth",s),o("stroke-linejoin","strokeLineJoin"),o("stroke-linecap","strokeLineCap"),o("stroke-miterlimit","strokeMiterLimit",s),o("visibility","visibility"),r}function Q(i,r){return i-(r-i)}function f(i,r,t){if(typeof i!="string")throw new TypeError("Invalid input: "+typeof i);const o={SEPARATOR:/[ \t\r\n\,.\-+]/,WHITESPACE:/[ \t\r\n]/,DIGIT:/[\d]/,SIGN:/[-+]/,POINT:/\./,COMMA:/,/,EXP:/e/i,FLAGS:/[01]/},c=0,s=1,a=2,k=3;let x=c,T=!0,h="",V="";const u=[];function p(j,X,$){const st=new SyntaxError('Unexpected character "'+j+'" at index '+X+".");throw st.partial=$,st}function n(){h!==""&&(V===""?u.push(Number(h)):u.push(Number(h)*Math.pow(10,Number(V)))),h="",V=""}let e;const m=i.length;for(let j=0;j<m;j++){if(e=i[j],Array.isArray(r)&&r.includes(u.length%t)&&o.FLAGS.test(e)){x=s,h=e,n();continue}if(x===c){if(o.WHITESPACE.test(e))continue;if(o.DIGIT.test(e)||o.SIGN.test(e)){x=s,h=e;continue}if(o.POINT.test(e)){x=a,h=e;continue}o.COMMA.test(e)&&(T&&p(e,j,u),T=!0)}if(x===s){if(o.DIGIT.test(e)){h+=e;continue}if(o.POINT.test(e)){h+=e,x=a;continue}if(o.EXP.test(e)){x=k;continue}o.SIGN.test(e)&&h.length===1&&o.SIGN.test(h[0])&&p(e,j,u)}if(x===a){if(o.DIGIT.test(e)){h+=e;continue}if(o.EXP.test(e)){x=k;continue}o.POINT.test(e)&&h[h.length-1]==="."&&p(e,j,u)}if(x===k){if(o.DIGIT.test(e)){V+=e;continue}if(o.SIGN.test(e)){if(V===""){V+=e;continue}V.length===1&&o.SIGN.test(V)&&p(e,j,u)}}o.WHITESPACE.test(e)?(n(),x=c,T=!1):o.COMMA.test(e)?(n(),x=c,T=!0):o.SIGN.test(e)?(n(),x=s,h=e):o.POINT.test(e)?(n(),x=a,h=e):p(e,j,u)}return n(),u}const w=["mm","cm","in","pt","pc","px"],C={mm:{mm:1,cm:.1,in:1/25.4,pt:72/25.4,pc:6/25.4,px:-1},cm:{mm:10,cm:1,in:1/2.54,pt:72/2.54,pc:6/2.54,px:-1},in:{mm:25.4,cm:2.54,in:1,pt:72,pc:6,px:-1},pt:{mm:25.4/72,cm:2.54/72,in:1/72,pt:1,pc:6/72,px:-1},pc:{mm:25.4/6,cm:2.54/6,in:1/6,pt:72/6,pc:1,px:-1},px:{px:1}};function d(i){let r="px";if(typeof i=="string"||i instanceof String)for(let o=0,c=w.length;o<c;o++){const s=w[o];if(i.endsWith(s)){r=s,i=i.substring(0,i.length-s.length);break}}let t;return r==="px"&&q.defaultUnit!=="px"?t=C.in[q.defaultUnit]/q.defaultDPI:(t=C[r][q.defaultUnit],t<0&&(t=C[r].in*q.defaultDPI)),t*parseFloat(i)}function y(i){if(!(i.hasAttribute("transform")||i.nodeName==="use"&&(i.hasAttribute("x")||i.hasAttribute("y"))))return null;const r=g(i);return b.length>0&&r.premultiply(b[b.length-1]),D.copy(r),b.push(r),r}function g(i){const r=new it,t=F;if(i.nodeName==="use"&&(i.hasAttribute("x")||i.hasAttribute("y"))){const o=d(i.getAttribute("x")),c=d(i.getAttribute("y"));r.translate(o,c)}if(i.hasAttribute("transform")){const o=i.getAttribute("transform").split(")");for(let c=o.length-1;c>=0;c--){const s=o[c].trim();if(s==="")continue;const a=s.indexOf("("),k=s.length;if(a>0&&a<k){const x=s.slice(0,a),T=f(s.slice(a+1));switch(t.identity(),x){case"translate":if(T.length>=1){const h=T[0];let V=h;T.length>=2&&(V=T[1]),t.translate(h,V)}break;case"rotate":if(T.length>=1){let h=0,V=0,u=0;h=-T[0]*Math.PI/180,T.length>=3&&(V=T[1],u=T[2]),W.identity().translate(-V,-u),Z.identity().rotate(h),nt.multiplyMatrices(Z,W),W.identity().translate(V,u),t.multiplyMatrices(W,nt)}break;case"scale":if(T.length>=1){const h=T[0];let V=h;T.length>=2&&(V=T[1]),t.scale(h,V)}break;case"skewX":T.length===1&&t.set(1,Math.tan(T[0]*Math.PI/180),0,0,1,0,0,0,1);break;case"skewY":T.length===1&&t.set(1,0,0,Math.tan(T[0]*Math.PI/180),1,0,0,0,1);break;case"matrix":T.length===6&&t.set(T[0],T[2],T[4],T[1],T[3],T[5],0,0,1);break}}r.premultiply(t)}}return r}function M(i,r){function t(s){l.set(s.x,s.y,1).applyMatrix3(r),s.set(l.x,l.y)}const o=S(r),c=i.subPaths;for(let s=0,a=c.length;s<a;s++){const x=c[s].curves;for(let T=0;T<x.length;T++){const h=x[T];h.isLineCurve?(t(h.v1),t(h.v2)):h.isCubicBezierCurve?(t(h.v0),t(h.v1),t(h.v2),t(h.v3)):h.isQuadraticBezierCurve?(t(h.v0),t(h.v1),t(h.v2)):h.isEllipseCurve&&(o&&console.warn("SVGLoader: Elliptic arc or ellipse rotation or skewing is not implemented."),A.set(h.aX,h.aY),t(A),h.aX=A.x,h.aY=A.y,h.xRadius*=P(r),h.yRadius*=B(r))}}}function S(i){return i.elements[1]!==0||i.elements[3]!==0}function P(i){const r=i.elements;return Math.sqrt(r[0]*r[0]+r[1]*r[1])}function B(i){const r=i.elements;return Math.sqrt(r[3]*r[3]+r[4]*r[4])}const U=[],R={},b=[],F=new it,W=new it,Z=new it,nt=new it,A=new O,l=new Tt,D=new it,v=new DOMParser().parseFromString(E,"image/svg+xml");return L(v.documentElement,{fill:"#000",fillOpacity:1,strokeOpacity:1,strokeWidth:1,strokeLineJoin:"miter",strokeLineCap:"butt",strokeMiterLimit:4}),{paths:U,xml:v.documentElement}}static createShapes(E){const L={ORIGIN:0,DESTINATION:1,BETWEEN:2,LEFT:3,RIGHT:4,BEHIND:5,BEYOND:6},N={loc:L.ORIGIN,t:0};function I(f,w,C,d){const y=f.x,g=w.x,M=C.x,S=d.x,P=f.y,B=w.y,U=C.y,R=d.y,b=(S-M)*(P-U)-(R-U)*(y-M),F=(g-y)*(P-U)-(B-P)*(y-M),W=(R-U)*(g-y)-(S-M)*(B-P),Z=b/W,nt=F/W;if(W===0&&b!==0||Z<=0||Z>=1||nt<0||nt>1)return null;if(b===0&&W===0){for(let A=0;A<2;A++)if(J(A===0?C:d,f,w),N.loc==L.ORIGIN){const l=A===0?C:d;return{x:l.x,y:l.y,t:N.t}}else if(N.loc==L.BETWEEN){const l=+(y+N.t*(g-y)).toPrecision(10),D=+(P+N.t*(B-P)).toPrecision(10);return{x:l,y:D,t:N.t}}return null}else{for(let D=0;D<2;D++)if(J(D===0?C:d,f,w),N.loc==L.ORIGIN){const v=D===0?C:d;return{x:v.x,y:v.y,t:N.t}}const A=+(y+Z*(g-y)).toPrecision(10),l=+(P+Z*(B-P)).toPrecision(10);return{x:A,y:l,t:Z}}}function J(f,w,C){const d=C.x-w.x,y=C.y-w.y,g=f.x-w.x,M=f.y-w.y,S=d*M-g*y;if(f.x===w.x&&f.y===w.y){N.loc=L.ORIGIN,N.t=0;return}if(f.x===C.x&&f.y===C.y){N.loc=L.DESTINATION,N.t=1;return}if(S<-Number.EPSILON){N.loc=L.LEFT;return}if(S>Number.EPSILON){N.loc=L.RIGHT;return}if(d*g<0||y*M<0){N.loc=L.BEHIND;return}if(Math.sqrt(d*d+y*y)<Math.sqrt(g*g+M*M)){N.loc=L.BEYOND;return}let P;d!==0?P=g/d:P=M/y,N.loc=L.BETWEEN,N.t=P}function tt(f,w){const C=[],d=[];for(let y=1;y<f.length;y++){const g=f[y-1],M=f[y];for(let S=1;S<w.length;S++){const P=w[S-1],B=w[S],U=I(g,M,P,B);U!==null&&C.find(R=>R.t<=U.t+Number.EPSILON&&R.t>=U.t-Number.EPSILON)===void 0&&(C.push(U),d.push(new O(U.x,U.y)))}}return d}function K(f,w,C){const d=new O;w.getCenter(d);const y=[];return C.forEach(g=>{g.boundingBox.containsPoint(d)&&tt(f,g.points).forEach(S=>{y.push({identifier:g.identifier,isCW:g.isCW,point:S})})}),y.sort((g,M)=>g.point.x-M.point.x),y}function Y(f,w,C,d,y){(y==null||y==="")&&(y="nonzero");const g=new O;f.boundingBox.getCenter(g);const M=[new O(C,g.y),new O(d,g.y)],S=K(M,f.boundingBox,w);S.sort((F,W)=>F.point.x-W.point.x);const P=[],B=[];S.forEach(F=>{F.identifier===f.identifier?P.push(F):B.push(F)});const U=P[0].point.x,R=[];let b=0;for(;b<B.length&&B[b].point.x<U;)R.length>0&&R[R.length-1]===B[b].identifier?R.pop():R.push(B[b].identifier),b++;if(R.push(f.identifier),y==="evenodd"){const F=R.length%2===0,W=R[R.length-2];return{identifier:f.identifier,isHole:F,for:W}}else if(y==="nonzero"){let F=!0,W=null,Z=null;for(let nt=0;nt<R.length;nt++){const A=R[nt];F?(Z=w[A].isCW,F=!1,W=A):Z!==w[A].isCW&&(Z=w[A].isCW,F=!0)}return{identifier:f.identifier,isHole:F,for:W}}else console.warn('fill-rule: "'+y+'" is currently not implemented.')}let _=0,G=999999999,H=-999999999,et=E.subPaths.map(f=>{const w=f.getPoints();let C=-999999999,d=999999999,y=-999999999,g=999999999;for(let M=0;M<w.length;M++){const S=w[M];S.y>C&&(C=S.y),S.y<d&&(d=S.y),S.x>y&&(y=S.x),S.x<g&&(g=S.x)}return H<=y&&(H=y+1),G>=g&&(G=g-1),{curves:f.curves,points:w,isCW:kt.isClockWise(w),identifier:_++,boundingBox:new wt(new O(g,d),new O(y,C))}});et=et.filter(f=>f.points.length>1);const z=et.map(f=>Y(f,et,G,H,E.userData.style.fillRule)),Q=[];return et.forEach(f=>{if(!z[f.identifier].isHole){const C=new At;C.curves=f.curves,z.filter(y=>y.isHole&&y.for===f.identifier).forEach(y=>{const g=et[y.identifier],M=new at;M.curves=g.curves,C.holes.push(M)}),Q.push(C)}}),Q}static getStrokeStyle(E,q,L,N,I){return E=E!==void 0?E:1,q=q!==void 0?q:"#000",L=L!==void 0?L:"miter",N=N!==void 0?N:"butt",I=I!==void 0?I:4,{strokeColor:q,strokeWidth:E,strokeLineJoin:L,strokeLineCap:N,strokeMiterLimit:I}}static pointsToStroke(E,q,L,N){const I=[],J=[],tt=[];if(ft.pointsToStrokeWithBuffers(E,q,L,N,I,J,tt)===0)return null;const K=new It;return K.setAttribute("position",new lt(I,3)),K.setAttribute("normal",new lt(J,3)),K.setAttribute("uv",new lt(tt,2)),K}static pointsToStrokeWithBuffers(E,q,L,N,I,J,tt,K){const Y=new O,_=new O,G=new O,H=new O,et=new O,z=new O,Q=new O,f=new O,w=new O,C=new O,d=new O,y=new O,g=new O,M=new O,S=new O,P=new O,B=new O;L=L!==void 0?L:12,N=N!==void 0?N:.001,K=K!==void 0?K:0,E=V(E);const U=E.length;if(U<2)return 0;const R=E[0].equals(E[U-1]);let b,F=E[0],W;const Z=q.strokeWidth/2,nt=1/(U-1);let A=0,l,D,v,ot,i=!1,r=0,t=K*3,o=K*2;c(E[0],E[1],Y).multiplyScalar(Z),f.copy(E[0]).sub(Y),w.copy(E[0]).add(Y),C.copy(f),d.copy(w);for(let u=1;u<U;u++){b=E[u],u===U-1?R?W=E[1]:W=void 0:W=E[u+1];const p=Y;if(c(F,b,p),G.copy(p).multiplyScalar(Z),y.copy(b).sub(G),g.copy(b).add(G),l=A+nt,D=!1,W!==void 0){c(b,W,_),G.copy(_).multiplyScalar(Z),M.copy(b).sub(G),S.copy(b).add(G),v=!0,G.subVectors(W,F),p.dot(G)<0&&(v=!1),u===1&&(i=v),G.subVectors(W,b),G.normalize();const n=Math.abs(p.dot(G));if(n!==0){const e=Z/n;G.multiplyScalar(-e),H.subVectors(b,F),et.copy(H).setLength(e).add(G),P.copy(et).negate();const m=et.length(),j=H.length();H.divideScalar(j),z.subVectors(W,b);const X=z.length();switch(z.divideScalar(X),H.dot(P)<j&&z.dot(P)<X&&(D=!0),B.copy(et).add(b),P.add(b),ot=!1,D?v?(S.copy(P),g.copy(P)):(M.copy(P),y.copy(P)):k(),q.strokeLineJoin){case"bevel":x(v,D,l);break;case"round":T(v,D),v?a(b,y,M,l,0):a(b,S,g,l,1);break;case"miter":case"miter-clip":default:const $=Z*q.strokeMiterLimit/m;if($<1)if(q.strokeLineJoin!=="miter-clip"){x(v,D,l);break}else T(v,D),v?(z.subVectors(B,y).multiplyScalar($).add(y),Q.subVectors(B,M).multiplyScalar($).add(M),s(y,l,0),s(z,l,0),s(b,l,.5),s(b,l,.5),s(z,l,0),s(Q,l,0),s(b,l,.5),s(Q,l,0),s(M,l,0)):(z.subVectors(B,g).multiplyScalar($).add(g),Q.subVectors(B,S).multiplyScalar($).add(S),s(g,l,1),s(z,l,1),s(b,l,.5),s(b,l,.5),s(z,l,1),s(Q,l,1),s(b,l,.5),s(Q,l,1),s(S,l,1));else D?(v?(s(w,A,1),s(f,A,0),s(B,l,0),s(w,A,1),s(B,l,0),s(P,l,1)):(s(w,A,1),s(f,A,0),s(B,l,1),s(f,A,0),s(P,l,0),s(B,l,1)),v?M.copy(B):S.copy(B)):v?(s(y,l,0),s(B,l,0),s(b,l,.5),s(b,l,.5),s(B,l,0),s(M,l,0)):(s(g,l,1),s(B,l,1),s(b,l,.5),s(b,l,.5),s(B,l,1),s(S,l,1)),ot=!0;break}}else k()}else k();!R&&u===U-1&&h(E[0],C,d,v,!0,A),A=l,F=b,f.copy(M),w.copy(S)}if(!R)h(b,y,g,v,!1,l);else if(D&&I){let u=B,p=P;i!==v&&(u=P,p=B),v?(ot||i)&&(p.toArray(I,0*3),p.toArray(I,3*3),ot&&u.toArray(I,1*3)):(ot||!i)&&(p.toArray(I,1*3),p.toArray(I,3*3),ot&&u.toArray(I,0*3))}return r;function c(u,p,n){return n.subVectors(p,u),n.set(-n.y,n.x).normalize()}function s(u,p,n){I&&(I[t]=u.x,I[t+1]=u.y,I[t+2]=0,J&&(J[t]=0,J[t+1]=0,J[t+2]=1),t+=3,tt&&(tt[o]=p,tt[o+1]=n,o+=2)),r+=3}function a(u,p,n,e,m){Y.copy(p).sub(u).normalize(),_.copy(n).sub(u).normalize();let j=Math.PI;const X=Y.dot(_);Math.abs(X)<1&&(j=Math.abs(Math.acos(X))),j/=L,G.copy(p);for(let $=0,st=L-1;$<st;$++)H.copy(G).rotateAround(u,j),s(G,e,m),s(H,e,m),s(u,e,.5),G.copy(H);s(H,e,m),s(n,e,m),s(u,e,.5)}function k(){s(w,A,1),s(f,A,0),s(y,l,0),s(w,A,1),s(y,l,1),s(g,l,0)}function x(u,p,n){p?u?(s(w,A,1),s(f,A,0),s(y,l,0),s(w,A,1),s(y,l,0),s(P,l,1),s(y,n,0),s(M,n,0),s(P,n,.5)):(s(w,A,1),s(f,A,0),s(g,l,1),s(f,A,0),s(P,l,0),s(g,l,1),s(g,n,1),s(S,n,0),s(P,n,.5)):u?(s(y,n,0),s(M,n,0),s(b,n,.5)):(s(g,n,1),s(S,n,0),s(b,n,.5))}function T(u,p){p&&(u?(s(w,A,1),s(f,A,0),s(y,l,0),s(w,A,1),s(y,l,0),s(P,l,1),s(y,A,0),s(b,l,.5),s(P,l,1),s(b,l,.5),s(M,A,0),s(P,l,1)):(s(w,A,1),s(f,A,0),s(g,l,1),s(f,A,0),s(P,l,0),s(g,l,1),s(g,A,1),s(P,l,0),s(b,l,.5),s(b,l,.5),s(P,l,0),s(S,A,1)))}function h(u,p,n,e,m,j){switch(q.strokeLineCap){case"round":m?a(u,n,p,j,.5):a(u,p,n,j,.5);break;case"square":if(m)Y.subVectors(p,u),_.set(Y.y,-Y.x),G.addVectors(Y,_).add(u),H.subVectors(_,Y).add(u),e?(G.toArray(I,1*3),H.toArray(I,0*3),H.toArray(I,3*3)):(G.toArray(I,1*3),G.toArray(I,3*3),H.toArray(I,0*3));else{Y.subVectors(n,u),_.set(Y.y,-Y.x),G.addVectors(Y,_).add(u),H.subVectors(_,Y).add(u);const X=I.length;e?(G.toArray(I,X-1*3),H.toArray(I,X-2*3),H.toArray(I,X-4*3)):(G.toArray(I,X-2*3),H.toArray(I,X-1*3),H.toArray(I,X-4*3))}break}}function V(u){let p=!1;for(let e=1,m=u.length-1;e<m;e++)if(u[e].distanceTo(u[e+1])<N){p=!0;break}if(!p)return u;const n=[];n.push(u[0]);for(let e=1,m=u.length-1;e<m;e++)u[e].distanceTo(u[e+1])>=N&&n.push(u[e]);return n.push(u[u.length-1]),n}}}const Nt=new Map,Et=new ft;var jt=ut=>Pt(Nt,ut,()=>new Promise((E,q)=>{Mt(),Et.load(ut,L=>{pt(),E(Object.freeze(L))},St,()=>{pt(),q()})}));export{jt as default};
