import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-white/5 pt-6 first:border-t-0 first:pt-0">
      <h2 className="font-heading text-lg font-bold">{title}</h2>
      <div className="mt-3 space-y-2 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto flex-1 w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold sm:text-4xl">
            Terms &amp; <span className="thc-gold-text">Conditions</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Please read this in full before joining any Traders Hub Center batch.
          </p>
        </div>

        <div className="thc-glass thc-neutral-border flex flex-col gap-6 rounded-2xl border p-6 sm:p-8">
          <Section title="Market Analysis | Trading Education">
            <p>
              We share our trading approach through live Zoom sessions and WhatsApp messages for
              educational purposes only.
            </p>
            <p>
              <span className="font-semibold text-foreground">Important:</span> Our sessions are
              designed to teach how to trade using our strategy. They are not intended to fully
              reveal our complete strategy, proprietary level-marking methods, or every aspect of
              our trading system.
            </p>
            <p>
              We are committed to sharing our knowledge as much as possible. Members are
              requested to focus on learning first before entering live trading. Building
              knowledge, discipline, risk management, and confidence is more important than
              depending on anyone else for trading decisions.
            </p>
          </Section>

          <Section title="Candidate Information">
            <p>
              Members are requested to share their age, trading experience, and current trading
              capital situation so we can understand their background and provide general
              guidance. Any suggestions provided are for educational purposes only and should not
              be considered personal financial advice.
            </p>
          </Section>

          <Section title="Beginner Guidance">
            <ul className="flex flex-col gap-1.5">
              <li>
                • Beginners are advised to start with a small amount (for example, ₹10,000) until
                they gain confidence and develop their own trading skills.
              </li>
              <li>• Do not trust anyone blindly or invest large amounts based only on someone else&apos;s suggestions.</li>
              <li>• Trade only with money you can afford to lose.</li>
              <li>
                • Increase your trading size only after developing your own strategy, knowledge,
                and confidence.
              </li>
            </ul>
          </Section>

          <Section title="Risk Management Rules">
            <ul className="flex flex-col gap-1.5">
              <li>• Set your own daily and monthly profit and loss limits before trading.</li>
              <li>• Avoid overtrading or increasing risk after losses.</li>
              <li>• Follow proper risk management and trade according to your own plan.</li>
            </ul>
          </Section>

          <Section title="⚠ Disclaimer">
            <ul className="flex flex-col gap-1.5">
              <li>
                • Not SEBI-registered. All Zoom sessions, charts, messages, and discussions are
                for educational purposes only and are not financial or investment advice.
              </li>
              <li>
                • We do not promise or guarantee any specific return number or percentage. Our
                live Win Rate and Total Capture % are historical figures computed from every
                signal we&apos;ve published, not a forecast of future results.
              </li>
              <li>
                • Trading involves substantial risk. Profits are not guaranteed, and losses can
                occur. The mentor, community admins, and members shall not be held responsible
                for any trading profits or losses.
              </li>
              <li>• Do not take loans, borrow money, or trade with funds you cannot afford to lose.</li>
              <li>
                • Inform your family members that you are participating in trading and understand
                the risks involved.
              </li>
              <li>• Always do your own research and make your own trading decisions.</li>
              <li>
                • Fees are charged only for educational training and live sessions, not for
                guaranteed profits or trading returns.
              </li>
              <li>
                • All fees are non-refundable after payment, regardless of trading results,
                profits, losses, attendance, or participation.
              </li>
            </ul>
          </Section>

          <Section title="Payment & Acceptance of Terms">
            <p>
              By making payment to join our program/group, you confirm that you have read,
              understood, and accepted all terms, conditions, disclaimers, and group rules.
            </p>
            <p>Payment confirms your agreement to participate under these terms.</p>
          </Section>

          <Section title="Dhan Referral Offer">
            <p>
              Existing Dhan account holders can win free premium group access for the next batch
              by referring friends and family, subject to:
            </p>
            <ul className="flex flex-col gap-1.5">
              <li>• Minimum 10 referrals.</li>
              <li>• Minimum 50 trades in 1 account.</li>
            </ul>
          </Section>

          <Section title="Group Rules">
            <ul className="flex flex-col gap-1.5">
              <li>• Members must maintain respectful behavior in personal messages and live Zoom sessions.</li>
              <li>
                • Members are not allowed to share their personal trading losses during live
                sessions to keep discussions focused on learning and strategy.
              </li>
              <li>
                • Any violation of group rules, misconduct, or disruption may result in removal
                from the group without notice.
              </li>
            </ul>
            <p className="font-semibold text-foreground">
              College students are not allowed to join this group.
            </p>
          </Section>

          <p className="border-t border-white/5 pt-6 text-xs text-muted-foreground/80">
            By joining this group and making payment, you acknowledge that you have read,
            understood, and accepted all terms, disclaimer, and group rules. Kindly read all these
            points before joining our community — after payment, we do not refund under any
            circumstances.
          </p>
          <p className="text-sm font-medium text-foreground">Thanking you,<br />THC — Founder and Admins</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
