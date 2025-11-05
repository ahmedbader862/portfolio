
import React, { useEffect, useRef, useState } from "react";
import "./TextOpacity.css";

/**
 * TextOpacity
 * Props:
 *  - text: string
 *  - minOpacity: number (0..1) default 0.3
 *  - maxOpacity: number (0..1) default 1
 *  - delayPerChar: number seconds between each char's reveal start (default 0.0048)
 *  - revealDuration: number seconds duration of each char's reveal (default 0.0555)
 *
 * This component mirrors the scroll-driven per-character reveal logic used in About.jsx
 * but exposes the min/max opacity values so you can control the transparency range.
 */
export default function TextOpacity({
	text = "",
	minOpacity = 0.3,
	maxOpacity = 1,
	delayPerChar = 0.0047888,
	revealDuration = 0.0555,
	className = "",
}) {
	const containerRef = useRef(null);
	const [progress, setProgress] = useState(0);

	const letters = String(text)
		.split("")
		.map((ch) => (ch === " " ? "\u00A0" : ch));

	useEffect(() => {
		let rafId = null;

		function clamp(v, a = 0, b = 1) {
			return Math.min(b, Math.max(a, v));
		}

		function onScroll() {
			if (!containerRef.current) return;
			const rect = containerRef.current.getBoundingClientRect();
			const windowH = window.innerHeight;

			const raw = (windowH - rect.top) / (windowH + rect.height);
			const p = clamp(raw, 0, 1);

			if (rafId) cancelAnimationFrame(rafId);
			rafId = requestAnimationFrame(() => setProgress(p));
		}

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);

		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (rafId) cancelAnimationFrame(rafId);
		};
	}, []);

	return (
		<p className={`text-opacity ${className}`} ref={containerRef} aria-hidden>
			{letters.map((char, i) => {
				const revealStart = i * delayPerChar;
				const revealEnd = revealStart + revealDuration;

				const t = (progress - revealStart) / (revealEnd - revealStart);
				const norm = Math.min(1, Math.max(0, t));
				const opacity = Math.min(maxOpacity, Math.max(minOpacity, minOpacity + (maxOpacity - minOpacity) * norm));
				const translateY = (1 - ( (opacity - minOpacity) / Math.max(1e-6, (maxOpacity - minOpacity)) )) * 5;

				return (
					<span
						key={i}
						className="char"
						style={{
							opacity,
							transform: `translateY(${translateY}px)`,
						}}
					>
						{char}
					</span>
				);
			})}
		</p>
	);
}
