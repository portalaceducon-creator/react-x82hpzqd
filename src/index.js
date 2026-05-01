import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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

const SKILL_COLOR = { speaking:"#2563eb", reading:"#059669", listening:"#d97706", writing:"#7c3aed" };
const SKILL_ICON  = { speaking:"🗣️", reading:"📖", listening:"🎧", writing:"✍️" };
const MONTHS = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
const MFULL  = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const WDAYS  = ["D","S","T","Q","Q","S","S"];
const WFULL  = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
const LEVELS = ["Absolute Beginner","Beginner","Elementary","Pre-Intermediate","Intermediate","Upper-Intermediate","Advanced","Proficiency"];
const LESSON_STATUS = {
  attended:          { label:"Realizada",     color:"#059669", bg:"#d1fae5", icon:"✓" },
  cancelled_student: { label:"Aluno cancelou",color:"#d97706", bg:"#fef3c7", icon:"!" },
  cancelled_late:    { label:"Cancelou <24h", color:"#dc2626", bg:"#fee2e2", icon:"!!" },
  cancelled_teacher: { label:"Prof. cancelou",color:"#7c3aed", bg:"#ede9fe", icon:"P" },
  no_show:           { label:"Não apareceu",  color:"#dc2626", bg:"#fee2e2", icon:"✗" },
};
const TASK_STATUS = {
  done:     { label:"Feitas",       color:"#059669", icon:"✓" },
  partial:  { label:"Parcialmente", color:"#d97706", icon:"◑" },
  not_done: { label:"Não fez",      color:"#dc2626", icon:"✗" },
  none:     { label:"Sem tarefa",   color:"#94a3b8", icon:"—" },
};

const pad = n => String(n).padStart(2,"0");
const dateStr = (y,m,d) => `${y}-${pad(m+1)}-${pad(d)}`;
const today = () => { const n=new Date(); return dateStr(n.getFullYear(),n.getMonth(),n.getDate()); };
function endTime(start,dur){ const [h,m]=start.split(":").map(Number); const e=new Date(2000,0,1,h,m+dur); return `${pad(e.getHours())}:${pad(e.getMinutes())}`; }
function getYouTubeId(url){ const r=url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/); return r?r[1]:null; }

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

:root {
  --bg: #f0f2f7;
  --surface: #ffffff;
  --surface2: #f8fafc;
  --border: #e4e8ef;
  --navy: #0d1e35;
  --navy2: #162d4a;
  --navy3: #1e3a5f;
  --gold: #b8873a;
  --gold2: #d4a855;
  --blue: #1d4ed8;
  --blue2: #2563eb;
  --green: #059669;
  --red: #dc2626;
  --amber: #d97706;
  --purple: #7c3aed;
  --text: #0d1e35;
  --text2: #4a5568;
  --text3: #94a3b8;
  --shadow: 0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06);
}

*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
html{font-size:16px;-webkit-text-size-adjust:100%}
body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--text);min-height:100vh}
input,select,textarea,button{font-family:'Plus Jakarta Sans',sans-serif;font-size:16px}
input:focus,select:focus,textarea:focus{outline:2px solid var(--blue2);outline-offset:0}
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:2px}
.fade{animation:fi 0.2s ease}
@keyframes fi{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.press{transition:transform 0.12s,opacity 0.12s;cursor:pointer}
.press:active{transform:scale(0.97);opacity:0.88}
.card{background:var(--surface);border-radius:14px;padding:18px;box-shadow:var(--shadow);border:1px solid var(--border)}
.label{font-size:11px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px}
.input-base{width:100%;border:1.5px solid var(--border);border-radius:10px;padding:13px 14px;font-size:15px;color:var(--text);background:var(--surface);transition:border-color 0.15s}
.input-base:focus{border-color:var(--blue2)}
.btn-primary{border:none;border-radius:11px;background:var(--navy);color:#fff;font-size:15px;font-weight:700;cursor:pointer;padding:14px;transition:background 0.15s,transform 0.1s}
.btn-primary:active{background:var(--navy2);transform:scale(0.98)}
.btn-ghost{border:1.5px solid var(--border);border-radius:11px;background:var(--surface);color:var(--text2);font-size:14px;font-weight:600;cursor:pointer;padding:12px;transition:border-color 0.15s}
.btn-ghost:hover{border-color:#94a3b8}
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
    <div style={{minHeight:'100vh',background:'linear-gradient(150deg,#0d1e35 0%,#162d4a 50%,#0d1e35 100%)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'24px'}}>
      <style>{CSS}</style>
      <div style={{width:'100%',maxWidth:400}}>
        <div style={{textAlign:'center',marginBottom:40}}>
          <div style={{width:68,height:68,borderRadius:18,background:'linear-gradient(135deg,#b8873a,#d4a855)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,fontWeight:700,color:'#fff',margin:'0 auto 20px',fontFamily:"'DM Serif Display',serif",boxShadow:'0 8px 24px rgba(184,135,58,0.35)'}}>FB</div>
          <div style={{color:'#d4a855',fontSize:11,fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',marginBottom:6}}>Prof. Dr.</div>
          <div style={{color:'#fff',fontSize:30,fontWeight:400,fontFamily:"'DM Serif Display',serif",lineHeight:1.2,letterSpacing:'-0.02em'}}>Fabio Busse</div>
          <div style={{color:'#64748b',fontSize:13,marginTop:6,fontWeight:500}}>Inglês Profissional · Curitiba, PR</div>
        </div>

        <div style={{background:'rgba(255,255,255,0.05)',borderRadius:20,padding:28,border:'1px solid rgba(255,255,255,0.09)'}}>
          <div style={{display:'flex',background:'rgba(0,0,0,0.25)',borderRadius:12,padding:4,marginBottom:24,gap:4}}>
            {[['login','Entrar'],['register','Cadastrar']].map(([k,l])=>(
              <button key={k} onClick={()=>setMode(k)} style={{flex:1,padding:'10px',borderRadius:9,border:'none',cursor:'pointer',fontWeight:700,fontSize:14,transition:'all 0.2s',fontFamily:"'Plus Jakarta Sans',sans-serif",
                background:mode===k?'#ffffff':' transparent',color:mode===k?'#0d1e35':'#64748b'}}>
                {l}
              </button>
            ))}
          </div>

          {mode==='register'&&(
            <div style={{marginBottom:14}}>
              <div className="label" style={{color:'#64748b'}}>Nome completo</div>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Seu nome" className="input-base"
                style={{background:'rgba(255,255,255,0.07)',border:'1.5px solid rgba(255,255,255,0.1)',color:'#fff'}}/>
            </div>
          )}

          <div style={{marginBottom:14}}>
            <div className="label" style={{color:'#64748b'}}>Email</div>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@email.com" className="input-base"
              style={{background:'rgba(255,255,255,0.07)',border:'1.5px solid rgba(255,255,255,0.1)',color:'#fff'}}/>
          </div>

          <div style={{marginBottom:20}}>
            <div className="label" style={{color:'#64748b'}}>Senha</div>
            <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" className="input-base"
              onKeyDown={e=>e.key==='Enter'&&submit()}
              style={{background:'rgba(255,255,255,0.07)',border:'1.5px solid rgba(255,255,255,0.1)',color:'#fff'}}/>
          </div>

          {err&&<div style={{background:'rgba(220,38,38,0.15)',border:'1px solid rgba(220,38,38,0.3)',borderRadius:10,padding:'11px 14px',fontSize:13,color:'#fca5a5',marginBottom:16,fontWeight:500}}>{err}</div>}

          <button onClick={submit} disabled={loading} className="press" style={{width:'100%',padding:'15px',borderRadius:12,border:'none',background:'linear-gradient(135deg,#b8873a,#d4a855)',color:'#fff',fontSize:15,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif",boxShadow:'0 4px 16px rgba(184,135,58,0.3)'}}>
            {loading ? 'Aguarde…' : mode==='login' ? 'Entrar' : 'Criar conta'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, color, sub }) {
  return (
    <div className="card press" style={{padding:'16px 14px',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:-8,right:-8,width:52,height:52,borderRadius:'50%',background:color+'18'}}/>
      <div style={{fontSize:20,marginBottom:8}}>{icon}</div>
      <div style={{color,fontSize:22,fontWeight:800,lineHeight:1,letterSpacing:'-0.02em'}}>{value}</div>
      <div style={{color:'var(--text3)',fontSize:11,fontWeight:600,marginTop:4,textTransform:'uppercase',letterSpacing:'0.06em'}}>{label}</div>
    </div>
  );
}

// ─── OVERVIEW ─────────────────────────────────────────────────────────────────
function OverviewTab({ studentId }) {
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
  const rateColor = rate>=80?'#059669':rate>=60?'#d97706':'#dc2626';

  const now = new Date();
  const monthly = Array.from({length:6},(_,i)=>{
    const d = new Date(now.getFullYear(),now.getMonth()-(5-i),1);
    const ms = `${d.getFullYear()}-${pad(d.getMonth()+1)}`;
    const ml = lessons.filter(l=>l.lesson_date.startsWith(ms));
    return { m:MONTHS[d.getMonth()], R:ml.filter(l=>l.status==='attended').length, C:ml.filter(l=>['cancelled_student','cancelled_late','no_show'].includes(l.status)).length };
  });

  const radarData = Object.entries(SKILL_SUBS).map(([sk,items])=>{
    const sd = skills.filter(s=>s.skill===sk);
    const vals = items.map((_,i)=>sd.find(s=>s.sub_index===i)?.value??1);
    return { s:sk.charAt(0).toUpperCase()+sk.slice(1), v:Math.round(vals.reduce((a,b)=>a+b,0)/vals.length*20) };
  });

  const gramProg = [
    {n:'Atingido',v:achieved,c:'#059669'},
    {n:'Em desenvolvimento',v:inProg,c:'#d97706'},
    {n:'Não atingido',v:grammar.filter(g=>g.status==='not_achieved').length,c:'#dc2626'},
    {n:'Não iniciado',v:GRAMMAR_TOPICS.length-grammar.filter(g=>g.status).length,c:'#e2e8f0'},
  ];

  return (
    <div className="fade" style={{padding:'16px',paddingBottom:90}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
        <StatCard icon="📚" label="Total"        value={lessons.length} color="#1d4ed8"/>
        <StatCard icon="✅" label="Realizadas"   value={attended}       color="#059669"/>
        <StatCard icon="📊" label="Presença"     value={rate+'%'}       color={rateColor}/>
        <StatCard icon="🎯" label="Gramática"    value={achieved+'/'+GRAMMAR_TOPICS.length} color="#b8873a"/>
        <StatCard icon="📝" label="Tarefas"      value={tasksDone}      color="#7c3aed"/>
        <StatCard icon="🔄" label="Em progresso" value={inProg}         color="#d97706"/>
      </div>

      <div className="card" style={{marginBottom:12}}>
        <div className="label">Aulas por mês</div>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={monthly} margin={{top:0,right:0,left:-24,bottom:0}}>
            <XAxis dataKey="m" tick={{fontSize:11,fill:'#94a3b8',fontFamily:'Plus Jakarta Sans'}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:11,fill:'#94a3b8'}} axisLine={false} tickLine={false} allowDecimals={false}/>
            <Tooltip contentStyle={{fontSize:12,borderRadius:10,border:'1px solid #e4e8ef',boxShadow:'0 4px 12px rgba(0,0,0,0.08)',fontFamily:'Plus Jakarta Sans'}}/>
            <Bar dataKey="R" name="Realizadas" fill="#1d4ed8" radius={[5,5,0,0]}/>
            <Bar dataKey="C" name="Canceladas" fill="#fbbf24" radius={[5,5,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card" style={{marginBottom:12}}>
        <div className="label">Habilidades</div>
        <ResponsiveContainer width="100%" height={170}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#e4e8ef"/>
            <PolarAngleAxis dataKey="s" tick={{fontSize:12,fill:'#4a5568',fontFamily:'Plus Jakarta Sans'}}/>
            <Radar dataKey="v" stroke="#b8873a" fill="#b8873a" fillOpacity={0.15} strokeWidth={2}/>
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <div className="label">Progresso Gramática</div>
        {gramProg.map(g=>(
          <div key={g.n} style={{marginBottom:14}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:5}}>
              <span style={{color:'var(--text2)',fontWeight:600}}>{g.n}</span>
              <span style={{color:g.c,fontWeight:700}}>{g.v}</span>
            </div>
            <div style={{height:7,borderRadius:4,background:'#f1f5f9',overflow:'hidden'}}>
              <div style={{height:'100%',borderRadius:4,background:g.c,width:`${Math.max((g.v/GRAMMAR_TOPICS.length)*100,g.v>0?2:0)}%`,transition:'width 0.6s ease'}}/>
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
  const [modal, setModal] = useState(null);
  const y = cur.getFullYear(), m = cur.getMonth();
  const todayStr = today();

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
    <div className="fade" style={{padding:16,paddingBottom:90}}>
      {modal&&isTeacher&&<LessonModal date={modal} lesson={lessons[modal]} onSave={saveLesson} onDelete={deleteLesson} onClose={()=>setModal(null)}/>}

      <div className="card" style={{overflow:'hidden',padding:0,marginBottom:12}}>
        <div style={{background:'linear-gradient(135deg,var(--navy),var(--navy3))',padding:'16px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <button onClick={()=>setCur(new Date(y,m-1,1))} className="press" style={{background:'rgba(255,255,255,0.1)',border:'none',color:'#fff',width:36,height:36,borderRadius:10,fontSize:18,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>‹</button>
          <div style={{textAlign:'center'}}>
            <div style={{color:'var(--gold2)',fontSize:11,fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase'}}>{y}</div>
            <div style={{color:'#fff',fontSize:20,fontWeight:400,fontFamily:"'DM Serif Display',serif"}}>{MFULL[m]}</div>
          </div>
          <button onClick={()=>setCur(new Date(y,m+1,1))} className="press" style={{background:'rgba(255,255,255,0.1)',border:'none',color:'#fff',width:36,height:36,borderRadius:10,fontSize:18,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>›</button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',background:'#f8fafc',borderBottom:'1px solid var(--border)'}}>
          {WDAYS.map((d,i)=><div key={i} style={{padding:'8px 2px',textAlign:'center',fontSize:11,fontWeight:700,color:'var(--text3)'}}>{d}</div>)}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:'1px',background:'var(--border)'}}>
          {cells.map((day,i)=>{
            if(!day) return <div key={i} style={{background:'#fafafa',minHeight:52}}/>;
            const ds = dateStr(y,m,day);
            const les = lessons[ds];
            const sched = isScheduled(day);
            const isToday = ds===todayStr;
            const sc = les?LESSON_STATUS[les.status]:null;
            return (
              <div key={day} className="press" onClick={()=>isTeacher&&setModal(ds)}
                style={{background:isToday?'#eff6ff':'#fff',minHeight:52,padding:'6px 2px',border:isToday?'2px solid var(--blue2)':'none',position:'relative',cursor:isTeacher?'pointer':'default'}}>
                <div style={{width:24,height:24,borderRadius:6,background:isToday?'var(--blue2)':sched?'#eff6ff':'transparent',color:isToday?'#fff':sched?'var(--blue2)':'var(--text2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:isToday||sched?700:400,margin:'0 auto 2px'}}>
                  {day}
                </div>
                {les&&sc&&(
                  <div style={{textAlign:'center',width:18,height:18,borderRadius:'50%',background:sc.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,color:'#fff',fontWeight:700,margin:'0 auto'}}>
                    {sc.icon}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
        {Object.entries(LESSON_STATUS).map(([,c])=>(
          <div key={c.label} style={{display:'flex',alignItems:'center',gap:5,background:'var(--surface)',borderRadius:8,padding:'5px 10px',fontSize:12,color:'var(--text2)',border:'1px solid var(--border)'}}>
            <div style={{width:8,height:8,borderRadius:'50%',background:c.color,flexShrink:0}}/>
            {c.label}
          </div>
        ))}
      </div>
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
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{position:'fixed',inset:0,background:'rgba(13,30,53,0.7)',display:'flex',alignItems:'flex-end',justifyContent:'center',zIndex:1000,backdropFilter:'blur(4px)'}}>
      <div style={{background:'#fff',borderRadius:'20px 20px 0 0',padding:24,width:'100%',maxWidth:540,maxHeight:'90vh',overflowY:'auto'}}>
        <div style={{width:40,height:4,borderRadius:2,background:'var(--border)',margin:'0 auto 20px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <div>
            <div style={{fontSize:11,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:3,fontWeight:700}}>Registrar Aula</div>
            <div style={{fontSize:17,fontWeight:700,color:'var(--text)',textTransform:'capitalize'}}>{label}</div>
          </div>
          <button onClick={onClose} style={{background:'var(--surface2)',border:'none',borderRadius:10,width:36,height:36,fontSize:20,cursor:'pointer',color:'var(--text3)'}}>×</button>
        </div>

        <div style={{marginBottom:18}}>
          <div className="label">Status da aula</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            {Object.entries(LESSON_STATUS).map(([k,c])=>(
              <div key={k} className="press" onClick={()=>setStatus(k)}
                style={{background:status===k?c.bg:'var(--surface2)',border:`2px solid ${status===k?c.color:'transparent'}`,borderRadius:11,padding:'11px 10px',display:'flex',alignItems:'center',gap:8,cursor:'pointer'}}>
                <div style={{width:8,height:8,borderRadius:'50%',background:c.color,flexShrink:0}}/>
                <span style={{fontSize:13,fontWeight:600,color:status===k?c.color:'var(--text2)'}}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{marginBottom:18}}>
          <div className="label">Tarefas de casa</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            {Object.entries(TASK_STATUS).map(([k,c])=>(
              <div key={k} className="press" onClick={()=>setTasks(k)}
                style={{background:tasks===k?'#eff6ff':'var(--surface2)',border:`2px solid ${tasks===k?'var(--blue2)':'transparent'}`,borderRadius:11,padding:'11px',display:'flex',alignItems:'center',gap:8,cursor:'pointer'}}>
                <span style={{fontSize:15,color:c.color}}>{c.icon}</span>
                <span style={{fontSize:13,fontWeight:tasks===k?700:500,color:tasks===k?'var(--navy)':'var(--text2)'}}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{marginBottom:20}}>
          <div className="label">Observações</div>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Notas sobre esta aula…" className="input-base"
            style={{resize:'vertical',minHeight:80}}/>
        </div>

        <div style={{display:'flex',gap:8}}>
          {lesson&&<button onClick={()=>{onDelete(date);onClose();}} className="press" style={{padding:'13px 14px',borderRadius:11,border:'1.5px solid #fee2e2',background:'#fff',color:'#dc2626',cursor:'pointer',fontSize:14,fontWeight:700}}>Excluir</button>}
          <button onClick={onClose} className="btn-ghost" style={{flex:1}}>Cancelar</button>
          <button onClick={()=>onSave(date,{status,tasks,notes})} className="press" style={{flex:2,padding:'13px',borderRadius:11,border:'none',background:'var(--navy)',color:'#fff',cursor:'pointer',fontSize:14,fontWeight:700}}>Salvar</button>
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
    achieved:    { label:'Atingido',     color:'#059669', bg:'#d1fae5' },
    in_progress: { label:'Em progresso', color:'#d97706', bg:'#fef3c7' },
    not_achieved:{ label:'Não atingido', color:'#dc2626', bg:'#fee2e2' },
  };

  const cats = [...new Set(GRAMMAR_TOPICS.map(t=>t.cat))];
  const filtered = GRAMMAR_TOPICS.filter(t=>!search||t.name.toLowerCase().includes(search.toLowerCase())||t.cat.toLowerCase().includes(search.toLowerCase()));
  const byCat = cats.reduce((a,c)=>({...a,[c]:filtered.filter(t=>t.cat===c)}),{});

  return (
    <div className="fade" style={{paddingBottom:90}}>
      <div style={{background:'var(--surface)',borderBottom:'1px solid var(--border)',padding:'12px 16px',position:'sticky',top:0,zIndex:10}}>
        <div style={{display:'flex',background:'var(--bg)',borderRadius:12,padding:4,gap:4,marginBottom:sub==='grammar'?10:0}}>
          {[['grammar','Gramática'],['skills','Habilidades']].map(([k,l])=>(
            <button key={k} onClick={()=>setSub(k)} className="press"
              style={{flex:1,padding:'10px',borderRadius:9,fontSize:14,fontWeight:700,border:'none',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",
                background:sub===k?'var(--navy)':'transparent',color:sub===k?'#fff':'var(--text3)'}}>
              {l}
            </button>
          ))}
        </div>
        {sub==='grammar'&&(
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar tópico…" className="input-base"
            style={{fontSize:14}}/>
        )}
      </div>

      {sub==='grammar'&&(
        <div style={{padding:'12px 16px'}}>
          {cats.map(cat=>{
            const ts = byCat[cat]; if(!ts||!ts.length) return null;
            return (
              <div key={cat} className="card" style={{marginBottom:10,padding:0,overflow:'hidden'}}>
                <div style={{background:'var(--navy)',padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontSize:13,fontWeight:700,color:'#fff'}}>{cat}</span>
                  <span style={{fontSize:11,color:'var(--gold2)',fontWeight:600}}>{ts.length} tópicos</span>
                </div>
                {ts.map((t,i)=>{
                  const st = grammar[t.id]||'';
                  return (
                    <div key={t.id} style={{padding:'13px 16px',borderBottom:i<ts.length-1?'1px solid var(--bg)':'none'}}>
                      <div style={{fontSize:14,color:'var(--text)',fontWeight:500,marginBottom:8}}>{t.name}</div>
                      <div style={{display:'flex',gap:6}}>
                        {Object.entries(statusConfig).map(([k,c])=>(
                          <button key={k} onClick={()=>setGrammarStatus(t.id,st===k?'':k)} disabled={!isTeacher}
                            className="press"
                            style={{flex:1,border:`2px solid ${st===k?c.color:'var(--border)'}`,borderRadius:8,padding:'7px 4px',cursor:isTeacher?'pointer':'default',
                              background:st===k?c.bg:'var(--surface2)',fontSize:11,fontWeight:st===k?700:500,color:st===k?c.color:'var(--text3)',textAlign:'center',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
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
              <div style={{background:SKILL_COLOR[sk],padding:'13px 18px',display:'flex',alignItems:'center',gap:10}}>
                <span style={{fontSize:20}}>{SKILL_ICON[sk]}</span>
                <span style={{color:'#fff',fontWeight:700,fontSize:16,textTransform:'capitalize'}}>{sk}</span>
              </div>
              {items.map((item,idx)=>{
                const val = skills[sk]?.[idx]??1;
                return (
                  <div key={item} style={{padding:'14px 18px',borderBottom:'1px solid var(--bg)'}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                      <span style={{fontSize:14,color:'var(--text)',fontWeight:500}}>{item}</span>
                      <span style={{fontSize:14,fontWeight:700,color:SKILL_COLOR[sk]}}>{val}/5</span>
                    </div>
                    <div style={{display:'flex',gap:5}}>
                      {[1,2,3,4,5].map(n=>(
                        <button key={n} onClick={()=>setSkillValue(sk,idx,n)} disabled={!isTeacher}
                          className="press"
                          style={{flex:1,height:30,borderRadius:6,border:'none',cursor:isTeacher?'pointer':'default',
                            background:n<=val?SKILL_COLOR[sk]:'var(--bg)',transition:'background 0.15s'}}/>
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
    <div className="fade" style={{padding:16,paddingBottom:90}}>
      {isTeacher&&(
        <div style={{marginBottom:14}}>
          {!adding?(
            <button onClick={()=>setAdding(true)} className="press"
              style={{width:'100%',padding:15,borderRadius:12,border:'2px dashed var(--gold)',background:'rgba(184,135,58,0.04)',color:'var(--gold)',fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
              + Adicionar Tarefa
            </button>
          ):(
            <div className="card">
              <div className="label">Nova Tarefa</div>
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título da tarefa *" className="input-base" style={{marginBottom:10}}/>
              <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Descrição (opcional)" className="input-base"
                style={{resize:'vertical',minHeight:70,marginBottom:10}}/>
              <input type="date" value={due} onChange={e=>setDue(e.target.value)} className="input-base" style={{marginBottom:14}}/>
              <div style={{display:'flex',gap:8}}>
                <button onClick={()=>setAdding(false)} className="btn-ghost" style={{flex:1}}>Cancelar</button>
                <button onClick={add} className="press" style={{flex:2,padding:'13px',borderRadius:11,border:'none',background:'var(--navy)',color:'#fff',cursor:'pointer',fontSize:14,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Salvar</button>
              </div>
            </div>
          )}
        </div>
      )}

      {items.length===0&&(
        <div style={{textAlign:'center',padding:'56px 0',color:'var(--text3)'}}>
          <div style={{fontSize:42,marginBottom:10}}>📝</div>
          <div style={{fontSize:14,fontWeight:500}}>Nenhuma tarefa ainda</div>
        </div>
      )}

      {pending.length>0&&(
        <div className="card" style={{marginBottom:12,padding:0,overflow:'hidden'}}>
          <div style={{background:'var(--navy)',padding:'10px 16px'}}>
            <span style={{fontSize:13,fontWeight:700,color:'#fff'}}>Pendentes · {pending.length}</span>
          </div>
          {pending.map((item,i)=>(
            <div key={item.id} style={{padding:'14px 16px',borderBottom:i<pending.length-1?'1px solid var(--bg)':'none',display:'flex',alignItems:'flex-start',gap:12}}>
              <button onClick={()=>toggle(item.id,item.done)} className="press"
                style={{width:22,height:22,borderRadius:6,border:'2px solid var(--border)',background:'var(--surface)',cursor:'pointer',flexShrink:0,marginTop:2}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:600,color:'var(--text)',marginBottom:2}}>{item.title}</div>
                {item.description&&<div style={{fontSize:13,color:'var(--text2)',marginBottom:2}}>{item.description}</div>}
                {item.due_date&&<div style={{fontSize:12,color:'var(--gold)',fontWeight:600}}>Até {new Date(item.due_date+'T12:00').toLocaleDateString('pt-BR')}</div>}
              </div>
              {isTeacher&&<button onClick={()=>remove(item.id)} className="press" style={{background:'var(--bg)',border:'none',borderRadius:8,padding:'6px 9px',color:'var(--text3)',cursor:'pointer',fontSize:16}}>×</button>}
            </div>
          ))}
        </div>
      )}

      {done.length>0&&(
        <div className="card" style={{padding:0,overflow:'hidden',opacity:0.65}}>
          <div style={{background:'var(--bg)',padding:'10px 16px',borderBottom:'1px solid var(--border)'}}>
            <span style={{fontSize:13,fontWeight:700,color:'var(--text3)'}}>Concluídas · {done.length}</span>
          </div>
          {done.map((item,i)=>(
            <div key={item.id} style={{padding:'12px 16px',borderBottom:i<done.length-1?'1px solid var(--bg)':'none',display:'flex',alignItems:'center',gap:12}}>
              <button onClick={()=>toggle(item.id,item.done)} className="press"
                style={{width:22,height:22,borderRadius:6,border:'none',background:'var(--green)',cursor:'pointer',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:11,fontWeight:700}}>✓</button>
              <div style={{flex:1,textDecoration:'line-through',color:'var(--text3)',fontSize:14}}>{item.title}</div>
              {isTeacher&&<button onClick={()=>remove(item.id)} className="press" style={{background:'var(--bg)',border:'none',borderRadius:8,padding:'6px 9px',color:'var(--text3)',cursor:'pointer',fontSize:16}}>×</button>}
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
  const remove = async (id) => { await supabase.from('materials').delete().eq('id',id); load(); };

  const typeIcons  = { link:'🔗', pdf:'📄', audio:'🎵', exercise:'📋', book:'📚' };
  const typeColors = { link:'#2563eb', pdf:'#dc2626', audio:'#d97706', exercise:'#059669', book:'#7c3aed' };

  return (
    <div className="fade" style={{padding:16,paddingBottom:90}}>
      {isTeacher&&(
        <div style={{marginBottom:14}}>
          {!adding?(
            <button onClick={()=>setAdding(true)} className="press"
              style={{width:'100%',padding:15,borderRadius:12,border:'2px dashed #2563eb',background:'rgba(37,99,235,0.04)',color:'#2563eb',fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
              + Adicionar Material
            </button>
          ):(
            <div className="card">
              <div className="label">Novo Material</div>
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título do material *" className="input-base" style={{marginBottom:10}}/>
              <select value={type} onChange={e=>setType(e.target.value)} className="input-base" style={{marginBottom:10}}>
                <option value="link">🔗 Link</option>
                <option value="pdf">📄 PDF</option>
                <option value="audio">🎵 Áudio</option>
                <option value="exercise">📋 Exercício</option>
                <option value="book">📚 Livro</option>
              </select>
              <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="URL (opcional)" className="input-base" style={{marginBottom:10}}/>
              <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Descrição" className="input-base"
                style={{resize:'vertical',minHeight:60,marginBottom:14}}/>
              <div style={{display:'flex',gap:8}}>
                <button onClick={()=>setAdding(false)} className="btn-ghost" style={{flex:1}}>Cancelar</button>
                <button onClick={add} className="press" style={{flex:2,padding:'13px',borderRadius:11,border:'none',background:'var(--navy)',color:'#fff',cursor:'pointer',fontSize:14,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Salvar</button>
              </div>
            </div>
          )}
        </div>
      )}

      {items.length===0&&(
        <div style={{textAlign:'center',padding:'56px 0',color:'var(--text3)'}}>
          <div style={{fontSize:42,marginBottom:10}}>📚</div>
          <div style={{fontSize:14,fontWeight:500}}>Nenhum material ainda</div>
        </div>
      )}

      {items.map(item=>(
        <div key={item.id} className="card press" style={{marginBottom:10,display:'flex',alignItems:'center',gap:14}}>
          <div style={{width:46,height:46,borderRadius:12,background:`${typeColors[item.type]||'#2563eb'}12`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>
            {typeIcons[item.type]||'📎'}
          </div>
          <div style={{flex:1,minWidth:0}} onClick={()=>item.url&&window.open(item.url,'_blank')}>
            <div style={{fontSize:15,fontWeight:700,color:'var(--text)',marginBottom:2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.title}</div>
            {item.description&&<div style={{fontSize:12,color:'var(--text2)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.description}</div>}
            <div style={{fontSize:10,color:typeColors[item.type]||'var(--text3)',fontWeight:700,textTransform:'uppercase',marginTop:3,letterSpacing:'0.06em'}}>{item.type}</div>
          </div>
          {isTeacher&&<button onClick={()=>remove(item.id)} className="press" style={{background:'#fee2e2',border:'none',borderRadius:8,padding:'7px 10px',color:'#dc2626',cursor:'pointer',fontSize:14,fontWeight:700}}>×</button>}
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
  const remove = async (id) => { await supabase.from('videos').delete().eq('id',id); load(); };

  return (
    <div className="fade" style={{padding:16,paddingBottom:90}}>
      {isTeacher&&(
        <div style={{marginBottom:14}}>
          {!adding?(
            <button onClick={()=>setAdding(true)} className="press"
              style={{width:'100%',padding:15,borderRadius:12,border:'2px dashed #dc2626',background:'rgba(220,38,38,0.04)',color:'#dc2626',fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
              + Adicionar Vídeo
            </button>
          ):(
            <div className="card">
              <div className="label">Novo Vídeo</div>
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título do vídeo *" className="input-base" style={{marginBottom:10}}/>
              <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="URL do YouTube *" className="input-base" style={{marginBottom:10}}/>
              <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Descrição" className="input-base"
                style={{resize:'vertical',minHeight:60,marginBottom:14}}/>
              <div style={{display:'flex',gap:8}}>
                <button onClick={()=>setAdding(false)} className="btn-ghost" style={{flex:1}}>Cancelar</button>
                <button onClick={add} className="press" style={{flex:2,padding:'13px',borderRadius:11,border:'none',background:'var(--navy)',color:'#fff',cursor:'pointer',fontSize:14,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Salvar</button>
              </div>
            </div>
          )}
        </div>
      )}

      {items.length===0&&(
        <div style={{textAlign:'center',padding:'56px 0',color:'var(--text3)'}}>
          <div style={{fontSize:42,marginBottom:10}}>🎬</div>
          <div style={{fontSize:14,fontWeight:500}}>Nenhum vídeo ainda</div>
        </div>
      )}

      {items.map(item=>{
        const ytId = getYouTubeId(item.url);
        return (
          <div key={item.id} className="card" style={{marginBottom:14,padding:0,overflow:'hidden'}}>
            {ytId?(
              <div style={{position:'relative',paddingBottom:'56.25%',background:'#000'}}>
                <iframe src={`https://www.youtube.com/embed/${ytId}`} title={item.title}
                  style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',border:'none'}} allowFullScreen/>
              </div>
            ):(
              <div className="press" onClick={()=>window.open(item.url,'_blank')} style={{background:'#fff0f0',padding:'24px',textAlign:'center',cursor:'pointer'}}>
                <div style={{fontSize:32}}>▶️</div>
              </div>
            )}
            <div style={{padding:'14px 16px',display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:8}}>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:700,color:'var(--text)',marginBottom:3}}>{item.title}</div>
                {item.description&&<div style={{fontSize:13,color:'var(--text2)'}}>{item.description}</div>}
              </div>
              {isTeacher&&<button onClick={()=>remove(item.id)} className="press" style={{background:'#fee2e2',border:'none',borderRadius:8,padding:'7px 10px',color:'#dc2626',cursor:'pointer',fontSize:14,fontWeight:700}}>×</button>}
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
    <div className="fade" style={{padding:16,paddingBottom:90}}>
      <div className="card" style={{marginBottom:14}}>
        <div className="label">Horários fixos de aula</div>
        {slots.length===0&&<div style={{textAlign:'center',padding:'24px 0',color:'var(--text3)',fontSize:14,fontWeight:500}}>Nenhum horário configurado</div>}
        {slots.map((sl,i)=>(
          <div key={i} style={{border:'1.5px solid var(--border)',borderRadius:12,padding:14,marginBottom:10}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:10}}>
              {[
                {label:'Dia', content:<select value={sl.day_of_week??1} onChange={e=>upd(i,'day_of_week',Number(e.target.value))} disabled={!isTeacher} style={{width:'100%',border:'1.5px solid var(--border)',borderRadius:8,padding:'9px 6px',fontSize:13,background:'var(--surface)',color:'var(--text)',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{WFULL.map((d,idx)=><option key={idx} value={idx}>{d.slice(0,3)}</option>)}</select>},
                {label:'Início', content:<input type="time" value={sl.start_time??'10:00'} onChange={e=>upd(i,'start_time',e.target.value)} disabled={!isTeacher} style={{width:'100%',border:'1.5px solid var(--border)',borderRadius:8,padding:'9px 6px',fontSize:13,color:'var(--text)',fontFamily:"'Plus Jakarta Sans',sans-serif"}}/>},
                {label:'Duração', content:<select value={sl.duration??60} onChange={e=>upd(i,'duration',Number(e.target.value))} disabled={!isTeacher} style={{width:'100%',border:'1.5px solid var(--border)',borderRadius:8,padding:'9px 6px',fontSize:13,background:'var(--surface)',color:'var(--text)',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{[30,45,60,75,90,120].map(d=><option key={d} value={d}>{d}min</option>)}</select>},
              ].map(({label,content})=>(
                <div key={label}>
                  <div className="label" style={{marginBottom:4}}>{label}</div>
                  {content}
                </div>
              ))}
            </div>
            <div style={{background:'#eff6ff',borderRadius:9,padding:'9px 12px',fontSize:13,color:'var(--blue)',fontWeight:600,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span>{WFULL[sl.day_of_week??1]} · {sl.start_time??'10:00'} – {endTime(sl.start_time??'10:00',sl.duration??60)}</span>
              {isTeacher&&<button onClick={()=>rm(i)} className="press" style={{background:'#fee2e2',border:'none',borderRadius:6,padding:'4px 8px',color:'#dc2626',cursor:'pointer',fontSize:12,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Remover</button>}
            </div>
          </div>
        ))}
        {isTeacher&&(
          <div style={{display:'flex',gap:8,marginTop:4}}>
            <button onClick={add} className="btn-ghost" style={{flex:1}}>+ Adicionar</button>
            <button onClick={save} className="press" style={{flex:1,padding:'12px',border:'none',borderRadius:11,background:'var(--navy)',color:'#fff',cursor:'pointer',fontSize:14,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{saved?'✓ Salvo!':'Salvar'}</button>
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
    <div className="fade" style={{padding:16,paddingBottom:90}}>
      <div style={{textAlign:'center',padding:'28px 0 20px',marginBottom:4}}>
        <div style={{width:72,height:72,borderRadius:20,background:'linear-gradient(135deg,var(--navy),var(--navy3))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,fontWeight:400,color:'var(--gold2)',margin:'0 auto 14px',fontFamily:"'DM Serif Display',serif"}}>
          {(f.name||f.email||'?').charAt(0).toUpperCase()}
        </div>
        <div style={{fontSize:20,fontWeight:700,color:'var(--text)',letterSpacing:'-0.02em'}}>{f.name||'Sem nome'}</div>
        <div style={{fontSize:13,color:'var(--text3)',marginTop:2}}>{f.email}</div>
        {f.level&&<div style={{display:'inline-block',background:'#eff6ff',border:'1.5px solid #bfdbfe',color:'var(--blue)',fontSize:12,padding:'4px 12px',borderRadius:20,marginTop:8,fontWeight:700}}>{f.level}</div>}
      </div>

      <div className="card">
        {[{k:'name',label:'Nome completo',ph:'Nome do aluno',type:'text'},{k:'phone',label:'Telefone / WhatsApp',ph:'(41) 9xxxx-xxxx',type:'text'}].map(({k,label,ph,type})=>(
          <div key={k} style={{marginBottom:14}}>
            <div className="label">{label}</div>
            <input type={type} value={f[k]||''} onChange={e=>upd(k,e.target.value)} placeholder={ph} disabled={!isTeacher} className="input-base"
              style={{background:isTeacher?'var(--surface)':'var(--surface2)',color:'var(--text)'}}/>
          </div>
        ))}
        <div style={{marginBottom:14}}>
          <div className="label">Data de início</div>
          <input type="date" value={f.start_date||''} onChange={e=>upd('start_date',e.target.value)} disabled={!isTeacher} className="input-base"
            style={{background:isTeacher?'var(--surface)':'var(--surface2)'}}/>
        </div>
        <div style={{marginBottom:14}}>
          <div className="label">Nível</div>
          <select value={f.level||''} onChange={e=>upd('level',e.target.value)} disabled={!isTeacher} className="input-base"
            style={{background:isTeacher?'var(--surface)':'var(--surface2)'}}>
            <option value="">Selecione…</option>
            {LEVELS.map(l=><option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div style={{marginBottom:14}}>
          <div className="label">Objetivo</div>
          <input value={f.goal||''} onChange={e=>upd('goal',e.target.value)} placeholder="Ex: Negócios, Viagens, Cambridge…" disabled={!isTeacher} className="input-base"
            style={{background:isTeacher?'var(--surface)':'var(--surface2)'}}/>
        </div>
        <div style={{marginBottom:isTeacher?20:4}}>
          <div className="label">Observações</div>
          <textarea value={f.notes||''} onChange={e=>upd('notes',e.target.value)} placeholder="Informações importantes…" disabled={!isTeacher} className="input-base"
            style={{minHeight:80,resize:'vertical',background:isTeacher?'var(--surface)':'var(--surface2)'}}/>
        </div>
        {isTeacher&&(
          <button onClick={save} className="press" style={{width:'100%',padding:'14px',borderRadius:12,border:'none',background:'var(--navy)',color:'#fff',fontSize:15,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
            {ok?'✓ Salvo com sucesso!':'Salvar Perfil'}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── STUDENT SELECTOR ─────────────────────────────────────────────────────────
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
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{position:'fixed',inset:0,background:'rgba(13,30,53,0.7)',zIndex:200,backdropFilter:'blur(4px)',display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
      <div style={{background:'var(--surface)',borderRadius:'20px 20px 0 0',maxHeight:'80vh',overflowY:'auto'}}>
        <div style={{padding:'14px 0 4px',display:'flex',justifyContent:'center'}}>
          <div style={{width:40,height:4,borderRadius:2,background:'var(--border)'}}/>
        </div>
        <div style={{padding:'8px 16px 28px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
            <div style={{fontSize:18,fontWeight:800,color:'var(--navy)',letterSpacing:'-0.02em'}}>Meus Alunos</div>
            <button onClick={()=>setAdding(!adding)} className="press"
              style={{background:'var(--navy)',border:'none',borderRadius:10,padding:'8px 14px',color:'#fff',fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
              {adding?'Cancelar':'+ Novo'}
            </button>
          </div>

          {adding&&(
            <div style={{background:'var(--bg)',borderRadius:14,padding:16,marginBottom:16}}>
              {[[name,setName,'Nome completo *','text'],[email,setEmail,'Email *','email'],[pass,setPass,'Senha (mín. 6 caracteres) *','password']].map(([v,s,ph,t],i)=>(
                <input key={i} type={t} value={v} onChange={e=>s(e.target.value)} placeholder={ph} className="input-base" style={{marginBottom:8}}/>
              ))}
              {err&&<div style={{color:'#dc2626',fontSize:12,marginBottom:8,fontWeight:500}}>{err}</div>}
              <button onClick={create} disabled={loading} className="press"
                style={{width:'100%',padding:'13px',borderRadius:10,border:'none',background:'#059669',color:'#fff',fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                {loading?'Criando…':'Criar Aluno'}
              </button>
            </div>
          )}

          {students.map(s=>(
            <div key={s.id} className="press" onClick={()=>{onSelect(s.id);onClose();}}
              style={{display:'flex',alignItems:'center',gap:12,padding:'13px',borderRadius:13,background:activeId===s.id?'#eff6ff':'var(--bg)',border:`2px solid ${activeId===s.id?'var(--blue2)':'transparent'}`,marginBottom:8,cursor:'pointer'}}>
              <div style={{width:46,height:46,borderRadius:13,background:'linear-gradient(135deg,var(--navy),var(--navy3))',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--gold2)',fontSize:18,fontWeight:400,fontFamily:"'DM Serif Display',serif",flexShrink:0}}>
                {(s.name||s.email||'?').charAt(0).toUpperCase()}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:15,fontWeight:700,color:'var(--text)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{s.name||s.email}</div>
                {s.level&&<div style={{fontSize:12,color:'var(--text3)',fontWeight:500,marginTop:1}}>{s.level}</div>}
              </div>
              {activeId===s.id&&<div style={{color:'var(--blue2)',fontSize:16,fontWeight:700}}>✓</div>}
            </div>
          ))}

          {students.length===0&&!adding&&(
            <div style={{textAlign:'center',padding:'32px 0',color:'var(--text3)',fontSize:14,fontWeight:500}}>Nenhum aluno cadastrado</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
const TABS = [
  {id:'overview',  icon:'⊞', label:'Início'},
  {id:'calendar',  icon:'◫', label:'Aulas'},
  {id:'grammar',   icon:'A', label:'Gramática'},
  {id:'homework',  icon:'✎', label:'Tarefas'},
  {id:'materials', icon:'⊟', label:'Materiais'},
  {id:'videos',    icon:'▷', label:'Vídeos'},
  {id:'schedule',  icon:'◷', label:'Agenda'},
  {id:'profile',   icon:'◉', label:'Perfil'},
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

  // Fix mobile viewport
  useEffect(()=>{
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) { meta = document.createElement('meta'); meta.name='viewport'; document.head.appendChild(meta); }
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1';
  },[]);

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
      else setActiveId(u.id);
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
  const tabsRow1 = TABS.slice(0,4);
  const tabsRow2 = TABS.slice(4,8);

  if (loading) return (
    <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--navy)'}}>
      <style>{CSS}</style>
      <div style={{color:'var(--gold2)',fontFamily:"'DM Serif Display',serif",fontSize:22}}>Carregando…</div>
    </div>
  );

  if (!user) return <AuthScreen onAuth={u=>loadProfile(u)}/>;

  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column',background:'var(--bg)',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      <style>{CSS}</style>
      {showStudents&&isTeacher&&(
        <StudentSelector students={students} activeId={activeId}
          onSelect={id=>{setActiveId(id);setTab('overview');}}
          onAdd={()=>loadStudents(user.id)}
          onClose={()=>setShowStudents(false)}/>
      )}

      {/* HEADER */}
      <div style={{background:'var(--navy)',padding:'13px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0,boxShadow:'0 2px 12px rgba(0,0,0,0.2)'}}>
        <div style={{display:'flex',alignItems:'center',gap:11}}>
          <div style={{width:38,height:38,borderRadius:11,background:'linear-gradient(135deg,#b8873a,#d4a855)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,fontWeight:400,color:'#fff',fontFamily:"'DM Serif Display',serif",boxShadow:'0 2px 8px rgba(184,135,58,0.4)'}}>FB</div>
          <div>
            <div style={{color:'#d4a855',fontSize:9,fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase'}}>Prof. Dr.</div>
            <div style={{color:'#fff',fontSize:15,fontWeight:400,fontFamily:"'DM Serif Display',serif",lineHeight:1.1}}>Fabio Busse</div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          {isTeacher&&(
            <button onClick={()=>setShowStudents(true)} className="press"
              style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:10,padding:'8px 12px',color:'#fff',cursor:'pointer',fontSize:13,fontWeight:600,display:'flex',alignItems:'center',gap:6,maxWidth:150}}>
              <span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{activeStudent?.name||'Alunos'}</span>
              <span style={{color:'#94a3b8',fontSize:11}}>▾</span>
            </button>
          )}
          <button onClick={logout} className="press"
            style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:10,padding:'8px 12px',color:'#64748b',cursor:'pointer',fontSize:12,fontWeight:600}}>
            Sair
          </button>
        </div>
      </div>

      {/* STUDENT BANNER */}
      {isTeacher&&activeStudent&&(
        <div style={{background:'#162d4a',padding:'8px 16px',display:'flex',alignItems:'center',gap:10,flexShrink:0,borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
          <div style={{width:28,height:28,borderRadius:8,background:'var(--gold)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:400,color:'#fff',fontFamily:"'DM Serif Display',serif"}}>
            {(activeStudent.name||'?').charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{color:'#e2e8f0',fontSize:13,fontWeight:600}}>{activeStudent.name}</div>
            {activeStudent.level&&<div style={{color:'#64748b',fontSize:11,fontWeight:500}}>{activeStudent.level}</div>}
          </div>
          {/* ← BOTÃO VOLTAR: volta para seleção de aluno */}
          <button onClick={()=>{setActiveId(null);setShowStudents(true);}} className="press"
            style={{marginLeft:'auto',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'5px 10px',color:'#94a3b8',cursor:'pointer',fontSize:12,fontWeight:600}}>
            ← Trocar
          </button>
        </div>
      )}

      {/* CONTENT */}
      <div style={{flex:1,overflowY:'auto'}}>
        {!activeId?(
          <div style={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:14,padding:24}}>
            <div style={{width:64,height:64,borderRadius:18,background:'var(--navy)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,color:'var(--gold2)',fontFamily:"'DM Serif Display',serif"}}>FB</div>
            <div style={{fontSize:16,color:'var(--text2)',fontWeight:600,textAlign:'center'}}>Selecione um aluno para começar</div>
            {isTeacher&&<button onClick={()=>setShowStudents(true)} className="press" style={{padding:'12px 24px',borderRadius:12,border:'none',background:'var(--navy)',color:'#fff',fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Ver Alunos</button>}
          </div>
        ):(
          <>
            {tab==='overview'  &&<OverviewTab  studentId={activeId}/>}
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
      <div style={{background:'var(--surface)',borderTop:'1px solid var(--border)',flexShrink:0,boxShadow:'0 -2px 12px rgba(0,0,0,0.05)'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)'}}>
          {tabsRow1.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} className="press"
              style={{padding:'10px 4px 8px',border:'none',background:'transparent',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
              <span style={{fontSize:16,color:tab===t.id?'var(--navy)':'var(--text3)',fontWeight:700,lineHeight:1}}>{t.icon}</span>
              <span style={{fontSize:10,fontWeight:tab===t.id?700:500,color:tab===t.id?'var(--navy)':'var(--text3)'}}>{t.label}</span>
              {tab===t.id&&<div style={{width:16,height:2.5,borderRadius:2,background:'var(--gold)'}}/>}
            </button>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',borderTop:'1px solid var(--bg)'}}>
          {tabsRow2.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} className="press"
              style={{padding:'10px 4px 8px',border:'none',background:'transparent',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
              <span style={{fontSize:16,color:tab===t.id?'var(--navy)':'var(--text3)',fontWeight:700,lineHeight:1}}>{t.icon}</span>
              <span style={{fontSize:10,fontWeight:tab===t.id?700:500,color:tab===t.id?'var(--navy)':'var(--text3)'}}>{t.label}</span>
              {tab===t.id&&<div style={{width:16,height:2.5,borderRadius:2,background:'var(--gold)'}}/>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);