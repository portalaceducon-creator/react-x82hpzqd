import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { createRoot } from 'react-dom/client';

const SUPABASE_URL = 'https://efjehnvnhnwamyccevkj.supabase.co';
const SUPABASE_KEY = 'sb_publishable_qkNPJ8KZ8_NZcNC-Tu6phA_smsV5H9M';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const GRAMMAR_TOPICS = [
  {id:"g1",cat:"Verb Tenses",name:"Simple Present"},{id:"g2",cat:"Verb Tenses",name:"Present Continuous"},
  {id:"g3",cat:"Verb Tenses",name:"Present Perfect"},{id:"g4",cat:"Verb Tenses",name:"Present Perfect Continuous"},
  {id:"g5",cat:"Verb Tenses",name:"Simple Past"},{id:"g6",cat:"Verb Tenses",name:"Past Continuous"},
  {id:"g7",cat:"Verb Tenses",name:"Past Perfect"},{id:"g8",cat:"Verb Tenses",name:"Past Perfect Continuous"},
  {id:"g9",cat:"Verb Tenses",name:"Simple Future (will)"},{id:"g10",cat:"Verb Tenses",name:"Be Going To"},
  {id:"g11",cat:"Verb Tenses",name:"Future Continuous"},{id:"g12",cat:"Verb Tenses",name:"Future Perfect"},
  {id:"g13",cat:"Verb Tenses",name:"Future Perfect Continuous"},{id:"g14",cat:"Modal Verbs",name:"Can / Cannot"},
  {id:"g15",cat:"Modal Verbs",name:"Could / Couldn't"},{id:"g16",cat:"Modal Verbs",name:"May / May Not"},
  {id:"g17",cat:"Modal Verbs",name:"Might / Might Not"},{id:"g18",cat:"Modal Verbs",name:"Must / Must Not"},
  {id:"g19",cat:"Modal Verbs",name:"Have To / Don't Have To"},{id:"g20",cat:"Modal Verbs",name:"Should / Shouldn't"},
  {id:"g21",cat:"Modal Verbs",name:"Ought To"},{id:"g22",cat:"Modal Verbs",name:"Would / Wouldn't"},
  {id:"g23",cat:"Modal Verbs",name:"Shall"},{id:"g24",cat:"Modal Verbs",name:"Need To / Needn't"},
  {id:"g25",cat:"Modal Verbs",name:"Used To / Would (past habits)"},{id:"g26",cat:"Articles",name:"Definite Article (The)"},
  {id:"g27",cat:"Articles",name:"Indefinite Articles (A / An)"},{id:"g28",cat:"Articles",name:"Zero Article"},
  {id:"g29",cat:"Articles",name:"Quantifiers"},{id:"g30",cat:"Articles",name:"Demonstratives"},
  {id:"g31",cat:"Nouns",name:"Countable & Uncountable"},{id:"g32",cat:"Nouns",name:"Plural Forms"},
  {id:"g33",cat:"Nouns",name:"Compound Nouns"},{id:"g34",cat:"Nouns",name:"Possessive 's"},
  {id:"g35",cat:"Nouns",name:"Collective Nouns"},{id:"g36",cat:"Pronouns",name:"Personal Pronouns"},
  {id:"g37",cat:"Pronouns",name:"Possessive Pronouns"},{id:"g38",cat:"Pronouns",name:"Reflexive Pronouns"},
  {id:"g39",cat:"Pronouns",name:"Relative Pronouns"},{id:"g40",cat:"Pronouns",name:"Indefinite Pronouns"},
  {id:"g41",cat:"Adjectives",name:"Descriptive Adjectives"},{id:"g42",cat:"Adjectives",name:"Comparative"},
  {id:"g43",cat:"Adjectives",name:"Superlative"},{id:"g44",cat:"Adjectives",name:"Order of Adjectives"},
  {id:"g45",cat:"Adjectives",name:"Participial Adjectives"},{id:"g46",cat:"Adverbs",name:"Adverbs of Frequency"},
  {id:"g47",cat:"Adverbs",name:"Adverbs of Manner"},{id:"g48",cat:"Adverbs",name:"Adverbs of Time"},
  {id:"g49",cat:"Adverbs",name:"Adverbs of Place"},{id:"g50",cat:"Adverbs",name:"Adverbs of Degree"},
  {id:"g51",cat:"Prepositions",name:"Prepositions of Time"},{id:"g52",cat:"Prepositions",name:"Prepositions of Place"},
  {id:"g53",cat:"Prepositions",name:"Prepositions of Movement"},{id:"g54",cat:"Prepositions",name:"Dependent Prepositions"},
  {id:"g55",cat:"Phrasal Verbs",name:"Phrasal Verbs – Basic"},{id:"g56",cat:"Phrasal Verbs",name:"Phrasal Verbs – Intermediate"},
  {id:"g57",cat:"Phrasal Verbs",name:"Phrasal Verbs – Advanced"},{id:"g58",cat:"Sentence Structure",name:"Word Order"},
  {id:"g59",cat:"Sentence Structure",name:"Questions"},{id:"g60",cat:"Sentence Structure",name:"Negative Sentences"},
  {id:"g61",cat:"Sentence Structure",name:"Question Tags"},{id:"g62",cat:"Conditionals",name:"Zero Conditional"},
  {id:"g63",cat:"Conditionals",name:"First Conditional"},{id:"g64",cat:"Conditionals",name:"Second Conditional"},
  {id:"g65",cat:"Conditionals",name:"Third Conditional"},{id:"g66",cat:"Conditionals",name:"Mixed Conditionals"},
  {id:"g67",cat:"Passive Voice",name:"Passive – Present"},{id:"g68",cat:"Passive Voice",name:"Passive – Past"},
  {id:"g69",cat:"Passive Voice",name:"Passive – Future"},{id:"g70",cat:"Passive Voice",name:"Causative"},
  {id:"g71",cat:"Reported Speech",name:"Reported Statements"},{id:"g72",cat:"Reported Speech",name:"Reported Questions"},
  {id:"g73",cat:"Reported Speech",name:"Tense Backshift"},{id:"g74",cat:"Reported Speech",name:"Reporting Verbs"},
  {id:"g75",cat:"Infinitives & Gerunds",name:"Verb + Infinitive"},{id:"g76",cat:"Infinitives & Gerunds",name:"Verb + Gerund"},
  {id:"g77",cat:"Infinitives & Gerunds",name:"Infinitive of Purpose"},{id:"g78",cat:"Advanced Grammar",name:"Inversion"},
  {id:"g79",cat:"Advanced Grammar",name:"Cleft Sentences"},{id:"g80",cat:"Advanced Grammar",name:"Subjunctive Mood"},
  {id:"g81",cat:"Advanced Grammar",name:"Wish / If Only"},{id:"g82",cat:"Discourse",name:"Discourse Markers"},
  {id:"g83",cat:"Discourse",name:"Register & Formality"},{id:"g84",cat:"Discourse",name:"Hedging Language"},
];

const SKILL_SUBS={speaking:["Fluência","Pronúncia","Vocabulário","Gramática"],reading:["Compreensão","Velocidade","Vocabulário","Inferência"],listening:["Compreensão","Sotaques","Anotações"],writing:["Estrutura","Gramática","Vocabulário","Coerência"]};
const MONTHS=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
const MFULL=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const WDAYS=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
const WFULL=["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
const LEVELS=["Absolute Beginner","Beginner","Elementary","Pre-Intermediate","Intermediate","Upper-Intermediate","Advanced","Proficiency"];
const LESSON_STATUS={
  attended:{label:"Realizada",color:"#c8f135",bg:"rgba(200,241,53,0.15)"},
  cancelled_student:{label:"Aluno cancelou",color:"#f0a500",bg:"rgba(240,165,0,0.15)"},
  cancelled_late:{label:"Cancelou <24h",color:"#ff4d4d",bg:"rgba(255,77,77,0.15)"},
  cancelled_teacher:{label:"Prof. cancelou",color:"#a78bfa",bg:"rgba(167,139,250,0.15)"},
  no_show:{label:"Não apareceu",color:"#ff4d4d",bg:"rgba(255,77,77,0.15)"},
};
const TASK_STATUS={done:{label:"Feitas",color:"#c8f135"},partial:{label:"Parcialmente",color:"#f0a500"},not_done:{label:"Não fez",color:"#ff4d4d"},none:{label:"Sem tarefa",color:"#555"}};
const pad=n=>String(n).padStart(2,"0");
const dateStr=(y,m,d)=>`${y}-${pad(m+1)}-${pad(d)}`;
const today=()=>{const n=new Date();return dateStr(n.getFullYear(),n.getMonth(),n.getDate());};
function endTime(s,dur){const[h,m]=s.split(":").map(Number);const e=new Date(2000,0,1,h,m+dur);return`${pad(e.getHours())}:${pad(e.getMinutes())}`;}
function getYouTubeId(url){const r=url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);return r?r[1]:null;}
const fmtBRL=v=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v||0);

const BG="#111111",CARD="#1e1e1e",CARD2="#272727",BORDER="#333333",TEXT="#ffffff",TEXT2="#aaaaaa",TEXT3="#666666",LIME="#c8f135",BLUE="#4da6ff",CORAL="#ff6b6b",AMBER="#f0a500",PURPLE="#a78bfa";

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
html{font-size:16px;-webkit-text-size-adjust:100%}
body{font-family:'Inter',sans-serif;background:#111111;color:#ffffff;min-height:100vh}
input,select,textarea,button{font-family:'Inter',sans-serif}
input:focus,select:focus,textarea:focus{outline:2px solid #c8f135;outline-offset:0}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-thumb{background:#333;border-radius:2px}
.fade{animation:fi 0.18s ease}
@keyframes fi{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.tap{transition:transform 0.1s,opacity 0.1s;cursor:pointer}
.tap:active{transform:scale(0.96);opacity:0.8}
`;

// ── AUTH ──
function AuthScreen({onAuth}){
  const[mode,setMode]=useState('login');
  const[email,setEmail]=useState('');
  const[pass,setPass]=useState('');
  const[name,setName]=useState('');
  const[err,setErr]=useState('');
  const[loading,setLoading]=useState(false);
  const ipt={width:'100%',background:CARD2,border:`1px solid ${BORDER}`,borderRadius:14,padding:'16px 18px',fontSize:16,color:TEXT,marginBottom:12};
  const submit=async()=>{
    if(!email||!pass)return setErr('Preencha todos os campos');
    setErr('');setLoading(true);
    try{
      if(mode==='login'){const{data,error}=await supabase.auth.signInWithPassword({email,password:pass});if(error)throw error;onAuth(data.user);}
      else{
        if(!name)return setErr('Digite seu nome');
        const{data,error}=await supabase.auth.signUp({email,password:pass,options:{data:{name,role:'student'}}});
        if(error)throw error;
        if(data.user){await supabase.from('profiles').upsert({id:data.user.id,email,name,role:'student'});onAuth(data.user);}
        else setErr('Verifique seu email');
      }
    }catch(e){setErr(e.message==='Invalid login credentials'?'Email ou senha incorretos':e.message);}
    setLoading(false);
  };
  return(
    <div style={{minHeight:'100vh',background:BG,display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <style>{CSS}</style>
      <div style={{width:'100%',maxWidth:400}}>
        <div style={{textAlign:'center',marginBottom:40}}>
          <div style={{width:80,height:80,borderRadius:24,background:LIME,display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,fontWeight:900,color:'#111',margin:'0 auto 20px'}}>FB</div>
          <div style={{color:TEXT3,fontSize:12,fontWeight:600,letterSpacing:'0.2em',textTransform:'uppercase',marginBottom:6}}>Prof. Dr.</div>
          <div style={{color:TEXT,fontSize:32,fontWeight:800,letterSpacing:'-0.03em'}}>Fabio Busse</div>
          <div style={{color:TEXT3,fontSize:14,marginTop:6}}>Inglês Profissional · Curitiba, PR</div>
        </div>
        <div style={{background:CARD,borderRadius:24,padding:28,border:`1px solid ${BORDER}`}}>
          <div style={{display:'flex',background:BG,borderRadius:14,padding:4,marginBottom:24,gap:4}}>
            {[['login','Entrar'],['register','Cadastrar']].map(([k,l])=>(
              <button key={k} onClick={()=>setMode(k)} className="tap" style={{flex:1,padding:'12px',borderRadius:11,border:'none',cursor:'pointer',fontWeight:700,fontSize:15,background:mode===k?LIME:'transparent',color:mode===k?'#111':TEXT3}}>{l}</button>
            ))}
          </div>
          {mode==='register'&&<input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome completo" style={ipt}/>}
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={ipt}/>
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Senha" style={{...ipt,marginBottom:20}} onKeyDown={e=>e.key==='Enter'&&submit()}/>
          {err&&<div style={{background:'rgba(255,77,77,0.15)',border:`1px solid ${CORAL}`,borderRadius:12,padding:'12px 14px',fontSize:14,color:CORAL,marginBottom:16}}>{err}</div>}
          <button onClick={submit} disabled={loading} className="tap" style={{width:'100%',padding:18,borderRadius:14,border:'none',background:LIME,color:'#111',fontSize:16,fontWeight:800,cursor:'pointer'}}>{loading?'Aguarde…':mode==='login'?'Entrar':'Criar conta'}</button>
        </div>
      </div>
    </div>
  );
}

// ── TEACHER HOME ──
function TeacherHome({students,onSelectStudent,onAddStudent,onReload}){
  const[lessons,setLessons]=useState([]);
  const[schedules,setSchedules]=useState([]);
  const[homeworks,setHomeworks]=useState([]);
  const[quickModal,setQuickModal]=useState(null);
  const[taskModal,setTaskModal]=useState(false);
  const[taskTitle,setTaskTitle]=useState('');
  const[taskDesc,setTaskDesc]=useState('');
  const[addModal,setAddModal]=useState(false);
  const[newName,setNewName]=useState('');
  const[newEmail,setNewEmail]=useState('');
  const[newPass,setNewPass]=useState('');
  const[newValue,setNewValue]=useState('');
  const[creating,setCreating]=useState(false);
  const[createErr,setCreateErr]=useState('');

  const now=new Date();
  const monthStart=`${now.getFullYear()}-${pad(now.getMonth()+1)}-01`;
  const monthEnd=`${now.getFullYear()}-${pad(now.getMonth()+1)}-31`;
  const todayStr=today();
  const dow=now.getDay();
  const weekEnd=new Date(now);weekEnd.setDate(now.getDate()+(6-dow));
  const weekEndStr=dateStr(weekEnd.getFullYear(),weekEnd.getMonth(),weekEnd.getDate());

  useEffect(()=>{
    if(!students.length)return;
    const ids=students.map(s=>s.id);
    supabase.from('lessons').select('*').in('student_id',ids).gte('lesson_date',monthStart).lte('lesson_date',monthEnd).then(({data})=>setLessons(data||[]));
    supabase.from('schedules').select('*').in('student_id',ids).then(({data})=>setSchedules(data||[]));
    supabase.from('homework').select('*').in('student_id',ids).eq('done',false).then(({data})=>setHomeworks(data||[]));
  },[students]);

  // Stats
  const attended=lessons.filter(l=>l.status==='attended').length;
  const cancelledLate=lessons.filter(l=>l.status==='cancelled_late'||l.status==='no_show').length;
  const cancelledOk=lessons.filter(l=>l.status==='cancelled_student').length;
  const tchCan=lessons.filter(l=>l.status==='cancelled_teacher').length;
  const total=lessons.length-tchCan;
  const rate=total>0?Math.round(attended/total*100):0;

  // Aulas de hoje
  const todaySchedules=schedules.filter(s=>s.day_of_week===dow);
  const todayLessons=todaySchedules.map(s=>{
    const st=students.find(st=>st.id===s.student_id);
    return{...s,studentName:st?.name||'?',studentId:s.student_id};
  }).sort((a,b)=>a.start_time>b.start_time?1:-1);

  // Aulas da semana
  const weekSchedules=schedules.filter(s=>{
    const d=new Date(now);
    d.setDate(now.getDate()+(s.day_of_week-dow+7)%7);
    const ds=dateStr(d.getFullYear(),d.getMonth(),d.getDate());
    return ds>=todayStr&&ds<=weekEndStr;
  });
  const weekStudentIds=[...new Set(weekSchedules.map(s=>s.student_id))];
  const weekStudents=students.filter(s=>weekStudentIds.includes(s.id));

  // Baixa presença
  const lowPresence=students.filter(s=>{
    const sl=lessons.filter(l=>l.student_id===s.id);
    const tc=sl.filter(l=>l.status==='cancelled_teacher').length;
    const tot=sl.length-tc;
    const att=sl.filter(l=>l.status==='attended').length;
    return tot>2&&Math.round(att/tot*100)<70;
  });

  // Financeiro
  const financial=students.map(s=>{
    const att=lessons.filter(l=>l.student_id===s.id&&l.status==='attended').length;
    const val=parseFloat(s.lesson_value||0);
    return{...s,attended:att,total:att*val};
  });
  const totalMonth=financial.reduce((a,f)=>a+f.total,0);

  // Quick register
  const quickSave=async(studentId,status)=>{
    await supabase.from('lessons').insert({student_id:studentId,lesson_date:todayStr,status,tasks:'none'});
    setQuickModal(null);
    const ids=students.map(s=>s.id);
    supabase.from('lessons').select('*').in('student_id',ids).gte('lesson_date',monthStart).lte('lesson_date',monthEnd).then(({data})=>setLessons(data||[]));
  };

  // Send task to all
  const sendTaskAll=async()=>{
    if(!taskTitle)return;
    const inserts=students.map(s=>({student_id:s.id,title:taskTitle,description:taskDesc,done:false}));
    await supabase.from('homework').insert(inserts);
    setTaskModal(false);setTaskTitle('');setTaskDesc('');
    const ids=students.map(s=>s.id);
    supabase.from('homework').select('*').in('student_id',ids).eq('done',false).then(({data})=>setHomeworks(data||[]));
  };

  // Create student
  const createStudent=async()=>{
    setCreating(true);setCreateErr('');
    try{
      const{data,error}=await supabase.auth.signUp({email:newEmail,password:newPass,options:{data:{name:newName,role:'student'}}});
      if(error)throw error;
      if(data.user)await supabase.from('profiles').upsert({id:data.user.id,email:newEmail,name:newName,role:'student',teacher_id:'68b28e05-5161-44ca-9d5c-2fb35cefe705',lesson_value:parseFloat(newValue)||0});
      onReload();setAddModal(false);setNewName('');setNewEmail('');setNewPass('');setNewValue('');
    }catch(e){setCreateErr(e.message);}
    setCreating(false);
  };

  const ipt={width:'100%',background:BG,border:`1px solid ${BORDER}`,borderRadius:12,padding:'13px 16px',fontSize:15,color:TEXT,marginBottom:10};
  const card={background:CARD,borderRadius:20,padding:20,border:`1px solid ${BORDER}`,marginBottom:16};

  return(
    <div className="fade" style={{padding:20,paddingBottom:120,overflowY:'auto'}}>

      {/* Modals */}
      {quickModal&&(
        <div onClick={e=>e.target===e.currentTarget&&setQuickModal(null)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',zIndex:300,display:'flex',alignItems:'flex-end',justifyContent:'center',backdropFilter:'blur(8px)'}}>
          <div style={{background:CARD,borderRadius:'24px 24px 0 0',padding:24,width:'100%',maxWidth:540,border:`1px solid ${BORDER}`}}>
            <div style={{width:40,height:4,borderRadius:2,background:BORDER,margin:'0 auto 20px'}}/>
            <div style={{fontSize:18,fontWeight:800,color:TEXT,marginBottom:4}}>Registrar Aula</div>
            <div style={{fontSize:14,color:TEXT3,marginBottom:20}}>{quickModal.name} · Hoje</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {Object.entries(LESSON_STATUS).map(([k,c])=>(
                <button key={k} onClick={()=>quickSave(quickModal.id,k)} className="tap"
                  style={{padding:'16px',borderRadius:14,border:`2px solid ${c.color}`,background:`${c.color}15`,color:c.color,fontSize:14,fontWeight:700,cursor:'pointer'}}>
                  {c.label}
                </button>
              ))}
            </div>
            <button onClick={()=>setQuickModal(null)} style={{width:'100%',marginTop:14,padding:'14px',borderRadius:14,border:`1px solid ${BORDER}`,background:'transparent',color:TEXT3,cursor:'pointer',fontSize:14,fontWeight:600}}>Cancelar</button>
          </div>
        </div>
      )}

      {taskModal&&(
        <div onClick={e=>e.target===e.currentTarget&&setTaskModal(false)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',zIndex:300,display:'flex',alignItems:'flex-end',justifyContent:'center',backdropFilter:'blur(8px)'}}>
          <div style={{background:CARD,borderRadius:'24px 24px 0 0',padding:24,width:'100%',maxWidth:540,border:`1px solid ${BORDER}`}}>
            <div style={{width:40,height:4,borderRadius:2,background:BORDER,margin:'0 auto 20px'}}/>
            <div style={{fontSize:18,fontWeight:800,color:TEXT,marginBottom:20}}>Enviar tarefa para todos</div>
            <input value={taskTitle} onChange={e=>setTaskTitle(e.target.value)} placeholder="Título da tarefa *" style={ipt}/>
            <textarea value={taskDesc} onChange={e=>setTaskDesc(e.target.value)} placeholder="Descrição" style={{...ipt,resize:'vertical',minHeight:80,marginBottom:16}}/>
            <div style={{display:'flex',gap:8}}>
              <button onClick={()=>setTaskModal(false)} style={{flex:1,padding:'14px',borderRadius:14,border:`1px solid ${BORDER}`,background:'transparent',color:TEXT3,cursor:'pointer',fontSize:14,fontWeight:600}}>Cancelar</button>
              <button onClick={sendTaskAll} style={{flex:2,padding:'14px',borderRadius:14,border:'none',background:LIME,color:'#111',cursor:'pointer',fontSize:15,fontWeight:800}}>Enviar para todos</button>
            </div>
          </div>
        </div>
      )}

      {addModal&&(
        <div onClick={e=>e.target===e.currentTarget&&setAddModal(false)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',zIndex:300,display:'flex',alignItems:'flex-end',justifyContent:'center',backdropFilter:'blur(8px)'}}>
          <div style={{background:CARD,borderRadius:'24px 24px 0 0',padding:24,width:'100%',maxWidth:540,border:`1px solid ${BORDER}`,maxHeight:'90vh',overflowY:'auto'}}>
            <div style={{width:40,height:4,borderRadius:2,background:BORDER,margin:'0 auto 20px'}}/>
            <div style={{fontSize:18,fontWeight:800,color:TEXT,marginBottom:20}}>Novo Aluno</div>
            <input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="Nome completo *" style={ipt}/>
            <input type="email" value={newEmail} onChange={e=>setNewEmail(e.target.value)} placeholder="Email *" style={ipt}/>
            <input type="password" value={newPass} onChange={e=>setNewPass(e.target.value)} placeholder="Senha *" style={ipt}/>
            <div style={{position:'relative',marginBottom:10}}>
              <span style={{position:'absolute',left:16,top:'50%',transform:'translateY(-50%)',color:TEXT3,fontSize:15,fontWeight:600}}>R$</span>
              <input type="number" value={newValue} onChange={e=>setNewValue(e.target.value)} placeholder="0,00" style={{...ipt,paddingLeft:44,marginBottom:0}}/>
            </div>
            <div style={{fontSize:12,color:TEXT3,marginBottom:16}}>Valor por aula (usado no financeiro)</div>
            {createErr&&<div style={{color:CORAL,fontSize:13,marginBottom:10,fontWeight:600}}>{createErr}</div>}
            <div style={{display:'flex',gap:8}}>
              <button onClick={()=>setAddModal(false)} style={{flex:1,padding:'14px',borderRadius:14,border:`1px solid ${BORDER}`,background:'transparent',color:TEXT3,cursor:'pointer',fontSize:14,fontWeight:600}}>Cancelar</button>
              <button onClick={createStudent} disabled={creating} style={{flex:2,padding:'14px',borderRadius:14,border:'none',background:LIME,color:'#111',cursor:'pointer',fontSize:15,fontWeight:800}}>{creating?'Criando…':'Criar Aluno'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Saudação */}
      <div style={{marginBottom:20}}>
        <div style={{fontSize:13,color:TEXT3,fontWeight:600,marginBottom:4}}>Bem-vindo,</div>
        <div style={{fontSize:28,fontWeight:900,color:TEXT,letterSpacing:'-0.03em',lineHeight:1}}>Prof. Dr. Fabio Busse</div>
        <div style={{fontSize:14,color:TEXT3,marginTop:6}}>{WFULL[dow]}, {now.getDate()} de {MFULL[now.getMonth()]}</div>
      </div>

      {/* Atalhos rápidos */}
      <div style={{display:'flex',gap:10,marginBottom:20}}>
        <button onClick={()=>setAddModal(true)} className="tap" style={{flex:1,padding:'14px 10px',borderRadius:16,border:`2px solid ${LIME}`,background:`${LIME}15`,color:LIME,fontSize:13,fontWeight:800,cursor:'pointer'}}>+ Novo Aluno</button>
        <button onClick={()=>setTaskModal(true)} className="tap" style={{flex:1,padding:'14px 10px',borderRadius:16,border:`2px solid ${BLUE}`,background:`${BLUE}15`,color:BLUE,fontSize:13,fontWeight:800,cursor:'pointer'}}>📝 Tarefa p/ Todos</button>
      </div>

      {/* Visão Geral */}
      <div style={card}>
        <div style={{fontSize:12,fontWeight:700,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16}}>Visão Geral · {MFULL[now.getMonth()]}</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
          {[
            {label:'Alunos ativos',value:students.length,color:BLUE},
            {label:'Aulas realizadas',value:attended,color:LIME},
            {label:'Canceladas +24h',value:cancelledOk,color:AMBER},
            {label:'Canceladas <24h',value:cancelledLate,color:CORAL},
            {label:'Presença geral',value:rate+'%',color:rate>=80?LIME:rate>=60?AMBER:CORAL},
            {label:'Prof. cancelou',value:tchCan,color:PURPLE},
          ].map(s=>(
            <div key={s.label} style={{background:CARD2,borderRadius:14,padding:16}}>
              <div style={{fontSize:28,fontWeight:900,color:s.color,letterSpacing:'-0.02em',lineHeight:1}}>{s.value}</div>
              <div style={{fontSize:11,fontWeight:600,color:TEXT3,marginTop:6,textTransform:'uppercase',letterSpacing:'0.05em'}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Aulas de hoje */}
      <div style={card}>
        <div style={{fontSize:12,fontWeight:700,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16}}>Aulas de Hoje</div>
        {todayLessons.length===0&&<div style={{textAlign:'center',padding:'16px 0',color:TEXT3,fontSize:14}}>Nenhuma aula hoje</div>}
        {todayLessons.map((s,i)=>{
          const registered=lessons.find(l=>l.student_id===s.studentId&&l.lesson_date===todayStr);
          return(
            <div key={i} style={{display:'flex',alignItems:'center',gap:14,padding:'12px 0',borderBottom:i<todayLessons.length-1?`1px solid ${BORDER}`:'none'}}>
              <div style={{width:44,height:44,borderRadius:13,background:LIME,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontWeight:900,color:'#111',flexShrink:0}}>{s.studentName.charAt(0)}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:16,fontWeight:700,color:TEXT}}>{s.studentName}</div>
                <div style={{fontSize:13,color:TEXT3}}>{s.start_time} – {endTime(s.start_time,s.duration||60)}</div>
              </div>
              {registered?(
                <div style={{padding:'6px 12px',borderRadius:10,background:LESSON_STATUS[registered.status]?.bg,border:`1px solid ${LESSON_STATUS[registered.status]?.color}`,fontSize:12,fontWeight:700,color:LESSON_STATUS[registered.status]?.color}}>
                  {LESSON_STATUS[registered.status]?.label}
                </div>
              ):(
                <button onClick={()=>setQuickModal({id:s.studentId,name:s.studentName})} className="tap"
                  style={{padding:'8px 14px',borderRadius:10,border:`1px solid ${LIME}`,background:`${LIME}15`,color:LIME,cursor:'pointer',fontSize:13,fontWeight:700}}>
                  Registrar
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Próximas aulas da semana */}
      {weekStudents.length>0&&(
        <div style={card}>
          <div style={{fontSize:12,fontWeight:700,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16}}>Esta Semana</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            {weekStudents.map(s=>(
              <div key={s.id} className="tap" onClick={()=>onSelectStudent(s.id)}
                style={{display:'flex',alignItems:'center',gap:8,background:CARD2,borderRadius:12,padding:'10px 14px',border:`1px solid ${BORDER}`}}>
                <div style={{width:28,height:28,borderRadius:8,background:LIME,display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:900,color:'#111'}}>{s.name?.charAt(0)||'?'}</div>
                <span style={{fontSize:14,fontWeight:600,color:TEXT}}>{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lista de alunos */}
      <div style={card}>
        <div style={{fontSize:12,fontWeight:700,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16}}>Todos os Alunos</div>
        {students.length===0&&<div style={{textAlign:'center',padding:'16px 0',color:TEXT3,fontSize:14}}>Nenhum aluno cadastrado</div>}
        {students.map((s,i)=>{
          const sl=lessons.filter(l=>l.student_id===s.id);
          const tc=sl.filter(l=>l.status==='cancelled_teacher').length;
          const tot=sl.length-tc;
          const att=sl.filter(l=>l.status==='attended').length;
          const rate=tot>0?Math.round(att/tot*100):null;
          const hw=homeworks.filter(h=>h.student_id===s.id).length;
          const lowP=rate!==null&&rate<70;
          return(
            <div key={s.id} className="tap" onClick={()=>onSelectStudent(s.id)}
              style={{display:'flex',alignItems:'center',gap:14,padding:'14px 0',borderBottom:i<students.length-1?`1px solid ${BORDER}`:'none'}}>
              <div style={{width:48,height:48,borderRadius:14,background:lowP?`${CORAL}22`:CARD2,border:`2px solid ${lowP?CORAL:BORDER}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,fontWeight:900,color:lowP?CORAL:LIME,flexShrink:0}}>{s.name?.charAt(0)||'?'}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:3}}>
                  <span style={{fontSize:16,fontWeight:700,color:TEXT,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{s.name}</span>
                  {hw>0&&<span style={{background:`${AMBER}22`,border:`1px solid ${AMBER}`,color:AMBER,fontSize:11,fontWeight:700,padding:'2px 8px',borderRadius:8,flexShrink:0}}>{hw} tarefa{hw>1?'s':''}</span>}
                  {lowP&&<span style={{background:`${CORAL}22`,border:`1px solid ${CORAL}`,color:CORAL,fontSize:11,fontWeight:700,padding:'2px 8px',borderRadius:8,flexShrink:0}}>⚠ {rate}%</span>}
                </div>
                <div style={{fontSize:13,color:TEXT3}}>{s.level||'Sem nível'}{rate!==null?` · ${rate}% presença`:''}</div>
              </div>
              <div style={{color:TEXT3,fontSize:18}}>›</div>
            </div>
          );
        })}
      </div>

      {/* Financeiro */}
      <div style={card}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:700,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.08em'}}>Financeiro · {MFULL[now.getMonth()]}</div>
          <div style={{fontSize:20,fontWeight:900,color:LIME}}>{fmtBRL(totalMonth)}</div>
        </div>
        {financial.filter(f=>f.lesson_value>0||f.attended>0).map((f,i)=>(
          <div key={f.id} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 0',borderBottom:i<financial.length-1?`1px solid ${BORDER}`:'none'}}>
            <div style={{width:36,height:36,borderRadius:10,background:CARD2,display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,fontWeight:900,color:LIME,flexShrink:0}}>{f.name?.charAt(0)||'?'}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontWeight:700,color:TEXT}}>{f.name}</div>
              <div style={{fontSize:13,color:TEXT3}}>{f.attended} aulas × {fmtBRL(parseFloat(f.lesson_value||0))}</div>
            </div>
            <div style={{fontSize:16,fontWeight:800,color:f.total>0?LIME:TEXT3}}>{fmtBRL(f.total)}</div>
          </div>
        ))}
        {financial.every(f=>!f.lesson_value)&&(
          <div style={{textAlign:'center',padding:'12px 0',color:TEXT3,fontSize:13}}>Configure o valor por aula no perfil de cada aluno</div>
        )}
      </div>

      {/* Contatos */}
      <div style={card}>
        <div style={{fontSize:12,fontWeight:700,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16}}>Contatos</div>
        <a href="https://wa.me/5541999557665" target="_blank" rel="noreferrer" style={{display:'flex',alignItems:'center',gap:14,padding:'13px',borderRadius:14,background:'#25D366' + '20',border:'1px solid #25D366',marginBottom:10,textDecoration:'none'}}>
          <div style={{fontSize:22}}>💬</div>
          <div><div style={{fontSize:15,fontWeight:700,color:'#25D366'}}>WhatsApp</div><div style={{fontSize:13,color:TEXT3}}>(41) 99955-7665</div></div>
        </a>
        <a href="mailto:contato@institutolinguagem.com.br" style={{display:'flex',alignItems:'center',gap:14,padding:'13px',borderRadius:14,background:`${BLUE}20`,border:`1px solid ${BLUE}`,marginBottom:10,textDecoration:'none'}}>
          <div style={{fontSize:22}}>✉️</div>
          <div><div style={{fontSize:15,fontWeight:700,color:BLUE}}>Email</div><div style={{fontSize:13,color:TEXT3}}>contato@institutolinguagem.com.br</div></div>
        </a>
        <a href="https://professorfabiobusse.com.br/" target="_blank" rel="noreferrer" style={{display:'flex',alignItems:'center',gap:14,padding:'13px',borderRadius:14,background:`${LIME}20`,border:`1px solid ${LIME}`,textDecoration:'none'}}>
          <div style={{fontSize:22}}>🌐</div>
          <div><div style={{fontSize:15,fontWeight:700,color:LIME}}>Website</div><div style={{fontSize:13,color:TEXT3}}>professorfabiobusse.com.br</div></div>
        </a>
      </div>

    </div>
  );
}

// ── OVERVIEW ──
function OverviewTab({studentId}){
  const[lessons,setLessons]=useState([]);
  const[grammar,setGrammar]=useState([]);
  useEffect(()=>{
    supabase.from('lessons').select('*').eq('student_id',studentId).then(({data})=>setLessons(data||[]));
    supabase.from('grammar_progress').select('*').eq('student_id',studentId).then(({data})=>setGrammar(data||[]));
  },[studentId]);
  const attended=lessons.filter(l=>l.status==='attended').length;
  const tchCan=lessons.filter(l=>l.status==='cancelled_teacher').length;
  const rate=lessons.length-tchCan>0?Math.round(attended/(lessons.length-tchCan)*100):0;
  const achieved=grammar.filter(g=>g.status==='achieved').length;
  const inProg=grammar.filter(g=>g.status==='in_progress').length;
  const tasksDone=lessons.filter(l=>l.tasks==='done').length;
  const now=new Date();
  const monthly=Array.from({length:6},(_,i)=>{
    const d=new Date(now.getFullYear(),now.getMonth()-(5-i),1);
    const ms=`${d.getFullYear()}-${pad(d.getMonth()+1)}`;
    const ml=lessons.filter(l=>l.lesson_date&&l.lesson_date.startsWith(ms));
    return{m:MONTHS[d.getMonth()],R:ml.filter(l=>l.status==='attended').length,C:ml.filter(l=>['cancelled_student','cancelled_late','no_show'].includes(l.status)).length};
  });
  const stats=[
    {label:'Aulas',value:lessons.length,color:BLUE},
    {label:'Realizadas',value:attended,color:LIME},
    {label:'Presença',value:rate+'%',color:rate>=80?LIME:rate>=60?AMBER:CORAL},
    {label:'Gramática',value:achieved+'/84',color:AMBER},
    {label:'Tarefas',value:tasksDone,color:PURPLE},
    {label:'Em progresso',value:inProg,color:CORAL},
  ];
  return(
    <div className="fade" style={{padding:20,paddingBottom:120}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:20}}>
        {stats.map(s=>(
          <div key={s.label} style={{background:CARD,borderRadius:20,padding:20,border:`1px solid ${BORDER}`}}>
            <div style={{fontSize:36,fontWeight:900,color:s.color,letterSpacing:'-0.03em',lineHeight:1}}>{s.value}</div>
            <div style={{fontSize:12,fontWeight:700,color:TEXT3,marginTop:8,textTransform:'uppercase',letterSpacing:'0.06em'}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{background:CARD,borderRadius:20,padding:20,border:`1px solid ${BORDER}`,marginBottom:16}}>
        <div style={{fontSize:12,fontWeight:700,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16}}>Aulas por Mês</div>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={monthly} margin={{top:0,right:0,left:-28,bottom:0}}>
            <XAxis dataKey="m" tick={{fontSize:12,fill:TEXT3,fontFamily:'Inter'}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:11,fill:TEXT3}} axisLine={false} tickLine={false} allowDecimals={false}/>
            <Tooltip contentStyle={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,fontSize:13,color:TEXT,fontFamily:'Inter'}}/>
            <Bar dataKey="R" name="Realizadas" fill={LIME} radius={[6,6,0,0]}/>
            <Bar dataKey="C" name="Canceladas" fill={CORAL} radius={[6,6,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{background:CARD,borderRadius:20,padding:20,border:`1px solid ${BORDER}`}}>
        <div style={{fontSize:12,fontWeight:700,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:4}}>Gramática</div>
        {[{n:'Atingido',v:achieved,c:LIME},{n:'Em progresso',v:inProg,c:AMBER},{n:'Não atingido',v:grammar.filter(g=>g.status==='not_achieved').length,c:CORAL}].map(g=>(
          <div key={g.n} style={{marginTop:16}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
              <span style={{fontSize:15,fontWeight:600,color:TEXT}}>{g.n}</span>
              <span style={{fontSize:15,fontWeight:800,color:g.c}}>{g.v}</span>
            </div>
            <div style={{height:8,borderRadius:4,background:CARD2}}>
              <div style={{height:'100%',borderRadius:4,background:g.c,width:`${g.v>0?Math.max((g.v/84)*100,2):0}%`,transition:'width 0.6s ease'}}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CALENDAR ──
function CalendarTab({studentId,isTeacher}){
  const[cur,setCur]=useState(new Date());
  const[lessons,setLessons]=useState({});
  const[schedule,setSchedule]=useState([]);
  const[modal,setModal]=useState(null);
  const y=cur.getFullYear(),m=cur.getMonth();
  const load=async()=>{
    const{data:ls}=await supabase.from('lessons').select('*').eq('student_id',studentId).gte('lesson_date',`${y}-${pad(m+1)}-01`).lte('lesson_date',`${y}-${pad(m+1)}-31`);
    const map={};(ls||[]).forEach(l=>map[l.lesson_date]=l);setLessons(map);
    const{data:sc}=await supabase.from('schedules').select('*').eq('student_id',studentId);setSchedule(sc||[]);
  };
  useEffect(()=>{load();},[studentId,y,m]);
  const saveLesson=async(date,data)=>{const ex=lessons[date];if(ex)await supabase.from('lessons').update(data).eq('id',ex.id);else await supabase.from('lessons').insert({student_id:studentId,lesson_date:date,...data});setModal(null);load();};
  const deleteLesson=async(date)=>{const ex=lessons[date];if(ex)await supabase.from('lessons').delete().eq('id',ex.id);load();};
  const firstDow=new Date(y,m,1).getDay();
  const daysInMonth=new Date(y,m+1,0).getDate();
  const cells=[...Array(firstDow).fill(null),...Array.from({length:daysInMonth},(_,i)=>i+1)];
  const todayStr=today();
  const isScheduled=d=>schedule.some(s=>s.day_of_week===new Date(y,m,d).getDay());
  return(
    <div className="fade" style={{padding:20,paddingBottom:120}}>
      {modal&&isTeacher&&<LessonModal date={modal} lesson={lessons[modal]} onSave={saveLesson} onDelete={deleteLesson} onClose={()=>setModal(null)}/>}
      <div style={{background:CARD,borderRadius:20,overflow:'hidden',border:`1px solid ${BORDER}`,marginBottom:16}}>
        <div style={{padding:'20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <button onClick={()=>setCur(new Date(y,m-1,1))} className="tap" style={{background:CARD2,border:'none',color:TEXT,width:40,height:40,borderRadius:12,fontSize:20,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>‹</button>
          <div style={{textAlign:'center'}}>
            <div style={{color:LIME,fontSize:12,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase'}}>{y}</div>
            <div style={{color:TEXT,fontSize:22,fontWeight:800,letterSpacing:'-0.02em'}}>{MFULL[m]}</div>
          </div>
          <button onClick={()=>setCur(new Date(y,m+1,1))} className="tap" style={{background:CARD2,border:'none',color:TEXT,width:40,height:40,borderRadius:12,fontSize:20,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>›</button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',borderTop:`1px solid ${BORDER}`,borderBottom:`1px solid ${BORDER}`}}>
          {WDAYS.map((d,i)=><div key={i} style={{padding:'10px 0',textAlign:'center',fontSize:11,fontWeight:700,color:TEXT3}}>{d}</div>)}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:1,background:BORDER}}>
          {cells.map((day,i)=>{
            if(!day)return<div key={i} style={{background:CARD,minHeight:46}}/>;
            const ds=dateStr(y,m,day);
            const les=lessons[ds];
            const sc=les?LESSON_STATUS[les.status]:null;
            const isToday=ds===todayStr;
            const sched=isScheduled(day);
            return(
              <div key={day} className="tap" onClick={()=>isTeacher&&setModal(ds)}
                style={{background:CARD,minHeight:46,padding:'6px 2px',cursor:isTeacher?'pointer':'default',border:isToday?`2px solid ${LIME}`:'none'}}>
                <div style={{width:26,height:26,borderRadius:8,background:isToday?LIME:sched?`${BLUE}30`:'transparent',color:isToday?'#111':TEXT,display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:isToday?900:sched?700:400,margin:'0 auto 3px'}}>{day}</div>
                {les&&sc&&<div style={{width:6,height:6,borderRadius:'50%',background:sc.color,margin:'0 auto'}}/>}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
        {Object.entries(LESSON_STATUS).map(([,c])=>(
          <div key={c.label} style={{display:'flex',alignItems:'center',gap:6,background:CARD,borderRadius:10,padding:'6px 12px',fontSize:12,color:TEXT2,border:`1px solid ${BORDER}`}}>
            <div style={{width:8,height:8,borderRadius:'50%',background:c.color}}/>{c.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function LessonModal({date,lesson,onSave,onClose,onDelete}){
  const[status,setStatus]=useState(lesson?.status||'attended');
  const[tasks,setTasks]=useState(lesson?.tasks||'none');
  const[notes,setNotes]=useState(lesson?.notes||'');
  const d=new Date(date+'T12:00:00');
  const label=d.toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long'});
  return(
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',display:'flex',alignItems:'flex-end',justifyContent:'center',zIndex:1000,backdropFilter:'blur(8px)'}}>
      <div style={{background:CARD,borderRadius:'24px 24px 0 0',padding:24,width:'100%',maxWidth:540,maxHeight:'90vh',overflowY:'auto',border:`1px solid ${BORDER}`}}>
        <div style={{width:40,height:4,borderRadius:2,background:BORDER,margin:'0 auto 20px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <div>
            <div style={{fontSize:11,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.1em',fontWeight:700,marginBottom:3}}>Registrar Aula</div>
            <div style={{fontSize:18,fontWeight:800,color:TEXT,textTransform:'capitalize'}}>{label}</div>
          </div>
          <button onClick={onClose} style={{background:CARD2,border:'none',borderRadius:10,width:36,height:36,fontSize:20,cursor:'pointer',color:TEXT3}}>×</button>
        </div>
        <div style={{marginBottom:18}}>
          <div style={{fontSize:12,fontWeight:700,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:10}}>Status</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            {Object.entries(LESSON_STATUS).map(([k,c])=>(
              <div key={k} className="tap" onClick={()=>setStatus(k)} style={{background:status===k?c.bg:CARD2,border:`2px solid ${status===k?c.color:BORDER}`,borderRadius:14,padding:'12px 10px',display:'flex',alignItems:'center',gap:8,cursor:'pointer'}}>
                <div style={{width:8,height:8,borderRadius:'50%',background:c.color,flexShrink:0}}/>
                <span style={{fontSize:13,fontWeight:600,color:status===k?c.color:TEXT3}}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginBottom:18}}>
          <div style={{fontSize:12,fontWeight:700,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:10}}>Tarefas</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            {Object.entries(TASK_STATUS).map(([k,c])=>(
              <div key={k} className="tap" onClick={()=>setTasks(k)} style={{background:tasks===k?`${c.color}22`:CARD2,border:`2px solid ${tasks===k?c.color:BORDER}`,borderRadius:14,padding:'12px',cursor:'pointer',textAlign:'center'}}>
                <span style={{fontSize:13,fontWeight:tasks===k?700:500,color:tasks===k?c.color:TEXT3}}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginBottom:20}}>
          <div style={{fontSize:12,fontWeight:700,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:10}}>Observações</div>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Notas…" style={{width:'100%',background:CARD2,border:`1px solid ${BORDER}`,borderRadius:14,padding:'14px',fontSize:15,color:TEXT,resize:'vertical',minHeight:80}}/>
        </div>
        <div style={{display:'flex',gap:8}}>
          {lesson&&<button onClick={()=>{onDelete(date);onClose();}} className="tap" style={{padding:'15px 16px',borderRadius:14,border:`1px solid ${CORAL}`,background:'transparent',color:CORAL,cursor:'pointer',fontSize:14,fontWeight:700}}>Excluir</button>}
          <button onClick={onClose} className="tap" style={{flex:1,padding:'15px',borderRadius:14,border:`1px solid ${BORDER}`,background:'transparent',color:TEXT2,cursor:'pointer',fontSize:14,fontWeight:600}}>Cancelar</button>
          <button onClick={()=>onSave(date,{status,tasks,notes})} className="tap" style={{flex:2,padding:'15px',borderRadius:14,border:'none',background:LIME,color:'#111',cursor:'pointer',fontSize:15,fontWeight:800}}>Salvar</button>
        </div>
      </div>
    </div>
  );
}

// ── GRAMMAR ──
function GrammarTab({studentId,isTeacher}){
  const[sub,setSub]=useState('grammar');
  const[grammar,setGrammar]=useState({});
  const[skills,setSkills]=useState({});
  const[search,setSearch]=useState('');
  const loadGrammar=async()=>{const{data}=await supabase.from('grammar_progress').select('*').eq('student_id',studentId);const map={};(data||[]).forEach(g=>map[g.topic_id]=g.status);setGrammar(map);};
  const loadSkills=async()=>{const{data}=await supabase.from('skills').select('*').eq('student_id',studentId);const map={};(data||[]).forEach(s=>{if(!map[s.skill])map[s.skill]={};map[s.skill][s.sub_index]=s.value;});setSkills(map);};
  useEffect(()=>{loadGrammar();loadSkills();},[studentId]);
  const setGStatus=async(topicId,status)=>{
    if(!isTeacher)return;
    const ex=await supabase.from('grammar_progress').select('id').eq('student_id',studentId).eq('topic_id',topicId).single();
    if(ex.data)await supabase.from('grammar_progress').update({status}).eq('id',ex.data.id);
    else await supabase.from('grammar_progress').insert({student_id:studentId,topic_id:topicId,status});
    loadGrammar();
  };
  const setSkillVal=async(skill,subIndex,value)=>{
    if(!isTeacher)return;
    const ex=await supabase.from('skills').select('id').eq('student_id',studentId).eq('skill',skill).eq('sub_index',subIndex).single();
    if(ex.data)await supabase.from('skills').update({value}).eq('id',ex.data.id);
    else await supabase.from('skills').insert({student_id:studentId,skill,sub_index:subIndex,value});
    loadSkills();
  };
  const sConfig={achieved:{label:'Atingido',color:LIME},in_progress:{label:'Em progresso',color:AMBER},not_achieved:{label:'Não atingido',color:CORAL}};
  const cats=[...new Set(GRAMMAR_TOPICS.map(t=>t.cat))];
  const filtered=GRAMMAR_TOPICS.filter(t=>!search||t.name.toLowerCase().includes(search.toLowerCase())||t.cat.toLowerCase().includes(search.toLowerCase()));
  const byCat=cats.reduce((a,c)=>({...a,[c]:filtered.filter(t=>t.cat===c)}),{});
  const skillColors={speaking:BLUE,reading:LIME,listening:AMBER,writing:PURPLE};
  return(
    <div className="fade" style={{paddingBottom:120}}>
      <div style={{background:CARD,borderBottom:`1px solid ${BORDER}`,padding:'16px 20px',position:'sticky',top:0,zIndex:10}}>
        <div style={{display:'flex',background:BG,borderRadius:14,padding:4,gap:4,marginBottom:sub==='grammar'?12:0}}>
          {[['grammar','Gramática'],['skills','Habilidades']].map(([k,l])=>(
            <button key={k} onClick={()=>setSub(k)} className="tap" style={{flex:1,padding:'12px',borderRadius:11,fontSize:15,fontWeight:700,border:'none',cursor:'pointer',background:sub===k?LIME:'transparent',color:sub===k?'#111':TEXT3}}>{l}</button>
          ))}
        </div>
        {sub==='grammar'&&<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar tópico…" style={{width:'100%',background:CARD2,border:`1px solid ${BORDER}`,borderRadius:14,padding:'14px 16px',fontSize:15,color:TEXT}}/>}
      </div>
      {sub==='grammar'&&(
        <div style={{padding:'16px 20px'}}>
          {cats.map(cat=>{
            const ts=byCat[cat];if(!ts||!ts.length)return null;
            return(
              <div key={cat} style={{background:CARD,borderRadius:20,marginBottom:12,overflow:'hidden',border:`1px solid ${BORDER}`}}>
                <div style={{padding:'14px 18px',borderBottom:`1px solid ${BORDER}`,display:'flex',justifyContent:'space-between'}}>
                  <span style={{fontSize:16,fontWeight:800,color:TEXT}}>{cat}</span>
                  <span style={{fontSize:12,color:TEXT3,fontWeight:600}}>{ts.length}</span>
                </div>
                {ts.map((t,i)=>{
                  const st=grammar[t.id]||'';
                  return(
                    <div key={t.id} style={{padding:'14px 18px',borderBottom:i<ts.length-1?`1px solid ${BORDER}`:'none'}}>
                      <div style={{fontSize:15,color:TEXT,fontWeight:500,marginBottom:10}}>{t.name}</div>
                      <div style={{display:'flex',gap:6}}>
                        {Object.entries(sConfig).map(([k,c])=>(
                          <button key={k} onClick={()=>setGStatus(t.id,st===k?'':k)} disabled={!isTeacher} className="tap"
                            style={{flex:1,border:`2px solid ${st===k?c.color:BORDER}`,borderRadius:10,padding:'9px 4px',cursor:isTeacher?'pointer':'default',background:st===k?`${c.color}20`:CARD2,fontSize:12,fontWeight:st===k?700:500,color:st===k?c.color:TEXT3,textAlign:'center'}}>
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
        <div style={{padding:'16px 20px'}}>
          {Object.entries(SKILL_SUBS).map(([sk,items])=>(
            <div key={sk} style={{background:CARD,borderRadius:20,marginBottom:14,overflow:'hidden',border:`1px solid ${BORDER}`}}>
              <div style={{padding:'16px 20px',borderBottom:`1px solid ${BORDER}`,display:'flex',alignItems:'center',gap:10}}>
                <div style={{width:12,height:12,borderRadius:'50%',background:skillColors[sk]}}/>
                <span style={{color:TEXT,fontWeight:800,fontSize:17,textTransform:'capitalize'}}>{sk}</span>
              </div>
              {items.map((item,idx)=>{
                const val=skills[sk]?.[idx]??1;
                return(
                  <div key={item} style={{padding:'14px 20px',borderBottom:'1px solid #222'}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
                      <span style={{fontSize:15,color:TEXT,fontWeight:500}}>{item}</span>
                      <span style={{fontSize:15,fontWeight:800,color:skillColors[sk]}}>{val}/5</span>
                    </div>
                    <div style={{display:'flex',gap:6}}>
                      {[1,2,3,4,5].map(n=>(
                        <button key={n} onClick={()=>setSkillVal(sk,idx,n)} disabled={!isTeacher} className="tap" style={{flex:1,height:34,borderRadius:8,border:'none',cursor:isTeacher?'pointer':'default',background:n<=val?skillColors[sk]:CARD2,transition:'background 0.15s'}}/>
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

// ── HOMEWORK ──
function HomeworkTab({studentId,isTeacher}){
  const[items,setItems]=useState([]);
  const[adding,setAdding]=useState(false);
  const[title,setTitle]=useState('');
  const[desc,setDesc]=useState('');
  const[due,setDue]=useState('');
  const load=async()=>{const{data}=await supabase.from('homework').select('*').eq('student_id',studentId).order('created_at',{ascending:false});setItems(data||[]);};
  useEffect(()=>{load();},[studentId]);
  const add=async()=>{if(!title)return;await supabase.from('homework').insert({student_id:studentId,title,description:desc,due_date:due||null,done:false});setTitle('');setDesc('');setDue('');setAdding(false);load();};
  const toggle=async(id,done)=>{await supabase.from('homework').update({done:!done}).eq('id',id);load();};
  const remove=async(id)=>{await supabase.from('homework').delete().eq('id',id);load();};
  const ipt={width:'100%',background:BG,border:`1px solid ${BORDER}`,borderRadius:14,padding:'14px 16px',fontSize:15,color:TEXT,marginBottom:10};
  const pending=items.filter(i=>!i.done),done=items.filter(i=>i.done);
  return(
    <div className="fade" style={{padding:20,paddingBottom:120}}>
      {isTeacher&&!adding&&<button onClick={()=>setAdding(true)} className="tap" style={{width:'100%',padding:18,borderRadius:16,border:`2px dashed ${LIME}`,background:'transparent',color:LIME,fontSize:16,fontWeight:700,cursor:'pointer',marginBottom:16}}>+ Adicionar Tarefa</button>}
      {isTeacher&&adding&&(
        <div style={{background:CARD,borderRadius:20,padding:20,marginBottom:16,border:`1px solid ${BORDER}`}}>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título *" style={ipt}/>
          <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Descrição" style={{...ipt,resize:'vertical',minHeight:70}}/>
          <input type="date" value={due} onChange={e=>setDue(e.target.value)} style={{...ipt,marginBottom:16}}/>
          <div style={{display:'flex',gap:8}}>
            <button onClick={()=>setAdding(false)} className="tap" style={{flex:1,padding:'14px',borderRadius:14,border:`1px solid ${BORDER}`,background:'transparent',color:TEXT3,cursor:'pointer',fontSize:14,fontWeight:600}}>Cancelar</button>
            <button onClick={add} className="tap" style={{flex:2,padding:'14px',borderRadius:14,border:'none',background:LIME,color:'#111',cursor:'pointer',fontSize:15,fontWeight:800}}>Salvar</button>
          </div>
        </div>
      )}
      {items.length===0&&<div style={{textAlign:'center',padding:'60px 0',color:TEXT3}}><div style={{fontSize:48,marginBottom:12}}>📝</div><div style={{fontSize:16,fontWeight:600}}>Nenhuma tarefa</div></div>}
      {pending.length>0&&(
        <div style={{background:CARD,borderRadius:20,overflow:'hidden',border:`1px solid ${BORDER}`,marginBottom:14}}>
          <div style={{padding:'14px 20px',borderBottom:`1px solid ${BORDER}`}}><span style={{fontSize:16,fontWeight:800,color:TEXT}}>Pendentes <span style={{color:LIME}}>{pending.length}</span></span></div>
          {pending.map((item,i)=>(
            <div key={item.id} style={{padding:'16px 20px',borderBottom:i<pending.length-1?`1px solid ${BORDER}`:'none',display:'flex',alignItems:'flex-start',gap:14}}>
              <button onClick={()=>toggle(item.id,item.done)} className="tap" style={{width:24,height:24,borderRadius:8,border:`2px solid ${BORDER}`,background:'transparent',cursor:'pointer',flexShrink:0,marginTop:2}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:16,fontWeight:700,color:TEXT,marginBottom:3}}>{item.title}</div>
                {item.description&&<div style={{fontSize:14,color:TEXT3,marginBottom:3}}>{item.description}</div>}
                {item.due_date&&<div style={{fontSize:13,color:LIME,fontWeight:600}}>Até {new Date(item.due_date+'T12:00').toLocaleDateString('pt-BR')}</div>}
              </div>
              {isTeacher&&<button onClick={()=>remove(item.id)} className="tap" style={{background:CARD2,border:'none',borderRadius:8,padding:'6px 10px',color:TEXT3,cursor:'pointer',fontSize:16}}>×</button>}
            </div>
          ))}
        </div>
      )}
      {done.length>0&&(
        <div style={{background:CARD,borderRadius:20,overflow:'hidden',border:`1px solid ${BORDER}`,opacity:0.6}}>
          <div style={{padding:'14px 20px',borderBottom:`1px solid ${BORDER}`}}><span style={{fontSize:16,fontWeight:800,color:TEXT3}}>Concluídas {done.length}</span></div>
          {done.map((item,i)=>(
            <div key={item.id} style={{padding:'14px 20px',borderBottom:i<done.length-1?`1px solid ${BORDER}`:'none',display:'flex',alignItems:'center',gap:14}}>
              <button onClick={()=>toggle(item.id,item.done)} className="tap" style={{width:24,height:24,borderRadius:8,border:'none',background:LIME,cursor:'pointer',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',color:'#111',fontSize:12,fontWeight:900}}>✓</button>
              <div style={{flex:1,textDecoration:'line-through',color:TEXT3,fontSize:15}}>{item.title}</div>
              {isTeacher&&<button onClick={()=>remove(item.id)} className="tap" style={{background:CARD2,border:'none',borderRadius:8,padding:'6px 10px',color:TEXT3,cursor:'pointer',fontSize:16}}>×</button>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── MATERIALS ──
function MaterialsTab({studentId,isTeacher}){
  const[items,setItems]=useState([]);
  const[adding,setAdding]=useState(false);
  const[title,setTitle]=useState('');
  const[url,setUrl]=useState('');
  const[type,setType]=useState('link');
  const[desc,setDesc]=useState('');
  const load=async()=>{const{data}=await supabase.from('materials').select('*').eq('student_id',studentId).order('created_at',{ascending:false});setItems(data||[]);};
  useEffect(()=>{load();},[studentId]);
  const add=async()=>{if(!title)return;await supabase.from('materials').insert({student_id:studentId,title,url,type,description:desc});setTitle('');setUrl('');setDesc('');setType('link');setAdding(false);load();};
  const remove=async(id)=>{await supabase.from('materials').delete().eq('id',id);load();};
  const ipt={width:'100%',background:BG,border:`1px solid ${BORDER}`,borderRadius:14,padding:'14px 16px',fontSize:15,color:TEXT,marginBottom:10};
  const tC={link:BLUE,pdf:CORAL,audio:AMBER,exercise:LIME,book:PURPLE};
  const tI={link:'🔗',pdf:'📄',audio:'🎵',exercise:'📋',book:'📚'};
  return(
    <div className="fade" style={{padding:20,paddingBottom:120}}>
      {isTeacher&&!adding&&<button onClick={()=>setAdding(true)} className="tap" style={{width:'100%',padding:18,borderRadius:16,border:`2px dashed ${BLUE}`,background:'transparent',color:BLUE,fontSize:16,fontWeight:700,cursor:'pointer',marginBottom:16}}>+ Adicionar Material</button>}
      {isTeacher&&adding&&(
        <div style={{background:CARD,borderRadius:20,padding:20,marginBottom:16,border:`1px solid ${BORDER}`}}>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título *" style={ipt}/>
          <select value={type} onChange={e=>setType(e.target.value)} style={{...ipt,background:BG}}>
            <option value="link">🔗 Link</option><option value="pdf">📄 PDF</option><option value="audio">🎵 Áudio</option><option value="exercise">📋 Exercício</option><option value="book">📚 Livro</option>
          </select>
          <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="URL" style={ipt}/>
          <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Descrição" style={{...ipt,resize:'vertical',minHeight:60,marginBottom:16}}/>
          <div style={{display:'flex',gap:8}}>
            <button onClick={()=>setAdding(false)} className="tap" style={{flex:1,padding:'14px',borderRadius:14,border:`1px solid ${BORDER}`,background:'transparent',color:TEXT3,cursor:'pointer',fontSize:14,fontWeight:600}}>Cancelar</button>
            <button onClick={add} className="tap" style={{flex:2,padding:'14px',borderRadius:14,border:'none',background:LIME,color:'#111',cursor:'pointer',fontSize:15,fontWeight:800}}>Salvar</button>
          </div>
        </div>
      )}
      {items.length===0&&<div style={{textAlign:'center',padding:'60px 0',color:TEXT3}}><div style={{fontSize:48,marginBottom:12}}>📚</div><div style={{fontSize:16,fontWeight:600}}>Nenhum material</div></div>}
      {items.map(item=>(
        <div key={item.id} className="tap" style={{background:CARD,borderRadius:18,marginBottom:10,padding:'18px',display:'flex',alignItems:'center',gap:16,border:`1px solid ${BORDER}`}}>
          <div style={{width:52,height:52,borderRadius:14,background:`${tC[item.type]||BLUE}22`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,flexShrink:0}}>{tI[item.type]||'📎'}</div>
          <div style={{flex:1,minWidth:0}} onClick={()=>item.url&&window.open(item.url,'_blank')}>
            <div style={{fontSize:16,fontWeight:700,color:TEXT,marginBottom:3,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.title}</div>
            {item.description&&<div style={{fontSize:13,color:TEXT3,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.description}</div>}
            <div style={{fontSize:11,color:tC[item.type]||BLUE,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em',marginTop:4}}>{item.type}</div>
          </div>
          {isTeacher&&<button onClick={()=>remove(item.id)} className="tap" style={{background:`${CORAL}22`,border:`1px solid ${CORAL}`,borderRadius:10,padding:'8px 12px',color:CORAL,cursor:'pointer',fontSize:14,fontWeight:700}}>×</button>}
        </div>
      ))}
    </div>
  );
}

// ── VIDEOS ──
function VideosTab({studentId,isTeacher}){
  const[items,setItems]=useState([]);
  const[adding,setAdding]=useState(false);
  const[title,setTitle]=useState('');
  const[url,setUrl]=useState('');
  const[desc,setDesc]=useState('');
  const load=async()=>{const{data}=await supabase.from('videos').select('*').eq('student_id',studentId).order('created_at',{ascending:false});setItems(data||[]);};
  useEffect(()=>{load();},[studentId]);
  const add=async()=>{if(!title||!url)return;await supabase.from('videos').insert({student_id:studentId,title,url,description:desc});setTitle('');setUrl('');setDesc('');setAdding(false);load();};
  const remove=async(id)=>{await supabase.from('videos').delete().eq('id',id);load();};
  const ipt={width:'100%',background:BG,border:`1px solid ${BORDER}`,borderRadius:14,padding:'14px 16px',fontSize:15,color:TEXT,marginBottom:10};
  return(
    <div className="fade" style={{padding:20,paddingBottom:120}}>
      {isTeacher&&!adding&&<button onClick={()=>setAdding(true)} className="tap" style={{width:'100%',padding:18,borderRadius:16,border:`2px dashed ${CORAL}`,background:'transparent',color:CORAL,fontSize:16,fontWeight:700,cursor:'pointer',marginBottom:16}}>+ Adicionar Vídeo</button>}
      {isTeacher&&adding&&(
        <div style={{background:CARD,borderRadius:20,padding:20,marginBottom:16,border:`1px solid ${BORDER}`}}>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título *" style={ipt}/>
          <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="URL do YouTube *" style={ipt}/>
          <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Descrição" style={{...ipt,resize:'vertical',minHeight:60,marginBottom:16}}/>
          <div style={{display:'flex',gap:8}}>
            <button onClick={()=>setAdding(false)} className="tap" style={{flex:1,padding:'14px',borderRadius:14,border:`1px solid ${BORDER}`,background:'transparent',color:TEXT3,cursor:'pointer',fontSize:14,fontWeight:600}}>Cancelar</button>
            <button onClick={add} className="tap" style={{flex:2,padding:'14px',borderRadius:14,border:'none',background:LIME,color:'#111',cursor:'pointer',fontSize:15,fontWeight:800}}>Salvar</button>
          </div>
        </div>
      )}
      {items.length===0&&<div style={{textAlign:'center',padding:'60px 0',color:TEXT3}}><div style={{fontSize:48,marginBottom:12}}>🎬</div><div style={{fontSize:16,fontWeight:600}}>Nenhum vídeo</div></div>}
      {items.map(item=>{
        const ytId=getYouTubeId(item.url);
        return(
          <div key={item.id} style={{background:CARD,borderRadius:20,marginBottom:16,overflow:'hidden',border:`1px solid ${BORDER}`}}>
            {ytId?(<div style={{position:'relative',paddingBottom:'56.25%',background:'#000'}}><iframe src={`https://www.youtube.com/embed/${ytId}`} title={item.title} style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',border:'none'}} allowFullScreen/></div>):(
              <div className="tap" onClick={()=>window.open(item.url,'_blank')} style={{background:CARD2,padding:'28px',textAlign:'center',cursor:'pointer'}}><div style={{fontSize:36,color:CORAL}}>▶</div></div>
            )}
            <div style={{padding:'16px 18px',display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:8}}>
              <div style={{flex:1}}>
                <div style={{fontSize:16,fontWeight:800,color:TEXT,marginBottom:3}}>{item.title}</div>
                {item.description&&<div style={{fontSize:14,color:TEXT3}}>{item.description}</div>}
              </div>
              {isTeacher&&<button onClick={()=>remove(item.id)} className="tap" style={{background:`${CORAL}22`,border:`1px solid ${CORAL}`,borderRadius:10,padding:'8px 12px',color:CORAL,cursor:'pointer',fontSize:14,fontWeight:700}}>×</button>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── SCHEDULE ──
function ScheduleTab({studentId,isTeacher}){
  const[slots,setSlots]=useState([]);
  const[saved,setSaved]=useState(false);
  useEffect(()=>{supabase.from('schedules').select('*').eq('student_id',studentId).then(({data})=>setSlots(data||[]));},[studentId]);
  const save=async()=>{
    await supabase.from('schedules').delete().eq('student_id',studentId);
    if(slots.length)await supabase.from('schedules').insert(slots.map(s=>({student_id:studentId,day_of_week:s.day_of_week??1,start_time:s.start_time??'10:00',duration:s.duration??60})));
    setSaved(true);setTimeout(()=>setSaved(false),2000);
  };
  const add=()=>setSlots(s=>[...s,{day_of_week:1,start_time:'10:00',duration:60}]);
  const rm=i=>setSlots(s=>s.filter((_,j)=>j!==i));
  const upd=(i,k,v)=>setSlots(s=>s.map((x,j)=>j===i?{...x,[k]:v}:x));
  const sel={width:'100%',background:BG,border:`1px solid ${BORDER}`,borderRadius:12,padding:'12px 10px',fontSize:14,color:TEXT};
  return(
    <div className="fade" style={{padding:20,paddingBottom:120}}>
      <div style={{background:CARD,borderRadius:20,padding:20,border:`1px solid ${BORDER}`}}>
        <div style={{fontSize:12,fontWeight:700,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16}}>Horários Fixos</div>
        {slots.length===0&&<div style={{textAlign:'center',padding:'24px 0',color:TEXT3,fontSize:15}}>Nenhum horário configurado</div>}
        {slots.map((sl,i)=>(
          <div key={i} style={{background:CARD2,borderRadius:16,padding:16,marginBottom:12}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:12}}>
              {[{k:'day_of_week',label:'Dia',el:<select value={sl.day_of_week??1} onChange={e=>upd(i,'day_of_week',Number(e.target.value))} disabled={!isTeacher} style={sel}>{WFULL.map((d,idx)=><option key={idx} value={idx}>{d.slice(0,3)}</option>)}</select>},
                {k:'start_time',label:'Início',el:<input type="time" value={sl.start_time??'10:00'} onChange={e=>upd(i,'start_time',e.target.value)} disabled={!isTeacher} style={sel}/>},
                {k:'duration',label:'Duração',el:<select value={sl.duration??60} onChange={e=>upd(i,'duration',Number(e.target.value))} disabled={!isTeacher} style={sel}>{[30,45,60,75,90,120].map(d=><option key={d} value={d}>{d}min</option>)}</select>}
              ].map(({label,el})=>(<div key={label}><div style={{fontSize:11,fontWeight:700,color:TEXT3,textTransform:'uppercase',marginBottom:6}}>{label}</div>{el}</div>))}
            </div>
            <div style={{background:`${LIME}15`,borderRadius:10,padding:'10px 14px',fontSize:14,color:LIME,fontWeight:600,display:'flex',justifyContent:'space-between'}}>
              <span>{WFULL[sl.day_of_week??1]} · {sl.start_time??'10:00'} – {endTime(sl.start_time??'10:00',sl.duration??60)}</span>
              {isTeacher&&<button onClick={()=>rm(i)} className="tap" style={{background:`${CORAL}22`,border:'none',borderRadius:6,padding:'2px 10px',color:CORAL,cursor:'pointer',fontSize:13,fontWeight:700}}>Remover</button>}
            </div>
          </div>
        ))}
        {isTeacher&&(
          <div style={{display:'flex',gap:8,marginTop:8}}>
            <button onClick={add} className="tap" style={{flex:1,padding:'14px',borderRadius:14,border:`1px solid ${BORDER}`,background:'transparent',color:TEXT3,cursor:'pointer',fontSize:14,fontWeight:600}}>+ Adicionar</button>
            <button onClick={save} className="tap" style={{flex:1,padding:'14px',borderRadius:14,border:'none',background:LIME,color:'#111',cursor:'pointer',fontSize:15,fontWeight:800}}>{saved?'✓ Salvo!':'Salvar'}</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── PROFILE ──
function ProfileTab({profile,isTeacher,onUpdate}){
  const[f,setF]=useState({...profile});
  const[ok,setOk]=useState(false);
  const upd=(k,v)=>setF(x=>({...x,[k]:v}));
  const save=async()=>{
    await supabase.from('profiles').update({name:f.name,phone:f.phone,level:f.level,goal:f.goal,notes:f.notes,start_date:f.start_date,lesson_value:parseFloat(f.lesson_value)||0}).eq('id',profile.id);
    setOk(true);setTimeout(()=>setOk(false),2000);onUpdate&&onUpdate(f);
  };
  const ipt=(dis)=>({width:'100%',background:dis?CARD2:BG,border:`1px solid ${BORDER}`,borderRadius:14,padding:'15px 16px',fontSize:16,color:TEXT,marginBottom:12});
  return(
    <div className="fade" style={{padding:20,paddingBottom:120}}>
      <div style={{textAlign:'center',padding:'30px 0 24px'}}>
        <div style={{width:80,height:80,borderRadius:24,background:CARD2,display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,fontWeight:900,color:LIME,margin:'0 auto 16px'}}>{(f.name||f.email||'?').charAt(0).toUpperCase()}</div>
        <div style={{fontSize:24,fontWeight:800,color:TEXT,letterSpacing:'-0.02em'}}>{f.name||'Sem nome'}</div>
        <div style={{fontSize:14,color:TEXT3,marginTop:4}}>{f.email}</div>
        {f.level&&<div style={{display:'inline-block',background:`${LIME}20`,border:`1px solid ${LIME}`,color:LIME,fontSize:13,padding:'5px 14px',borderRadius:20,marginTop:10,fontWeight:700}}>{f.level}</div>}
      </div>
      <div style={{background:CARD,borderRadius:20,padding:20,border:`1px solid ${BORDER}`}}>
        {[{k:'name',l:'Nome',ph:'Nome do aluno',t:'text'},{k:'phone',l:'Telefone',ph:'(41) 9xxxx-xxxx',t:'text'}].map(({k,l,ph,t})=>(
          <div key={k}><div style={{fontSize:12,fontWeight:700,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>{l}</div>
          <input type={t} value={f[k]||''} onChange={e=>upd(k,e.target.value)} placeholder={ph} disabled={!isTeacher} style={ipt(!isTeacher)}/></div>
        ))}
        <div><div style={{fontSize:12,fontWeight:700,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>Data de início</div>
        <input type="date" value={f.start_date||''} onChange={e=>upd('start_date',e.target.value)} disabled={!isTeacher} style={ipt(!isTeacher)}/></div>
        <div><div style={{fontSize:12,fontWeight:700,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>Nível</div>
        <select value={f.level||''} onChange={e=>upd('level',e.target.value)} disabled={!isTeacher} style={{...ipt(!isTeacher),background:!isTeacher?CARD2:BG}}>
          <option value="">Selecione…</option>{LEVELS.map(l=><option key={l} value={l}>{l}</option>)}
        </select></div>
        <div><div style={{fontSize:12,fontWeight:700,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>Objetivo</div>
        <input value={f.goal||''} onChange={e=>upd('goal',e.target.value)} placeholder="Ex: Negócios, Viagens…" disabled={!isTeacher} style={ipt(!isTeacher)}/></div>
        {isTeacher&&(
          <div>
            <div style={{fontSize:12,fontWeight:700,color:LIME,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>Valor por Aula (R$)</div>
            <div style={{position:'relative',marginBottom:12}}>
              <span style={{position:'absolute',left:16,top:'50%',transform:'translateY(-50%)',color:TEXT3,fontSize:15,fontWeight:600}}>R$</span>
              <input type="number" value={f.lesson_value||''} onChange={e=>upd('lesson_value',e.target.value)} placeholder="0,00" style={{...ipt(false),paddingLeft:44,marginBottom:0}}/>
            </div>
          </div>
        )}
        <div><div style={{fontSize:12,fontWeight:700,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>Observações</div>
        <textarea value={f.notes||''} onChange={e=>upd('notes',e.target.value)} disabled={!isTeacher} style={{...ipt(!isTeacher),minHeight:80,resize:'vertical',marginBottom:isTeacher?16:0}}/></div>
        {isTeacher&&<button onClick={save} className="tap" style={{width:'100%',padding:'17px',borderRadius:14,border:'none',background:LIME,color:'#111',fontSize:16,fontWeight:800,cursor:'pointer'}}>{ok?'✓ Salvo!':'Salvar Perfil'}</button>}
      </div>
    </div>
  );
}

// ── CONTACT BUTTON ──
function ContactButton(){
  const[open,setOpen]=useState(false);
  const[nm,setNm]=useState('');
  const[msg,setMsg]=useState('');
  const ipt={width:'100%',background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,padding:'14px 16px',fontSize:15,color:TEXT,marginBottom:10};
  const send=()=>{
    const text=encodeURIComponent(`Olá Prof. Fabio! Me chamo ${nm}.\n\n${msg}`);
    window.open(`https://wa.me/5541999557665?text=${text}`,'_blank');
    setOpen(false);setNm('');setMsg('');
  };
  return(
    <>
      <button onClick={()=>setOpen(true)} style={{position:'fixed',bottom:120,right:18,width:56,height:56,borderRadius:'50%',background:'#25D366',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 20px rgba(37,211,102,0.45)',zIndex:99,fontSize:26}}>💬</button>
      {open&&(
        <div onClick={e=>e.target===e.currentTarget&&setOpen(false)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',zIndex:300,display:'flex',alignItems:'flex-end',justifyContent:'center',backdropFilter:'blur(8px)'}}>
          <div style={{background:CARD,borderRadius:'24px 24px 0 0',padding:24,width:'100%',maxWidth:540,border:`1px solid ${BORDER}`}}>
            <div style={{width:40,height:4,borderRadius:2,background:BORDER,margin:'0 auto 20px'}}/>
            <div style={{fontSize:22,fontWeight:800,color:TEXT,marginBottom:4}}>Fale comigo</div>
            <div style={{fontSize:14,color:TEXT3,marginBottom:20}}>Respondo pelo WhatsApp em até 24h</div>
            <div style={{display:'flex',gap:10,marginBottom:20}}>
              <a href="https://wa.me/5541999557665" target="_blank" rel="noreferrer" style={{flex:1,padding:'14px 8px',borderRadius:14,background:'#25D366',color:'#fff',fontSize:13,fontWeight:800,textAlign:'center',textDecoration:'none',display:'block'}}>💬 WhatsApp</a>
              <a href="mailto:contato@institutolinguagem.com.br" style={{flex:1,padding:'14px 8px',borderRadius:14,background:CARD2,border:`1px solid ${BORDER}`,color:BLUE,fontSize:13,fontWeight:700,textAlign:'center',textDecoration:'none',display:'block'}}>✉️ Email</a>
              <a href="https://professorfabiobusse.com.br/" target="_blank" rel="noreferrer" style={{flex:1,padding:'14px 8px',borderRadius:14,background:CARD2,border:`1px solid ${BORDER}`,color:LIME,fontSize:13,fontWeight:700,textAlign:'center',textDecoration:'none',display:'block'}}>🌐 Site</a>
            </div>
            <input value={nm} onChange={e=>setNm(e.target.value)} placeholder="Seu nome *" style={ipt}/>
            <textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Sua mensagem *" style={{...ipt,resize:'vertical',minHeight:80,marginBottom:16}}/>
            <div style={{display:'flex',gap:8}}>
              <button onClick={()=>setOpen(false)} style={{flex:1,padding:'14px',borderRadius:14,border:`1px solid ${BORDER}`,background:'transparent',color:TEXT3,cursor:'pointer',fontSize:14,fontWeight:600}}>Cancelar</button>
              <button onClick={send} disabled={!nm||!msg} style={{flex:2,padding:'14px',borderRadius:14,border:'none',background:'#25D366',color:'#fff',cursor:'pointer',fontSize:15,fontWeight:800,opacity:nm&&msg?1:0.5}}>Enviar no WhatsApp</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const TABS=[{id:'overview',label:'Início'},{id:'calendar',label:'Aulas'},{id:'grammar',label:'Gramática'},{id:'homework',label:'Tarefas'},{id:'materials',label:'Materiais'},{id:'videos',label:'Vídeos'},{id:'schedule',label:'Agenda'},{id:'profile',label:'Perfil'}];

// ── APP ──
export default function App(){
  const[user,setUser]=useState(null);
  const[profile,setProfile]=useState(null);
  const[students,setStudents]=useState([]);
  const[activeId,setActiveId]=useState(null);
  const[tab,setTab]=useState('overview');
  const[loading,setLoading]=useState(true);
  const[showStudents,setShowStudents]=useState(false);

  useEffect(()=>{
    let meta=document.querySelector('meta[name="viewport"]');
    if(!meta){meta=document.createElement('meta');meta.name='viewport';document.head.appendChild(meta);}
    meta.content='width=device-width,initial-scale=1,maximum-scale=1';
    document.body.style.background='#111111';
  },[]);

  useEffect(()=>{
    supabase.auth.getUser().then(({data:{user}})=>{if(user)loadProfile(user);else setLoading(false);});
    const{data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>{
      if(session?.user)loadProfile(session.user);
      else{setUser(null);setProfile(null);setLoading(false);}
    });
    return()=>subscription.unsubscribe();
  },[]);

  const loadProfile=async(u)=>{
    setUser(u);
    const{data}=await supabase.from('profiles').select('*').eq('id',u.id).single();
    if(data){setProfile(data);if(data.role==='teacher')loadStudents(u.id);else setActiveId(u.id);}
    setLoading(false);
  };
  const loadStudents=async(tid)=>{
    const{data}=await supabase.from('profiles').select('*').eq('teacher_id',tid).eq('role','student');
    setStudents(data||[]);
  };
  const logout=async()=>{await supabase.auth.signOut();};
  const isTeacher=profile?.role==='teacher';
  const activeStudent=isTeacher?students.find(s=>s.id===activeId):profile;
  const tabsRow1=TABS.slice(0,4),tabsRow2=TABS.slice(4,8);

  if(loading)return(<div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#111111'}}><style>{CSS}</style><div style={{color:LIME,fontSize:24,fontWeight:800}}>Carregando…</div></div>);
  if(!user)return<AuthScreen onAuth={u=>loadProfile(u)}/>;

  // TELA INICIAL DO PROFESSOR
  if(isTeacher&&!activeId){
    return(
      <div style={{height:'100vh',display:'flex',flexDirection:'column',background:BG}}>
        <style>{CSS}</style>
        <div style={{background:CARD,padding:'14px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0,borderBottom:`1px solid ${BORDER}`}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:40,height:40,borderRadius:13,background:LIME,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:900,color:'#111'}}>FB</div>
            <div>
              <div style={{color:TEXT3,fontSize:10,fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase'}}>Prof. Dr.</div>
              <div style={{color:TEXT,fontSize:16,fontWeight:800,letterSpacing:'-0.02em',lineHeight:1.1}}>Fabio Busse</div>
            </div>
          </div>
          <button onClick={logout} className="tap" style={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,padding:'9px 12px',color:TEXT3,cursor:'pointer',fontSize:13,fontWeight:600}}>Sair</button>
        </div>
        <div style={{flex:1,overflowY:'auto'}}>
          <TeacherHome
            students={students}
            onSelectStudent={id=>{setActiveId(id);setTab('overview');}}
            onAddStudent={()=>loadStudents(user.id)}
            onReload={()=>loadStudents(user.id)}
          />
        </div>
        <ContactButton/>
      </div>
    );
  }

  return(
    <div style={{height:'100vh',display:'flex',flexDirection:'column',background:BG}}>
      <style>{CSS}</style>
      {showStudents&&isTeacher&&(
        <div onClick={()=>setShowStudents(false)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',zIndex:200,backdropFilter:'blur(8px)',display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
          <div style={{background:CARD,borderRadius:'24px 24px 0 0',maxHeight:'80vh',overflowY:'auto',border:`1px solid ${BORDER}`}}>
            <div style={{padding:'16px 0 4px',display:'flex',justifyContent:'center'}}><div style={{width:40,height:4,borderRadius:2,background:BORDER}}/></div>
            <div style={{padding:'8px 20px 32px'}}>
              <div style={{fontSize:22,fontWeight:800,color:TEXT,marginBottom:20}}>Trocar Aluno</div>
              {students.map(s=>(
                <div key={s.id} className="tap" onClick={()=>{setActiveId(s.id);setTab('overview');setShowStudents(false);}}
                  style={{display:'flex',alignItems:'center',gap:14,padding:'16px',borderRadius:16,background:activeId===s.id?`${LIME}15`:CARD2,border:`2px solid ${activeId===s.id?LIME:BORDER}`,marginBottom:10,cursor:'pointer'}}>
                  <div style={{width:46,height:46,borderRadius:13,background:CARD,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontWeight:900,color:LIME,flexShrink:0}}>{(s.name||'?').charAt(0)}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:16,fontWeight:700,color:TEXT}}>{s.name||s.email}</div>
                    {s.level&&<div style={{fontSize:13,color:TEXT3}}>{s.level}</div>}
                  </div>
                  {activeId===s.id&&<div style={{color:LIME,fontSize:18,fontWeight:900}}>✓</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div style={{background:CARD,padding:'14px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0,borderBottom:`1px solid ${BORDER}`}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:40,height:40,borderRadius:13,background:LIME,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:900,color:'#111'}}>FB</div>
          <div>
            <div style={{color:TEXT3,fontSize:10,fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase'}}>Prof. Dr.</div>
            <div style={{color:TEXT,fontSize:16,fontWeight:800,letterSpacing:'-0.02em',lineHeight:1.1}}>Fabio Busse</div>
          </div>
        </div>
        <div style={{display:'flex',gap:8}}>
          {isTeacher&&(
            <button onClick={()=>setShowStudents(true)} className="tap" style={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,padding:'9px 14px',color:TEXT,cursor:'pointer',fontSize:14,fontWeight:700,display:'flex',alignItems:'center',gap:6,maxWidth:140}}>
              <span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{activeStudent?.name||'Alunos'}</span>
              <span style={{color:TEXT3,fontSize:11}}>▾</span>
            </button>
          )}
          <button onClick={logout} className="tap" style={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,padding:'9px 12px',color:TEXT3,cursor:'pointer',fontSize:13,fontWeight:600}}>Sair</button>
        </div>
      </div>

      {/* BANNER ALUNO */}
      {isTeacher&&activeStudent&&(
        <div style={{background:CARD2,padding:'10px 20px',display:'flex',alignItems:'center',gap:10,borderBottom:`1px solid ${BORDER}`}}>
          <div style={{width:30,height:30,borderRadius:9,background:LIME,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:900,color:'#111',flexShrink:0}}>{(activeStudent.name||'?').charAt(0)}</div>
          <div style={{flex:1}}>
            <div style={{color:TEXT,fontSize:14,fontWeight:700}}>{activeStudent.name}</div>
            {activeStudent.level&&<div style={{color:TEXT3,fontSize:12}}>{activeStudent.level}</div>}
          </div>
          <button onClick={()=>setActiveId(null)} className="tap" style={{background:'transparent',border:`1px solid ${BORDER}`,borderRadius:10,padding:'6px 14px',color:TEXT3,cursor:'pointer',fontSize:13,fontWeight:600}}>← Voltar</button>
        </div>
      )}

      {/* CONTEÚDO */}
      <div style={{flex:1,overflowY:'auto'}}>
        {tab==='overview'&&<OverviewTab studentId={activeId}/>}
        {tab==='calendar'&&<CalendarTab studentId={activeId} isTeacher={isTeacher}/>}
        {tab==='grammar'&&<GrammarTab studentId={activeId} isTeacher={isTeacher}/>}
        {tab==='homework'&&<HomeworkTab studentId={activeId} isTeacher={isTeacher}/>}
        {tab==='materials'&&<MaterialsTab studentId={activeId} isTeacher={isTeacher}/>}
        {tab==='videos'&&<VideosTab studentId={activeId} isTeacher={isTeacher}/>}
        {tab==='schedule'&&<ScheduleTab studentId={activeId} isTeacher={isTeacher}/>}
        {tab==='profile'&&<ProfileTab profile={activeStudent} isTeacher={isTeacher} onUpdate={p=>{if(isTeacher)loadStudents(user.id);}}/>}
      </div>

      <ContactButton/>

      {/* NAVEGAÇÃO */}
      <div style={{background:CARD,borderTop:`1px solid ${BORDER}`,flexShrink:0}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)'}}>
          {tabsRow1.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} className="tap" style={{padding:'14px 4px 12px',border:'none',background:'transparent',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
              <div style={{width:6,height:6,borderRadius:'50%',background:tab===t.id?LIME:'transparent'}}/>
              <span style={{fontSize:13,fontWeight:tab===t.id?800:500,color:tab===t.id?LIME:TEXT3}}>{t.label}</span>
            </button>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',borderTop:`1px solid ${BORDER}`}}>
          {tabsRow2.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} className="tap" style={{padding:'14px 4px 12px',border:'none',background:'transparent',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
              <div style={{width:6,height:6,borderRadius:'50%',background:tab===t.id?LIME:'transparent'}}/>
              <span style={{fontSize:13,fontWeight:tab===t.id?800:500,color:tab===t.id?LIME:TEXT3}}>{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const root=createRoot(document.getElementById('root'));
root.render(<App/>);