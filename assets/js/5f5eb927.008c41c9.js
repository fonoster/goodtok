"use strict";(self.webpackChunkroutr_docs=self.webpackChunkroutr_docs||[]).push([[6],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>f});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=o.createContext({}),c=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},d=function(e){var t=c(e.components);return o.createElement(s.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),p=c(n),m=r,f=p["".concat(s,".").concat(m)]||p[m]||u[m]||i;return n?o.createElement(f,a(a({ref:t},d),{},{components:n})):o.createElement(f,a({ref:t},d))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:r,a[1]=l;for(var c=2;c<i;c++)a[c]=n[c];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3001:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var o=n(7462),r=(n(7294),n(3905));const i={},a="Installation",l={unversionedId:"video-widget/installation",id:"video-widget/installation",title:"Installation",description:"In the website where you want to integrate Goodtok, you will need to add the following script tag:",source:"@site/docs/video-widget/installation.md",sourceDirName:"video-widget",slug:"/video-widget/installation",permalink:"/docs/video-widget/installation",draft:!1,editUrl:"https://github.com/fonoster/goodtok/edit/main/docs/docs/video-widget/installation.md",tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Introduction",permalink:"/docs/video-widget/introduction"},next:{title:"Customer Tokens",permalink:"/docs/video-widget/customer-tokens"}},s={},c=[],d={toc:c},p="wrapper";function u(e){let{components:t,...n}=e;return(0,r.kt)(p,(0,o.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"installation"},"Installation"),(0,r.kt)("p",null,"In the website where you want to integrate Goodtok, you will need to add the following script tag:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'\x3c!-- Goodtok video client --\x3e\n<script\n  type="module"\n  src="https://unpkg.com/@goodtok/widget?key=eyJndGlkIjoiZy00ZjkwZDEzYTQyIiwic2VydmVyIjoiaHR0cHM6Ly9hcGkuZ29vZHRvay5pby92MSJ9&token=OPTIONAL_CUSTOMER_TOKEN"\n>\n<\/script>\n\x3c!-- Goodtok video client end --\x3e\n')),(0,r.kt)("p",null,"Were the key is a ",(0,r.kt)("inlineCode",{parentName:"p"},"base64")," encoded value containing the Workspace GTID and server of your Goodtok instance. You can generate this value by running the following command:"),(0,r.kt)("p",null,"Use the following command to generate the key:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'echo -n \'{"gtid":"g-7b7c46fb05","server":"http://localhost:6789/v1"}\' | base64\n')),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"gtid")," property corresponds to the Workspace id in the Goodtok dashboard."),(0,r.kt)("p",null,"If no server is specified, the client will default to ",(0,r.kt)("inlineCode",{parentName:"p"},"https://api.goodtok.io/v1.")),(0,r.kt)("p",null,"When no Customer token is provided, the video widget will show a form, requesting the user to enter their name, email and a message. The video widget will then request an anonymous token from the server. When possible we recommend you to provide a Customer token to the video widget to avoid the form."),(0,r.kt)("p",null,"To learn more about Customer tokens, see the ",(0,r.kt)("a",{parentName:"p",href:"#customer-tokens"},"Customer tokens")," section."))}u.isMDXComponent=!0}}]);