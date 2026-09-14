import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { SkillItem } from '../types';

interface SkillGraphProps {
  skills: SkillItem[];
}

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  group: string;
  radius: number;
  description: string;
  proficiency: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
}

const colorMap: Record<string, string> = {
  technical: '#3b82f6',
  communication: '#22c55e',
  logical: '#a855f7',
};

const glowMap: Record<string, string> = {
  technical: '#3b82f680',
  communication: '#22c55e80',
  logical: '#a855f780',
};

const SkillGraph: React.FC<SkillGraphProps> = ({ skills }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  useEffect(() => {
    if (!containerRef.current || skills.length === 0) return;

    d3.select(containerRef.current).selectAll('svg').remove();

    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    const nodes: Node[] = skills.map((s, i) => ({
      id: `node-${i}`,
      name: s.name,
      group: s.type,
      radius: Math.max(22, s.proficiency * 0.55),
      description: s.description,
      proficiency: s.proficiency,
    }));

    const links: Link[] = [];
    const grouped = d3.group(nodes, d => d.group);

    grouped.forEach((groupNodes) => {
      for (let i = 0; i < groupNodes.length; i++) {
        for (let j = i + 1; j < groupNodes.length; j++) {
          links.push({
            source: groupNodes[i].id,
            target: groupNodes[j].id,
          });
        }
      }
    });

    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', [0, 0, width, height]);

    // Defs for glow filters and gradients
    const defs = svg.append('defs');

    // Glow filter for each type
    Object.entries(colorMap).forEach(([type, color]) => {
      const filter = defs.append('filter')
        .attr('id', `glow-${type}`)
        .attr('x', '-50%').attr('y', '-50%')
        .attr('width', '200%').attr('height', '200%');
      filter.append('feGaussianBlur')
        .attr('stdDeviation', '4')
        .attr('result', 'coloredBlur');
      filter.append('feFlood')
        .attr('flood-color', color)
        .attr('flood-opacity', '0.6')
        .attr('result', 'glowColor');
      filter.append('feComposite')
        .attr('in', 'glowColor')
        .attr('in2', 'coloredBlur')
        .attr('operator', 'in')
        .attr('result', 'softGlow');
      const merge = filter.append('feMerge');
      merge.append('feMergeNode').attr('in', 'softGlow');
      merge.append('feMergeNode').attr('in', 'SourceGraphic');
    });

    // Animated gradient for links
    const linkGrad = defs.append('linearGradient')
      .attr('id', 'link-gradient')
      .attr('gradientUnits', 'userSpaceOnUse');
    linkGrad.append('stop').attr('offset', '0%').attr('stop-color', 'var(--accent)').attr('stop-opacity', '0.3');
    linkGrad.append('stop').attr('offset', '50%').attr('stop-color', 'var(--accent)').attr('stop-opacity', '0.8');
    linkGrad.append('stop').attr('offset', '100%').attr('stop-color', 'var(--accent)').attr('stop-opacity', '0.3');

    const g = svg.append('g');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 5])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });
    svg.call(zoom);

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(120).strength(0.08))
      .force('charge', d3.forceManyBody().strength(-350))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius((d: any) => d.radius + 15).iterations(3));

    // Draw links with animated dashes
    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', 'var(--border)')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '6,4')
      .style('animation', 'dashFlow 2s linear infinite');

    // Draw nodes group
    const node = g.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('cursor', 'pointer')
      .call(d3.drag<any, Node>()
        .on('start', (e, d) => {
          if (!e.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (e, d) => {
          d.fx = e.x;
          d.fy = e.y;
        })
        .on('end', (e, d) => {
          if (!e.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      );

    // Outer glow ring (pulsing)
    node.append('circle')
      .attr('r', d => d.radius + 8)
      .attr('fill', 'none')
      .attr('stroke', d => glowMap[d.group] || '#71717a80')
      .attr('stroke-width', 2)
      .attr('opacity', 0.5)
      .style('animation', (_d, i) => `pulse ${2 + (i % 3) * 0.5}s ease-in-out infinite`);

    // Main circle
    node.append('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => {
        const color = colorMap[d.group] || '#71717a';
        return color;
      })
      .attr('stroke', 'rgba(255,255,255,0.3)')
      .attr('stroke-width', 2)
      .attr('filter', d => `url(#glow-${d.group})`)
      .on('click', (_e, d) => {
        const skill = skills.find(s => s.name === d.name);
        if (skill) setSelectedSkill(skill);
      })
      .on('mouseenter', function(_e, d) {
        d3.select(this)
          .transition().duration(200)
          .attr('r', d.radius + 5)
          .attr('stroke-width', 3);
        // Highlight connected links
        link
          .transition().duration(200)
          .attr('stroke-opacity', (l: any) => 
            (l.source.id === d.id || l.target.id === d.id) ? 0.9 : 0.1
          )
          .attr('stroke', (l: any) => 
            (l.source.id === d.id || l.target.id === d.id) ? (colorMap[d.group] || 'var(--accent)') : 'var(--border)'
          )
          .attr('stroke-width', (l: any) => 
            (l.source.id === d.id || l.target.id === d.id) ? 2.5 : 1
          );
      })
      .on('mouseleave', function(_e, d) {
        d3.select(this)
          .transition().duration(200)
          .attr('r', d.radius)
          .attr('stroke-width', 2);
        // Reset links
        link
          .transition().duration(300)
          .attr('stroke-opacity', 0.4)
          .attr('stroke', 'var(--border)')
          .attr('stroke-width', 1.5);
      });

    // Inner proficiency ring
    node.append('circle')
      .attr('r', d => d.radius - 4)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(255,255,255,0.2)')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', d => {
        const circumference = 2 * Math.PI * (d.radius - 4);
        const filled = (d.proficiency / 100) * circumference;
        return `${filled} ${circumference - filled}`;
      })
      .attr('stroke-dashoffset', d => {
        const circumference = 2 * Math.PI * (d.radius - 4);
        return circumference * 0.25; // Start from top
      })
      .attr('transform', 'rotate(-90)');

    // Node labels
    node.append('text')
      .text(d => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', (d: any) => d.radius + 18)
      .attr('fill', 'var(--text-primary)')
      .attr('font-size', '11px')
      .attr('font-weight', '600')
      .attr('font-family', "'Inter', sans-serif")
      .style('text-shadow', '0 1px 4px rgba(0,0,0,0.6)')
      .attr('pointer-events', 'none');

    // Proficiency % inside node
    node.append('text')
      .text(d => `${d.proficiency}%`)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', 'white')
      .attr('font-size', d => Math.max(10, d.radius * 0.4) + 'px')
      .attr('font-weight', '700')
      .attr('font-family', "'Space Grotesk', sans-serif")
      .attr('pointer-events', 'none')
      .attr('opacity', 0.9);

    // Tick update
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    // Inject keyframe animations
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.08); }
      }
      @keyframes dashFlow {
        to { stroke-dashoffset: -20; }
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      simulation.stop();
      document.head.removeChild(styleEl);
    };
  }, [skills]);

  return (
    <div className="w-full h-full relative" ref={containerRef}>
      {/* Legend */}
      <div className="absolute top-4 left-4 glass p-4 rounded-xl flex flex-col gap-2 pointer-events-none z-10 shadow-lg">
        <h3 className="font-bold text-sm mb-1 uppercase tracking-wider text-text-secondary">Skill Types</h3>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full shadow-[0_0_8px_#3b82f6]" style={{ backgroundColor: '#3b82f6' }}></div>
          <span className="text-sm">Technical</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full shadow-[0_0_8px_#22c55e]" style={{ backgroundColor: '#22c55e' }}></div>
          <span className="text-sm">Communication</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full shadow-[0_0_8px_#a855f7]" style={{ backgroundColor: '#a855f7' }}></div>
          <span className="text-sm">Logical</span>
        </div>
      </div>

      {/* Selected Skill Panel */}
      {selectedSkill && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 glass p-6 rounded-2xl max-w-md w-full shadow-2xl z-20 max-h-[60vh] overflow-y-auto custom-scrollbar border border-accent/20">
          <button 
            className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setSelectedSkill(null)}
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded-full shadow-lg" 
              style={{ 
                backgroundColor: colorMap[selectedSkill.type],
                boxShadow: `0 0 12px ${colorMap[selectedSkill.type]}`
              }}
            />
            {selectedSkill.name}
          </h2>
          <p className="text-text-secondary mb-4 leading-relaxed">{selectedSkill.description}</p>
          <div className="w-full bg-border rounded-full h-3 overflow-hidden">
            <div 
              className="h-3 rounded-full transition-all duration-1000 relative overflow-hidden" 
              style={{ 
                width: `${selectedSkill.proficiency}%`,
                backgroundColor: colorMap[selectedSkill.type],
                boxShadow: `0 0 10px ${colorMap[selectedSkill.type]}`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
          </div>
          <p className="text-xs mt-2 text-right text-text-secondary font-mono">
            Proficiency: {selectedSkill.proficiency}%
          </p>
        </div>
      )}
    </div>
  );
};

export default SkillGraph;
