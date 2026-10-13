import { Link } from 'react-router-dom';
import { QUESTIONS, ALL_FORMATS } from '../../data/questions';
import { COURSES } from '../../data/courses';
import { SCHEDULE_START, getDaySchedule } from '../../lib/schedule';
import { todayPH } from '../../lib/date';
import { HestiaMascot } from '../../components/HestiaMascot';
import { HelpCircle, Calendar, Clock, ArrowRight } from 'lucide-react';

export default function AdminOverview() {
  const today = todayPH();
  const scheduleToday = getDaySchedule(today);
  const totalCards = QUESTIONS.length;
  const totalCourses = COURSES.length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-3xl border border-hairline bg-white p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="rounded-full bg-brand/10 px-2.5 py-1 text-2xs font-extrabold uppercase tracking-wider text-brand">
            Curriculum Administration
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-ink mt-2">
            Hulog Question Bank & Schedule Monitor
          </h2>
          <p className="text-xs text-ink-muted mt-1 max-w-xl">
            Tingnan ang lahat ng question cards na naka-map sa FRP 101–108, subaybayan ang petsa kung kailan lalabas sa bawat manlalaro, at i-audit ang tamang sagot at paliwanag.
          </p>
        </div>
        <HestiaMascot pose="ok" height={110} className="shrink-0" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card p-4">
          <span className="text-[10px] font-bold uppercase text-ink-muted">Total Questions</span>
          <p className="text-2xl font-black text-brand mt-1">{totalCards}</p>
          <span className="text-[11px] text-ink-muted font-medium">Across all courses</span>
        </div>

        <div className="card p-4">
          <span className="text-[10px] font-bold uppercase text-ink-muted">Active FRP Courses</span>
          <p className="text-2xl font-black text-cocoa mt-1">{totalCourses}</p>
          <span className="text-[11px] text-ink-muted font-medium">FRP 101 hanggang 108</span>
        </div>

        <div className="card p-4">
          <span className="text-[10px] font-bold uppercase text-ink-muted">Game Formats</span>
          <p className="text-2xl font-black text-emerald-700 mt-1">{ALL_FORMATS.length}</p>
          <span className="text-[11px] text-ink-muted font-medium">Scam, Sort, Tama o Mali, atbp.</span>
        </div>

        <div className="card p-4">
          <span className="text-[10px] font-bold uppercase text-ink-muted">Schedule Origin</span>
          <p className="text-2xl font-black text-flame-deep mt-1">Day #1</p>
          <span className="text-[11px] text-ink-muted font-medium">{SCHEDULE_START}</span>
        </div>
      </div>

      {/* Today's Live Schedule Card */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-black text-ink flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand" />
              Naka-schedule Ngayong Araw ({today})
            </h3>
            <p className="text-xs text-ink-muted">
              Ito ang eksaktong 3 cards na makikita ng bawat player ngayong araw:
            </p>
          </div>
          <Link
            to="/admin/calendar"
            className="text-xs font-bold text-brand hover:underline flex items-center gap-1"
          >
            Tingnan ang Full Calendar <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {scheduleToday ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {scheduleToday.cards.map((c, idx) => (
              <div
                key={c.question.id}
                className="rounded-2xl border border-stone-200 bg-stone-50/60 p-3.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="rounded bg-brand/10 px-1.5 py-0.5 text-[10px] font-bold text-brand">
                      Slot {idx + 1} · {c.role}
                    </span>
                    <span className="text-[10px] font-extrabold text-ink-muted">
                      {c.question.id}
                    </span>
                  </div>
                  <h4 className="text-xs font-black text-ink">{c.question.format}</h4>
                  <p className="text-xs text-ink-muted mt-1 line-clamp-3 leading-snug">
                    {c.question.prompt}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-stone-200/80 text-[10px] font-bold text-emerald-800">
                  Sagot: {c.question.answerLabel}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-ink-muted">Walang naka-schedule.</p>
        )}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/admin/questions"
          className="card p-5 hover:border-brand transition group flex items-start gap-4"
        >
          <div className="rounded-2xl bg-brand/10 p-3 text-brand group-hover:bg-brand group-hover:text-white transition">
            <HelpCircle className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-ink group-hover:text-brand transition">
              Question Bank Inspector
            </h4>
            <p className="text-xs text-ink-muted mt-1 leading-relaxed">
              I-filter ayon sa FRP course o format (Scam o Legit, Sweldo Sort, atbp.). Makikita ang bawat tanong, tamang sagot, paliwanag ni Hestia, at kung kailan ito lalabas.
            </p>
          </div>
        </Link>

        <Link
          to="/admin/calendar"
          className="card p-5 hover:border-brand transition group flex items-start gap-4"
        >
          <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-ink group-hover:text-emerald-700 transition">
              Calendar & Show Dates
            </h4>
            <p className="text-xs text-ink-muted mt-1 leading-relaxed">
              Tingnan ang pang-araw-araw na schedule sa buong taon. I-export sa CSV para sa Excel o Google Sheets, at makita ang Sunday Boss simulations.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
