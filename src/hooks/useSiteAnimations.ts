import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealOptions {
  legacy?: boolean;
  deps?: unknown[];
}

/**
 * useScrollReveals - reveals elements with `.reveal`, `.reveal-clip`, and counters with `data-count`
 */
export function useScrollReveals(
  scopeRef: React.RefObject<HTMLElement | null>,
  options: RevealOptions = {}
) {
  const { deps = [] } = options;

  useEffect(() => {
    if (!scopeRef.current) return;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = scopeRef.current;

    if (isReduced) {
      // Ensure all elements are immediately visible
      const elements = el.querySelectorAll('.reveal, .reveal-clip, [data-count]');
      elements.forEach((node) => {
        (node as HTMLElement).style.opacity = '1';
        (node as HTMLElement).style.transform = 'none';
        const count = node.getAttribute('data-count');
        if (count) node.textContent = count;
      });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Reveal elements (.reveal)
      const reveals = el.querySelectorAll('.reveal');
      if (reveals.length > 0) {
        reveals.forEach((target) => {
          gsap.fromTo(
            target,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: target,
                start: 'top 88%',
                once: true,
              },
            }
          );
        });
      }

      // 2. Reveal clip elements (.reveal-clip)
      const clipReveals = el.querySelectorAll('.reveal-clip');
      if (clipReveals.length > 0) {
        clipReveals.forEach((target) => {
          gsap.fromTo(
            target,
            { clipPath: 'inset(10% 0 10% 0)', opacity: 0 },
            {
              clipPath: 'inset(0% 0 0% 0)',
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: target,
                start: 'top 85%',
                once: true,
              },
            }
          );
        });
      }

      // 3. Count up numbers (data-count)
      const countElements = el.querySelectorAll('[data-count]');
      if (countElements.length > 0) {
        countElements.forEach((target) => {
          const raw = target.getAttribute('data-count') || '0';
          const num = parseInt(raw.replace(/[^0-9]/g, ''), 10);
          const suffix = raw.replace(/[0-9]/g, '');
          if (isNaN(num)) return;

          const obj = { val: 0 };
          gsap.to(obj, {
            val: num,
            duration: 1.8,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: target,
              start: 'top 90%',
              once: true,
            },
            onUpdate: () => {
              target.textContent = `${Math.floor(obj.val)}${suffix}`;
            },
          });
        });
      }
    }, el);

    return () => ctx.revert();
  }, [scopeRef, ...deps]);
}

/**
 * default useSiteAnimations - adds hero timeline, word stagger, gentle parallax & reveals
 */
export default function useSiteAnimations(
  scopeRef: React.RefObject<HTMLElement | null>,
  options: RevealOptions = {}
) {
  const { deps = [] } = options;

  useEffect(() => {
    if (!scopeRef.current) return;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = scopeRef.current;

    if (isReduced) {
      const elements = el.querySelectorAll('.hero-anim, .reveal, [data-count]');
      elements.forEach((node) => {
        (node as HTMLElement).style.opacity = '1';
        (node as HTMLElement).style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Hero timeline
      const hero = el.querySelector('.page-hero');
      if (hero) {
        const heroBg = hero.querySelector('.hero-bg');
        const heroEyebrow = hero.querySelector('.hero-eyebrow');
        const heroTitle = hero.querySelector('.hero-title');
        const heroSub = hero.querySelector('.hero-sub');
        const heroAction = hero.querySelector('.hero-action');

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        if (heroBg) {
          tl.fromTo(heroBg, { scale: 1.08, opacity: 0.6 }, { scale: 1, opacity: 1, duration: 1.4 }, 0);
        }
        if (heroEyebrow) {
          tl.fromTo(heroEyebrow, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2);
        }
        if (heroTitle) {
          tl.fromTo(heroTitle, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8 }, 0.35);
        }
        if (heroSub) {
          tl.fromTo(heroSub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.5);
        }
        if (heroAction) {
          tl.fromTo(heroAction, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, 0.65);
        }

        // Parallax on hero bg
        if (heroBg) {
          gsap.to(heroBg, {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      }

      // Also register regular scroll reveals
      const reveals = el.querySelectorAll('.reveal');
      reveals.forEach((target) => {
        gsap.fromTo(
          target,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: target,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [scopeRef, ...deps]);
}
