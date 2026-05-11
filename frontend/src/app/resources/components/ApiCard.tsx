import Link from 'next/link';

interface ApiProps {
  id: string;
  name: string;
  description: string;
  logo: string;
  color: string;
}

export default function ApiCard({ id, name, description, logo, color }: ApiProps) {
  const isUrl = logo.startsWith('http');

  return (
    <Link href={`/resources/apis/${id}`} style={{ textDecoration: 'none' }}>
      <div className="card clickable-card" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '20px', 
        padding: '20px',
        height: '100%',
        background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)'
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          backgroundColor: isUrl ? `${color}18` : color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: `0 8px 16px ${color}33`,
          border: isUrl ? `1px solid ${color}33` : 'none',
          padding: isUrl ? '10px' : '0',
          fontSize: '1.4rem',
          fontWeight: 800,
          color: 'white',
        }}>
          {isUrl ? (
            <img
              src={logo}
              alt={name}
              width={36}
              height={36}
              style={{ objectFit: 'contain', width: '100%', height: '100%' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.parentElement) {
                  e.currentTarget.parentElement.style.backgroundColor = color;
                  e.currentTarget.parentElement.style.fontSize = '1.4rem';
                  e.currentTarget.parentElement.style.color = 'white';
                  e.currentTarget.parentElement.textContent = name[0];
                }
              }}
            />
          ) : logo}
        </div>
        
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.05rem', margin: '0 0 4px 0', color: 'var(--text-primary)', fontWeight: 700 }}>{name}</h3>
          <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

