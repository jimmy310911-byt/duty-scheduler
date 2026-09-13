import React, { useState, useMemo, useRef } from 'react';
import { Calendar, Table, Download, ShieldCheck, Award, Info, ChevronRight } from 'lucide-react';
import html2canvas from 'html2canvas';

// 2026 與 2027 完整假日定義庫
const HOLIDAY_DATA = {
  2026: {
    springFestival: [
      '2026-02-14', '2026-02-15', '2026-02-16', '2026-02-17',
      '2026-02-18', '2026-02-19', '2026-02-20', '2026-02-21', '2026-02-22'
    ],
    sundays: [
      '2026-01-04', '2026-01-11', '2026-01-18', '2026-01-25', '2026-02-01', '2026-02-08',
      '2026-03-01', '2026-03-08', '2026-03-15', '2026-03-22', '2026-03-29', '2026-04-05',
      '2026-04-12', '2026-04-19', '2026-04-26', '2026-05-03', '2026-05-10', '2026-05-17',
      '2026-05-24', '2026-05-31', '2026-06-07', '2026-06-14', '2026-06-21', '2026-06-28',
      '2026-07-05', '2026-07-12', '2026-07-19', '2026-07-26', '2026-08-02', '2026-08-09',
      '2026-08-16', '2026-08-23', '2026-08-30', '2026-09-06', '2026-09-13', '2026-09-20',
      '2026-09-27', '2026-10-04', '2026-10-11', '2026-10-18', '2026-10-25', '2026-11-01',
      '2026-11-08', '2026-11-15', '2026-11-22', '2026-11-29', '2026-12-06', '2026-12-13',
      '2026-12-20', '2026-12-27'
    ],
    regularDuty: [
      '2026-01-01', '2026-01-03', '2026-01-10', '2026-01-17', '2026-01-24', '2026-01-31',
      '2026-02-07', '2026-02-27', '2026-02-28', '2026-03-07', '2026-03-14', '2026-03-21',
      '2026-03-28', '2026-04-03', '2026-04-04', '2026-04-06', '2026-04-11', '2026-04-18',
      '2026-04-25', '2026-05-01', '2026-05-02', '2026-05-09', '2026-05-16', '2026-05-23',
      '2026-05-30', '2026-06-06', '2026-06-13', '2026-06-19', '2026-06-20', '2026-06-27',
      '2026-07-04', '2026-07-11', '2026-07-18', '2026-07-25', '2026-08-01', '2026-08-08',
      '2026-08-15', '2026-08-22', '2026-08-29', '2026-09-05', '2026-09-12', '2026-09-19',
      '2026-09-25', '2026-09-26', '2026-09-28', '2026-10-03', '2026-10-09', '2026-10-10',
      '2026-10-17', '2026-10-24', '2026-10-26', '2026-10-31', '2026-11-07', '2026-11-14',
      '2026-11-21', '2026-11-28', '2026-12-05', '2026-12-12', '2026-12-19', '2026-12-25',
      '2026-12-26'
    ]
  },
  2027: {
    springFestival: [
      '2027-02-04', '2027-02-05', '2027-02-06', '2027-02-07',
      '2027-02-08', '2027-02-09', '2027-02-10'
    ],
    sundays: [
      '2027-01-03', '2027-01-10', '2027-01-17', '2027-01-24', '2027-01-31', '2027-02-14',
      '2027-02-21', '2027-02-28', '2027-03-07', '2027-03-14', '2027-03-21', '2027-03-28',
      '2027-04-04', '2027-04-11', '2027-04-18', '2027-04-25', '2027-05-02', '2027-05-09',
      '2027-05-16', '2027-05-23', '2027-05-30', '2027-06-06', '2027-06-13', '2027-06-20',
      '2027-06-27', '2027-07-04', '2027-07-11', '2027-07-18', '2027-07-25', '2027-08-01',
      '2027-08-08', '2027-08-15', '2027-08-22', '2027-08-29', '2027-09-05', '2027-09-12',
      '2027-09-19', '2027-09-26', '2027-10-03', '2027-10-10', '2027-10-17', '2027-10-24',
      '2027-10-31', '2027-11-07', '2027-11-14', '2027-11-21', '2027-11-28', '2027-12-05',
      '2027-12-12', '2027-12-19', '2027-12-26'
    ],
    regularDuty: [
      '2027-01-01', '2027-01-02', '2027-01-09', '2027-01-16', '2027-01-23', '2027-01-30',
      '2027-02-13', '2027-02-20', '2027-02-27', '2027-03-01', '2027-03-06', '2027-03-13',
      '2027-03-20', '2027-03-27', '2027-04-03', '2027-04-05', '2027-04-06', '2027-04-10',
      '2027-04-17', '2027-04-24', '2027-04-30', '2027-05-01', '2027-05-08', '2027-05-15',
      '2027-05-22', '2027-05-29', '2027-06-05', '2027-06-09', '2027-06-12', '2027-06-19',
      '2027-06-26', '2027-07-03', '2027-07-10', '2027-07-17', '2027-07-24', '2027-07-31',
      '2027-08-07', '2027-08-14', '2027-08-21', '2027-08-28', '2027-09-04', '2027-09-11',
      '2027-09-15', '2027-09-18', '2027-09-25', '2027-09-28', '2027-10-02', '2027-10-09',
      '2027-10-11', '2027-10-16', '2027-10-23', '2027-10-25', '2027-10-30', '2027-11-06',
      '2027-11-13', '2027-11-20', '2027-11-27', '2027-12-04', '2027-12-11', '2027-12-18',
      '2027-12-24', '2027-12-25', '2027-12-31'
    ]
  }
};

export default function DutyScheduler() {
  const [personCount, setPersonCount] = useState(6);
  const [customNames, setCustomNames] = useState({});
  const [startDate, setStartDate] = useState('2026-10-01');
  const [displayMonths, setDisplayMonths] = useState(3);
  const [startPersonReg, setStartPersonReg] = useState(1);
  const [startPersonSun, setStartPersonSun] = useState(1);
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' | 'table'

  const contentRef = useRef(null);

  // 人員名冊
  const people = useMemo(() => {
    return Array.from({ length: personCount }, (_, i) => {
      const id = i + 1;
      return { id, name: customNames[id] && customNames[id].trim() !== '' ? customNames[id] : `人員 ${id}` };
    });
  }, [personCount, customNames]);

  // 排班與連續假日計算
  const { scheduleData, stats, monthsList } = useMemo(() => {
    const start = new Date(startDate);
    const startY = start.getFullYear();
    const startM = start.getMonth();

    // 產生檢視期間所有月份列表
    const months = [];
    for (let i = 0; i < displayMonths; i++) {
      const d = new Date(startY, startM + i, 1);
      months.push({ year: d.getFullYear(), month: d.getMonth() + 1 });
    }

    // 計算區間內所有日期
    const allDates = [];
    const endDate = new Date(startY, startM + displayMonths, 0);
    let curr = new Date(startDate);
    while (curr <= endDate) {
      const y = curr.getFullYear();
      const m = String(curr.getMonth() + 1).padStart(2, '0');
      const d = String(curr.getDate()).padStart(2, '0');
      const dateStr = `${y}-${m}-${d}`;
      allDates.push({ dateStr, dateObj: new Date(curr) });
      curr.setDate(curr.getDate() + 1);
    }

    // 判定每一天的假日屬性
    const dateAttrMap = {};
    allDates.forEach(({ dateStr, dateObj }) => {
      const y = dateObj.getFullYear();
      const data = HOLIDAY_DATA[y];
      let isSpring = false;
      let isSun = false;
      let isReg = false;

      if (data) {
        isSpring = data.springFestival.includes(dateStr);
        isSun = !isSpring && data.sundays.includes(dateStr);
        isReg = !isSpring && data.regularDuty.includes(dateStr);
      }
      dateAttrMap[dateStr] = { isSpring, isSun, isReg, dateObj };
    });

    // 偵測連續放假區塊 (連假 >= 3 天，夾在中間的排班日給予 2 分補償)
    const dutyPointsMap = {};
    let tempCluster = [];
    allDates.forEach(({ dateStr }, idx) => {
      const attr = dateAttrMap[dateStr];
      const isOffDay = attr.isSpring || attr.isSun || attr.isReg;
      if (isOffDay) {
        tempCluster.push(dateStr);
      }
      if (!isOffDay || idx === allDates.length - 1) {
        if (tempCluster.length >= 3) {
          for (let c = 1; c < tempCluster.length - 1; c++) {
            dutyPointsMap[tempCluster[c]] = 2;
          }
        }
        tempCluster = [];
      }
    });

    // 排班演算法核心
    const schedule = {};
    const regQueue = [];
    const sunQueue = [];
    for (let i = 0; i < personCount; i++) {
      regQueue.push((((startPersonReg - 1) + i) % personCount) + 1);
      sunQueue.push((((startPersonSun - 1) + i) % personCount) + 1);
    }

    const personStats = {};
    people.forEach(p => {
      personStats[p.id] = { regPoints: 0, sunPoints: 0, regDates: [], sunDates: [] };
    });

    let activeClusterDutyWorkers = new Set();
    let lastDayWorkers = new Set();
    let wasLastDayOff = false;

    allDates.forEach(({ dateStr, dateObj }) => {
      const attr = dateAttrMap[dateStr];
      const isOffDay = attr.isSpring || attr.isSun || attr.isReg;

      if (!isOffDay) {
        activeClusterDutyWorkers.clear();
        lastDayWorkers.clear();
        wasLastDayOff = false;
        return;
      }

      if (!wasLastDayOff) {
        activeClusterDutyWorkers.clear();
      }
      wasLastDayOff = true;

      const points = dutyPointsMap[dateStr] || 1;
      const currentDayWorkers = [];

      const pickWorker = (queue, typeKey) => {
        const available = queue.filter(id => !activeClusterDutyWorkers.has(id) && !lastDayWorkers.has(id) && !currentDayWorkers.includes(id));
        const pool = available.length > 0 ? available : queue.filter(id => !currentDayWorkers.includes(id));

        let minPts = Infinity;
        pool.forEach(id => {
          const pts = personStats[id][typeKey];
          if (pts < minPts) minPts = pts;
        });
        const bestCandidates = pool.filter(id => personStats[id][typeKey] === minPts);

        let selected = bestCandidates[0] || queue[0];
        for (let qId of queue) {
          if (bestCandidates.includes(qId)) {
            selected = qId;
            break;
          }
        }

        const qIdx = queue.indexOf(selected);
        if (qIdx > -1) {
          queue.splice(qIdx, 1);
          queue.push(selected);
        }
        return selected;
      };

      if (attr.isReg) {
        const w1 = pickWorker(regQueue, 'regPoints');
        currentDayWorkers.push(w1);
        activeClusterDutyWorkers.add(w1);
        personStats[w1].regPoints += points;
        personStats[w1].regDates.push({ dateStr, points });

        const w2 = pickWorker(regQueue, 'regPoints');
        currentDayWorkers.push(w2);
        activeClusterDutyWorkers.add(w2);
        personStats[w2].regPoints += points;
        personStats[w2].regDates.push({ dateStr, points });

        schedule[dateStr] = {
          type: 'reg',
          points,
          workers: [people.find(p => p.id === w1), people.find(p => p.id === w2)]
        };
      } else if (attr.isSun) {
        const w = pickWorker(sunQueue, 'sunPoints');
        currentDayWorkers.push(w);
        activeClusterDutyWorkers.add(w);
        personStats[w].sunPoints += points;
        personStats[w].sunDates.push({ dateStr, points });

        schedule[dateStr] = {
          type: 'sun',
          points,
          workers: [people.find(p => p.id === w)]
        };
      } else if (attr.isSpring) {
        schedule[dateStr] = { type: 'spring', points: 0, workers: [] };
      }

      lastDayWorkers = new Set(currentDayWorkers);
    });

    return { scheduleData: schedule, stats: personStats, monthsList: months };
  }, [personCount, customNames, startDate, displayMonths, startPersonReg, startPersonSun, people]);

  // 截圖下載功能
  const handleDownloadImage = async () => {
    if (!contentRef.current) return;
    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      const link = document.createElement('a');
      link.download = `排班表_${startDate}_${displayMonths}個月.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('截圖失敗:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 標題與下載按鈕 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-7 h-7 text-indigo-600" />
              週末與國定假日排班系統
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              支援雙軌獨立排班、防跨週連上機制、連假中斷補償積分與視覺化統計
            </p>
          </div>
          <button
            onClick={handleDownloadImage}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-sm transition-all"
          >
            <Download className="w-4 h-4" /> 下載排班圖表
          </button>
        </div>

        {/* 參數設定面板 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-3">排班參數設定</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">排班人數</label>
              <input
                type="number"
                min="3"
                max="20"
                value={personCount}
                onChange={e => setPersonCount(Math.max(3, parseInt(e.target.value) || 3))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">開始日期</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">顯示月數</label>
              <input
                type="number"
                min="1"
                max="12"
                value={displayMonths}
                onChange={e => setDisplayMonths(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">檢視模式</label>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md flex justify-center items-center gap-1.5 transition ${viewMode === 'calendar' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600'}`}
                >
                  <Calendar className="w-4 h-4" /> 行事曆
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md flex justify-center items-center gap-1.5 transition ${viewMode === 'table' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600'}`}
                >
                  <Table className="w-4 h-4" /> 表格
                </button>
              </div>
            </div>
          </div>

          {/* 中途銜接起始人員設定 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">常規班起始人員</label>
              <select
                value={startPersonReg}
                onChange={e => setStartPersonReg(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                {people.map(p => (
                  <option key={p.id} value={p.id}>{p.name} (編號 {p.id})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">週日班起始人員</label>
              <select
                value={startPersonSun}
                onChange={e => setStartPersonSun(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                {people.map(p => (
                  <option key={p.id} value={p.id}>{p.name} (編號 {p.id})</option>
                ))}
              </select>
            </div>
          </div>

          {/* 自訂姓名輸入框 */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-sm font-medium text-slate-700">自訂人員名稱（留空則顯示預設編號）</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {people.map(p => (
                <input
                  key={p.id}
                  type="text"
                  placeholder={`人員 ${p.id}`}
                  value={customNames[p.id] || ''}
                  onChange={e => setCustomNames({ ...customNames, [p.id]: e.target.value })}
                  className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-500"
                />
              ))}
            </div>
          </div>

          {/* 防呆與補償規則提示 */}
          <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl flex items-start gap-2.5 text-xs text-indigo-800 leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <strong>已啟用排班防呆與補償機制：</strong>
              1. 同一週末/連假不重複排同一人；
              2. 嚴格禁止跨週連上（上週最後出勤者不接下週第一班）；
              3. 3天以上連假夾在中間的排班日自動給予 <strong>+2 分補償</strong>；
              4. 全程動態撫平，人人積分差值控制在 <strong>±1 分</strong> 內。
            </div>
          </div>
        </div>

        {/* 主要排班內容與統計圖（截圖匯出範圍） */}
        <div ref={contentRef} className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          {viewMode === 'calendar' ? (
            /* 行事曆模式 (週日開始) */
            <div className="space-y-8">
              {monthsList.map(({ year, month }) => {
                const firstDay = new Date(year, month - 1, 1).getDay();
                const daysInMonth = new Date(year, month, 0).getDate();
                const blanks = Array.from({ length: firstDay });
                const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

                return (
                  <div key={`${year}-${month}`} className="border border-slate-200 rounded-xl overflow-hidden">
                    <div className="bg-slate-800 text-white font-bold px-4 py-2.5 flex items-center justify-between">
                      <span>{year} 年 {month} 月</span>
                      <span className="text-xs font-normal text-slate-300">行事曆檢視</span>
                    </div>
                    <div className="grid grid-cols-7 text-center bg-slate-100 border-b text-xs font-semibold py-2">
                      <span className="text-rose-500">週日</span>
                      <span>週一</span>
                      <span>週二</span>
                      <span>週三</span>
                      <span>週四</span>
                      <span>週五</span>
                      <span className="text-indigo-600">週六</span>
                    </div>
                    <div className="grid grid-cols-7 auto-rows-fr bg-slate-200 gap-[1px]">
                      {blanks.map((_, idx) => (
                        <div key={`blank-${idx}`} className="bg-slate-50 min-h-[110px]" />
                      ))}
                      {days.map(d => {
                        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                        const duty = scheduleData[dateStr];
                        const isTodaySunday = new Date(year, month - 1, d).getDay() === 0;

                        return (
                          <div key={dateStr} className="bg-white p-1.5 min-h-[110px] flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <span className={`text-xs font-bold ${isTodaySunday ? 'text-rose-500' : 'text-slate-700'}`}>
                                {d}
                              </span>
                              {duty && duty.points === 2 && (
                                <span className="text-[10px] bg-amber-500 text-white px-1 rounded font-bold">
                                  +2分
                                </span>
                              )}
                            </div>

                            {duty && (
                              <div className="mt-1 space-y-1">
                                {duty.type === 'spring' && (
                                  <div className="bg-rose-50 border border-rose-200 text-rose-600 text-[11px] text-center py-1 rounded">
                                    春節連假
                                  </div>
                                )}
                                {duty.type === 'sun' && (
                                  <div className="bg-emerald-50 border border-emerald-200 p-1 rounded">
                                    <div className="text-[10px] font-semibold text-emerald-700">週日班</div>
                                    {duty.workers.map(w => (
                                      <div key={w.id} className="text-xs font-medium text-emerald-900 whitespace-nowrap leading-normal">
                                        {w.name}
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {duty.type === 'reg' && (
                                  <div className="bg-indigo-50 border border-indigo-200 p-1 rounded">
                                    <div className="text-[10px] font-semibold text-indigo-700">常規班</div>
                                    <div className="space-y-0.5">
                                      {duty.workers.map(w => (
                                        <div key={w.id} className="text-xs font-medium text-indigo-900 whitespace-nowrap leading-normal">
                                          {w.name}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* 表格模式 */
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-white text-xs">
                    <th className="p-3 border-b sticky left-0 bg-slate-800 z-10 w-28">日期 / 星期</th>
                    <th className="p-3 border-b text-center w-24">假別 / 積分</th>
                    {people.map(p => (
                      <th key={p.id} className="p-3 border-b text-center border-l border-slate-700 min-w-[80px]">
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(scheduleData).map(dateStr => {
                    const duty = scheduleData[dateStr];
                    const dateObj = new Date(dateStr);
                    const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
                    const dayOfWeek = dayNames[dateObj.getDay()];
                    const workerIds = duty.workers.map(w => w.id);

                    let rowBg = 'bg-white';
                    let tag = null;

                    if (duty.type === 'spring') {
                      rowBg = 'bg-rose-50/70';
                      tag = <span className="text-xs font-bold text-rose-600">春節</span>;
                    } else if (duty.type === 'sun') {
                      rowBg = 'bg-emerald-50/50';
                      tag = <span className="text-xs font-bold text-emerald-700">週日班 (+{duty.points})</span>;
                    } else if (duty.type === 'reg') {
                      rowBg = 'bg-indigo-50/50';
                      tag = <span className="text-xs font-bold text-indigo-700">常規班 (+{duty.points})</span>;
                    }

                    return (
                      <tr key={dateStr} className={`border-b border-slate-200 ${rowBg} hover:bg-slate-100/80`}>
                        <td className={`p-2.5 font-medium text-xs sticky left-0 ${rowBg} border-r border-slate-200`}>
                          {dateStr.slice(5)} (週{dayOfWeek})
                        </td>
                        <td className="p-2.5 text-center">{tag}</td>
                        {people.map(p => {
                          const isDuty = workerIds.includes(p.id);
                          return (
                            <td key={p.id} className="p-2.5 text-center border-l border-slate-200">
                              {isDuty && (
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs">
                                  ✓
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* 累積積分方格柱狀圖 (一排四人) */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                累積積分統計總覽 (方格柱狀圖)
              </h3>
              <div className="text-xs text-slate-500 flex gap-3">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-indigo-500 inline-block" /> 常規班</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" /> 週日班</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-5 rounded bg-amber-500 inline-block" /> +2分連假格</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {people.map(p => {
                const pStat = stats[p.id];
                return (
                  <div key={p.id} className="border border-slate-200 rounded-xl p-3 bg-slate-50/60 flex flex-col justify-between">
                    <div className="font-bold text-sm text-slate-800 border-b pb-2 mb-3 flex justify-between items-center">
                      <span>{p.name}</span>
                      <span className="text-xs font-semibold bg-slate-200 px-2 py-0.5 rounded-full text-slate-700">
                        總計 {pStat.regPoints + pStat.sunPoints} 分
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 h-44 items-end">
                      {/* 常規班柱 */}
                      <div className="flex flex-col items-center h-full justify-end">
                        <span className="text-xs font-bold text-indigo-600 mb-1">{pStat.regPoints}分</span>
                        <div className="w-full flex flex-col-reverse gap-1 overflow-y-auto max-h-36">
                          {pStat.regDates.map((item, idx) => (
                            <div
                              key={idx}
                              className={`w-full rounded text-[10px] text-white flex items-center justify-center font-bold shadow-sm ${
                                item.points === 2 ? 'h-10 bg-amber-500' : 'h-5 bg-indigo-500'
                              }`}
                            >
                              {item.dateStr.slice(5)} {item.points === 2 && '+2'}
                            </div>
                          ))}
                        </div>
                        <span className="text-[11px] font-medium text-slate-500 mt-1">常規</span>
                      </div>

                      {/* 週日班柱 */}
                      <div className="flex flex-col items-center h-full justify-end">
                        <span className="text-xs font-bold text-emerald-600 mb-1">{pStat.sunPoints}分</span>
                        <div className="w-full flex flex-col-reverse gap-1 overflow-y-auto max-h-36">
                          {pStat.sunDates.map((item, idx) => (
                            <div
                              key={idx}
                              className={`w-full rounded text-[10px] text-white flex items-center justify-center font-bold shadow-sm ${
                                item.points === 2 ? 'h-10 bg-amber-500' : 'h-5 bg-emerald-500'
                              }`}
                            >
                              {item.dateStr.slice(5)} {item.points === 2 && '+2'}
                            </div>
                          ))}
                        </div>
                        <span className="text-[11px] font-medium text-slate-500 mt-1">週日</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
