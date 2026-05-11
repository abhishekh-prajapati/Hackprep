'use client';
import React from 'react';
import HeroSection from './components/HeroSection';
import TemplateCard from './components/TemplateCard';
import ApiCard from './components/ApiCard';
import HackathonGuides from './components/HackathonGuides';
import DesignAssets from './components/DesignAssets';
import QuickStats from './components/QuickStats';
import Link from 'next/link';
import { HelpCircle, Sparkles, Link as LinkIcon, Search } from 'lucide-react';
import { apiList, templateList } from './data/resources';
import { useSearch } from './context/SearchContext';

export default function ResourcesPage() {
  const { searchQuery, setSearchQuery } = useSearch();

  const allFilteredTemplates = templateList.filter(temp => 
    temp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    temp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    temp.tech.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const allFilteredApis = apiList.filter(api => 
    api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    api.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasResults = allFilteredTemplates.length > 0 || allFilteredApis.length > 0;

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '24px', marginTop: '24px' }}>
        {/* Left Column */}
        <div>
          {searchQuery && (
            <div style={{ 
              marginBottom: '32px', 
              padding: '24px', 
              backgroundColor: 'var(--bg-secondary)', 
              borderRadius: '20px',
              border: '1px solid var(--border)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              height: 'fit-content',
              animation: 'fadeInDown 0.3s ease-out forwards'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Search size={20} color="var(--accent)" />
                  <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Search Results</h2>
                </div>
                <button 
                  onClick={() => setSearchQuery('')}
                  style={{ 
                    background: 'var(--bg-tertiary)', 
                    border: '1px solid var(--border)', 
                    color: 'var(--text-secondary)', 
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontSize: '0.8rem',
                    padding: '4px 12px',
                    borderRadius: '100px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.borderColor = 'var(--text-secondary)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }}
                >
                  Clear
                </button>
              </div>

              {!hasResults ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '24px 20px',
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: '12px',
                  border: '1px dashed var(--border)'
                }}>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>
                    No results found for <strong style={{ color: 'var(--text-primary)' }}>"{searchQuery}"</strong>
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {allFilteredTemplates.length > 0 && (
                    <div>
                      <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                        Templates
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        {allFilteredTemplates.map(temp => (
                          <TemplateCard key={temp.id} {...temp} />
                        ))}
                      </div>
                    </div>
                  )}

                  {allFilteredApis.length > 0 && (
                    <div>
                      <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                        APIs
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                        {allFilteredApis.map(api => (
                          <ApiCard key={api.id} {...api} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <HeroSection />

          {/* Starter Templates Section */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={20} color="var(--accent)" />
                <h2 style={{ margin: 0 }}>Starter Templates</h2>
              </div>
              <Link href="/resources/templates" className="btn-view-all">View All</Link>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              {templateList.slice(0, 2).map(temp => (
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
          </div>

          {/* API Directory Section */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LinkIcon size={20} color="var(--accent)" />
                <h2 style={{ margin: 0 }}>API Directory</h2>
              </div>
              <Link href="/resources/apis" className="btn-view-all">View All</Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {apiList.slice(0, 3).map(api => (
                <ApiCard key={api.id} {...api} />
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="cta-card" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                backgroundColor: 'var(--bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
                flexShrink: 0
              }}>
                <HelpCircle size={32} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Can't find a template?</h2>
                <p style={{ margin: 0, fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '450px' }}>
                  Our team builds custom starter kits every week. Request a specific stack or suggest an API integration.
                </p>
              </div>
            </div>
            <button className="btn-primary" style={{ padding: '12px 28px', fontSize: '1rem' }}>
              Submit Request
            </button>
          </div>
        </div>

        {/* Right Column (Sidebar Widgets) */}
        <div>
          <HackathonGuides />
          <DesignAssets />
          <QuickStats />
        </div>
      </div>
    </>
  );
}
