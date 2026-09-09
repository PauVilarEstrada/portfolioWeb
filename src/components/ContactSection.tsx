import React from "react";
import "../css/ContactSection.css";
import { FaDownload, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { useI18n } from "../i18n/LanguageContext";
import { rt } from "../i18n/rich";

const LINKS: Record<string, { href: string; download?: boolean; icon: React.ReactNode }> = {
  email: { href: "mailto:pvilardev@gmail.com", icon: <FaEnvelope /> },
  linkedin: { href: "https://www.linkedin.com/in/pau-vilar/", icon: <FaLinkedin /> },
  github: { href: "https://github.com/PauVilarEstrada", icon: <FaGithub /> },
  cv: { href: `${import.meta.env.BASE_URL}VILAR_PAU.pdf`, download: true, icon: <FaDownload /> },
};

export default function ContactSection() {
  const { t, lang } = useI18n();

  return (
    <section className="contact-section">
      <div className="contact-container lang-fade" key={lang}>
        <span className="contact-eyebrow">{t.contact.eyebrow}</span>
        <h2>{t.contact.title}</h2>

        <p className="intro-paragraph">{rt(t.contact.lead)}</p>

        {t.contact.paragraphs.map((p, i) => (
          <p key={i}>{rt(p)}</p>
        ))}

        <div className="looking-wrap">
          <h3 className="contact-subhead">{t.contact.lookingTitle}</h3>
          <div className="looking-chips">
            {t.contact.looking.map(l => <span key={l} className="looking-chip">{l}</span>)}
          </div>
        </div>

        <h3 className="contact-subhead">{t.contact.cardsTitle}</h3>
        <div className="contact-cards">
          {t.contact.cards.map(card => {
            const link = LINKS[card.k];
            const external = link.href.startsWith("http");
            return (
              <a
                key={card.k}
                className={`contact-card contact-card--${card.k}`}
                href={link.href}
                {...(link.download ? { download: true } : {})}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className="contact-card-icon">{link.icon}</span>
                <span className="contact-card-body">
                  <span className="contact-card-h">{card.h}</span>
                  <span className="contact-card-p">{card.p}</span>
                  <span className="contact-card-cta">{card.cta} <i>↗</i></span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
