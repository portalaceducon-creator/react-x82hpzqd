import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { createRoot } from 'react-dom/client';

const SUPABASE_URL = 'https://efjehnvnhnwamyccevkj.supabase.co';
const SUPABASE_KEY = 'sb_publishable_qkNPJ8KZ8_NZcNC-Tu6phA_smsV5H9M';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const GRAMMAR_TOPICS = [
  { id:"g1",  cat:"Verb Tenses", name:"Simple Present" },
  { id:"g2",  cat:"Verb Tenses", name:"Present Continuous" },
  { id:"g3",  cat:"Verb Tenses", name:"Present Perfect" },
  { id:"g4",  cat:"Verb Tenses", name:"Present Perfect Continuous" },
  { id:"g5",  cat:"Verb Tenses", name:"Simple Past" },
  { id:"g6",  cat:"Verb Tenses", name:"Past Continuous" },
  { id:"g7",  cat:"Verb Tenses", name:"Past Perfect" },
  { id:"g8",  cat:"Verb Tenses", name:"Past Perfect Continuous" },
  { id:"g9",  cat:"Verb Tenses", name:"Simple Future (will)" },
  { id:"g10", cat:"Verb Tenses", name:"Be Going To" },
  { id:"g11", cat:"Verb Tenses", name:"Future Continuous" },
  { id:"g12", cat:"Verb Tenses", name:"Future Perfect" },
  { id:"g13", cat:"Verb Tenses", name:"Future Perfect Continuous" },
  { id:"g14", cat:"Modal Verbs", name:"Can / Cannot" },
  { id:"g15", cat:"Modal Verbs", name:"Could / Couldn't" },
  { id:"g16", cat:"Modal Verbs", name:"May / May Not" },
  { id:"g17", cat:"Modal Verbs", name:"Might / Might Not" },
  { id:"g18", cat:"Modal Verbs", name:"Must / Must Not" },
  { id:"g19", cat:"Modal Verbs", name:"Have To / Don't Have To" },
  { id:"g20", cat:"Modal Verbs", name:"Should / Shouldn't" },
  { id:"g21", cat:"Modal Verbs", name:"Ought To" },
  { id:"g22", cat:"Modal Verbs", name:"Would / Wouldn't" },
  { id:"g23", cat:"Modal Verbs", name:"Shall" },
  { id:"g24", cat:"Modal Verbs", name:"Need To / Needn't" },
  { id:"g25", cat:"Modal Verbs", name:"Used To / Would (past habits)" },
  { id:"g26", cat:"Articles", name:"Definite Article (The)" },
  { id:"g27", cat:"Articles", name:"Indefinite Articles (A / An)" },
  { id:"g28", cat:"Articles", name:"Zero Article" },
  { id:"g29", cat:"Articles", name:"Quantifiers (some, any, much, many)" },
  { id:"g30", cat:"Articles", name:"Demonstratives (this, that, these, those)" },
  { id:"g31", cat:"Nouns", name:"Countable & Uncountable Nouns" },
  { id:"g32", cat:"Nouns", name:"Plural Forms" },
  { id:"g33", cat:"Nouns", name:"Compound Nouns" },
  { id:"g34", cat:"Nouns", name:"Possessive 's" },
  { id:"g35", cat:"Nouns", name:"Collective Nouns" },
  { id:"g36", cat:"Pronouns", name:"Personal Pronouns" },
  { id:"g37", cat:"Pronouns", name:"Possessive Pronouns" },
  { id:"g38", cat:"Pronouns", name:"Reflexive Pronouns" },
  { id:"g39", cat:"Pronouns", name:"Relative Pronouns" },
  { id:"g40", cat:"Pronouns", name:"Indefinite Pronouns" },
  { id:"g41", cat:"Adjectives", name:"Descriptive Adjectives" },
  { id:"g42", cat:"Adjectives", name:"Comparative Adjectives" },
  { id:"g43", cat:"Adjectives", name:"Superlative Adjectives" },
  { id:"g44", cat:"Adjectives", name:"Order of Adjectives" },
  { id:"g45", cat:"Adjectives", name:"Participial Adjectives" },
  { id:"g46", cat:"Adverbs", name:"Adverbs of Frequency" },
  { id:"g47", cat:"Adverbs", name:"Adverbs of Manner" },
  { id:"g48", cat:"Adverbs", name:"Adverbs of Time" },
  { id:"g49", cat:"Adverbs", name:"Adverbs of Place" },
  { id:"g50", cat:"Adverbs", name:"Adverbs of Degree" },
  { id:"g51", cat:"Prepositions", name:"Prepositions of Time" },
  { id:"g52", cat:"Prepositions", name:"Prepositions of Place" },
  { id:"g53", cat:"Prepositions", name:"Prepositions of Movement" },
  { id:"g54", cat:"Prepositions", name:"Dependent Prepositions" },
  { id:"g55", cat:"Phrasal Verbs", name:"Phrasal Verbs – Basic" },
  { id:"g56", cat:"Phrasal Verbs", name:"Phrasal Verbs – Intermediate" },
  { id:"g57", cat:"Phrasal Verbs", name:"Phrasal Verbs – Advanced" },
  { id:"g58", cat:"Sentence Structure", name:"Word Order" },
  { id:"g59", cat:"Sentence Structure", name:"Questions (Yes/No & Wh-)" },
  { id:"g60", cat:"Sentence Structure", name:"Negative Sentences" },
  { id:"g61", cat:"Sentence Structure", name:"Question Tags" },
  { id:"g62", cat:"Conditionals", name:"Zero Conditional" },
  { id:"g63", cat:"Conditionals", name:"First Conditional" },
  { id:"g64", cat:"Conditionals", name:"Second Conditional" },
  { id:"g65", cat:"Conditionals", name:"Third Conditional" },
  { id:"g66", cat:"Conditionals", name:"Mixed Conditionals" },
  { id:"g67", cat:"Passive Voice", name:"Passive – Present Tenses" },
  { id:"g68", cat:"Passive Voice", name:"Passive – Past Tenses" },
  { id:"g69", cat:"Passive Voice", name:"Passive – Future & Modal" },
  { id:"g70", cat:"Passive Voice", name:"Causative (Have / Get sth done)" },
  { id:"g71", cat:"Reported Speech", name:"Reported Statements" },
  { id:"g72", cat:"Reported Speech", name:"Reported Questions" },
  { id:"g73", cat:"Reported Speech", name:"Tense Backshift" },
  { id:"g74", cat:"Reported Speech", name:"Reporting Verbs" },
  { id:"g75", cat:"Infinitives & Gerunds", name:"Verb + Infinitive" },
  { id:"g76", cat:"Infinitives & Gerunds", name:"Verb + Gerund" },
  { id:"g77", cat:"Infinitives & Gerunds", name:"Infinitive of Purpose" },
  { id:"g78", cat:"Advanced Grammar", name:"Inversion" },
  { id:"g79", cat:"Advanced Grammar", name:"Cleft Sentences" },
  { id:"g80", cat:"Advanced Grammar", name:"Subjunctive Mood" },
  { id:"g81", cat:"Advanced Grammar", name:"Wish / If Only" },
  { id:"g82", cat:"Discourse", name:"Discourse Markers" },
  { id:"g83", cat:"Discourse", name:"Register & Formality" },
  { id:"g84", cat:"Discourse", name:"Hedging Language" },
];

const SKILL_SUBS = {
  speaking: ["Fluência","Pronúncia","Vocabulário","Gramática"],
  reading:  ["Compreensão","Velocidade","Vocabulário","Inferência"],
  listening:["Compreensão","Sotaques","Anotações"],
  writing:  ["Estrutura","Gramática","Vocabulário","Coerência"],
};

const SKILL_COLOR = { speaking:"#3b82f6", reading:"#16a34a", listening:"#f59e0b", writing:"#8b5cf6" };
const SKILL_ICON  = { speaking:"🗣️", reading:"📖", listening:"🎧", writing:"✍️" };
const MONTHS = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
const MFULL  = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const WDAYS  = ["D","S","T","Q","Q","S","S"];
const WFULL  = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
const LEVELS = ["Absolute Beginner","Beginner","Elementary","Pre-Intermediate","Intermediate","Upper-Intermediate","Advanced","Proficiency"];
const LESSON_STATUS = {
  attended:          { label:"Realizada",    color:"#16a34a", bg:"#dcfce7", icon:"✅" },
  cancelled_student: { label:"Aluno cancelou", color:"#d97706", bg:"#fef3c7", icon:"🔶" },
  cancelled_late:    { label:"Cancelou <24h", color:"#ef4444", bg:"#fee2e2", icon:"⚡" },
  cancelled_teacher: { label:"Prof. cancelou", color:"#7c3aed", bg:"#ede9fe", icon:"📌" },
  no_show:           { label:"Não apareceu", color:"#ef4444", bg:"#fee2e2", icon:"👻" },
};
const TASK_STATUS = {
  done:     { label:"Feitas",       color:"#16a34a", icon:"✅" },
  partial:  { label:"Parcialmente", color:"#d97706", icon:"🔄" },
  not_done: { label:"Não fez",      color:"#ef4444", icon:"❌" },
  none:     { label:"Sem tarefa",   color:"#94a3b8", icon:"—" },
};

const pad = n => String(n).padStart(2,"0");
const dateStr = (y,m,d) => `${y}-${pad(m+1)}-${pad(d)}`;
const today = () => { const n=new Date(); return dateStr(n.getFullYear(),n.getMonth(),n.getDate()); };
function endTime(start,dur){ const [h,m]=start.split(":").map(Number); const e=new Date(2000,0,1,h,m+dur); return `${pad(e.getHours())}:${pad(e.getMinutes())}`; }
function getYouTubeId(url){ const r=url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/); return r?r[1]:null; }

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
html{font-size:16px;-webkit-text-size-adjust:100%}
body{font-family:'Inter',sans-serif;background:#0f172a;color:#1e293b;min-height:100vh}
input,select,textarea,button{font-family:'Inter',sans-serif;font-size:16px}
input:focus,select:focus,textarea:focus{outline:none}
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-thumb{background:#334155;border-radius:2px}
.fade{animation:fi 0.22s ease}@keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.press{transition:transform 0.1s,opacity 0.1s;cursor:pointer}
.press:active{transform:scale(0.97);opacity:0.85}
.card{background:#fff;border-radius:16px;padding:18px;box-shadow:0 1px 3px rgba(0,0,0,0.08)}
.section-title{font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px}
@media(max-width:640px){
  .desktop-only{display:none!important}
  .mobile-stack{flex-direction:column!important}
  .mobile-full{width:100%!important}
}
@media(min-width:641px){
  .mobile-only{display:none!important}
}
`;

// ─── AUTH ─────────────────────────────────────────────────────────────────────
function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email || !pass) return setErr('Preencha todos os campos');
    setErr(''); setLoading(true);
    try {
      if (mode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
        onAuth(data.user);
      } else {
        if (!name) return setErr('Digite seu nome');
        const { data, error } = await supabase.auth.signUp({ email, password: pass, options: { data: { name, role: 'student' } } });
        if (error) throw error;
        if (data.user) {
          await supabase.from('profiles').upsert({ id: data.user.id, email, name, role: 'student' });
          onAuth(data.user);
        } else setErr('Verifique seu email para confirmar');
      }
    } catch(e) { setErr(e.message === 'Invalid login credentials' ? 'Email ou senha incorretos' : e.message); }
    setLoading(false);
  };

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(160deg,#0f172a 0%,#1e3a5f 50%,#0f172a 100%)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'24px'}}>
      <style>{CSS}</style>
      <div style={{width:'100%',maxWidth:420}}>
        <div style={{textAlign:'center',marginBottom:36}}>
          <div style={{width:72,height:72,borderRadius:'50%',background:'linear-gradient(135deg,#c8973e,#f0c060)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,fontWeight:700,color:'#0f172a',margin:'0 auto 16px',fontFamily:"'Playfair Display',serif",boxShadow:'0 8px 24px rgba(200,151,62,0.4)'}}>FB</div>
          <div style={{color:'#c8973e',fontSize:11,fontWeight:600,letterSpacing:'0.2em',textTransform:'uppercase',marginBottom:6}}>Prof. Dr.</div>
          <div style={{color:'#fff',fontSize:28,fontWeight:700,fontFamily:"'Playfair Display',serif",lineHeight:1.2}}>Fabio Busse</div>
          <div style={{color:'#64748b',fontSize:13,marginTop:4}}>Inglês Profissional · Curitiba, PR</div>
        </div>

        <div style={{background:'rgba(255,255,255,0.06)',borderRadius:20,padding:28,backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.1)'}}>
          <div style={{display:'flex',background:'rgba(255,255,255,0.08)',borderRadius:12,padding:4,marginBottom:24,gap:4}}>
            {[['login','Entrar'],['register','Cadastrar']].map(([k,l])=>(
              <button key={k} onClick={()=>setMode(k)}
                style={{flex:1,padding:'10px',borderRadius:10,border:'none',cursor:'pointer',fontWeight:600,fontSize:14,transition:'all 0.2s',
                  background:mode===k?'#c8973e':'transparent',color:mode===k?'#0f172a':'#94a3b8'}}>
                {l}
              </button>
            ))}
          </div>

          {mode==='register'&&(
            <div style={{marginBottom:14}}>
              <div style={{fontSize:12,fontWeight:600,color:'#94a3b8',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.06em'}}>Nome completo</div>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Seu nome completo"
                style={{width:'100%',background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:12,padding:'14px 16px',color:'#fff',fontSize:15}}/>
            </div>
          )}

          <div style={{marginBottom:14}}>
            <div style={{fontSize:12,fontWeight:600,color:'#94a3b8',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.06em'}}>Email</div>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@email.com"
              style={{width:'100%',background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:12,padding:'14px 16px',color:'#fff',fontSize:15}}/>
          </div>

          <div style={{marginBottom:20}}>
            <div style={{fontSize:12,fontWeight:600,color:'#94a3b8',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.06em'}}>Senha</div>
            <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••"
              onKeyDown={e=>e.key==='Enter'&&submit()}
              style={{width:'100%',background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:12,padding:'14px 16px',color:'#fff',fontSize:15}}/>
          </div>

          {err&&<div style={{background:'rgba(239,68,68,0.15)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:10,padding:'12px 14px',fontSize:13,color:'#fca5a5',marginBottom:16}}>{err}</div>}

          <button onClick={submit} disabled={loading} className="press"
            style={{width:'100%',padding:'16px',borderRadius:12,border:'none',background:'linear-gradient(135deg,#c8973e,#f0c060)',color:'#0f172a',fontSize:15,fontWeight:700,boxShadow:'0 4px 16px rgba(200,151,62,0.3)'}}>
            {loading ? 'Aguarde…' : mode==='login' ? 'Entrar' : 'Criar conta'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── OVERVIEW ─────────────────────────────────────────────────────────────────
function OverviewTab({ studentId, studentName }) {
  const [lessons, setLessons] = useState([]);
  const [grammar, setGrammar] = useState([]);
  const [skills,  setSkills]  = useState([]);

  useEffect(()=>{
    supabase.from('lessons').select('*').eq('student_id',studentId).then(({data})=>setLessons(data||[]));
    supabase.from('grammar_progress').select('*').eq('student_id',studentId).then(({data})=>setGrammar(data||[]));
    supabase.from('skills').select('*').eq('student_id',studentId).then(({data})=>setSkills(data||[]));
  },[studentId]);

  const attended  = lessons.filter(l=>l.status==='attended').length;
  const tchCan    = lessons.filter(l=>l.status==='cancelled_teacher').length;
  const stuCan    = lessons.filter(l=>['cancelled_student','cancelled_late','no_show'].includes(l.status)).length;
  const rate      = lessons.length-tchCan>0?Math.round(attended/(lessons.length-tchCan)*100):0;
  const achieved  = grammar.filter(g=>g.status==='achieved').length;
  const inProg    = grammar.filter(g=>g.status==='in_progress').length;
  const tasksDone = lessons.filter(l=>l.tasks==='done').length;
  const rateColor = rate>=80?'#16a34a':rate>=60?'#f59e0b':'#ef4444';

  const now = new Date();
  const monthly = Array.from({length:6},(_,i)=>{
    const d = new Date(now.getFullYear(),now.getMonth()-(5-i),1);
    const ms = `${d.getFullYear()}-${pad(d.getMonth()+1)}`;
    const ml = lessons.filter(l=>l.lesson_date.startsWith(ms));
    return { m:MONTHS[d.getMonth()], R:ml.filter(l=>l.status==='attended').length, C:ml.filter(l=>['cancelled_student','cancelled_late','no_show'].includes(l.status)).length };
  });

  const pie = [
    {name:'Realizadas',value:attended,color:'#16a34a'},
    {name:'Aluno cancelou',value:stuCan,color:'#f59e0b'},
    {name:'Prof. cancelou',value:tchCan,color:'#7c3aed'},
  ].filter(d=>d.value>0);

  const radarData = Object.entries(SKILL_SUBS).map(([sk,items])=>{
    const sd = skills.filter(s=>s.skill===sk);
    const vals = items.map((_,i)=>sd.find(s=>s.sub_index===i)?.value??1);
    return { s:sk.charAt(0).toUpperCase()+sk.slice(1), v:Math.round(vals.reduce((a,b)=>a+b,0)/vals.length*20) };
  });

  const gramProg = [
    {n:'Atingido',v:achieved,c:'#16a34a'},
    {n:'Em desenvolvimento',v:inProg,c:'#f59e0b'},
    {n:'Não atingido',v:grammar.filter(g=>g.status==='not_achieved').length,c:'#ef4444'},
    {n:'Não iniciado',v:GRAMMAR_TOPICS.length-grammar.filter(g=>g.status).length,c:'#e2e8f0'},
  ];

  return (
    <div className="fade" style={{padding:'16px',paddingBottom:80}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:16}}>
        {[
          {icon:'📚',label:'Total',value:lessons.length,color:'#3b82f6'},
          {icon:'✅',label:'Realizadas',value:attended,color:'#16a34a'},
          {icon:'📊',label:'Presença',value:rate+'%',color:rateColor},
          {icon:'🎯',label:'Gramática',value:achieved+'/'+GRAMMAR_TOPICS.length,color:'#c8973e'},
          {icon:'📝',label:'Tarefas feitas',value:tasksDone,color:'#8b5cf6'},
          {icon:'🔄',label:'Em progresso',value:inProg,color:'#f59e0b'},
        ].map(s=>(
          <div key={s.label} className="card press" style={{padding:'16px'}}>
            <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
            <div style={{color:s.color,fontSize:24,fontWeight:700,lineHeight:1}}>{s.value}</div>
            <div style={{color:'#64748b',fontSize:12,marginTop:3,fontWeight:500}}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{marginBottom:12}}>
        <div className="section-title">Aulas por mês</div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={monthly} margin={{top:0,right:0,left:-20,bottom:0}}>
            <XAxis dataKey="m" tick={{fontSize:11,fill:'#64748b'}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:11,fill:'#64748b'}} axisLine={false} tickLine={false} allowDecimals={false}/>
            <Tooltip contentStyle={{fontSize:12,borderRadius:8,border:'none',boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}}/>
            <Bar dataKey="R" name="Realizadas" fill="#16a34a" radius={[4,4,0,0]}/>
            <Bar dataKey="C" name="Canceladas" fill="#f59e0b" radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card" style={{marginBottom:12}}>
        <div className="section-title">Habilidades</div>
        <ResponsiveContainer width="100%" height={180}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#e2e8f0"/>
            <PolarAngleAxis dataKey="s" tick={{fontSize:12,fill:'#475569'}}/>
            <Radar dataKey="v" stroke="#c8973e" fill="#c8973e" fillOpacity={0.2} strokeWidth={2}/>
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <div className="section-title">Progresso gramática</div>
        {gramProg.map(g=>(
          <div key={g.n} style={{marginBottom:12}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:4}}>
              <span style={{color:'#475569',fontWeight:500}}>{g.n}</span>
              <span style={{color:g.c,fontWeight:700}}>{g.v}</span>
            </div>
            <div style={{height:8,borderRadius:4,background:'#f1f5f9',overflow:'hidden'}}>
              <div style={{height:'100%',borderRadius:4,background:g.c,width:`${(g.v/GRAMMAR_TOPICS.length)*100}%`,transition:'width 0.5s'}}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CALENDAR ─────────────────────────────────────────────────────────────────
function CalendarTab({ studentId, isTeacher }) {
  const [cur, setCur] = useState(new Date());
  const [lessons, setLessons] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [selDay, setSelDay] = useState(null);
  const y = cur.getFullYear(), m = cur.getMonth();
  const todayStr = today();
  const [modal, setModal] = useState(null);

  const load = async () => {
    const { data: ls } = await supabase.from('lessons').select('*').eq('student_id',studentId).gte('lesson_date',`${y}-${pad(m+1)}-01`).lte('lesson_date',`${y}-${pad(m+1)}-31`);
    const map = {}; (ls||[]).forEach(l=>map[l.lesson_date]=l); setLessons(map);
    const { data: sc } = await supabase.from('schedules').select('*').eq('student_id',studentId);
    setSchedule(sc||[]);
  };
  useEffect(()=>{ load(); },[studentId,y,m]);

  const saveLesson = async (date, data) => {
    const existing = lessons[date];
    if (existing) await supabase.from('lessons').update({...data}).eq('id',existing.id);
    else await supabase.from('lessons').insert({student_id:studentId,lesson_date:date,...data});
    setModal(null); load();
  };

  const deleteLesson = async (date) => {
    const ex = lessons[date]; if(ex) await supabase.from('lessons').delete().eq('id',ex.id);
    load();
  };

  const firstDow = new Date(y,m,1).getDay();
  const daysInMonth = new Date(y,m+1,0).getDate();
  const cells = [...Array(firstDow).fill(null), ...Array.from({length:daysInMonth},(_,i)=>i+1)];
  const isScheduled = d => schedule.some(s=>s.day_of_week===new Date(y,m,d).getDay());

  return (
    <div className="fade" style={{padding:16,paddingBottom:80}}>
      {modal&&isTeacher&&(
        <LessonModal date={modal} lesson={lessons[modal]}
          onSave={saveLesson} onDelete={deleteLesson} onClose={()=>setModal(null)}/>
      )}
      <div className="card" style={{overflow:'hidden',padding:0}}>
        <div style={{background:'linear-gradient(135deg,#0f172a,#1e3a5f)',padding:'16px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <button onClick={()=>setCur(new Date(y,m-1,1))} className="press" style={{background:'rgba(255,255,255,0.1)',border:'none',color:'#fff',width:36,height:36,borderRadius:'50%',fontSize:18,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>‹</button>
          <div style={{textAlign:'center'}}>
            <div style={{color:'#c8973e',fontSize:11,fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase'}}>{y}</div>
            <div style={{color:'#fff',fontSize:22,fontWeight:700,fontFamily:"'Playfair Display',serif"}}>{MFULL[m]}</div>
          </div>
          <button onClick={()=>setCur(new Date(y,m+1,1))} className="press" style={{background:'rgba(255,255,255,0.1)',border:'none',color:'#fff',width:36,height:36,borderRadius:'50%',fontSize:18,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>›</button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',background:'#f8fafc'}}>
          {WDAYS.map((d,i)=><div key={i} style={{padding:'8px 2px',textAlign:'center',fontSize:11,fontWeight:700,color:'#94a3b8',textTransform:'uppercase'}}>{d}</div>)}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:'1px',background:'#e2e8f0'}}>
          {cells.map((day,i)=>{
            if(!day) return <div key={i} style={{background:'#fafafa',minHeight:56}}/>;
            const ds = dateStr(y,m,day);
            const les = lessons[ds];
            const sched = isScheduled(day);
            const isToday = ds===todayStr;
            const sc = les?LESSON_STATUS[les.status]:null;
            return (
              <div key={day} className="press" onClick={()=>isTeacher&&setModal(ds)}
                style={{background:isToday?'#fffbf0':'#fff',minHeight:56,padding:'6px 4px',border:isToday?'2px solid #c8973e':'none',position:'relative'}}>
                <div style={{width:26,height:26,borderRadius:'50%',background:isToday?'#c8973e':sched?'#e0f2fe':'transparent',color:isToday?'#fff':sched?'#0369a1':'#475569',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:isToday||sched?700:400,margin:'0 auto 2px'}}>
                  {day}
                </div>
                {les&&<div style={{textAlign:'center',fontSize:16,lineHeight:1}}>{sc?.icon}</div>}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{display:'flex',flexWrap:'wrap',gap:8,marginTop:12}}>
        {Object.entries(LESSON_STATUS).map(([,c])=>(
          <div key={c.label} style={{display:'flex',alignItems:'center',gap:4,background:'#f8fafc',borderRadius:8,padding:'4px 10px',fontSize:12,color:'#64748b'}}>
            <span style={{fontSize:14}}>{c.icon}</span>{c.label}
          </div>
        ))}
      </div>
      {!isTeacher&&<div style={{marginTop:12,padding:'12px 14px',background:'#eff6ff',borderRadius:10,fontSize:13,color:'#1d4ed8'}}>📅 Visualizando seu calendário de aulas</div>}
    </div>
  );
}

function LessonModal({ date, lesson, onSave, onClose, onDelete }) {
  const [status, setStatus] = useState(lesson?.status||'attended');
  const [tasks, setTasks]   = useState(lesson?.tasks||'none');
  const [notes, setNotes]   = useState(lesson?.notes||'');
  const d = new Date(date+'T12:00:00');
  const label = d.toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long'});

  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',display:'flex',alignItems:'flex-end',justifyContent:'center',zIndex:1000,backdropFilter:'blur(4px)'}}>
      <div style={{background:'#fff',borderRadius:'20px 20px 0 0',padding:24,width:'100%',maxWidth:540,maxHeight:'90vh',overflowY:'auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <div>
            <div style={{fontSize:11,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:2}}>Registrar Aula</div>
            <div style={{fontSize:18,fontWeight:700,color:'#0f172a',textTransform:'capitalize'}}>{label}</div>
          </div>
          <button onClick={onClose} style={{background:'#f1f5f9',border:'none',borderRadius:'50%',width:36,height:36,fontSize:20,cursor:'pointer',color:'#64748b',display:'flex',alignItems:'center',justifyContent:'center'}}>×</button>
        </div>

        <div style={{marginBottom:18}}>
          <div className="section-title">Status da aula</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            {Object.entries(LESSON_STATUS).map(([k,c])=>(
              <div key={k} className="press" onClick={()=>setStatus(k)}
                style={{background:status===k?c.bg:'#f8fafc',border:`2px solid ${status===k?c.color:'transparent'}`,borderRadius:12,padding:'12px',display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:18}}>{c.icon}</span>
                <span style={{fontSize:13,fontWeight:600,color:status===k?c.color:'#64748b'}}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{marginBottom:18}}>
          <div className="section-title">Tarefas de casa</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            {Object.entries(TASK_STATUS).map(([k,c])=>(
              <div key={k} className="press" onClick={()=>setTasks(k)}
                style={{background:tasks===k?'#f0f9ff':'#f8fafc',border:`2px solid ${tasks===k?'#0f172a':'transparent'}`,borderRadius:12,padding:'12px',display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:16}}>{c.icon}</span>
                <span style={{fontSize:13,fontWeight:tasks===k?700:400,color:tasks===k?'#0f172a':'#64748b'}}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{marginBottom:20}}>
          <div className="section-title">Observações</div>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Notas sobre esta aula…"
            style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:12,padding:'12px 14px',fontSize:14,resize:'vertical',minHeight:80,color:'#0f172a'}}/>
        </div>

        <div style={{display:'flex',gap:8}}>
          {lesson&&<button onClick={()=>{onDelete(date);onClose();}} className="press" style={{padding:'14px 16px',borderRadius:12,border:'1px solid #fee2e2',background:'#fff5f5',color:'#ef4444',cursor:'pointer',fontSize:14,fontWeight:600}}>Excluir</button>}
          <button onClick={onClose} className="press" style={{flex:1,padding:'14px',borderRadius:12,border:'1px solid #e2e8f0',background:'#fff',cursor:'pointer',fontSize:14,color:'#64748b',fontWeight:600}}>Cancelar</button>
          <button onClick={()=>onSave(date,{status,tasks,notes})} className="press" style={{flex:2,padding:'14px',borderRadius:12,border:'none',background:'linear-gradient(135deg,#0f172a,#1e3a5f)',color:'#fff',cursor:'pointer',fontSize:14,fontWeight:700}}>Salvar</button>
        </div>
      </div>
    </div>
  );
}

// ─── GRAMMAR ──────────────────────────────────────────────────────────────────
function GrammarTab({ studentId, isTeacher }) {
  const [sub, setSub] = useState('grammar');
  const [grammar, setGrammar] = useState({});
  const [skills, setSkills] = useState({});
  const [search, setSearch] = useState('');

  const loadGrammar = async () => {
    const { data } = await supabase.from('grammar_progress').select('*').eq('student_id',studentId);
    const map = {}; (data||[]).forEach(g=>map[g.topic_id]=g.status); setGrammar(map);
  };
  const loadSkills = async () => {
    const { data } = await supabase.from('skills').select('*').eq('student_id',studentId);
    const map = {}; (data||[]).forEach(s=>{ if(!map[s.skill]) map[s.skill]={}; map[s.skill][s.sub_index]=s.value; }); setSkills(map);
  };
  useEffect(()=>{ loadGrammar(); loadSkills(); },[studentId]);

  const setGrammarStatus = async (topicId, status) => {
    if (!isTeacher) return;
    const ex = await supabase.from('grammar_progress').select('id').eq('student_id',studentId).eq('topic_id',topicId).single();
    if (ex.data) await supabase.from('grammar_progress').update({status}).eq('id',ex.data.id);
    else await supabase.from('grammar_progress').insert({student_id:studentId,topic_id:topicId,status});
    loadGrammar();
  };

  const setSkillValue = async (skill, subIndex, value) => {
    if (!isTeacher) return;
    const ex = await supabase.from('skills').select('id').eq('student_id',studentId).eq('skill',skill).eq('sub_index',subIndex).single();
    if (ex.data) await supabase.from('skills').update({value}).eq('id',ex.data.id);
    else await supabase.from('skills').insert({student_id:studentId,skill,sub_index:subIndex,value});
    loadSkills();
  };

  const statusConfig = {
    achieved:    { label:'Atingido',      color:'#16a34a', bg:'#dcfce7' },
    in_progress: { label:'Em progresso',  color:'#d97706', bg:'#fef3c7' },
    not_achieved:{ label:'Não atingido',  color:'#ef4444', bg:'#fee2e2' },
  };

  const cats = [...new Set(GRAMMAR_TOPICS.map(t=>t.cat))];
  const filtered = GRAMMAR_TOPICS.filter(t=>!search||t.name.toLowerCase().includes(search.toLowerCase())||t.cat.toLowerCase().includes(search.toLowerCase()));
  const byCat = cats.reduce((a,c)=>({...a,[c]:filtered.filter(t=>t.cat===c)}),{});

  return (
    <div className="fade" style={{paddingBottom:80}}>
      <div style={{background:'#fff',borderBottom:'1px solid #f1f5f9',padding:'12px 16px',position:'sticky',top:0,zIndex:10}}>
        <div style={{display:'flex',background:'#f1f5f9',borderRadius:12,padding:4,gap:4,marginBottom:12}}>
          {[['grammar','📚 Gramática'],['skills','🎯 Habilidades']].map(([k,l])=>(
            <button key={k} onClick={()=>setSub(k)} className="press"
              style={{flex:1,padding:'10px',borderRadius:10,fontSize:14,fontWeight:600,border:'none',cursor:'pointer',
                background:sub===k?'#0f172a':'transparent',color:sub===k?'#fff':'#64748b'}}>
              {l}
            </button>
          ))}
        </div>
        {sub==='grammar'&&(
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Buscar tópico…"
            style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:12,padding:'12px 14px',fontSize:14,color:'#0f172a',background:'#f8fafc'}}/>
        )}
      </div>

      {sub==='grammar'&&(
        <div style={{padding:'12px 16px'}}>
          {cats.map(cat=>{
            const ts = byCat[cat]; if(!ts||!ts.length) return null;
            return (
              <div key={cat} className="card" style={{marginBottom:10,padding:0,overflow:'hidden'}}>
                <div style={{background:'#f8fafc',padding:'10px 16px',borderBottom:'1px solid #f1f5f9',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontSize:13,fontWeight:700,color:'#0f172a'}}>{cat}</span>
                  <span style={{fontSize:11,color:'#94a3b8',background:'#e2e8f0',borderRadius:6,padding:'2px 8px'}}>{ts.length}</span>
                </div>
                {ts.map((t,i)=>{
                  const st = grammar[t.id]||'';
                  const sc = statusConfig[st];
                  return (
                    <div key={t.id} style={{padding:'12px 16px',borderBottom:i<ts.length-1?'1px solid #f8fafc':'none'}}>
                      <div style={{fontSize:14,color:'#1e293b',fontWeight:500,marginBottom:8}}>{t.name}</div>
                      <div style={{display:'flex',gap:6}}>
                        {Object.entries(statusConfig).map(([k,c])=>(
                          <button key={k} onClick={()=>setGrammarStatus(t.id,st===k?'':k)} disabled={!isTeacher}
                            className="press"
                            style={{flex:1,border:`2px solid ${st===k?c.color:'#e2e8f0'}`,borderRadius:8,padding:'8px 4px',cursor:isTeacher?'pointer':'default',
                              background:st===k?c.bg:'#f8fafc',fontSize:11,fontWeight:st===k?700:500,color:st===k?c.color:'#94a3b8',textAlign:'center',lineHeight:1.2}}>
                            {c.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {sub==='skills'&&(
        <div style={{padding:'12px 16px'}}>
          {Object.entries(SKILL_SUBS).map(([sk,items])=>(
            <div key={sk} className="card" style={{marginBottom:12,padding:0,overflow:'hidden'}}>
              <div style={{background:SKILL_COLOR[sk],padding:'14px 18px',display:'flex',alignItems:'center',gap:10}}>
                <span style={{fontSize:22}}>{SKILL_ICON[sk]}</span>
                <span style={{color:'#fff',fontWeight:700,fontSize:17,textTransform:'capitalize'}}>{sk}</span>
              </div>
              {items.map((item,idx)=>{
                const val = skills[sk]?.[idx]??1;
                return (
                  <div key={item} style={{padding:'14px 18px',borderBottom:'1px solid #f8fafc'}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                      <span style={{fontSize:14,color:'#1e293b',fontWeight:500}}>{item}</span>
                      <span style={{fontSize:14,fontWeight:700,color:SKILL_COLOR[sk]}}>{val}/5</span>
                    </div>
                    <div style={{display:'flex',gap:6}}>
                      {[1,2,3,4,5].map(n=>(
                        <button key={n} onClick={()=>setSkillValue(sk,idx,n)} disabled={!isTeacher}
                          className="press"
                          style={{flex:1,height:32,borderRadius:6,border:'none',cursor:isTeacher?'pointer':'default',
                            background:n<=val?SKILL_COLOR[sk]:'#e2e8f0',transition:'background 0.15s'}}/>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── HOMEWORK ─────────────────────────────────────────────────────────────────
function HomeworkTab({ studentId, isTeacher }) {
  const [items, setItems] = useState([]);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [due, setDue] = useState('');

  const load = async () => {
    const { data } = await supabase.from('homework').select('*').eq('student_id',studentId).order('created_at',{ascending:false});
    setItems(data||[]);
  };
  useEffect(()=>{ load(); },[studentId]);

  const add = async () => {
    if (!title) return;
    await supabase.from('homework').insert({student_id:studentId,title,description:desc,due_date:due||null,done:false});
    setTitle(''); setDesc(''); setDue(''); setAdding(false); load();
  };

  const toggle = async (id, done) => {
    await supabase.from('homework').update({done:!done}).eq('id',id); load();
  };

  const remove = async (id) => {
    await supabase.from('homework').delete().eq('id',id); load();
  };

  const pending = items.filter(i=>!i.done);
  const done = items.filter(i=>i.done);

  return (
    <div className="fade" style={{padding:16,paddingBottom:80}}>
      {isTeacher&&(
        <div style={{marginBottom:16}}>
          {!adding?(
            <button onClick={()=>setAdding(true)} className="press"
              style={{width:'100%',padding:16,borderRadius:14,border:'2px dashed #c8973e',background:'rgba(200,151,62,0.05)',color:'#c8973e',fontSize:15,fontWeight:700,cursor:'pointer'}}>
              + Adicionar Tarefa
            </button>
          ):(
            <div className="card">
              <div className="section-title">Nova Tarefa</div>
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título da tarefa *"
                style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:10,padding:'12px 14px',fontSize:14,marginBottom:10,color:'#0f172a'}}/>
              <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Descrição (opcional)"
                style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:10,padding:'12px 14px',fontSize:14,resize:'vertical',minHeight:72,marginBottom:10,color:'#0f172a'}}/>
              <input type="date" value={due} onChange={e=>setDue(e.target.value)}
                style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:10,padding:'12px 14px',fontSize:14,marginBottom:14,color:'#0f172a'}}/>
              <div style={{display:'flex',gap:8}}>
                <button onClick={()=>setAdding(false)} className="press" style={{flex:1,padding:'12px',borderRadius:10,border:'1px solid #e2e8f0',background:'#fff',cursor:'pointer',fontSize:14,color:'#64748b',fontWeight:600}}>Cancelar</button>
                <button onClick={add} className="press" style={{flex:2,padding:'12px',borderRadius:10,border:'none',background:'#0f172a',color:'#fff',cursor:'pointer',fontSize:14,fontWeight:700}}>Salvar</button>
              </div>
            </div>
          )}
        </div>
      )}

      {pending.length===0&&done.length===0&&(
        <div style={{textAlign:'center',padding:'48px 0',color:'#94a3b8'}}>
          <div style={{fontSize:40,marginBottom:8}}>📝</div>
          <div style={{fontSize:14}}>Nenhuma tarefa ainda</div>
        </div>
      )}

      {pending.length>0&&(
        <div className="card" style={{marginBottom:12,padding:0,overflow:'hidden'}}>
          <div style={{background:'#f8fafc',padding:'10px 16px',borderBottom:'1px solid #f1f5f9'}}>
            <span style={{fontSize:13,fontWeight:700,color:'#0f172a'}}>Pendentes ({pending.length})</span>
          </div>
          {pending.map((item,i)=>(
            <div key={item.id} style={{padding:'14px 16px',borderBottom:i<pending.length-1?'1px solid #f8fafc':'none',display:'flex',alignItems:'flex-start',gap:12}}>
              <button onClick={()=>toggle(item.id,item.done)} className="press"
                style={{width:24,height:24,borderRadius:'50%',border:'2px solid #e2e8f0',background:'#fff',cursor:'pointer',flexShrink:0,marginTop:2}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:600,color:'#0f172a',marginBottom:2}}>{item.title}</div>
                {item.description&&<div style={{fontSize:13,color:'#64748b',marginBottom:2}}>{item.description}</div>}
                {item.due_date&&<div style={{fontSize:12,color:'#c8973e',fontWeight:600}}>📅 Até: {new Date(item.due_date+'T12:00').toLocaleDateString('pt-BR')}</div>}
              </div>
              {isTeacher&&<button onClick={()=>remove(item.id)} className="press" style={{background:'none',border:'none',color:'#94a3b8',cursor:'pointer',fontSize:18,padding:'0 4px'}}>×</button>}
            </div>
          ))}
        </div>
      )}

      {done.length>0&&(
        <div className="card" style={{padding:0,overflow:'hidden',opacity:0.7}}>
          <div style={{background:'#f8fafc',padding:'10px 16px',borderBottom:'1px solid #f1f5f9'}}>
            <span style={{fontSize:13,fontWeight:700,color:'#64748b'}}>Concluídas ({done.length})</span>
          </div>
          {done.map((item,i)=>(
            <div key={item.id} style={{padding:'12px 16px',borderBottom:i<done.length-1?'1px solid #f8fafc':'none',display:'flex',alignItems:'center',gap:12}}>
              <button onClick={()=>toggle(item.id,item.done)} className="press"
                style={{width:24,height:24,borderRadius:'50%',border:'none',background:'#16a34a',cursor:'pointer',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:12}}>✓</button>
              <div style={{flex:1,textDecoration:'line-through',color:'#94a3b8',fontSize:14}}>{item.title}</div>
              {isTeacher&&<button onClick={()=>remove(item.id)} className="press" style={{background:'none',border:'none',color:'#94a3b8',cursor:'pointer',fontSize:18,padding:'0 4px'}}>×</button>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MATERIALS ────────────────────────────────────────────────────────────────
function MaterialsTab({ studentId, isTeacher }) {
  const [items, setItems] = useState([]);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('link');
  const [desc, setDesc] = useState('');

  const load = async () => {
    const { data } = await supabase.from('materials').select('*').eq('student_id',studentId).order('created_at',{ascending:false});
    setItems(data||[]);
  };
  useEffect(()=>{ load(); },[studentId]);

  const add = async () => {
    if (!title) return;
    await supabase.from('materials').insert({student_id:studentId,title,url,type,description:desc});
    setTitle(''); setUrl(''); setDesc(''); setType('link'); setAdding(false); load();
  };

  const remove = async (id) => {
    await supabase.from('materials').delete().eq('id',id); load();
  };

  const typeIcons = { link:'🔗', pdf:'📄', audio:'🎵', exercise:'📋', book:'📚' };
  const typeColors = { link:'#3b82f6', pdf:'#ef4444', audio:'#f59e0b', exercise:'#16a34a', book:'#8b5cf6' };

  return (
    <div className="fade" style={{padding:16,paddingBottom:80}}>
      {isTeacher&&(
        <div style={{marginBottom:16}}>
          {!adding?(
            <button onClick={()=>setAdding(true)} className="press"
              style={{width:'100%',padding:16,borderRadius:14,border:'2px dashed #3b82f6',background:'rgba(59,130,246,0.05)',color:'#3b82f6',fontSize:15,fontWeight:700,cursor:'pointer'}}>
              + Adicionar Material
            </button>
          ):(
            <div className="card">
              <div className="section-title">Novo Material</div>
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título do material *"
                style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:10,padding:'12px 14px',fontSize:14,marginBottom:10,color:'#0f172a'}}/>
              <select value={type} onChange={e=>setType(e.target.value)}
                style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:10,padding:'12px 14px',fontSize:14,marginBottom:10,color:'#0f172a',background:'#fff'}}>
                <option value="link">🔗 Link</option>
                <option value="pdf">📄 PDF</option>
                <option value="audio">🎵 Áudio</option>
                <option value="exercise">📋 Exercício</option>
                <option value="book">📚 Livro</option>
              </select>
              <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="URL (opcional)"
                style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:10,padding:'12px 14px',fontSize:14,marginBottom:10,color:'#0f172a'}}/>
              <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Descrição"
                style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:10,padding:'12px 14px',fontSize:14,resize:'vertical',minHeight:60,marginBottom:14,color:'#0f172a'}}/>
              <div style={{display:'flex',gap:8}}>
                <button onClick={()=>setAdding(false)} className="press" style={{flex:1,padding:'12px',borderRadius:10,border:'1px solid #e2e8f0',background:'#fff',cursor:'pointer',fontSize:14,color:'#64748b',fontWeight:600}}>Cancelar</button>
                <button onClick={add} className="press" style={{flex:2,padding:'12px',borderRadius:10,border:'none',background:'#0f172a',color:'#fff',cursor:'pointer',fontSize:14,fontWeight:700}}>Salvar</button>
              </div>
            </div>
          )}
        </div>
      )}

      {items.length===0&&(
        <div style={{textAlign:'center',padding:'48px 0',color:'#94a3b8'}}>
          <div style={{fontSize:40,marginBottom:8}}>📚</div>
          <div style={{fontSize:14}}>Nenhum material ainda</div>
        </div>
      )}

      {items.map(item=>(
        <div key={item.id} className="card press" style={{marginBottom:10,display:'flex',alignItems:'center',gap:14}}>
          <div style={{width:44,height:44,borderRadius:12,background:`${typeColors[item.type]}15`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0}}>
            {typeIcons[item.type]||'📎'}
          </div>
          <div style={{flex:1,minWidth:0}} onClick={()=>item.url&&window.open(item.url,'_blank')}>
            <div style={{fontSize:15,fontWeight:600,color:'#0f172a',marginBottom:2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.title}</div>
            {item.description&&<div style={{fontSize:12,color:'#64748b',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.description}</div>}
            <div style={{fontSize:11,color:typeColors[item.type]||'#64748b',fontWeight:600,textTransform:'uppercase',marginTop:2}}>{item.type}</div>
          </div>
          {isTeacher&&<button onClick={()=>remove(item.id)} className="press" style={{background:'#fee2e2',border:'none',borderRadius:8,padding:'8px 10px',color:'#ef4444',cursor:'pointer',fontSize:13,fontWeight:700,flexShrink:0}}>×</button>}
        </div>
      ))}
    </div>
  );
}

// ─── VIDEOS ───────────────────────────────────────────────────────────────────
function VideosTab({ studentId, isTeacher }) {
  const [items, setItems] = useState([]);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [desc, setDesc] = useState('');

  const load = async () => {
    const { data } = await supabase.from('videos').select('*').eq('student_id',studentId).order('created_at',{ascending:false});
    setItems(data||[]);
  };
  useEffect(()=>{ load(); },[studentId]);

  const add = async () => {
    if (!title||!url) return;
    await supabase.from('videos').insert({student_id:studentId,title,url,description:desc});
    setTitle(''); setUrl(''); setDesc(''); setAdding(false); load();
  };

  const remove = async (id) => {
    await supabase.from('videos').delete().eq('id',id); load();
  };

  return (
    <div className="fade" style={{padding:16,paddingBottom:80}}>
      {isTeacher&&(
        <div style={{marginBottom:16}}>
          {!adding?(
            <button onClick={()=>setAdding(true)} className="press"
              style={{width:'100%',padding:16,borderRadius:14,border:'2px dashed #ef4444',background:'rgba(239,68,68,0.05)',color:'#ef4444',fontSize:15,fontWeight:700,cursor:'pointer'}}>
              + Adicionar Vídeo
            </button>
          ):(
            <div className="card">
              <div className="section-title">Novo Vídeo</div>
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título do vídeo *"
                style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:10,padding:'12px 14px',fontSize:14,marginBottom:10,color:'#0f172a'}}/>
              <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="URL do YouTube *"
                style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:10,padding:'12px 14px',fontSize:14,marginBottom:10,color:'#0f172a'}}/>
              <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Descrição"
                style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:10,padding:'12px 14px',fontSize:14,resize:'vertical',minHeight:60,marginBottom:14,color:'#0f172a'}}/>
              <div style={{display:'flex',gap:8}}>
                <button onClick={()=>setAdding(false)} className="press" style={{flex:1,padding:'12px',borderRadius:10,border:'1px solid #e2e8f0',background:'#fff',cursor:'pointer',fontSize:14,color:'#64748b',fontWeight:600}}>Cancelar</button>
                <button onClick={add} className="press" style={{flex:2,padding:'12px',borderRadius:10,border:'none',background:'#0f172a',color:'#fff',cursor:'pointer',fontSize:14,fontWeight:700}}>Salvar</button>
              </div>
            </div>
          )}
        </div>
      )}

      {items.length===0&&(
        <div style={{textAlign:'center',padding:'48px 0',color:'#94a3b8'}}>
          <div style={{fontSize:40,marginBottom:8}}>🎬</div>
          <div style={{fontSize:14}}>Nenhum vídeo ainda</div>
        </div>
      )}

      {items.map(item=>{
        const ytId = getYouTubeId(item.url);
        return (
          <div key={item.id} className="card" style={{marginBottom:12,padding:0,overflow:'hidden'}}>
            {ytId?(
              <div style={{position:'relative',paddingBottom:'56.25%',background:'#000'}}>
                <iframe src={`https://www.youtube.com/embed/${ytId}`} title={item.title}
                  style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',border:'none'}} allowFullScreen/>
              </div>
            ):(
              <div className="press" onClick={()=>window.open(item.url,'_blank')} style={{background:'#fee2e2',padding:'24px',textAlign:'center',cursor:'pointer'}}>
                <div style={{fontSize:32}}>▶️</div>
              </div>
            )}
            <div style={{padding:'14px 16px',display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:8}}>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:700,color:'#0f172a',marginBottom:3}}>{item.title}</div>
                {item.description&&<div style={{fontSize:13,color:'#64748b'}}>{item.description}</div>}
              </div>
              {isTeacher&&<button onClick={()=>remove(item.id)} className="press" style={{background:'#fee2e2',border:'none',borderRadius:8,padding:'8px 10px',color:'#ef4444',cursor:'pointer',fontSize:13,fontWeight:700,flexShrink:0}}>×</button>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── SCHEDULE ─────────────────────────────────────────────────────────────────
function ScheduleTab({ studentId, isTeacher }) {
  const [slots, setSlots] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(()=>{
    supabase.from('schedules').select('*').eq('student_id',studentId).then(({data})=>setSlots(data||[]));
  },[studentId]);

  const save = async () => {
    await supabase.from('schedules').delete().eq('student_id',studentId);
    if (slots.length) await supabase.from('schedules').insert(slots.map(s=>({student_id:studentId,day_of_week:s.day_of_week??1,start_time:s.start_time??'10:00',duration:s.duration??60})));
    setSaved(true); setTimeout(()=>setSaved(false),2000);
  };

  const add  = () => setSlots(s=>[...s,{day_of_week:1,start_time:'10:00',duration:60}]);
  const rm   = i => setSlots(s=>s.filter((_,j)=>j!==i));
  const upd  = (i,k,v) => setSlots(s=>s.map((x,j)=>j===i?{...x,[k]:v}:x));

  return (
    <div className="fade" style={{padding:16,paddingBottom:80}}>
      <div className="card" style={{marginBottom:16}}>
        <div className="section-title">Horários fixos de aula</div>
        {slots.length===0&&<div style={{textAlign:'center',padding:'24px 0',color:'#94a3b8',fontSize:14}}>Nenhum horário configurado</div>}
        {slots.map((sl,i)=>(
          <div key={i} style={{border:'1px solid #f1f5f9',borderRadius:12,padding:14,marginBottom:10}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:10}}>
              <div>
                <div style={{fontSize:11,fontWeight:600,color:'#64748b',textTransform:'uppercase',marginBottom:4}}>Dia</div>
                <select value={sl.day_of_week??1} onChange={e=>upd(i,'day_of_week',Number(e.target.value))} disabled={!isTeacher}
                  style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:8,padding:'10px 8px',fontSize:13,background:'#fff',color:'#0f172a'}}>
                  {WFULL.map((d,idx)=><option key={idx} value={idx}>{d.slice(0,3)}</option>)}
                </select>
              </div>
              <div>
                <div style={{fontSize:11,fontWeight:600,color:'#64748b',textTransform:'uppercase',marginBottom:4}}>Início</div>
                <input type="time" value={sl.start_time??'10:00'} onChange={e=>upd(i,'start_time',e.target.value)} disabled={!isTeacher}
                  style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:8,padding:'10px 6px',fontSize:13,color:'#0f172a'}}/>
              </div>
              <div>
                <div style={{fontSize:11,fontWeight:600,color:'#64748b',textTransform:'uppercase',marginBottom:4}}>Duração</div>
                <select value={sl.duration??60} onChange={e=>upd(i,'duration',Number(e.target.value))} disabled={!isTeacher}
                  style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:8,padding:'10px 6px',fontSize:13,background:'#fff',color:'#0f172a'}}>
                  {[30,45,60,75,90,120].map(d=><option key={d} value={d}>{d}min</option>)}
                </select>
              </div>
            </div>
            <div style={{background:'#f0f9ff',borderRadius:8,padding:'8px 12px',fontSize:13,color:'#0369a1',fontWeight:600,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span>{WFULL[sl.day_of_week??1]} · {sl.start_time??'10:00'} – {endTime(sl.start_time??'10:00',sl.duration??60)}</span>
              {isTeacher&&<button onClick={()=>rm(i)} className="press" style={{background:'#fee2e2',border:'none',borderRadius:6,padding:'4px 8px',color:'#ef4444',cursor:'pointer',fontSize:12,fontWeight:700}}>Remover</button>}
            </div>
          </div>
        ))}
        {isTeacher&&(
          <div style={{display:'flex',gap:8,marginTop:4}}>
            <button onClick={add} className="press" style={{flex:1,padding:'12px',border:'2px dashed #e2e8f0',borderRadius:10,background:'#fff',color:'#64748b',cursor:'pointer',fontSize:14}}>+ Adicionar</button>
            <button onClick={save} className="press" style={{flex:1,padding:'12px',border:'none',borderRadius:10,background:'#0f172a',color:'#fff',cursor:'pointer',fontSize:14,fontWeight:700}}>{saved?'✓ Salvo!':'Salvar'}</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PROFILE ─────────────────────────────────────────────────────────────────
function ProfileTab({ profile, isTeacher, onUpdate }) {
  const [f, setF] = useState({...profile});
  const [ok, setOk] = useState(false);
  const upd = (k,v) => setF(x=>({...x,[k]:v}));

  const save = async () => {
    await supabase.from('profiles').update({name:f.name,phone:f.phone,level:f.level,goal:f.goal,notes:f.notes,start_date:f.start_date}).eq('id',profile.id);
    setOk(true); setTimeout(()=>setOk(false),2000); onUpdate&&onUpdate(f);
  };

  return (
    <div className="fade" style={{padding:16,paddingBottom:80}}>
      <div style={{textAlign:'center',padding:'24px 0',marginBottom:8}}>
        <div style={{width:72,height:72,borderRadius:'50%',background:'linear-gradient(135deg,#0f172a,#1e3a5f)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,fontWeight:700,color:'#c8973e',margin:'0 auto 12px',fontFamily:"'Playfair Display',serif"}}>
          {(f.name||f.email||'?').charAt(0).toUpperCase()}
        </div>
        <div style={{fontSize:20,fontWeight:700,color:'#0f172a'}}>{f.name||'Sem nome'}</div>
        <div style={{fontSize:13,color:'#64748b'}}>{f.email}</div>
        {f.level&&<div style={{display:'inline-block',background:'#fef3c7',border:'1px solid #fbbf24',color:'#92400e',fontSize:12,padding:'3px 10px',borderRadius:20,marginTop:6,fontWeight:600}}>{f.level}</div>}
      </div>

      <div className="card">
        {[
          {k:'name',  label:'Nome completo',      ph:'Nome do aluno', type:'text'},
          {k:'phone', label:'Telefone / WhatsApp', ph:'(41) 9xxxx-xxxx', type:'text'},
        ].map(({k,label,ph,type})=>(
          <div key={k} style={{marginBottom:14}}>
            <div style={{fontSize:12,fontWeight:600,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6}}>{label}</div>
            <input type={type} value={f[k]||''} onChange={e=>upd(k,e.target.value)} placeholder={ph} disabled={!isTeacher}
              style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:10,padding:'13px 14px',fontSize:14,background:isTeacher?'#fff':'#f8fafc',color:'#0f172a'}}/>
          </div>
        ))}
        <div style={{marginBottom:14}}>
          <div style={{fontSize:12,fontWeight:600,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6}}>Data de início</div>
          <input type="date" value={f.start_date||''} onChange={e=>upd('start_date',e.target.value)} disabled={!isTeacher}
            style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:10,padding:'13px 14px',fontSize:14,background:isTeacher?'#fff':'#f8fafc',color:'#0f172a'}}/>
        </div>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:12,fontWeight:600,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6}}>Nível</div>
          <select value={f.level||''} onChange={e=>upd('level',e.target.value)} disabled={!isTeacher}
            style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:10,padding:'13px 14px',fontSize:14,background:isTeacher?'#fff':'#f8fafc',color:'#0f172a'}}>
            <option value="">Selecione…</option>
            {LEVELS.map(l=><option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:12,fontWeight:600,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6}}>Objetivo</div>
          <input value={f.goal||''} onChange={e=>upd('goal',e.target.value)} placeholder="Ex: Negócios, Viagens, Cambridge…" disabled={!isTeacher}
            style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:10,padding:'13px 14px',fontSize:14,background:isTeacher?'#fff':'#f8fafc',color:'#0f172a'}}/>
        </div>
        <div style={{marginBottom:isTeacher?20:4}}>
          <div style={{fontSize:12,fontWeight:600,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6}}>Observações</div>
          <textarea value={f.notes||''} onChange={e=>upd('notes',e.target.value)} placeholder="Informações importantes…" disabled={!isTeacher}
            style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:10,padding:'13px 14px',fontSize:14,minHeight:80,resize:'vertical',background:isTeacher?'#fff':'#f8fafc',color:'#0f172a'}}/>
        </div>
        {isTeacher&&(
          <button onClick={save} className="press" style={{width:'100%',padding:'14px',borderRadius:12,border:'none',background:'linear-gradient(135deg,#0f172a,#1e3a5f)',color:'#fff',fontSize:15,fontWeight:700}}>
            {ok?'✓ Salvo com sucesso!':'Salvar Perfil'}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── STUDENT SELECTOR (TEACHER) ───────────────────────────────────────────────
function StudentSelector({ students, activeId, onSelect, onAdd, onClose }) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const create = async () => {
    setLoading(true); setErr('');
    try {
      const { data, error } = await supabase.auth.signUp({ email, password: pass, options: { data: { name, role: 'student' } } });
      if (error) throw error;
      if (data.user) {
        await supabase.from('profiles').upsert({ id:data.user.id, email, name, role:'student', teacher_id:'68b28e05-5161-44ca-9d5c-2fb35cefe705' });
      }
      onAdd(); setAdding(false); setName(''); setEmail(''); setPass('');
    } catch(e) { setErr(e.message); }
    setLoading(false);
  };

  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',zIndex:200,backdropFilter:'blur(4px)',display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
      <div style={{background:'#fff',borderRadius:'20px 20px 0 0',maxHeight:'80vh',overflowY:'auto'}}>
        <div style={{padding:'12px 0',display:'flex',justifyContent:'center'}}>
          <div style={{width:40,height:4,borderRadius:2,background:'#e2e8f0'}}/>
        </div>
        <div style={{padding:'0 16px 24px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
            <div style={{fontSize:18,fontWeight:700,color:'#0f172a'}}>Meus Alunos</div>
            <button onClick={()=>setAdding(!adding)} className="press"
              style={{background:'#0f172a',border:'none',borderRadius:10,padding:'8px 14px',color:'#fff',fontSize:13,fontWeight:700,cursor:'pointer'}}>
              {adding?'Cancelar':'+ Novo'}
            </button>
          </div>

          {adding&&(
            <div style={{background:'#f8fafc',borderRadius:14,padding:16,marginBottom:16}}>
              {[
                {k:name,set:setName,ph:'Nome completo *',type:'text'},
                {k:email,set:setEmail,ph:'Email *',type:'email'},
                {k:pass,set:setPass,ph:'Senha (mín. 6 caracteres) *',type:'password'},
              ].map((f,i)=>(
                <input key={i} type={f.type} value={f.k} onChange={e=>f.set(e.target.value)} placeholder={f.ph}
                  style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:10,padding:'12px 14px',fontSize:14,marginBottom:8,color:'#0f172a',background:'#fff'}}/>
              ))}
              {err&&<div style={{color:'#ef4444',fontSize:12,marginBottom:8}}>{err}</div>}
              <button onClick={create} disabled={loading} className="press"
                style={{width:'100%',padding:'13px',borderRadius:10,border:'none',background:'#16a34a',color:'#fff',fontSize:14,fontWeight:700,cursor:'pointer'}}>
                {loading?'Criando…':'Criar Aluno'}
              </button>
            </div>
          )}

          {students.map(s=>(
            <div key={s.id} className="press" onClick={()=>{onSelect(s.id);onClose();}}
              style={{display:'flex',alignItems:'center',gap:12,padding:'12px',borderRadius:12,background:activeId===s.id?'#f0f9ff':'#f8fafc',border:`2px solid ${activeId===s.id?'#0f172a':'transparent'}`,marginBottom:8,cursor:'pointer'}}>
              <div style={{width:44,height:44,borderRadius:'50%',background:'linear-gradient(135deg,#0f172a,#1e3a5f)',display:'flex',alignItems:'center',justifyContent:'center',color:'#c8973e',fontSize:18,fontWeight:700,flexShrink:0}}>
                {(s.name||s.email||'?').charAt(0).toUpperCase()}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:15,fontWeight:600,color:'#0f172a',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{s.name||s.email}</div>
                {s.level&&<div style={{fontSize:12,color:'#64748b'}}>{s.level}</div>}
              </div>
              {activeId===s.id&&<div style={{color:'#0f172a',fontSize:18}}>✓</div>}
            </div>
          ))}

          {students.length===0&&!adding&&(
            <div style={{textAlign:'center',padding:'24px 0',color:'#94a3b8',fontSize:14}}>Nenhum aluno ainda</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
const TABS = [
  {id:'overview',  icon:'📊', label:'Início'},
  {id:'calendar',  icon:'📅', label:'Aulas'},
  {id:'grammar',   icon:'📚', label:'Gramática'},
  {id:'homework',  icon:'📝', label:'Tarefas'},
  {id:'materials', icon:'🔗', label:'Materiais'},
  {id:'videos',    icon:'🎬', label:'Vídeos'},
  {id:'schedule',  icon:'🗓️', label:'Agenda'},
  {id:'profile',   icon:'👤', label:'Perfil'},
];

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user,     setUser]     = useState(null);
  const [profile,  setProfile]  = useState(null);
  const [students, setStudents] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [tab,      setTab]      = useState('overview');
  const [loading,  setLoading]  = useState(true);
  const [showStudents, setShowStudents] = useState(false);
  const [tabPage,  setTabPage]  = useState(0); // for tab pagination on mobile

  useEffect(()=>{
    supabase.auth.getUser().then(({data:{user}})=>{ if(user) loadProfile(user); else setLoading(false); });
    const {data:{subscription}} = supabase.auth.onAuthStateChange((_,session)=>{
      if(session?.user) loadProfile(session.user);
      else { setUser(null); setProfile(null); setLoading(false); }
    });
    return ()=>subscription.unsubscribe();
  },[]);

  const loadProfile = async (u) => {
    setUser(u);
    const { data } = await supabase.from('profiles').select('*').eq('id',u.id).single();
    if (data) {
      setProfile(data);
      if (data.role==='teacher') loadStudents(u.id);
      setActiveId(u.id);
    }
    setLoading(false);
  };

  const loadStudents = async (teacherId) => {
    const { data } = await supabase.from('profiles').select('*').eq('teacher_id',teacherId).eq('role','student');
    setStudents(data||[]);
    if (data?.length) setActiveId(data[0].id);
  };

  const logout = async () => { await supabase.auth.signOut(); };
  const isTeacher = profile?.role==='teacher';
  const activeStudent = isTeacher ? students.find(s=>s.id===activeId) : profile;

  if (loading) return (
    <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0f172a'}}>
      <style>{CSS}</style>
      <div style={{color:'#c8973e',fontFamily:"'Playfair Display',serif",fontSize:22}}>Carregando…</div>
    </div>
  );

  if (!user) return <AuthScreen onAuth={u=>loadProfile(u)}/>;

  // Split tabs into two rows for mobile
  const tabsRow1 = TABS.slice(0,4);
  const tabsRow2 = TABS.slice(4,8);

  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column',background:'#f1f5f9',fontFamily:"'Inter',sans-serif"}}>
      <style>{CSS}</style>
      {showStudents&&isTeacher&&(
        <StudentSelector students={students} activeId={activeId}
          onSelect={id=>{setActiveId(id);setTab('overview');}}
          onAdd={()=>loadStudents(user.id)}
          onClose={()=>setShowStudents(false)}/>
      )}

      {/* HEADER */}
      <div style={{background:'linear-gradient(135deg,#0f172a,#1e3a5f)',padding:'12px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',boxShadow:'0 2px 16px rgba(0,0,0,0.3)',flexShrink:0}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:38,height:38,borderRadius:'50%',background:'linear-gradient(135deg,#c8973e,#f0c060)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:700,color:'#0f172a',fontFamily:"'Playfair Display',serif",boxShadow:'0 2px 8px rgba(200,151,62,0.4)'}}>FB</div>
          <div>
            <div style={{color:'#c8973e',fontSize:9,fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase'}}>Prof. Dr.</div>
            <div style={{color:'#fff',fontSize:16,fontWeight:700,fontFamily:"'Playfair Display',serif",lineHeight:1.1}}>Fabio Busse</div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          {isTeacher&&(
            <button onClick={()=>setShowStudents(true)} className="press"
              style={{background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:10,padding:'8px 12px',color:'#fff',cursor:'pointer',fontSize:13,fontWeight:600,display:'flex',alignItems:'center',gap:6}}>
              <span style={{fontSize:16}}>👥</span>
              <span style={{maxWidth:100,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{activeStudent?.name||'Alunos'}</span>
            </button>
          )}
          <button onClick={logout} className="press"
            style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:10,padding:'8px 10px',color:'#94a3b8',cursor:'pointer',fontSize:12}}>
            Sair
          </button>
        </div>
      </div>

      {/* STUDENT BANNER (when teacher is viewing a student) */}
      {isTeacher&&activeStudent&&(
        <div style={{background:'#1e3a5f',padding:'8px 16px',display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
          <div style={{width:28,height:28,borderRadius:'50%',background:'#c8973e',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,color:'#0f172a'}}>
            {(activeStudent.name||'?').charAt(0).toUpperCase()}
          </div>
          <div style={{flex:1}}>
            <div style={{color:'#fff',fontSize:13,fontWeight:600}}>{activeStudent.name}</div>
            {activeStudent.level&&<div style={{color:'#94a3b8',fontSize:11}}>{activeStudent.level}</div>}
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div style={{flex:1,overflowY:'auto'}}>
        {!activeId?(
          <div style={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:10}}>
            <div style={{fontSize:40}}>👈</div>
            <div style={{fontSize:15,color:'#64748b'}}>Selecione um aluno para começar</div>
          </div>
        ):(
          <>
            {tab==='overview'  &&<OverviewTab  studentId={activeId} studentName={activeStudent?.name}/>}
            {tab==='calendar'  &&<CalendarTab  studentId={activeId} isTeacher={isTeacher}/>}
            {tab==='grammar'   &&<GrammarTab   studentId={activeId} isTeacher={isTeacher}/>}
            {tab==='homework'  &&<HomeworkTab  studentId={activeId} isTeacher={isTeacher}/>}
            {tab==='materials' &&<MaterialsTab studentId={activeId} isTeacher={isTeacher}/>}
            {tab==='videos'    &&<VideosTab    studentId={activeId} isTeacher={isTeacher}/>}
            {tab==='schedule'  &&<ScheduleTab  studentId={activeId} isTeacher={isTeacher}/>}
            {tab==='profile'   &&<ProfileTab   profile={activeStudent} isTeacher={isTeacher} onUpdate={p=>{if(isTeacher)loadStudents(user.id);}}/>}
          </>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div style={{background:'#fff',borderTop:'1px solid #e2e8f0',flexShrink:0,boxShadow:'0 -4px 12px rgba(0,0,0,0.06)'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)'}}>
          {tabsRow1.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} className="press"
              style={{padding:'10px 4px',border:'none',background:'transparent',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
              <span style={{fontSize:20}}>{t.icon}</span>
              <span style={{fontSize:10,fontWeight:600,color:tab===t.id?'#0f172a':'#94a3b8'}}>{t.label}</span>
              {tab===t.id&&<div style={{width:20,height:3,borderRadius:2,background:'#c8973e'}}/>}
            </button>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',borderTop:'1px solid #f1f5f9'}}>
          {tabsRow2.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} className="press"
              style={{padding:'10px 4px',border:'none',background:'transparent',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
              <span style={{fontSize:20}}>{t.icon}</span>
              <span style={{fontSize:10,fontWeight:600,color:tab===t.id?'#0f172a':'#94a3b8'}}>{t.label}</span>
              {tab===t.id&&<div style={{width:20,height:3,borderRadius:2,background:'#c8973e'}}/>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);