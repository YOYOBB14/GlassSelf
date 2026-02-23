/**
 * PROFILER — Generate profile, render report, share
 * API key: set window.ANTHROPIC_API_KEY or use a serverless proxy in production.
 */
(function () {
  const TERMINAL_MESSAGES = [
    'Initializing request...',
    'Collecting identity vectors...',
    'Parsing behavioral trace...',
    'Cross-referencing platforms...',
    'Building inference model...',
    'Running psychological analysis...',
    'Validating confidence levels...',
    'Generating report...',
    'Complete.'
  ];

  function collectData() {
    const data = [];
    const add = function (label, value) {
      if (value && String(value).trim()) data.push(label + ': ' + value.trim());
    };
    add('LinkedIn', document.getElementById('linkedin')?.value);
    add('Twitter/X', document.getElementById('twitter')?.value);
    add('GitHub', document.getElementById('github')?.value);
    add('Personal site', document.getElementById('personal-site')?.value);

    document.querySelectorAll('.panel-body input').forEach(function (input) {
      var label = input.closest('.input-block')?.querySelector('label')?.textContent || input.placeholder || 'Field';
      add(label, input.value);
    });

    document.querySelectorAll('#trace-list .trace-row input').forEach(function (input) {
      if (input.value && input.value.trim()) data.push('Trace: ' + input.value.trim());
    });
    return data;
  }

  function showError(msg) {
    var el = document.getElementById('error-msg');
    if (el) {
      el.textContent = msg;
      el.classList.add('visible');
    }
  }

  function hideError() {
    var el = document.getElementById('error-msg');
    if (el) el.classList.remove('visible');
  }

  function showTerminal() {
    var log = document.getElementById('terminal-log');
    if (log) log.classList.add('active');
  }

  function setTerminalLine(index, done) {
    var log = document.getElementById('terminal-log');
    if (!log) return;
    var lines = log.querySelectorAll('.line');
    if (lines[index]) {
      lines[index].classList.toggle('done', done);
    }
  }

  function runTerminalSequence() {
    showTerminal();
    var i = 0;
    TERMINAL_MESSAGES.forEach(function (msg) {
      var lineEl = document.createElement('div');
      lineEl.className = 'line';
      lineEl.textContent = msg;
      document.getElementById('terminal-log').appendChild(lineEl);
    });
    function next() {
      if (i < TERMINAL_MESSAGES.length) {
        setTerminalLine(i, true);
        i++;
        if (i < TERMINAL_MESSAGES.length) setTimeout(next, 900);
        else next();
      }
    }
    setTimeout(next, 900);
  }

  function buildPrompt(dataPoints) {
    return `You are a hyper-perceptive digital intelligence analyst. Using ONLY the following publicly available data points, construct a deeply unsettling yet accurate psychological and professional profile.

Your analysis should feel like the subject is being *seen* — like you've picked up on signals they didn't know they were broadcasting. Be precise, inferential, and surprisingly specific. Reference the actual handles, URLs, and domains provided. Cross-correlate across platforms to find patterns the subject wouldn't expect anyone to notice. Avoid generic observations.

Data:
${dataPoints.join('\n')}

Return ONLY a valid JSON object with this structure:
{
  "subject_label": "3-5 word identity archetype that cuts to the essence",
  "tagline": "One sentence that makes them feel seen",
  "sections": [
    {
      "id": "01",
      "title": "PSYCHOLOGICAL SIGNATURE",
      "status": "HIGH CONFIDENCE",
      "content": "3-4 sentences. Deep personality read using the data. Reference specific platforms/handles. Make it feel eerily accurate.",
      "tags": ["3-5 short trait tags"],
      "confidence": 87
    },
    {
      "id": "02",
      "title": "HOW YOU THINK",
      "status": "CONFIRMED",
      "content": "3-4 sentences on cognitive style, problem-solving approach, and learning patterns inferred from platform usage.",
      "tags": ["3-5 tags"],
      "confidence": 82
    },
    {
      "id": "03",
      "title": "WHAT DRIVES YOU",
      "status": "INFERRED",
      "content": "3-4 sentences on core motivations and underlying drives visible in their digital footprint.",
      "tags": ["3-5 tags"],
      "confidence": 79
    },
    {
      "id": "04",
      "title": "HIDDEN STRENGTHS",
      "status": "DETECTED",
      "content": "3-4 sentences on abilities or traits they probably underestimate in themselves.",
      "tags": ["3-5 tags"],
      "confidence": 74
    },
    {
      "id": "05",
      "title": "TRAJECTORY PROJECTION",
      "status": "MODELED",
      "content": "3-4 sentences on where they are headed professionally and personally.",
      "tags": ["3-5 tags"],
      "confidence": 71
    }
  ]
}

The goal: when they read this, they think "how the HELL do they know that about me."
Return ONLY valid JSON. No markdown fences, no explanation.`;
  }

  function hideTerminal() {
    var log = document.getElementById('terminal-log');
    if (log) {
      log.classList.remove('active');
      log.innerHTML = '';
    }
  }

  function renderReport(parsed) {
    var section = document.getElementById('report-section');
    if (!section) return;

    var profileId = 'P-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    document.getElementById('profile-id').textContent = profileId;
    document.getElementById('subject-label').textContent = parsed.subject_label || 'Unknown';
    document.getElementById('tagline').textContent = parsed.tagline || '';

    var container = document.getElementById('report-cards');
    container.innerHTML = '';
    (parsed.sections || []).forEach(function (sec) {
      var card = document.createElement('div');
      card.className = 'intel-card';
      var tagsHtml = (sec.tags || []).map(function (t) {
        return '<span>' + escapeHtml(t) + '</span>';
      }).join('');
      card.innerHTML =
        '<div class="card-title">' + escapeHtml(sec.title || '') + '</div>' +
        '<div class="card-status">' + escapeHtml(sec.status || '') + '</div>' +
        '<div class="card-content">' + escapeHtml(sec.content || '') + '</div>' +
        '<div class="card-tags">' + tagsHtml + '</div>' +
        '<div class="confidence-bar-wrap"><div class="confidence-bar" data-pct="' + (sec.confidence || 0) + '"></div></div>' +
        '<div class="confidence-pct">' + (sec.confidence || 0) + '% confidence</div>';
      container.appendChild(card);
    });

    section.classList.add('visible');
    hideTerminal();

    setTimeout(function () {
      document.querySelectorAll('.confidence-bar').forEach(function (bar) {
        var pct = parseInt(bar.getAttribute('data-pct'), 10) || 0;
        bar.style.width = pct + '%';
      });
    }, 400);
  }

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function plainTextReport(parsed) {
    var lines = [
      'PROFILER — DIGITAL IDENTITY REPORT',
      '',
      'Subject: ' + (parsed.subject_label || ''),
      parsed.tagline || '',
      '',
      '---'
    ];
    (parsed.sections || []).forEach(function (sec) {
      lines.push('');
      lines.push(sec.title + ' / ' + sec.status + ' (' + sec.confidence + '%)');
      lines.push(sec.content || '');
      if (sec.tags && sec.tags.length) lines.push('Tags: ' + sec.tags.join(', '));
    });
    return lines.join('\n');
  }

  document.getElementById('btn-analyze').addEventListener('click', async function () {
    var data = collectData();
    if (data.length === 0) {
      showError('Provide at least one identity vector or trace.');
      return;
    }
    hideError();
    this.disabled = true;

    runTerminalSequence();

    var apiKey = window.ANTHROPIC_API_KEY || '';
    if (!apiKey) {
      setTimeout(function () {
        hideTerminal();
        showError('API key required. Set window.ANTHROPIC_API_KEY or use a serverless proxy. See README.');
        document.getElementById('btn-analyze').disabled = false;
      }, 500);
      return;
    }

    var prompt = buildPrompt(data);
    try {
      var response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          messages: [{ role: 'user', content: prompt }]
        })
      });
      var dataRes = await response.json();
      if (!response.ok) {
        throw new Error(dataRes.error?.message || 'API error');
      }
      var raw = (dataRes.content || []).map(function (b) { return b.text || ''; }).join('');
      var clean = raw.replace(/```json|```/g, '').trim();
      var parsed = JSON.parse(clean);
      renderReport(parsed);
      window.__lastReport = parsed;
    } catch (err) {
      hideTerminal();
      showError(err.message || 'Analysis failed.');
    }
    document.getElementById('btn-analyze').disabled = false;
  });

  document.getElementById('btn-share-x').addEventListener('click', function () {
    var label = document.getElementById('subject-label')?.textContent || '';
    var tagline = document.getElementById('tagline')?.textContent || '';
    var text = 'My PROFILER identity: ' + label + ' — ' + tagline + ' Get yours.';
    var url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text);
    window.open(url, '_blank');
  });

  document.getElementById('btn-copy-report').addEventListener('click', function () {
    var report = window.__lastReport;
    if (!report) return;
    var text = plainTextReport(report);
    navigator.clipboard.writeText(text).then(function () {
      var confirm = document.getElementById('copy-confirm');
      if (confirm) {
        confirm.textContent = '// COPIED TO CLIPBOARD';
        setTimeout(function () { confirm.textContent = ''; }, 3000);
      }
    });
  });
})();
