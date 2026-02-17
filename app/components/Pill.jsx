'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function PillBadge({ text = "April 3rd - 5th", width = 420, height = 80 }) {
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -width / 2, width / 2,
      height / 2, -height / 2,
      0.1, 100
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    function makePillPoints(w, h, segments = 120) {
      const r = h / 2;
      const hw = w / 2, hh = h / 2;
      const points = [];
      const corners = [
        [hw - r,   hh - r,  0],
        [-hw + r,  hh - r,  Math.PI / 2],
        [-hw + r, -hh + r,  Math.PI],
        [hw - r,  -hh + r,  Math.PI * 1.5],
      ];
      corners.forEach(([cx, cy, startAngle]) => {
        for (let i = 0; i <= segments / 4; i++) {
          const a = startAngle + (i / (segments / 4)) * (Math.PI / 2);
          points.push(new THREE.Vector3(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 0));
        }
      });
      points.push(points[0].clone());
      return points;
    }

    const numRings = 12;
    const ringGroup = new THREE.Group();

    // Rings spread from small center pill outward
    const ringStartW = width * 0.30;
    const ringStartH = height * 0.30;
    const ringEndW   = width * 0.95;
    const ringEndH   = height * 0.92;

    for (let i = 4; i < numRings; i++) {
      const t = i / (numRings - 1);
      const rw = ringStartW + (ringEndW - ringStartW) * t;
      const rh = ringStartH + (ringEndH - ringStartH) * t;

      const pts = makePillPoints(rw, rh);
      const geometry = new THREE.BufferGeometry().setFromPoints(pts);

      // Bright teal in center, fading out toward edges
      const opacity = 1.0 - t * 0.7;

      const material = new THREE.LineBasicMaterial({
        color: 0x3dbf9a,
        transparent: true,
        opacity: Math.max(opacity, 0.15),
        linewidth: 4,
      });

      const line = new THREE.LineLoop(geometry, material);
      line.userData = { baseRW: rw, baseRH: rh, t };
      ringGroup.add(line);
    }

    scene.add(ringGroup);

    let time = 0;
    function animate() {
      animationFrameRef.current = requestAnimationFrame(animate);
      time += 0.008;

      ringGroup.children.forEach((line, i) => {
        const { baseRW, baseRH, t } = line.userData;
        const pulse = Math.sin(time * 1.5 - i * 0.45) * 0.008 * (1 - t);
        const rw = baseRW * (1 + pulse);
        const rh = baseRH * (1 + pulse);
        const pts = makePillPoints(rw, rh);
        line.geometry.setFromPoints(pts);
        line.geometry.attributes.position.needsUpdate = true;
      });

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      ringGroup.children.forEach((c) => {
        c.geometry.dispose();
        c.material.dispose();
      });
    };
  }, [width, height]);

  return (
    <div style={{
      position: 'relative',
      width,
      height,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: height / 2,
      overflow: 'hidden',
    }}>
      <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0 }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        <span style={{
          color: '#6be5be',
          fontSize: 20,
          fontFamily: "var(--font-raleway), sans-serif",
          fontWeight: 400,
          whiteSpace: 'nowrap',
          textShadow: 'none',
        }}>
          {text}
        </span>
      </div>
    </div>
  );
}