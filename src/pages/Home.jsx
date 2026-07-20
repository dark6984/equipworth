import { sx } from '../lib/sx.js';
import Logo from '../components/Logo.jsx';
import ImageSlot from '../components/ImageSlot.jsx';

export default function Home({ vm }) {
  return (
    <div
      data-scroll-root
      style={sx(
        "height:100%;overflow-y:auto;background:#F6F9F1 radial-gradient(900px 420px at 85% 0%,rgba(63,138,52,.09),transparent 70%) no-repeat;scroll-behavior:smooth;color:#1A211B;--color-bg:#F6F9F1;--color-surface:#FFFFFF;--color-text:#1A211B;--color-divider:rgba(26,33,27,.13);--color-neutral-200:#2E362D;--color-neutral-300:#454F43;--color-neutral-400:#5F6A5C;--color-neutral-500:#7A8477;--color-neutral-600:#9AA294;--color-neutral-800:#DDE1D4;--color-accent:#3F8A34;--color-accent-300:#2F6B28;--color-accent-400:#3F8A34;--color-accent-2-300:#7F4E1B;--color-accent-2-400:#A66722;--color-harvest:#B65427;--color-sky:#3F7396"
      )}
    >
      <header style={sx('position:sticky;top:0;z-index:30;background:rgba(252,253,251,.92);backdrop-filter:blur(14px);border-bottom:1px solid var(--color-divider)')}>
        <nav style={sx('max-width:1240px;margin:0 auto;padding:14px 32px;display:flex;align-items:center;gap:26px')}>
          <a href="#" onClick={vm.goHomeLink} style={sx('display:flex;align-items:center;gap:10px;text-decoration:none;margin-right:auto')}>
            <Logo size={28} />
            <span style={sx('font-family:var(--font-heading);font-weight:600;font-size:18px;letter-spacing:-0.01em;color:#1A211B')}>EquipWorth</span>
          </a>
          <a href="#product" style={sx('font-size:13px;text-decoration:none;color:#41503E')}>Product</a>
          <a href="#pricing" style={sx('font-size:13px;text-decoration:none;color:#41503E')}>Pricing</a>
          <a href="mailto:sales@equipworth.com" style={sx('font-size:13px;text-decoration:none;color:#41503E')}>Contact</a>
          <button className="btn" onClick={vm.goLogin} style={sx('background:#2F6B28;border:none;color:#F3F7F0;font-weight:600;padding:9px 16px')}>
            Sign in<i className="ph ph-arrow-right"></i>
          </button>
        </nav>
      </header>

      <section style={sx('max-width:1240px;margin:0 auto;padding:clamp(48px,7vw,96px) 32px 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:clamp(32px,5vw,72px);align-items:center')}>
        <div style={sx('animation:ewfade .5s ease both')}>
          <div style={sx('display:flex;align-items:center;gap:11px;margin-bottom:22px')}>
            <span style={sx('width:26px;height:2px;background:#C76B1F')}></span>
            <span style={sx('font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#C76B1F')}>Market intelligence for used iron</span>
          </div>
          <h1 style={sx('font-size:clamp(40px,5.2vw,66px);line-height:1.02;letter-spacing:-0.03em;font-weight:600;margin:0 0 20px;max-width:14ch')}>
            The hammer price, <span style={sx('font-style:italic;font-weight:500;color:#2F6B28')}>before</span> the hammer falls.
          </h1>
          <p style={sx('font-size:16px;line-height:1.65;color:var(--color-neutral-400);max-width:50ch;text-wrap:pretty;margin:0 0 26px')}>
            EquipWorth reads five auction marketplaces every night, adjusts every sold lot to your iron, and prices your inventory two ways: maximum profit, or gone this month.
          </p>
          <div style={sx('display:flex;gap:10px;flex-wrap:wrap')}>
            <button className="btn" onClick={vm.goLogin} style={sx('background:#2F6B28;border:none;color:#F3F7F0;font-weight:600;padding:11px 20px;font-size:14px')}>
              <i className="ph ph-terminal-window"></i>Sign in to the terminal
            </button>
            <button className="btn" onClick={vm.goDash} style={sx('border:1px solid var(--color-divider);color:var(--color-text);padding:11px 20px;font-size:14px')}>
              <i className="ph ph-play"></i>Try the live demo
            </button>
          </div>
          <div style={sx('display:flex;gap:8px;flex-wrap:wrap;margin-top:30px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-neutral-600)')}>
            <span>TractorHouse</span><span style={sx('color:var(--color-neutral-800)')}>/</span>
            <span>AuctionTime</span><span style={sx('color:var(--color-neutral-800)')}>/</span>
            <span>Machinery Pete</span><span style={sx('color:var(--color-neutral-800)')}>/</span>
            <span>Purple Wave</span><span style={sx('color:var(--color-neutral-800)')}>/</span>
            <span>BigIron</span>
          </div>
        </div>
        <div style={sx('animation:ewfade .5s .12s ease both')}>
          <div style={sx('--color-text:#EDEBE2;--color-neutral-200:#DFDED4;--color-neutral-300:#C4C4B8;--color-neutral-400:#A3A499;--color-neutral-500:#83857B;--color-neutral-600:#666B61;--color-divider:rgba(237,235,226,.12);background:linear-gradient(170deg,#1E4364,#122B41);border:1px solid rgba(237,235,226,.16);border-radius:12px;overflow:hidden;box-shadow:0 22px 60px rgba(26,33,27,.25);color:#EDEBE2')}>
            <div style={sx('display:flex;align-items:center;gap:9px;padding:12px 18px;border-bottom:1px solid var(--color-divider)')}>
              <span style={sx('width:7px;height:7px;border-radius:50%;background:var(--color-accent);box-shadow:0 0 8px var(--color-accent)')}></span>
              <span style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-neutral-400)')}>Comp wire: live</span>
              <span style={sx('margin-left:auto;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-neutral-600)')}>spec-adjusted</span>
            </div>
            {vm.heroBoard.map((hb, i) => (
              <div key={i} style={sx('display:flex;align-items:baseline;gap:12px;padding:13px 18px;border-bottom:1px solid color-mix(in srgb, var(--color-text) 7%, transparent)')}>
                <span style={sx('font-size:12.5px;color:var(--color-neutral-300);flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis')}>{hb.unit}</span>
                <span style={sx('font-size:13px;font-variant-numeric:tabular-nums;color:var(--color-text)')}>{hb.price}</span>
                <span style={{ fontSize: 12, fontVariantNumeric: 'tabular-nums', color: hb.deltaColor, width: 52, textAlign: 'right' }}>{hb.delta}</span>
              </div>
            ))}
            <div style={sx('display:flex;align-items:center;gap:8px;padding:13px 18px;font-size:12px;color:var(--color-neutral-500)')}>
              <span style={sx("font-family:'JetBrains Mono',monospace")}>matching comps to EW-2417</span>
              <span style={sx('width:7px;height:14px;background:#A9CCE2;animation:ewcursor 1.1s steps(1) infinite')}></span>
            </div>
          </div>
          <div style={sx('display:flex;justify-content:space-between;gap:14px;margin-top:18px;padding:0 6px')}>
            <div><div style={sx('font-size:20px;font-variant-numeric:tabular-nums;color:#2F6B28')}>38,400+</div><div style={sx('font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-neutral-600)')}>comps indexed</div></div>
            <div><div style={sx('font-size:20px;font-variant-numeric:tabular-nums;color:var(--color-text)')}>5</div><div style={sx('font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-neutral-600)')}>marketplaces</div></div>
            <div><div style={sx('font-size:20px;font-variant-numeric:tabular-nums;color:#C76B1F')}>02:00</div><div style={sx('font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-neutral-600)')}>nightly pass</div></div>
          </div>
        </div>
      </section>

      <div style={sx('overflow:hidden;padding:11px 0;border-top:1px solid var(--color-divider);border-bottom:1px solid var(--color-divider);margin-top:40px')}>
        <div style={sx('display:flex;width:max-content;animation:ewticker 42s linear infinite')}>
          {vm.ticker.map((t, i) => (
            <span key={i} style={sx('display:inline-flex;align-items:baseline;gap:8px;padding:0 26px;border-right:1px solid rgba(237,235,226,.08);font-size:11.5px;white-space:nowrap')}>
              <span style={sx('color:var(--color-neutral-500)')}>{t.unit}</span>
              <span style={sx('font-variant-numeric:tabular-nums;color:var(--color-neutral-200)')}>{t.price}</span>
              <span style={{ fontVariantNumeric: 'tabular-nums', color: t.deltaColor }}>{t.delta}</span>
            </span>
          ))}
        </div>
      </div>

      <section style={sx('position:relative;margin:64px 0 0')}>
        <div style={sx('height:clamp(300px,38vw,460px)')}>
          <ImageSlot placeholder="Drop a wide lot shot, iron at golden hour" />
        </div>
        <div style={sx('position:absolute;left:0;right:0;bottom:0;background:linear-gradient(transparent,rgba(11,15,12,.92));padding:70px 32px 22px;pointer-events:none')}>
          <div style={sx('max-width:1240px;margin:0 auto;display:flex;gap:clamp(24px,5vw,70px);flex-wrap:wrap')}>
            {vm.bandStats.map((b, i) => (
              <div key={i}>
                <div style={sx('font-size:clamp(22px,2.6vw,32px);font-variant-numeric:tabular-nums;color:#EDEBE2')}>{b.v}</div>
                <div style={sx('font-size:11px;color:rgba(237,235,226,.55);max-width:24ch')}>{b.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="product" style={sx('max-width:1240px;margin:0 auto;padding:88px 32px 40px;scroll-margin-top:70px')}>
        <div style={sx('display:flex;align-items:baseline;gap:18px;flex-wrap:wrap;margin-bottom:10px')}>
          <span style={sx('font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#2F6B28')}>The product</span>
          <h2 style={sx('font-size:clamp(26px,3vw,38px);letter-spacing:-0.02em;margin:0;max-width:24ch')}>Four tools. One number you can defend.</h2>
        </div>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(380px,1fr));gap:0 56px;margin-top:26px')}>
          {[
            ['1.', 'Comp engine', 'Every sold lot from five marketplaces, matched to your units overnight and normalized for hours, condition and option package. New comps land before you pour coffee.'],
            ['2.', 'Two-price strategy', 'Not one number: a band. The max-profit price, the quick-move price, and a days-to-sell model for everything in between. You pick the tradeoff, per unit.'],
            ['3.', 'Worth AI, the market copilot', "EquipWorth's AI reads every John Deere bulletin so nobody else has to. Ask Worth AI what changed today; get the three lines that matter and nothing else."],
            ['4.', 'Trade appraiser', 'An auction-backed trade number in ten seconds, while the farmer is still standing at the counter. One click drafts it into inventory.'],
          ].map(([n, title, body]) => (
            <div key={n} style={sx('border-top:1px solid var(--color-divider);padding:26px 0 34px')}>
              <div style={sx('display:flex;align-items:baseline;gap:14px')}>
                <span style={sx('font-size:12px;letter-spacing:.1em;color:var(--color-neutral-600);text-transform:uppercase')}>{n}</span>
                <h4 style={sx('font-size:19px;margin:0')}>{title}</h4>
              </div>
              <p style={sx('font-size:14px;line-height:1.6;color:var(--color-neutral-400);margin:10px 0 0;max-width:46ch')}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={sx('background:#EFF6EA;color:#1A211B;padding:clamp(56px,7vw,92px) 32px')}>
        <div style={sx('max-width:900px;margin:0 auto;text-align:center')}>
          <div style={sx('font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#2F6B28;margin-bottom:18px')}>From the floor</div>
          <div style={sx(vm.revStyle)}>
            <div style={sx('font-family:var(--font-heading);font-size:clamp(22px,2.8vw,34px);line-height:1.3;letter-spacing:-0.015em;font-weight:500;text-wrap:pretty;min-height:3.9em;display:flex;align-items:center;justify-content:center')}>{vm.revText}</div>
            <div style={sx('margin-top:20px;font-size:13px;color:rgba(26,31,27,.65)')}>{vm.revWho}</div>
          </div>
          <div style={sx('display:flex;justify-content:center;gap:8px;margin-top:24px')}>
            {vm.revDots.map((rd, i) => (
              <button key={i} onClick={rd.pick} style={sx(rd.style)} title="Show review"></button>
            ))}
          </div>
        </div>
      </section>

      <section style={sx('max-width:1240px;margin:0 auto;padding:88px 32px 30px')}>
        <h2 style={sx('font-size:clamp(26px,3vw,38px);letter-spacing:-0.02em;margin:0 0 34px')}>Overnight, every night.</h2>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:40px')}>
          {vm.steps.map((st, i) => (
            <div key={i} style={sx(st.style)}>
              <div style={sx('display:flex;align-items:center;gap:12px;margin-bottom:12px')}>
                <span style={sx('font-size:12px;letter-spacing:.1em;color:#2F6B28;text-transform:uppercase')}>{st.n}</span>
                <span style={{ flex: 1, height: 1, background: st.bar }}></span>
              </div>
              <h5 style={sx('margin:0 0 6px;font-size:16px')}>{st.title}</h5>
              <p style={sx('font-size:13px;line-height:1.6;color:var(--color-neutral-400);margin:0')}>{st.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" style={sx('max-width:1240px;margin:0 auto;padding:56px 32px 20px;scroll-margin-top:70px')}>
        <div style={sx('display:flex;align-items:baseline;gap:18px;flex-wrap:wrap;margin-bottom:26px')}>
          <span style={sx('font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#2F6B28')}>Pricing</span>
          <h2 style={sx('font-size:clamp(26px,3vw,38px);letter-spacing:-0.02em;margin:0')}>Scoped to your dealership. Contact for price.</h2>
        </div>
        <div style={sx('background:var(--color-surface);border:1px solid var(--color-divider);border-radius:14px;padding:clamp(28px,4vw,44px);display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:36px;align-items:center')}>
          <div>
            <h3 style={sx('font-size:clamp(20px,2.2vw,26px);letter-spacing:-0.02em;margin:0 0 10px;max-width:24ch')}>One flat number per rooftop. No per-lookup fees, no seat counting.</h3>
            <p style={sx('font-size:14px;line-height:1.65;color:var(--color-neutral-400);margin:0 0 18px;max-width:52ch')}>Every dealership runs different iron, stores and data feeds, so we scope the price to yours. Tell us your rooftop count and DMS; you get a number the same business day.</p>
            <div style={sx('display:flex;flex-direction:column;gap:10px')}>
              {[
                'All five auction sources, the trade appraiser and Worth AI included',
                'Unlimited users at every rooftop',
                'DMS sync and onboarding included',
              ].map((line, i) => (
                <div key={i} style={sx('display:flex;gap:10px;font-size:13.5px;line-height:1.4')}>
                  <i className="ph ph-check" style={sx('font-size:15px;color:var(--color-accent);flex:none;margin-top:2px')}></i>
                  <span style={sx('color:var(--color-neutral-300)')}>{line}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={sx('display:flex;flex-direction:column;gap:12px;align-items:flex-start;justify-content:center;border-left:1px solid var(--color-divider);padding-left:clamp(20px,3vw,36px)')}>
            <span style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-neutral-500)')}>Get your number</span>
            <div style={sx('font-size:clamp(24px,2.6vw,32px);letter-spacing:-0.02em;font-family:var(--font-heading);font-weight:600')}>Contact for price</div>
            <a href="mailto:sales@equipworth.com?subject=EquipWorth pricing" className="btn" style={sx('text-decoration:none;background:#2F6B28;border:none;color:#F3F7F0;font-weight:600;padding:11px 20px')}>
              <i className="ph ph-envelope-simple"></i>Contact sales
            </a>
            <a href="mailto:sales@equipworth.com" style={sx('font-size:13px;color:var(--color-accent-300)')}>sales@equipworth.com</a>
            <span style={sx('font-size:11px;color:var(--color-neutral-600)')}>Response within one business day.</span>
          </div>
        </div>
      </section>

      <section style={sx('max-width:1240px;margin:0 auto;padding:64px 32px 72px')}>
        <div style={sx('border-radius:14px;background:linear-gradient(120deg,#132C42,#1B3E5C 60%,#245073);border:1px solid rgba(237,235,226,.12);padding:clamp(32px,5vw,52px);display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap')}>
          <div>
            <h2 style={sx('font-size:clamp(24px,2.8vw,34px);letter-spacing:-0.02em;margin:0 0 6px;color:#EDEBE2')}>Stop guessing at the number.</h2>
            <p style={sx('color:rgba(237,235,226,.65);margin:0;font-size:14px')}>Your lot, the market, and Deere's programs. One screen.</p>
          </div>
          <button className="btn" onClick={vm.goLogin} style={sx('flex:none;background:#A9CCE2;border:none;color:#132C42;font-weight:600;padding:11px 20px')}>
            Sign in to the terminal<i className="ph ph-arrow-right"></i>
          </button>
        </div>
      </section>

      <footer style={sx('border-top:1px solid var(--color-divider);background:#F4F8F0')}>
        <div style={sx('max-width:1240px;margin:0 auto;padding:44px 32px 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:28px')}>
          <div>
            <div style={sx('display:flex;align-items:center;gap:9px;margin-bottom:10px')}>
              <Logo size={24} />
              <span style={sx('font-family:var(--font-heading);font-weight:600;font-size:16px')}>EquipWorth</span>
            </div>
            <p style={sx('font-size:13px;line-height:1.6;color:var(--color-neutral-500);margin:0;max-width:32ch')}>Auction-backed pricing intelligence for used-equipment desks.</p>
          </div>
          <div style={sx('display:flex;flex-direction:column;gap:9px')}>
            <span style={sx('font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--color-neutral-600)')}>Product</span>
            <a href="#product" style={sx('font-size:13px;text-decoration:none;color:var(--color-neutral-400)')}>Overview</a>
            <a href="#pricing" style={sx('font-size:13px;text-decoration:none;color:var(--color-neutral-400)')}>Pricing</a>
            <a href="#" onClick={vm.goDashLink} style={sx('font-size:13px;text-decoration:none;color:var(--color-neutral-400)')}>Sign in</a>
          </div>
          <div style={sx('display:flex;flex-direction:column;gap:9px')}>
            <span style={sx('font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--color-neutral-600)')}>Company</span>
            <a href="mailto:sales@equipworth.com" style={sx('font-size:13px;text-decoration:none;color:var(--color-neutral-400)')}>Contact sales</a>
            <a href="#" onClick={vm.openTerms} style={sx('font-size:13px;text-decoration:none;color:var(--color-neutral-400)')}>Terms of Use</a>
            <a href="#" onClick={vm.openPrivacy} style={sx('font-size:13px;text-decoration:none;color:var(--color-neutral-400)')}>Privacy Policy</a>
          </div>
          <div style={sx('display:flex;flex-direction:column;gap:9px')}>
            <span style={sx('font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--color-neutral-600)')}>Get in touch</span>
            <a href="mailto:sales@equipworth.com" style={sx('font-size:13px;text-decoration:none;color:var(--color-neutral-400)')}>sales@equipworth.com</a>
            <span style={sx('font-size:13px;color:var(--color-neutral-500)')}>Columbia, Missouri</span>
          </div>
        </div>
        <div style={sx('max-width:1240px;margin:26px auto 0;padding:16px 32px 24px;border-top:1px solid var(--color-divider);display:flex;gap:16px;flex-wrap:wrap;font-size:11.5px;color:var(--color-neutral-600)')}>
          <span>© 2026 EquipWorth Inc. All rights reserved.</span>
          <span style={sx('margin-left:auto')}>Not affiliated with Deere &amp; Company. John Deere and JDF are trademarks of their respective owners.</span>
        </div>
      </footer>
    </div>
  );
}
