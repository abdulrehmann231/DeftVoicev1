// App.jsx
import React from 'react';
import './index.css';
import heroSculpture from './assets/hero_sculpture_v2.png';
import { Zap, Link as LinkIcon, Activity, ArrowUpRight, Cloud, ShieldCheck } from 'lucide-react';

function App() {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #FAFAFA 0%, #EFF1F5 100%)', // Ultra-clean matte white/grey
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#111827',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Navbar */}
      <nav style={{
        width: '100%',
        padding: '24px 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: '#111827',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <Activity size={20} />
          </div>
          <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: '800', letterSpacing: '-0.04em', color: '#111827' }}>DeftVoice</h1>
        </div>

        <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '32px' }}>
            {['Solutions', 'Developers', 'Pricing', 'Company'].map(item => (
              <a key={item} href="#" style={{
                color: '#4B5563',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                opacity: 0.8,
                transition: 'opacity 0.2s',
                letterSpacing: '-0.01em'
              }}>{item}</a>
            ))}
          </div>
          <button style={{
            background: '#111827',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '12px',
            fontSize: '0.9rem',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'transform 0.1s',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Main Content - Overlapping Layers */}
      <main style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '0 5%'
      }}>

        {/* Centered Image Layer */}
        <div style={{
          position: 'absolute',
          top: '55%',
          left: '60%',
          transform: 'translate(-50%, -50%)',
          width: '55vw',
          maxWidth: '900px',
          height: '80vh',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}>
          <img
            src={heroSculpture}
            alt="Abstract Voice Sculpture"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              // Multiply blend mode helps white bg images blend onto light backgrounds
              mixBlendMode: 'multiply',
              opacity: 0.9,
              filter: 'saturate(1.05) contrast(1.02)',
              // Larger, softer radial gradient mask for seamless blending
              WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 45%, black 30%, transparent 85%)',
              maskImage: 'radial-gradient(ellipse 60% 60% at 50% 45%, black 30%, transparent 85%)'
            }}
          />
        </div>

        {/* Text Layer (Overlapping) */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          marginTop: '-60px'
        }}>
          {/* Tagline */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#4F46E5',
            fontSize: '0.85rem',
            fontWeight: 700,
            background: '#EEF2FF',
            padding: '6px 12px',
            borderRadius: '100px',
            marginTop: '50px',
            marginLeft: '0px',
            marginBottom: '32px',
            border: '1px solid #E0E7FF'
          }}>
            <div style={{
              width: '16px', height: '16px', borderRadius: '50%', background: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <ArrowUpRight size={10} color="#fff" strokeWidth={4} />
            </div>
            ENTERPRISE VOICE AI
          </div>

          <h1 style={{
            fontSize: 'clamp(4rem, 7vw, 8rem)',
            fontWeight: '800',
            lineHeight: '0.9',
            letterSpacing: '-0.04em',
            color: '#111827',
            marginBottom: '0',
            maxWidth: '1200px'
          }}>
            The New <br />
            Standard for <br />
            Enterprise <br />
            <span style={{
              background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Voice AI</span>
          </h1>
        </div>

        {/* Annotations - Sleek Glass Pills with Icons */}
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '42%',
          zIndex: 3,
          transform: 'rotate(-3deg)'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(16px)',
            padding: '12px 20px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
            border: '1px solid rgba(255,255,255,0.6)'
          }}>
            <div style={{ padding: '6px', background: '#FEF3C7', borderRadius: '8px', color: '#B45309' }}>
              <Zap size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Latency</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>Sub-human Speed</div>
            </div>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          top: '50%',
          right: '25%',
          zIndex: 3,
          transform: 'rotate(3deg)'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(16px)',
            padding: '12px 20px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
            border: '1px solid rgba(255,255,255,0.6)'
          }}>
            <div style={{ padding: '6px', background: '#E0E7FF', borderRadius: '8px', color: '#4338CA' }}>
              <LinkIcon size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Integration</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>Seamless API</div>
            </div>
          </div>
        </div>


        {/* Card Mockup on Right - Sleek Stats */}
        <div style={{
          position: 'absolute',
          bottom: '5%',
          right: '8%',
          zIndex: 4,
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(20px)',
          padding: '20px',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.5)',
          width: '200px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.06)'
        }}>
          <div style={{
            marginBottom: '20px',
            color: '#059669',
            display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600
          }}>
            {/* <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#059669' }}></div> */}
            <Cloud size={20} color="#059669" />
            System Operational
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827', marginBottom: '4px', letterSpacing: '-0.03em', lineHeight: 1 }}>99.99%</div>
          <div style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: '1.4', fontWeight: 500 }}>Guaranteed Uptime</div>
        </div>

      </main>

      {/* Dark Footer Bar - Clean & Icon-based */}
      <footer style={{
        width: '100%',
        maxWidth: '700px',
        margin: '20px auto 12px auto',
        padding: '10px 24px',
        background: '#111827',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
        zIndex: 50,
        borderRadius: '16px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '100px' }}>
            <ShieldCheck size={18} color="#A7F3D0" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#F9FAFB' }}>Trusted by 500+ Enterprises</span>
          </div>
        </div>

        <button style={{
          background: '#fff',
          color: '#111827',
          padding: '12px 24px',
          borderRadius: '10px',
          fontSize: '0.9rem',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'transform 0.1s'
        }}>
          Start Deploying <ArrowUpRight size={18} />
        </button>
      </footer>
    </div>
  );
}

export default App;
