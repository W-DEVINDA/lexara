// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
// Function to generate defense counsel response for pre-hearing
async function generateDefenseCounselResponse(conversationHistory, plaintiffMessage, roundTopic) {
  const messages = [
    {
      role: "system",
      content: `You are an experienced Defense Counsel in a Malaysian court pre-hearing session. The current round topic is: "${roundTopic}".

Your role:
- Provide realistic, professional legal counterarguments
- Challenge the plaintiff's points using Malaysian law (AMLA, Evidence Act, etc.)
- Reference relevant case law when appropriate (PP v. Najib, PP v. Nordin, etc.)
- Question evidence quality, procedural issues, and burden of proof
- Stay focused on the round topic
- Keep responses concise (2-4 sentences, max 100 words)
- Be adversarial but professional

Do NOT be agreeable. Your job is to defend your client vigorously within legal bounds.`
    }
  ];
  
  // Add conversation history (last 4 exchanges = 8 messages)
  if (conversationHistory && conversationHistory.length > 0) {
    conversationHistory.slice(-8).forEach(msg => {
      messages.push({
        role: msg.role === 'defense' ? 'assistant' : 'user',
        content: msg.content
      });
    });
  }
  
  // Add current plaintiff message
  messages.push({
    role: "user",
    content: plaintiffMessage
  });

  const response = await fetch(
    'https://router.huggingface.co/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3.1-8B-Instruct",
        messages: messages,
        max_tokens: 150,
        temperature: 0.8,
        stream: false
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Hugging Face API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data;
}
// Function to generate plaintiff counsel response for pre-hearing
async function generatePlaintiffCounselResponse(conversationHistory, defenseMessage, roundTopic) {
  const messages = [
    {
      role: "system",
      content: `You are an experienced Plaintiff Counsel (Prosecution) in a Malaysian court pre-hearing session. The current round topic is: "${roundTopic}".

Your role:
- Present strong legal arguments supporting the prosecution's case
- Reference Malaysian law (AMLA, Evidence Act, Penal Code, etc.)
- Cite relevant precedents (PP v. Najib, PP v. Nordin, etc.)
- Establish burden of proof and present evidence
- Counter defense arguments effectively
- Stay focused on the round topic
- Keep responses concise (2-4 sentences, max 100 words)
- Be assertive but professional

Present your case vigorously within legal and ethical bounds.`
    }
  ];
  
  // Add conversation history (last 4 exchanges = 8 messages)
  if (conversationHistory && conversationHistory.length > 0) {
    conversationHistory.slice(-8).forEach(msg => {
      messages.push({
        role: msg.role === 'plaintiff' ? 'assistant' : 'user',
        content: msg.content
      });
    });
  }
  
  // Add current defense message
  messages.push({
    role: "user",
    content: defenseMessage
  });

  const response = await fetch(
    'https://router.huggingface.co/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3.1-8B-Instruct",
        messages: messages,
        max_tokens: 150,
        temperature: 0.8,
        stream: false
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Hugging Face API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data;
}
// Function to analyze conversation and generate strategy update
async function analyzeForStrategyUpdate(conversationHistory, roundTopic) {
  const recentExchanges = conversationHistory.slice(-4); // Last 2 exchanges
  const conversationText = recentExchanges.map(msg => 
    `${msg.role === 'defense' ? 'Defense' : 'Plaintiff'}: ${msg.content}`
  ).join('\n');

  const messages = [
    {
      role: "system",
      content: `You are analyzing a legal pre-hearing conversation on "${roundTopic}". 

Identify if ANY significant legal points were made in the recent exchange:
- New evidence introduced
- Legal precedents cited
- Procedural challenges raised
- Key facts established

Respond with ONLY a JSON object (no markdown, no extra text):
{
  "hasSignificantPoint": true/false,
  "strategyUpdate": "1-2 sentence strategy point" OR null,
  "citationUpdate": "Case name and 1-line relevance" OR null
}

If no significant points, respond: {"hasSignificantPoint": false, "strategyUpdate": null, "citationUpdate": null}`
    },
    {
      role: "user",
      content: `Analyze this exchange:\n\n${conversationText}`
    }
  ];

  const response = await fetch(
    'https://router.huggingface.co/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3.1-8B-Instruct",
        messages: messages,
        max_tokens: 100,
        temperature: 0.5,
        stream: false
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Hugging Face API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data;
}

// Function to call Hugging Face Inference Providers API
async function generateResponse(conversationHistory, userMessage) {
  // Build messages array for chat completion
  const messages = [
    {
      role: "system",
      content: "You are LegalX, a professional and knowledgeable legal assistant specializing in Malaysian law. Provide helpful, accurate, and concise information about Malaysian legal matters."
    }
  ];
  
  // Add conversation history (last 3 exchanges = 6 messages)
  if (conversationHistory && conversationHistory.length > 0) {
    conversationHistory.slice(-6).forEach(msg => {
      messages.push({
        role: msg.role,
        content: msg.content
      });
    });
  }
  
  // Add current user message
  messages.push({
    role: "user",
    content: userMessage
  });

  // Using Hugging Face Router with automatic provider selection
  const response = await fetch(
    'https://router.huggingface.co/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3.1-8B-Instruct",
        messages: messages,
        max_tokens: 200,
        temperature: 0.7,
        stream: false
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Hugging Face API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data;
}

// Function to generate conversation title
async function generateConversationTitle(userMessage) {
  const messages = [
    {
      role: "system",
      content: "You are a title generator. Generate a concise, descriptive title (maximum 4-6 words) that captures the main topic of the user's question. Only respond with the title, nothing else. Examples: 'Contract Breach Analysis', 'Employment Law Query', 'Property Dispute Resolution'."
    },
    {
      role: "user",
      content: `Generate a short title for this legal question: "${userMessage}"`
    }
  ];

  const response = await fetch(
    'https://router.huggingface.co/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3.1-8B-Instruct",
        messages: messages,
        max_tokens: 30,
        temperature: 0.5,
        stream: false
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Hugging Face API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data;
}

// Title generation endpoint
app.post('/api/generate-title', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Generating title for message:', message);

    const data = await generateConversationTitle(message);
    
    let title = '';
    
    // Parse OpenAI-compatible chat completion response
    if (data.choices && data.choices.length > 0) {
      title = data.choices[0].message?.content || '';
    }

    // Clean up the title (remove quotes, extra spaces, etc.)
    title = title.trim().replace(/^["']|["']$/g, '');
    
    // Fallback to truncated message if title generation fails
    if (!title || title.length < 3) {
      title = message.substring(0, 30) + (message.length > 30 ? '...' : '');
    }

    console.log('Generated title:', title);

    res.json({ 
      title: title,
      success: true 
    });

  } catch (error) {
    console.error('Title generation error:', error.message);
    
    // Fallback to simple truncation on error
    const fallbackTitle = req.body.message.substring(0, 30) + 
                         (req.body.message.length > 30 ? '...' : '');
    
    res.json({ 
      title: fallbackTitle,
      success: true 
    });
  }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Sending request to Hugging Face Router...');
    console.log('User message:', message);

    const data = await generateResponse(conversationHistory, message);
    
    console.log('Response received:', JSON.stringify(data, null, 2));

    let reply = '';

    // Parse OpenAI-compatible chat completion response
    if (data.choices && data.choices.length > 0) {
      reply = data.choices[0].message?.content || '';
    }

    // Fallback response
    if (!reply || reply.trim().length < 10) {
      reply = "I'm LegalX, your Malaysian legal assistant. I'm here to help with legal questions. Could you please provide more details?";
    }

    console.log('Final reply:', reply.trim());

    res.json({ 
      reply: reply.trim(),
      success: true 
    });

  } catch (error) {
    console.error('Detailed Error:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });

    // Handle specific errors
    if (error.message.includes('503')) {
      res.status(503).json({ 
        error: 'Model is loading',
        details: 'The model is starting up. Please wait 20-30 seconds and try again.'
      });
    } else if (error.message.includes('401') || error.message.includes('403')) {
      res.status(401).json({ 
        error: 'Authentication failed',
        details: 'Invalid API key. Get your token from https://huggingface.co/settings/tokens with "Make calls to Inference Providers" permission.'
      });
    } else if (error.message.includes('429')) {
      res.status(429).json({ 
        error: 'Rate limit exceeded',
        details: 'Monthly credits exhausted or too many requests. Wait or upgrade to PRO.'
      });
    } else if (error.message.includes('404')) {
      res.status(404).json({ 
        error: 'Model or endpoint not found',
        details: 'The model may not be available through Inference Providers.'
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to generate response',
        details: error.message 
      });
    }
  }
});

// Pre-hearing defense counsel endpoint
app.post('/api/defense-counsel', async (req, res) => {
  try {
    const { message, conversationHistory, roundTopic } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Defense Counsel responding to:', message);
    console.log('Round topic:', roundTopic);

    const data = await generateDefenseCounselResponse(conversationHistory, message, roundTopic);
    
    let reply = '';
    if (data.choices && data.choices.length > 0) {
      reply = data.choices[0].message?.content || '';
    }

    if (!reply || reply.trim().length < 10) {
      reply = "Your Honor, I object. The plaintiff's argument lacks substantive legal foundation under Malaysian law.";
    }

    console.log('Defense reply:', reply.trim());

    res.json({ 
      reply: reply.trim(),
      success: true 
    });

  } catch (error) {
    console.error('Defense Counsel Error:', error.message);
    res.status(500).json({ 
      error: 'Failed to generate defense response',
      details: error.message 
    });
  }
});
// Pre-hearing plaintiff counsel endpoint
app.post('/api/plaintiff-counsel', async (req, res) => {
  try {
    const { message, conversationHistory, roundTopic } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Plaintiff Counsel responding to:', message);
    console.log('Round topic:', roundTopic);

    const data = await generatePlaintiffCounselResponse(conversationHistory, message, roundTopic);
    
    let reply = '';
    if (data.choices && data.choices.length > 0) {
      reply = data.choices[0].message?.content || '';
    }

    if (!reply || reply.trim().length < 10) {
      reply = "Your Honor, the evidence clearly demonstrates the defendant's liability under Malaysian law. We stand ready to prove our case.";
    }

    console.log('Plaintiff reply:', reply.trim());

    res.json({ 
      reply: reply.trim(),
      success: true 
    });

  } catch (error) {
    console.error('Plaintiff Counsel Error:', error.message);
    res.status(500).json({ 
      error: 'Failed to generate plaintiff response',
      details: error.message 
    });
  }
});

// Strategy analysis endpoint
app.post('/api/analyze-strategy', async (req, res) => {
  try {
    const { conversationHistory, roundTopic } = req.body;

    if (!conversationHistory || conversationHistory.length === 0) {
      return res.json({ 
        hasSignificantPoint: false,
        strategyUpdate: null,
        citationUpdate: null
      });
    }

    console.log('Analyzing strategy for round:', roundTopic);

    const data = await analyzeForStrategyUpdate(conversationHistory, roundTopic);
    
    let analysis = { hasSignificantPoint: false, strategyUpdate: null, citationUpdate: null };
    
    if (data.choices && data.choices.length > 0) {
      const content = data.choices[0].message?.content || '';
      try {
        // Try to parse JSON from the response
        const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
        analysis = JSON.parse(cleanContent);
      } catch (parseError) {
        console.log('Could not parse strategy analysis, using default');
      }
    }

    console.log('Strategy analysis:', analysis);

    res.json(analysis);

  } catch (error) {
    console.error('Strategy Analysis Error:', error.message);
    res.json({ 
      hasSignificantPoint: false,
      strategyUpdate: null,
      citationUpdate: null
    });
  }
});


// Generate round summary endpoint
app.post('/api/generate-summary', async (req, res) => {
  try {
    const { conversationHistory, roundTopic } = req.body;

    if (!conversationHistory || conversationHistory.length === 0) {
      return res.json({ 
        success: true,
        summary: 'No conversation to summarize yet.'
      });
    }

    const conversationText = conversationHistory.map(msg => 
      `${msg.role === 'defense' ? 'Defense Counsel' : 'Plaintiff Counsel'}: ${msg.content}`
    ).join('\n\n');

    const messages = [
      {
        role: "system",
        content: `You are a legal assistant tasked with summarizing pre-hearing conversations. Create a concise, professional summary (3-4 sentences) that captures:
1. The main legal arguments presented
2. Key points of contention
3. Important evidence or precedents mentioned
4. Overall tone and outcome of the exchange

Keep it objective and focused on legal substance.`
      },
      {
        role: "user",
        content: `Summarize this pre-hearing conversation on "${roundTopic}":\n\n${conversationText}`
      }
    ];

    const response = await fetch(
      'https://router.huggingface.co/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.1-8B-Instruct",
          messages: messages,
          max_tokens: 200,
          temperature: 0.5,
          stream: false
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to generate summary');
    }

    const data = await response.json();
    
    let summary = '';
    if (data.choices && data.choices.length > 0) {
      summary = data.choices[0].message?.content || '';
    }

    if (!summary || summary.trim().length < 10) {
      summary = 'Unable to generate a detailed summary at this time.';
    }

    console.log('Generated summary:', summary);

    res.json({ 
      summary: summary.trim(),
      success: true 
    });

  } catch (error) {
    console.error('Summary Generation Error:', error.message);
    res.json({ 
      summary: 'Unable to generate summary at this time.',
      success: false
    });
  }
});


// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Legalx Server is running',
    model: 'meta-llama/Llama-3.1-8B-Instruct',
    provider: 'Hugging Face Inference Providers (Auto-routed)',
    endpoint: 'https://router.huggingface.co/v1/chat/completions'
  });
});

// Test endpoint to verify API key and permissions
app.get('/api/test-key', async (req, res) => {
  try {
    const response = await fetch(
      'https://huggingface.co/api/whoami-v2',
      {
        headers: {
          "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        }
      }
    );
    
    if (response.ok) {
      const data = await response.json();
      res.json({ 
        status: 'valid',
        message: 'API key is valid ✓',
        user: data.name || 'authenticated',
        type: data.type || 'user',
        note: 'Ensure your token has "Make calls to Inference Providers" permission'
      });
    } else {
      res.status(401).json({ 
        status: 'invalid',
        message: 'API key is not valid',
        hint: 'Get your API key from https://huggingface.co/settings/tokens'
      });
    }
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`\n✓ LegalX Server running on port ${PORT}`);
  console.log(`✓ Using: Hugging Face Inference Providers (Router)`);
  console.log(`✓ Model: meta-llama/Llama-3.1-8B-Instruct (auto-routed)`);
  console.log(`✓ Health check: http://localhost:${PORT}/api/health`);
  console.log(`✓ Test API key: http://localhost:${PORT}/api/test-key`);
  console.log(`\n⚠️  NOTE: Using monthly free credits from Inference Providers`);
  console.log(`⚠️  First request may take 30-60 seconds (model loading)`);
  console.log(`✓ Ready for chat!\n`);
});