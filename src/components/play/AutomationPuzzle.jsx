import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  FiArrowRight, FiCheckSquare, FiClock, FiDatabase, FiEdit3, FiFileText, FiFilter, FiGitBranch,
  FiInbox, FiMail, FiMessageSquare, FiRotateCcw, FiSave, FiSend, FiTag, FiUserCheck, FiZap,
} from "react-icons/fi";
import { siGmail, siZoho, siVeeam, siGoogledrive, siN8n, siOllama, siBitdefender } from "simple-icons";
import { useI18n } from "../../i18n/LanguageContext";

/** Every piece in the box: its kind and its icon (a brand mark or a line icon). */
const NODES = {
  cron: { type: "trigger", icon: FiClock },
  mailIn: { type: "trigger", icon: FiInbox },
  form: { type: "trigger", icon: FiFileText },
  webhook: { type: "trigger", icon: FiZap },
  gmail: { type: "source", brand: siGmail },
  outlook: { type: "source", icon: FiMail },
  zoho: { type: "source", brand: siZoho },
  veeam: { type: "source", brand: siVeeam },
  drive: { type: "source", brand: siGoogledrive },
  bitdefender: { type: "source", brand: siBitdefender },
  n8n: { type: "flow", brand: siN8n },
  ifNode: { type: "logic", icon: FiGitBranch },
  filter: { type: "logic", icon: FiFilter },
  approve: { type: "logic", icon: FiCheckSquare },
  llm: { type: "ai", brand: siOllama },
  rag: { type: "ai", icon: FiDatabase },
  crm: { type: "action", icon: FiUserCheck },
  ticket: { type: "action", icon: FiTag },
  save: { type: "action", icon: FiSave },
  reply: { type: "action", icon: FiEdit3 },
  teams: { type: "notify", icon: FiMessageSquare },
  email: { type: "notify", icon: FiSend },
};
/** How long a wrong piece shakes. */
const WRONG_MS = 650;

/** The same shuffle every time for a given challenge, so pieces don't jump around on re-render. */
function shuffled(list, seed) {
  const out = [...list];
  let x = seed + 1;
  for (let i = out.length - 1; i > 0; i--) {
    x = (x * 9301 + 49297) % 233280;
    const j = Math.floor((x / 233280) * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function NodeIcon({ id }) {
  const node = NODES[id];
  if (node.brand) {
    const hex = node.brand.hex.toUpperCase();
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill={hex === "FFFFFF" ? "#0c1611" : `#${hex}`}><path d={node.brand.path} /></svg>
    );
  }
  const Icon = node.icon;
  return <Icon aria-hidden="true" />;
}

/** Pick the pieces in order to build each automation; six challenges, pieces mixed with decoys. */
export default function AutomationPuzzle() {
  const { t } = useI18n();
  const z = t.play.puzzle;
  const [level, setLevel] = useState(0);
  const [picks, setPicks] = useState([]);
  const [wrong, setWrong] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [lines, setLines] = useState([]);
  const board = useRef(null);
  const nodeRefs = useRef({});

  const scenario = z.scenarios[level];
  const done = picks.length === scenario.path.length;
  const last = level === z.scenarios.length - 1;
  const pieces = useMemo(() => shuffled(Object.keys(NODES), level), [level]);

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

  useLayoutEffect(measure, [measure, pieces]);
  useEffect(() => {
    const ro = new ResizeObserver(measure);
    if (board.current) ro.observe(board.current);
    return () => ro.disconnect();
  }, [measure]);

  const pick = id => {
    if (done || picks.includes(id)) return;
    if (id === scenario.path[picks.length]) {
      setPicks(p => [...p, id]);
      setWrong(null);
    } else {
      setWrong(id);
      setMistakes(m => m + 1);
      window.setTimeout(() => setWrong(w => (w === id ? null : w)), WRONG_MS);
    }
  };
  const advance = () => {
    setPicks([]);
    if (last) setMistakes(0);
    setLevel(l => (last ? 0 : l + 1));
  };

  return (
    <div className="puzzle">
      <div className="puzzle-brief">
        <p className="puzzle-step">
          {z.scenario} {level + 1} {z.of} {z.scenarios.length} · {mistakes} {z.mistakes}
        </p>
        <p className="puzzle-goal">{scenario.goal}</p>
        <ol className="puzzle-progress">
          {scenario.path.map((id, i) => (
            <li key={`${id}-${i}`} className={i < picks.length ? "is-done" : i === picks.length ? "is-next" : undefined}>
              {i < picks.length ? z.nodes[id] : z.types[NODES[id].type]}
            </li>
          ))}
        </ol>
      </div>

      <div ref={board} className="puzzle-board puzzle-board--mixed">
        <svg className="puzzle-lines" aria-hidden="true">
          {lines.map(l => (
            <line key={l.key} x1={l.a.x} y1={l.a.y} x2={l.b.x} y2={l.b.y} />
          ))}
        </svg>
        {pieces.map(id => {
          const order = picks.indexOf(id);
          const state = order >= 0 ? " is-picked" : wrong === id ? " is-wrong" : "";
          return (
            <button
              key={id}
              ref={el => { nodeRefs.current[id] = el; }}
              type="button"
              className={`puzzle-node${state}`}
              onClick={() => pick(id)}
              aria-pressed={order >= 0}
            >
              <span className="puzzle-node-icon"><NodeIcon id={id} /></span>
              <span className="puzzle-node-label">{z.nodes[id]}</span>
              {order >= 0 && <span className="puzzle-node-order">{order + 1}</span>}
            </button>
          );
        })}
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
