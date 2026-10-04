// Shared runtime for every page: smooth scroll, reveals, scroll-driven motion, nav, chat.
(() => {
	const root = document.documentElement;
	const motion = root.classList.contains('motion');
	const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
	const hasGsap = motion && window.gsap && window.ScrollTrigger;
	let lenis = null;

	/* ---------- Smooth scroll ---------- */
	if (hasGsap) {
		gsap.registerPlugin(ScrollTrigger);
		if (window.Lenis) {
			lenis = new Lenis({ duration: 1.1, smoothWheel: true });
			lenis.on('scroll', ScrollTrigger.update);
			gsap.ticker.add(t => lenis.raf(t * 1000));
			gsap.ticker.lagSmoothing(0);
		}
	}
	const headerH = () => document.querySelector('.site-header')?.offsetHeight || 0;
	const scrollToTarget = target => {
		if (lenis) lenis.scrollTo(target, { offset: target === 0 ? 0 : -headerH() });
		else if (target === 0) scrollTo({ top: 0, behavior: motion ? 'smooth' : 'auto' });
		else scrollTo({ top: target.getBoundingClientRect().top + scrollY - headerH(), behavior: motion ? 'smooth' : 'auto' });
	};
	document.addEventListener('click', e => {
		const a = e.target.closest('a[href^="#"]');
		if (!a) return;
		const id = a.getAttribute('href').slice(1);
		const target = id === 'top' ? 0 : document.getElementById(id);
		if (target === null) return;
		e.preventDefault();
		closeMenu();
		scrollToTarget(target);
		history.replaceState(null, '', '#' + id);
	});
	SITE.scrollTo = scrollToTarget;

	/* ---------- Header, menu, progress ---------- */
	const header = document.querySelector('.site-header');
	const progress = document.querySelector('.progress');
	const toggle = document.querySelector('.menu-toggle');
	function closeMenu() {
		document.body.classList.remove('nav-open');
		toggle?.setAttribute('aria-expanded', 'false');
		if (toggle) toggle.textContent = 'Menu';
	}
	toggle?.addEventListener('click', () => {
		const open = document.body.classList.toggle('nav-open');
		toggle.setAttribute('aria-expanded', String(open));
		toggle.textContent = open ? 'Close' : 'Menu';
	});
	addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
	const onScroll = () => {
		header?.classList.toggle('scrolled', scrollY > 8);
		const max = document.documentElement.scrollHeight - innerHeight;
		if (progress) progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
	};
	addEventListener('scroll', onScroll, { passive: true });
	onScroll();

	// Highlight the nav link for the section in view.
	const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]:not(.nav-cta)')];
	if (navLinks.length) {
		const spy = new IntersectionObserver(entries => entries.forEach(entry => {
			if (!entry.isIntersecting) return;
			navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
		}), { rootMargin: '-45% 0px -50% 0px' });
		navLinks.forEach(a => { const s = document.querySelector(a.getAttribute('href')); if (s) spy.observe(s); });
	}

	/* ---------- Year + clock ---------- */
	document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
	const clocks = document.querySelectorAll('[data-clock]');
	const tick = () => {
		const t = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Lagos' }).format(new Date());
		clocks.forEach(el => el.textContent = t + ' WAT');
	};
	if (clocks.length) { tick(); setInterval(tick, 30000); }

	/* ---------- Chat widget (behaviour carried over from the original site) ---------- */
	const chatUI = document.createElement('aside');
	chatUI.className = 'chat-ui';
	chatUI.innerHTML = `<section class="chat-panel" aria-label="Work together chat"><header><span class="chat-avatar">K</span><div><b>Kosi's studio</b><small>Usually replies within 1–2 days</small></div><button class="chat-close" aria-label="Close chat">×</button></header><div class="chat-thread"><div class="typing-indicator" aria-label="Kosi is typing"><i></i><i></i><i></i></div><div class="chat-message chat-greeting" aria-live="polite"></div></div><form class="chat-form" hidden><label>Your name<input name="name" autocomplete="name" placeholder="Your name" required></label><label>How can I help?<textarea name="message" placeholder="Tell me about your project" required></textarea></label><button type="submit">Send message <span>↗</span></button></form></section>`;
	document.body.append(chatUI);
	const typing = chatUI.querySelector('.typing-indicator'), greeting = chatUI.querySelector('.chat-greeting'), form = chatUI.querySelector('form');
	let started = false;
	SITE.openChat = () => {
		chatUI.classList.add('chat-open');
		if (started) return;
		started = true;
		setTimeout(() => {
			typing.hidden = true;
			const text = 'Hi there! Would you like to work together? Tell me a little about what you\'re building.';
			let i = 0;
			const timer = setInterval(() => {
				greeting.textContent = text.slice(0, ++i);
				if (i === text.length) {
					clearInterval(timer);
					setTimeout(() => { form.hidden = false; form.classList.add('form-ready'); form.querySelector('input').focus(); }, 260);
				}
			}, motion ? 24 : 0);
		}, motion ? 950 : 0);
	};
	document.addEventListener('click', e => { if (e.target.closest('[data-chat]')) { e.preventDefault(); SITE.openChat(); } });
	chatUI.querySelector('.chat-close').addEventListener('click', () => chatUI.classList.remove('chat-open'));
	form.addEventListener('submit', e => {
		e.preventDefault();
		const data = new FormData(form), name = data.get('name').trim(), message = data.get('message').trim();
		const reply = document.createElement('div');
		reply.className = 'chat-message chat-reply';
		reply.textContent = `Thanks, ${name}. I've opened an email with your message. Speak soon.`;
		chatUI.querySelector('.chat-thread').append(reply);
		form.reset();
		form.hidden = true;
		location.href = `mailto:nebolisako@gmail.com?subject=${encodeURIComponent('Portfolio enquiry from ' + name)}&body=${encodeURIComponent(message + '\n\n— ' + name)}`;
	});

	/* ---------- Everything that needs rendered content runs after the page scripts ---------- */
	document.addEventListener('DOMContentLoaded', () => {
		// Hero headline: split into words for a single orchestrated reveal.
		document.querySelectorAll('[data-split]').forEach(el => {
			let i = 0;
			const wrapWords = node => [...node.childNodes].forEach(child => {
				if (child.nodeType === 3) {
					const frag = document.createDocumentFragment();
					child.textContent.split(/(\s+)/).forEach(part => {
						if (!part) return;
						if (/^\s+$/.test(part)) return frag.append(part);
						const w = document.createElement('span');
						w.className = 'w';
						w.innerHTML = `<span style="--i:${i++}"></span>`;
						w.firstChild.textContent = part;
						frag.append(w);
					});
					child.replaceWith(frag);
				} else if (child.nodeType === 1) wrapWords(child);
			});
			el.setAttribute('aria-label', el.textContent);
			wrapWords(el);
			[...el.children].forEach(c => c.setAttribute('aria-hidden', 'true'));
			el.classList.add('split');
			requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('in')));
		});

		// Reveals: small, quick fade-ups as content enters.
		const revealed = new IntersectionObserver(entries => {
			let n = 0;
			entries.forEach(entry => {
				if (!entry.isIntersecting) return;
				entry.target.style.transitionDelay = `${(n++) * 60}ms`;
				entry.target.classList.add('visible');
				revealed.unobserve(entry.target);
				entry.target.dispatchEvent(new CustomEvent('revealed'));
			});
		}, { threshold: .15, rootMargin: '0px 0px -40px 0px' });
		document.querySelectorAll('.reveal').forEach(el => motion ? revealed.observe(el) : el.classList.add('visible'));

		// Stat counters.
		document.querySelectorAll('[data-count]').forEach(el => {
			if (!motion) return;
			const end = +el.dataset.count;
			el.textContent = '0';
			el.closest('.stat').addEventListener('revealed', () => {
				const t0 = performance.now();
				const step = now => {
					const k = Math.min(1, (now - t0) / 1200);
					el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
					if (k < 1) requestAnimationFrame(step);
				};
				requestAnimationFrame(step);
			}, { once: true });
		});

		// Magnetic buttons.
		if (motion && finePointer) {
			document.querySelectorAll('.magnetic').forEach(el => {
				el.addEventListener('pointermove', e => {
					const r = el.getBoundingClientRect();
					el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .22}px, ${(e.clientY - r.top - r.height / 2) * .3}px)`;
				});
				el.addEventListener('pointerleave', () => { el.style.transition = 'transform .4s cubic-bezier(.22,.8,.24,1)'; el.style.transform = ''; setTimeout(() => el.style.transition = '', 400); });
			});
		}

		const steps = [...document.querySelectorAll('.step')];
		const procTrack = document.querySelector('.process-track');
		const timeline = document.querySelector('.timeline');

		if (!hasGsap) {
			steps.forEach(s => s.classList.add('on'));
			return;
		}

		// Process loop: the line draws with scroll and lights each step as it passes.
		if (procTrack) {
			procTrack.style.setProperty('--p', 0);
			ScrollTrigger.create({
				trigger: procTrack, start: 'top 78%', end: 'bottom 55%', scrub: true,
				onUpdate: self => {
					procTrack.style.setProperty('--p', self.progress);
					steps.forEach((s, i) => s.classList.toggle('on', self.progress >= (i / steps.length) * .98));
				}
			});
		}

		// Experience timeline line.
		if (timeline) {
			timeline.style.setProperty('--p', 0);
			ScrollTrigger.create({
				trigger: timeline, start: 'top 70%', end: 'bottom 70%', scrub: true,
				onUpdate: self => timeline.style.setProperty('--p', self.progress)
			});
		}

		// Stacked cards: each card sinks back as the next one slides over it.
		const wraps = [...document.querySelectorAll('.scard-wrap')];
		wraps.slice(0, -1).forEach((wrap, i) => {
			const next = wraps[i + 1];
			gsap.to(wrap.firstElementChild, {
				scale: .94, '--dim': .45, ease: 'none',
				scrollTrigger: { trigger: next, start: 'top bottom', end: () => `top ${parseFloat(getComputedStyle(next).top) + 10}px`, scrub: true, invalidateOnRefresh: true }
			});
		});

		// Case-study cover parallax.
		document.querySelectorAll('[data-parallax]').forEach(el => {
			gsap.fromTo(el, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
		});

		addEventListener('load', () => ScrollTrigger.refresh());
	});
})();
