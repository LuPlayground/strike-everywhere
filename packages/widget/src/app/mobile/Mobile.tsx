import { useEffect, useMemo, useState } from "preact/hooks";
import type { Side } from "@strike-everywhere/core";
import { Disclosures, learnTopic } from "../content";
import type { PerpsState } from "../state";
import { Sheet, pref } from "../ui";
import { Help } from "./Help";
import { History } from "./History";
import { Home } from "./Home";
import { Market } from "./Market";
import { Markets } from "./Markets";
import { Onboarding } from "./Onboarding";
import { PositionScreen } from "./Position";
import { Trade } from "./Trade";

export type Screen =
  | { k: "home" }
  | { k: "markets"; list?: string; pick?: Side; focus?: boolean }
  | { k: "market"; sym: string }
  | { k: "trade"; sym: string; side: Side }
  | { k: "position"; id: number }
  | { k: "history" }
  | { k: "onboard" }
  | { k: "help" };

export interface Nav {
  push: (s: Screen) => void;
  replace: (s: Screen) => void;
  back: () => void;
}

export function Mobile({ s, onClose, start }: { s: PerpsState; onClose?: () => void; start?: Screen }) {
  const first: Screen[] = [{ k: "home" }];
  if (start && start.k !== "home") first.push(start);
  if (!s.session && pref("onboarded") !== "1") first.push({ k: "onboard" });
  const [stack, setStack] = useState<Screen[]>(first);
  const [learn, setLearn] = useState<string | null>(null);
  const [disc, setDisc] = useState(false);

  const nav: Nav = useMemo(
    () => ({
      push: (x) => setStack((st) => [...st, x]),
      replace: (x) => setStack((st) => [...st.slice(0, -1), x]),
      back: () => setStack((st) => (st.length > 1 ? st.slice(0, -1) : st)),
    }),
    [],
  );
  useEffect(() => {
    if (start && start.k !== "home") setStack([{ k: "home" }, start]);
  }, [start && JSON.stringify(start)]);

  const cur = stack[stack.length - 1];
  const topic = learn ? learnTopic(learn, s) : null;
  const key = `${stack.length}:${cur.k}`;

  return (
    <div class="pa-mobile">
      <div class="pa-stage" key={key}>
        {cur.k === "home" && <Home s={s} nav={nav} onClose={onClose} onLearn={setLearn} onDisclosures={() => setDisc(true)} />}
        {cur.k === "markets" && <Markets s={s} nav={nav} list={cur.list} pick={cur.pick} focus={cur.focus} />}
        {cur.k === "market" && <Market s={s} nav={nav} sym={cur.sym} onLearn={setLearn} />}
        {cur.k === "trade" && <Trade s={s} nav={nav} sym={cur.sym} side={cur.side} onLearn={setLearn} onDisclosures={() => setDisc(true)} />}
        {cur.k === "position" && <PositionScreen s={s} nav={nav} id={cur.id} onLearn={setLearn} />}
        {cur.k === "history" && <History s={s} nav={nav} />}
        {cur.k === "onboard" && <Onboarding s={s} nav={nav} onLearn={setLearn} />}
        {cur.k === "help" && <Help s={s} nav={nav} />}
      </div>
      {topic && (
        <Sheet title={topic.title} onClose={() => setLearn(null)} tall>
          <div class="pa-prose">{topic.body}</div>
        </Sheet>
      )}
      {disc && (
        <Sheet title="Disclosures" onClose={() => setDisc(false)} tall>
          <Disclosures s={s} />
        </Sheet>
      )}
    </div>
  );
}
