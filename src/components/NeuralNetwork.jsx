import React, { useEffect, useRef } from 'react';

const NeuralNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const mouse = { x: -9999, y: -9999 };
    let rotY = 0, rotX = 0;
    let targetRotY = 0, targetRotX = 0;
    let autoAngle = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      targetRotY = ((e.clientX / window.innerWidth) - 0.5) * 0.5;
      targetRotX = ((e.clientY / window.innerHeight) - 0.5) * 0.3;
    };
    window.addEventListener('mousemove', onMouseMove);

    const NODE_COUNT = 75;
    const FOV = 700;
    const CONNECT_DIST = 300;

    const nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 1400,
      z: (Math.random() - 0.5) * 700,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      vz: (Math.random() - 0.5) * 0.14,
      baseSize: Math.random() * 2.2 + 0.8,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.022 + 0.008,
      isHub: i < 8,
    }));

    // Make hub nodes bigger and slower
    nodes.forEach((n, i) => {
      if (n.isHub) {
        n.baseSize = Math.random() * 2 + 3;
        n.vx *= 0.4;
        n.vy *= 0.4;
      }
    });

    const packets = [];

    const spawnPacket = () => {
      if (packets.length >= 30) return;
      const fromIdx = Math.floor(Math.random() * nodes.length);
      const from = nodes[fromIdx];
      const candidates = nodes.filter((n, i) => {
        if (i === fromIdx) return false;
        const dx = n.x - from.x, dy = n.y - from.y, dz = n.z - from.z;
        return Math.sqrt(dx*dx + dy*dy + dz*dz) < CONNECT_DIST;
      });
      if (!candidates.length) return;
      const to = candidates[Math.floor(Math.random() * candidates.length)];
      packets.push({
        from, to,
        t: 0,
        speed: Math.random() * 0.014 + 0.006,
        color: Math.random() > 0.4 ? 'cyan' : 'green',
      });
    };

    let packetTimer = 0;

    const rotate3D = (x, y, z, rx, ry) => {
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      return { x: x1, y: y1, z: z2 };
    };

    const project = (x, y, z) => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const scale = FOV / (FOV + z + 500);
      return { sx: cx + x * scale, sy: cy + y * scale, scale };
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      autoAngle = time * 0.00008;
      rotY += (targetRotY + autoAngle - rotY) * 0.03;
      rotX += (targetRotX - rotX) * 0.03;

      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;
        node.pulse += node.pulseSpeed;
        if (Math.abs(node.x) > 1000) node.vx *= -1;
        if (Math.abs(node.y) > 700) node.vy *= -1;
        if (Math.abs(node.z) > 350) node.vz *= -1;
      });

      const projected = nodes.map(n => {
        const r = rotate3D(n.x, n.y, n.z, rotX, rotY);
        const p = project(r.x, r.y, r.z);
        return { ...p, pulse: n.pulse, baseSize: n.baseSize, isHub: n.isHub };
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dz = nodes[i].z - nodes[j].z;
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
          if (dist > CONNECT_DIST) continue;

          const p1 = projected[i], p2 = projected[j];
          const avgScale = (p1.scale + p2.scale) / 2;
          if (avgScale < 0.2) continue;

          const midX = (p1.sx + p2.sx) / 2;
          const midY = (p1.sy + p2.sy) / 2;
          const mdx = midX - mouse.x, mdy = midY - mouse.y;
          const mDist = Math.sqrt(mdx*mdx + mdy*mdy);
          const mBoost = mDist < 200 ? (1 - mDist/200) * 1.8 : 0;

          const alpha = (1 - dist / CONNECT_DIST) * 0.28 * Math.min(1.5, avgScale * 2) + mBoost * 0.25;
          const lineW = (0.4 + mBoost * 0.8) * avgScale * 1.4;

          ctx.beginPath();
          ctx.moveTo(p1.sx, p1.sy);
          ctx.lineTo(p2.sx, p2.sy);
          ctx.strokeStyle = `rgba(${110 + Math.floor(mBoost * 60)}, ${90 + Math.floor(mBoost * 50)}, 255, ${alpha})`;
          ctx.lineWidth = lineW;
          ctx.stroke();
        }
      }

      // Draw data packets
      packets.forEach(pkt => {
        pkt.t += pkt.speed;
        const nx = pkt.from.x + (pkt.to.x - pkt.from.x) * pkt.t;
        const ny = pkt.from.y + (pkt.to.y - pkt.from.y) * pkt.t;
        const nz = pkt.from.z + (pkt.to.z - pkt.from.z) * pkt.t;
        const r3d = rotate3D(nx, ny, nz, rotX, rotY);
        const { sx, sy, scale } = project(r3d.x, r3d.y, r3d.z);
        if (scale < 0.2) return;

        const isCyan = pkt.color === 'cyan';
        const c1 = isCyan ? '0,255,200' : '80,255,120';
        const c2 = isCyan ? '0,200,255' : '0,200,80';
        const glowR = 9 * scale;

        const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowR);
        grd.addColorStop(0, `rgba(${c1},0.95)`);
        grd.addColorStop(0.5, `rgba(${c2},0.45)`);
        grd.addColorStop(1, `rgba(${c2},0)`);
        ctx.beginPath();
        ctx.arc(sx, sy, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(sx, sy, 2 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,255,245,1)`;
        ctx.fill();
      });
      for (let i = packets.length - 1; i >= 0; i--) {
        if (packets[i].t >= 1) packets.splice(i, 1);
      }

      // Draw nodes
      projected.forEach((p, i) => {
        if (p.scale < 0.15) return;
        const pv = (Math.sin(p.pulse) + 1) / 2;
        const mdx = p.sx - mouse.x, mdy = p.sy - mouse.y;
        const mDist = Math.sqrt(mdx*mdx + mdy*mdy);
        const mEff = mDist < 160 ? (1 - mDist/160) : 0;

        const size = (p.baseSize * (1 + pv * 0.6 + mEff * 2.2)) * p.scale * 1.6;
        const alpha = (0.3 + pv * 0.5 + mEff * 0.25) * Math.min(1.2, p.scale * 2.5);

        // Glow for active / hover nodes
        if (pv > 0.65 || mEff > 0.15 || p.isHub) {
          const glowR = size * (p.isHub ? 5 : 4 + mEff * 3);
          const grd = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, glowR);
          const glowAlpha = (p.isHub ? 0.5 : 0.35) + mEff * 0.2;
          grd.addColorStop(0, `rgba(168,85,247,${glowAlpha})`);
          grd.addColorStop(0.5, `rgba(99,102,241,${glowAlpha * 0.4})`);
          grd.addColorStop(1, 'rgba(99,102,241,0)');
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        // Node core
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, Math.max(0.5, size), 0, Math.PI * 2);
        if (mEff > 0.1) {
          ctx.fillStyle = `rgba(210,120,255,${alpha})`;
        } else if (p.isHub) {
          ctx.fillStyle = `rgba(140,100,255,${alpha})`;
        } else {
          ctx.fillStyle = `rgba(99,102,241,${alpha})`;
        }
        ctx.fill();
      });

      // Spawn packets
      packetTimer++;
      if (packetTimer > 40) { packetTimer = 0; spawnPacket(); }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }}
    />
  );
};

export default NeuralNetwork;
