import {build} from 'esbuild';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const result=await build({stdin:{contents:`import React from 'react';import {renderToStaticMarkup} from 'react-dom/server';import {CollectibleArt} from './src/components/CollectibleArt';import {COLLECTIBLES} from './src/data/collectibles';export const images=COLLECTIBLES.map(item=>({id:item.id,svg:renderToStaticMarkup(React.createElement(CollectibleArt,{item}))}));`,resolveDir:process.cwd()},bundle:true,write:false,format:'cjs',platform:'node',jsx:'automatic'});
const compiled={exports:{}};new Function('require','module','exports',result.outputFiles[0].text)(createRequire(import.meta.url),compiled,compiled.exports);const {images}=compiled.exports;
for(const art of images)assert.ok((art.svg.match(/<(path|circle|ellipse|rect|text)\b/g)||[]).length>=2,art.id+' has custom artwork');
const normalized=images.map(a=>a.svg.replace(/aria-label="[^"]*"/g,''));assert.equal(new Set(normalized).size,58,'each visual is unique');
console.log('All 58 collectibles render nonempty, unique SVG artwork.');

