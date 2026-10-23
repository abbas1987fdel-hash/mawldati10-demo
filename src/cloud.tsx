import React,{createContext,useContext,useEffect,useState} from 'react';
import {createDemoData} from './demoData';
import type {GeneratorData} from './data';
type Change=<K extends keyof GeneratorData>(key:K,value:React.SetStateAction<GeneratorData[K]>)=>void;
const Context=createContext<{data:GeneratorData;change:Change;update:(fn:(data:GeneratorData)=>GeneratorData)=>void}|null>(null);
export function useGeneratorData(){const value=useContext(Context);if(!value)throw new Error('Missing demo provider');return value;}
export function DemoProvider({children}:{children:React.ReactNode}){
 const [data,setData]=useState(createDemoData);
 const [generation,setGeneration]=useState(0);
 const reset=()=>{setData(createDemoData());setGeneration(v=>v+1);};
 useEffect(()=>{
   // Discard data when leaving, including browser back/forward-cache restores.
   const leave=()=>{setData(createDemoData());setGeneration(v=>v+1);};
   const restore=(event:PageTransitionEvent)=>{if(event.persisted)leave();};
   window.addEventListener('pagehide',leave);window.addEventListener('pageshow',restore);
   return()=>{window.removeEventListener('pagehide',leave);window.removeEventListener('pageshow',restore);};
 },[]);
 const update=(fn:(data:GeneratorData)=>GeneratorData)=>setData(previous=>fn(previous));
 const change:Change=(key,value)=>setData(previous=>({...previous,[key]:typeof value==='function'?(value as Function)(previous[key]):value}));
 return <Context.Provider value={{data,change,update}}><aside dir="rtl" role="note" className="bg-amber-300 text-slate-950 text-center p-3 text-sm font-bold"><p>مولدتي 10 — نظام تجريبي بدون حفظ سحابي</p><p className="text-xs mt-1">بيانات وهمية للتجربة فقط. لا تُحفظ التعديلات، وتُحذف عند إعادة تحميل الصفحة أو مغادرتها. غير مخصص للعمل الفعلي.</p><button type="button" onClick={reset} className="underline mt-2">إنهاء التجربة ومسح التعديلات</button></aside><React.Fragment key={generation}>{children}</React.Fragment></Context.Provider>;
}
