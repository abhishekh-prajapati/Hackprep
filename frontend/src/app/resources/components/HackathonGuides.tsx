'use client';
import React from 'react';
import { BookOpen, ChevronRight, Clock } from 'lucide-react';
import Link from 'next/link';

const guides = [
  { title: 'Winning Pitch Strategy', time: '8 min read', description: 'Learn how to structure your 3-minute demo for maximum judging impact.' },
  { title: 'Effective Team Forming', time: '5 min read', description: 'The ideal ratio of hackers to designers and how to align goals early.' },
  { title: 'Rapid Prototyping Tools', time: '12 min read', description: 'Tools that help you build a working MVP in less than 24 hours.' },
];

export default function HackathonGuides() {
  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <BookOpen size={18} color="var(--accent)" />
        <h3 style={{ fontSize: '1rem' }}>Hackathon Guides</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {guides.map((guide, index) => (
          <div key={index} style={{
            paddingBottom: index !== guides.length - 1 ? '16px' : '0',
            borderBottom: index !== guides.length - 1 ? '1px solid var(--border)' : 'none'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>{guide.title}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '0.7rem' }}>
                <Clock size={10} />
                <span>{guide.time}</span>
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', margin: 0 }}>{guide.description}</p>
          </div>
        ))}
      </div>

      <Link href="/guides" style={{ width: '100%' }}>
        <button className="btn-explore">
          Explore All Guides
          <ChevronRight size={14} />
        </button>
      </Link>
    </div>
  );
}
