'use client';
import React from 'react';

import ApiCard from '../components/ApiCard';
import { Link as LinkIcon, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { apiList } from '../data/resources';
import { useSearch } from '../context/SearchContext';

export default function ApiDirectoryPage() {
  const { searchQuery, setSearchQuery } = useSearch();

  const filteredApis = apiList.filter(api => 
    api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    api.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>

      <div className="main-content" style={{ marginLeft: 0, maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <Link href="/resources" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: 'var(--accent)', 
            fontWeight: 600, 
            marginBottom: '24px' 
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to Resource Library
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <LinkIcon size={32} color="var(--accent)" />
            <h1 style={{ margin: 0 }}>API Directory</h1>
          </div>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px' }}>
            Browse our curated list of production-ready APIs to accelerate your hackathon project integration.
          </p>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          marginBottom: '32px',
          padding: '16px',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '12px',
          border: '1px solid var(--border)'
        }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search APIs by name or description..." 
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
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px' }}>
            Search
          </button>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={18} />
            Filter
          </button>
        </div>

        {filteredApis.length > 0 ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '20px' 
          }}>
            {filteredApis.map((api) => (
              <ApiCard key={api.id} {...api} />
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
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>No APIs found</h2>
            <p style={{ color: 'var(--text-secondary)' }}>We couldn't find any API matching "{searchQuery}". Try a different keyword.</p>
          </div>
        )}
      </div>
    </>
  );
}
