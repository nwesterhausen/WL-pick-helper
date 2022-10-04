import { InjuryInjury, Pickcenter } from './apis/espn-types/event';
import { Teams } from './apis/espn-types/teams';
import EspnApi from './apis/EspnApi';
import { CachedScheduleFiles, CalendarWeek, GameData, TeamData } from './cache-types';

export function getCalendar(data: EspnApi.Scoreboard): CalendarWeek[] {
  return data.leagues
    .map((t) => {
      return t.calendar
        .map((v) => {
          return v.entries.map((x) => {
            return {
              league: t.abbreviation,
              season: v.label,
              slug: x.alternateLabel.toLowerCase().replaceAll(' ', '') as typeof CachedScheduleFiles[number],
              name: x.label,
              dates: x.detail,
              start: x.startDate,
              end: x.endDate,
            };
          });
        })
        .flat();
    })
    .flat();
}

export function getGamesFromScoreboard(data: EspnApi.Scoreboard): GameData[] {
  return data.events.map((v) => {
    const game = v.competitions[0];
    const homeTeam = game.competitors[0].homeAway === 'home' ? game.competitors[0] : game.competitors[1];
    const awayTeam = game.competitors[0].homeAway === 'away' ? game.competitors[0] : game.competitors[1];
    return {
      id: v.id,
      date: v.date,
      name: v.name,
      shortName: v.shortName,
      home_id: homeTeam.id,
      home_score: homeTeam.score || '0',
      away_id: awayTeam.id,
      away_score: awayTeam.score || '0',
      supportingData: {},
    };
  });
}

export function getExtraInfoFromEventSummary(data: EspnApi.EventSummary, game: GameData): any {
  console.log(data.boxscore);
  const homeStats = data.boxscore.teams[0].team.id === game.home_id ? data.boxscore.teams[0].statistics : data.boxscore.teams[1].statistics;
  const awayStats = data.boxscore.teams[0].team.id === game.away_id ? data.boxscore.teams[0].statistics : data.boxscore.teams[1].statistics;
  const haveInjuryData = typeof data.injuries !== 'undefined';
  let homeInjuries = {};
  let awayInjuries = {};
  if (haveInjuryData) {
    homeInjuries =
      data.injuries[0].team.id === game.home_id ? data.injuries[0].injuries.map(mapInjuryData) : data.injuries[1].injuries.map(mapInjuryData);
    awayInjuries =
      data.injuries[0].team.id === game.away_id ? data.injuries[0].injuries.map(mapInjuryData) : data.injuries[1].injuries.map(mapInjuryData);
  }
  const havePredictor = typeof data.predictor !== 'undefined';
  let predictor = {};
  if (havePredictor) {
    predictor = {
      home_win: data.predictor.homeTeam.gameProjection,
      away_win: data.predictor.homeTeam.teamChanceLoss,
      tie: data.predictor.homeTeam.teamChanceTie,
    };
  }
  const havePickcenter = typeof data.predictor !== 'undefined';
  let pickcenter = {};
  if (havePickcenter) {
    pickcenter = data.pickcenter.map((p: Pickcenter) => {
      return {
        source: p.provider.name,
        summary: p.details,
        overUnder: p.overUnder,
        spread: p.spread,
        homeTeamOdds: p.homeTeamOdds,
        awayTeamOdds: p.awayTeamOdds,
      };
    });
  }
  return {
    home: {
      stats: homeStats,
      injuries: homeInjuries,
    },
    away: {
      stats: awayStats,
      injuries: awayInjuries,
    },
    predictor: predictor,
    pickcenter: pickcenter,
  };
}

function mapInjuryData(i: InjuryInjury) {
  return {
    status: i.status,
    date: i.date,
    athelete: i.athlete.shortName,
    jersey: i.athlete.jersey,
    position: i.athlete.position.abbreviation,
    playerUrl: i.athlete.links.length === 0 ? '' : i.athlete.links[0].href,
  };
}

export function getTeams(data: Teams): TeamData[] {
  return data.sports
    .map((s) => {
      return s.leagues
        .map((l) => {
          return l.teams.map((v) => {
            return {
              sport: s.name,
              league: l.abbreviation,
              id: v.team.id,
              abbreviation: v.team.abbreviation,
              displayName: v.team.displayName,
              shortDisplayName: v.team.shortDisplayName,
              name: v.team.name,
              nickname: v.team.nickname,
              location: v.team.location,
              color1: v.team.color,
              color2: v.team.alternateColor,
              isActive: v.team.isActive,
              logoUrl: v.team.logos.length === 0 ? '' : v.team.logos[0].href,
              clubhouseUrl: v.team.links.filter((v) => v.text === 'Clubhouse')[0].href,
              rosterUrl: v.team.links.filter((v) => v.text === 'Roster')[0].href,
            };
          });
        })
        .flat();
    })
    .flat();
}
