import { http } from '@tauri-apps/api';
import { BaseDirectory, createDir, exists, readTextFile, writeBinaryFile, writeFile } from '@tauri-apps/api/fs';
import { fetch } from '@tauri-apps/api/http';
import { CachedFiles, CachedScheduleFiles, CalendarWeek } from './cache-types';
import { cacheStaticData, StaticCacheIndicator } from './espn-data-cacher';

const createCacheDir = async () => {
  try {
    await createDir('cache', {
      dir: BaseDirectory.App,
      recursive: true,
    });
    await createDir('cache/logos', {
      dir: BaseDirectory.App,
      recursive: true,
    });
  } catch (e) {
    console.error(e);
  }
};

const createDataFile = async (filename: typeof CachedFiles[number] | typeof CachedScheduleFiles[number], data: unknown) => {
  try {
    await writeFile(
      {
        contents: JSON.stringify(data),
        path: `./cache/${filename}.json`,
      },
      {
        dir: BaseDirectory.App,
      }
    );
  } catch (e) {
    console.error(e);
  }
};

export const saveTeamLogoPng = async (logoUrl: string, filename: string) => {
  console.log('saveTeamLogoPng', logoUrl, filename);
  const imgResp = await fetch<http.ResponseType.Binary>(logoUrl, {
    method: 'GET',
    responseType: http.ResponseType.Binary,
  });

  if (!imgResp.ok) {
    console.error('Bad response code!');
    console.error(imgResp);
    return;
  }

  const binaryData = new Uint8Array(imgResp.data);

  await writeBinaryFile(
    {
      contents: binaryData,
      path: `./cache/logos/${filename}.png`,
    },
    {
      dir: BaseDirectory.App,
    }
  );
};

export async function initialize() {
  //1. Create cache dir
  await createCacheDir();
  //2. Create dummy-empty files
  for (const cachedFile of CachedFiles) {
    if (!(await exists(`./cache/${cachedFile}.json`, { dir: BaseDirectory.App }))) {
      await createDataFile(cachedFile, []);
    }
  }
  for (const cachedFile of CachedScheduleFiles) {
    if (!(await exists(`./cache/${cachedFile}.json`, { dir: BaseDirectory.App }))) {
      await createDataFile(cachedFile, []);
    }
  }
  //3. Check if static data exists, if not, create it
  if (
    !(await exists(`./${StaticCacheIndicator}`, {
      dir: BaseDirectory.App,
    }))
  ) {
    await cacheStaticData();
  }
}

export async function saveDataFile(filename: typeof CachedFiles[number] | typeof CachedScheduleFiles[number], data: unknown) {
  await createDataFile(filename, data);
}

export async function readDataFile(filename: typeof CachedFiles[number] | typeof CachedScheduleFiles[number]): Promise<any> {
  try {
    const jsonString = await readTextFile(`./cache/${filename}.json`, {
      dir: BaseDirectory.App,
    });
    return JSON.parse(jsonString);
  } catch (err) {
    console.error(err);
    return {};
  }
}

export async function readCachedSchedule(): Promise<CalendarWeek[]> {
  return (await readDataFile('schedule')) as CalendarWeek[];
}
