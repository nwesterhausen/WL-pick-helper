import { BaseDirectory, writeFile } from '@tauri-apps/api/fs';
import espn from './apis/espn';
import { readDataFile, saveDataFile, saveTeamLogoPng } from './cache';
import { getCalendar, getExtraInfoFromEventSummary, getGamesFromScoreboard, getTeams } from './espn-data-map';
import { NFL_INDEX } from './espn-util';

export const StaticCacheIndicator = '.staticCached';

export async function cacheStaticData() {
  // Cache the season schedule data
  await cacheSchedule();
  // Cache team data
  await cacheTeamData();
  // Cache weekly schedules
  await cacheWeeklySchedules();
  // Create file to indicate cached static
  await writeFile(`./${StaticCacheIndicator}`, '', {
    dir: BaseDirectory.App,
  });
}

export const cacheSchedule = async () => {
  const fullSchedule = await espn.getScoreboards({ league_index: NFL_INDEX });
  const schedule = getCalendar(fullSchedule);

  await saveDataFile('schedule', schedule);
};

export const cacheTeamData = async () => {
  const allTeams = await espn.getTeams(NFL_INDEX);
  const teams = getTeams(allTeams);

  await saveDataFile('teams', teams);

  // Cache team logos
  for (const team of teams) {
    await saveTeamLogoPng(team.logoUrl, team.abbreviation);
  }
};

export const cacheWeeklySchedules = async () => {
  const schedules = await readDataFile('schedule');

  for (const week of schedules) {
    const startDate = week.start.split('T')[0];
    const endDate = week.end.split('T')[0];
    const dateRange = `${startDate.replaceAll('-', '')}-${endDate.replaceAll('-', '')}`;
    const weeklySchedule = await espn.getScoreboards({ league_index: NFL_INDEX, date: dateRange });

    const weekGames = getGamesFromScoreboard(weeklySchedule);

    for (const game of weekGames) {
      const eventData = await espn.getEventSummaryByEventId(NFL_INDEX, parseInt(game.id));
      const supportingData = getExtraInfoFromEventSummary(eventData, game);
      game.supportingData = supportingData;
    }

    await saveDataFile(week.slug, weekGames);
  }
};
