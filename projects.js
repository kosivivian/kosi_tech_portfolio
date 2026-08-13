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
		field: '01 / AI AUTOMATION',
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
		field: '02 / AI AUTOMATION',
		title: 'Lead Gen <em>Chatbot</em>',
		discipline: 'AI Automation',
		focus: 'Lead capture and qualification',
		role: 'Chat workflow and conversion design',
		opportunity: 'Website visitors often leave before getting a clear answer or taking the next step. The site needed a conversational way to qualify interest and capture contact details.',
		approach: 'I built a Crisp-based chatbot that answers questions, offers a free solar savings estimate, and uses Google Solar API to calculate potential savings. The bot captures name, email, and phone so the lead can be followed up.',
		outcome: 'The chatbot turns passive traffic into qualified leads with a clearer path to follow-up. It also reduces the amount of manual back-and-forth required from the team.',
		result: 'More qualified leads with <span>less visitor drop-off.</span>'
	}
};

const key = new URLSearchParams(location.search).get('project') || 'decision';
const p = projects[key] || projects.decision;

document.title = p.title.replace(/<[^>]+>/g, '') + ' - Kosi Nebolisa';
for (const [id, value] of Object.entries(p)) {
	const el = document.getElementById(id);
	if (el) el.innerHTML = value;
}

document.getElementById('back').href =
	p.discipline === 'Data Science'
		? 'data-science.html'
		: p.discipline === 'Software Engineering'
			? 'software-engineering.html'
			: 'ai-automation.html';
