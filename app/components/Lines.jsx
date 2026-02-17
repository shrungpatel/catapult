'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HorizontalLines() {
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const aspect = width / height;

    // Camera exactly matches the canvas: y from -1 to 1, x scaled by aspect
    const camera = new THREE.OrthographicCamera(
      -aspect, aspect, 1, -1, 0.1, 1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    const linesGroup = new THREE.Group();
    scene.add(linesGroup);
    const lineObjects = [];

    function buildLines(asp) {
      // Clear old
      while (linesGroup.children.length) {
        const c = linesGroup.children[0];
        linesGroup.remove(c);
        c.geometry.dispose();
        c.material.dispose();
      }
      lineObjects.length = 0;

      const numLines = 24;
      // Spread lines evenly across the full -1 to 1 vertical range
      for (let i = 0; i < numLines; i++) {
        const t = i / (numLines - 1);
        const y = -1 + t * 2; // from -1 (bottom) to +1 (top)

        const points = [
          new THREE.Vector3(-asp, y, 0),
          new THREE.Vector3(asp, y, 0),
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        // Opaque at bottom, fade to transparent at top
        const baseOpacity = 1 - t * 0.95;

        const material = new THREE.LineBasicMaterial({
          color: 0x6be5be,
          transparent: true,
          opacity: baseOpacity,
          linewidth: 8,
        });

        const line = new THREE.Line(geometry, material);
        linesGroup.add(line);
        lineObjects.push({ line, baseOpacity });
      }
    }

    buildLines(aspect);

    function animate() {
      animationFrameRef.current = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      const wave = Math.sin(time * 1.5);

      lineObjects.forEach(({ line, baseOpacity }) => {
        line.position.y = wave * 0.015;
        line.material.opacity = Math.max(0, Math.min(1, baseOpacity + wave * 0.06));
      });

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      const asp = w / h;

      camera.left = -asp;
      camera.right = asp;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      buildLines(asp);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 left-0 w-full h-[45vh] z-[1] pointer-events-none"
    />
  );
}