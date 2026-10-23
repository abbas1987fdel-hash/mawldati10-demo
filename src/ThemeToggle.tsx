import {useLayoutEffect,useState} from 'react';
import {Sun,Moon} from 'lucide-react';

export function ThemeToggle(){
  const [light,setLight]=useState(false);
  useLayoutEffect(()=>{
    document.documentElement.dataset.theme=light?'light':'dark';
    document.documentElement.style.colorScheme=light?'light':'dark';

  },[light]);
  return <button type="button" aria-label={light?'تفعيل الوضع الليلي':'تفعيل الوضع النهاري'} aria-pressed={light} onClick={()=>setLight(value=>!value)} className="flex items-center gap-2 rounded-xl bg-slate-800 text-slate-100 px-4 py-2 font-bold text-sm">
    {light?<Moon size={20}/>:<Sun size={20}/>}<span>{light?'ليلي':'نهاري'}</span>
  </button>;
}

