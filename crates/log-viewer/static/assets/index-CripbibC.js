(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();var Vn,ee,hi,gi,bt,ss,mi,vi,_i,Nr,vr,_r,bi,cn={},yi=[],Oa=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,Wn=Array.isArray;function ot(e,t){for(var n in t)e[n]=t[n];return e}function Br(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function fe(e,t,n){var s,i,a,l={};for(a in t)a=="key"?s=t[a]:a=="ref"?i=t[a]:l[a]=t[a];if(arguments.length>2&&(l.children=arguments.length>3?Vn.call(arguments,2):n),typeof e=="function"&&e.defaultProps!=null)for(a in e.defaultProps)l[a]===void 0&&(l[a]=e.defaultProps[a]);return Cn(e,l,s,i,null)}function Cn(e,t,n,s,i){var a={type:e,props:t,key:n,ref:s,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++hi,__i:-1,__u:0};return i==null&&ee.vnode!=null&&ee.vnode(a),a}function ue(e){return e.children}function tn(e,t){this.props=e,this.context=t}function Ot(e,t){if(t==null)return e.__?Ot(e.__,e.__i+1):null;for(var n;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null)return n.__e;return typeof e.type=="function"?Ot(e):null}function wi(e){var t,n;if((e=e.__)!=null&&e.__c!=null){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null){e.__e=e.__c.base=n.__e;break}return wi(e)}}function br(e){(!e.__d&&(e.__d=!0)&&bt.push(e)&&!In.__r++||ss!=ee.debounceRendering)&&((ss=ee.debounceRendering)||mi)(In)}function In(){for(var e,t,n,s,i,a,l,o=1;bt.length;)bt.length>o&&bt.sort(vi),e=bt.shift(),o=bt.length,e.__d&&(n=void 0,s=void 0,i=(s=(t=e).__v).__e,a=[],l=[],t.__P&&((n=ot({},s)).__v=s.__v+1,ee.vnode&&ee.vnode(n),Or(t.__P,n,s,t.__n,t.__P.namespaceURI,32&s.__u?[i]:null,a,i??Ot(s),!!(32&s.__u),l),n.__v=s.__v,n.__.__k[n.__i]=n,Si(a,n,l),s.__e=s.__=null,n.__e!=i&&wi(n)));In.__r=0}function xi(e,t,n,s,i,a,l,o,d,c,f){var u,m,y,_,v,x,k,p=s&&s.__k||yi,h=t.length;for(d=Ga(n,t,p,d,h),u=0;u<h;u++)(y=n.__k[u])!=null&&(m=y.__i==-1?cn:p[y.__i]||cn,y.__i=u,x=Or(e,y,m,i,a,l,o,d,c,f),_=y.__e,y.ref&&m.ref!=y.ref&&(m.ref&&Gr(m.ref,null,y),f.push(y.ref,y.__c||_,y)),v==null&&_!=null&&(v=_),(k=!!(4&y.__u))||m.__k===y.__k?d=ki(y,d,e,k):typeof y.type=="function"&&x!==void 0?d=x:_&&(d=_.nextSibling),y.__u&=-7);return n.__e=v,d}function Ga(e,t,n,s,i){var a,l,o,d,c,f=n.length,u=f,m=0;for(e.__k=new Array(i),a=0;a<i;a++)(l=t[a])!=null&&typeof l!="boolean"&&typeof l!="function"?(typeof l=="string"||typeof l=="number"||typeof l=="bigint"||l.constructor==String?l=e.__k[a]=Cn(null,l,null,null,null):Wn(l)?l=e.__k[a]=Cn(ue,{children:l},null,null,null):l.constructor===void 0&&l.__b>0?l=e.__k[a]=Cn(l.type,l.props,l.key,l.ref?l.ref:null,l.__v):e.__k[a]=l,d=a+m,l.__=e,l.__b=e.__b+1,o=null,(c=l.__i=Ha(l,n,d,u))!=-1&&(u--,(o=n[c])&&(o.__u|=2)),o==null||o.__v==null?(c==-1&&(i>f?m--:i<f&&m++),typeof l.type!="function"&&(l.__u|=4)):c!=d&&(c==d-1?m--:c==d+1?m++:(c>d?m--:m++,l.__u|=4))):e.__k[a]=null;if(u)for(a=0;a<f;a++)(o=n[a])!=null&&!(2&o.__u)&&(o.__e==s&&(s=Ot(o)),Ci(o,o));return s}function ki(e,t,n,s){var i,a;if(typeof e.type=="function"){for(i=e.__k,a=0;i&&a<i.length;a++)i[a]&&(i[a].__=e,t=ki(i[a],t,n,s));return t}e.__e!=t&&(s&&(t&&e.type&&!t.parentNode&&(t=Ot(e)),n.insertBefore(e.__e,t||null)),t=e.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function Ha(e,t,n,s){var i,a,l,o=e.key,d=e.type,c=t[n],f=c!=null&&(2&c.__u)==0;if(c===null&&o==null||f&&o==c.key&&d==c.type)return n;if(s>(f?1:0)){for(i=n-1,a=n+1;i>=0||a<t.length;)if((c=t[l=i>=0?i--:a++])!=null&&!(2&c.__u)&&o==c.key&&d==c.type)return l}return-1}function is(e,t,n){t[0]=="-"?e.setProperty(t,n??""):e[t]=n==null?"":typeof n!="number"||Oa.test(t)?n:n+"px"}function bn(e,t,n,s,i){var a,l;e:if(t=="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof s=="string"&&(e.style.cssText=s=""),s)for(t in s)n&&t in n||is(e.style,t,"");if(n)for(t in n)s&&n[t]==s[t]||is(e.style,t,n[t])}else if(t[0]=="o"&&t[1]=="n")a=t!=(t=t.replace(_i,"$1")),l=t.toLowerCase(),t=l in e||t=="onFocusOut"||t=="onFocusIn"?l.slice(2):t.slice(2),e.l||(e.l={}),e.l[t+a]=n,n?s?n.u=s.u:(n.u=Nr,e.addEventListener(t,a?_r:vr,a)):e.removeEventListener(t,a?_r:vr,a);else{if(i=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{e[t]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&n==1?"":n))}}function as(e){return function(t){if(this.l){var n=this.l[t.type+e];if(t.t==null)t.t=Nr++;else if(t.t<n.u)return;return n(ee.event?ee.event(t):t)}}}function Or(e,t,n,s,i,a,l,o,d,c){var f,u,m,y,_,v,x,k,p,h,g,b,w,S,C,E,A,T=t.type;if(t.constructor!==void 0)return null;128&n.__u&&(d=!!(32&n.__u),a=[o=t.__e=n.__e]),(f=ee.__b)&&f(t);e:if(typeof T=="function")try{if(k=t.props,p="prototype"in T&&T.prototype.render,h=(f=T.contextType)&&s[f.__c],g=f?h?h.props.value:f.__:s,n.__c?x=(u=t.__c=n.__c).__=u.__E:(p?t.__c=u=new T(k,g):(t.__c=u=new tn(k,g),u.constructor=T,u.render=Va),h&&h.sub(u),u.state||(u.state={}),u.__n=s,m=u.__d=!0,u.__h=[],u._sb=[]),p&&u.__s==null&&(u.__s=u.state),p&&T.getDerivedStateFromProps!=null&&(u.__s==u.state&&(u.__s=ot({},u.__s)),ot(u.__s,T.getDerivedStateFromProps(k,u.__s))),y=u.props,_=u.state,u.__v=t,m)p&&T.getDerivedStateFromProps==null&&u.componentWillMount!=null&&u.componentWillMount(),p&&u.componentDidMount!=null&&u.__h.push(u.componentDidMount);else{if(p&&T.getDerivedStateFromProps==null&&k!==y&&u.componentWillReceiveProps!=null&&u.componentWillReceiveProps(k,g),t.__v==n.__v||!u.__e&&u.shouldComponentUpdate!=null&&u.shouldComponentUpdate(k,u.__s,g)===!1){for(t.__v!=n.__v&&(u.props=k,u.state=u.__s,u.__d=!1),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(P){P&&(P.__=t)}),b=0;b<u._sb.length;b++)u.__h.push(u._sb[b]);u._sb=[],u.__h.length&&l.push(u);break e}u.componentWillUpdate!=null&&u.componentWillUpdate(k,u.__s,g),p&&u.componentDidUpdate!=null&&u.__h.push(function(){u.componentDidUpdate(y,_,v)})}if(u.context=g,u.props=k,u.__P=e,u.__e=!1,w=ee.__r,S=0,p){for(u.state=u.__s,u.__d=!1,w&&w(t),f=u.render(u.props,u.state,u.context),C=0;C<u._sb.length;C++)u.__h.push(u._sb[C]);u._sb=[]}else do u.__d=!1,w&&w(t),f=u.render(u.props,u.state,u.context),u.state=u.__s;while(u.__d&&++S<25);u.state=u.__s,u.getChildContext!=null&&(s=ot(ot({},s),u.getChildContext())),p&&!m&&u.getSnapshotBeforeUpdate!=null&&(v=u.getSnapshotBeforeUpdate(y,_)),E=f,f!=null&&f.type===ue&&f.key==null&&(E=Ei(f.props.children)),o=xi(e,Wn(E)?E:[E],t,n,s,i,a,l,o,d,c),u.base=t.__e,t.__u&=-161,u.__h.length&&l.push(u),x&&(u.__E=u.__=null)}catch(P){if(t.__v=null,d||a!=null)if(P.then){for(t.__u|=d?160:128;o&&o.nodeType==8&&o.nextSibling;)o=o.nextSibling;a[a.indexOf(o)]=null,t.__e=o}else{for(A=a.length;A--;)Br(a[A]);yr(t)}else t.__e=n.__e,t.__k=n.__k,P.then||yr(t);ee.__e(P,t,n)}else a==null&&t.__v==n.__v?(t.__k=n.__k,t.__e=n.__e):o=t.__e=Ua(n.__e,t,n,s,i,a,l,d,c);return(f=ee.diffed)&&f(t),128&t.__u?void 0:o}function yr(e){e&&e.__c&&(e.__c.__e=!0),e&&e.__k&&e.__k.forEach(yr)}function Si(e,t,n){for(var s=0;s<n.length;s++)Gr(n[s],n[++s],n[++s]);ee.__c&&ee.__c(t,e),e.some(function(i){try{e=i.__h,i.__h=[],e.some(function(a){a.call(i)})}catch(a){ee.__e(a,i.__v)}})}function Ei(e){return typeof e!="object"||e==null||e.__b&&e.__b>0?e:Wn(e)?e.map(Ei):ot({},e)}function Ua(e,t,n,s,i,a,l,o,d){var c,f,u,m,y,_,v,x=n.props||cn,k=t.props,p=t.type;if(p=="svg"?i="http://www.w3.org/2000/svg":p=="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),a!=null){for(c=0;c<a.length;c++)if((y=a[c])&&"setAttribute"in y==!!p&&(p?y.localName==p:y.nodeType==3)){e=y,a[c]=null;break}}if(e==null){if(p==null)return document.createTextNode(k);e=document.createElementNS(i,p,k.is&&k),o&&(ee.__m&&ee.__m(t,a),o=!1),a=null}if(p==null)x===k||o&&e.data==k||(e.data=k);else{if(a=a&&Vn.call(e.childNodes),!o&&a!=null)for(x={},c=0;c<e.attributes.length;c++)x[(y=e.attributes[c]).name]=y.value;for(c in x)if(y=x[c],c!="children"){if(c=="dangerouslySetInnerHTML")u=y;else if(!(c in k)){if(c=="value"&&"defaultValue"in k||c=="checked"&&"defaultChecked"in k)continue;bn(e,c,null,y,i)}}for(c in k)y=k[c],c=="children"?m=y:c=="dangerouslySetInnerHTML"?f=y:c=="value"?_=y:c=="checked"?v=y:o&&typeof y!="function"||x[c]===y||bn(e,c,y,x[c],i);if(f)o||u&&(f.__html==u.__html||f.__html==e.innerHTML)||(e.innerHTML=f.__html),t.__k=[];else if(u&&(e.innerHTML=""),xi(t.type=="template"?e.content:e,Wn(m)?m:[m],t,n,s,p=="foreignObject"?"http://www.w3.org/1999/xhtml":i,a,l,a?a[0]:n.__k&&Ot(n,0),o,d),a!=null)for(c=a.length;c--;)Br(a[c]);o||(c="value",p=="progress"&&_==null?e.removeAttribute("value"):_!=null&&(_!==e[c]||p=="progress"&&!_||p=="option"&&_!=x[c])&&bn(e,c,_,x[c],i),c="checked",v!=null&&v!=e[c]&&bn(e,c,v,x[c],i))}return e}function Gr(e,t,n){try{if(typeof e=="function"){var s=typeof e.__u=="function";s&&e.__u(),s&&t==null||(e.__u=e(t))}else e.current=t}catch(i){ee.__e(i,n)}}function Ci(e,t,n){var s,i;if(ee.unmount&&ee.unmount(e),(s=e.ref)&&(s.current&&s.current!=e.__e||Gr(s,null,t)),(s=e.__c)!=null){if(s.componentWillUnmount)try{s.componentWillUnmount()}catch(a){ee.__e(a,t)}s.base=s.__P=null}if(s=e.__k)for(i=0;i<s.length;i++)s[i]&&Ci(s[i],t,n||typeof e.type!="function");n||Br(e.__e),e.__c=e.__=e.__e=void 0}function Va(e,t,n){return this.constructor(e,n)}function Wa(e,t,n){var s,i,a,l;t==document&&(t=document.documentElement),ee.__&&ee.__(e,t),i=(s=!1)?null:t.__k,a=[],l=[],Or(t,e=t.__k=fe(ue,null,[e]),i||cn,cn,t.namespaceURI,i?null:t.firstChild?Vn.call(t.childNodes):null,a,i?i.__e:t.firstChild,s,l),Si(a,e,l)}function ja(e){function t(n){var s,i;return this.getChildContext||(s=new Set,(i={})[t.__c]=this,this.getChildContext=function(){return i},this.componentWillUnmount=function(){s=null},this.shouldComponentUpdate=function(a){this.props.value!=a.value&&s.forEach(function(l){l.__e=!0,br(l)})},this.sub=function(a){s.add(a);var l=a.componentWillUnmount;a.componentWillUnmount=function(){s&&s.delete(a),l&&l.call(a)}}),n.children}return t.__c="__cC"+bi++,t.__=e,t.Provider=t.__l=(t.Consumer=function(n,s){return n.children(s)}).contextType=t,t}Vn=yi.slice,ee={__e:function(e,t,n,s){for(var i,a,l;t=t.__;)if((i=t.__c)&&!i.__)try{if((a=i.constructor)&&a.getDerivedStateFromError!=null&&(i.setState(a.getDerivedStateFromError(e)),l=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(e,s||{}),l=i.__d),l)return i.__E=i}catch(o){e=o}throw e}},hi=0,gi=function(e){return e!=null&&e.constructor===void 0},tn.prototype.setState=function(e,t){var n;n=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=ot({},this.state),typeof e=="function"&&(e=e(ot({},n),this.props)),e&&ot(n,e),e!=null&&this.__v&&(t&&this._sb.push(t),br(this))},tn.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),br(this))},tn.prototype.render=ue,bt=[],mi=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,vi=function(e,t){return e.__v.__b-t.__v.__b},In.__r=0,_i=/(PointerCapture)$|Capture$/i,Nr=0,vr=as(!1),_r=as(!0),bi=0;var Ya=0;function r(e,t,n,s,i,a){t||(t={});var l,o,d=t;if("ref"in d)for(o in d={},t)o=="ref"?l=t[o]:d[o]=t[o];var c={type:e,props:d,key:n,ref:l,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Ya,__i:-1,__u:0,__source:i,__self:a};if(typeof e=="function"&&(l=e.defaultProps))for(o in l)d[o]===void 0&&(d[o]=l[o]);return ee.vnode&&ee.vnode(c),c}var Gt,he,Jn,ls,dn=0,Ti=[],ye=ee,os=ye.__b,cs=ye.__r,ds=ye.diffed,us=ye.__c,ps=ye.unmount,fs=ye.__;function jn(e,t){ye.__h&&ye.__h(he,e,dn||t),dn=0;var n=he.__H||(he.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function V(e){return dn=1,qa(Pi,e)}function qa(e,t,n){var s=jn(Gt++,2);if(s.t=e,!s.__c&&(s.__=[Pi(void 0,t),function(o){var d=s.__N?s.__N[0]:s.__[0],c=s.t(d,o);d!==c&&(s.__N=[c,s.__[1]],s.__c.setState({}))}],s.__c=he,!he.__f)){var i=function(o,d,c){if(!s.__c.__H)return!0;var f=s.__c.__H.__.filter(function(m){return!!m.__c});if(f.every(function(m){return!m.__N}))return!a||a.call(this,o,d,c);var u=s.__c.props!==o;return f.forEach(function(m){if(m.__N){var y=m.__[0];m.__=m.__N,m.__N=void 0,y!==m.__[0]&&(u=!0)}}),a&&a.call(this,o,d,c)||u};he.__f=!0;var a=he.shouldComponentUpdate,l=he.componentWillUpdate;he.componentWillUpdate=function(o,d,c){if(this.__e){var f=a;a=void 0,i(o,d,c),a=f}l&&l.call(this,o,d,c)},he.shouldComponentUpdate=i}return s.__N||s.__}function ge(e,t){var n=jn(Gt++,3);!ye.__s&&Ai(n.__H,t)&&(n.__=e,n.u=t,he.__H.__h.push(n))}function j(e){return dn=5,Pe(function(){return{current:e}},[])}function Pe(e,t){var n=jn(Gt++,7);return Ai(n.__H,t)&&(n.__=e(),n.__H=t,n.__h=e),n.__}function ae(e,t){return dn=8,Pe(function(){return e},t)}function Ka(e){var t=he.context[e.__c],n=jn(Gt++,9);return n.c=e,t?(n.__==null&&(n.__=!0,t.sub(he)),t.props.value):e.__}function Xa(){for(var e;e=Ti.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(Tn),e.__H.__h.forEach(wr),e.__H.__h=[]}catch(t){e.__H.__h=[],ye.__e(t,e.__v)}}ye.__b=function(e){he=null,os&&os(e)},ye.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),fs&&fs(e,t)},ye.__r=function(e){cs&&cs(e),Gt=0;var t=(he=e.__c).__H;t&&(Jn===he?(t.__h=[],he.__h=[],t.__.forEach(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})):(t.__h.forEach(Tn),t.__h.forEach(wr),t.__h=[],Gt=0)),Jn=he},ye.diffed=function(e){ds&&ds(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(Ti.push(t)!==1&&ls===ye.requestAnimationFrame||((ls=ye.requestAnimationFrame)||Za)(Xa)),t.__H.__.forEach(function(n){n.u&&(n.__H=n.u),n.u=void 0})),Jn=he=null},ye.__c=function(e,t){t.some(function(n){try{n.__h.forEach(Tn),n.__h=n.__h.filter(function(s){return!s.__||wr(s)})}catch(s){t.some(function(i){i.__h&&(i.__h=[])}),t=[],ye.__e(s,n.__v)}}),us&&us(e,t)},ye.unmount=function(e){ps&&ps(e);var t,n=e.__c;n&&n.__H&&(n.__H.__.forEach(function(s){try{Tn(s)}catch(i){t=i}}),n.__H=void 0,t&&ye.__e(t,n.__v))};var hs=typeof requestAnimationFrame=="function";function Za(e){var t,n=function(){clearTimeout(s),hs&&cancelAnimationFrame(t),setTimeout(e)},s=setTimeout(n,35);hs&&(t=requestAnimationFrame(n))}function Tn(e){var t=he,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),he=t}function wr(e){var t=he;e.__c=e.__(),he=t}function Ai(e,t){return!e||e.length!==t.length||t.some(function(n,s){return n!==e[s]})}function Pi(e,t){return typeof t=="function"?t(e):t}var Ja=Symbol.for("preact-signals");function Hr(){if(Bt>1)Bt--;else{for(var e,t=!1;nn!==void 0;){var n=nn;for(nn=void 0,xr++;n!==void 0;){var s=n.o;if(n.o=void 0,n.f&=-3,!(8&n.f)&&Ii(n))try{n.c()}catch(i){t||(e=i,t=!0)}n=s}}if(xr=0,Bt--,t)throw e}}var X=void 0;function Fi(e){var t=X;X=void 0;try{return e()}finally{X=t}}var nn=void 0,Bt=0,xr=0,Dn=0;function Mi(e){if(X!==void 0){var t=e.n;if(t===void 0||t.t!==X)return t={i:0,S:e,p:X.s,n:void 0,t:X,e:void 0,x:void 0,r:t},X.s!==void 0&&(X.s.n=t),X.s=t,e.n=t,32&X.f&&e.S(t),t;if(t.i===-1)return t.i=0,t.n!==void 0&&(t.n.p=t.p,t.p!==void 0&&(t.p.n=t.n),t.p=X.s,t.n=void 0,X.s.n=t,X.s=t),t}}function Fe(e,t){this.v=e,this.i=0,this.n=void 0,this.t=void 0,this.W=t==null?void 0:t.watched,this.Z=t==null?void 0:t.unwatched,this.name=t==null?void 0:t.name}Fe.prototype.brand=Ja;Fe.prototype.h=function(){return!0};Fe.prototype.S=function(e){var t=this,n=this.t;n!==e&&e.e===void 0&&(e.x=n,this.t=e,n!==void 0?n.e=e:Fi(function(){var s;(s=t.W)==null||s.call(t)}))};Fe.prototype.U=function(e){var t=this;if(this.t!==void 0){var n=e.e,s=e.x;n!==void 0&&(n.x=s,e.e=void 0),s!==void 0&&(s.e=n,e.x=void 0),e===this.t&&(this.t=s,s===void 0&&Fi(function(){var i;(i=t.Z)==null||i.call(t)}))}};Fe.prototype.subscribe=function(e){var t=this;return xt(function(){var n=t.value,s=X;X=void 0;try{e(n)}finally{X=s}},{name:"sub"})};Fe.prototype.valueOf=function(){return this.value};Fe.prototype.toString=function(){return this.value+""};Fe.prototype.toJSON=function(){return this.value};Fe.prototype.peek=function(){var e=X;X=void 0;try{return this.value}finally{X=e}};Object.defineProperty(Fe.prototype,"value",{get:function(){var e=Mi(this);return e!==void 0&&(e.i=this.i),this.v},set:function(e){if(e!==this.v){if(xr>100)throw new Error("Cycle detected");this.v=e,this.i++,Dn++,Bt++;try{for(var t=this.t;t!==void 0;t=t.x)t.t.N()}finally{Hr()}}}});function Z(e,t){return new Fe(e,t)}function Ii(e){for(var t=e.s;t!==void 0;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function Di(e){for(var t=e.s;t!==void 0;t=t.n){var n=t.S.n;if(n!==void 0&&(t.r=n),t.S.n=t,t.i=-1,t.n===void 0){e.s=t;break}}}function $i(e){for(var t=e.s,n=void 0;t!==void 0;){var s=t.p;t.i===-1?(t.S.U(t),s!==void 0&&(s.n=t.n),t.n!==void 0&&(t.n.p=s)):n=t,t.S.n=t.r,t.r!==void 0&&(t.r=void 0),t=s}e.s=n}function Et(e,t){Fe.call(this,void 0),this.x=e,this.s=void 0,this.g=Dn-1,this.f=4,this.W=t==null?void 0:t.watched,this.Z=t==null?void 0:t.unwatched,this.name=t==null?void 0:t.name}Et.prototype=new Fe;Et.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Dn))return!0;if(this.g=Dn,this.f|=1,this.i>0&&!Ii(this))return this.f&=-2,!0;var e=X;try{Di(this),X=this;var t=this.x();(16&this.f||this.v!==t||this.i===0)&&(this.v=t,this.f&=-17,this.i++)}catch(n){this.v=n,this.f|=16,this.i++}return X=e,$i(this),this.f&=-2,!0};Et.prototype.S=function(e){if(this.t===void 0){this.f|=36;for(var t=this.s;t!==void 0;t=t.n)t.S.S(t)}Fe.prototype.S.call(this,e)};Et.prototype.U=function(e){if(this.t!==void 0&&(Fe.prototype.U.call(this,e),this.t===void 0)){this.f&=-33;for(var t=this.s;t!==void 0;t=t.n)t.S.U(t)}};Et.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var e=this.t;e!==void 0;e=e.x)e.t.N()}};Object.defineProperty(Et.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var e=Mi(this);if(this.h(),e!==void 0&&(e.i=this.i),16&this.f)throw this.v;return this.v}});function J(e,t){return new Et(e,t)}function Li(e){var t=e.u;if(e.u=void 0,typeof t=="function"){Bt++;var n=X;X=void 0;try{t()}catch(s){throw e.f&=-2,e.f|=8,Ur(e),s}finally{X=n,Hr()}}}function Ur(e){for(var t=e.s;t!==void 0;t=t.n)t.S.U(t);e.x=void 0,e.s=void 0,Li(e)}function Qa(e){if(X!==this)throw new Error("Out-of-order effect");$i(this),X=e,this.f&=-2,8&this.f&&Ur(this),Hr()}function Vt(e,t){this.x=e,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=t==null?void 0:t.name}Vt.prototype.c=function(){var e=this.S();try{if(8&this.f||this.x===void 0)return;var t=this.x();typeof t=="function"&&(this.u=t)}finally{e()}};Vt.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,Li(this),Di(this),Bt++;var e=X;return X=this,Qa.bind(this,e)};Vt.prototype.N=function(){2&this.f||(this.f|=2,this.o=nn,nn=this)};Vt.prototype.d=function(){this.f|=8,1&this.f||Ur(this)};Vt.prototype.dispose=function(){this.d()};function xt(e,t){var n=new Vt(e,t);try{n.c()}catch(i){throw n.d(),i}var s=n.d.bind(n);return s[Symbol.dispose]=s,s}var yn;function Wt(e,t){ee[e]=t.bind(null,ee[e]||function(){})}function $n(e){if(yn){var t=yn;yn=void 0,t()}yn=e&&e.S()}function Ri(e){var t=this,n=e.data,s=tl(n);s.value=n;var i=Pe(function(){for(var a=t.__v;a=a.__;)if(a.__c){a.__c.__$f|=4;break}return t.__$u.c=function(){var l,o=t.__$u.S(),d=i.value;o(),gi(d)||((l=t.base)==null?void 0:l.nodeType)!==3?(t.__$f|=1,t.setState({})):t.base.data=d},J(function(){var l=s.value.value;return l===0?0:l===!0?"":l||""})},[]);return i.value}Ri.displayName="_st";Object.defineProperties(Fe.prototype,{constructor:{configurable:!0,value:void 0},type:{configurable:!0,value:Ri},props:{configurable:!0,get:function(){return{data:this}}},__b:{configurable:!0,value:1}});Wt("__b",function(e,t){if(typeof t.type=="string"){var n,s=t.props;for(var i in s)if(i!=="children"){var a=s[i];a instanceof Fe&&(n||(t.__np=n={}),n[i]=a,s[i]=a.peek())}}e(t)});Wt("__r",function(e,t){e(t),$n();var n,s=t.__c;s&&(s.__$f&=-2,(n=s.__$u)===void 0&&(s.__$u=n=function(i){var a;return xt(function(){a=this}),a.c=function(){s.__$f|=1,s.setState({})},a}())),$n(n)});Wt("__e",function(e,t,n,s){$n(),e(t,n,s)});Wt("diffed",function(e,t){$n();var n;if(typeof t.type=="string"&&(n=t.__e)){var s=t.__np,i=t.props;if(s){var a=n.U;if(a)for(var l in a){var o=a[l];o!==void 0&&!(l in s)&&(o.d(),a[l]=void 0)}else n.U=a={};for(var d in s){var c=a[d],f=s[d];c===void 0?(c=el(n,d,f,i),a[d]=c):c.o(f,i)}}}e(t)});function el(e,t,n,s){var i=t in e&&e.ownerSVGElement===void 0,a=Z(n);return{o:function(l,o){a.value=l,s=o},d:xt(function(){var l=a.value.value;s[t]!==l&&(s[t]=l,i?e[t]=l:l?e.setAttribute(t,l):e.removeAttribute(t))})}}Wt("unmount",function(e,t){if(typeof t.type=="string"){var n=t.__e;if(n){var s=n.U;if(s){n.U=void 0;for(var i in s){var a=s[i];a&&a.d()}}}}else{var l=t.__c;if(l){var o=l.__$u;o&&(l.__$u=void 0,o.d())}}e(t)});Wt("__h",function(e,t,n,s){(s<3||s===9)&&(t.__$f|=2),e(t,n,s)});tn.prototype.shouldComponentUpdate=function(e,t){if(this.__R)return!0;var n=this.__$u,s=n&&n.s!==void 0;for(var i in t)return!0;if(this.__f||typeof this.u=="boolean"&&this.u===!0){if(!(s||2&this.__$f||4&this.__$f)||1&this.__$f)return!0}else if(!(s||4&this.__$f)||3&this.__$f)return!0;for(var a in e)if(a!=="__source"&&e[a]!==this.props[a])return!0;for(var l in this.props)if(!(l in e))return!0;return!1};function tl(e){return Pe(function(){return Z(e)},[])}function nl({nodes:e,selectedId:t,onSelect:n,onContextMenu:s,defaultExpanded:i=[],expanded:a,onToggle:l}){const[o,d]=V(new Set(i)),c=a??o,f=ae(u=>{l?l(u):d(m=>{const y=new Set(m);return y.has(u)?y.delete(u):y.add(u),y})},[l]);return r("div",{class:"tree-view",children:e.map(u=>r(zi,{node:u,selectedId:t,expanded:c,onToggle:f,onSelect:n,onContextMenu:s,depth:0},u.id))})}function zi({node:e,selectedId:t,expanded:n,onToggle:s,onSelect:i,onContextMenu:a,depth:l}){const o=e.children&&e.children.length>0,d=n.has(e.id),c=e.id===t,f=j(null),[u,m]=V(!1),[y,_]=V({x:0,y:0}),v=j(null),x=()=>{o&&s(e.id),i==null||i(e)},k=S=>{a&&(S.preventDefault(),a(e,S))},p=S=>{S.stopPropagation(),s(e.id)},h=S=>{if(!e.tooltip)return;const C=S.currentTarget;v.current=setTimeout(()=>{const E=C.getBoundingClientRect();_({x:E.right+8,y:E.top}),m(!0)},400)},g=()=>{v.current&&(clearTimeout(v.current),v.current=null),m(!1)},b=(()=>{const S=e.icon;return S?S==="doc"?r(il,{}):S==="folder"?r(gs,{}):S==="file"?r(ms,{}):S:o?r(gs,{}):r(ms,{})})(),w=typeof e.icon=="string"?e.icon:o?"folder":"file";return r("div",{class:"tree-item",style:{paddingLeft:`${l*8}px`},children:[r("div",{ref:f,class:`tree-item-row ${c?"selected":""}`,onClick:x,onContextMenu:k,onMouseEnter:h,onMouseLeave:g,children:[r("span",{class:`tree-toggle ${d?"expanded":""} ${o?"":"empty"}`,onClick:o?p:void 0,children:r(sl,{})}),r("span",{class:`tree-icon ${w}`,children:b}),r("span",{class:"tree-label",children:e.label}),e.badge!=null&&r("span",{class:"tree-badge",children:e.badge}),!e.badge&&o&&r("span",{class:"tree-badge",children:e.children.length})]}),u&&e.tooltip&&r(rl,{x:y.x,y:y.y,children:e.tooltip}),o&&d&&r("div",{class:"tree-children",children:e.children.map(S=>r(zi,{node:S,selectedId:t,expanded:n,onToggle:s,onSelect:i,onContextMenu:a,depth:l+1},S.id))})]})}function rl({x:e,y:t,children:n}){const s=j(null);return ge(()=>{const i=s.current;if(!i)return;const a=i.getBoundingClientRect();a.right>window.innerWidth&&(i.style.left=`${e-a.width-16}px`),a.bottom>window.innerHeight&&(i.style.top=`${window.innerHeight-a.height-8}px`)},[e,t]),r("div",{ref:s,class:"tree-tooltip",style:{position:"fixed",left:`${e}px`,top:`${t}px`},children:n})}function sl(){return r("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2",children:r("polyline",{points:"9 18 15 12 9 6"})})}function gs(){return r("svg",{viewBox:"0 0 24 24",fill:"currentColor",children:r("path",{d:"M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-8l-2-2z"})})}function ms(){return r("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2",children:[r("path",{d:"M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"}),r("polyline",{points:"14 2 14 8 20 8"})]})}function il(){return r("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2",children:[r("path",{d:"M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"}),r("polyline",{points:"14 2 14 8 20 8"}),r("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),r("line",{x1:"16",y1:"17",x2:"8",y2:"17"}),r("line",{x1:"10",y1:"9",x2:"8",y2:"9"})]})}function Ni({onResize:e,onResizeStart:t,onResizeEnd:n,direction:s,edge:i,deltaSign:a=1}){const l=j(!1),o=j(0),d=j(0),c=j(null),f=i??(s==="horizontal"?"right":"bottom"),u=ae(m=>{m.preventDefault(),l.current=!0,o.current=s==="horizontal"?m.clientX:m.clientY,document.body.style.cursor=s==="horizontal"?"col-resize":"row-resize",document.body.style.userSelect="none",t==null||t();const y=v=>{if(!l.current)return;const x=s==="horizontal"?v.clientX:v.clientY,k=x-o.current;o.current=x,d.current+=k*a,c.current===null&&(c.current=requestAnimationFrame(()=>{c.current=null;const p=d.current;d.current=0,p!==0&&e(p)}))},_=()=>{l.current=!1,document.body.style.cursor="",document.body.style.userSelect="",c.current!==null&&(cancelAnimationFrame(c.current),c.current=null);const v=d.current;d.current=0,v!==0&&e(v),n==null||n(),document.removeEventListener("mousemove",y),document.removeEventListener("mouseup",_)};document.addEventListener("mousemove",y),document.addEventListener("mouseup",_)},[e,t,n,s,a]);return r("div",{class:`resize-handle resize-handle-${s} resize-handle-edge-${f}`,onMouseDown:u})}function al({size:e=16,class:t="",color:n="currentColor"}){return r("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:n,"stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:t,children:[r("circle",{cx:"11",cy:"11",r:"8"}),r("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]})}function ll({size:e=16,class:t="",color:n="currentColor"}){return r("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:n,"stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:t,children:r("polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"})})}function ol({size:e=16,class:t="",color:n="currentColor"}){return r("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:n,"stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:t,children:[r("polyline",{points:"23 4 23 10 17 10"}),r("polyline",{points:"1 20 1 14 7 14"}),r("path",{d:"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"})]})}function cl({size:e=16,class:t="",color:n="currentColor"}){return r("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:n,"stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:t,children:[r("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),r("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})}function dl({size:e=16,class:t="",color:n="currentColor"}){return r("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:n,"stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:t,children:[r("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),r("polyline",{points:"14 2 14 8 20 8"}),r("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),r("line",{x1:"16",y1:"17",x2:"8",y2:"17"}),r("line",{x1:"10",y1:"9",x2:"8",y2:"9"})]})}const ul={left:"right",right:"left",top:"bottom",bottom:"top"},pl={left:1,right:-1,top:1,bottom:-1},fl={left:"horizontal",right:"horizontal",top:"vertical",bottom:"vertical"};function vs({placement:e,children:t,class:n="",initialSize:s=260,minSize:i=0,maxSize:a,resizable:l=!0,visible:o=!0}){const[d,c]=V(s),f=j(null),u=j(s),m=ae(p=>{let h=p;return i!==void 0&&(h=Math.max(i,h)),a!==void 0&&(h=Math.min(a,h)),h},[i,a]),y=ae(()=>{const p=f.current;if(!p)return;p.classList.add("panel-resizing");const h=e==="left"||e==="right",g=p.getBoundingClientRect();u.current=m(h?g.width:g.height)},[e,m]),_=ae(p=>{const h=f.current;if(!h)return;const g=m(u.current+p);u.current=g;const b=e==="left"||e==="right"?"width":"height";h.style[b]=`${g}px`},[e,m]),v=ae(()=>{const p=f.current;p&&p.classList.remove("panel-resizing"),c(u.current)},[]);if(!o)return null;const k=e==="left"||e==="right"?{width:`${d}px`}:{height:`${d}px`};return r("div",{ref:f,class:`panel panel-${e} ${n}`.trim(),style:k,children:[l&&r(Ni,{direction:fl[e],edge:ul[e],deltaSign:pl[e],onResizeStart:y,onResize:_,onResizeEnd:v}),t]})}var Ln=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function hl(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var gl={exports:{}};(function(e){var t=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var n=function(s){var i=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,a=0,l={},o={manual:s.Prism&&s.Prism.manual,disableWorkerMessageHandler:s.Prism&&s.Prism.disableWorkerMessageHandler,util:{encode:function p(h){return h instanceof d?new d(h.type,p(h.content),h.alias):Array.isArray(h)?h.map(p):h.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(p){return Object.prototype.toString.call(p).slice(8,-1)},objId:function(p){return p.__id||Object.defineProperty(p,"__id",{value:++a}),p.__id},clone:function p(h,g){g=g||{};var b,w;switch(o.util.type(h)){case"Object":if(w=o.util.objId(h),g[w])return g[w];b={},g[w]=b;for(var S in h)h.hasOwnProperty(S)&&(b[S]=p(h[S],g));return b;case"Array":return w=o.util.objId(h),g[w]?g[w]:(b=[],g[w]=b,h.forEach(function(C,E){b[E]=p(C,g)}),b);default:return h}},getLanguage:function(p){for(;p;){var h=i.exec(p.className);if(h)return h[1].toLowerCase();p=p.parentElement}return"none"},setLanguage:function(p,h){p.className=p.className.replace(RegExp(i,"gi"),""),p.classList.add("language-"+h)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(b){var p=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(b.stack)||[])[1];if(p){var h=document.getElementsByTagName("script");for(var g in h)if(h[g].src==p)return h[g]}return null}},isActive:function(p,h,g){for(var b="no-"+h;p;){var w=p.classList;if(w.contains(h))return!0;if(w.contains(b))return!1;p=p.parentElement}return!!g}},languages:{plain:l,plaintext:l,text:l,txt:l,extend:function(p,h){var g=o.util.clone(o.languages[p]);for(var b in h)g[b]=h[b];return g},insertBefore:function(p,h,g,b){b=b||o.languages;var w=b[p],S={};for(var C in w)if(w.hasOwnProperty(C)){if(C==h)for(var E in g)g.hasOwnProperty(E)&&(S[E]=g[E]);g.hasOwnProperty(C)||(S[C]=w[C])}var A=b[p];return b[p]=S,o.languages.DFS(o.languages,function(T,P){P===A&&T!=p&&(this[T]=S)}),S},DFS:function p(h,g,b,w){w=w||{};var S=o.util.objId;for(var C in h)if(h.hasOwnProperty(C)){g.call(h,C,h[C],b||C);var E=h[C],A=o.util.type(E);A==="Object"&&!w[S(E)]?(w[S(E)]=!0,p(E,g,null,w)):A==="Array"&&!w[S(E)]&&(w[S(E)]=!0,p(E,g,C,w))}}},plugins:{},highlightAll:function(p,h){o.highlightAllUnder(document,p,h)},highlightAllUnder:function(p,h,g){var b={callback:g,container:p,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};o.hooks.run("before-highlightall",b),b.elements=Array.prototype.slice.apply(b.container.querySelectorAll(b.selector)),o.hooks.run("before-all-elements-highlight",b);for(var w=0,S;S=b.elements[w++];)o.highlightElement(S,h===!0,b.callback)},highlightElement:function(p,h,g){var b=o.util.getLanguage(p),w=o.languages[b];o.util.setLanguage(p,b);var S=p.parentElement;S&&S.nodeName.toLowerCase()==="pre"&&o.util.setLanguage(S,b);var C=p.textContent,E={element:p,language:b,grammar:w,code:C};function A(P){E.highlightedCode=P,o.hooks.run("before-insert",E),E.element.innerHTML=E.highlightedCode,o.hooks.run("after-highlight",E),o.hooks.run("complete",E),g&&g.call(E.element)}if(o.hooks.run("before-sanity-check",E),S=E.element.parentElement,S&&S.nodeName.toLowerCase()==="pre"&&!S.hasAttribute("tabindex")&&S.setAttribute("tabindex","0"),!E.code){o.hooks.run("complete",E),g&&g.call(E.element);return}if(o.hooks.run("before-highlight",E),!E.grammar){A(o.util.encode(E.code));return}if(h&&s.Worker){var T=new Worker(o.filename);T.onmessage=function(P){A(P.data)},T.postMessage(JSON.stringify({language:E.language,code:E.code,immediateClose:!0}))}else A(o.highlight(E.code,E.grammar,E.language))},highlight:function(p,h,g){var b={code:p,grammar:h,language:g};if(o.hooks.run("before-tokenize",b),!b.grammar)throw new Error('The language "'+b.language+'" has no grammar.');return b.tokens=o.tokenize(b.code,b.grammar),o.hooks.run("after-tokenize",b),d.stringify(o.util.encode(b.tokens),b.language)},tokenize:function(p,h){var g=h.rest;if(g){for(var b in g)h[b]=g[b];delete h.rest}var w=new u;return m(w,w.head,p),f(p,w,h,w.head,0),_(w)},hooks:{all:{},add:function(p,h){var g=o.hooks.all;g[p]=g[p]||[],g[p].push(h)},run:function(p,h){var g=o.hooks.all[p];if(!(!g||!g.length))for(var b=0,w;w=g[b++];)w(h)}},Token:d};s.Prism=o;function d(p,h,g,b){this.type=p,this.content=h,this.alias=g,this.length=(b||"").length|0}d.stringify=function p(h,g){if(typeof h=="string")return h;if(Array.isArray(h)){var b="";return h.forEach(function(A){b+=p(A,g)}),b}var w={type:h.type,content:p(h.content,g),tag:"span",classes:["token",h.type],attributes:{},language:g},S=h.alias;S&&(Array.isArray(S)?Array.prototype.push.apply(w.classes,S):w.classes.push(S)),o.hooks.run("wrap",w);var C="";for(var E in w.attributes)C+=" "+E+'="'+(w.attributes[E]||"").replace(/"/g,"&quot;")+'"';return"<"+w.tag+' class="'+w.classes.join(" ")+'"'+C+">"+w.content+"</"+w.tag+">"};function c(p,h,g,b){p.lastIndex=h;var w=p.exec(g);if(w&&b&&w[1]){var S=w[1].length;w.index+=S,w[0]=w[0].slice(S)}return w}function f(p,h,g,b,w,S){for(var C in g)if(!(!g.hasOwnProperty(C)||!g[C])){var E=g[C];E=Array.isArray(E)?E:[E];for(var A=0;A<E.length;++A){if(S&&S.cause==C+","+A)return;var T=E[A],P=T.inside,F=!!T.lookbehind,D=!!T.greedy,M=T.alias;if(D&&!T.pattern.global){var O=T.pattern.toString().match(/[imsuy]*$/)[0];T.pattern=RegExp(T.pattern.source,O+"g")}for(var B=T.pattern||T,I=b.next,R=w;I!==h.tail&&!(S&&R>=S.reach);R+=I.value.length,I=I.next){var W=I.value;if(h.length>p.length)return;if(!(W instanceof d)){var G=1,L;if(D){if(L=c(B,R,p,F),!L||L.index>=p.length)break;var me=L.index,z=L.index+L[0].length,q=R;for(q+=I.value.length;me>=q;)I=I.next,q+=I.value.length;if(q-=I.value.length,R=q,I.value instanceof d)continue;for(var oe=I;oe!==h.tail&&(q<z||typeof oe.value=="string");oe=oe.next)G++,q+=oe.value.length;G--,W=p.slice(R,q),L.index-=R}else if(L=c(B,0,W,F),!L)continue;var me=L.index,te=L[0],Re=W.slice(0,me),Se=W.slice(me+te.length),Y=R+W.length;S&&Y>S.reach&&(S.reach=Y);var ve=I.prev;Re&&(ve=m(h,ve,Re),R+=Re.length),y(h,ve,G);var xe=new d(C,P?o.tokenize(te,P):te,M,te);if(I=m(h,ve,xe),Se&&m(h,I,Se),G>1){var le={cause:C+","+A,reach:Y};f(p,h,g,I.prev,R,le),S&&le.reach>S.reach&&(S.reach=le.reach)}}}}}}function u(){var p={value:null,prev:null,next:null},h={value:null,prev:p,next:null};p.next=h,this.head=p,this.tail=h,this.length=0}function m(p,h,g){var b=h.next,w={value:g,prev:h,next:b};return h.next=w,b.prev=w,p.length++,w}function y(p,h,g){for(var b=h.next,w=0;w<g&&b!==p.tail;w++)b=b.next;h.next=b,b.prev=h,p.length-=w}function _(p){for(var h=[],g=p.head.next;g!==p.tail;)h.push(g.value),g=g.next;return h}if(!s.document)return s.addEventListener&&(o.disableWorkerMessageHandler||s.addEventListener("message",function(p){var h=JSON.parse(p.data),g=h.language,b=h.code,w=h.immediateClose;s.postMessage(o.highlight(b,o.languages[g],g)),w&&s.close()},!1)),o;var v=o.util.currentScript();v&&(o.filename=v.src,v.hasAttribute("data-manual")&&(o.manual=!0));function x(){o.manual||o.highlightAll()}if(!o.manual){var k=document.readyState;k==="loading"||k==="interactive"&&v&&v.defer?document.addEventListener("DOMContentLoaded",x):window.requestAnimationFrame?window.requestAnimationFrame(x):window.setTimeout(x,16)}return o}(t);e.exports&&(e.exports=n),typeof Ln<"u"&&(Ln.Prism=n),n.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},n.languages.markup.tag.inside["attr-value"].inside.entity=n.languages.markup.entity,n.languages.markup.doctype.inside["internal-subset"].inside=n.languages.markup,n.hooks.add("wrap",function(s){s.type==="entity"&&(s.attributes.title=s.content.replace(/&amp;/,"&"))}),Object.defineProperty(n.languages.markup.tag,"addInlined",{value:function(i,a){var l={};l["language-"+a]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:n.languages[a]},l.cdata=/^<!\[CDATA\[|\]\]>$/i;var o={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:l}};o["language-"+a]={pattern:/[\s\S]+/,inside:n.languages[a]};var d={};d[i]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return i}),"i"),lookbehind:!0,greedy:!0,inside:o},n.languages.insertBefore("markup","cdata",d)}}),Object.defineProperty(n.languages.markup.tag,"addAttribute",{value:function(s,i){n.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+s+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[i,"language-"+i],inside:n.languages[i]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),n.languages.html=n.languages.markup,n.languages.mathml=n.languages.markup,n.languages.svg=n.languages.markup,n.languages.xml=n.languages.extend("markup",{}),n.languages.ssml=n.languages.xml,n.languages.atom=n.languages.xml,n.languages.rss=n.languages.xml,function(s){var i=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;s.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+i.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+i.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+i.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+i.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:i,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},s.languages.css.atrule.inside.rest=s.languages.css;var a=s.languages.markup;a&&(a.tag.addInlined("style","css"),a.tag.addAttribute("style","css"))}(n),n.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},n.languages.javascript=n.languages.extend("clike",{"class-name":[n.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),n.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,n.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:n.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:n.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:n.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:n.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:n.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),n.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:n.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),n.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),n.languages.markup&&(n.languages.markup.tag.addInlined("script","javascript"),n.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),n.languages.js=n.languages.javascript,function(){if(typeof n>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var s="Loading…",i=function(v,x){return"✖ Error "+v+" while fetching file: "+x},a="✖ Error: File does not exist or is empty",l={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},o="data-src-status",d="loading",c="loaded",f="failed",u="pre[data-src]:not(["+o+'="'+c+'"]):not(['+o+'="'+d+'"])';function m(v,x,k){var p=new XMLHttpRequest;p.open("GET",v,!0),p.onreadystatechange=function(){p.readyState==4&&(p.status<400&&p.responseText?x(p.responseText):p.status>=400?k(i(p.status,p.statusText)):k(a))},p.send(null)}function y(v){var x=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(v||"");if(x){var k=Number(x[1]),p=x[2],h=x[3];return p?h?[k,Number(h)]:[k,void 0]:[k,k]}}n.hooks.add("before-highlightall",function(v){v.selector+=", "+u}),n.hooks.add("before-sanity-check",function(v){var x=v.element;if(x.matches(u)){v.code="",x.setAttribute(o,d);var k=x.appendChild(document.createElement("CODE"));k.textContent=s;var p=x.getAttribute("data-src"),h=v.language;if(h==="none"){var g=(/\.(\w+)$/.exec(p)||[,"none"])[1];h=l[g]||g}n.util.setLanguage(k,h),n.util.setLanguage(x,h);var b=n.plugins.autoloader;b&&b.loadLanguages(h),m(p,function(w){x.setAttribute(o,c);var S=y(x.getAttribute("data-range"));if(S){var C=w.split(/\r\n?|\n/g),E=S[0],A=S[1]==null?C.length:S[1];E<0&&(E+=C.length),E=Math.max(0,Math.min(E-1,C.length)),A<0&&(A+=C.length),A=Math.max(0,Math.min(A,C.length)),w=C.slice(E,A).join(`
`),x.hasAttribute("data-start")||x.setAttribute("data-start",String(E+1))}k.textContent=w,n.highlightElement(k)},function(w){x.setAttribute(o,f),k.textContent=w})}}),n.plugins.fileHighlight={highlight:function(x){for(var k=(x||document).querySelectorAll(u),p=0,h;h=k[p++];)n.highlightElement(h)}};var _=!1;n.fileHighlight=function(){_||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),_=!0),n.plugins.fileHighlight.highlight.apply(this,arguments)}}()})(gl);(function(e){for(var t=/\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\//.source,n=0;n<2;n++)t=t.replace(/<self>/g,function(){return t});t=t.replace(/<self>/g,function(){return/[^\s\S]/.source}),e.languages.rust={comment:[{pattern:RegExp(/(^|[^\\])/.source+t),lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,greedy:!0},char:{pattern:/b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,greedy:!0},attribute:{pattern:/#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,greedy:!0,alias:"attr-name",inside:{string:null}},"closure-params":{pattern:/([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,lookbehind:!0,greedy:!0,inside:{"closure-punctuation":{pattern:/^\||\|$/,alias:"punctuation"},rest:null}},"lifetime-annotation":{pattern:/'\w+/,alias:"symbol"},"fragment-specifier":{pattern:/(\$\w+:)[a-z]+/,lookbehind:!0,alias:"punctuation"},variable:/\$\w+/,"function-definition":{pattern:/(\bfn\s+)\w+/,lookbehind:!0,alias:"function"},"type-definition":{pattern:/(\b(?:enum|struct|trait|type|union)\s+)\w+/,lookbehind:!0,alias:"class-name"},"module-declaration":[{pattern:/(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,lookbehind:!0,alias:"namespace"},{pattern:/(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,lookbehind:!0,alias:"namespace",inside:{punctuation:/::/}}],keyword:[/\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,/\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/],function:/\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,macro:{pattern:/\b\w+!/,alias:"property"},constant:/\b[A-Z_][A-Z_\d]+\b/,"class-name":/\b[A-Z]\w*\b/,namespace:{pattern:/(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,inside:{punctuation:/::/}},number:/\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,boolean:/\b(?:false|true)\b/,punctuation:/->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,operator:/[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/},e.languages.rust["closure-params"].inside.rest=e.languages.rust,e.languages.rust.attribute.inside.string=e.languages.rust.string})(Prism);(function(e){e.languages.typescript=e.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),e.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,/\btype\b(?=\s*(?:[\{*]|$))/),delete e.languages.typescript.parameter,delete e.languages.typescript["literal-property"];var t=e.languages.extend("typescript",{});delete t["class-name"],e.languages.typescript["class-name"].inside=t,e.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:t}}}}),e.languages.ts=e.languages.typescript})(Prism);Prism.languages.json={property:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,lookbehind:!0,greedy:!0},string:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,lookbehind:!0,greedy:!0},comment:{pattern:/\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},number:/-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,punctuation:/[{}[\],]/,operator:/:/,boolean:/\b(?:false|true)\b/,null:{pattern:/\bnull\b/,alias:"keyword"}};Prism.languages.webmanifest=Prism.languages.json;(function(e){var t=/[*&][^\s[\]{},]+/,n=/!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/,s="(?:"+n.source+"(?:[ 	]+"+t.source+")?|"+t.source+"(?:[ 	]+"+n.source+")?)",i=/(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(/<PLAIN>/g,function(){return/[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source}),a=/"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;function l(o,d){d=(d||"").replace(/m/g,"")+"m";var c=/([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g,function(){return s}).replace(/<<value>>/g,function(){return o});return RegExp(c,d)}e.languages.yaml={scalar:{pattern:RegExp(/([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(/<<prop>>/g,function(){return s})),lookbehind:!0,alias:"string"},comment:/#.*/,key:{pattern:RegExp(/((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g,function(){return s}).replace(/<<key>>/g,function(){return"(?:"+i+"|"+a+")"})),lookbehind:!0,greedy:!0,alias:"atrule"},directive:{pattern:/(^[ \t]*)%.+/m,lookbehind:!0,alias:"important"},datetime:{pattern:l(/\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source),lookbehind:!0,alias:"number"},boolean:{pattern:l(/false|true/.source,"i"),lookbehind:!0,alias:"important"},null:{pattern:l(/null|~/.source,"i"),lookbehind:!0,alias:"important"},string:{pattern:l(a),lookbehind:!0,greedy:!0},number:{pattern:l(/[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source,"i"),lookbehind:!0},tag:n,important:t,punctuation:/---|[:[\]{}\-,|>?]|\.\.\./},e.languages.yml=e.languages.yaml})(Prism);(function(e){var t=/(?:[\w-]+|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*")/.source;function n(s){return s.replace(/__/g,function(){return t})}e.languages.toml={comment:{pattern:/#.*/,greedy:!0},table:{pattern:RegExp(n(/(^[\t ]*\[\s*(?:\[\s*)?)__(?:\s*\.\s*__)*(?=\s*\])/.source),"m"),lookbehind:!0,greedy:!0,alias:"class-name"},key:{pattern:RegExp(n(/(^[\t ]*|[{,]\s*)__(?:\s*\.\s*__)*(?=\s*=)/.source),"m"),lookbehind:!0,greedy:!0,alias:"property"},string:{pattern:/"""(?:\\[\s\S]|[^\\])*?"""|'''[\s\S]*?'''|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*"/,greedy:!0},date:[{pattern:/\b\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?\b/i,alias:"number"},{pattern:/\b\d{2}:\d{2}:\d{2}(?:\.\d+)?\b/,alias:"number"}],number:/(?:\b0(?:x[\da-zA-Z]+(?:_[\da-zA-Z]+)*|o[0-7]+(?:_[0-7]+)*|b[10]+(?:_[10]+)*))\b|[-+]?\b\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?\b|[-+]?\b(?:inf|nan)\b/,boolean:/\b(?:false|true)\b/,punctuation:/[.,=[\]{}]/}})(Prism);function ml({options:e,state:t,onChange:n}){return r("div",{class:"file-tree__sort-header",children:e.map(s=>{const i=t.key===s.key,a=i?t.direction==="asc"?"desc":"asc":s.defaultDirection??"asc";return r("button",{class:`file-tree__sort-btn${i?" file-tree__sort-btn--active":""}`,onClick:()=>n({key:s.key,direction:a}),title:`Sort by ${s.label}`,children:[s.label,i&&(t.direction==="asc"?" ↑":" ↓")]},s.key)})})}function vl({options:e,activeKey:t,onChange:n}){return r("div",{class:"file-tree__filter-header",children:e.map(s=>{if(s.count!=null&&s.count<=0)return null;const i=t===s.key,a=i&&s.activeColor?{borderColor:s.activeColor,color:s.activeColor}:void 0;return r("button",{class:`file-tree__filter-btn${i?" file-tree__filter-btn--active":""}`,style:a,onClick:()=>n(i?null:s.key),title:i?"Show all":`Show only ${s.label}`,children:[s.icon&&r("span",{class:"file-tree__filter-icon",children:s.icon}),r("span",{children:[s.label,s.count!=null?` (${s.count})`:""]})]},s.key)})})}function _l({nodes:e,selectedId:t,onSelect:n,onContextMenu:s,defaultExpanded:i=[],expanded:a,onToggle:l,loading:o=!1,emptyMessage:d="No files found",class:c="",sortOptions:f,sortState:u,onSortChange:m,filterOptions:y,activeFilter:_,onFilterChange:v}){const x={nodes:e,selectedId:t,onSelect:n,onContextMenu:s,defaultExpanded:i,expanded:a,onToggle:l};return r("div",{class:`file-tree ${c}`.trim(),children:[y&&y.length>0&&v&&r(vl,{options:y,activeKey:_,onChange:v}),f&&f.length>0&&u&&m&&r(ml,{options:f,state:u,onChange:m}),o?r("div",{class:"file-tree__loading",children:"Loading..."}):e.length===0?r("div",{class:"file-tree__empty",children:d}):r(nl,{...x})]})}const bl="x-session-id",_s="viewer_session_id";function yl(){let e=sessionStorage.getItem(_s);return e||(e=crypto.randomUUID(),sessionStorage.setItem(_s,e)),e}function Ct(e={}){return{...e,headers:{...e.headers,[bl]:yl()}}}function wl(e){let t=!1;const n=e.statesEqual??((o,d)=>JSON.stringify(o)===JSON.stringify(d));function s(){const o=window.location.hash.slice(1);return o?e.hashToState(o):null}function i(o){if(t)return;const c=`#${e.stateToHash(o)}`;window.location.hash!==c&&window.history.pushState(null,"",c)}async function a(){const o=s();if(!o)return;const d=e.getCurrentState();if(!(d&&n(d,o))){t=!0;try{await e.onNavigate(o)}finally{t=!1}}}function l(){window.addEventListener("hashchange",a),window.addEventListener("popstate",a)}return{updateHash:i,getStateFromUrl:s,initListener:l}}function xl(e){const t=e.replace("#",""),n=parseInt(t.slice(0,2),16)/255,s=parseInt(t.slice(2,4),16)/255,i=parseInt(t.slice(4,6),16)/255;return[n,s,i]}function Vr(e,t,n){const s=i=>Math.max(0,Math.min(255,Math.round(i*255)));return"#"+[e,t,n].map(i=>s(i).toString(16).padStart(2,"0")).join("")}function kl(e){const t=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,s=parseInt(e.slice(5,7),16)/255,i=a=>a<=.03928?a/12.92:Math.pow((a+.055)/1.055,2.4);return .2126*i(t)+.7152*i(n)+.0722*i(s)}function It(e,t){const n=parseInt(e.slice(1,3),16),s=parseInt(e.slice(3,5),16),i=parseInt(e.slice(5,7),16);return`rgba(${n}, ${s}, ${i}, ${t})`}function _t(e,t){const n=parseInt(e.slice(1,3),16),s=parseInt(e.slice(3,5),16),i=parseInt(e.slice(5,7),16),a=l=>Math.min(255,Math.round(l+(255-l)*t));return Vr(a(n)/255,a(s)/255,a(i)/255)}function wn(e,t){const n=parseInt(e.slice(1,3),16)/255,s=parseInt(e.slice(3,5),16)/255,i=parseInt(e.slice(5,7),16)/255,a=.2989*n+.587*s+.114*i,l=o=>Math.min(1,Math.max(0,a+(o-a)*(1+t)));return Vr(l(n),l(s),l(i))}const Sl={glassOpacity:35,glassBlur:25,crtEnabled:!0,crtScanlinesH:20,crtScanlinesV:12,crtEdgeShadow:35,crtFlicker:12,crtLineWidth:50,crtColor:[100,80,60],smokeEnabled:!0,smokeIntensity:40,smokeSpeed:50,smokeWarmScale:100,smokeCoolScale:100,smokeMossScale:100,grainIntensity:20,grainCoarseness:40,grainSize:35,vignetteStrength:40,underglowStrength:25,sparkSpeed:70,sparksEnabled:!0,emberSpeed:70,embersEnabled:!0,beamSpeed:50,beamsEnabled:!0,glitterSpeed:60,glitterEnabled:!0,beamHeight:35,beamDrift:80,beamCount:48,sparkCount:40,sparkSize:70,emberCount:40,emberSize:70,glitterCount:40,glitterSize:60,cinderSize:70,cinderEnabled:!0},We={bgPrimary:"#eae6df",bgSecondary:"#f2efe8",bgTertiary:"#f8f6f1",bgHover:"#dfd9cf",bgActive:"#d4cdc0",textPrimary:"#1e1c18",textSecondary:"#4a4640",textMuted:"#74706a",borderColor:"#c8c0b4",borderSubtle:"#ddd8ce",accentBlue:"#5a9ec4",accentGreen:"#4a8a52",accentOrange:"#c49050",accentPurple:"#8a6aaa",accentYellow:"#b8a040",levelTrace:"#d8d4cc",levelDebug:"#b8d4b8",levelInfo:"#b0cce0",levelWarn:"#e0c888",levelError:"#d4948a",levelTraceText:"#4a4848",levelDebugText:"#2a4a30",levelInfoText:"#2a4060",levelWarnText:"#5a4020",levelErrorText:"#5a2020",spanEnterText:"#2a6a40",spanExitText:"#6a4020",particleSparkCore:"#fff8e0",particleSparkEmber:"#d4aa50",particleSparkSteel:"#c8c0b8",particleEmberHot:"#f0d888",particleEmberBase:"#c89840",particleBeamCenter:"#ffffff",particleBeamEdge:"#ffe8b0",particleGlitterWarm:"#fff0c8",particleGlitterCool:"#d8e8ff",cinderEmber:"#c8a040",cinderGold:"#e0c870",cinderAsh:"#b8b0a0",cinderVine:"#5a9a58",smokeCool:"#a8cce8",smokeWarm:"#c8ddf0",smokeMoss:"#e8f0fa"},Bi=Z(We);function El(e,t=We,n=!1){function s(){try{const l=localStorage.getItem(e);if(l)return{...t,...JSON.parse(l)}}catch{}return{...t}}const i=Z(s());xt(()=>{const l=i.value;Bi.value=l;try{localStorage.setItem(e,JSON.stringify(l))}catch{}});let a=null;return xt(()=>{const l=i.value;a||(a=document.createElement("style"),a.id=`${e}-theme`,document.head.appendChild(a));let c=`:root {
  color-scheme: ${kl(l.bgPrimary)<.2?"dark":"light"};
  --bg-primary: ${l.bgPrimary};
  --bg-secondary: ${l.bgSecondary};
  --bg-tertiary: ${l.bgTertiary};
  --bg-hover: ${l.bgHover};
  --bg-active: ${l.bgActive};
  --text-primary: ${l.textPrimary};
  --text-secondary: ${l.textSecondary};
  --text-muted: ${l.textMuted};
  --border-color: ${l.borderColor};
  --border-subtle: ${l.borderSubtle};
  --accent-blue: ${l.accentBlue};
  --accent-green: ${l.accentGreen};
  --accent-orange: ${l.accentOrange};
  --accent-purple: ${l.accentPurple};
  --accent-yellow: ${l.accentYellow};
  --level-trace: ${l.levelTrace};
  --level-debug: ${l.levelDebug};
  --level-info: ${l.levelInfo};
  --level-warn: ${l.levelWarn};
  --level-error: ${l.levelError};
  --level-trace-text: ${l.levelTraceText};
  --level-debug-text: ${l.levelDebugText};
  --level-info-text: ${l.levelInfoText};
  --level-warn-text: ${l.levelWarnText};
  --level-error-text: ${l.levelErrorText};
  --span-enter-text: ${l.spanEnterText};
  --span-exit-text: ${l.spanExitText};
}`;if(n){const f=It(l.bgSecondary,.25),u=It(l.bgTertiary,.25),m=It(l.bgHover,.35),y=It(l.bgActive,.35),_=It(l.borderColor,.35),v=It(l.borderSubtle,.25),x=_t(l.textPrimary,.12),k=_t(l.textSecondary,.15),p=_t(l.textMuted,.2),h=wn(_t(l.accentBlue,.15),.1),g=wn(_t(l.accentGreen,.15),.1),b=wn(_t(l.accentPurple,.15),.1),w=wn(_t(l.accentYellow,.12),.1);c+=`
:root.gpu-active {
  --bg-primary: transparent;
  --bg-secondary: ${f};
  --bg-tertiary: ${u};
  --bg-hover: ${m};
  --bg-active: ${y};
  --border-color: ${_};
  --border-subtle: ${v};
  --text-primary: ${x};
  --text-secondary: ${k};
  --text-muted: ${p};
  --accent-blue: ${h};
  --accent-green: ${g};
  --accent-purple: ${b};
  --accent-yellow: ${w};
  /* Mobile sidebar needs opaque background even in glass/GPU mode */
  --sidebar-mobile-bg: ${l.bgSecondary};
}`}a.textContent=c}),{colors:i,updateColor:(l,o)=>{i.value={...i.value,[l]:o}},applyPreset:l=>{i.value={...l}},reset:()=>{i.value={...t}}}}const Oi=`// palette.wgsl — Shared ThemePalette struct definition\r
//\r
// Included by ALL shaders that need configurable theme colors.\r
// The binding declaration (e.g. @group(0) @binding(3)) is in each\r
// pipeline-specific shader file, NOT here.\r
\r
struct ThemePalette {\r
    // Particle: Metal Spark [0-2]\r
    spark_core     : vec4f,   // hot white-yellow center\r
    spark_ember    : vec4f,   // outer ember glow\r
    spark_steel    : vec4f,   // metallic highlight\r
\r
    // Particle: Ember / Ash [3]\r
    ember_hot      : vec4f,   // bright hot center\r
\r
    // Particle: Angelic Beam [4-5]\r
    beam_center    : vec4f,   // golden-white core\r
    beam_edge      : vec4f,   // warm gold edge\r
\r
    // Particle: Glitter [6-7]\r
    glitter_warm   : vec4f,   // golden-white base\r
    glitter_cool   : vec4f,   // blue-white variation\r
\r
    // Cinder palette cycle [8-11]\r
    cinder_ember   : vec4f,   // deep orange-red\r
    cinder_gold    : vec4f,   // tarnished gold\r
    cinder_ash     : vec4f,   // cool grey\r
    cinder_vine    : vec4f,   // deep green\r
\r
    // Background smoke tones [12-14]\r
    smoke_cool     : vec4f,   // blue-grey\r
    smoke_warm     : vec4f,   // brown-amber\r
    smoke_moss     : vec4f,   // mossy mid-tone\r
\r
    // Kind-specific glow colors [15-22]\r
    kind_structural : vec4f,  // kind 0: structural UI border\r
    kind_error      : vec4f,  // kind 1: error log entry\r
    kind_warn       : vec4f,  // kind 2: warn log entry\r
    kind_info       : vec4f,  // kind 3: info log entry\r
    kind_debug      : vec4f,  // kind 4: debug/trace log entry\r
    kind_span       : vec4f,  // kind 5: span-highlighted\r
    kind_selected   : vec4f,  // kind 6: selected entry\r
    kind_panic      : vec4f,  // kind 7: panic entry\r
\r
    _pad            : vec4f,  // padding to 384 bytes\r
}\r
`,Cl=`// particle-shading.wgsl — Shared particle fragment shading functions\r
//\r
// Provides reusable colour computation for all four particle types:\r
//   - Metal sparks (cursor hover)\r
//   - Embers / ash (rising from borders)\r
//   - Angelic beams (double-pointed crystalline shards)\r
//   - Glitter (twinkling sparkles)\r
//\r
// Prerequisites:\r
//   - ThemePalette struct must be defined (from palette.wgsl)\r
//   - \`palette\` must be declared as a var<uniform> in the including shader\r
//\r
// These functions take plain parameters (UV, life, hue, time) so they\r
// work across both 2D overlay and 3D scene shader architectures.\r
\r
// ── Cinder palette cycling (palette-driven) ─────────────────────────────────\r
\r
fn cinder_rgb(t: f32) -> vec3f {\r
    let ember = palette.cinder_ember.rgb;\r
    let gold  = palette.cinder_gold.rgb;\r
    let ash   = palette.cinder_ash.rgb;\r
    let vine  = palette.cinder_vine.rgb;\r
    let s = fract(t);\r
    if s < 0.25 { return mix(ember, gold, s * 4.0); }\r
    if s < 0.50 { return mix(gold, ash, (s - 0.25) * 4.0); }\r
    if s < 0.75 { return mix(ash, vine, (s - 0.50) * 4.0); }\r
    return mix(vine, ember, (s - 0.75) * 4.0);\r
}\r
\r
// ── Kind-aware glow colors (palette-driven) ─────────────────────────────────\r
\r
fn kind_ember(kind: u32) -> vec3f {\r
    if kind == 1u { return palette.kind_error.rgb; }\r
    if kind == 2u { return palette.kind_warn.rgb; }\r
    if kind == 3u { return palette.kind_info.rgb; }\r
    if kind == 4u { return palette.kind_debug.rgb; }\r
    if kind == 5u { return palette.kind_span.rgb; }\r
    if kind == 6u { return palette.kind_selected.rgb; }\r
    if kind == 7u { return palette.kind_panic.rgb; }\r
    return palette.kind_structural.rgb;\r
}\r
\r
// ── Metal spark fragment ────────────────────────────────────────────────────\r
\r
fn shade_spark_fx(uv: vec2f, t_life: f32, hue: f32) -> vec4f {\r
    // Streak shape: tapered along length (Y), thin across width (X)\r
    let ax = abs(uv.x);              // cross-axis (thin)\r
    let ay = uv.y;                   // along-axis (long), -1 = tail, +1 = head\r
\r
    // Width falloff — very thin hot wire\r
    let width_mask = exp(-ax * ax * 12.0);\r
\r
    // Length taper — bright hot head, fading tail\r
    let head_t = (ay + 1.0) * 0.5;   // 0 at tail, 1 at head\r
    let len_mask = smoothstep(0.0, 0.15, head_t) * smoothstep(1.0, 0.7, head_t);\r
\r
    let bright = t_life * width_mask * len_mask * 2.2;\r
    if bright < 0.005 { discard; }\r
\r
    // Colour: white-hot core at head, orange-red ember at tail\r
    let hot_core = palette.spark_core.rgb;\r
    let steel    = palette.spark_steel.rgb;\r
    let ember    = cinder_rgb(hue);\r
    let core_t   = head_t * width_mask;                        // hot at head centre\r
    var spark_col = mix(ember * 1.5, hot_core * 1.2, core_t);\r
    spark_col = mix(spark_col, steel, (1.0 - head_t) * 0.4);  // steel tint at tail\r
\r
    let col = spark_col * bright;\r
    let a   = min(bright, 1.0);\r
    return vec4f(col * a, a);\r
}\r
\r
// ── Ember / ash fragment ────────────────────────────────────────────────────\r
\r
fn shade_ember_fx(uv: vec2f, t_life: f32, hue: f32) -> vec4f {\r
    let d = length(uv);\r
    let glow = exp(-d * d * 2.5);\r
    let bright = t_life * glow;\r
\r
    if bright < 0.005 { discard; }\r
\r
    let ember_col = cinder_rgb(hue);\r
    let hot = palette.ember_hot.rgb;\r
    let base = mix(ember_col * 1.5, hot, smoothstep(0.5, 0.0, d));\r
\r
    let col = base * bright;\r
    let a   = min(bright * 0.7, 1.0);\r
    return vec4f(col * a, a);\r
}\r
\r
// ── Angelic beam (double-pointed crystalline shard) ─────────────────────────\r
\r
fn shade_beam_fx(uv: vec2f, t_life: f32, aa: f32) -> vec4f {\r
    let dx = uv.x;\r
    let dy = uv.y;\r
\r
    let t   = (dy + 1.0) * 0.5;\r
    let mid = abs(t - 0.5) * 2.0;\r
    let shard_width = (1.0 - mid * mid) * 0.18;\r
\r
    let hx = abs(dx) / max(shard_width, 0.005);\r
    let edge = smoothstep(1.0 + aa, 1.0 - aa, hx);\r
\r
    let core = exp(-dx * dx / max(shard_width * shard_width * 0.1, 0.0005));\r
    let h_falloff = edge * (0.25 + 0.75 * core);\r
\r
    let v_fade = (1.0 - mid * mid);\r
    let bright = h_falloff * v_fade * t_life * 1.6;\r
\r
    if bright < 0.003 { discard; }\r
\r
    let center_col = palette.beam_center.rgb;\r
    let edge_col   = palette.beam_edge.rgb;\r
    var ray_col = mix(edge_col, center_col, core * 0.95);\r
\r
    let col = ray_col * bright * 0.6;\r
    let a   = min(bright * 0.4, 1.0);\r
    return vec4f(col * a, a);\r
}\r
\r
// ── Glitter (pixel-size twinkle) ────────────────────────────────────────────\r
\r
fn shade_glitter_fx(uv: vec2f, t_life: f32, hue: f32, time: f32, id: f32) -> vec4f {\r
    let d = length(uv);\r
    let dot_mask = smoothstep(1.0, 0.15, d);\r
\r
    let twinkle = 0.6 + 0.4 * sin(time * 12.0 + id * 7.3);\r
    let bright = t_life * dot_mask * twinkle * 1.4;\r
\r
    if bright < 0.008 { discard; }\r
\r
    let warm = palette.glitter_warm.rgb;\r
    let cool = palette.glitter_cool.rgb;\r
    let phase = fract(hue * 3.7 + time * 0.5);\r
    let glitter_col = mix(warm, cool, smoothstep(0.3, 0.7, phase));\r
\r
    let col = glitter_col * bright;\r
    let a   = min(bright * 0.9, 1.0);\r
    return vec4f(col * a, a);\r
}\r
`,Tl=`// types.wgsl — shared struct definitions for all shader modules\r
//\r
// Concatenated after palette.wgsl and before noise.wgsl / pipeline files.\r
// Declares the palette uniform binding (shared across ALL pipelines).\r
\r
// ---- palette uniform (binding 3, shared by compute + render) ----------------\r
@group(0) @binding(3) var<uniform> palette : ThemePalette;\r
\r
// ---- particle kind constants ------------------------------------------------\r
const PK_METAL_SPARK : f32 = 0.0;\r
const PK_EMBER       : f32 = 1.0;\r
const PK_GOD_RAY     : f32 = 2.0;\r
const PK_GLITTER     : f32 = 3.0;\r
\r
// Screen-space flag for kind_view packing\r
// kind_view = kind + view_id * 8 + is_screen_space * 64\r
const PK_SCREEN_SPACE : f32 = 64.0;\r
\r
// ---- element kind constants for effect preview containers -------------------\r
const KIND_FX_SPARK   : f32 = 8.0;\r
const KIND_FX_EMBER   : f32 = 9.0;\r
const KIND_FX_BEAM    : f32 = 10.0;\r
const KIND_FX_GLITTER : f32 = 11.0;\r
\r
// ---- index ranges per particle type (must match TypeScript) -----------------\r
const SPARK_END   : u32 = 96u;\r
const EMBER_END   : u32 = 288u;\r
const RAY_END     : u32 = 544u;\r
const GLITTER_END : u32 = 640u;\r
\r
// ---- uniforms (352 bytes = 52 scalars + 4 camera floats + 2 × mat4x4<f32>) ---------------------\r
struct Uniforms {\r
    time             : f32,\r
    width            : f32,\r
    height           : f32,\r
    element_count    : f32,\r
    mouse_x          : f32,\r
    mouse_y          : f32,\r
    delta_time       : f32,\r
    hover_elem       : f32,\r
    hover_start_time : f32,\r
    selected_elem    : f32,    // index of selected element (-1 if none)\r
    crt_scanlines_h  : f32,    // horizontal scanlines (+grid) intensity 0.0–1.0\r
    crt_scanlines_v  : f32,    // vertical scanlines (+grid) intensity 0.0–1.0\r
    crt_edge_shadow  : f32,    // edge/border shadow intensity 0.0–1.0\r
    crt_flicker      : f32,    // torch flicker intensity 0.0–1.0\r
    crt_line_width   : f32,    // CRT scanline width/thickness 0.0–1.0 (0 = thin, 1 = wide)\r
    smoke_intensity  : f32,    // background smoke brightness 0.0–1.0\r
    smoke_speed      : f32,    // smoke animation speed multiplier 0.0–5.0\r
    smoke_warm_scale : f32,    // UV scale for warm smoke layers 0.0–2.0\r
    smoke_cool_scale : f32,    // UV scale for cool wisp layer 0.0–2.0\r
    smoke_moss_scale : f32,    // UV scale for moss-tone blending 0.0–2.0\r
    grain_intensity  : f32,    // grain brightness/amplitude 0.0–1.0\r
    grain_coarseness : f32,    // grain frequency scale 0.0–1.0\r
    grain_size       : f32,    // grain pixel block size (1–8 px, normalized 0.0–1.0)\r
    vignette_str     : f32,    // edge vignette darkening 0.0–1.0\r
    underglow_str    : f32,    // warm bottom underglow 0.0–1.0\r
    spark_speed      : f32,    // metal spark speed multiplier 0.0–3.0\r
    ember_speed      : f32,    // ember/ash speed multiplier 0.0–3.0\r
    beam_speed       : f32,    // angelic beam speed multiplier 0.0–3.0\r
    glitter_speed    : f32,    // glitter speed multiplier 0.0–3.0\r
    beam_height      : f32,    // beam quad height multiplier (default 35.0)\r
    beam_count       : f32,    // max active beams (0 = all slots)\r
    beam_drift       : f32,    // beam upward drift distance multiplier 0.0–3.0\r
    scroll_dx        : f32,    // scroll delta X this frame (pixels, screen space)\r
    scroll_dy        : f32,    // scroll delta Y this frame (pixels, screen space)\r
    spark_count      : f32,    // max active sparks (fraction of slots, 0–2)\r
    spark_size       : f32,    // spark size multiplier 0.0–3.0\r
    ember_count      : f32,    // max active embers (fraction of slots, 0–2)\r
    ember_size       : f32,    // ember size multiplier 0.0–3.0\r
    glitter_count    : f32,    // max active glitter (fraction of slots, 0–2)\r
    glitter_size     : f32,    // glitter size multiplier 0.0–3.0\r
    cinder_size      : f32,    // cinder border glow size multiplier 0.0–3.0\r
    ref_depth        : f32,    // reference NDC depth for unprojection (0.0 for 2D views)\r
    world_scale      : f32,    // world units per screen pixel (1.0 for 2D views)\r
    vp_x             : f32,    // particle viewport left (canvas pixels)\r
    vp_y             : f32,    // particle viewport top (canvas pixels)\r
    vp_w             : f32,    // particle viewport width (pixels)\r
    vp_h             : f32,    // particle viewport height (pixels)\r
    current_view     : f32,    // active view/tab ID (0=logs,1=stats,2=code,3=debug,4=scene3d,5=hypergraph,6=settings)\r
    // ---- CRT scanline color (4 floats for alignment) ----\r
    crt_color_r      : f32,    // CRT scanline tint red 0.0–1.0\r
    crt_color_g      : f32,    // CRT scanline tint green 0.0–1.0\r
    crt_color_b      : f32,    // CRT scanline tint blue 0.0–1.0\r
    _crt_pad         : f32,    // padding for mat4 alignment\r
    // ---- camera position for 3D skybox (4 floats for mat4 alignment) ----\r
    camera_pos_x     : f32,    // camera world-space X position\r
    camera_pos_y     : f32,    // camera world-space Y position\r
    camera_pos_z     : f32,    // camera world-space Z position\r
    _cam_pad         : f32,    // padding for mat4 alignment\r
    // ---- projection matrices (column-major, 16 f32 each) ----\r
    particle_vp      : mat4x4<f32>,   // world → clip (ortho for 2D, camera VP for 3D)\r
    particle_inv_vp  : mat4x4<f32>,   // clip → world (for unprojecting spawn positions)\r
}\r
\r
// ---- DOM element rectangle --------------------------------------------------\r
struct ElemRect {\r
    rect  : vec4f,   // x, y, w, h\r
    hue   : f32,\r
    kind  : f32,\r
    depth : f32,     // NDC depth (0 = flat/2D; >0 = 3D-positioned element)\r
    _p2   : f32,\r
}\r
\r
// ---- particle state (48 bytes) -----------------------------------------------\r
// vec3f has alignment 16 in storage buffers, so life/max_life fill the\r
// padding slots after each vec3f → total 48 bytes with no waste.\r
struct Particle {\r
    pos       : vec3f,      // world-space position (screen pixels for 2D, world units for 3D)\r
    life      : f32,\r
    vel       : vec3f,      // world-space velocity\r
    max_life  : f32,\r
    hue       : f32,\r
    size      : f32,        // visual size in screen pixels\r
    kind_view : f32,        // packed: kind + view_id * 8 (kind 0-3, view_id 0-7)\r
    spawn_t   : f32,        // absolute time when particle was spawned\r
}\r
`,Al=`// noise.wgsl — procedural noise, RNG helpers\r
//\r
// Shared utility functions concatenated between types.wgsl and the\r
// pipeline-specific shader file.  No bindings declared here.\r
//\r
// Colour helpers (cinder_rgb, kind_ember) have moved to\r
// effects/particle-shading.wgsl so they can be shared with HypergraphView.\r
\r
// ---- hash / noise -----------------------------------------------------------\r
\r
// Integer-lattice hash — converts floor()ed coordinates to integers first,\r
// then mixes with a standard uint hash.  Avoids the bitcast-on-float\r
// correlation artefacts that caused visible checker patterns.\r
fn hash2(p: vec2f) -> f32 {\r
    let ix = u32(i32(p.x) + 32768);\r
    let iy = u32(i32(p.y) + 32768);\r
    var n = ix + iy * 0x45d9f3bu;\r
    n = (n ^ (n >> 16u)) * 0x45d9f3bu;\r
    n = (n ^ (n >> 16u)) * 0x45d9f3bu;\r
    n = n ^ (n >> 16u);\r
    return f32(n) / 4294967295.0;\r
}\r
\r
fn smooth_noise(p: vec2f) -> f32 {\r
    let i  = floor(p);\r
    let f  = fract(p);\r
    let uv = f * f * (3.0 - 2.0 * f);\r
    return mix(\r
        mix(hash2(i),                   hash2(i + vec2f(1.0, 0.0)), uv.x),\r
        mix(hash2(i + vec2f(0.0, 1.0)), hash2(i + vec2f(1.0, 1.0)), uv.x),\r
        uv.y\r
    );\r
}\r
\r
fn fbm(p_in: vec2f) -> f32 {\r
    var val  = 0.0;\r
    var amp  = 0.5;\r
    var freq = 1.0;\r
    var p    = p_in;\r
    for (var i = 0; i < 4; i++) {\r
        val  += amp * smooth_noise(p * freq);\r
        amp  *= 0.5;\r
        freq *= 2.0;\r
    }\r
    return val;\r
}\r
\r
// ---- pseudorandom number generator (PCG) ------------------------------------\r
\r
fn pcg_hash(input: u32) -> u32 {\r
    var state = input * 747796405u + 2891336453u;\r
    let word  = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;\r
    return (word >> 22u) ^ word;\r
}\r
\r
fn rand_f(seed: u32) -> f32 {\r
    return f32(pcg_hash(seed)) / 4294967295.0;\r
}\r
\r
fn rand2(seed: u32) -> vec2f {\r
    return vec2f(rand_f(seed), rand_f(seed + 1u));\r
}\r
`,Pl=`// background.wgsl — fullscreen scene rendering (Dark Souls cinder theme)\r
//\r
// Concatenated after: types.wgsl + noise.wgsl\r
// Contains: fullscreen quad VS, scene element rendering, smoky background,\r
//           CRT post-processing, fragment entry point.\r
//\r
// Canvas sits BEHIND HTML (z-index -1, opaque).  HTML backgrounds are\r
// transparent so the dark texture shows through.\r
\r
// ---- bindings (render pass — read-only) -------------------------------------\r
\r
@group(0) @binding(0) var<uniform>       u         : Uniforms;\r
@group(0) @binding(1) var<storage, read> elems     : array<ElemRect>;\r
@group(0) @binding(2) var<storage, read> particles : array<Particle>;\r
\r
// ---- fullscreen quad vertex shader ------------------------------------------\r
\r
@vertex\r
fn vs_main(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f {\r
    var pos = array<vec2f, 6>(\r
        vec2f(-1.0, -1.0), vec2f( 1.0, -1.0), vec2f(-1.0,  1.0),\r
        vec2f( 1.0, -1.0), vec2f( 1.0,  1.0), vec2f(-1.0,  1.0),\r
    );\r
    return vec4f(pos[vi], 0.0, 1.0);\r
}\r
\r
// ---- edge helpers -----------------------------------------------------------\r
\r
fn edge_dist(px: vec2f, ex: f32, ey: f32, ew: f32, eh: f32) -> f32 {\r
    let dx = min(px.x - ex, ex + ew - px.x);\r
    let dy = min(px.y - ey, ey + eh - px.y);\r
    return min(dx, dy);\r
}\r
\r
fn perimeter_t(px: vec2f, ex: f32, ey: f32, ew: f32, eh: f32) -> f32 {\r
    let perim = 2.0 * (ew + eh);\r
    let lx = px.x - ex;\r
    let ly = px.y - ey;\r
    if ly < lx && ly < (eh - ly) && ly < (ew - lx) { return lx / perim; }\r
    if (ew - lx) < ly && (ew - lx) < (eh - ly)     { return (ew + ly) / perim; }\r
    if (eh - ly) < lx && (eh - ly) < (ew - lx)      { return (ew + eh + (ew - lx)) / perim; }\r
    return (2.0 * ew + eh + (eh - ly)) / perim;\r
}\r
\r
// ---- rounded-rect SDF ------------------------------------------------------\r
\r
fn rounded_rect_sdf(px: vec2f, ex: f32, ey: f32, ew: f32, eh: f32, radius: f32) -> f32 {\r
    let center = vec2f(ex + ew * 0.5, ey + eh * 0.5);\r
    let half   = vec2f(ew * 0.5, eh * 0.5);\r
    let rel    = abs(px - center) - half + vec2f(radius);\r
    return length(max(rel, vec2f(0.0))) + min(max(rel.x, rel.y), 0.0) - radius;\r
}\r
\r
// ---- hover proximity --------------------------------------------------------\r
\r
fn hover_proximity(ex: f32, ey: f32, ew: f32, eh: f32) -> f32 {\r
    let mouse  = vec2f(u.mouse_x, u.mouse_y);\r
    let center = vec2f(ex + ew * 0.5, ey + eh * 0.5);\r
    let dist   = length(mouse - center);\r
    return smoothstep(max(ew, eh) * 0.8, 0.0, dist);\r
}\r
\r
// ---- graph node (kind 8) — dark stone / iron slab ---------------------------\r
\r
fn graph_node(px: vec2f, ex: f32, ey: f32, ew: f32, eh: f32,\r
              hue: f32, node_type: f32, t: f32, prox: f32) -> vec4f {\r
    let radius = 6.0;\r
    let sdf = rounded_rect_sdf(px, ex, ey, ew, eh, radius);\r
    if sdf > 4.0 { return vec4f(0.0); }\r
\r
    let body_mask = smoothstep(0.5, -0.5, sdf);\r
    let nx = (px.x - ex) / ew;\r
    let ny = (px.y - ey) / eh;\r
\r
    // Stone material: dark grey with subtle noise grain\r
    let stone_noise = smooth_noise(px * 0.15) * 0.08;\r
    let stone_base  = vec3f(0.16, 0.15, 0.14) + vec3f(stone_noise);\r
    let stone_top   = stone_base + vec3f(0.06, 0.05, 0.04);\r
    let stone_bot   = stone_base * 0.7;\r
    var fill_rgb    = mix(stone_top, stone_bot, ny);\r
\r
    // Subtle vine veins\r
    let vine_n = smooth_noise(px * 0.08 + vec2f(3.7, 1.2));\r
    let vine_streak = smoothstep(0.48, 0.52, vine_n) * 0.3;\r
    fill_rgb = mix(fill_rgb, vec3f(0.12, 0.30, 0.10), vine_streak);\r
\r
    // Mouse-based torch lighting\r
    let mouse  = vec2f(u.mouse_x, u.mouse_y);\r
    let center = vec2f(ex + ew * 0.5, ey + eh * 0.5);\r
    let to_mouse = normalize(mouse - center + vec2f(0.001));\r
    let normal   = vec2f((nx - 0.5) * 0.3, (ny - 0.5) * 0.5);\r
    let diffuse  = max(0.0, dot(normalize(normal + vec2f(0.0, -0.3)), to_mouse));\r
    let torch_col = vec3f(0.9, 0.5, 0.15);\r
    let lb = prox * 0.7;\r
    fill_rgb = fill_rgb + torch_col * diffuse * (0.10 + lb * 0.4);\r
\r
    // Specular — dull metal sheen\r
    let spec_pos = vec2f(nx - 0.5, ny - 0.3);\r
    let spec = pow(max(0.0, 1.0 - length(spec_pos - to_mouse * 0.2) * 2.5), 12.0);\r
    fill_rgb = fill_rgb + vec3f(0.6, 0.5, 0.3) * spec * (0.05 + lb * 0.15);\r
\r
    // Chiselled top edge gleam\r
    fill_rgb = fill_rgb + vec3f(0.5, 0.45, 0.35) * smoothstep(0.12, 0.0, ny) * 0.15;\r
    fill_rgb = fill_rgb * (1.0 - smoothstep(0.88, 1.0, ny) * 0.2);\r
\r
    // Node type accent — vine (enter) or blood (exit)\r
    let ntype = u32(node_type);\r
    if ntype == 1u {\r
        let bar = smoothstep(3.0, 0.0, px.x - ex) * smoothstep(-1.0, 0.0, sdf);\r
        fill_rgb = mix(fill_rgb, vec3f(0.15, 0.40, 0.10), bar * 0.7);\r
    } else if ntype == 2u {\r
        let bar = smoothstep(3.0, 0.0, (ex + ew) - px.x) * smoothstep(-1.0, 0.0, sdf);\r
        fill_rgb = mix(fill_rgb, vec3f(0.55, 0.08, 0.05), bar * 0.7);\r
    }\r
\r
    // Iron border with ember glow on hover\r
    let border_band = smoothstep(-1.5, 0.0, sdf) * smoothstep(2.0, 0.5, sdf);\r
    let ember_pulse = 0.5 + 0.5 * sin(t * 2.0 + nx * 6.28);\r
    let border_rgb  = mix(vec3f(0.10, 0.09, 0.08), vec3f(0.7, 0.25, 0.05), prox * ember_pulse * 0.6);\r
    fill_rgb = fill_rgb + border_rgb * border_band * 0.5;\r
\r
    // Deep shadow beneath\r
    let outer       = smoothstep(4.0, 0.0, sdf) * (1.0 - body_mask);\r
    let outer_alpha = outer * 0.15;\r
    let shadow_sdf  = rounded_rect_sdf(px - vec2f(-1.0, 4.0 + prox * 3.0), ex, ey, ew, eh, radius);\r
    let shadow_mask = smoothstep(0.0, 10.0, -shadow_sdf) * (1.0 - body_mask);\r
    let shadow_alpha = shadow_mask * 0.35 * (0.6 + prox * 0.4);\r
\r
    let body_alpha = body_mask * 0.80;\r
    let total_rgb  = fill_rgb * body_alpha + vec3f(0.08, 0.06, 0.04) * outer_alpha;\r
    let total_a    = body_alpha + outer_alpha + shadow_alpha;\r
\r
    return vec4f(total_rgb, total_a);\r
}\r
\r
// ---- GPU cursor rendering ---------------------------------------------------\r
\r
// Signed distance to a line segment (a → b), returns distance from point p\r
fn sd_segment(p: vec2f, a: vec2f, b: vec2f) -> f32 {\r
    let pa = p - a;\r
    let ba = b - a;\r
    let h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);\r
    return length(pa - ba * h);\r
}\r
\r
// Arrow cursor SDF — proper pointer shape with shaft notch\r
fn cursor_arrow_sdf(p: vec2f) -> f32 {\r
    // 7-vertex polygon:  tip → right diagonal → notch-in → shaft-bottom-right\r
    //                   → shaft-bottom-left → notch-left → left edge\r
    let v0 = vec2f(0.0,  0.0);    // tip\r
    let v1 = vec2f(16.0, 16.8);   // right diagonal end\r
    let v2 = vec2f(6.8,  14.0);   // notch inward\r
    let v3 = vec2f(11.0, 24.0);   // shaft bottom-right\r
    let v4 = vec2f(5.5,  24.0);   // shaft bottom-left\r
    let v5 = vec2f(4.0,  16.0);   // notch left\r
    let v6 = vec2f(0.0,  22.0);   // left edge bottom\r
\r
    // Winding-number polygon SDF (7 edges)\r
    var d = dot(p - v0, p - v0);\r
    var s = 1.0;\r
\r
    // Helper: per-edge distance + winding update\r
    // Edge v0→v6\r
    var e = v6 - v0; var w = p - v0;\r
    var b2 = w - e * clamp(dot(w, e) / dot(e, e), 0.0, 1.0);\r
    d = min(d, dot(b2, b2));\r
    var c0 = w.y >= 0.0; var c1 = e.y * w.x > e.x * w.y; var c2 = w.y >= e.y;\r
    if ((c0 && c1 && !c2) || (!c0 && !c1 && c2)) { s *= -1.0; }\r
\r
    // Edge v6→v5\r
    e = v5 - v6; w = p - v6;\r
    b2 = w - e * clamp(dot(w, e) / dot(e, e), 0.0, 1.0);\r
    d = min(d, dot(b2, b2));\r
    c0 = w.y >= 0.0; c1 = e.y * w.x > e.x * w.y; c2 = w.y >= e.y;\r
    if ((c0 && c1 && !c2) || (!c0 && !c1 && c2)) { s *= -1.0; }\r
\r
    // Edge v5→v4\r
    e = v4 - v5; w = p - v5;\r
    b2 = w - e * clamp(dot(w, e) / dot(e, e), 0.0, 1.0);\r
    d = min(d, dot(b2, b2));\r
    c0 = w.y >= 0.0; c1 = e.y * w.x > e.x * w.y; c2 = w.y >= e.y;\r
    if ((c0 && c1 && !c2) || (!c0 && !c1 && c2)) { s *= -1.0; }\r
\r
    // Edge v4→v3\r
    e = v3 - v4; w = p - v4;\r
    b2 = w - e * clamp(dot(w, e) / dot(e, e), 0.0, 1.0);\r
    d = min(d, dot(b2, b2));\r
    c0 = w.y >= 0.0; c1 = e.y * w.x > e.x * w.y; c2 = w.y >= e.y;\r
    if ((c0 && c1 && !c2) || (!c0 && !c1 && c2)) { s *= -1.0; }\r
\r
    // Edge v3→v2\r
    e = v2 - v3; w = p - v3;\r
    b2 = w - e * clamp(dot(w, e) / dot(e, e), 0.0, 1.0);\r
    d = min(d, dot(b2, b2));\r
    c0 = w.y >= 0.0; c1 = e.y * w.x > e.x * w.y; c2 = w.y >= e.y;\r
    if ((c0 && c1 && !c2) || (!c0 && !c1 && c2)) { s *= -1.0; }\r
\r
    // Edge v2→v1\r
    e = v1 - v2; w = p - v2;\r
    b2 = w - e * clamp(dot(w, e) / dot(e, e), 0.0, 1.0);\r
    d = min(d, dot(b2, b2));\r
    c0 = w.y >= 0.0; c1 = e.y * w.x > e.x * w.y; c2 = w.y >= e.y;\r
    if ((c0 && c1 && !c2) || (!c0 && !c1 && c2)) { s *= -1.0; }\r
\r
    // Edge v1→v0\r
    e = v0 - v1; w = p - v1;\r
    b2 = w - e * clamp(dot(w, e) / dot(e, e), 0.0, 1.0);\r
    d = min(d, dot(b2, b2));\r
    c0 = w.y >= 0.0; c1 = e.y * w.x > e.x * w.y; c2 = w.y >= e.y;\r
    if ((c0 && c1 && !c2) || (!c0 && !c1 && c2)) { s *= -1.0; }\r
\r
    return s * sqrt(d);\r
}\r
\r
// ---- procedural texture helpers for cursors ---------------------------------\r
\r
// Voronoi cell noise — returns (cell_distance, cell_id) for metallic grain\r
fn voronoi(p: vec2f) -> vec2f {\r
    let ip = floor(p);\r
    let fp = fract(p);\r
    var min_d = 8.0;\r
    var cell_id = 0.0;\r
    for (var j = -1; j <= 1; j++) {\r
        for (var i = -1; i <= 1; i++) {\r
            let neighbor = vec2f(f32(i), f32(j));\r
            let point = vec2f(hash2(ip + neighbor + vec2f(0.0, 0.0)),\r
                              hash2(ip + neighbor + vec2f(17.3, 31.7)));\r
            let diff = neighbor + point - fp;\r
            let dist = dot(diff, diff);\r
            if (dist < min_d) {\r
                min_d = dist;\r
                cell_id = hash2(ip + neighbor + vec2f(53.1, 97.3));\r
            }\r
        }\r
    }\r
    return vec2f(sqrt(min_d), cell_id);\r
}\r
\r
// Medium-detail FBM for cursor texturing (3 octaves, rotated)\r
fn fbm3(p_in: vec2f) -> f32 {\r
    var val  = 0.0;\r
    var amp  = 0.5;\r
    var freq = 1.0;\r
    var p    = p_in;\r
    for (var i = 0; i < 3; i++) {\r
        val  += amp * smooth_noise(p * freq);\r
        amp  *= 0.5;\r
        freq *= 2.1;\r
        p = vec2f(p.x * 0.866 - p.y * 0.5, p.x * 0.5 + p.y * 0.866);\r
    }\r
    return val;\r
}\r
\r
// ---- Metal cursor — forged dark iron with hammer marks, rust, patina --------\r
\r
fn cursor_metal(px: vec2f, mouse: vec2f, t: f32) -> vec4f {\r
    let local = px - mouse;\r
\r
    // Expanded bounding box for shadow\r
    if (local.x < -4.0 || local.x > 22.0 || local.y < -4.0 || local.y > 30.0) {\r
        return vec4f(0.0);\r
    }\r
\r
    let sdf = cursor_arrow_sdf(local);\r
\r
    // Anti-aliased edge (sub-pixel smooth)\r
    let aa = 1.0 - smoothstep(-1.2, 0.6, sdf);\r
    if (aa < 0.001) { return vec4f(0.0); }\r
\r
    let uv = local / vec2f(16.0, 24.0);\r
\r
    // ── Surface normal with height-field detail ──\r
    let dome = vec2f((uv.x - 0.4) * 0.5, (uv.y - 0.45) * 0.3);\r
\r
    // Hammer-strike dents — single pass\r
    let dent_h = smooth_noise(local * 0.35 + vec2f(42.0, 17.0)) * 0.15;\r
\r
    // Forged grain — directional, precomputed rotation\r
    let grain_p = vec2f(\r
        local.x * 0.9888 - local.y * 0.1494,\r
        local.x * 0.1494 + local.y * 0.9888\r
    );\r
    let grain = smooth_noise(vec2f(grain_p.x * 6.0, grain_p.y * 0.8 + 200.0)) * 0.06;\r
\r
    // Fine micro-scratches (single anisotropic pass)\r
    let scratch1 = smooth_noise(vec2f(local.x * 12.0, local.y * 1.5 + 500.0)) * 0.025;\r
\r
    // Simplified normal from height field\r
    let eps = 0.5;\r
    let h_center = dent_h + grain + scratch1;\r
    let h_right  = smooth_noise((local + vec2f(eps, 0.0)) * 0.35 + vec2f(42.0, 17.0)) * 0.09\r
                 + smooth_noise(vec2f((grain_p.x + eps) * 6.0, grain_p.y * 0.8 + 200.0)) * 0.06;\r
    let h_up     = smooth_noise((local + vec2f(0.0, eps)) * 0.35 + vec2f(42.0, 17.0)) * 0.09\r
                 + smooth_noise(vec2f(grain_p.x * 6.0, (grain_p.y + eps) * 0.8 + 200.0)) * 0.06;\r
\r
    let normal = normalize(vec3f(\r
        dome.x + (h_center - h_right) * 3.0,\r
        dome.y + (h_center - h_up) * 3.0,\r
        1.0\r
    ));\r
\r
    // ── Material: dark forged iron with rust + patina combined ──\r
    let base_iron = vec3f(0.32, 0.30, 0.28);\r
\r
    // Single noise-based grain variation (replaces voronoi)\r
    let crystal_var = smooth_noise(local * 0.8 + vec2f(73.0, 11.0));\r
    let crystal_tint = mix(vec3f(0.30, 0.28, 0.26), vec3f(0.36, 0.34, 0.30), crystal_var);\r
\r
    // Rust + patina in one fbm3 pass\r
    let weathering = fbm3(local * 0.3 + vec2f(15.0, 27.0));\r
    let rust_mask = smoothstep(0.35, 0.65, weathering);\r
    let rust_col = mix(vec3f(0.35, 0.18, 0.08), vec3f(0.50, 0.25, 0.10), weathering);\r
    let rust_amount = rust_mask * smoothstep(0.3, 0.7, dent_h / 0.15) * 0.45;\r
    let patina_amount = (1.0 - rust_mask) * 0.2 * (1.0 - rust_amount * 2.0);\r
\r
    // Combine base material\r
    var metal_col = mix(crystal_tint, base_iron, grain * 8.0);\r
    metal_col = mix(metal_col, rust_col, rust_amount);\r
    metal_col = mix(metal_col, vec3f(0.15, 0.18, 0.25), patina_amount);\r
\r
    // Brushed highlight streaks\r
    let brush_streak = pow(smooth_noise(vec2f(grain_p.x * 15.0, grain_p.y * 0.4 + 400.0)), 3.0) * 0.12;\r
    metal_col = metal_col + vec3f(brush_streak);\r
\r
    // ── Lighting: PBR-ish with two lights ──\r
    let view = vec3f(0.0, 0.0, 1.0);\r
\r
    // Key light: warm upper-left\r
    let light1 = normalize(vec3f(-0.5, -0.8, 1.0));\r
    let diff1 = max(dot(normal, light1), 0.0);\r
    let half1 = normalize(light1 + view);\r
    // Roughness varies: rust is rough, polished metal is sharp\r
    let roughness = mix(0.3, 0.9, rust_amount + patina_amount * 0.5);\r
    let spec_power = mix(80.0, 8.0, roughness);\r
    let spec1 = pow(max(dot(normal, half1), 0.0), spec_power) * mix(1.2, 0.15, roughness);\r
\r
    // Fill light: cool from lower-right\r
    let light2 = normalize(vec3f(0.6, 0.3, 0.8));\r
    let diff2 = max(dot(normal, light2), 0.0) * 0.3;\r
    let half2 = normalize(light2 + view);\r
    let spec2 = pow(max(dot(normal, half2), 0.0), spec_power * 0.5) * mix(0.4, 0.05, roughness);\r
\r
    // Ambient occlusion from SDF (edges darker)\r
    let ao = smoothstep(0.0, 5.0, -sdf) * 0.3 + 0.7;\r
\r
    // Fresnel rim\r
    let fresnel = pow(1.0 - max(dot(normal, view), 0.0), 4.0);\r
    let rim_col = vec3f(0.4, 0.42, 0.5) * fresnel * 0.25;\r
\r
    let ambient = vec3f(0.06, 0.055, 0.05);\r
    var col = metal_col * (ambient + (diff1 * vec3f(1.0, 0.95, 0.85) + diff2 * vec3f(0.7, 0.8, 1.0)) * ao)\r
            + vec3f(spec1) * vec3f(1.0, 0.95, 0.88) * (1.0 - rust_amount)\r
            + vec3f(spec2) * vec3f(0.7, 0.8, 1.0) * (1.0 - rust_amount)\r
            + rim_col;\r
\r
    // Subtle heat shimmer near the tip (this IS a cinder theme)\r
    let tip_glow = exp(-length(local) * 0.15) * 0.08;\r
    col = col + vec3f(tip_glow * 0.8, tip_glow * 0.3, tip_glow * 0.05);\r
\r
    // ── Dark forged border (bevelled edge) ──\r
    let bevel = smoothstep(0.5, -1.5, sdf);\r
    let bevel_light = max(dot(normalize(vec3f(-sign(sdf) * 0.5, -sign(sdf) * 0.3, 1.0)), light1), 0.0);\r
    col = mix(vec3f(0.05, 0.04, 0.03), col, bevel);\r
    col = col + vec3f(bevel_light * 0.1) * (1.0 - bevel);\r
\r
    // ── Drop shadow ──\r
    let shadow_sdf = cursor_arrow_sdf(local - vec2f(2.0, 2.5));\r
    let shadow = (1.0 - smoothstep(-3.0, 2.0, shadow_sdf)) * 0.45;\r
\r
    let shadow_result = vec4f(0.0, 0.0, 0.0, shadow);\r
    let cursor_result = vec4f(col, aa);\r
    let out_a = cursor_result.a + shadow_result.a * (1.0 - cursor_result.a);\r
    let out_rgb = (cursor_result.rgb * cursor_result.a + shadow_result.rgb * shadow_result.a * (1.0 - cursor_result.a)) / max(out_a, 0.001);\r
    return vec4f(out_rgb, out_a);\r
}\r
\r
// ---- Glass cursor — crystal with internal fractures, caustics, dispersion ---\r
\r
fn cursor_glass(px: vec2f, mouse: vec2f, t: f32) -> vec4f {\r
    let local = px - mouse;\r
\r
    if (local.x < -6.0 || local.x > 24.0 || local.y < -6.0 || local.y > 34.0) {\r
        return vec4f(0.0);\r
    }\r
\r
    let sdf = cursor_arrow_sdf(local);\r
\r
    let aa = 1.0 - smoothstep(-1.2, 0.6, sdf);\r
    if (aa < 0.001) { return vec4f(0.0); }\r
\r
    let uv = local / vec2f(16.0, 24.0);\r
\r
    // ── Glass surface normals: thick convex lens ──\r
    let dome_strength = 0.7;\r
    let dome_x = (uv.x - 0.4) * dome_strength;\r
    let dome_y = (uv.y - 0.45) * dome_strength * 0.7;\r
\r
    // Wavy imperfections in glass surface (2 layers instead of 3)\r
    let wave1 = smooth_noise(local * 0.6 + vec2f(t * 0.08, 7.0)) * 0.14;\r
    let wave2 = smooth_noise(local * 1.3 + vec2f(13.0, t * 0.06)) * 0.07;\r
\r
    let eps = 0.4;\r
    let h_c = wave1 + wave2;\r
    let h_r = smooth_noise((local + vec2f(eps, 0.0)) * 0.6 + vec2f(t * 0.08, 7.0)) * 0.14\r
            + smooth_noise((local + vec2f(eps, 0.0)) * 1.3 + vec2f(13.0, t * 0.06)) * 0.07;\r
    let h_u = smooth_noise((local + vec2f(0.0, eps)) * 0.6 + vec2f(t * 0.08, 7.0)) * 0.14\r
            + smooth_noise((local + vec2f(0.0, eps)) * 1.3 + vec2f(13.0, t * 0.06)) * 0.07;\r
\r
    let normal = normalize(vec3f(\r
        dome_x + (h_c - h_r) * 2.5,\r
        dome_y + (h_c - h_u) * 2.5,\r
        1.0\r
    ));\r
\r
    // ── Internal structure: fractures, bubbles (single voronoi pass) ──\r
    let fracture_vor = voronoi(local * 0.5 + vec2f(100.0, 200.0));\r
    let fracture_lines = smoothstep(0.12, 0.08, fracture_vor.x) * 0.3;\r
\r
    // Use hash for bubbles instead of second voronoi\r
    let bubble_h = smooth_noise(local * 1.5 + vec2f(300.0, 400.0));\r
    let bubbles = smoothstep(0.85, 0.95, bubble_h) * 0.5;\r
\r
    // Simplified internal caustic (single smooth_noise instead of fbm3)\r
    let internal_caustic = smooth_noise(local * 0.15 + normal.xy * 3.0 + vec2f(t * 0.12, -t * 0.08));\r
\r
    // ── Refraction: chromatic aberration (R/G/B refract differently) ──\r
    let refract_base = 10.0;\r
    let r_offset = normal.xy * (refract_base * 1.05);\r
    let g_offset = normal.xy * (refract_base * 1.00);\r
    let b_offset = normal.xy * (refract_base * 0.95);\r
\r
    // Sample "background" at three offset positions (simulated via noise)\r
    let bg_scale = 0.008;\r
    let bg_r = smooth_noise((px + r_offset) * bg_scale + vec2f(t * 0.03, 0.0)) * 0.12 + 0.04;\r
    let bg_g = smooth_noise((px + g_offset) * bg_scale + vec2f(0.0, t * 0.03)) * 0.13 + 0.045;\r
    let bg_b = smooth_noise((px + b_offset) * bg_scale + vec2f(t * 0.02, t * 0.02)) * 0.14 + 0.05;\r
    var refracted = vec3f(bg_r, bg_g, bg_b);\r
\r
    // Tint by glass body colour (very slight blue-green)\r
    let glass_tint = vec3f(0.85, 0.92, 0.95);\r
    refracted = refracted * glass_tint;\r
\r
    // Add internal structures\r
    refracted = refracted + vec3f(fracture_lines * 0.7, fracture_lines * 0.8, fracture_lines);\r
    refracted = refracted + vec3f(bubbles * 0.8, bubbles * 0.9, bubbles);\r
    refracted = refracted + vec3f(internal_caustic * 0.04, internal_caustic * 0.05, internal_caustic * 0.06);\r
\r
    // ── Fresnel: Schlick's approximation ──\r
    let view = vec3f(0.0, 0.0, 1.0);\r
    let n_dot_v = max(dot(normal, view), 0.0);\r
    let f0 = 0.04;  // glass IOR ~1.5\r
    let fresnel = f0 + (1.0 - f0) * pow(1.0 - n_dot_v, 5.0);\r
\r
    // ── Reflection: environment approximation (multi-layer) ──\r
    let refl_dir = reflect(-view, normal);\r
    let refl_uv1 = refl_dir.xy * 5.0 + vec2f(t * 0.06, -t * 0.04);\r
    let refl_uv2 = refl_dir.xy * 12.0 + vec2f(-t * 0.03, t * 0.07);\r
    let refl1 = smooth_noise(refl_uv1) * 0.25 + 0.08;\r
    let refl2 = smooth_noise(refl_uv2) * 0.1;\r
    let reflection = vec3f(refl1 + refl2) * vec3f(0.9, 0.95, 1.0);\r
\r
    // ── Specular highlights: two lights ──\r
    // Key: sharp point light upper-left\r
    let light1 = normalize(vec3f(-0.4, -0.7, 1.0));\r
    let half1 = normalize(light1 + view);\r
    let spec1 = pow(max(dot(normal, half1), 0.0), 128.0) * 1.5;\r
\r
    // Fill: softer warm light from right\r
    let light2 = normalize(vec3f(0.7, -0.2, 0.9));\r
    let half2 = normalize(light2 + view);\r
    let spec2 = pow(max(dot(normal, half2), 0.0), 64.0) * 0.4;\r
\r
    // ── Edge caustics: rainbow dispersion along borders ──\r
    let edge_d = abs(sdf);\r
    let edge_bright = smoothstep(3.5, 0.0, edge_d);\r
\r
    // Travelling rainbow wave along the perimeter\r
    let perim_t = atan2(local.y - 12.0, local.x - 6.0); // angle around center\r
    let rainbow_phase = perim_t * 2.0 + t * 0.8 + sdf * 0.5;\r
    let caustic_r = sin(rainbow_phase) * 0.5 + 0.5;\r
    let caustic_g = sin(rainbow_phase + 2.094) * 0.5 + 0.5;\r
    let caustic_b = sin(rainbow_phase + 4.189) * 0.5 + 0.5;\r
    let caustic = vec3f(caustic_r, caustic_g, caustic_b) * edge_bright * 0.4;\r
\r
    // Secondary: internal total-internal-reflection caustic bands\r
    let tir_bands = pow(sin(sdf * 1.2 + t * 0.3) * 0.5 + 0.5, 4.0) * edge_bright * 0.2;\r
\r
    // ── Compose ──\r
    var col = mix(refracted, reflection, fresnel)\r
            + vec3f(spec1) * vec3f(1.0, 0.98, 0.95)\r
            + vec3f(spec2) * vec3f(1.0, 0.95, 0.85)\r
            + caustic\r
            + vec3f(tir_bands * 0.5, tir_bands * 0.7, tir_bands);\r
\r
    // Glass alpha: mostly transparent body, opaque at edges (Fresnel)\r
    let body_alpha = 0.18 + fresnel * 0.55;\r
\r
    // Bright crisp edge highlight (like polished glass bevels catching light)\r
    let edge_highlight = smoothstep(1.2, 0.0, edge_d) * 0.7;\r
    let edge_shadow_inner = smoothstep(0.0, 2.5, edge_d) * smoothstep(4.0, 2.5, edge_d) * 0.15;\r
    col = col + vec3f(edge_highlight * 0.9, edge_highlight * 0.95, edge_highlight);\r
    col = col - vec3f(edge_shadow_inner * 0.3);\r
\r
    // ── Drop shadow (soft, slightly coloured by caustics) ──\r
    let shadow_sdf = cursor_arrow_sdf(local - vec2f(2.0, 3.0));\r
    let shadow_base = (1.0 - smoothstep(-4.0, 3.0, shadow_sdf)) * 0.25;\r
    // Caustic light leaking into shadow\r
    let shadow_caustic_phase = shadow_sdf * 0.6 + t * 0.4;\r
    let sc_r = sin(shadow_caustic_phase) * 0.5 + 0.5;\r
    let sc_g = sin(shadow_caustic_phase + 2.094) * 0.5 + 0.5;\r
    let sc_b = sin(shadow_caustic_phase + 4.189) * 0.5 + 0.5;\r
    let shadow_caustic_bright = smoothstep(3.0, 0.0, abs(shadow_sdf + 1.0)) * 0.12;\r
    let shadow_col_rgb = vec3f(sc_r, sc_g, sc_b) * shadow_caustic_bright;\r
\r
    let cursor_a = clamp(aa * (body_alpha + edge_highlight * 0.3), 0.0, 1.0);\r
    let shadow_result = vec4f(shadow_col_rgb, shadow_base);\r
    let cursor_result = vec4f(col, cursor_a);\r
    let out_a = cursor_result.a + shadow_result.a * (1.0 - cursor_result.a);\r
    let out_rgb = (cursor_result.rgb * cursor_result.a + shadow_result.rgb * shadow_result.a * (1.0 - cursor_result.a)) / max(out_a, 0.001);\r
    return vec4f(out_rgb, out_a);\r
}\r
\r
// Dispatch cursor rendering based on style uniform\r
fn gpu_cursor(px: vec2f, mouse: vec2f, style: f32, t: f32) -> vec4f {\r
    if (style < 0.5) { return vec4f(0.0); }       // 0 = default (no GPU cursor)\r
    if (style < 1.5) { return cursor_metal(px, mouse, t); } // 1 = metal\r
    return cursor_glass(px, mouse, t);                       // 2 = glass\r
}\r
\r
// ---- CRT post-processing ---------------------------------------------------\r
\r
fn crt_scanlines(py: f32, width: f32) -> f32 {\r
    // width 0.0 = thin crisp lines (freq ~pi), 1.0 = wide soft bands (freq ~0.3*pi)\r
    let freq = mix(3.14159, 0.9, width);\r
    let depth = mix(0.18, 0.35, width);  // wider lines = deeper modulation\r
    return (1.0 - depth) + depth * sin(py * freq);\r
}\r
\r
fn crt_vertical_lines(px_x: f32, width: f32) -> f32 {\r
    let freq = mix(3.14159 * 0.6667, 0.6, width);\r
    let depth = mix(0.12, 0.25, width);\r
    return (1.0 - depth) + depth * sin(px_x * freq);\r
}\r
\r
// Pixel-grid opacity effect — screen-door pattern (no colour shift)\r
fn crt_pixel_grid(px: vec2f) -> f32 {\r
    let cell = 3.0;\r
    // Horizontal gap between pixel cells\r
    let gx = smoothstep(0.0, 0.6, px.x % cell)\r
           * smoothstep(cell, cell - 0.6, px.x % cell);\r
    // Vertical gap between pixel cells\r
    let gy = smoothstep(0.0, 0.6, px.y % cell)\r
           * smoothstep(cell, cell - 0.6, px.y % cell);\r
    // Mix: mostly opaque, subtle grid darkening\r
    return mix(1.0, gx * gy, 0.22);\r
}\r
\r
fn crt_edge_shadow(uv: vec2f) -> f32 {\r
    let d_left   = uv.x;\r
    let d_right  = 1.0 - uv.x;\r
    let d_top    = uv.y;\r
    let d_bottom = 1.0 - uv.y;\r
    let d = min(min(d_left, d_right), min(d_top, d_bottom));\r
    return smoothstep(0.0, 0.04, d) * (0.7 + 0.3 * smoothstep(0.0, 0.15, d));\r
}\r
\r
// ---- static thin shadow for non-hovered elements ----------------------------\r
\r
fn static_shadow(px: vec2f, ex: f32, ey: f32, ew: f32, eh: f32) -> f32 {\r
    let inside_x = px.x >= ex && px.x < ex + ew;\r
    let inside_y = px.y >= ey && px.y < ey + eh;\r
    if !(inside_x && inside_y) { return 0.0; }\r
    let dist = edge_dist(px, ex, ey, ew, eh);\r
    return smoothstep(3.0, 0.0, dist) * 0.20;\r
}\r
\r
// ---- ember hover border — smouldering cracks along edges --------------------\r
\r
fn hover_border(px: vec2f, ex: f32, ey: f32, ew: f32, eh: f32,\r
                hue: f32, t: f32, prox: f32) -> vec4f {\r
    let cs = max(u.cinder_size, 0.01);\r
    let margin = 4.0 * cs;\r
    let inside_x = px.x >= ex - margin && px.x < ex + ew + margin;\r
    let inside_y = px.y >= ey - margin && px.y < ey + eh + margin;\r
    if !(inside_x && inside_y) { return vec4f(0.0); }\r
\r
    if !(inside_x && inside_y) { return vec4f(0.0); }\r
\r
    let dist = edge_dist(px, ex, ey, ew, eh);\r
    let pt   = perimeter_t(px, ex, ey, ew, eh);\r
\r
    if dist > 7.0 * cs { return vec4f(0.0); }\r
\r
    // Crackling ember wave — irregular, like smouldering cracks\r
    let crack_n = smooth_noise(vec2f(pt * 40.0, t * 1.5));\r
    let crack   = pow(crack_n, 3.0);\r
\r
    // Slow pulsing heat\r
    let pulse = 0.6 + 0.4 * sin(t * 1.5 + pt * 6.28);\r
\r
    // Ember colour: deep orange → dull red, with vine-green flickers\r
    let ember_core = palette.cinder_ember.rgb;\r
    let ember_edge = palette.cinder_gold.rgb;\r
    let vine_flick = palette.cinder_vine.rgb;\r
    var ember_rgb = mix(ember_edge, ember_core, crack * pulse);\r
    let vine_f = smoothstep(0.7, 0.9, smooth_noise(vec2f(pt * 20.0 + 5.0, t * 0.5)));\r
    ember_rgb = mix(ember_rgb, vine_flick, vine_f * 0.4);\r
\r
    // Border glow profile\r
    let glow = smoothstep(0.0, 0.5 * cs, dist) * smoothstep(6.0 * cs, 1.0 * cs, dist);\r
\r
    // Impact: bonfire flare\r
    let impact = prox * prox * 0.5;\r
\r
    let brightness = (crack * 0.7 + pulse * 0.3 + impact) * prox;\r
    let final_rgb = ember_rgb * glow * brightness * 1.2;\r
    let final_a   = glow * brightness * 0.85;\r
\r
    return vec4f(final_rgb, final_a);\r
}\r
\r
// ---- main scene compositing -------------------------------------------------\r
\r
fn sample_scene(px: vec2f) -> vec4f {\r
    let hover_idx = i32(u.hover_elem);\r
    let cs = u.cinder_size;\r
\r
    // FAST PATH: no hover and cinder disabled → skip entire loop\r
    if hover_idx < 0 && cs <= 0.0 {\r
        return vec4f(0.0);\r
    }\r
\r
    var out = vec4f(0.0);\r
    let count = u32(u.element_count);\r
\r
    // In 3D views (scene3d=4, hypergraph=5), skip cinder border on structural\r
    // elements (kind=0) like the view-container — effects should only apply\r
    // to actual scene objects, not the outer viewport frame.\r
    let is_3d_view = u.current_view >= 4.0 && u.current_view <= 5.0;\r
\r
    // When hovering, only process the hovered element (skip full loop)\r
    if hover_idx >= 0 && cs > 0.0 {\r
        let i = u32(hover_idx);\r
        if i < count {\r
            let e = elems[i];\r
            // Skip structural elements (kind=0) in 3D views\r
            if is_3d_view && e.kind < 0.5 {\r
                return vec4f(0.0);\r
            }\r
            let prox = hover_proximity(e.rect.x, e.rect.y, e.rect.z, e.rect.w);\r
            let border = hover_border(px, e.rect.x, e.rect.y, e.rect.z, e.rect.w, e.hue, u.time, prox);\r
            out = out + border;\r
        }\r
        return out;\r
    }\r
\r
    // Full loop only when cinder enabled but no hover (static shadows)\r
    for (var i = 0u; i < count; i++) {\r
        let e  = elems[i];\r
        // Skip structural elements in 3D views\r
        if is_3d_view && e.kind < 0.5 { continue; }\r
        let ex = e.rect.x;\r
        let ey = e.rect.y;\r
        let ew = e.rect.z;\r
        let eh = e.rect.w;\r
\r
        let is_hovered = i32(i) == hover_idx;\r
\r
        if is_hovered {\r
            let prox = hover_proximity(ex, ey, ew, eh);\r
            let border = hover_border(px, ex, ey, ew, eh, e.hue, u.time, prox);\r
            out = out + border;\r
        } else {\r
            let shadow = static_shadow(px, ex, ey, ew, eh);\r
            out = out + vec4f(0.0, 0.0, 0.0, shadow);\r
        }\r
    }\r
\r
    return out;\r
}\r
\r
// ---- 3D skybox helpers (triplanar mapping) ----------------------------------\r
\r
// ---- Optimised smoke noise (Book of Shaders / domain warping) ---------------\r
// 2-octave fbm for cheap warping / palette blending\r
fn fbm_lo(p: vec2f) -> f32 {\r
    return smooth_noise(p) * 0.667 + smooth_noise(p * 2.0) * 0.333;\r
}\r
\r
// 3-octave fbm with inter-octave rotation for richer patterns at lower cost.\r
// Rotation breaks axis-aligned grid artefacts, making 3 octaves look as good\r
// as 4 non-rotated ones.  (Inspired by Book of Shaders ch.13.)\r
fn smoke_noise(p_in: vec2f) -> f32 {\r
    var val = 0.0;\r
    var amp = 0.5;\r
    var p = p_in;\r
    for (var i = 0; i < 3; i++) {\r
        val += amp * smooth_noise(p);\r
        amp *= 0.5;\r
        // Rotate ≈37° + lacunarity 2.0 between octaves\r
        p = vec2f(p.x * 1.6 - p.y * 1.2, p.x * 1.2 + p.y * 1.6);\r
    }\r
    return val;\r
}\r
\r
// Triplanar blend weights from ray direction - avoids pole singularities\r
// Returns weights for XY, XZ, YZ planes (sums to 1.0)\r
fn triplanar_weights(dir: vec3f) -> vec3f {\r
    let n = abs(dir);\r
    // Sharpen the blend with power to reduce visible transitions\r
    let weights = pow(n, vec3f(4.0));\r
    return weights / (weights.x + weights.y + weights.z);\r
}\r
\r
// Sample 2D noise with triplanar blending - no pole artifacts\r
fn triplanar_noise(dir: vec3f, scale: f32, offset: vec2f) -> f32 {\r
    let w = triplanar_weights(dir);\r
    let d = dir * scale;\r
    let n_xy = smooth_noise(d.xy + offset);\r
    let n_xz = smooth_noise(d.xz + offset);\r
    let n_yz = smooth_noise(d.yz + offset);\r
    return n_xy * w.z + n_xz * w.y + n_yz * w.x;\r
}\r
\r
// Cheap triplanar warp noise (2 octaves)\r
fn triplanar_fbm_lo(dir: vec3f, scale: f32, offset: vec2f) -> f32 {\r
    let w = triplanar_weights(dir);\r
    let d = dir * scale;\r
    return fbm_lo(d.xy + offset) * w.z +\r
           fbm_lo(d.xz + offset) * w.y +\r
           fbm_lo(d.yz + offset) * w.x;\r
}\r
\r
// Triplanar domain-warped smoke (3 octaves, rotated)\r
fn triplanar_smoke(dir: vec3f, scale: f32, offset: vec2f) -> f32 {\r
    let w = triplanar_weights(dir);\r
    let d = dir * scale;\r
    return smoke_noise(d.xy + offset) * w.z +\r
           smoke_noise(d.xz + offset) * w.y +\r
           smoke_noise(d.yz + offset) * w.x;\r
}\r
\r
// Compute world-space ray direction from screen pixel using inverse VP matrix\r
fn screen_to_ray_dir(px: vec2f, width: f32, height: f32) -> vec3f {\r
    // Convert pixel to NDC (clip space)\r
    let ndc = vec2f(\r
        (px.x / width) * 2.0 - 1.0,\r
        1.0 - (px.y / height) * 2.0  // flip Y for screen coords\r
    );\r
    \r
    // Unproject near and far points using inverse VP\r
    let near_clip = vec4f(ndc.x, ndc.y, -1.0, 1.0);\r
    let far_clip = vec4f(ndc.x, ndc.y, 1.0, 1.0);\r
    \r
    let near_world = u.particle_inv_vp * near_clip;\r
    let far_world = u.particle_inv_vp * far_clip;\r
    \r
    let near_pos = near_world.xyz / near_world.w;\r
    let far_pos = far_world.xyz / far_world.w;\r
    \r
    return normalize(far_pos - near_pos);\r
}\r
\r
// ---- fragment entry point ---------------------------------------------------\r
\r
@fragment\r
fn fs_main(@builtin(position) pos: vec4f) -> @location(0) vec4f {\r
    let raw_px = pos.xy;\r
    let raw_uv = raw_px / vec2f(u.width, u.height);\r
\r
    // --- Configurable smoke parameters from uniforms --------------------------\r
    let s_intensity  = u.smoke_intensity;       // 0.0–1.0\r
    let s_speed      = u.smoke_speed;           // 0.0–5.0\r
    let s_warm_scale = u.smoke_warm_scale;      // 0.0–2.0 (warm layers 1+4)\r
    let s_cool_scale = u.smoke_cool_scale;      // 0.0–2.0 (cool layer 2)\r
    let s_moss_scale = u.smoke_moss_scale;      // 0.0–2.0 (moss-tone layer)\r
    let s_grain_i    = u.grain_intensity;       // 0.0–1.0 brightness\r
    let s_grain_c    = mix(0.5, 2.0, u.grain_coarseness);  // freq scale 0.5–2.0\r
    let s_grain_sz   = mix(1.0, 8.0, u.grain_size);         // pixel block 1–8\r
    let s_vignette   = u.vignette_str;          // 0.0–1.0\r
    let s_underglow  = u.underglow_str;         // 0.0–1.0\r
\r
    // Speed is baked into the base time so ALL time-dependent effects scale uniformly\r
    let t = u.time * 0.35 * s_speed;\r
\r
    // --- Check if we're in a 3D view (scene3d=4, hypergraph=5) ----------------\r
    let is_3d_view = u.current_view >= 4.0 && u.current_view <= 5.0;\r
\r
    var bg: vec3f;\r
    var vignette: f32;\r
    var ds_px: vec2f;\r
    var ds_uv: vec2f;\r
    var drift: vec2f;\r
    var grain_px: vec2f;\r
\r
    // --- 3D SKYBOX PATH: triplanar projection (no pole artifacts) --------------\r
    if is_3d_view {\r
        // Compute ray direction from camera through this pixel\r
        let ray_dir = screen_to_ray_dir(raw_px, u.width, u.height);\r
        \r
        // Triplanar mapping: sample noise from XY, XZ, YZ planes and blend\r
        // This eliminates singularities at poles that spherical mapping has\r
        \r
        drift = vec2f(t * 0.12, t * 0.06);\r
        grain_px = floor(raw_px / 4.0) * 4.0;  // grain uses screen coords\r
        ds_px = raw_px;\r
        ds_uv = raw_uv;\r
        \r
        // Scale factor to match 2D appearance (ray_dir is normalized to length 1)\r
        let skybox_scale = max(u.width, u.height) * 0.5;\r
        \r
        // --- Vignette for 3D: gentle edge darkening --------------------------\r
        let vig_d = length((raw_uv - 0.5) * vec2f(1.0, 0.8));\r
        vignette = 1.0 - smoothstep(0.5, 1.2, vig_d) * 0.35 * s_vignette;\r
        \r
        // --- Base palette using triplanar noise (same logic as 2D) -----------\r
        let palette_t = triplanar_noise(ray_dir, skybox_scale * 0.003 * s_warm_scale, drift * 5.0);\r
        let cool_var  = triplanar_noise(ray_dir, skybox_scale * 0.005 * s_cool_scale, drift * 3.0 + vec2f(3.7, 2.1));\r
        let moss_var  = triplanar_noise(ray_dir, skybox_scale * 0.008 * s_moss_scale, drift * 4.0 + vec2f(5.1, 9.3));\r
        let cool_tone = palette.smoke_cool.rgb;\r
        let warm_tone = palette.smoke_warm.rgb;\r
        let moss_tone = palette.smoke_moss.rgb;\r
        var base_col = mix(cool_tone, warm_tone, smoothstep(0.3, 0.7, palette_t));\r
        base_col = mix(base_col, cool_tone, smoothstep(0.4, 0.7, cool_var) * 0.3);\r
        base_col = mix(base_col, moss_tone, smoothstep(0.3, 0.7, moss_var) * 0.5 * s_moss_scale);\r
        \r
        // Add grain (using screen coords for temporal stability)\r
        var grain_sum = 0.0;\r
        if (s_grain_i > 0.0) {\r
            let n_fine   = smooth_noise((grain_px + drift * 40.0) * 0.025 * s_grain_c) * 0.028 * s_grain_i;\r
            let n_coarse = smooth_noise((grain_px + drift * 20.0) * 0.006 * s_grain_c + vec2f(7.3, 2.1)) * 0.018 * s_grain_i;\r
            let n_grain  = hash2(grain_px * 0.37 * s_grain_c + vec2f(floor(u.time * 8.0 * s_speed))) * 0.015 * s_grain_i;\r
            grain_sum = n_fine + n_coarse + n_grain;\r
        }\r
        bg = base_col + vec3f(grain_sum);\r
        \r
        // --- Domain-warped smoke (Book of Shaders ch.13) ---------------------\r
        // Instead of 4 independent fbm layers, use 1 cheap warp + 2 warped\r
        // smoke layers.  Domain warping produces organic, swirling patterns\r
        // with fewer texture lookups.\r
        if (s_intensity > 0.0) {\r
            // Cheap warp field (2 octaves) — shifts sample coords for organic curl\r
            let warp = triplanar_fbm_lo(ray_dir, 2.0, vec2f(t * 0.04, t * 0.02));\r
            let warp_offset = vec3f(warp * 0.15, warp * 0.1, warp * 0.12);\r
            let warped_dir = normalize(ray_dir + warp_offset);\r
\r
            // Layer 1: warm rolling smoke (3 oct, rotated)\r
            let smoke_warm = triplanar_smoke(warped_dir, 2.0 * s_warm_scale,\r
                             vec2f(t * 0.05, t * 0.02)) * 0.14 * s_intensity;\r
\r
            // Layer 2: cool tendrils drifting opposite direction (3 oct, rotated)\r
            let smoke_cool = triplanar_smoke(warped_dir, 3.5 * s_cool_scale,\r
                             vec2f(-t * 0.07, t * 0.04)) * 0.09 * s_intensity;\r
\r
            // Composite with colour tinting\r
            bg = bg + vec3f(smoke_warm) * vec3f(0.85, 0.80, 0.75);  // warm smoke\r
            bg = bg + vec3f(smoke_cool) * vec3f(0.6, 0.7, 0.85);    // cool wisps\r
            // Moss tinting from warp noise (free — reuses existing value)\r
            bg = bg + vec3f(warp * 0.04 * s_intensity * s_moss_scale) * palette.smoke_moss.rgb;\r
        }\r
        \r
        // Grain shimmer\r
        if (s_grain_i > 0.0) {\r
            let grain_hi = smooth_noise((grain_px + drift * 60.0) * 0.12 * s_grain_c) * 0.012 * s_grain_i;\r
            bg = bg + vec3f(grain_hi * 0.6, grain_hi * 0.55, grain_hi * 0.5);\r
        }\r
        \r
        // Underglow (based on screen position, not spherical)\r
        if (s_underglow > 0.001) {\r
            let underglow = smoothstep(1.0, 0.4, raw_uv.y) * 0.015 * s_underglow;\r
            bg = bg + vec3f(0.5, 0.18, 0.05) * underglow;\r
        }\r
        \r
        // Apply vignette\r
        bg = bg * vignette;\r
    } else {\r
        // --- 2D PATH: Original screen-space background -------------------------\r
        // Existing logic preserved for non-3D views\r
        \r
        // FAST PATH: minimal background when smoke+grain disabled\r
        let effects_minimal = s_intensity <= 0.0 && s_grain_i <= 0.0;\r
\r
        if effects_minimal {\r
            // Simple UV-based gradient — no noise calls at all\r
            let cool_tone = palette.smoke_cool.rgb;\r
            let warm_tone = palette.smoke_warm.rgb;\r
            // Vertical gradient from cool (top) to warm (bottom)\r
            let grad_t = raw_uv.y * 0.5 + raw_uv.x * 0.2;\r
            bg = mix(cool_tone, warm_tone, grad_t);\r
            // Cheap vignette\r
            let vig_d = length((raw_uv - 0.5) * vec2f(1.2, 1.0));\r
            vignette = 1.0 - smoothstep(0.3, 1.1, vig_d) * 0.55 * s_vignette;\r
            ds_px = raw_px;\r
            ds_uv = raw_uv;\r
            drift = vec2f(0.0);\r
            grain_px = raw_px;\r
        } else {\r
            // --- Full quality path with noise effects ---------------------------------\r
            // Smoke uses full-resolution coordinates for smooth blending.\r
            // Only grain gets intentional pixel-block downsampling.\r
            ds_px = raw_px;\r
            ds_uv = raw_uv;\r
\r
            // Vignette — darken edges, bright centre (scaled by vignette_str)\r
            let vig_d = length((raw_uv - 0.5) * vec2f(1.2, 1.0));\r
            vignette = 1.0 - smoothstep(0.3, 1.1, vig_d) * 0.55 * s_vignette;\r
\r
            // Grain pixel-block downsampling (s_grain_sz controls block size)\r
            let grain_base = floor(raw_px / 4.0) * 4.0;\r
            grain_px = floor(grain_base / s_grain_sz) * s_grain_sz;\r
\r
            // Animated coarse noise — drifting (speed already baked into t)\r
            drift = vec2f(t * 0.12, t * 0.06);\r
            var grain_sum = 0.0;\r
            if (s_grain_i > 0.0) {\r
                let n_fine   = smooth_noise((grain_px + drift * 40.0) * 0.025 * s_grain_c) * 0.028 * s_grain_i;\r
                let n_coarse = smooth_noise((grain_px + drift * 20.0) * 0.006 * s_grain_c + vec2f(7.3, 2.1)) * 0.018 * s_grain_i;\r
                let n_grain  = hash2(grain_px * 0.37 * s_grain_c + vec2f(floor(u.time * 8.0 * s_speed))) * 0.015 * s_grain_i;\r
                grain_sum = n_fine + n_coarse + n_grain;\r
            }\r
\r
            // Varied base palette — colour variation across the screen.\r
            // s_warm_scale controls base warm/cool blending frequency;\r
            // s_cool_scale biases toward cool tones; s_moss_scale drives moss-tone blending.\r
            let palette_t = smooth_noise(ds_px * (0.003 * s_warm_scale) + drift * 5.0);\r
            let cool_var  = smooth_noise(ds_px * (0.005 * s_cool_scale) + drift * 3.0 + vec2f(3.7, 2.1));\r
            let moss_var  = smooth_noise(ds_px * (0.008 * s_moss_scale) + drift * 4.0 + vec2f(5.1, 9.3));\r
            let cool_tone = palette.smoke_cool.rgb;\r
            let warm_tone = palette.smoke_warm.rgb;\r
            let moss_tone = palette.smoke_moss.rgb;\r
            var base_col = mix(cool_tone, warm_tone, smoothstep(0.3, 0.7, palette_t));\r
            // Cool-scale noise pulls toward cool tones\r
            base_col = mix(base_col, cool_tone, smoothstep(0.4, 0.7, cool_var) * 0.3);\r
            // Moss-scale noise blends in the moss mid-tone (higher scale = more varied moss patches)\r
            base_col = mix(base_col, moss_tone, smoothstep(0.3, 0.7, moss_var) * 0.5 * s_moss_scale);\r
            bg = base_col + vec3f(grain_sum);\r
        }\r
\r
        // --- Domain-warped smoke (Book of Shaders ch.13) ---------------------\r
        // 1 cheap warp + 2 warped smoke layers replaces 4 plain fbm layers.\r
        // Domain warping produces organic swirling with fewer lookups.\r
        if (s_intensity > 0.0 && !effects_minimal) {\r
            // Cheap warp field (2 octaves) — swirls the sample coordinates\r
            let warp = fbm_lo(ds_uv * 2.0 + vec2f(t * 0.04, t * 0.02));\r
            let warped_uv = ds_uv + vec2f(warp * 0.15, warp * 0.1);\r
\r
            // Layer 1: warm rolling smoke (3 oct, rotated)\r
            let smoke_warm = smoke_noise(warped_uv * (2.0 * s_warm_scale)\r
                             + vec2f(t * 0.05, t * 0.02)) * 0.14 * s_intensity;\r
\r
            // Layer 2: cool tendrils drifting opposite direction (3 oct, rotated)\r
            let smoke_cool = smoke_noise(warped_uv * (3.5 * s_cool_scale)\r
                             + vec2f(-t * 0.07, t * 0.04)) * 0.09 * s_intensity;\r
\r
            // Composite with colour tinting\r
            bg = bg + vec3f(smoke_warm) * vec3f(0.85, 0.80, 0.75);  // warm smoke\r
            bg = bg + vec3f(smoke_cool) * vec3f(0.6, 0.7, 0.85);    // cool wisps\r
            // Moss tinting from warp noise (free — reuses existing value)\r
            bg = bg + vec3f(warp * 0.04 * s_intensity * s_moss_scale) * palette.smoke_moss.rgb;\r
        }\r
\r
        // Faint animated grain shimmer (skip noise when grain disabled)\r
        if (s_grain_i > 0.0 && !effects_minimal) {\r
            let grain_hi = smooth_noise((grain_px + drift * 60.0) * 0.12 * s_grain_c) * 0.012 * s_grain_i;\r
            bg = bg + vec3f(grain_hi * 0.6, grain_hi * 0.55, grain_hi * 0.5);\r
        }\r
\r
        // Dim warm underglow from bottom edge (skip when off)\r
        if (s_underglow > 0.001) {\r
            let underglow = smoothstep(1.0, 0.4, raw_uv.y) * 0.015 * s_underglow;\r
            bg = bg + vec3f(0.5, 0.18, 0.05) * underglow;\r
        }\r
\r
        // Apply vignette\r
        bg = bg * vignette;\r
    }\r
\r
    // --- Scene elements ------------------------------------------------------\r
    let scene = sample_scene(raw_px);\r
    var color = bg * (1.0 - scene.a) + scene.rgb;\r
\r
    // --- Atmospheric CRT effects (independently controlled) ------------------\r
    let sh_i = u.crt_scanlines_h;  // horizontal scanlines\r
    let sv_i = u.crt_scanlines_v;  // vertical scanlines\r
    let es_i = u.crt_edge_shadow;  // edge/border shadow\r
    let fl_i = u.crt_flicker;      // torch flicker\r
\r
    let any_crt = max(max(sh_i, sv_i), max(es_i, fl_i));\r
    if (any_crt > 0.001) {\r
        let lw = u.crt_line_width;  // 0 = thin, 1 = wide\r
\r
        // Horizontal scanlines + horizontal component of pixel grid\r
        let scanline = mix(1.0, crt_scanlines(raw_px.y, lw), sh_i);\r
        // Vertical scanlines + vertical component of pixel grid\r
        let vline    = mix(1.0, crt_vertical_lines(raw_px.x, lw), sv_i);\r
        // Pixel grid: blend of both axes — only visible where both have intensity\r
        let grid_i = min(sh_i, sv_i);\r
        let pgrid  = mix(1.0, crt_pixel_grid(raw_px), grid_i);\r
\r
        let edge     = mix(1.0, crt_edge_shadow(raw_uv), es_i);\r
        let torch_flicker = 1.0 - fl_i * (0.03 - 0.03 * sin(t * 3.0 + raw_uv.x * 2.0));\r
\r
        // Apply multiplicative CRT darkening\r
        let crt_mult = scanline * vline * pgrid * edge * torch_flicker;\r
        color = color * crt_mult;\r
\r
        // CRT color tint — blend toward scanline color in dark CRT bands\r
        let crt_tint = vec3f(u.crt_color_r, u.crt_color_g, u.crt_color_b);\r
        let tint_len = length(crt_tint);\r
        if (tint_len > 0.01) {\r
            // Tint strength based on how dark the CRT made this pixel\r
            let darkness = 1.0 - crt_mult;\r
            color = color + crt_tint * darkness * 0.3;\r
        }\r
    }\r
\r
    return vec4f(clamp(color, vec3f(0.0), vec3f(1.0)), 1.0);\r
}\r
`,Fl=`// particles.wgsl — multi-type instanced particle rendering\r
//\r
// Concatenated after: palette.wgsl + types.wgsl + noise.wgsl + particle-shading.wgsl\r
// Four particle types rendered in one instanced draw call:\r
//   PK_METAL_SPARK (0) — velocity-aligned thin streak (grinding spark)\r
//   PK_EMBER       (1) — tiny pixel-size warm ember/ash glow (continuous)\r
//   PK_GOD_RAY     (2) — pixel-thin tall vertical angelic beam (continuous)\r
//   PK_GLITTER     (3) — tiny angelic twinkle around selected element border\r
//\r
// Fragment colouring uses shared functions from particle-shading.wgsl\r
// (shade_spark_fx, shade_ember_fx, shade_beam_fx, shade_glitter_fx).\r
\r
// ---- bindings (render pass — read-only) -------------------------------------\r
\r
@group(0) @binding(0) var<uniform>       u         : Uniforms;\r
@group(0) @binding(1) var<storage, read> elems     : array<ElemRect>;\r
@group(0) @binding(2) var<storage, read> particles : array<Particle>;\r
\r
// ---- interpolated data between VS and FS ------------------------------------\r
\r
struct ParticleVarying {\r
    @builtin(position)                    clip_pos : vec4f,\r
    @location(0)                          local_uv : vec2f,   // [-1..1] in oriented quad space\r
    @location(1) @interpolate(flat)       pidx     : u32,\r
    @location(2) @interpolate(flat)       pkind    : u32,\r
    @location(3) @interpolate(flat)       aspect   : f32,     // elongation ratio\r
}\r
\r
// ---- vertex shader ----------------------------------------------------------\r
\r
@vertex\r
fn vs_particle(\r
    @builtin(vertex_index)   vid : u32,\r
    @builtin(instance_index) iid : u32,\r
) -> ParticleVarying {\r
    var out: ParticleVarying;\r
    out.pidx  = iid;\r
    out.pkind = 0u;\r
    out.aspect = 1.0;\r
\r
    let p = particles[iid];\r
    let kind = u32(p.kind_view) % 8u;\r
    let view_id = (u32(p.kind_view) / 8u) % 8u;\r
    let is_screen_space = u32(p.kind_view) >= 64u;\r
    out.pkind = kind;\r
\r
    // Dead or wrong view → degenerate quad (off-screen)\r
    if p.life <= 0.0 || f32(view_id) != u.current_view {\r
        out.clip_pos = vec4f(-2.0, -2.0, 0.0, 1.0);\r
        out.local_uv = vec2f(0.0);\r
        return out;\r
    }\r
\r
    // 6-vertex quad (two triangles)\r
    var corner: vec2f;\r
    switch vid {\r
        case 0u: { corner = vec2f(-1.0, -1.0); }\r
        case 1u: { corner = vec2f( 1.0, -1.0); }\r
        case 2u: { corner = vec2f(-1.0,  1.0); }\r
        case 3u: { corner = vec2f( 1.0, -1.0); }\r
        case 4u: { corner = vec2f( 1.0,  1.0); }\r
        default: { corner = vec2f(-1.0,  1.0); }\r
    }\r
    out.local_uv = corner;\r
\r
    // Project particle center to clip space.\r
    // Screen-space particles: orthographic (screen pixels → clip)\r
    // World-space particles: use particle_vp (3D or 2D viewProj)\r
    var clip_center: vec4f;\r
    if is_screen_space {\r
        // Orthographic: screen pixels → NDC → clip\r
        let ndc_x = p.pos.x / u.width * 2.0 - 1.0;\r
        let ndc_y = -(p.pos.y / u.height * 2.0 - 1.0);  // Y flip\r
        clip_center = vec4f(ndc_x, ndc_y, 0.0, 1.0);\r
    } else {\r
        clip_center = u.particle_vp * vec4f(p.pos, 1.0);\r
    }\r
    let cw = clip_center.w;\r
\r
    // All offsets are computed in PIXEL space (Y down), then converted to clip\r
    // at the end via:  clip_x += pixel_x * 2/vp_w * w\r
    //                  clip_y -= pixel_y * 2/vp_h * w   (Y flip: pixel Y↓, NDC Y↑)\r
    var pixel_offset: vec2f;\r
\r
    if kind == 0u {\r
        // ---- METAL SPARK: velocity-aligned thin streak ----\r
        let vel_len = length(p.vel);\r
        var pixel_fwd: vec2f;\r
        var speed_px: f32;\r
\r
        if is_screen_space {\r
            // Screen-space: velocity is already in pixels/sec\r
            let vel2d = p.vel.xy;\r
            let vel2d_len = length(vel2d);\r
            // Screen Y is down, so use velocity direction directly\r
            pixel_fwd = select(vec2f(0.0, 1.0), vel2d / vel2d_len, vel2d_len > 0.0001);\r
            speed_px = vel2d_len;\r
        } else {\r
            // World-space: project velocity direction to screen\r
            let fwd_world = select(vec3f(0.0, -1.0, 0.0), p.vel / vel_len, vel_len > 0.0001);\r
            let clip_ahead = u.particle_vp * vec4f(p.pos + fwd_world * u.world_scale, 1.0);\r
            let ndc_c = clip_center.xy / cw;\r
            let ndc_a = clip_ahead.xy / clip_ahead.w;\r
            // Full-canvas NDC → pixel direction (Y flipped)\r
            let pd = vec2f((ndc_a.x - ndc_c.x) * u.width * 0.5,\r
                           -(ndc_a.y - ndc_c.y) * u.height * 0.5);\r
            let pd_len = length(pd);\r
            pixel_fwd = select(vec2f(0.0, -1.0), pd / pd_len, pd_len > 0.0001);\r
            speed_px = vel_len / max(u.world_scale, 0.0001);\r
        }\r
        let pixel_right = vec2f(-pixel_fwd.y, pixel_fwd.x);\r
\r
        // Length scales with on-screen speed; width stays thin\r
        let half_len = p.size * (2.0 + speed_px * 0.04);\r
        let half_wid = p.size * 0.35;\r
        out.aspect = half_len / max(half_wid, 0.1);\r
        pixel_offset = pixel_fwd * corner.y * half_len + pixel_right * corner.x * half_wid;\r
\r
    } else if kind == 1u {\r
        // ---- EMBER / ASH: tiny pixel-size dot ----\r
        let radius = p.size * 1.2;\r
        pixel_offset = corner * radius;\r
\r
    } else if kind == 2u {\r
        // ---- ANGELIC BEAM: tall line oriented along world up ----\r
        var pixel_up: vec2f;\r
        var px_per_world: f32;\r
\r
        if is_screen_space {\r
            // Screen-space: up is negative Y (toward top of screen)\r
            pixel_up = vec2f(0.0, -1.0);\r
            px_per_world = 1.0;  // p.size is already in pixels\r
        } else {\r
            // World-space: project direction to screen\r
            // p.size is in world units (set at spawn: pixel_size × ws).\r
            // We project a 1-world-unit offset to find how many pixels one\r
            // world unit covers on screen, then scale p.size by that.\r
            let up_w = select(vec3f(0.0, -1.0, 0.0), vec3f(0.0, 1.0, 0.0), u.current_view >= 4.0 && u.current_view <= 5.0);\r
\r
            // Project p.pos + 1 world unit in the up direction\r
            let clip_up_pt = u.particle_vp * vec4f(p.pos + up_w, 1.0);\r
            let ndc_c = clip_center.xy / cw;\r
            let ndc_u = clip_up_pt.xy / clip_up_pt.w;\r
            // Full-canvas NDC → pixel direction (Y flipped)\r
            let pd = vec2f((ndc_u.x - ndc_c.x) * u.width * 0.5,\r
                           -(ndc_u.y - ndc_c.y) * u.height * 0.5);\r
            let pd_len = length(pd);\r
            pixel_up = select(vec2f(0.0, -1.0), pd / pd_len, pd_len > 0.0001);\r
            // px_per_world: how many screen pixels 1 world unit covers\r
            px_per_world = pd_len;\r
        }\r
        let pixel_rt = vec2f(-pixel_up.y, pixel_up.x);\r
\r
        // World-space half-extents → pixel sizes via px_per_world\r
        let half_w = p.size * 2.0 * px_per_world;\r
        let bh = select(35.0, u.beam_height, u.beam_height > 0.0);\r
        let half_h = p.size * bh * px_per_world;\r
        out.aspect = half_h / max(half_w, 0.1);\r
        // Beam extends upward from spawn point: base at pos, top at pos + 2×half_h\r
        pixel_offset = pixel_rt * corner.x * half_w + pixel_up * (corner.y * half_h + half_h);\r
\r
    } else {\r
        // ---- GLITTER: slightly larger sparkle ----\r
        let radius = p.size * 1.8;\r
        pixel_offset = corner * radius;\r
    }\r
\r
    // Convert pixel offset to clip-space offset (perspective-correct billboard).\r
    // particle_vp outputs full-canvas clip coords, so use full canvas dims.\r
    // Pixel Y increases downward, NDC Y increases upward → negate Y.\r
    out.clip_pos = clip_center + vec4f(\r
        pixel_offset.x *  2.0 / u.width * cw,\r
        pixel_offset.y * -2.0 / u.height * cw,\r
        0.0, 0.0\r
    );\r
\r
    return out;\r
}\r
\r
// ---- fragment shader (delegates to shared shade functions) -------------------\r
\r
@fragment\r
fn fs_particle(in: ParticleVarying) -> @location(0) vec4f {\r
    let p = particles[in.pidx];\r
    let t_life = p.life / p.max_life;\r
    let kind = in.pkind;\r
\r
    // Compute fwidth in uniform control flow (before branching on kind)\r
    let fw = fwidth(in.local_uv.x);\r
\r
    if kind == 0u {\r
        return shade_spark_fx(in.local_uv, t_life, p.hue);\r
    } else if kind == 1u {\r
        return shade_ember_fx(in.local_uv, t_life, p.hue);\r
    } else if kind == 2u {\r
        return shade_beam_fx(in.local_uv, t_life, fw * 2.0);\r
    } else {\r
        return shade_glitter_fx(in.local_uv, t_life, p.hue, u.time, f32(in.pidx));\r
    }\r
}\r
`,Ml=`// compute.wgsl — multi-effect particle physics simulation\r
//\r
// Concatenated after: types.wgsl + noise.wgsl\r
// Four particle types, partitioned by index:\r
//   [0, SPARK_END)               — metal sparks (at mouse position while hovering)\r
//   [SPARK_END, EMBER_END)       — flying embers / ash (continuous rise from hovered)\r
//   [EMBER_END, RAY_END)         — angelic beams (pixel-thin vertical from hovered)\r
//   [RAY_END, GLITTER_END)       — angelic glitter (around selected element)\r
\r
// ---- bindings (compute pass) ------------------------------------------------\r
\r
@group(0) @binding(0) var<uniform>             u         : Uniforms;\r
@group(0) @binding(1) var<storage, read>       elems     : array<ElemRect>;\r
@group(0) @binding(2) var<storage, read_write> particles : array<Particle>;\r
\r
// ---- constants --------------------------------------------------------------\r
\r
const BURST_WINDOW : f32 = 0.25;   // seconds — initial intense burst\r
\r
// ---- helpers ----------------------------------------------------------------\r
\r
// True when the active view is a real 3D scene (scene3d=4, hypergraph=5).\r
// Other views (logs=0..debug=3, settings=6) use screen-space 2D.\r
fn is_3d_view() -> bool {\r
    return u.current_view >= 4.0 && u.current_view <= 5.0;\r
}\r
\r
// True when an element is positioned in screen-space (not 3D world space).\r
// Elements with depth ≈ 0 are static UI / containers that should not move\r
// when the camera moves in a 3D viewport.\r
fn is_elem_screen_space(ei: u32) -> bool {\r
    return elems[ei].depth < 0.0001;\r
}\r
\r
// World-space "up" direction for a particle's coordinate space.\r
// 2D screen-space: (0, -1, 0) because screen Y increases downward.\r
// 3D world-space: (0, +1, 0) because Y is up.\r
fn particle_up(is_screen: bool) -> vec3f {\r
    return select(vec3f(0.0, 1.0, 0.0), vec3f(0.0, -1.0, 0.0), is_screen);\r
}\r
\r
// World-space "right" direction (always +X).\r
fn particle_right() -> vec3f {\r
    return vec3f(1.0, 0.0, 0.0);\r
}\r
\r
// World-space "up" direction based on current view (legacy helper).\r
// 2D views: (0, -1, 0) because screen Y increases downward.\r
// 3D views: (0, +1, 0) because Y is up in world space.\r
fn world_up() -> vec3f {\r
    return select(vec3f(0.0, -1.0, 0.0), vec3f(0.0, 1.0, 0.0), is_3d_view());\r
}\r
\r
// World-space "right" direction (always +X).\r
fn world_right() -> vec3f {\r
    return vec3f(1.0, 0.0, 0.0);\r
}\r
\r
// Convert a screen-pixel position to world space using the inverse viewProj.\r
// For 2D views (ortho), world ≈ screen pixels with z=0.\r
// For 3D views, unprojecting at the given NDC depth gives a world position\r
// on the corresponding depth plane.\r
fn screen_to_world(screen_pos: vec2f) -> vec3f {\r
    return screen_to_world_at(screen_pos, u.ref_depth);\r
}\r
\r
// Like screen_to_world but with an explicit NDC depth parameter.\r
// Converts screen-pixel coordinates to full-canvas NDC, then unprojections\r
// via particle_inv_vp (which maps full-canvas NDC → world space).\r
fn screen_to_world_at(screen_pos: vec2f, ndc_z: f32) -> vec3f {\r
    let ndc_x = screen_pos.x / u.width * 2.0 - 1.0;\r
    let ndc_y = -(screen_pos.y / u.height * 2.0 - 1.0);\r
    let clip = vec4f(ndc_x, ndc_y, ndc_z, 1.0);\r
    let world4 = u.particle_inv_vp * clip;\r
    return world4.xyz / world4.w;\r
}\r
\r
// Resolve per-element depth: use the element's own NDC depth if set (>0),\r
// otherwise fall back to the global reference depth (camera target plane).\r
fn elem_depth(ei: u32) -> f32 {\r
    let d = elems[ei].depth;\r
    return select(u.ref_depth, d, d > 0.0001);\r
}\r
\r
// Spawn a random point on the perimeter of an element's screen-space rect.\r
// Returns SCREEN-PIXEL coordinates (call screen_to_world to convert).\r
fn spawn_on_perimeter(elem_idx: u32, seed: u32) -> vec2f {\r
    let e  = elems[elem_idx];\r
    let ex = e.rect.x;\r
    let ey = e.rect.y;\r
    let ew = e.rect.z;\r
    let eh = e.rect.w;\r
    let perim = 2.0 * (ew + eh);\r
    let t = rand_f(seed) * perim;\r
\r
    if t < ew        { return vec2f(ex + t, ey); }\r
    if t < ew + eh   { return vec2f(ex + ew, ey + (t - ew)); }\r
    if t < 2.0*ew+eh { return vec2f(ex + ew - (t - ew - eh), ey + eh); }\r
    return vec2f(ex, ey + eh - (t - 2.0 * ew - eh));\r
}\r
\r
fn outward_normal(pos: vec2f, elem_idx: u32) -> vec2f {\r
    let e  = elems[elem_idx];\r
    let cx = e.rect.x + e.rect.z * 0.5;\r
    let cy = e.rect.y + e.rect.w * 0.5;\r
    return normalize(pos - vec2f(cx, cy) + vec2f(0.001, 0.001));\r
}\r
\r
// Convert a 2D screen-space outward normal to a world-space direction.\r
// For 2D: maps directly (x, y, 0). For 3D: uses the projection to\r
// find the world-space direction corresponding to a screen offset.\r
fn normal_to_world(n: vec2f, center_world: vec3f, center_screen: vec2f) -> vec3f {\r
    let offset_world = screen_to_world(center_screen + n * 10.0);\r
    let d = offset_world - center_world;\r
    let len = length(d);\r
    if len < 0.0001 { return vec3f(n.x, n.y, 0.0); }\r
    return d / len;\r
}\r
\r
fn park_dead(idx: u32) {\r
    var p = particles[idx];\r
    p.pos  = vec3f(-9999.0);\r
    p.vel  = vec3f(0.0);\r
    p.life = 0.0;\r
    p.size = 0.0;\r
    particles[idx] = p;\r
}\r
\r
// Returns the kind of the currently hovered element, or -1.0 if none.\r
fn hovered_elem_kind() -> f32 {\r
    let hi = i32(u.hover_elem);\r
    if hi < 0 || hi >= i32(u.element_count) { return -1.0; }\r
    return elems[u32(hi)].kind;\r
}\r
\r
// Returns true if this hover-based effect should spawn on the hovered element.\r
// Regular elements (kind < 8) allow all effects.\r
// Preview containers (kind 8-11) only allow their matching effect.\r
// In 3D views (scene3d=4, hypergraph=5), skip structural elements (kind=0)\r
// like the view-container — effects should only apply to scene objects.\r
fn hover_allows(fx_kind: f32) -> bool {\r
    let hk = hovered_elem_kind();\r
    if hk < 0.0 { return false; }       // nothing hovered\r
    // Skip structural elements in 3D views\r
    let is_3d_view = u.current_view >= 4.0 && u.current_view <= 5.0;\r
    if is_3d_view && hk < 0.5 { return false; }\r
    if hk < 7.5 { return true; }        // regular element — all effects\r
    return abs(hk - fx_kind) < 0.5;     // preview — must match\r
}\r
\r
// Decode particle kind from packed kind_view field.\r
fn p_kind(p: Particle) -> u32 { return u32(p.kind_view) % 8u; }\r
// Decode view_id from packed kind_view field.\r
fn p_view(p: Particle) -> u32 { return (u32(p.kind_view) / 8u) % 8u; }\r
// Check if particle is screen-space (not 3D world-space).\r
fn p_is_screen_space(p: Particle) -> bool { return u32(p.kind_view) >= 64u; }\r
\r
// ---- metal spark physics (at mouse cursor, continuous while hovering) --------\r
\r
fn update_metal_spark(idx: u32) {\r
    // Speed == 0 means sparks are disabled — buffer already zeroed by CPU\r
    if u.spark_speed <= 0.0 { return; }\r
\r
    var p  = particles[idx];\r
    let dt = u.delta_time;\r
    let hover_idx = i32(u.hover_elem);\r
    let spd = u.spark_speed;\r
    let ws  = u.world_scale;  // world units per screen pixel\r
\r
    // Respect spark count limit — park excess sparks\r
    let spark_frac = select(1.0, u.spark_count, u.spark_count > 0.0);\r
    let max_sparks = u32(f32(SPARK_END) * clamp(spark_frac, 0.0, 2.0));\r
    if idx >= max_sparks {\r
        park_dead(idx);\r
        return;\r
    }\r
\r
    p.life -= dt * spd;\r
\r
    if p.life <= 0.0 {\r
        if hover_idx < 0 || hover_idx >= i32(u.element_count)\r
           || !hover_allows(KIND_FX_SPARK) {\r
            park_dead(idx);\r
            return;\r
        }\r
\r
        let ei = u32(hover_idx);\r
        let is_screen = is_elem_screen_space(ei);\r
        let seed = idx * 7919u + u32(u.time * 5000.0);\r
\r
        // Spawn at mouse cursor\r
        let base_angle = rand_f(seed) * 6.2832;\r
        let scatter_r  = 5.0 + rand_f(seed + 1u) * 35.0;\r
        let scatter = vec2f(cos(base_angle), sin(base_angle)) * scatter_r;\r
        let cursor_screen = vec2f(u.mouse_x, u.mouse_y);\r
        let spawn_screen  = cursor_screen + scatter;\r
\r
        let spread = (rand_f(seed + 2u) - 0.5) * 0.87;  // ±25°\r
        let spread_angle = base_angle + spread;\r
        let screen_dir = vec2f(cos(spread_angle), sin(spread_angle));\r
\r
        if is_screen {\r
            // Screen-space: position IS screen pixels\r
            p.pos = vec3f(spawn_screen, 0.0);\r
            // Velocity in screen pixels per second\r
            let since_hover = u.time - u.hover_start_time;\r
            let burst_mult = select(0.5, 1.2, since_hover < BURST_WINDOW);\r
            let speed = (40.0 + rand_f(seed + 3u) * 100.0) * burst_mult * spd;\r
            p.vel = vec3f(screen_dir * speed, 0.0);\r
        } else {\r
            // World-space: unproject to world\r
            p.pos = screen_to_world(spawn_screen);\r
            let cursor_world = screen_to_world(cursor_screen);\r
            let vel_dir = normal_to_world(screen_dir, cursor_world, cursor_screen);\r
            let since_hover = u.time - u.hover_start_time;\r
            let burst_mult = select(0.5, 1.2, since_hover < BURST_WINDOW);\r
            let speed = (40.0 + rand_f(seed + 3u) * 100.0) * burst_mult * spd * ws;\r
            p.vel = vel_dir * speed;\r
        }\r
\r
        p.max_life = 0.5 + rand_f(seed + 5u) * 0.8;\r
        p.life     = p.max_life;\r
        p.hue      = rand_f(seed + 6u) * 0.12;\r
        p.size     = (1.0 + rand_f(seed + 7u) * 2.0) * max(u.spark_size, 0.01);\r
        p.kind_view = PK_METAL_SPARK + u.current_view * 8.0 + select(0.0, PK_SCREEN_SPACE, is_screen);\r
        p.spawn_t  = u.time;\r
    } else {\r
        let is_screen = p_is_screen_space(p);\r
        // Moderate drag — particles trail behind with gravity\r
        p.vel = p.vel * (1.0 - 2.0 * dt * spd);\r
        // Gravity pulls "down" — screen Y positive, world Y negative\r
        let grav_scale = select(ws, 1.0, is_screen);\r
        p.vel = p.vel + particle_up(is_screen) * -80.0 * dt * spd * grav_scale;\r
        p.pos = p.pos + p.vel * dt * spd;\r
    }\r
\r
    particles[idx] = p;\r
}\r
\r
// ---- ember / ash physics (continuous rising embers) -------------------------\r
\r
fn update_ember(idx: u32) {\r
    // Speed == 0 means embers are disabled — buffer already zeroed by CPU\r
    if u.ember_speed <= 0.0 { return; }\r
\r
    var p  = particles[idx];\r
    let dt = u.delta_time;\r
    let hover_idx = i32(u.hover_elem);\r
    let spd = u.ember_speed;\r
    let ws  = u.world_scale;\r
\r
    // Respect ember count limit\r
    let ember_frac = select(1.0, u.ember_count, u.ember_count > 0.0);\r
    let max_embers = u32(f32(EMBER_END - SPARK_END) * clamp(ember_frac, 0.0, 2.0));\r
    if (idx - SPARK_END) >= max_embers {\r
        park_dead(idx);\r
        return;\r
    }\r
\r
    p.life -= dt * spd;\r
\r
    if p.life <= 0.0 {\r
        if hover_idx < 0 || hover_idx >= i32(u.element_count)\r
           || !hover_allows(KIND_FX_EMBER) {\r
            park_dead(idx);\r
            return;\r
        }\r
\r
        let ei   = u32(hover_idx);\r
        let is_screen = is_elem_screen_space(ei);\r
        let seed = idx * 7919u + u32(u.time * 1000.0);\r
\r
        let screen_pos = spawn_on_perimeter(ei, seed);\r
        let normal = outward_normal(screen_pos, ei);\r
        let speed  = 10.0 + rand_f(seed + 3u) * 25.0;\r
        let up_speed = 20.0 + rand_f(seed + 4u) * 15.0;\r
\r
        if is_screen {\r
            // Screen-space: position IS pixels, velocity in pixels/sec\r
            p.pos = vec3f(screen_pos, 0.0);\r
            // Rise upward (screen Y negative) + outward drift\r
            let up = particle_up(true);\r
            let vel_screen = vec3f(normal * speed * 0.5, 0.0) + up * up_speed;\r
            p.vel = vel_screen * spd;\r
        } else {\r
            // World-space: unproject position and directions\r
            p.pos = screen_to_world_at(screen_pos, elem_depth(ei));\r
            let e_center = vec2f(elems[ei].rect.x + elems[ei].rect.z * 0.5,\r
                                 elems[ei].rect.y + elems[ei].rect.w * 0.5);\r
            let n_world = normal_to_world(normal, screen_to_world_at(e_center, elem_depth(ei)), e_center);\r
            p.vel = (n_world * speed * 0.5 + world_up() * up_speed) * spd * ws;\r
        }\r
\r
        p.max_life = 1.0 + rand_f(seed + 5u) * 1.5;\r
        p.life     = p.max_life;\r
\r
        let r = rand_f(seed + 6u);\r
        if r < 0.80 {\r
            p.hue = rand_f(seed + 8u) * 0.12;\r
        } else {\r
            p.hue = 0.25 + rand_f(seed + 8u) * 0.15;\r
        }\r
\r
        p.size     = (0.4 + rand_f(seed + 7u) * 1.0) * max(u.ember_size, 0.01);\r
        p.kind_view = PK_EMBER + u.current_view * 8.0 + select(0.0, PK_SCREEN_SPACE, is_screen);\r
        p.spawn_t  = u.time;\r
    } else {\r
        let is_screen = p_is_screen_space(p);\r
        let scale = select(ws, 1.0, is_screen);\r
        let drift = sin(u.time * 2.0 + f32(idx) * 0.3) * 8.0 * scale;\r
        // Drift sideways + continue rising in appropriate space\r
        let up = particle_up(is_screen);\r
        let rt = particle_right();\r
        p.vel = p.vel * (1.0 - 1.5 * dt * spd) + rt * drift * dt * spd + up * 25.0 * dt * spd * scale;\r
        p.pos = p.pos + p.vel * dt * spd;\r
    }\r
\r
    particles[idx] = p;\r
}\r
\r
// ---- angelic beam physics (pixel-thin vertical rays from selected/opened) ---\r
\r
fn update_god_ray(idx: u32) {\r
    // Speed == 0 means beams are disabled — buffer already zeroed by CPU\r
    if u.beam_speed <= 0.0 { return; }\r
\r
    var p  = particles[idx];\r
    let dt = u.delta_time;\r
    let spd = u.beam_speed;\r
    let ws  = u.world_scale;\r
\r
    // Beam source: selected element, hovered beam-preview, or any hovered element\r
    // (allows beams on hover in 3D views like hypergraph)\r
    var beam_src = i32(u.selected_elem);\r
    let hover_idx = i32(u.hover_elem);\r
    let is_3d_view = u.current_view >= 4.0 && u.current_view <= 5.0;\r
    if hover_idx >= 0 && hover_idx < i32(u.element_count) {\r
        let hk = elems[u32(hover_idx)].kind;\r
        if abs(hk - KIND_FX_BEAM) < 0.5 {\r
            // Beam-preview container always wins\r
            beam_src = hover_idx;\r
        } else if beam_src < 0 {\r
            // No selected element → fall back to hovered element\r
            // But skip structural elements (kind=0) in 3D views — these are\r
            // containers like view-container/hypergraph-container, not scene objects\r
            let is_structural = hk < 0.5;\r
            if !is_3d_view || !is_structural {\r
                beam_src = hover_idx;\r
            }\r
        }\r
    }\r
\r
    // Respect beam count limit — park excess beams\r
    let max_beams = u32(u.beam_count);\r
    if max_beams > 0u && (idx - EMBER_END) >= max_beams {\r
        park_dead(idx);\r
        return;\r
    }\r
\r
    p.life -= dt * spd;\r
\r
    if p.life <= 0.0 {\r
        if beam_src < 0 || beam_src >= i32(u.element_count) {\r
            park_dead(idx);\r
            return;\r
        }\r
\r
        let ei   = u32(beam_src);\r
        let is_screen = is_elem_screen_space(ei);\r
        let seed = idx * 7919u + u32(u.time * 800.0);\r
\r
        let screen_pos = spawn_on_perimeter(ei, seed);\r
        let drift_scale = select(1.0, u.beam_drift, u.beam_drift > 0.0);\r
        let up_speed = (12.0 + rand_f(seed + 3u) * 10.0) * drift_scale;\r
        let side_drift = (rand_f(seed + 2u) - 0.5) * 2.0;\r
\r
        if is_screen {\r
            // Screen-space: position IS pixels, velocity in pixels/sec\r
            p.pos = vec3f(screen_pos, 0.0);\r
            let up = particle_up(true);\r
            let rt = particle_right();\r
            p.vel = (rt * side_drift + up * up_speed) * spd;\r
            // Size in pixels\r
            p.size = 0.6 + rand_f(seed + 6u) * 1.0;\r
        } else {\r
            // World-space: unproject position\r
            p.pos = screen_to_world_at(screen_pos, elem_depth(ei));\r
            let up = world_up();\r
            let rt = world_right();\r
            p.vel = (rt * side_drift + up * up_speed) * spd * ws;\r
            // Size in WORLD units (pixel-equivalent × ws)\r
            p.size = (0.6 + rand_f(seed + 6u) * 1.0) * ws;\r
        }\r
\r
        p.max_life = 2.0 + rand_f(seed + 4u) * 2.0;\r
        p.life     = p.max_life;\r
        p.hue      = 0.08 + rand_f(seed + 5u) * 0.06;\r
        p.kind_view = PK_GOD_RAY + u.current_view * 8.0 + select(0.0, PK_SCREEN_SPACE, is_screen);\r
        p.spawn_t  = u.time;\r
    } else {\r
        let is_screen = p_is_screen_space(p);\r
        let scale = select(ws, 1.0, is_screen);\r
        let sway = sin(u.time * 1.5 + f32(idx) * 0.7) * 1.5 * scale;\r
        // Sway sideways, drift upward\r
        let rt = particle_right();\r
        p.vel = p.vel * (1.0 - 0.5 * dt * spd) + rt * sway * dt * spd;\r
        // Dampen along up direction\r
        let up = particle_up(is_screen);\r
        let vel_up = dot(p.vel, up);\r
        p.vel = p.vel - up * vel_up * 0.2 * dt * spd;\r
        p.pos = p.pos + p.vel * dt * spd;\r
    }\r
\r
    particles[idx] = p;\r
}\r
\r
// ---- angelic glitter physics (around hovered element border) ----------------\r
\r
fn update_glitter(idx: u32) {\r
    // Speed == 0 means glitter is disabled — buffer already zeroed by CPU\r
    if u.glitter_speed <= 0.0 { return; }\r
\r
    var p  = particles[idx];\r
    let dt = u.delta_time;\r
    let hover_idx = i32(u.hover_elem);\r
    let spd = u.glitter_speed;\r
    let ws  = u.world_scale;\r
\r
    // Respect glitter count limit\r
    let glitter_frac = select(1.0, u.glitter_count, u.glitter_count > 0.0);\r
    let max_glitter = u32(f32(GLITTER_END - RAY_END) * clamp(glitter_frac, 0.0, 2.0));\r
    if (idx - RAY_END) >= max_glitter {\r
        park_dead(idx);\r
        return;\r
    }\r
\r
    p.life -= dt * spd;\r
\r
    if p.life <= 0.0 {\r
        if hover_idx < 0 || hover_idx >= i32(u.element_count)\r
           || !hover_allows(KIND_FX_GLITTER) {\r
            park_dead(idx);\r
            return;\r
        }\r
\r
        let ei   = u32(hover_idx);\r
        let seed = idx * 7919u + u32(u.time * 1200.0);\r
        let is_screen = is_elem_screen_space(ei);\r
\r
        // Spawn on the hovered element perimeter\r
        let screen_pos = spawn_on_perimeter(ei, seed);\r
\r
        // Position: screen-space elements store screen pixels directly,\r
        // world-space elements go through inverse viewProj\r
        if is_screen {\r
            p.pos = vec3f(screen_pos, 0.0);\r
        } else {\r
            p.pos = screen_to_world_at(screen_pos, elem_depth(ei));\r
        }\r
\r
        // Velocity: tangential drift along border\r
        let norm    = outward_normal(screen_pos, ei);\r
        let tangent = vec2f(-norm.y, norm.x);\r
        let tang_dir = select(-1.0, 1.0, rand_f(seed + 2u) > 0.5);\r
\r
        if is_screen {\r
            // Screen-space: velocity in pixel units (no ws scaling)\r
            let vel_2d = tangent * tang_dir * (4.0 + rand_f(seed + 3u) * 10.0)\r
                       + norm * (0.5 + rand_f(seed + 4u) * 2.5);\r
            p.vel = vec3f(vel_2d * spd, 0.0);\r
        } else {\r
            // World-space: convert 2D screen directions to world directions\r
            let e_center = vec2f(elems[ei].rect.x + elems[ei].rect.z * 0.5,\r
                                 elems[ei].rect.y + elems[ei].rect.w * 0.5);\r
            let center_world = screen_to_world_at(e_center, elem_depth(ei));\r
            let tang_world = normal_to_world(tangent, center_world, e_center);\r
            let norm_world = normal_to_world(norm, center_world, e_center);\r
            p.vel = (tang_world * tang_dir * (4.0 + rand_f(seed + 3u) * 10.0)\r
                  + norm_world * (0.5 + rand_f(seed + 4u) * 2.5)) * spd * ws;\r
        }\r
\r
        p.max_life = 0.8 + rand_f(seed + 5u) * 1.5;\r
        p.life     = p.max_life;\r
        p.hue      = rand_f(seed + 6u);\r
        p.size     = (0.6 + rand_f(seed + 7u) * 1.2) * max(u.glitter_size, 0.01);\r
        // Pack: kind + view_id * 8 + (is_screen ? 64 : 0)\r
        p.kind_view = PK_GLITTER + u.current_view * 8.0 + select(0.0, PK_SCREEN_SPACE, is_screen);\r
        p.spawn_t  = u.time;\r
    } else {\r
        // Update: check if this particle is screen-space\r
        let is_screen = p_is_screen_space(p);\r
        let up = particle_up(is_screen);\r
        let rt = particle_right();\r
\r
        if is_screen {\r
            // Screen-space: velocity in pixels, no ws scaling\r
            let sway = sin(u.time * 4.0 + f32(idx) * 1.3) * 4.0;\r
            p.vel = p.vel * (1.0 - 3.0 * dt * spd) + rt * sway * dt * spd + up * 1.5 * dt * spd;\r
        } else {\r
            // World-space: velocity scaled by ws\r
            let sway = sin(u.time * 4.0 + f32(idx) * 1.3) * 4.0 * ws;\r
            p.vel = p.vel * (1.0 - 3.0 * dt * spd) + rt * sway * dt * spd + up * 1.5 * dt * spd * ws;\r
        }\r
        p.pos = p.pos + p.vel * dt * spd;\r
    }\r
\r
    particles[idx] = p;\r
}\r
\r
// ---- compute entry point ----------------------------------------------------\r
\r
@compute @workgroup_size(64)\r
fn cs_main(@builtin(global_invocation_id) gid: vec3u) {\r
    let idx   = gid.x;\r
    let total = arrayLength(&particles);\r
    if idx >= total { return; }\r
\r
    // Shift live particles by scroll delta (2D views only).\r
    // In 2D, "world space" = screen pixels, so scroll delta is a direct\r
    // world-space offset. For 3D views, scroll delta is always 0.\r
    if !is_3d_view() {\r
        let sd = vec2f(u.scroll_dx, u.scroll_dy);\r
        if sd.x != 0.0 || sd.y != 0.0 {\r
            var p = particles[idx];\r
            if p.life > 0.0 {\r
                p.pos = p.pos + vec3f(sd, 0.0);\r
                particles[idx] = p;\r
            }\r
        }\r
    }\r
\r
    if idx < SPARK_END {\r
        update_metal_spark(idx);\r
    } else if idx < EMBER_END {\r
        update_ember(idx);\r
    } else if idx < RAY_END {\r
        update_god_ray(idx);\r
    } else {\r
        update_glitter(idx);\r
    }\r
}\r
`;async function Il(e){if(!("gpu"in navigator))return console.warn("[WgpuOverlay] WebGPU not supported in this browser."),null;const t=await navigator.gpu.requestAdapter();if(!t)return null;const n=await t.requestDevice(),s=e.getContext("webgpu"),i=navigator.gpu.getPreferredCanvasFormat();s.configure({device:n,format:i,alphaMode:"opaque"});const a=Oi+`
`+Tl+`
`+Al+`
`,l=a+Cl+`
`,o=n.createShaderModule({label:"background-shader",code:l+Pl}),d=n.createShaderModule({label:"particle-shader",code:l+Fl}),c=n.createShaderModule({label:"compute-shader",code:a+Ml}),f=n.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),u=n.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:2,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),m=n.createComputePipeline({layout:n.createPipelineLayout({bindGroupLayouts:[f]}),compute:{module:c,entryPoint:"cs_main"}}),y=n.createPipelineLayout({bindGroupLayouts:[u]}),_=n.createRenderPipeline({layout:y,vertex:{module:o,entryPoint:"vs_main"},fragment:{module:o,entryPoint:"fs_main",targets:[{format:i}]},primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"}}),v=n.createRenderPipeline({layout:y,vertex:{module:d,entryPoint:"vs_particle"},fragment:{module:d,entryPoint:"fs_particle",targets:[{format:i,blend:{color:{srcFactor:"one",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one",operation:"add"}}}]},primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"}});return{device:n,format:i,context:s,renderPipeline:_,particlePipeline:v,computePipeline:m,computeBGL:f,renderBGL:u}}const Dl=6,$l=7,Ht=8,Qn=Ht*4,Rn=640,Gi=12,kr=Gi*4,Ll=Rn*kr,Rl=64,bs=0,Hi=96,ys=Hi,Ui=288,ws=Ui,Vi=544,xs=Vi,zl=640,Wi=24,ji=Wi*16;function Yi(e){const t=new Float32Array(Wi*4);let n=0;function s(i,a=1){const[l,o,d]=xl(i);t[n++]=l,t[n++]=o,t[n++]=d,t[n++]=a}return s(e.particleSparkCore),s(e.particleSparkEmber),s(e.particleSparkSteel),s(e.particleEmberHot),s(e.particleBeamCenter),s(e.particleBeamEdge),s(e.particleGlitterWarm),s(e.particleGlitterCool),s(e.cinderEmber),s(e.cinderGold),s(e.cinderAsh),s(e.cinderVine),s(e.smokeCool),s(e.smokeWarm),s(e.smokeMoss),s(e.borderColor),s(e.levelError),s(e.levelWarn),s(e.levelInfo),s(e.levelDebug),s(e.accentGreen),s(e.accentOrange),s(e.levelError),t[n++]=0,t[n++]=0,t[n++]=0,t[n++]=0,t}const ks=128,er=new Float32Array(Rn*Gi);class Nl{constructor(t){this.uniformF32=new Float32Array(88),this._cachedPaletteColors=null,this._cachedPaletteBuf=null,this._generation=0,this.device=t,this.uniformBuffer=t.createBuffer({size:352,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._elemCapacity=ks,this._elemBuffer=t.createBuffer({size:ks*Qn,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.particleBuffer=t.createBuffer({size:Ll,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),t.queue.writeBuffer(this.particleBuffer,0,er),this.paletteBuffer=t.createBuffer({size:ji,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST})}get elemBuffer(){return this._elemBuffer}get elemCapacity(){return this._elemCapacity}get generation(){return this._generation}ensureElemCapacity(t){if(t<=this._elemCapacity)return!1;const n=Math.max(t,this._elemCapacity*2),s=this._elemBuffer;return this._elemBuffer=this.device.createBuffer({size:n*Qn,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this._elemCapacity=n,this._generation++,s.destroy(),!0}uploadElements(t,n){const s=this.ensureElemCapacity(n);return n>0&&this.device.queue.writeBuffer(this._elemBuffer,0,t.buffer,t.byteOffset,n*Qn),s}uploadUniforms(){this.device.queue.writeBuffer(this.uniformBuffer,0,this.uniformF32.buffer)}uploadPalette(t){t!==this._cachedPaletteColors&&(this._cachedPaletteColors=t,this._cachedPaletteBuf=Yi(t),this.device.queue.writeBuffer(this.paletteBuffer,0,this._cachedPaletteBuf.buffer))}resetParticles(){this.device.queue.writeBuffer(this.particleBuffer,0,er)}resetParticleRange(t,n){const s=t*kr;this.device.queue.writeBuffer(this.particleBuffer,s,er.buffer,0,n*kr)}destroy(){this.uniformBuffer.destroy(),this._elemBuffer.destroy(),this.particleBuffer.destroy(),this.paletteBuffer.destroy()}}function Bl(e,t){return e.filter(n=>{const s=n.ref.deref();return!!s&&t.has(s)})}function Ol(e){for(const t of e)t.rectStale=!0}function Gl(e){let t=!1;const n=window.innerHeight;for(const s of e){if(!s.rectStale||!s.visible&&s.rect)continue;const i=s.ref.deref();if(!i)continue;const a=i.getBoundingClientRect();if(s.rectStale=!1,a.width===0||a.height===0){s.rect&&(s.rect=null,t=!0);continue}if(a.bottom<0||a.top>n){s.rect&&(s.rect=null,t=!0);continue}const l=s.rect;(!l||l.left!==a.left||l.top!==a.top||l.width!==a.width||l.height!==a.height)&&(s.rect=a,t=!0)}return t}function Hl(e){let t=0;for(const a of e.tracked)a.rect&&t++;let n=e.capacity,s=e.data;t>n&&(n=Math.max(t,n*2),s=new Float32Array(n*Ht)),s.fill(0);let i=0;for(const a of e.tracked)!a.rect||!e.priorityIndices.has(a.selectorIdx)||(Ss(s,i,a),i++);for(const a of e.tracked)!a.rect||e.priorityIndices.has(a.selectorIdx)||(Ss(s,i,a),i++);return{data:s,count:i,capacity:n}}function Ss(e,t,n){const s=t*Ht;e[s]=n.rect.left,e[s+1]=n.rect.top,e[s+2]=n.rect.width,e[s+3]=n.rect.height,e[s+4]=n.hue,e[s+5]=n.kind;const i=n.ref.deref();e[s+6]=i&&parseFloat(i.getAttribute("data-depth")??"0")||0}function Es(e,t){var n,s;if(e.elementMap.has(t))return!1;for(const i of e.scanOrder){const a=e.selectorMeta[i];try{if(t.matches(a.sel)){const l=Wr(t,i,a);return e.tracked.push(l),e.elementMap.set(t,l),(n=e.io)==null||n.observe(t),(s=e.ro)==null||s.observe(t),!0}}catch{}}return!1}function Ul(e,t){let n=Es(e,t);const s=t.querySelectorAll("*");for(let i=0;i<s.length;i++)n=Es(e,s[i])||n;return n}function Cs(e,t,n,s){e.get(s)&&(e.delete(s),t==null||t.unobserve(s),n==null||n.unobserve(s))}function Vl(e,t,n,s){Cs(e,t,n,s);const i=s.querySelectorAll("*");for(let a=0;a<i.length;a++)Cs(e,t,n,i[a])}function Wl(e,t){var i,a,l,o;const n=e.elementMap.get(t);let s=!1;for(const d of e.scanOrder){const c=e.selectorMeta[d];try{if(t.matches(c.sel)){if(n)(n.kind!==c.kind||n.hue!==c.hue)&&(s=!0),n.selectorIdx=d,n.kind=c.kind,n.hue=c.hue,n.rectStale=!0;else{const f=Wr(t,d,c);e.tracked.push(f),e.elementMap.set(t,f),(i=e.io)==null||i.observe(t),(a=e.ro)==null||a.observe(t)}return{rectsStale:!0,dataStale:s}}}catch{}}return n?(e.elementMap.delete(t),(l=e.io)==null||l.unobserve(t),(o=e.ro)==null||o.unobserve(t),{rectsStale:!1,dataStale:s}):{rectsStale:!1,dataStale:s}}function jl(e){var s,i;for(const a of e.tracked){const l=a.ref.deref();l&&((s=e.io)==null||s.unobserve(l),(i=e.ro)==null||i.unobserve(l))}const t=[],n=new Map;for(const a of e.priorityIndices){const l=e.selectorMeta[a];l&&Ts({tracked:t,elementMap:n,io:e.io,ro:e.ro},a,l)}for(let a=0;a<e.selectorMeta.length;a++){if(e.priorityIndices.has(a))continue;const l=e.selectorMeta[a];Ts({tracked:t,elementMap:n,io:e.io,ro:e.ro},a,l)}return{tracked:t,elementMap:n}}function Wr(e,t,n){return{ref:new WeakRef(e),selectorIdx:t,kind:n.kind,hue:n.hue,rect:null,visible:!0,rectStale:!0}}function Ts(e,t,n){var i,a;const s=document.querySelectorAll(n.sel);for(let l=0;l<s.length;l++){const o=s[l];if(e.elementMap.has(o))continue;const d=Wr(o,t,n);e.tracked.push(d),e.elementMap.set(o,d),(i=e.io)==null||i.observe(o),(a=e.ro)==null||a.observe(o)}}function Yl(e){const t=new IntersectionObserver(i=>{for(const a of i){const l=e.elementMap.get(a.target);l&&(l.visible=a.isIntersecting,a.isIntersecting&&(l.rectStale=!0,e.onRectsStale()))}},{threshold:0}),n=new ResizeObserver(i=>{for(const a of i){const l=e.elementMap.get(a.target);l&&(l.rectStale=!0,e.onRectsStale())}}),s=new MutationObserver(i=>{e.onProcessMutations(i)});return{io:t,ro:n,mo:s}}const As=128,ql=50;class Kl{constructor(t,n){this._count=0,this._tracked=[],this._elementMap=new Map,this._io=null,this._ro=null,this._mo=null,this._fullRescanPending=!0,this._rectsStale=!1,this._dataStale=!1,this._scrollDx=0,this._scrollDy=0,this._justDidFullRescan=!1,this._onScroll=i=>{this._markAllRectsStale();const a=i.target,l=a===document||a===document.documentElement?document.documentElement:a,o=l,d=this._scrollPositions.get(o),c=l.scrollLeft,f=l.scrollTop;d?(this._scrollDx-=c-d.x,this._scrollDy-=f-d.y,d.x=c,d.y=f):this._scrollPositions.set(o,{x:c,y:f})},this._onResize=()=>{this._markAllRectsStale()},this._scrollPositions=new Map,this._scrollDeltaResult={dx:0,dy:0},this._selectorMeta=t,this._priorityIndices=n;const s=[];for(const i of n)s.push(i);for(let i=0;i<t.length;i++)n.has(i)||s.push(i);this._scanOrder=s,this._capacity=As,this._data=new Float32Array(As*Ht)}get data(){return this._data}get count(){return this._count}get capacity(){return this._capacity}consumeScrollDelta(){return this._scrollDeltaResult.dx=this._scrollDx,this._scrollDeltaResult.dy=this._scrollDy,this._scrollDx=0,this._scrollDy=0,this._scrollDeltaResult}get didFullRescan(){return this._justDidFullRescan}start(){const t=Yl({elementMap:this._elementMap,onRectsStale:()=>{this._rectsStale=!0},onProcessMutations:n=>{this._processMutations(n)}});this._io=t.io,this._ro=t.ro,this._mo=t.mo,this._mo.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class","style"]}),window.addEventListener("scroll",this._onScroll,!0),window.addEventListener("resize",this._onResize),this._fullRescanPending=!0}destroy(){var t,n,s;(t=this._io)==null||t.disconnect(),this._io=null,(n=this._ro)==null||n.disconnect(),this._ro=null,(s=this._mo)==null||s.disconnect(),this._mo=null,window.removeEventListener("scroll",this._onScroll,!0),window.removeEventListener("resize",this._onResize),this._tracked=[],this._elementMap.clear(),this._scrollPositions.clear(),this._count=0}invalidateAll(){this._fullRescanPending=!0}updateFrame(){let t=!1;return this._justDidFullRescan=!1,this._fullRescanPending&&(this._fullRescan(),this._fullRescanPending=!1,this._justDidFullRescan=!0,this._scrollPositions.clear(),this._scrollDx=0,this._scrollDy=0,t=!0),this._compactDead()&&(t=!0),(this._rectsStale||t)&&(this._measureStaleRects()&&(t=!0),this._rectsStale=!1),this._dataStale&&(t=!0,this._dataStale=!1),t&&this._rebuildData(),t}_processMutations(t){let n=0,s=!1;for(const i of t)if(i.type==="childList"){s=!0;for(let a=0;a<i.removedNodes.length;a++){const l=i.removedNodes[a];l.nodeType===Node.ELEMENT_NODE&&this._removeTrackedTree(l)}n+=i.addedNodes.length}else if(i.type==="attributes"){const a=i.target;if(a.nodeType===Node.ELEMENT_NODE){i.attributeName==="class"&&this._reclassifyElement(a);const l=this._elementMap.get(a);l&&(l.rectStale=!0,this._rectsStale=!0)}}if(n>ql)this._fullRescanPending=!0;else if(n>0){for(const i of t)if(i.type==="childList")for(let a=0;a<i.addedNodes.length;a++){const l=i.addedNodes[a];l.nodeType===Node.ELEMENT_NODE&&this._addTrackedTree(l)}}s&&this._markAllRectsStale()}_addTrackedTree(t){Ul({tracked:this._tracked,elementMap:this._elementMap,io:this._io,ro:this._ro,selectorMeta:this._selectorMeta,scanOrder:this._scanOrder},t)&&(this._rectsStale=!0)}_removeTrackedTree(t){Vl(this._elementMap,this._io,this._ro,t)}_reclassifyElement(t){const n=Wl({tracked:this._tracked,elementMap:this._elementMap,io:this._io,ro:this._ro,selectorMeta:this._selectorMeta,scanOrder:this._scanOrder},t);n.rectsStale&&(this._rectsStale=!0),n.dataStale&&(this._dataStale=!0)}_fullRescan(){const t=jl({tracked:this._tracked,io:this._io,ro:this._ro,selectorMeta:this._selectorMeta,priorityIndices:this._priorityIndices});this._tracked=t.tracked,this._elementMap=t.elementMap}_compactDead(){const t=this._tracked.length;return this._tracked=Bl(this._tracked,this._elementMap),this._tracked.length!==t}_markAllRectsStale(){Ol(this._tracked),this._rectsStale=!0}_measureStaleRects(){return Gl(this._tracked)}_rebuildData(){const t=Hl({tracked:this._tracked,priorityIndices:this._priorityIndices,capacity:this._capacity,data:this._data});this._data=t.data,this._count=t.count,this._capacity=t.capacity}}const qe=Z(!0),gt=Z(!0),Yn=Z(null),jr=new Set;function qi(e){jr.add(e)}function Ki(e){jr.delete(e)}function Ps(){return jr}let zn=null;function Xi(){return new Promise(e=>{zn=e})}function Xl(){return zn!=null}function Zl(){const e=zn;return zn=null,e}let An=null;function Zi(e){An=e}function Jl(){An==null||An()}let Ji=new Float32Array(16),Qi=new Float32Array(16),Sr=!1;function ea(e,t){Ji=e,Qi=t,Sr=!0}function Ql(){return Ji}function eo(){return Qi}function to(){const e=Sr;return Sr=!1,e}const Qt=[0,0,0,0];function ta(e,t,n,s){Qt[0]=e,Qt[1]=t,Qt[2]=n,Qt[3]=s}function no(){return Qt}let na=0;function ra(e){na=e}function ro(){return na}let sa=1;function ia(e){sa=e}function so(){return sa}const Pn=[0,0,0];function aa(e,t,n){Pn[0]=e,Pn[1]=t,Pn[2]=n}function io(){return Pn}function ao(e){const{uniforms:t,canvas:n,schema:s,effects:i,fxEnabled:a,count:l,mx:o,my:d,dt:c,time:f,hoverIdx:u,hoverStartTime:m,selectedIdx:y,scrollDelta:_}=e;t[0]=f,t[1]=n.width,t[2]=n.height,t[3]=a?l:0,t[4]=a?o:-9999,t[5]=a?d:-9999,t[6]=c,t[7]=a?u:-1,t[8]=m,t[9]=a?y:-1;const v=a&&i.crtEnabled;t[10]=v?i.crtScanlinesH/100:0,t[11]=v?i.crtScanlinesV/100:0,t[12]=v?i.crtEdgeShadow/100:0,t[13]=v?i.crtFlicker/100:0,t[14]=v?i.crtLineWidth/100:0,t[15]=a&&i.smokeEnabled?i.smokeIntensity/100:0,t[16]=a&&i.smokeEnabled?i.smokeSpeed/100:0,t[17]=a&&i.smokeEnabled?i.smokeWarmScale/100:0,t[18]=a&&i.smokeEnabled?i.smokeCoolScale/100:0,t[19]=a&&i.smokeEnabled?i.smokeMossScale/100:0,t[20]=a?i.grainIntensity/100:0,t[21]=a?i.grainCoarseness/100:0,t[22]=a?i.grainSize/100:0,t[23]=a?i.vignetteStrength/100:0,t[24]=a?i.underglowStrength/100:0,t[25]=a&&i.sparksEnabled?i.sparkSpeed/100:0,t[26]=a&&i.embersEnabled?i.emberSpeed/100:0,t[27]=a&&i.beamsEnabled?i.beamSpeed/100:0,t[28]=a&&i.glitterEnabled?i.glitterSpeed/100:0,t[29]=a?i.beamHeight:0,t[30]=a?i.beamCount:0,t[31]=a?i.beamDrift/100:0,t[32]=_.dx,t[33]=_.dy,t[34]=a&&i.sparksEnabled?i.sparkCount/100:0,t[35]=a&&i.sparksEnabled?i.sparkSize/100:0,t[36]=a&&i.embersEnabled?i.emberCount/100:0,t[37]=a&&i.embersEnabled?i.emberSize/100:0,t[38]=a&&i.glitterEnabled?i.glitterCount/100:0,t[39]=a&&i.glitterEnabled?i.glitterSize/100:0,t[40]=a&&i.cinderEnabled?i.cinderSize/100:0;const x=i.crtColor??[100,80,60];t[48]=v?x[0]/255:0,t[49]=v?x[1]/255:0,t[50]=v?x[2]/255:0,t[51]=0;const k=s.isActive3DView(),p=n.width,h=n.height;if(k&&to()){const g=no();t[41]=ro(),t[42]=so(),t[43]=g[0],t[44]=g[1],t[45]=g[2],t[46]=g[3];const b=io();t[52]=b[0],t[53]=b[1],t[54]=b[2],t[55]=0,t.set(Ql(),56),t.set(eo(),72)}else k||(t[41]=0,t[42]=1,t[43]=0,t[44]=0,t[45]=p,t[46]=h,t[52]=0,t[53]=0,t[54]=0,t[55]=0,t[56]=2/p,t[57]=0,t[58]=0,t[59]=0,t[60]=0,t[61]=-2/h,t[62]=0,t[63]=0,t[64]=0,t[65]=0,t[66]=1,t[67]=0,t[68]=-1,t[69]=1,t[70]=0,t[71]=1,t[72]=p/2,t[73]=0,t[74]=0,t[75]=0,t[76]=0,t[77]=-h/2,t[78]=0,t[79]=0,t[80]=0,t[81]=0,t[82]=1,t[83]=0,t[84]=p/2,t[85]=h/2,t[86]=0,t[87]=1);t[47]=s.getCurrentViewId()}function lo(e,t=192,n=.55){var s,i;try{const a=e.width,l=e.height,o=Math.round(t*l/a),d=t/window.innerWidth,c=o/window.innerHeight,f=document.createElement("canvas");f.width=t,f.height=o;const u=f.getContext("2d");u.drawImage(e,0,0,t,o);const m=document.createTreeWalker(document.body,NodeFilter.SHOW_ELEMENT,{acceptNode(_){const v=_;return v===e||v.tagName==="CANVAS"||v.offsetWidth===0&&v.offsetHeight===0?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});let y;for(;y=m.nextNode();){const _=y,v=_.getBoundingClientRect();if(v.bottom<0||v.top>window.innerHeight||v.right<0||v.left>window.innerWidth||v.width<2||v.height<2)continue;const x=getComputedStyle(_),k=v.left*d,p=v.top*c,h=v.width*d,g=v.height*c,b=x.backgroundColor;b&&b!=="transparent"&&b!=="rgba(0, 0, 0, 0)"&&(u.fillStyle=b,u.fillRect(k,p,h,g));const w=parseFloat(x.borderTopWidth);if(w>=1){const S=x.borderTopColor;S&&S!=="transparent"&&S!=="rgba(0, 0, 0, 0)"&&(u.strokeStyle=S,u.lineWidth=Math.max(.5,w*d),u.strokeRect(k,p,h,g))}if(g>=3&&_.childNodes.length>0&&((s=_.childNodes[0])==null?void 0:s.nodeType)===Node.TEXT_NODE){const S=(i=_.childNodes[0].textContent)==null?void 0:i.trim();if(S&&S.length>0){const C=x.color;if(C&&C!=="transparent"){u.fillStyle=C,u.globalAlpha=.6;const E=Math.max(1,g*.35),A=Math.min(h*.85,S.length*h*.04);u.fillRect(k+h*.05,p+(g-E)/2,A,E),u.globalAlpha=1}}}}return f.toDataURL("image/jpeg",n)}catch{return""}}class oo{constructor(t,n,s,i,a){this.depthTexture=null,this.depthView=null,this.depthW=0,this.depthH=0,this.animId=0,this.cancelled=!1,this.prevTime=performance.now()/1e3,this.startTime=performance.now(),this.mx=-9999,this.my=-9999,this.prevHoverIdx=-1,this.hoverStartTime=0,this.prevRenderMx=-9999,this.prevRenderMy=-9999,this.prevCanvasW=0,this.prevCanvasH=0,this.prevSelectedIdx=-1,this.prevEffects=null,this.prevSparksEnabled=!0,this.prevEmbersEnabled=!0,this.prevBeamsEnabled=!0,this.prevGlitterEnabled=!0,this.frameSkipCounter=0,this.frame=()=>{if(this.cancelled)return;const l=this.scanner,o=l.updateFrame(),d=l.consumeScrollDelta(),c=performance.now()/1e3,f=(performance.now()-this.startTime)/1e3,u=Math.min(c-this.prevTime,.05);this.prevTime=c;const m=l.count,y=l.data,_=this.mx,v=this.my;let x=-1,k=-1;for(let G=0;G<m;G++){const L=G*Ht,z=y[L],q=y[L+1],oe=y[L+2],me=y[L+3];if(_>=z&&_<z+oe&&v>=q&&v<q+me){const te=y[L+5];te>=k&&(x=G,k=te)}}let p=!1;x!==this.prevHoverIdx&&(this.hoverStartTime=f,this.prevHoverIdx=x,p=!0);let h=-1;for(let G=0;G<m;G++){const L=G*Ht,z=y[L+5];if(z===Dl){if(h=G,G===x)break}else z===$l&&h<0&&(h=G)}const g=this.schema.effectSettings.value,b=gt.value,w=b&&(g.sparksEnabled||g.embersEnabled||g.beamsEnabled||g.glitterEnabled),S=!b||(!g.smokeEnabled||g.smokeIntensity===0)&&g.grainIntensity===0,C=b&&(g.smokeEnabled&&g.smokeIntensity>0||g.crtEnabled&&g.crtFlicker>0||x>=0&&(g.cinderEnabled||w)||h>=0&&g.beamsEnabled),E=Ps().size>0,A=_!==this.prevRenderMx||v!==this.prevRenderMy||this.canvas.width!==this.prevCanvasW||this.canvas.height!==this.prevCanvasH||d.dx!==0||d.dy!==0||l.didFullRescan||o||p||h!==this.prevSelectedIdx||g!==this.prevEffects||Xl();if(!C&&!A&&!E){this.animId=requestAnimationFrame(this.frame);return}if(C&&S&&!(g.smokeEnabled&&g.smokeIntensity>0)&&!(g.crtEnabled&&g.crtFlicker>0)&&!0&&!A){if(this.frameSkipCounter=(this.frameSkipCounter+1)%2,this.frameSkipCounter!==0){this.animId=requestAnimationFrame(this.frame);return}}else this.frameSkipCounter=0;this.prevRenderMx=_,this.prevRenderMy=v,this.prevCanvasW=this.canvas.width,this.prevCanvasH=this.canvas.height,this.prevSelectedIdx=h,this.prevEffects=g,!g.sparksEnabled&&this.prevSparksEnabled&&this.buffers.resetParticleRange(bs,Hi-bs),!g.embersEnabled&&this.prevEmbersEnabled&&this.buffers.resetParticleRange(ys,Ui-ys),!g.beamsEnabled&&this.prevBeamsEnabled&&this.buffers.resetParticleRange(ws,Vi-ws),!g.glitterEnabled&&this.prevGlitterEnabled&&this.buffers.resetParticleRange(xs,zl-xs),this.prevSparksEnabled=g.sparksEnabled,this.prevEmbersEnabled=g.embersEnabled,this.prevBeamsEnabled=g.beamsEnabled,this.prevGlitterEnabled=g.glitterEnabled;const P=this.buffers.uniformF32;ao({uniforms:P,canvas:this.canvas,schema:this.schema,effects:g,fxEnabled:b,count:m,mx:_,my:v,dt:u,time:f,hoverIdx:x,hoverStartTime:this.hoverStartTime,selectedIdx:h,scrollDelta:d}),this.buffers.uploadUniforms(),this.buffers.uploadPalette(this.schema.themeColors.value),this.buffers.uploadElements(y,m),this.rebuildBindGroupsIfNeeded();const{device:F,context:D,computePipeline:M,renderPipeline:O,particlePipeline:B}=this.pipelines,I=F.createCommandEncoder();if(this.ensureDepth(this.canvas.width,this.canvas.height),w){const G=I.beginComputePass();G.setPipeline(M),G.setBindGroup(0,this.computeBindGroup),G.dispatchWorkgroups(Math.ceil(Rn/Rl)),G.end()}const R=I.beginRenderPass({colorAttachments:[{view:D.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}],depthStencilAttachment:{view:this.depthView,depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}});R.setPipeline(O),R.setBindGroup(0,this.renderBindGroup),R.draw(6);for(const G of Ps())G(R,F,f,u,this.canvas.width,this.canvas.height,this.depthView);w&&(R.setViewport(0,0,this.canvas.width,this.canvas.height,0,1),R.setScissorRect(0,0,this.canvas.width,this.canvas.height),R.setPipeline(B),R.setBindGroup(0,this.renderBindGroup),R.draw(6,Rn)),R.end(),F.queue.submit([I.finish()]);const W=Zl();W&&W(lo(this.canvas)),this.animId=requestAnimationFrame(this.frame)},this.pipelines=t,this.buffers=n,this.scanner=s,this.canvas=i,this.schema=a,this.lastGeneration=n.generation,this.computeBindGroup=this.buildComputeBindGroup(),this.renderBindGroup=this.buildRenderBindGroup()}buildComputeBindGroup(){const{device:t,computeBGL:n}=this.pipelines,s=this.buffers;return t.createBindGroup({layout:n,entries:[{binding:0,resource:{buffer:s.uniformBuffer}},{binding:1,resource:{buffer:s.elemBuffer}},{binding:2,resource:{buffer:s.particleBuffer}},{binding:3,resource:{buffer:s.paletteBuffer}}]})}buildRenderBindGroup(){const{device:t,renderBGL:n}=this.pipelines,s=this.buffers;return t.createBindGroup({layout:n,entries:[{binding:0,resource:{buffer:s.uniformBuffer}},{binding:1,resource:{buffer:s.elemBuffer}},{binding:2,resource:{buffer:s.particleBuffer}},{binding:3,resource:{buffer:s.paletteBuffer}}]})}rebuildBindGroupsIfNeeded(){const t=this.buffers.generation;t!==this.lastGeneration&&(this.computeBindGroup=this.buildComputeBindGroup(),this.renderBindGroup=this.buildRenderBindGroup(),this.lastGeneration=t)}ensureDepth(t,n){var s;t===this.depthW&&n===this.depthH&&this.depthTexture||((s=this.depthTexture)==null||s.destroy(),this.depthTexture=this.pipelines.device.createTexture({size:[t,n],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),this.depthView=this.depthTexture.createView(),this.depthW=t,this.depthH=n)}setMouse(t,n){this.mx=t,this.my=n}start(){this.cancelled=!1,this.animId=requestAnimationFrame(this.frame)}stop(){this.cancelled=!0,cancelAnimationFrame(this.animId)}}function co(e){return e.map(({sel:t,hue:n,kind:s})=>({sel:t,hue:n,kind:s}))}function uo(e){const t=new Set;return e.forEach(({priority:n},s)=>{n&&t.add(s)}),t}function po({schema:e}){const t=j(null),n=j(null);return ge(()=>{const s=a=>{var l;(l=n.current)==null||l.loop.setMouse(a.clientX,a.clientY)},i=()=>{var a;(a=n.current)==null||a.loop.setMouse(-9999,-9999)};return window.addEventListener("mousemove",s),window.addEventListener("mouseleave",i),()=>{window.removeEventListener("mousemove",s),window.removeEventListener("mouseleave",i)}},[]),ge(()=>(qe.value?document.documentElement.classList.add("gpu-active"):document.documentElement.classList.remove("gpu-active"),()=>document.documentElement.classList.remove("gpu-active")),[qe.value]),ge(()=>(qe.value&&gt.value?document.documentElement.classList.add("fx-active"):document.documentElement.classList.remove("fx-active"),()=>document.documentElement.classList.remove("fx-active")),[qe.value,gt.value]),ge(()=>{var a;if(!qe.value)return;const s=t.current;if(!s)return;const i=()=>{s.width=window.innerWidth,s.height=window.innerHeight,s.style.width=`${window.innerWidth}px`,s.style.height=`${window.innerHeight}px`};return i(),window.addEventListener("resize",i),(a=window.visualViewport)==null||a.addEventListener("resize",i),()=>{var l;window.removeEventListener("resize",i),(l=window.visualViewport)==null||l.removeEventListener("resize",i)}},[qe.value]),ge(()=>{if(!qe.value){Fs(n.current),n.current=null;return}const s=t.current;if(!s)return;let i=!1;async function a(){const l=await Il(s);if(!l||i){l&&l.device.destroy();return}Yn.value={device:l.device,format:l.format};const o=new Nl(l.device),d=co(e.selectors),c=uo(e.selectors),f=new Kl(d,c),u=new oo(l,o,f,s,e),m={pipelines:l,buffers:o,scanner:f,loop:u};n.current=m,Zi(()=>f.invalidateAll()),f.start(),u.start()}return a().catch(console.error),()=>{i=!0,Fs(n.current),n.current=null}},[qe.value]),qe.value?r("canvas",{ref:t,"aria-hidden":"true",style:{position:"fixed",top:0,left:0,width:"100vw",height:"100dvh",pointerEvents:"none",zIndex:-1}}):null}function Fs(e){e&&(e.loop.stop(),e.scanner.destroy(),Zi(null),e.buffers.destroy(),Yn.value=null,e.pipelines.device.destroy())}Z(We),Z(Sl);function un(e,t){return[e[0]-t[0],e[1]-t[1],e[2]-t[2]]}function fo(e,t){return[e[0]+t[0],e[1]+t[1],e[2]+t[2]]}function ho(e,t){return[e[0]*t,e[1]*t,e[2]*t]}function rn(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function Ms(e,t){return[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]]}function pn(e){const t=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);return t<1e-8?[0,0,0]:[e[0]/t,e[1]/t,e[2]/t]}function go(e,t,n,s){const i=new Float32Array(16),a=1/Math.tan(e/2);return i[0]=a/t,i[5]=a,i[10]=s/(n-s),i[11]=-1,i[14]=n*s/(n-s),i}function mo(e,t,n){const s=pn(un(t,e)),i=pn(Ms(s,n)),a=Ms(i,s),l=new Float32Array(16);return l[0]=i[0],l[1]=a[0],l[2]=-s[0],l[3]=0,l[4]=i[1],l[5]=a[1],l[6]=-s[1],l[7]=0,l[8]=i[2],l[9]=a[2],l[10]=-s[2],l[11]=0,l[12]=-rn(i,e),l[13]=-rn(a,e),l[14]=rn(s,e),l[15]=1,l}function Er(e,t){const n=new Float32Array(16);for(let s=0;s<4;s++)for(let i=0;i<4;i++){let a=0;for(let l=0;l<4;l++)a+=e[l*4+i]*t[s*4+l];n[s*4+i]=a}return n}function Nt(e){const t=new Float32Array(16),n=e[0],s=e[1],i=e[2],a=e[3],l=e[4],o=e[5],d=e[6],c=e[7],f=e[8],u=e[9],m=e[10],y=e[11],_=e[12],v=e[13],x=e[14],k=e[15];t[0]=o*m*k-o*y*x-u*d*k+u*c*x+v*d*y-v*c*m,t[4]=-l*m*k+l*y*x+f*d*k-f*c*x-_*d*y+_*c*m,t[8]=l*u*k-l*y*v-f*o*k+f*c*v+_*o*y-_*c*u,t[12]=-l*u*x+l*m*v+f*o*x-f*d*v-_*o*m+_*d*u,t[1]=-s*m*k+s*y*x+u*i*k-u*a*x-v*i*y+v*a*m,t[5]=n*m*k-n*y*x-f*i*k+f*a*x+_*i*y-_*a*m,t[9]=-n*u*k+n*y*v+f*s*k-f*a*v-_*s*y+_*a*u,t[13]=n*u*x-n*m*v-f*s*x+f*i*v+_*s*m-_*i*u,t[2]=s*d*k-s*c*x-o*i*k+o*a*x+v*i*c-v*a*d,t[6]=-n*d*k+n*c*x+l*i*k-l*a*x-_*i*c+_*a*d,t[10]=n*o*k-n*c*v-l*s*k+l*a*v+_*s*c-_*a*o,t[14]=-n*o*x+n*d*v+l*s*x-l*i*v-_*s*d+_*i*o,t[3]=-s*d*y+s*c*m+o*i*y-o*a*m-u*i*c+u*a*d,t[7]=n*d*y-n*c*m-l*i*y+l*a*m+f*i*c-f*a*d,t[11]=-n*o*y+n*c*u+l*s*y-l*a*u-f*s*c+f*a*o,t[15]=n*o*m-n*d*u-l*s*m+l*i*u+f*s*d-f*i*o;let p=n*t[0]+s*t[4]+i*t[8]+a*t[12];if(Math.abs(p)<1e-10)return null;p=1/p;for(let h=0;h<16;h++)t[h]*=p;return t}function Is(e,t){return[e[0]*t[0]+e[4]*t[1]+e[8]*t[2]+e[12]*t[3],e[1]*t[0]+e[5]*t[1]+e[9]*t[2]+e[13]*t[3],e[2]*t[0]+e[6]*t[1]+e[10]*t[2]+e[14]*t[3],e[3]*t[0]+e[7]*t[1]+e[11]*t[2]+e[15]*t[3]]}function en(e,t,n,s,i){const a=2*e/n-1,l=1-2*t/s,o=Is(i,[a,l,0,1]),d=Is(i,[a,l,1,1]),c=[o[0]/o[3],o[1]/o[3],o[2]/o[3]],f=[d[0]/d[3],d[1]/d[3],d[2]/d[3]];return{origin:c,direction:pn(un(f,c))}}function tr(e,t,n){const s=rn(e.direction,n);if(Math.abs(s)<1e-8)return null;const i=rn(un(t,e.origin),n)/s;return i<0?null:fo(e.origin,ho(e.direction,i))}function nr(e,t,n,s){const i=t,a=i[0]*e[0]+i[4]*e[1]+i[8]*e[2]+i[12],l=i[1]*e[0]+i[5]*e[1]+i[9]*e[2]+i[13],o=i[2]*e[0]+i[6]*e[1]+i[10]*e[2]+i[14],d=i[3]*e[0]+i[7]*e[1]+i[11]*e[2]+i[15];if(d<=.001)return{x:-9999,y:-9999,z:1,visible:!1};const c=a/d,f=l/d,u=o/d,m=(c*.5+.5)*n,y=(1-(f*.5+.5))*s;return{x:m,y,z:u,visible:u>=0&&u<=1}}const vo=Math.tan(Math.PI/8);function rr(e,t,n){const s=t[0]-e[0],i=t[1]-e[1],a=t[2]-e[2],l=Math.sqrt(s*s+i*i+a*a);return l<.001?n:n/(2*l*vo)}function Cr(e,t,n,s){const i=[e[0]-n[0],e[1]-n[1],e[2]-n[2]],a=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],l=2*(i[0]*t[0]+i[1]*t[1]+i[2]*t[2]),o=i[0]*i[0]+i[1]*i[1]+i[2]*i[2]-s*s,d=l*l-4*a*o;if(d<0)return null;const c=(-l-Math.sqrt(d))/(2*a);return c>0?c:null}function _o(e,t){const n=e.nodeMap.get(t);if(!n||n.isAtom)return[];const s=new Map;for(const a of e.edges)a.from===t&&(s.has(a.patternIdx)||s.set(a.patternIdx,[]),s.get(a.patternIdx).push({to:a.to,subIndex:a.subIndex}));const i=[];for(const[a,l]of[...s.entries()].sort((o,d)=>o[0]-d[0])){l.sort((d,c)=>d.subIndex-c.subIndex);const o=l.map(d=>{const c=e.nodeMap.get(d.to);return{index:d.to,label:(c==null?void 0:c.label)??`#${d.to}`,width:(c==null?void 0:c.width)??1,fraction:((c==null?void 0:c.width)??1)/n.width,subIndex:d.subIndex}});i.push({patternIdx:a,children:o})}return i}function bo(e,t){if(e===1)return[.55,.75,.95,1];const n=Math.min((e-1)/Math.max(t-1,1),1),s=.3+n*.6,i=.8-n*.4,a=.3+(1-n)*.3;return[s,i,a,1]}function yo(e){const t=Math.max(...e.nodes.map(u=>u.width),1),n=new Map,s=new Map;for(const u of e.edges)n.has(u.from)||n.set(u.from,new Set),n.get(u.from).add(u.to),s.has(u.to)||s.set(u.to,new Set),s.get(u.to).add(u.from);const i=e.nodes.map((u,m)=>{const y=m/e.nodes.length*Math.PI*2,_=.45+e.nodes.length*.5;return{index:u.index,label:u.label,width:u.width,isAtom:u.width===1,x:Math.cos(y)*_*(.5+Math.random()*.5),y:(u.width-1)*1.67,z:Math.sin(y)*_*(.5+Math.random()*.5),tx:0,ty:0,tz:0,vx:0,vy:0,vz:0,radius:.45+Math.min(u.width*.5,.3),color:bo(u.width,t),parentIndices:[...s.get(u.index)||[]],childIndices:[...n.get(u.index)||[]]}}),a=new Map;for(const u of i)a.set(u.index,u);const l=new Set,o=[];for(const u of e.edges){const m=`${u.from}-${u.to}-${u.pattern_idx}`;l.has(m)||(l.add(m),o.push({from:u.from,to:u.to,patternIdx:u.pattern_idx,subIndex:u.sub_index}))}if(So(i,o,a,150),i.length>0){let u=0,m=0;for(const y of i)u+=y.x,m+=y.z;u/=i.length,m/=i.length;for(const y of i)y.x-=u,y.z-=m}for(const u of i)u.tx=u.x,u.ty=u.y,u.tz=u.z;let d=0,c=0,f=0;for(const u of i)d+=u.x,c+=u.y,f+=u.z;return i.length>0&&(d/=i.length,c/=i.length,f/=i.length),{nodes:i,nodeMap:a,edges:o,maxWidth:t,center:[d,c,f]}}const wo=.5,xo=.9;function Tr(e,t){const n=e.nodeMap.get(t);if(!n)return null;const s=new Map;s.set(t,{dRight:0,dUp:0});const i=n.parentIndices.map(o=>e.nodeMap.get(o)).filter(o=>o!=null),a=new Map;for(const o of i)a.has(o.width)||a.set(o.width,[]),a.get(o.width).push(o);const l=[...a.keys()].sort((o,d)=>o-d);for(let o=0;o<l.length;o++){const d=a.get(l[o]),c=xo+(o+1)*wo,f=d.length;if(f===1)s.set(d[0].index,{dRight:0,dUp:c});else{const u=Math.min(Math.PI*.7,(f-1)*.35),m=(Math.PI-u)/2;for(let y=0;y<f;y++){const _=y/(f-1),v=m+_*u;s.set(d[y].index,{dRight:-Math.cos(v)*c*1.2,dUp:Math.sin(v)*c})}}}return{anchorIdx:t,offsets:s}}function ko(e,t,n){const s=t.root;if(!s)return Tr(e,n);const i=Tr(e,s.index);if(!i)return null;const{offsets:a}=i;return{anchorIdx:s.index,offsets:a}}function So(e,t,n,s){for(let y=0;y<s;y++){const _=1-y/s;for(let v=0;v<e.length;v++)for(let x=v+1;x<e.length;x++){const k=e[v],p=e[x];let h=k.x-p.x,g=k.z-p.z,b=Math.sqrt(h*h+g*g);b<.01&&(h=Math.random()-.5,g=Math.random()-.5,b=.5),b<1&&(b=1);const w=.6/(b*b)*_,S=h/b*w,C=g/b*w;k.vx+=S,k.vz+=C,p.vx-=S,p.vz-=C}for(const v of t){const x=n.get(v.from),k=n.get(v.to);if(!x||!k)continue;let p=k.x-x.x,h=k.z-x.z,g=Math.sqrt(p*p+h*h);g<.01&&(g=.01);const b=.02*(g-.1)*_,w=p/g*b,S=h/g*b;x.vx+=w,x.vz+=S,k.vx-=w,k.vz-=S}for(const v of e){const x=(v.width-1)*.27;v.vy+=(x-v.y)*.005}if(e.length>1){let v=0,x=0;for(const k of e)v+=k.x,x+=k.z;v/=e.length,x/=e.length;for(const k of e)k.vx-=(k.x-v)*.04*_,k.vz-=(k.z-x)*.04*_}for(const v of e)v.vx*=.85,v.vy*=.85,v.vz*=.85,v.vx>3?v.vx=3:v.vx<-3&&(v.vx=-3),v.vy>3?v.vy=3:v.vy<-3&&(v.vy=-3),v.vz>3?v.vz=3:v.vz<-3&&(v.vz=-3),v.x+=v.vx*.4,v.y+=v.vy*.4,v.z+=v.vz*.4}for(const y of e)y.vx=0,y.vy=0,y.vz=0}function Ds(e,t,n,s){var l;if(t<0||!n.enabled||n.duplicateMode)return t;const i=new Set;i.add(t);const a=(l=s==null?void 0:s.root)==null?void 0:l.index;a!=null&&i.add(a);for(const o of[...i])if(!(o===a||!e.nodeMap.get(o)))for(const c of i){if(c===o)continue;const f=e.nodeMap.get(c);if(f&&f.childIndices.includes(o)){i.delete(o);break}}if(i.has(t))return t;for(const o of i){const d=e.nodeMap.get(o);if(d&&d.childIndices.includes(t))return o}return t}function Eo(){const e=j({yaw:.5,pitch:.4,dist:6,target:[0,0,0],focusTarget:null,focusSpeed:4}),t=ae(()=>{const o=e.current;return[o.target[0]+o.dist*Math.cos(o.pitch)*Math.sin(o.yaw),o.target[1]+o.dist*Math.sin(o.pitch),o.target[2]+o.dist*Math.cos(o.pitch)*Math.cos(o.yaw)]},[]),n=ae((o,d,c)=>{const f=e.current;if(f.focusTarget&&c&&c>0){const _=1-Math.exp(-f.focusSpeed*c);f.target=[f.target[0]+(f.focusTarget[0]-f.target[0])*_,f.target[1]+(f.focusTarget[1]-f.target[1])*_,f.target[2]+(f.focusTarget[2]-f.target[2])*_];const v=f.focusTarget[0]-f.target[0],x=f.focusTarget[1]-f.target[1],k=f.focusTarget[2]-f.target[2];v*v+x*x+k*k<1e-4&&(f.target=[...f.focusTarget],f.focusTarget=null)}const u=t(),m=mo(u,f.target,[0,1,0]),y=go(Math.PI/4,o/Math.max(d,1),.1,200);return{viewProj:Er(y,m),camPos:u}},[t]),s=ae(o=>{const d=e.current,c=d.focusTarget??d.target,f=o[0]-c[0],u=o[1]-c[1],m=o[2]-c[2];f*f+u*u+m*m<.001||(d.focusTarget=o)},[]),i=ae(()=>{e.current.focusTarget=null},[]),a=ae((o,d)=>{const c=e.current;c.dist=Math.max(6,o*.5),c.target=[d[0],d[1],d[2]],c.focusTarget=null},[]),l=ae(()=>{const o=e.current,d=Math.cos(o.yaw),c=Math.sin(o.yaw),f=Math.cos(o.pitch),u=Math.sin(o.pitch),m=-f*c,y=-u,_=-f*d;let v=-_,x=0,k=m;const p=Math.sqrt(v*v+x*x+k*k);p>1e-6&&(v/=p,x/=p,k/=p);let h=x*_-k*y,g=k*m-v*_,b=v*y-x*m;const w=Math.sqrt(h*h+g*g+b*b);return w>1e-6&&(h/=w,g/=w,b/=w),{right:[v,x,k],up:[h,g,b]}},[]);return Pe(()=>({stateRef:e,getCamPos:t,getViewProj:n,focusOn:s,cancelFocus:i,resetForLayout:a,getAxes:l}),[e,t,n,s,i,a,l])}function Co(e){const t=[];e.start_node&&t.push(e.start_node.index);for(const n of e.start_path)t.push(n.index);e.root&&t.push(e.root.index);for(const n of e.end_path)t.push(n.index);return t}function Je(e,t){return e<<16|t}function To(e){const t=new Set,n=new Set,s=new Set,i=new Set;for(const a of e.start_edges)t.add(Je(a.to,a.from));e.root_entry_edge&&n.add(Je(e.root_entry_edge.to,e.root_entry_edge.from)),e.root_exit_edge&&s.add(Je(e.root_exit_edge.from,e.root_exit_edge.to));for(const a of e.end_edges)i.add(Je(a.from,a.to));return{startEdgeKeys:t,rootEntryEdgeKeys:n,rootExitEdgeKeys:s,endEdgeKeys:i}}function $s(e,t){var L,z;const{startNode:n,selectedNode:s,rootNode:i,candidateParent:a,candidateChild:l,matchedNode:o,mismatchedNode:d,tracePath:c,completedNodes:f,pendingParents:u,pendingChildren:m,hasVizState:y,involvedNodes:_,searchPath:v}=t,x=e===n,k=e===s&&!x,p=e===i,h=o!=null&&e!==o,g=((L=v==null?void 0:v.start_node)==null?void 0:L.index)??-1,b=((z=v==null?void 0:v.root)==null?void 0:z.index)??-1,w=e===g,S=e===b,C=w||S||((v==null?void 0:v.start_path.some(q=>q.index===e))??!1),E=(v==null?void 0:v.end_path.some(q=>q.index===e))??!1,A=e===a,T=e===l,P=e===o,F=e===d,D=c.has(e)&&!x&&!p&&!A&&!T&&!P&&!F,M=f.has(e)&&!x&&!P&&!F,O=u.has(e)&&!A,B=m.has(e)&&!T,I=t.queryTokens.has(e),R=e===t.activeQueryToken,W=C||E,G=y&&!_.has(e)&&!W&&!I;return[x&&!h&&"viz-start",k&&!h&&"viz-selected",p&&!t.rootTentative&&!h&&"viz-root",p&&t.rootTentative&&!h&&"viz-root-tentative",A&&!h&&"viz-candidate-parent",T&&"viz-candidate-child",P&&"viz-matched",F&&"viz-mismatched",D&&!h&&"viz-path",M&&"viz-completed",O&&!h&&"viz-pending-parent",B&&"viz-pending-child",w&&"viz-sp-start",S&&"viz-sp-root",C&&"viz-sp-start-path",E&&"viz-sp-end-path",I&&"viz-query-token",R&&"viz-query-active",e===t.splitSource&&"viz-split-source",e===t.splitLeft&&"viz-split-left",e===t.splitRight&&"viz-split-right",e===t.joinLeft&&"viz-join-left",e===t.joinRight&&"viz-join-right",e===t.joinResult&&"viz-join-result",e===t.newPatternParent&&"viz-new-pattern",t.newPatternChildren.has(e)&&"viz-new-pattern-child",e===t.newRoot&&"viz-new-root",G&&"viz-dimmed"].filter(Boolean).join(" ")}function Ao(e,t){var s,i;const n=[];return e===t.startNode&&n.push("start"),e===t.selectedNode&&n.push("selected"),e===t.rootNode&&n.push("root"),e===t.candidateParent&&n.push("candidate-parent"),e===t.candidateChild&&n.push("candidate-child"),e===t.matchedNode&&n.push("matched"),e===t.mismatchedNode&&n.push("mismatched"),t.tracePath.has(e)&&n.push("path"),t.completedNodes.has(e)&&n.push("completed"),t.pendingParents.has(e)&&n.push("pending-parent"),t.pendingChildren.has(e)&&n.push("pending-child"),t.searchPath&&(((s=t.searchPath.start_node)==null?void 0:s.index)===e&&n.push("sp-start"),((i=t.searchPath.root)==null?void 0:i.index)===e&&n.push("sp-root"),t.searchPath.start_path.some(a=>a.index===e)&&n.push("sp-start-path"),t.searchPath.end_path.some(a=>a.index===e)&&n.push("sp-end-path")),t.queryTokens.has(e)&&n.push("query-token"),e===t.activeQueryToken&&n.push("query-active"),e===t.splitSource&&n.push("split-source"),e===t.splitLeft&&n.push("split-left"),e===t.splitRight&&n.push("split-right"),e===t.joinLeft&&n.push("join-left"),e===t.joinRight&&n.push("join-right"),e===t.joinResult&&n.push("join-result"),e===t.newPatternParent&&n.push("new-pattern"),t.newPatternChildren.has(e)&&n.push("new-pattern-child"),e===t.newRoot&&n.push("new-root"),n}function Po(e,t){if(e)switch(e.kind){case"start_node":return e.node.index;case"visit_parent":return e.to.index;case"visit_child":return e.to.index;case"child_match":return e.node.index;case"child_mismatch":return e.node.index;case"done":return e.final_node;case"candidate_mismatch":return e.node.index;case"candidate_match":return e.root.index;case"parent_explore":return e.current_root;case"split_start":return e.node.index;case"split_complete":return e.original_node;case"join_start":return e.nodes[0]??null;case"join_step":return e.result;case"join_complete":return e.result_node;case"create_pattern":return e.parent;case"create_root":return e.node.index;case"update_pattern":return e.parent}return(t==null?void 0:t.root_node)!=null?t.root_node:(t==null?void 0:t.selected_node)!=null?t.selected_node:null}function Fo(e,t,n){return Pe(()=>{var G,L;const s=(e==null?void 0:e.location)??null,i=(e==null?void 0:e.transition)??null,a=t??null,l=(s==null?void 0:s.selected_node)??null,o=(s==null?void 0:s.root_node)??null,d=new Set((s==null?void 0:s.trace_path)??[]),c=new Set((s==null?void 0:s.completed_nodes)??[]),f=new Set((s==null?void 0:s.pending_parents)??[]),u=new Set((s==null?void 0:s.pending_children)??[]),m=(i==null?void 0:i.kind)==="start_node"?i.node.index:null,y=(i==null?void 0:i.kind)==="visit_parent"?i.to.index:null,_=(i==null?void 0:i.kind)==="visit_child"?i.to.index:null,v=(i==null?void 0:i.kind)==="child_match"?i.node.index:null,x=(i==null?void 0:i.kind)==="child_mismatch"?i.node.index:null;if((i==null?void 0:i.kind)==="parent_explore")for(const z of i.parent_candidates)f.add(z);const k=a?To(a):null,p=(k==null?void 0:k.startEdgeKeys)??new Set,h=(k==null?void 0:k.rootEntryEdgeKeys)??new Set,g=(k==null?void 0:k.rootExitEdgeKeys)??new Set,b=(k==null?void 0:k.endEdgeKeys)??new Set,w=new Set;if(s){l!=null&&w.add(l),o!=null&&w.add(o);for(const z of s.trace_path)w.add(z);for(const z of s.completed_nodes)w.add(z);for(const z of s.pending_parents)w.add(z);for(const z of s.pending_children)w.add(z)}if(m!=null&&w.add(m),y!=null&&w.add(y),_!=null&&w.add(_),v!=null&&w.add(v),x!=null&&w.add(x),((i==null?void 0:i.kind)==="visit_parent"||(i==null?void 0:i.kind)==="visit_child")&&w.add(i.from.index),a)for(const z of Co(a))w.add(z);for(const z of p)w.add(z>>>16),w.add(z&65535);for(const z of b)w.add(z>>>16),w.add(z&65535);for(const z of h)w.add(z>>>16),w.add(z&65535);for(const z of g)w.add(z>>>16),w.add(z&65535);const S=w.size>0,C=new Set(((G=e==null?void 0:e.query)==null?void 0:G.query_tokens)??[]),E=((L=e==null?void 0:e.query)==null?void 0:L.active_token)??null,A=(e==null?void 0:e.op_type)==="insert",T=new Set;let P=null,F=null,D=null,M=null,O=null,B=null,I=null;const R=new Set;let W=null;if(i)switch(i.kind){case"split_start":F=i.node.index;break;case"split_complete":F=i.original_node,D=i.left_fragment,M=i.right_fragment??null,D!=null&&T.add(Je(i.original_node,D)),M!=null&&T.add(Je(i.original_node,M));break;case"join_step":O=i.left,B=i.right,P=i.result,T.add(Je(i.result,i.left)),T.add(Je(i.result,i.right));break;case"join_complete":P=i.result_node;break;case"create_pattern":I=i.parent;for(const z of i.children)R.add(z),T.add(Je(i.parent,z));break;case"create_root":W=i.node.index;break;case"update_pattern":I=i.parent;for(const z of i.new_children)T.add(Je(i.parent,z));break}F!=null&&w.add(F),D!=null&&w.add(D),M!=null&&w.add(M),O!=null&&w.add(O),B!=null&&w.add(B),P!=null&&w.add(P),I!=null&&w.add(I);for(const z of R)w.add(z);return W!=null&&w.add(W),{selectedNode:l,rootNode:o,tracePath:d,completedNodes:c,pendingParents:f,pendingChildren:u,startNode:m,candidateParent:y,candidateChild:_,matchedNode:v,mismatchedNode:x,involvedNodes:w,hasVizState:S,transition:i,location:s,searchPath:a,rootTentative:(a==null?void 0:a.root_tentative)??!1,searchStartEdgeKeys:p,searchRootEntryEdgeKeys:h,searchRootExitEdgeKeys:g,searchEndEdgeKeys:b,queryTokens:C,activeQueryToken:E,insertEdgeKeys:T,joinResult:P,splitSource:F,splitLeft:D,splitRight:M,joinLeft:O,joinRight:B,newPatternParent:I,newPatternChildren:R,newRoot:W,isInsertOp:A}},[e,t,n])}function ct(e,t){return e<<16|t}function la(e,t,n){return e*1e6+t*1e3+n}const Mo=['[data-graph-passthrough="false"]',".graph-settings-overlay",".search-state-panel",".insert-state-panel",".path-chain-panel",".qp-panel",".node-info-panel",".decomposition-panel",".hypergraph-info-panel",".hypergraph-hud",".theme-settings",".theme-settings-layout"].join(", ");function Io(e){return e?e instanceof HTMLElement?e:e instanceof Node?e.parentElement:null:null}function Ls(e){const t=Io(e);return!!(t!=null&&t.closest(Mo))}function Do(e,t,n,s){const[i,a]=V(-1),[l,o]=V(-1),[d,c]=V(null),f=j({dragIdx:-1,dragPlanePoint:[0,0,0],dragPlaneNormal:[0,0,1],dragOffset:[0,0,0],orbiting:!1,panning:!1,lastMX:0,lastMY:0,mouseX:0,mouseY:0,selectedIdx:-1,hoverIdx:-1,clickedNode:-1,downMX:0,downMY:0}),u=ae(m=>{f.current.selectedIdx=m,a(m)},[]);return ge(()=>{const m=e.current,y=t.current;if(!m||!y)return;const _=f.current,v=5,x=g=>{var C,E,A,T;if(Ls(g.target)){_.dragIdx=-1,_.orbiting=!1,_.panning=!1,_.clickedNode=-1;return}const b=m.getBoundingClientRect();_.mouseX=g.clientX-b.left,_.mouseY=g.clientY-b.top,_.lastMX=g.clientX,_.lastMY=g.clientY,_.downMX=g.clientX,_.downMY=g.clientY;const w=m.clientWidth,S=m.clientHeight;if(g.button===1||g.button===0&&g.shiftKey)_.panning=!0,n.cancelFocus(),g.preventDefault();else if(g.button===0){const{viewProj:P}=n.getViewProj(w,S),F=Nt(P);if(F){const D=en(_.mouseX,_.mouseY,w,S,F),M=(E=(C=g.target).closest)==null?void 0:E.call(C,".hg-expanded");let O=!1;if(M){const B=Number(M.getAttribute("data-node-idx")),I=y.nodeMap.get(B);if(I){if(s!=null&&s.current)_.clickedNode=B;else{_.dragIdx=B;const R=[I.x,I.y,I.z],W=n.getCamPos();_.dragPlaneNormal=pn(un(W,R)),_.dragPlanePoint=R;const G=tr(D,R,_.dragPlaneNormal);G&&(_.dragOffset=[I.x-G[0],I.y-G[1],I.z-G[2]])}O=!0,g.preventDefault()}}if(!O){const B=(T=(A=g.target).closest)==null?void 0:T.call(A,".hg-node"),I=B?Number(B.getAttribute("data-node-idx")):-1;if(I>=0){const R=y.nodeMap.get(I);if(R)if(s!=null&&s.current)_.clickedNode=I;else{_.dragIdx=I;const W=[R.x,R.y,R.z],G=n.getCamPos();_.dragPlaneNormal=pn(un(G,W)),_.dragPlanePoint=W;const L=tr(D,W,_.dragPlaneNormal);L&&(_.dragOffset=[R.x-L[0],R.y-L[1],R.z-L[2]])}g.preventDefault()}else _.orbiting=!0}}}else g.button===2&&(_.orbiting=!0)},k=g=>{const b=m.getBoundingClientRect();_.mouseX=g.clientX-b.left,_.mouseY=g.clientY-b.top;const w=m.clientWidth,S=m.clientHeight;if(_.dragIdx>=0){const A=y.nodeMap.get(_.dragIdx);if(A){const{viewProj:T}=n.getViewProj(w,S),P=Nt(T);if(P){const F=en(_.mouseX,_.mouseY,w,S,P),D=tr(F,_.dragPlanePoint,_.dragPlaneNormal);D&&(A.x=D[0]+_.dragOffset[0],A.y=D[1]+_.dragOffset[1],A.z=D[2]+_.dragOffset[2],A.tx=A.x,A.ty=A.y,A.tz=A.z)}}return}if(_.panning){const A=g.clientX-_.lastMX,T=g.clientY-_.lastMY;_.lastMX=g.clientX,_.lastMY=g.clientY;const P=n.stateRef.current,F=P.dist*.002,D=Math.cos(P.yaw),M=Math.sin(P.yaw),O=D,B=-M;P.target=[P.target[0]-A*F*O,P.target[1]+T*F,P.target[2]-A*F*B];return}if(_.orbiting){const A=g.clientX-_.lastMX,T=g.clientY-_.lastMY,P=n.stateRef.current;P.yaw+=A*.005,P.pitch=Math.max(-1.2,Math.min(1.2,P.pitch+T*.005)),_.lastMX=g.clientX,_.lastMY=g.clientY;return}const{viewProj:C}=n.getViewProj(w,S),E=Nt(C);if(E){const A=en(_.mouseX,_.mouseY,w,S,E);let T=1/0,P=-1;for(const F of y.nodes){const D=Cr(A.origin,A.direction,[F.x,F.y,F.z],F.radius*1.5);D!==null&&D<T&&(T=D,P=F.index)}if(P!==_.hoverIdx)if(_.hoverIdx=P,o(P),P>=0){const F=y.nodeMap.get(P);F&&c({x:_.mouseX,y:_.mouseY,node:F})}else c(null);else if(P>=0){const F=y.nodeMap.get(P);F&&c({x:_.mouseX,y:_.mouseY,node:F})}}},p=g=>{if(_.clickedNode>=0&&g.button===0){const b=m.clientWidth,w=m.clientHeight,{viewProj:S}=n.getViewProj(b,w),C=Nt(S);if(C){const E=en(_.mouseX,_.mouseY,b,w,C);let A=1/0,T=-1;for(const P of y.nodes){const F=Cr(E.origin,E.direction,[P.x,P.y,P.z],P.radius*1.5);F!==null&&F<A&&(A=F,T=P.index)}T===_.clickedNode&&(_.selectedIdx=_.clickedNode,a(_.clickedNode))}}else if(_.dragIdx>=0&&g.button===0){const b=g.clientX-_.downMX,w=g.clientY-_.downMY;b*b+w*w>v*v||(_.selectedIdx=_.dragIdx,a(_.dragIdx))}else if(g.button===0&&_.clickedNode<0&&_.dragIdx<0){const b=g.clientX-_.downMX,w=g.clientY-_.downMY;(!_.orbiting&&!_.panning||b*b+w*w<=v*v)&&(_.selectedIdx=-1,a(-1),c(null))}_.dragIdx=-1,_.orbiting=!1,_.panning=!1,_.clickedNode=-1},h=g=>{if(Ls(g.target))return;const b=n.stateRef.current;b.dist=Math.max(2,Math.min(80,b.dist+g.deltaY*.02)),g.preventDefault()};return m.addEventListener("mousedown",x),window.addEventListener("mousemove",k),window.addEventListener("mouseup",p),m.addEventListener("wheel",h,{passive:!1}),()=>{m.removeEventListener("mousedown",x),window.removeEventListener("mousemove",k),window.removeEventListener("mouseup",p),m.removeEventListener("wheel",h),_.orbiting=!1,_.panning=!1,_.dragIdx=-1}},[t.current,n]),{selectedIdx:i,setSelectedIdx:u,hoverIdx:l,tooltip:d,interRef:f}}const $o=['[data-graph-passthrough="false"]',".graph-settings-overlay",".search-state-panel",".insert-state-panel",".path-chain-panel",".qp-panel",".node-info-panel",".decomposition-panel",".hypergraph-info-panel",".hypergraph-hud",".theme-settings",".theme-settings-layout"].join(", ");function Lo(e){return e?e instanceof HTMLElement?e:e instanceof Node?e.parentElement:null:null}function Rs(e){const t=Lo(e);return!!(t!=null&&t.closest($o))}const xn=10,Ro=200,zo=300,No=500;function Bo(e,t,n,s,i){const a=j({startX:0,startY:0,lastX:0,lastY:0,startTime:0,fingers:0,lastDist:0,lastMidX:0,lastMidY:0,longPressTimer:null,lastTapTime:0,lastTapX:0,lastTapY:0,isOrbiting:!1});ge(()=>{const l=e.current,o=t.current;if(!l||!o)return;const d=a.current,c=(k,p)=>{const h=l.clientWidth,g=l.clientHeight,{viewProj:b}=n.getViewProj(h,g),w=Nt(b);if(!w)return-1;const S=en(k,p,h,g,w);let C=1/0,E=-1;for(const A of o.nodes){const T=Cr(S.origin,S.direction,[A.x,A.y,A.z],A.radius*1.5);T!==null&&T<C&&(C=T,E=A.index)}return E},f=()=>{d.longPressTimer&&(clearTimeout(d.longPressTimer),d.longPressTimer=null)},u=(k,p)=>{const h=k.clientX-p.clientX,g=k.clientY-p.clientY;return Math.sqrt(h*h+g*g)},m=(k,p)=>[(k.clientX+p.clientX)/2,(k.clientY+p.clientY)/2],y=k=>{if(Rs(k.target))return;k.preventDefault();const p=k.touches;if(d.fingers=p.length,p.length===1){const h=p[0];if(!h)return;const g=l.getBoundingClientRect();d.startX=h.clientX-g.left,d.startY=h.clientY-g.top,d.lastX=h.clientX,d.lastY=h.clientY,d.startTime=Date.now(),d.isOrbiting=!1,f(),d.longPressTimer=setTimeout(()=>{const b=c(d.startX,d.startY);b>=0&&(s.current.selectedIdx=b,i(b)),d.longPressTimer=null},No)}else if(p.length===2){f();const h=p[0],g=p[1];if(!h||!g)return;d.lastDist=u(h,g);const[b,w]=m(h,g);d.lastMidX=b,d.lastMidY=w}},_=k=>{if(Rs(k.target))return;k.preventDefault();const p=k.touches;if(p.length===1&&d.fingers===1){const h=p[0];if(!h)return;const g=h.clientX-d.lastX,b=h.clientY-d.lastY;d.lastX=h.clientX,d.lastY=h.clientY;const w=h.clientX-(d.startX+l.getBoundingClientRect().left),S=h.clientY-(d.startY+l.getBoundingClientRect().top);(Math.abs(w)>xn||Math.abs(S)>xn)&&f();const C=n.stateRef.current;C.yaw+=g*.005,C.pitch=Math.max(-1.2,Math.min(1.2,C.pitch+b*.005)),d.isOrbiting=!0}else if(p.length===2){f();const h=p[0],g=p[1];if(!h||!g)return;const b=u(h,g),[w,S]=m(h,g);if(d.lastDist>0){const O=d.lastDist/b,B=n.stateRef.current;B.dist=Math.max(2,Math.min(80,B.dist*O))}d.lastDist=b;const C=w-d.lastMidX,E=S-d.lastMidY,A=n.stateRef.current,T=A.dist*.002,P=Math.cos(A.yaw),F=Math.sin(A.yaw),D=P,M=-F;A.target=[A.target[0]-C*T*D,A.target[1]+E*T,A.target[2]-C*T*M],d.lastMidX=w,d.lastMidY=S}},v=k=>{if(f(),k.touches.length===0&&d.fingers===1){const p=Date.now()-d.startTime,h=l.getBoundingClientRect(),g=k.changedTouches[0];if(!g){d.fingers=k.touches.length;return}const b=g.clientX-h.left,w=g.clientY-h.top,S=b-d.startX,C=w-d.startY,E=Math.sqrt(S*S+C*C);if(p<Ro&&E<xn){const A=Date.now(),T=b-d.lastTapX,P=w-d.lastTapY,F=Math.sqrt(T*T+P*P);if(A-d.lastTapTime<zo&&F<xn*2){const D=c(b,w);if(D>=0){const M=o.nodeMap.get(D);M&&n.focusOn([M.x,M.y,M.z])}d.lastTapTime=0}else{const D=c(b,w);s.current.selectedIdx=D>=0?D:-1,i(D>=0?D:-1),d.lastTapTime=A,d.lastTapX=b,d.lastTapY=w}}}d.fingers=k.touches.length},x=()=>{f(),d.fingers=0,d.isOrbiting=!1};return l.addEventListener("touchstart",y,{passive:!1}),l.addEventListener("touchmove",_,{passive:!1}),l.addEventListener("touchend",v),l.addEventListener("touchcancel",x),()=>{f(),l.removeEventListener("touchstart",y),l.removeEventListener("touchmove",_),l.removeEventListener("touchend",v),l.removeEventListener("touchcancel",x)}},[t.current,n,s,i])}const zs=new Float32Array([-1,-1,1,-1,1,1,-1,-1,1,1,-1,1]),sn=12,Oo=12,Dt=[[.45,.55,.7],[.7,.45,.55],[.5,.7,.45],[.65,.55,.7],[.7,.65,.4],[.4,.7,.65]],sr=[.1,.75,.95],$t=[.25,.75,1],ir=[1,.85,.3],ar=[.55,.4,.8],lr=[.95,.65,.2],or=[.3,.7,.9],cr=[1,.55,.2],dr=[.5,.85,.5],Ke=20,Go=2,Ns=["rgba(80, 140, 200, 0.12)","rgba(200, 120, 80, 0.12)","rgba(100, 180, 100, 0.12)","rgba(160, 120, 200, 0.12)","rgba(200, 180, 80, 0.12)","rgba(80, 200, 180, 0.12)"],Ho=`// ── Hypergraph 3D View – shaders ──\r
//\r
// Concatenated after: palette.wgsl\r
// Effects operate in 3D world space.\r
\r
struct Camera {\r
    viewProj : mat4x4<f32>,\r
    eye      : vec4<f32>,\r
    time     : vec4<f32>,   // x=time, y=beam_height, z=0, w=0\r
};\r
\r
@group(0) @binding(0) var<uniform> cam : Camera;\r
@group(0) @binding(1) var<uniform> palette : ThemePalette;\r
\r
// ══════════════════════════════════════════════════════\r
//  NODE RENDERING  (instanced billboard impostor spheres)\r
// ══════════════════════════════════════════════════════\r
\r
struct NodeInstance {\r
    @location(2) center : vec3<f32>,    // world position\r
    @location(3) radius : f32,          // sphere radius\r
    @location(4) color  : vec4<f32>,    // base color + alpha\r
    @location(5) flags  : vec4<f32>,    // x=selected, y=hovered, z=isAtom, w=0\r
};\r
\r
struct NodeVsOut {\r
    @builtin(position) pos   : vec4<f32>,\r
    @location(0) uv          : vec2<f32>,\r
    @location(1) worldCenter : vec3<f32>,\r
    @location(2) radius      : f32,\r
    @location(3) color       : vec4<f32>,\r
    @location(4) flags       : vec4<f32>,\r
};\r
\r
@vertex\r
fn vs_node(\r
    @location(0) quadPos : vec2<f32>,   // −1..1 billboard quad\r
    inst : NodeInstance,\r
) -> NodeVsOut {\r
    // Build billboard in view space\r
    let right = normalize(vec3(cam.viewProj[0][0], cam.viewProj[1][0], cam.viewProj[2][0]));\r
    let up    = normalize(vec3(cam.viewProj[0][1], cam.viewProj[1][1], cam.viewProj[2][1]));\r
\r
    let expand = 1.3;  // padding for AA edge\r
    let worldPos = inst.center\r
        + right * quadPos.x * inst.radius * expand\r
        + up    * quadPos.y * inst.radius * expand;\r
\r
    var out: NodeVsOut;\r
    out.pos         = cam.viewProj * vec4(worldPos, 1.0);\r
    out.uv          = quadPos;\r
    out.worldCenter = inst.center;\r
    out.radius      = inst.radius;\r
    out.color       = inst.color;\r
    out.flags       = inst.flags;\r
    return out;\r
}\r
\r
@fragment\r
fn fs_node(in: NodeVsOut) -> @location(0) vec4<f32> {\r
    let d = length(in.uv);\r
    if (d > 1.0) { discard; }\r
\r
    // Sphere normal from billboard UV\r
    let z = sqrt(max(1.0 - d * d, 0.0));\r
    let right = normalize(vec3(cam.viewProj[0][0], cam.viewProj[1][0], cam.viewProj[2][0]));\r
    let up    = normalize(vec3(cam.viewProj[0][1], cam.viewProj[1][1], cam.viewProj[2][1]));\r
    let fwd   = normalize(cross(right, up));\r
    let N = normalize(right * in.uv.x + up * in.uv.y + fwd * z);\r
\r
    let L = normalize(vec3(0.4, 0.8, 0.3));\r
    let V = normalize(cam.eye.xyz - in.worldCenter);\r
    let H = normalize(L + V);\r
\r
    let ambient  = 0.18;\r
    let diffuse  = max(dot(N, L), 0.0) * 0.55;\r
    let spec     = pow(max(dot(N, H), 0.0), 40.0) * 0.35;\r
    let rim      = pow(1.0 - max(dot(N, V), 0.0), 3.0) * 0.15;\r
    let fresnel  = pow(1.0 - max(dot(N, V), 0.0), 4.0) * 0.25;\r
\r
    var base = in.color.rgb;\r
\r
    // Selected: glow ring\r
    if (in.flags.x > 0.5) {\r
        base = mix(base, vec3(1.0, 0.9, 0.4), 0.25);\r
        let ring = smoothstep(0.7, 0.85, d) * smoothstep(1.0, 0.92, d);\r
        let glow = ring * 0.6 * (0.7 + 0.3 * sin(cam.time.x * 3.0));\r
        let lit = ambient + diffuse + spec + rim + fresnel;\r
        return vec4(base * lit + vec3(glow * 0.8, glow * 0.6, glow * 0.1) + vec3(spec * 0.15), 1.0);\r
    }\r
\r
    // Hovered: brightening\r
    if (in.flags.y > 0.5) {\r
        base = mix(base, vec3(1.0), 0.15);\r
    }\r
\r
    let lit = ambient + diffuse + spec + rim;\r
    let aa = 1.0 - smoothstep(0.92, 1.0, d);\r
    return vec4((base * lit + vec3(spec * 0.12)) * aa, aa);\r
}\r
\r
\r
// ══════════════════════════════════════════════════════\r
//  EDGE RENDERING  (instanced energy beams between nodes)\r
// ══════════════════════════════════════════════════════\r
\r
// ── Procedural noise for energy beam effects ──\r
\r
fn hash21(p: vec2<f32>) -> f32 {\r
    var p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));\r
    p3 += dot(p3, p3.yzx + 33.33);\r
    return fract((p3.x + p3.y) * p3.z);\r
}\r
\r
fn noise2d(p: vec2<f32>) -> f32 {\r
    let i = floor(p);\r
    let f = fract(p);\r
    let u = f * f * (3.0 - 2.0 * f);\r
    return mix(\r
        mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),\r
        mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),\r
        u.y\r
    );\r
}\r
\r
fn fbm2(p: vec2<f32>) -> f32 {\r
    var val = 0.0;\r
    var amp = 0.5;\r
    var pos = p;\r
    for (var i = 0; i < 3; i++) {\r
        val += amp * noise2d(pos);\r
        pos *= 2.1;\r
        amp *= 0.5;\r
    }\r
    return val;\r
}\r
\r
struct EdgeInstance {\r
    @location(2) posA   : vec3<f32>,    // start point\r
    @location(3) posB_x : f32,\r
    @location(4) posB_yz_color : vec4<f32>,  // yz = posB.yz, zw = color.rg\r
    @location(5) color_ba_flags : vec4<f32>, // xy = color.ba, z = flags, w = patternIdx\r
};\r
\r
struct EdgeVsOut {\r
    @builtin(position) pos : vec4<f32>,\r
    @location(0) color     : vec4<f32>,\r
    @location(1) edgeUV    : vec2<f32>,\r
    @location(2) flags     : f32,\r
    @location(3) edgeType  : f32,\r
    @location(4) edgeLen   : f32,\r
};\r
\r
// edgeType encoding:\r
//   0 = grid / simple (no animation)\r
//   1 = normal edge (subtle energy flow)\r
//   2 = search-path start (uniform teal, arrow toward A / parent)\r
//   3 = search-path root (gold, radiant bidirectional) [legacy]\r
//   4 = search-path end (uniform teal, arrow toward B / child)\r
//   5 = trace path (gentle flow)\r
//   6 = candidate edge (muted violet, transparent)\r
//   7 = insert edge\r
//   8 = search-path root entry (gold, arrow toward A / root)\r
//   9 = search-path root exit (gold, arrow toward B / child)\r
\r
@vertex\r
fn vs_edge(\r
    @location(0) quadPos  : vec2<f32>,\r
    @location(6) posA     : vec3<f32>,\r
    @location(7) posB     : vec3<f32>,\r
    @location(8) color    : vec4<f32>,\r
    @location(9) flags    : f32,   // highlighted flag\r
    @location(10) edgeType : f32,  // beam type\r
) -> EdgeVsOut {\r
    let dir = posB - posA;\r
    let edgeLength = length(dir);\r
    let pos01 = quadPos.x * 0.5 + 0.5;  // 0..1 along line\r
    let center = mix(posA, posB, pos01);\r
\r
    let viewDir = normalize(cam.eye.xyz - center);\r
    let lineDir = normalize(dir);\r
    let side = normalize(cross(lineDir, viewDir));\r
\r
    // Width varies by edge type\r
    var halfWidth: f32;\r
    if (edgeType < 0.5) {\r
        // Grid: thin line\r
        halfWidth = select(0.015, 0.035, flags > 0.5);\r
    } else if (edgeType < 1.5) {\r
        // Normal edge: subtle beam\r
        halfWidth = select(0.03, 0.05, flags > 0.5);\r
    } else if (edgeType > 5.5 && edgeType < 6.5) {\r
        // Candidate edge (type 6): medium-thin\r
        halfWidth = 0.035;\r
    } else if ((edgeType > 1.5 && edgeType < 4.5) || (edgeType > 7.5 && edgeType < 9.5)) {\r
        // Search path edges with arrows (types 2,3,4,8,9): extra wide for arrowhead room\r
        halfWidth = select(0.10, 0.12, flags > 0.5);\r
    } else {\r
        // Trace path (type 5): moderate beam\r
        halfWidth = select(0.06, 0.08, flags > 0.5);\r
    }\r
\r
    let worldPos = center + side * quadPos.y * halfWidth;\r
\r
    var out: EdgeVsOut;\r
    out.pos      = cam.viewProj * vec4(worldPos, 1.0);\r
    out.color    = color;\r
    out.edgeUV   = quadPos;\r
    out.flags    = flags;\r
    out.edgeType = edgeType;\r
    out.edgeLen  = edgeLength;\r
    return out;\r
}\r
\r
// ── Arrow helper: computes arrowhead intensity ──\r
// arrowDir: 0.0 = arrow at A (low t), 1.0 = arrow at B (high t)\r
// edgeLen: world-space length of the edge, used for constant-size arrowheads\r
fn arrowHead(t_in: f32, across: f32, arrowDir: f32, edgeLen: f32) -> f32 {\r
    // Flip t so the arrow always points toward high values\r
    let t_a = select(1.0 - t_in, t_in, arrowDir > 0.5);\r
\r
    // Fixed world-space arrow length (~0.25 units), clamped to at most 40% of edge\r
    let arrowFrac = clamp(0.25 / max(edgeLen, 0.01), 0.04, 0.40);\r
    let arrowStart = 1.0 - arrowFrac;\r
    let fadeWidth = arrowFrac * 0.1;  // soft transition at base\r
    let inArrow = smoothstep(arrowStart - fadeWidth, arrowStart, t_a);\r
    let arrowProgress = clamp((t_a - arrowStart) / arrowFrac, 0.0, 1.0);\r
\r
    // Triangle shape: wide at base, narrows to point\r
    // across is 0..1 from centre; triangle boundary shrinks linearly\r
    let triangleBound = (1.0 - arrowProgress) * 0.85;\r
    let arrowShape = smoothstep(0.04, 0.0, across - triangleBound) * inArrow;\r
\r
    // Bright edge outline of the triangle\r
    let edgeDist = abs(across - triangleBound);\r
    let arrowEdge = exp(-edgeDist * edgeDist * 800.0) * inArrow * 0.6;\r
\r
    return arrowShape * 0.7 + arrowEdge;\r
}\r
\r
@fragment\r
fn fs_edge(in: EdgeVsOut) -> @location(0) vec4<f32> {\r
    let t = in.edgeUV.x * 0.5 + 0.5;       // 0..1 along beam (A=0, B=1)\r
    let across = abs(in.edgeUV.y);           // 0..1 from center outward\r
    let side_sign = in.edgeUV.y;             // signed lateral position\r
    let time = cam.time.x;\r
\r
    // ── Grid / simple edges (edgeType 0) ──\r
    if (in.edgeType < 0.5) {\r
        let alpha = 1.0 - smoothstep(0.6, 1.0, across);\r
        var col = in.color.rgb;\r
        var a = in.color.a * alpha;\r
        if (in.flags > 0.5) {\r
            col = mix(col, vec3(1.0), 0.3);\r
            a *= 1.4;\r
        }\r
        let endFade = smoothstep(0.0, 0.08, 0.5 - abs(in.edgeUV.x));\r
        a *= endFade;\r
        return vec4(col * a, a);\r
    }\r
\r
    // ── Candidate edges (edgeType 6): muted, transparent, gentle pulse ──\r
    if (in.edgeType > 5.5 && in.edgeType < 6.5) {\r
        let core_c = exp(-across * across * 12.0);\r
        let glow_c = exp(-across * across * 3.5);\r
        let gentlePulse = 0.5 + 0.5 * sin(t * 8.0 - time * 1.0);\r
        let intensity_c = core_c * 0.45 + glow_c * 0.15 * gentlePulse;\r
        var col_c = in.color.rgb;\r
        col_c = mix(col_c, vec3(0.7, 0.6, 0.9), 0.2);  // slight violet tint\r
        let endFade_c = smoothstep(0.0, 0.08, min(t, 1.0 - t));\r
        let a_c = clamp(intensity_c * in.color.a * endFade_c, 0.0, 1.0);\r
        return vec4(col_c * a_c, a_c);\r
    }\r
\r
    // ── Energy beam rendering (edgeType 1-5) ──\r
\r
    // For path edges (2,3,4,8,9), narrow the beam core relative to the wide quad\r
    // so the arrowhead can spread wider than the beam body.\r
    let isArrowType = (in.edgeType > 1.5 && in.edgeType < 4.5) || (in.edgeType > 7.5 && in.edgeType < 9.5);\r
    // Beam occupies the central ~40% of quad width for arrow types\r
    let beamScale = select(1.0, 2.2, isArrowType);\r
    let beamAcross = across * beamScale;  // stretched so core stays narrow\r
\r
    // Radial beam profiles (using beamAcross for arrow types)\r
    let core     = exp(-beamAcross * beamAcross * 18.0);           // tight hot center\r
    let innerGlow = exp(-beamAcross * beamAcross * 5.0);           // medium glow\r
    let outerGlow = exp(-beamAcross * beamAcross * 1.8);           // soft halo\r
\r
    // Animated noise layers (flow from A→B)\r
    let flowSpeed = select(1.2, 2.5, in.edgeType > 1.5);\r
    let n1 = noise2d(vec2(t * 10.0 - time * flowSpeed, beamAcross * 5.0));\r
    let n2 = noise2d(vec2(t * 7.0 - time * flowSpeed * 0.6, beamAcross * 3.0 + 7.7));\r
    let plasma = n1 * 0.6 + n2 * 0.4;\r
\r
    // FBM turbulence for wispy tendrils\r
    let turb = fbm2(vec2(t * 6.0 - time * flowSpeed * 0.8, side_sign * 3.0 + time * 0.3));\r
\r
    // Traveling pulse waves (A→B direction)\r
    let pulse1 = pow(0.5 + 0.5 * sin((t * 6.28318 * 3.0) - time * 4.0), 3.0);\r
    let pulse2 = pow(0.5 + 0.5 * sin((t * 6.28318 * 2.0) - time * 2.5 + 1.5), 2.0);\r
\r
    // Asymmetric endpoint glow\r
    let sourceGlow = exp(-t * t * 6.0);             // peaks at A\r
    let targetGlow = exp(-(1.0 - t) * (1.0 - t) * 8.0);  // peaks at B\r
\r
    // ── Compose base intensity ──\r
    var intensity = core * 0.7\r
        + innerGlow * 0.2 * (0.6 + 0.4 * plasma)\r
        + outerGlow * 0.08 * (0.5 + 0.5 * turb)\r
        + core * pulse1 * 0.25\r
        + innerGlow * pulse2 * 0.1;\r
\r
    var col = in.color.rgb;\r
    var hotCenter = vec3(1.0);  // white-hot for core brightening\r
\r
    // ── Per-type effects ──\r
    if (in.edgeType > 1.5 && in.edgeType < 2.5) {\r
        // ═══ SP START (type 2): uniform teal, arrow at A (toward parent) ═══\r
        // Arrow points toward posA (parent). Flow travels B→A (child→parent).\r
        let flowPulse = pow(0.5 + 0.5 * sin(t * 20.0 + time * 5.0), 3.0);  // reversed flow\r
        intensity += core * flowPulse * 0.25;\r
        intensity += sourceGlow * innerGlow * 0.3;\r
        // Arrowhead at A end (arrowDir = 0.0)\r
        let arrow = arrowHead(t, across, 0.0, in.edgeLen);\r
        intensity += arrow * 0.8;\r
        hotCenter = vec3(0.85, 1.0, 1.0);\r
\r
    } else if (in.edgeType > 2.5 && in.edgeType < 3.5) {\r
        // ═══ SP ROOT legacy (type 3): golden radiance, bidirectional ═══\r
        let centerDist = abs(t - 0.5);\r
        let biPulse = pow(0.5 + 0.5 * sin(centerDist * 20.0 - time * 5.0), 3.0);\r
        intensity += core * biPulse * 0.4;\r
        let center_glow = exp(-centerDist * centerDist * 12.0);\r
        intensity += center_glow * innerGlow * 0.5;\r
        let shimmer = noise2d(vec2(t * 15.0, time * 3.0));\r
        intensity += core * shimmer * 0.15;\r
        hotCenter = vec3(1.0, 0.95, 0.75);\r
        col = mix(col, vec3(1.0, 0.9, 0.5), center_glow * 0.3);\r
\r
    } else if (in.edgeType > 3.5 && in.edgeType < 4.5) {\r
        // ═══ SP END (type 4): uniform teal, arrow at B (toward child) ═══\r
        // Arrow points toward posB (child). Flow travels A→B (parent→child).\r
        let flowPulse = pow(0.5 + 0.5 * sin(t * 20.0 - time * 5.0), 3.0);\r
        intensity += core * flowPulse * 0.25;\r
        intensity += targetGlow * innerGlow * 0.3;\r
        // Arrowhead at B end (arrowDir = 1.0)\r
        let arrow = arrowHead(t, across, 1.0, in.edgeLen);\r
        intensity += arrow * 0.8;\r
        hotCenter = vec3(0.85, 1.0, 1.0);\r
\r
    } else if (in.edgeType > 4.5 && in.edgeType < 5.5) {\r
        // ═══ TRACE PATH (type 5): gentle teal flow ═══\r
        let gentlePulse = 0.5 + 0.5 * sin(t * 12.56 - time * 2.0);\r
        intensity += core * gentlePulse * 0.15;\r
        intensity += sourceGlow * outerGlow * 0.2;\r
        intensity += targetGlow * outerGlow * 0.2;\r
        hotCenter = vec3(0.85, 1.0, 1.0);\r
\r
    } else if (in.edgeType > 7.5 && in.edgeType < 8.5) {\r
        // ═══ SP ROOT ENTRY (type 8): golden radiance, arrow at A (toward root) ═══\r
        // Search arrived upward at the root node from the start path.\r
        let centerDist_re = abs(t - 0.5);\r
        let center_glow_re = exp(-centerDist_re * centerDist_re * 12.0);\r
        let shimmer_re = noise2d(vec2(t * 15.0, time * 3.0));\r
        intensity += center_glow_re * innerGlow * 0.35;\r
        intensity += core * shimmer_re * 0.12;\r
        // Flow travels B→A (child→parent / upward toward root)\r
        let flowPulse_re = pow(0.5 + 0.5 * sin(t * 20.0 + time * 5.0), 3.0);\r
        intensity += core * flowPulse_re * 0.25;\r
        intensity += sourceGlow * innerGlow * 0.3;\r
        // Arrowhead at A end (toward root/parent, arrowDir = 0.0)\r
        let arrow_re = arrowHead(t, across, 0.0, in.edgeLen);\r
        intensity += arrow_re * 0.8;\r
        hotCenter = vec3(1.0, 0.95, 0.75);\r
        col = mix(col, vec3(1.0, 0.9, 0.5), center_glow_re * 0.2);\r
\r
    } else if (in.edgeType > 8.5 && in.edgeType < 9.5) {\r
        // ═══ SP ROOT EXIT (type 9): golden radiance, arrow at B (toward child) ═══\r
        // Search continues downward from root into the end path.\r
        let centerDist_rx = abs(t - 0.5);\r
        let center_glow_rx = exp(-centerDist_rx * centerDist_rx * 12.0);\r
        let shimmer_rx = noise2d(vec2(t * 15.0, time * 3.0));\r
        intensity += center_glow_rx * innerGlow * 0.35;\r
        intensity += core * shimmer_rx * 0.12;\r
        // Flow travels A→B (parent→child / downward from root)\r
        let flowPulse_rx = pow(0.5 + 0.5 * sin(t * 20.0 - time * 5.0), 3.0);\r
        intensity += core * flowPulse_rx * 0.25;\r
        intensity += targetGlow * innerGlow * 0.3;\r
        // Arrowhead at B end (toward child, arrowDir = 1.0)\r
        let arrow_rx = arrowHead(t, across, 1.0, in.edgeLen);\r
        intensity += arrow_rx * 0.8;\r
        hotCenter = vec3(1.0, 0.95, 0.75);\r
        col = mix(col, vec3(1.0, 0.9, 0.5), center_glow_rx * 0.2);\r
\r
    } else {\r
        // ═══ NORMAL edge (type 1): subtle energy ═══\r
        intensity *= 0.8;\r
        let subtlePulse = 0.5 + 0.5 * sin(t * 8.0 - time * 1.5);\r
        intensity += core * subtlePulse * 0.08;\r
    }\r
\r
    // ── Hot-core brightening (white center like a plasma arc) ──\r
    col = mix(col, hotCenter, core * 0.4);\r
\r
    // Highlight whitening\r
    if (in.flags > 0.5) {\r
        col = mix(col, vec3(1.0), 0.15 * core);\r
        intensity *= 1.2;\r
    }\r
\r
    // Endpoint fade (skip arrow tip end for arrow types)\r
    var endFadeA = smoothstep(0.0, 0.06, t);\r
    var endFadeB = smoothstep(0.0, 0.06, 1.0 - t);\r
    // Don't fade the arrow tip — let the arrowhead geometry define the end\r
    if (in.edgeType > 1.5 && in.edgeType < 2.5) {\r
        endFadeA = 1.0;  // type 2: arrow at A end, don't fade there\r
    }\r
    if (in.edgeType > 7.5 && in.edgeType < 8.5) {\r
        endFadeA = 1.0;  // type 8: root entry arrow at A end, don't fade there\r
    }\r
    if (in.edgeType > 3.5 && in.edgeType < 4.5) {\r
        endFadeB = 1.0;  // type 4: arrow at B end, don't fade there\r
    }\r
    if (in.edgeType > 8.5 && in.edgeType < 9.5) {\r
        endFadeB = 1.0;  // type 9: root exit arrow at B end, don't fade there\r
    }\r
    intensity *= min(endFadeA, endFadeB);\r
\r
    // Final output with premultiplied alpha\r
    let a = clamp(intensity * in.color.a * 1.6, 0.0, 1.0);\r
    return vec4(col * a, a);\r
}\r
\r
\r
// ══════════════════════════════════════════════════════\r
//  LABEL TEXT  (reserved for future: SDF text rendering)\r
// ══════════════════════════════════════════════════════\r
`;function Uo(e,t,n){const s=Oi+`
`+Ho,i=e.createShaderModule({code:s}),a=e.createBuffer({size:zs.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(a,0,zs);const l=e.createBuffer({size:128,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),o=e.createBuffer({size:ji,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),d=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),c=e.createBindGroup({layout:d,entries:[{binding:0,resource:{buffer:l}},{binding:1,resource:{buffer:o}}]}),f=e.createPipelineLayout({bindGroupLayouts:[d]}),u=[{arrayStride:8,stepMode:"vertex",attributes:[{shaderLocation:0,offset:0,format:"float32x2"}]},{arrayStride:sn*4,stepMode:"instance",attributes:[{shaderLocation:6,offset:0,format:"float32x3"},{shaderLocation:7,offset:12,format:"float32x3"},{shaderLocation:8,offset:24,format:"float32x4"},{shaderLocation:9,offset:40,format:"float32"},{shaderLocation:10,offset:44,format:"float32"}]}],m={color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},y=e.createRenderPipeline({layout:f,vertex:{module:i,entryPoint:"vs_edge",buffers:u},fragment:{module:i,entryPoint:"fs_edge",targets:[{format:t,blend:m}]},primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"}}),_=e.createRenderPipeline({layout:f,vertex:{module:i,entryPoint:"vs_edge",buffers:u},fragment:{module:i,entryPoint:"fs_edge",targets:[{format:t,blend:m}]},primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"}}),v=e.createBuffer({size:Math.max(n*sn*4,48),usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),{gridData:x,gridCount:k}=Vo(),p=e.createBuffer({size:x.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(p,0,x.buffer,x.byteOffset,x.byteLength);const h=new Float32Array(n*sn);return{device:e,quadVB:a,camUB:l,paletteUB:o,camBG:c,edgePipeline:y,gridPipeline:_,edgeIB:v,gridIB:p,gridCount:k,edgeDataBuf:h,maxEdges:n}}function Vo(){const e=[];for(let s=-Ke;s<=Ke;s+=Go)e.push(s,0,-Ke,s,0,Ke,.25,.22,.18,.06,0,0),e.push(-Ke,0,s,Ke,0,s,.25,.22,.18,.06,0,0);e.push(-Ke,0,0,Ke,0,0,.55,.25,.15,.12,0,0),e.push(0,0,-Ke,0,0,Ke,.15,.25,.55,.12,0,0);const t=new Float32Array(e),n=e.length/Oo;return{gridData:t,gridCount:n}}function Wo(e){e.quadVB.destroy(),e.camUB.destroy(),e.paletteUB.destroy(),e.edgeIB.destroy(),e.gridIB.destroy()}function jo(e,t){var h;const{layout:n,vizState:s,inter:i,connectedEdgeKeys:a,hiddenDecompEdgeKeys:l,hiddenNestingEdgeKeys:o}=t,d=((h=s.location)==null?void 0:h.trace_path)??[],c=new Set;for(let g=0;g<d.length-1;g++){const b=d[g],w=d[g+1];c.add(ct(b,w)),c.add(ct(w,b))}const f=s.searchStartEdgeKeys,u=s.searchRootEntryEdgeKeys,m=s.searchRootExitEdgeKeys,y=s.searchEndEdgeKeys,_=f.size>0||u.size>0||m.size>0||y.size>0,v=d.length>0||s.selectedNode!=null||_,x=s.insertEdgeKeys,k=s.transition;(k==null?void 0:k.kind)==="parent_explore"?t.lastParentCandidates=k.parent_candidates:(k==null?void 0:k.kind)!=="visit_parent"&&(k==null?void 0:k.kind)!=="candidate_match"&&(t.lastParentCandidates=[]);const p=new Set;s.candidateParent!=null&&p.add(s.candidateParent),s.candidateChild!=null&&p.add(s.candidateChild);for(const g of s.pendingParents)p.add(g);for(const g of s.pendingChildren)p.add(g);for(const g of t.lastParentCandidates)p.add(g);for(let g=0;g<n.edges.length;g++){const b=n.edges[g],w=n.nodeMap.get(b.from),S=n.nodeMap.get(b.to);if(!w||!S)continue;const C=g*sn;if(l.has(ct(b.from,b.to))||o.has(ct(b.from,b.to))){for(let M=0;M<sn;M++)e[C+M]=0;continue}e[C]=w.x,e[C+1]=w.y,e[C+2]=w.z,e[C+3]=S.x,e[C+4]=S.y,e[C+5]=S.z;const{r:E,g:A,b:T,alpha:P,hlFlag:F,edgeType:D}=Yo(b,c,f,u,m,y,_,v,p,x,s,i,a);e[C+6]=E,e[C+7]=A,e[C+8]=T,e[C+9]=P,e[C+10]=F,e[C+11]=D}return n.edges.length}function Yo(e,t,n,s,i,a,l,o,d,c,f,u,m){const y=ct(e.from,e.to),_=n.has(y),v=s.has(y),x=i.has(y),k=v||x,p=a.has(y),h=_||k||p,g=!h&&t.has(y),b=m.has(la(e.from,e.to,e.patternIdx)),w=!h&&!g&&d.size>0&&(d.has(e.from)||d.has(e.to)),S=!h&&!g&&!w&&c.size>0&&c.has(y),C=S&&f.joinResult!=null&&(e.from===f.joinResult||e.to===f.joinResult);let E,A,T,P,F;if(k)E=ir[0],A=ir[1],T=ir[2],P=.95,F=1;else if(_)E=$t[0],A=$t[1],T=$t[2],P=.9,F=1;else if(p)E=$t[0],A=$t[1],T=$t[2],P=.9,F=1;else if(g)E=sr[0],A=sr[1],T=sr[2],P=.9,F=1;else if(w)E=ar[0],A=ar[1],T=ar[2],P=.3,F=0;else if(S)C?(E=dr[0],A=dr[1],T=dr[2]):(E=cr[0],A=cr[1],T=cr[2]),P=.85,F=1;else if(u.selectedIdx>=0)if(b)e.to===u.selectedIdx?(E=lr[0],A=lr[1],T=lr[2]):(E=or[0],A=or[1],T=or[2]),P=.85,F=1;else{const M=Dt[e.patternIdx%Dt.length];E=M[0],A=M[1],T=M[2],P=.12,F=0}else if(o){const M=Dt[e.patternIdx%Dt.length];E=M[0],A=M[1],T=M[2],P=.12,F=0}else{const M=Dt[e.patternIdx%Dt.length];E=M[0],A=M[1],T=M[2],P=.4,F=0}return{r:E,g:A,b:T,alpha:P,hlFlag:F,edgeType:_?2:v?8:x?9:p?4:g?5:w?6:S?7:1}}function qo(e,t,n=12){const s=1-Math.exp(-n*t),i=1e-4;let a=!1;for(const l of e){const o=(l.tx-l.x)*s,d=(l.ty-l.y)*s,c=(l.tz-l.z)*s;l.x+=o,l.y+=d,l.z+=c,(Math.abs(o)>i||Math.abs(d)>i||Math.abs(c)>i)&&(a=!0)}return a}function Ko(e){const{layout:t,nodeElMap:n,viewProj:s,camPos:i,vw:a,vh:l,containerRect:o,inter:d,vizInvolvedNodes:c,connectedSet:f,decomposition:u,shells:m,duplicates:y,nestingHighlights:_,containerEl:v,nestingEnabled:x,duplicateMode:k}=e,p=u.getClonedChildIndices(),h=u.getExpandedNodes(),g=x&&!k&&p.has(d.selectedIdx),b=200,w=new Map;for(let S=0;S<t.nodes.length;S++){const C=t.nodes[S],E=n.get(C.index);if(!E)continue;if(p.has(C.index)&&!k){E.style.display="none";continue}const A=nr([C.x,C.y,C.z],s,a,l);w.set(C.index,{x:A.x,y:A.y});const T=rr(i,[C.x,C.y,C.z],l),P=Math.max(.1,T*C.radius*2.5/80);if(!A.visible||P<.02||A.x<-b||A.x>a+b||A.y<-b||A.y>l+b){E.style.display="none";continue}E.style.display="";const F=h.has(C.index),D=g?!F:d.selectedIdx>=0&&!F&&!f.has(C.index)&&!c.has(C.index);E.style.opacity=D?"0.15":"1";const M=g?F:C.index===d.selectedIdx||F;E.classList.toggle("selected",M),E.classList.toggle("span-highlighted",C.index===d.hoverIdx);const O=Math.round((1-A.z)*1e3);E.style.zIndex=C.index===d.selectedIdx?"10000":F?"9999":String(O),F?E.style.transform=`translate(-50%, 0%) translate(${A.x.toFixed(1)}px, ${A.y.toFixed(1)}px) scale(${P.toFixed(3)})`:E.style.transform=`translate(-50%, -50%) translate(${A.x.toFixed(1)}px, ${A.y.toFixed(1)}px) scale(${P.toFixed(3)})`,E.setAttribute("data-depth",A.z.toFixed(4))}if(m&&m.length>0&&d.selectedIdx>=0){const S=t.nodeMap.get(d.selectedIdx);if(S){const C=nr([S.x,S.y,S.z],s,a,l),E=rr(i,[S.x,S.y,S.z],l);for(const A of m){const T=Bs(n,`shell-${A.nodeIdx}`);if(!T)continue;const P=A.width*E*.015,F=A.height*E*.015,D=C.x+A.centerX*E*.015,M=C.y+A.centerY*E*.015;T.style.display="",T.style.width=`${P.toFixed(1)}px`,T.style.height=`${F.toFixed(1)}px`,T.style.transform=`translate(-50%, -50%) translate(${D.toFixed(1)}px, ${M.toFixed(1)}px)`,T.style.zIndex=String(Math.max(0,9e3-A.shellLevel*10))}}}if(y&&y.length>0&&d.selectedIdx>=0){const S=t.nodeMap.get(d.selectedIdx);if(S){const C=nr([S.x,S.y,S.z],s,a,l),E=rr(i,[S.x,S.y,S.z],l),A=Math.max(.1,E*S.radius*2.5/80);for(const T of y){const P=Bs(n,T.duplicateId);if(!P)continue;const F=90*A,D=y.length*F,O=C.x-D/2+F/2+T.slotIndex*F,B=C.y+30*A;P.style.display="",P.style.opacity="1",P.style.transform=`translate(-50%, -50%) translate(${O.toFixed(1)}px, ${B.toFixed(1)}px) scale(${(A*.85).toFixed(3)})`,P.style.zIndex="9500"}}}for(const[,S]of n)S.classList.remove("hg-nesting-highlight","hg-nesting-highlight-parent","hg-nesting-highlight-child");if(_&&_.length>0)for(const S of _){const C=n.get(S.nodeIdx);C&&(C.classList.add("hg-nesting-highlight"),C.classList.toggle("hg-nesting-highlight-parent",S.role==="parent"),C.classList.toggle("hg-nesting-highlight-child",S.role==="child"))}if(x&&v){const S=v.querySelectorAll(".hg-decomp-child[data-clone]");for(const C of S){const E=Number(C.getAttribute("data-node-idx"));if(isNaN(E))continue;C.classList.toggle("selected",E===d.selectedIdx),C.classList.toggle("span-highlighted",E===d.hoverIdx);const A=n.get(E);if(A){for(const T of Array.from(C.classList))T.startsWith("viz-")&&!A.classList.contains(T)&&C.classList.remove(T);for(const T of Array.from(A.classList))T.startsWith("viz-")&&!C.classList.contains(T)&&C.classList.add(T)}}}if(x&&k&&v)Zo(v,o,w,n,d.selectedIdx);else if(v){const S=v.querySelector(":scope > .hg-nesting-connectors");S&&(S.style.display="none")}Jl()}function Bs(e,t){return document.querySelector(`[data-shell-idx="${t.replace("shell-","")}"], [data-duplicate-id="${t}"]`)}function Os(e,t,n,s,i,a){const l=i-e,o=a-t;if(l===0&&o===0)return[e,t];const d=Math.abs(l)>0?n/Math.abs(l):1/0,c=Math.abs(o)>0?s/Math.abs(o):1/0,f=Math.min(d,c);return[e+l*f,t+o*f]}function Xo(e){let t=e.querySelector(":scope > .hg-nesting-connectors");return t||(t=document.createElementNS("http://www.w3.org/2000/svg","svg"),t.setAttribute("class","hg-nesting-connectors"),e.appendChild(t)),t}function Zo(e,t,n,s,i){const a=e.querySelectorAll(".hg-decomp-child[data-clone]");if(a.length===0){const o=e.querySelector(":scope > .hg-nesting-connectors");o&&(o.style.display="none");return}const l=Xo(e);for(l.style.display="";l.firstChild;)l.removeChild(l.firstChild);for(const o of a){const d=Number(o.getAttribute("data-node-idx"));if(isNaN(d))continue;const c=n.get(d);if(!c)continue;const f=s.get(d);if(!f||f.style.display==="none")continue;const u=o.getBoundingClientRect();if(u.width===0)continue;const m=u.left+u.width/2-t.left,y=u.top+u.height/2-t.top,_=f.getBoundingClientRect(),[v,x]=Os(c.x,c.y,_.width/2,_.height/2,m,y),[k,p]=Os(m,y,u.width/2,u.height/2,c.x,c.y),h=d===i,g=h?" hg-connector-highlighted":"",b=document.createElementNS("http://www.w3.org/2000/svg","line");b.setAttribute("x1",v.toFixed(1)),b.setAttribute("y1",x.toFixed(1)),b.setAttribute("x2",k.toFixed(1)),b.setAttribute("y2",p.toFixed(1)),b.setAttribute("class","hg-connector-line"+g),l.appendChild(b);const w=document.createElementNS("http://www.w3.org/2000/svg","circle");w.setAttribute("cx",v.toFixed(1)),w.setAttribute("cy",x.toFixed(1)),w.setAttribute("r",h?"4.5":"3.5"),w.setAttribute("class","hg-connector-dot"+g),l.appendChild(w);const S=document.createElementNS("http://www.w3.org/2000/svg","circle");S.setAttribute("cx",k.toFixed(1)),S.setAttribute("cy",p.toFixed(1)),S.setAttribute("r",h?"4.5":"3.5"),S.setAttribute("class","hg-connector-dot"+g),l.appendChild(S)}}const Un=class Un{constructor(t,n,s){this.layout=t,this.nodeLayer=n,this.onSelectNode=s,this.expandedNodes=new Map,this.nodeElMap=new Map,this.lastExpandedKeyStr="",this.collapseTimers=new Map,this.collapsingContainers=new Map,this.refreshNodeElMap()}getNodeElMap(){return this.nodeElMap}getExpandedNodes(){return this.expandedNodes}getClonedChildIndices(){const t=new Set;for(const[,n]of this.expandedNodes)for(const s of n.clones){const i=s.getAttribute("data-node-idx");i!=null&&t.add(Number(i))}return t}getChildParentMap(){const t=new Map;for(const[n,s]of this.expandedNodes)for(const i of s.clones){const a=i.getAttribute("data-node-idx");a!=null&&t.set(Number(a),n)}return t}getHiddenDecompEdgeKeys(){const t=new Set;for(const[n,s]of this.expandedNodes)for(const i of s.clones){const a=i.getAttribute("data-node-idx");if(a!=null){const l=Number(a);t.add(ct(n,l)),t.add(ct(l,n))}}return t}update(t){const n=[...t].sort((s,i)=>s-i).join(",");if(n!==this.lastExpandedKeyStr){for(const s of[...this.expandedNodes.keys()])t.has(s)||this.collapseNode(s);for(const s of t)this.expandedNodes.has(s)||this.expandNode(s);this.reorderNodeLayer(),this.lastExpandedKeyStr=n}}collapseAll(){for(const[n,s]of this.collapseTimers){clearTimeout(s);const i=this.collapsingContainers.get(n);if(i){i.parentEl.classList.remove("hg-collapsing"),i.container.remove();const a=i.parentEl;a.__parentDown&&i.parentEl.removeEventListener("mousedown",a.__parentDown),a.__parentUp&&i.parentEl.removeEventListener("mouseup",a.__parentUp)}}this.collapseTimers.clear(),this.collapsingContainers.clear();const t=this.expandedNodes.size>0;for(const n of[...this.expandedNodes.keys()])this.forceCollapseNode(n);t&&this.reorderNodeLayer()}refreshNodeElMap(){this.nodeElMap.clear();const t=this.nodeLayer.children;for(let n=0;n<t.length;n++){const s=t[n],i=s.getAttribute("data-node-idx");i!=null&&this.nodeElMap.set(Number(i),s)}for(const n of this.expandedNodes.values()){const s=n.container.querySelectorAll("[data-node-idx]");for(const i of s){if(i.hasAttribute("data-clone"))continue;const a=i.getAttribute("data-node-idx");a!=null&&this.nodeElMap.set(Number(a),i)}}}collapseNode(t){const n=this.expandedNodes.get(t);if(!n)return;const s=this.collapseTimers.get(t);if(s!=null){clearTimeout(s),this.collapseTimers.delete(t);const c=this.collapsingContainers.get(t);c&&(c.container.remove(),this.collapsingContainers.delete(t))}const i=n.container.scrollHeight;n.container.innerHTML="",n.container.style.maxHeight=i+"px",n.parentEl.classList.remove("hg-expanded"),n.parentEl.classList.add("hg-collapsing"),n.container.offsetHeight,n.container.style.maxHeight="";const{parentEl:a,container:l}=n,o=()=>{this.collapseTimers.delete(t),a.classList.remove("hg-collapsing"),l.remove();const c=a;c.__parentDown&&a.removeEventListener("mousedown",c.__parentDown),c.__parentUp&&a.removeEventListener("mouseup",c.__parentUp),this.collapsingContainers.delete(t)},d=window.setTimeout(o,Un.TRANSITION_MS);this.collapseTimers.set(t,d),this.collapsingContainers.set(t,{parentEl:a,container:l}),this.expandedNodes.delete(t)}forceCollapseNode(t){const n=this.expandedNodes.get(t);if(!n)return;n.parentEl.classList.remove("hg-expanded"),n.container.remove();const s=n.parentEl;s.__parentDown&&n.parentEl.removeEventListener("mousedown",s.__parentDown),s.__parentUp&&n.parentEl.removeEventListener("mouseup",s.__parentUp),this.expandedNodes.delete(t)}expandNode(t){if(this.expandedNodes.has(t))return;const n=this.collapseTimers.get(t);if(n!=null){clearTimeout(n),this.collapseTimers.delete(t);const u=this.collapsingContainers.get(t);if(u){u.parentEl.classList.remove("hg-collapsing"),u.container.remove();const m=u.parentEl;m.__parentDown&&u.parentEl.removeEventListener("mousedown",m.__parentDown),m.__parentUp&&u.parentEl.removeEventListener("mouseup",m.__parentUp),this.collapsingContainers.delete(t)}}const s=this.layout.nodeMap.get(t);if(!s||s.isAtom)return;const i=_o(this.layout,t);if(i.length===0)return;this.refreshNodeElMap();const a=this.nodeElMap.get(t);if(!a)return;const l=document.createElement("div");l.className="decomp-patterns";const o=[];for(let u=0;u<i.length;u++){const m=i[u],y=document.createElement("div");y.className="decomp-row",y.style.background=Ns[u%Ns.length];const _=document.createElement("span");_.className="decomp-row-label",_.textContent=`P${m.patternIdx}`,y.appendChild(_);const v=document.createElement("div");v.className="decomp-tokens";for(const x of m.children){const k=this.nodeElMap.get(x.index);if(!k)continue;const p=k.cloneNode(!0);p.setAttribute("data-clone","true"),o.push(p),p.classList.add("hg-decomp-child"),p.style.flex=`${x.width} 0 0%`,v.appendChild(p)}y.appendChild(v),l.appendChild(y)}const d=this.onSelectNode,c=u=>{if(u.button!==0)return;const m=u.target.closest(".hg-decomp-child");if(m){const y=m.getAttribute("data-node-idx");y!=null&&d&&d(Number(y)),u.stopPropagation()}},f=u=>{u.target.closest(".hg-decomp-child")&&u.stopPropagation()};a.addEventListener("mousedown",c),a.addEventListener("mouseup",f),a.__parentDown=c,a.__parentUp=f,a.appendChild(l),this.expandedNodes.set(t,{parentEl:a,container:l,children:[],clones:o}),a.classList.add("hg-expanded")}reorderNodeLayer(){const t=new Map,n=this.nodeLayer.children;for(let s=0;s<n.length;s++){const i=n[s],a=i.getAttribute("data-node-idx");a!=null&&t.set(Number(a),i)}for(const s of this.layout.nodes){const i=t.get(s.index);i&&this.nodeLayer.appendChild(i)}}};Un.TRANSITION_MS=300;let Ar=Un;const Jo=40,Qo=20;function oa(e,t,n,s,i){const a=[],l=new Set([t]);let o=s,d=i,c=[t];for(let f=1;f<=n;f++){const u=[];for(const x of c){const k=e.nodeMap.get(x);if(k)for(const p of k.parentIndices)l.has(p)||(l.add(p),u.push(p))}if(u.length===0)break;const m=Jo+f*Qo,y=o+m*2,_=d+m*2,v=u.length;for(let x=0;x<v;x++){const k=v>1?(x-(v-1)/2)*y:0;a.push({nodeIdx:u[x],shellLevel:f,width:y,height:_,centerX:k,centerY:0})}o=y*v+m*2,d=_,c=u}return a}function ec(e,t,n){const s=new Set,i=[];if(n.length===0)return{hiddenEdgeKeys:s,highlights:i};i.push({nodeIdx:t,role:"parent"});for(const a of n)s.add(ct(t,a)),s.add(ct(a,t)),i.push({nodeIdx:a,role:"child"});return{hiddenEdgeKeys:s,highlights:i}}function tc(e,t,n,s,i,a,l,o,d,c,f){const u=Yn.value,m=n.current,y=j(a);y.current=a;const _=i.current.selectedIdx,v=Pe(()=>{const k=new Set,p=new Set;if(_>=0&&m){k.add(_);const h=m.nodeMap.get(_);if(h){for(const g of h.childIndices)k.add(g);for(const g of h.parentIndices)k.add(g)}for(const g of m.edges)(g.from===_||g.to===_)&&p.add(la(g.from,g.to,g.patternIdx))}return{connectedSet:k,connectedEdgeKeys:p}},[_,m]),x=j(v);x.current=v,ge(()=>{const k=e.current,p=t.current;if(!u||!m||!k||!p||m.nodes.length===0)return;const{device:h,format:g}=u,b=Uo(h,g,m.edges.length),w=new Ar(m,p,l),S=new Float32Array(16),C=new Float32Array(16),E=new Float32Array(32);let A=null,T=null;const P={layout:m,vizState:a,inter:i.current,connectedEdgeKeys:v.connectedEdgeKeys,hiddenDecompEdgeKeys:new Set,hiddenNestingEdgeKeys:new Set,lastParentCandidates:[]};let F=null,D=-2,M=-2,O=-1,B=null,I=!0,R=new Set,W=!1;const G=(L,z,q,oe,me,te,Re)=>{var rs;const Se=k.getBoundingClientRect(),Y=Math.max(0,Math.round(Se.left)),ve=Math.max(0,Math.round(Se.top)),xe=Math.min(Math.round(Se.width),me-Y),le=Math.min(Math.round(Se.height),te-ve);if(xe<=0||le<=0)return;L.setViewport(Y,ve,xe,le,0,1),L.setScissorRect(Y,ve,xe,le);const{viewProj:$,camPos:ne}=s.getViewProj(xe,le,oe),N=i.current,K=me,Ee=te,$e=xe/K,ze=le/Ee,Me=(2*Y+xe)/K-1,Ce=1-(2*ve+le)/Ee;S.fill(0),S[0]=$e,S[5]=ze,S[10]=1,S[15]=1,S[12]=Me,S[13]=Ce;const Ie=Er(S,$),we=Nt($);if(we){C.fill(0),C[0]=1/$e,C[5]=1/ze,C[10]=1,C[15]=1,C[12]=-Me/$e,C[13]=-Ce/ze;const re=Er(we,C);ea(Ie,re),aa(ne[0],ne[1],ne[2])}ta(Y,ve,xe,le);const se=s.stateRef.current,_e=se.target[0],Ue=se.target[1],ce=se.target[2],Ne=$,nt=Ne[3]*_e+Ne[7]*Ue+Ne[11]*ce+Ne[15],Pt=nt>.001?(Ne[2]*_e+Ne[6]*Ue+Ne[10]*ce+Ne[14])/nt:0;ra(Pt);const Ft=Math.sqrt((ne[0]-_e)**2+(ne[1]-Ue)**2+(ne[2]-ce)**2),pe=Math.PI/4;ia(2*Ft*Math.tan(pe/2)/le);const be=y.current,ie=c==null?void 0:c.current,Q=new Set;if(ie!=null&&ie.enabled&&(f!=null&&f.current)){N.selectedIdx>=0&&Q.add(N.selectedIdx);const re=be.searchPath;(re==null?void 0:re.root)!=null&&Q.add(re.root.index);const Le=(rs=re==null?void 0:re.root)==null?void 0:rs.index;for(const Te of[...Q])if(!(Te===Le||!m.nodeMap.get(Te)))for(const Ve of Q){if(Ve===Te)continue;const vt=m.nodeMap.get(Ve);if(vt&&vt.childIndices.includes(Te)){Q.delete(Te);break}}}w.update(Q);const de=d==null?void 0:d.current,rt=w.getClonedChildIndices();if(de){for(const re of R)if(!rt.has(re)){const Le=de.get(re),Te=m.nodeMap.get(re);Le&&Te&&(Te.tx=Le.x,Te.ty=Le.y,Te.tz=Le.z)}}R=new Set(rt);const st=o==null?void 0:o.current,De=N.selectedIdx>=0&&!!st&&!!de;if(De){for(const Ye of m.nodes){const Ve=de.get(Ye.index);Ve&&(Ye.tx=Ve.x,Ye.ty=Ve.y,Ye.tz=Ve.z)}const{anchorIdx:re,offsets:Le}=st,Te=de.get(re);if(Te){const Ye=s.getAxes(),[Ve,vt,mn]=Ye.right,[vn,Zn,Na]=Ye.up;for(const[Ba,Mt]of Le){const _n=m.nodeMap.get(Ba);_n&&(_n.tx=Te.x+Mt.dRight*Ve+Mt.dUp*vn,_n.ty=Te.y+Mt.dRight*vt+Mt.dUp*Zn,_n.tz=Te.z+Mt.dRight*mn+Mt.dUp*Na)}}}else if(W&&de){for(const re of m.nodes){const Le=de.get(re.index);Le&&(re.tx=Le.x,re.ty=Le.y,re.tz=Le.z)}o&&(o.current=null)}W=De,I=qo(m.nodes,oe);let ft=[],jt=[],ts=[];if(ie!=null&&ie.enabled&&N.selectedIdx>=0){const re=w.getNodeElMap().get(N.selectedIdx),Le=(re==null?void 0:re.offsetWidth)??80,Te=(re==null?void 0:re.offsetHeight)??30;ft=oa(m,N.selectedIdx,ie.parentDepth,Le,Te);const Ye=new Set,Ve=[];for(const vt of Q){const mn=m.nodeMap.get(vt);if(!mn)continue;const vn=ec(m,vt,mn.childIndices);for(const Zn of vn.hiddenEdgeKeys)Ye.add(Zn);Ve.push(...vn.highlights)}ts=ie.duplicateMode?Ve:[],P.hiddenNestingEdgeKeys=Ye}else P.hiddenNestingEdgeKeys=new Set;const gn=x.current;Ko({layout:m,nodeElMap:w.getNodeElMap(),viewProj:$,camPos:ne,vw:xe,vh:le,containerRect:Se,inter:N,vizInvolvedNodes:be.involvedNodes,connectedSet:gn.connectedSet,decomposition:w,shells:ft,duplicates:jt,nestingHighlights:ts,containerEl:k,nestingEnabled:(ie==null?void 0:ie.enabled)??!1,duplicateMode:(ie==null?void 0:ie.duplicateMode)??!1});const za=w.getHiddenDecompEdgeKeys(),ns=w.getExpandedNodes().size;(I||N.dragIdx>=0||be!==F||N.selectedIdx!==D||N.hoverIdx!==M||ns!==O||gn.connectedEdgeKeys!==B)&&(P.vizState=be,P.inter=N,P.connectedEdgeKeys=gn.connectedEdgeKeys,P.hiddenDecompEdgeKeys=za,jo(b.edgeDataBuf,P),z.queue.writeBuffer(b.edgeIB,0,b.edgeDataBuf.buffer,b.edgeDataBuf.byteOffset,b.edgeDataBuf.byteLength),F=be,D=N.selectedIdx,M=N.hoverIdx,O=ns,B=gn.connectedEdgeKeys),E.set($,0),E.set([ne[0],ne[1],ne[2],0],16),E.set([q,0,0,0],20),z.queue.writeBuffer(b.camUB,0,E);const Xn=Bi.value;Xn!==A&&(A=Xn,T=Yi(Xn)),z.queue.writeBuffer(b.paletteUB,0,T.buffer,T.byteOffset,T.byteLength),L.setPipeline(b.gridPipeline),L.setVertexBuffer(0,b.quadVB),L.setVertexBuffer(1,b.gridIB),L.setBindGroup(0,b.camBG),L.draw(6,b.gridCount),L.setPipeline(b.edgePipeline),L.setVertexBuffer(0,b.quadVB),L.setVertexBuffer(1,b.edgeIB),L.setBindGroup(0,b.camBG),L.draw(6,m.edges.length),L.setViewport(0,0,me,te,0,1),L.setScissorRect(0,0,me,te)};return qi(G),()=>{w.collapseAll(),Ki(G),Wo(b)}},[u,m,s])}const ca="hg-nesting-settings",Yt={enabled:!1,duplicateMode:!1,parentDepth:2,childDepth:1};function nc(){try{const e=localStorage.getItem(ca);if(e){const t=JSON.parse(e);return{enabled:typeof t.enabled=="boolean"?t.enabled:Yt.enabled,duplicateMode:typeof t.duplicateMode=="boolean"?t.duplicateMode:Yt.duplicateMode,parentDepth:typeof t.parentDepth=="number"?Math.max(1,Math.min(5,t.parentDepth)):Yt.parentDepth,childDepth:typeof t.childDepth=="number"?Math.max(1,Math.min(3,t.childDepth)):Yt.childDepth}}}catch{}return{...Yt}}function rc(e){try{localStorage.setItem(ca,JSON.stringify(e))}catch{}}function sc(){const[e,t]=V(nc),n=ae(s=>{t(i=>{const a={...i,...s};return a.parentDepth=Math.max(1,Math.min(5,a.parentDepth)),a.childDepth=Math.max(1,Math.min(3,a.childDepth)),rc(a),a})},[]);return{nestingSettings:e,setNestingSettings:n}}function ic({node:e,layout:t,vizState:n,onFocusNode:s}){const i=Ao(e.index,n),a=l=>{t.nodeMap.get(l)&&s(l)};return r("div",{class:"node-info-panel",children:[r("div",{class:"nip-header",children:[r("span",{class:"nip-title",children:e.label}),r("span",{class:`nip-badge ${e.isAtom?"atom":"compound"}`,children:e.isAtom?"Atom":`W${e.width}`})]}),r("div",{class:"nip-section",children:[r("div",{class:"nip-row",children:[r("span",{class:"nip-label",children:"Index"}),r("span",{class:"nip-value",children:["#",e.index]})]}),r("div",{class:"nip-row",children:[r("span",{class:"nip-label",children:"Width"}),r("span",{class:"nip-value",children:e.width})]})]}),e.parentIndices.length>0&&r("div",{class:"nip-section",children:[r("div",{class:"nip-section-title",children:["Parents (",e.parentIndices.length,")"]}),r("div",{class:"nip-indices",children:[e.parentIndices.slice(0,8).map(l=>r("span",{class:"nip-idx nip-link",onClick:()=>a(l),children:["#",l]},l)),e.parentIndices.length>8&&r("span",{class:"nip-idx",children:["+",e.parentIndices.length-8]})]})]}),e.childIndices.length>0&&r("div",{class:"nip-section",children:[r("div",{class:"nip-section-title",children:["Children (",e.childIndices.length,")"]}),r("div",{class:"nip-indices",children:[e.childIndices.slice(0,8).map(l=>r("span",{class:"nip-idx nip-link",onClick:()=>a(l),children:["#",l]},l)),e.childIndices.length>8&&r("span",{class:"nip-idx",children:["+",e.childIndices.length-8]})]})]}),i.length>0&&r("div",{class:"nip-viz-state",children:[r("div",{class:"nip-section-title",children:"Visualization State"}),r("div",{class:"nip-indices",children:i.map(l=>r("span",{class:`nip-viz-badge ${l}`,children:l.replace("-"," ")},l))})]})]})}function ac({snapshot:e}){return r("div",{class:"hypergraph-info",children:[r("div",{class:"hg-title",children:"Hypergraph"}),r("div",{class:"hg-row",children:[r("span",{class:"hg-label",children:"Nodes"}),r("span",{class:"hg-value",children:e.nodes.length})]}),r("div",{class:"hg-row",children:[r("span",{class:"hg-label",children:"Edges"}),r("span",{class:"hg-value",children:e.edges.length})]}),r("div",{class:"hg-row",children:[r("span",{class:"hg-label",children:"Atoms"}),r("span",{class:"hg-value",children:e.nodes.filter(t=>t.width===1).length})]})]})}function Gs(e,t){if(e===1)return"level-info";const n=(e-1)/Math.max(t-1,1);return n>.7?"level-error":n>.4?"level-warn":"level-debug"}function lc({nodes:e,maxWidth:t,vizState:n,duplicates:s,duplicatedOriginals:i,shells:a,renderNode:l}){const o=new Map;for(const d of e)o.set(d.index,d);return r(ue,{children:[a==null?void 0:a.map(d=>{const c=o.get(d.nodeIdx);return c?r("div",{class:"hg-nesting-shell","data-shell-idx":d.nodeIdx,"data-shell-level":d.shellLevel,children:r("span",{class:"hg-shell-label",children:c.label})},`shell-${d.nodeIdx}`):null}),e.map(d=>{const c=Gs(d.width,t),f=$s(d.index,n),u=i==null?void 0:i.has(d.index);return r("div",{class:`hg-node ${l?"hg-node--custom":c} ${d.isAtom?"hg-atom":"hg-compound"} ${f}${u?" hg-has-duplicate":""}`,"data-node-idx":d.index,children:l?l(d):r("div",{class:"hg-node-content",children:[r("span",{class:`level-badge ${c}`,children:d.isAtom?"ATOM":`W${d.width}`}),r("span",{class:"hg-node-label",children:d.label}),r("span",{class:"hg-node-idx",children:["#",d.index]})]})},d.index)}),s==null?void 0:s.map(d=>{const c=o.get(d.originalIdx);if(!c)return null;const f=Gs(c.width,t),u=$s(c.index,n);return r("div",{class:`hg-node hg-duplicate ${l?"hg-node--custom":f} ${c.isAtom?"hg-atom":"hg-compound"} ${u}`,"data-node-idx":c.index,"data-duplicate-id":d.duplicateId,"data-duplicate-parent":d.parentIdx,children:l?l(c):r("div",{class:"hg-node-content",children:[r("span",{class:`level-badge ${f}`,children:c.isAtom?"ATOM":`W${c.width}`}),r("span",{class:"hg-node-label",children:c.label}),r("span",{class:"hg-node-idx",children:["#",c.index]})]})},d.duplicateId)})]})}function oc(e){const{snapshot:t,currentEvent:n,searchPath:s,autoLayout:i,snapshotEdges:a,stepKey:l,renderChildren:o,renderNode:d}=e,c=j(null),f=j(null),[u,m]=V(null),y=j(null),_=j(null),v=Eo(),x=Fo(n,s,a),k=j(i);k.current=i;const{selectedIdx:p,setSelectedIdx:h,interRef:g}=Do(c,y,v,k);Bo(c,y,v,g,h);const{nestingSettings:b,setNestingSettings:w}=sc(),S=j(b);S.current=b;const{nestShells:C,nestDuplicates:E,nestDuplicatedOriginals:A}=Pe(()=>!u||p<0||!i||!b.enabled?{nestShells:[],nestDuplicates:[],nestDuplicatedOriginals:new Set}:{nestShells:oa(u,p,b.parentDepth,80,30),nestDuplicates:[],nestDuplicatedOriginals:new Set},[u,p,i,b.enabled,b.parentDepth]);ge(()=>{if(!t){y.current=null,m(null);return}const M=yo(t);y.current=M,m(M);const O=new Map;for(const B of M.nodes)O.set(B.index,{x:B.tx,y:B.ty,z:B.tz});_.current=O,v.resetForLayout(M.nodes.length,M.center),g.current.selectedIdx=-1,g.current.hoverIdx=-1,h(-1)},[t,v,h]);const T=j(null);ge(()=>{const M=y.current;if(M)if(p>=0&&i){let O;s!=null&&s.root?O=ko(M,s,p):O=Tr(M,p),T.current=O;const B=Ds(M,p,b,s),I=M.nodeMap.get(B);I&&v.focusOn([I.tx,I.ty,I.tz])}else if(p>=0){T.current=null;const O=Ds(M,p,b,s),B=M.nodeMap.get(O);B&&v.focusOn([B.tx,B.ty,B.tz])}else T.current=null},[p,v,s,i,b.enabled,b.duplicateMode]),ge(()=>{const M=y.current;if(!M||!n)return;const O=Po(n.transition,n.location);O!=null&&M.nodeMap.get(O)&&(g.current.selectedIdx=O,h(O))},[l,v,h]),tc(c,f,y,v,g,x,h,T,_,S,k);const P=ae(M=>{const O=y.current;if(!O)return;O.nodeMap.get(M)&&h(M)},[h]);if(!t)return r("div",{class:"hypergraph-container hg-dom-mode",children:r("div",{class:"hypergraph-empty",children:[r("span",{children:"No hypergraph data found in current log"}),r("div",{class:"hg-hint",children:["To visualize the graph, call"," ",r("code",{children:"graph.emit_graph_snapshot()"})," in your Rust test after building the graph. This emits a structured tracing event that the log viewer can render."]})]})});const F=(u==null?void 0:u.maxWidth)??1,D=p>=0?u==null?void 0:u.nodeMap.get(p):null;return r("div",{ref:c,class:"hypergraph-container hg-dom-mode",children:[r("div",{ref:f,class:"hg-node-layer",children:u&&r(lc,{nodes:u.nodes,maxWidth:F,vizState:x,shells:C,duplicates:E,duplicatedOriginals:A,renderNode:d})}),r(ac,{snapshot:t}),D&&u&&r(ic,{node:D,layout:u,vizState:x,onFocusNode:P}),o==null?void 0:o({handleFocusNode:P,nestingSettings:b,setNestingSettings:w})]})}const da=ja(null);function mt(){return Ka(da)}function cc({store:e,children:t}){return r(da.Provider,{value:e,children:t})}function U({label:e,description:t,colorKey:n}){const s=mt(),i=s.themeColors.value[n];return r("div",{class:"theme-color-row",children:[r("div",{class:"theme-color-info",children:[r("span",{class:"theme-color-label",children:e}),t&&r("span",{class:"theme-color-desc",children:t})]}),r("div",{class:"theme-color-controls",children:[r("input",{type:"color",class:"theme-color-picker",value:i,onInput:a=>s.updateColor(n,a.target.value)}),r("input",{type:"text",class:"theme-color-hex",value:i,maxLength:7,onInput:a=>{const l=a.target.value;/^#[0-9a-fA-F]{6}$/.test(l)&&s.updateColor(n,l)}}),r("button",{class:"theme-color-reset",title:"Reset to default",onClick:()=>s.updateColor(n,s.defaultTheme[n]),children:"↺"})]})]})}function Ae({title:e,icon:t,children:n,defaultOpen:s=!1,className:i}){const[a,l]=V(s);return r("section",{class:`theme-section ${a?"open":""}${i?` ${i}`:""}`,children:[r("button",{class:"theme-section-header",onClick:()=>l(!a),children:[r("span",{class:"theme-section-icon",children:t}),r("span",{class:"theme-section-title",children:e}),r("span",{class:"theme-section-chevron",children:a?"▾":"▸"})]}),a&&r("div",{class:"theme-section-body",children:n})]})}function dc(){const e=mt(),[t,n]=V(!1),[s,i]=V(!1),[a,l]=V(""),o=j(null);async function d(){const c=a.trim();if(!(!c||s)){i(!0);try{const f=await Xi();e.saveTheme(c,f)}catch{e.saveTheme(c)}l(""),n(!1),i(!1)}}return t?r("div",{class:"save-theme-inline",children:[r("input",{ref:o,type:"text",class:"save-theme-input",placeholder:"Theme name…",value:a,maxLength:40,onInput:c=>l(c.target.value),onKeyDown:c=>{c.key==="Enter"&&d(),c.key==="Escape"&&(n(!1),l(""))}}),r("button",{class:"btn btn-primary",onClick:()=>void d(),disabled:!a.trim()||s,children:s?"…":"Save"}),r("button",{class:"btn btn-secondary",onClick:()=>{n(!1),l("")},children:"✕"})]}):r("button",{class:"btn btn-primary",onClick:()=>{n(!0),setTimeout(()=>{var c;return(c=o.current)==null?void 0:c.focus()},0)},children:"💾 Save Theme"})}function uc({theme:e}){const t=mt(),[n,s]=V(!1),[i,a]=V(!1),[l,o]=V(!1),[d,c]=V(!1),[f,u]=V(e.name);async function m(){o(!0);try{const x=await Xi();t.updateSavedTheme(e.id,x)}catch{t.updateSavedTheme(e.id)}o(!1),a(!1)}function y(){const x=f.trim();x&&x!==e.name&&t.renameSavedTheme(e.id,x),c(!1)}const _=new Date(e.createdAt),v=`${_.toLocaleDateString()} ${_.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`;return r("div",{class:"saved-theme-card",children:[e.thumbnail?r("img",{class:"saved-theme-thumbnail",src:e.thumbnail,alt:e.name}):r("div",{class:"saved-theme-swatches",children:[r("span",{class:"theme-preset-swatch",style:{background:e.colors.bgPrimary}}),r("span",{class:"theme-preset-swatch",style:{background:e.colors.accentOrange}}),r("span",{class:"theme-preset-swatch",style:{background:e.colors.accentBlue}}),r("span",{class:"theme-preset-swatch",style:{background:e.colors.levelError}}),r("span",{class:"theme-preset-swatch",style:{background:e.colors.cinderEmber}}),r("span",{class:"theme-preset-swatch",style:{background:e.colors.textPrimary}})]}),r("div",{class:"saved-theme-info",children:[d?r("input",{type:"text",class:"save-theme-input saved-theme-rename",value:f,maxLength:40,onInput:x=>u(x.target.value),onKeyDown:x=>{x.key==="Enter"&&y(),x.key==="Escape"&&(c(!1),u(e.name))},onBlur:y,autoFocus:!0}):r("strong",{class:"saved-theme-name",onDblClick:()=>c(!0),title:"Double-click to rename",children:e.name}),r("span",{class:"saved-theme-date",children:v})]}),r("div",{class:"saved-theme-actions",children:[r("button",{class:"btn btn-primary btn-sm",onClick:()=>t.applySavedTheme(e),title:"Apply this theme",children:"Apply"}),i?r("button",{class:"btn btn-warn btn-sm",onClick:()=>void m(),disabled:l,children:l?"…":"Confirm"}):r("button",{class:"btn btn-secondary btn-sm",onClick:()=>a(!0),title:"Overwrite with current colors",children:"✏️"}),n?r("button",{class:"btn btn-danger btn-sm",onClick:()=>{t.deleteTheme(e.id),s(!1)},children:"Confirm"}):r("button",{class:"btn btn-secondary btn-sm",onClick:()=>s(!0),title:"Delete this theme",children:"🗑"})]})]})}function pc(){const t=mt().savedThemes.value;return r("div",{class:"saved-themes-panel",children:[r("h3",{class:"saved-themes-title",children:"Saved Themes"}),r("p",{class:"saved-themes-subtitle",children:"Your custom themes, stored in the browser."}),t.length===0?r("div",{class:"saved-themes-empty",children:[r("span",{class:"saved-themes-empty-icon",children:"◇"}),r("p",{children:"No saved themes yet."}),r("p",{class:"saved-themes-empty-hint",children:'Use the "💾 Save Theme" button to save your current color configuration.'})]}):r("div",{class:"saved-themes-list",children:t.map(n=>r(uc,{theme:n},n.id))})]})}function fc(){const e=mt(),t=j(null),[n,s]=V(null);async function i(a){var c;const l=a.target,o=(c=l.files)==null?void 0:c[0];if(!o)return;const d=await e.importTheme(o);s(d??null),l.value=""}return r(ue,{children:[r("input",{ref:t,type:"file",accept:".json,application/json",style:{display:"none"},onChange:a=>void i(a)}),r("button",{class:"btn btn-secondary",onClick:()=>{var a;return(a=t.current)==null?void 0:a.click()},title:"Load a theme from a .json file",children:"📂 Import"}),n&&r("span",{class:"theme-import-error",children:n})]})}function hc(){const e=mt();return r(ue,{children:[r(Ae,{title:"Theme Presets",icon:"◆",defaultOpen:!0,children:r("div",{class:"theme-presets-grid",children:e.presets.map(t=>r("button",{class:"theme-preset-card",onClick:()=>e.applyPreset(t),children:[r("div",{class:"theme-preset-swatches",children:[r("span",{class:"theme-preset-swatch",style:{background:t.colors.bgPrimary}}),r("span",{class:"theme-preset-swatch",style:{background:t.colors.accentOrange}}),r("span",{class:"theme-preset-swatch",style:{background:t.colors.accentBlue}}),r("span",{class:"theme-preset-swatch",style:{background:t.colors.levelError}}),r("span",{class:"theme-preset-swatch",style:{background:t.colors.cinderEmber}})]}),r("div",{class:"theme-preset-info",children:[r("strong",{children:t.name}),r("span",{children:t.description})]})]},t.name))})}),r(Ae,{title:"Backgrounds",icon:"▧",children:[r(U,{label:"Primary",description:"Main app background",colorKey:"bgPrimary"}),r(U,{label:"Secondary",description:"Header, panels",colorKey:"bgSecondary"}),r(U,{label:"Tertiary",description:"Inputs, nested areas",colorKey:"bgTertiary"}),r(U,{label:"Hover",description:"Hovered elements",colorKey:"bgHover"}),r(U,{label:"Active",description:"Active/pressed state",colorKey:"bgActive"})]}),r(Ae,{title:"Text & Fonts",icon:"A",children:[r(U,{label:"Primary Text",description:"Main content text",colorKey:"textPrimary"}),r(U,{label:"Secondary Text",description:"Labels, metadata",colorKey:"textSecondary"}),r(U,{label:"Muted Text",description:"Disabled, hints",colorKey:"textMuted"})]}),r(Ae,{title:"Borders",icon:"□",children:[r(U,{label:"Border",description:"Panel and input borders",colorKey:"borderColor"}),r(U,{label:"Subtle Border",description:"Very faint separators",colorKey:"borderSubtle"})]}),r(Ae,{title:"Accent Colors",icon:"◈",children:[r(U,{label:"Blue",description:"Links, focus rings",colorKey:"accentBlue"}),r(U,{label:"Green",description:"Success, vine",colorKey:"accentGreen"}),r(U,{label:"Orange",description:"Primary accent, bonfire",colorKey:"accentOrange"}),r(U,{label:"Purple",description:"Special highlights",colorKey:"accentPurple"}),r(U,{label:"Yellow",description:"Tarnished gold",colorKey:"accentYellow"})]}),r(Ae,{title:"Log Level Colors",icon:"▤",children:[r(U,{label:"TRACE",description:"Faintest level",colorKey:"levelTrace"}),r(U,{label:"DEBUG",description:"Debug output",colorKey:"levelDebug"}),r(U,{label:"INFO",description:"Informational",colorKey:"levelInfo"}),r(U,{label:"WARN",description:"Warnings",colorKey:"levelWarn"}),r(U,{label:"ERROR",description:"Errors",colorKey:"levelError"})]}),r(Ae,{title:"Log Level Text Colors",icon:"T",children:[r("p",{class:"theme-section-hint",children:"Text colors for log level badges."}),r(U,{label:"TRACE Text",colorKey:"levelTraceText"}),r(U,{label:"DEBUG Text",colorKey:"levelDebugText"}),r(U,{label:"INFO Text",colorKey:"levelInfoText"}),r(U,{label:"WARN Text",colorKey:"levelWarnText"}),r(U,{label:"ERROR Text",colorKey:"levelErrorText"})]}),r(Ae,{title:"Span Badge Colors",icon:"→",children:[r(U,{label:"Enter Span",colorKey:"spanEnterText"}),r(U,{label:"Exit Span",colorKey:"spanExitText"})]}),r(Ae,{title:"GPU Rendering",icon:"⬢",children:r("div",{class:"theme-toggle-row",children:[r("div",{class:"theme-color-info",children:[r("span",{class:"theme-color-label",children:"Enable GPU"}),r("span",{class:"theme-color-desc",children:"Master switch for WebGPU rendering"})]}),r("label",{class:"theme-toggle",children:[r("input",{type:"checkbox",checked:qe.value,onChange:t=>{qe.value=t.target.checked}}),r("span",{class:"theme-toggle-slider"})]})]})})]})}function gc(){const e=mt(),t=e.effectSettings.value;return r(ue,{children:[r(Ae,{title:"Particles: Metal Sparks",icon:"✦",className:"effect-preview-sparks",children:[r("p",{class:"theme-section-hint",children:"Sparks spawn at the mouse cursor when hovering over elements."}),r("div",{class:"theme-toggle-row",children:[r("div",{class:"theme-color-info",children:r("span",{class:"theme-color-label",children:"Enable Sparks"})}),r("label",{class:"toggle-switch",children:[r("input",{type:"checkbox",checked:t.sparksEnabled,onChange:n=>e.updateEffect("sparksEnabled",n.target.checked)}),r("span",{class:"toggle-slider"})]})]}),t.sparksEnabled&&r(ue,{children:[r(U,{label:"Hot Core",colorKey:"particleSparkCore"}),r(U,{label:"Ember",colorKey:"particleSparkEmber"}),r(U,{label:"Steel",colorKey:"particleSparkSteel"}),[{key:"sparkSpeed",label:"Speed",max:300},{key:"sparkCount",label:"Count",max:200},{key:"sparkSize",label:"Size",max:300}].map(({key:n,label:s,max:i})=>r("div",{class:"theme-slider-row",children:[r("div",{class:"theme-color-info",children:r("span",{class:"theme-color-label",children:s})}),r("div",{class:"theme-slider-controls",children:[r("input",{type:"range",min:"0",max:String(i),step:"1",value:t[n],onInput:a=>e.updateEffect(n,parseInt(a.target.value,10)),class:"theme-range-slider"}),r("span",{class:"theme-slider-value",children:[t[n],"%"]})]})]},n))]})]}),r(Ae,{title:"Particles: Embers / Ash",icon:"🔥",className:"effect-preview-embers",children:[r("p",{class:"theme-section-hint",children:"Rising embers/ash from hovered element borders."}),r("div",{class:"theme-toggle-row",children:[r("div",{class:"theme-color-info",children:r("span",{class:"theme-color-label",children:"Enable Embers"})}),r("label",{class:"toggle-switch",children:[r("input",{type:"checkbox",checked:t.embersEnabled,onChange:n=>e.updateEffect("embersEnabled",n.target.checked)}),r("span",{class:"toggle-slider"})]})]}),t.embersEnabled&&r(ue,{children:[r(U,{label:"Hot",colorKey:"particleEmberHot"}),r(U,{label:"Base",colorKey:"particleEmberBase"}),[{key:"emberSpeed",label:"Speed",max:300},{key:"emberCount",label:"Count",max:200},{key:"emberSize",label:"Size",max:300}].map(({key:n,label:s,max:i})=>r("div",{class:"theme-slider-row",children:[r("div",{class:"theme-color-info",children:r("span",{class:"theme-color-label",children:s})}),r("div",{class:"theme-slider-controls",children:[r("input",{type:"range",min:"0",max:String(i),step:"1",value:t[n],onInput:a=>e.updateEffect(n,parseInt(a.target.value,10)),class:"theme-range-slider"}),r("span",{class:"theme-slider-value",children:[t[n],"%"]})]})]},n))]})]}),r(Ae,{title:"Particles: Angelic Beams",icon:"✧",className:"effect-preview-beams",children:[r("p",{class:"theme-section-hint",children:"Pixel-thin vertical rays rising from the selected element."}),r("div",{class:"theme-toggle-row",children:[r("div",{class:"theme-color-info",children:r("span",{class:"theme-color-label",children:"Enable Beams"})}),r("label",{class:"toggle-switch",children:[r("input",{type:"checkbox",checked:t.beamsEnabled,onChange:n=>e.updateEffect("beamsEnabled",n.target.checked)}),r("span",{class:"toggle-slider"})]})]}),t.beamsEnabled&&r(ue,{children:[r(U,{label:"Center",colorKey:"particleBeamCenter"}),r(U,{label:"Edge",colorKey:"particleBeamEdge"}),[{key:"beamSpeed",label:"Speed",max:300},{key:"beamHeight",label:"Height",max:100},{key:"beamCount",label:"Count",max:1024},{key:"beamDrift",label:"Drift",max:300}].map(({key:n,label:s,max:i})=>r("div",{class:"theme-slider-row",children:[r("div",{class:"theme-color-info",children:r("span",{class:"theme-color-label",children:s})}),r("div",{class:"theme-slider-controls",children:[r("input",{type:"range",min:n==="beamHeight"?"10":"0",max:String(i),step:"1",value:t[n],onInput:a=>e.updateEffect(n,parseInt(a.target.value,10)),class:"theme-range-slider"}),r("span",{class:"theme-slider-value",children:t[n]||(n==="beamCount"?"All":"0")})]})]},n))]})]}),r(Ae,{title:"Particles: Glitter",icon:"✨",className:"effect-preview-glitter",children:[r("p",{class:"theme-section-hint",children:"Twinkling sparkles drifting along hovered element borders."}),r("div",{class:"theme-toggle-row",children:[r("div",{class:"theme-color-info",children:r("span",{class:"theme-color-label",children:"Enable Glitter"})}),r("label",{class:"toggle-switch",children:[r("input",{type:"checkbox",checked:t.glitterEnabled,onChange:n=>e.updateEffect("glitterEnabled",n.target.checked)}),r("span",{class:"toggle-slider"})]})]}),t.glitterEnabled&&r(ue,{children:[r(U,{label:"Warm",colorKey:"particleGlitterWarm"}),r(U,{label:"Cool",colorKey:"particleGlitterCool"}),[{key:"glitterSpeed",label:"Speed",max:300},{key:"glitterCount",label:"Count",max:200},{key:"glitterSize",label:"Size",max:300}].map(({key:n,label:s,max:i})=>r("div",{class:"theme-slider-row",children:[r("div",{class:"theme-color-info",children:r("span",{class:"theme-color-label",children:s})}),r("div",{class:"theme-slider-controls",children:[r("input",{type:"range",min:"0",max:String(i),step:"1",value:t[n],onInput:a=>e.updateEffect(n,parseInt(a.target.value,10)),class:"theme-range-slider"}),r("span",{class:"theme-slider-value",children:[t[n],"%"]})]})]},n))]})]}),r(Ae,{title:"Cinder Palette",icon:"◎",children:[r("p",{class:"theme-section-hint",children:"The four-color cycle used for border glows and hover effects."}),r("div",{class:"theme-toggle-row",children:[r("div",{class:"theme-color-info",children:r("span",{class:"theme-color-label",children:"Enable Cinder"})}),r("label",{class:"toggle-switch",children:[r("input",{type:"checkbox",checked:t.cinderEnabled,onChange:n=>e.updateEffect("cinderEnabled",n.target.checked)}),r("span",{class:"toggle-slider"})]})]}),t.cinderEnabled&&r(ue,{children:[r(U,{label:"Ember",colorKey:"cinderEmber"}),r(U,{label:"Gold",colorKey:"cinderGold"}),r(U,{label:"Ash",colorKey:"cinderAsh"}),r(U,{label:"Vine",colorKey:"cinderVine"}),r("div",{class:"theme-slider-row",children:[r("div",{class:"theme-color-info",children:r("span",{class:"theme-color-label",children:"Size"})}),r("div",{class:"theme-slider-controls",children:[r("input",{type:"range",min:"0",max:"300",step:"1",value:t.cinderSize,onInput:n=>e.updateEffect("cinderSize",parseInt(n.target.value,10)),class:"theme-range-slider"}),r("span",{class:"theme-slider-value",children:[t.cinderSize,"%"]})]})]})]})]}),r(Ae,{title:"Background Smoke",icon:"☁",children:[r("p",{class:"theme-section-hint",children:"Base tones and noise parameters for the animated smoky background layers."}),r("div",{class:"theme-toggle-row",children:[r("div",{class:"theme-color-info",children:r("span",{class:"theme-color-label",children:"Enable Smoke"})}),r("label",{class:"toggle-switch",children:[r("input",{type:"checkbox",checked:t.smokeEnabled,onChange:n=>e.updateEffect("smokeEnabled",n.target.checked)}),r("span",{class:"toggle-slider"})]})]}),t.smokeEnabled&&r(ue,{children:[r(U,{label:"Cool Tone",colorKey:"smokeCool"}),r(U,{label:"Warm Tone",colorKey:"smokeWarm"}),r(U,{label:"Moss Tone",colorKey:"smokeMoss"}),[{key:"smokeIntensity",label:"Intensity",max:100},{key:"smokeSpeed",label:"Speed",max:500},{key:"smokeWarmScale",label:"Warm Scale",max:200},{key:"smokeCoolScale",label:"Cool Scale",max:200},{key:"smokeMossScale",label:"Moss Scale",max:200},{key:"grainIntensity",label:"Grain Intensity",max:100},{key:"grainCoarseness",label:"Grain Coarseness",max:100},{key:"grainSize",label:"Grain Size",max:100},{key:"vignetteStrength",label:"Vignette",max:100},{key:"underglowStrength",label:"Underglow",max:100}].map(({key:n,label:s,max:i})=>r("div",{class:"theme-slider-row",children:[r("div",{class:"theme-color-info",children:r("span",{class:"theme-color-label",children:s})}),r("div",{class:"theme-slider-controls",children:[r("input",{type:"range",min:"0",max:String(i),step:"1",value:t[n],onInput:a=>e.updateEffect(n,parseInt(a.target.value,10)),class:"theme-range-slider"}),r("span",{class:"theme-slider-value",children:[t[n],i===100?"%":""]})]})]},n))]})]}),r(Ae,{title:"Glass Panels",icon:"◻",defaultOpen:!0,children:[r("p",{class:"theme-section-hint",children:"Sidebar, header, and tab-bar glass panel opacity and blur."}),[{key:"glassOpacity",label:"Opacity",desc:"Background panel transparency"},{key:"glassBlur",label:"Blur",desc:"Backdrop blur intensity"}].map(({key:n,label:s,desc:i})=>r("div",{class:"theme-slider-row",children:[r("div",{class:"theme-color-info",children:[r("span",{class:"theme-color-label",children:s}),r("span",{class:"theme-color-desc",children:i})]}),r("div",{class:"theme-slider-controls",children:[r("input",{type:"range",min:"0",max:"100",step:"1",value:t[n],onInput:a=>e.updateEffect(n,parseInt(a.target.value,10)),class:"theme-range-slider"}),r("span",{class:"theme-slider-value",children:[t[n],"%"]})]})]},n))]}),r(Ae,{title:"CRT Effect",icon:"▤",defaultOpen:!0,children:[r("p",{class:"theme-section-hint",children:"Retro CRT post-processing - scanlines, pixel grid, edge shadow, torch flicker."}),r("div",{class:"theme-toggle-row",children:[r("div",{class:"theme-color-info",children:r("span",{class:"theme-color-label",children:"Enable CRT"})}),r("label",{class:"toggle-switch",children:[r("input",{type:"checkbox",checked:t.crtEnabled,onChange:n=>e.updateEffect("crtEnabled",n.target.checked)}),r("span",{class:"toggle-slider"})]})]}),t.crtEnabled&&r(ue,{children:[[{key:"crtScanlinesH",label:"H Scanlines"},{key:"crtScanlinesV",label:"V Scanlines"},{key:"crtEdgeShadow",label:"Edge Shadow"},{key:"crtFlicker",label:"Flicker"},{key:"crtLineWidth",label:"Line Width"}].map(({key:n,label:s})=>r("div",{class:"theme-slider-row",children:[r("div",{class:"theme-color-info",children:r("span",{class:"theme-color-label",children:s})}),r("div",{class:"theme-slider-controls",children:[r("input",{type:"range",min:"0",max:"100",step:"1",value:t[n],onInput:i=>e.updateEffect(n,parseInt(i.target.value,10)),class:"theme-range-slider"}),r("span",{class:"theme-slider-value",children:[t[n],"%"]})]})]},n)),r("div",{class:"theme-slider-row",children:[r("div",{class:"theme-color-info",children:r("span",{class:"theme-color-label",children:"Scanline Color"})}),r("input",{type:"color",value:`#${(t.crtColor??[100,80,60]).map(n=>n.toString(16).padStart(2,"0")).join("")}`,onInput:n=>{const s=n.target.value,i=parseInt(s.slice(1,3),16),a=parseInt(s.slice(3,5),16),l=parseInt(s.slice(5,7),16);e.updateEffect("crtColor",[i,a,l])},class:"theme-color-picker"})]})]})]})]})}function mc(){const e=mt(),t=n=>n.stopPropagation();return r("div",{class:"theme-settings-layout","data-graph-passthrough":"false",onMouseDown:t,onClick:t,onWheel:t,onTouchStart:t,onTouchMove:t,children:[r("div",{class:"theme-settings",children:[r("div",{class:"theme-settings-header",children:[r("h2",{class:"theme-settings-title",children:"Color Theme Settings"}),r("p",{class:"theme-settings-subtitle",children:"Customize every color in the palette. Changes are applied instantly and saved to your browser."}),r("div",{class:"theme-settings-actions",children:[r("button",{class:"btn btn-primary",onClick:e.resetTheme,children:"Reset to Default"}),e.randomizeTheme&&r("button",{class:"btn btn-primary",onClick:e.randomizeTheme,children:"🎲 Randomize"}),r(dc,{}),r("button",{class:"btn btn-secondary",onClick:()=>e.exportTheme(),title:"Export current theme as .json",children:"📤 Export"}),r(fc,{})]})]}),r(hc,{}),r(gc,{})]}),r(pc,{})]})}function vc({store:e}){return r(cc,{store:e,children:r(mc,{})})}const Tt="/api";async function _c(){const e=await fetch(`${Tt}/logs`,Ct());if(!e.ok)throw new Error("Failed to fetch log files");return e.json()}async function bc(e){const t=await fetch(`${Tt}/logs/${encodeURIComponent(e)}`,Ct());if(!t.ok)throw new Error("Failed to fetch log content");return t.json()}async function yc(e,t,n,s){const i=new URL(`${Tt}/search/${encodeURIComponent(e)}`,window.location.origin);i.searchParams.set("q",t),n&&i.searchParams.set("level",n);const a=await fetch(i.toString(),Ct());if(!a.ok){const l=await a.json();throw new Error(l.error||"Search failed")}return a.json()}async function wc(e,t,n){const s=new URL(`${Tt}/query/${encodeURIComponent(e)}`,window.location.origin);s.searchParams.set("jq",t);const i=await fetch(s.toString(),Ct());if(!i.ok){const a=await i.json();throw new Error(a.error||"Query failed")}return i.json()}async function xc(e){const t=await fetch(`${Tt}/source/${encodeURIComponent(e)}`,Ct());if(!t.ok)throw new Error("Failed to fetch source file");return t.json()}async function kc(e,t,n=5){const s=new URL(`${Tt}/source/${encodeURIComponent(e)}`,window.location.origin);s.searchParams.set("line",t.toString()),s.searchParams.set("context",n.toString());const i=await fetch(s.toString(),Ct());if(!i.ok)throw new Error("Failed to fetch source snippet");return i.json()}const Hs=new Map;async function Sc(e){const t=Hs.get(e);if(t)return t;const n=await fetch(`${Tt}/signatures/${encodeURIComponent(e)}`,Ct());if(!n.ok)return{};const s=await n.json();return Hs.set(e,s),s}const Ec=Object.freeze(Object.defineProperty({__proto__:null,fetchLogContent:bc,fetchLogFiles:_c,fetchSignatures:Sc,fetchSourceFile:xc,fetchSourceSnippet:kc,queryLogs:wc,searchLogs:yc},Symbol.toStringTag,{value:"Module"})),At=Ec,Cc=At.fetchLogFiles,Tc=At.fetchLogContent,Ac=At.searchLogs,Pc=At.queryLogs,Yr=At.fetchSourceFile,Fc=At.fetchSourceSnippet,Mc=At.fetchSignatures;function Nn(){return{entries:[],searchQuery:"",jqFilter:"",levelFilter:"",typeFilter:"",selectedEntry:null,codeViewerFile:null,codeViewerContent:"",codeViewerLine:null,activeTab:"hypergraph",activeSearchStep:-1,activePathId:null,activePathStep:-1,signatures:{}}}const Bn=Z([]),ke=Z(null),tt=Z(!1),kt=Z(null),Oe=Z("Ready"),Ge=Z("hypergraph"),Ic=Z(!1),Pr=Z(!1),Qe=Z(new Map);function Dc(e){if(!e)return Nn();const t=Qe.value;if(!t.has(e)){const n=new Map(t);n.set(e,Nn()),Qe.value=n}return Qe.value.get(e)}function je(e){const t=ke.value;if(!t)return;const n=new Map(Qe.value),s=n.get(t)||Nn();n.set(t,{...s,...e}),Qe.value=n}const He=J(()=>Dc(ke.value)),pt=J(()=>He.value.entries),Fr=J(()=>He.value.searchQuery),Mr=J(()=>He.value.jqFilter),qr=J(()=>He.value.levelFilter),ua=J(()=>He.value.typeFilter),Us=J(()=>He.value.selectedEntry),$c=J(()=>He.value.codeViewerFile),Lc=J(()=>He.value.codeViewerContent),Rc=J(()=>He.value.codeViewerLine),zc=J(()=>He.value.signatures),Rt=J(()=>{let e=pt.value;const t=qr.value,n=ua.value;return t&&(e=e.filter(s=>s.level.toUpperCase()===t.toUpperCase())),n&&(e=e.filter(s=>s.event_type===n)),e}),Kr=J(()=>{var t;const e=pt.value;for(const n of e)if(n.message==="graph_snapshot"&&((t=n.fields)!=null&&t.graph_data))try{const s=typeof n.fields.graph_data=="string"?JSON.parse(n.fields.graph_data):n.fields.graph_data;if(s&&Array.isArray(s.nodes)&&Array.isArray(s.edges))return s}catch{}return null});function Nc(e){return e.schema_version!=="graph-replay/v1"||!e.step?null:{step:e.step.step,op_type:e.op_type,transition:e.step.transition,location:e.step.location,query:e.step.query,description:e.step.description,path_id:e.path_id,path_graph:e.step.path_graph,graph_mutation:e.step.graph_mutation}}const Bc=J(()=>{var n,s,i,a;const e=pt.value,t=[];for(let l=0;l<e.length;l++){const o=e[l];if((n=o.fields)!=null&&n.graph_op||(s=o.fields)!=null&&s.graph_replay)try{if((i=o.fields)!=null&&i.graph_op){const d=typeof o.fields.graph_op=="string"?JSON.parse(o.fields.graph_op):o.fields.graph_op;if(d&&typeof d.step=="number"){t.push({entryIdx:l,event:d});continue}}if((a=o.fields)!=null&&a.graph_replay){const d=typeof o.fields.graph_replay=="string"?JSON.parse(o.fields.graph_replay):o.fields.graph_replay,c=Nc(d);c&&typeof c.step=="number"&&t.push({entryIdx:l,event:c})}}catch{}}return t.sort((l,o)=>l.event.step-o.event.step)}),Xr=J(()=>Bc.value.map(e=>e.event)),pa=Xr,fn=J(()=>He.value.activeSearchStep),Zr=J(()=>{const e=fn.value,t=Xr.value;return e<0||e>=t.length?null:t[e]??null});function yt(e){je({activeSearchStep:e})}const fa=J(()=>{const e=Xr.value,t=new Map,n=[];for(let s=0;s<e.length;s++){const i=e[s],a=i.path_id;let l=t.get(a);l||(l={events:[],globalIndices:[]},t.set(a,l),n.push(a)),l.events.push(i),l.globalIndices.push(s)}return n.map(s=>{const i=t.get(s);return{pathId:s,events:i.events,globalIndices:i.globalIndices}})}),On=J(()=>He.value.activePathId),Ut=J(()=>He.value.activePathStep),ha=J(()=>{const e=On.value;return e?fa.value.find(t=>t.pathId===e)??null:null}),Jr=J(()=>{const e=ha.value,t=Ut.value;return!e||t<0||t>=e.events.length?null:e.events[t]??null});function an(e){je({activePathId:e,activePathStep:e?0:-1})}function Ir(e){je({activePathStep:e})}const ga=J(()=>{const e=ha.value,t=Ut.value;if(!e||t<0)return null;const n=e.events[Math.min(t,e.events.length-1)];if(!n)return null;const s=n.path_graph;return!s||!s.start_node&&!s.root?null:s});J(()=>{const e=pt.value,t={TRACE:0,DEBUG:0,INFO:0,WARN:0,ERROR:0},n={event:0,span_enter:0,span_exit:0,unknown:0},s={};for(const o of e){const d=o.level.toUpperCase();d in t&&t[d]++;const c=o.event_type;if(c in n&&n[c]++,o.event_type==="span_exit"&&o.span_name){const f=o.fields.busy;if(typeof f=="string"){const u=f.match(/([\d.]+)(µs|ms|s)/);if(u){const m=u[1],y=u[2];if(!m||!y)continue;let _=parseFloat(m);y==="µs"?_/=1e6:y==="ms"&&(_/=1e3),s[o.span_name]||(s[o.span_name]={count:0,totalDuration:0});const v=s[o.span_name];v&&(v.count++,v.totalDuration+=_)}}}}const i=new Map;for(const o of e)if(o.timestamp){const d=parseFloat(o.timestamp),c=Math.floor(d*10)/10;i.set(c,(i.get(c)||0)+1)}const a=Array.from(i.entries()).map(([o,d])=>({timestamp:o,count:d})).sort((o,d)=>o.timestamp-d.timestamp),l=Object.entries(s).map(([o,d])=>({name:o,count:d.count,avgDuration:d.totalDuration/d.count})).sort((o,d)=>d.count-o.count).slice(0,10);return{levelCounts:t,typeCounts:n,timelineData:a,topSpans:l}});async function ma(){tt.value=!0,kt.value=null;try{Bn.value=await Cc(),Oe.value=`Found ${Bn.value.length} log files`}catch(e){kt.value=String(e),Oe.value="Error loading files"}finally{tt.value=!1}}async function hn(e){const t=Qe.value.get(e);if(t&&t.entries.length>0){ke.value=e,Dr(),Oe.value=`Loaded ${e} (${t.entries.length} entries)`;return}tt.value=!0,kt.value=null,Oe.value=`Loading ${e}...`;try{const n=await Tc(e),s=await Mc(e).catch(()=>({})),i=n.entries.find(c=>c.event_type==="span_enter"&&c.depth===0&&c.file!==null)??n.entries.find(c=>c.message==="test started"&&c.file!==null)??n.entries.find(c=>c.file!==null);let a=null,l="",o=null;if(i!=null&&i.file)try{const c=await Yr(i.file);a=i.file,l=c.content,o=i.source_line??null}catch{}const d=new Map(Qe.value);d.set(e,{...Nn(),entries:n.entries,activeTab:Ge.value,signatures:s,codeViewerFile:a,codeViewerContent:l,codeViewerLine:o}),Qe.value=d,ke.value=e,Dr(),Oe.value=`Loaded ${e} (${n.entries.length} entries)`}catch(n){kt.value=String(n),Oe.value="Error loading file"}finally{tt.value=!1}}async function Oc(e){if(!e||!ke.value){je({searchQuery:""});return}tt.value=!0,Oe.value=`Searching for "${e}"...`;try{const t=await Ac(ke.value,e,qr.value||void 0);je({entries:t.matches,searchQuery:e}),Oe.value=`Found ${t.total_matches} matches`}catch(t){kt.value=String(t),Oe.value=`Search error: ${t}`}finally{tt.value=!1}}async function Gc(e){if(!e||!ke.value){je({jqFilter:""});return}tt.value=!0,Oe.value="Applying JQ filter...";try{const t=await Pc(ke.value,e);je({entries:t.matches,jqFilter:e,searchQuery:""}),Oe.value=`JQ filter matched ${t.total_matches} entries`}catch(t){kt.value=String(t),Oe.value=`JQ error: ${t}`}finally{tt.value=!1}}async function Hc(e,t){try{const n=await Yr(e);je({codeViewerFile:e,codeViewerContent:n.content,codeViewerLine:t??null})}catch(n){kt.value=`Failed to load source: ${n}`}}function Vs(e){je({selectedEntry:e})}const Uc=new Set(["logs","stats","code","debug","scene3d","hypergraph","settings"]),Qr=wl({stateToHash(e){const t="/file/"+encodeURIComponent(e.file);return e.tab==="logs"?t:t+"/"+e.tab},hashToState(e){const t=e.startsWith("/")?e.slice(1):e;if(!t.startsWith("file/"))return null;const n=t.slice(5);if(!n)return null;const s=n.lastIndexOf("/");if(s>=0){const a=n.slice(s+1);if(Uc.has(a)){const l=decodeURIComponent(n.slice(0,s));return l?{file:l,tab:a}:null}}const i=decodeURIComponent(n);return i?{file:i,tab:"logs"}:null},async onNavigate(e){await hn(e.file),wt(e.tab)},getCurrentState(){const e=ke.value;return e?{file:e,tab:Ge.value}:null},statesEqual(e,t){return e.file===t.file&&e.tab===t.tab}});function Dr(){const e=ke.value;e&&Qr.updateHash({file:e,tab:Ge.value})}function Vc(){return Qr.getStateFromUrl()}function Wc(){Qr.initListener()}function wt(e){Ge.value=e,je({activeTab:e}),Dr()}function va(e){je({levelFilter:e})}function _a(e){je({typeFilter:e})}function ba(){const e=ke.value;if(!e)return;const t=new Map(Qe.value);t.delete(e),Qe.value=t,hn(e)}function at({size:e=12,color:t="currentColor",className:n=""}){return r("svg",{width:e,height:e,viewBox:"0 0 12 12",fill:"none",class:n,children:r("path",{d:"M3 4.5L6 7.5L9 4.5",stroke:t,"stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})})}function lt({size:e=12,color:t="currentColor",className:n=""}){return r("svg",{width:e,height:e,viewBox:"0 0 12 12",fill:"none",class:n,children:r("path",{d:"M4.5 3L7.5 6L4.5 9",stroke:t,"stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})})}function Ws({size:e=14,color:t="currentColor",className:n=""}){return r("svg",{width:e,height:e,viewBox:"0 0 14 14",fill:"none",class:n,children:[r("circle",{cx:"7",cy:"5.5",r:"2",stroke:t,"stroke-width":"1.2"}),r("path",{d:"M7 12C7 12 11 8 11 5.5C11 3.01 9.21 1 7 1C4.79 1 3 3.01 3 5.5C3 8 7 12 7 12Z",stroke:t,"stroke-width":"1.2","stroke-linecap":"round","stroke-linejoin":"round"})]})}function jc({size:e=14,color:t="#c87878",className:n=""}){return r("svg",{width:e,height:e,viewBox:"0 0 14 14",fill:"none",class:n,children:[r("path",{d:"M7 1C7 1 4 4.5 4 7.5C4 9.71 5.34 11.5 7 11.5C8.66 11.5 10 9.71 10 7.5C10 4.5 7 1 7 1Z",fill:t,opacity:"0.3"}),r("path",{d:"M7 1C7 1 4 4.5 4 7.5C4 9.71 5.34 11.5 7 11.5C8.66 11.5 10 9.71 10 7.5C10 4.5 7 1 7 1Z",stroke:t,"stroke-width":"1.2","stroke-linecap":"round","stroke-linejoin":"round"}),r("path",{d:"M7 5C7 5 5.5 7 5.5 8.5C5.5 9.33 6.17 10 7 10C7.83 10 8.5 9.33 8.5 8.5C8.5 7 7 5 7 5Z",fill:t,opacity:"0.6"})]})}function Yc({size:e=14,color:t="currentColor",className:n=""}){return r("svg",{width:e,height:e,viewBox:"0 0 14 14",fill:"none",class:n,children:[r("path",{d:"M4 3.5H12",stroke:t,"stroke-width":"1.2","stroke-linecap":"round"}),r("path",{d:"M4 7H12",stroke:t,"stroke-width":"1.2","stroke-linecap":"round"}),r("path",{d:"M4 10.5H12",stroke:t,"stroke-width":"1.2","stroke-linecap":"round"}),r("circle",{cx:"2",cy:"3.5",r:"0.75",fill:t}),r("circle",{cx:"2",cy:"7",r:"0.75",fill:t}),r("circle",{cx:"2",cy:"10.5",r:"0.75",fill:t})]})}function qc({size:e=14,color:t="currentColor"}){return r("svg",{width:e,height:e,viewBox:"0 0 14 14",fill:"none",children:[r("path",{d:"M3 2.5C3 1.95 3.45 1.5 4 1.5H8L11 4.5V11.5C11 12.05 10.55 12.5 10 12.5H4C3.45 12.5 3 12.05 3 11.5V2.5Z",stroke:t,"stroke-width":"1.2","stroke-linecap":"round","stroke-linejoin":"round"}),r("path",{d:"M8 1.5V4.5H11",stroke:t,"stroke-width":"1.2","stroke-linecap":"round","stroke-linejoin":"round"})]})}function Kc({size:e=14,color:t="currentColor"}){return r("svg",{width:e,height:e,viewBox:"0 0 14 14",fill:"none",children:r("path",{d:"M2 4C2 3.45 2.45 3 3 3H5.5L6.5 4.5H11C11.55 4.5 12 4.95 12 5.5V10.5C12 11.05 11.55 11.5 11 11.5H3C2.45 11.5 2 11.05 2 10.5V4Z",stroke:t,"stroke-width":"1.2","stroke-linecap":"round","stroke-linejoin":"round"})})}function Xc({size:e=14,color:t="currentColor"}){return r("svg",{width:e,height:e,viewBox:"0 0 14 14",fill:"none",children:[r("path",{d:"M2 4C2 3.45 2.45 3 3 3H5.5L6.5 4.5H11C11.55 4.5 12 4.95 12 5.5V6",stroke:t,"stroke-width":"1.2","stroke-linecap":"round","stroke-linejoin":"round"}),r("path",{d:"M1 7H10.5L12 11.5H2.5L1 7Z",stroke:t,"stroke-width":"1.2","stroke-linecap":"round","stroke-linejoin":"round"})]})}const ln=Z(!1);function $r(e,t){if(e!=null&&typeof e=="object")if(Array.isArray(e))for(const n of e)$r(n,t);else{const n=e;typeof n._type=="string"&&t.add(n._type);for(const s of Object.values(n))$r(s,t)}}const js=J(()=>{const e=new Set;for(const t of pt.value)$r(t.fields,e);return Array.from(e).sort()}),Ys=J(()=>{const e={name:"",path:"",children:new Map,isFile:!1,count:0},t=new Map;for(const n of pt.value)n.file&&t.set(n.file,(t.get(n.file)||0)+1);for(const[n,s]of t){const i=n.split("/");let a=e,l="";for(let o=0;o<i.length;o++){const d=i[o];l=l?`${l}/${d}`:d;const c=o===i.length-1;a.children.has(d)||a.children.set(d,{name:d,path:l,children:new Map,isFile:c,count:0}),a=a.children.get(d),c&&(a.count=s)}}return e}),qs=J(()=>{const e=new Set;for(const t of pt.value)if(t.fields)for(const n of Object.keys(t.fields))e.add(n);return Array.from(e).sort()}),Ks=J(()=>{const e=new Set;for(const t of pt.value)t.span_name&&e.add(t.span_name);return Array.from(e).sort()}),zt=Z(""),ht=Z(""),Fn=Z(""),Mn=Z("");function Zc(){zt.value="",ht.value="",Fn.value="",Mn.value="",va(""),_a("")}const kn=Z(""),on=Z(new Set);function ya({node:e,depth:t=0,onSelect:n}){const s=on.value.has(e.path),i=e.children.size>0,a=ht.value===e.path,l=c=>{c.stopPropagation();const f=new Set(on.value);s?f.delete(e.path):f.add(e.path),on.value=f},o=()=>{n(e.path)},d=Array.from(e.children.values()).sort((c,f)=>c.isFile!==f.isFile?c.isFile?1:-1:c.name.localeCompare(f.name));return r("div",{class:"file-tree-item",children:[r("div",{class:`file-tree-row ${a?"selected":""}`,style:{paddingLeft:`${t*16+8}px`},onClick:o,children:[i?r("span",{class:"tree-toggle",onClick:l,children:s?r(at,{size:10}):r(lt,{size:10})}):r("span",{class:"tree-toggle-placeholder"}),r("span",{class:`tree-icon ${e.isFile?"file-icon":"folder-icon"}`,children:e.isFile?r(qc,{size:14}):s?r(Xc,{size:14}):r(Kc,{size:14})}),r("span",{class:"tree-name",children:e.name}),e.count>0&&r("span",{class:"tree-count",children:e.count})]}),s&&i&&r("div",{class:"file-tree-children",children:d.map(c=>r(ya,{node:c,depth:t+1,onSelect:n},c.path))})]})}const ur=Z(null);function Jc(){const e=j(null),t=j(!1),n=ae(f=>{var v;f.preventDefault(),t.current=!0;const u=f.clientY,m=((v=e.current)==null?void 0:v.offsetHeight)??200,y=x=>{if(!t.current)return;const k=Math.max(80,m+(x.clientY-u));ur.value=k},_=()=>{t.current=!1,document.removeEventListener("mousemove",y),document.removeEventListener("mouseup",_),document.body.style.cursor="",document.body.style.userSelect=""};document.body.style.cursor="ns-resize",document.body.style.userSelect="none",document.addEventListener("mousemove",y),document.addEventListener("mouseup",_)},[]);if(!ln.value)return null;const s=f=>{ke.value&&Gc(f)},i=(f,u,m,y)=>{const _=f??zt.value,v=u??ht.value,x=m??Fn.value,k=y??Mn.value,p=[];if(_&&p.push(`(.fields | .. | objects | select(._type == "${_}"))`),v&&p.push(`(.file | contains("${v}"))`),x&&p.push(`(.fields | has("${x}"))`),k&&p.push(`(.span_name == "${k}")`),p.length===0){ba();return}const h=`select(${p.join(" and ")})`;s(h)},a=f=>{f.preventDefault(),kn.value&&s(kn.value)},l=f=>{const u=f===ht.value?"":f;ht.value=u,i(void 0,u,void 0,void 0)},o=()=>{const f=new Set,u=m=>{m.children.size>0&&(f.add(m.path),m.children.forEach(y=>u(y)))};u(Ys.value),on.value=f},d=()=>{on.value=new Set},c=J(()=>{const f=new Set;for(const u of pt.value)u.file&&f.add(u.file);return f.size});return r("div",{class:"filter-panel",ref:e,style:ur.value!=null?{height:`${ur.value}px`,maxHeight:"none"}:void 0,children:[r("div",{class:"filter-panel-header",children:[r("h3",{children:"🔍 Advanced Filters"}),r("button",{class:"btn btn-small",onClick:()=>ln.value=!1,children:"✕"})]}),r("div",{class:"filter-columns",children:[r("div",{class:"filter-column",children:[r("h4",{children:"Level & Type"}),r("div",{class:"filter-field",children:[r("label",{children:"Log Level:"}),r("select",{class:"filter-select",value:qr.value,onChange:f=>va(f.target.value),children:[r("option",{value:"",children:"All Levels"}),r("option",{value:"TRACE",children:"TRACE"}),r("option",{value:"DEBUG",children:"DEBUG"}),r("option",{value:"INFO",children:"INFO"}),r("option",{value:"WARN",children:"WARN"}),r("option",{value:"ERROR",children:"ERROR"})]})]}),r("div",{class:"filter-field",children:[r("label",{children:"Event Type:"}),r("select",{class:"filter-select",value:ua.value,onChange:f=>_a(f.target.value),children:[r("option",{value:"",children:"All Types"}),r("option",{value:"event",children:"Event"}),r("option",{value:"span_enter",children:"Span Enter"}),r("option",{value:"span_exit",children:"Span Exit"})]})]})]}),r("div",{class:"filter-column",children:[r("h4",{children:["Type Name (",js.value.length,")"]}),r("div",{class:"filter-field",children:[r("label",{children:"Select Type:"}),r("select",{class:"filter-select",value:zt.value,onChange:f=>{const u=f.target.value;zt.value=u,i(u,void 0,void 0,void 0)},children:[r("option",{value:"",children:"Select type..."}),js.value.map(f=>r("option",{value:f,children:f},f))]})]}),r("div",{class:"filter-field",children:[r("label",{children:"Custom Type:"}),r("input",{type:"text",class:"filter-input",placeholder:"Enter type...",value:zt.value,onInput:f=>{const u=f.target.value;zt.value=u,i(u,void 0,void 0,void 0)}})]})]}),r("div",{class:"filter-column filter-column-wide",children:[r("div",{class:"filter-section-header",children:[r("h4",{children:["File Path (",c.value,")"]}),r("div",{class:"tree-actions",children:[r("button",{class:"btn btn-small",onClick:o,title:"Expand All",children:"⊞"}),r("button",{class:"btn btn-small",onClick:d,title:"Collapse All",children:"⊟"})]})]}),ht.value&&r("div",{class:"selected-file",children:[r("span",{children:r("code",{children:ht.value})}),r("button",{class:"btn btn-small",onClick:()=>ht.value="",children:"✕"})]}),r("div",{class:"file-tree-container",children:Array.from(Ys.value.children.values()).sort((f,u)=>f.isFile!==u.isFile?f.isFile?1:-1:f.name.localeCompare(u.name)).map(f=>r(ya,{node:f,onSelect:l},f.path))})]}),r("div",{class:"filter-column",children:[r("h4",{children:"Other Filters"}),r("div",{class:"filter-field",children:[r("label",{children:["Has Field (",qs.value.length,"):"]}),r("select",{class:"filter-select",value:Fn.value,onChange:f=>{const u=f.target.value;Fn.value=u,i(void 0,void 0,u,void 0)},children:[r("option",{value:"",children:"Select field..."}),qs.value.map(f=>r("option",{value:f,children:f},f))]})]}),r("div",{class:"filter-field",children:[r("label",{children:["Span Name (",Ks.value.length,"):"]}),r("select",{class:"filter-select",value:Mn.value,onChange:f=>{const u=f.target.value;Mn.value=u,i(void 0,void 0,void 0,u)},children:[r("option",{value:"",children:"Select span..."}),Ks.value.map(f=>r("option",{value:f,children:f},f))]})]})]})]}),r("div",{class:"filter-section",children:[r("h4",{children:"Custom JQ Query"}),r("form",{class:"custom-jq-form",onSubmit:a,children:[r("input",{type:"text",class:"filter-input jq-input-large",placeholder:'e.g., select(.level == "ERROR" and (.message | contains("panic")))',value:kn.value,onInput:f=>kn.value=f.target.value}),r("button",{type:"submit",class:"btn btn-secondary",children:"⚡ Execute"})]}),Mr.value&&r("div",{class:"current-filter",children:[r("span",{class:"current-filter-label",children:"Active filter:"}),r("code",{class:"current-filter-code",children:Mr.value})]})]}),r("div",{class:"filter-panel-resize-handle",onMouseDown:n})]})}function Qc({onMenuToggle:e}){const t=s=>{s.preventDefault();const a=s.target.querySelector("input");Oc(a.value)},n=()=>{ma(),ke.value&&hn(ke.value)};return r("header",{class:"header",children:[r("div",{class:"header-left",children:[e&&r("button",{class:"sidebar-hamburger",onClick:e,title:"Toggle sidebar",children:r("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round",width:"20",height:"20",children:[r("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),r("line",{x1:"3",y1:"12",x2:"21",y2:"12"}),r("line",{x1:"3",y1:"18",x2:"21",y2:"18"})]})}),r(dl,{size:14,color:"#8b9dc3"}),r("h1",{class:"header-title",children:"Log Viewer"})]}),r("form",{class:"search-form",onSubmit:t,children:[r("input",{type:"text",class:"search-input",placeholder:"Search (regex supported)...",value:Fr.value}),r("button",{type:"submit",class:"btn btn-primary",children:[r(al,{size:12})," Search"]})]}),r("button",{class:`btn ${ln.value?"btn-active":""}`,onClick:()=>ln.value=!ln.value,title:"Advanced Filters",children:[r(ll,{size:12})," Filters"]}),r("div",{class:"header-filters",children:(Fr.value||Mr.value)&&r("button",{class:"btn",onClick:()=>{Zc(),ba()},children:[r(cl,{size:12})," Clear"]})}),r("div",{class:"header-right",children:[r("span",{class:"status-text",children:Oe.value}),r("button",{class:`btn btn-gpu ${gt.value?"btn-active":""}`,title:gt.value?"Disable visual effects (particles, smoke, CRT)":"Enable visual effects (particles, smoke, CRT)",onClick:()=>gt.value=!gt.value,children:[gt.value?"✦":"✧"," FX"]}),r("button",{class:`btn ${Ge.value==="settings"?"btn-active":""}`,title:"Theme Settings",onClick:()=>wt(Ge.value==="settings"?"logs":"settings"),children:[r("svg",{width:"12",height:"12",viewBox:"0 0 14 14",fill:"none",children:[r("path",{d:"M7 1C3.7 1 1 3.7 1 7s2.7 6 6 6c.6 0 1-.4 1-1 0-.3-.1-.5-.2-.7-.1-.2-.2-.4-.2-.7 0-.6.4-1 1-1h1.2c2.2 0 4-1.8 4-4 0-2.8-2.7-4.6-6.8-4.6z",stroke:"currentColor","stroke-width":"1.1","stroke-linecap":"round"}),r("circle",{cx:"4.5",cy:"5.5",r:"1",fill:"currentColor"}),r("circle",{cx:"7",cy:"4",r:"1",fill:"currentColor"}),r("circle",{cx:"9.5",cy:"5.5",r:"1",fill:"currentColor"})]})," ","Theme"]}),r("button",{class:"btn",onClick:n,children:[r(ol,{size:12})," Refresh"]})]})]})}const pr=[{id:"cat-search",label:"Search",filter:e=>e.has_search_ops,icon:fe("svg",{width:14,height:14,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},fe("circle",{cx:11,cy:11,r:8}),fe("path",{d:"m21 21-4.35-4.35"})),color:"var(--accent-blue)"},{id:"cat-insert",label:"Insert",filter:e=>e.has_insert_ops,icon:fe("svg",{width:14,height:14,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},fe("path",{d:"M12 5v14M5 12h14"})),color:"var(--accent-green)"},{id:"cat-graph",label:"Graph",filter:e=>e.has_graph_snapshot,icon:fe("svg",{width:14,height:14,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},fe("circle",{cx:6,cy:6,r:3}),fe("circle",{cx:18,cy:6,r:3}),fe("circle",{cx:6,cy:18,r:3}),fe("circle",{cx:18,cy:18,r:3}),fe("line",{x1:9,y1:6,x2:15,y2:6}),fe("line",{x1:6,y1:9,x2:6,y2:15}),fe("line",{x1:18,y1:9,x2:18,y2:15}),fe("line",{x1:9,y1:18,x2:15,y2:18})),color:"var(--accent-purple)"},{id:"cat-paths",label:"Paths",filter:e=>e.has_search_paths,icon:fe("svg",{width:14,height:14,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},fe("polyline",{points:"4 7 4 4 20 4 20 7"}),fe("line",{x1:12,y1:21,x2:12,y2:8}),fe("polyline",{points:"8 12 12 8 16 12"})),color:"var(--accent-cyan, #22d3ee)"}];function ed(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/(1024*1024)).toFixed(1)} MB`}function td(e){const t=[];return e.has_graph_snapshot&&t.push("Graph"),e.has_search_ops&&t.push("Search"),e.has_insert_ops&&t.push("Insert"),e.has_search_paths&&t.push("Paths"),fe("div",{class:"file-tooltip"},fe("div",{class:"file-tooltip-name"},e.name),fe("div",{class:"file-tooltip-meta"},`Size: ${ed(Number(e.size))}`,e.modified?` · ${e.modified}`:""),t.length>0&&fe("div",{class:"file-tooltip-badges"},t.join(", ")))}function nd(e){return wa(e)}function wa(e,t=""){const n=[],s=new Map;for(const o of e){const d=t?o.name.slice(t.length):o.name,c=d.indexOf("/");if(c===-1)n.push(o);else{const f=d.slice(0,c),u=s.get(f);u?u.push(o):s.set(f,[o])}}const i=[],a=[...s.keys()].sort();for(const o of a){const d=t?`${t}${o}/`:`${o}/`,c=wa(s.get(o),d);i.push({id:`dir-${t}${o}`,label:o,icon:"folder",badge:xa(c),children:c})}const l=[...n].sort((o,d)=>o.name.localeCompare(d.name));for(const o of l)i.push(rd(o));return i}function xa(e){let t=0;for(const n of e)n.children?t+=xa(n.children):t++;return t}function rd(e){const t=e.name.includes("/")?e.name.slice(e.name.lastIndexOf("/")+1):e.name;return{id:`file-${e.name}`,label:t,icon:"file",data:e,tooltip:td(e)}}const Xs=Z(null);function sd({onFileSelect:e}){var y,_;const t=Xs.value,n=Bn.value,s=Pe(()=>pr.map(v=>({key:v.id,label:v.label,icon:v.icon,count:n.filter(v.filter).length,activeColor:v.color})),[n]),i=ae(v=>{Xs.value=v},[]),a=Pe(()=>{if(!t)return n;const v=pr.find(x=>x.id===t);return v?n.filter(v.filter):n},[n,t]),l=Pe(()=>nd(a),[a]),[o,d]=V(()=>new Set),c=ae(v=>{d(x=>{const k=new Set(x);return k.has(v)?k.delete(v):k.add(v),k})},[]),f=Pe(()=>{if(ke.value)return`file-${ke.value}`},[ke.value]),u=ae(v=>{v.data&&(hn(v.data.name),e==null||e())},[e]),m=t?((_=(y=pr.find(v=>v.id===t))==null?void 0:y.label)==null?void 0:_.toLowerCase())??t:null;return r(_l,{nodes:l,selectedId:f,onSelect:u,expanded:o,onToggle:c,loading:tt.value&&n.length===0,emptyMessage:m?`No logs with ${m} data`:"No log files found",filterOptions:s,activeFilter:t,onFilterChange:i})}function Zs(e,t,n=3){const[s,i]=V(null),[a,l]=V(null),[o,d]=V(!1);return ge(()=>{!e||!t||s&&s.highlight_line===t||(d(!0),l(null),Fc(e,t,n).then(c=>{i(c),d(!1)}).catch(c=>{l(String(c)),d(!1)}))},[e,t,n]),{snippet:s,error:a,loading:o}}function ka({items:e,selectedIndex:t,onSelect:n,onActivate:s,orientation:i="vertical",wrap:a=!0}){const l=j(null),o=ae(d=>{if(e.length===0)return;const c=i==="vertical"?"ArrowUp":"ArrowLeft",f=i==="vertical"?"ArrowDown":"ArrowRight";d.key===c?(d.preventDefault(),t<=0?n(a?e.length-1:0):n(t-1)):d.key===f?(d.preventDefault(),t>=e.length-1?n(a?0:e.length-1):n(t+1)):d.key==="Home"?(d.preventDefault(),n(0)):d.key==="End"?(d.preventDefault(),n(e.length-1)):d.key==="Enter"&&s&&t>=0&&(d.preventDefault(),s(t))},[e,t,n,s,i,a]);return{containerRef:l,onKeyDown:o}}function id(e,t,n="[data-index]"){ge(()=>{if(t<0||!e.current)return;const i=e.current.querySelectorAll(n)[t];i==null||i.scrollIntoView({block:"nearest",behavior:"smooth"})},[t,e,n])}const dt=Z("sidebar"),qt=["sidebar","tabs","content"],Kt=["logs","hypergraph","code","debug","scene3d","settings"];function ad(){ge(()=>{function e(t){var s;const n=(s=t.target)==null?void 0:s.tagName;if(!(n==="INPUT"||n==="TEXTAREA"||n==="SELECT")){if(t.key==="Tab"){t.preventDefault();const i=qt.indexOf(dt.value),a=t.shiftKey?(i-1+qt.length)%qt.length:(i+1)%qt.length;dt.value=qt[a];return}if(t.key==="ArrowLeft"||t.key==="ArrowRight"){if(t.target.closest(".log-entries, .ssp-list, .ssp-group-list"))return;const a=Kt.indexOf(Ge.value);if(a<0)return;const l=t.key==="ArrowLeft"?(a-1+Kt.length)%Kt.length:(a+1)%Kt.length;wt(Kt[l]),t.preventDefault()}}}return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[])}function Sa(e){const t={current:null};return ge(()=>{dt.value===e&&t.current&&t.current.focus({preventScroll:!0})},[dt.value,e]),t}function ld({size:e=14,color:t="currentColor"}){return r("svg",{width:e,height:e,viewBox:"0 0 14 14",fill:"none",children:[r("circle",{cx:"3",cy:"3",r:"1.5",stroke:t,"stroke-width":"1.2"}),r("circle",{cx:"11",cy:"3",r:"1.5",stroke:t,"stroke-width":"1.2"}),r("circle",{cx:"7",cy:"11",r:"1.5",stroke:t,"stroke-width":"1.2"}),r("path",{d:"M4.2 4.2L6 9.5M9.8 4.2L8 9.5",stroke:t,"stroke-width":"1.0","stroke-linecap":"round"}),r("path",{d:"M4 3H10",stroke:t,"stroke-width":"1.0","stroke-linecap":"round","stroke-dasharray":"1.5 1.5"})]})}const Xt=[{id:"hypergraph",label:"Hypergraph",icon:()=>r(ld,{size:14})},{id:"logs",label:"Logs",icon:()=>r(Yc,{size:14})}];function od({resizeBottomEdge:e=!1}){const t=Xt.findIndex(c=>c.id===Ge.value),n=Sa("tabs"),[s,i]=V(32),a=ae(c=>{i(f=>Math.max(0,f+c))},[]),{containerRef:l,onKeyDown:o}=ka({items:Xt,selectedIndex:t,onSelect:c=>{const f=Xt[c];f&&wt(f.id)},onActivate:c=>{const f=Xt[c];f&&wt(f.id)},orientation:"horizontal"}),d=c=>{l.current=c,n.current=c};return r("div",{class:"tab-bar",style:{height:`${s}px`},children:[r("div",{class:`tabs ${dt.value==="tabs"?"focused":""}`,ref:d,tabIndex:0,onKeyDown:o,onMouseEnter:()=>{var c;dt.value="tabs",(c=l.current)==null||c.focus({preventScroll:!0})},children:Xt.map((c,f)=>r("button",{class:`tab ${Ge.value===c.id?"active":""}`,"data-index":f,onClick:()=>wt(c.id),tabIndex:-1,children:[r("span",{class:"tab-icon",children:c.icon()}),r("span",{class:"tab-label",children:c.label})]},c.id))}),r("div",{class:"tab-info",children:r("span",{class:"entry-count",children:[Rt.value.length," entries"]})}),e&&r(Ni,{direction:"vertical",edge:"bottom",onResize:a})]})}function cd(e){return typeof e=="object"&&e!==null&&"_type"in e&&typeof e._type=="string"}function Ea(e){return typeof e=="object"&&e!==null&&"text"in e&&"index"in e&&Object.keys(e).length===2}function Sn(e){return e===null||typeof e!="object"?!0:Array.isArray(e)?e.length<=3&&e.every(t=>typeof t!="object"||t===null):!!Ea(e)}function it({name:e}){const t=e.split("::");if(t.length>1){const n=t.pop(),s=t.join("::");return r("span",{class:"rust-type",children:[r("span",{class:"rust-module",children:[s,"::"]}),r("span",{class:"rust-type-name",children:n})]})}return r("span",{class:"rust-type-name",children:e})}function dd({token:e}){return r("span",{class:"rust-token",children:[r("span",{class:"rust-string",children:['"',e.text,'"']}),r("span",{class:"rust-paren",children:"("}),r("span",{class:"rust-number",children:e.index}),r("span",{class:"rust-paren",children:")"})]})}function ud(e){return/^-?\d+(\.\d+)?$/.test(e)}function pd(e){return e?/^(type_param|type_name|ty|T|Type|type|generic|param)$/i.test(e):!1}function fd(e){return e.includes("::")?!0:/^[A-Z][a-zA-Z0-9]*$/.test(e)&&!e.includes(" ")}function hd({value:e,fieldName:t}){return e===null?r("span",{class:"rust-keyword",children:"None"}):typeof e=="boolean"?r("span",{class:"rust-keyword",children:String(e)}):typeof e=="number"?r("span",{class:"rust-number",children:e}):typeof e=="string"?ud(e)?r("span",{class:"rust-number",children:e}):pd(t)||fd(e)?r(it,{name:e}):r("span",{class:"rust-string",children:['"',e,'"']}):r("span",{class:"rust-unknown",children:String(e)})}function Ze({value:e,name:t,depth:n=0,defaultExpanded:s=!0,inline:i=!1}){const[a,l]=V(s);if(e===null)return r("span",{class:"rust-value",children:[t&&r("span",{class:"rust-field-name",children:[t,": "]}),r("span",{class:"rust-keyword",children:"None"})]});if(typeof e!="object")return r("span",{class:"rust-value",children:[t&&r("span",{class:"rust-field-name",children:[t,": "]}),r(hd,{value:e,fieldName:t})]});if(Ea(e))return r("span",{class:"rust-value",children:[t&&r("span",{class:"rust-field-name",children:[t,": "]}),r(dd,{token:e})]});if(Array.isArray(e)){if(e.length===0)return r("span",{class:"rust-value",children:[t&&r("span",{class:"rust-field-name",children:[t,": "]}),r("span",{class:"rust-bracket",children:"[]"})]});const d=Sn(e);return i||d&&n>0?r("span",{class:"rust-value rust-array-inline",children:[t&&r("span",{class:"rust-field-name",children:[t,": "]}),r("span",{class:"rust-bracket",children:"["}),e.map((c,f)=>r("span",{children:[r(Ze,{value:c,depth:n+1,inline:!0}),f<e.length-1&&r("span",{class:"rust-comma",children:", "})]},f)),r("span",{class:"rust-bracket",children:"]"})]}):r("div",{class:"rust-value rust-array",children:[r("div",{class:"rust-collapsible-header",onClick:()=>l(!a),children:[r("span",{class:"rust-toggle",children:a?r(at,{size:8}):r(lt,{size:8})}),t&&r("span",{class:"rust-field-name",children:[t,": "]}),r("span",{class:"rust-bracket",children:"["}),!a&&r(ue,{children:[r("span",{class:"rust-preview",children:[e.length," items"]}),r("span",{class:"rust-bracket",children:"]"})]})]}),a&&r("div",{class:"rust-array-items",children:[e.map((c,f)=>r("div",{class:"rust-array-item",children:[r(Ze,{value:c,depth:n+1,defaultExpanded:n<2}),f<e.length-1&&r("span",{class:"rust-comma",children:","})]},f)),r("span",{class:"rust-bracket",children:"]"})]})]})}if(cd(e)){const d=e._type,c="_variant"in e?e._variant:null,f="_values"in e&&Array.isArray(e._values),u=Object.entries(e).filter(([y])=>y!=="_type"&&y!=="_values"&&y!=="_variant");if(c){const y=f?e._values:[];return!f||y.length===0?r("span",{class:"rust-value rust-typed-inline",children:[t&&r("span",{class:"rust-field-name",children:[t,": "]}),r(it,{name:d}),r("span",{class:"rust-paren",children:"::"}),r("span",{class:"rust-keyword",children:c})]}):y.length===1&&Sn(y[0])?r("span",{class:"rust-value rust-typed-inline",children:[t&&r("span",{class:"rust-field-name",children:[t,": "]}),r(it,{name:d}),r("span",{class:"rust-paren",children:"::"}),r("span",{class:"rust-keyword",children:c}),r("span",{class:"rust-paren",children:"("}),y.map((v,x)=>r("span",{children:[r(Ze,{value:v,depth:n+1,inline:!0}),x<y.length-1&&r("span",{class:"rust-comma",children:", "})]},x)),r("span",{class:"rust-paren",children:")"})]}):r("div",{class:"rust-value rust-typed",children:[r("div",{class:"rust-collapsible-header",onClick:()=>l(!a),children:[r("span",{class:"rust-toggle",children:a?r(at,{size:8}):r(lt,{size:8})}),t&&r("span",{class:"rust-field-name",children:[t,": "]}),r(it,{name:d}),r("span",{class:"rust-paren",children:"::"}),r("span",{class:"rust-keyword",children:c}),r("span",{class:"rust-paren",children:"("}),!a&&r("span",{class:"rust-preview",children:"..."}),!a&&r("span",{class:"rust-paren",children:")"})]}),a&&r("div",{class:"rust-typed-values",children:[y.map((v,x)=>r("div",{class:"rust-typed-value",children:[r(Ze,{value:v,depth:n+1,defaultExpanded:n<2}),x<y.length-1&&r("span",{class:"rust-comma",children:","})]},x)),r("span",{class:"rust-paren",children:")"})]})]})}if(f){const y=e._values;return y.length===0||y.length===1&&Sn(y[0])?r("span",{class:"rust-value rust-typed-inline",children:[t&&r("span",{class:"rust-field-name",children:[t,": "]}),r(it,{name:d}),y.length>0&&r(ue,{children:[r("span",{class:"rust-paren",children:"("}),y.map((_,v)=>r("span",{children:[r(Ze,{value:_,depth:n+1,inline:!0}),v<y.length-1&&r("span",{class:"rust-comma",children:", "})]},v)),r("span",{class:"rust-paren",children:")"})]})]}):r("div",{class:"rust-value rust-typed",children:[r("div",{class:"rust-collapsible-header",onClick:()=>l(!a),children:[r("span",{class:"rust-toggle",children:a?r(at,{size:8}):r(lt,{size:8})}),t&&r("span",{class:"rust-field-name",children:[t,": "]}),r(it,{name:d}),r("span",{class:"rust-paren",children:"("}),!a&&r("span",{class:"rust-preview",children:"..."}),!a&&r("span",{class:"rust-paren",children:")"})]}),a&&r("div",{class:"rust-typed-values",children:[y.map((_,v)=>r("div",{class:"rust-typed-value",children:[r(Ze,{value:_,depth:n+1,defaultExpanded:n<2}),v<y.length-1&&r("span",{class:"rust-comma",children:","})]},v)),r("span",{class:"rust-paren",children:")"})]})]})}return u.length===0?r("span",{class:"rust-value",children:[t&&r("span",{class:"rust-field-name",children:[t,": "]}),r(it,{name:d})]}):u.every(([,y])=>Sn(y))&&u.length<=3&&i?r("span",{class:"rust-value rust-struct-inline",children:[t&&r("span",{class:"rust-field-name",children:[t,": "]}),r(it,{name:d}),r("span",{class:"rust-brace",children:[" ","{"," "]}),u.map(([y,_],v)=>r("span",{children:[r("span",{class:"rust-field-name",children:y}),r("span",{class:"rust-colon",children:": "}),r(Ze,{value:_,depth:n+1,inline:!0}),v<u.length-1&&r("span",{class:"rust-comma",children:", "})]},y)),r("span",{class:"rust-brace",children:[" ","}"]})]}):r("div",{class:"rust-value rust-struct",children:[r("div",{class:"rust-collapsible-header",onClick:()=>l(!a),children:[r("span",{class:"rust-toggle",children:a?r(at,{size:8}):r(lt,{size:8})}),t&&r("span",{class:"rust-field-name",children:[t,": "]}),r(it,{name:d}),r("span",{class:"rust-brace",children:[" ","{"]}),!a&&r(ue,{children:[r("span",{class:"rust-preview",children:[u.length," fields"]}),r("span",{class:"rust-brace",children:"}"})]})]}),a&&r("div",{class:"rust-struct-fields",children:[u.map(([y,_],v)=>r("div",{class:"rust-struct-field",children:[r(Ze,{value:_,name:y,depth:n+1,defaultExpanded:n<2}),v<u.length-1&&r("span",{class:"rust-comma",children:","})]},y)),r("span",{class:"rust-brace",children:"}"})]})]})}const o=Object.entries(e);return o.length===0?r("span",{class:"rust-value",children:[t&&r("span",{class:"rust-field-name",children:[t,": "]}),r("span",{class:"rust-brace",children:"{}"})]}):r("div",{class:"rust-value rust-object",children:[r("div",{class:"rust-collapsible-header",onClick:()=>l(!a),children:[r("span",{class:"rust-toggle",children:a?r(at,{size:8}):r(lt,{size:8})}),t&&r("span",{class:"rust-field-name",children:[t,": "]}),r("span",{class:"rust-brace",children:"{"}),!a&&r(ue,{children:[r("span",{class:"rust-preview",children:[o.length," fields"]}),r("span",{class:"rust-brace",children:"}"})]})]}),a&&r("div",{class:"rust-object-fields",children:[o.map(([d,c],f)=>r("div",{class:"rust-object-field",children:[r(Ze,{value:c,name:d,depth:n+1,defaultExpanded:n<2}),f<o.length-1&&r("span",{class:"rust-comma",children:","})]},d)),r("span",{class:"rust-brace",children:"}"})]})]})}function gd({fields:e,defaultExpanded:t=!0}){const n=Object.entries(e).filter(([s])=>s!=="message");return n.length===0?null:r("div",{class:"rust-fields-container",children:n.map(([s,i])=>r("div",{class:"rust-field-row",children:r(Ze,{value:i,name:s,defaultExpanded:t})},s))})}var Ca={exports:{}};(function(e){var t=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var n=function(s){var i=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,a=0,l={},o={manual:s.Prism&&s.Prism.manual,disableWorkerMessageHandler:s.Prism&&s.Prism.disableWorkerMessageHandler,util:{encode:function p(h){return h instanceof d?new d(h.type,p(h.content),h.alias):Array.isArray(h)?h.map(p):h.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(p){return Object.prototype.toString.call(p).slice(8,-1)},objId:function(p){return p.__id||Object.defineProperty(p,"__id",{value:++a}),p.__id},clone:function p(h,g){g=g||{};var b,w;switch(o.util.type(h)){case"Object":if(w=o.util.objId(h),g[w])return g[w];b={},g[w]=b;for(var S in h)h.hasOwnProperty(S)&&(b[S]=p(h[S],g));return b;case"Array":return w=o.util.objId(h),g[w]?g[w]:(b=[],g[w]=b,h.forEach(function(C,E){b[E]=p(C,g)}),b);default:return h}},getLanguage:function(p){for(;p;){var h=i.exec(p.className);if(h)return h[1].toLowerCase();p=p.parentElement}return"none"},setLanguage:function(p,h){p.className=p.className.replace(RegExp(i,"gi"),""),p.classList.add("language-"+h)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(b){var p=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(b.stack)||[])[1];if(p){var h=document.getElementsByTagName("script");for(var g in h)if(h[g].src==p)return h[g]}return null}},isActive:function(p,h,g){for(var b="no-"+h;p;){var w=p.classList;if(w.contains(h))return!0;if(w.contains(b))return!1;p=p.parentElement}return!!g}},languages:{plain:l,plaintext:l,text:l,txt:l,extend:function(p,h){var g=o.util.clone(o.languages[p]);for(var b in h)g[b]=h[b];return g},insertBefore:function(p,h,g,b){b=b||o.languages;var w=b[p],S={};for(var C in w)if(w.hasOwnProperty(C)){if(C==h)for(var E in g)g.hasOwnProperty(E)&&(S[E]=g[E]);g.hasOwnProperty(C)||(S[C]=w[C])}var A=b[p];return b[p]=S,o.languages.DFS(o.languages,function(T,P){P===A&&T!=p&&(this[T]=S)}),S},DFS:function p(h,g,b,w){w=w||{};var S=o.util.objId;for(var C in h)if(h.hasOwnProperty(C)){g.call(h,C,h[C],b||C);var E=h[C],A=o.util.type(E);A==="Object"&&!w[S(E)]?(w[S(E)]=!0,p(E,g,null,w)):A==="Array"&&!w[S(E)]&&(w[S(E)]=!0,p(E,g,C,w))}}},plugins:{},highlightAll:function(p,h){o.highlightAllUnder(document,p,h)},highlightAllUnder:function(p,h,g){var b={callback:g,container:p,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};o.hooks.run("before-highlightall",b),b.elements=Array.prototype.slice.apply(b.container.querySelectorAll(b.selector)),o.hooks.run("before-all-elements-highlight",b);for(var w=0,S;S=b.elements[w++];)o.highlightElement(S,h===!0,b.callback)},highlightElement:function(p,h,g){var b=o.util.getLanguage(p),w=o.languages[b];o.util.setLanguage(p,b);var S=p.parentElement;S&&S.nodeName.toLowerCase()==="pre"&&o.util.setLanguage(S,b);var C=p.textContent,E={element:p,language:b,grammar:w,code:C};function A(P){E.highlightedCode=P,o.hooks.run("before-insert",E),E.element.innerHTML=E.highlightedCode,o.hooks.run("after-highlight",E),o.hooks.run("complete",E),g&&g.call(E.element)}if(o.hooks.run("before-sanity-check",E),S=E.element.parentElement,S&&S.nodeName.toLowerCase()==="pre"&&!S.hasAttribute("tabindex")&&S.setAttribute("tabindex","0"),!E.code){o.hooks.run("complete",E),g&&g.call(E.element);return}if(o.hooks.run("before-highlight",E),!E.grammar){A(o.util.encode(E.code));return}if(h&&s.Worker){var T=new Worker(o.filename);T.onmessage=function(P){A(P.data)},T.postMessage(JSON.stringify({language:E.language,code:E.code,immediateClose:!0}))}else A(o.highlight(E.code,E.grammar,E.language))},highlight:function(p,h,g){var b={code:p,grammar:h,language:g};if(o.hooks.run("before-tokenize",b),!b.grammar)throw new Error('The language "'+b.language+'" has no grammar.');return b.tokens=o.tokenize(b.code,b.grammar),o.hooks.run("after-tokenize",b),d.stringify(o.util.encode(b.tokens),b.language)},tokenize:function(p,h){var g=h.rest;if(g){for(var b in g)h[b]=g[b];delete h.rest}var w=new u;return m(w,w.head,p),f(p,w,h,w.head,0),_(w)},hooks:{all:{},add:function(p,h){var g=o.hooks.all;g[p]=g[p]||[],g[p].push(h)},run:function(p,h){var g=o.hooks.all[p];if(!(!g||!g.length))for(var b=0,w;w=g[b++];)w(h)}},Token:d};s.Prism=o;function d(p,h,g,b){this.type=p,this.content=h,this.alias=g,this.length=(b||"").length|0}d.stringify=function p(h,g){if(typeof h=="string")return h;if(Array.isArray(h)){var b="";return h.forEach(function(A){b+=p(A,g)}),b}var w={type:h.type,content:p(h.content,g),tag:"span",classes:["token",h.type],attributes:{},language:g},S=h.alias;S&&(Array.isArray(S)?Array.prototype.push.apply(w.classes,S):w.classes.push(S)),o.hooks.run("wrap",w);var C="";for(var E in w.attributes)C+=" "+E+'="'+(w.attributes[E]||"").replace(/"/g,"&quot;")+'"';return"<"+w.tag+' class="'+w.classes.join(" ")+'"'+C+">"+w.content+"</"+w.tag+">"};function c(p,h,g,b){p.lastIndex=h;var w=p.exec(g);if(w&&b&&w[1]){var S=w[1].length;w.index+=S,w[0]=w[0].slice(S)}return w}function f(p,h,g,b,w,S){for(var C in g)if(!(!g.hasOwnProperty(C)||!g[C])){var E=g[C];E=Array.isArray(E)?E:[E];for(var A=0;A<E.length;++A){if(S&&S.cause==C+","+A)return;var T=E[A],P=T.inside,F=!!T.lookbehind,D=!!T.greedy,M=T.alias;if(D&&!T.pattern.global){var O=T.pattern.toString().match(/[imsuy]*$/)[0];T.pattern=RegExp(T.pattern.source,O+"g")}for(var B=T.pattern||T,I=b.next,R=w;I!==h.tail&&!(S&&R>=S.reach);R+=I.value.length,I=I.next){var W=I.value;if(h.length>p.length)return;if(!(W instanceof d)){var G=1,L;if(D){if(L=c(B,R,p,F),!L||L.index>=p.length)break;var me=L.index,z=L.index+L[0].length,q=R;for(q+=I.value.length;me>=q;)I=I.next,q+=I.value.length;if(q-=I.value.length,R=q,I.value instanceof d)continue;for(var oe=I;oe!==h.tail&&(q<z||typeof oe.value=="string");oe=oe.next)G++,q+=oe.value.length;G--,W=p.slice(R,q),L.index-=R}else if(L=c(B,0,W,F),!L)continue;var me=L.index,te=L[0],Re=W.slice(0,me),Se=W.slice(me+te.length),Y=R+W.length;S&&Y>S.reach&&(S.reach=Y);var ve=I.prev;Re&&(ve=m(h,ve,Re),R+=Re.length),y(h,ve,G);var xe=new d(C,P?o.tokenize(te,P):te,M,te);if(I=m(h,ve,xe),Se&&m(h,I,Se),G>1){var le={cause:C+","+A,reach:Y};f(p,h,g,I.prev,R,le),S&&le.reach>S.reach&&(S.reach=le.reach)}}}}}}function u(){var p={value:null,prev:null,next:null},h={value:null,prev:p,next:null};p.next=h,this.head=p,this.tail=h,this.length=0}function m(p,h,g){var b=h.next,w={value:g,prev:h,next:b};return h.next=w,b.prev=w,p.length++,w}function y(p,h,g){for(var b=h.next,w=0;w<g&&b!==p.tail;w++)b=b.next;h.next=b,b.prev=h,p.length-=w}function _(p){for(var h=[],g=p.head.next;g!==p.tail;)h.push(g.value),g=g.next;return h}if(!s.document)return s.addEventListener&&(o.disableWorkerMessageHandler||s.addEventListener("message",function(p){var h=JSON.parse(p.data),g=h.language,b=h.code,w=h.immediateClose;s.postMessage(o.highlight(b,o.languages[g],g)),w&&s.close()},!1)),o;var v=o.util.currentScript();v&&(o.filename=v.src,v.hasAttribute("data-manual")&&(o.manual=!0));function x(){o.manual||o.highlightAll()}if(!o.manual){var k=document.readyState;k==="loading"||k==="interactive"&&v&&v.defer?document.addEventListener("DOMContentLoaded",x):window.requestAnimationFrame?window.requestAnimationFrame(x):window.setTimeout(x,16)}return o}(t);e.exports&&(e.exports=n),typeof Ln<"u"&&(Ln.Prism=n),n.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},n.languages.markup.tag.inside["attr-value"].inside.entity=n.languages.markup.entity,n.languages.markup.doctype.inside["internal-subset"].inside=n.languages.markup,n.hooks.add("wrap",function(s){s.type==="entity"&&(s.attributes.title=s.content.replace(/&amp;/,"&"))}),Object.defineProperty(n.languages.markup.tag,"addInlined",{value:function(i,a){var l={};l["language-"+a]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:n.languages[a]},l.cdata=/^<!\[CDATA\[|\]\]>$/i;var o={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:l}};o["language-"+a]={pattern:/[\s\S]+/,inside:n.languages[a]};var d={};d[i]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return i}),"i"),lookbehind:!0,greedy:!0,inside:o},n.languages.insertBefore("markup","cdata",d)}}),Object.defineProperty(n.languages.markup.tag,"addAttribute",{value:function(s,i){n.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+s+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[i,"language-"+i],inside:n.languages[i]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),n.languages.html=n.languages.markup,n.languages.mathml=n.languages.markup,n.languages.svg=n.languages.markup,n.languages.xml=n.languages.extend("markup",{}),n.languages.ssml=n.languages.xml,n.languages.atom=n.languages.xml,n.languages.rss=n.languages.xml,function(s){var i=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;s.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+i.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+i.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+i.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+i.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:i,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},s.languages.css.atrule.inside.rest=s.languages.css;var a=s.languages.markup;a&&(a.tag.addInlined("style","css"),a.tag.addAttribute("style","css"))}(n),n.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},n.languages.javascript=n.languages.extend("clike",{"class-name":[n.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),n.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,n.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:n.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:n.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:n.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:n.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:n.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),n.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:n.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),n.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),n.languages.markup&&(n.languages.markup.tag.addInlined("script","javascript"),n.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),n.languages.js=n.languages.javascript,function(){if(typeof n>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var s="Loading…",i=function(v,x){return"✖ Error "+v+" while fetching file: "+x},a="✖ Error: File does not exist or is empty",l={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},o="data-src-status",d="loading",c="loaded",f="failed",u="pre[data-src]:not(["+o+'="'+c+'"]):not(['+o+'="'+d+'"])';function m(v,x,k){var p=new XMLHttpRequest;p.open("GET",v,!0),p.onreadystatechange=function(){p.readyState==4&&(p.status<400&&p.responseText?x(p.responseText):p.status>=400?k(i(p.status,p.statusText)):k(a))},p.send(null)}function y(v){var x=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(v||"");if(x){var k=Number(x[1]),p=x[2],h=x[3];return p?h?[k,Number(h)]:[k,void 0]:[k,k]}}n.hooks.add("before-highlightall",function(v){v.selector+=", "+u}),n.hooks.add("before-sanity-check",function(v){var x=v.element;if(x.matches(u)){v.code="",x.setAttribute(o,d);var k=x.appendChild(document.createElement("CODE"));k.textContent=s;var p=x.getAttribute("data-src"),h=v.language;if(h==="none"){var g=(/\.(\w+)$/.exec(p)||[,"none"])[1];h=l[g]||g}n.util.setLanguage(k,h),n.util.setLanguage(x,h);var b=n.plugins.autoloader;b&&b.loadLanguages(h),m(p,function(w){x.setAttribute(o,c);var S=y(x.getAttribute("data-range"));if(S){var C=w.split(/\r\n?|\n/g),E=S[0],A=S[1]==null?C.length:S[1];E<0&&(E+=C.length),E=Math.max(0,Math.min(E-1,C.length)),A<0&&(A+=C.length),A=Math.max(0,Math.min(A,C.length)),w=C.slice(E,A).join(`
`),x.hasAttribute("data-start")||x.setAttribute("data-start",String(E+1))}k.textContent=w,n.highlightElement(k)},function(w){x.setAttribute(o,f),k.textContent=w})}}),n.plugins.fileHighlight={highlight:function(x){for(var k=(x||document).querySelectorAll(u),p=0,h;h=k[p++];)n.highlightElement(h)}};var _=!1;n.fileHighlight=function(){_||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),_=!0),n.plugins.fileHighlight.highlight.apply(this,arguments)}}()})(Ca);var md=Ca.exports;const Gn=hl(md);(function(e){for(var t=/\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\//.source,n=0;n<2;n++)t=t.replace(/<self>/g,function(){return t});t=t.replace(/<self>/g,function(){return/[^\s\S]/.source}),e.languages.rust={comment:[{pattern:RegExp(/(^|[^\\])/.source+t),lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,greedy:!0},char:{pattern:/b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,greedy:!0},attribute:{pattern:/#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,greedy:!0,alias:"attr-name",inside:{string:null}},"closure-params":{pattern:/([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,lookbehind:!0,greedy:!0,inside:{"closure-punctuation":{pattern:/^\||\|$/,alias:"punctuation"},rest:null}},"lifetime-annotation":{pattern:/'\w+/,alias:"symbol"},"fragment-specifier":{pattern:/(\$\w+:)[a-z]+/,lookbehind:!0,alias:"punctuation"},variable:/\$\w+/,"function-definition":{pattern:/(\bfn\s+)\w+/,lookbehind:!0,alias:"function"},"type-definition":{pattern:/(\b(?:enum|struct|trait|type|union)\s+)\w+/,lookbehind:!0,alias:"class-name"},"module-declaration":[{pattern:/(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,lookbehind:!0,alias:"namespace"},{pattern:/(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,lookbehind:!0,alias:"namespace",inside:{punctuation:/::/}}],keyword:[/\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,/\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/],function:/\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,macro:{pattern:/\b\w+!/,alias:"property"},constant:/\b[A-Z_][A-Z_\d]+\b/,"class-name":/\b[A-Z]\w*\b/,namespace:{pattern:/(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,inside:{punctuation:/::/}},number:/\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,boolean:/\b(?:false|true)\b/,punctuation:/->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,operator:/[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/},e.languages.rust["closure-params"].inside.rest=e.languages.rust,e.languages.rust.attribute.inside.string=e.languages.rust.string})(Prism);function vd(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Js(e,t){try{const n=Gn.languages[t];if(n)return Gn.highlight(e,n,t)}catch{}return vd(e)}function _d(e){return e.endsWith(".rs")?"rust":e.endsWith(".ts")||e.endsWith(".tsx")?"typescript":e.endsWith(".js")||e.endsWith(".jsx")?"javascript":"plaintext"}function Qs({snippet:e,file:t,isPanic:n=!1}){const[s,i]=V(null),[a,l]=V(!1),[o,d]=V(null),c=j(null),f=_d(t),u=e.content.split(`
`).map(_=>Js(_,f));ge(()=>{s&&o&&c.current&&c.current.scrollIntoView({behavior:"instant",block:"center"})},[s,o]);const m=async(_,v)=>{if(v.stopPropagation(),s){d(_);return}l(!0),d(_);try{const x=await Yr(t);i(x.content)}catch(x){console.error("Failed to load full file:",x)}finally{l(!1)}},y=_=>{_.stopPropagation(),i(null),d(null)};if(s){const _=s.split(`
`),v=_.map(x=>Js(x,f));return r("div",{class:`code-snippet full-file ${n?"panic-snippet":""}`,children:[r("div",{class:"full-file-header",children:[r("span",{class:"full-file-path",children:t}),r("span",{class:"full-file-lines",children:[_.length," lines"]}),r("button",{class:"full-file-collapse",onClick:y,children:"Collapse"})]}),r("pre",{class:"snippet-code full-file-code",children:v.map((x,k)=>{const p=k+1,h=p===o;return r("div",{ref:h?c:void 0,class:`snippet-line clickable ${h?"highlight":""}`,onClick:g=>m(p,g),children:[r("span",{class:"line-number",children:p}),r("code",{dangerouslySetInnerHTML:{__html:x||" "}})]},k)})})]})}return r("div",{class:`code-snippet ${n?"panic-snippet":""} ${a?"loading":""}`,children:[r("pre",{class:"snippet-code",children:u.map((_,v)=>{const x=e.start_line+v,k=x===e.highlight_line;return r("div",{class:`snippet-line clickable ${k?"highlight":""}`,onClick:p=>m(x,p),title:"Click to expand full file at this line",children:[r("span",{class:"line-number",children:x}),r("code",{dangerouslySetInnerHTML:{__html:_||" "}})]},v)})}),a&&r("div",{class:"snippet-loading",children:"Loading full file..."})]})}function fr(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Lr(e,t){if(!t)return fr(e);try{const n=new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi");return fr(e).replace(n,'<mark class="highlight">$1</mark>')}catch{return fr(e)}}function bd(e){if(!e)return"";const t=parseFloat(e);return t<1?`${(t*1e3).toFixed(0)}ms`:`${t.toFixed(2)}s`}function yd(e){var s,i;const t=[],n=e.split(`
`);for(let a=0;a<n.length;a++){const l=(s=n[a])==null?void 0:s.trim();if(!l)continue;const o=l.match(/^(\d+):\s+(.+)$/);if(o){const d=o[1],c=o[2];if(!d||!c)continue;const f=parseInt(d,10);let u;if(a+1<n.length){const m=(i=n[a+1])==null?void 0:i.trim();m!=null&&m.startsWith("at ")&&(u=m.slice(3),a++)}t.push({index:f,function:c,location:u})}}return t}function wd(e){const t=[/^rust_begin_unwind/,/^core::/,/^std::/,/^<.*as core::/,/^test::/,/^__rust_/,/^<alloc::/,/^alloc::/];return e.filter(n=>t.some(s=>s.test(n.function))?!1:n.location&&!n.location.includes("/rustc/")&&!n.location.includes("\\rustc\\")?!0:!n.function.includes("::{{closure}}")||n.location).slice(0,5)}function xd(e){if(!e)return 0;let t=0;for(let n=0;n<e.length;n++)t=e.charCodeAt(n)+((t<<5)-t),t=t&t;return Math.abs(t*137.508)%360}function ei(e,t=50,n=35){return e?`hsl(${xd(e)}, ${t}%, ${n}%)`:"transparent"}function kd(e,t=40,n=50){return`hsl(${(e*50+180)%360}, ${t}%, ${n}%)`}function Sd(e){if(!e.name)return"";const t=(e.params||[]).map(i=>i.self?i.self:i.name&&i.type?`${i.name}: ${i.type}`:"").filter(Boolean).join(", "),n=e.return_type?` -> ${e.return_type}`:"",s=e.self_type?`<${e.self_type.split("::").pop()}>`:"";return`fn ${e.name}${s}(${t})${n}`}function Ed({message:e,assertionDiff:t,searchQuery:n}){return t?r("div",{class:"panic-message-formatted",children:[r("div",{class:"panic-title",children:t.title}),r("div",{class:"panic-diff",children:[r("div",{class:"diff-header",children:[r("span",{class:"diff-label diff-left",children:["← ",t.left_label]}),r("span",{class:"diff-vs",children:"vs"}),r("span",{class:"diff-label diff-right",children:[t.right_label," →"]})]}),r("div",{class:"diff-content",children:[r("div",{class:"diff-column diff-left-column",children:t.left_value?r("pre",{class:"diff-value",children:t.left_value}):r("div",{class:"diff-empty",children:"(empty)"})}),r("div",{class:"diff-column diff-right-column",children:t.right_value?r("pre",{class:"diff-value",children:t.right_value}):r("div",{class:"diff-empty",children:"(empty)"})})]})]})]}):r("div",{class:"panic-message",dangerouslySetInnerHTML:{__html:Lr(e,n)}})}function Cd({entry:e,showRaw:t,searchQuery:n,isSelected:s,onSelect:i,expandAll:a,isExpanded:l,onToggleExpand:o,headerCellRef:d,headerScrollLeft:c=0,headerColWidth:f=500,onHeaderWheel:u,hoveredSpanName:m,onSpanHover:y,signatures:_}){var Se;const[v,x]=V(!1),k=l!==void 0?l:v,p=e.file&&e.source_line,h=e.panic_file&&e.panic_line,g=e.level.toLowerCase(),b=e.event_type.replace("_","-"),w=Math.min(e.depth,10),{snippet:S,error:C}=Zs(e.file,e.source_line),{snippet:E}=Zs(e.panic_file,e.panic_line),A=Y=>{Y.stopPropagation(),e.file&&Hc(e.file,e.source_line??void 0)},T=Object.entries(e.fields).filter(([Y])=>Y!=="message"),P=T.length>0,F=e.message.startsWith("PANIC:"),D=e.backtrace?wd(yd(e.backtrace)):[],M=a||k,O=P||e.backtrace&&!F,B=p&&S||F&&(E||e.assertion_diff||D.length>0)||t,I=O||B,R=()=>{i(),I&&(o?o():x(!v))},W=Y=>{Y.stopPropagation(),o?o():x(!v)},G=e.span_name&&m===e.span_name,L=e.event_type==="span_enter",z=e.event_type==="span_exit",q=ei(e.span_name,60,45),oe=ei(e.span_name,30,30),me=()=>{e.span_name&&y&&y(e.span_name)},te=e.span_name&&_?_[e.span_name]:void 0,Re=te?Sd(te):void 0;return r("div",{class:`log-entry ${s?"selected":""} level-${g} type-${b} ${F?"panic-entry":""} ${I?"expandable":""} ${M?"expanded":""} ${G?"span-highlighted":""} ${L?"span-enter":""} ${z?"span-exit":""} ${w>0?"in-span":""}`,onClick:R,onMouseEnter:me,style:w>0?{"--span-color":q,"--span-color-muted":oe}:void 0,children:[(()=>{var xe;const Y=z?w+1:w,ve=Y*12;return r("div",{class:"entry-header-cell",style:{width:`${f}px`,maxWidth:`${f}px`,"--gutter-width":`${ve}px`},onWheel:u,children:[Y>0&&r("div",{class:"depth-gutter",children:Array.from({length:Y}).map((le,$)=>{const ne=$===Y-1,N=kd($);let K="pass";return ne&&(L?K="top-corner":z&&(K="bottom-corner")),r("span",{class:`depth-line ${K}`,style:{"--line-color":N}},$)})}),r("div",{class:"entry-header-content",ref:le=>{d&&d(le)},style:{transform:`translateX(-${c}px)`},children:r("div",{class:"entry-header-col",children:r("div",{class:"header-content",children:[r("div",{class:"header-row1",children:[r("span",{class:`level-badge ${g}`,children:e.level}),r("span",{class:`type-badge ${b}`,children:e.event_type==="span_enter"?"ENTER":e.event_type==="span_exit"?"EXIT":"EVENT"}),F&&r("span",{class:"panic-badge",children:r(jc,{size:8})}),r("span",{class:"entry-meta",children:["#",e.line_number]}),e.timestamp&&r("span",{class:"entry-meta",children:bd(e.timestamp)}),e.span_name&&r("span",{class:"span-name",title:Re,children:[e.span_name,(te==null?void 0:te.return_type)&&r("span",{class:"sig-return-type",children:[" → ",te.return_type]})]}),F?r("span",{class:"entry-message panic-msg",dangerouslySetInnerHTML:{__html:Lr(e.message,n)}}):r("span",{class:"entry-message",dangerouslySetInnerHTML:{__html:Lr(e.message,n)}})]}),(P||p)&&r("div",{class:"header-row2",children:[P&&r("span",{class:"content-meta",children:[T.length," ",T.length===1?"field":"fields"]}),p&&r("button",{class:"header-location",onClick:A,title:`${e.file}:${e.source_line}`,children:[r(Ws,{size:8}),(xe=e.file)==null?void 0:xe.split(/[/\\]/).pop(),":",e.source_line]})]}),M&&r("div",{class:"header-details",onClick:le=>le.stopPropagation(),children:[P&&r("div",{class:"fields-rust-container",children:r(gd,{fields:e.fields,defaultExpanded:!0})}),e.backtrace&&!F&&r("pre",{class:"backtrace-content",children:e.backtrace})]})]})})}),I&&r("button",{class:"header-expand-toggle",onClick:W,children:M?r(at,{size:8}):r(lt,{size:8})})]})})(),r("div",{class:"entry-viewport-cell",children:r("div",{class:"entry-viewport-col",children:[!M&&p&&S&&r("div",{class:"viewport-collapsed",children:r("code",{class:"source-line-preview",children:((Se=S.content.split(`
`)[S.highlight_line-S.start_line])==null?void 0:Se.trim())||""})}),B&&r("div",{class:"viewport-header",children:[r("span",{class:"viewport-label",children:"Source"}),r("button",{class:"col-toggle",onClick:W,children:M?r(at,{size:8}):r(lt,{size:8})})]}),M&&r("div",{class:"viewport-content",onClick:Y=>Y.stopPropagation(),children:[F&&e.assertion_diff&&r(Ed,{message:e.message,assertionDiff:e.assertion_diff,searchQuery:n}),F&&h&&E&&r("div",{class:"panic-source",children:[r("div",{class:"panic-location",children:[r(Ws,{size:8})," ",e.panic_file,":",e.panic_line]}),r(Qs,{snippet:E,file:e.panic_file,isPanic:!0})]}),F&&D.length>0&&r("div",{class:"callers-list",children:D.map((Y,ve)=>r("div",{class:"caller-frame",children:[r("span",{class:"frame-index",children:Y.index}),r("span",{class:"frame-function",children:Y.function}),Y.location&&r("span",{class:"frame-location",children:["at ",Y.location]})]},ve))}),p&&S&&r(Qs,{snippet:S,file:e.file}),p&&C&&r("span",{class:"snippet-error",children:C}),t&&r("pre",{class:"entry-raw",children:e.raw})]})]})})]})}function Td({size:e=32,color:t="currentColor"}){return r("svg",{width:e,height:e,viewBox:"0 0 32 32",fill:"none",style:{opacity:.5},children:r("path",{d:"M4 8C4 6.9 4.9 6 6 6H12L14 9H26C27.1 9 28 9.9 28 11V24C28 25.1 27.1 26 26 26H6C4.9 26 4 25.1 4 24V8Z",stroke:t,"stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})})}function Ad(){const[e,t]=V(!1),[n,s]=V(new Set),[i,a]=V(0),[l,o]=V(0),[d,c]=V(500),[f,u]=V(null),m=j(!1),y={current:[]},_={current:null},v=Rt.value,x=v.findIndex(T=>{var P;return T.line_number===((P=Us.value)==null?void 0:P.line_number)}),{containerRef:k,onKeyDown:p}=ka({items:v,selectedIndex:x,onSelect:T=>{const P=v[T];P&&Vs(P)},onActivate:T=>{const P=v[T];P&&S(P.line_number)}});id(k,x,".log-entry-row"),ge(()=>{let T=0;y.current.forEach(P=>{P&&(T=Math.max(T,P.scrollWidth))}),o(T)},[Rt.value,n]);const h=T=>{a(T)},g=T=>{const P=T.deltaX!==0?T.deltaX:T.shiftKey?T.deltaY:0;if(P!==0&&(T.preventDefault(),a(F=>{const D=Math.max(0,l-d);return Math.max(0,Math.min(D,F+P))}),_.current)){const F=Math.max(0,l-d),D=Math.max(0,Math.min(F,i+P));_.current.scrollLeft=D}},b=()=>{t(T=>!T),s(new Set)},w=()=>{s(new Set)},S=T=>{s(P=>{const F=new Set(P);return F.has(T)?F.delete(T):F.add(T),F})},C=T=>P=>{P&&(y.current[T]=P)},E=T=>{T.preventDefault(),m.current=!0,document.body.style.cursor="col-resize",document.body.style.userSelect="none";const P=T.clientX,F=d,D=O=>{if(!m.current)return;const B=O.clientX-P,I=Math.max(200,F+B);c(I)},M=()=>{m.current=!1,document.body.style.cursor="",document.body.style.userSelect="",document.removeEventListener("mousemove",D),document.removeEventListener("mouseup",M)};document.addEventListener("mousemove",D),document.addEventListener("mouseup",M)};if(!ke.value)return r("div",{class:"log-viewer empty",children:r("div",{class:"placeholder-message",children:[r(Td,{size:32}),r("p",{children:"Select a log file to view"})]})});if(tt.value)return r("div",{class:"log-viewer loading",children:[r("div",{class:"spinner"}),r("p",{children:"Loading..."})]});if(Rt.value.length===0)return r("div",{class:"log-viewer empty",children:r("div",{class:"placeholder-message",children:[r("span",{class:"placeholder-icon",children:"🔍"}),r("p",{children:"No entries match the current filters"})]})});const A=Math.max(0,l-d);return r("div",{class:"log-viewer",children:[r("div",{class:"log-viewer-toolbar",children:[r("span",{class:"toolbar-count",children:[Rt.value.length," entries"]}),r("button",{class:"expand-toggle",onClick:b,title:e?"Collapse all":"Expand all",children:e?r(at,{size:12}):r(lt,{size:12})}),n.size>0&&r("button",{class:"expand-toggle reset-toggle",onClick:w,title:"Reset all to current orientation",children:"↺"})]}),A>0&&r("div",{class:"header-scrollbar-container",style:{width:`${d}px`},children:r("div",{class:"header-scrollbar",ref:T=>{_.current=T},onScroll:T=>h(T.target.scrollLeft),children:r("div",{class:"header-scrollbar-content",style:{width:`${l}px`}})})}),r("div",{class:"log-entries-wrapper",children:[r("div",{class:"column-resize-handle",style:{left:`${d}px`},onMouseDown:E}),r("div",{class:`log-entries ${dt.value==="content"?"focused":""}`,ref:k,tabIndex:0,onKeyDown:p,onMouseEnter:()=>{var T;dt.value="content",(T=k.current)==null||T.focus({preventScroll:!0})},onMouseLeave:()=>u(null),children:Rt.value.map((T,P)=>{var F;return r(Cd,{entry:T,showRaw:Ic.value,searchQuery:Fr.value,isSelected:((F=Us.value)==null?void 0:F.line_number)===T.line_number,onSelect:()=>Vs(T),expandAll:e,isExpanded:n.has(T.line_number),onToggleExpand:()=>S(T.line_number),headerCellRef:C(P),headerScrollLeft:i,headerColWidth:d,onHeaderWheel:g,hoveredSpanName:f,onSpanHover:u,signatures:zc.value},T.line_number)})})]})]})}(function(e){e.languages.typescript=e.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),e.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,/\btype\b(?=\s*(?:[\{*]|$))/),delete e.languages.typescript.parameter,delete e.languages.typescript["literal-property"];var t=e.languages.extend("typescript",{});delete t["class-name"],e.languages.typescript["class-name"].inside=t,e.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:t}}}}),e.languages.ts=e.languages.typescript})(Prism);function Pd(e){return e?e.endsWith(".rs")?"rust":e.endsWith(".ts")||e.endsWith(".tsx")?"typescript":e.endsWith(".js")||e.endsWith(".jsx")?"javascript":e.endsWith(".json")?"json":e.endsWith(".toml")?"toml":e.endsWith(".yaml")||e.endsWith(".yml")?"yaml":"plaintext":"plaintext"}function Fd(){const e=j(null),t=j(null),n=$c.value,s=Lc.value,i=Rc.value,a=Pd(n);if(ge(()=>{t.current&&t.current.scrollIntoView({behavior:"instant",block:"center"})},[i,s]),!n)return r("div",{class:"code-viewer empty",children:r("div",{class:"placeholder-message",children:[r("span",{class:"placeholder-icon",children:"📄"}),r("p",{children:"Click a source location to view code"})]})});const l=s.split(`
`);let o=s;try{const c=Gn.languages[a];c&&(o=Gn.highlight(s,c,a))}catch{}const d=o.split(`
`);return r("div",{class:"code-viewer",ref:e,children:[r("div",{class:"code-header",children:[r("span",{class:"code-filename",children:n}),r("span",{class:"code-language",children:a}),r("span",{class:"code-lines",children:[l.length," lines"]})]}),r("div",{class:"code-content",children:r("pre",{class:"code-pre",children:d.map((c,f)=>{const u=f+1,m=u===i;return r("div",{ref:m?t:void 0,class:`code-line ${m?"highlight":""}`,children:[r("span",{class:"line-number",children:u}),r("code",{dangerouslySetInnerHTML:{__html:c||" "}})]},f)})})})]})}function Md(){const[e,t]=V(0);return r("div",{class:"effects-debug",children:[r("h2",{class:"effects-debug-title",children:"GPU Effects Showcase"}),r("p",{class:"effects-debug-subtitle",children:"Hover, click, and move your mouse over the elements below to see all shader effects."}),r("section",{class:"effects-section",children:[r("h3",{children:"Log Entry Levels"}),r("p",{class:"effects-hint",children:"Each level has a unique ember border colour when hovered."}),r("div",{class:"effects-grid",children:[r("div",{class:`log-entry level-error ${e===0?"selected":""}`,onClick:()=>t(e===0?null:0),children:[r("span",{class:"effects-label",children:"ERROR"}),r("span",{class:"effects-desc",children:"Hot red pulse border"})]}),r("div",{class:`log-entry level-warn ${e===1?"selected":""}`,onClick:()=>t(e===1?null:1),children:[r("span",{class:"effects-label",children:"WARN"}),r("span",{class:"effects-desc",children:"Amber shimmer border"})]}),r("div",{class:`log-entry level-info ${e===2?"selected":""}`,onClick:()=>t(e===2?null:2),children:[r("span",{class:"effects-label",children:"INFO"}),r("span",{class:"effects-desc",children:"Calm blue glow"})]}),r("div",{class:`log-entry level-debug ${e===3?"selected":""}`,onClick:()=>t(e===3?null:3),children:[r("span",{class:"effects-label",children:"DEBUG"}),r("span",{class:"effects-desc",children:"Dim ambient"})]}),r("div",{class:`log-entry level-trace ${e===4?"selected":""}`,onClick:()=>t(e===4?null:4),children:[r("span",{class:"effects-label",children:"TRACE"}),r("span",{class:"effects-desc",children:"Faint trace"})]})]})]}),r("section",{class:"effects-section",children:[r("h3",{children:"Interactive States"}),r("p",{class:"effects-hint",children:'Click entries to toggle "selected" (angelic shards rise from the selected element). Hover to see metal sparks at cursor, embers from borders, and glitter along the edge.'}),r("div",{class:"effects-grid",children:[r("div",{class:`log-entry span-highlighted ${e===5?"selected":""}`,onClick:()=>t(e===5?null:5),children:[r("span",{class:"effects-label",children:"SPAN HIGHLIGHTED"}),r("span",{class:"effects-desc",children:"Bright shimmer wave"})]}),r("div",{class:"log-entry selected",children:[r("span",{class:"effects-label",children:"SELECTED (always on)"}),r("span",{class:"effects-desc",children:"Intense focus ring + angelic shards"})]}),r("div",{class:`log-entry panic-entry ${e===6?"selected":""}`,onClick:()=>t(e===6?null:6),children:[r("span",{class:"effects-label",children:"PANIC"}),r("span",{class:"effects-desc",children:"Alarm strobe pulse"})]})]})]}),r("section",{class:"effects-section",children:[r("h3",{children:"Particle Effects"}),r("p",{class:"effects-hint",children:"Move your mouse over elements to see all four particle types simultaneously."}),r("div",{class:"effects-particle-info",children:[r("div",{class:"effects-particle-card",children:[r("div",{class:"effects-particle-swatch metal-spark"}),r("div",{children:[r("strong",{children:"Metal Sparks"}),r("p",{children:"Spawn at mouse cursor when hovering. Burst on impact, continuous trickle while moving. Subtle trailing dots with gravity."})]})]}),r("div",{class:"effects-particle-card",children:[r("div",{class:"effects-particle-swatch ember"}),r("div",{children:[r("strong",{children:"Embers / Ash"}),r("p",{children:"Continuous rising particles from hovered element borders. Warm orange glow with drift and sway."})]})]}),r("div",{class:"effects-particle-card",children:[r("div",{class:"effects-particle-swatch angel-shard"}),r("div",{children:[r("strong",{children:"Angelic Shards"}),r("p",{children:"Pixel-thin double-pointed diamond beams rising from the selected/opened element. Golden-white crystalline look."})]})]}),r("div",{class:"effects-particle-card",children:[r("div",{class:"effects-particle-swatch glitter"}),r("div",{children:[r("strong",{children:"Angelic Glitter"}),r("p",{children:"Twinkling sparkles drifting along the border of the hovered element. Golden-white to cool-blue cycling."})]})]})]})]}),r("section",{class:"effects-section",children:[r("h3",{children:"Background & Post-Processing"}),r("p",{class:"effects-hint",children:"These effects are always active across the entire viewport."}),r("div",{class:"effects-bg-info",children:r("ul",{children:[r("li",{children:[r("strong",{children:"Smoky Background"})," — 4-layer animated smoke (varied speed, scale, direction) with colour-varied palette and vignette"]}),r("li",{children:[r("strong",{children:"CRT Scanlines"})," — Horizontal and vertical line dimming"]}),r("li",{children:[r("strong",{children:"Pixel Grid"})," — Screen-door opacity pattern (3px cells)"]}),r("li",{children:[r("strong",{children:"Edge Shadow"})," — Viewport edge darkening"]}),r("li",{children:[r("strong",{children:"Torch Flicker"})," — Subtle brightness oscillation"]}),r("li",{children:[r("strong",{children:"Downsampled Noise"})," — 4×4 pixel chunky texture with animated grain"]})]})})]}),r("section",{class:"effects-section",children:[r("h3",{children:"Large Hover Target"}),r("p",{class:"effects-hint",children:"A big element to easily see all hover effects at once."}),r("div",{class:`log-entry level-error effects-large-target ${e===7?"selected":""}`,onClick:()=>t(e===7?null:7),children:r("div",{class:"effects-large-content",children:[r("span",{class:"effects-label",children:"Hover me!"}),r("span",{class:"effects-desc",children:"Move your mouse around this area. Click to toggle selected state (angelic shards). You should see: metal sparks at cursor, embers rising from borders, glitter along the edge, and CRT effects over everything."})]})})]})]})}const Id=`// ── Scene3D shaders: Blinn-Phong lit cubes + grid floor ──\r
\r
struct Uniforms {\r
    viewProj  : mat4x4<f32>,   // 0\r
    model     : mat4x4<f32>,   // 64\r
    color     : vec4<f32>,     // 128\r
    lightDir  : vec4<f32>,     // 144\r
    cameraPos : vec4<f32>,     // 160\r
    flags     : vec4<f32>,     // 176  (x=isGround, y=isHovered, z=time, w=isDragged)\r
};\r
\r
@group(0) @binding(0) var<uniform> u: Uniforms;\r
\r
struct VsOut {\r
    @builtin(position) pos      : vec4<f32>,\r
    @location(0)       normal   : vec3<f32>,\r
    @location(1)       worldPos : vec3<f32>,\r
};\r
\r
// ── vertex ──\r
@vertex\r
fn vs_main(\r
    @location(0) position : vec3<f32>,\r
    @location(1) normal   : vec3<f32>,\r
) -> VsOut {\r
    var out: VsOut;\r
    let wp = u.model * vec4(position, 1.0);\r
    out.pos      = u.viewProj * wp;\r
    out.normal   = normalize((u.model * vec4(normal, 0.0)).xyz);\r
    out.worldPos = wp.xyz;\r
    return out;\r
}\r
\r
// ── fragment ──\r
@fragment\r
fn fs_main(in: VsOut) -> @location(0) vec4<f32> {\r
    let N = normalize(in.normal);\r
    let L = normalize(u.lightDir.xyz);\r
    let V = normalize(u.cameraPos.xyz - in.worldPos);\r
    let H = normalize(L + V);\r
\r
    // ── ground plane with anti-aliased grid ──\r
    if (u.flags.x > 0.5) {\r
        let gx = abs(fract(in.worldPos.x + 0.5) - 0.5) / fwidth(in.worldPos.x);\r
        let gz = abs(fract(in.worldPos.z + 0.5) - 0.5) / fwidth(in.worldPos.z);\r
        let line = 1.0 - min(min(gx, gz), 1.0);\r
\r
        // fade grid at distance\r
        let dist = length(in.worldPos.xz);\r
        let fade = 1.0 - smoothstep(6.0, 14.0, dist);\r
\r
        let base = vec3(0.07, 0.07, 0.09);\r
        let grid = vec3(0.22, 0.24, 0.30);\r
\r
        // highlight axis lines\r
        let axX = 1.0 - min(abs(in.worldPos.z) / fwidth(in.worldPos.z), 1.0);\r
        let axZ = 1.0 - min(abs(in.worldPos.x) / fwidth(in.worldPos.x), 1.0);\r
        let axis = max(axX, axZ);\r
\r
        var col = mix(base, grid, line * fade * 0.6);\r
        col = mix(col, vec3(0.32, 0.36, 0.48), axis * fade * 0.45);\r
        return vec4(col, 1.0);\r
    }\r
\r
    // ── object shading ──\r
    let ambient  = 0.14;\r
    let diffuse  = max(dot(N, L), 0.0);\r
    let specular = pow(max(dot(N, H), 0.0), 48.0);\r
    let rim      = pow(1.0 - max(dot(N, V), 0.0), 3.0);\r
\r
    var base = u.color.rgb;\r
\r
    // hover highlight\r
    if (u.flags.y > 0.5) {\r
        base = mix(base, vec3(1.0), 0.18);\r
        let lit = ambient + diffuse * 0.65 + specular * 0.40 + rim * 0.35;\r
        return vec4(base * lit + vec3(specular * 0.22), 1.0);\r
    }\r
\r
    // dragged: subtle brightening\r
    if (u.flags.w > 0.5) {\r
        base = mix(base, vec3(1.0), 0.08);\r
    }\r
\r
    let lit = ambient + diffuse * 0.65 + specular * 0.28 + rim * 0.08;\r
    return vec4(base * lit + vec3(specular * 0.12), 1.0);\r
}\r
\r
// ── Grid line shaders ──\r
\r
struct GridUniforms {\r
    viewProj  : mat4x4<f32>,\r
    cameraPos : vec4<f32>,\r
    screenSize: vec4<f32>,  // xy = screen size, z = time\r
};\r
\r
@group(0) @binding(1) var<uniform> grid: GridUniforms;\r
\r
struct GridVsOut {\r
    @builtin(position) pos   : vec4<f32>,\r
    @location(0)       color : vec4<f32>,\r
    @location(1)       dist  : f32,\r
};\r
\r
@vertex\r
fn vs_grid(\r
    @location(0) quad      : vec2<f32>,   // [-1,1] quad corner\r
    @location(1) startPos  : vec3<f32>,   // line start in world\r
    @location(2) endPos    : vec3<f32>,   // line end in world\r
    @location(3) color     : vec4<f32>,   // RGBA\r
    @location(4) width     : f32,         // line thickness multiplier\r
) -> GridVsOut {\r
    let lineDir = endPos - startPos;\r
    let t = quad.x * 0.5 + 0.5;\r
    let center = mix(startPos, endPos, t);\r
\r
    // billboard expansion perpendicular to view\r
    let toCamera = normalize(grid.cameraPos.xyz - center);\r
    let right = normalize(cross(lineDir, toCamera));\r
    let up = cross(right, normalize(lineDir));\r
\r
    let thickness = mix(0.015, 0.025, width);\r
    let expandedPos = center + right * quad.y * thickness;\r
\r
    var out: GridVsOut;\r
    out.pos = grid.viewProj * vec4(expandedPos, 1.0);\r
    out.color = color;\r
    out.dist = length(center - grid.cameraPos.xyz);\r
    return out;\r
}\r
\r
@fragment\r
fn fs_grid(in: GridVsOut) -> @location(0) vec4<f32> {\r
    // fade with distance\r
    let fade = 1.0 - smoothstep(20.0, 40.0, in.dist);\r
    return vec4(in.color.rgb, in.color.a * fade);\r
}\r
`;function Ta(e,t){return[e[0]-t[0],e[1]-t[1],e[2]-t[2]]}function Dd(e,t){return[e[0]+t[0],e[1]+t[1],e[2]+t[2]]}function $d(e,t){return[e[0]*t,e[1]*t,e[2]*t]}function hr(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function ti(e,t){return[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]]}function Hn(e){const t=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);return t<1e-8?[0,0,0]:[e[0]/t,e[1]/t,e[2]/t]}function Aa(){const e=new Float32Array(16);return e[0]=e[5]=e[10]=e[15]=1,e}function Ld(e,t,n,s){const i=new Float32Array(16),a=1/Math.tan(e/2);return i[0]=a/t,i[5]=a,i[10]=s/(n-s),i[11]=-1,i[14]=n*s/(n-s),i}function Rd(e,t,n){const s=Hn(Ta(t,e)),i=Hn(ti(s,n)),a=ti(i,s),l=new Float32Array(16);return l[0]=i[0],l[1]=a[0],l[2]=-s[0],l[3]=0,l[4]=i[1],l[5]=a[1],l[6]=-s[1],l[7]=0,l[8]=i[2],l[9]=a[2],l[10]=-s[2],l[11]=0,l[12]=-hr(i,e),l[13]=-hr(a,e),l[14]=hr(s,e),l[15]=1,l}function Zt(e,t){const n=new Float32Array(16);for(let s=0;s<4;s++)for(let i=0;i<4;i++){let a=0;for(let l=0;l<4;l++)a+=e[l*4+i]*t[s*4+l];n[s*4+i]=a}return n}function zd(e){const t=Aa();return t[12]=e[0],t[13]=e[1],t[14]=e[2],t}function Nd(e){const t=new Float32Array(16);return t[0]=e[0],t[5]=e[1],t[10]=e[2],t[15]=1,t}function Bd(e){const t=Aa(),n=Math.cos(e),s=Math.sin(e);return t[0]=n,t[2]=s,t[8]=-s,t[10]=n,t}function Lt(e){const t=new Float32Array(16),n=e[0],s=e[1],i=e[2],a=e[3],l=e[4],o=e[5],d=e[6],c=e[7],f=e[8],u=e[9],m=e[10],y=e[11],_=e[12],v=e[13],x=e[14],k=e[15];t[0]=o*m*k-o*y*x-u*d*k+u*c*x+v*d*y-v*c*m,t[4]=-l*m*k+l*y*x+f*d*k-f*c*x-_*d*y+_*c*m,t[8]=l*u*k-l*y*v-f*o*k+f*c*v+_*o*y-_*c*u,t[12]=-l*u*x+l*m*v+f*o*x-f*d*v-_*o*m+_*d*u,t[1]=-s*m*k+s*y*x+u*i*k-u*a*x-v*i*y+v*a*m,t[5]=n*m*k-n*y*x-f*i*k+f*a*x+_*i*y-_*a*m,t[9]=-n*u*k+n*y*v+f*s*k-f*a*v-_*s*y+_*a*u,t[13]=n*u*x-n*m*v-f*s*x+f*i*v+_*s*m-_*i*u,t[2]=s*d*k-s*c*x-o*i*k+o*a*x+v*i*c-v*a*d,t[6]=-n*d*k+n*c*x+l*i*k-l*a*x-_*i*c+_*a*d,t[10]=n*o*k-n*c*v-l*s*k+l*a*v+_*s*c-_*a*o,t[14]=-n*o*x+n*d*v+l*s*x-l*i*v-_*s*d+_*i*o,t[3]=-s*d*y+s*c*m+o*i*y-o*a*m-u*i*c+u*a*d,t[7]=n*d*y-n*c*m-l*i*y+l*a*m+f*i*c-f*a*d,t[11]=-n*o*y+n*c*u+l*s*y-l*a*u-f*s*c+f*a*o,t[15]=n*o*m-n*d*u-l*s*m+l*i*u+f*s*d-f*i*o;let p=n*t[0]+s*t[4]+i*t[8]+a*t[12];if(Math.abs(p)<1e-10)return null;p=1/p;for(let h=0;h<16;h++)t[h]*=p;return t}function ni(e,t){const n=e[3]*t[0]+e[7]*t[1]+e[11]*t[2]+e[15];return[(e[0]*t[0]+e[4]*t[1]+e[8]*t[2]+e[12])/n,(e[1]*t[0]+e[5]*t[1]+e[9]*t[2]+e[13])/n,(e[2]*t[0]+e[6]*t[1]+e[10]*t[2]+e[14])/n]}function ri(e,t){return[e[0]*t[0]+e[4]*t[1]+e[8]*t[2],e[1]*t[0]+e[5]*t[1]+e[9]*t[2],e[2]*t[0]+e[6]*t[1]+e[10]*t[2]]}function si(e,t){return[e[0]*t[0]+e[4]*t[1]+e[8]*t[2]+e[12]*t[3],e[1]*t[0]+e[5]*t[1]+e[9]*t[2]+e[13]*t[3],e[2]*t[0]+e[6]*t[1]+e[10]*t[2]+e[14]*t[3],e[3]*t[0]+e[7]*t[1]+e[11]*t[2]+e[15]*t[3]]}function gr(e,t,n,s,i){const a=2*e/n-1,l=1-2*t/s,o=si(i,[a,l,0,1]),d=si(i,[a,l,1,1]),c=[o[0]/o[3],o[1]/o[3],o[2]/o[3]],f=[d[0]/d[3],d[1]/d[3],d[2]/d[3]];return{origin:c,direction:Hn(Ta(f,c))}}function ii(e,t,n){let s=-1/0,i=1/0;for(let a=0;a<3;a++)if(Math.abs(e.direction[a])<1e-8){if(e.origin[a]<t[a]||e.origin[a]>n[a])return null}else{let l=(t[a]-e.origin[a])/e.direction[a],o=(n[a]-e.origin[a])/e.direction[a];if(l>o){const d=l;l=o,o=d}if(s=Math.max(s,l),i=Math.min(i,o),s>i)return null}return i<0?null:s>=0?s:i}function ai(e,t){if(Math.abs(e.direction[1])<1e-8)return null;const n=(t-e.origin[1])/e.direction[1];return n<0?null:Dd(e.origin,$d(e.direction,n))}function Od(){const e=[{n:[0,0,1],v:[[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5]]},{n:[0,0,-1],v:[[.5,-.5,-.5],[-.5,-.5,-.5],[-.5,.5,-.5],[.5,.5,-.5]]},{n:[1,0,0],v:[[.5,-.5,.5],[.5,-.5,-.5],[.5,.5,-.5],[.5,.5,.5]]},{n:[-1,0,0],v:[[-.5,-.5,-.5],[-.5,-.5,.5],[-.5,.5,.5],[-.5,.5,-.5]]},{n:[0,1,0],v:[[-.5,.5,.5],[.5,.5,.5],[.5,.5,-.5],[-.5,.5,-.5]]},{n:[0,-1,0],v:[[-.5,-.5,-.5],[.5,-.5,-.5],[.5,-.5,.5],[-.5,-.5,.5]]}],t=[];for(const{n,v:s}of e){const[i,a,l,o]=s;t.push(i[0],i[1],i[2],n[0],n[1],n[2]),t.push(a[0],a[1],a[2],n[0],n[1],n[2]),t.push(l[0],l[1],l[2],n[0],n[1],n[2]),t.push(i[0],i[1],i[2],n[0],n[1],n[2]),t.push(l[0],l[1],l[2],n[0],n[1],n[2]),t.push(o[0],o[1],o[2],n[0],n[1],n[2])}return new Float32Array(t)}const Jt=256,li=16,Gd=36,Pa=12,Xe=10,Hd=1;function Ud(){const e=[];for(let t=-Xe;t<=Xe;t+=Hd)e.push(t,0,-Xe,t,0,Xe,.25,.24,.22,.08,0,0),e.push(-Xe,0,t,Xe,0,t,.25,.24,.22,.08,0,0);return e.push(-Xe,0,0,Xe,0,0,.55,.22,.18,.18,1,0),e.push(0,0,-Xe,0,0,Xe,.18,.22,.55,.18,1,0),{data:new Float32Array(e),count:e.length/Pa}}const oi=[{position:[0,.5,0],scale:[1,1,1],color:[.95,.25,.21,1],rotationY:0},{position:[2.5,1,.8],scale:[.5,2,.5],color:[.18,.6,.95,1],rotationY:.2},{position:[-2.2,.2,-1.2],scale:[1.8,.4,1.5],color:[.22,.88,.38,1],rotationY:.5},{position:[1.2,.25,-2.3],scale:[.5,.5,.5],color:[.98,.85,.15,1],rotationY:.8},{position:[-1.5,.5,2.2],scale:[1,1,1],color:[.72,.32,.95,1],rotationY:1.1},{position:[3.2,.45,-2],scale:[.9,.9,1.4],color:[.15,.85,.82,1],rotationY:.4}];function Vd(){const e=j(null),t=j(null),[n,s]=V(!1),i=Yn.value,a=j({objects:oi.map(c=>({...c,position:[...c.position],scale:[...c.scale],color:[...c.color]})),camYaw:.6,camPitch:.35,camDist:10,camTarget:[0,.5,0],dragIdx:-1,dragPlaneY:0,dragOffset:[0,0,0],orbiting:!1,lastMX:0,lastMY:0,hoverIdx:-1,mouseX:0,mouseY:0,startTime:performance.now()/1e3}),l=ae(()=>{const c=a.current;return[c.camTarget[0]+c.camDist*Math.cos(c.camPitch)*Math.sin(c.camYaw),c.camTarget[1]+c.camDist*Math.sin(c.camPitch),c.camTarget[2]+c.camDist*Math.cos(c.camPitch)*Math.cos(c.camYaw)]},[]),o=ae(c=>{const f=l(),u=a.current,m=Rd(f,u.camTarget,[0,1,0]),y=Ld(Math.PI/4,c,.1,100);return Zt(y,m)},[l]),d=ae((c,f,u)=>{const m=a.current,y=u===m.dragIdx,_=y?0:Math.sin(f*1.2+c.position[0]*3+c.position[2]*2)*.04,v=y?.2:0,x=zd([c.position[0],c.position[1]+_+v,c.position[2]]),k=Bd(c.rotationY),p=Nd(c.scale);return Zt(Zt(x,k),p)},[]);return ge(()=>{const c=e.current;if(!i||!c){!i&&!("gpu"in navigator)&&s(!0);return}const{device:f,format:u}=i,m=a.current,y=f.createShaderModule({code:Id}),_=Od(),v=f.createBuffer({size:_.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});f.queue.writeBuffer(v,0,_.buffer);const x=f.createBuffer({size:Jt*li,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),k=f.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform",hasDynamicOffset:!0,minBindingSize:192}}]}),p=f.createBindGroup({layout:k,entries:[{binding:0,resource:{buffer:x,size:192}}]}),h=f.createRenderPipeline({layout:f.createPipelineLayout({bindGroupLayouts:[k]}),vertex:{module:y,entryPoint:"vs_main",buffers:[{arrayStride:24,attributes:[{shaderLocation:0,offset:0,format:"float32x3"},{shaderLocation:1,offset:12,format:"float32x3"}]}]},fragment:{module:y,entryPoint:"fs_main",targets:[{format:u}]},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"},primitive:{topology:"triangle-list",cullMode:"back"}}),{data:g,count:b}=Ud(),w=new Float32Array([-1,-1,1,-1,1,1,-1,-1,1,1,-1,1]),S=f.createBuffer({size:w.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});f.queue.writeBuffer(S,0,w.buffer);const C=f.createBuffer({size:g.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});f.queue.writeBuffer(C,0,g.buffer);const E=f.createBuffer({size:128,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),A=f.createBindGroupLayout({entries:[{binding:1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform",minBindingSize:96}}]}),T=f.createBindGroup({layout:A,entries:[{binding:1,resource:{buffer:E}}]}),P=[{arrayStride:8,stepMode:"vertex",attributes:[{shaderLocation:0,offset:0,format:"float32x2"}]},{arrayStride:Pa*4,stepMode:"instance",attributes:[{shaderLocation:1,offset:0,format:"float32x3"},{shaderLocation:2,offset:12,format:"float32x3"},{shaderLocation:3,offset:24,format:"float32x4"},{shaderLocation:4,offset:40,format:"float32"}]}],F=f.createRenderPipeline({layout:f.createPipelineLayout({bindGroupLayouts:[A]}),vertex:{module:y,entryPoint:"vs_grid",buffers:P},fragment:{module:y,entryPoint:"fs_grid",targets:[{format:u,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"less-equal"},primitive:{topology:"triangle-list"}}),D=new ArrayBuffer(Jt*li),M=Hn([.5,.8,.3]),O=($,ne,N,K,Ee,$e,ze)=>{const Me=c.getBoundingClientRect(),Ce=Math.max(0,Math.round(Me.left)),Ie=Math.max(0,Math.round(Me.top)),we=Math.min(Math.round(Me.width),Ee-Ce),se=Math.min(Math.round(Me.height),$e-Ie);if(we<=0||se<=0)return;$.setViewport(Ce,Ie,we,se,0,1),$.setScissorRect(Ce,Ie,we,se);const _e=l(),Ue=o(we/se),ce=a.current,Ne=Ee,nt=$e;{const pe=we/Ne,be=se/nt,ie=(2*Ce+we)/Ne-1,Q=1-(2*Ie+se)/nt,de=new Float32Array(16);de[0]=pe,de[5]=be,de[10]=1,de[15]=1,de[12]=ie,de[13]=Q;const rt=Zt(de,Ue),st=Lt(Ue);if(st){const De=new Float32Array(16);De[0]=1/pe,De[5]=1/be,De[10]=1,De[15]=1,De[12]=-ie/pe,De[13]=-Q/be;const ft=Zt(st,De);ea(rt,ft),aa(_e[0],_e[1],_e[2])}ta(Ce,Ie,we,se)}{const pe=ce.camTarget[0],be=ce.camTarget[1],ie=ce.camTarget[2],Q=Ue,de=Q[3]*pe+Q[7]*be+Q[11]*ie+Q[15],rt=de>.001?(Q[2]*pe+Q[6]*be+Q[10]*ie+Q[14])/de:0;ra(rt);const st=Math.sqrt((_e[0]-pe)**2+(_e[1]-be)**2+(_e[2]-ie)**2),De=Math.PI/4,ft=2*st*Math.tan(De/2)/se;ia(ft)}if(ce.dragIdx<0&&!ce.orbiting){const pe=Lt(Ue);if(pe){const be=gr(ce.mouseX,ce.mouseY,we,se,pe);let ie=1/0,Q=-1;for(let de=0;de<ce.objects.length;de++){const rt=ce.objects[de];if(!rt)continue;const st=d(rt,N,de),De=Lt(st);if(!De)continue;const ft={origin:ni(De,be.origin),direction:ri(De,be.direction)},jt=ii(ft,[-.5,-.5,-.5],[.5,.5,.5]);jt!==null&&jt<ie&&(ie=jt,Q=de)}ce.hoverIdx=Q}}ce.dragIdx>=0?c.style.cursor="grabbing":ce.hoverIdx>=0?c.style.cursor="grab":c.style.cursor="default";let Pt=0;for(let pe=0;pe<ce.objects.length;pe++){const be=ce.objects[pe];if(!be)continue;const ie=d(be,N,pe),Q=new Float32Array(D,Jt*Pt,48);Q.set(Ue,0),Q.set(ie,16),Q.set(be.color,32),Q.set([M[0],M[1],M[2],0],36),Q.set([_e[0],_e[1],_e[2],0],40),Q.set([0,ce.hoverIdx===pe?1:0,N,ce.dragIdx===pe?1:0],44),Pt++}ne.queue.writeBuffer(x,0,new Uint8Array(D),0,Jt*Pt);const Ft=new Float32Array(24);Ft.set(Ue,0),Ft.set([_e[0],_e[1],_e[2],0],16),Ft.set([we,se,N,0],20),ne.queue.writeBuffer(E,0,Ft),$.setPipeline(F),$.setVertexBuffer(0,S),$.setVertexBuffer(1,C),$.setBindGroup(0,T),$.draw(6,b),$.setPipeline(h),$.setVertexBuffer(0,v);for(let pe=0;pe<Pt;pe++)$.setBindGroup(0,p,[Jt*pe]),$.draw(Gd);$.setViewport(0,0,Ee,$e,0,1),$.setScissorRect(0,0,Ee,$e)};qi(O);const B=$=>{const ne=c.getBoundingClientRect();m.mouseX=$.clientX-ne.left,m.mouseY=$.clientY-ne.top,m.lastMX=$.clientX,m.lastMY=$.clientY;const N=c.clientWidth,K=c.clientHeight;if($.button===0){const Ee=performance.now()/1e3-m.startTime,$e=o(N/K),ze=Lt($e);if(ze){const Me=gr(m.mouseX,m.mouseY,N,K,ze);let Ce=1/0,Ie=-1;for(let se=0;se<m.objects.length;se++){const _e=m.objects[se];if(!_e)continue;const Ue=d(_e,Ee,se),ce=Lt(Ue);if(!ce)continue;const Ne={origin:ni(ce,Me.origin),direction:ri(ce,Me.direction)},nt=ii(Ne,[-.5,-.5,-.5],[.5,.5,.5]);nt!==null&&nt<Ce&&(Ce=nt,Ie=se)}const we=Ie>=0?m.objects[Ie]:void 0;if(we){m.dragIdx=Ie,m.dragPlaneY=we.position[1];const se=ai(Me,m.dragPlaneY);se&&(m.dragOffset=[we.position[0]-se[0],0,we.position[2]-se[2]]),$.preventDefault()}else m.orbiting=!0}}else $.button===2&&(m.orbiting=!0,$.preventDefault())},I=$=>{const ne=c.getBoundingClientRect();if(m.mouseX=$.clientX-ne.left,m.mouseY=$.clientY-ne.top,m.dragIdx>=0){const N=m.objects[m.dragIdx];if(!N){m.dragIdx=-1;return}const K=c.clientWidth,Ee=c.clientHeight,$e=o(K/Ee),ze=Lt($e);if(ze){const Me=gr(m.mouseX,m.mouseY,K,Ee,ze),Ce=ai(Me,m.dragPlaneY);Ce&&(N.position[0]=Ce[0]+m.dragOffset[0],N.position[2]=Ce[2]+m.dragOffset[2])}return}if(m.orbiting){const N=$.clientX-m.lastMX,K=$.clientY-m.lastMY;m.camYaw+=N*.005,m.camPitch=Math.max(-1.4,Math.min(1.4,m.camPitch+K*.005)),m.lastMX=$.clientX,m.lastMY=$.clientY}},R=()=>{m.dragIdx=-1,m.orbiting=!1},W=$=>{m.camDist=Math.max(3,Math.min(30,m.camDist+$.deltaY*.01)),$.preventDefault()},G=$=>$.preventDefault();let L=0,z=0,q=0,oe=0,me=0,te=0;const Re=".scene3d-hud button, .scene3d-hud a, .scene3d-hud input",Se=($,ne)=>{const N=$.clientX-ne.clientX,K=$.clientY-ne.clientY;return Math.sqrt(N*N+K*K)},Y=$=>{if(!$.target.closest(Re)){if($.preventDefault(),L=$.touches.length,$.touches.length===1){const N=$.touches[0];if(!N)return;z=N.clientX,q=N.clientY}else if($.touches.length===2){const N=$.touches[0],K=$.touches[1];if(!N||!K)return;oe=Se(N,K),me=(N.clientX+K.clientX)/2,te=(N.clientY+K.clientY)/2}}},ve=$=>{if(!$.target.closest(Re)){if($.preventDefault(),$.touches.length===1&&L===1){const N=$.touches[0];if(!N)return;const K=N.clientX-z,Ee=N.clientY-q;z=N.clientX,q=N.clientY,m.camYaw+=K*.005,m.camPitch=Math.max(-1.4,Math.min(1.4,m.camPitch+Ee*.005))}else if($.touches.length===2){const N=$.touches[0],K=$.touches[1];if(!N||!K)return;const Ee=Se(N,K),$e=(N.clientX+K.clientX)/2,ze=(N.clientY+K.clientY)/2;if(oe>0){const _e=oe/Ee;m.camDist=Math.max(3,Math.min(30,m.camDist*_e))}oe=Ee;const Me=$e-me,Ce=ze-te,Ie=m.camDist*.002,we=Math.cos(m.camYaw),se=Math.sin(m.camYaw);m.camTarget=[m.camTarget[0]-Me*Ie*we,m.camTarget[1]+Ce*Ie,m.camTarget[2]+Me*Ie*se],me=$e,te=ze}}},xe=$=>{L=$.touches.length},le=()=>{L=0,oe=0};return c.addEventListener("mousedown",B),window.addEventListener("mousemove",I),window.addEventListener("mouseup",R),c.addEventListener("wheel",W,{passive:!1}),c.addEventListener("contextmenu",G),c.addEventListener("touchstart",Y,{passive:!1}),c.addEventListener("touchmove",ve,{passive:!1}),c.addEventListener("touchend",xe),c.addEventListener("touchcancel",le),t.current=()=>{oi.forEach(($,ne)=>{const N=m.objects[ne];N&&(N.position=[...$.position])}),m.camYaw=.6,m.camPitch=.35,m.camDist=10},()=>{Ki(O),c.removeEventListener("mousedown",B),window.removeEventListener("mousemove",I),window.removeEventListener("mouseup",R),c.removeEventListener("wheel",W),c.removeEventListener("contextmenu",G),c.removeEventListener("touchstart",Y),c.removeEventListener("touchmove",ve),c.removeEventListener("touchend",xe),c.removeEventListener("touchcancel",le),v.destroy(),x.destroy()}},[i,l,o,d]),n?r("div",{ref:e,class:"scene3d-container",children:r("div",{class:"scene3d-error",children:"WebGPU is not supported in this browser"})}):r("div",{ref:e,class:"scene3d-container",children:r("div",{class:"scene3d-hud",children:[r("span",{children:"Left drag: Move objects"}),r("span",{children:"Right drag: Orbit"}),r("span",{children:"Scroll: Zoom"}),r("button",{class:"scene3d-reset",onClick:()=>{var c;return(c=t.current)==null?void 0:c.call(t)},children:"Reset"})]})})}function Fa(e){var n;return(((n=e.transition)==null?void 0:n.kind)??"unknown").split("_").map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join(" ")}function Ma(e){var n;return`phase-${(((n=e.transition)==null?void 0:n.kind)??"unknown").toLowerCase().replace(/_/g,"")}`}function es(e){return e==="search"?"🔍":e==="insert"?"+":"📖"}function Ia(e){const t=e.split("/");return t.length>=3?{opType:t[0],module:t[1],semanticId:t.slice(2).join("/")}:{opType:null,module:null,semanticId:e}}function Wd(e){const{opType:t,semanticId:n}=Ia(e),s=t?es(t):"",i=n.length>20?n.slice(0,18)+"…":n;return s?`${s} ${i}`:i}function jd(e){return e!=null&&e.kind?e.kind.split("_").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" "):""}function ci(e){var n,s;const t=e.transition;if(!t)return((n=e.location)==null?void 0:n.selected_node)??null;switch(t.kind){case"visit_parent":case"visit_child":return t.to.index;default:return((s=e.location)==null?void 0:s.selected_node)??null}}function Yd(e){if(e.length===0)return[];const t=[],n=e[0];let s={nodeIndex:ci(n),events:[n],stepIndices:[0]};for(let i=1;i<e.length;i++){const a=e[i],l=ci(a);l===s.nodeIndex?(s.events.push(a),s.stepIndices.push(i)):(t.push(s),s={nodeIndex:l,events:[a],stepIndices:[i]})}return t.push(s),t}function di({ev:e,isActive:t,onClick:n,indented:s}){return r("div",{class:`ssp-item ${t?"active":""} ${s?"ssp-item-indented":""}`,onClick:n,children:[r("span",{class:"ssp-step",children:[es(e.op_type),e.step]}),r("div",{class:"ssp-content",children:[r("div",{class:`ssp-phase ${Ma(e)}`,children:Fa(e)}),r("div",{class:"ssp-path-trans",children:["↳ ",jd(e.transition)]}),r("div",{class:"ssp-desc",children:e.description})]})]})}function qd({group:e,currentStep:t,onStepClick:n,expandedNodes:s,onToggle:i}){const a=e.stepIndices[0],l=e.stepIndices.includes(t);if(e.events.length===1)return r(di,{ev:e.events[0],isActive:t===a,onClick:()=>n(a)});const o=s.has(a)||l,d=e.events[0],c=e.events[e.events.length-1];return r("div",{class:`ssp-node-group ${l?"active-node-group":""}`,children:[r("div",{class:"ssp-node-group-header",onClick:()=>i(a),children:[r("span",{class:"ssp-node-group-chevron",children:o?"▾":"▸"}),r("span",{class:"ssp-node-group-label",children:["node ",e.nodeIndex??"?"]}),r("span",{class:"ssp-node-group-range",children:[d.step,"–",c.step]}),r("span",{class:"ssp-node-group-count",children:e.events.length})]}),o&&r("div",{class:"ssp-node-group-items",children:e.events.map((f,u)=>{const m=e.stepIndices[u];return r(di,{ev:f,isActive:t===m,onClick:()=>n(m),indented:!0},m)})})]})}function Kd({group:e}){const t=On.value===e.pathId,n=Ut.value,[s,i]=V(!1),[a,l]=V(new Set),o=Pe(()=>Yd(e.events),[e.events]),{opType:d}=Ia(e.pathId),c=d?`ssp-op-${d}`:"",f=()=>{t?i(!s):(an(e.pathId),i(!1))},u=x=>{t||an(e.pathId),Ir(x);const k=e.globalIndices[x];k!=null&&yt(k)},m=x=>{l(k=>{const p=new Set(k);return p.has(x)?p.delete(x):p.add(x),p})},y=()=>{n>0&&u(n-1)},_=()=>{n<e.events.length-1&&u(n+1)},v=x=>{x.stopPropagation(),an(null)};return r("div",{class:`ssp-path-group ${t?"active-group":""} ${c}`,children:[r("div",{class:"ssp-group-header",onClick:f,children:[r("span",{class:`ssp-group-chevron ${s&&t?"collapsed":""}`,children:t?s?"▶":"▼":"▷"}),r("span",{class:"ssp-group-id",title:e.pathId,children:Wd(e.pathId)}),r("span",{class:"ssp-group-count",children:e.events.length}),t&&r("button",{class:"ssp-group-close",onClick:v,title:"Close this search path",children:"✕"})]}),t&&!s&&r(ue,{children:[r("div",{class:"ssp-group-list",children:o.map((x,k)=>r(qd,{group:x,currentStep:n,onStepClick:u,expandedNodes:a,onToggle:m},k))}),r("div",{class:"ssp-controls",children:[r("button",{class:"ssp-btn",onClick:y,disabled:n<=0,children:"← Prev"}),r("span",{class:"ssp-position",children:[n>=0?n+1:"—"," /"," ",e.events.length]}),r("button",{class:"ssp-btn",onClick:_,disabled:n>=e.events.length-1,children:"Next →"})]})]})]})}function Xd(){const e=pa.value,t=fn.value,n=()=>{t>0&&yt(t-1)},s=()=>{t<e.length-1&&yt(t+1)};return r(ue,{children:[r("div",{class:"ssp-list",children:e.map((i,a)=>r("div",{class:`ssp-item ${t===a?"active":""}`,onClick:()=>yt(a),children:[r("span",{class:"ssp-step",children:[es(i.op_type),i.step]}),r("div",{class:"ssp-content",children:[r("div",{class:`ssp-phase ${Ma(i)}`,children:Fa(i)}),r("div",{class:"ssp-desc",children:i.description})]})]},i.step))}),r("div",{class:"ssp-controls",children:[r("button",{class:"ssp-btn",onClick:n,disabled:t<=0,children:"← Prev"}),r("span",{class:"ssp-position",children:[t>=0?t+1:"—"," / ",e.length]}),r("button",{class:"ssp-btn",onClick:s,disabled:t>=e.length-1,children:"Next →"})]})]})}function Zd(){const e=pa.value,t=fa.value;if(e.length===0)return null;const n=t.length>0,s=e.length,i=t.length;return ge(()=>{function a(l){var f;const o=(f=l.target)==null?void 0:f.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT"||l.target.closest(".file-list, .log-entries")||l.key!=="ArrowUp"&&l.key!=="ArrowDown"&&l.key!=="Escape")return;if(l.key==="Escape"){n&&On.value&&(l.preventDefault(),an(null));return}l.preventDefault();const c=l.key==="ArrowDown"?1:-1;if(n){const u=t.find(_=>_.pathId===On.value);if(!u){if(t.length>0){an(t[0].pathId),Ir(0);const _=t[0].globalIndices[0];_!=null&&yt(_)}return}const m=Ut.value,y=Math.max(0,Math.min(u.events.length-1,m+c));if(y!==m){Ir(y);const _=u.globalIndices[y];_!=null&&yt(_)}}else{const u=fn.value,m=Math.max(0,Math.min(e.length-1,u+c));m!==u&&yt(m)}}return window.addEventListener("keydown",a),()=>window.removeEventListener("keydown",a)},[e,t,n]),ge(()=>{const a=document.querySelector(".search-state-panel");if(!a)return;const l=a.querySelector(".ssp-item.active");l&&l.scrollIntoView({behavior:"smooth",block:"nearest"})},[fn.value,Ut.value]),r("div",{class:"search-state-panel",children:[r("div",{class:"ssp-header",children:[r("span",{class:"ssp-title",children:n?"Search Paths":"Operation Steps"}),r("span",{class:"ssp-count",children:n?`${i} path${i!==1?"s":""} · ${s} steps`:`${s} steps`})]}),n?r("div",{class:"ssp-groups-container",children:t.map(a=>r(Kd,{group:a},a.pathId))}):r(Xd,{})]})}function Jd(e){var n;const t=(n=e.transition)==null?void 0:n.kind;return t?t==="split_start"||t==="split_complete"?"split":t==="join_start"||t==="join_step"||t==="join_complete"?"join":t==="create_pattern"||t==="create_root"||t==="update_pattern"?"create":t==="done"?"done":"other":"other"}function Qd(e){switch(e){case"split":return"Split Phase";case"join":return"Join Phase";case"create":return"Create Phase";case"done":return"Complete";default:return"Insert"}}function eu(e){switch(e){case"split":return"#ff8040";case"join":return"#a0c0ff";case"create":return"#ffdc60";case"done":return"#60e080";default:return"#c0c0c0"}}function tu(e){switch(e.op){case"add_node":return"+🔵";case"remove_node":return"-🔵";case"add_edge":return"+🔗";case"remove_edge":return"-🔗";case"update_node":return"✏️"}}function nu(e){switch(e.op){case"add_node":return`Add node ${e.index} (w=${e.width})`;case"remove_node":return`Remove node ${e.index}`;case"add_edge":return`Add edge ${e.from}→${e.to} [p${e.pattern_id}]`;case"remove_edge":return`Remove edge ${e.from}→${e.to} [p${e.pattern_id}]`;case"update_node":return`Update node ${e.index}: ${e.detail}`}}function ru(e){switch(e.op){case"add_node":case"add_edge":return"isp-delta-add";case"remove_node":case"remove_edge":return"isp-delta-remove";case"update_node":return"isp-delta-update"}}function su(e){const t=e.transition;if(!t)return null;switch(t.kind){case"split_start":return`Splitting node ${t.node.index} at position ${t.split_position}`;case"split_complete":{const n=[`Original: ${t.original_node}`];return t.left_fragment!=null&&n.push(`Left: ${t.left_fragment}`),t.right_fragment!=null&&n.push(`Right: ${t.right_fragment}`),n.join(" · ")}case"join_start":return`Joining ${t.nodes.length} nodes: [${t.nodes.join(", ")}]`;case"join_step":return`${t.left} ⊕ ${t.right} → ${t.result}`;case"join_complete":return`Result: node ${t.result_node}`;case"create_pattern":return`Parent ${t.parent}, pattern #${t.pattern_id}: [${t.children.join(", ")}]`;case"create_root":return`New root node ${t.node.index} (width ${t.node.width})`;case"update_pattern":return`Parent ${t.parent}: [${t.old_children.join(",")}] → [${t.new_children.join(",")}]`;default:return null}}function iu(e){const t={addedNodes:0,removedNodes:0,addedEdges:0,removedEdges:0,updatedNodes:0};if(!(e!=null&&e.ops))return t;for(const n of e.ops)switch(n.op){case"add_node":t.addedNodes++;break;case"remove_node":t.removedNodes++;break;case"add_edge":t.addedEdges++;break;case"remove_edge":t.removedEdges++;break;case"update_node":t.updatedNodes++;break}return t}function au({op:e}){return r("div",{class:`isp-delta-row ${ru(e)}`,children:[r("span",{class:"isp-delta-icon",children:tu(e)}),r("span",{class:"isp-delta-label",children:nu(e)})]})}function lu({delta:e}){const t=Pe(()=>iu(e),[e]);return e.ops.length>0?r("div",{class:"isp-delta-section",children:[r("div",{class:"isp-delta-header",children:[r("span",{class:"isp-delta-title",children:"Graph Changes"}),r("span",{class:"isp-delta-summary",children:[t.addedNodes>0&&r("span",{class:"isp-delta-badge isp-badge-add",children:["+",t.addedNodes," nodes"]}),t.removedNodes>0&&r("span",{class:"isp-delta-badge isp-badge-remove",children:["-",t.removedNodes," nodes"]}),t.addedEdges>0&&r("span",{class:"isp-delta-badge isp-badge-add",children:["+",t.addedEdges," edges"]}),t.removedEdges>0&&r("span",{class:"isp-delta-badge isp-badge-remove",children:["-",t.removedEdges," edges"]}),t.updatedNodes>0&&r("span",{class:"isp-delta-badge isp-badge-update",children:[t.updatedNodes," updated"]})]})]}),r("div",{class:"isp-delta-ops",children:e.ops.map((s,i)=>r(au,{op:s},i))})]}):null}function ou(){const e=Jr.value??Zr.value;if(!e||e.op_type!=="insert")return null;const t=Jd(e),n=su(e),s=e.graph_mutation;return r("div",{class:"insert-state-panel",children:[r("div",{class:"isp-header",children:[r("span",{class:"isp-badge",style:{color:eu(t)},children:Qd(t)}),r("span",{class:"isp-step",children:["Step ",e.step]})]}),n&&r("div",{class:"isp-detail",children:n}),r("div",{class:"isp-description",children:e.description}),s&&r(lu,{delta:s})]})}function cu({nestingSettings:e,onNestingChange:t}){const n=Pr.value,s=e;return r("div",{class:"hypergraph-hud",children:[r("span",{children:"Left drag: Move nodes"}),r("span",{children:"Right / Left empty: Orbit"}),r("span",{children:"Middle / Shift+Left: Pan"}),r("span",{children:"Scroll: Zoom"}),r("span",{children:"Click node: Select & Focus"}),r("button",{class:`hg-btn hg-toggle ${n?"hg-toggle-on":""}`,onClick:()=>{Pr.value=!n},title:"When enabled, clicking a node reflows the layout around it. When disabled, nodes can be freely dragged.",children:n?"📐 Layout ON":"📐 Layout OFF"}),n&&s&&t&&r(ue,{children:[r("button",{class:`hg-btn hg-toggle ${s.enabled?"hg-toggle-on":""}`,onClick:()=>t({enabled:!s.enabled}),title:"Toggle nesting view (show parents as containing shells, expand selected nodes)",children:s.enabled?"🪆 Nesting ON":"🪆 Nesting OFF"}),s.enabled&&r(ue,{children:[r("button",{class:`hg-btn hg-toggle ${s.duplicateMode?"hg-toggle-on":""}`,onClick:()=>t({duplicateMode:!s.duplicateMode}),title:"Duplicate mode: show children both inside parent and at original position",children:s.duplicateMode?"Dup ON":"Dup OFF"}),r("label",{class:"hg-slider-label",title:"Parent shell depth",children:["P:",s.parentDepth,r("input",{type:"range",class:"hg-slider",min:1,max:5,value:s.parentDepth,onInput:i=>t({parentDepth:Number(i.target.value)})})]}),r("label",{class:"hg-slider-label",title:"Child expansion depth",children:["C:",s.childDepth,r("input",{type:"range",class:"hg-slider",min:1,max:3,value:s.childDepth,onInput:i=>t({childDepth:Number(i.target.value)})})]})]})]})]})}function En({node:e,role:t,onClick:n}){const s=`pc-node-${t}`;return r("button",{class:`pc-node ${s}`,onClick:n,title:`Node #${e.index} (width ${e.width})`,children:[r("span",{class:"pc-node-idx",children:["#",e.index]}),e.width>1&&r("span",{class:"pc-node-width",children:["w",e.width]})]})}function mr({direction:e}){const t=e==="up"?"↑":e==="down"?"↓":"◆",n=`pc-arrow pc-arrow-${e}`;return r("span",{class:n,children:t})}function du({graph:e}){return e.done?r("span",{class:`pc-status ${e.success?"pc-status-match":"pc-status-mismatch"}`,children:[e.success?"✓ match":"✗ mismatch"," @ ",e.cursor_pos]}):r("span",{class:"pc-status pc-status-active",children:["pos ",e.cursor_pos]})}function uu({onFocusNode:e}){const t=ga.value;if(!t||!t.start_node)return null;const n=t.start_node,s=t.start_path,i=t.root,a=t.end_path;return r("div",{class:"path-chain-panel",children:[r("div",{class:"pc-header",children:[r("span",{class:"pc-title",children:"Search Path"}),r(du,{graph:t})]}),r("div",{class:"pc-chain",children:[r(En,{node:n,role:"start",onClick:()=>e(n.index)}),s.map((l,o)=>r("span",{class:"pc-segment",children:[r(mr,{direction:"up"}),r(En,{node:l,role:"start-path",onClick:()=>e(l.index)})]},`sp-${o}`)),i&&r("span",{class:"pc-segment",children:[r(mr,{direction:"root"}),r(En,{node:i,role:"root",onClick:()=>e(i.index)})]}),a.map((l,o)=>r("span",{class:"pc-segment",children:[r(mr,{direction:"down"}),r(En,{node:l,role:"end-path",onClick:()=>e(l.index)})]},`ep-${o}`))]})]})}function pu(e){const t=Kr.value;if(!t)return`#${e}`;const n=t.nodes.find(s=>s.index===e);return(n==null?void 0:n.label)??`#${e}`}function fu(e,t){const n=[0];for(let s=0;s<t.length;s++)n.push(n[s]+t[s]);return n}function hu(e,t,n){const s=e.query_tokens.length,i=new Array(s).fill("idle"),a=new Set(e.matched_positions??[]),l=e.cursor_position;for(let o=0;o<s;o++){const d=t[o],c=t[o+1];let f=!1;for(let m=d;m<c;m++)if(a.has(m)){f=!0;break}const u=l>=d&&l<c;u&&n==="child_mismatch"?i[o]="active-mismatch":u&&n==="child_match"?i[o]="active-match":f?i[o]="matched":u&&(i[o]="cursor")}return i}function gu(){var d;const e=Jr.value??Zr.value,t=e==null?void 0:e.query;if(!t||!t.query_tokens.length)return null;const n=Kr.value,s=Pe(()=>n?t.query_tokens.map(c=>{const f=n.nodes.find(u=>u.index===c);return(f==null?void 0:f.width)??1}):t.query_tokens.map(()=>1),[t.query_tokens,n]),i=Pe(()=>fu(t,s),[t,s]),a=(d=e==null?void 0:e.transition)==null?void 0:d.kind,l=Pe(()=>hu(t,i,a),[t,i,a]),o=t.query_width>0?Math.min(t.cursor_position/t.query_width,1):0;return r("div",{class:"qp-panel",children:[r("div",{class:"qp-header",children:[r("span",{class:"qp-title",children:"Query Pattern"}),r("span",{class:"qp-progress-label",children:[t.cursor_position,"/",t.query_width]})]}),r("div",{class:"qp-progress-bar",children:r("div",{class:"qp-progress-fill",style:{width:`${o*100}%`}})}),r("div",{class:"qp-tokens",children:t.query_tokens.map((c,f)=>{const u=l[f]??"idle",m=s[f]??1,y=pu(c),_=t.active_token===c;return r("div",{class:`qp-token qp-token-${u} ${_?"qp-token-compared":""}`,title:`Token #${c} (width ${m}, atoms ${i[f]}–${(i[f+1]??0)-1})`,children:[r("span",{class:"qp-token-label",children:y}),m>1&&r("span",{class:"qp-token-width",children:["w",m]})]},f)})})]})}function ui(){const e=Kr.value,t=Jr.value??Zr.value,n=ga.value,s=Pr.value,i=(e==null?void 0:e.edges)??null,a=`${fn.value}/${Ut.value}`;return r(oc,{snapshot:e,currentEvent:t,searchPath:n,autoLayout:s,snapshotEdges:i,stepKey:a,renderChildren:({handleFocusNode:l,nestingSettings:o,setNestingSettings:d})=>r(ue,{children:[r(Zd,{}),r(ou,{}),r(uu,{onFocusNode:l}),r(gu,{}),r(cu,{nestingSettings:o,onNestingChange:d})]})})}const Be={bgPrimary:"#0d0c0b",bgSecondary:"#141311",bgTertiary:"#1a1816",bgHover:"#24201c",bgActive:"#2a2218",textPrimary:"#c8c0b4",textSecondary:"#8a8478",textMuted:"#524e46",borderColor:"#2e2a24",borderSubtle:"#1e1c18",accentBlue:"#3a6a80",accentGreen:"#2a5a28",accentOrange:"#c85a18",accentPurple:"#5a3a6a",accentYellow:"#a08018",levelTrace:"#3a3830",levelDebug:"#4a5a3a",levelInfo:"#3a5a6a",levelWarn:"#a07020",levelError:"#8a2a18",levelTraceText:"#c0c0c8",levelDebugText:"#d8c8f0",levelInfoText:"#b8d8f8",levelWarnText:"#f8e8b8",levelErrorText:"#f8c8c8",spanEnterText:"#90d8a8",spanExitText:"#f0b080",particleSparkCore:"#ffe699",particleSparkEmber:"#d94d14",particleSparkSteel:"#9999b3",particleEmberHot:"#e6b366",particleEmberBase:"#d94d14",particleBeamCenter:"#ffedcc",particleBeamEdge:"#cc9933",particleGlitterWarm:"#ffdfad",particleGlitterCool:"#b3bfff",cinderEmber:"#d94d14",cinderGold:"#cc8c1f",cinderAsh:"#595247",cinderVine:"#2e7326",smokeCool:"#080914",smokeWarm:"#0e0906",smokeMoss:"#090a09"},mu={sparksEnabled:!0,sparkCount:50,sparkSize:80,sparkSpeed:80,embersEnabled:!0,emberCount:50,emberSize:80,emberSpeed:65,beamsEnabled:!1,glitterEnabled:!1,cinderEnabled:!0,cinderSize:80,smokeEnabled:!0,smokeIntensity:45,smokeSpeed:45,crtEnabled:!0,crtScanlinesH:20,crtScanlinesV:10,crtEdgeShadow:35,crtFlicker:15,grainIntensity:25,vignetteStrength:50,underglowStrength:35},vu={sparksEnabled:!1,embersEnabled:!1,beamsEnabled:!0,beamCount:24,beamHeight:40,beamSpeed:30,beamDrift:60,glitterEnabled:!0,glitterCount:55,glitterSize:55,glitterSpeed:35,cinderEnabled:!0,cinderSize:60,smokeEnabled:!0,smokeIntensity:30,smokeSpeed:35,crtEnabled:!0,crtScanlinesH:12,crtScanlinesV:8,crtEdgeShadow:25,crtFlicker:8,grainIntensity:12,vignetteStrength:35,underglowStrength:18},_u={sparksEnabled:!0,sparkCount:30,sparkSize:85,sparkSpeed:55,embersEnabled:!0,emberCount:55,emberSize:85,emberSpeed:50,beamsEnabled:!1,glitterEnabled:!1,cinderEnabled:!0,cinderSize:85,smokeEnabled:!0,smokeIntensity:50,smokeSpeed:35,crtEnabled:!0,crtScanlinesH:18,crtScanlinesV:12,crtEdgeShadow:45,crtFlicker:18,grainIntensity:28,vignetteStrength:55,underglowStrength:35},bu={sparksEnabled:!1,embersEnabled:!1,beamsEnabled:!1,glitterEnabled:!0,glitterCount:30,glitterSize:45,glitterSpeed:25,cinderEnabled:!0,cinderSize:55,smokeEnabled:!0,smokeIntensity:40,smokeSpeed:25,crtEnabled:!0,crtScanlinesH:8,crtScanlinesV:5,crtEdgeShadow:25,crtFlicker:8,grainIntensity:18,vignetteStrength:40,underglowStrength:22},yu={sparksEnabled:!1,embersEnabled:!1,beamsEnabled:!0,beamCount:20,beamHeight:50,beamSpeed:22,beamDrift:120,glitterEnabled:!0,glitterCount:45,glitterSize:45,glitterSpeed:25,cinderEnabled:!0,cinderSize:55,smokeEnabled:!0,smokeIntensity:35,smokeSpeed:25,crtEnabled:!0,crtScanlinesH:8,crtScanlinesV:6,crtEdgeShadow:35,crtFlicker:6,grainIntensity:18,vignetteStrength:50,underglowStrength:18},wu={sparksEnabled:!1,embersEnabled:!1,beamsEnabled:!1,glitterEnabled:!1,cinderEnabled:!0,cinderSize:45,smokeEnabled:!0,smokeIntensity:20,smokeSpeed:35,crtEnabled:!0,crtScanlinesH:55,crtScanlinesV:35,crtEdgeShadow:50,crtFlicker:30,grainIntensity:30,vignetteStrength:55,underglowStrength:25},xu={sparksEnabled:!1,embersEnabled:!1,beamsEnabled:!0,beamCount:16,beamHeight:55,beamSpeed:18,beamDrift:45,glitterEnabled:!0,glitterCount:35,glitterSize:40,glitterSpeed:22,cinderEnabled:!0,cinderSize:55,smokeEnabled:!0,smokeIntensity:45,smokeSpeed:22,crtEnabled:!0,crtScanlinesH:8,crtScanlinesV:5,crtEdgeShadow:30,crtFlicker:6,grainIntensity:12,vignetteStrength:45,underglowStrength:18},ku={sparksEnabled:!1,embersEnabled:!1,beamsEnabled:!0,beamCount:32,beamHeight:40,beamSpeed:30,beamDrift:85,glitterEnabled:!0,glitterCount:30,glitterSize:50,glitterSpeed:30,cinderEnabled:!0,cinderSize:65,smokeEnabled:!0,smokeIntensity:0,smokeSpeed:30,crtEnabled:!0,crtScanlinesH:30,crtScanlinesV:30,crtEdgeShadow:0,crtFlicker:6,grainIntensity:12,vignetteStrength:30,underglowStrength:20},Su={sparksEnabled:!1,embersEnabled:!1,beamsEnabled:!1,glitterEnabled:!0,glitterCount:40,glitterSize:55,glitterSpeed:25,cinderEnabled:!0,cinderSize:55,smokeEnabled:!0,smokeIntensity:25,smokeSpeed:25,crtEnabled:!0,crtScanlinesH:6,crtScanlinesV:4,crtEdgeShadow:22,crtFlicker:4,grainIntensity:10,vignetteStrength:30,underglowStrength:18},Eu={sparksEnabled:!1,embersEnabled:!1,beamsEnabled:!1,glitterEnabled:!1,cinderEnabled:!0,cinderSize:45,smokeEnabled:!0,smokeIntensity:18,smokeSpeed:25,crtEnabled:!0,crtScanlinesH:6,crtScanlinesV:4,crtEdgeShadow:18,crtFlicker:4,grainIntensity:8,vignetteStrength:22,underglowStrength:12},Cu={sparksEnabled:!1,embersEnabled:!1,beamsEnabled:!1,glitterEnabled:!1,cinderEnabled:!0,cinderSize:35,smokeEnabled:!1,crtEnabled:!1,grainIntensity:6,vignetteStrength:12,underglowStrength:8},Tu={sparksEnabled:!1,embersEnabled:!1,beamsEnabled:!1,glitterEnabled:!1,cinderEnabled:!0,cinderSize:35,smokeEnabled:!1,crtEnabled:!1,grainIntensity:0,vignetteStrength:8,underglowStrength:8},Au={sparksEnabled:!0,sparkCount:25,sparkSize:70,sparkSpeed:50,embersEnabled:!0,emberCount:35,emberSize:75,emberSpeed:45,beamsEnabled:!1,glitterEnabled:!1,cinderEnabled:!0,cinderSize:70,smokeEnabled:!0,smokeIntensity:35,smokeSpeed:30,crtEnabled:!0,crtScanlinesH:14,crtScanlinesV:8,crtEdgeShadow:30,crtFlicker:10,grainIntensity:22,vignetteStrength:40,underglowStrength:30},Pu={sparksEnabled:!1,embersEnabled:!1,beamsEnabled:!1,glitterEnabled:!0,glitterCount:22,glitterSize:38,glitterSpeed:22,cinderEnabled:!0,cinderSize:35,smokeEnabled:!1,crtEnabled:!1,grainIntensity:4,vignetteStrength:12,underglowStrength:8},Fu={sparksEnabled:!1,embersEnabled:!1,beamsEnabled:!0,beamCount:24,beamHeight:35,beamSpeed:35,beamDrift:65,glitterEnabled:!0,glitterCount:40,glitterSize:50,glitterSpeed:45,cinderEnabled:!0,cinderSize:75,smokeEnabled:!0,smokeIntensity:30,smokeSpeed:35,crtEnabled:!0,crtScanlinesH:22,crtScanlinesV:14,crtEdgeShadow:35,crtFlicker:12,grainIntensity:18,vignetteStrength:45,underglowStrength:25},Mu={sparksEnabled:!1,embersEnabled:!1,beamsEnabled:!1,glitterEnabled:!1,cinderEnabled:!0,cinderSize:35,smokeEnabled:!1,crtEnabled:!1,grainIntensity:28,grainCoarseness:55,grainSize:40,vignetteStrength:35,underglowStrength:12},Iu={sparksEnabled:!1,embersEnabled:!1,beamsEnabled:!1,glitterEnabled:!0,glitterCount:30,glitterSize:38,glitterSpeed:55,cinderEnabled:!0,cinderSize:45,smokeEnabled:!0,smokeIntensity:22,smokeSpeed:30,crtEnabled:!0,crtScanlinesH:40,crtScanlinesV:25,crtEdgeShadow:40,crtFlicker:18,grainIntensity:18,vignetteStrength:40,underglowStrength:18},Da=[{name:"Cinder",description:"Dark Souls gothic stone — ember & vine",colors:{...Be},effects:mu},{name:"Frost",description:"Icy blue — cold steel & aurora",colors:{...Be,bgPrimary:"#060a12",bgSecondary:"#0a1020",bgTertiary:"#0e1628",bgHover:"#162438",bgActive:"#1c2e44",textPrimary:"#b8c8d8",textSecondary:"#687888",textMuted:"#384858",borderColor:"#1e2838",borderSubtle:"#141c28",accentBlue:"#4a8aaa",accentGreen:"#2a6a58",accentOrange:"#aa6030",accentPurple:"#5a4a8a",accentYellow:"#8a8a40",levelTrace:"#283038",levelDebug:"#2a4a48",levelInfo:"#2a4a6a",levelWarn:"#6a5a2a",levelError:"#6a2228",particleSparkCore:"#aad4ff",particleSparkEmber:"#4488cc",particleSparkSteel:"#8899bb",particleEmberHot:"#88bbff",particleEmberBase:"#4488cc",particleBeamCenter:"#ddeeff",particleBeamEdge:"#6699cc",particleGlitterWarm:"#aaccff",particleGlitterCool:"#88aadd",cinderEmber:"#4488bb",cinderGold:"#5588aa",cinderAsh:"#445566",cinderVine:"#2a6a58",smokeCool:"#040814",smokeWarm:"#060810",smokeMoss:"#050810"},effects:vu},{name:"Blood Moon",description:"Crimson darkness — blood & shadow",colors:{...Be,bgPrimary:"#100606",bgSecondary:"#1a0a0a",bgTertiary:"#221010",bgHover:"#2e1616",bgActive:"#381c1a",textPrimary:"#d0b8b0",textSecondary:"#8a7068",textMuted:"#4e3a34",borderColor:"#361e1a",borderSubtle:"#241412",accentBlue:"#5a4a6a",accentGreen:"#3a4a2a",accentOrange:"#cc4420",accentPurple:"#6a2a4a",accentYellow:"#aa6a20",levelTrace:"#382828",levelDebug:"#3a3828",levelInfo:"#3a2a4a",levelWarn:"#8a4a18",levelError:"#aa2218",particleSparkCore:"#ff8866",particleSparkEmber:"#cc2210",particleSparkSteel:"#8a6666",particleEmberHot:"#ff6644",particleEmberBase:"#cc2210",particleBeamCenter:"#ffccbb",particleBeamEdge:"#cc5533",particleGlitterWarm:"#ffaa88",particleGlitterCool:"#cc88aa",cinderEmber:"#cc2210",cinderGold:"#aa4422",cinderAsh:"#4a3030",cinderVine:"#443828",smokeCool:"#080408",smokeWarm:"#120606",smokeMoss:"#0a0606"},effects:_u},{name:"Verdant",description:"Forest depths — moss & ancient growth",colors:{...Be,bgPrimary:"#060c06",bgSecondary:"#0a140a",bgTertiary:"#101c10",bgHover:"#182818",bgActive:"#1e321e",textPrimary:"#b4c8b0",textSecondary:"#6a8468",textMuted:"#3a4e38",borderColor:"#1e2e1e",borderSubtle:"#141e14",accentBlue:"#3a6a5a",accentGreen:"#2a6a28",accentOrange:"#8a6a28",accentPurple:"#4a4a5a",accentYellow:"#7a8a28",levelTrace:"#283828",levelDebug:"#2a5a2a",levelInfo:"#2a4a4a",levelWarn:"#6a6a20",levelError:"#6a3a18",particleSparkCore:"#bbff99",particleSparkEmber:"#44aa22",particleSparkSteel:"#88aa88",particleEmberHot:"#99dd66",particleEmberBase:"#44aa22",particleBeamCenter:"#ddffcc",particleBeamEdge:"#66aa44",particleGlitterWarm:"#aaffaa",particleGlitterCool:"#88ccaa",cinderEmber:"#44aa22",cinderGold:"#66aa44",cinderAsh:"#3a4a38",cinderVine:"#228822",smokeCool:"#040a04",smokeWarm:"#060c04",smokeMoss:"#050c06"},effects:bu},{name:"Void",description:"Cosmic abyss — deep purple & starlight",colors:{...Be,bgPrimary:"#06040e",bgSecondary:"#0c081a",bgTertiary:"#120e24",bgHover:"#1c1636",bgActive:"#241c42",textPrimary:"#c4bcd8",textSecondary:"#7a7090",textMuted:"#443e56",borderColor:"#241e34",borderSubtle:"#181428",accentBlue:"#5a60aa",accentGreen:"#3a6a5a",accentOrange:"#aa5a6a",accentPurple:"#7a3aaa",accentYellow:"#8a7a5a",levelTrace:"#2a2838",levelDebug:"#3a2a5a",levelInfo:"#2a3a6a",levelWarn:"#7a5a3a",levelError:"#7a2a3a",particleSparkCore:"#ccaaff",particleSparkEmber:"#8844cc",particleSparkSteel:"#9988bb",particleEmberHot:"#bb88ff",particleEmberBase:"#7733bb",particleBeamCenter:"#eeddff",particleBeamEdge:"#9966cc",particleGlitterWarm:"#ccbbff",particleGlitterCool:"#aabbee",cinderEmber:"#8844cc",cinderGold:"#7766aa",cinderAsh:"#3a3448",cinderVine:"#3a5a6a",smokeCool:"#040314",smokeWarm:"#0a050e",smokeMoss:"#06040c"},effects:yu},{name:"Amber Terminal",description:"Vintage phosphor — warm amber on black",colors:{...Be,bgPrimary:"#0c0a02",bgSecondary:"#141004",bgTertiary:"#1c1808",bgHover:"#26200e",bgActive:"#302814",textPrimary:"#d4a830",textSecondary:"#8a7020",textMuted:"#4a3c14",borderColor:"#2e2410",borderSubtle:"#1e1a0a",accentBlue:"#6a6a28",accentGreen:"#5a7a18",accentOrange:"#cc8820",accentPurple:"#7a6a28",accentYellow:"#bba020",levelTrace:"#2a2810",levelDebug:"#3a3a10",levelInfo:"#4a4018",levelWarn:"#8a6820",levelError:"#8a3a10",particleSparkCore:"#ffd066",particleSparkEmber:"#cc8818",particleSparkSteel:"#aa9944",particleEmberHot:"#eebb44",particleEmberBase:"#bb7710",particleBeamCenter:"#ffe8aa",particleBeamEdge:"#cc9930",particleGlitterWarm:"#ffdd88",particleGlitterCool:"#ccbb66",cinderEmber:"#cc8818",cinderGold:"#bba020",cinderAsh:"#4a4430",cinderVine:"#5a6a18",smokeCool:"#060400",smokeWarm:"#0e0a04",smokeMoss:"#0a0802"},effects:wu},{name:"Ocean Abyss",description:"Deep sea darkness — bioluminescent teal",colors:{...Be,bgPrimary:"#04080e",bgSecondary:"#061018",bgTertiary:"#0a1822",bgHover:"#10222e",bgActive:"#162c38",textPrimary:"#a8c8cc",textSecondary:"#5a8088",textMuted:"#344a50",borderColor:"#1a2a30",borderSubtle:"#101c22",accentBlue:"#2888aa",accentGreen:"#18886a",accentOrange:"#887040",accentPurple:"#4a5a8a",accentYellow:"#6a8a50",levelTrace:"#1a2a30",levelDebug:"#1a3a3a",levelInfo:"#1a4a5a",levelWarn:"#5a5a28",levelError:"#5a2a2a",particleSparkCore:"#88eeff",particleSparkEmber:"#2299aa",particleSparkSteel:"#6699aa",particleEmberHot:"#66ddcc",particleEmberBase:"#1a8888",particleBeamCenter:"#ccffee",particleBeamEdge:"#44aaaa",particleGlitterWarm:"#88eedd",particleGlitterCool:"#66bbcc",cinderEmber:"#2299aa",cinderGold:"#44aa88",cinderAsh:"#344848",cinderVine:"#1a6a5a",smokeCool:"#030812",smokeWarm:"#050a10",smokeMoss:"#040c0c"},effects:xu},{name:"Elysium (Default)",description:"Angelic light — marble walls, vine moss & clear sky",colors:{...We},effects:ku},{name:"Sakura",description:"Twilight garden — soft pink & mauve",colors:{...Be,bgPrimary:"#0e080e",bgSecondary:"#160c16",bgTertiary:"#1e1220",bgHover:"#281c2c",bgActive:"#322436",textPrimary:"#d0c0cc",textSecondary:"#887888",textMuted:"#4a3e4a",borderColor:"#2a2028",borderSubtle:"#1c161c",accentBlue:"#6a5a8a",accentGreen:"#5a7a68",accentOrange:"#bb6a5a",accentPurple:"#884a7a",accentYellow:"#aa8a5a",levelTrace:"#2a2228",levelDebug:"#3a2a3a",levelInfo:"#3a3a5a",levelWarn:"#8a5a3a",levelError:"#8a2a3a",particleSparkCore:"#ffbbcc",particleSparkEmber:"#cc5577",particleSparkSteel:"#aa88aa",particleEmberHot:"#ff99aa",particleEmberBase:"#bb4466",particleBeamCenter:"#ffdde6",particleBeamEdge:"#cc7799",particleGlitterWarm:"#ffccdd",particleGlitterCool:"#bbaacc",cinderEmber:"#cc5577",cinderGold:"#bb7788",cinderAsh:"#443a44",cinderVine:"#5a7a68",smokeCool:"#06040a",smokeWarm:"#0c060c",smokeMoss:"#0a060a"},effects:Su},{name:"Solarized Dark",description:"Ethan Schoonover classic — warm hues on midnight",colors:{...Be,bgPrimary:"#002b36",bgSecondary:"#073642",bgTertiary:"#0a3d4a",bgHover:"#104654",bgActive:"#164e5e",textPrimary:"#839496",textSecondary:"#657b83",textMuted:"#586e75",borderColor:"#0e404e",borderSubtle:"#073a46",accentBlue:"#268bd2",accentGreen:"#859900",accentOrange:"#cb4b16",accentPurple:"#6c71c4",accentYellow:"#b58900",levelTrace:"#073642",levelDebug:"#2a4a28",levelInfo:"#1a4a6a",levelWarn:"#6a5a18",levelError:"#8a2a18",particleSparkCore:"#fdf6e3",particleSparkEmber:"#cb4b16",particleSparkSteel:"#93a1a1",particleEmberHot:"#dc322f",particleEmberBase:"#cb4b16",particleBeamCenter:"#eee8d5",particleBeamEdge:"#b58900",particleGlitterWarm:"#fdf6e3",particleGlitterCool:"#93a1a1",cinderEmber:"#cb4b16",cinderGold:"#b58900",cinderAsh:"#586e75",cinderVine:"#859900",smokeCool:"#001820",smokeWarm:"#021a14",smokeMoss:"#011c1c"},effects:Eu},{name:"Solarized Light",description:"Ethan Schoonover classic — warm light parchment",colors:{...We,bgPrimary:"#fdf6e3",bgSecondary:"#eee8d5",bgTertiary:"#f5f0e0",bgHover:"#e6dfc8",bgActive:"#ddd6b8",textPrimary:"#586e75",textSecondary:"#657b83",textMuted:"#93a1a1",borderColor:"#d3c9a8",borderSubtle:"#e6dfc8",accentBlue:"#268bd2",accentGreen:"#859900",accentOrange:"#cb4b16",accentPurple:"#6c71c4",accentYellow:"#b58900",levelTrace:"#eee8d5",levelDebug:"#c8d8a8",levelInfo:"#b8d4e8",levelWarn:"#e8d098",levelError:"#e0a8a0",particleSparkCore:"#fdf6e3",particleSparkEmber:"#cb4b16",particleSparkSteel:"#839496",particleEmberHot:"#dc322f",particleEmberBase:"#cb4b16",particleBeamCenter:"#ffffff",particleBeamEdge:"#b58900",particleGlitterWarm:"#fdf6e3",particleGlitterCool:"#93a1a1",cinderEmber:"#cb4b16",cinderGold:"#b58900",cinderAsh:"#93a1a1",cinderVine:"#859900",smokeCool:"#c8d8e8",smokeWarm:"#e8dcc0",smokeMoss:"#d8e0c8"},effects:Cu},{name:"High Contrast",description:"Maximum readability — pure black & vivid colors",colors:{...Be,bgPrimary:"#000000",bgSecondary:"#0a0a0a",bgTertiary:"#141414",bgHover:"#1e1e1e",bgActive:"#282828",textPrimary:"#ffffff",textSecondary:"#cccccc",textMuted:"#888888",borderColor:"#444444",borderSubtle:"#222222",accentBlue:"#44bbff",accentGreen:"#44ff44",accentOrange:"#ff8844",accentPurple:"#cc66ff",accentYellow:"#ffdd00",levelTrace:"#1a1a1a",levelDebug:"#003300",levelInfo:"#002244",levelWarn:"#443300",levelError:"#440000",particleSparkCore:"#ffffff",particleSparkEmber:"#ff6600",particleSparkSteel:"#aaaaaa",particleEmberHot:"#ff4400",particleEmberBase:"#cc3300",particleBeamCenter:"#ffffff",particleBeamEdge:"#ffdd00",particleGlitterWarm:"#ffee88",particleGlitterCool:"#88ddff",cinderEmber:"#ff6600",cinderGold:"#ffcc00",cinderAsh:"#666666",cinderVine:"#44ff44",smokeCool:"#000408",smokeWarm:"#080400",smokeMoss:"#040804"},effects:Tu},{name:"Copper Dusk",description:"Warm desert sunset — terracotta & bronze",colors:{...Be,bgPrimary:"#12090a",bgSecondary:"#1a0e0c",bgTertiary:"#221412",bgHover:"#2c1c18",bgActive:"#36241e",textPrimary:"#d4bcaa",textSecondary:"#9a8474",textMuted:"#5e4e42",borderColor:"#382a22",borderSubtle:"#241a14",accentBlue:"#6a8a8a",accentGreen:"#7a8a4a",accentOrange:"#cc7a40",accentPurple:"#8a5a6a",accentYellow:"#bba040",levelTrace:"#2a2018",levelDebug:"#3a3820",levelInfo:"#3a4a4a",levelWarn:"#8a6a28",levelError:"#8a3828",particleSparkCore:"#ffe0b8",particleSparkEmber:"#cc6a30",particleSparkSteel:"#aa9888",particleEmberHot:"#ee8844",particleEmberBase:"#bb5520",particleBeamCenter:"#fff0d8",particleBeamEdge:"#cc8840",particleGlitterWarm:"#ffddaa",particleGlitterCool:"#ccaa88",cinderEmber:"#cc6a30",cinderGold:"#bba040",cinderAsh:"#544a40",cinderVine:"#6a7a3a",smokeCool:"#060406",smokeWarm:"#0c0604",smokeMoss:"#080604"},effects:Au},{name:"Arctic",description:"Bright ice — clean whites & glacier blue",colors:{...We,bgPrimary:"#f0f4f8",bgSecondary:"#e4eaf0",bgTertiary:"#f5f8fb",bgHover:"#d4dce6",bgActive:"#c4d0dc",textPrimary:"#1a2a3a",textSecondary:"#3a5060",textMuted:"#6a8090",borderColor:"#c0d0dc",borderSubtle:"#dce4ec",accentBlue:"#2a7acc",accentGreen:"#2a8a5a",accentOrange:"#cc6a2a",accentPurple:"#6a4aaa",accentYellow:"#aa8a20",levelTrace:"#e0e6ec",levelDebug:"#c0dcc8",levelInfo:"#b8d4ec",levelWarn:"#e8d8a8",levelError:"#e0a8a0",particleSparkCore:"#e8f4ff",particleSparkEmber:"#4a9add",particleSparkSteel:"#a0b8cc",particleEmberHot:"#88ccee",particleEmberBase:"#3a88cc",particleBeamCenter:"#ffffff",particleBeamEdge:"#88bbee",particleGlitterWarm:"#e0f0ff",particleGlitterCool:"#a0c8ee",cinderEmber:"#4a8acc",cinderGold:"#6aaacc",cinderAsh:"#a0b4c0",cinderVine:"#2a8a5a",smokeCool:"#b0c8e0",smokeWarm:"#c8d8ec",smokeMoss:"#d8e4f0"},effects:Pu},{name:"Neon Noir",description:"Cyberpunk glow — neon pink & electric blue on black",colors:{...Be,bgPrimary:"#08060c",bgSecondary:"#0e0a14",bgTertiary:"#14101c",bgHover:"#1c162a",bgActive:"#241c34",textPrimary:"#d0c8e0",textSecondary:"#8878a0",textMuted:"#504668",borderColor:"#2a2040",borderSubtle:"#1a1428",accentBlue:"#00ccff",accentGreen:"#00ff88",accentOrange:"#ff6644",accentPurple:"#cc44ff",accentYellow:"#ffee00",levelTrace:"#1a1828",levelDebug:"#1a2a4a",levelInfo:"#1a3a5a",levelWarn:"#5a4a18",levelError:"#6a1a2a",particleSparkCore:"#ff88cc",particleSparkEmber:"#cc22ff",particleSparkSteel:"#8888cc",particleEmberHot:"#ff44aa",particleEmberBase:"#aa00ee",particleBeamCenter:"#eeccff",particleBeamEdge:"#8844ff",particleGlitterWarm:"#ff88ff",particleGlitterCool:"#44ccff",cinderEmber:"#cc22ff",cinderGold:"#ff44aa",cinderAsh:"#3a3050",cinderVine:"#00cc88",smokeCool:"#040210",smokeWarm:"#0a0408",smokeMoss:"#06020c"},effects:Fu},{name:"Parchment",description:"Old paper — warm sepia & ink on aged vellum",colors:{...We,bgPrimary:"#f4ece0",bgSecondary:"#ebe2d4",bgTertiary:"#f8f2e6",bgHover:"#e0d4c4",bgActive:"#d4c8b4",textPrimary:"#2a2218",textSecondary:"#5a4e40",textMuted:"#8a806e",borderColor:"#c8bca8",borderSubtle:"#ddd4c4",accentBlue:"#4a6a88",accentGreen:"#4a7a44",accentOrange:"#aa6a30",accentPurple:"#6a5080",accentYellow:"#9a8428",levelTrace:"#e8e0d4",levelDebug:"#c8d4b8",levelInfo:"#b8c8d8",levelWarn:"#dcc898",levelError:"#cc9a88",particleSparkCore:"#fff8e0",particleSparkEmber:"#aa7030",particleSparkSteel:"#b0a898",particleEmberHot:"#cc9040",particleEmberBase:"#996828",particleBeamCenter:"#fffaea",particleBeamEdge:"#ccaa60",particleGlitterWarm:"#ffe8c0",particleGlitterCool:"#d0ccc0",cinderEmber:"#aa7030",cinderGold:"#bba050",cinderAsh:"#a09888",cinderVine:"#5a8a48",smokeCool:"#c0b8a8",smokeWarm:"#d0c4a8",smokeMoss:"#c8c0a8"},effects:Mu},{name:"Emerald Night",description:"Matrix terminal — green phosphor on deep black",colors:{...Be,bgPrimary:"#040a04",bgSecondary:"#081208",bgTertiary:"#0c1a0c",bgHover:"#142214",bgActive:"#1a2c1a",textPrimary:"#40cc40",textSecondary:"#288828",textMuted:"#1a5a1a",borderColor:"#143014",borderSubtle:"#0c200c",accentBlue:"#44aa66",accentGreen:"#44dd44",accentOrange:"#88aa44",accentPurple:"#44aa88",accentYellow:"#88cc44",levelTrace:"#0c1a0c",levelDebug:"#1a3a1a",levelInfo:"#1a4a2a",levelWarn:"#4a4a18",levelError:"#4a1a18",particleSparkCore:"#88ff88",particleSparkEmber:"#22aa22",particleSparkSteel:"#44aa66",particleEmberHot:"#66ee66",particleEmberBase:"#1a8818",particleBeamCenter:"#ccffcc",particleBeamEdge:"#44cc44",particleGlitterWarm:"#88ff88",particleGlitterCool:"#44cc88",cinderEmber:"#22aa22",cinderGold:"#44cc44",cinderAsh:"#1a3a1a",cinderVine:"#22aa22",smokeCool:"#020804",smokeWarm:"#040a02",smokeMoss:"#030a04"},effects:Iu}],Du="log-viewer-theme",$a="log-viewer-effect-settings",Rr={glassOpacity:35,glassBlur:25,crtEnabled:!0,crtScanlinesH:20,crtScanlinesV:12,crtEdgeShadow:35,crtFlicker:12,crtLineWidth:50,crtColor:[100,80,60],smokeEnabled:!0,smokeIntensity:40,smokeSpeed:50,smokeWarmScale:100,smokeCoolScale:100,smokeMossScale:100,grainIntensity:20,grainCoarseness:40,grainSize:35,vignetteStrength:40,underglowStrength:25,sparkSpeed:70,sparksEnabled:!0,emberSpeed:70,embersEnabled:!0,beamSpeed:50,beamsEnabled:!0,glitterSpeed:60,glitterEnabled:!0,beamHeight:35,beamDrift:80,beamCount:48,sparkCount:40,sparkSize:70,emberCount:40,emberSize:70,glitterCount:40,glitterSize:60,cinderSize:70,cinderEnabled:!0};function $u(){try{const e=localStorage.getItem($a);if(e)return{...Rr,...JSON.parse(e)}}catch{}return{...Rr}}const St=Z($u());xt(()=>{try{localStorage.setItem($a,JSON.stringify(St.value))}catch{}});xt(()=>{const e=St.value,t=document.documentElement;if(!t.classList.contains("gpu-active"))return;const n=e.glassOpacity/100*.4,s=Math.round(e.glassBlur/100*16);t.style.setProperty("--bg-secondary",`rgba(20, 19, 17, ${n.toFixed(3)})`),t.style.setProperty("--bg-tertiary",`rgba(26, 24, 22, ${n.toFixed(3)})`),t.style.setProperty("--gpu-blur",`blur(${s}px)`)});function Lu(e,t){St.value={...St.value,[e]:t}}const qn=El(Du,We,!0),et=qn.colors;function Ru(e,t){qn.updateColor(e,t)}function zu(e){qn.applyPreset(e.colors),e.effects&&(St.value={...Rr,...e.effects})}function Nu(){qn.reset()}function H(e=0,t=1){const n=Math.random()*360,s=.4+Math.random()*.5,i=e+Math.random()*(t-e),a=(1-Math.abs(2*i-1))*s,l=a*(1-Math.abs(n/60%2-1)),o=i-a/2;let d,c,f;return n<60?(d=a,c=l,f=0):n<120?(d=l,c=a,f=0):n<180?(d=0,c=a,f=l):n<240?(d=0,c=l,f=a):n<300?(d=l,c=0,f=a):(d=a,c=0,f=l),Vr(d+o,c+o,f+o)}function Bu(){et.value={bgPrimary:H(.02,.08),bgSecondary:H(.05,.12),bgTertiary:H(.07,.14),bgHover:H(.08,.16),bgActive:H(.1,.18),textPrimary:H(.8,.95),textSecondary:H(.6,.78),textMuted:H(.4,.55),borderColor:H(.15,.28),borderSubtle:H(.1,.2),accentBlue:H(.35,.6),accentGreen:H(.35,.6),accentOrange:H(.4,.65),accentPurple:H(.35,.55),accentYellow:H(.45,.65),levelTrace:H(.3,.5),levelDebug:H(.3,.5),levelInfo:H(.4,.6),levelWarn:H(.45,.65),levelError:H(.4,.55),levelTraceText:H(.75,.95),levelDebugText:H(.75,.95),levelInfoText:H(.75,.95),levelWarnText:H(.75,.95),levelErrorText:H(.75,.95),spanEnterText:H(.7,.9),spanExitText:H(.7,.9),particleSparkCore:H(.7,.9),particleSparkEmber:H(.35,.55),particleSparkSteel:H(.4,.6),particleEmberHot:H(.55,.75),particleEmberBase:H(.3,.5),particleBeamCenter:H(.7,.9),particleBeamEdge:H(.4,.6),particleGlitterWarm:H(.6,.8),particleGlitterCool:H(.5,.7),cinderEmber:H(.3,.5),cinderGold:H(.35,.55),cinderAsh:H(.2,.35),cinderVine:H(.2,.4),smokeCool:H(.02,.06),smokeWarm:H(.02,.06),smokeMoss:H(.02,.06)}}const La="log-viewer-saved-themes";function Ou(){try{const e=localStorage.getItem(La);if(e)return JSON.parse(e)}catch{}return[]}function Kn(e){try{localStorage.setItem(La,JSON.stringify(e))}catch{}}const ut=Z(Ou());function Gu(e,t){const n={id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),name:e,colors:{...et.value},createdAt:Date.now(),thumbnail:t||void 0},s=[...ut.value,n];ut.value=s,Kn(s)}function Hu(e){const t=ut.value.filter(n=>n.id!==e);ut.value=t,Kn(t)}function Uu(e){et.value={...e.colors}}function Vu(e,t){const n=ut.value.map(s=>s.id===e?{...s,colors:{...et.value},thumbnail:t||s.thumbnail}:s);ut.value=n,Kn(n)}function Wu(e,t){const n=ut.value.map(s=>s.id===e?{...s,name:t}:s);ut.value=n,Kn(n)}function ju(e){const t=Da.find(l=>Object.keys(et.value).every(o=>et.value[o]===l.colors[o])),n={name:e||(t==null?void 0:t.name)||"Custom Theme",description:t==null?void 0:t.description,colors:{...et.value}},s=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),i=URL.createObjectURL(s),a=document.createElement("a");a.href=i,a.download=`${(n.name||"theme").toLowerCase().replace(/[^a-z0-9]+/g,"-")}.json`,a.click(),URL.revokeObjectURL(i)}function Yu(e){return!e||typeof e!="object"?!1:Object.keys(We).every(n=>{const s=e[n];return typeof s=="string"&&/^#[0-9a-fA-F]{6}$/.test(s)})}function qu(e){return new Promise(t=>{const n=new FileReader;n.onload=()=>{try{const s=n.result,i=JSON.parse(s);let a;if(i.colors&&typeof i.colors=="object")a={...We,...i.colors};else if(i.bgPrimary)a={...We,...i};else{t({ok:!1,error:"No valid color data found in file."});return}if(!Yu(a)){t({ok:!1,error:"Theme file contains invalid color values. Expected #rrggbb hex strings."});return}const l={name:i.name||e.name.replace(/\.json$/i,""),description:i.description,colors:a};t({ok:!0,theme:l})}catch{t({ok:!1,error:"Failed to parse JSON file."})}},n.onerror=()=>t({ok:!1,error:"Failed to read file."}),n.readAsText(e)})}async function Ku(e){const t=await qu(e);return t.ok?(et.value={...t.theme.colors},null):t.error}function Xu(){return r(vc,{store:{themeColors:et,effectSettings:St,presets:Da,defaultTheme:We,updateColor:Ru,applyPreset:zu,resetTheme:Nu,randomizeTheme:Bu,savedThemes:ut,saveTheme:Gu,deleteTheme:Hu,applySavedTheme:Uu,updateSavedTheme:Vu,renameSavedTheme:Wu,updateEffect:Lu,exportTheme:ju,importTheme:Ku}})}const Ra=[".header",".sidebar",".tab-bar",".filter-panel",".view-container",".log-list",".code-viewer",".log-entry.level-error",".log-entry.level-warn",".log-entry.level-info",".log-entry.level-debug",".log-entry.level-trace",".log-entry.span-highlighted",".log-entry.selected",".log-entry.panic-entry",".effect-preview-sparks",".effect-preview-embers",".effect-preview-beams",".effect-preview-glitter"],pi=0,Zu=1,Ju=2,Qu=3,fi=4,ep=5,tp=6,np=7,rp=8,sp=9,ip=10,ap=11;function lp(e){return e<8?pi:e===8?Zu:e===9?Ju:e===10?Qu:e===11||e===12?fi:e===13?ep:e===14?tp:e===15?np:e===16?rp:e===17?sp:e===18?ip:e===19?ap:pi}const zr=new Set([13,14,15,16,17,18,19]);(()=>{const e=[];for(const t of zr)e.push(t);for(let t=0;t<Ra.length;t++)zr.has(t)||e.push(t);return e})();const op={logs:0,code:1,debug:2,scene3d:3,hypergraph:4,settings:5},cp=Ra.map((e,t)=>({sel:e,hue:t<16?t/16:.5,kind:lp(t),priority:zr.has(t)})),dp={selectors:cp,effectSettings:St,themeColors:et,getCurrentViewId:()=>op[Ge.value]??0,isActive3DView:()=>Ge.value==="scene3d"||Ge.value==="hypergraph"};function up(){ad();const e=Sa("content"),[,t]=V(!1);ge(()=>{(async()=>{await ma();const a=Vc();a&&(await hn(a.file),wt(a.tab)),Wc()})()},[]);const n=ae(()=>{t(a=>!a)},[]),s=ae(()=>{t(!1)},[]),i=()=>{switch(Ge.value){case"logs":return r(Ad,{});case"hypergraph":return r(ui,{});case"debug":return r(Md,{});case"scene3d":return r(Vd,{});case"settings":return r(Xu,{});default:return r(ui,{})}};return r("div",{class:"app",children:[r(po,{schema:dp}),r(Qc,{onMenuToggle:n}),r(Jc,{}),r("div",{class:"main-layout",children:[r(vs,{placement:"left",class:"log-files-panel",initialSize:280,minSize:180,children:[r("div",{class:"panel-header",children:[r("h2",{class:"panel-title",children:"Log Files"}),r("span",{class:"panel-badge",children:Bn.value.length})]}),r("div",{class:"panel-body",children:r(sd,{onFileSelect:s})})]}),r("main",{class:"content",children:r("div",{class:"center-pane",children:[r(od,{}),r("div",{class:`view-container ${dt.value==="content"?"focused":""}`,ref:a=>{e.current=a},tabIndex:-1,children:i()})]})}),r(vs,{placement:"right",class:"code-viewer-panel",initialSize:320,children:r(Fd,{})})]})]})}Wa(r(up,{}),document.getElementById("app"));
