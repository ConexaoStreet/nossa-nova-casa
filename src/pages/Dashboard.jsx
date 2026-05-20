import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Home, ShoppingBag, Wallet, Lightbulb, Heart, LogOut, Trash2 } from 'lucide-react'
import HomeSection from '../components/sections/Home'
import Enxoval from '../components/sections/Enxoval'
import Tarefas from '../components/sections/Tarefas'

const INITIAL = {
  enxoval: [
    { id: 1, nome: 'Jogo de pratos', categoria: 'Cozinha', prioridade: 'Alta', preco: 89.9, comprado: false },
    { id: 2, nome: 'Toalhas de banho', categoria: 'Banheiro', prioridade: 'Alta', preco: 69.9, comprado: false },
    { id: 3, nome: 'Cabides', categoria: 'Quarto', prioridade: 'Média', preco: 29.9, comprado: false },
    { id: 4, nome: 'Balde e vassoura', categoria: 'Limpeza', prioridade: 'Alta', preco: 49.9, comprado: false }
  ],
  metas: { total: 4000, juntado: 900, historico: [] },
  ideias: [], tarefas: [], galeria: [], casal: { inicio: '2021-04-17', promessa: '', sonhos: '', morarJunto: '' }
}

const tabs = [
  { id: 'inicio', label: 'Início', icon: Home }, { id: 'enxoval', label: 'Enxoval', icon: ShoppingBag },
  { id: 'metas', label: 'Metas', icon: Wallet }, { id: 'ideias', label: 'Ideias', icon: Lightbulb }, { id: 'casal', label: 'Casal', icon: Heart }
]

export default function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('inicio')
  const [data, setData] = useState(() => JSON.parse(localStorage.getItem('nossaCasaData') || 'null') || INITIAL)
  const updateData = (k, v) => setData((p) => { const n = { ...p, [k]: v }; localStorage.setItem('nossaCasaData', JSON.stringify(n)); return n })
  const resetAll = () => { if (window.confirm('Tem certeza que deseja resetar tudo?')) { setData(INITIAL); localStorage.setItem('nossaCasaData', JSON.stringify(INITIAL)) } }
  const clearAll = () => { if (window.confirm('Tem certeza que deseja limpar todos os dados?')) { localStorage.removeItem('nossaCasaData'); setData(INITIAL) } }

  const diasJuntos = useMemo(() => Math.floor((Date.now() - new Date(data.casal.inicio).getTime()) / 86400000), [data.casal.inicio])

  const Financial = () => {
    const falta = Math.max(0, data.metas.total - data.metas.juntado)
    const pct = data.metas.total ? Math.min(100, Math.round((data.metas.juntado / data.metas.total) * 100)) : 0
    const addMov = (tipo) => {
      const valor = Number(prompt(`Valor para ${tipo}:`)); if (!valor || valor <= 0) return
      const juntado = tipo === 'economia' ? data.metas.juntado + valor : Math.max(0, data.metas.juntado - valor)
      updateData('metas', { ...data.metas, juntado, historico: [{ id: Date.now(), tipo, valor }, ...data.metas.historico] })
    }
    return <div className="space-y-4"> <div className="glass rounded-2xl p-6 border border-purple-light/20"><p>Meta total: R$ {data.metas.total}</p><p>Valor juntado: R$ {data.metas.juntado}</p><p>Falta: R$ {falta}</p><div className="w-full h-3 bg-black/40 rounded-full mt-2"><motion.div className="h-3 rounded-full bg-gradient-to-r from-purple-accent to-purple-light" animate={{ width: `${pct}%` }} /></div></div><div className="flex gap-2"><button className="px-4 py-2 rounded bg-purple-accent" onClick={() => addMov('economia')}>Adicionar economia</button><button className="px-4 py-2 rounded bg-purple-light text-black" onClick={() => addMov('gasto')}>Adicionar gasto</button><button className="px-4 py-2 rounded border border-purple-light" onClick={() => { const v = Number(prompt('Nova meta total:')); if (v > 0) updateData('metas', { ...data.metas, total: v }) }}>Editar meta</button></div></div>
  }

  const Ideas = () => {
    const add = () => { const t = prompt('Nova ideia:'); if (t) updateData('ideias', [...data.ideias, { id: Date.now(), texto: t, categoria: 'decoração' }]) }
    return <div><button onClick={add} className="mb-3 px-4 py-2 rounded bg-purple-accent">Adicionar ideia</button><div className="grid gap-3">{data.ideias.map(i => <div key={i.id} className="glass p-4 rounded-xl border border-purple-light/20 flex justify-between"><span>{i.texto}</span><button onClick={() => updateData('ideias', data.ideias.filter(x => x.id !== i.id))}>Excluir</button></div>)}</div></div>
  }

  const Couple = () => <div className="space-y-4"><div className="glass rounded-2xl p-5 border border-purple-light/20">Dias juntos: <strong>{diasJuntos}</strong></div><textarea className="w-full p-3 rounded bg-black/30" placeholder="Promessa" value={data.casal.promessa} onChange={(e) => updateData('casal', { ...data.casal, promessa: e.target.value })} /><textarea className="w-full p-3 rounded bg-black/30" placeholder="Nossos sonhos" value={data.casal.sonhos} onChange={(e) => updateData('casal', { ...data.casal, sonhos: e.target.value })} /><textarea className="w-full p-3 rounded bg-black/30" placeholder="Quando a gente morar junto..." value={data.casal.morarJunto} onChange={(e) => updateData('casal', { ...data.casal, morarJunto: e.target.value })} /></div>

  return (
    <div className="min-h-screen pb-24 px-4 md:px-8">
      <header className="max-w-6xl mx-auto py-5 flex justify-between items-center"><div><h1 className="text-2xl font-display text-purple-neon">Nossa Nova Casa</h1><p className="text-purple-light/70">Lupyta & Vítor • Coremas PB</p></div><button onClick={onLogout} className="text-purple-light"><LogOut /></button></header>
      <main className="max-w-6xl mx-auto">
        {activeTab === 'inicio' && <><HomeSection data={data} /><Tarefas data={data} updateData={updateData} /></>}
        {activeTab === 'enxoval' && <Enxoval data={data} updateData={updateData} />}
        {activeTab === 'metas' && <Financial />}
        {activeTab === 'ideias' && <Ideas />}
        {activeTab === 'casal' && <Couple />}
        <section className="mt-8 glass rounded-2xl p-5 border border-purple-light/20"><h3 className="mb-2">Dados</h3><div className="flex flex-wrap gap-2"><button onClick={() => {const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='nossa-nova-casa.json'; a.click()}} className="px-3 py-2 rounded bg-purple-accent">Exportar JSON</button><label className="px-3 py-2 rounded bg-purple-light text-black cursor-pointer">Importar JSON<input type="file" accept="application/json" className="hidden" onChange={(e)=>{const f=e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=()=>{ try{ const parsed=JSON.parse(String(r.result)); setData(parsed); localStorage.setItem('nossaCasaData', JSON.stringify(parsed)) } catch { alert('JSON inválido') } }; r.readAsText(f)}}/></label><button onClick={resetAll} className="px-3 py-2 rounded border border-purple-light">Resetar inicial</button><button onClick={clearAll} className="px-3 py-2 rounded bg-red-500/80 flex items-center gap-1"><Trash2 size={16}/>Limpar dados</button></div></section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 glass border-t border-purple-light/20 md:hidden"><div className="grid grid-cols-5">{tabs.map(t => { const Icon=t.icon; return <button key={t.id} onClick={()=>setActiveTab(t.id)} className={`py-3 text-xs flex flex-col items-center ${activeTab===t.id?'text-purple-neon':'text-purple-light/60'}`}><Icon size={18}/>{t.label}</button>})}</div></nav>
      <div className="hidden md:flex gap-2 justify-center mt-6">{tabs.map(t => <button key={t.id} onClick={() => setActiveTab(t.id)} className={`px-4 py-2 rounded-full ${activeTab===t.id?'bg-purple-accent':'glass border border-purple-light/20'}`}>{t.label}</button>)}</div>
    </div>
  )
}
