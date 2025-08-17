

import { useEffect, useMemo, useState } from "react";
import "./App.css";

const tasks = [
  { time: "06:00 - 06:10", task: "Wake up + drink warm water", food: "1 glass warm water", benefit: "Hydration, metabolism boost", loss: "Dullness, dehydration", notes: "", category: "health" },
  { time: "06:10 - 06:20", task: "Toilet", food: "-", benefit: "Detox, fresh start", loss: "Stomach discomfort", notes: "", category: "health" },
  { time: "06:20 - 06:30", task: "Brush teeth + tongue clean", food: "-", benefit: "Oral hygiene, freshness", loss: "Bad breath, bacteria growth", notes: "", category: "health" },
  { time: "06:30 - 06:40", task: "Bath (lukewarm)", food: "-", benefit: "Energy boost, alertness", loss: "Laziness, sweat", notes: "", category: "health" },
  { time: "06:40 - 06:50", task: "Urgent personal tasks", food: "-", benefit: "Peace of mind", loss: "Mental stress", notes: "", category: "personal" },
  { time: "06:50 - 07:00", task: "Stretching + push-ups", food: "-", benefit: "Blood flow, energy", loss: "Stiffness, low energy", notes: "", category: "health" },
  { time: "07:00 - 07:10", task: "Watch Critical Thinking Video 🎥", food: "-", benefit: "Boost reasoning, problem-solving, creativity", loss: "Slower decisions, weak analytical skills", notes: "Critical Thinking", category: "learning" },
  { time: "07:10 - 07:20", task: "Eat breakfast", food: "Oats + 2 eggs + 5 almonds", benefit: "Protein + fiber", loss: "Midday hunger", notes: "", category: "health" },
  { time: "07:20 - 07:30", task: "Green tea", food: "Green tea", benefit: "Antioxidants", loss: "Low metabolism", notes: "", category: "health" },
  { time: "07:30 - 07:40", task: "Sunbath walk", food: "-", benefit: "Vitamin D, mood boost", loss: "Weak bones, low mood", notes: "", category: "health" },
  { time: "07:40 - 07:50", task: "Take Swiss Multivitamin", food: "After breakfast", benefit: "Balanced nutrition", loss: "Weak immunity", notes: "", category: "health" },
  { time: "07:50 - 08:00", task: "Meditation", food: "-", benefit: "Calm mind, focus", loss: "Stress, anxiety", notes: "", category: "health" },
  { time: "08:00 - 08:10", task: "DSA – easy problem", food: "-", benefit: "Logic warm-up", loss: "Slow start", notes: "", category: "coding" },
  { time: "08:10 - 08:20", task: "Revise notes", food: "-", benefit: "Strong memory", loss: "Forgetfulness", notes: "", category: "learning" },
  { time: "08:20 - 08:30", task: "Solve problem (LeetCode)", food: "-", benefit: "Coding speed", loss: "Weak skills", notes: "", category: "coding" },
  { time: "08:30 - 08:40", task: "Debug code", food: "-", benefit: "Sharp problem-solving", loss: "Confusion", notes: "", category: "coding" },
  { time: "08:40 - 08:50", task: "Snack", food: "1 banana", benefit: "Quick energy", loss: "Brain fog", notes: "", category: "health" },
  { time: "08:50 - 09:00", task: "Take Vitamin B-Complex", food: "After banana", benefit: "Nerve + brain support", loss: "Fatigue", notes: "", category: "health" },
  { time: "09:00 - 09:10", task: "Watch Critical Thinking Video 🎥", food: "-", benefit: "Boost reasoning, problem-solving, creativity", loss: "Slower decisions, weak analytical skills", notes: "Critical Thinking", category: "learning" },
  { time: "09:10 - 09:20", task: "DSA – medium problem", food: "-", benefit: "Improved logic", loss: "Stagnation", notes: "", category: "coding" },
  { time: "09:20 - 09:30", task: "Complexity analysis", food: "-", benefit: "Critical thinking", loss: "Weak fundamentals", notes: "", category: "coding" },
  { time: "09:30 - 09:40", task: "Another DSA problem", food: "-", benefit: "Speed build-up", loss: "Poor coding habit", notes: "", category: "coding" },
  { time: "09:40 - 09:50", task: "Write solutions", food: "-", benefit: "Retention", loss: "Forget progress", notes: "", category: "coding" },
  { time: "09:50 - 10:00", task: "Recap session", food: "-", benefit: "Long-term memory", loss: "Weak recall", notes: "", category: "learning" },
  { time: "10:00 - 10:10", task: "Tech blog", food: "-", benefit: "New knowledge", loss: "Outdated", notes: "", category: "learning" },
  { time: "10:10 - 10:20", task: "Watch tech video", food: "-", benefit: "Visual learning", loss: "Missed insights", notes: "", category: "learning" },
  { time: "10:20 - 10:30", task: "Notes", food: "-", benefit: "Retain info", loss: "Forget quickly", notes: "", category: "learning" },
  { time: "10:30 - 10:40", task: "Explore GitHub repo", food: "-", benefit: "Practical exposure", loss: "Weak portfolio", notes: "", category: "coding" },
  { time: "10:40 - 10:50", task: "Snack", food: "1 apple", benefit: "Energy, fiber", loss: "Hunger dip", notes: "", category: "health" },
  { time: "10:50 - 11:00", task: "Take Omega-3 capsule", food: "After apple", benefit: "Brain sharpness", loss: "Low focus", notes: "", category: "health" },
  { time: "11:00 - 11:10", task: "Watch Critical Thinking Video 🎥", food: "-", benefit: "Boost reasoning, problem-solving, creativity", loss: "Slower decisions, weak analytical skills", notes: "Critical Thinking", category: "learning" },
  { time: "11:10 - 11:20", task: "Lunch", food: "Rice + protein + salad", benefit: "Balanced energy", loss: "Weak stamina", notes: "", category: "health" },
  { time: "11:20 - 11:30", task: "Walk", food: "-", benefit: "Digestion", loss: "Sluggishness", notes: "", category: "health" },
  { time: "11:30 - 11:40", task: "Nap setup", food: "-", benefit: "Relaxation", loss: "Sleepiness later", notes: "", category: "health" },
  { time: "11:40 - 11:50", task: "Power nap", food: "-", benefit: "Energy reset", loss: "Mental fatigue", notes: "", category: "health" },
  { time: "11:50 - 12:00", task: "Take Neurozan tablet", food: "After lunch", benefit: "Brain health", loss: "Brain fog", notes: "", category: "health" },
  { time: "12:00 - 12:10", task: "Office: emails", food: "-", benefit: "Organized", loss: "Missed info", notes: "", category: "office" },
  { time: "12:10 - 12:20", task: "Office: task A", food: "-", benefit: "Work progress", loss: "Pending tasks", notes: "", category: "office" },
  { time: "12:20 - 12:30", task: "Office: task B", food: "-", benefit: "Steady progress", loss: "Backlog", notes: "", category: "office" },
  { time: "12:30 - 12:40", task: "Office: calls", food: "-", benefit: "Communication", loss: "Confusion", notes: "", category: "office" },
  { time: "12:40 - 12:50", task: "Snack", food: "Walnuts + water", benefit: "Brain fuel", loss: "Low memory", notes: "", category: "health" },
  { time: "12:50 - 13:00", task: "Take Vitamin C", food: "After snack", benefit: "Immunity", loss: "Weak immunity", notes: "", category: "health" },
  { time: "13:00 - 13:10", task: "Deep Work: Task B", food: "-", benefit: "Efficiency & delivery", loss: "Pending work piles", notes: "Office", category: "office" },
  { time: "13:10 - 13:20", task: "Deep Work: Task B", food: "-", benefit: "Efficiency & delivery", loss: "Pending work piles", notes: "Office", category: "office" },
  { time: "13:20 - 13:30", task: "Deep Work: Task B", food: "-", benefit: "Efficiency & delivery", loss: "Pending work piles", notes: "Office", category: "office" },
  { time: "13:30 - 13:40", task: "Meetings / Calls", food: "-", benefit: "Good communication", loss: "Misunderstandings", notes: "Office", category: "office" },
  { time: "13:40 - 13:50", task: "Meetings / Calls", food: "-", benefit: "Good communication", loss: "Misunderstandings", notes: "Office", category: "office" },
  { time: "13:50 - 14:00", task: "Meetings / Calls", food: "-", benefit: "Good communication", loss: "Misunderstandings", notes: "Office", category: "office" },
  { time: "14:00 - 14:10", task: "Break + music 🎵", food: "Water / nuts", benefit: "Mental refresh", loss: "Stress, fatigue", notes: "Music", category: "break" },
  { time: "14:10 - 14:20", task: "Break + music 🎵", food: "Water / nuts", benefit: "Mental refresh", loss: "Stress, fatigue", notes: "Music", category: "break" },
  { time: "14:20 - 14:30", task: "Break + music 🎵", food: "Water / nuts", benefit: "Mental refresh", loss: "Stress, fatigue", notes: "Music", category: "break" },
  { time: "14:30 - 14:40", task: "Gaming 🎮 quick refresh", food: "-", benefit: "Fun & stress relief", loss: "Burnout risk", notes: "Gaming", category: "break" },
  { time: "14:40 - 14:50", task: "Gaming 🎮 quick refresh", food: "-", benefit: "Fun & stress relief", loss: "Burnout risk", notes: "Gaming", category: "break" },
  { time: "14:50 - 15:00", task: "Gaming 🎮 quick refresh", food: "-", benefit: "Fun & stress relief", loss: "Burnout risk", notes: "Gaming", category: "break" },
  { time: "15:00 - 15:10", task: "Emails + quick checks", food: "-", benefit: "Stay updated & organized", loss: "Missed info, confusion", notes: "Office", category: "office" },
  { time: "15:10 - 15:20", task: "Emails + quick checks", food: "-", benefit: "Stay updated & organized", loss: "Missed info, confusion", notes: "Office", category: "office" },
  { time: "15:20 - 15:30", task: "Emails + quick checks", food: "-", benefit: "Stay updated & organized", loss: "Missed info, confusion", notes: "Office", category: "office" },
  { time: "15:30 - 15:40", task: "Deep Work: Task A", food: "-", benefit: "Progress on projects", loss: "Backlog grows", notes: "Office", category: "office" },
  { time: "15:40 - 15:50", task: "Deep Work: Task A", food: "-", benefit: "Progress on projects", loss: "Backlog grows", notes: "Office", category: "office" },
  { time: "15:50 - 16:00", task: "Deep Work: Task A", food: "-", benefit: "Progress on projects", loss: "Backlog grows", notes: "Office", category: "office" },
  { time: "16:00 - 16:10", task: "Deep Work: Task B", food: "-", benefit: "Efficiency & delivery", loss: "Pending work piles", notes: "Office", category: "office" },
  { time: "16:10 - 16:20", task: "Deep Work: Task B", food: "-", benefit: "Efficiency & delivery", loss: "Pending work piles", notes: "Office", category: "office" },
  { time: "16:20 - 16:30", task: "Deep Work: Task B", food: "-", benefit: "Efficiency & delivery", loss: "Pending work piles", notes: "Office", category: "office" },
  { time: "16:30 - 16:40", task: "Meetings / Calls", food: "-", benefit: "Good communication", loss: "Misunderstandings", notes: "Office", category: "office" },
  { time: "16:40 - 16:50", task: "Meetings / Calls", food: "-", benefit: "Good communication", loss: "Misunderstandings", notes: "Office", category: "office" },
  { time: "16:50 - 17:00", task: "Meetings / Calls", food: "-", benefit: "Good communication", loss: "Misunderstandings", notes: "Office", category: "office" },
  { time: "17:00 - 17:10", task: "Break + music 🎵", food: "Water / nuts", benefit: "Mental refresh", loss: "Stress, fatigue", notes: "Music", category: "break" },
  { time: "17:10 - 17:20", task: "Break + music 🎵", food: "Water / nuts", benefit: "Mental refresh", loss: "Stress, fatigue", notes: "Music", category: "break" },
  { time: "17:20 - 17:30", task: "Break + music 🎵", food: "Water / nuts", benefit: "Mental refresh", loss: "Stress, fatigue", notes: "Music", category: "break" },
  { time: "17:30 - 17:40", task: "Gaming 🎮 quick refresh", food: "-", benefit: "Fun & stress relief", loss: "Burnout risk", notes: "Gaming", category: "break" },
  { time: "17:40 - 17:50", task: "Gaming 🎮 quick refresh", food: "-", benefit: "Fun & stress relief", loss: "Burnout risk", notes: "Gaming", category: "break" },
  { time: "17:50 - 18:00", task: "Gaming 🎮 quick refresh", food: "-", benefit: "Fun & stress relief", loss: "Burnout risk", notes: "Gaming", category: "break" },
  { time: "18:00 - 18:10", task: "Emails + quick checks", food: "-", benefit: "Stay updated & organized", loss: "Missed info, confusion", notes: "Office", category: "office" },
  { time: "18:10 - 18:20", task: "Emails + quick checks", food: "-", benefit: "Stay updated & organized", loss: "Missed info, confusion", notes: "Office", category: "office" },
  { time: "18:20 - 18:30", task: "Emails + quick checks", food: "-", benefit: "Stay updated & organized", loss: "Missed info, confusion", notes: "Office", category: "office" },
  { time: "18:30 - 18:40", task: "Deep Work: Task A", food: "-", benefit: "Progress on projects", loss: "Backlog grows", notes: "Office", category: "office" },
  { time: "18:40 - 18:50", task: "Deep Work: Task A", food: "-", benefit: "Progress on projects", loss: "Backlog grows", notes: "Office", category: "office" },
  { time: "18:50 - 19:00", task: "Deep Work: Task A", food: "-", benefit: "Progress on projects", loss: "Backlog grows", notes: "Office", category: "office" },
  { time: "19:00 - 19:10", task: "Deep Work: Task B", food: "-", benefit: "Efficiency & delivery", loss: "Pending work piles", notes: "Office", category: "office" },
  { time: "19:10 - 19:20", task: "Deep Work: Task B", food: "-", benefit: "Efficiency & delivery", loss: "Pending work piles", notes: "Office", category: "office" },
  { time: "19:20 - 19:30", task: "Deep Work: Task B", food: "-", benefit: "Efficiency & delivery", loss: "Pending work piles", notes: "Office", category: "office" },
  { time: "19:30 - 19:40", task: "Meetings / Calls", food: "-", benefit: "Good communication", loss: "Misunderstandings", notes: "Office", category: "office" },
  { time: "19:40 - 19:50", task: "Meetings / Calls", food: "-", benefit: "Good communication", loss: "Misunderstandings", notes: "Office", category: "office" },
  { time: "19:50 - 20:00", task: "Meetings / Calls", food: "-", benefit: "Good communication", loss: "Misunderstandings", notes: "Office", category: "office" },
  { time: "20:00 - 20:10", task: "Break + music 🎵", food: "Water / nuts", benefit: "Mental refresh", loss: "Stress, fatigue", notes: "Music", category: "break" },
  { time: "20:10 - 20:20", task: "Break + music 🎵", food: "Water / nuts", benefit: "Mental refresh", loss: "Stress, fatigue", notes: "Music", category: "break" },
  { time: "20:20 - 20:30", task: "Break + music 🎵", food: "Water / nuts", benefit: "Mental refresh", loss: "Stress, fatigue", notes: "Music", category: "break" },
  { time: "20:30 - 20:40", task: "Gaming 🎮 quick refresh", food: "-", benefit: "Fun & stress relief", loss: "Burnout risk", notes: "Gaming", category: "break" },
  { time: "20:40 - 20:50", task: "Gaming 🎮 quick refresh", food: "-", benefit: "Fun & stress relief", loss: "Burnout risk", notes: "Gaming", category: "break" },
  { time: "20:50 - 21:00", task: "Gaming 🎮 quick refresh", food: "-", benefit: "Fun & stress relief", loss: "Burnout risk", notes: "Gaming", category: "break" },
  { time: "21:00 - 21:10", task: "Emails + quick checks", food: "-", benefit: "Stay updated & organized", loss: "Missed info, confusion", notes: "Office", category: "office" },
  { time: "21:10 - 21:20", task: "Emails + quick checks", food: "-", benefit: "Stay updated & organized", loss: "Missed info, confusion", notes: "Office", category: "office" },
  { time: "21:20 - 21:30", task: "Emails + quick checks", food: "-", benefit: "Stay updated & organized", loss: "Missed info, confusion", notes: "Office", category: "office" },
  { time: "21:30 - 21:40", task: "Deep Work: Task A", food: "-", benefit: "Progress on projects", loss: "Backlog grows", notes: "Office", category: "office" },
  { time: "21:40 - 21:50", task: "Deep Work: Task A", food: "-", benefit: "Progress on projects", loss: "Backlog grows", notes: "Office", category: "office" },
  { time: "21:50 - 22:00", task: "Deep Work: Task A", food: "-", benefit: "Progress on projects", loss: "Backlog grows", notes: "Office", category: "office" },
  { time: "22:00 - 22:10", task: "Green tea", food: "Green tea", benefit: "Antioxidants", loss: "Low metabolism", notes: "", category: "health" },
  { time: "22:10 - 22:20", task: "Sunbath walk", food: "-", benefit: "Vitamin D, mood boost", loss: "Weak bones, low mood", notes: "", category: "health" },
  { time: "22:20 - 22:30", task: "Take Swiss Multivitamin", food: "After breakfast", benefit: "Balanced nutrition", loss: "Weak immunity", notes: "", category: "health" },
  { time: "22:30 - 22:40", task: "Meditation", food: "-", benefit: "Calm mind, focus", loss: "Stress, anxiety", notes: "", category: "health" },
  { time: "22:40 - 22:50", task: "DSA – easy problem", food: "-", benefit: "Logic warm-up", loss: "Slow start", notes: "", category: "coding" },
  { time: "22:50 - 23:00", task: "Revise notes", food: "-", benefit: "Strong memory", loss: "Forgetfulness", notes: "", category: "learning" },
  { time: "23:00 - 23:10", task: "Watch Critical Thinking Video 🎥", food: "-", benefit: "Boost reasoning, problem-solving, creativity", loss: "Slower decisions, weak analytical skills", notes: "Critical Thinking", category: "learning" },
  { time: "23:10 - 23:20", task: "Debug code", food: "-", benefit: "Sharp problem-solving", loss: "Confusion", notes: "", category: "coding" },
  { time: "23:20 - 23:30", task: "Snack", food: "1 banana", benefit: "Quick energy", loss: "Brain fog", notes: "", category: "health" },
  { time: "23:30 - 23:40", task: "Take Vitamin B-Complex", food: "After banana", benefit: "Nerve + brain support", loss: "Fatigue", notes: "", category: "health" },
  { time: "23:40 - 23:50", task: "Stretch break + lo-fi music 🎵", food: "-", benefit: "Relaxation", loss: "Mental tiredness", notes: "Music", category: "break" },
  { time: "23:50 - 24:00", task: "DSA – medium problem", food: "-", benefit: "Improved logic", loss: "Stagnation", notes: "", category: "coding" }
];

/** ---------- Helpers ---------- */
const dateKey = (d = new Date()) =>
  d.toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" }); // YYYY-MM-DD

const parseHHMM = (hhmm) => {
  const [h, m] = hhmm.split(":" ).map(Number);
  return (h === 24 ? 24 : h) * 60 + m;
};

const parseRange = (range) => {
  const [start, end] = range.split(" - ");
  return [parseHHMM(start), parseHHMM(end)];
};

const findCurrentTaskIndex = () => {
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  for (let i = 0; i < tasks.length; i++) {
    const [s, e] = parseRange(tasks[i].time);
    if (mins >= s && mins < e) return i;
  }
  return -1;
};

const secondsLeftInCurrent = (idx) => {
  if (idx < 0) return 0;
  const [, end] = parseRange(tasks[idx].time);
  const now = new Date();
  const nowSec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  const endSec = end * 60;
  const left = Math.max(0, endSec - nowSec);
  return left;
};

/** ---------- LocalStorage keys ---------- */
const LS_COMPLETIONS = (dk) => `tt_completions_${dk}`;
const LS_SKIPS = (dk) => `tt_skips_${dk}`;
const LS_STREAK = "tt_streak";
const LS_LAST_DATE = "tt_last_date";
const LS_EMERGENCY = (dk) => `tt_emergency_${dk}`;

/** ---------- Tiny beep on task change ---------- */
const beep = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(880, ctx.currentTime);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.22);
  } catch {}
};

/** ---------- Main App ---------- */
export default function App() {
  const [dk, setDk] = useState(dateKey());
  const [currentIdx, setCurrentIdx] = useState(findCurrentTaskIndex());
  const [timeLeft, setTimeLeft] = useState(secondsLeftInCurrent(findCurrentTaskIndex()));
  const [focusMode, setFocusMode] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [emergencyLeft, setEmergencyLeft] = useState(() => {
    try { return Number(localStorage.getItem(LS_EMERGENCY(dateKey())) || 10); } catch { return 10; }
  });
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [taskCompletedEarly, setTaskCompletedEarly] = useState(false);

  // load persisted arrays
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_COMPLETIONS(dateKey())) || "[]"); } catch { return []; }
  });
  const [skipped, setSkipped] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_SKIPS(dateKey())) || "[]"); } catch { return []; }
  });
  const [streak, setStreak] = useState(() => Number(localStorage.getItem(LS_STREAK) || 0));

  const currentTask = currentIdx >= 0 ? tasks[currentIdx] : null;

  // Derived stats
  const completedSet = useMemo(() => new Set(completed), [completed]);
  const skippedSet = useMemo(() => new Set(skipped), [skipped]);
  const doneCount = completedSet.size;
  const skipCount = skippedSet.size;
  const total = tasks.length;
  const successRate = Math.round((doneCount / total) * 100);

  // Request notification permission once
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  // Tick every second: update timer, detect task changes & date rollover
  useEffect(() => {
    let lastIdx = findCurrentTaskIndex();
    const timer = setInterval(() => {
      const nowIdx = findCurrentTaskIndex();
      setCurrentIdx(nowIdx);
      setTimeLeft(secondsLeftInCurrent(nowIdx));

      // date rollover handling
      const nowKey = dateKey();
      if (nowKey !== dk) {
        finalizePreviousDay(dk);
        setDk(nowKey);
        const newC = JSON.parse(localStorage.getItem(LS_COMPLETIONS(nowKey) || "[]") || "[]");
        const newS = JSON.parse(localStorage.getItem(LS_SKIPS(nowKey) || "[]") || "[]");
        setCompleted(Array.isArray(newC) ? newC : []);
        setSkipped(Array.isArray(newS) ? newS : []);
        setShowReport(true);
      }

      // Task change: notify + beep
      if (nowIdx !== lastIdx) {
        if (currentTask) {
          notifyTask(nowIdx);
          beep();
        }
        lastIdx = nowIdx;
      }

      // Auto lock/unlock depending on task state
      if (nowIdx >= 0 && !emergencyActive) {
        if (taskCompletedEarly) {
          setFocusMode(false); // unlock if task was completed early
        } else {
          setFocusMode(true); // lock during active task if not completed
        }
      } else if (nowIdx < 0 && !emergencyActive) {
        setFocusMode(false); // unlock only when no task is running
        setTaskCompletedEarly(false); // reset for next task
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [dk, emergencyActive, currentTask, taskCompletedEarly]);

  // persist emergency
  useEffect(() => {
    localStorage.setItem(LS_EMERGENCY(dk), String(emergencyLeft));
  }, [emergencyLeft, dk]);

  // detect tab switch → lock
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && focusMode && !emergencyActive) {
        setFocusMode(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [focusMode, emergencyActive]);

  // Emergency skip logic
  const useEmergencySkip = () => {
    if (emergencyLeft <= 0 || emergencyActive) return;
    setEmergencyLeft(emergencyLeft - 1);
    setEmergencyActive(true);
    setFocusMode(false);
    setTimeout(() => {
      setEmergencyActive(false);
      if (findCurrentTaskIndex() >= 0 && !taskCompletedEarly) setFocusMode(true);
    }, 15 * 60 * 1000);
  };

  const notifyTask = (idx) => {
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") return;
    const title = idx >= 0 ? `Now: ${tasks[idx].task}` : "Free slot";
    const body = idx >= 0 ? `Time: ${tasks[idx].time}` : "No task right now.";
    try { new Notification(title, { body, silent: true }); } catch {}
  };

  const canActOnCurrent = currentIdx >= 0 && !completedSet.has(currentIdx) && !skippedSet.has(currentIdx);

  const markDone = () => {
    if (!canActOnCurrent) return;
    setCompleted([...completed, currentIdx]);
    setTaskCompletedEarly(true); // mark that task is completed early
    setFocusMode(false); // unlock phone until next task
  };

  const skipTask = () => {
    if (!canActOnCurrent) return;
    setSkipped([...skipped, currentIdx]);
    setStreak(0);
    localStorage.setItem(LS_LAST_DATE, dk);
  };

  const finalizePreviousDay = (prevKey) => {
    const c = JSON.parse(localStorage.getItem(LS_COMPLETIONS(prevKey) || "[]") || "[]");
    const s = JSON.parse(localStorage.getItem(LS_SKIPS(prevKey) || "[]") || "[]");
    const hadSkip = Array.isArray(s) && s.length > 0;
    const allDone = Array.isArray(c) && c.length === tasks.length;

    const lastDate = localStorage.getItem(LS_LAST_DATE);
    if (lastDate !== prevKey) {
      if (!hadSkip && allDone) {
        const newStreak = Number(localStorage.getItem(LS_STREAK) || 0) + 1;
        localStorage.setItem(LS_STREAK, String(newStreak));
      } else {
        localStorage.setItem(LS_STREAK, "0");
      }
      localStorage.setItem(LS_LAST_DATE, prevKey);
      setStreak(Number(localStorage.getItem(LS_STREAK) || 0));
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? "0" : ""}${s}s`;
  };

  const categoryClass = (cat) => {
    switch (cat) {
      case "health": return "badge green";
      case "coding": return "badge indigo";
      case "learning": return "badge blue";
      case "office": return "badge amber";
      case "break": return "badge rose";
      case "personal": return "badge slate";
      default: return "badge";
    }
  };

  const resetToday = () => {
    setCompleted([]);
    setSkipped([]);
    localStorage.removeItem(LS_COMPLETIONS(dk));
    localStorage.removeItem(LS_SKIPS(dk));
  };

  return (
    <div className={`app-container ${focusMode ? "focus" : ""}`}>
      <header className="topbar">
        <div className="brand">Discipline Tracker</div>
        <div className="top-actions">
          <button className="btn outline" onClick={() => setShowReport(true)}>View Report</button>
          <button className="btn warning" onClick={useEmergencySkip} disabled={emergencyLeft <= 0 || emergencyActive}>
            Emergency Skip ({emergencyLeft} left)
          </button>
          <button className="btn ghost" onClick={resetToday}>Reset Today</button>
        </div>
      </header>

      <section className="stats">
        <div className="stat">
          <div className="stat-head">Streak</div>
          <div className="stat-value">{streak} 🔥</div>
        </div>
        <div className="stat">
          <div className="stat-head">Completed</div>
          <div className="stat-value">{doneCount}/{total}</div>
        </div>
        <div className="stat">
          <div className="stat-head">Skipped</div>
          <div className="stat-value">{skipCount}</div>
        </div>
        <div className="progress-wrap">
          <div className="progress-label">Daily Progress: {successRate}%</div>
          <div className="progress">
            <div className="progress-bar" style={{ width: `${successRate}%` }} />
          </div>
        </div>
      </section>

      <main className="main">
        {currentTask ? (
          <div className="task-card">
            <div className="task-time">⏰ {currentTask.time}</div>
            <div className="task-title">{currentTask.task}</div>

            <div className="badges">
              <span className={categoryClass(currentTask.category)}>{currentTask.category}</span>
              {currentTask.food !== "-" && <span className="badge neutral">🍽 {currentTask.food}</span>}
            </div>

            <div className="benefits">
              <div className="benefit">✅ {currentTask.benefit}</div>
              <div className="loss">❌ {currentTask.loss}</div>
            </div>

            <div className="timer">⏳ {formatTime(timeLeft)} left</div>

            <div className="actions">
              <button className="btn success" disabled={!canActOnCurrent} onClick={markDone}>Mark Done</button>
              <button className="btn danger" disabled={!canActOnCurrent} onClick={skipTask}>Skip</button>
            </div>

            {!canActOnCurrent && (
              <div className="mini-note">
                {completedSet.has(currentIdx) ? "You completed this task ✅" :
                 skippedSet.has(currentIdx) ? "You skipped this task ❌" :
                 "Waiting..."}
              </div>
            )}
          </div>
        ) : (
          <div className="free-card">
            <div className="free-title">No task right now 🎉</div>
            <div className="free-sub">Use this window to stretch, hydrate, or prep for the next slot.</div>
          </div>
        )}
      </main>

      {showReport && (
        <div className="modal-backdrop" onClick={() => setShowReport(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">Daily Report — {dk}</div>
            <div className="modal-body">
              <div className="report-row"><span>Completed:</span><b>{doneCount}</b></div>
              <div className="report-row"><span>Skipped:</span><b>{skipCount}</b></div>
              <div className="report-row"><span>Total Tasks:</span><b>{total}</b></div>
              <div className="report-row"><span>Success Rate:</span><b>{successRate}%</b></div>
              <div className="report-note">
                {skipCount > 0
                  ? "You skipped at least one task — streak reset."
                  : doneCount === total
                    ? "Perfect day! Streak will increase at midnight 👑"
                    : "Aim for full completion to build your streak 💪"}
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn primary" onClick={() => setShowReport(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {focusMode && !emergencyActive && <div className="focus-overlay" />}
    </div>
  );
}
