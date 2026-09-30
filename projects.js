const projects = {
	decision: {
		field: '01 / DATA SCIENCE',
		title: 'AFRISEG',
		discipline: 'Data Science',
		focus: 'Deep Learning Research',
		role: 'Research and Model Design',
		opportunity: 'Western-trained tumor segmentation models break on Sub-Saharan African MRI scans because of lower-field imaging, artifacts, and missing modalities. No published model had reached clinically useful accuracy on this population.',
		approach: 'I built AfriSeg, a four-stage pipeline with self-supervised pretraining, modality imputation, artifact-aware learning, and uncertainty-weighted ensembling. The system is designed for low-resource African neuroimaging constraints instead of assuming ideal data.',
		outcome: 'The project produced a working SSA-focused segmentation workflow with measurable gains from pretraining and stable cross-validation behavior. It also proved a practical training path for constrained compute environments.',
		result: 'From hard constraints to <span>usable clinical direction.</span>'
	},
	forecast: {
		field: '02 / DATA SCIENCE',
		title: 'Igbo TTS <em>LLM</em>',
		discipline: 'Data Science',
		focus: 'Speech AI',
		role: 'Model Adaptation and Evaluation',
		opportunity: 'Most speech bots do not pronounce Igbo words with accurate local accent and intonation. This limits accessibility for native speakers and learners.',
		approach: 'I adapted and fine-tuned a pretrained TTS stack for Igbo phonetics and contextual delivery. The pipeline focused on improving natural pronunciation quality for real use.',
		outcome: 'The result is a working Igbo speech demo that generates clearer local-language output. It validates a path for expanding speech AI support in underserved African languages.',
		result: 'Local language AI with <span>stronger voice fidelity.</span>'
	},
	dermatology: {
		field: '03 / DATA SCIENCE',
		title: 'Dermatology <em>RAG</em>',
		discipline: 'Data Science',
		focus: 'Multimodal retrieval',
		role: 'RAG design and document processing',
		opportunity: 'Clinical dermatology knowledge is scattered across documents, images, and tables, which makes fast retrieval difficult. The workflow needed a way to surface the right information from mixed content quickly.',
		approach: 'I built a retrieval pipeline with multi-query generation, multimodal document processing, and advanced RAG patterns such as HyDE and multi-representation indexing. The system is structured to answer clinical questions from mixed source material more reliably.',
		outcome: 'The project turns fragmented dermatology material into a searchable assistant flow. It supports faster access to relevant information while keeping the source structure organized.',
		result: 'A more usable path to <span>clinical knowledge retrieval.</span>'
	},
	product: {
		field: '01 / SOFTWARE ENGINEERING',
		title: 'VoiceRx <em>Platform</em>',
		discipline: 'Software Engineering',
		focus: 'Full Stack Health System',
		role: 'Frontend Engineering',
		opportunity: 'Healthcare workers spend significant time manually documenting patient information, leading to longer wait times, clinician fatigue, and increased errors.',
		approach: 'VoiceRx uses AI-powered speech recognition and real-time data extraction to capture clinical information through voice and automate documentation across hospital workflows.',
		outcome: 'Reduced documentation time, improved accuracy and patient flow, and better coordination between nurses, doctors, pharmacists, and referrals.',
		result: 'A robust product surface for <span>reliable delivery.</span>'
	},
	platform: {
		field: '02 / SOFTWARE ENGINEERING',
		title: 'Face Recognition <em>System</em>',
		discipline: 'Software Engineering',
		focus: 'Computer Vision Implementation',
		role: 'System Build and Integration',
		opportunity: 'The project required an end-to-end face recognition workflow that could capture, process, and identify users consistently. A usable implementation needed both model logic and dependable application wiring.',
		approach: 'I built a complete recognition system and integrated the core computer vision pipeline into an executable app workflow. The setup focused on repeatable processing and practical usage.',
		outcome: 'The project delivered a functioning face recognition application with repository-backed implementation. It provides a base that can be extended for accuracy and deployment hardening.',
		result: 'From prototype logic to <span>a working recognition flow.</span>'
	},
	automation: {
		field: '07 / AI AUTOMATION',
		title: 'AI <em>Receptionist</em>',
		discipline: 'AI Automation',
		focus: 'Call handling automation',
		role: 'Voice workflow and system orchestration',
		opportunity: 'Inbound calls were difficult to handle consistently without a person available at all times. The process needed a fast way to answer, book, reschedule, and log every call.',
		approach: 'I built an automated receptionist that answers calls through VAPI, manages appointments, sends post-call summaries, and logs outcomes to Google Sheets. The flow also supports escalation for support questions when needed.',
		outcome: 'The system gives callers an immediate response and keeps appointment updates moving without manual handling. It also leaves a clean record of each interaction for the team.',
		result: '24/7 call handling with <span>less manual support load.</span>'
	},
	knowledge: {
		field: '06 / AI AUTOMATION',
		title: 'Lead Gen <em>Chatbot</em>',
		discipline: 'AI Automation',
		focus: 'Lead capture and qualification',
		role: 'Chat workflow and conversion design',
		opportunity: 'Website visitors often leave before getting a clear answer or taking the next step. The site needed a conversational way to qualify interest and capture contact details.',
		approach: 'I built a Crisp-based chatbot that answers questions, offers a free solar savings estimate, and uses Google Solar API to calculate potential savings. The bot captures name, email, and phone so the lead can be followed up.',
		outcome: 'The chatbot turns passive traffic into qualified leads with a clearer path to follow-up. It also reduces the amount of manual back-and-forth required from the team.',
		result: 'More qualified leads with <span>less visitor drop-off.</span>'
	},
	invoice: {
		field: '03 / AI AUTOMATION',
		title: 'Intelligent Invoice <em>Processing</em>',
		discipline: 'AI Automation',
		focus: 'Document extraction workflow',
		role: 'Workflow design and build',
		opportunity: 'Novus Realty receives vendor invoices by email in many document formats. Opening each email, reading attachments, and typing the details into a Google Sheet was slow, repetitive, and prone to human error.',
		approach: 'I built an n8n workflow that monitors the invoice inbox 24/7, filters out unrelated email, and extracts text from bodies and attachments using file-type extractors or OCR. An AI layer structures the content, which is then cleaned, given a unique identifier, and checked for duplicates before logging.',
		outcome: 'Valid invoices land in Google Sheets as clean, structured records with no manual handling, while failures go to a separate error log for staff attention. The team spends less time on admin and more invoices are paid on time.',
		result: 'From inbox to ledger in <span>seconds, not minutes.</span>',
		metrics: [['~10s', 'per invoice, down from ~5 min manually'], ['30×', 'faster processing'], ['24/7', 'inbox monitoring'], ['0', 'duplicate records logged']]
	},
	reporting: {
		field: '04 / AI AUTOMATION',
		title: 'AI Operations <em>Reporting</em>',
		discipline: 'AI Automation',
		focus: 'Cross-department reporting',
		role: 'Data pipeline, AI insights and dashboard',
		opportunity: 'Koya Talent tracked Sales in Google Sheets, Project Delivery in Airtable, and People Ops in an internal API. A single view of performance meant manual exports, copy-paste cleanup, and one-off analysis every time.',
		approach: 'A scheduled n8n workflow pulls all three sources, normalises records, hashes them to skip unchanged data, and upserts into Supabase. Metrics are computed per period against the prior equivalent period, then Claude writes an executive summary, flagged risks, and recommended actions.',
		outcome: 'Leadership opens one dashboard, picks a period or department, and sees consistent metrics, AI insights, and data-quality flags without touching a source system. Any view exports to CSV and a weekly digest lands every Sunday.',
		result: 'One dashboard for <span>the whole business.</span>',
		metrics: [['~15 min', 'per report, down from hours'], ['3', 'data sources unified'], ['Hourly', 'automatic sync'], ['4', 'reporting periods incl. custom']]
	},
	proposals: {
		field: '05 / AI AUTOMATION',
		title: 'AI Proposal <em>Generator</em>',
		discipline: 'AI Automation',
		focus: 'Sales document automation',
		role: 'Full-stack build and AI drafting',
		opportunity: 'Sales reps wrote every proposal by hand after a discovery call, chased approvers over email or Slack, and exported PDFs themselves. There was no shared structure, no record of who approved what, and no way to know if a client opened it.',
		approach: 'Reps start from an intake form or bulk CSV import and attach call recordings or past proposals, which are transcribed automatically. Claude drafts every section and marks unsupported claims as [NEEDS INPUT] instead of inventing them. Approvers review a live client preview and approve or reject with a note.',
		outcome: 'Approved proposals export to PDF and email from a signed, time-limited link, with opens and clicks tracked and a follow-up sent if unopened. Every state change is attributed, so the audit trail is complete by default.',
		result: 'From discovery call to <span>client-ready in minutes.</span>',
		metrics: [['5', 'stage pipeline, intake to delivery'], ['100%', 'of state changes audit-logged'], ['0', 'invented claims — gaps flagged'], ['2-day', 'automatic follow-up']]
	},
	content: {
		field: '02 / AI AUTOMATION',
		title: 'AI Content <em>Research Agent</em>',
		discipline: 'AI Automation',
		focus: 'Research and publishing pipeline',
		role: 'Agent pipeline and full-stack build',
		opportunity: 'Researching, drafting, adapting per channel, and coordinating approval across content pieces was slow and inconsistent. Nothing enforced that published content was source-grounded, on-brand, SEO-compliant, and approved.',
		approach: 'A raw idea or URL moves through intake, Tavily research, Voyage AI retrieval and reranking, SEO planning, drafting, and rubric-based self-evaluation with automated revise loops. Claude runs every step across two model tiers to control cost, then adapts the article for LinkedIn, X, and email.',
		outcome: 'Creators get a draft-ready, fully cited package from a single idea. A database-enforced approval gate means nothing publishes without a human decision, and approved posts are scheduled through Buffer with every stage visible on an activity timeline.',
		result: 'One idea becomes <span>four cited, approved pieces.</span>',
		metrics: [['1 → 4', 'idea to article + 3 channel drafts'], ['3', 'automated revise loops per stage'], ['Top 3–5', 'reranked sources per piece'], ['8', 'end-to-end test scenarios']]
	},
	outreach: {
		field: '01 / AI AUTOMATION',
		title: 'AI Lead Research <em>Agent</em>',
		discipline: 'AI Automation',
		focus: 'Lead research and outreach',
		role: 'Agent design and full-stack build',
		opportunity: 'Researching companies against an ideal customer profile, verifying fit, and drafting personalised outreach was slow and easy to cut corners on. Nothing enforced spend approval before a paid search or grounded each qualification in a real source.',
		approach: 'Using the Claude Agent SDK, a plain-language brief becomes a structured ICP that a human approves alongside a cost estimate. Apify discovers companies, Firecrawl scrapes their sites, and Claude qualifies each one with cited fit reasons, then drafts outreach checked against lint rules.',
		outcome: 'Operators get a scored, source-cited shortlist with ready-to-send drafts from a one-line brief. Two mandatory human gates, prompt-injection scanning, and live cost tracking mean nothing is spent or exported without explicit approval.',
		result: 'A vetted shortlist from <span>a one-line brief.</span>',
		metrics: [['2', 'mandatory human approval gates'], ['6', 'dimension quality rubric'], ['4', 'drafts per lead: 3 emails + LinkedIn'], ['0', 'messages auto-sent']]
	},
	pdac: {
		field: 'CLIENT CASE STUDY / PDAC FOUNDATION',
		title: 'PDAC Bootcamp <em>Operations</em>',
		discipline: 'AI Automation',
		focus: 'Internal tools and daily automation',
		role: 'Dashboard build and workflow automation',
		opportunity: 'PDAC Foundation runs a 30-day summer bootcamp and needed a way to track student progress and give staff visibility into cohort performance, while keeping daily content and updates going out without someone doing it by hand every day.',
		approach: 'I built a student leaderboard and an admin dashboard in plain HTML, CSS, and vanilla JavaScript, with the data layer structured so a Google Sheets API connection can be dropped in later without a rebuild. Alongside it, an n8n workflow connected to WhatsApp and Google Sheets handles the recurring daily posting automatically.',
		outcome: 'Staff get purpose-built tools that match how the foundation actually tracks and communicates, instead of an off-the-shelf dashboard. The posting automation reclaims an estimated 48.6 hours of staff time per season, roughly ₦76,000 at PDAC\'s internal labour value, time a non-profit can put back into the programme.',
		result: 'Staff time returned to <span>the students it serves.</span>',
		metrics: [['48.6 hrs', 'staff time reclaimed per season'], ['₦76k+', 'labour value saved at ₦1,560/hr'], ['30 days', 'of daily posting, fully automated'], ['2', 'dashboards: leaderboard + admin']]
	},
	sureride: {
		field: 'CLIENT CASE STUDY / SURERIDE',
		title: 'SureRide Booking <em>System</em>',
		discipline: 'AI Automation',
		focus: 'Operations MVP',
		role: 'Supabase backend and frontend integration',
		opportunity: 'SureRide, a student-run airport transport service run by two co-founders, expected 20+ booking requests ahead of school resumption but coordinated everything manually on WhatsApp. A solo booking took about a day and a half to finalise, and a shared 4-seater booking could take up to a week.',
		approach: 'I built a Supabase backend from SureRide\'s existing Figma designs and requirements, then adapted the company\'s existing website frontend to run on it, so every booking request is captured and structured as it arrives instead of living in a memory-dependent WhatsApp thread. Final passenger matching, driver selection, and client messaging were deliberately left manual so the MVP could ship reliably before the resumption deadline.',
		outcome: 'SureRide now has one structured record of every solo, paired, and shared booking, cutting the coordination burden on a two-person team during its busiest period. The database and workflow structure form the foundation the full SureRide platform will build on, rather than a rebuild after each rush.',
		result: 'A structured foundation for <span>a two-person team\'s growth.</span>',
		metrics: [['20+', 'booking requests expected at resumption'], ['Up to 7 days', 'to finalise a shared booking before'], ['3', 'booking types in one record'], ['2', 'founders, no ops staff']]
	}
};

const key = new URLSearchParams(location.search).get('project') || 'decision';
const p = projects[key] || projects.decision;

document.title = p.title.replace(/<[^>]+>/g, '') + ' - Kosi Nebolisa';
const { metrics = [], ...fields } = p;
for (const [id, value] of Object.entries(fields)) {
	const el = document.getElementById(id);
	if (el) el.innerHTML = value;
}
document.getElementById('metrics').innerHTML = metrics
	.map(([value, label]) => `<div><b>${value}</b><span>${label}</span></div>`)
	.join('');

document.getElementById('back').href =
	p.discipline === 'Data Science'
		? 'data-science.html'
		: p.discipline === 'Software Engineering'
			? 'software-engineering.html'
			: 'ai-automation.html';
