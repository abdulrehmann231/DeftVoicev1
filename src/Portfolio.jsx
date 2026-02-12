import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Phone, Mic, User, Zap, CheckCircle } from 'lucide-react';
import { useConversation } from '@elevenlabs/react';

const agents = [
  { 
    id: 'deftvoice-guide', 
    elevenAgentId: 'agent_3801kfk490gmf4mshm57y9ptsf55',
    name: 'DeftVoice Guide', 
    role: 'Product & Platform Expert', 
    color: '#4F46E5',
    description: 'Ask me anything about DeftVoice, our roadmap, and how we can power your AI voice experiences.',
    stats: { speed: '0.4s', satisfaction: '99%' }
  },
  { 
    id: 'hotel-concierge', 
    elevenAgentId: 'agent_0601kefqds0aeshan4d3ssd1405b',
    name: 'Hotel Concierge', 
    role: 'Hotel Reservations', 
    color: '#06B6D4',
    description: 'Tell me your dates, budget, and preferences – I will search, compare and book rooms for you in seconds.',
    stats: { speed: '0.3s', satisfaction: '98%' }
  }
];

const Portfolio = () => {
  const [selectedAgentId, setSelectedAgentId] = useState(agents[0].id);
  const [activeAgentId, setActiveAgentId] = useState(null);
  // Keep a separate chat history per agent: { [agentId]: Message[] }
  const [agentMessages, setAgentMessages] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('voice'); // 'voice' | 'chat'
  const [sessionMode, setSessionMode] = useState(null); // actual mode of current ElevenLabs session
  const chatInputRef = useRef(null);
  const modeRef = useRef('voice');

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  // ElevenLabs React SDK conversation: used for both voice and chat,
  // but UI shows one mode at a time.
  const conversation = useConversation({
    textOnly: mode === 'chat',
    onMessage: (message) => {
      console.log('[DeftVoice · ElevenLabs] onMessage raw', message);

      // Only render into the chat UI when we're in chat mode (using latest mode via ref)
      if (!message || modeRef.current !== 'chat') return;

      try {
        // Simplest, SDK-normalised shape: { source: 'ai', role: 'agent', message: '...' }
        if (message.role === 'agent' && typeof message.message === 'string') {
          console.log('[DeftVoice · ElevenLabs] normalised agent message → append', message.message);
          const agentIdForMessage = activeAgentId || selectedAgentId;
          if (!agentIdForMessage) return;

          setAgentMessages((prev) => {
            const existing = prev[agentIdForMessage] || [];
            return {
              ...prev,
              [agentIdForMessage]: [
                ...existing,
                { id: `${Date.now()}-agent`, sender: 'agent', text: message.message },
              ],
            };
          });
          return;
        }

        const type = message.type;

        // Full final agent response (voice/chat low-level events)
        const agentText =
          message.agent_response_event?.agent_response ||
          message.agentResponseEvent?.agentResponse ||
          message.agent_response ||
          message.text ||
          '';

        if ((type === 'agent_response' || type === 'agentResponse') && agentText) {
          console.log('[DeftVoice · ElevenLabs] agent_response → append', agentText);
          const agentIdForMessage = activeAgentId || selectedAgentId;
          if (!agentIdForMessage) return;

          setAgentMessages((prev) => {
            const existing = prev[agentIdForMessage] || [];
            return {
              ...prev,
              [agentIdForMessage]: [
                ...existing,
                { id: `${Date.now()}-agent-final`, sender: 'agent', text: agentText },
              ],
            };
          });
          return;
        }

        // Streaming chat responses in chat mode (when SDK exposes them)
        const part = message.text_response_part || message.textResponsePart || null;
        if (part && part.text) {
          const partType = part.type || part.partType || '';

          // Only show once, when the stream ends.
          if (partType === 'stop' || partType === 'final') {
            console.log('[DeftVoice · ElevenLabs] text_response_part (final) → append', part.text);
            const agentIdForMessage = activeAgentId || selectedAgentId;
            if (!agentIdForMessage) return;

            setAgentMessages((prev) => {
              const existing = prev[agentIdForMessage] || [];
              return {
                ...prev,
                [agentIdForMessage]: [
                  ...existing,
                  { id: `${Date.now()}-agent-chat`, sender: 'agent', text: part.text },
                ],
              };
            });
          }
        }
      } catch (err) {
        console.error('[DeftVoice · ElevenLabs] Error in onMessage handler', err);
      }
    },
    onError: (err) => {
      console.error('ElevenLabs conversation error', err);
      setError('Connection issue. Please try again.');
    },
    onStatusChange: (status) => {
      if (status === 'disconnected') {
        setActiveAgentId(null);
        setIsStarting(false);
      }
    },
  });

  const selectedAgent = agents.find(a => a.id === selectedAgentId);

  // Ensure ElevenLabs React SDK session is started (voice or chat)
  const ensureSession = async (targetMode) => {
    if (!selectedAgent) return;

    setError('');

    const desiredMode = targetMode || mode;

    // If already connected with same agent and same mode, reuse the session
    if (
      conversation.status === 'connected' &&
      activeAgentId === selectedAgent.id &&
      sessionMode === desiredMode
    ) {
      return;
    }

    // If connected but in the wrong mode (voice vs chat), restart the session cleanly
    if (
      conversation.status === 'connected' &&
      activeAgentId === selectedAgent.id &&
      sessionMode &&
      sessionMode !== desiredMode
    ) {
      try {
        await conversation.endSession();
      } catch (e) {
        console.warn('Ending previous ElevenLabs session failed (continuing anyway)', e);
      }
      setActiveAgentId(null);
    }

    try {
      setIsStarting(true);

      // Only ask for microphone access for voice calls
      if (desiredMode === 'voice') {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      }

      await conversation.startSession({
        agentId: selectedAgent.elevenAgentId,
        connectionType: 'websocket',
        userId: 'deftvoice-portfolio-demo',
      });

      setActiveAgentId(selectedAgent.id);
      setSessionMode(desiredMode);
    } catch (err) {
      console.error('Failed to start ElevenLabs session', err);
      if (err && err.name === 'NotAllowedError') {
        setError('Please allow microphone access in your browser to talk to the agent.');
      } else {
        setError('Unable to connect to the agent. Please refresh and try again.');
      }
    } finally {
      setIsStarting(false);
    }
  };

  const handleToggleCall = async () => {
    // Explicitly switch into voice mode
    setMode('voice');
    setError('');

    if (conversation.status === 'connected' && activeAgentId === selectedAgentId) {
      try {
        await conversation.endSession();
        setActiveAgentId(null);
      } catch (err) {
        console.error('Error ending conversation', err);
        setError('Unable to end the call cleanly, but the session was closed.');
      }
      return;
    }

    await ensureSession('voice');
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    // Append to this agent's chat history only
    setAgentMessages((prev) => {
      const existing = prev[selectedAgentId] || [];
      return {
        ...prev,
        [selectedAgentId]: [
          ...existing,
          { id: `${Date.now()}-local-user`, sender: 'user', text: trimmed },
        ],
      };
    });
    setInputValue('');
    setError('');

    try {
      console.log('[DeftVoice · ElevenLabs] handleSendMessage via SDK', {
        mode,
        trimmed,
        status: conversation.status,
        activeAgentId,
        selectedAgentId,
      });

      // Chat messages should never rely on microphone input
      if (mode !== 'chat') {
        setMode('chat');
      }

      if (
        conversation.status !== 'connected' ||
        activeAgentId !== selectedAgentId ||
        sessionMode !== 'chat'
      ) {
        await ensureSession('chat');
      }

      await conversation.sendUserMessage(trimmed);
    } catch (err) {
      console.error('Error sending message to ElevenLabs agent', err);
      setError('Could not send your message. Please try again.');
    }
  };

  const handleFocusChat = async () => {
    // Switch into chat mode, connect immediately as text-only, and focus the input.
    if (mode !== 'chat') {
      setMode('chat');
    }
    await ensureSession('chat');

    if (chatInputRef.current) {
      chatInputRef.current.focus();
    }
  };

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
        flexDirection: 'column',
        minHeight: 0,
      }}>
        
        {/* Header/Banner of the Stage */}
        <div style={{
          padding: '32px 32px 24px',
          background: `linear-gradient(135deg, ${selectedAgent.color}12 0%, #ffffff 100%)`,
          borderBottom: '1px solid rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 800, margin: 0, color: '#111827', letterSpacing: '-0.03em' }}>
                {selectedAgent.name}
              </h2>
              <p style={{ fontSize: '1rem', color: '#6B7280', margin: '8px 0 0 0', maxWidth: '460px', lineHeight: 1.6 }}>
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

        {/* Interactive Area: Voice OR Chat (single mode at a time) */}
        <div style={{
          flex: 1,
          padding: '20px 24px 16px',
          position: 'relative',
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'center',
          minHeight: 0,
        }}>
          {mode === 'voice' ? (
            /* Voice-only layout */
            <div style={{
              flex: 1,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '24px',
              background: '#F9FAFB',
              overflow: 'hidden',
              padding: '24px 20px',
            }}>
              {/* Abstract Visualizer */}
              <div style={{
                position: 'absolute',
                inset: '-40%',
                background: `radial-gradient(circle at 0% 0%, ${selectedAgent.color}26 0, transparent 55%), radial-gradient(circle at 100% 100%, #0EA5E926 0, transparent 55%)`,
                filter: 'blur(12px)',
                opacity: 0.9,
              }} />

              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <div style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.9)',
                  border: `2px solid ${selectedAgent.color}33`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 18px 45px rgba(15,23,42,0.12)',
                }}>
                  <div style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '999px',
                    background: conversation.status === 'connected' && activeAgentId === selectedAgentId
                      ? selectedAgent.color
                      : '#111827',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow: '0 15px 35px rgba(15,23,42,0.45)',
                    position: 'relative',
                  }}>
                    <Mic size={40} />
                    {conversation.isSpeaking && (
                      <div style={{
                        position: 'absolute',
                        inset: '-8px',
                        borderRadius: '999px',
                        border: '2px solid rgba(255,255,255,0.45)',
                        opacity: 0.85,
                      }} />
                    )}
                  </div>
                </div>

                <div style={{ fontSize: '1.15rem', fontWeight: 600, color: '#111827', marginBottom: 6 }}>
                  {conversation.status === 'connected' && activeAgentId === selectedAgentId
                    ? 'Live voice connected'
                    : 'Voice interface ready'}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#6B7280', marginBottom: 18 }}>
                  {conversation.status === 'connected' && activeAgentId === selectedAgentId
                    ? 'Start speaking normally, the agent is listening.'
                    : 'Click the button below to start a live call with this agent.'}
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <button
                    onClick={handleToggleCall}
                    disabled={isStarting}
                    style={{
                      padding: '12px 22px',
                      borderRadius: '999px',
                      border: 'none',
                      background:
                        conversation.status === 'connected' && activeAgentId === selectedAgentId
                          ? '#DC2626'
                          : '#111827',
                      color: '#fff',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: isStarting ? 'not-allowed' : 'pointer',
                      fontSize: '0.95rem',
                      boxShadow: '0 10px 30px rgba(15,23,42,0.45)',
                      opacity: isStarting ? 0.7 : 1,
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease',
                    }}
                  >
                    <Phone size={18} />
                    {conversation.status === 'connected' && activeAgentId === selectedAgentId
                      ? 'End Call'
                      : isStarting
                        ? 'Connecting…'
                        : 'Start Voice Call'}
                  </button>
                  <button
                    type="button"
                    onClick={handleFocusChat}
                    style={{
                      padding: '12px 18px',
                      borderRadius: '999px',
                      border: '1px solid #E5E7EB',
                      background: '#ffffff',
                      color: '#374151',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                    }}
                  >
                    <MessageSquare size={18} /> Switch to Chat
                  </button>
                </div>

                <div style={{ marginTop: 14, fontSize: '0.78rem', color: '#9CA3AF' }}>
                  Powered by ElevenLabs realtime voice · Optimized for Chrome
                </div>
              </div>
            </div>
          ) : (
            /* Chat-only layout */
            <div style={{
              flex: 1,
              borderRadius: '24px',
              background: '#F9FAFB',
              border: '1px solid #E5E7EB',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              minHeight: 0,
            }}>
              <div style={{
                padding: '14px 16px 10px',
                borderBottom: '1px solid #E5E7EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'linear-gradient(90deg, #FFFFFF 0%, #F9FAFB 100%)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '999px',
                    background: selectedAgent.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                  }}>
                    {selectedAgent.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#111827' }}>
                      {selectedAgent.name} Chat
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                      {conversation.status === 'connected' && activeAgentId === selectedAgentId
                        ? 'Live and responding instantly'
                        : 'Type a message to start a smart chat'}
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  background: 'rgba(16,185,129,0.08)',
                  color: '#059669',
                  fontWeight: 600,
                }}>
                  {conversation.status === 'connected' && activeAgentId === selectedAgentId
                    ? 'Connected'
                    : 'Ready'}
                </div>
              </div>

              <div style={{
                flex: 1,
                padding: '12px 14px',
                overflowY: 'auto',
                overscrollBehavior: 'contain',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                minHeight: 0,
              }}>
                {(!agentMessages[selectedAgentId] || agentMessages[selectedAgentId].length === 0) && (
                  <div style={{
                    fontSize: '0.86rem',
                    color: '#9CA3AF',
                    textAlign: 'center',
                    marginTop: '6px',
                  }}>
                    Try asking “What can you do?” or “How does DeftVoice work?”
                  </div>
                )}

                {(agentMessages[selectedAgentId] || []).map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div style={{
                      maxWidth: '85%',
                      padding: '8px 11px',
                      borderRadius: msg.sender === 'user'
                        ? '16px 16px 4px 16px'
                        : '16px 16px 16px 4px',
                      fontSize: '0.9rem',
                      lineHeight: 1.45,
                      background: msg.sender === 'user' ? '#111827' : '#FFFFFF',
                      color: msg.sender === 'user' ? '#F9FAFB' : '#111827',
                      boxShadow: '0 8px 20px rgba(15,23,42,0.08)',
                      border: msg.sender === 'user'
                        ? '1px solid #111827'
                        : '1px solid #E5E7EB',
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleSendMessage}
                style={{
                  padding: '10px 12px',
                  borderTop: '1px solid #E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#F9FAFB',
                }}
              >
                <input
                  ref={chatInputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a question or instruction…"
                  style={{
                    flex: 1,
                    borderRadius: '999px',
                    border: '1px solid #E5E7EB',
                    padding: '9px 14px',
                    fontSize: '0.9rem',
                    outline: 'none',
                    color: '#111827',
                    background: '#FFFFFF',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '999px',
                    border: 'none',
                    background: inputValue.trim() ? '#111827' : '#9CA3AF',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                    transition: 'background 0.15s ease',
                  }}
                >
                  <MessageSquare size={16} />
                </button>
              </form>
            </div>
          )}

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
             <div style={{
               width: '8px',
               height: '8px',
               borderRadius: '50%',
               background:
                 conversation.status === 'connected' && activeAgentId === selectedAgentId
                   ? '#22C55E'
                   : '#D1D5DB',
             }}></div>
             {conversation.status === 'connected' && activeAgentId === selectedAgentId
               ? 'Live agent connected'
               : 'Online & ready to start a conversation'}
           </div>
           <div>
             {error ? (
               <span style={{ color: '#DC2626' }}>{error}</span>
             ) : (
               <span>Powered by DeftVoice · ElevenLabs Agents</span>
             )}
           </div>
        </div>

      </div>
    </div>
  );
};

export default Portfolio;
