import { useEffect, useRef } from 'preact/hooks';
import { Chart, registerables } from 'chart.js';
import { logStats, currentFile, entries } from '../../store';

Chart.register(...registerables);

export function Stats() {
  const levelChartRef = useRef<HTMLCanvasElement>(null);
  const typeChartRef = useRef<HTMLCanvasElement>(null);
  const timelineChartRef = useRef<HTMLCanvasElement>(null);
  const chartsRef = useRef<Chart[]>([]);
  
  const stats = logStats.value;
  const file = currentFile.value;

  useEffect(() => {
    // Destroy existing charts
    chartsRef.current.forEach(chart => chart.destroy());
    chartsRef.current = [];
    
    if (!file || entries.value.length === 0) return;
    
    // Level distribution chart
    if (levelChartRef.current) {
      const ctx = levelChartRef.current.getContext('2d');
      if (ctx) {
        const chart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR'],
            datasets: [{
              data: [
                stats.levelCounts.TRACE,
                stats.levelCounts.DEBUG,
                stats.levelCounts.INFO,
                stats.levelCounts.WARN,
                stats.levelCounts.ERROR
              ],
              backgroundColor: ['#95a5a6', '#9b59b6', '#3498db', '#f39c12', '#e74c3c']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right',
                labels: { color: '#ccc' }
              },
              title: {
                display: true,
                text: 'Log Levels',
                color: '#fff'
              }
            }
          }
        });
        chartsRef.current.push(chart);
      }
    }
    
    // Event type chart
    if (typeChartRef.current) {
      const ctx = typeChartRef.current.getContext('2d');
      if (ctx) {
        const chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Events', 'Span Enter', 'Span Exit'],
            datasets: [{
              label: 'Count',
              data: [
                stats.typeCounts.event,
                stats.typeCounts.span_enter,
                stats.typeCounts.span_exit
              ],
              backgroundColor: ['#3498db', '#27ae60', '#e67e22']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              title: {
                display: true,
                text: 'Entry Types',
                color: '#fff'
              }
            },
            scales: {
              x: { ticks: { color: '#ccc' }, grid: { color: '#333' } },
              y: { ticks: { color: '#ccc' }, grid: { color: '#333' } }
            }
          }
        });
        chartsRef.current.push(chart);
      }
    }
    
    // Timeline chart
    if (timelineChartRef.current && stats.timelineData.length > 0) {
      const ctx = timelineChartRef.current.getContext('2d');
      if (ctx) {
        const chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: stats.timelineData.map(d => `${d.timestamp.toFixed(1)}s`),
            datasets: [{
              label: 'Events',
              data: stats.timelineData.map(d => d.count),
              borderColor: '#3498db',
              backgroundColor: 'rgba(52, 152, 219, 0.2)',
              fill: true,
              tension: 0.3
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              title: {
                display: true,
                text: 'Events Over Time',
                color: '#fff'
              }
            },
            scales: {
              x: { 
                ticks: { color: '#ccc', maxTicksLimit: 10 }, 
                grid: { color: '#333' },
                title: { display: true, text: 'Time', color: '#ccc' }
              },
              y: { 
                ticks: { color: '#ccc' }, 
                grid: { color: '#333' },
                title: { display: true, text: 'Count', color: '#ccc' }
              }
            }
          }
        });
        chartsRef.current.push(chart);
      }
    }
    
    return () => {
      chartsRef.current.forEach(chart => chart.destroy());
      chartsRef.current = [];
    };
  }, [stats, file]);

  if (!file) {
    return (
      <div class="stats-view empty">
        <div class="placeholder-message">
          <span class="placeholder-icon">📊</span>
          <p>Select a log file to view statistics</p>
        </div>
      </div>
    );
  }

  return (
    <div class="stats-view">
      <div class="stats-grid">
        <div class="stats-card chart-card">
          <canvas ref={levelChartRef}></canvas>
        </div>
        
        <div class="stats-card chart-card">
          <canvas ref={typeChartRef}></canvas>
        </div>
        
        <div class="stats-card chart-card wide">
          <canvas ref={timelineChartRef}></canvas>
        </div>
        
        <div class="stats-card">
          <h3>Summary</h3>
          <div class="stats-summary">
            <div class="stat-row">
              <span class="stat-label">Total Entries</span>
              <span class="stat-value">{entries.value.length}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">Unique Spans</span>
              <span class="stat-value">{stats.topSpans.length}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">Errors</span>
              <span class="stat-value error">{stats.levelCounts.ERROR}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">Warnings</span>
              <span class="stat-value warn">{stats.levelCounts.WARN}</span>
            </div>
          </div>
        </div>
        
        {stats.topSpans.length > 0 && (
          <div class="stats-card">
            <h3>Top Spans by Count</h3>
            <div class="stats-table">
              {stats.topSpans.map(span => (
                <div key={span.name} class="span-row">
                  <span class="span-name" title={span.name}>{span.name}</span>
                  <span class="span-count">{span.count}x</span>
                  {span.avgDuration > 0 && (
                    <span class="span-duration">
                      ~{(span.avgDuration * 1000).toFixed(2)}ms
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
