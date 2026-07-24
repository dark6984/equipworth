import { Resend } from 'resend';

let resendClient;
function resend() {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY is not configured');
    resendClient = new Resend(key);
  }
  return resendClient;
}

export function renderInviteEmail({ inviteUrl, logoUrl, invitedByName }) {
  const preheader = `You've been invited to EquipWorth${invitedByName ? ' by ' + invitedByName : ''}.`;
  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#EFEDE5;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
    <span style="display:none;font-size:1px;color:#EFEDE5;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EFEDE5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background:#FFFFFF;border-radius:14px;overflow:hidden;box-shadow:0 8px 28px rgba(26,31,27,.10);">
            <tr>
              <td style="padding:36px 40px 0;text-align:center;">
                <img src="${logoUrl}" width="164" alt="EquipWorth" style="display:block;margin:0 auto;height:auto;border:0;">
              </td>
            </tr>
            <tr>
              <td style="padding:28px 40px 8px;text-align:center;">
                <h1 style="margin:0;font-size:21px;line-height:1.3;color:#1A1F1B;font-weight:700;">You're invited to EquipWorth</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px 28px;text-align:center;">
                <p style="margin:0;font-size:14px;line-height:1.6;color:#5F675F;">
                  ${invitedByName ? escapeHtml(invitedByName) + ' has' : 'You’ve been'} invited you to set up your dealership account on EquipWorth, the pricing intelligence terminal for used equipment dealers.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px 32px;text-align:center;">
                <a href="${inviteUrl}" style="display:inline-block;background:#3F8A34;color:#FFFFFF;text-decoration:none;font-size:14px;font-weight:600;padding:13px 28px;border-radius:9px;">Create your account</a>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px 8px;text-align:center;">
                <p style="margin:0;font-size:12px;line-height:1.6;color:#9AA097;">
                  This link is yours alone and can only be used once. If the button above doesn’t work, copy and paste this into your browser:
                </p>
                <p style="margin:8px 0 0;font-size:12px;line-height:1.5;word-break:break-all;">
                  <a href="${inviteUrl}" style="color:#3F8A34;">${inviteUrl}</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 40px 32px;border-top:1px solid #EFEDE5;margin-top:20px;text-align:center;">
                <p style="margin:20px 0 0;font-size:11px;line-height:1.6;color:#BBBFB4;">
                  If you weren’t expecting this invitation, you can safely ignore this email.
                </p>
              </td>
            </tr>
          </table>
          <p style="margin:20px 0 0;font-size:11px;color:#9AA097;">EquipWorth &middot; pricing intelligence for equipment dealers</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = `You're invited to EquipWorth\n\n${invitedByName ? invitedByName + ' has' : 'You’ve been'} invited you to set up your dealership account.\n\nCreate your account: ${inviteUrl}\n\nThis link is yours alone and can only be used once. If you weren't expecting this invitation, you can safely ignore this email.`;

  return { html, text, subject: "You're invited to EquipWorth" };
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export async function sendInviteEmail({ to, inviteUrl, logoUrl, invitedByName }) {
  const { html, text, subject } = renderInviteEmail({ inviteUrl, logoUrl, invitedByName });
  const from = process.env.INVITE_FROM_EMAIL;
  if (!from) throw new Error('INVITE_FROM_EMAIL is not configured');
  const { error } = await resend().emails.send({ from, to, subject, html, text });
  if (error) throw new Error(typeof error === 'string' ? error : error.message || 'Failed to send invite email');
}
