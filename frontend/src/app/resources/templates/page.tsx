'use client';
import React from 'react';

import TemplateCard from '../components/TemplateCard';
import { ArrowLeft, Sparkles, Search } from 'lucide-react';
import Link from 'next/link';
import { templateList } from '../data/resources';
import { useSearch } from '../context/SearchContext';

export default function TemplatesLibrary() {
  const { searchQuery, setSearchQuery } = useSearch();

  const filteredTemplates = templateList.filter(temp => 
    temp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    temp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    temp.tech.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>

      
      <div style={{ marginBottom: '40px' }}>
        <Link href="/resources" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          color: 'var(--accent)', 
          fontWeight: 600, 
          marginBottom: '24px' 
        }}>
          <ArrowLeft size={18} />
          Back to Resource Library
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <Sparkles size={32} color="var(--accent)" />
          <h1 style={{ margin: 0 }}>Template Library</h1>
        </div>
        <p style={{ fontSize: '1.1rem', maxWidth: '600px', marginBottom: '24px' }}>
          Choose from our curated selection of high-performance starter kits to jumpstart your hackathon project.
        </p>

        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          padding: '16px',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          maxWidth: '100%'
        }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search templates by tech, name, or description..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 10px 10px 40px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-primary)',
                fontSize: '0.9rem',
                outline: 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}
            />
          </div>
          <button className="btn-primary" style={{ padding: '10px 24px' }}>Search</button>
        </div>
      </div>

      {filteredTemplates.length > 0 ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '24px',
          paddingBottom: '60px'
        }}>
          {filteredTemplates.map((temp) => (
            <TemplateCard 
              key={temp.id}
              id={temp.id}
              title={temp.title}
              description={temp.description}
              type={temp.type}
              tech={temp.tech}
            />
          ))}
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '80px 20px',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '24px',
          border: '1px dashed var(--border)'
        }}>
          <Search size={48} color="var(--text-secondary)" style={{ marginBottom: '16px', opacity: 0.5 }} />
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>No templates found</h2>
          <p style={{ color: 'var(--text-secondary)' }}>We couldn't find any template matching "{searchQuery}". Try a different keyword.</p>
        </div>
      )}
    </>
  );
}
