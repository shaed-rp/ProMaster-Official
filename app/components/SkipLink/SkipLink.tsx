'use client';

export default function SkipLink() {
  return (
    <a
      href='#home'
      className='skip-to-main'
      style={{
        position: 'absolute',
        left: '-9999px',
        zIndex: 9999,
        padding: '1em 1.5em',
        backgroundColor: '#000',
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
        borderRadius: '4px',
        transition: 'left 0.3s ease',
      }}
      onFocus={(e) => {
        e.currentTarget.style.left = '50%';
        e.currentTarget.style.top = '1em';
        e.currentTarget.style.transform = 'translateX(-50%)';
      }}
      onBlur={(e) => {
        e.currentTarget.style.left = '-9999px';
      }}
    >
      Skip to main content
    </a>
  );
}

