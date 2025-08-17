



// DailyChallengeApp.jsx
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import tasks from "./taskList.json"; // <-- Using import for task list

const getTodayTasks = () => {
  const startDate = new Date("2025-07-06");
  const today = new Date();
  const dayDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  const startIndex = dayDiff * 16;
  const endIndex = startIndex + 16;
  return tasks.slice(startIndex, endIndex);
};

export default function DailyChallengeApp() {
  const [todayTasks, setTodayTasks] = useState([]);
  const [missedCount, setMissedCount] = useState(Number(localStorage.getItem("missedCount")) || 0);
  const [lockedOut, setLockedOut] = useState(localStorage.getItem("lockout") === format(new Date(), "yyyy-MM-dd"));
  const [completionMap, setCompletionMap] = useState({});

  useEffect(() => {
    const list = getTodayTasks();
    const map = {};
    const today = format(new Date(), "yyyy-MM-dd");
    list.forEach((_, i) => {
      const hour = i + 6;
      const key = `${today}-${hour.toString().padStart(2, "0")}`;
      map[key] = localStorage.getItem(key) === "completed";
    });
    setTodayTasks(list);
    setCompletionMap(map);
  }, []);

  const handleMarkComplete = (hour) => {
    const today = format(new Date(), "yyyy-MM-dd");
    const key = `${today}-${hour.toString().padStart(2, "0")}`;
    localStorage.setItem(key, "completed");
    setCompletionMap({ ...completionMap, [key]: true });
  };

  const handlePunishment = (hour) => {
    const newMissed = missedCount + 1;
    setMissedCount(newMissed);
    localStorage.setItem("missedCount", newMissed);

    let message = `⚠️ Missed task for ${hour}:00\nNo phone tomorrow, 100 pushups, write apology letter, uninstall distractions.`;

    if (newMissed >= 3) {
      message += "\n🚫 You are locked out for the rest of the day due to 3+ missed tasks.";
      const todayKey = format(new Date(), "yyyy-MM-dd");
      localStorage.setItem("lockout", todayKey);
      setLockedOut(true);
    }

    alert(message);
  };

  useEffect(() => {
    const now = new Date();
    const minutesUntilNextHour = 60 - now.getMinutes();
    const currentHour = now.getHours();
    const today = format(new Date(), "yyyy-MM-dd");
    const key = `${today}-${currentHour.toString().padStart(2, "0")}`;
    const timer = setTimeout(() => {
      if (!localStorage.getItem(key)) {
        handlePunishment(currentHour);
      }
    }, minutesUntilNextHour * 60 * 1000);
    return () => clearTimeout(timer);
  }, [completionMap]);

  if (lockedOut) {
    return (
      <div className="min-h-screen bg-red-100 flex items-center justify-center text-center p-10">
        <div className="bg-white p-10 rounded-xl shadow-xl border-2 border-red-400">
          <h1 className="text-3xl font-bold text-red-600 mb-4">🚫 Locked Out</h1>
          <p className="text-lg">You missed too many tasks today.<br />Come back tomorrow and start fresh. 💪</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col items-center p-6">
      <div className="shadow-2xl rounded-2xl w-full max-w-4xl border-2 border-blue-300 bg-white p-8">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">📅 Today's Hourly Tasks</h2>
        <ul className="space-y-4">
          {todayTasks.map((task, i) => {
            const hour = i + 6;
            const today = format(new Date(), "yyyy-MM-dd");
            const key = `${today}-${hour.toString().padStart(2, "0")}`;
            return (
              <li key={i} className="flex items-start justify-between border border-gray-300 p-4 rounded-xl bg-gray-50">
                <div>
                  <p className="font-semibold text-blue-900">{hour}:00 - {task.title}</p>
                  <p className="text-gray-700 text-sm italic">{task.desc}</p>
                </div>
                <button
                  disabled={completionMap[key]}
                  onClick={() => handleMarkComplete(hour)}
                  className={`ml-4 px-4 py-2 rounded-full text-white text-sm ${
                    completionMap[key] ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {completionMap[key] ? "✔️ Done" : "✅ Mark Done"}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-sm text-gray-500 text-center">Missed today: {missedCount} / 3</p>
      </div>
    </div>
  );
}
