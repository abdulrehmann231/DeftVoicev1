import React, { useState } from 'react';
import { MessageSquare, Phone, Mic, User, Activity, Globe, Zap, CheckCircle } from 'lucide-react';

const agents = [
  { 
    id: 'aria', 
    name: 'Aria', 
    role: 'Customer Success', 
    color: '#4F46E5', // Indigo
    description: 'Empathetic and precise. Aria handles complex queries with a human touch.',
    stats: { speed: '0.4s', satisfaction: '99%' }
  },
  { 
    id: 'atlas', 
    name: 'Atlas', 
    role: 'Global Sales', 
    color: '#D946EF', // Fuchsia
    description: ' persuasive and strategic. Atlas drives conversions across multiple languages.',
    stats: { speed: '0.6s', satisfaction: '96%' }
  },
  { 
    id: 'nova', 
    name: 'Nova', 
    role: 'Tech Support', 
    color: '#06B6D4', // Cyan
    description: 'Technical and efficient. Nova troubleshoots issues faster than any human.',
    stats: { speed: '0.2s', satisfaction: '99.9%' }
  }
];

const Portfolio = () => {
  const [selectedAgentId, setSelectedAgentId] = useState(agents[0].id);
  const selectedAgent = agents.find(a => a.id === selectedAgentId);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '80vh',
      display: 'flex',
      gap: '40px',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 0',
      boxSizing: 'border-box'
    }}>
      
      {/* LEFT: Agent Selector (Minimal List) */}
      <div style={{
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h3 style={{ 
          fontSize: '0.8rem', 
          fontWeight: 700, 
          color: '#9CA3AF', 
          textTransform: 'uppercase', 
          letterSpacing: '0.1em',
          marginBottom: '10px'
        }}>
          Select Agent
        </h3>
        
        {agents.map((agent) => {
          const isSelected = selectedAgentId === agent.id;
          return (
            <div 
              key={agent.id}
              onClick={() => setSelectedAgentId(agent.id)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                borderRadius: '16px',
                background: isSelected ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
                boxShadow: isSelected ? '0 10px 30px rgba(0,0,0,0.05)' : 'none',
                transition: 'all 0.3s ease',
                border: isSelected ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: isSelected ? agent.color : '#E5E7EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isSelected ? '#fff' : '#9CA3AF',
                transition: 'background 0.3s ease'
              }}>
                <User size={20} />
              </div>
              <div>
                <div style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: isSelected ? 700 : 500, 
                  color: isSelected ? '#111827' : '#6B7280' 
                }}>
                  {agent.name}
                </div>
                <div style={{ 
                  fontSize: '0.85rem', 
                  color: isSelected ? agent.color : '#9CA3AF',
                  fontWeight: 500 
                }}>
                  {agent.role}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* RIGHT: Main Stage (Interactive Area) */}
      <div style={{
        flex: 1,
        maxWidth: '800px',
        height: '600px',
        background: '#fff',
        borderRadius: '32px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0,0,0,0.05)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {/* Header/Banner of the Stage */}
        <div style={{
          padding: '40px',
          background: `linear-gradient(135deg, ${selectedAgent.color}0D 0%, #fff 100%)`,
          borderBottom: '1px solid rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ fontSize: '3rem', fontWeight: 800, margin: 0, color: '#111827', letterSpacing: '-0.03em' }}>
                {selectedAgent.name}
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#6B7280', margin: '8px 0 0 0', maxWidth: '400px', lineHeight: 1.5 }}>
                {selectedAgent.description}
              </p>
            </div>
            
            {/* Stats Pills */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ background: '#F3F4F6', padding: '8px 16px', borderRadius: '100px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Zap size={16} color="#4B5563" /> <span style={{ fontWeight: 600, color: '#374151' }}>{selectedAgent.stats.speed} Latency</span>
              </div>
              <div style={{ background: '#F3F4F6', padding: '8px 16px', borderRadius: '100px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <CheckCircle size={16} color="#4B5563" /> <span style={{ fontWeight: 600, color: '#374151' }}>{selectedAgent.stats.satisfaction} CSAT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Placeholder Area */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}>
          
          {/* Abstract Visualizer Code (Simulated) */}
          <div style={{
             width: '200px',
             height: '200px',
             borderRadius: '50%',
             background: selectedAgent.color,
             opacity: 0.1,
             filter: 'blur(40px)',
             position: 'absolute',
             animation: 'pulse 3s infinite ease-in-out'
          }}></div>
          
          <div style={{ zIndex: 10, textAlign: 'center' }}>
             <Mic size={64} color={selectedAgent.color} style={{ marginBottom: '24px', opacity: 0.8 }} />
             <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#374151' }}>
               Voice Interface Ready
             </div>
             <p style={{ color: '#9CA3AF', marginBottom: '32px' }}>Click to start a conversation</p>
             
             <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
               <button style={{
                 padding: '12px 24px',
                 borderRadius: '16px',
                 border: 'none',
                 background: '#111827',
                 color: '#fff',
                 fontWeight: 600,
                 display: 'flex',
                 alignItems: 'center',
                 gap: '8px',
                 cursor: 'pointer',
                 fontSize: '1rem',
                 boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
               }}>
                 <Phone size={18} /> Voice Call
               </button>
               <button style={{
                 padding: '12px 24px',
                 borderRadius: '16px',
                 border: '1px solid #E5E7EB',
                 background: '#fff',
                 color: '#374151',
                 fontWeight: 600,
                 display: 'flex',
                 alignItems: 'center',
                 gap: '8px',
                 cursor: 'pointer',
                 fontSize: '1rem'
               }}>
                 <MessageSquare size={18} /> Chat Demo
               </button>
             </div>
          </div>

        </div>

        {/* Bottom Bar: Live Transcript / Status */}
        <div style={{
          padding: '20px',
          borderTop: '1px solid #F3F4F6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#9CA3AF',
          fontSize: '0.9rem'
        }}>
           <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
             <div style={{ width: '8px', height: '8px', background: '#22C55E', borderRadius: '50%' }}></div>
             Online & Ready
           </div>
           <div>
             Powered by DeftVoice Engine v2.1
           </div>
        </div>

      </div>
    </div>
  );
};

export default Portfolio;
