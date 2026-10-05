// Renders project cards, tiles, timeline and stack rails on the home page,
// and the full case study on work.html. All content comes from js/data.js.
(() => {
	const { projects, plain } = SITE;
	const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
	const caseUrl = p => `work.html?p=${p.slug}`;
	const ext = 'target="_blank" rel="noreferrer"';

	// Deterministic pseudo-random numbers per project so generated covers are stable.
	const seeded = seed => () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
	const hash = s => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 233280, 7);

	SITE.cover = (p, { parallax = false } = {}) => {
		const px = parallax ? ' data-parallax' : '';
		const tone = p.tone || 'paper';
		if (p.cover) return `<div class="cover" data-tone="${tone}"><img src="${esc(p.cover)}" alt="" loading="lazy"${px}></div>`;
		const rnd = seeded(hash(p.slug));
		let art;
		switch (p.visual) {
			case 'bars':
				art = `<div class="gen-bars">${Array.from({ length: 7 }, (_, i) => `<i style="--h:${Math.round(22 + rnd() * 50 + i * 4)}%"></i>`).join('')}</div>`;
				break;
			case 'window':
				art = `<div class="gen-window"><em><span></span></em><strong>${esc(plain(p.title))}</strong><small>${esc(p.client || p.type || p.kind)}</small></div>`;
				break;
			case 'wave':
				art = `<div class="gen-wave">${Array.from({ length: 32 }, (_, i) => `<i style="--h:${Math.round(12 + Math.abs(Math.sin(i * .45)) * 60 + rnd() * 28)}%"></i>`).join('')}</div>`;
				break;
			case 'scan':
				art = '<div class="gen-scan"></div>';
				break;
			default:
				art = `<div class="gen-flow">${(p.steps || []).slice(0, 3).map(s => `<i>${esc(s[0])}</i>`).join('<b>→</b>')}</div>`;
		}
		return `<div class="cover" data-tone="${tone}"><div class="gen"${px}><span class="gen-label">${esc(p.kind)}</span>${art}</div></div>`;
	};

	const primaryLink = p =>
		p.live ? `<a href="${esc(p.live)}" ${ext}>Live demo <span aria-hidden="true">↗</span></a>`
		: p.demo ? `<a href="${esc(p.demo)}" ${ext}>Watch demo <span aria-hidden="true">↗</span></a>`
		: p.github ? `<a href="${esc(p.github)}" ${ext}>GitHub <span aria-hidden="true">↗</span></a>`
		: '';

	/* ---------- Home: stacked featured cards ---------- */
	const scards = document.getElementById('scards');
	if (scards) {
		const featured = projects.filter(p => p.featured);
		scards.innerHTML = featured.map((p, i) => `
			<li class="scard-wrap" style="--i:${i}">
				<a class="scard" href="${caseUrl(p)}" data-cursor="View">
					${SITE.cover(p)}
					<div class="scard-info">
						<div class="scard-top"><span>${esc(p.kind)}${p.client ? ' · ' + esc(p.client) : ''}</span><span>${String(i + 1).padStart(2, '0')} / ${String(featured.length).padStart(2, '0')}</span></div>
						<h3>${p.title}</h3>
						<p class="scard-overview">${esc(p.overview)}</p>
						${p.metrics ? `<div class="scard-metrics">${p.metrics.slice(0, 2).map(([v, l]) => `<div><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join('')}</div>` : ''}
						<div class="chips">${p.tech.slice(0, 4).map(t => `<span>${esc(t)}</span>`).join('')}</div>
						<span class="scard-link">View case study <span aria-hidden="true">↗</span></span>
					</div>
				</a>
			</li>`).join('');
	}

	/* ---------- Home: grid tiles with hover overview ---------- */
	const tiles = document.getElementById('tiles');
	if (tiles) {
		tiles.innerHTML = projects.filter(p => !p.featured).map(p => `
			<article class="tile reveal" tabindex="0" data-href="${caseUrl(p)}" data-cursor="Open" aria-label="${esc(plain(p.title))}: ${esc(p.overview)}">
				${SITE.cover(p)}
				<div class="tile-title" aria-hidden="true"><small>${esc(p.kind)}</small><b>${p.title}</b></div>
				<div class="tile-over">
					<small>${esc(p.kind)}</small>
					<h4>${p.title}</h4>
					<p>${esc(p.overview)}</p>
					<div class="chips">${p.tech.slice(0, 3).map(t => `<span>${esc(t)}</span>`).join('')}</div>
					<div class="tile-links">${primaryLink(p)}<a href="${caseUrl(p)}">Case study <span aria-hidden="true">→</span></a></div>
				</div>
			</article>`).join('');

		const coarse = matchMedia('(hover: none)').matches;
		tiles.addEventListener('click', e => {
			const tile = e.target.closest('.tile');
			if (!tile || e.target.closest('a')) return;
			// Touch: first tap reveals the overview, second tap opens the case study.
			if (coarse && !tile.classList.contains('open')) {
				tiles.querySelectorAll('.tile.open').forEach(t => t.classList.remove('open'));
				tile.classList.add('open');
				return;
			}
			location.href = tile.dataset.href;
		});
		tiles.addEventListener('keydown', e => {
			if (e.key === 'Enter' && e.target.classList.contains('tile')) location.href = e.target.dataset.href;
		});
	}

	/* ---------- Home: experience timeline ---------- */
	const timeline = document.getElementById('timeline');
	if (timeline) {
		timeline.insertAdjacentHTML('beforeend', SITE.experience.map(job => `
			<li class="job reveal">
				${job.dates || job.place ? `<span class="job-meta">${[job.dates, job.place].filter(Boolean).map(esc).join(' · ')}</span>` : ''}
				<h3>${esc(job.company)}</h3>
				<p class="role">${esc(job.role)}</p>
				${job.bullets.length ? `<ul>${job.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}
			</li>`).join(''));
	}

	/* ---------- Tool icons (Simple Icons, monogram fallback) ---------- */
	const monogram = name => name.length <= 3 ? name : name.split(/[\s.]+/).length > 1 ? name.split(/[\s.]+/).slice(0, 2).map(w => w[0]).join('') : name.slice(0, 2);
	const toolIcon = (name, icon) => icon
		? `<span class="ico"><i style="--src:url(https://cdn.jsdelivr.net/npm/simple-icons@13/icons/${icon}.svg)"></i></span>`
		: `<span class="ico mono">${esc(monogram(name))}</span>`;

	/* ---------- Home: hero tool marquee (decorative; the stack section carries the content) ---------- */
	const heroMarquee = document.getElementById('hero-marquee');
	if (heroMarquee) {
		const all = SITE.stack.flatMap(g => g.tools);
		const set = all.map(([name, icon]) => `<span class="hm-item">${toolIcon(name, icon)}${esc(name)}</span>`).join('');
		heroMarquee.innerHTML = `<div class="hm-move" style="--dur:${all.length * 3}s"><div class="hm-set">${set}</div><div class="hm-set">${set}</div></div>`;
	}

	/* ---------- Home: stack rails ---------- */
	const rails = document.getElementById('rails');
	if (rails) {
		const pill = ([name, icon, use], hidden) => `
			<span class="pill${hidden ? ' dup' : ''}" ${hidden ? 'aria-hidden="true"' : 'tabindex="0"'}>
				${toolIcon(name, icon)}
				${esc(name)}<span class="pill-tip" role="tooltip">${esc(use)}</span>
			</span>`;
		rails.innerHTML = SITE.stack.map(({ group, tools }) => {
			const reps = Math.max(1, Math.ceil(10 / tools.length));
			const set = hiddenAll => Array.from({ length: reps }, (_, r) => tools.map(t => pill(t, hiddenAll || r > 0)).join('')).join('');
			return `
				<div class="rail reveal">
					<p class="rail-label">${esc(group)}<span>${tools.length} tools</span></p>
					<div class="rail-track"><div class="rail-move" style="--dur:${tools.length * reps * 4.5}s">
						<div class="rail-set">${set(false)}</div><div class="rail-set" aria-hidden="true">${set(true)}</div>
					</div></div>
				</div>`;
		}).join('');
	}

	/* ---------- Case study page ---------- */
	const host = document.getElementById('case');
	if (!host) return;

	const slug = new URLSearchParams(location.search).get('p');
	const idx = Math.max(0, projects.findIndex(p => p.slug === slug));
	const p = projects[idx];
	const prev = projects[(idx - 1 + projects.length) % projects.length];
	const next = projects[(idx + 1) % projects.length];
	document.title = `${plain(p.title)} — Kosi Nebolisa`;

	const toEmbed = url => url.replace('loom.com/share/', 'loom.com/embed/').replace(/youtu\.be\/([\w-]+).*/, 'youtube.com/embed/$1').replace(/youtube\.com\/watch\?v=([\w-]+).*/, 'youtube.com/embed/$1');
	const isVideoFile = url => /\.(mp4|webm|mov)$/i.test(url);

	const sections = [];
	const add = (label, heading, body, wide = '') => sections.push({ label, heading, body, wide });

	add('Problem', 'What wasn\'t working', `<p>${esc(p.opportunity)}</p>`);
	add('Approach', 'How I approached it', `<p>${esc(p.approach)}</p>`);
	if (p.steps?.length) add('How it works', 'The system, step by step', '<p>Each stage hands off to the next, so the whole flow runs without someone pushing it along.</p>',
		`<ol class="steps-flow">${p.steps.map(([label, note], i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><b>${esc(label)}</b><small>${esc(note)}</small></li>`).join('')}</ol>`);
	add('Features & outcome', p.result,
		`<p>${esc(p.outcome)}</p>${p.features?.length ? `<ul class="feature-list">${p.features.map(([t, d]) => `<li><b>${esc(t)}</b>${esc(d)}</li>`).join('')}</ul>` : ''}`,
		p.metrics?.length ? `<div class="big-metrics">${p.metrics.map(([v, l]) => `<div class="reveal"><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join('')}</div>` : '');
	if (p.demo) add('Demo', 'See it running', '<p>A walkthrough of the system doing its job end to end.</p>',
		`<div class="video-frame">${isVideoFile(p.demo) ? `<video src="${esc(p.demo)}" controls preload="metadata" playsinline></video>` : `<iframe src="${esc(toEmbed(p.demo))}" title="${esc(plain(p.title))} demo" loading="lazy" allowfullscreen></iframe>`}</div>`);
	if (p.challenges?.length) add('Challenges & decisions', 'Calls I made along the way',
		`<dl class="decisions">${p.challenges.map(([t, d]) => `<div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join('')}</dl>`);

	const links = [
		p.live && `<a class="button button-dark" href="${esc(p.live)}" ${ext}>Visit live project <span>↗</span></a>`,
		p.github && `<a class="button button-ghost" href="${esc(p.github)}" ${ext}>View on GitHub <span>↗</span></a>`
	].filter(Boolean).join('');

	const facts = [['Role', p.role], ['Type', p.type || p.focus], ['Stack', p.tech.slice(0, 3).join(', ')], ['Year', p.year]].filter(([, v]) => v);

	host.innerHTML = `
		<section class="case-hero">
			<div class="wrap">
				<a class="back" href="index.html#work">← All work</a>
				<p class="eyebrow">${esc(p.kind)}${p.client ? ' · ' + esc(p.client) : ''}</p>
				<h1 class="display case-title" data-split>${p.title}</h1>
				<p class="case-overview">${esc(p.overview)}</p>
				<dl class="facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
			</div>
		</section>
		<div class="case-cover"><div class="wrap">${SITE.cover(p, { parallax: true })}</div></div>
		${sections.map((s, i) => `
			<section class="case-sec">
				<div class="wrap case-sec-grid">
					<div class="case-sec-head reveal"><p class="eyebrow"><b>${String(i + 1).padStart(2, '0')}</b> · ${s.label}</p><h2 class="h3">${s.heading}</h2></div>
					<div class="case-sec-body reveal">${s.body}</div>
				</div>
				${s.wide ? `<div class="wrap case-wide">${s.wide}</div>` : ''}
			</section>`).join('')}
		<section class="case-resources">
			<div class="wrap case-sec-grid">
				<div class="case-sec-head reveal"><p class="eyebrow">Resources</p><h2 class="h3">Built with</h2></div>
				<div class="case-sec-body reveal">
					<div class="chips">${p.tech.map(t => `<span>${esc(t)}</span>`).join('')}</div>
					${links ? `<div class="resource-links">${links}</div>` : ''}
				</div>
			</div>
		</section>
		<nav class="case-nav wrap" aria-label="More projects">
			${[['prev', '← Previous', prev], ['next', 'Next →', next]].map(([cls, label, q]) => `
				<a class="case-nav-item ${cls}" href="${caseUrl(q)}" data-cursor="${cls === 'prev' ? 'Prev' : 'Next'}">
					${SITE.cover(q)}
					<span><small>${label}</small><b>${q.title}</b></span>
				</a>`).join('')}
		</nav>`;

	// "How it works" nodes light up one after another when they scroll into view.
	const flow = host.querySelector('.steps-flow');
	if (flow) {
		const lightUp = () => [...flow.children].forEach((li, i) => setTimeout(() => li.classList.add('on'), i * 180));
		if (!document.documentElement.classList.contains('motion')) return lightUp();
		const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { lightUp(); io.disconnect(); } }, { threshold: .35 });
		io.observe(flow);
	}
})();
