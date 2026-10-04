// Hero console: four tracks on the left, a live flow diagram, and a small shell.
(() => {
	const con = document.getElementById('console');
	if (!con) return;

	const { tracks, projects, plain } = SITE;
	const motion = document.documentElement.classList.contains('motion');
	const $ = id => document.getElementById(id);
	const els = { tracks: $('con-tracks'), path: $('con-path'), label: $('con-canvas-label'), flow: $('con-flow'), chips: $('con-chips'), log: $('con-log'), form: $('con-form'), input: $('con-input'), count: $('con-count'), bar: $('con-bar') };
	const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
	const wait = ms => new Promise(r => setTimeout(r, motion ? ms : 0));

	let current = -1;
	let autoplay = true;
	const seen = new Set();
	const history = [];
	let hIndex = 0;
	let queue = Promise.resolve();
	const enqueue = fn => (queue = queue.then(fn).catch(() => {}));

	/* ---------- Output ---------- */
	const print = (html, cls = '') => {
		const p = document.createElement('p');
		if (cls) p.className = cls;
		p.innerHTML = html;
		els.log.append(p);
		els.log.scrollTop = els.log.scrollHeight;
		return p;
	};
	const typeCommand = async text => {
		const p = print('', 'cmd');
		if (!motion) { p.textContent = text; return; }
		const caret = '<span class="caret"></span>';
		for (let i = 1; i <= text.length; i++) {
			p.innerHTML = esc(text.slice(0, i)) + caret;
			await new Promise(r => setTimeout(r, 38 + Math.random() * 40));
		}
		p.textContent = text;
	};

	/* ---------- Tracks ---------- */
	els.tracks.innerHTML = tracks.map((t, i) => `<button class="track" type="button" aria-pressed="false" data-i="${i}"><b>${t.name}</b><small>${t.sub}</small></button>`).join('');
	const trackBtns = [...els.tracks.children];

	const drawFlow = t => {
		els.flow.innerHTML = t.flow.map((n, i) => `${i ? '<span class="flow-edge"></span>' : ''}<span class="flow-node">${esc(n)}<small>step ${i + 1}</small></span>`).join('');
		els.chips.innerHTML = t.chips.map(c => `<span>${esc(c)}</span>`).join('');
	};
	const lightNode = i => {
		const nodes = els.flow.querySelectorAll('.flow-node');
		const edges = els.flow.querySelectorAll('.flow-edge');
		nodes[i]?.classList.add('on');
		edges[i - 1]?.classList.add('on');
	};

	const openTrack = async i => {
		const t = tracks[i];
		current = i;
		seen.add(i);
		trackBtns.forEach((b, j) => { b.setAttribute('aria-pressed', String(j === i)); b.classList.toggle('seen', seen.has(j)); });
		els.path.textContent = t.name;
		els.label.textContent = t.name;
		els.count.textContent = `${seen.size} / ${tracks.length} opened`;
		els.bar.style.width = `${(seen.size / tracks.length) * 100}%`;
		drawFlow(t);

		print(`opening ${esc(t.name.toLowerCase())} — ${t.projects.length} projects`, 'dim');
		for (let j = 0; j < t.log.length; j++) {
			await wait(320);
			lightNode(j);
			print(esc(t.log[j]), j === t.log.length - 1 ? 'ok' : 'dim');
		}
		for (let j = t.log.length; j < t.flow.length; j++) lightNode(j);
		await wait(200);
		const list = t.projects.map(s => SITE.bySlug(s)).filter(Boolean);
		print(`projects: ${list.map(p => `<a href="work.html?p=${p.slug}">${p.slug}</a>`).join('  ')}`, 'item');
	};

	/* ---------- Commands ---------- */
	const findTrack = arg => tracks.findIndex(t => t.id === arg || t.name.toLowerCase().startsWith(arg));
	const findProject = arg =>
		projects.find(p => p.slug === arg) ||
		projects.find(p => p.slug.includes(arg)) ||
		projects.find(p => plain(p.title).toLowerCase().includes(arg));

	const commands = {
		help: () => {
			[['ls', 'list every project'], ['open <name>', 'open a track or a case study, e.g. open invoice'], ['next', 'open the next track'], ['stack', 'tools I use'], ['about', 'who I am'], ['contact', 'start a conversation'], ['clear', 'clear the screen']]
				.forEach(([c, d]) => print(`<b>${esc(c.padEnd(12))}</b> ${esc(d)}`, 'item'));
		},
		ls: () => projects.forEach(p => print(`<b>${p.slug.padEnd(20)}</b> ${esc(plain(p.title))}`, 'item')),
		open: async arg => {
			if (!arg) return print('usage: open &lt;track or project&gt; — try: open invoice', 'err');
			const ti = findTrack(arg);
			if (ti > -1) return openTrack(ti);
			const p = findProject(arg);
			if (!p) return print(`no project matches "${esc(arg)}". type ls to see them all`, 'err');
			print(`opening ${esc(plain(p.title))} …`, 'ok');
			await wait(650);
			location.href = `work.html?p=${p.slug}`;
		},
		next: () => openTrack((current + 1) % tracks.length),
		stack: () => SITE.stack.forEach(g => print(`<b>${esc(g.group.toLowerCase().padEnd(16))}</b> ${g.tools.map(t => esc(t[0])).join(' · ')}`, 'item')),
		about: () => {
			print('kosi nebolisa — builds AI automations, agents and data systems', 'item');
			print('for small teams and founders. based in nigeria, working globally.', 'dim');
		},
		whoami: () => commands.about(),
		contact: () => { print('opening chat …', 'ok'); SITE.openChat?.(); },
		clear: () => { els.log.innerHTML = ''; },
		sudo: () => print('nice try.', 'err')
	};

	const run = async (raw, { typed = false } = {}) => {
		const line = raw.trim();
		if (!line) return;
		if (typed) await typeCommand(line);
		else print(esc(line), 'cmd');
		const [cmd, ...rest] = line.toLowerCase().split(/\s+/);
		const fn = commands[cmd];
		if (fn) await fn(rest.join(' '));
		else print(`command not found: ${esc(cmd)}. type help`, 'err');
	};

	const stopAutoplay = () => { autoplay = false; };

	els.form.addEventListener('submit', e => {
		e.preventDefault();
		stopAutoplay();
		const v = els.input.value;
		if (v.trim()) { history.push(v); hIndex = history.length; }
		els.input.value = '';
		enqueue(() => run(v));
	});
	els.input.addEventListener('keydown', e => {
		if (e.key === 'ArrowUp' && history.length) { hIndex = Math.max(0, hIndex - 1); els.input.value = history[hIndex]; e.preventDefault(); }
		if (e.key === 'ArrowDown' && history.length) { hIndex = Math.min(history.length, hIndex + 1); els.input.value = history[hIndex] || ''; e.preventDefault(); }
	});
	con.querySelectorAll('[data-cmd]').forEach(b => b.addEventListener('click', () => { stopAutoplay(); enqueue(() => run(b.dataset.cmd)); }));
	trackBtns.forEach(b => b.addEventListener('click', () => { stopAutoplay(); enqueue(() => run(`open ${tracks[+b.dataset.i].id}`)); }));
	els.input.addEventListener('focus', stopAutoplay);

	/* ---------- Boot ---------- */
	print('the portfolio — type <b>help</b>, or pick a track on the left', 'dim');
	drawFlow(tracks[0]);
	const io = new IntersectionObserver(([entry]) => {
		if (!entry.isIntersecting) return;
		io.disconnect();
		enqueue(async () => {
			await wait(900);
			if (!autoplay) return;
			await run(`open ${tracks[0].id}`, { typed: true });
			if (autoplay) print('try: <b>open invoice</b>, <b>ls</b> or <b>help</b>', 'dim');
		});
	}, { threshold: .3 });
	io.observe(con);
})();
