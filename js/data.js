/*
 * Single source of truth for the site.
 *
 * To update a project:
 *   overview  – 1–2 sentences shown on the home page card / hover tile (TODO: replace with your own copy)
 *   cover     – path to a cover image, e.g. 'assets/covers/pdac.jpg' (~1600×1000). Empty = generated cover.
 *   featured  – true puts the project in the 5 stacked cards; everything else goes in the grid.
 *   year/type – optional, shown in the case-study fact strip.
 *   steps     – "How it works" diagram: [label, note] pairs.
 *   features  – optional list of special features: [title, text] pairs.
 *   challenges– optional "Challenges & decisions": [title, text] pairs.
 * Empty optional fields hide their section automatically.
 */
window.SITE = {};

SITE.projects = [
	{
		slug: 'pdac',
		featured: true,
		kind: 'Client work',
		title: 'PDAC Bootcamp <em>Operations</em>',
		client: 'PDAC Foundation',
		overview: 'Bootcamp dashboards and a daily posting automation that reclaims 48.6 staff hours a season.', // TODO: your overview
		cover: '',
		visual: 'bars', tone: 'wine',
		year: '', type: 'Internal tools + automation',
		focus: 'Internal tools and daily automation',
		role: 'Dashboard build and workflow automation',
		opportunity: 'PDAC Foundation runs a 30-day summer bootcamp and needed a way to track student progress and give staff visibility into cohort performance, while keeping daily content and updates going out without someone doing it by hand every day.',
		approach: 'I built a student leaderboard and an admin dashboard in plain HTML, CSS, and vanilla JavaScript, with the data layer structured so a Google Sheets API connection can be dropped in later without a rebuild. Alongside it, an n8n workflow connected to WhatsApp and Google Sheets handles the recurring daily posting automatically.',
		outcome: 'Staff get purpose-built tools that match how the foundation actually tracks and communicates, instead of an off-the-shelf dashboard. The posting automation reclaims an estimated 48.6 hours of staff time per season, roughly ₦76,000 at PDAC\'s internal labour value, time a non-profit can put back into the programme.',
		result: 'Staff time returned to <span>the students it serves.</span>',
		metrics: [['48.6 hrs', 'staff time reclaimed per season'], ['₦76k+', 'labour value saved at ₦1,560/hr'], ['30 days', 'of daily posting, fully automated'], ['2', 'dashboards: leaderboard + admin']],
		steps: [['Track', 'Student progress lands in a structured data layer'], ['Rank', 'Leaderboard shows cohort standings'], ['Oversee', 'Admin dashboard gives staff cohort-wide visibility'], ['Schedule', 'n8n reads the day\'s content from Google Sheets'], ['Post', 'The daily update goes out on WhatsApp']],
		challenges: [['A data layer ready for Sheets', 'The dashboards run on plain HTML, CSS and JavaScript, with data access isolated so a live Google Sheets connection can be added later without a rebuild.']],
		github: '', live: '', demo: '',
		tech: ['HTML', 'CSS', 'JavaScript', 'n8n', 'WhatsApp', 'Google Sheets']
	},
	{
		slug: 'sureride',
		featured: true,
		kind: 'Client work',
		title: 'SureRide Booking <em>System</em>',
		client: 'SureRide',
		overview: 'A booking operations MVP replacing manual WhatsApp coordination for a two-person team.', // TODO
		cover: '',
		visual: 'window', tone: 'paper',
		year: '', type: 'Operations MVP',
		focus: 'Operations MVP',
		role: 'Supabase backend and frontend integration',
		opportunity: 'SureRide, a student-run airport transport service run by two co-founders, expected 20+ booking requests ahead of school resumption but coordinated everything manually on WhatsApp. A solo booking took about a day and a half to finalise, and a shared 4-seater booking could take up to a week.',
		approach: 'I built a Supabase backend from SureRide\'s existing Figma designs and requirements, then adapted the company\'s existing website frontend to run on it, so every booking request is captured and structured as it arrives instead of living in a memory-dependent WhatsApp thread.',
		outcome: 'SureRide now has one structured record of every solo, paired, and shared booking, cutting the coordination burden on a two-person team during its busiest period. The database and workflow structure form the foundation the full SureRide platform will build on, rather than a rebuild after each rush.',
		result: 'A structured foundation for <span>a two-person team\'s growth.</span>',
		metrics: [['20+', 'booking requests expected at resumption'], ['Up to 7 days', 'to finalise a shared booking before'], ['3', 'booking types in one record'], ['2', 'founders, no ops staff']],
		steps: [['Request', 'Rider submits a solo, paired or shared booking'], ['Capture', 'Supabase stores it as a structured record'], ['Review', 'Founders see every request in one place'], ['Match', 'Passenger matching and driver choice stay with the team']],
		challenges: [['Kept matching manual on purpose', 'Final passenger matching, driver selection, and client messaging were deliberately left manual so the MVP could ship reliably before the resumption deadline.']],
		github: '', live: '', demo: '',
		tech: ['Supabase', 'Figma', 'Website frontend integration']
	},
	{
		slug: 'lead-research-agent',
		featured: true,
		kind: 'AI agent',
		title: 'AI Lead Research <em>Agent</em>',
		overview: 'A one-line brief becomes a vetted, source-cited lead list with draft outreach.', // TODO
		cover: 'assets\covers\Screenshot 2026-10-04 221214.png',
		visual: 'flow', tone: 'clay',
		year: '', type: 'Agent + web app',
		focus: 'Lead research and outreach',
		role: 'Agent design and full-stack build',
		opportunity: 'Researching companies against an ideal customer profile, verifying fit, and drafting personalised outreach was slow and easy to cut corners on. Nothing enforced spend approval before a paid search or grounded each qualification in a real source.',
		approach: 'Using the Claude Agent SDK, a plain-language brief becomes a structured ICP that a human approves alongside a cost estimate. Apify discovers companies, Firecrawl scrapes their sites, and Claude qualifies each one with cited fit reasons, then drafts outreach checked against lint rules.',
		outcome: 'Operators get a scored, source-cited shortlist with ready-to-send drafts from a one-line brief. Two mandatory human gates, prompt-injection scanning, and live cost tracking mean nothing is spent or exported without explicit approval.',
		result: 'A vetted shortlist from <span>a one-line brief.</span>',
		metrics: [['2', 'mandatory human approval gates'], ['6', 'dimension quality rubric'], ['4', 'drafts per lead: 3 emails + LinkedIn'], ['0', 'messages auto-sent']],
		steps: [['Brief', 'Operator describes who they want to reach'], ['ICP + cost', 'Structured profile and cost estimate, approved by a person'], ['Discover', 'Apify finds companies, Firecrawl reads their sites'], ['Qualify', 'Claude scores fit with cited reasons'], ['Draft', 'Outreach drafts checked against lint rules']],
		challenges: [['Two mandatory human gates', 'Nothing is spent on paid search or exported without an explicit approval.'], ['Grounded, guarded qualification', 'Every fit reason cites a real source, and scraped pages are scanned for prompt injection.']],
		github: 'https://github.com/kosivivian/outreach_agent.git', live: 'https://outreach-agent-bice.vercel.app/', demo: '',
		tech: ['Claude Agent SDK', 'Apify', 'Firecrawl', 'Supabase', 'Railway', 'Resend']
	},
	{
		slug: 'invoice-processing',
		featured: true,
		kind: 'Automation',
		title: 'Intelligent Invoice <em>Processing</em>',
		client: 'Novus Realty',
		overview: 'Email invoices extracted, validated, and logged to Google Sheets in ~10 seconds.', // TODO
		cover: '',
		visual: 'flow', tone: 'blush',
		year: '', type: 'n8n workflow',
		focus: 'Document extraction workflow',
		role: 'Workflow design and build',
		opportunity: 'Novus Realty receives vendor invoices by email in many document formats. Opening each email, reading attachments, and typing the details into a Google Sheet was slow, repetitive, and prone to human error.',
		approach: 'I built an n8n workflow that monitors the invoice inbox 24/7, filters out unrelated email, and extracts text from bodies and attachments using file-type extractors or OCR. An AI layer structures the content, which is then cleaned, given a unique identifier, and checked for duplicates before logging.',
		outcome: 'Valid invoices land in Google Sheets as clean, structured records with no manual handling, while failures go to a separate error log for staff attention. The team spends less time on admin and more invoices are paid on time.',
		result: 'From inbox to ledger in <span>seconds, not minutes.</span>',
		metrics: [['~10s', 'per invoice, down from ~5 min manually'], ['30×', 'faster processing'], ['24/7', 'inbox monitoring'], ['0', 'duplicate records logged']],
		steps: [['Watch', 'Invoice inbox monitored 24/7'], ['Filter', 'Unrelated email is dropped'], ['Extract', 'Text pulled from bodies and attachments, OCR when needed'], ['Structure', 'AI turns it into invoice fields'], ['Validate', 'Cleaned, given an ID, checked for duplicates'], ['Log', 'Valid rows to Sheets, failures to an error log']],
		challenges: [['A separate error log', 'Anything that fails validation goes to its own log for staff, so bad data never reaches the ledger.']],
		github: 'https://github.com/kosivivian/automation-workflows.git', live: '', demo: 'https://www.loom.com/share/4e1dd609de1f48b288089e8d18b9d716',
		tech: ['n8n', 'OCR', 'LLM extraction', 'Google Sheets']
	},
	{
		slug: 'ops-reporting',
		featured: true,
		kind: 'Automation',
		title: 'AI Operations <em>Reporting</em>',
		client: 'Koya Talent',
		overview: 'Three business systems unified into one dashboard with AI-written insights.', // TODO
		cover: '',
		visual: 'bars', tone: 'paper',
		year: '', type: 'Data pipeline + dashboard',
		focus: 'Cross-department reporting',
		role: 'Data pipeline, AI insights and dashboard',
		opportunity: 'Koya Talent tracked Sales in Google Sheets, Project Delivery in Airtable, and People Ops in an internal API. A single view of performance meant manual exports, copy-paste cleanup, and one-off analysis every time.',
		approach: 'A scheduled n8n workflow pulls all three sources, normalises records, hashes them to skip unchanged data, and upserts into Supabase. Metrics are computed per period against the prior equivalent period, then Claude writes an executive summary, flagged risks, and recommended actions.',
		outcome: 'Leadership opens one dashboard, picks a period or department, and sees consistent metrics, AI insights, and data-quality flags without touching a source system. Any view exports to CSV and a weekly digest lands every Sunday.',
		result: 'One dashboard for <span>the whole business.</span>',
		metrics: [['~15 min', 'per report, down from hours'], ['3', 'data sources unified'], ['Hourly', 'automatic sync'], ['4', 'reporting periods incl. custom']],
		steps: [['Pull', 'Sheets, Airtable and the People API on a schedule'], ['Normalise', 'Records cleaned and hashed to skip unchanged data'], ['Store', 'Upserted into Supabase'], ['Compute', 'Metrics per period against the prior period'], ['Explain', 'Claude writes the summary, risks and actions'], ['Deliver', 'Dashboard, CSV export and a Sunday digest']],
		challenges: [['Hash before upsert', 'Each record is hashed so unchanged data is skipped on every hourly sync.']],
		github: 'https://github.com/kosivivian/koya_ai_operations_system.git', live: 'https://koya-ai-operations-system.vercel.app/', demo: 'https://www.loom.com/share/490cd520c7f14e6aabf4b876ad444174',
		tech: ['n8n', 'Supabase', 'Claude', 'Airtable', 'Google Sheets', 'Vercel']
	},
	{
		slug: 'content-agent',
		kind: 'AI agent',
		title: 'AI Content <em>Research Agent</em>',
		overview: 'One idea becomes a cited article plus LinkedIn, X, and email drafts.', // TODO
		cover: 'assets\covers\Screenshot 2026-10-04 221417.png',
		visual: 'flow', tone: 'wine',
		year: '', type: 'Agent pipeline + web app',
		focus: 'Research and publishing pipeline',
		role: 'Agent pipeline and full-stack build',
		opportunity: 'Researching, drafting, adapting per channel, and coordinating approval across content pieces was slow and inconsistent. Nothing enforced that published content was source-grounded, on-brand, SEO-compliant, and approved.',
		approach: 'A raw idea or URL moves through intake, Tavily research, Voyage AI retrieval and reranking, SEO planning, drafting, and rubric-based self-evaluation with automated revise loops. Claude runs every step across two model tiers to control cost, then adapts the article for LinkedIn, X, and email.',
		outcome: 'Creators get a draft-ready, fully cited package from a single idea. A database-enforced approval gate means nothing publishes without a human decision, and approved posts are scheduled through Buffer with every stage visible on an activity timeline.',
		result: 'One idea becomes <span>four cited, approved pieces.</span>',
		metrics: [['1 → 4', 'idea to article + 3 channel drafts'], ['3', 'automated revise loops per stage'], ['Top 3–5', 'reranked sources per piece'], ['8', 'end-to-end test scenarios']],
		steps: [['Idea', 'A raw idea or URL'], ['Research', 'Tavily search, Voyage AI reranking'], ['Plan', 'SEO plan for the piece'], ['Draft', 'Claude drafts and scores itself against a rubric'], ['Adapt', 'LinkedIn, X and email versions'], ['Approve', 'Human gate, then Buffer schedules it']],
		challenges: [['Two model tiers', 'Claude runs every step across two model tiers to keep cost under control.'], ['Approval enforced in the database', 'Nothing can publish without a recorded human decision.']],
		github: 'https://github.com/kosivivian/ai_content_research_system', live: 'https://frontend-beta-red-25.vercel.app/login', demo: 'https://www.loom.com/share/a7506c98806c42ec927f74a1a3f43088',
		tech: ['Claude', 'Tavily', 'Voyage AI', 'Firecrawl', 'Supabase', 'Buffer', 'Resend']
	},
	{
		slug: 'proposal-generator',
		kind: 'AI agent',
		title: 'AI Proposal <em>Generator</em>',
		overview: 'Discovery calls turned into on-brand, approved, tracked client proposals.', // TODO
		cover: 'assets\covers\Screenshot 2026-10-04 222218.png',
		visual: 'window', tone: 'blush',
		year: '', type: 'Full-stack web app',
		focus: 'Sales document automation',
		role: 'Full-stack build and AI drafting',
		opportunity: 'Sales reps wrote every proposal by hand after a discovery call, chased approvers over email or Slack, and exported PDFs themselves. There was no shared structure, no record of who approved what, and no way to know if a client opened it.',
		approach: 'Reps start from an intake form or bulk CSV import and attach call recordings or past proposals, which are transcribed automatically. Claude drafts every section and marks unsupported claims as [NEEDS INPUT] instead of inventing them. Approvers review a live client preview and approve or reject with a note.',
		outcome: 'Approved proposals export to PDF and email from a signed, time-limited link, with opens and clicks tracked and a follow-up sent if unopened. Every state change is attributed, so the audit trail is complete by default.',
		result: 'From discovery call to <span>client-ready in minutes.</span>',
		metrics: [['5', 'stage pipeline, intake to delivery'], ['100%', 'of state changes audit-logged'], ['0', 'invented claims — gaps flagged'], ['2-day', 'automatic follow-up']],
		steps: [['Intake', 'Form or bulk CSV, plus call recordings'], ['Transcribe', 'Recordings and past proposals transcribed'], ['Draft', 'Claude drafts each section and flags gaps'], ['Approve', 'Approver reviews a live client preview'], ['Send', 'Signed PDF link, opens tracked, follow-up if unopened']],
		challenges: [['Flag gaps, never invent', 'Unsupported claims are marked [NEEDS INPUT] for the rep instead of being made up.']],
		github: 'https://github.com/kosivivian/ai_proposal_generator.git', live: 'https://ai-proposal-generator-green.vercel.app/', demo: '',
		tech: ['Claude', 'Supabase', 'Resend', 'Headless Chromium']
	},
	{
		slug: 'lead-gen-chatbot',
		kind: 'Automation',
		title: 'Lead Gen <em>Chatbot</em>',
		overview: 'A website chatbot that qualifies interest and captures new leads.', // TODO
		cover: '',
		visual: 'window', tone: 'clay',
		year: '', type: 'Website chatbot',
		focus: 'Lead capture and qualification',
		role: 'Chat workflow and conversion design',
		opportunity: 'Website visitors often leave before getting a clear answer or taking the next step. The site needed a conversational way to qualify interest and capture contact details.',
		approach: 'I built a Crisp-based chatbot that answers questions, offers a free solar savings estimate, and uses Google Solar API to calculate potential savings. The bot captures name, email, and phone so the lead can be followed up.',
		outcome: 'The chatbot turns passive traffic into qualified leads with a clearer path to follow-up. It also reduces the amount of manual back-and-forth required from the team.',
		result: 'More qualified leads with <span>less visitor drop-off.</span>',
		steps: [['Ask', 'Visitor asks a question in Crisp'], ['Answer', 'Bot answers and offers a savings estimate'], ['Estimate', 'Google Solar API calculates savings'], ['Capture', 'Name, email and phone saved for follow-up']],
		github: 'https://github.com/kosivivian/iron_resources_lead_gen_chatbot.git', live: 'https://iron-resources-lead-gen-chatbot.vercel.app/', demo: '',
		tech: ['n8n', 'Crisp', 'Google APIs']
	},
	{
		slug: 'ai-receptionist',
		kind: 'Automation',
		title: 'AI <em>Receptionist</em>',
		overview: '24/7 call handling that books, updates, and logs appointments automatically.', // TODO
		cover: 'assets\covers\Screenshot 2026-10-04 221600.png',
		visual: 'wave', tone: 'wine',
		year: '', type: 'Voice agent',
		focus: 'Call handling automation',
		role: 'Voice workflow and system orchestration',
		opportunity: 'Inbound calls were difficult to handle consistently without a person available at all times. The process needed a fast way to answer, book, reschedule, and log every call.',
		approach: 'I built an automated receptionist that answers calls through VAPI, manages appointments, sends post-call summaries, and logs outcomes to Google Sheets. The flow also supports escalation for support questions when needed.',
		outcome: 'The system gives callers an immediate response and keeps appointment updates moving without manual handling. It also leaves a clean record of each interaction for the team.',
		result: '24/7 call handling with <span>less manual support load.</span>',
		steps: [['Answer', 'VAPI picks up every inbound call'], ['Book', 'Appointments booked or rescheduled'], ['Escalate', 'Support questions routed to a person'], ['Log', 'Summary sent, outcome logged to Sheets']],
		github: 'https://github.com/kosivivian/automation-workflows.git', live: 'https://ai-employee-roan.vercel.app/', demo: '',
		tech: ['VAPI', 'n8n', 'Google Sheets']
	},
	{
		slug: 'voicerx',
		kind: 'Product',
		title: 'VoiceRx <em>Platform</em>',
		overview: 'Voice-driven clinical documentation for hospital teams.', // TODO
		cover: '',
		visual: 'wave', tone: 'paper',
		year: '', type: 'Full-stack health system',
		focus: 'Full Stack Health System',
		role: 'Frontend Engineering',
		opportunity: 'Healthcare workers spend significant time manually documenting patient information, leading to longer wait times, clinician fatigue, and increased errors.',
		approach: 'VoiceRx uses AI-powered speech recognition and real-time data extraction to capture clinical information through voice and automate documentation across hospital workflows.',
		outcome: 'Reduced documentation time, improved accuracy and patient flow, and better coordination between nurses, doctors, pharmacists, and referrals.',
		result: 'A robust product surface for <span>reliable delivery.</span>',
		steps: [['Speak', 'Clinician dictates during the visit'], ['Transcribe', 'Speech recognition captures it'], ['Extract', 'Clinical fields pulled out in real time'], ['Share', 'The record reaches nurses, doctors, pharmacy and referrals']],
		github: 'https://github.com/MosesOnerhime/voicerx.git', live: '', demo: '',
		tech: ['TypeScript', 'React', 'Tailwind', 'Redux']
	},
	{
		slug: 'afriseg',
		kind: 'Machine learning',
		title: 'AFRISEG',
		overview: 'SSA-focused brain MRI segmentation built for low-resource clinical conditions.', // TODO
		cover: '',
		visual: 'scan', tone: 'clay',
		year: '', type: 'Deep learning research',
		focus: 'Deep Learning Research',
		role: 'Research and Model Design',
		opportunity: 'Western-trained tumor segmentation models break on Sub-Saharan African MRI scans because of lower-field imaging, artifacts, and missing modalities. No published model had reached clinically useful accuracy on this population.',
		approach: 'I built AfriSeg, a four-stage pipeline with self-supervised pretraining, modality imputation, artifact-aware learning, and uncertainty-weighted ensembling. The system is designed for low-resource African neuroimaging constraints instead of assuming ideal data.',
		outcome: 'The project produced a working SSA-focused segmentation workflow with measurable gains from pretraining and stable cross-validation behavior. It also proved a practical training path for constrained compute environments.',
		result: 'From hard constraints to <span>usable clinical direction.</span>',
		steps: [['Pretrain', 'Self-supervised pretraining on unlabelled scans'], ['Impute', 'Missing MRI modalities filled in'], ['Learn', 'Artifact-aware training for low-field scans'], ['Ensemble', 'Uncertainty-weighted ensemble of models']],
		challenges: [['Built for constrained compute', 'The training path assumes low-resource hardware and imperfect data rather than ideal conditions.']],
		github: 'https://github.com/kosivivian/afriseg.git', live: '', demo: '',
		tech: ['PyTorch', 'MONAI', 'nnU-Net v2', 'BYOL', '3D ResNet-50']
	},
	{
		slug: 'dermatology-rag',
		kind: 'Machine learning',
		title: 'Dermatology <em>RAG</em>',
		overview: 'Multimodal clinical retrieval for faster access to dermatology knowledge.', // TODO
		cover: '',
		visual: 'flow', tone: 'paper',
		year: '', type: 'RAG assistant',
		focus: 'Multimodal retrieval',
		role: 'RAG design and document processing',
		opportunity: 'Clinical dermatology knowledge is scattered across documents, images, and tables, which makes fast retrieval difficult. The workflow needed a way to surface the right information from mixed content quickly.',
		approach: 'I built a retrieval pipeline with multi-query generation, multimodal document processing, and advanced RAG patterns such as HyDE and multi-representation indexing. The system is structured to answer clinical questions from mixed source material more reliably.',
		outcome: 'The project turns fragmented dermatology material into a searchable assistant flow. It supports faster access to relevant information while keeping the source structure organized.',
		result: 'A more usable path to <span>clinical knowledge retrieval.</span>',
		steps: [['Ingest', 'Documents, images and tables processed'], ['Index', 'Multi-representation indexing in Chroma'], ['Query', 'Multi-query generation and HyDE'], ['Answer', 'A grounded answer from the right sources']],
		github: 'https://github.com/kosivivian/dermatology_naive_rag_.git', live: 'https://dermatologyrag.streamlit.app/', demo: '',
		tech: ['LangChain', 'Streamlit', 'Groq', 'Hugging Face', 'Chroma DB']
	},
	{
		slug: 'igbo-tts',
		kind: 'Machine learning',
		title: 'Igbo TTS <em>LLM</em>',
		overview: 'A text-to-speech model that pronounces Igbo with a natural local accent.', // TODO
		cover: '',
		visual: 'wave', tone: 'blush',
		year: '', type: 'Speech AI',
		focus: 'Speech AI',
		role: 'Model Adaptation and Evaluation',
		opportunity: 'Most speech bots do not pronounce Igbo words with accurate local accent and intonation. This limits accessibility for native speakers and learners.',
		approach: 'I adapted and fine-tuned a pretrained TTS stack for Igbo phonetics and contextual delivery. The pipeline focused on improving natural pronunciation quality for real use.',
		outcome: 'The result is a working Igbo speech demo that generates clearer local-language output. It validates a path for expanding speech AI support in underserved African languages.',
		result: 'Local language AI with <span>stronger voice fidelity.</span>',
		steps: [['Collect', 'Igbo audio collected and cleaned'], ['Encode', 'Audio tokenised with SNAC'], ['Fine-tune', 'Orpheus TTS adapted to Igbo phonetics'], ['Speak', 'The demo generates Igbo speech']],
		github: '', live: 'https://huggingface.co/spaces/kosinebolisa/igbo-tts-unsloth-demo', demo: '',
		tech: ['Orpheus TTS', 'Hugging Face']
	},
	{
		slug: 'face-recognition',
		kind: 'Product',
		title: 'Face Recognition <em>System</em>',
		overview: 'An end-to-end recognition workflow integrated into a practical application.', // TODO
		cover: '',
		visual: 'scan', tone: 'wine',
		year: '', type: 'Computer vision app',
		focus: 'Computer Vision Implementation',
		role: 'System Build and Integration',
		opportunity: 'The project required an end-to-end face recognition workflow that could capture, process, and identify users consistently. A usable implementation needed both model logic and dependable application wiring.',
		approach: 'I built a complete recognition system and integrated the core computer vision pipeline into an executable app workflow. The setup focused on repeatable processing and practical usage.',
		outcome: 'The project delivered a functioning face recognition application with repository-backed implementation. It provides a base that can be extended for accuracy and deployment hardening.',
		result: 'From prototype logic to <span>a working recognition flow.</span>',
		steps: [['Capture', 'Camera frames captured'], ['Detect', 'Faces located with OpenCV'], ['Encode', 'Each face turned into an embedding'], ['Match', 'Compared against known faces to identify']],
		github: 'https://github.com/Nugochukwu/CSC_309_Facial_Recognition.git', live: '', demo: '',
		tech: ['Python', 'OpenCV', 'Face Recognition']
	}
];

SITE.experience = [
	{
		company: 'Koya', // TODO: confirm company name, role, dates and bullets
		role: 'AI Automation Assistant Program',
		dates: 'Aug 2026 - Oct 2026',
		place: 'Remote',
		bullets: []
	},
	{
		company: 'EY (Ernst & Young)',
		role: 'Digital Risk Intern',
		dates: 'Jul 2025 – Sep 2025',
		place: 'Hybrid',
		bullets: [
			'Conducted cybersecurity assessments by identifying, evaluating, and documenting risks in IT general controls and organizational policies.',
			'Developed core consulting skills, including problem analysis, stakeholder communication, and a solution-oriented professional mindset.',
			'Created clear and visually compelling data visualizations to translate complex data into actionable business insights.'
		]
	},
	{
		company: 'Enudalabs',
		role: 'Junior Machine Learning Engineer',
		dates: 'Apr 2025 – Aug 2025',
		place: 'Remote',
		bullets: [
			'Fine-tuned a pre-trained English OrpheusTTS speech model using SNAC and a custom Igbo audio dataset for integration into an Igbo language learning application.',
			'Built infrastructure for continuous Igbo data collection, cleaning and storage to support future training.'
		]
	},
	{
		company: 'Future Concerns Nigeria Limited',
		role: 'IT Support and Sales Intern',
		dates: 'Jul 2024 – Sep 2024',
		place: 'Lekki, Lagos',
		bullets: [
			'Used knowledge of computer hardware to diagnose and resolve hardware issues promptly to keep work flowing.',
			'Worked closely with the network manager on installing and configuring the company\'s network cabling and framework.',
			'Worked with the sales team on client requests, providing the documents and information needed to keep the supply chain moving.',
			'Generated leads and built new business relationships for the company.'
		]
	}
];

// icon: Simple Icons slug (cdn.jsdelivr.net/npm/simple-icons). Empty = monogram.
SITE.stack = [
	{ group: 'AI & agents', tools: [
		['Claude API', 'claude', 'Reasoning, drafting and agent steps in production'],
		['LangChain', 'langchain', 'Retrieval chains and RAG pipelines'],
		['RAG', '', 'Grounding answers in a client\'s own documents'],
		['Hugging Face', 'huggingface', 'Fine-tuning, model hosting and demos'],
		['Vapi', '', 'Voice agents that answer and book calls'],
		['MCP', '', 'Connecting agents to tools and data']
	] },
	{ group: 'Automation', tools: [
		['n8n', 'n8n', 'Orchestrates most client workflows I ship'],
		['Make', 'make', 'Lightweight automations for no-code teams'],
		['GoHighLevel', '', 'CRM pipelines and automated follow-up'],
		['Airtable', 'airtable', 'Operational data teams can edit themselves'],
		['Google Workspace', 'google', 'Sheets, Gmail and Drive as the system of record']
	] },
	{ group: 'Backend & data', tools: [
		['Node.js', 'nodedotjs', 'APIs and agent backends'],
		['TypeScript', 'typescript', 'Typed backends and frontends'],
		['Express', 'express', 'REST APIs'],
		['Python', 'python', 'ML, data pipelines and scripts'],
		['PostgreSQL', 'postgresql', 'Relational data that has to be right'],
		['Supabase', 'supabase', 'Postgres, auth and storage in one place'],
		['MongoDB', 'mongodb', 'Flexible document data'],
		['Pinecone', '', 'Managed vector search'],
		['ChromaDB', '', 'Local vector store for RAG']
	] },
	{ group: 'Infra & tools', tools: [
		['Docker', 'docker', 'Reproducible builds and deploys'],
		['Postman', 'postman', 'API testing and documentation'],
		['Resend', 'resend', 'Transactional email from apps'],
		['Power BI', '', 'Dashboards for decision-makers']
	] }
];

// Hero console tracks. `projects` are slugs from SITE.projects.
SITE.tracks = [
	{
		id: 'automations', name: 'Automations', sub: 'n8n · runs daily',
		projects: ['invoice-processing', 'ops-reporting', 'pdac', 'ai-receptionist', 'lead-gen-chatbot'],
		flow: ['Inbox', 'Extract', 'AI', 'Dedupe', 'Sheets'],
		chips: ['n8n', 'OCR', 'Claude', 'Sheets'],
		log: ['inbox → watching 24/7', 'invoice.pdf → OCR → AI extract', 'dedupe → no duplicates found', 'logged to sheets in ~10s — 30× faster than by hand']
	},
	{
		id: 'agents', name: 'AI agents', sub: 'claude · human-gated',
		projects: ['lead-research-agent', 'content-agent', 'proposal-generator'],
		flow: ['Brief', 'Research', 'Qualify', 'Approve', 'Draft'],
		chips: ['Claude SDK', 'Apify', 'Firecrawl', 'Supabase'],
		log: ['brief → structured ICP', 'waiting for human approval … approved', 'apify + firecrawl → researching companies', 'shortlist with cited reasons — 0 messages auto-sent']
	},
	{
		id: 'data', name: 'Data & ML', sub: 'models · research',
		projects: ['afriseg', 'dermatology-rag', 'igbo-tts'],
		flow: ['Data', 'Clean', 'Train', 'Evaluate', 'Demo'],
		chips: ['PyTorch', 'MONAI', 'LangChain', 'HF'],
		log: ['afriseg → low-field MRI, missing modalities', 'self-supervised pretraining → imputation', 'igbo tts → SNAC + Orpheus fine-tune', 'models built for real-world, low-resource data']
	},
	{
		id: 'products', name: 'Products', sub: 'full stack · shipped',
		projects: ['voicerx', 'sureride', 'face-recognition'],
		flow: ['Design', 'Database', 'API', 'Frontend', 'Ship'],
		chips: ['React', 'TypeScript', 'Supabase', 'OpenCV'],
		log: ['sureride → figma designs to supabase', 'every booking captured as a record', 'voicerx → voice to clinical notes', 'shipped to real users']
	}
];

SITE.bySlug = slug => SITE.projects.find(p => p.slug === slug);
SITE.plain = html => html.replace(/<[^>]+>/g, '');
