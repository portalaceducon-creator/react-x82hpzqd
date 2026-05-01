
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { createRoot } from 'react-dom/client';

const SUPABASE_URL = 'https://efjehnvnhnwamyccevkj.supabase.co';
const SUPABASE_KEY = 'sb_publishable_qkNPJ8KZ8_NZcNC-Tu6phA_smsV5H9M';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
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
  { id:"g26", cat:"Articles & Determiners", name:"Definite Article (The)" },
  { id:"g27", cat:"Articles & Determiners", name:"Indefinite Articles (A / An)" },
  { id:"g28", cat:"Articles & Determiners", name:"Zero Article" },
  { id:"g29", cat:"Articles & Determiners", name:"Quantifiers (some, any, much, many…)" },
  { id:"g30", cat:"Articles & Determiners", name:"Demonstratives (this, that, these, those)" },
  { id:"g31", cat:"Nouns", name:"Countable & Uncountable Nouns" },
  { id:"g32", cat:"Nouns", name:"Plural Forms (regular & irregular)" },
  { id:"g33", cat:"Nouns", name:"Compound Nouns" },
  { id:"g34", cat:"Nouns", name:"Possessive 's / s'" },
  { id:"g35", cat:"Nouns", name:"Collective Nouns" },
  { id:"g36", cat:"Pronouns", name:"Personal Pronouns" },
  { id:"g37", cat:"Pronouns", name:"Possessive Pronouns" },
  { id:"g38", cat:"Pronouns", name:"Reflexive Pronouns" },
  { id:"g39", cat:"Pronouns", name:"Relative Pronouns (who, which, that, whose)" },
  { id:"g40", cat:"Pronouns", name:"Indefinite Pronouns (everyone, someone…)" },
  { id:"g41", cat:"Adjectives", name:"Descriptive Adjectives" },
  { id:"g42", cat:"Adjectives", name:"Comparative Adjectives" },
  { id:"g43", cat:"Adjectives", name:"Superlative Adjectives" },
  { id:"g44", cat:"Adjectives", name:"Order of Adjectives" },
  { id:"g45", cat:"Adjectives", name:"Participial Adjectives (-ed / -ing)" },
  { id:"g46", cat:"Adjectives", name:"Compound Adjectives" },
  { id:"g47", cat:"Adverbs", name:"Adverbs of Frequency" },
  { id:"g48", cat:"Adverbs", name:"Adverbs of Manner" },
  { id:"g49", cat:"Adverbs", name:"Adverbs of Time" },
  { id:"g50", cat:"Adverbs", name:"Adverbs of Place" },
  { id:"g51", cat:"Adverbs", name:"Adverbs of Degree (very, quite, rather…)" },
  { id:"g52", cat:"Adverbs", name:"Adverbs of Probability" },
  { id:"g53", cat:"Prepositions", name:"Prepositions of Time" },
  { id:"g54", cat:"Prepositions", name:"Prepositions of Place" },
  { id:"g55", cat:"Prepositions", name:"Prepositions of Movement" },
  { id:"g56", cat:"Prepositions", name:"Dependent Prepositions" },
  { id:"g57", cat:"Phrasal Verbs", name:"Phrasal Verbs – Basic" },
  { id:"g58", cat:"Phrasal Verbs", name:"Phrasal Verbs – Intermediate" },
  { id:"g59", cat:"Phrasal Verbs", name:"Phrasal Verbs – Advanced" },
  { id:"g60", cat:"Sentence Structure", name:"Word Order" },
  { id:"g61", cat:"Sentence Structure", name:"Questions (Yes/No & Wh-)" },
  { id:"g62", cat:"Sentence Structure", name:"Negative Sentences" },
  { id:"g63", cat:"Sentence Structure", name:"Question Tags" },
  { id:"g64", cat:"Sentence Structure", name:"Short Answers" },
  { id:"g65", cat:"Sentence Structure", name:"Exclamatory Sentences" },
  { id:"g66", cat:"Clauses & Conjunctions", name:"Coordinating Conjunctions (FANBOYS)" },
  { id:"g67", cat:"Clauses & Conjunctions", name:"Subordinating Conjunctions" },
  { id:"g68", cat:"Clauses & Conjunctions", name:"Relative Clauses (Defining)" },
  { id:"g69", cat:"Clauses & Conjunctions", name:"Relative Clauses (Non-defining)" },
  { id:"g70", cat:"Clauses & Conjunctions", name:"Adverbial Clauses (Time, Reason, Contrast)" },
  { id:"g71", cat:"Clauses & Conjunctions", name:"Noun Clauses" },
  { id:"g72", cat:"Conditionals", name:"Zero Conditional" },
  { id:"g73", cat:"Conditionals", name:"First Conditional" },
  { id:"g74", cat:"Conditionals", name:"Second Conditional" },
  { id:"g75", cat:"Conditionals", name:"Third Conditional" },
  { id:"g76", cat:"Conditionals", name:"Mixed Conditionals" },
  { id:"g77", cat:"Conditionals", name:"Unless / Provided That / As Long As" },
  { id:"g78", cat:"Passive Voice", name:"Passive – Present Tenses" },
  { id:"g79", cat:"Passive Voice", name:"Passive – Past Tenses" },
  { id:"g80", cat:"Passive Voice", name:"Passive – Future & Modal" },
  { id:"g81", cat:"Passive Voice", name:"Causative (Have / Get sth done)" },
  { id:"g82", cat:"Reported Speech", name:"Reported Statements" },
  { id:"g83", cat:"Reported Speech", name:"Reported Questions" },
  { id:"g84", cat:"Reported Speech", name:"Reported Commands & Requests" },
  { id:"g85", cat:"Reported Speech", name:"Tense Backshift" },
  { id:"g86", cat:"Reported Speech", name:"Reporting Verbs" },
  { id:"g87", cat:"Infinitives & Gerunds", name:"Verb + Infinitive" },
  { id:"g88", cat:"Infinitives & Gerunds", name:"Verb + Gerund" },
  { id:"g89", cat:"Infinitives & Gerunds", name:"Verb + Inf or Gerund (same meaning)" },
  { id:"g90", cat:"Infinitives & Gerunds", name:"Verb + Inf or Gerund (different meaning)" },
  { id:"g91", cat:"Infinitives & Gerunds", name:"Infinitive of Purpose" },
  { id:"g92", cat:"Infinitives & Gerunds", name:"Gerund as Subject" },
  { id:"g93", cat:"Advanced Grammar", name:"Inversion (Formal / Emphatic)" },
  { id:"g94", cat:"Advanced Grammar", name:"Cleft Sentences (It is… / What I want…)" },
  { id:"g95", cat:"Advanced Grammar", name:"Ellipsis & Substitution" },
  { id:"g96", cat:"Advanced Grammar", name:"Subjunctive Mood" },
  { id:"g97", cat:"Advanced Grammar", name:"Wish / If Only" },
  { id:"g98", cat:"Advanced Grammar", name:'Emphasis with "Do / Does / Did"' },
  { id:"g99", cat:"Discourse & Coherence", name:"Discourse Markers (Linking Words)" },
  { id:"g100",cat:"Discourse & Coherence", name:"Cohesive Devices" },
  { id:"g101",cat:"Discourse & Coherence", name:"Register & Formality" },
  { id:"g102",cat:"Discourse & Coherence", name:"Hedging Language" },
];

const LESSON_STATUS = {
  attended:          { label:"Aula realizada",     color:"#16a34a", bg:"#dcfce7", icon:"✅" },
  cancelled_student: { label:"Aluno cancelou",     color:"#d97706", bg:"#fef3c7", icon:"🔶" },
  cancelled_late:    { label:"Cancelou < 24h",     color:"#ef4444", bg:"#fee2e2", icon:"⚡" },
  cancelled_teacher: { label:"Prof. cancelou",     color:"#7c3aed", bg:"#ede9fe", icon:"📌" },
  no_show:           { label:"Não apareceu",       color:"#ef4444", bg:"#fee2e2", icon:"👻" },
};

const TASK_STATUS = {
  done:     { label:"Feitas",          color:"#16a34a", icon:"✅" },
  partial:  { label:"Parcialmente",    color:"#d97706", icon:"🔄" },
  not_done: { label:"Não fez",         color:"#ef4444", icon:"❌" },
  none:     { label:"Sem tarefas",     color:"#94a3b8", icon:"—" },
};

const GRAM_STATUS = {
  achieved:     { label:"Atingido",           color:"#16a34a", bg:"#dcfce7" },
  in_progress:  { label:"Em desenvolvimento", color:"#d97706", bg:"#fef3c7" },
  not_achieved: { label:"Não atingido",       color:"#ef4444", bg:"#fee2e2" },
};

const SKILL_SUBS = {
  speaking: ["Fluência","Pronúncia","Vocabulário","Precisão gramatical"],
  reading:  ["Compreensão","Velocidade","Vocabulário","Inferência"],
  listening:["Compreensão","Sotaques","Anotações"],
  writing:  ["Estrutura","Gramática","Vocabulário","Coerência"],
};

const SKILL_COLOR = { speaking:"#3b82f6", reading:"#16a34a", listening:"#f59e0b", writing:"#8b5cf6" };
const SKILL_ICON  = { speaking:"🗣️", reading:"📖", listening:"🎧", writing:"✍️" };
const MONTHS = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const WDAYS  = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
const WFULL  = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
const LEVELS = ["Absolute Beginner","Beginner","Elementary","Pre-Intermediate","Intermediate","Upper-Intermediate","Advanced","Proficiency"];
const GOALS  = ["Negócios / Corporativo","Viagens","Cambridge Exam","TOEFL / IELTS","Universidade","Conversação geral","Escrita profissional","Outro"];

const pad = n => String(n).padStart(2,"0");
const dateStr = (y,m,d) => `${y}-${pad(m+1)}-${pad(d)}`;
const today = () => { const n=new Date(); return dateStr(n.getFullYear(),n.getMonth(),n.getDate()); };
function endTime(start,dur){ const [h,m]=start.split(":").map(Number); const e=new Date(2000,0,1,h,m+dur); return `${pad(e.getHours())}:${pad(e.getMinutes())}`; }

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;700&family=DM+Sans:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body,html{font-family:'DM Sans',sans-serif;height:100%;background:#f0f4f8}
::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}
.fade{animation:fi 0.2s ease} @keyframes fi{from{opacity:0;transform:translateY(4px)}to{opacity:1}}
.cday{cursor:pointer;transition:transform 0.1s} .cday:hover{transform:scale(1.04)}
.sbtn{cursor:pointer;transition:all 0.15s} .sbtn:hover{opacity:0.85}
.grow:hover{background:#f8fafc!important}
input,select,textarea{font-family:inherit;outline:none}
`;

// ─── AUTH SCREEN ──────────────────────────────────────────────────────────────
function AuthScreen({ onAuth }) {
  const [mode, setMode]     = useState('login');
  const [email, setEmail]   = useState('');
  const [pass, setPass]     = useState('');
  const [name, setName]     = useState('');
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError(''); setLoading(true);
    try {
      if (mode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
        onAuth(data.user);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email, password: pass,
          options: { data: { name, role: 'student' } }
        });
        if (error) throw error;
        setError('Verifique seu email para confirmar o cadastro!');
      }
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,#0b1929,#1a365d)'}}>
      <style>{CSS}</style>
      <div style={{background:'white',borderRadius:20,padding:40,width:'min(420px,95vw)',boxShadow:'0 24px 60px rgba(0,0,0,0.4)'}}>
        <div style={{textAlign:'center',marginBottom:28}}>
          <div style={{width:56,height:56,borderRadius:'50%',background:'linear-gradient(135deg,#c8973e,#e8b84b)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,fontWeight:700,color:'#1a365d',margin:'0 auto 12px',fontFamily:"'Cormorant Garamond',serif"}}>FB</div>
          <div style={{color:'#c8973e',fontSize:10,fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase'}}>Prof. Dr.</div>
          <div style={{color:'#1a365d',fontSize:22,fontWeight:700,fontFamily:"'Cormorant Garamond',serif"}}>Fabio Busse</div>
          <div style={{color:'#94a3b8',fontSize:12,marginTop:2}}>Inglês Profissional</div>
        </div>

        <div style={{display:'flex',background:'#f1f5f9',borderRadius:10,padding:4,marginBottom:24}}>
          {[['login','Entrar'],['register','Cadastrar']].map(([k,l])=>(
            <button key={k} onClick={()=>setMode(k)}
              style={{flex:1,padding:'8px',borderRadius:8,border:'none',cursor:'pointer',fontWeight:600,fontSize:13,
                background:mode===k?'white':'transparent',color:mode===k?'#1a365d':'#64748b',
                boxShadow:mode===k?'0 1px 4px rgba(0,0,0,0.1)':'none'}}>
              {l}
            </button>
          ))}
        </div>

        {mode==='register'&&(
          <div style={{marginBottom:14}}>
            <label style={{fontSize:11,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:5}}>Nome completo</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Seu nome"
              style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:8,padding:'10px 12px',fontSize:13}}/>
          </div>
        )}

        <div style={{marginBottom:14}}>
          <label style={{fontSize:11,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:5}}>Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@email.com"
            style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:8,padding:'10px 12px',fontSize:13}}/>
        </div>

        <div style={{marginBottom:20}}>
          <label style={{fontSize:11,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:5}}>Senha</label>
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••"
            onKeyDown={e=>e.key==='Enter'&&submit()}
            style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:8,padding:'10px 12px',fontSize:13}}/>
        </div>

        {error&&<div style={{background:'#fef3c7',border:'1px solid #fbbf24',borderRadius:8,padding:'10px 12px',fontSize:12,color:'#92400e',marginBottom:14}}>{error}</div>}

        <button onClick={submit} disabled={loading}
          style={{width:'100%',padding:'12px',borderRadius:10,border:'none',background:'#1a365d',color:'white',cursor:'pointer',fontSize:14,fontWeight:700}}>
          {loading ? 'Aguarde…' : mode==='login' ? 'Entrar' : 'Criar conta'}
        </button>
      </div>
    </div>
  );
}

// ─── MODAL AULA ──────────────────────────────────────────────────────────────
function Modal({ date, lesson, onSave, onClose, onDelete }) {
  const [status, setStatus] = useState(lesson?.status||'attended');
  const [tasks,  setTasks]  = useState(lesson?.tasks||'none');
  const [notes,  setNotes]  = useState(lesson?.notes||'');
  const d = new Date(date+'T12:00:00');
  const label = d.toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long',year:'numeric'});

  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()}
      style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,backdropFilter:'blur(3px)'}}>
      <div style={{background:'white',borderRadius:16,padding:28,width:'min(480px,95vw)',maxHeight:'90vh',overflowY:'auto',boxShadow:'0 24px 60px rgba(0,0,0,0.3)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:20}}>
          <div>
            <div style={{fontSize:10,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.12em',marginBottom:2}}>Registrar Aula</div>
            <div style={{fontSize:19,fontWeight:700,color:'#1a365d',fontFamily:"'Cormorant Garamond',serif"}}>{label}</div>
          </div>
          <button onClick={onClose} style={{background:'none',border:'none',fontSize:22,cursor:'pointer',color:'#94a3b8'}}>×</button>
        </div>

        <FS label="Status da aula">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            {Object.entries(LESSON_STATUS).map(([k,c])=>(
              <div key={k} className="sbtn" onClick={()=>setStatus(k)}
                style={{background:c.bg,border:`2px solid ${status===k?c.color:'transparent'}`,borderRadius:8,padding:'8px 10px',display:'flex',alignItems:'center',gap:8,boxShadow:status===k?`0 0 0 3px ${c.color}33`:'none'}}>
                <span>{c.icon}</span>
                <span style={{fontSize:11,fontWeight:600,color:c.color}}>{c.label}</span>
              </div>
            ))}
          </div>
        </FS>

        <FS label="Tarefas de casa">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            {Object.entries(TASK_STATUS).map(([k,c])=>(
              <div key={k} className="sbtn" onClick={()=>setTasks(k)}
                style={{background:tasks===k?'#f0f9ff':'#f8fafc',border:`2px solid ${tasks===k?'#1a365d':'transparent'}`,borderRadius:8,padding:'8px 10px',display:'flex',alignItems:'center',gap:8}}>
                <span>{c.icon}</span>
                <span style={{fontSize:11,fontWeight:tasks===k?700:400,color:tasks===k?'#1a365d':'#64748b'}}>{c.label}</span>
              </div>
            ))}
          </div>
        </FS>

        <FS label="Observações">
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Notas sobre esta aula…"
            style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:8,padding:'10px 12px',fontSize:13,resize:'vertical',minHeight:72}}/>
        </FS>

        <div style={{display:'flex',gap:8,justifyContent:'space-between',marginTop:4}}>
          {lesson&&<button onClick={()=>{onDelete(date);onClose();}} style={{padding:'9px 14px',borderRadius:8,border:'1px solid #fee2e2',background:'white',color:'#ef4444',cursor:'pointer',fontSize:12}}>Excluir</button>}
          <div style={{display:'flex',gap:8,marginLeft:'auto'}}>
            <button onClick={onClose} style={{padding:'9px 18px',borderRadius:8,border:'1px solid #e2e8f0',background:'white',cursor:'pointer',fontSize:13,color:'#64748b'}}>Cancelar</button>
            <button onClick={()=>onSave(date,{status,tasks,notes})} style={{padding:'9px 22px',borderRadius:8,border:'none',background:'#1a365d',color:'white',cursor:'pointer',fontSize:13,fontWeight:600}}>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FS({label,children}){
  return <div style={{marginBottom:16}}><div style={{fontSize:10,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:7}}>{label}</div>{children}</div>;
}

// ─── OVERVIEW ─────────────────────────────────────────────────────────────────
function OverviewTab({ studentId }) {
  const [lessons,  setLessons]  = useState([]);
  const [grammar,  setGrammar]  = useState([]);
  const [skills,   setSkills]   = useState([]);

  useEffect(()=>{
    supabase.from('lessons').select('*').eq('student_id',studentId).then(({data})=>setLessons(data||[]));
    supabase.from('grammar_progress').select('*').eq('student_id',studentId).then(({data})=>setGrammar(data||[]));
    supabase.from('skills').select('*').eq('student_id',studentId).then(({data})=>setSkills(data||[]));
  },[studentId]);

  const total    = lessons.length;
  const attended = lessons.filter(l=>l.status==='attended').length;
  const tchCan   = lessons.filter(l=>l.status==='cancelled_teacher').length;
  const stuCan   = lessons.filter(l=>['cancelled_student','cancelled_late','no_show'].includes(l.status)).length;
  const rate     = total-tchCan>0 ? Math.round(attended/(total-tchCan)*100) : 0;
  const achieved = grammar.filter(g=>g.status==='achieved').length;
  const inProg   = grammar.filter(g=>g.status==='in_progress').length;
  const tasksDone= lessons.filter(l=>l.tasks==='done').length;
  const rateColor= rate>=80?'#16a34a':rate>=60?'#f59e0b':'#ef4444';

  const now = new Date();
  const monthly = Array.from({length:6},(_,i)=>{
    const d = new Date(now.getFullYear(),now.getMonth()-(5-i),1);
    const ms= `${d.getFullYear()}-${pad(d.getMonth()+1)}`;
    const ml= lessons.filter(l=>l.lesson_date.startsWith(ms));
    return { month:MONTHS[d.getMonth()].slice(0,3), Realizadas:ml.filter(l=>l.status==='attended').length, Canceladas:ml.filter(l=>['cancelled_student','cancelled_late','no_show'].includes(l.status)).length };
  });

  const pie = [
    {name:'Realizadas',   value:attended, color:'#16a34a'},
    {name:'Aluno cancelou',value:stuCan,  color:'#f59e0b'},
    {name:'Prof. cancelou',value:tchCan,  color:'#7c3aed'},
  ].filter(d=>d.value>0);

  const radarData = Object.entries(SKILL_SUBS).map(([sk,items])=>{
    const sd = skills.filter(s=>s.skill===sk);
    const vals = items.map((_,i)=>sd.find(s=>s.sub_index===i)?.value??1);
    return { skill:sk.charAt(0).toUpperCase()+sk.slice(1), value:Math.round(vals.reduce((a,b)=>a+b,0)/vals.length*20) };
  });

  const gramProg = [
    {name:'Atingido',   v:achieved, c:'#16a34a'},
    {name:'Em desenvolvimento',v:inProg,c:'#f59e0b'},
    {name:'Não atingido',v:grammar.filter(g=>g.status==='not_achieved').length,c:'#ef4444'},
    {name:'Não iniciado',v:GRAMMAR_TOPICS.length-grammar.filter(g=>g.status).length,c:'#e2e8f0'},
  ];

  return (
    <div className="fade" style={{padding:24,display:'grid',gap:20}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:12}}>
        {[
          {icon:'📚',label:'Total de Aulas',   value:total,      color:'#1a365d'},
          {icon:'✅',label:'Realizadas',        value:attended,   color:'#16a34a'},
          {icon:'📊',label:'Presença',          value:rate+'%',   color:rateColor},
          {icon:'🎯',label:'Gramática atingida',value:achieved,   color:'#c8973e', sub:`de ${GRAMMAR_TOPICS.length}`},
          {icon:'📝',label:'Tarefas feitas',    value:tasksDone,  color:'#7c3aed'},
        ].map(s=>(
          <div key={s.label} style={{background:'white',borderRadius:12,padding:'14px 16px',border:'1px solid #e2e8f0'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
              <div>
                <div style={{color:'#64748b',fontSize:11,marginBottom:4}}>{s.label}</div>
                <div style={{color:s.color,fontSize:26,fontWeight:700,lineHeight:1}}>{s.value}</div>
                {s.sub&&<div style={{color:'#94a3b8',fontSize:10,marginTop:2}}>{s.sub}</div>}
              </div>
              <span style={{fontSize:18}}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18}}>
        <CC title="📅 Aulas por mês">
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={monthly}>
              <XAxis dataKey="month" tick={{fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:10}} axisLine={false} tickLine={false} allowDecimals={false}/>
              <Tooltip contentStyle={{fontSize:12,borderRadius:8}}/>
              <Bar dataKey="Realizadas" fill="#16a34a" radius={[4,4,0,0]}/>
              <Bar dataKey="Canceladas" fill="#fbbf24" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </CC>
        <CC title="🥧 Distribuição">
          {pie.length>0?(
            <ResponsiveContainer width="100%" height={190}>
              <PieChart>
                <Pie data={pie} cx="50%" cy="50%" innerRadius={48} outerRadius={76} dataKey="value" label={({percent})=>`${(percent*100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                  {pie.map((e,i)=><Cell key={i} fill={e.color}/>)}
                </Pie>
                <Tooltip contentStyle={{fontSize:12,borderRadius:8}}/>
              </PieChart>
            </ResponsiveContainer>
          ):<div style={{height:190,display:'flex',alignItems:'center',justifyContent:'center',color:'#94a3b8',fontSize:13}}>Sem dados ainda</div>}
        </CC>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18}}>
        <CC title="🎯 Habilidades">
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0"/>
              <PolarAngleAxis dataKey="skill" tick={{fontSize:11,fill:'#475569'}}/>
              <Radar dataKey="value" stroke="#c8973e" fill="#c8973e" fillOpacity={0.25} strokeWidth={2}/>
            </RadarChart>
          </ResponsiveContainer>
        </CC>
        <CC title="📚 Progresso gramática">
          {gramProg.map(g=>(
            <div key={g.name} style={{marginBottom:10}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:3}}>
                <span style={{color:'#475569'}}>{g.name}</span>
                <span style={{color:g.c,fontWeight:600}}>{g.v}</span>
              </div>
              <div style={{height:6,borderRadius:3,background:'#f1f5f9'}}>
                <div style={{height:'100%',borderRadius:3,background:g.c,width:`${(g.v/GRAMMAR_TOPICS.length)*100}%`,transition:'width 0.5s'}}/>
              </div>
            </div>
          ))}
        </CC>
      </div>
    </div>
  );
}

function CC({title,children}){
  return <div style={{background:'white',borderRadius:12,padding:20,border:'1px solid #e2e8f0'}}><div style={{fontSize:13,fontWeight:600,color:'#1a365d',marginBottom:14}}>{title}</div>{children}</div>;
}

// ─── CALENDAR ─────────────────────────────────────────────────────────────────
function CalendarTab({ studentId, isTeacher }) {
  const [cur, setCur]   = useState(new Date());
  const [lessons, setLessons] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [selDay, setSelDay] = useState(null);
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
    if (existing) {
      await supabase.from('lessons').update({...data}).eq('id',existing.id);
    } else {
      await supabase.from('lessons').insert({student_id:studentId,lesson_date:date,...data});
    }
    setSelDay(null); load();
  };

  const deleteLesson = async (date) => {
    const existing = lessons[date];
    if (existing) await supabase.from('lessons').delete().eq('id',existing.id);
    load();
  };

  const firstDow = new Date(y,m,1).getDay();
  const daysInMonth = new Date(y,m+1,0).getDate();
  const cells = [...Array(firstDow).fill(null), ...Array.from({length:daysInMonth},(_,i)=>i+1)];
  const isScheduled = d => schedule.some(s=>s.day_of_week===new Date(y,m,d).getDay());
  const schedTime = d => { const s=schedule.find(s=>s.day_of_week===new Date(y,m,d).getDay()); return s?s.start_time:null; };

  return (
    <div className="fade" style={{padding:24}}>
      {selDay&&isTeacher&&(
        <Modal date={dateStr(y,m,selDay)} lesson={lessons[dateStr(y,m,selDay)]}
          onSave={saveLesson} onDelete={deleteLesson} onClose={()=>setSelDay(null)}/>
      )}
      <div style={{background:'white',borderRadius:16,border:'1px solid #e2e8f0',overflow:'hidden'}}>
        <div style={{background:'linear-gradient(135deg,#0d2137,#1a365d)',padding:'18px 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <NavBtn onClick={()=>setCur(new Date(y,m-1,1))}>←</NavBtn>
          <div style={{textAlign:'center'}}>
            <div style={{color:'#e8b84b',fontSize:11,letterSpacing:'0.12em',textTransform:'uppercase'}}>{y}</div>
            <div style={{color:'white',fontSize:24,fontWeight:700,fontFamily:"'Cormorant Garamond',serif"}}>{MONTHS[m]}</div>
          </div>
          <NavBtn onClick={()=>setCur(new Date(y,m+1,1))}>→</NavBtn>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',background:'#f8fafc',borderBottom:'1px solid #e2e8f0'}}>
          {WDAYS.map(d=><div key={d} style={{padding:'9px 4px',textAlign:'center',fontSize:10,fontWeight:700,color:'#94a3b8',textTransform:'uppercase'}}>{d}</div>)}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:'1px',background:'#e2e8f0'}}>
          {cells.map((day,i)=>{
            if(!day) return <div key={i} style={{background:'#fafafa',minHeight:80}}/>;
            const ds = dateStr(y,m,day);
            const les = lessons[ds];
            const sched = isScheduled(day);
            const time = schedTime(day);
            const isToday = ds===todayStr;
            const sc = les?LESSON_STATUS[les.status]:null;
            const tc = les?.tasks?TASK_STATUS[les.tasks]:null;
            return (
              <div key={day} className="cday" onClick={()=>isTeacher&&setSelDay(day)}
                style={{background:isToday?'#fffbf0':'white',minHeight:80,padding:'6px 7px',border:isToday?'2px solid #c8973e':'none'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:3}}>
                  <span style={{width:22,height:22,borderRadius:'50%',background:isToday?'#c8973e':'transparent',color:isToday?'white':sched?'#1a365d':'#64748b',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:isToday?700:400}}>{day}</span>
                  {les&&<span style={{fontSize:12}}>{sc?.icon}</span>}
                </div>
                {time&&<div style={{fontSize:9,color:'#3b82f6',fontWeight:600,marginBottom:2}}>{time}</div>}
                {les&&(
                  <div style={{background:sc?.bg,borderRadius:4,padding:'2px 4px'}}>
                    <div style={{fontSize:9,color:sc?.color,fontWeight:700}}>{sc?.label}</div>
                    {tc&&tc.icon!=='—'&&<div style={{fontSize:9,color:'#64748b'}}>{tc.icon} {tc.label}</div>}
                  </div>
                )}
                {les?.notes&&<div style={{fontSize:9,color:'#94a3b8',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',marginTop:2}}>📌 {les.notes}</div>}
              </div>
            );
          })}
        </div>
      </div>
      {!isTeacher&&<div style={{marginTop:10,padding:'10px 14px',background:'#f0f9ff',borderRadius:8,fontSize:12,color:'#1a365d'}}>📅 Você está visualizando seu calendário de aulas.</div>}
    </div>
  );
}

function NavBtn({onClick,children}){
  return <button onClick={onClick} style={{background:'rgba(255,255,255,0.12)',border:'none',color:'white',width:34,height:34,borderRadius:'50%',cursor:'pointer',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center'}}>{children}</button>;
}

// ─── GRAMMAR TAB ──────────────────────────────────────────────────────────────
function GrammarTab({ studentId, isTeacher }) {
  const [sub, setSub]       = useState('grammar');
  const [grammar, setGrammar] = useState({});
  const [skills, setSkills]   = useState({});
  const [search, setSearch]   = useState('');
  const [filter, setFilter]   = useState('all');

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
    const existing = await supabase.from('grammar_progress').select('id').eq('student_id',studentId).eq('topic_id',topicId).single();
    if (existing.data) {
      await supabase.from('grammar_progress').update({status}).eq('id',existing.data.id);
    } else {
      await supabase.from('grammar_progress').insert({student_id:studentId,topic_id:topicId,status});
    }
    loadGrammar();
  };

  const setSkillValue = async (skill, subIndex, value) => {
    if (!isTeacher) return;
    const existing = await supabase.from('skills').select('id').eq('student_id',studentId).eq('skill',skill).eq('sub_index',subIndex).single();
    if (existing.data) {
      await supabase.from('skills').update({value}).eq('id',existing.data.id);
    } else {
      await supabase.from('skills').insert({student_id:studentId,skill,sub_index:subIndex,value});
    }
    loadSkills();
  };

  const cats = [...new Set(GRAMMAR_TOPICS.map(t=>t.cat))];
  const filtered = GRAMMAR_TOPICS.filter(t=>{
    const st = grammar[t.id]||'';
    return (filter==='all'||st===filter) && (!search||t.name.toLowerCase().includes(search.toLowerCase())||t.cat.toLowerCase().includes(search.toLowerCase()));
  });
  const byCat = cats.reduce((a,c)=>({...a,[c]:filtered.filter(t=>t.cat===c)}),{});

  return (
    <div className="fade" style={{padding:24}}>
      <div style={{display:'flex',gap:4,marginBottom:20,background:'#f1f5f9',borderRadius:10,padding:4,width:'fit-content'}}>
        {[['grammar','📚 Gramática'],['skills','🎯 Habilidades']].map(([k,l])=>(
          <button key={k} onClick={()=>setSub(k)}
            style={{padding:'8px 20px',borderRadius:8,fontSize:13,fontWeight:600,border:'none',cursor:'pointer',
              background:sub===k?'white':'transparent',color:sub===k?'#1a365d':'#64748b',
              boxShadow:sub===k?'0 1px 4px rgba(0,0,0,0.1)':'none'}}>
            {l}
          </button>
        ))}
      </div>

      {sub==='grammar'&&(
        <div>
          <div style={{display:'flex',gap:10,marginBottom:14,flexWrap:'wrap'}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Buscar tópico…"
              style={{flex:1,minWidth:180,border:'1px solid #e2e8f0',borderRadius:8,padding:'8px 12px',fontSize:13}}/>
            <select value={filter} onChange={e=>setFilter(e.target.value)}
              style={{border:'1px solid #e2e8f0',borderRadius:8,padding:'8px 12px',fontSize:13,background:'white'}}>
              <option value="all">Todos</option>
              <option value="">Não iniciado</option>
              <option value="not_achieved">Não atingido</option>
              <option value="in_progress">Em desenvolvimento</option>
              <option value="achieved">Atingido</option>
            </select>
          </div>

          {cats.map(cat=>{
            const ts = byCat[cat]; if(!ts||!ts.length) return null;
            return (
              <div key={cat} style={{background:'white',borderRadius:12,border:'1px solid #e2e8f0',marginBottom:10,overflow:'hidden'}}>
                <div style={{background:'#f8fafc',padding:'9px 16px',borderBottom:'1px solid #e2e8f0',display:'flex',justifyContent:'space-between'}}>
                  <span style={{fontSize:12,fontWeight:700,color:'#1a365d'}}>{cat}</span>
                  <span style={{fontSize:11,color:'#94a3b8'}}>{ts.length} tópicos</span>
                </div>
                {ts.map(t=>{
                  const st = grammar[t.id]||'';
                  return (
                    <div key={t.id} className="grow" style={{display:'flex',alignItems:'center',padding:'9px 16px',borderBottom:'1px solid #f1f5f9',justifyContent:'space-between',gap:8}}>
                      <span style={{fontSize:12,color:'#334155',flex:1}}>{t.name}</span>
                      <div style={{display:'flex',gap:5,flexShrink:0}}>
                        {Object.entries(GRAM_STATUS).map(([k,c])=>(
                          <button key={k} onClick={()=>setGrammarStatus(t.id,st===k?'':k)} disabled={!isTeacher}
                            style={{border:`${st===k?2:1}px solid ${st===k?c.color:'#e2e8f0'}`,borderRadius:6,padding:'3px 8px',cursor:isTeacher?'pointer':'default',
                              background:st===k?c.bg:'white',fontSize:10,fontWeight:st===k?700:400,color:st===k?c.color:'#94a3b8',whiteSpace:'nowrap'}}>
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
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:18}}>
          {Object.entries(SKILL_SUBS).map(([sk,items])=>(
            <div key={sk} style={{background:'white',borderRadius:12,border:'1px solid #e2e8f0',overflow:'hidden'}}>
              <div style={{background:SKILL_COLOR[sk],padding:'12px 16px',display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:18}}>{SKILL_ICON[sk]}</span>
                <span style={{color:'white',fontWeight:700,fontSize:15,textTransform:'capitalize'}}>{sk}</span>
              </div>
              {items.map((item,idx)=>{
                const val = skills[sk]?.[idx]??1;
                return (
                  <div key={item} style={{padding:'11px 16px',borderBottom:'1px solid #f1f5f9'}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                      <span style={{fontSize:13,color:'#334155'}}>{item}</span>
                      <span style={{fontSize:13,fontWeight:700,color:SKILL_COLOR[sk]}}>{val}/5</span>
                    </div>
                    <div style={{display:'flex',gap:5}}>
                      {[1,2,3,4,5].map(n=>(
                        <button key={n} onClick={()=>setSkillValue(sk,idx,n)} disabled={!isTeacher}
                          style={{flex:1,height:26,borderRadius:4,border:'none',cursor:isTeacher?'pointer':'default',
                            background:n<=val?SKILL_COLOR[sk]:'#e2e8f0',opacity:n<=val?1:0.4,transition:'background 0.15s'}}/>
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

// ─── SCHEDULE TAB ─────────────────────────────────────────────────────────────
function ScheduleTab({ studentId, isTeacher }) {
  const [slots, setSlots] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(()=>{
    supabase.from('schedules').select('*').eq('student_id',studentId).then(({data})=>setSlots(data||[]));
  },[studentId]);

  const save = async () => {
    await supabase.from('schedules').delete().eq('student_id',studentId);
    if (slots.length) {
      await supabase.from('schedules').insert(slots.map(s=>({student_id:studentId,day_of_week:s.day_of_week??s.day??1,start_time:s.start_time??s.startTime??'10:00',duration:s.duration??60})));
    }
    setSaved(true); setTimeout(()=>setSaved(false),2000);
  };

  const add  = () => setSlots(s=>[...s,{day_of_week:1,start_time:'10:00',duration:60}]);
  const rm   = i => setSlots(s=>s.filter((_,j)=>j!==i));
  const upd  = (i,k,v) => setSlots(s=>s.map((x,j)=>j===i?{...x,[k]:v}:x));

  return (
    <div className="fade" style={{padding:24,maxWidth:560}}>
      <div style={{background:'white',borderRadius:16,border:'1px solid #e2e8f0',overflow:'hidden'}}>
        <div style={{background:'linear-gradient(135deg,#0d2137,#1a365d)',padding:'18px 24px'}}>
          <div style={{color:'#e8b84b',fontSize:10,letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:3}}>Configuração</div>
          <div style={{color:'white',fontSize:21,fontWeight:700,fontFamily:"'Cormorant Garamond',serif"}}>Agenda Recorrente</div>
        </div>
        <div style={{padding:24}}>
          {!slots.length&&<div style={{textAlign:'center',padding:'32px 0',color:'#94a3b8',fontSize:13}}><div style={{fontSize:32,marginBottom:8}}>📅</div>Nenhum horário ainda.</div>}
          {slots.map((sl,i)=>(
            <div key={i} style={{border:'1px solid #e2e8f0',borderRadius:10,padding:14,marginBottom:12}}>
              <div style={{display:'flex',gap:10,alignItems:'flex-end',flexWrap:'wrap'}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:10,fontWeight:700,color:'#64748b',textTransform:'uppercase',marginBottom:4}}>Dia</div>
                  <select value={sl.day_of_week??sl.day??1} onChange={e=>upd(i,'day_of_week',Number(e.target.value))} disabled={!isTeacher}
                    style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:7,padding:'8px 10px',fontSize:13}}>
                    {WFULL.map((d,idx)=><option key={idx} value={idx}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{fontSize:10,fontWeight:700,color:'#64748b',textTransform:'uppercase',marginBottom:4}}>Início</div>
                  <input type="time" value={sl.start_time??sl.startTime??'10:00'} onChange={e=>upd(i,'start_time',e.target.value)} disabled={!isTeacher}
                    style={{width:110,border:'1px solid #e2e8f0',borderRadius:7,padding:'8px 10px',fontSize:13}}/>
                </div>
                <div>
                  <div style={{fontSize:10,fontWeight:700,color:'#64748b',textTransform:'uppercase',marginBottom:4}}>Duração</div>
                  <select value={sl.duration??60} onChange={e=>upd(i,'duration',Number(e.target.value))} disabled={!isTeacher}
                    style={{width:100,border:'1px solid #e2e8f0',borderRadius:7,padding:'8px 10px',fontSize:13}}>
                    {[30,45,60,75,90,120].map(d=><option key={d} value={d}>{d} min</option>)}
                  </select>
                </div>
                {isTeacher&&<button onClick={()=>rm(i)} style={{padding:'8px 12px',border:'1px solid #fee2e2',borderRadius:7,background:'#fff5f5',color:'#ef4444',cursor:'pointer',fontSize:12}}>Remover</button>}
              </div>
              <div style={{marginTop:10,padding:'6px 12px',background:'#f0f9ff',borderRadius:6,display:'inline-block'}}>
                <span style={{fontSize:12,color:'#1a365d',fontWeight:600}}>
                  {WFULL[sl.day_of_week??sl.day??1]} · {sl.start_time??sl.startTime??'10:00'} às {endTime(sl.start_time??sl.startTime??'10:00',sl.duration??60)} ({sl.duration??60} min)
                </span>
              </div>
            </div>
          ))}
          {isTeacher&&(
            <div style={{display:'flex',gap:10,marginTop:8}}>
              <button onClick={add} style={{flex:1,padding:'10px',border:'2px dashed #cbd5e1',borderRadius:8,background:'white',color:'#64748b',cursor:'pointer',fontSize:13}}>+ Adicionar Horário</button>
              <button onClick={save} style={{padding:'10px 22px',border:'none',borderRadius:8,background:'#1a365d',color:'white',cursor:'pointer',fontSize:13,fontWeight:600}}>{saved?'✓ Salvo!':'💾 Salvar'}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE TAB ─────────────────────────────────────────────────────────────
function ProfileTab({ profile, isTeacher, onUpdate }) {
  const [f, setF] = useState({...profile});
  const [ok, setOk] = useState(false);
  const upd = (k,v) => setF(x=>({...x,[k]:v}));

  const save = async () => {
    await supabase.from('profiles').update({name:f.name,phone:f.phone,level:f.level,goal:f.goal,notes:f.notes,start_date:f.start_date}).eq('id',profile.id);
    setOk(true); setTimeout(()=>setOk(false),2000);
    onUpdate && onUpdate(f);
  };

  return (
    <div className="fade" style={{padding:24,maxWidth:560}}>
      <div style={{background:'white',borderRadius:16,border:'1px solid #e2e8f0',overflow:'hidden'}}>
        <div style={{background:'linear-gradient(135deg,#0d2137,#1a365d)',padding:'18px 24px'}}>
          <div style={{color:'#e8b84b',fontSize:10,letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:3}}>Ficha do Aluno</div>
          <div style={{color:'white',fontSize:21,fontWeight:700,fontFamily:"'Cormorant Garamond',serif"}}>{f.name||'Sem nome'}</div>
          <div style={{color:'#4a6b87',fontSize:12}}>{f.email}</div>
        </div>
        <div style={{padding:24,display:'grid',gap:14}}>
          {[
            {k:'name',  label:'Nome completo',      ph:'Nome do aluno', type:'text'},
            {k:'phone', label:'Telefone / WhatsApp', ph:'(41) 9xxxx-xxxx', type:'text'},
          ].map(({k,label,ph,type})=>(
            <div key={k}>
              <div style={{fontSize:10,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:5}}>{label}</div>
              <input type={type} value={f[k]||''} onChange={e=>upd(k,e.target.value)} placeholder={ph} disabled={!isTeacher}
                style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:8,padding:'9px 12px',fontSize:13,background:isTeacher?'white':'#f8fafc'}}/>
            </div>
          ))}
          <div>
            <div style={{fontSize:10,fontWeight:700,color:'#64748b',textTransform:'uppercase',marginBottom:5}}>Data de início</div>
            <input type="date" value={f.start_date||''} onChange={e=>upd('start_date',e.target.value)} disabled={!isTeacher}
              style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:8,padding:'9px 12px',fontSize:13,background:isTeacher?'white':'#f8fafc'}}/>
          </div>
          <div>
            <div style={{fontSize:10,fontWeight:700,color:'#64748b',textTransform:'uppercase',marginBottom:5}}>Nível</div>
            <select value={f.level||''} onChange={e=>upd('level',e.target.value)} disabled={!isTeacher}
              style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:8,padding:'9px 12px',fontSize:13,background:isTeacher?'white':'#f8fafc'}}>
              <option value="">Selecione…</option>
              {LEVELS.map(l=><option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <div style={{fontSize:10,fontWeight:700,color:'#64748b',textTransform:'uppercase',marginBottom:5}}>Objetivo</div>
            <select value={f.goal||''} onChange={e=>upd('goal',e.target.value)} disabled={!isTeacher}
              style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:8,padding:'9px 12px',fontSize:13,background:isTeacher?'white':'#f8fafc'}}>
              <option value="">Selecione…</option>
              {GOALS.map(g=><option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <div style={{fontSize:10,fontWeight:700,color:'#64748b',textTransform:'uppercase',marginBottom:5}}>Observações</div>
            <textarea value={f.notes||''} onChange={e=>upd('notes',e.target.value)} placeholder="Informações importantes…" disabled={!isTeacher}
              style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:8,padding:'9px 12px',fontSize:13,minHeight:80,resize:'vertical',background:isTeacher?'white':'#f8fafc'}}/>
          </div>
          {isTeacher&&(
            <button onClick={save} style={{padding:'11px',borderRadius:8,border:'none',background:'#1a365d',color:'white',cursor:'pointer',fontSize:14,fontWeight:600}}>
              {ok?'✓ Salvo!':'💾 Salvar Perfil'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ADD STUDENT MODAL ────────────────────────────────────────────────────────
function AddStudentModal({ teacherId, onClose, onAdded }) {
  const [email, setEmail] = useState('');
  const [name, setName]   = useState('');
  const [pass, setPass]   = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const create = async () => {
    setLoading(true); setError('');
    try {
      const { data, error } = await supabase.auth.admin ? 
        supabase.auth.admin.createUser({email, password:pass, email_confirm:true, user_metadata:{name,role:'student',teacher_id:teacherId}}) :
        supabase.auth.signUp({email, password:pass, options:{data:{name,role:'student',teacher_id:teacherId}}});
      if (error) throw error;
      onAdded(); onClose();
    } catch(e) { setError(e.message); }
    setLoading(false);
  };

  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()}
      style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
      <div style={{background:'white',borderRadius:16,padding:28,width:'min(420px,95vw)',boxShadow:'0 24px 60px rgba(0,0,0,0.3)'}}>
        <div style={{fontSize:18,fontWeight:700,color:'#1a365d',marginBottom:20,fontFamily:"'Cormorant Garamond',serif"}}>Adicionar Aluno</div>
        {[
          {k:'name', label:'Nome completo', val:name, set:setName, ph:'Nome do aluno'},
          {k:'email',label:'Email',         val:email,set:setEmail,ph:'email@exemplo.com', type:'email'},
          {k:'pass', label:'Senha inicial', val:pass, set:setPass, ph:'Mínimo 6 caracteres', type:'password'},
        ].map(({k,label,val,set,ph,type='text'})=>(
          <div key={k} style={{marginBottom:14}}>
            <div style={{fontSize:10,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:5}}>{label}</div>
            <input type={type} value={val} onChange={e=>set(e.target.value)} placeholder={ph}
              style={{width:'100%',border:'1px solid #e2e8f0',borderRadius:8,padding:'10px 12px',fontSize:13}}/>
          </div>
        ))}
        {error&&<div style={{background:'#fee2e2',borderRadius:8,padding:'10px 12px',fontSize:12,color:'#991b1b',marginBottom:14}}>{error}</div>}
        <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
          <button onClick={onClose} style={{padding:'9px 18px',borderRadius:8,border:'1px solid #e2e8f0',background:'white',cursor:'pointer',fontSize:13,color:'#64748b'}}>Cancelar</button>
          <button onClick={create} disabled={loading} style={{padding:'9px 22px',borderRadius:8,border:'none',background:'#1a365d',color:'white',cursor:'pointer',fontSize:13,fontWeight:600}}>
            {loading?'Criando…':'Criar Aluno'}
          </button>
        </div>
        <div style={{marginTop:14,fontSize:11,color:'#94a3b8',textAlign:'center'}}>O aluno receberá um email de confirmação para ativar a conta.</div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({ user, students, activeId, onSelect, isTeacher, onAddStudent, onLogout }) {
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState('');
  const filtered = students.filter(s=>s.name?.toLowerCase().includes(search.toLowerCase())||s.email?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{width:200,background:'#0b1929',display:'flex',flexDirection:'column',borderRight:'1px solid #172d42',flexShrink:0}}>
      {showAdd&&isTeacher&&<AddStudentModal teacherId={user.id} onClose={()=>setShowAdd(false)} onAdded={()=>{setShowAdd(false);onAddStudent();}}/>}

      {isTeacher&&(
        <div style={{padding:'10px 12px 0'}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Buscar aluno…"
            style={{width:'100%',background:'#172d42',border:'1px solid #243e56',borderRadius:6,color:'white',padding:'7px 9px',fontSize:11,outline:'none'}}/>
        </div>
      )}

      <div style={{padding:'8px 12px',flex:1,overflowY:'auto'}}>
        {isTeacher&&<div style={{color:'#3d5a73',fontSize:9,letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:6,marginTop:4}}>Meus Alunos</div>}
        {filtered.map(s=>(
          <button key={s.id} onClick={()=>onSelect(s.id)}
            style={{width:'100%',display:'flex',alignItems:'center',gap:8,padding:'7px 8px',borderRadius:8,border:'none',cursor:'pointer',marginBottom:2,textAlign:'left',
              background:activeId===s.id?'#1a365d':'transparent'}}>
            <div style={{width:28,height:28,borderRadius:'50%',background:activeId===s.id?'#c8973e':'#172d42',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:11,fontWeight:700,flexShrink:0}}>
              {(s.name||s.email||'?').charAt(0).toUpperCase()}
            </div>
            <div style={{overflow:'hidden'}}>
              <div style={{color:activeId===s.id?'white':'#8aa4b8',fontSize:12,fontWeight:600,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{s.name||s.email}</div>
              {s.level&&<div style={{color:'#3d5a73',fontSize:9,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{s.level}</div>}
            </div>
          </button>
        ))}
      </div>

      <div style={{padding:10,borderTop:'1px solid #172d42'}}>
        {isTeacher&&(
          <button onClick={()=>setShowAdd(true)}
            style={{width:'100%',padding:'7px',border:'1px dashed #243e56',borderRadius:7,background:'transparent',color:'#3d5a73',cursor:'pointer',fontSize:11,marginBottom:6}}>
            + Novo Aluno
          </button>
        )}
        <button onClick={onLogout}
          style={{width:'100%',padding:'7px',border:'1px solid #243e56',borderRadius:7,background:'transparent',color:'#3d5a73',cursor:'pointer',fontSize:11}}>
          Sair
        </button>
      </div>
    </div>
  );
}

// ─── HEADER ──────────────────────────────────────────────────────────────────
function Header({ student, isTeacher }) {
  return (
    <div style={{background:'linear-gradient(135deg,#0b1929,#1a365d)',padding:'13px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',boxShadow:'0 2px 16px rgba(0,0,0,0.25)'}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <div style={{width:42,height:42,borderRadius:'50%',background:'linear-gradient(135deg,#c8973e,#e8b84b)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:700,color:'#1a365d',fontFamily:"'Cormorant Garamond',serif"}}>FB</div>
        <div>
          <div style={{color:'#e8b84b',fontSize:10,fontWeight:600,letterSpacing:'0.15em',textTransform:'uppercase'}}>Prof. Dr.</div>
          <div style={{color:'white',fontSize:18,fontWeight:700,fontFamily:"'Cormorant Garamond',serif",lineHeight:1.1}}>Fabio Busse</div>
          <div style={{color:'#4a6b87',fontSize:9,letterSpacing:'0.08em'}}>Inglês Profissional</div>
        </div>
      </div>
      {student&&(
        <div style={{textAlign:'right'}}>
          <div style={{color:'#3d5a73',fontSize:10,textTransform:'uppercase',letterSpacing:'0.1em'}}>{isTeacher?'Visualizando':'Meu dashboard'}</div>
          <div style={{color:'white',fontSize:15,fontWeight:600}}>{student.name||student.email}</div>
          {student.level&&<div style={{display:'inline-block',background:'rgba(200,151,62,0.15)',border:'1px solid rgba(200,151,62,0.35)',color:'#e8b84b',fontSize:10,padding:'2px 8px',borderRadius:12,marginTop:2}}>{student.level}</div>}
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const TABS = [
  {id:'overview',icon:'📊',label:'Visão Geral'},
  {id:'calendar',icon:'📅',label:'Calendário'},
  {id:'grammar', icon:'📚',label:'Gramática & Skills'},
  {id:'schedule',icon:'🗓️',label:'Agenda'},
  {id:'profile', icon:'👤',label:'Perfil'},
];

export default function App() {
  const [user,     setUser]     = useState(null);
  const [profile,  setProfile]  = useState(null);
  const [students, setStudents] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [tab,      setTab]      = useState('overview');
  const [loading,  setLoading]  = useState(true);

  useEffect(()=>{
    supabase.auth.getUser().then(({data:{user}})=>{
      if(user) loadProfile(user);
      else setLoading(false);
    });
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
      if (data.role==='teacher') {
        loadStudents(u.id);
      } else {
        setActiveId(u.id);
      }
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
    <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0b1929'}}>
      <style>{CSS}</style>
      <div style={{color:'#e8b84b',fontFamily:"'Cormorant Garamond',serif",fontSize:22}}>Carregando…</div>
    </div>
  );

  if (!user) return <AuthScreen onAuth={u=>loadProfile(u)}/>;

  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column',fontFamily:"'DM Sans',sans-serif"}}>
      <style>{CSS}</style>
      <Header student={activeStudent} isTeacher={isTeacher}/>
      <div style={{display:'flex',flex:1,overflow:'hidden'}}>
        {isTeacher&&(
          <Sidebar user={user} students={students} activeId={activeId} onSelect={id=>{setActiveId(id);setTab('overview');}}
            isTeacher={isTeacher} onAddStudent={()=>loadStudents(user.id)} onLogout={logout}/>
        )}
        {!isTeacher&&(
          <div style={{width:60,background:'#0b1929',display:'flex',flexDirection:'column',alignItems:'center',padding:'12px 0',gap:8,borderRight:'1px solid #172d42'}}>
            <button onClick={logout} style={{background:'none',border:'none',color:'#3d5a73',cursor:'pointer',fontSize:10,padding:'6px',borderRadius:6,textAlign:'center'}}>
              <div style={{fontSize:16,marginBottom:2}}>🚪</div>Sair
            </button>
          </div>
        )}
        <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
          <div style={{background:'white',borderBottom:'1px solid #e2e8f0',display:'flex',alignItems:'center',padding:'0 12px',gap:2,flexShrink:0,overflowX:'auto'}}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)}
                style={{padding:'11px 12px',border:'none',fontSize:12,fontWeight:600,borderRadius:'8px 8px 0 0',
                  display:'flex',alignItems:'center',gap:5,cursor:'pointer',whiteSpace:'nowrap',
                  background:tab===t.id?'#1a365d':'transparent',color:tab===t.id?'white':'#64748b'}}>
                <span style={{fontSize:13}}>{t.icon}</span>{t.label}
              </button>
            ))}
          </div>
          <div style={{flex:1,overflowY:'auto',background:'#f0f4f8'}}>
            {!activeId?(
              <div style={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:10}}>
                <div style={{fontSize:40}}>👈</div>
                <div style={{fontSize:15,color:'#64748b'}}>Selecione ou adicione um aluno</div>
              </div>
            ):(
              <>
                {tab==='overview' &&<OverviewTab studentId={activeId}/>}
                {tab==='calendar' &&<CalendarTab studentId={activeId} isTeacher={isTeacher}/>}
                {tab==='grammar'  &&<GrammarTab  studentId={activeId} isTeacher={isTeacher}/>}
                {tab==='schedule' &&<ScheduleTab studentId={activeId} isTeacher={isTeacher}/>}
                {tab==='profile'  &&<ProfileTab  profile={activeStudent} isTeacher={isTeacher}/>}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);