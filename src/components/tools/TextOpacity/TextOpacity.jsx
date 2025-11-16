import React, { useEffect, useRef, useState } from "react";
import "./TextOpacity.css";

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
	const words = String(text).split(/(\s+)/).filter(word => word.length > 0);

	return (
		<p className={`text-opacity ${className}`} ref={containerRef} aria-hidden>
			{words.map((word, wordIndex) => {
				// حساب الـ index العام للكلمة دي
				const wordStartIndex = words.slice(0, wordIndex).join('').length;
				
				return (
					<span key={wordIndex} className="word">
						{word.split('').map((char, charIndex) => {
							// الـ index العام للحرف ده
							const globalIndex = wordStartIndex + charIndex;
							
							const revealStart = globalIndex * delayPerChar;
							const revealEnd = revealStart + revealDuration;

							const t = (progress - revealStart) / (revealEnd - revealStart);
							const norm = Math.min(1, Math.max(0, t));
							const opacity = Math.min(maxOpacity, Math.max(minOpacity, minOpacity + (maxOpacity - minOpacity) * norm));
							const translateY = (1 - ( (opacity - minOpacity) / Math.max(1e-6, (maxOpacity - minOpacity)) )) * 5;

							return (
								<span
									key={charIndex}
									className="char"
									style={{
										opacity,
										transform: `translateY(${translateY}px)`,
									}}
								>
									{char === ' ' ? '\u00A0' : char}
								</span>
							);
						})}
					</span>
				);
			})}
		</p>
	);
}
