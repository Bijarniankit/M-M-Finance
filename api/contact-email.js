export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { formType, ...data } = req.body || {}

    if (formType === 'getstarted') {
      return await handleGetStarted(data, res)
    }
    // default = contact (back-compat: existing /contact form omitted formType)
    return await handleContact(data, res)
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error', detail: err.message })
  }
}

/* ────────────────────────────────────────────────────────────────
   Contact form handler  (POST /api/contact-email, formType: 'contact')
   ──────────────────────────────────────────────────────────────── */
async function handleContact(data, res) {
  const { name, email, phone, subject, message, preferred, bestTime } = data

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' })
  }

  const RECIPIENT = process.env.CONTACT_RECIPIENT || 'hello@mnmfinance.com.au'
  const SITE_URL = process.env.SITE_URL || 'https://mnmfinance.com.au'

  const [notifyRes, confirmRes] = await Promise.all([
    sendMail({
      to: RECIPIENT,
      replyTo: email,
      subject: `New enquiry: ${subject || 'General question'} — from ${name}`,
      html: contactNotificationHtml({ name, email, phone, subject, message, preferred, bestTime, siteUrl: SITE_URL }),
    }),
    sendMail({
      to: email,
      subject: `We've received your enquiry — ${name}`,
      html: contactConfirmationHtml({ name, subject, siteUrl: SITE_URL }),
    }),
  ])

  if (!notifyRes.ok || !confirmRes.ok) {
    return res.status(502).json({
      error: 'Email send failed',
      detail: {
        notification: await notifyRes.text(),
        confirmation: await confirmRes.text(),
      },
    })
  }

  return res.status(200).json({ success: true })
}

/* ────────────────────────────────────────────────────────────────
   Get Started handler  (POST /api/contact-email, formType: 'getstarted')
   ──────────────────────────────────────────────────────────────── */
async function handleGetStarted(data, res) {
  const { goal, timeframe, income, deposit, name, email, phone, state, notes } = data

  if (!name || !email || !goal) {
    return res.status(400).json({ error: 'Name, email and goal are required' })
  }

  const RECIPIENT = process.env.GETSTARTED_RECIPIENT || 'enquiries@mnmfinance.com.au'
  const SITE_URL = process.env.SITE_URL || 'https://mnmfinance.com.au'

  const [notifyRes, confirmRes] = await Promise.all([
    sendMail({
      to: RECIPIENT,
      replyTo: email,
      subject: `New Get Started enquiry: ${goal} — from ${name}`,
      html: getStartedNotificationHtml({ goal, timeframe, income, deposit, name, email, phone, state, notes, siteUrl: SITE_URL }),
    }),
    sendMail({
      to: email,
      subject: `Welcome, ${name.split(' ')[0]} — your enquiry is with us`,
      html: getStartedConfirmationHtml({ goal, timeframe, income, deposit, name, state, siteUrl: SITE_URL }),
    }),
  ])

  if (!notifyRes.ok || !confirmRes.ok) {
    return res.status(502).json({
      error: 'Email send failed',
      detail: {
        notification: await notifyRes.text(),
        confirmation: await confirmRes.text(),
      },
    })
  }

  return res.status(200).json({ success: true })
}

/* ────────────────────────────────────────────────────────────────
   Resend transport
   ──────────────────────────────────────────────────────────────── */
function sendMail({ to, subject, html, replyTo }) {
  const body = {
    from: process.env.MAIL_FROM || 'M&M Finance <contact@mnmfinance.com.au>',
    to: [to],
    subject,
    html,
  }
  if (replyTo) body.reply_to = replyTo

  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

/* ────────────────────────────────────────────────────────────────
   Shared layout chrome (header band + footer)
   ──────────────────────────────────────────────────────────────── */
const BRAND_PRIMARY = '#0f766e'
const BRAND_BG = '#f0fdfa'

function shell({ title, bodyHtml, accent = BRAND_PRIMARY }) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${escp(title)}</title></head>
<body style="margin:0;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:${BRAND_BG};padding:24px 16px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden">
    <div style="background:${accent};color:#fff;padding:18px 28px;font-size:16px;font-weight:700;letter-spacing:0.01em">
      M&amp;M Finance
    </div>
    <div style="padding:28px">
      ${bodyHtml}
    </div>
    <div style="padding:16px 28px;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8;text-align:center;line-height:1.6">
      M&amp;M Financial Services Pty Ltd &nbsp;|&nbsp; ABN 12 345 678 901 &nbsp;|&nbsp; Australian Credit Licence 123456<br>
      Suite 12, Level 3, 100 George Street, Parramatta NSW 2150
    </div>
  </div>
</body>
</html>`
}

function row(label, value, opts = {}) {
  if (!value) return ''
  const href = opts.href
  const inner = href
    ? `<a href="${escp(href)}" style="color:${BRAND_PRIMARY};text-decoration:none">${escp(value)}</a>`
    : escp(value)
  return `<tr>
    <td style="padding:9px 0;font-weight:600;color:#0f172a;width:130px;vertical-align:top">${escp(label)}</td>
    <td style="padding:9px 0;color:#334155">${inner}</td>
  </tr>`
}

/* ────────────────────────────────────────────────────────────────
   Template 1 — Contact form NOTIFICATION (inbound to staff)
   ──────────────────────────────────────────────────────────────── */
function contactNotificationHtml({ name, email, phone, subject, message, preferred, bestTime, siteUrl }) {
  const body = `
    <div style="font-size:20px;font-weight:700;color:${BRAND_PRIMARY};margin-bottom:4px">New contact enquiry</div>
    <div style="font-size:13px;color:#64748b;margin-bottom:20px">Submitted via ${escp(siteUrl)}/contact</div>
    <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">
      ${row('Name', name)}
      ${row('Email', email, { href: `mailto:${email}` })}
      ${row('Phone', phone, { href: phone ? `tel:${String(phone).replace(/\s/g, '')}` : null })}
      ${row('Subject', subject || 'General question')}
      ${row('Preferred contact', preferred)}
      ${row('Best time', bestTime)}
    </table>
    <div style="margin-top:20px;padding:16px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0">
      <div style="font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:8px">Message</div>
      <div style="font-size:15px;color:#334155;line-height:1.6">${escp(message).replace(/\n/g, '<br>')}</div>
    </div>
  `
  return shell({ title: 'New contact enquiry', bodyHtml: body })
}

/* ────────────────────────────────────────────────────────────────
   Template 2 — Contact form CONFIRMATION (auto-reply to user)
   ──────────────────────────────────────────────────────────────── */
function contactConfirmationHtml({ name, subject, siteUrl }) {
  const firstName = String(name).split(' ')[0]
  const body = `
    <div style="font-size:22px;font-weight:700;color:#0f172a;margin-bottom:10px">Thanks, ${escp(firstName)} — we've got your enquiry</div>
    <p style="font-size:15px;color:#475569;line-height:1.6;margin:0 0 20px">
      Thanks for reaching out about <strong>${escp(subject || 'your home loan needs')}</strong>. A senior broker will review your message and reply within <strong>one business day</strong>.
    </p>
    <div style="background:${BRAND_BG};border-radius:12px;padding:18px;border:1px solid #ccfbf1;margin-bottom:22px">
      <div style="font-size:13px;font-weight:600;color:${BRAND_PRIMARY};margin-bottom:8px">What happens next</div>
      <ol style="margin:0;padding-left:18px;font-size:14px;color:#334155;line-height:1.7">
        <li>A broker reviews your enquiry (within hours)</li>
        <li>We reply by phone or email — your preference</li>
        <li>If you choose to proceed, we book a free 20-minute discovery call</li>
      </ol>
    </div>
    <div style="margin-bottom:22px">
      <a href="${escp(siteUrl)}/calculators" style="display:inline-block;padding:10px 18px;background:${BRAND_PRIMARY};color:#fff;border-radius:12px;font-size:14px;font-weight:600;text-decoration:none;margin-right:8px">Try our calculators</a>
      <a href="${escp(siteUrl)}/get-started" style="display:inline-block;padding:10px 18px;background:#fff;color:${BRAND_PRIMARY};border:1px solid #e2e8f0;border-radius:12px;font-size:14px;font-weight:600;text-decoration:none">Start a full enquiry</a>
    </div>
    <p style="font-size:13px;color:#94a3b8;line-height:1.5;margin:0">
      For anything urgent, call us on <a href="tel:1300123456" style="color:${BRAND_PRIMARY}">1300 123 456</a> (Mon–Fri 9–6, Sat 10–2 AEST).
    </p>
  `
  return shell({ title: "We've received your enquiry", bodyHtml: body })
}

/* ────────────────────────────────────────────────────────────────
   Template 3 — Get Started NOTIFICATION (inbound to staff)
   ──────────────────────────────────────────────────────────────── */
function getStartedNotificationHtml({ goal, timeframe, income, deposit, name, email, phone, state, notes, siteUrl }) {
  const body = `
    <div style="font-size:20px;font-weight:700;color:${BRAND_PRIMARY};margin-bottom:4px">New Get Started enquiry</div>
    <div style="font-size:13px;color:#64748b;margin-bottom:20px">Submitted via ${escp(siteUrl)}/get-started</div>

    <div style="font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.04em;margin:0 0 8px">The brief</div>
    <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:18px">
      ${row('Goal', goal)}
      ${row('Timeframe', timeframe)}
      ${row('Annual income', income)}
      ${row('Deposit / equity', deposit)}
      ${row('State', state)}
    </table>

    <div style="font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.04em;margin:0 0 8px">Contact</div>
    <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">
      ${row('Name', name)}
      ${row('Email', email, { href: `mailto:${email}` })}
      ${row('Phone', phone, { href: phone ? `tel:${String(phone).replace(/\s/g, '')}` : null })}
    </table>

    ${notes ? `
    <div style="margin-top:20px;padding:16px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0">
      <div style="font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:8px">Notes / flags</div>
      <div style="font-size:15px;color:#334155;line-height:1.6">${escp(notes).replace(/\n/g, '<br>')}</div>
    </div>` : ''}
  `
  return shell({ title: 'New Get Started enquiry', bodyHtml: body })
}

/* ────────────────────────────────────────────────────────────────
   Template 4 — Get Started CONFIRMATION (auto-reply to user)
   ──────────────────────────────────────────────────────────────── */
function getStartedConfirmationHtml({ goal, timeframe, income, deposit, name, state, siteUrl }) {
  const firstName = String(name).split(' ')[0]
  const body = `
    <div style="font-size:22px;font-weight:700;color:#0f172a;margin-bottom:10px">You're all set, ${escp(firstName)}</div>
    <p style="font-size:15px;color:#475569;line-height:1.6;margin:0 0 20px">
      Thanks for getting started with us. A senior broker will call you within <strong>one business day</strong> to book your free 20-minute discovery call.
    </p>

    <div style="background:${BRAND_BG};border-radius:12px;padding:18px;border:1px solid #ccfbf1;margin-bottom:22px">
      <div style="font-size:13px;font-weight:600;color:${BRAND_PRIMARY};margin-bottom:10px">Your brief, as we received it</div>
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">
        ${row('Goal', goal)}
        ${row('Timeframe', timeframe)}
        ${row('Annual income', income)}
        ${row('Deposit / equity', deposit)}
        ${row('State', state)}
      </table>
    </div>

    <div style="font-size:13px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:10px">What happens next</div>
    <ol style="margin:0 0 22px;padding-left:18px;font-size:14px;color:#334155;line-height:1.7">
      <li>A broker reviews your enquiry — usually within hours</li>
      <li>We call to book your free 20-minute discovery call</li>
      <li>We compare 40+ lenders and present 2–3 tailored options</li>
    </ol>

    <div style="margin-bottom:22px">
      <a href="${escp(siteUrl)}/calculators" style="display:inline-block;padding:10px 18px;background:${BRAND_PRIMARY};color:#fff;border-radius:12px;font-size:14px;font-weight:600;text-decoration:none;margin-right:8px">Try our calculators</a>
      <a href="${escp(siteUrl)}/process" style="display:inline-block;padding:10px 18px;background:#fff;color:${BRAND_PRIMARY};border:1px solid #e2e8f0;border-radius:12px;font-size:14px;font-weight:600;text-decoration:none">See the process</a>
    </div>

    <p style="font-size:13px;color:#94a3b8;line-height:1.5;margin:0">
      Need to chat sooner? Call <a href="tel:1300123456" style="color:${BRAND_PRIMARY}">1300 123 456</a> (Mon–Fri 9–6, Sat 10–2 AEST).
    </p>
  `
  return shell({ title: 'Your enquiry is with us', bodyHtml: body })
}

/* ────────────────────────────────────────────────────────────────
   Util
   ──────────────────────────────────────────────────────────────── */
function escp(str) {
  if (str === null || str === undefined) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
