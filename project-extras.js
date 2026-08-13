// Resource links and tech stack pulled from the project sheet.
const projectResources={
decision:{
github:'https://github.com/kosivivian/afriseg.git',
live:'',
demo:'',
tech:['PyTorch','MONAI','nnU-Net v2','BYOL','3D ResNet-50']
},
forecast:{
github:'',
live:'https://huggingface.co/spaces/kosinebolisa/igbo-tts-unsloth-demo',
demo:'',
tech:['Orpheus TTS','Hugging Face']
},
	dermatology:{
		github:'https://github.com/kosivivian/dermatology_naive_rag_.git',
		live:'https://dermatologyrag.streamlit.app/',
		demo:'',
		tech:['LangChain','Streamlit','Groq','Hugging Face','Chroma DB']
	},
product:{
github:'https://github.com/MosesOnerhime/voicerx.git',
live:'',
demo:'',
tech:['TypeScript','React','Tailwind','Redux']
},
platform:{
github:'https://github.com/Nugochukwu/CSC_309_Facial_Recognition.git',
live:'',
demo:'',
tech:['Python','OpenCV','Face Recognition']
},
automation:{
		github:'https://github.com/kosivivian/automation-workflows.git',
		live:'https://ai-employee-roan.vercel.app/',
demo:'',
		tech:['VAPI','n8n','Google Sheets']
},
knowledge:{
		github:'https://github.com/kosivivian/iron_resources_lead_gen_chatbot.git',
		live:'https://iron-resources-lead-gen-chatbot.vercel.app/',
demo:'',
		tech:['n8n','Crisp','Google APIs']
}
};
const resourceKey=new URLSearchParams(location.search).get('project')||'decision',resources=projectResources[resourceKey]||projectResources.decision;
const renderResource=({label,url,icon})=>url?`<a href="${url}" target="_blank" rel="noreferrer">${icon} ${label} <span>↗</span></a>`:`<span class="resource-empty">${icon} ${label}<small>Add URL</small></span>`;
const resourcePanel=document.createElement('section');resourcePanel.className='project-resources';resourcePanel.innerHTML=`<div class="wrap"><p class="eyebrow">PROJECT RESOURCES</p><div class="resource-links">${renderResource({label:'View on GitHub',url:resources.github,icon:'◈'})}${renderResource({label:'Visit live project',url:resources.live,icon:'↗'})}</div><p class="tech-label">TECH STACK</p><div class="tech-stack">${resources.tech.map(tech=>`<span>${tech}</span>`).join('')}</div></div>`;document.querySelector('.case-study').after(resourcePanel);
if(resources.demo){const video=document.createElement('section');video.className='demo-video';video.innerHTML=`<div class="wrap"><p class="eyebrow">PROJECT DEMO</p><div class="video-frame"><iframe src="${resources.demo}" title="Project demo" allowfullscreen></iframe></div></div>`;resourcePanel.after(video)}
const resourceStyles=document.createElement('style');resourceStyles.textContent=`.project-resources{padding:66px 0;background:#fffdfa;border-top:1px solid #e3ddd5}.resource-links{display:flex;gap:12px;margin-top:23px}.resource-links>a,.resource-empty{border:1px solid #cfc7be;padding:14px 16px;font:600 12px Inter,Arial,sans-serif}.resource-links>a:hover{background:#6b1020;border-color:#6b1020;color:#fff}.resource-links span{margin-left:9px;color:#6b1020}.resource-empty{color:#8c8580}.resource-empty small{display:block;margin-top:4px;font:9px "JetBrains Mono",monospace;color:#6b1020}.tech-label{font:10px "JetBrains Mono",monospace;letter-spacing:.1em;color:#6b1020;margin:42px 0 12px}.tech-stack{display:flex;flex-wrap:wrap;gap:8px}.tech-stack span{font:500 11px "JetBrains Mono",monospace;padding:8px 10px;border:1px solid #cfc7be}.demo-video{padding:72px 0;background:#161414}.demo-video .eyebrow{color:#e8a6ae}.video-frame{margin-top:23px;aspect-ratio:16/9;background:#302b2b}.video-frame iframe{width:100%;height:100%;border:0}@media(max-width:700px){.project-resources{padding:52px 0}.resource-links{display:block}.resource-links>a,.resource-empty{display:block;margin-bottom:9px}}`;document.head.append(resourceStyles);
