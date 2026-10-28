import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiMail, FiMessageSquare, FiRotateCcw, FiUserCheck, FiArrowRight } from "react-icons/fi";
import { siGmail, siZoho, siVeeam, siGoogledrive, siN8n, siOllama } from "simple-icons";
import { useI18n } from "../../i18n/LanguageContext";

const COLUMNS = [
  { key: "source", nodes: ["gmail", "zoho", "veeam", "drive"] },
  { key: "flow", nodes: ["n8n"] },
  { key: "ai", nodes: ["llm"] },
  { key: "output", nodes: ["teams", "crm", "email"] },
];
const BRAND = { gmail: siGmail, zoho: siZoho, veeam: siVeeam, drive: siGoogledrive, n8n: siN8n, llm: siOllama };
const GLYPH = { teams: FiMessageSquare, crm: FiUserCheck, email: FiMail };
/** How long a wrong piece shakes. */
const WRONG_MS = 650;

function NodeIcon({ id }) {
  const icon = BRAND[id];
  if (icon) {
    const color = icon.hex.toUpperCase() === "FFFFFF" ? "#0c1611" : `#${icon.hex}`;
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill={color}><path d={icon.path} /></svg>
    );
  }
  const Glyph = GLYPH[id];
  return <Glyph aria-hidden="true" />;
}

/** Click the pieces in order (data → n8n → LLM → result) to build each automation. */
export default function AutomationPuzzle() {
  const { t } = useI18n();
  const z = t.play.puzzle;
  const [level, setLevel] = useState(0);
  const [picks, setPicks] = useState([]);
  const [wrong, setWrong] = useState(null);
  const [lines, setLines] = useState([]);
  const board = useRef(null);
  const nodeRefs = useRef({});

  const scenario = z.scenarios[level];
  const done = picks.length === scenario.path.length;
  const last = level === z.scenarios.length - 1;

  const measure = useCallback(() => {
    const root = board.current?.getBoundingClientRect();
    if (!root) return;
    const centre = id => {
      const r = nodeRefs.current[id]?.getBoundingClientRect();
      return r ? { x: r.left - root.left + r.width / 2, y: r.top - root.top + r.height / 2 } : null;
    };
    const next = [];
    for (let i = 1; i < picks.length; i++) {
      const a = centre(picks[i - 1]);
      const b = centre(picks[i]);
      if (a && b) next.push({ a, b, key: `${picks[i - 1]}-${picks[i]}` });
    }
    setLines(next);
  }, [picks]);

  useLayoutEffect(measure, [measure]);
  useEffect(() => {
    const ro = new ResizeObserver(measure);
    if (board.current) ro.observe(board.current);
    return () => ro.disconnect();
  }, [measure]);

  const pick = id => {
    if (done) return;
    if (id === scenario.path[picks.length]) {
      setPicks(p => [...p, id]);
      setWrong(null);
    } else {
      setWrong(id);
      window.setTimeout(() => setWrong(w => (w === id ? null : w)), WRONG_MS);
    }
  };
  const advance = () => {
    setPicks([]);
    setLevel(l => (last ? 0 : l + 1));
  };

  return (
    <div className="puzzle">
      <div className="puzzle-brief">
        <p className="puzzle-step">{z.scenario} {level + 1} {z.of} {z.scenarios.length}</p>
        <p className="puzzle-goal">{scenario.goal}</p>
        <ol className="puzzle-progress" aria-label={z.pick}>
          {scenario.path.map((id, i) => (
            <li key={id} className={i < picks.length ? "is-done" : i === picks.length ? "is-next" : undefined}>
              {i < picks.length ? z.nodes[id] : z.columns[COLUMNS[i].key]}
            </li>
          ))}
        </ol>
      </div>

      <div ref={board} className="puzzle-board">
        <svg className="puzzle-lines" aria-hidden="true">
          {lines.map(l => (
            <line key={l.key} x1={l.a.x} y1={l.a.y} x2={l.b.x} y2={l.b.y} />
          ))}
        </svg>
        {COLUMNS.map(col => (
          <div key={col.key} className="puzzle-col">
            <p className="puzzle-col-title">{z.columns[col.key]}</p>
            {col.nodes.map(id => {
              const state = picks.includes(id) ? " is-picked" : wrong === id ? " is-wrong" : "";
              return (
                <button
                  key={id}
                  ref={el => { nodeRefs.current[id] = el; }}
                  type="button"
                  className={`puzzle-node${state}`}
                  onClick={() => pick(id)}
                  aria-pressed={picks.includes(id)}
                >
                  <span className="puzzle-node-icon"><NodeIcon id={id} /></span>
                  {z.nodes[id]}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <p className="puzzle-status" role="status">
        {wrong ? z.wrong : done ? z.done : ""}
      </p>
      {done && (
        <div className="puzzle-result">
          <p>{scenario.explain}</p>
          {last && <p className="puzzle-all">{z.allDone}</p>}
          <button type="button" className="btn btn--primary" onClick={advance}>
            {last ? <><FiRotateCcw aria-hidden="true" /> {z.restart}</> : <>{z.next} <FiArrowRight aria-hidden="true" /></>}
          </button>
        </div>
      )}
    </div>
  );
}
