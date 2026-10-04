// Custom cursor: a wine dot plus a lagging ring. The ring grows over links and shows a
// label from [data-cursor]. Off for touch devices and reduced motion.
(() => {
	const root = document.documentElement;
	if (!root.classList.contains('motion') || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;

	const dot = document.createElement('div');
	const ring = document.createElement('div');
	dot.className = 'cursor-dot cursor-hidden';
	ring.className = 'cursor-ring cursor-hidden';
	ring.innerHTML = '<span></span>';
	dot.setAttribute('aria-hidden', 'true');
	ring.setAttribute('aria-hidden', 'true');
	document.body.append(dot, ring);
	root.classList.add('has-cursor');

	const label = ring.firstChild;
	let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;

	addEventListener('pointermove', e => {
		if (e.pointerType !== 'mouse') return;
		x = e.clientX; y = e.clientY;
		dot.style.transform = `translate(${x}px, ${y}px)`;
		dot.classList.remove('cursor-hidden');
		ring.classList.remove('cursor-hidden');

		const t = e.target instanceof Element ? e.target : null;
		const hide = t?.closest('input, textarea, [data-cursor-hide]');
		const interactive = t?.closest('a, button, .pill, label');
		let tagged = t?.closest('[data-cursor]');
		// A link nested inside a labelled card (e.g. tile overlay links) gets the plain hover ring.
		if (tagged && interactive && interactive !== tagged && tagged.contains(interactive)) tagged = null;
		const dark = t?.closest('.dark, .console-term, .tile');

		dot.classList.toggle('cursor-hidden', !!hide);
		ring.classList.toggle('cursor-hidden', !!hide);
		ring.classList.toggle('label', !!tagged);
		ring.classList.toggle('hover', !tagged && !!interactive);
		dot.style.opacity = tagged ? '0' : '';
		ring.classList.toggle('on-dark', !!dark);
		dot.classList.toggle('on-dark', !!dark);
		if (tagged) label.textContent = tagged.dataset.cursor;
	}, { passive: true });

	document.addEventListener('pointerleave', () => { dot.classList.add('cursor-hidden'); ring.classList.add('cursor-hidden'); });
	addEventListener('pointerdown', () => ring.style.scale = '.85');
	addEventListener('pointerup', () => ring.style.scale = '');

	const loop = () => {
		rx += (x - rx) * .18;
		ry += (y - ry) * .18;
		ring.style.transform = `translate(${rx}px, ${ry}px)`;
		requestAnimationFrame(loop);
	};
	loop();
})();
