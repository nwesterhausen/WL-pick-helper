/**
 * Library which provides methods for grabbing data from the ESPN API
 **/
import { fetch, FetchOptions } from '@tauri-apps/api/http';
import { Leagues } from '../espn-util';
import { QueryParam, queryParamsToEncodedString } from './common';
import { Teams } from './espn-types/teams';
import EspnApi from './EspnApi';

const BASE_URL = 'site.api.espn.com';
const API_STRING = 'apis/site/v2/sports';

export interface EspnApiOptions {
  league_index: number;
  date?: string;
  groups?: string;
  numResults?: string;
  raw?: boolean;
  event?: number;
  team?: number;
}

/**
 * Wrapper for making requests against the (unofficial) ESPN API. All of these are GET requests, so this is simplified
 * to provide for that.
 *
 * The exposed functions from this library all use this `call` function.
 *
 * @param endpoint - The path to call the attentive api at (appended to 'https://site.api.espn.com/apis/site/v2/sports/')
 * @throws Error if the request doesn't come back with a 200 OK response
 * @returns JSON data from Attentive
 */
async function call(endpoint: string, params: QueryParam[] = []): Promise<unknown> {
  //1. Build the full URL for the request. This uses the 2 variables defined at the top of this file for the
  //   base URL and foar the api version information. The endpoint is provided as a parameter to the `call` function
  const stringParams = queryParamsToEncodedString(params);
  const full_url = `https://${BASE_URL}/${API_STRING}/${endpoint}${stringParams}`;
  //3. Assemble the request options, which includes the headers, method (get/post) and data payload (if any)
  const options: FetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  console.debug(`GET ${full_url}`);

  //4. Make the request to ESPN API
  const resp = await fetch(full_url, options);
  console.log(resp);
  //4a. Log the response
  console.debug(`ESPN answered ${resp.status}`);
  if (!resp.ok) {
    //4b. If the response was not 200 OK or variation, throw an error
    throw new Error(`API request returned ${resp.status}`);
  }

  //5. Tauri http client turns data automatically
  return resp.data;
}

/**
 * Get the event summary for an event from ESPN
 * @param league_index - league index
 * @param eventId - id of event to get info on
 * @returns event summary
 * @throws Error if an error response is received
 */
async function getEventSummaryByEventId(league_index: number, eventId: number): Promise<EspnApi.EventSummary> {
  //1. Make sure we have the league_api_path
  const league_api_path = Leagues[league_index].api_endpoint_path;
  //2. Build parameters, in this case it amounts to `?event={eventId}`
  const params: QueryParam[] = [
    {
      key: 'event',
      value: `${eventId}`,
    },
  ];
  //3. Call the ESPN api
  const data = (await call(`${league_api_path}/summary`, params)) as EspnApi.EventSummary;
  //4. Return the data as an array or an empty array if no data
  return data;
}

/**
 * Convert the ESPN API options into query parameters
 * @param options - API options (e.g. date, groups. limit)
 * @returns Serialized query parameters
 */
function apiOptionsToParams(options: EspnApiOptions): QueryParam[] {
  // Go through all the optional arguments and add them to the end of the URL
  const params: QueryParam[] = [];
  if (options.date) {
    params.push({ key: 'dates', value: `${options.date}` });
  }
  if (options.groups) {
    params.push({ key: 'groups', value: `${options.groups}` });
  }
  if (options.numResults) {
    params.push({ key: 'limit', value: `${options.numResults}` });
  }
  if (options.event) {
    params.push({ key: 'event', value: `${options.event}` });
  }
  return params;
}

/**
 * A promise that resovles to a list of game data as you request.
 * @param options - supplied details to create the Scoreboard API Call
 * @returns a list of game data
 * @throws Error if an error response is received
 */
async function getScoreboards(options: EspnApiOptions): Promise<EspnApi.Scoreboard> {
  //1. Make sure we have the league_api_path
  const league_api_path = Leagues[options.league_index].api_endpoint_path;
  //2. Build parameters, in this case it amounts to `?event={eventId}`
  const params: QueryParam[] = apiOptionsToParams(options);
  //3. Call the ESPN api
  const data = (await call(`${league_api_path}/scoreboard`, params)) as EspnApi.Scoreboard;

  return data;
}

/**
 * A promise that resovles to a list of game data as you request.
 * @param options - supplied details to create the Scoreboard API Call
 * @returns a list of game data
 * @throws Error if an error response is received
 */
async function getTeams(league_index: number): Promise<Teams> {
  //1. Make sure we have the league_api_path
  const league_api_path = Leagues[league_index].api_endpoint_path;
  //3. Call the ESPN api
  const data = (await call(`${league_api_path}/teams`)) as Teams;

  return data;
}

/**
 * A promise that resovles to a list of team info matching `config.team` espn_id at the `config.league` ESPN API endpoint
 * @param options - supplied details to create the Scoreboard API Call
 * @returns a list of team data
 * @throws Error if an error response is received
 */
export async function getTeamInfo(options: EspnApiOptions): Promise<EspnApi.TeamInfo> {
  //1. Make sure we have the league_api_path
  const league_api_path = Leagues[options.league_index].api_endpoint_path;
  //2. Build parameters
  const params: QueryParam[] = apiOptionsToParams(options);
  //3. Call the ESPN api
  const teamInfo = (await call(`${league_api_path}/teams/${options.team}`, params)) as EspnApi.TeamInfo;

  return teamInfo;
}

/**
 * A promise that resovles to a list upcoming game espn_ids
 * @param options - supplied details to create the Scoreboard API Call
 * @returns a list of upcoming game espn_ids
 * @throws Error if an error response is received
 */
export async function getTeamSchedule(options: EspnApiOptions): Promise<Teams> {
  //1. Make sure we have the league_api_path
  const league_api_path = Leagues[options.league_index].api_endpoint_path;
  //2. Build parameters
  const params: QueryParam[] = apiOptionsToParams(options);
  //3. Call the ESPN api
  const teamInfo = (await call(`${league_api_path}/teams/${options.team}/schedule}`, params)) as Teams;

  return teamInfo;
}

export default Object.assign(
  {},
  {
    getEventSummaryByEventId: getEventSummaryByEventId,
    getScoreboards: getScoreboards,
    getTeamInfo: getTeamInfo,
    getTeamSchedule: getTeamSchedule,
    getTeams: getTeams,
  }
);
