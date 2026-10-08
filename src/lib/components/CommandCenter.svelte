<script lang="ts">
	type WidgetStatus = 'ready' | 'pending' | 'offline';
	type Widget = {
		id: string;
		label: string;
		title: string;
		detail: string;
		status: WidgetStatus;
		value: string;
	};

	const widgets: Widget[] = [
		{
			id: 'finance',
			label: '01 / FINANCE',
			title: 'Fakturace',
			detail: 'Fakturovač · browser profile',
			status: 'ready',
			value: 'READ-ONLY READY'
		},
		{
			id: 'communication',
			label: '02 / SIGNAL',
			title: 'Komunikace',
			detail: 'Gmail + WhatsApp',
			status: 'pending',
			value: 'CONNECTING'
		},
		{
			id: 'calendar',
			label: '03 / TODAY',
			title: 'Schedule',
			detail: 'Google Calendar',
			status: 'pending',
			value: 'STANDBY'
		},
		{
			id: 'projects',
			label: '04 / PROJECTS',
			title: 'Projekty',
			detail: 'Google Tasks · next layer',
			status: 'pending',
			value: 'PLANNED'
		},
		{
			id: 'runtime',
			label: '05 / RUNTIME',
			title: 'VPS / Eve',
			detail: 'Voice service · live',
			status: 'ready',
			value: 'ONLINE'
		},
		{
			id: 'access',
			label: '06 / ACCESS',
			title: 'Skills & MCPs',
			detail: 'Inventory · permissions · telemetry',
			status: 'pending',
			value: 'INDEXING'
		}
	];
</script>

<section class="command-center" aria-label="Eve command center">
	<div class="command-center__grid" aria-hidden="true"></div>
	<div class="command-center__halo command-center__halo--one" aria-hidden="true"></div>
	<div class="command-center__halo command-center__halo--two" aria-hidden="true"></div>

	{#each widgets as widget, index (widget.id)}
		<article class="widget widget--{widget.id}" style:--delay="{index * 70}ms">
			<div class="widget__topline">
				<span class="widget__label">{widget.label}</span>
				<span class="widget__status widget__status--{widget.status}">
					<span class="widget__dot" aria-hidden="true"></span>
					{widget.status}
				</span>
			</div>
			<div class="widget__body">
				<h2>{widget.title}</h2>
				<p>{widget.detail}</p>
			</div>
			<div class="widget__footer">
				<span>{widget.value}</span>
				<span class="widget__pulse" aria-hidden="true"></span>
			</div>
		</article>
	{/each}
</section>

<style>
	.command-center {
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		overflow: hidden;
		color: #1c1917;
		font-family: 'DM Sans', Inter, system-ui, sans-serif;
	}

	.command-center__grid {
		position: absolute;
		inset: 5%;
		opacity: 0.18;
		background-image: linear-gradient(rgba(28, 25, 23, 0.08) 1px, transparent 1px),
			linear-gradient(90deg, rgba(28, 25, 23, 0.08) 1px, transparent 1px);
		background-size: 64px 64px;
		mask-image: radial-gradient(ellipse at center, #000 0%, transparent 70%);
	}

	.command-center__halo {
		position: absolute;
		left: 50%;
		top: 50%;
		border: 1px solid rgba(255, 106, 61, 0.11);
		border-radius: 50%;
		translate: -50% -50%;
		animation: halo-breathe 7s ease-in-out infinite;
	}

	.command-center__halo--one {
		width: min(54vw, 48rem);
		height: min(54vw, 48rem);
	}

	.command-center__halo--two {
		width: min(70vw, 62rem);
		height: min(70vw, 62rem);
		border-color: rgba(244, 69, 106, 0.07);
		animation-delay: -2.5s;
	}

	.widget {
		position: absolute;
		width: 12.5rem;
		min-height: 7.2rem;
		padding: 0.85rem 0.95rem 0.75rem;
		border: 1px solid rgba(28, 25, 23, 0.13);
		border-radius: 1.2rem;
		background: rgba(255, 252, 247, 0.68);
		box-shadow: 0 16px 50px rgba(76, 39, 20, 0.08), inset 0 1px rgba(255, 255, 255, 0.72);
		backdrop-filter: blur(16px) saturate(115%);
		-webkit-backdrop-filter: blur(16px) saturate(115%);
		animation: widget-in 720ms cubic-bezier(0.2, 0.75, 0.2, 1) both;
		animation-delay: var(--delay);
		transition: translate 240ms ease, box-shadow 240ms ease, border-color 240ms ease;
	}

	.widget:hover {
		translate: 0 -4px;
		border-color: rgba(255, 106, 61, 0.34);
		box-shadow: 0 24px 65px rgba(76, 39, 20, 0.13), 0 0 34px rgba(255, 106, 61, 0.08);
	}

	.widget--finance { left: clamp(1rem, 5vw, 6rem); top: 16%; }
	.widget--communication { left: clamp(1rem, 7vw, 9rem); bottom: 18%; }
	.widget--calendar { right: clamp(1rem, 5vw, 6rem); top: 16%; }
	.widget--projects { right: clamp(1rem, 7vw, 9rem); bottom: 18%; }
	.widget--runtime { left: 24%; top: 8%; }
	.widget--access { right: 24%; top: 8%; }

	.widget__topline,
	.widget__footer { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
	.widget__label,
	.widget__status,
	.widget__footer { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.55rem; letter-spacing: 0.11em; text-transform: uppercase; }
	.widget__label { color: rgba(28, 25, 23, 0.46); }
	.widget__status { display: inline-flex; align-items: center; gap: 0.3rem; color: #806e64; }
	.widget__status--ready { color: #7b6b47; }
	.widget__status--pending { color: #b26955; }
	.widget__status--offline { color: #a33e48; }
	.widget__dot { width: 0.36rem; height: 0.36rem; border-radius: 50%; background: currentColor; box-shadow: 0 0 0.5rem currentColor; }
	.widget__status--pending .widget__dot { animation: status-pulse 1.8s ease-in-out infinite; }
	.widget__body { padding: 0.72rem 0 0.9rem; }
	.widget__body h2 { margin: 0; color: #1c1917; font-family: Fraunces, 'Instrument Serif', Georgia, serif; font-size: 1.25rem; font-weight: 500; letter-spacing: -0.025em; }
	.widget__body p { margin: 0.25rem 0 0; color: #6b625b; font-size: 0.72rem; line-height: 1.35; }
	.widget__footer { color: rgba(28, 25, 23, 0.44); }
	.widget__pulse { width: 2.1rem; height: 0.18rem; border-radius: 99px; background: linear-gradient(90deg, #ff9a44, #ff6a3d, #f4456a); opacity: 0.65; }

	@keyframes widget-in { from { opacity: 0; translate: 0 12px; scale: 0.97; } to { opacity: 1; translate: 0 0; scale: 1; } }
	@keyframes halo-breathe { 0%, 100% { opacity: 0.45; scale: 0.98; } 50% { opacity: 0.9; scale: 1.02; } }
	@keyframes status-pulse { 0%, 100% { opacity: 0.45; } 50% { opacity: 1; } }

	@media (max-width: 900px) {
		.widget { width: 10.5rem; min-height: 6.3rem; padding: 0.7rem; border-radius: 1rem; }
		.widget--runtime, .widget--access { top: 5%; }
		.widget--finance, .widget--calendar { top: 19%; }
		.widget--communication, .widget--projects { bottom: 16%; }
		.widget--runtime { left: 1rem; }
		.widget--access { right: 1rem; }
	}

	@media (max-width: 680px) {
		.command-center { display: none; }
	}
	@media (prefers-reduced-motion: reduce) {
		.widget, .command-center__halo, .widget__status--pending .widget__dot { animation: none; }
	}
</style>
