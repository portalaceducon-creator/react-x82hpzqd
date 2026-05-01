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
  {id:"g29",cat:"Articles",name:"Quantifiers (some, any, much, many)"},{id:"g30",cat:"Articles",name:"Demonstratives (this, that, these, those)"},
  {id:"g31",cat:"Nouns",name:"Countable & Uncountable Nouns"},{id:"g32",cat:"Nouns",name:"Plural Forms"},
  {id:"g33",cat:"Nouns",name:"Compound Nouns"},{id:"g34",cat:"Nouns",name:"Possessive 's"},
  {id:"g35",cat:"Nouns",name:"Collective Nouns"},{id:"g36",cat:"Pronouns",name:"Personal Pronouns"},
  {id:"g37",cat:"Pronouns",name:"Possessive Pronouns"},{id:"g38",cat:"Pronouns",name:"Reflexive Pronouns"},
  {id:"g39",cat:"Pronouns",name:"Relative Pronouns"},{id:"g40",cat:"Pronouns",name:"Indefinite Pronouns"},
  {id:"g41",cat:"Adjectives",name:"Descriptive Adjectives"},{id:"g42",cat:"Adjectives",name:"Comparative Adjectives"},
  {id:"g43",cat:"Adjectives",name:"Superlative Adjectives"},{id:"g44",cat:"Adjectives",name:"Order of Adjectives"},
  {id:"g45",cat:"Adjectives",name:"Participial Adjectives"},{id:"g46",cat:"Adverbs",name:"Adverbs of Frequency"},
  {id:"g47",cat:"Adverbs",name:"Adverbs of Manner"},{id:"g48",cat:"Adverbs",name:"Adverbs of Time"},
  {id:"g49",cat:"Adverbs",name:"Adverbs of Place"},{id:"g50",cat:"Adverbs",name:"Adverbs of Degree"},
  {id:"g51",cat:"Prepositions",name:"Prepositions of Time"},{id:"g52",cat:"Prepositions",name:"Prepositions of Place"},
  {id:"g53",cat:"Prepositions",name:"Prepositions of Movement"},{id:"g54",cat:"Prepositions",name:"Dependent Prepositions"},
  {id:"g55",cat:"Phrasal Verbs",name:"Phrasal Verbs – Basic"},{id:"g56",cat:"Phrasal Verbs",name:"Phrasal Verbs – Intermediate"},
  {id:"g57",cat:"Phrasal Verbs",name:"Phrasal Verbs – Advanced"},{id:"g58",cat:"Sentence Structure",name:"Word Order"},
  {id:"g59",cat:"Sentence Structure",name:"Questions (Yes/No & Wh-)"},{id:"g60",cat:"Sentence Structure",name:"Negative Sentences"},
  {id:"g61",cat:"Sentence Structure",name:"Question Tags"},{id:"g62",cat:"Conditionals",name:"Zero Conditional"},
  {id:"g63",cat:"Conditionals",name:"First Conditional"},{id:"g64",cat:"Conditionals",name:"Second Conditional"},
  {id:"g65",cat:"Conditionals",name:"Third Conditional"},{id:"g66",cat:"Conditionals",name:"Mixed Conditionals"},
  {id:"g67",cat:"Passive Voice",name:"Passive – Present Tenses"},{id:"g68",cat:"Passive Voice",name:"Passive – Past Tenses"},
  {id:"g69",cat:"Passive Voice",name:"Passive – Future & Modal"},{id:"g70",cat:"Passive Voice",name:"Causative (Have / Get sth done)"},
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
            return(
              <div key={day} className="tap" onClick={()=>isTeacher&&setModal(ds)}
                style={{background:CARD,minHeight:46,padding:'6px 2px',cursor:isTeacher?'pointer':'default',border:isToday?`2px solid ${LIME}`:'none'}}>
                <div style={{width:26,height:26,borderRadius:8,background:isToday?LIME:'transparent',color:isToday?'#111':TEXT,display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:isToday?900:400,margin:'0 auto 3px'}}>{day}</div>
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
          <div style={{fontSize:12,fontWeight:700,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:14}}>Nova Tarefa</div>
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
          <div style={{fontSize:12,fontWeight:700,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:14}}>Novo Material</div>
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
          <div style={{fontSize:12,fontWeight:700,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:14}}>Novo Vídeo</div>
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

function ProfileTab({profile,isTeacher,onUpdate}){
  const[f,setF]=useState({...profile});
  const[ok,setOk]=useState(false);
  const upd=(k,v)=>setF(x=>({...x,[k]:v}));
  const save=async()=>{
    await supabase.from('profiles').update({name:f.name,phone:f.phone,level:f.level,goal:f.goal,notes:f.notes,start_date:f.start_date}).eq('id',profile.id);
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
        <div><div style={{fontSize:12,fontWeight:700,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>Observações</div>
        <textarea value={f.notes||''} onChange={e=>upd('notes',e.target.value)} disabled={!isTeacher} style={{...ipt(!isTeacher),minHeight:80,resize:'vertical',marginBottom:isTeacher?16:0}}/></div>
        {isTeacher&&<button onClick={save} className="tap" style={{width:'100%',padding:'17px',borderRadius:14,border:'none',background:LIME,color:'#111',fontSize:16,fontWeight:800,cursor:'pointer'}}>{ok?'✓ Salvo!':'Salvar Perfil'}</button>}
      </div>
    </div>
  );
}

function StudentSelector({students,activeId,onSelect,onAdd,onClose}){
  const[adding,setAdding]=useState(false);
  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[pass,setPass]=useState('');
  const[loading,setLoading]=useState(false);
  const[err,setErr]=useState('');
  const ipt={width:'100%',background:BG,border:`1px solid ${BORDER}`,borderRadius:14,padding:'14px 16px',fontSize:15,color:TEXT,marginBottom:8};
  const create=async()=>{
    setLoading(true);setErr('');
    try{
      const{data,error}=await supabase.auth.signUp({email,password:pass,options:{data:{name,role:'student'}}});
      if(error)throw error;
      if(data.user)await supabase.from('profiles').upsert({id:data.user.id,email,name,role:'student',teacher_id:'68b28e05-5161-44ca-9d5c-2fb35cefe705'});
      onAdd();setAdding(false);setName('');setEmail('');setPass('');
    }catch(e){setErr(e.message);}
    setLoading(false);
  };
  return(
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',zIndex:200,backdropFilter:'blur(8px)',display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
      <div style={{background:CARD,borderRadius:'24px 24px 0 0',maxHeight:'80vh',overflowY:'auto',border:`1px solid ${BORDER}`}}>
        <div style={{padding:'16px 0 4px',display:'flex',justifyContent:'center'}}><div style={{width:40,height:4,borderRadius:2,background:BORDER}}/></div>
        <div style={{padding:'8px 20px 32px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
            <div style={{fontSize:22,fontWeight:800,color:TEXT,letterSpacing:'-0.02em'}}>Meus Alunos</div>
            <button onClick={()=>setAdding(!adding)} className="tap" style={{background:LIME,border:'none',borderRadius:12,padding:'10px 16px',color:'#111',fontSize:14,fontWeight:800,cursor:'pointer'}}>{adding?'Cancelar':'+ Novo'}</button>
          </div>
          {adding&&(
            <div style={{background:CARD2,borderRadius:16,padding:16,marginBottom:16}}>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome *" style={ipt}/>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email *" style={ipt}/>
              <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Senha *" style={{...ipt,marginBottom:12}}/>
              {err&&<div style={{color:CORAL,fontSize:13,marginBottom:10,fontWeight:600}}>{err}</div>}
              <button onClick={create} disabled={loading} className="tap" style={{width:'100%',padding:'14px',borderRadius:12,border:'none',background:LIME,color:'#111',fontSize:15,fontWeight:800,cursor:'pointer'}}>{loading?'Criando…':'Criar Aluno'}</button>
            </div>
          )}
          {students.map(s=>(
            <div key={s.id} className="tap" onClick={()=>{onSelect(s.id);onClose();}}
              style={{display:'flex',alignItems:'center',gap:14,padding:'16px',borderRadius:16,background:activeId===s.id?`${LIME}15`:CARD2,border:`2px solid ${activeId===s.id?LIME:BORDER}`,marginBottom:10,cursor:'pointer'}}>
              <div style={{width:50,height:50,borderRadius:15,background:CARD,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,fontWeight:900,color:LIME,flexShrink:0}}>{(s.name||s.email||'?').charAt(0).toUpperCase()}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:16,fontWeight:700,color:TEXT,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{s.name||s.email}</div>
                {s.level&&<div style={{fontSize:13,color:TEXT3,marginTop:2}}>{s.level}</div>}
              </div>
              {activeId===s.id&&<div style={{color:LIME,fontSize:18,fontWeight:900}}>✓</div>}
            </div>
          ))}
          {students.length===0&&!adding&&<div style={{textAlign:'center',padding:'32px 0',color:TEXT3,fontSize:15,fontWeight:500}}>Nenhum aluno cadastrado</div>}
        </div>
      </div>
    </div>
  );
}

// ── BOTÃO DE CONTATO (WhatsApp + Email + Site) ──
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
            <div style={{fontSize:13,fontWeight:700,color:TEXT3,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:10}}>Ou envie uma mensagem</div>
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
    setStudents(data||[]);if(data?.length)setActiveId(data[0].id);
  };
  const logout=async()=>{await supabase.auth.signOut();};
  const isTeacher=profile?.role==='teacher';
  const activeStudent=isTeacher?students.find(s=>s.id===activeId):profile;
  const tabsRow1=TABS.slice(0,4),tabsRow2=TABS.slice(4,8);

  if(loading)return(<div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#111111'}}><style>{CSS}</style><div style={{color:LIME,fontSize:24,fontWeight:800}}>Carregando…</div></div>);
  if(!user)return<AuthScreen onAuth={u=>loadProfile(u)}/>;

  return(
    <div style={{height:'100vh',display:'flex',flexDirection:'column',background:BG}}>
      <style>{CSS}</style>
      {showStudents&&isTeacher&&<StudentSelector students={students} activeId={activeId} onSelect={id=>{setActiveId(id);setTab('overview');}} onAdd={()=>loadStudents(user.id)} onClose={()=>setShowStudents(false)}/>}

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

      {/* BANNER DO ALUNO */}
      {isTeacher&&activeStudent&&(
        <div style={{background:CARD2,padding:'10px 20px',display:'flex',alignItems:'center',gap:10,borderBottom:`1px solid ${BORDER}`}}>
          <div style={{width:30,height:30,borderRadius:9,background:LIME,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:900,color:'#111',flexShrink:0}}>{(activeStudent.name||'?').charAt(0).toUpperCase()}</div>
          <div style={{flex:1}}>
            <div style={{color:TEXT,fontSize:14,fontWeight:700}}>{activeStudent.name}</div>
            {activeStudent.level&&<div style={{color:TEXT3,fontSize:12}}>{activeStudent.level}</div>}
          </div>
          <button onClick={()=>setActiveId(null)} className="tap" style={{background:'transparent',border:`1px solid ${BORDER}`,borderRadius:10,padding:'6px 14px',color:TEXT3,cursor:'pointer',fontSize:13,fontWeight:600}}>← Voltar</button>
        </div>
      )}

      {/* CONTEÚDO */}
      <div style={{flex:1,overflowY:'auto'}}>
        {!activeId?(
          <div style={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:16,padding:24}}>
            <div style={{width:72,height:72,borderRadius:22,background:LIME,display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,fontWeight:900,color:'#111'}}>FB</div>
            <div style={{fontSize:18,color:TEXT,fontWeight:700}}>Selecione um aluno</div>
            {isTeacher&&<button onClick={()=>setShowStudents(true)} className="tap" style={{padding:'15px 28px',borderRadius:14,border:'none',background:LIME,color:'#111',fontSize:16,fontWeight:800,cursor:'pointer'}}>Ver Alunos</button>}
          </div>
        ):(
          <>
            {tab==='overview'&&<OverviewTab studentId={activeId}/>}
            {tab==='calendar'&&<CalendarTab studentId={activeId} isTeacher={isTeacher}/>}
            {tab==='grammar'&&<GrammarTab studentId={activeId} isTeacher={isTeacher}/>}
            {tab==='homework'&&<HomeworkTab studentId={activeId} isTeacher={isTeacher}/>}
            {tab==='materials'&&<MaterialsTab studentId={activeId} isTeacher={isTeacher}/>}
            {tab==='videos'&&<VideosTab studentId={activeId} isTeacher={isTeacher}/>}
            {tab==='schedule'&&<ScheduleTab studentId={activeId} isTeacher={isTeacher}/>}
            {tab==='profile'&&<ProfileTab profile={activeStudent} isTeacher={isTeacher} onUpdate={p=>{if(isTeacher)loadStudents(user.id);}}/>}
          </>
        )}
      </div>

      {/* BOTÃO WHATSAPP */}
      <ContactButton/>

      {/* NAVEGAÇÃO INFERIOR */}
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