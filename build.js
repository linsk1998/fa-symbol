
if(!('last' in Array.prototype)){
	Object.defineProperty(Array.prototype,'last',{
		configurable:true, enumerable:true,
		get:function(){
			return this[this.length-1];
		}
	})
}
const fs=require('fs');
var xml = fs.readFileSync("./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg", 'utf8');
 
var camelCase = require("camel-case").camelCase;
var convert = require('xml-js');
var options = { alwaysChildren: true};
var result = convert.xml2js(xml, options); // or convert.xml2json(xml, options)

var fontElements=result.elements.last.elements.last.elements[0].elements;
var nodes=[];
var esms=[];
var dtss=['declare module "fontawesome5-solid" {'];
fontElements.forEach(function(ele){
	if(ele.type==='element' && ele.name==='glyph'){
		nodes.push("exports."+camelCase(ele.attributes['glyph-name'])+'="'+ele.attributes['unicode']+'";');
		esms.push("export var "+camelCase(ele.attributes['glyph-name'])+'="'+ele.attributes['unicode']+'";');
		dtss.push("export var "+camelCase(ele.attributes['glyph-name'])+':string;');
	}
});
dtss.push("}");
fs.writeFileSync("./index.js",nodes.join("\n"));
fs.writeFileSync("./index.mjs",esms.join("\n"));
fs.writeFileSync("./index.d.ts",dtss.join("\n"));