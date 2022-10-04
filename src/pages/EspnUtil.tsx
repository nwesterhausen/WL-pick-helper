import { createSignal, type Component } from 'solid-js';
import { readDataFile } from '../lib/cache';
import { cacheSchedule, cacheTeamData, cacheWeeklySchedules } from '../lib/espn-data-cacher';

const EspnUtil: Component = () => {
  const [lastData, setLastData] = createSignal<any>({});
  return (
    <>
      <div class='container mx-auto mt-2'>
        <span>Update Cached Values: </span>
        <div class='btn-group'>
          <button
            class='btn btn-sm btn-accent'
            onClick={() => {
              cacheSchedule().catch(console.error);
            }}
          >
            Schedule
          </button>
          <button
            class='btn btn-sm btn-accent'
            onClick={() => {
              cacheTeamData().catch(console.error);
            }}
          >
            Teams
          </button>
          <button
            class='btn btn-sm btn-accent'
            onClick={() => {
              cacheWeeklySchedules().catch(console.error);
            }}
          >
            All Week Schedules
          </button>
        </div>
      </div>
      <div class='container mx-auto mt-2'>
        <span>Read Cached Values: </span>
        <div class='btn-group'>
          <button
            class='btn btn-sm btn-secondary'
            onClick={() => {
              readDataFile('schedule')
                .then((schedule) => {
                  setLastData(schedule);
                })
                .catch(console.error);
            }}
          >
            Schedule
          </button>
          <button
            class='btn btn-sm btn-secondary'
            onClick={() => {
              readDataFile('teams')
                .then((teams) => {
                  setLastData(teams);
                })
                .catch(console.error);
            }}
          >
            Teams
          </button>
          <button
            class='btn btn-sm btn-secondary'
            onClick={() => {
              readDataFile('week4')
                .then((data) => {
                  setLastData(data);
                })
                .catch(console.error);
            }}
          >
            Week 4 Data
          </button>
          <button
            class='btn btn-sm btn-secondary'
            onClick={() => {
              readDataFile('week5')
                .then((data) => {
                  setLastData(data);
                })
                .catch(console.error);
            }}
          >
            Week 5 Data
          </button>
        </div>
      </div>
      <div class='container px-4'>
        <pre>{JSON.stringify(lastData(), null, 2)}</pre>
      </div>
    </>
  );
};

export default EspnUtil;
