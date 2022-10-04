// Autogenerated from real ESPN API data using http://www.json2ts.com/
// This type definition file is only used when developing or building the app.
// It helps make sure we are going to pull valid data when when are accessing the
// data returned from the ESPN API. (It also provides autocomplete when developing)

declare namespace EspnApi {
  export interface EventSummary {
    [key: string]: any;
  }
  export interface TeamInfo {
    [key: string]: any;
  }
  export interface EspnTeamSchedule {
    [key: string]: any;
  }
  export interface Scoreboard {
    leagues: League[];
    season: ScoreboardSeason;
    week: Week;
    events: Event[];
  }

  export interface Event {
    id: string;
    uid: string;
    date: string;
    name: string;
    shortName: string;
    season: EventSeason;
    competitions: Competition[];
    links: EventLink[];
    status: Status;
  }

  export interface Competition {
    id: string;
    uid: string;
    date: string;
    attendance: number;
    type: CompetitionType;
    timeValid: boolean;
    neutralSite: boolean;
    conferenceCompetition: boolean;
    recent: boolean;
    venue: CompetitionVenue;
    competitors: Competitor[];
    notes: any[];
    status: Status;
    broadcasts: Broadcast[];
    leaders: CompetitionLeader[];
    format: Format;
    startDate: string;
    geoBroadcasts: GeoBroadcast[];
    headlines?: Headline[];
  }

  export interface Broadcast {
    market: MarketEnum;
    names: string[];
  }

  export enum MarketEnum {
    National = 'national',
  }

  export interface Competitor {
    id: string;
    uid: string;
    type: TypeElement;
    order: number;
    homeAway: HomeAway;
    winner: boolean;
    team: Team;
    score: string;
    linescores: Linescore[];
    statistics: any[];
    records: Record[];
  }

  export enum HomeAway {
    Away = 'away',
    Home = 'home',
  }

  export interface Linescore {
    value: number;
  }

  export interface Record {
    name: RecordName;
    abbreviation?: RecordAbbreviation;
    type: RecordType;
    summary: string;
  }

  export enum RecordAbbreviation {
    Game = 'Game',
  }

  export enum RecordName {
    Home = 'Home',
    NameRoad = 'Road',
    NameYTD = 'YTD',
    Road = 'road',
    Ytd = 'ytd',
  }

  export enum RecordType {
    Home = 'home',
    Road = 'road',
    Total = 'total',
  }

  export interface Team {
    id: string;
    uid: string;
    location: string;
    name: string;
    abbreviation: string;
    displayName: string;
    shortDisplayName: string;
    color: string;
    alternateColor: string;
    isActive: boolean;
    venue: TeamClass;
    links: TeamLink[];
    logo: string;
  }

  export interface TeamLink {
    rel: TypeElement[];
    href: string;
    text: Text;
    isExternal: boolean;
    isPremium: boolean;
  }

  export enum TypeElement {
    App = 'app',
    Clubhouse = 'clubhouse',
    Depthchart = 'depthchart',
    Desktop = 'desktop',
    Draftpicks = 'draftpicks',
    Injuries = 'injuries',
    Photos = 'photos',
    Roster = 'roster',
    Schedule = 'schedule',
    Scores = 'scores',
    Sportscenter = 'sportscenter',
    Stats = 'stats',
    Team = 'team',
    Transactions = 'transactions',
  }

  export enum Text {
    Clubhouse = 'Clubhouse',
    DepthChart = 'Depth Chart',
    DraftPicks = 'Draft Picks',
    Injuries = 'Injuries',
    Photos = 'photos',
    Roster = 'Roster',
    Schedule = 'Schedule',
    Scores = 'Scores',
    Statistics = 'Statistics',
    Transactions = 'Transactions',
  }

  export interface TeamClass {
    id: string;
  }

  export interface Format {
    regulation: Regulation;
  }

  export interface Regulation {
    periods: number;
  }

  export interface GeoBroadcast {
    type: GeoBroadcastType;
    market: MarketClass;
    media: Media;
    lang: Lang;
    region: Region;
  }

  export enum Lang {
    En = 'en',
  }

  export interface MarketClass {
    id: string;
    type: MarketType;
  }

  export enum MarketType {
    National = 'National',
  }

  export interface Media {
    shortName: string;
  }

  export enum Region {
    Us = 'us',
  }

  export interface GeoBroadcastType {
    id: string;
    shortName: ShortName;
  }

  export enum ShortName {
    Radio = 'Radio',
    Tv = 'TV',
    Web = 'Web',
  }

  export interface Headline {
    description: string;
    type: ShortText;
    shortLinkText: string;
    video?: Video[];
  }

  export enum ShortText {
    BoxScore = 'Box Score',
    Gamecast = 'Gamecast',
    Highlights = 'Highlights',
    PlayByPlay = 'Play-by-Play',
    Recap = 'Recap',
  }

  export interface Video {
    id: number;
    source: SourceEnum;
    headline: string;
    thumbnail: string;
    duration: number;
    tracking: Tracking;
    deviceRestrictions: DeviceRestrictions;
    links: Links;
  }

  export interface DeviceRestrictions {
    type: DeviceRestrictionsType;
    devices: Device[];
  }

  export enum Device {
    Desktop = 'desktop',
    Handset = 'handset',
    Settop = 'settop',
    Tablet = 'tablet',
  }

  export enum DeviceRestrictionsType {
    Whitelist = 'whitelist',
  }

  export interface Links {
    api: API;
    web: Web;
    source: SourceClass;
    mobile: Mobile;
  }

  export interface API {
    self: Artwork;
    artwork: Artwork;
  }

  export interface Artwork {
    href: string;
  }

  export interface Mobile {
    alert: Artwork;
    source: Artwork;
    href: string;
    streaming: Artwork;
    progressiveDownload: Artwork;
  }

  export interface SourceClass {
    mezzanine: Artwork;
    flash: Artwork;
    hds: Artwork;
    HLS: HLS;
    HD: Artwork;
    full: Artwork;
    href: string;
  }

  export interface HLS {
    href: string;
    HD: Artwork;
  }

  export interface Web {
    href: string;
    short: Artwork;
    self: Artwork;
  }

  export enum SourceEnum {
    Espn = 'espn',
  }

  export interface Tracking {
    sportName: SportNameEnum;
    leagueName: LeagueNameEnum;
    coverageType: CoverageType;
    trackingName: string;
    trackingId: string;
  }

  export enum CoverageType {
    FinalGameHighlight = 'Final Game Highlight',
  }

  export enum LeagueNameEnum {
    Nfl = 'NFL',
    NoLeague = 'No League',
  }

  export enum SportNameEnum {
    Nfl = 'nfl',
  }

  export interface CompetitionLeader {
    name: LeaderName;
    displayName: DisplayName;
    shortDisplayName: ShortDisplayName;
    abbreviation: LeaderAbbreviation;
    leaders: LeaderLeader[];
  }

  export enum LeaderAbbreviation {
    Pyds = 'PYDS',
    Recyds = 'RECYDS',
    Ryds = 'RYDS',
  }

  export enum DisplayName {
    PassingLeader = 'Passing Leader',
    ReceivingLeader = 'Receiving Leader',
    RushingLeader = 'Rushing Leader',
  }

  export interface LeaderLeader {
    displayValue: string;
    value: number;
    athlete: Athlete;
    team: TeamClass;
  }

  export interface Athlete {
    id: string;
    fullName: string;
    displayName: string;
    shortName: string;
    links: AthleteLink[];
    headshot: string;
    jersey: string;
    position: Position;
    team: TeamClass;
    active: boolean;
  }

  export interface AthleteLink {
    rel: PurpleRel[];
    href: string;
  }

  export enum PurpleRel {
    Athlete = 'athlete',
    Bio = 'bio',
    Desktop = 'desktop',
    Gamelog = 'gamelog',
    News = 'news',
    Overview = 'overview',
    Playercard = 'playercard',
    Splits = 'splits',
    Stats = 'stats',
  }

  export interface Position {
    abbreviation: PositionAbbreviation;
  }

  export enum PositionAbbreviation {
    Qb = 'QB',
    Rb = 'RB',
    Te = 'TE',
    Wr = 'WR',
  }

  export enum LeaderName {
    PassingYards = 'passingYards',
    ReceivingYards = 'receivingYards',
    RushingYards = 'rushingYards',
  }

  export enum ShortDisplayName {
    Pass = 'PASS',
    Rec = 'REC',
    Rush = 'RUSH',
  }

  export interface Status {
    clock: number;
    displayClock: DisplayClock;
    period: number;
    type: StatusType;
  }

  export enum DisplayClock {
    The000 = '0:00',
  }

  export interface StatusType {
    id: string;
    name: TypeName;
    state: State;
    completed: boolean;
    description: Description;
    detail: Description;
    shortDetail: Description;
    altDetail?: string;
  }

  export enum Description {
    Final = 'Final',
    FinalOT = 'Final/OT',
  }

  export enum TypeName {
    StatusFinal = 'STATUS_FINAL',
  }

  export enum State {
    Post = 'post',
  }

  export interface CompetitionType {
    id: string;
    abbreviation: TypeAbbreviation;
  }

  export enum TypeAbbreviation {
    Std = 'STD',
  }

  export interface CompetitionVenue {
    id: string;
    fullName: string;
    address: Address;
    capacity: number;
    indoor: boolean;
  }

  export interface Address {
    city: string;
    state?: string;
  }

  export interface EventLink {
    language: Language;
    rel: FluffyRel[];
    href: string;
    text: ShortText;
    shortText: ShortText;
    isExternal: boolean;
    isPremium: boolean;
  }

  export enum Language {
    EnUS = 'en-US',
  }

  export enum FluffyRel {
    Boxscore = 'boxscore',
    Desktop = 'desktop',
    Event = 'event',
    Highlights = 'highlights',
    Pbp = 'pbp',
    Recap = 'recap',
    Summary = 'summary',
  }

  export interface EventSeason {
    year: number;
    type: number;
    slug: SeasonSlug;
  }

  export enum SeasonSlug {
    RegularSeason = 'regular-season',
  }

  export interface League {
    id: string;
    uid: string;
    name: string;
    abbreviation: LeagueNameEnum;
    slug: SportNameEnum;
    season: LeagueSeason;
    logos: Logo[];
    calendarType: string;
    calendarIsWhitelist: boolean;
    calendarStartDate: string;
    calendarEndDate: string;
    calendar: Calendar[];
  }

  export interface Calendar {
    label: string;
    value: string;
    startDate: string;
    endDate: string;
    entries: Entry[];
  }

  export interface Entry {
    label: string;
    alternateLabel: string;
    detail: string;
    value: string;
    startDate: string;
    endDate: string;
  }

  export interface Logo {
    href: string;
    width: number;
    height: number;
    alt: string;
    rel: string[];
    lastUpdated: string;
  }

  export interface LeagueSeason {
    year: number;
    startDate: string;
    endDate: string;
    type: SeasonType;
  }

  export interface SeasonType {
    id: string;
    type: number;
    name: string;
    abbreviation: string;
  }

  export interface ScoreboardSeason {
    type: number;
    year: number;
  }

  export interface Week {
    number: number;
  }
}
export default EspnApi;
