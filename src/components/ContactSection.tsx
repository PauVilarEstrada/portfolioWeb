import React, { useState } from "react";
import { FiArrowUpRight, FiDownload, FiMail, FiLinkedin, FiGithub } from "react-icons/fi";
import "../css/ContactSection.css";
import { useI18n } from "../i18n/LanguageContext";
import { rt } from "../i18n/rich";
import { SOCIAL } from "../data/projects";

const CHANNELS: Record<string, { href: string; icon: React.ReactNode; download?: boolean }> = {
  email: { href: `mailto:${SOCIAL.email}`, icon: <FiMail /> },
  linkedin: { href: SOCIAL.linkedin, icon: <FiLinkedin /> },
  github: { href: SOCIAL.github, icon: <FiGithub /> },
  cv: { href: SOCIAL.cv, icon: <FiDownload />, download: true },
};

export default function ContactSection() {
  const { t, lang } = useI18n();
  const c = t.contact;
  const f = c.form;

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState(f.topics[0]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!name.trim() || !message.trim()) { setError(true); return; }
    setError(false);
    const subject = `${f.subject}: ${topic} · ${name.trim()}${company.trim() ? ` (${company.trim()})` : ""}`;
    const body = `${message.trim()}\n\n${name.trim()}${company.trim() ? `\n${company.trim()}` : ""}`;
    window.location.href = `mailto:${SOCIAL.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="contact-page lang-fade" key={lang}>
      <header className="container page-head">
        <h1 className="page-head-title">{c.title}</h1>
        <div className="page-head-row">
          <p className="page-head-meta">{c.basedIn}</p>
          <p className="page-head-lead">{rt(c.lead)}</p>
        </div>
      </header>

      <section className="container contact-routes" aria-labelledby="routes-title">
        <h2 id="routes-title" className="contact-h">{c.routesTitle}</h2>
        <div className="routes">
          {c.routes.map(r => (
            <article key={r.h} className="route">
              <span className="tag tag--green">{r.tag}</span>
              <h3>{r.h}</h3>
              <p>{r.p}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="container contact-grid">
        <section className="contact-reasons" aria-labelledby="reasons-title">
          <h2 id="reasons-title" className="contact-h">{c.reasonsTitle}</h2>
          <dl>
            {c.reasons.map(r => (
              <div key={r.h} className="reason">
                <dt>{r.h}</dt>
                <dd>{r.p}</dd>
              </div>
            ))}
          </dl>

          <h2 className="contact-h contact-h--channels">{c.channelsTitle}</h2>
          <ul className="channels">
            {c.channels.map(ch => {
              const link = CHANNELS[ch.k];
              const external = link.href.startsWith("http");
              return (
                <li key={ch.k}>
                  <a
                    href={link.href}
                    className="channel"
                    {...(link.download ? { download: true } : {})}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span className="channel-icon" aria-hidden="true">{link.icon}</span>
                    <span className="channel-h">{ch.h}</span>
                    <span className="channel-cta">{ch.cta}</span>
                    <FiArrowUpRight className="channel-arrow" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="contact-form-wrap" aria-labelledby="form-title">
          <form className="contact-form" onSubmit={onSubmit} noValidate>
            <h2 id="form-title" className="contact-form-title">{c.formTitle}</h2>

            <fieldset className="topics">
              <legend>{f.topic}</legend>
              <div className="topic-list">
                {f.topics.map(tp => (
                  <label key={tp} className={`topic${topic === tp ? " is-active" : ""}`}>
                    <input type="radio" name="topic" value={tp} checked={topic === tp} onChange={() => setTopic(tp)} />
                    {tp}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="field-row">
              <label className="field">
                <span>{f.name}</span>
                <input type="text" autoComplete="name" value={name} onChange={e => setName(e.target.value)} required aria-invalid={error && !name.trim()} />
              </label>
              <label className="field">
                <span>{f.company}</span>
                <input type="text" autoComplete="organization" value={company} onChange={e => setCompany(e.target.value)} />
              </label>
            </div>

            <label className="field">
              <span>{f.message}</span>
              <textarea rows={5} value={message} onChange={e => setMessage(e.target.value)} placeholder={f.messagePlaceholder} required aria-invalid={error && !message.trim()} />
            </label>

            {error && <p className="form-error" role="alert">{f.required}</p>}

            <div className="form-foot">
              <button type="submit" className="btn btn--primary">
                {f.submit} <FiArrowUpRight aria-hidden="true" />
              </button>
              <p className="form-note">{c.formNote}</p>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
