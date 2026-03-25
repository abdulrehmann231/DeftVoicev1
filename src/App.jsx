import React from 'react';
import './index.css';
import heroSculpture from './assets/hero_sculpture_v2.png';
import { Zap, Link as LinkIcon, Activity, ArrowUpRight, Cloud, ShieldCheck, Phone, Globe, Calendar, MessageSquare, Users, Headphones } from 'lucide-react';
import Portfolio from './Portfolio';

function App() {
  const [currentView, setCurrentView] = React.useState('home');

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setCurrentView('home')}>
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
            {['Portfolio', 'Developers', 'Company'].map(item => (
              <a 
                key={item} 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (item === 'Portfolio') setCurrentView('portfolio');
                  if (item === 'Developers') setCurrentView('developers');
                  if (item === 'Company') setCurrentView('company');
                }}
                style={{
                  color: (currentView === item.toLowerCase()) ? '#111827' : '#4B5563',
                  fontSize: '0.9rem',
                  fontWeight: (currentView === item.toLowerCase()) ? 700 : 600,
                  textDecoration: 'none',
                  opacity: (currentView === item.toLowerCase()) ? 1 : 0.8,
                  transition: 'opacity 0.2s',
                  letterSpacing: '-0.01em'
                }}
              >
                {item}
              </a>
            ))}
          </div>
          <a
            href="https://cal.com/deftvoice"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#111827',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '12px',
              fontSize: '0.9rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'transform 0.1s',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Main Content Areas */}
      {currentView === 'home' && (
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
      )}

      {currentView === 'portfolio' && (
        <main style={{
          flex: 1,
          width: '100%',
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '0 5%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
            <Portfolio />
        </main>
      )}

      {currentView === 'developers' && (
        <main style={{
          flex: 1,
          width: '100%',
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '60px 5% 80px',
          boxSizing: 'border-box',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
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
              marginBottom: '20px',
              border: '1px solid #E0E7FF'
            }}>
              <ShieldCheck size={14} />
              THE TEAM
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#111827',
              margin: '0 0 12px 0',
              lineHeight: 1.1,
            }}>
              Meet the Developers
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#6B7280', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
              The engineers behind DeftVoice — building intelligent voice AI experiences.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '32px',
          }}>
            {/* Abdul Rehman */}
            <div style={{
              background: '#fff',
              borderRadius: '24px',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.06)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{
                padding: '36px 32px 28px',
                background: 'linear-gradient(135deg, #4F46E512 0%, #ffffff 100%)',
                borderBottom: '1px solid rgba(0,0,0,0.04)',
              }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  marginBottom: '20px',
                  boxShadow: '0 8px 24px rgba(79,70,229,0.3)',
                }}>
                  A
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>
                  Abdul Rehman
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#4F46E5', fontWeight: 600, margin: '0 0 12px 0' }}>
                  Full-Stack Developer & AI Engineer
                </p>
                <p style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
                  Full-stack developer specializing in AI-driven solutions, RAG-based applications, and scalable SaaS platforms. CS student at FAST NUCES, Karachi.
                </p>
              </div>

              <div style={{ padding: '24px 32px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                    Tech Stack
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {['React', 'Next.js', 'Node.js', 'Python', 'TypeScript', 'Spring Boot', 'RAG', 'PostgreSQL'].map(t => (
                      <span key={t} style={{
                        padding: '4px 10px',
                        borderRadius: '8px',
                        background: '#F3F4F6',
                        color: '#374151',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                    Experience
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#111827', fontWeight: 600 }}>Software Engineer <span style={{ color: '#9CA3AF', fontWeight: 500 }}>· Gitwit</span></div>
                    <div style={{ fontSize: '0.85rem', color: '#111827', fontWeight: 600 }}>Full-Stack Developer <span style={{ color: '#9CA3AF', fontWeight: 500 }}>· Softject</span></div>
                    <div style={{ fontSize: '0.85rem', color: '#111827', fontWeight: 600 }}>Backend Intern <span style={{ color: '#9CA3AF', fontWeight: 500 }}>· CDC Pakistan</span></div>
                  </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
                  <a
                    href="https://www.abdulrehmann.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 20px',
                      borderRadius: '12px',
                      background: '#111827',
                      color: '#fff',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                      transition: 'transform 0.15s ease',
                    }}
                  >
                    View Portfolio <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>

            {/* Burhan Khatri */}
            <div style={{
              background: '#fff',
              borderRadius: '24px',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.06)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{
                padding: '36px 32px 28px',
                background: 'linear-gradient(135deg, #06B6D412 0%, #ffffff 100%)',
                borderBottom: '1px solid rgba(0,0,0,0.04)',
              }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #06B6D4, #0891B2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  marginBottom: '20px',
                  boxShadow: '0 8px 24px rgba(6,182,212,0.3)',
                }}>
                  B
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>
                  Burhanuddin Khatri
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#0891B2', fontWeight: 600, margin: '0 0 12px 0' }}>
                  Software Engineer — ML & Cloud Architecture
                </p>
                <p style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
                  Designs intelligent systems and code to empower human agency. Specializing in Machine Learning, Cloud Architecture, and Full-Stack Development.
                </p>
              </div>

              <div style={{ padding: '24px 32px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                    Tech Stack
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {['Python', 'React', 'Next.js', 'TypeScript', 'Gatsby', 'Azure', 'Streamlit', 'GraphQL'].map(t => (
                      <span key={t} style={{
                        padding: '4px 10px',
                        borderRadius: '8px',
                        background: '#F3F4F6',
                        color: '#374151',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                    Notable Projects
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#111827', fontWeight: 600 }}>Orbit <span style={{ color: '#9CA3AF', fontWeight: 500 }}>· Physics-Informed Orbit Determination</span></div>
                    <div style={{ fontSize: '0.85rem', color: '#111827', fontWeight: 600 }}>Vault <span style={{ color: '#9CA3AF', fontWeight: 500 }}>· Azure File Management System</span></div>
                    <div style={{ fontSize: '0.85rem', color: '#111827', fontWeight: 600 }}>Flux <span style={{ color: '#9CA3AF', fontWeight: 500 }}>· AI Circuit Design Tool</span></div>
                  </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
                  <a
                    href="https://www.burhankhatri.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 20px',
                      borderRadius: '12px',
                      background: '#111827',
                      color: '#fff',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                      transition: 'transform 0.15s ease',
                    }}
                  >
                    View Portfolio <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {currentView === 'company' && (
        <main style={{
          flex: 1,
          width: '100%',
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '60px 5% 80px',
          boxSizing: 'border-box',
        }}>
          {/* Hero */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
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
              marginBottom: '20px',
              border: '1px solid #E0E7FF'
            }}>
              <Activity size={14} />
              ABOUT DEFTVOICE
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#111827',
              margin: '0 0 16px 0',
              lineHeight: 1.1,
            }}>
              We Build AI Agents<br />
              <span style={{
                background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>For Your Business</span>
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#6B7280', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
              We are an AI vendor that builds custom voice and chat agents tailored to your business needs — from handling customer calls and chats to bookings and support.
            </p>
          </div>

          {/* What We Do - Feature Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            marginBottom: '64px',
          }}>
            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '32px 28px',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 12px 36px rgba(0,0,0,0.05)',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                marginBottom: '20px',
                boxShadow: '0 6px 18px rgba(79,70,229,0.3)',
              }}>
                <Users size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', margin: '0 0 8px 0' }}>
                Custom AI Agents
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
                We design and build AI agents specifically for your business — whether it's customer support, appointment booking, FAQs, or lead qualification.
              </p>
            </div>

            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '32px 28px',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 12px 36px rgba(0,0,0,0.05)',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #06B6D4, #0891B2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                marginBottom: '20px',
                boxShadow: '0 6px 18px rgba(6,182,212,0.3)',
              }}>
                <Globe size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', margin: '0 0 8px 0' }}>
                Website Integration
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
                Connect your AI agent directly to your website so visitors can talk or chat with it instantly — no extra apps or downloads needed.
              </p>
            </div>

            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '32px 28px',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 12px 36px rgba(0,0,0,0.05)',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #10B981, #059669)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                marginBottom: '20px',
                boxShadow: '0 6px 18px rgba(16,185,129,0.3)',
              }}>
                <Phone size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', margin: '0 0 8px 0' }}>
                Phone Number Support
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
                Your AI agent can also be connected to a phone number — customers call and the agent handles conversations just like a real person.
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '48px 40px',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.06)',
            marginBottom: '48px',
          }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
                How It Works
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#6B7280', margin: 0 }}>
                Three simple steps to get your AI agent up and running.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
              {[
                { step: '01', title: 'Book a Meeting', desc: 'Schedule a consultation call where we understand your business, use case, and requirements.', icon: Calendar },
                { step: '02', title: 'We Build Your Agent', desc: 'Our team designs and trains a custom AI agent tailored specifically to your business needs.', icon: Headphones },
                { step: '03', title: 'Go Live', desc: 'We connect the agent to your website or phone number — and your customers start getting instant AI support.', icon: Zap },
              ].map(({ step, title, desc, icon: Icon }) => (
                <div key={step} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#4F46E5',
                    letterSpacing: '0.1em',
                    marginBottom: '12px',
                  }}>
                    STEP {step}
                  </div>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '16px',
                    background: '#F3F4F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: '#374151',
                  }}>
                    <Icon size={24} />
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', margin: '0 0 8px 0' }}>
                    {title}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{
            background: 'linear-gradient(135deg, #111827 0%, #1F2937 100%)',
            borderRadius: '24px',
            padding: '48px 40px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 20% 50%, rgba(79,70,229,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(6,182,212,0.15) 0%, transparent 50%)',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: '0 0 12px 0', letterSpacing: '-0.02em' }}>
                Ready to Automate Your Customer Communication?
              </h3>
              <p style={{ fontSize: '1rem', color: '#9CA3AF', margin: '0 0 28px 0', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
                Book a free consultation and let us show you how an AI agent can work for your business.
              </p>
              <a
                href="https://cal.com/deftvoice"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 28px',
                  borderRadius: '14px',
                  background: '#fff',
                  color: '#111827',
                  fontSize: '1rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                  transition: 'transform 0.15s ease',
                }}
              >
                <Calendar size={18} />
                Book a Meeting
              </a>
            </div>
          </div>
        </main>
      )}

      
    </div>
  );
}

export default App;
